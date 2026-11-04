'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PageHero, Section, Eyebrow } from '@/components/ui-bits';
import { upcomingSession } from '@/lib/sessions-data';

export default function UpcomingSessionPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    business: '',
    paymentMethod: 'Telebirr',
    amountSent: '900',
    transactionRef: '',
  });

  const [screenshotData, setScreenshotData] = useState<string>('');
  const [screenshotName, setScreenshotName] = useState<string>('');
  const [agreed, setAgreed] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('Screenshot file is larger than the 5MB maximum limit.');
      return;
    }

    setScreenshotName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      setScreenshotData(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCopyNumber = () => {
    navigator.clipboard.writeText('+251983344761');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setError('Please check the confirmation box to complete registration.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/register/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          telebirrNumber: '+251 98 334 4761',
          paymentScreenshot: screenshotData || undefined,
          screenshotName: screenshotName || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit registration');
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
        eyebrow={`${upcomingSession.number} · Registration open`}
        title={<><em className="italic text-ink">The Art</em> of Ethiopian Naturals</>}
        intro={upcomingSession.description}
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.25fr] items-start">
          {/* Left Column: Session Details */}
          <div>
            <div className="relative mb-8 aspect-[16/10] w-full overflow-hidden rounded-md shadow-xs bg-espresso/5">
              <Image
                src={upcomingSession.image}
                alt="Seed To Cup live stage session"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <div className="absolute bottom-3 left-3 rounded bg-espresso/80 px-3 py-1 text-xs text-cream backdrop-blur-xs">
                The HUB Addis · Organized by Cashmere Events
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-8 border-b border-border pb-10">
              <div>
                <dt className="eyebrow !text-espresso/60">Date</dt>
                <dd className="mt-2 font-display text-xl text-espresso">{upcomingSession.date}</dd>
              </div>
              <div>
                <dt className="eyebrow !text-espresso/60">Time</dt>
                <dd className="mt-2 font-display text-xl text-espresso">{upcomingSession.time}</dd>
              </div>
              <div className="col-span-2">
                <dt className="eyebrow !text-espresso/60">Venue</dt>
                <dd className="mt-2 font-display text-xl text-espresso">{upcomingSession.venue}</dd>
              </div>
              <div className="col-span-2">
                <dt className="eyebrow !text-espresso/60">Topic</dt>
                <dd className="mt-2 font-display text-xl text-espresso">{upcomingSession.topic}</dd>
              </div>
            </dl>

            <div className="mt-10">
              <Eyebrow>Speaker</Eyebrow>
              <p className="mt-4 font-display text-3xl md:text-4xl text-espresso">{upcomingSession.speaker.name}</p>
              <p className="text-base font-semibold text-ink">{upcomingSession.speaker.role}</p>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{upcomingSession.speaker.bio}</p>
            </div>

            <div className="mt-10">
              <Eyebrow>What you'll learn</Eyebrow>
              <ul className="mt-4 space-y-3">
                {upcomingSession.learn.map((l) => (
                  <li key={l} className="flex gap-3 text-lg text-espresso">
                    <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-ink" />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Telebirr Payment Flow & Registration Form */}
          <div className="space-y-6">
            {submitted ? (
              <div className="rounded-2xl border border-border bg-card p-8 md:p-12 text-center shadow-md animate-fade-in-up">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#2B4C94] text-white text-2xl font-bold shadow-md">
                  ✓
                </div>
                <h3 className="mt-6 text-3xl font-display text-espresso">Payment & Registration Received.</h3>
                <p className="mt-3 text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
                  Thank you, <strong className="text-espresso">{formData.fullName}</strong>. Your payment proof for{' '}
                  <strong className="text-espresso">{formData.amountSent || '900'} ETB</strong> via Telebirr has been logged into the system.
                </p>

                <div className="mt-6 inline-block rounded-xl border border-border bg-latte/50 px-6 py-4 text-left space-y-1 text-sm">
                  <p><span className="text-muted-foreground">Attendee:</span> <strong className="text-espresso">{formData.fullName}</strong></p>
                  <p><span className="text-muted-foreground">Phone:</span> <strong className="text-espresso">{formData.phone}</strong></p>
                  <p><span className="text-muted-foreground">Email:</span> <strong className="text-espresso">{formData.email}</strong></p>
                  <p><span className="text-muted-foreground">Payment Method:</span> <strong className="text-[#2B4C94]">Telebirr (+251 98 334 4761)</strong></p>
                  {formData.transactionRef && (
                    <p><span className="text-muted-foreground">Transaction Ref:</span> <code className="font-mono text-xs bg-card px-2 py-0.5 rounded uppercase font-bold text-[#2B4C94]">{formData.transactionRef}</code></p>
                  )}
                  {screenshotName && (
                    <p><span className="text-muted-foreground">Screenshot:</span> <span className="text-xs text-[#2B4C94] underline">{screenshotName}</span></p>
                  )}
                  <p className="pt-1.5 border-t border-border/60 text-xs text-emerald-800 font-semibold flex items-center gap-1.5">
                    <span>🛡️ Receipt logged for Verify.ET cross-check</span>
                  </p>
                </div>

                <p className="mt-6 text-xs text-muted-foreground">
                  Status: Pending Badge Accreditation · Venue: {upcomingSession.venue}
                </p>
              </div>
            ) : (
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 md:p-10 shadow-lg text-espresso">
                {/* Header & Step Tag */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="h-[2px] w-6 bg-[#2B4C94]" />
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#2B4C94]">
                      REGISTER & ACCREDITATION
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#2B4C94] bg-[#2B4C94]/10 border border-[#2B4C94]/20 px-3 py-1 rounded-full">
                    Fee: 900 ETB
                  </span>
                </div>

                <h3 className="font-display text-3xl md:text-4xl text-espresso font-semibold">
                  Reserve your seat
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Limited to 40 attendees · Payment via Telebirr ·{' '}
                  <Link href="/register" className="text-[#2B4C94] font-semibold hover:underline">
                    Or choose Membership / Consultation →
                  </Link>
                </p>

                {/* Telebirr Instructions Banner styled in Logo Blue & White */}
                <div className="my-6 rounded-xl border border-[#2B4C94]/20 bg-[#F4F7FC] p-4 sm:p-5 text-espresso flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#2B4C94] animate-pulse" />
                      <span className="font-bold text-espresso text-sm uppercase tracking-wider">Telebirr Account:</span>
                      <span className="font-mono font-bold text-[#2B4C94] text-lg tracking-wide">+251 98 334 4761</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                      Account: <strong className="text-espresso">Seed To Cup / Cashmere Events</strong> · Transfer <strong className="text-espresso">900 ETB</strong> and attach screenshot below.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyNumber}
                    className="rounded-lg bg-[#2B4C94] hover:bg-[#203a73] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shrink-0 shadow-xs transition cursor-pointer"
                  >
                    {copied ? 'Copied ✓' : 'Copy Number'}
                  </button>
                </div>

                {error && (
                  <div className="mb-5 p-3.5 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Row 1: Full Name & Phone Number */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-espresso mb-1.5">
                        FULL NAME
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Your full name"
                        className="w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-3 text-base text-espresso placeholder-neutral-400 focus:border-[#2B4C94] focus:ring-2 focus:ring-[#2B4C94]/20 focus:outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-espresso mb-1.5">
                        PHONE NUMBER
                      </label>
                      <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="09... or 07..."
                        className="w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-3 text-base text-espresso placeholder-neutral-400 focus:border-[#2B4C94] focus:ring-2 focus:ring-[#2B4C94]/20 focus:outline-none transition"
                      />
                      <span className="mt-1 block text-xs text-muted-foreground">09_ or 07_ (Telebirr registered number)</span>
                    </div>
                  </div>

                  {/* Row 2: Email Address & Business (Optional) */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-espresso mb-1.5">
                        EMAIL ADDRESS
                      </label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@email.com"
                        className="w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-3 text-base text-espresso placeholder-neutral-400 focus:border-[#2B4C94] focus:ring-2 focus:ring-[#2B4C94]/20 focus:outline-none transition"
                      />
                      <span className="mt-1 block text-xs text-muted-foreground">Your session accreditation & confirmation are sent here</span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-espresso mb-1.5">
                        BUSINESS (OPTIONAL)
                      </label>
                      <input
                        type="text"
                        value={formData.business}
                        onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                        placeholder="Business or café name (optional)"
                        className="w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-3 text-base text-espresso placeholder-neutral-400 focus:border-[#2B4C94] focus:ring-2 focus:ring-[#2B4C94]/20 focus:outline-none transition"
                      />
                    </div>
                  </div>

                  {/* Row 3: How Did You Pay? & Amount You Sent (ETB) */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-espresso mb-1.5">
                        HOW DID YOU PAY?
                      </label>
                      <div className="relative">
                        <select
                          value={formData.paymentMethod}
                          onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                          className="w-full appearance-none rounded-lg border border-neutral-300 bg-white px-3.5 py-3 text-base text-espresso focus:border-[#2B4C94] focus:ring-2 focus:ring-[#2B4C94]/20 focus:outline-none transition font-medium"
                        >
                          <option value="Telebirr">Telebirr</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-neutral-500">
                          ▼
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-espresso mb-1.5">
                        AMOUNT YOU SENT (ETB)
                      </label>
                      <input
                        required
                        type="number"
                        value={formData.amountSent}
                        onChange={(e) => setFormData({ ...formData, amountSent: e.target.value })}
                        placeholder="900"
                        className="w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-3 text-base text-espresso placeholder-neutral-400 focus:border-[#2B4C94] focus:ring-2 focus:ring-[#2B4C94]/20 focus:outline-none transition font-medium"
                      />
                    </div>
                  </div>

                  {/* Row 4: Transaction Reference */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-espresso mb-1.5">
                      TRANSACTION REFERENCE
                    </label>
                    <input
                      type="text"
                      value={formData.transactionRef}
                      onChange={(e) => setFormData({ ...formData, transactionRef: e.target.value })}
                      placeholder="e.g. 10-digit transaction ID (from Telebirr SMS/SuperApp)"
                      className="w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-3 text-base text-espresso placeholder-neutral-400 focus:border-[#2B4C94] focus:ring-2 focus:ring-[#2B4C94]/20 focus:outline-none transition uppercase"
                    />
                    <div className="mt-1.5 flex items-center justify-between text-xs text-muted-foreground flex-wrap gap-1">
                      <span>Found on your Telebirr confirmation SMS or SuperApp receipt</span>
                      <span className="inline-flex items-center gap-1 font-semibold text-[#2B4C94]">
                        🛡️ Powered by Verify.ET fraud protection
                      </span>
                    </div>
                  </div>

                  {/* Row 5: Payment Screenshot */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-espresso mb-1.5">
                      PAYMENT SCREENSHOT
                    </label>
                    <div className="flex items-center gap-3 rounded-lg border border-neutral-300 bg-neutral-50 p-2.5">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="rounded-lg bg-[#2B4C94] hover:bg-[#203a73] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition shrink-0 cursor-pointer"
                      >
                        CHOOSE FILE
                      </button>
                      <span className="text-sm text-neutral-600 truncate">
                        {screenshotName ? screenshotName : 'No file chosen'}
                      </span>
                      {screenshotData && (
                        <button
                          type="button"
                          onClick={() => {
                            setScreenshotName('');
                            setScreenshotData('');
                            if (fileInputRef.current) fileInputRef.current.value = '';
                          }}
                          className="ml-auto text-xs font-semibold text-red-600 hover:text-red-700 px-2 py-1"
                        >
                          Clear ✕
                        </button>
                      )}
                    </div>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      JPG, PNG or PDF · 5MB maximum
                    </span>

                    {screenshotData && screenshotData.startsWith('data:image') && (
                      <div className="mt-3 relative w-36 h-24 rounded-lg border border-neutral-300 overflow-hidden bg-neutral-100 shadow-xs">
                        <img src={screenshotData} alt="Receipt preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  {/* Row 6: Agreement Checkbox */}
                  <div className="flex items-start gap-3 pt-2">
                    <input
                      required
                      id="agree-checkbox"
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-neutral-300 text-[#2B4C94] focus:ring-[#2B4C94] cursor-pointer"
                    />
                    <label htmlFor="agree-checkbox" className="text-xs text-neutral-600 cursor-pointer leading-relaxed">
                      I understand my seat reservation is confirmed once the {formData.amountSent || '900'} ETB Telebirr transfer has been verified.
                    </label>
                  </div>

                  {/* Submit Button styled in Logo Blue */}
                  <button
                    type="submit"
                    disabled={loading || !agreed}
                    className="w-full rounded-lg bg-[#2B4C94] hover:bg-[#203a73] text-white font-display text-lg md:text-xl font-bold py-4 px-6 shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? (
                      <span>Submitting registration & screenshot...</span>
                    ) : (
                      <span>Complete Registration & Send Screenshot →</span>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* WHAT TO EXPECT - REAL EVENT ATMOSPHERE */}
      <Section className="border-t border-border/40 bg-latte/30">
        <div className="mb-12">
          <Eyebrow>The Experience</Eyebrow>
          <h2 className="mt-4 font-display text-4xl text-espresso md:text-5xl">
            What to expect in the room.
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Every session brings together education, interactive cupping, and meaningful community networking.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="overflow-hidden rounded-md border border-border bg-card shadow-xs">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/images/events/IMG_3876.jpg"
                alt="Expert lecture and presentation"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-6">
              <p className="font-display text-xl text-espresso">Deep Technical Insights</p>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Direct knowledge from agronomy specialists, Q graders, and coffee entrepreneurs on stage.
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-md border border-border bg-card shadow-xs">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/images/events/IMG_3938.jpg"
                alt="Tasting and cupping bar"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-6">
              <p className="font-display text-xl text-espresso">Live Cupping & Tasting</p>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Taste fresh single-origin brews, explore regional notes, and calibrate your sensory palate.
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-md border border-border bg-card shadow-xs">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/images/events/IMG_3971.jpg"
                alt="Community networking"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-6">
              <p className="font-display text-xl text-espresso">Genuine Community</p>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Meet café founders, baristas, exporters, and fellow coffee lovers in an open, welcoming atmosphere.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
