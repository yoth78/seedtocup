import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-coffee.jpg";
import farm from "@/assets/farm.jpg";
import barista from "@/assets/barista.jpg";
import illustrationAsset from "@/assets/illustration.asset.json";
import { Eyebrow, Section } from "@/components/ui-bits";
import { previousSessions, upcomingSession } from "@/lib/sessions-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Seed To Cup — Coffee, Culture, Commerce" },
      { name: "description", content: "From seed to cup, discover the story behind coffee. A platform connecting coffee culture, knowledge and commerce through sessions, membership and consultations." },
      { property: "og:title", content: "Seed To Cup — Coffee, Culture, Commerce" },
      { property: "og:description", content: "A signature coffee platform by Cashmere Events." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-14 md:grid-cols-[1.1fr_1fr] md:gap-16 md:px-10 md:pb-24 md:pt-20 lg:pt-24">
          <div className="fade-up flex flex-col justify-center">
            <Eyebrow>Coffee · Culture · Commerce</Eyebrow>
            <h1 className="mt-6 text-5xl leading-[1.03] md:text-7xl lg:text-[5.5rem]">
              From <em className="italic text-ink">Seed</em> to Cup,
              <br />
              discover the story
              <br />
              behind coffee.
            </h1>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
              A platform connecting coffee culture, knowledge and commerce
              through experiences, conversations and community.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/upcoming" className="btn-primary">Register for upcoming session</Link>
              <Link to="/membership" className="btn-outline">Become a member</Link>
              <Link to="/consultation" className="btn-ghost">Book a consultation →</Link>
            </div>
            <div className="mt-14 flex flex-wrap gap-x-10 gap-y-4 text-sm text-muted-foreground">
              <div><span className="font-display text-3xl text-espresso">12</span> sessions / year</div>
              <div><span className="font-display text-3xl text-espresso">500+</span> community members</div>
              <div><span className="font-display text-3xl text-espresso">30+</span> speakers</div>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md">
              <img src={hero} alt="Freshly roasted coffee beans" className="h-full w-full object-cover" width={1600} height={1200} />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden max-w-[220px] rounded-md border border-border bg-card p-5 shadow-xl md:block">
              <p className="eyebrow">Next Session</p>
              <p className="mt-2 font-display text-xl leading-tight">{upcomingSession.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{upcomingSession.date}</p>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE VALUES */}
      <div className="border-y border-border/60 bg-latte/40 py-6 overflow-hidden">
        <div className="flex items-center justify-center gap-10 md:gap-16 font-display text-2xl md:text-3xl text-espresso/70 whitespace-nowrap">
          <span>Origin</span><span className="text-ink">✳</span>
          <span className="italic">Process</span><span className="text-ink">✳</span>
          <span>Roast</span><span className="text-ink">✳</span>
          <span className="italic">Brew</span><span className="text-ink">✳</span>
          <span>Community</span>
        </div>
      </div>

      {/* UPCOMING */}
      <Section>
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
          <div>
            <Eyebrow>Upcoming Session</Eyebrow>
            <p className="mt-4 font-display text-sm uppercase tracking-widest text-ink">{upcomingSession.number}</p>
            <h2 className="mt-3 text-4xl md:text-5xl">{upcomingSession.title}</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-lg">{upcomingSession.description}</p>
            <dl className="mt-8 grid grid-cols-2 gap-6 text-sm">
              <div><dt className="eyebrow !text-espresso/60">When</dt><dd className="mt-2">{upcomingSession.date}<br />{upcomingSession.time}</dd></div>
              <div><dt className="eyebrow !text-espresso/60">Where</dt><dd className="mt-2">{upcomingSession.venue}</dd></div>
              <div><dt className="eyebrow !text-espresso/60">Speaker</dt><dd className="mt-2">{upcomingSession.speaker.name}<br /><span className="text-muted-foreground">{upcomingSession.speaker.role}</span></dd></div>
              <div><dt className="eyebrow !text-espresso/60">Topic</dt><dd className="mt-2">{upcomingSession.topic}</dd></div>
            </dl>
            <Link to="/upcoming" className="btn-primary mt-10">Reserve your seat</Link>
          </div>
          <div className="relative">
            <img src={farm} alt="Ethiopian coffee farm" className="aspect-[5/6] w-full rounded-md object-cover" width={1400} height={900} loading="lazy" />
            <div className="absolute right-4 top-4 rounded-full bg-cream/95 px-4 py-2 text-xs font-medium text-espresso backdrop-blur">
              Limited seats
            </div>
          </div>
        </div>
      </Section>

      {/* WHAT IS SEED TO CUP */}
      <Section className="bg-espresso text-cream">
        <div className="grid gap-14 md:grid-cols-[1fr_1.4fr]">
          <div>
            <Eyebrow>What is Seed To Cup?</Eyebrow>
            <h2 className="mt-6 text-4xl md:text-5xl text-cream">
              A destination for anyone who thinks about coffee <em className="italic text-cream/90">seriously</em>.
            </h2>
          </div>
          <div className="text-cream/80 leading-relaxed">
            <p className="text-lg">
              Seed To Cup is a signature coffee platform exploring coffee from origin
              to consumption. Each month we gather coffee lovers, professionals,
              entrepreneurs, baristas, roasters, farmers, and industry experts around
              one shared table.
            </p>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {[
                { t: "Coffee", d: "The craft — origin, processing, roasting, brewing, and taste." },
                { t: "Culture", d: "The stories, rituals and people that give coffee meaning." },
                { t: "Commerce", d: "The business — cafés, sourcing, roasteries and entrepreneurship." },
              ].map((v) => (
                <div key={v.t}>
                  <p className="font-display text-3xl text-cream">{v.t}</p>
                  <p className="mt-2 text-sm text-cream/70 leading-relaxed">{v.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* MEMBERSHIP + CONSULTATION */}
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <article className="group relative flex flex-col overflow-hidden rounded-md border border-border bg-card p-8 md:p-10 transition hover:border-ink/40">
            <Eyebrow>Membership</Eyebrow>
            <h3 className="mt-5 text-3xl md:text-4xl">All 12 sessions.<br />One community.</h3>
            <p className="mt-4 text-muted-foreground max-w-md">
              Annual membership grants access to every Seed To Cup session,
              priority booking, and an inner-circle community of coffee minds.
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              {["Access to all 12 monthly sessions", "Priority event access", "Exclusive community updates"].map((b) => (
                <li key={b} className="flex gap-3"><span className="mt-2 h-1 w-1 rounded-full bg-ink" />{b}</li>
              ))}
            </ul>
            <Link to="/membership" className="btn-primary mt-8 self-start">Become a member</Link>
          </article>

          <article className="relative flex flex-col overflow-hidden rounded-md border border-border bg-espresso text-cream p-8 md:p-10">
            <img src={barista} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" loading="lazy" />
            <div className="relative">
              <Eyebrow>Consultation</Eyebrow>
              <h3 className="mt-5 text-3xl md:text-4xl text-cream">Expert guidance<br />for your coffee vision.</h3>
              <p className="mt-4 text-cream/80 max-w-md">
                Opening a café, sourcing green, refining your roast profile, or
                building a coffee brand — book a session with a specialist.
              </p>
              <p className="mt-6 font-display text-xl text-cream">
                From <span className="italic">1,000 ETB</span> · 30 minutes
              </p>
              <Link to="/consultation" className="mt-8 inline-flex self-start rounded-full bg-cream px-6 py-3 text-sm font-medium text-espresso transition hover:bg-cream/90">
                Book a consultation →
              </Link>
            </div>
          </article>
        </div>
      </Section>

      {/* PREVIOUS SESSIONS */}
      <Section className="bg-latte/40">
        <div className="mb-12 flex items-end justify-between gap-6 flex-wrap">
          <div>
            <Eyebrow>Previous Sessions</Eyebrow>
            <h2 className="mt-5 text-4xl md:text-5xl max-w-xl">The archive of every cup we've shared.</h2>
          </div>
          <Link to="/sessions" className="btn-ghost">View all sessions →</Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {previousSessions.slice(0, 3).map((s) => (
            <Link key={s.id} to="/sessions" className="group block">
              <div className="aspect-[4/5] overflow-hidden rounded-md">
                <img src={s.image} alt={s.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="mt-5">
                <p className="text-xs uppercase tracking-widest text-ink">{s.number} · {s.date}</p>
                <p className="mt-2 font-display text-2xl leading-tight">{s.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{s.topic}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* YOUTUBE */}
      <Section>
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16 items-center">
          <div>
            <Eyebrow>Recap on YouTube</Eyebrow>
            <h2 className="mt-5 text-4xl md:text-5xl">Watch every session, on your own time.</h2>
            <p className="mt-5 text-muted-foreground">
              Every Seed To Cup gathering is captured and shared on our channel —
              from cupping demos to speaker panels.
            </p>
            <a href="#" className="btn-outline mt-8">Subscribe on YouTube →</a>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-md border border-border bg-espresso">
            <img src={barista} alt="Video recap placeholder" className="h-full w-full object-cover opacity-70" loading="lazy" />
            <button className="absolute inset-0 flex items-center justify-center" aria-label="Play recap">
              <span className="grid h-20 w-20 place-items-center rounded-full bg-cream text-espresso shadow-2xl transition hover:scale-105">
                <svg width="22" height="24" viewBox="0 0 22 24" fill="currentColor"><path d="M0 0v24l22-12z"/></svg>
              </span>
            </button>
          </div>
        </div>
      </Section>

      {/* ABOUT PREVIEW */}
      <Section className="bg-espresso text-cream">
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] items-center">
          <img src={illustrationAsset.url} alt="Coffee community illustration" className="w-full rounded-md bg-cream p-6" loading="lazy" />
          <div>
            <Eyebrow>About Seed To Cup</Eyebrow>
            <h2 className="mt-5 text-4xl md:text-5xl text-cream">
              Built by <em className="italic">Cashmere Events</em>, for the coffee community.
            </h2>
            <p className="mt-5 text-cream/80 max-w-lg">
              Seed To Cup exists to celebrate the journey, culture and commerce of coffee —
              a place where farmers, roasters, baristas and enthusiasts meet as equals.
            </p>
            <Link to="/about" className="mt-8 inline-flex rounded-full border border-cream/40 px-6 py-3 text-sm text-cream hover:bg-cream hover:text-espresso transition">
              Read our story →
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
