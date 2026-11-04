import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, Eyebrow } from "@/components/ui-bits";
import farm from "@/assets/farm.jpg";
import illustrationAsset from "@/assets/illustration.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Seed To Cup" },
      { name: "description", content: "Seed To Cup is a coffee education and experience platform created by Cashmere Events to celebrate the journey, culture and commerce of coffee." },
      { property: "og:title", content: "About Seed To Cup" },
      { property: "og:description", content: "Our story, mission and connection to Cashmere Events." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title={<>A platform for <em className="italic text-ink">coffee</em>, culture and commerce.</>}
        intro="Seed To Cup is a coffee education and experience platform created to celebrate the journey, culture and commerce of coffee."
      />

      <Section>
        <div className="grid gap-16 md:grid-cols-[1.1fr_1fr] items-center">
          <img src={farm} alt="Ethiopian coffee farm at sunrise" className="aspect-[4/3] w-full rounded-md object-cover" loading="lazy" />
          <div>
            <Eyebrow>Why we exist</Eyebrow>
            <h2 className="mt-5 text-4xl md:text-5xl">Coffee is more than a drink.</h2>
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
            <h3 className="mt-5 text-4xl text-cream">
              To educate, connect, and elevate the coffee community — from origin to consumption.
            </h3>
            <p className="mt-6 text-cream/75 leading-relaxed">
              Through monthly sessions, consultations, and community-driven
              experiences, we invest in the people who make coffee possible.
            </p>
          </div>
          <div>
            <Eyebrow><span className="!text-cream/70">Vision</span></Eyebrow>
            <h3 className="mt-5 text-4xl text-cream">
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
        <div className="grid gap-14 md:grid-cols-[1fr_1.2fr] items-center">
          <img src={illustrationAsset.url} alt="Coffee community" className="w-full rounded-md bg-latte/40 p-8" loading="lazy" />
          <div>
            <Eyebrow>Cashmere Events</Eyebrow>
            <h2 className="mt-5 text-4xl md:text-5xl">Powered by <em className="italic text-ink">Cashmere Events</em>.</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-lg">
              Seed To Cup is a signature initiative of Cashmere Events — a curator
              of intentional gatherings that bring people together around ideas,
              craft and culture. Coffee, for us, is the perfect medium.
            </p>
            <Link to="/upcoming" className="btn-primary mt-8">Join our next session</Link>
          </div>
        </div>
      </Section>
    </>
  );
}
