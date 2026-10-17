"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mainNav } from "@/config/site";
import { IconClose, IconMenu } from "./Icons";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const first = menuRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && menuRef.current) {
        const items = Array.from(menuRef.current.querySelectorAll<HTMLElement>("a, button"));
        const firstEl = items[0];
        const lastEl = items[items.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
    <header className="sticky top-0 z-40 border-b border-forest-900/10 bg-ivory-50/95 backdrop-blur supports-[backdrop-filter]:bg-ivory-50/85">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-forest-900 focus:px-4 focus:py-2 focus:text-ivory-50"
      >
        Skip to main content
      </a>
      <div className="container-page flex h-[72px] items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`rounded-full px-3 py-2 text-[0.95rem] font-medium transition-colors xl:px-4 ${
                    isActive(item.href)
                      ? "bg-forest-800/[0.07] text-forest-950"
                      : "text-forest-800 hover:bg-forest-800/5 hover:text-forest-950"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/donate"
            className="inline-flex min-h-[44px] items-center whitespace-nowrap rounded-full bg-forest-800 px-4 py-2.5 text-[0.95rem] sm:px-5 font-semibold text-ivory-50 shadow-sm transition-colors hover:bg-forest-900"
          >
            Donate Now
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-forest-900 ring-1 ring-inset ring-forest-900/15 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>
    </header>

      {open && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-ivory-50 lg:hidden"
        >
          <nav aria-label="Mobile" className="container-page py-6">
            <ul className="divide-y divide-forest-900/10 border-y border-forest-900/10">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-4 font-serif text-2xl text-forest-900"
                  >
                    {item.label}
                    {isActive(item.href) && <span className="h-2 w-2 rounded-full bg-leaf-500" aria-hidden />}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 grid gap-3">
              <Link href="/donate" onClick={() => setOpen(false)} className="flex min-h-[52px] items-center justify-center rounded-full bg-forest-800 text-lg font-semibold text-ivory-50">
                Donate Now
              </Link>
              <Link href="/sponsor-a-child" onClick={() => setOpen(false)} className="flex min-h-[52px] items-center justify-center rounded-full bg-gold-300 text-lg font-semibold text-forest-950">
                Sponsor a Child
              </Link>
            </div>
            <button type="button" onClick={() => { setOpen(false); toggleRef.current?.focus(); }} className="mt-6 w-full py-3 text-center font-medium text-forest-800 underline underline-offset-4">
              Close menu
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
