'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export function SiteFooter() {
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer id="contact" className="border-t border-[#2E231C] bg-[#120D0A] text-[#FBF8F3]">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          {/* Brand Column */}
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo-white.png"
                alt="Seed To Cup"
                width={282}
                height={584}
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-[#FBF8F3]/70 font-light">
              A premium coffee education and cultural platform by Cashmere Events — connecting knowledge, heritage, and specialty coffee commerce in Ethiopia.
            </p>
            <div className="mt-8 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#4A7CC8]">
              <span className="inline-block w-8 h-[1.5px] bg-[#2B5BA4]" />
              Addis Ababa · Ethiopia
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#4A7CC8]">
              Platform
            </p>
            <ul className="mt-6 flex flex-col gap-3.5 text-sm font-light">
              <li>
                <Link href="/" className="text-[#FBF8F3]/75 hover:text-[#C89D66] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#FBF8F3]/75 hover:text-[#C89D66] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/upcoming-session" className="text-[#FBF8F3]/75 hover:text-[#C89D66] transition-colors">
                  Upcoming Session
                </Link>
              </li>
              <li>
                <Link href="/sessions" className="text-[#FBF8F3]/75 hover:text-[#C89D66] transition-colors">
                  Sessions Archive
                </Link>
              </li>
              <li>
                <Link href="/membership" className="text-[#FBF8F3]/75 hover:text-[#C89D66] transition-colors">
                  Membership Program
                </Link>
              </li>
              <li>
                <Link href="/consultation" className="text-[#FBF8F3]/75 hover:text-[#C89D66] transition-colors">
                  Coffee Consultation
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-[#FBF8F3]/75 hover:text-[#C89D66] transition-colors">
                  Registration & Fees
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C89D66]">
              Get in Touch
            </p>
            <ul className="mt-6 flex flex-col gap-4 text-sm font-light text-[#FBF8F3]/75">
              <li>
                <span className="block text-xs uppercase tracking-widest text-[#FBF8F3]/40 mb-1">Location</span>
                <span className="text-[#FBF8F3]">The HUB Addis / Bole, Addis Ababa</span>
              </li>
              <li>
                <span className="block text-xs uppercase tracking-widest text-[#FBF8F3]/40 mb-1">Direct Inquiries</span>
                <a
                  href="mailto:hello@seedtocup.et"
                  className="text-[#C89D66] hover:underline underline-offset-4"
                >
                  hello@seedtocup.et
                </a>
              </li>
              <li>
                <span className="block text-xs uppercase tracking-widest text-[#FBF8F3]/40 mb-1">Curated By</span>
                <span className="text-[#FBF8F3] font-normal">Cashmere Events</span>
              </li>
            </ul>
          </div>

          {/* Channels & Hours */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C89D66]">
              Official Channels
            </p>
            <p className="mt-6 text-sm text-[#FBF8F3]/70 font-light leading-relaxed">
              Watch session recordings, interviews, and cupping demos on our streaming channels.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href="https://youtube.com/@seedtocup_et?si=u-FwCIQngSuAsJjE"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#FBF8F3]/85 hover:text-[#C89D66] transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-[#2B5BA4]" />
                <span>YouTube (@seedtocup_et)</span>
                <span className="text-xs text-[#FBF8F3]/40">↗</span>
              </a>
              <a
                href="https://linkedin.com/showcase/seedtocup-et"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#FBF8F3]/85 hover:text-[#4A7CC8] transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-[#2B5BA4]" />
                <span>LinkedIn Showcase</span>
                <span className="text-xs text-[#FBF8F3]/40">↗</span>
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm text-[#FBF8F3]/60 hover:text-[#C89D66] transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-white/20" />
                <span>Instagram Community</span>
                <span className="text-xs text-[#FBF8F3]/40">↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Legal */}
        <div className="mt-18 flex flex-col justify-between items-center gap-4 border-t border-white/10 pt-8 text-xs text-[#FBF8F3]/50 md:flex-row font-light">
          <p>© {currentYear} Seed To Cup. Powered and created by Cashmere Events. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="italic text-[#C89D66]/80 font-serif text-sm">Every Cup Has a Story.</span>
            <span>·</span>
            <Link
              href="/admin"
              className="text-[#FBF8F3]/40 hover:text-[#C89D66] transition underline underline-offset-4"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
