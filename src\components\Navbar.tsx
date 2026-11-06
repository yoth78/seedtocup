'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/upcoming-session', label: 'Upcoming Session' },
    { href: '/membership', label: 'Membership' },
    { href: '/consultation', label: 'Consultation' },
    { href: '/sessions', label: 'Past Sessions' },
    { href: '/about', label: 'About' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-brand-cream/95 backdrop-blur-md border-b border-coffee-light/30 shadow-sm py-2'
          : 'bg-brand-cream/80 backdrop-blur-sm border-b border-coffee-light/15 py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/logo.png"
              alt="Seed To Cup"
              width={100}
              height={100}
              style={{ width: 'auto', height: '46px', mixBlendMode: 'multiply' }}
              className="transition-transform duration-300 group-hover:scale-105 object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation with explicit CSS gaps */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-wide text-coffee-dark hover:text-brand-blue transition-colors duration-200 relative py-1 group whitespace-nowrap"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-200 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/upcoming-session"
              className="btn-primary text-xs !py-2.5 !px-5 whitespace-nowrap"
            >
              Register Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden flex flex-col items-center justify-center w-10 h-10 gap-1.5 focus:outline-none"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-coffee-dark transition-all duration-300 ${
                isOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-coffee-dark transition-all duration-300 ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-coffee-dark transition-all duration-300 ${
                isOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100 border-t border-coffee-light/30' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-brand-cream/98 backdrop-blur-md px-6 py-6 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-2.5 text-base font-medium text-coffee-dark hover:text-brand-blue transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-coffee-light/20">
            <Link
              href="/upcoming-session"
              onClick={() => setIsOpen(false)}
              className="btn-primary text-xs w-full justify-center !py-3"
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
