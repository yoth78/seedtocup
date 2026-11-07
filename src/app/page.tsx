'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { upcomingSession, previousSessions, eventGallery } from '@/lib/sessions-data';

export default function Home() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [activeGalleryModal, setActiveGalleryModal] = useState<string | null>(null);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubmitted(true);
    }
  };

  const experiences = [
    {
      title: "Coffee Origins",
      category: "Terroir & Heritage",
      description: "Tracing wild heirloom varieties across Yirgacheffe, Guji, Sidama, and Harar through the farmers cultivating the land.",
      image: "/images/farm.jpg",
      span: "lg:col-span-7",
      aspect: "aspect-[16/10]",
    },
    {
      title: "Sensory & Cupping",
      category: "The Taste of Place",
      description: "Professional protocol cupping tables discovering delicate florals, berry notes, and vibrant citrus acidity.",
      image: "/images/events/IMG_3958.jpg",
      span: "lg:col-span-5",
      aspect: "aspect-[4/3] lg:aspect-auto lg:h-full",
    },
    {
      title: "Barista Craft & Service",
      category: "Extraction Science",
      description: "Mastering water temperature, grind distribution, and modern brewing techniques with leading baristas.",
      image: "/images/events/IMG_3938.jpg",
      span: "lg:col-span-4",
      aspect: "aspect-[4/5]",
    },
    {
      title: "Agronomy & Growth",
      category: "Seed to Tree",
      description: "Root systems, organic soil health, shade canopy stewardship, and sustainable harvesting methodologies.",
      image: "/images/events/IMG_4046.jpg",
      span: "lg:col-span-4",
      aspect: "aspect-[4/5]",
    },
    {
      title: "Commerce & Roasting",
      category: "The Industry",
      description: "Building specialty café concepts, domestic roasting expansion, and international green coffee exports.",
      image: "/images/events/IMG_3971.jpg",
      span: "lg:col-span-4",
      aspect: "aspect-[4/5]",
    },
  ];

  const galleryItems = [
    {
      id: "g1",
      image: "/images/events/IMG_4004.jpg",
      title: "Community in Gathering",
      caption: "50+ coffee minds in interactive discussion at The HUB Addis.",
      span: "col-span-12 md:col-span-8 aspect-[16/10]",
    },
    {
      id: "g2",
      image: "/images/events/IMG_3872.jpg",
      title: "Stage Session Delivery",
      caption: "Specialty coffee keynote with Hanna Neuschwander.",
      span: "col-span-12 md:col-span-4 aspect-[4/5]",
    },
    {
      id: "g3",
      image: "/images/events/IMG_3948.jpg",
      title: "Official Accreditation",
      caption: "Participant badges and materials on arrival.",
      span: "col-span-12 md:col-span-4 aspect-[4/5]",
    },
    {
      id: "g4",
      image: "/images/events/IMG_3977.jpg",
      title: "Cupping Dialogue",
      caption: "Live sensory scoring of natural processed micro-lots.",
      span: "col-span-12 md:col-span-4 aspect-[4/5]",
    },
    {
      id: "g5",
      image: "/images/events/IMG_4057.jpg",
      title: "Inaugural Stage Banners",
      caption: "From Seed to Cup, discovering the story behind coffee.",
      span: "col-span-12 md:col-span-4 aspect-[4/5]",
    },
  ];

  return (
    <div className="bg-[#FBF8F3] text-[#1A1410] overflow-hidden selection:bg-[#C89D66] selection:text-[#120D0A]">

      {/* ========================================================= */}
      {/* 1. CINEMATIC ASYMMETRICAL HERO SECTION                    */}
      {/* ========================================================= */}
      <section className="relative min-h-screen flex items-end overflow-hidden bg-[#120D0A] text-[#FBF8F3]">
        {/* Large Cinematic Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-coffee.jpg"
            alt="Ethiopian specialty coffee cherries and harvest"
            fill
            priority
            className="object-cover object-center scale-105 animate-[pulse_10s_ease-in-out_infinite]"
            sizes="100vw"
          />
          {/* Multi-layered luxury espresso & coal gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#120D0A]/95 via-[#120D0A]/80 to-[#120D0A]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#120D0A] via-transparent to-[#120D0A]/70" />
          <div className="absolute inset-0 bg-[radial-gradient(#C89D66_1px,transparent_1px)] opacity-10 [background-size:24px_24px]" />
        </div>

        {/* Hero Asymmetrical Layout Content */}
        <div className="relative z-10 mx-auto max-w-7xl w-full px-6 pt-36 pb-20 md:px-10 md:pb-28 lg:pb-32">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-end">
            
            {/* Left 8 Cols: Large Editorial Typography */}
            <div className="lg:col-span-8 max-w-3xl fade-up">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#C89D66]/40 bg-[#C89D66]/10 backdrop-blur-md mb-8">
                <span className="w-2 h-2 rounded-full bg-[#C89D66] animate-ping" />
                <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#DFC092]">
                  Ethiopian Specialty Coffee Society
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.4rem] font-serif leading-[1.04] text-[#FBF8F3] tracking-tight">
                Every Cup <br className="hidden sm:inline" />
                <span className="italic font-light text-[#DFC092]">Has a Story.</span>
              </h1>

              <p className="mt-8 text-lg sm:text-xl md:text-2xl text-[#FBF8F3]/85 font-light leading-relaxed max-w-2xl">
                Discover the culture, people, and journey behind Ethiopian coffee — connecting origin, craft, and commerce through monthly experiences.
              </p>

              {/* Action Buttons */}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/register?type=event"
                  className="btn-gold !py-3.5 !px-8 text-sm uppercase tracking-wider font-semibold"
                >
                  Reserve Next Session
                </Link>
                <Link
                  href="/membership"
                  className="btn-outline-light !py-3.5 !px-8 text-sm uppercase tracking-wider"
                >
                  Explore Membership
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm text-[#FBF8F3]/80 hover:text-[#C89D66] transition-colors px-3 py-3 font-medium"
                >
                  Our Philosophy <span className="text-xs">→</span>
                </Link>
              </div>
            </div>

            {/* Right 4 Cols: Featured Editorial Session Teaser Pill */}
            <div className="lg:col-span-4">
              <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl p-6 md:p-7 text-[#FBF8F3] shadow-2xl">
                <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs">
                  <span className="text-[#C89D66] font-mono uppercase tracking-widest">
                    Next Gathering
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#C89D66]/20 text-[#DFC092] border border-[#C89D66]/30">
                    Seats Open
                  </span>
                </div>

                <div className="mt-4">
                  <p className="text-xs text-[#FBF8F3]/60 uppercase tracking-widest">{upcomingSession.number}</p>
                  <h3 className="text-xl md:text-2xl font-serif mt-1 text-[#FBF8F3] leading-snug">
                    {upcomingSession.title}
                  </h3>
                  <p className="text-xs text-[#DFC092] mt-2 font-mono">{upcomingSession.date}</p>
                  <p className="text-xs text-[#FBF8F3]/70 mt-1">{upcomingSession.venue}</p>
                </div>

                <Link
                  href="/upcoming-session"
                  className="mt-6 flex items-center justify-between w-full pt-4 border-t border-white/10 text-xs font-semibold uppercase tracking-wider text-[#C89D66] hover:text-[#DFC092] transition-colors"
                >
                  <span>View Details & Speaker</span>
                  <span>↗</span>
                </Link>
              </div>

              {/* Scroll Indicator */}
              <div className="mt-8 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#FBF8F3]/40">
                <span className="w-6 h-[1px] bg-white/30" />
                <span>Scroll to explore</span>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ========================================================= */}
      {/* 2. ABOUT EDITORIAL SPLIT SECTION                          */}
      {/* ========================================================= */}
      <section className="py-24 md:py-36 px-6 md:px-10 bg-[#FBF8F3]">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left 6 Cols: Editorial Copy */}
            <div className="lg:col-span-6">
              <p className="eyebrow">
                <span className="rule" />
                The Story Behind the Platform
              </p>
              
              <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-serif text-[#1A1410] leading-[1.08]">
                Where Ethiopia’s coffee heritage meets <em className="italic text-[#684E3A]">contemporary culture</em>.
              </h2>

              <p className="mt-8 text-lg md:text-xl text-[#1A1410]/80 leading-relaxed font-light">
                Ethiopia is the birthplace of coffee, home to thousands of heirloom varieties and a sacred cultural ceremony. Yet, there has rarely been an open salon where roasters, baristas, café founders, and curious drinkers assemble as peers.
              </p>

              {/* Mission Statement Box */}
              <div className="mt-8 border-l-2 border-[#C89D66] pl-6 py-2 bg-[#F5EFEB]/50 rounded-r-xl">
                <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#684E3A]">
                  Our Core Mission
                </p>
                <p className="mt-2 text-base md:text-lg text-[#1A1410] font-serif italic leading-relaxed">
                  "To build meaningful experiences connecting people to the story of coffee — from seed to cup — while elevating knowledge, community, and opportunity in Addis Ababa and beyond."
                </p>
              </div>

              <div className="mt-10 flex items-center gap-8">
                <Link href="/about" className="btn-primary">
                  Explore Our Story →
                </Link>
                <span className="text-xs uppercase tracking-widest text-[#684E3A] font-mono">
                  Powered by Cashmere Events
                </span>
              </div>
            </div>

            {/* Right 6 Cols: Authentic Imagery Composition */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-[#E5DCD2]">
                <Image
                  src="/images/barista.jpg"
                  alt="Specialty pour over barista in Ethiopia"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120D0A]/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-[#FBF8F3]">
                  <p className="text-xs font-mono uppercase tracking-widest text-[#C89D66]">
                    Authentic Craft
                  </p>
                  <p className="font-serif text-lg md:text-xl mt-1">
                    Every lot cupped, scrutinized, and celebrated.
                  </p>
                </div>
              </div>

              {/* Floating Asymmetric Badge */}
              <div className="hidden sm:block absolute -bottom-8 -left-8 bg-[#1A1410] text-[#FBF8F3] p-6 rounded-2xl shadow-2xl border border-white/10 max-w-xs">
                <p className="font-serif text-3xl text-[#C89D66]">100%</p>
                <p className="text-xs text-[#FBF8F3]/80 mt-1 uppercase tracking-wider font-mono">
                  Ethiopian Single Origin & Micro-lot Focus
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ========================================================= */}
      {/* 3. COFFEE SESSIONS SECTION (Featured + Grid)              */}
      {/* ========================================================= */}
      <section className="py-24 md:py-36 px-6 md:px-10 bg-[#EDE5DC]/45 border-y border-[#E5DCD2]">
        <div className="mx-auto max-w-7xl">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="eyebrow">
                <span className="rule" />
                Curated Events
              </p>
              <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-serif text-[#1A1410]">
                Monthly Coffee Sessions
              </h2>
            </div>
            <Link href="/sessions" className="btn-ghost self-start md:self-end">
              View All Past Sessions →
            </Link>
          </div>

          {/* LARGE FEATURED UPCOMING SESSION */}
          <div className="rounded-3xl overflow-hidden bg-[#1A1410] text-[#FBF8F3] border border-[#2E231C] shadow-2xl mb-16">
            <div className="grid lg:grid-cols-12 items-stretch">
              
              {/* Image side */}
              <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[520px]">
                <Image
                  src={upcomingSession.image}
                  alt={upcomingSession.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1410] via-transparent to-transparent lg:hidden" />
                <div className="absolute top-6 left-6 rounded-full bg-[#120D0A]/85 backdrop-blur-md px-4 py-1.5 border border-[#C89D66]/40 text-xs font-mono uppercase tracking-widest text-[#DFC092]">
                  Upcoming Feature · {upcomingSession.number}
                </div>
              </div>

              {/* Information side */}
              <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <div className="text-xs uppercase tracking-widest text-[#C89D66] font-mono">
                    {upcomingSession.date} · {upcomingSession.time}
                  </div>
                  <h3 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-serif text-[#FBF8F3] leading-tight">
                    {upcomingSession.title}
                  </h3>
                  <p className="mt-4 text-sm md:text-base text-[#FBF8F3]/80 font-light leading-relaxed">
                    {upcomingSession.description}
                  </p>

                  <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                    <div className="text-xs text-[#FBF8F3]/60 uppercase tracking-widest font-mono">Keynote Speaker</div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#C89D66]/20 border border-[#C89D66] flex items-center justify-center font-serif text-[#DFC092]">
                        HN
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#FBF8F3]">{upcomingSession.speaker.name}</p>
                        <p className="text-xs text-[#FBF8F3]/60">{upcomingSession.speaker.role}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#FBF8F3]/50 block">Registration Fee</span>
                    <span className="text-2xl font-serif text-[#C89D66]">900 ETB</span>
                  </div>
                  <Link href="/upcoming-session" className="btn-gold !py-3 !px-7 text-xs uppercase tracking-wider font-semibold">
                    Reserve Your Seat
                  </Link>
                </div>
              </div>

            </div>
          </div>

          {/* PREVIOUS SESSIONS ARCHIVE CARDS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {previousSessions.slice(0, 3).map((session) => (
              <article key={session.id} className="card-editorial rounded-2xl overflow-hidden group flex flex-col justify-between">
                <div>
                  <div className="relative aspect-[16/11] overflow-hidden bg-[#1A1410]">
                    <Image
                      src={session.image}
                      alt={session.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#1A1410]/80 backdrop-blur-md text-[0.7rem] uppercase tracking-widest text-[#FBF8F3] font-mono">
                      {session.number}
                    </div>
                  </div>
                  <div className="p-6 md:p-7">
                    <p className="text-xs uppercase tracking-widest text-[#684E3A] font-mono">
                      {session.date}
                    </p>
                    <h4 className="mt-2 text-2xl font-serif text-[#1A1410] leading-snug group-hover:text-[#684E3A] transition-colors">
                      {session.title}
                    </h4>
                    <p className="mt-3 text-sm text-[#1A1410]/70 font-light line-clamp-2 leading-relaxed">
                      {session.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 md:px-7 md:pb-7 pt-2 flex items-center justify-between border-t border-[#E5DCD2]/60 text-xs font-semibold text-[#1A1410]">
                  <span className="text-[#684E3A]">{session.topic}</span>
                  <Link href="/sessions" className="hover:text-[#C89D66] transition-colors inline-flex items-center gap-1">
                    <span>Recap</span> →
                  </Link>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>


      {/* ========================================================= */}
      {/* 4. COFFEE EXPERIENCES GRID SECTION                         */}
      {/* ========================================================= */}
      <section id="experiences" className="py-24 md:py-36 px-6 md:px-10 bg-[#FBF8F3]">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl mb-16">
            <p className="eyebrow">
              <span className="rule" />
              Curated Disciplines
            </p>
            <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-serif text-[#1A1410]">
              The Coffee Experiences
            </h2>
            <p className="mt-6 text-lg text-[#1A1410]/75 font-light leading-relaxed">
              From agronomy at origin to barista extraction and café ownership — each discipline is unpacked with expert insight.
            </p>
          </div>

          {/* Asymmetrical Editorial Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {experiences.map((exp) => (
              <div
                key={exp.title}
                className={`${exp.span} group relative rounded-3xl overflow-hidden shadow-lg border border-[#E5DCD2] bg-[#120D0A] text-[#FBF8F3]`}
              >
                <div className={`relative ${exp.aspect} w-full overflow-hidden`}>
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120D0A] via-[#120D0A]/30 to-transparent" />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 flex flex-col justify-end">
                  <span className="text-xs uppercase tracking-[0.25em] text-[#DFC092] font-mono">
                    {exp.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif mt-2 text-[#FBF8F3]">
                    {exp.title}
                  </h3>
                  <p className="mt-3 text-sm md:text-base text-[#FBF8F3]/80 font-light max-w-xl leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ========================================================= */}
      {/* 5. MEMBERSHIP SECTION (Distinct Luxury Layout)            */}
      {/* ========================================================= */}
      <section id="membership" className="py-24 md:py-36 px-6 md:px-10 bg-[#1A1410] text-[#FBF8F3] relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#C89D66]/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#684E3A]/20 blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left 6 Cols: Membership Pitch */}
            <div className="lg:col-span-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C89D66] font-mono inline-flex items-center gap-2">
                <span className="w-6 h-[1px] bg-[#C89D66]" />
                Exclusive Society Access
              </span>

              <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-serif text-[#FBF8F3] leading-[1.08]">
                One annual card.<br />
                <span className="italic text-[#DFC092]">Every cup of the year.</span>
              </h2>

              <p className="mt-8 text-lg text-[#FBF8F3]/80 font-light leading-relaxed">
                Join our inner circle of roasters, café proprietors, agronomists, and passionate coffee thinkers. Membership guarantees full uncompromised access to all 12 signature monthly masterclasses and private networking dinners.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Guaranteed reserved seating across all 12 monthly sessions",
                  "Private sensory tasting flights with guest cuppers",
                  "Direct networking with green coffee exporters and producers",
                  "VIP invitations to private cuppings & farm tour priority",
                  "Official personalized Seed To Cup member badge & certificate"
                ].map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3.5 text-sm md:text-base text-[#FBF8F3]/90 font-light">
                    <span className="w-5 h-5 rounded-full bg-[#C89D66]/20 border border-[#C89D66] flex items-center justify-center text-xs text-[#DFC092] shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Link
                  href="/register?type=membership"
                  className="btn-gold !py-3.5 !px-8 text-sm uppercase tracking-wider font-semibold"
                >
                  Apply for Membership
                </Link>
                <Link
                  href="/membership"
                  className="text-sm text-[#DFC092] hover:underline underline-offset-4"
                >
                  View Membership Details →
                </Link>
              </div>
            </div>

            {/* Right 6 Cols: Luxury Tier Card Presentation */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-[#C89D66]/40 bg-gradient-to-br from-[#231D19] to-[#120D0A] p-8 md:p-12 shadow-2xl relative">
                <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-[#C89D66]/20 border border-[#C89D66]/40 text-xs font-mono text-[#DFC092] uppercase tracking-widest">
                  Annual Pass
                </div>

                <span className="text-xs font-mono uppercase tracking-widest text-[#FBF8F3]/50">
                  Seed To Cup Coffee Society
                </span>
                <h3 className="text-3xl font-serif text-[#FBF8F3] mt-2">
                  Founding Member
                </h3>

                <div className="mt-8 pb-8 border-b border-white/10 flex items-baseline gap-2">
                  <span className="text-5xl md:text-6xl font-serif text-[#C89D66] font-normal">15,000</span>
                  <span className="text-xl text-[#FBF8F3]/70 font-mono">ETB / Year</span>
                </div>

                <div className="mt-8 space-y-3 text-sm text-[#FBF8F3]/75 font-light">
                  <p>• Includes admission to 12 sessions (valued at 10,800 ETB standalone)</p>
                  <p>• Complimentary coffee service & single-origin bags at select sessions</p>
                  <p>• Verified receipt authentication via Telebirr automated check</p>
                </div>

                <div className="mt-10 pt-6 border-t border-white/10">
                  <Link
                    href="/register?type=membership"
                    className="w-full text-center block btn-gold !py-4 text-sm uppercase tracking-wider font-semibold"
                  >
                    Join The Society Now
                  </Link>
                  <p className="text-center text-xs text-[#FBF8F3]/40 mt-3 font-mono">
                    Applications reviewed within 24 hours
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ========================================================= */}
      {/* 6. COFFEE CONSULTATION SECTION (Two Column)               */}
      {/* ========================================================= */}
      <section id="consultation" className="py-24 md:py-36 px-6 md:px-10 bg-[#F5EFEB] border-b border-[#E5DCD2]">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left 6 Cols: Photography */}
            <div className="lg:col-span-6 relative order-2 lg:order-1">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-[#E5DCD2]">
                <Image
                  src="/images/events/IMG_3876.jpg"
                  alt="Coffee consulting and expert advisory session"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120D0A]/70 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-[#FBF8F3]">
                  <span className="text-xs uppercase tracking-widest text-[#C89D66] font-mono">Tailored Advisory</span>
                  <p className="font-serif text-xl md:text-2xl mt-1">Practical guidance for your café or coffee venture.</p>
                </div>
              </div>
            </div>

            {/* Right 6 Cols: Content */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <p className="eyebrow">
                <span className="rule" />
                Professional Advisory
              </p>

              <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-serif text-[#1A1410] leading-[1.08]">
                Coffee Consultation Services
              </h2>

              <p className="mt-8 text-lg text-[#1A1410]/80 font-light leading-relaxed">
                Whether you are opening a specialty espresso bar in Bole, sourcing direct from Guji farmers, optimizing your roast profiles, or designing a barista training workflow — our seasoned specialists give you direct, actionable counsel.
              </p>

              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {[
                  "Café Concept & Bar Flow",
                  "Green Coffee Sourcing",
                  "Roasting Profile Optimization",
                  "Barista & Quality Calibration",
                  "Equipment Selection & Setup",
                  "Menu & Product Development"
                ].map((topic) => (
                  <div key={topic} className="p-4 rounded-xl bg-white border border-[#E5DCD2] text-sm text-[#1A1410] font-medium flex items-center gap-2">
                    <span className="text-[#C89D66]">✦</span>
                    <span>{topic}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-6 rounded-2xl bg-[#1A1410] text-[#FBF8F3] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#C89D66] font-mono block">Starting Rate</span>
                  <span className="text-3xl font-serif text-[#FBF8F3]">1,000 ETB</span>
                  <span className="text-xs text-[#FBF8F3]/60 ml-2 font-mono">/ 30-min session</span>
                </div>
                <Link
                  href="/register?type=consultation"
                  className="btn-gold !py-3 !px-7 text-xs uppercase tracking-wider font-semibold"
                >
                  Book Consultation →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ========================================================= */}
      {/* 7. COMMUNITY & VERIFIED STATISTICS SECTION                */}
      {/* ========================================================= */}
      <section className="py-24 md:py-36 px-6 md:px-10 bg-[#120D0A] text-[#FBF8F3]">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C89D66] font-mono">
              The Society in Numbers
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-serif text-[#FBF8F3]">
              A Living Community of Coffee Minds
            </h2>
            <p className="mt-6 text-lg text-[#FBF8F3]/75 font-light leading-relaxed">
              Every month, we convene over 50 engaged attendees at The HUB Addis — bringing producers, roasters, baristas, and coffee lovers into one shared table.
            </p>
          </div>

          {/* Verified Statistics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pb-20 border-b border-white/10 text-center">
            <div>
              <p className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#C89D66]">12</p>
              <p className="text-xs uppercase tracking-widest text-[#FBF8F3]/60 mt-3 font-mono">Sessions / Year</p>
            </div>
            <div>
              <p className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#C89D66]">500+</p>
              <p className="text-xs uppercase tracking-widest text-[#FBF8F3]/60 mt-3 font-mono">Community Attendees</p>
            </div>
            <div>
              <p className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#C89D66]">30+</p>
              <p className="text-xs uppercase tracking-widest text-[#FBF8F3]/60 mt-3 font-mono">Featured Speakers</p>
            </div>
            <div>
              <p className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#C89D66]">100%</p>
              <p className="text-xs uppercase tracking-widest text-[#FBF8F3]/60 mt-3 font-mono">Authentic Origin</p>
            </div>
          </div>

          {/* Speaker / Community Highlight */}
          <div className="mt-20 grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
              <Image
                src="/images/events/IMG_3971.jpg"
                alt="Seed To Cup networking and community dialogue"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            <div className="lg:col-span-7">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C89D66]">
                Voice of the Community
              </span>
              <p className="mt-4 text-2xl md:text-3xl font-serif text-[#FBF8F3] leading-relaxed italic font-light">
                "Seed To Cup gives Ethiopian specialty coffee what it has long deserved: a refined, unhurried space where producers, roasters, and consumers share knowledge without gatekeeping."
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#C89D66]" />
                <span className="text-sm font-medium text-[#DFC092]">Attendee Reflection · Session 05</span>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ========================================================= */}
      {/* 8. GALLERY SECTION (Asymmetrical Editorial Grid)          */}
      {/* ========================================================= */}
      <section id="gallery" className="py-24 md:py-36 px-6 md:px-10 bg-[#FBF8F3]">
        <div className="mx-auto max-w-7xl">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="eyebrow">
                <span className="rule" />
                Moments In the Room
              </p>
              <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-serif text-[#1A1410]">
                Photography Gallery
              </h2>
            </div>
            <p className="max-w-md text-sm md:text-base text-[#1A1410]/70 font-light leading-relaxed">
              Authentic glimpses of our community sessions, cupping calibrators, and keynote speeches at The HUB Addis.
            </p>
          </div>

          {/* Asymmetric Gallery Grid */}
          <div className="grid grid-cols-12 gap-6">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveGalleryModal(item.image)}
                className={`${item.span} group relative rounded-2xl overflow-hidden shadow-md cursor-pointer border border-[#E5DCD2] bg-[#1A1410]`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120D0A]/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-[#FBF8F3]">
                  <p className="font-serif text-lg text-[#FBF8F3]">{item.title}</p>
                  <p className="text-xs text-[#DFC092] mt-1 font-light">{item.caption}</p>
                  <span className="mt-3 text-xs uppercase tracking-widest text-white/70 font-mono">Click to expand ↗</span>
                </div>
              </div>
            ))}
          </div>

          {/* Lightbox Modal */}
          {activeGalleryModal && (
            <div
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setActiveGalleryModal(null)}
            >
              <div className="relative max-w-5xl w-full aspect-[16/10] max-h-[85vh]">
                <Image
                  src={activeGalleryModal}
                  alt="Expanded gallery photo"
                  fill
                  className="object-contain"
                />
                <button
                  className="absolute top-4 right-4 bg-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-white/40"
                  onClick={() => setActiveGalleryModal(null)}
                >
                  ✕
                </button>
              </div>
            </div>
          )}

        </div>
      </section>


      {/* ========================================================= */}
      {/* 9. YOUTUBE RECAP SECTION                                  */}
      {/* ========================================================= */}
      <section className="py-24 md:py-36 px-6 md:px-10 bg-[#EDE5DC]/40 border-y border-[#E5DCD2]">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-5">
              <p className="eyebrow">
                <span className="rule" />
                Session Broadcasts
              </p>
              <h2 className="mt-4 text-4xl sm:text-5xl font-serif text-[#1A1410] leading-tight">
                Watch Every Masterclass on YouTube.
              </h2>
              <p className="mt-6 text-base md:text-lg text-[#1A1410]/75 font-light leading-relaxed">
                Full-length panel recordings, cupping presentations, and interviews from every session are published on our official channel.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href="https://youtube.com/@seedtocup_et?si=u-FwCIQngSuAsJjE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Subscribe on YouTube ↗
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-[#2E231C] bg-[#120D0A]">
                <Image
                  src="/images/events/IMG_4054.jpg"
                  alt="Seed To Cup session stage presentation recap"
                  fill
                  className="object-cover opacity-80"
                />
                <a
                  href="https://youtube.com/@seedtocup_et?si=u-FwCIQngSuAsJjE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center group"
                  aria-label="Play recap on YouTube"
                >
                  <span className="w-20 h-20 rounded-full bg-[#C89D66] text-[#120D0A] flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110">
                    <svg width="22" height="24" viewBox="0 0 22 24" fill="currentColor" className="ml-1">
                      <path d="M0 0v24l22-12z" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ========================================================= */}
      {/* 10. MINIMAL NEWSLETTER SECTION                            */}
      {/* ========================================================= */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-[#1A1410] text-[#FBF8F3]">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C89D66] font-mono">
            Stay Connected
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-serif text-[#FBF8F3]">
            Join the Coffee Dispatch
          </h2>
          <p className="mt-5 text-base md:text-lg text-[#FBF8F3]/75 font-light leading-relaxed">
            Receive monthly invitations to upcoming sessions, speaker announcements, and specialty coffee dispatches from Addis Ababa.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="mt-10 max-w-md mx-auto">
            {newsletterSubmitted ? (
              <div className="p-4 rounded-full bg-[#C89D66]/20 border border-[#C89D66] text-sm text-[#DFC092] font-mono">
                Thank you for subscribing to Seed To Cup.
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="flex-1 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm text-[#FBF8F3] placeholder:text-[#FBF8F3]/40 focus:outline-none focus:border-[#C89D66] focus:ring-1 focus:ring-[#C89D66]"
                />
                <button
                  type="submit"
                  className="btn-gold !py-3.5 !px-8 text-xs uppercase tracking-wider font-semibold shrink-0"
                >
                  Subscribe
                </button>
              </div>
            )}
            <p className="text-xs text-[#FBF8F3]/40 mt-3 font-mono">
              Zero spam. Unsubscribe at any time.
            </p>
          </form>
        </div>
      </section>

    </div>
  );
}
