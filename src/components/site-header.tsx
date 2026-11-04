import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoAsset from "@/assets/logo.asset.json";

const nav = [
  { to: "/", label: "Home" },
  { to: "/sessions", label: "Sessions" },
  { to: "/membership", label: "Membership" },
  { to: "/consultation", label: "Consultation" },
  { to: "/about", label: "About" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-border/60" : "bg-transparent"
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 md:px-10 md:py-5">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <img src={logoAsset.url} alt="Seed To Cup" className="h-10 w-10 shrink-0 rounded-full object-cover" />
          <span className="truncate font-display text-xl leading-none text-espresso">
            Seed <span className="italic text-ink">to</span> Cup
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-espresso/80 transition hover:text-ink"
              activeProps={{ className: "text-ink font-medium" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
          <Link to="/upcoming" className="btn-primary !py-2.5 !px-5 text-xs">
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
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-3 text-espresso"
              >
                {n.label}
              </Link>
            ))}
            <Link to="/upcoming" onClick={() => setOpen(false)} className="btn-primary mt-3 self-start">
              Register for next session
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
