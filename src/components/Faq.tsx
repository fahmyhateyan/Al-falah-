import type { ReactNode } from "react";

export type FaqItem = { q: string; a: ReactNode };

export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-forest-900/10 rounded-3xl bg-white ring-1 ring-forest-900/5">
      {items.map((item) => (
        <details key={item.q} className="group px-6 sm:px-8">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-serif text-lg font-bold text-forest-900 [&::-webkit-details-marker]:hidden">
            {item.q}
            <span aria-hidden className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest-50 text-forest-800">
              <span className="absolute h-0.5 w-3.5 bg-current" />
              <span className="absolute h-3.5 w-0.5 bg-current transition-transform group-open:rotate-90 group-open:opacity-0" />
            </span>
          </summary>
          <div className="pb-6 text-forest-900/85 [&_a]:font-semibold [&_a]:text-forest-700 [&_a]:underline [&_a]:underline-offset-4 [&_p+p]:mt-3">{item.a}</div>
        </details>
      ))}
    </div>
  );
}
