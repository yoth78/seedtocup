'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PageHero, Section, Field, Eyebrow, inputClass } from '@/components/ui-bits';
import { consultationTopics } from '@/lib/sessions-data';

export default function ConsultationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    topic: '',
    preferredDate: '',
    preferredTime: '',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/register/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit consultation booking');
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
        eyebrow="One-to-one · 30 minutes"
        title={<><em className="italic text-ink">Expert</em> Coffee Consultation.</>}
        intro="Whether you're opening a coffee shop, sourcing coffee, improving your roasting process, or exploring opportunities in the industry — Seed To Cup provides guidance tailored to your needs."
      />

      <Section>
        <div className="grid gap-16 md:grid-cols-[1fr_1.1fr]">
          <div>
            <div className="relative mb-8 aspect-[16/10] w-full overflow-hidden rounded-md shadow-xs bg-espresso/5">
              <Image
                src="/images/events/IMG_4057.jpg"
                alt="Expert coffee consultant at Seed To Cup"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-3 left-3 rounded bg-espresso/80 px-3 py-1 text-xs text-cream backdrop-blur-xs">
                Tailored 1-on-1 Guidance · Bole, Addis Ababa & Online
              </div>
            </div>

            <Eyebrow>What we consult on</Eyebrow>
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {consultationTopics.map((t, i) => (
                <li key={t} className="flex items-center justify-between gap-6 py-5">
                  <span className="font-display text-2xl text-espresso">{t}</span>
                  <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                </li>
              ))}
            </ul>

            <div className="mt-12 rounded-md border border-border bg-latte/50 p-8">
              <Eyebrow>Pricing</Eyebrow>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-display text-6xl text-espresso">1,000</span>
                <span className="font-display text-xl text-muted-foreground">ETB · 30 min</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Extended sessions and bespoke packages available on request. Seed To Cup members enjoy 15% off all consultations.
              </p>
            </div>
          </div>

          <div className="rounded-md border border-border bg-card p-8 md:p-10 md:sticky md:top-28 self-start shadow-xs">
            {submitted ? (
              <div className="py-10 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-ink text-cream text-xl font-bold">
                  ✓
                </div>
                <h3 className="mt-6 text-3xl font-display text-espresso">Booking received.</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  We've received your consultation request. Our coffee specialist coordinator will review your needs and confirm the meeting schedule.
                </p>
                <p className="mt-6 text-xs text-muted-foreground">Status: Pending Coordinator Confirmation · 1,000 ETB</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Eyebrow>Book</Eyebrow>
                  <h3 className="mt-4 font-display text-3xl text-espresso">Reserve your consultation</h3>
                  <p className="mt-1 text-sm text-muted-foreground">One-on-one session with our senior coffee consultant.</p>
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
                <Field label="Consultation topic">
                  <select
                    required
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className={inputClass}
                  >
                    <option value="" disabled>Choose a topic</option>
                    {consultationTopics.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </Field>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Preferred date">
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Preferred time">
                    <input
                      type="time"
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className={inputClass}
                    />
                  </Field>
                </div>
                <Field label="Brief description">
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className={inputClass}
                    placeholder="Share a little about your business or specific questions"
                  />
                </Field>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center disabled:opacity-50"
                >
                  {loading ? 'Submitting request...' : 'Request booking →'}
                </button>
                <p className="text-center text-xs text-muted-foreground">
                  Consultation requests are reviewed and confirmed by Cashmere Events.
                </p>
              </form>
            )}
          </div>
        </div>
      </Section>

      {/* CONSULTATION ADVISORY SHOWCASE */}
      <Section className="border-t border-border/40 bg-latte/30">
        <div className="mb-12 flex items-end justify-between gap-6 flex-wrap">
          <div>
            <Eyebrow>Practical Expertise</Eyebrow>
            <h2 className="mt-4 font-display text-4xl text-espresso md:text-5xl">
              From agronomy to coffee bar execution.
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
            Our consultations are delivered by seasoned Ethiopian coffee professionals with hands-on experience spanning farm management, bean grading, and café operations.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-md border border-border bg-card shadow-xs">
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <Image
                src="/images/events/IMG_4011.jpg"
                alt="Agronomy and sourcing consultation"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-6">
              <p className="font-display text-2xl text-espresso">Origin, Sourcing & Agronomy</p>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Connect directly with washing stations and farmers across Yirgacheffe, Guji, Sidama, and Jimma. Optimize your green bean procurement, contract clarity, and post-harvest quality standards.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-md border border-border bg-card shadow-xs">
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <Image
                src="/images/events/IMG_3938.jpg"
                alt="Coffee bar execution and cupping"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-6">
              <p className="font-display text-2xl text-espresso">Café Concept, Brewing & Sensory</p>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Equipment selection, workflow optimization, water chemistry, extraction protocols, and staff training to ensure your espresso and filter coffee shine consistently.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
