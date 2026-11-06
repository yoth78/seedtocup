import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { PageHero, Section, Eyebrow } from '@/components/ui-bits';
import { eventGallery, previousSessions } from '@/lib/sessions-data';

export const metadata: Metadata = {
  title: 'Sessions Archive — Seed To Cup',
  description: 'The full archive of Seed To Cup coffee sessions. Watch every recap on YouTube.',
};

export default function SessionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Archive"
        title={<>Every session,<br /><em className="italic text-ink">every cup</em> we've shared.</>}
        intro="Browse the complete Seed To Cup archive and revisit each conversation through our YouTube recaps."
      />

      <Section>
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {previousSessions.map((s) => (
            <article key={s.id} className="group flex flex-col justify-between">
              <div>
                <div className="relative aspect-[4/5] overflow-hidden rounded-md shadow-xs bg-espresso/5">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="mt-5">
                  <p className="text-xs uppercase tracking-widest text-ink font-semibold">
                    {s.number} · {s.date}
                  </p>
                  <h3 className="mt-3 font-display text-2xl leading-tight text-espresso group-hover:text-ink transition-colors">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-base font-semibold text-cocoa">{s.topic}</p>
                  <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </div>
              <div className="mt-5 pt-3">
                <a
                  href={s.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost inline-flex"
                >
                  Watch recap on YouTube →
                </a>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* PHOTO ARCHIVE / MOMENTS GALLERY */}
      <Section className="border-t border-border/40 bg-latte/30">
        <div className="mb-12 flex items-end justify-between gap-6 flex-wrap">
          <div>
            <Eyebrow>Photo Archive</Eyebrow>
            <h2 className="mt-4 font-display text-4xl text-espresso md:text-5xl">
              Moments behind the sessions.
            </h2>
          </div>
          <p className="max-w-md text-base text-muted-foreground leading-relaxed">
            From stage presentations and participant accreditation to cupping tables and community conversations at The HUB Addis.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {eventGallery.map((item) => (
            <div key={item.id} className="group overflow-hidden rounded-md border border-border bg-card shadow-xs">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-espresso/5">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                <p className="font-display text-lg text-espresso leading-snug">{item.title}</p>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-espresso text-cream text-center">
        <Eyebrow><span className="!text-cream/70">Get notified</span></Eyebrow>
        <h2 className="mt-6 text-4xl md:text-5xl text-cream max-w-2xl mx-auto font-display">
          Never miss a session. Join the community.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/membership"
            className="inline-flex rounded-full bg-cream px-6 py-3 text-sm font-medium text-espresso hover:bg-cream/90 transition shadow-xs"
          >
            Become a member
          </Link>
          <Link
            href="/upcoming-session"
            className="inline-flex rounded-full border border-cream/40 px-6 py-3 text-sm text-cream hover:bg-cream hover:text-espresso transition"
          >
            Register for next session
          </Link>
        </div>
      </Section>
    </>
  );
}
