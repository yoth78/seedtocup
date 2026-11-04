import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, Section, Field, Eyebrow, inputClass } from "@/components/ui-bits";

export const Route = createFileRoute("/membership")({
  head: () => ({
    meta: [
      { title: "Annual Membership — Seed To Cup" },
      { name: "description", content: "Join the Seed To Cup coffee community. One annual membership, all 12 monthly sessions, and a network of coffee minds." },
      { property: "og:title", content: "Annual Membership — Seed To Cup" },
      { property: "og:description", content: "One membership. Twelve sessions. A year inside the coffee community." },
      { property: "og:url", content: "/membership" },
    ],
    links: [{ rel: "canonical", href: "/membership" }],
  }),
  component: Membership,
});

const benefits = [
  { t: "All 12 monthly sessions", d: "Priority reserved seat at every Seed To Cup gathering across the year." },
  { t: "Learn from professionals", d: "Q graders, master roasters, café founders and specialty coffee educators." },
  { t: "Real networking", d: "A curated community of enthusiasts, café owners, roasters and industry leaders." },
  { t: "Priority access", d: "First-in-line invites to special tastings, origin trips and members-only workshops." },
  { t: "Community updates", d: "A private monthly dispatch with tasting notes, industry news and member spotlights." },
  { t: "Consultation discount", d: "15% off any Seed To Cup coffee consultation booked during your membership year." },
];

function Membership() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Annual Membership"
        title={<>Join the <em className="italic text-ink">Seed To Cup</em> coffee community.</>}
        intro="One membership grants access to all twelve monthly sessions and the people who make them worth attending."
      />

      {/* Pricing */}
      <Section>
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] items-start">
          <div className="rounded-md border border-espresso bg-espresso text-cream p-10 md:p-14">
            <Eyebrow><span className="!text-cream/70">Annual Member</span></Eyebrow>
            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-7xl md:text-8xl text-cream">15,000</span>
              <span className="font-display text-2xl text-cream/70">ETB / year</span>
            </div>
            <p className="mt-3 text-cream/60 text-sm">Pricing placeholder · save vs. per-session</p>
            <ul className="mt-10 space-y-4">
              {benefits.map((b) => (
                <li key={b.t} className="flex gap-4 border-b border-cream/10 pb-4">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cream" />
                  <div>
                    <p className="font-medium text-cream">{b.t}</p>
                    <p className="text-sm text-cream/70">{b.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-md border border-border bg-card p-8 md:p-10 md:sticky md:top-28">
            {submitted ? (
              <div className="py-10 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-ink text-cream">✓</div>
                <h3 className="mt-6 text-3xl">Welcome to the circle.</h3>
                <p className="mt-3 text-muted-foreground">Your membership confirmation and payment link are on the way to your inbox.</p>
                <p className="mt-6 text-xs text-muted-foreground">[ Payment integration placeholder ]</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
                <Eyebrow>Apply</Eyebrow>
                <h3 className="font-display text-3xl">Become a member</h3>
                <Field label="Full name"><input required className={inputClass} /></Field>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Email"><input required type="email" className={inputClass} /></Field>
                  <Field label="Phone"><input required type="tel" className={inputClass} /></Field>
                </div>
                <Field label="Profession"><input className={inputClass} /></Field>
                <Field label="Why are you joining?"><textarea rows={3} className={inputClass} placeholder="Tell us a little about your coffee interest" /></Field>
                <button type="submit" className="btn-primary w-full">Continue to payment →</button>
                <p className="text-center text-xs text-muted-foreground">[ Payment placeholder ]</p>
              </form>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
