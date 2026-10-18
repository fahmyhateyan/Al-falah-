import Link from "next/link";
import type { ReactNode } from "react";
import { IconArrow } from "./Icons";

type Variant = "primary" | "accent" | "secondary" | "ghost-light" | "outline-light";

const styles: Record<Variant, string> = {
  primary: "bg-forest-800 text-mist-50 hover:bg-forest-900 shadow-sm",
  accent: "bg-sprout-300 text-forest-950 hover:bg-[#BEE6A3] shadow-sm",
  secondary: "bg-white text-forest-900 ring-1 ring-inset ring-forest-900/20 hover:ring-forest-900/40 hover:bg-mist-100",
  "ghost-light": "bg-white/10 text-white ring-1 ring-inset ring-white/40 hover:bg-white/20 backdrop-blur-sm",
  "outline-light": "text-mist-50 ring-1 ring-inset ring-mist-50/50 hover:bg-mist-50/10",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = false,
  className = "",
  size = "md",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  size?: "md" | "lg";
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full font-semibold transition-colors ${
        size === "lg" ? "px-7 py-3.5 text-lg" : "px-6 py-3 text-base"
      } ${styles[variant]} ${className}`}
    >
      {children}
      {arrow && <IconArrow />}
    </Link>
  );
}
