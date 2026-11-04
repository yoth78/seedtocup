import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, Section, Field, Eyebrow, inputClass } from "@/components/ui-bits";
import { consultationTopics } from "@/lib/sessions-data";

export const Route = createFileRoute("/consultation")({
  head: () => ({
    meta: [
      { title: "Coffee Consultation — Seed To Cup" },
      { name: "description", content: "Expert coffee consultation for café owners, roasters, and coffee entrepreneurs. 30-minute sessions from 1,000 ETB." },
      { property: "og:title", content: "Expert Coffee Consultation — Seed To Cup" },
      { property: "og:description", content: "Guidance tailored to your coffee business — from concept to cup." },
      { property: "og:url", content: "/consultation" },
    ],
    links: [{ rel: "canonical", href: "/consultation" }],
  }),
  component: Consult,
});

function Consult() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="One-to-one · 30 minutes"
        title={<><em className="italic text-ink">Expert</em> Coffee Consultation.</>}
        intro="Whether you're opening a coffee shop, sourcing coffee, improving your roasting process, or exploring opportunities in the industry — Seed To Cup provides guidance tailored to your needs."
      />

      <Section>
        <div className="grid gap-16 md:grid-cols-[1fr_1.1fr]">
          <div>
            <Eyebrow>What we consult on</Eyebrow>
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {consultationTopics.map((t, i) => (
                <li key={t} className="flex items-center justify-between gap-6 py-5">
                  <span className="font-display text-2xl">{t}</span>
                  <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                </li>
              ))}
            </ul>

            <div className="mt-12 rounded-md border border-border bg-latte/50 p-8">
              <Eyebrow>Pricing</Eyebrow>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-display text-6xl">1,000</span>
                <span className="font-display text-xl text-muted-foreground">ETB · 30 min</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Extended sessions and packages available on request. Members enjoy 15% off.
              </p>
            </div>
          </div>

          <div className="rounded-md border border-border bg-card p-8 md:p-10 md:sticky md:top-28 self-start">
            {submitted ? (
              <div className="py-10 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-ink text-cream">✓</div>
                <h3 className="mt-6 text-3xl">Booking received.</h3>
                <p className="mt-3 text-muted-foreground">We'll confirm your consultation slot within 24 hours and send a payment link.</p>
                <p className="mt-6 text-xs text-muted-foreground">[ Calendar & payment placeholder ]</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
                <Eyebrow>Book</Eyebrow>
                <h3 className="font-display text-3xl">Reserve your consultation</h3>
                <Field label="Full name"><input required className={inputClass} /></Field>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Email"><input required type="email" className={inputClass} /></Field>
                  <Field label="Phone"><input required type="tel" className={inputClass} /></Field>
                </div>
                <Field label="Consultation topic">
                  <select required defaultValue="" className={inputClass}>
                    <option value="" disabled>Choose a topic</option>
                    {consultationTopics.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </Field>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Preferred date"><input required type="date" className={inputClass} /></Field>
                  <Field label="Preferred time"><input required type="time" className={inputClass} /></Field>
                </div>
                <Field label="Brief description">
                  <textarea rows={3} className={inputClass} placeholder="Share a little about your business or question" />
                </Field>
                <button type="submit" className="btn-primary w-full">Request booking →</button>
                <p className="text-center text-xs text-muted-foreground">[ Payment placeholder · 1,000 ETB ]</p>
              </form>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
