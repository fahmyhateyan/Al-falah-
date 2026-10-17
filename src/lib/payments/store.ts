import { promises as fs } from "node:fs";
import path from "node:path";
import type { PaymentRecord } from "./types.ts";

/**
 * Storage boundary for payment records. The default FileStore writes a JSON
 * file to DATA_DIR – fine for a single server or review deployment. On
 * serverless hosting (e.g. Vercel) the filesystem is not persistent, so swap
 * in a database-backed implementation of this interface before going live.
 * See docs/PAYMENTS.md.
 */
export interface RecordStore {
  create(record: PaymentRecord): Promise<void>;
  get(reference: string): Promise<PaymentRecord | null>;
  findBy(field: "providerSessionId" | "paymentIntentId" | "subscriptionId", value: string): Promise<PaymentRecord | null>;
  update(reference: string, patch: (r: PaymentRecord) => PaymentRecord): Promise<PaymentRecord | null>;
  hasProcessedEvent(eventId: string): Promise<boolean>;
  markEventProcessed(eventId: string): Promise<void>;
}

type Data = { records: Record<string, PaymentRecord>; events: Record<string, string> };

abstract class BaseStore implements RecordStore {
  protected abstract load(): Promise<Data>;
  protected abstract save(data: Data): Promise<void>;
  private queue: Promise<unknown> = Promise.resolve();

  /** Serialise read-modify-write operations to avoid lost updates. */
  protected exclusive<T>(fn: (data: Data) => Promise<T> | T, write = false): Promise<T> {
    const run = this.queue.then(async () => {
      const data = await this.load();
      const out = await fn(data);
      if (write) await this.save(data);
      return out;
    });
    this.queue = run.catch(() => undefined);
    return run;
  }

  create(record: PaymentRecord) {
    return this.exclusive((d) => {
      if (d.records[record.reference]) throw new Error("Duplicate reference");
      d.records[record.reference] = record;
    }, true);
  }
  get(reference: string) {
    return this.exclusive((d) => d.records[reference] ?? null);
  }
  findBy(field: "providerSessionId" | "paymentIntentId" | "subscriptionId", value: string) {
    return this.exclusive((d) => Object.values(d.records).find((r) => r[field] === value) ?? null);
  }
  update(reference: string, patch: (r: PaymentRecord) => PaymentRecord) {
    return this.exclusive((d) => {
      const current = d.records[reference];
      if (!current) return null;
      const next = { ...patch(current), updatedAt: new Date().toISOString() };
      d.records[reference] = next;
      return next;
    }, true);
  }
  hasProcessedEvent(eventId: string) {
    return this.exclusive((d) => eventId in d.events);
  }
  markEventProcessed(eventId: string) {
    return this.exclusive((d) => {
      d.events[eventId] = new Date().toISOString();
    }, true);
  }
}

export class MemoryStore extends BaseStore {
  private data: Data = { records: {}, events: {} };
  protected async load() {
    return this.data;
  }
  protected async save(data: Data) {
    this.data = data;
  }
}

export class FileStore extends BaseStore {
  private file: string;
  constructor(file: string) {
    super();
    this.file = file;
  }
  protected async load(): Promise<Data> {
    try {
      return JSON.parse(await fs.readFile(this.file, "utf8")) as Data;
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === "ENOENT") return { records: {}, events: {} };
      throw err;
    }
  }
  protected async save(data: Data) {
    await fs.mkdir(path.dirname(this.file), { recursive: true });
    const tmp = `${this.file}.${process.pid}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(data, null, 2), { mode: 0o600 });
    await fs.rename(tmp, this.file);
  }
}

let store: RecordStore | null = null;

export function getStore(): RecordStore {
  if (!store) {
    const dir = process.env.DATA_DIR || path.join(process.cwd(), "data");
    store = new FileStore(path.join(dir, "payments.json"));
  }
  return store;
}
