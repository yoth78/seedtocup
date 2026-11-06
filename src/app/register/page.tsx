'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { PageHero, Section, Eyebrow } from '@/components/ui-bits';
import { upcomingSession as defaultUpcoming } from '@/lib/sessions-data';

export type RegistrationType = 'event' | 'membership' | 'consultation';

function RegisterFormContent() {
  const searchParams = useSearchParams();
  const initialType = (searchParams.get('type') as RegistrationType) || 'event';

  const [regType, setRegType] = useState<RegistrationType>(initialType);
  const [storeData, setStoreData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // Common Form Fields
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    business: '',
    profession: '',
    // Event specific
    interestCategory: 'Coffee enthusiast',
    transactionRef: '',
    // Membership specific
    reason: '',
    // Consultation specific
    topic: 'Café Concept, Feasibility & Setup',
    preferredDate: '',
    preferredTime: 'Morning (9:00 AM – 12:00 PM)',
    consultationDescription: '',
  });

  const [screenshotData, setScreenshotData] = useState<string>('');
  const [screenshotName, setScreenshotName] = useState<string>('');
  const [agreed, setAgreed] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load current store data (session details, fee)
  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then((d) => setStoreData(d))
      .catch(() => {});
  }, []);

  // Update type from URL if changed
  useEffect(() => {
    const t = searchParams.get('type') as RegistrationType;
    if (t && (t === 'event' || t === 'membership' || t === 'consultation')) {
      setRegType(t);
    }
  }, [searchParams]);

  const activeSession = storeData?.upcomingSession || defaultUpcoming;
  const membershipFee = storeData?.settings?.annualMembershipFee || '15,000 ETB';
  const consultationFee = storeData?.settings?.consultationFee || '1,000 ETB';
  const eventFee = '900 ETB';

  const currentFee =
    regType === 'event' ? eventFee : regType === 'membership' ? membershipFee : consultationFee;

  const handleCopyNumber = () => {
    navigator.clipboard.writeText('+251983344761');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setError('Please check the confirmation box to proceed.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      let endpoint = '/api/register/event';
      let payload: any = {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        business: formData.business,
        profession: formData.profession,
        paymentMethod: 'Telebirr',
        amountSent: currentFee.replace(/\D/g, '') || '900',
        transactionRef: formData.transactionRef,
        paymentScreenshot: screenshotData || undefined,
        screenshotName: screenshotName || undefined,
      };

      if (regType === 'event') {
        endpoint = '/api/register/event';
        payload.interestCategory = formData.interestCategory;
      } else if (regType === 'membership') {
        endpoint = '/api/register/membership';
        payload.reason = formData.reason;
      } else if (regType === 'consultation') {
        endpoint = '/api/register/consultation';
        payload.topic = formData.topic;
        payload.preferredDate = formData.preferredDate;
        payload.preferredTime = formData.preferredTime;
        payload.description = formData.consultationDescription;
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit registration');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Accreditation & Booking"
        title={
          <>
            Registration & <em className="italic text-ink">Accreditation</em>
          </>
        }
        intro="Choose your registration type below: reserve a seat for our upcoming session, apply for annual membership, or schedule an expert one-on-one coffee consultation."
      />

      <Section>
        <div className="mx-auto max-w-4xl">
          {/* REGISTRATION TYPE SELECTOR */}
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
              SELECT WHAT YOU ARE REGISTERING FOR:
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {/* Option 1: Event Session */}
              <button
                type="button"
                onClick={() => {
                  setRegType('event');
                  setSubmitted(false);
                  setError('');
                }}
                className={`rounded-2xl border p-5 text-left transition cursor-pointer flex flex-col justify-between ${
                  regType === 'event'
                    ? 'border-[#2B4C94] bg-[#F4F7FC] shadow-md ring-2 ring-[#2B4C94]/20'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">🎟️</span>
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                        regType === 'event'
                          ? 'bg-[#2B4C94] text-white'
                          : 'bg-neutral-100 text-neutral-600'
                      }`}
                    >
                      {eventFee}
                    </span>
                  </div>
                  <h4 className="font-display text-lg font-bold text-espresso leading-snug">
                    Next Event Session
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {activeSession.title} ({activeSession.number})
                  </p>
                </div>
                <p className="text-[11px] font-bold text-[#2B4C94] mt-3 uppercase tracking-wider">
                  {regType === 'event' ? 'Selected ✓' : 'Select Session →'}
                </p>
              </button>

              {/* Option 2: Membership */}
              <button
                type="button"
                onClick={() => {
                  setRegType('membership');
                  setSubmitted(false);
                  setError('');
                }}
                className={`rounded-2xl border p-5 text-left transition cursor-pointer flex flex-col justify-between ${
                  regType === 'membership'
                    ? 'border-[#2B4C94] bg-[#F4F7FC] shadow-md ring-2 ring-[#2B4C94]/20'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">👥</span>
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                        regType === 'membership'
                          ? 'bg-[#2B4C94] text-white'
                          : 'bg-neutral-100 text-neutral-600'
                      }`}
                    >
                      {membershipFee}
                    </span>
                  </div>
                  <h4 className="font-display text-lg font-bold text-espresso leading-snug">
                    Annual Membership
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    Access to all 12 monthly sessions & official accreditation badge.
                  </p>
                </div>
                <p className="text-[11px] font-bold text-[#2B4C94] mt-3 uppercase tracking-wider">
                  {regType === 'membership' ? 'Selected ✓' : 'Select Membership →'}
                </p>
              </button>

              {/* Option 3: Consultation */}
              <button
                type="button"
                onClick={() => {
                  setRegType('consultation');
                  setSubmitted(false);
                  setError('');
                }}
                className={`rounded-2xl border p-5 text-left transition cursor-pointer flex flex-col justify-between ${
                  regType === 'consultation'
                    ? 'border-[#2B4C94] bg-[#F4F7FC] shadow-md ring-2 ring-[#2B4C94]/20'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">☕</span>
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                        regType === 'consultation'
                          ? 'bg-[#2B4C94] text-white'
                          : 'bg-neutral-100 text-neutral-600'
                      }`}
                    >
                      {consultationFee}
                    </span>
                  </div>
                  <h4 className="font-display text-lg font-bold text-espresso leading-snug">
                    Coffee Consultation
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    30-minute tailored advisory on sourcing, café setup, roasting or cupping.
                  </p>
                </div>
                <p className="text-[11px] font-bold text-[#2B4C94] mt-3 uppercase tracking-wider">
                  {regType === 'consultation' ? 'Selected ✓' : 'Select Consultation →'}
                </p>
              </button>
            </div>
          </div>

          {/* FORM CONTAINER (Clean Blue, White, Black Design) */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 md:p-10 shadow-lg text-espresso">
            {submitted ? (
              <div className="py-10 text-center animate-fade-in-up">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#2B4C94] text-white text-3xl font-bold shadow-md">
                  ✓
                </div>
                <h3 className="mt-6 text-3xl md:text-4xl font-display font-bold text-espresso">
                  Registration Received.
                </h3>
                <p className="mt-3 text-base text-muted-foreground leading-relaxed max-w-lg mx-auto">
                  Thank you, <strong className="text-espresso">{formData.fullName}</strong>. Your{' '}
                  <strong className="text-espresso">
                    {regType === 'event'
                      ? 'session seat reservation'
                      : regType === 'membership'
                      ? 'annual membership application'
                      : 'coffee consultation booking'}
                  </strong>{' '}
                  for <strong className="text-espresso">{currentFee}</strong> has been logged into the system.
                </p>

                <div className="mt-6 inline-block rounded-xl border border-neutral-200 bg-neutral-50 px-6 py-4 text-left space-y-1.5 text-sm max-w-md w-full">
                  <p><span className="text-muted-foreground">Type:</span> <strong className="text-espresso capitalize">{regType} Registration</strong></p>
                  <p><span className="text-muted-foreground">Name:</span> <strong className="text-espresso">{formData.fullName}</strong></p>
                  <p><span className="text-muted-foreground">Phone:</span> <strong className="text-espresso font-mono">{formData.phone}</strong></p>
                  <p><span className="text-muted-foreground">Email:</span> <strong className="text-espresso">{formData.email}</strong></p>
                  <p><span className="text-muted-foreground">Payment:</span> <strong className="text-[#2B4C94]">Telebirr (+251 98 334 4761)</strong></p>
                  {formData.transactionRef && (
                    <p><span className="text-muted-foreground">Ref Code:</span> <code className="font-mono text-xs bg-white border border-neutral-300 px-2 py-0.5 rounded uppercase font-bold text-[#2B4C94]">{formData.transactionRef}</code></p>
                  )}
                  {screenshotName && (
                    <p><span className="text-muted-foreground">Screenshot:</span> <span className="text-xs text-[#2B4C94] underline">{screenshotName}</span></p>
                  )}
                  <p className="pt-2 border-t border-neutral-200 text-xs text-emerald-800 font-semibold">
                    🛡️ Verified via Telebirr & Verify.ET anti-fraud protection
                  </p>
                </div>

                <div className="mt-8 flex justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        phone: '',
                        email: '',
                        business: '',
                        profession: '',
                        interestCategory: 'Coffee enthusiast',
                        transactionRef: '',
                        reason: '',
                        topic: 'Café Concept, Feasibility & Setup',
                        preferredDate: '',
                        preferredTime: 'Morning (9:00 AM – 12:00 PM)',
                        consultationDescription: '',
                      });
                      setScreenshotData('');
                      setScreenshotName('');
                    }}
                    className="rounded-lg border border-neutral-300 bg-white px-5 py-2.5 text-sm font-bold text-espresso hover:bg-neutral-100 transition"
                  >
                    Register Another Person
                  </button>
                  <Link href="/" className="btn-primary text-sm !py-2.5 !px-6">
                    Return to Home →
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Header Tag */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-[2px] w-6 bg-[#2B4C94]" />
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#2B4C94]">
                      {regType === 'event'
                        ? 'EVENT ACCREDITATION'
                        : regType === 'membership'
                        ? 'MEMBERSHIP APPLICATION'
                        : 'CONSULTATION BOOKING'}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#2B4C94] bg-[#2B4C94]/10 border border-[#2B4C94]/20 px-3 py-1 rounded-full">
                    Fee: {currentFee}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-3xl md:text-4xl font-bold text-espresso">
                    {regType === 'event' && 'Reserve your seat'}
                    {regType === 'membership' && 'Apply for annual membership'}
                    {regType === 'consultation' && 'Book an expert consultation'}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {regType === 'event' && `Session: ${activeSession.title} · Limited seats`}
                    {regType === 'membership' && '12 months of curated coffee sessions, badges & networking'}
                    {regType === 'consultation' && '30-minute tailored session tailored to your coffee business'}
                  </p>
                </div>

                {/* Telebirr Payment Instructions Box */}
                <div className="rounded-xl border border-[#2B4C94]/20 bg-[#F4F7FC] p-4 sm:p-5 text-espresso flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#2B4C94] animate-pulse" />
                      <span className="font-bold text-espresso text-sm uppercase tracking-wider">Telebirr Account:</span>
                      <span className="font-mono font-bold text-[#2B4C94] text-lg tracking-wide">+251 98 334 4761</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                      Account: <strong className="text-espresso">Seed To Cup / Cashmere Events</strong> · Transfer <strong className="text-espresso">{currentFee}</strong> and enter reference or attach screenshot below.
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
                  <div className="p-3.5 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                    {error}
                  </div>
                )}

                {/* Row 1: Full Name & Phone Number */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-espresso mb-1.5">
                      FULL NAME *
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
                      PHONE NUMBER *
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

                {/* Row 2: Email & Business */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-espresso mb-1.5">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@email.com"
                      className="w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-3 text-base text-espresso placeholder-neutral-400 focus:border-[#2B4C94] focus:ring-2 focus:ring-[#2B4C94]/20 focus:outline-none transition"
                    />
                    <span className="mt-1 block text-xs text-muted-foreground">Confirmation details will be sent here</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-espresso mb-1.5">
                      BUSINESS / CAFÉ (OPTIONAL)
                    </label>
                    <input
                      type="text"
                      value={formData.business}
                      onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                      placeholder="Business or café name"
                      className="w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-3 text-base text-espresso placeholder-neutral-400 focus:border-[#2B4C94] focus:ring-2 focus:ring-[#2B4C94]/20 focus:outline-none transition"
                    />
                  </div>
                </div>

                {/* CONDITIONAL FIELDS BASED ON REGISTRATION TYPE */}

                {/* 1. EVENT SPECIFIC FIELDS */}
                {regType === 'event' && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-espresso mb-1.5">
                      COFFEE INTEREST CATEGORY
                    </label>
                    <select
                      value={formData.interestCategory}
                      onChange={(e) => setFormData({ ...formData, interestCategory: e.target.value })}
                      className="w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-3 text-base text-espresso focus:border-[#2B4C94] focus:ring-2 focus:ring-[#2B4C94]/20 focus:outline-none transition"
                    >
                      <option value="Coffee enthusiast">Coffee enthusiast</option>
                      <option value="Café owner">Café owner</option>
                      <option value="Barista">Barista</option>
                      <option value="Roaster">Roaster</option>
                      <option value="Coffee trader / Exporter">Coffee trader / Exporter</option>
                      <option value="Agronomist / Producer">Agronomist / Producer</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                )}

                {/* 2. MEMBERSHIP SPECIFIC FIELDS */}
                {regType === 'membership' && (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-espresso mb-1.5">
                        PROFESSION / ROLE
                      </label>
                      <input
                        type="text"
                        value={formData.profession}
                        onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                        placeholder="e.g. Roaster, Founder, Head Barista, Cupper"
                        className="w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-3 text-base text-espresso placeholder-neutral-400 focus:border-[#2B4C94] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-espresso mb-1.5">
                        WHY ARE YOU JOINING SEED TO CUP?
                      </label>
                      <textarea
                        rows={2}
                        value={formData.reason}
                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                        placeholder="Tell us a little about your coffee background and what you hope to get out of the annual community"
                        className="w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-2.5 text-base text-espresso placeholder-neutral-400 focus:border-[#2B4C94] focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* 3. CONSULTATION SPECIFIC FIELDS */}
                {regType === 'consultation' && (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-espresso mb-1.5">
                        CONSULTATION TOPIC *
                      </label>
                      <select
                        required
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        className="w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-3 text-base text-espresso focus:border-[#2B4C94] focus:outline-none"
                      >
                        <option value="Café Concept, Feasibility & Setup">Café Concept, Feasibility & Setup</option>
                        <option value="Coffee Sourcing, Origins & Supply Chain">Coffee Sourcing, Origins & Supply Chain</option>
                        <option value="Roasting Profile Development & Equipment">Roasting Profile Development & Equipment</option>
                        <option value="Cupping, Sensory Skills & Quality Evaluation">Cupping, Sensory Skills & Quality Evaluation</option>
                        <option value="Coffee Exporting, Regulations & Logistics">Coffee Exporting, Regulations & Logistics</option>
                        <option value="Barista Training, Workflow & Menu Design">Barista Training, Workflow & Menu Design</option>
                        <option value="General Coffee Business Mentorship">General Coffee Business Mentorship</option>
                      </select>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-espresso mb-1.5">
                          PREFERRED DATE
                        </label>
                        <input
                          type="date"
                          value={formData.preferredDate}
                          onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                          className="w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-3 text-base text-espresso focus:border-[#2B4C94] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-espresso mb-1.5">
                          PREFERRED TIME WINDOW
                        </label>
                        <select
                          value={formData.preferredTime}
                          onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                          className="w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-3 text-base text-espresso focus:border-[#2B4C94] focus:outline-none"
                        >
                          <option value="Morning (9:00 AM – 12:00 PM)">Morning (9:00 AM – 12:00 PM)</option>
                          <option value="Afternoon (12:00 PM – 3:00 PM)">Afternoon (12:00 PM – 3:00 PM)</option>
                          <option value="Evening (3:00 PM – 6:00 PM)">Evening (3:00 PM – 6:00 PM)</option>
                          <option value="Flexible">Flexible</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-espresso mb-1.5">
                        WHAT WOULD YOU LIKE TO DISCUSS?
                      </label>
                      <textarea
                        rows={2}
                        value={formData.consultationDescription}
                        onChange={(e) => setFormData({ ...formData, consultationDescription: e.target.value })}
                        placeholder="Briefly describe your coffee project or key questions..."
                        className="w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-2.5 text-base text-espresso focus:border-[#2B4C94] focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* TELEBIRR REFERENCE & PROOF */}
                <div className="pt-2 border-t border-neutral-100 space-y-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-espresso mb-1.5">
                      TELEBIRR TRANSACTION REFERENCE
                    </label>
                    <input
                      type="text"
                      value={formData.transactionRef}
                      onChange={(e) => setFormData({ ...formData, transactionRef: e.target.value })}
                      placeholder="e.g. 10-digit transaction ID (from Telebirr SMS or receipt)"
                      className="w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-3 text-base text-espresso placeholder-neutral-400 focus:border-[#2B4C94] focus:ring-2 focus:ring-[#2B4C94]/20 focus:outline-none transition uppercase"
                    />
                    <div className="mt-1.5 flex items-center justify-between text-xs text-muted-foreground flex-wrap gap-1">
                      <span>Found on your Telebirr confirmation SMS or SuperApp receipt</span>
                      <span className="inline-flex items-center gap-1 font-semibold text-[#2B4C94]">
                        🛡️ Protected by Verify.ET fraud detection
                      </span>
                    </div>
                  </div>

                  {/* Screenshot upload */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-espresso mb-1.5">
                      PAYMENT RECEIPT SCREENSHOT (OPTIONAL)
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
                </div>

                {/* Agreement Checkbox */}
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
                    I confirm my payment of {currentFee} via Telebirr (+251 98 334 4761) to Seed To Cup / Cashmere Events.
                  </label>
                </div>

                {/* Submit CTA Button */}
                <button
                  type="submit"
                  disabled={loading || !agreed}
                  className="w-full rounded-lg bg-[#2B4C94] hover:bg-[#203a73] text-white font-display text-lg md:text-xl font-bold py-4 px-6 shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <span>Submitting registration & checking receipt...</span>
                  ) : (
                    <span>
                      {regType === 'event' && 'Complete Event Registration →'}
                      {regType === 'membership' && 'Submit Membership Application →'}
                      {regType === 'consultation' && 'Book Coffee Consultation →'}
                    </span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-sm text-muted-foreground">Loading registration...</div>}>
      <RegisterFormContent />
    </Suspense>
  );
}
