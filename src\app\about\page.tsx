import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { PageHero, Section, Eyebrow } from '@/components/ui-bits';

export const metadata: Metadata = {
  title: 'About — Seed To Cup',
  description: 'Seed To Cup is a coffee education and experience platform created by Cashmere Events to celebrate the journey, culture and commerce of coffee.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title={<>A platform for <em className="italic text-ink">coffee</em>, culture and commerce.</>}
        intro="Seed To Cup is a coffee education and experience platform created to celebrate the journey, culture and commerce of coffee."
      />

      <Section>
        <div className="grid gap-16 md:grid-cols-[1.1fr_1fr] items-center">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md shadow-md bg-espresso/5">
            <Image
              src="/images/events/IMG_4004.jpg"
              alt="The Seed To Cup gathering in Addis Ababa"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <Eyebrow>Why we exist</Eyebrow>
            <h2 className="mt-5 text-4xl md:text-5xl font-display text-espresso">Coffee is more than a drink.</h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              It is a livelihood for millions of farmers, a ritual for billions of
              drinkers, and one of the most globally traded commodities on earth.
              Yet the distance between the seed and the cup — between the people
              who grow coffee and those who drink it — has never felt greater.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Seed To Cup was created to close that distance. To bring farmers,
              roasters, baristas, café owners and enthusiasts around the same
              table — and let coffee do what it does best: connect us.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-espresso text-cream">
        <div className="grid gap-14 md:grid-cols-2">
          <div>
            <Eyebrow><span className="!text-cream/70">Mission</span></Eyebrow>
            <h3 className="mt-5 text-4xl text-cream font-display">
              To educate, connect, and elevate the coffee community — from origin to consumption.
            </h3>
            <p className="mt-6 text-cream/75 leading-relaxed">
              Through monthly sessions, consultations, and community-driven
              experiences, we invest in the people who make coffee possible.
            </p>
          </div>
          <div>
            <Eyebrow><span className="!text-cream/70">Vision</span></Eyebrow>
            <h3 className="mt-5 text-4xl text-cream font-display">
              A future where every cup tells a story its drinker knows.
            </h3>
            <p className="mt-6 text-cream/75 leading-relaxed">
              We imagine a coffee industry that is more informed, more equitable,
              and more curious — one gathering at a time.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-14 md:grid-cols-[1.1fr_1fr] items-center">
          <div className="relative aspect-[4/3] w-full rounded-md overflow-hidden shadow-md bg-espresso/5">
            <Image
              src="/images/events/IMG_3876.jpg"
              alt="Cashmere Events production for Seed To Cup"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <Eyebrow>Cashmere Events</Eyebrow>
            <h2 className="mt-5 text-4xl md:text-5xl font-display text-espresso">
              Powered by <em className="italic text-ink">Cashmere Events</em>.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-lg">
              Seed To Cup is a signature initiative of Cashmere Events — a curator
              of intentional gatherings that bring people together around ideas,
              craft and culture. With meticulous event execution, custom staging, and immersive programming at venues like The HUB Addis, Cashmere Events crafts memorable experiences for Ethiopia's specialty coffee movement.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/upcoming-session" className="btn-primary">
                Join our next session
              </Link>
              <a
                href="https://linkedin.com/showcase/seedtocup-et"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                Follow on LinkedIn →
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* EVENT PHOTO GALLERY */}
      <Section className="border-t border-border/40 bg-latte/30">
        <div className="mb-12 flex items-end justify-between gap-6 flex-wrap">
          <div>
            <Eyebrow>Community Archive</Eyebrow>
            <h2 className="mt-4 font-display text-4xl text-espresso md:text-5xl">
              The faces and spaces of Seed To Cup.
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
            Curated snapshots from our live sessions, tastings, and community roundtables in Addis Ababa.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {[
            { img: '/images/events/IMG_3948.jpg', title: 'Accreditation', caption: 'Participant badges & welcome desk' },
            { img: '/images/events/IMG_3958.jpg', title: 'Sensory Cupping', caption: 'Exploring flavor profiles together' },
            { img: '/images/events/IMG_3971.jpg', title: 'Networking', caption: 'Connecting professionals & enthusiasts' },
            { img: '/images/events/IMG_4054.jpg', title: 'Appreciation', caption: 'Closing reflections & keynote' },
          ].map((item) => (
            <div key={item.title} className="group overflow-hidden rounded-md border border-border bg-card shadow-xs">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-espresso/5">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                <p className="font-display text-base text-espresso leading-snug">{item.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
