'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/upcoming-session", label: "Upcoming Session" },
  { href: "/register", label: "Registration" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md border-b border-border/70 shadow-xs" : "bg-background/85 backdrop-blur-md border-b border-border/40"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 md:px-10 md:py-4">
        <Link href="/" className="flex min-w-0 items-center group py-0.5" aria-label="Seed To Cup">
          <Image
            src="/images/logo.png"
            alt="Seed To Cup"
            width={282}
            height={584}
            className="h-11 md:h-12 w-auto object-contain transition-transform group-hover:scale-105"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => {
            const isActive = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`text-base transition-colors ${
                  isActive ? "text-ink font-bold" : "text-espresso/80 font-medium hover:text-ink"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
          <Link href="/register" className="btn-primary !py-2.5 !px-6 text-sm">
            Register →
          </Link>
        </nav>

        <button
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-border"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          <div className="flex flex-col gap-1.5">
            <span className={`h-px w-4 bg-espresso transition ${open ? "translate-y-[6px] rotate-45" : ""}`} />
            <span className={`h-px w-4 bg-espresso transition ${open ? "opacity-0" : ""}`} />
            <span className={`h-px w-4 bg-espresso transition ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="flex flex-col px-5 py-4">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-3 text-espresso hover:text-ink font-medium"
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="btn-primary mt-3 self-start text-xs"
            >
              Register →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
