'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/sessions", label: "Sessions" },
  { href: "/#experiences", label: "Experiences" },
  { href: "/membership", label: "Membership" },
  { href: "/consultation", label: "Consultation" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 25);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#1A1410]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-xl text-[#FBF8F3]"
          : "bg-gradient-to-b from-[#120D0A]/80 via-[#120D0A]/40 to-transparent py-5 text-[#FBF8F3]"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 md:px-10">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center group py-0.5 shrink-0" aria-label="Seed To Cup">
          <Image
            src="/images/logo-white.png"
            alt="Seed To Cup"
            width={282}
            height={584}
            className="h-10 md:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-7 text-[0.88rem] tracking-wide font-normal">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`transition-colors duration-200 relative py-1 ${
                  isActive
                    ? "text-[#C89D66] font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#C89D66]"
                    : "text-[#FBF8F3]/85 hover:text-[#C89D66]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Join Community CTA */}
        <div className="hidden sm:flex items-center gap-4">
          <Link
            href="/register?type=membership"
            className="btn-gold !py-2.5 !px-5.5 text-[0.84rem] uppercase tracking-wider font-semibold"
          >
            Join Community
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-[#FBF8F3] hover:border-[#C89D66] transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation menu"
        >
          <div className="flex flex-col gap-1.5 w-4.5">
            <span
              className={`h-[1.5px] w-full bg-current transition-transform duration-300 ${
                open ? "translate-y-[7.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[1.5px] w-full bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-[1.5px] w-full bg-current transition-transform duration-300 ${
                open ? "-translate-y-[7.5px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {open && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-[#1A1410]/98 backdrop-blur-xl border-b border-white/10 px-6 py-8 shadow-2xl transition-all">
          <div className="flex flex-col gap-4 text-center">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-2 text-lg text-[#FBF8F3]/90 hover:text-[#C89D66] font-serif transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10 mt-2 flex flex-col gap-3">
              <Link
                href="/register?type=membership"
                onClick={() => setOpen(false)}
                className="btn-gold w-full text-center py-3 text-sm uppercase tracking-wider font-semibold"
              >
                Join Community
              </Link>
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="btn-outline-light w-full text-center py-3 text-sm uppercase tracking-wider"
              >
                Register for Session
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
