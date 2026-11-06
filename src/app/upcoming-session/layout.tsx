import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Upcoming Session — The Art of Ethiopian Coffee Roasting',
  description:
    'Register for our upcoming Seed To Cup session: The Art of Ethiopian Coffee Roasting. Learn green bean grading, roast profiling, and cupping with Head Roaster Abebe Fekadu at Cashmere Events Space.',
  openGraph: {
    title: 'Upcoming Session: The Art of Ethiopian Coffee Roasting | Seed To Cup',
    description:
      'Explore roasting techniques and profile development with Abebe Fekadu. Reserve your seat for this hands-on coffee session in Addis Ababa.',
    url: 'https://seedtocup.et/upcoming-session',
    siteName: 'Seed To Cup',
    images: [
      {
        url: '/images/illustration.png',
        width: 1200,
        height: 630,
        alt: 'Seed To Cup Coffee Session',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Upcoming Session: The Art of Ethiopian Coffee Roasting | Seed To Cup',
    description:
      'Explore roasting techniques and profile development with Abebe Fekadu at Cashmere Events Space.',
    images: ['/images/illustration.png'],
  },
};

export default function UpcomingSessionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
