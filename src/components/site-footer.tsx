import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/logo.asset.json";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-espresso text-cream">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src={logoAsset.url} alt="" className="h-10 w-10 rounded-full bg-cream object-cover" />
              <span className="font-display text-2xl">Seed <span className="italic">to</span> Cup</span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/75">
              A coffee education and experience platform by Cashmere Events —
              celebrating the journey, culture and commerce of coffee.
            </p>
            <p className="eyebrow mt-6 !text-cream/70">Coffee · Culture · Commerce</p>
          </div>

          <div>
            <p className="eyebrow !text-cream/70">Explore</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link to="/sessions" className="text-cream/80 hover:text-cream">Sessions</Link></li>
              <li><Link to="/membership" className="text-cream/80 hover:text-cream">Membership</Link></li>
              <li><Link to="/consultation" className="text-cream/80 hover:text-cream">Consultation</Link></li>
              <li><Link to="/about" className="text-cream/80 hover:text-cream">About</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow !text-cream/70">Contact</p>
            <ul className="mt-4 space-y-3 text-sm text-cream/80">
              <li>hello@seedtocup.co</li>
              <li>Addis Ababa, Ethiopia</li>
              <li>By Cashmere Events</li>
            </ul>
          </div>

          <div>
            <p className="eyebrow !text-cream/70">Follow</p>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                { label: "Instagram", href: "#" },
                { label: "YouTube", href: "#" },
                { label: "LinkedIn", href: "#" },
                { label: "TikTok", href: "#" },
              ].map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="text-cream/80 hover:text-cream">{s.label} →</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-cream/15 pt-6 text-xs text-cream/60 md:flex-row">
          <p>© {new Date().getFullYear()} Seed To Cup by Cashmere Events. All rights reserved.</p>
          <p>Brewed with intention.</p>
        </div>
      </div>
    </footer>
  );
}
