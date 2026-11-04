import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Eyebrow } from "@/components/ui-bits";
import { previousSessions } from "@/lib/sessions-data";

export const Route = createFileRoute("/sessions")({
  head: () => ({
    meta: [
      { title: "Sessions Archive — Seed To Cup" },
      { name: "description", content: "The full archive of Seed To Cup coffee sessions. Watch every recap on YouTube." },
      { property: "og:title", content: "Sessions Archive — Seed To Cup" },
      { property: "og:description", content: "Every session, every conversation, every cup — archived." },
      { property: "og:url", content: "/sessions" },
    ],
    links: [{ rel: "canonical", href: "/sessions" }],
  }),
  component: Sessions,
});

function Sessions() {
  return (
    <>
      <PageHero
        eyebrow="Archive"
        title={<>Every session,<br /><em className="italic text-ink">every cup</em> we've shared.</>}
        intro="Browse the complete Seed To Cup archive and revisit each conversation through our YouTube recaps."
      />

      <Section>
        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {previousSessions.map((s) => (
            <article key={s.id} className="group flex flex-col">
              <div className="aspect-[4/5] overflow-hidden rounded-md">
                <img src={s.image} alt={s.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="mt-5">
                <p className="text-xs uppercase tracking-widest text-ink">{s.number} · {s.date}</p>
                <h3 className="mt-3 font-display text-2xl leading-tight">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.topic}</p>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                <a href={s.youtubeUrl} className="btn-ghost mt-5">Watch recap on YouTube →</a>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section className="bg-espresso text-cream text-center">
        <Eyebrow><span className="!text-cream/70">Get notified</span></Eyebrow>
        <h2 className="mt-6 text-4xl md:text-5xl text-cream max-w-2xl mx-auto">
          Never miss a session. Join the community.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="/membership" className="inline-flex rounded-full bg-cream px-6 py-3 text-sm font-medium text-espresso hover:bg-cream/90 transition">Become a member</a>
          <a href="/upcoming" className="inline-flex rounded-full border border-cream/40 px-6 py-3 text-sm text-cream hover:bg-cream hover:text-espresso transition">Register for next session</a>
        </div>
      </Section>
    </>
  );
}
