import Link from 'next/link';
import { Session } from '@/data/sessions';

interface SessionCardProps {
  session: Session;
  variant?: 'default' | 'featured' | 'compact';
}

export default function SessionCard({ session, variant = 'default' }: SessionCardProps) {
  if (variant === 'featured') {
    return (
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-coffee-light/25 hover:shadow-xl transition-shadow duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Visual Column (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-coffee-dark via-[#2C241E] to-[#1F1914] text-white p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden">
            {/* Subtle ambient light */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-coffee-accent/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-brand-blue/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-coffee-accent text-coffee-dark">
                  Next Masterclass
                </span>
                <span className="text-xs text-coffee-light/70 tracking-wider uppercase">
                  Session #7
                </span>
              </div>

              <h4 className="font-serif text-2xl lg:text-3xl font-semibold text-white mb-4 leading-snug">
                {session.topic}
              </h4>
              <p className="text-xs text-coffee-light/80 leading-relaxed mb-8">
                An immersive cupping & roasting laboratory celebrating the rich terroir of Ethiopian single-origin coffee.
              </p>

              {/* Terroir & Specialty Specs */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-2.5 text-xs text-coffee-light/90">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-coffee-light/60">Origin Region</span>
                  <span className="font-medium text-white">Yirgacheffe & Guji Terroir</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-coffee-light/60">Roast Style</span>
                  <span className="font-medium text-white">Light-Medium Specialty</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-coffee-light/60">Workshop Level</span>
                  <span className="font-medium text-coffee-accent">All Coffee Enthusiasts</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-8 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-coffee-light/70">
              <span>Addis Ababa, Ethiopia</span>
              <span className="text-coffee-accent font-semibold tracking-wider uppercase">Limited Seats</span>
            </div>
          </div>

          {/* Right Content Column (7 cols) */}
          <div className="lg:col-span-7 p-8 lg:p-10 flex flex-col justify-between bg-white">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="tag">{session.category || 'Roasting & Cupping'}</span>
                <span className="text-xs text-text-light font-medium">• Live Event</span>
              </div>

              <h3 className="font-serif text-2xl lg:text-3xl font-bold text-coffee-dark mb-4 leading-tight">
                {session.title}
              </h3>
              <p className="text-sm text-text-medium mb-6 leading-relaxed">
                {session.description}
              </p>

              {/* Event Meta Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-brand-cream/60 border border-coffee-light/20 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center flex-shrink-0 text-brand-blue mt-0.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[11px] font-semibold text-text-light uppercase tracking-wider">Date & Time</span>
                    <span className="text-sm font-medium text-coffee-dark">{session.date}</span>
                    <span className="block text-xs text-text-light">{session.time}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center flex-shrink-0 text-brand-blue mt-0.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[11px] font-semibold text-text-light uppercase tracking-wider">Venue</span>
                    <span className="text-sm font-medium text-coffee-dark">{session.venue}</span>
                  </div>
                </div>
              </div>

              {/* Speaker Profile */}
              <div className="flex items-center gap-3.5 mb-8">
                <div className="w-11 h-11 rounded-full bg-coffee-dark text-white font-serif font-bold flex items-center justify-center flex-shrink-0 text-sm shadow-sm">
                  {session.speaker.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-semibold text-coffee-dark leading-tight">{session.speaker.name}</p>
                  <p className="text-xs text-text-medium">{session.speaker.title}</p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-coffee-light/20">
              <Link href="/upcoming-session" className="btn-primary w-full sm:w-auto justify-center text-xs">
                <span>Reserve Your Seat</span>
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/membership" className="btn-secondary w-full sm:w-auto justify-center text-xs">
                Annual Pass Access
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-coffee-light/25 flex flex-col justify-between group">
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="tag text-[10px]">{session.category || 'Archive'}</span>
            <span className="text-[11px] font-medium text-text-light uppercase tracking-wider">
              {session.date}
            </span>
          </div>

          <h3 className="font-serif text-lg font-semibold text-coffee-dark mb-2.5 group-hover:text-brand-blue transition-colors leading-snug">
            {session.title}
          </h3>
          <p className="text-xs text-text-medium line-clamp-3 leading-relaxed mb-4">
            {session.description}
          </p>
        </div>

        <div className="px-6 pb-6 pt-4 border-t border-coffee-light/15 flex items-center justify-between">
          <p className="text-xs font-medium text-coffee-dark">
            {session.speaker.name}
          </p>
          {session.youtubeUrl && (
            <a
              href={session.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF0000] hover:underline"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              Watch Recap
            </a>
          )}
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-coffee-light/25 flex flex-col justify-between group">
      <div className="p-6 lg:p-7">
        <div className="flex items-center justify-between mb-3">
          <span className="tag text-xs">{session.category || 'Session'}</span>
          <span className="text-xs font-semibold text-brand-blue tracking-wide uppercase">
            {session.date}
          </span>
        </div>

        <h3 className="font-serif text-xl font-bold text-coffee-dark mb-3 group-hover:text-brand-blue transition-colors leading-snug">
          {session.title}
        </h3>
        <p className="text-sm text-text-medium leading-relaxed mb-6 line-clamp-3">
          {session.description}
        </p>

        <div className="flex items-center gap-3 pt-4 border-t border-coffee-light/20">
          <div className="w-9 h-9 rounded-full bg-coffee-dark text-white font-serif font-bold flex items-center justify-center flex-shrink-0 text-xs shadow-xs">
            {session.speaker.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="text-sm font-semibold text-coffee-dark leading-tight">{session.speaker.name}</p>
            <p className="text-xs text-text-light">{session.speaker.title}</p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 pt-0">
        {session.youtubeUrl ? (
          <a
            href={session.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary w-full justify-center text-xs !py-3 hover:bg-[#FF0000] hover:border-[#FF0000] hover:text-white transition-all"
          >
            <svg className="w-4 h-4 fill-current mr-1.5" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Watch Recap on YouTube
          </a>
        ) : (
          <Link href="/upcoming-session" className="btn-primary w-full justify-center text-xs !py-3">
            Register Now
          </Link>
        )}
      </div>
    </div>
  );
}
