'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  AppStoreData,
  EventRegistration,
  MembershipApplication,
  ConsultationBooking,
  Session,
  UpcomingSessionData,
} from '@/lib/store';

const ADMIN_PASSCODE = 'seedtocup2026';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  const [data, setData] = useState<AppStoreData | null>(null);
  const [loading, setLoading] = useState(true);

  // Simplified core tabs: 4 focused sections
  const [mainTab, setMainTab] = useState<'registrations' | 'upcoming' | 'archive' | 'settings'>('registrations');
  const [regCategory, setRegCategory] = useState<'events' | 'memberships' | 'consultations'>('events');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'accepted' | 'declined'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [previewScreenshot, setPreviewScreenshot] = useState<{ url: string; title: string } | null>(null);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);

  // Form states
  const [upcomingForm, setUpcomingForm] = useState<UpcomingSessionData | null>(null);
  const [newSessionForm, setNewSessionForm] = useState<Session>({
    id: '',
    number: '',
    title: '',
    date: '',
    topic: '',
    description: '',
    image: '/images/events/IMG_4004.jpg',
    youtubeUrl: 'https://youtube.com/@seedtocup_et?si=u-FwCIQngSuAsJjE',
  });
  const [showAddSessionModal, setShowAddSessionModal] = useState(false);
  const [settingsForm, setSettingsForm] = useState({
    annualMembershipFee: '',
    consultationFee: '',
    contactEmail: '',
    phone: '',
    youtubeUrl: '',
    linkedinUrl: '',
    verifyEtApiKey: '',
  });

  // Check authentication
  useEffect(() => {
    const authSaved = sessionStorage.getItem('seed_admin_auth');
    if (authSaved === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/data');
      if (!res.ok) throw new Error('Failed to load admin data');
      const json: AppStoreData = await res.json();
      setData(json);
      setUpcomingForm(json.upcomingSession);
      setSettingsForm({
        annualMembershipFee: json.settings.annualMembershipFee || '',
        consultationFee: json.settings.consultationFee || '',
        contactEmail: json.settings.contactEmail || '',
        phone: json.settings.phone || '',
        youtubeUrl: json.settings.youtubeUrl || '',
        linkedinUrl: json.settings.linkedinUrl || '',
        verifyEtApiKey: json.settings.verifyEtApiKey || '',
      });
    } catch (err) {
      console.error(err);
      showToast('Error loading store data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === ADMIN_PASSCODE) {
      sessionStorage.setItem('seed_admin_auth', 'true');
      setIsAuthenticated(true);
      setPasscodeError('');
    } else {
      setPasscodeError('Incorrect passcode. Enter: seedtocup2026');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('seed_admin_auth');
    setIsAuthenticated(false);
    setPasscode('');
  };

  // Update status (Accept / Decline)
  const handleUpdateStatus = async (
    type: 'event' | 'membership' | 'consultation',
    id: string,
    newStatus: string
  ) => {
    try {
      const res = await fetch('/api/admin/registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, id, status: newStatus, action: 'update_status' }),
      });
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || 'Failed to update status');

      showToast(`Status updated to "${newStatus}".`);
      loadData();
    } catch (err: any) {
      alert(err.message || 'Error updating status');
    }
  };

  // Verify.ET Receipt check
  const handleVerifyReceipt = async (registrationId: string, manualStatus?: string) => {
    setVerifyingId(registrationId);
    try {
      const res = await fetch('/api/admin/verify-receipt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registrationId, manualStatus }),
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || 'Receipt verification failed');

      const msg =
        resData.result?.message ||
        (manualStatus ? `Receipt marked as ${manualStatus}.` : 'Verification completed.');
      showToast(msg);
      loadData();
    } catch (err: any) {
      alert(err.message || 'Error verifying receipt');
    } finally {
      setVerifyingId(null);
    }
  };

  // Delete registration
  const handleDeleteRegistration = async (
    type: 'event' | 'membership' | 'consultation',
    id: string,
    name: string
  ) => {
    if (!confirm(`Are you sure you want to remove the registration for ${name}?`)) return;

    try {
      const res = await fetch('/api/admin/registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, id, action: 'delete' }),
      });
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || 'Failed to delete');

      showToast(`Registration for ${name} removed.`);
      loadData();
    } catch (err: any) {
      alert(err.message || 'Error deleting registration');
    }
  };

  // Save upcoming session
  const handleSaveUpcoming = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!upcomingForm) return;

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'upcomingSession',
          payload: upcomingForm,
        }),
      });
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || 'Failed to save upcoming session');

      showToast('Upcoming session saved & live on website!');
      loadData();
    } catch (err: any) {
      alert(err.message || 'Error saving session');
    }
  };

  // Save previous session to archive
  const handleAddPreviousSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSessionForm.title || !newSessionForm.number) {
      alert('Please fill out session number and title');
      return;
    }

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'addPreviousSession',
          payload: { ...newSessionForm, id: `s-${Date.now()}` },
        }),
      });
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || 'Failed to add session');

      showToast(`Session "${newSessionForm.title}" added to archive!`);
      setShowAddSessionModal(false);
      setNewSessionForm({
        id: '',
        number: '',
        title: '',
        date: '',
        topic: '',
        description: '',
        image: '/images/events/IMG_4004.jpg',
        youtubeUrl: 'https://youtube.com/@seedtocup_et?si=u-FwCIQngSuAsJjE',
      });
      loadData();
    } catch (err: any) {
      alert(err.message || 'Error adding session');
    }
  };

  // Delete previous session
  const handleDeleteSession = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete session "${title}"?`)) return;

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'deletePreviousSession',
          payload: { id },
        }),
      });
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || 'Failed to delete session');

      showToast('Session deleted from archive.');
      loadData();
    } catch (err: any) {
      alert(err.message || 'Error deleting session');
    }
  };

  // Save settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'settings',
          payload: settingsForm,
        }),
      });
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || 'Failed to save settings');

      showToast('Settings & Verify.ET configuration saved!');
      loadData();
    } catch (err: any) {
      alert(err.message || 'Error saving settings');
    }
  };

  // Login view
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-latte/30 px-4">
        <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 md:p-10 shadow-xl">
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 relative mb-3">
              <Image src="/images/logo.png" alt="Seed To Cup" fill className="object-contain" priority />
            </div>
            <h1 className="font-display text-3xl font-bold text-espresso">Seed To Cup</h1>
            <p className="text-sm font-semibold uppercase tracking-wider text-[#2B4C94] mt-1">
              Admin Control Panel
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-espresso mb-2">
                Enter Admin Passcode
              </label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Passcode: seedtocup2026"
                className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-base text-espresso focus:border-[#2B4C94] focus:ring-2 focus:ring-[#2B4C94]/20 focus:outline-none"
              />
              {passcodeError && <p className="mt-2 text-xs text-red-600 font-semibold">{passcodeError}</p>}
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-[#2B4C94] hover:bg-[#203a73] py-3.5 text-base font-bold text-white shadow-md transition"
            >
              Sign In to Admin →
            </button>

            <div className="text-center pt-2">
              <Link href="/" className="text-xs font-medium text-muted-foreground hover:text-espresso">
                ← Return to Live Website
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Counts for pending badges
  const pendingEventsCount = data?.eventRegistrations.filter((r) => r.status === 'pending').length || 0;
  const pendingMembersCount = data?.membershipApplications.filter((m) => m.status === 'pending').length || 0;
  const pendingConsultationsCount = data?.consultationBookings.filter((c) => c.status === 'pending').length || 0;
  const totalPending = pendingEventsCount + pendingMembersCount + pendingConsultationsCount;

  // Filtered registrations
  const filteredEvents = (data?.eventRegistrations || []).filter((r) => {
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      r.fullName.toLowerCase().includes(q) ||
      r.phone.includes(q) ||
      r.email.toLowerCase().includes(q) ||
      (r.transactionRef && r.transactionRef.toLowerCase().includes(q));
    return matchesStatus && matchesSearch;
  });

  const filteredMembers = (data?.membershipApplications || []).filter((m) => {
    const matchesStatus = statusFilter === 'all' || m.status === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      m.fullName.toLowerCase().includes(q) ||
      m.phone.includes(q) ||
      m.email.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const filteredConsultations = (data?.consultationBookings || []).filter((c) => {
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      c.fullName.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.topic.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-neutral-50/60 pb-24 text-espresso">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-espresso text-cream px-5 py-3 shadow-2xl border border-cream/20 flex items-center gap-3 animate-fade-in-up">
          <span className="text-emerald-400 font-bold">✓</span>
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* TOP HEADER */}
      <header className="border-b border-neutral-200 bg-white sticky top-0 z-40 shadow-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9">
              <Image src="/images/logo.png" alt="Seed To Cup" fill className="object-contain" priority />
            </div>
            <div>
              <h1 className="font-display text-xl md:text-2xl font-bold text-espresso leading-none">
                Seed To Cup
              </h1>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#2B4C94]">
                Simple Admin Dashboard
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex rounded-lg border border-neutral-300 bg-white px-4 py-2 text-xs md:text-sm font-semibold text-espresso hover:bg-neutral-100 transition shadow-2xs"
            >
              Live Site ↗
            </Link>
            <button
              onClick={handleLogout}
              className="rounded-lg bg-neutral-100 px-4 py-2 text-xs md:text-sm font-semibold text-espresso hover:bg-red-50 hover:text-red-700 transition"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* 4 MAIN NAVIGATION TABS */}
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <nav className="flex space-x-2 border-t border-neutral-100 py-2.5 overflow-x-auto">
            <button
              onClick={() => setMainTab('registrations')}
              className={`px-4 py-2 rounded-lg text-sm md:text-base font-bold transition flex items-center gap-2 cursor-pointer ${
                mainTab === 'registrations'
                  ? 'bg-[#2B4C94] text-white shadow-xs'
                  : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <span>🎟️ Registrations</span>
              {totalPending > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  mainTab === 'registrations' ? 'bg-white text-[#2B4C94]' : 'bg-amber-100 text-amber-900'
                }`}>
                  {totalPending}
                </span>
              )}
            </button>

            <button
              onClick={() => setMainTab('upcoming')}
              className={`px-4 py-2 rounded-lg text-sm md:text-base font-bold transition flex items-center gap-2 cursor-pointer ${
                mainTab === 'upcoming'
                  ? 'bg-[#2B4C94] text-white shadow-xs'
                  : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <span>📅 Edit Next Session</span>
            </button>

            <button
              onClick={() => setMainTab('archive')}
              className={`px-4 py-2 rounded-lg text-sm md:text-base font-bold transition flex items-center gap-2 cursor-pointer ${
                mainTab === 'archive'
                  ? 'bg-[#2B4C94] text-white shadow-xs'
                  : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <span>📚 Past Sessions</span>
            </button>

            <button
              onClick={() => setMainTab('settings')}
              className={`px-4 py-2 rounded-lg text-sm md:text-base font-bold transition flex items-center gap-2 cursor-pointer ${
                mainTab === 'settings'
                  ? 'bg-[#2B4C94] text-white shadow-xs'
                  : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <span>⚙️ Settings & Fees</span>
            </button>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="mx-auto max-w-7xl px-4 pt-6 md:px-8">
        {loading ? (
          <div className="py-20 text-center text-sm text-muted-foreground">
            Loading dashboard data...
          </div>
        ) : (
          <>
            {/* TAB 1: REGISTRATIONS HUB */}
            {mainTab === 'registrations' && (
              <div className="space-y-6">
                {/* Registration Sub-Category Switcher */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-neutral-200 shadow-xs">
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => setRegCategory('events')}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition cursor-pointer flex items-center gap-2 ${
                        regCategory === 'events'
                          ? 'bg-espresso text-cream'
                          : 'bg-neutral-100 text-espresso hover:bg-neutral-200'
                      }`}
                    >
                      <span>Events (Telebirr 900 ETB)</span>
                      {pendingEventsCount > 0 && (
                        <span className="rounded-full bg-amber-400 text-espresso px-2 py-0.2 text-xs font-bold">
                          {pendingEventsCount}
                        </span>
                      )}
                    </button>

                    <button
                      onClick={() => setRegCategory('memberships')}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition cursor-pointer flex items-center gap-2 ${
                        regCategory === 'memberships'
                          ? 'bg-espresso text-cream'
                          : 'bg-neutral-100 text-espresso hover:bg-neutral-200'
                      }`}
                    >
                      <span>Memberships</span>
                      {pendingMembersCount > 0 && (
                        <span className="rounded-full bg-amber-400 text-espresso px-2 py-0.2 text-xs font-bold">
                          {pendingMembersCount}
                        </span>
                      )}
                    </button>

                    <button
                      onClick={() => setRegCategory('consultations')}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition cursor-pointer flex items-center gap-2 ${
                        regCategory === 'consultations'
                          ? 'bg-espresso text-cream'
                          : 'bg-neutral-100 text-espresso hover:bg-neutral-200'
                      }`}
                    >
                      <span>Consultations</span>
                      {pendingConsultationsCount > 0 && (
                        <span className="rounded-full bg-amber-400 text-espresso px-2 py-0.2 text-xs font-bold">
                          {pendingConsultationsCount}
                        </span>
                      )}
                    </button>
                  </div>

                  {/* Search Bar */}
                  <div className="w-full sm:w-72">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search name, phone, ref..."
                      className="w-full rounded-lg border border-neutral-300 bg-neutral-50 px-3.5 py-2 text-sm text-espresso placeholder-neutral-400 focus:bg-white focus:border-[#2B4C94] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mr-1">
                    Filter:
                  </span>
                  {(['all', 'pending', 'accepted', 'declined'] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setStatusFilter(filter)}
                      className={`rounded-full px-3.5 py-1 text-xs font-bold capitalize transition cursor-pointer ${
                        statusFilter === filter
                          ? 'bg-espresso text-cream shadow-xs'
                          : 'bg-white border border-neutral-300 text-neutral-600 hover:bg-neutral-100'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                {/* EVENT REGISTRATIONS LIST */}
                {regCategory === 'events' && (
                  <div className="space-y-4">
                    {filteredEvents.length === 0 ? (
                      <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center text-muted-foreground">
                        No event registrations match the current filter.
                      </div>
                    ) : (
                      filteredEvents.map((r) => (
                        <div
                          key={r.id}
                          className="rounded-xl border border-neutral-200 bg-white p-5 md:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5 transition hover:shadow-md"
                        >
                          <div className="space-y-2 flex-1">
                            {/* Attendee Name & Status Badge */}
                            <div className="flex items-center gap-3 flex-wrap">
                              <h3 className="font-display text-2xl font-bold text-espresso">
                                {r.fullName}
                              </h3>
                              <span
                                className={`rounded-full px-3 py-0.5 text-xs font-bold uppercase tracking-wider ${
                                  r.status === 'accepted'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : r.status === 'declined'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-amber-100 text-amber-900'
                                }`}
                              >
                                {r.status}
                              </span>
                              {r.verificationStatus === 'verified' && (
                                <span className="rounded-full bg-blue-100 text-[#2B4C94] px-2.5 py-0.5 text-xs font-bold">
                                  ✓ Receipt Verified
                                </span>
                              )}
                            </div>

                            {/* Contact & Registration Meta */}
                            <div className="text-sm text-neutral-600 flex flex-wrap items-center gap-x-4 gap-y-1">
                              <span>📞 <a href={`tel:${r.phone}`} className="font-mono font-semibold text-espresso hover:underline">{r.phone}</a></span>
                              <span>📧 <a href={`mailto:${r.email}`} className="text-espresso hover:underline">{r.email}</a></span>
                              {r.business && <span>🏢 {r.business}</span>}
                              <span>🏷️ {r.interestCategory}</span>
                            </div>

                            {/* Payment & Verification Row */}
                            <div className="pt-1 flex flex-wrap items-center gap-2 text-xs">
                              <span className="rounded bg-neutral-100 px-2.5 py-1 font-bold text-espresso">
                                💵 {r.amountSent || '900'} ETB
                              </span>
                              <span className="rounded bg-[#2B4C94]/10 text-[#2B4C94] px-2.5 py-1 font-bold">
                                📱 Telebirr (+251 98 334 4761)
                              </span>
                              {r.transactionRef && (
                                <span className="rounded border border-neutral-300 bg-neutral-50 px-2.5 py-1 font-mono font-bold text-espresso uppercase">
                                  Ref: {r.transactionRef}
                                </span>
                              )}
                              {r.paymentScreenshot && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setPreviewScreenshot({
                                      url: r.paymentScreenshot!,
                                      title: `${r.fullName} — Receipt Screenshot`,
                                    })
                                  }
                                  className="rounded bg-neutral-800 hover:bg-neutral-900 text-white px-2.5 py-1 font-bold cursor-pointer"
                                >
                                  🖼️ View Screenshot
                                </button>
                              )}
                            </div>

                            {/* Message / Details if available */}
                            {r.verificationDetails?.message && (
                              <p className="text-xs text-neutral-600 italic bg-neutral-50 p-2 rounded border border-neutral-200">
                                ℹ️ {r.verificationDetails.message}
                              </p>
                            )}
                          </div>

                          {/* ACTION BUTTONS (Accept, Verify.ET, Decline) */}
                          <div className="flex items-center gap-2 flex-wrap shrink-0 border-t md:border-t-0 pt-3 md:pt-0">
                            {r.status !== 'accepted' && (
                              <button
                                onClick={() => handleUpdateStatus('event', r.id, 'accepted')}
                                className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-4 py-2.5 shadow-xs transition cursor-pointer"
                              >
                                Accept ✓
                              </button>
                            )}

                            <button
                              disabled={verifyingId === r.id}
                              onClick={() => handleVerifyReceipt(r.id)}
                              className="rounded-lg bg-[#2B4C94] hover:bg-[#203a73] text-white font-bold text-sm px-3.5 py-2.5 shadow-xs transition disabled:opacity-50 cursor-pointer"
                            >
                              {verifyingId === r.id ? 'Checking...' : '⚡ Verify.ET'}
                            </button>

                            {r.transactionRef && (
                              <a
                                href={`https://verify.et/verify/telebirr?ref=${encodeURIComponent(r.transactionRef)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-lg border border-[#2B4C94]/40 bg-white text-[#2B4C94] hover:bg-[#2B4C94]/10 text-xs font-bold px-3 py-2.5 transition"
                              >
                                Link ↗
                              </a>
                            )}

                            {r.status !== 'declined' && (
                              <button
                                onClick={() => handleUpdateStatus('event', r.id, 'declined')}
                                className="rounded-lg border border-neutral-300 px-3 py-2.5 text-xs font-semibold text-neutral-600 hover:bg-red-50 hover:text-red-700 cursor-pointer"
                              >
                                Decline
                              </button>
                            )}

                            <button
                              onClick={() => handleDeleteRegistration('event', r.id, r.fullName)}
                              className="text-neutral-400 hover:text-red-600 p-2 text-sm cursor-pointer"
                              title="Delete registration"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* MEMBERSHIPS LIST */}
                {regCategory === 'memberships' && (
                  <div className="space-y-4">
                    {filteredMembers.length === 0 ? (
                      <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center text-muted-foreground">
                        No membership applications match the filter.
                      </div>
                    ) : (
                      filteredMembers.map((m) => (
                        <div
                          key={m.id}
                          className="rounded-xl border border-neutral-200 bg-white p-5 md:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <h3 className="font-display text-2xl font-bold text-espresso">{m.fullName}</h3>
                              <span
                                className={`rounded-full px-3 py-0.5 text-xs font-bold uppercase tracking-wider ${
                                  m.status === 'active'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : m.status === 'declined'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-amber-100 text-amber-900'
                                }`}
                              >
                                {m.status}
                              </span>
                            </div>
                            <p className="text-sm text-neutral-600">
                              {m.profession} · <strong className="text-espresso">{m.amount}</strong> · Applied {new Date(m.createdAt).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-neutral-600">
                              📞 <a href={`tel:${m.phone}`} className="font-semibold text-espresso">{m.phone}</a> · 📧 {m.email}
                            </p>
                            {m.reason && (
                              <p className="text-xs text-neutral-700 bg-neutral-50 p-2 rounded border border-neutral-200">
                                Reason: {m.reason}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            {m.status !== 'active' && (
                              <button
                                onClick={() => handleUpdateStatus('membership', m.id, 'active')}
                                className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-4 py-2.5 cursor-pointer"
                              >
                                Activate ✓
                              </button>
                            )}
                            {m.status !== 'declined' && (
                              <button
                                onClick={() => handleUpdateStatus('membership', m.id, 'declined')}
                                className="rounded-lg border border-neutral-300 px-3 py-2.5 text-xs font-semibold text-neutral-600 hover:bg-red-50 hover:text-red-700 cursor-pointer"
                              >
                                Decline
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteRegistration('membership', m.id, m.fullName)}
                              className="text-neutral-400 hover:text-red-600 p-2 text-sm cursor-pointer"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* CONSULTATIONS LIST */}
                {regCategory === 'consultations' && (
                  <div className="space-y-4">
                    {filteredConsultations.length === 0 ? (
                      <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center text-muted-foreground">
                        No consultations match the filter.
                      </div>
                    ) : (
                      filteredConsultations.map((c) => (
                        <div
                          key={c.id}
                          className="rounded-xl border border-neutral-200 bg-white p-5 md:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <h3 className="font-display text-2xl font-bold text-espresso">{c.fullName}</h3>
                              <span
                                className={`rounded-full px-3 py-0.5 text-xs font-bold uppercase tracking-wider ${
                                  c.status === 'confirmed'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : c.status === 'cancelled'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-amber-100 text-amber-900'
                                }`}
                              >
                                {c.status}
                              </span>
                            </div>
                            <p className="text-sm text-[#2B4C94] font-bold">Topic: {c.topic}</p>
                            <p className="text-sm text-neutral-600">
                              📅 Preferred: <strong>{c.preferredDate} ({c.preferredTime})</strong> · 💵 {c.price}
                            </p>
                            <p className="text-sm text-neutral-600">
                              📞 {c.phone} · 📧 {c.email}
                            </p>
                            {c.description && (
                              <p className="text-xs text-neutral-700 bg-neutral-50 p-2 rounded border border-neutral-200">
                                Details: {c.description}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            {c.status !== 'confirmed' && (
                              <button
                                onClick={() => handleUpdateStatus('consultation', c.id, 'confirmed')}
                                className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-4 py-2.5 cursor-pointer"
                              >
                                Confirm ✓
                              </button>
                            )}
                            {c.status !== 'cancelled' && (
                              <button
                                onClick={() => handleUpdateStatus('consultation', c.id, 'cancelled')}
                                className="rounded-lg border border-neutral-300 px-3 py-2.5 text-xs font-semibold text-neutral-600 hover:bg-red-50 hover:text-red-700 cursor-pointer"
                              >
                                Cancel
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteRegistration('consultation', c.id, c.fullName)}
                              className="text-neutral-400 hover:text-red-600 p-2 text-sm cursor-pointer"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: EDIT UPCOMING SESSION */}
            {mainTab === 'upcoming' && upcomingForm && (
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-xs max-w-4xl mx-auto">
                <div className="border-b border-neutral-200 pb-4 mb-6">
                  <h2 className="font-display text-3xl font-bold text-espresso">
                    Edit Upcoming Session
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Updates session information across the entire website instantly.
                  </p>
                </div>

                <form onSubmit={handleSaveUpcoming} className="space-y-6">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-espresso mb-1.5">
                        Session Number
                      </label>
                      <input
                        required
                        value={upcomingForm.number}
                        onChange={(e) => setUpcomingForm({ ...upcomingForm, number: e.target.value })}
                        className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-base"
                        placeholder="e.g. Session 07"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-espresso mb-1.5">
                        Topic Category
                      </label>
                      <input
                        required
                        value={upcomingForm.topic}
                        onChange={(e) => setUpcomingForm({ ...upcomingForm, topic: e.target.value })}
                        className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-base"
                        placeholder="e.g. Processing & Cupping"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-espresso mb-1.5">
                      Session Title
                    </label>
                    <input
                      required
                      value={upcomingForm.title}
                      onChange={(e) => setUpcomingForm({ ...upcomingForm, title: e.target.value })}
                      className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-base font-bold"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-espresso mb-1.5">
                        Date
                      </label>
                      <input
                        required
                        value={upcomingForm.date}
                        onChange={(e) => setUpcomingForm({ ...upcomingForm, date: e.target.value })}
                        className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-espresso mb-1.5">
                        Time
                      </label>
                      <input
                        required
                        value={upcomingForm.time}
                        onChange={(e) => setUpcomingForm({ ...upcomingForm, time: e.target.value })}
                        className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-espresso mb-1.5">
                        Venue
                      </label>
                      <input
                        required
                        value={upcomingForm.venue}
                        onChange={(e) => setUpcomingForm({ ...upcomingForm, venue: e.target.value })}
                        className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-base"
                      />
                    </div>
                  </div>

                  {/* Speaker Details */}
                  <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-5 space-y-4">
                    <h4 className="font-bold text-sm uppercase tracking-wider text-[#2B4C94]">
                      Speaker Information
                    </h4>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold text-espresso mb-1">Speaker Name</label>
                        <input
                          required
                          value={upcomingForm.speaker.name}
                          onChange={(e) =>
                            setUpcomingForm({
                              ...upcomingForm,
                              speaker: { ...upcomingForm.speaker, name: e.target.value },
                            })
                          }
                          className="w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-2 text-base"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-espresso mb-1">Speaker Role</label>
                        <input
                          required
                          value={upcomingForm.speaker.role}
                          onChange={(e) =>
                            setUpcomingForm({
                              ...upcomingForm,
                              speaker: { ...upcomingForm.speaker, role: e.target.value },
                            })
                          }
                          className="w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-2 text-base"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-espresso mb-1">Speaker Bio</label>
                      <textarea
                        rows={2}
                        value={upcomingForm.speaker.bio}
                        onChange={(e) =>
                          setUpcomingForm({
                            ...upcomingForm,
                            speaker: { ...upcomingForm.speaker, bio: e.target.value },
                          })
                        }
                        className="w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-2 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-espresso mb-1.5">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={upcomingForm.description}
                      onChange={(e) => setUpcomingForm({ ...upcomingForm, description: e.target.value })}
                      className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-base"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-lg bg-[#2B4C94] hover:bg-[#203a73] py-4 text-base font-bold text-white shadow-md transition cursor-pointer"
                  >
                    Save Changes to Upcoming Session →
                  </button>
                </form>
              </div>
            )}

            {/* TAB 3: PAST SESSIONS & ARCHIVE */}
            {mainTab === 'archive' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between bg-white p-5 rounded-xl border border-neutral-200">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-espresso">Past Sessions Archive</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">Visible on /sessions archive page</p>
                  </div>
                  <button
                    onClick={() => setShowAddSessionModal(true)}
                    className="rounded-lg bg-[#2B4C94] hover:bg-[#203a73] text-white font-bold text-sm px-4 py-2 cursor-pointer"
                  >
                    + Add Past Session
                  </button>
                </div>

                {/* Add Session Modal */}
                {showAddSessionModal && (
                  <div className="rounded-xl border border-[#2B4C94]/40 bg-white p-6 shadow-lg">
                    <h3 className="font-display text-xl font-bold text-espresso mb-4">Add Past Session</h3>
                    <form onSubmit={handleAddPreviousSession} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-3">
                        <input
                          required
                          placeholder="Session # (e.g. Session 06)"
                          value={newSessionForm.number}
                          onChange={(e) => setNewSessionForm({ ...newSessionForm, number: e.target.value })}
                          className="rounded border border-neutral-300 px-3 py-2 text-sm"
                        />
                        <input
                          required
                          placeholder="Title"
                          value={newSessionForm.title}
                          onChange={(e) => setNewSessionForm({ ...newSessionForm, title: e.target.value })}
                          className="rounded border border-neutral-300 px-3 py-2 text-sm sm:col-span-2"
                        />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <input
                          placeholder="Date"
                          value={newSessionForm.date}
                          onChange={(e) => setNewSessionForm({ ...newSessionForm, date: e.target.value })}
                          className="rounded border border-neutral-300 px-3 py-2 text-sm"
                        />
                        <input
                          placeholder="Topic"
                          value={newSessionForm.topic}
                          onChange={(e) => setNewSessionForm({ ...newSessionForm, topic: e.target.value })}
                          className="rounded border border-neutral-300 px-3 py-2 text-sm"
                        />
                      </div>
                      <textarea
                        rows={2}
                        placeholder="Description..."
                        value={newSessionForm.description}
                        onChange={(e) => setNewSessionForm({ ...newSessionForm, description: e.target.value })}
                        className="w-full rounded border border-neutral-300 px-3 py-2 text-sm"
                      />
                      <div className="flex gap-2">
                        <button type="submit" className="rounded bg-emerald-600 px-4 py-2 text-xs font-bold text-white">
                          Save Session
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowAddSessionModal(false)}
                          className="rounded border px-4 py-2 text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Session list */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {data?.previousSessions.map((s) => (
                    <div key={s.id} className="rounded-xl border border-neutral-200 bg-white p-4 shadow-xs flex flex-col justify-between">
                      <div>
                        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg mb-3 bg-neutral-100">
                          <Image src={s.image} alt={s.title} fill className="object-cover" sizes="300px" />
                          <span className="absolute top-2 left-2 rounded bg-espresso text-cream px-2 py-0.5 text-xs font-mono font-bold">
                            {s.number}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{s.date}</p>
                        <h4 className="font-display text-lg font-bold text-espresso mt-1">{s.title}</h4>
                        <p className="text-xs text-[#2B4C94] font-semibold mt-0.5">{s.topic}</p>
                        <p className="text-xs text-neutral-600 mt-2 line-clamp-2">{s.description}</p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                        {s.youtubeUrl && (
                          <a href={s.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-[#2B4C94] font-bold hover:underline">
                            YouTube ↗
                          </a>
                        )}
                        <button
                          onClick={() => handleDeleteSession(s.id, s.title)}
                          className="text-red-600 hover:text-red-800 font-semibold cursor-pointer ml-auto"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: SETTINGS, FEES & VERIFY.ET */}
            {mainTab === 'settings' && (
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-xs max-w-3xl mx-auto space-y-6">
                <div>
                  <h2 className="font-display text-3xl font-bold text-espresso">Settings & Payment Details</h2>
                  <p className="text-sm text-muted-foreground mt-1">Configure pricing, contact info, and Verify.ET integration.</p>
                </div>

                <form onSubmit={handleSaveSettings} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-espresso mb-1.5">
                        Annual Membership Fee
                      </label>
                      <input
                        value={settingsForm.annualMembershipFee}
                        onChange={(e) => setSettingsForm({ ...settingsForm, annualMembershipFee: e.target.value })}
                        className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-base"
                        placeholder="15,000 ETB"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-espresso mb-1.5">
                        Consultation Fee (30 Min)
                      </label>
                      <input
                        value={settingsForm.consultationFee}
                        onChange={(e) => setSettingsForm({ ...settingsForm, consultationFee: e.target.value })}
                        className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-base"
                        placeholder="1,000 ETB"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-espresso mb-1.5">
                        Contact Email
                      </label>
                      <input
                        value={settingsForm.contactEmail}
                        onChange={(e) => setSettingsForm({ ...settingsForm, contactEmail: e.target.value })}
                        className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-espresso mb-1.5">
                        Contact Phone
                      </label>
                      <input
                        value={settingsForm.phone}
                        onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                        className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-base"
                      />
                    </div>
                  </div>

                  {/* Verify.ET API Key */}
                  <div className="rounded-xl border border-[#2B4C94]/30 bg-[#F4F7FC] p-4 sm:p-5 space-y-2">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#2B4C94]">
                        🛡️ Verify.ET API Key
                      </label>
                      <a
                        href="https://verify.et/docs/api"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-[#2B4C94] hover:underline"
                      >
                        Get Key on Verify.ET ↗
                      </a>
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      Optional: Paste your key from <a href="https://verify.et" target="_blank" rel="noopener noreferrer" className="font-bold underline text-espresso">verify.et</a> to enable real-time automated receipt verification.
                    </p>
                    <input
                      type="password"
                      value={settingsForm.verifyEtApiKey || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, verifyEtApiKey: e.target.value })}
                      className="w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-2 text-sm font-mono text-espresso placeholder-neutral-400 focus:border-[#2B4C94] focus:outline-none"
                      placeholder="e.g. vk_live_... (or leave blank for manual links)"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-lg bg-[#2B4C94] hover:bg-[#203a73] py-4 text-base font-bold text-white shadow-md transition cursor-pointer"
                  >
                    Save Settings & Pricing →
                  </button>
                </form>
              </div>
            )}
          </>
        )}

        {/* Screenshot Preview Modal */}
        {previewScreenshot && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-espresso/80 p-4 backdrop-blur-xs animate-fade-in-up"
            onClick={() => setPreviewScreenshot(null)}
          >
            <div
              className="relative max-h-[90vh] max-w-2xl w-full rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3 mb-4">
                <h3 className="font-display text-xl font-bold text-espresso">
                  {previewScreenshot.title}
                </h3>
                <button
                  onClick={() => setPreviewScreenshot(null)}
                  className="rounded-full h-8 w-8 grid place-items-center bg-neutral-100 text-espresso hover:bg-neutral-200 transition text-sm font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 p-2">
                {previewScreenshot.url.startsWith('data:image') ||
                previewScreenshot.url.startsWith('/') ||
                previewScreenshot.url.startsWith('http') ? (
                  <img
                    src={previewScreenshot.url}
                    alt={previewScreenshot.title}
                    className="w-full h-auto max-h-[65vh] object-contain rounded-lg mx-auto"
                  />
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-sm text-muted-foreground mb-4">Document File</p>
                    <a
                      href={previewScreenshot.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded-lg bg-[#2B4C94] text-white px-5 py-2 text-sm font-bold"
                    >
                      Open in New Tab ↗
                    </a>
                  </div>
                )}
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setPreviewScreenshot(null)}
                  className="rounded-lg border border-neutral-300 px-4 py-2 text-xs font-semibold text-espresso hover:bg-neutral-100 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
