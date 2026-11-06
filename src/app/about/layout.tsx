import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Discover the story behind Seed To Cup — Ethiopia\'s premier coffee education and experience platform powered by Cashmere Events. Celebrating coffee culture, knowledge, and commerce from farm to cup.',
  openGraph: {
    title: 'About Seed To Cup — Our Story & Mission',
    description:
      'A coffee education and experience platform created to celebrate the journey, culture, and commerce of coffee in the birthplace of Arabica.',
    type: 'website',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
