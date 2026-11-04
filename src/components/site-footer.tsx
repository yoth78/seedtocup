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
    <footer className="border-t border-border/70 bg-espresso text-cream">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center">
              <Image
                src="/images/logo-white.png"
                alt="Seed To Cup"
                width={282}
                height={584}
                className="h-14 w-auto object-contain"
              />
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/75">
              A coffee education and experience platform by Cashmere Events —
              celebrating the journey, culture and commerce of coffee.
            </p>
            <p className="eyebrow mt-6 !text-cream/70">
              <span className="rule !bg-cream/70" />
              Coffee · Culture · Commerce
            </p>
          </div>

          <div>
            <p className="eyebrow !text-cream/70">
              <span className="rule !bg-cream/70" />
              Explore
            </p>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              <li>
                <Link href="/upcoming-session" className="text-cream/80 hover:text-cream transition-colors">
                  Upcoming Session
                </Link>
              </li>
              <li>
                <Link href="/sessions" className="text-cream/80 hover:text-cream transition-colors">
                  Sessions Archive
                </Link>
              </li>
              <li>
                <Link href="/membership" className="text-cream/80 hover:text-cream transition-colors">
                  Membership
                </Link>
              </li>
              <li>
                <Link href="/consultation" className="text-cream/80 hover:text-cream transition-colors">
                  Consultation
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-cream/80 hover:text-cream transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow !text-cream/70">
              <span className="rule !bg-cream/70" />
              Contact
            </p>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-cream/80">
              <li>Addis Ababa, Ethiopia</li>
              <li>
                <span className="text-xs text-cream/50 uppercase tracking-widest block mb-0.5">Created by</span>
                <span className="text-cream font-medium">Cashmere Events</span>
              </li>
              <li>
                <a href="mailto:hello@seedtocup.et" className="text-cream/80 hover:text-cream underline underline-offset-4 decoration-cream/30 transition-colors">
                  hello@seedtocup.et
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow !text-cream/70">
              <span className="rule !bg-cream/70" />
              Official Channels
            </p>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              <li>
                <a
                  href="https://youtube.com/@seedtocup_et?si=u-FwCIQngSuAsJjE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/80 hover:text-cream transition-colors inline-flex items-center gap-2"
                >
                  <span>YouTube (@seedtocup_et)</span> →
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/showcase/seedtocup-et"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/80 hover:text-cream transition-colors inline-flex items-center gap-2"
                >
                  <span>LinkedIn (Seed To Cup)</span> →
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-cream/60 hover:text-cream transition-colors inline-flex items-center gap-2"
                >
                  <span>Instagram</span> →
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between items-center gap-4 border-t border-cream/15 pt-6 text-xs text-cream/60 md:flex-row">
          <p>© {currentYear} Seed To Cup by Cashmere Events. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Brewed with intention.</span>
            <span>·</span>
            <Link
              href="/admin"
              className="text-cream/50 hover:text-cream transition underline underline-offset-2"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
