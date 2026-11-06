'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PageHero, Section, Field, Eyebrow, inputClass } from '@/components/ui-bits';

const benefits = [
  { t: "All 12 monthly sessions", d: "Priority reserved seat at every Seed To Cup gathering across the year." },
  { t: "Learn from professionals", d: "Q graders, master roasters, café founders and specialty coffee educators." },
  { t: "Real networking", d: "A curated community of enthusiasts, café owners, roasters and industry leaders." },
  { t: "Priority access", d: "First-in-line invites to special tastings, origin trips and members-only workshops." },
  { t: "Community updates", d: "A private monthly dispatch with tasting notes, industry news and member spotlights." },
  { t: "Consultation discount", d: "15% off any Seed To Cup coffee consultation booked during your membership year." },
];

export default function MembershipPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    profession: '',
    reason: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/register/membership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit membership application');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Annual Membership"
        title={<>Join the <em className="italic text-ink">Seed To Cup</em> coffee community.</>}
        intro="One membership grants access to all twelve monthly sessions and the people who make them worth attending."
      />

      {/* Pricing & Application */}
      <Section>
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] items-start">
          <div className="rounded-md border border-espresso bg-espresso text-cream p-10 md:p-14 shadow-md">
            <Eyebrow><span className="!text-cream/70">Annual Member</span></Eyebrow>
            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-7xl md:text-8xl text-cream">15,000</span>
              <span className="font-display text-2xl text-cream/70">ETB / year</span>
            </div>
            <p className="mt-3 text-cream/60 text-sm">Pricing placeholder · save vs. per-session</p>
            <ul className="mt-10 space-y-4">
              {benefits.map((b) => (
                <li key={b.t} className="flex gap-4 border-b border-cream/10 pb-4">
                  <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-cream" />
                  <div>
                    <p className="font-semibold text-lg text-cream">{b.t}</p>
                    <p className="text-base text-cream/80 leading-relaxed mt-1">{b.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-md border border-border bg-card p-8 md:p-10 md:sticky md:top-28 shadow-xs">
            {submitted ? (
              <div className="py-10 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-ink text-cream text-xl font-bold">
                  ✓
                </div>
                <h3 className="mt-6 text-3xl font-display text-espresso">Welcome to the circle.</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Your annual membership application has been received. Our team will review your application and send your member credentials.
                </p>
                <p className="mt-6 text-xs text-muted-foreground">Status: Pending Verification · 15,000 ETB / year</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Eyebrow>Apply</Eyebrow>
                  <h3 className="mt-4 font-display text-3xl text-espresso">Become a member</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Limited memberships available per annual cycle.</p>
                </div>

                {error && (
                  <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded">
                    {error}
                  </div>
                )}

                <Field label="Full name">
                  <input
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={inputClass}
                    placeholder="Your full name"
                  />
                </Field>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Email">
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={inputClass}
                      placeholder="you@email.com"
                    />
                  </Field>
                  <Field label="Phone">
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={inputClass}
                      placeholder="+251 ..."
                    />
                  </Field>
                </div>
                <Field label="Profession / Business">
                  <input
                    value={formData.profession}
                    onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                    className={inputClass}
                    placeholder="e.g. Roaster, Founder, Enthusiast"
                  />
                </Field>
                <Field label="Why are you joining?">
                  <textarea
                    rows={3}
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    className={inputClass}
                    placeholder="Tell us a little about your coffee background and interest"
                  />
                </Field>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center disabled:opacity-50"
                >
                  {loading ? 'Submitting application...' : 'Submit membership application →'}
                </button>
                <p className="text-center text-xs text-muted-foreground">
                  Applications are reviewed and approved by Cashmere Events.
                </p>
              </form>
            )}
          </div>
        </div>
      </Section>

      {/* MEMBERSHIP EXPERIENCE GALLERY */}
      <Section className="border-t border-border/40 bg-latte/30">
        <div className="mb-12 flex items-end justify-between gap-6 flex-wrap">
          <div>
            <Eyebrow>Community Perks</Eyebrow>
            <h2 className="mt-4 font-display text-4xl text-espresso md:text-5xl">
              What it looks like to belong.
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
            Reserved seating, official Seed To Cup accreditation badges, priority cupping privileges, and an invaluable network across Addis Ababa's coffee sector.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="group overflow-hidden rounded-md border border-border bg-card shadow-xs">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/images/events/IMG_3948.jpg"
                alt="Official Seed To Cup member badges"
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-6">
              <p className="font-display text-xl text-espresso">Official Member Accreditation</p>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Personalized Seed To Cup credentials and member badges at every gathering.
              </p>
            </div>
          </div>

          <div className="group overflow-hidden rounded-md border border-border bg-card shadow-xs">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/images/events/IMG_3971.jpg"
                alt="Community networking at high-top tables"
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-6">
              <p className="font-display text-xl text-espresso">Curated Networking</p>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Connect with café founders, exporters, baristas, and coffee leaders in a focused environment.
              </p>
            </div>
          </div>

          <div className="group overflow-hidden rounded-md border border-border bg-card shadow-xs">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/images/events/IMG_4004.jpg"
                alt="Full house audience at Seed To Cup"
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-6">
              <p className="font-display text-xl text-espresso">Guaranteed Reserved Seat</p>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Never worry about sold-out sessions — your seat is held across all 12 events.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
