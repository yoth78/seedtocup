import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Eyebrow, Section } from '@/components/ui-bits';
import { eventGallery, previousSessions, upcomingSession } from '@/lib/sessions-data';

export const metadata: Metadata = {
  title: 'Seed To Cup — Coffee, Culture, Commerce',
  description:
    'From seed to cup, discover the story behind coffee. A platform connecting coffee culture, knowledge and commerce through sessions, membership and consultations.',
};

export default function Home() {
  return (
    <>
      {/* HERO WITH FULL BACKGROUND IMAGE */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-espresso text-cream">
        {/* Full Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/events/IMG_4004.jpg"
            alt="Seed To Cup community session at The HUB Addis"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Multi-layer luxury coffee/espresso overlays for contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-espresso/95 via-espresso/85 to-espresso/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso via-transparent to-black/50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-7xl w-full px-5 py-20 md:px-10 md:py-28 lg:py-36">
          <div className="fade-up max-w-4xl">
            {/* Brand Motto Only */}
            <div className="mb-6">
              <span className="font-mono text-xs md:text-sm uppercase tracking-[0.25em] text-cream/90 bg-white/10 border border-white/20 px-5 py-2 rounded-full inline-block font-bold backdrop-blur-xs">
                Coffee · Culture · Commerce
              </span>
            </div>

            <h1 className="text-5xl leading-[1.03] sm:text-6xl md:text-7xl lg:text-[5.5rem] font-display text-cream font-normal">
              From <em className="italic text-blue-300">Seed</em> to Cup,
              <br />
              discover the story
              <br />
              behind coffee.
            </h1>

            <p className="mt-8 max-w-2xl text-xl md:text-2xl leading-relaxed text-cream/90 font-normal">
              A platform connecting coffee culture, knowledge and commerce
              through experiences, conversations and community.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/register?type=event"
                className="rounded-md bg-cream text-espresso px-7 py-3.5 text-base font-bold hover:bg-white transition shadow-lg"
              >
                Register for upcoming session
              </Link>
              <Link
                href="/register?type=membership"
                className="rounded-md border border-cream/50 bg-black/20 backdrop-blur-xs text-cream px-7 py-3.5 text-base font-semibold hover:bg-white/20 transition"
              >
                Become a member
              </Link>
              <Link
                href="/register?type=consultation"
                className="text-base font-semibold text-cream hover:text-blue-300 transition px-2 py-3.5 inline-flex items-center gap-1"
              >
                Book a consultation →
              </Link>
            </div>

            {/* Stats row */}
            <div className="mt-14 flex flex-wrap gap-x-12 gap-y-4 text-base text-cream/80 border-t border-white/15 pt-8">
              <div>
                <span className="font-display text-4xl text-cream font-semibold">12</span> sessions / year
              </div>
              <div>
                <span className="font-display text-4xl text-cream font-semibold">500+</span> community members
              </div>
              <div>
                <span className="font-display text-4xl text-cream font-semibold">30+</span> speakers
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE VALUES */}
      <div className="border-y border-border/60 bg-latte/40 py-6 overflow-hidden">
        <div className="flex items-center justify-center gap-8 md:gap-16 font-display text-2xl md:text-3xl text-espresso/80 whitespace-nowrap px-4">
          <span>Origin</span>
          <span className="text-ink">✳</span>
          <span className="italic">Process</span>
          <span className="text-ink">✳</span>
          <span>Roast</span>
          <span className="text-ink">✳</span>
          <span className="italic">Brew</span>
          <span className="text-ink">✳</span>
          <span>Community</span>
        </div>
      </div>

      {/* UPCOMING */}
      <Section>
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16 items-center">
          <div>
            <Eyebrow>Upcoming Session</Eyebrow>
            <p className="mt-4 font-display text-sm uppercase tracking-widest text-ink">{upcomingSession.number}</p>
            <h2 className="mt-3 text-4xl md:text-5xl font-display">{upcomingSession.title}</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-lg text-lg">{upcomingSession.description}</p>
            <dl className="mt-8 grid grid-cols-2 gap-6 text-base">
              <div>
                <dt className="eyebrow !text-espresso/60">When</dt>
                <dd className="mt-2 text-espresso font-semibold">{upcomingSession.date}<br /><span className="text-muted-foreground font-normal">{upcomingSession.time}</span></dd>
              </div>
              <div>
                <dt className="eyebrow !text-espresso/60">Where</dt>
                <dd className="mt-2 text-espresso font-semibold">{upcomingSession.venue}</dd>
              </div>
              <div>
                <dt className="eyebrow !text-espresso/60">Speaker</dt>
                <dd className="mt-2 text-espresso font-semibold">{upcomingSession.speaker.name}<br /><span className="text-muted-foreground font-normal">{upcomingSession.speaker.role}</span></dd>
              </div>
              <div>
                <dt className="eyebrow !text-espresso/60">Topic</dt>
                <dd className="mt-2 text-espresso font-semibold">{upcomingSession.topic}</dd>
              </div>
            </dl>
            <Link href="/upcoming-session" className="btn-primary mt-10 inline-flex">
              Reserve your seat
            </Link>
          </div>
          <div className="relative aspect-[5/6] w-full overflow-hidden rounded-md shadow-md">
            <Image
              src="/images/events/IMG_3872.jpg"
              alt="Seed To Cup live stage session at The HUB Addis"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute right-4 top-4 rounded-full bg-cream/95 px-4 py-2 text-xs font-medium text-espresso shadow-xs backdrop-blur-xs">
              Limited seats
            </div>
          </div>
        </div>
      </Section>

      {/* WHAT IS SEED TO CUP */}
      <Section className="bg-espresso text-cream">
        <div className="grid gap-14 md:grid-cols-[1fr_1.4fr]">
          <div>
            <Eyebrow><span className="!text-cream/70">What is Seed To Cup?</span></Eyebrow>
            <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl text-cream font-display">
              A destination for anyone who thinks about coffee <em className="italic text-cream/90">seriously</em>.
            </h2>
          </div>
          <div className="text-cream/80 leading-relaxed">
            <p className="text-xl leading-relaxed text-cream/90">
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
                  <p className="font-display text-4xl text-cream">{v.t}</p>
                  <p className="mt-2 text-base text-cream/80 leading-relaxed">{v.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* MEMBERSHIP + CONSULTATION */}
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <article className="group relative flex flex-col justify-between overflow-hidden rounded-md border border-border bg-card p-8 md:p-10 transition hover:border-ink/40 shadow-xs">
            <div>
              <Eyebrow>Membership</Eyebrow>
              <h3 className="mt-5 text-3xl md:text-4xl font-display">All 12 sessions.<br />One community.</h3>
              <p className="mt-4 text-muted-foreground max-w-md text-lg leading-relaxed">
                Annual membership grants access to every Seed To Cup session,
                priority booking, and an inner-circle community of coffee minds.
              </p>
              <ul className="mt-6 space-y-3 text-base">
                {[
                  "Access to all 12 monthly sessions",
                  "Priority event access",
                  "Exclusive community updates",
                ].map((b) => (
                  <li key={b} className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-ink shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link href="/membership" className="btn-primary mt-8 self-start">
              Become a member
            </Link>
          </article>

          <article className="relative flex flex-col justify-between overflow-hidden rounded-md border border-border bg-espresso text-cream p-8 md:p-10 shadow-xs">
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/events/IMG_3938.jpg"
                alt="Coffee cupping and brewing service"
                fill
                className="object-cover opacity-25"
              />
            </div>
            <div className="relative z-10">
              <Eyebrow><span className="!text-cream/70">Consultation</span></Eyebrow>
              <h3 className="mt-5 text-3xl md:text-4xl text-cream font-display">
                Expert guidance<br />for your coffee vision.
              </h3>
              <p className="mt-4 text-cream/90 max-w-md text-lg leading-relaxed">
                Opening a café, sourcing green, refining your roast profile, or
                building a coffee brand — book a session with a specialist.
              </p>
              <p className="mt-6 font-display text-2xl text-cream">
                From <span className="italic text-cream font-semibold">1,000 ETB</span> · 30 minutes
              </p>
            </div>
            <Link
              href="/consultation"
              className="relative z-10 mt-8 inline-flex self-start rounded-full bg-cream px-7 py-3.5 text-base font-semibold text-espresso transition hover:bg-cream/90"
            >
              Book a consultation →
            </Link>
          </article>
        </div>
      </Section>

      {/* PREVIOUS SESSIONS */}
      <Section className="bg-latte/40">
        <div className="mb-12 flex items-end justify-between gap-6 flex-wrap">
          <div>
            <Eyebrow>Previous Sessions</Eyebrow>
            <h2 className="mt-5 text-4xl md:text-5xl font-display max-w-xl">
              The archive of every cup we've shared.
            </h2>
          </div>
          <Link href="/sessions" className="btn-ghost">
            View all sessions →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {previousSessions.slice(0, 3).map((s) => (
            <Link key={s.id} href="/sessions" className="group block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-md shadow-xs">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="mt-5">
                <p className="text-sm uppercase tracking-widest text-ink font-semibold">{s.number} · {s.date}</p>
                <p className="mt-2 font-display text-2xl md:text-3xl leading-tight text-espresso group-hover:text-ink transition-colors">{s.title}</p>
                <p className="mt-2 text-base text-muted-foreground">{s.topic}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* MOMENTS FROM SEED TO CUP GALLERY */}
      <Section>
        <div className="mb-12 flex items-end justify-between gap-6 flex-wrap">
          <div>
            <Eyebrow>In the Room</Eyebrow>
            <h2 className="mt-5 text-4xl md:text-5xl font-display max-w-xl">
              Moments from the Seed To Cup community.
            </h2>
          </div>
          <p className="max-w-md text-base text-muted-foreground leading-relaxed">
            Real conversations, real tastings, real connections. Experience the atmosphere of our monthly sessions organized by Cashmere Events at The HUB Addis.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {eventGallery.slice(0, 4).map((item) => (
            <div key={item.id} className="group overflow-hidden rounded-md border border-border bg-card shadow-xs">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-espresso/5">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                <p className="font-display text-lg text-espresso leading-snug">{item.title}</p>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* YOUTUBE */}
      <Section className="bg-latte/30">
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16 items-center">
          <div>
            <Eyebrow>Recap on YouTube</Eyebrow>
            <h2 className="mt-5 text-4xl md:text-5xl font-display">Watch every session, on your own time.</h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              Every Seed To Cup gathering is captured and shared on our official YouTube channel —
              from cupping demos to master speaker panels.
            </p>
            <a
              href="https://youtube.com/@seedtocup_et?si=u-FwCIQngSuAsJjE"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline mt-8 inline-flex"
            >
              Subscribe on YouTube →
            </a>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-md border border-border bg-espresso shadow-md">
            <Image
              src="/images/events/IMG_4054.jpg"
              alt="Seed To Cup session stage presentation recap"
              fill
              className="object-cover opacity-75"
            />
            <a
              href="https://youtube.com/@seedtocup_et?si=u-FwCIQngSuAsJjE"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex items-center justify-center group"
              aria-label="Play recap on YouTube"
            >
              <span className="grid h-20 w-20 place-items-center rounded-full bg-cream text-espresso shadow-2xl transition duration-300 group-hover:scale-110">
                <svg width="22" height="24" viewBox="0 0 22 24" fill="currentColor">
                  <path d="M0 0v24l22-12z" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </Section>

      {/* ABOUT PREVIEW */}
      <Section className="bg-espresso text-cream">
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] items-center">
          <div className="relative aspect-[4/3] w-full rounded-md bg-cream p-6 flex items-center justify-center overflow-hidden">
            <Image
              src="/images/illustration.png"
              alt="Coffee community illustration"
              fill
              className="object-contain p-6"
            />
          </div>
          <div>
            <Eyebrow><span className="!text-cream/70">About Seed To Cup</span></Eyebrow>
            <h2 className="mt-5 text-4xl md:text-5xl text-cream font-display">
              Built by <em className="italic">Cashmere Events</em>, for the coffee community.
            </h2>
            <p className="mt-5 text-cream/80 max-w-lg leading-relaxed">
              Seed To Cup exists to celebrate the journey, culture and commerce of coffee —
              a place where farmers, roasters, baristas and enthusiasts meet as equals.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex rounded-full border border-cream/40 px-6 py-3 text-sm text-cream hover:bg-cream hover:text-espresso transition"
            >
              Read our story →
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
