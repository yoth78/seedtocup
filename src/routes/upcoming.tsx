import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, Section, Field, Eyebrow, inputClass } from "@/components/ui-bits";
import { interestCategories, upcomingSession } from "@/lib/sessions-data";

export const Route = createFileRoute("/upcoming")({
  head: () => ({
    meta: [
      { title: `${upcomingSession.title} — Seed To Cup` },
      { name: "description", content: upcomingSession.description },
      { property: "og:title", content: `${upcomingSession.title} — Seed To Cup` },
      { property: "og:description", content: upcomingSession.description },
      { property: "og:url", content: "/upcoming" },
    ],
    links: [{ rel: "canonical", href: "/upcoming" }],
  }),
  component: Upcoming,
});

function Upcoming() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <PageHero
        eyebrow={`${upcomingSession.number} · Registration open`}
        title={<><em className="italic text-ink">The Art</em> of Ethiopian Naturals</>}
        intro={upcomingSession.description}
      />

      <Section>
        <div className="grid gap-16 md:grid-cols-[1fr_1.1fr]">
          {/* Details */}
          <div>
            <dl className="grid grid-cols-2 gap-8 border-b border-border pb-10">
              <div><dt className="eyebrow !text-espresso/60">Date</dt><dd className="mt-2 font-display text-xl">{upcomingSession.date}</dd></div>
              <div><dt className="eyebrow !text-espresso/60">Time</dt><dd className="mt-2 font-display text-xl">{upcomingSession.time}</dd></div>
              <div className="col-span-2"><dt className="eyebrow !text-espresso/60">Venue</dt><dd className="mt-2 font-display text-xl">{upcomingSession.venue}</dd></div>
              <div className="col-span-2"><dt className="eyebrow !text-espresso/60">Topic</dt><dd className="mt-2 font-display text-xl">{upcomingSession.topic}</dd></div>
            </dl>

            <div className="mt-10">
              <Eyebrow>Speaker</Eyebrow>
              <p className="mt-4 font-display text-3xl">{upcomingSession.speaker.name}</p>
              <p className="text-sm text-ink">{upcomingSession.speaker.role}</p>
              <p className="mt-4 text-muted-foreground leading-relaxed">{upcomingSession.speaker.bio}</p>
            </div>

            <div className="mt-10">
              <Eyebrow>What you'll learn</Eyebrow>
              <ul className="mt-4 space-y-3">
                {upcomingSession.learn.map((l) => (
                  <li key={l} className="flex gap-3 text-espresso">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />{l}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-md border border-border bg-card p-8 md:p-10 sticky top-28 self-start">
            {submitted ? (
              <div className="py-10 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-ink text-cream">✓</div>
                <h3 className="mt-6 text-3xl">You're on the list.</h3>
                <p className="mt-3 text-muted-foreground">
                  Payment and confirmation details have been sent to your email.
                  We'll see you at {upcomingSession.venue}.
                </p>
                <p className="mt-6 text-xs text-muted-foreground">
                  [ Payment integration placeholder — Chapa / Stripe / Telebirr ]
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="space-y-5"
              >
                <div>
                  <Eyebrow>Register</Eyebrow>
                  <h3 className="mt-4 font-display text-3xl">Reserve your seat</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Limited to 40 attendees.</p>
                </div>

                <Field label="Full name"><input required className={inputClass} placeholder="Your full name" /></Field>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Email"><input required type="email" className={inputClass} placeholder="you@email.com" /></Field>
                  <Field label="Phone"><input required type="tel" className={inputClass} placeholder="+251 ..." /></Field>
                </div>
                <Field label="Profession / Business"><input className={inputClass} placeholder="e.g. Barista at Kaldi's" /></Field>
                <Field label="Coffee interest">
                  <select required className={inputClass} defaultValue="">
                    <option value="" disabled>Select a category</option>
                    {interestCategories.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </Field>

                <button type="submit" className="btn-primary w-full">Complete registration →</button>
                <p className="text-center text-xs text-muted-foreground">
                  You'll be redirected to secure payment · [ placeholder ]
                </p>
              </form>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
