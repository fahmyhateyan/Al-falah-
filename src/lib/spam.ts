/**
 * Lightweight spam protection: a hidden honeypot field, a minimum time on the
 * form, and a per-IP rate limit (in-memory; per server instance).
 */
const hits = new Map<string, number[]>();

export function rateLimited(key: string, limit = 5, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > limit;
}

export function looksLikeBot(input: Record<string, unknown>, minMs = 3000): boolean {
  if (typeof input.website === "string" && input.website.trim() !== "") return true;
  const started = Number(input.startedAt);
  if (Number.isFinite(started) && started > 0 && Date.now() - started < minMs) return true;
  return false;
}

export function clientIp(headers: Headers): string {
  return headers.get("x-forwarded-for")?.split(",")[0]?.trim() || headers.get("x-real-ip") || "unknown";
}
