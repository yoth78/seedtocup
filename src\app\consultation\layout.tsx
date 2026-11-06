import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coffee Consultation',
  description:
    'Book a personalized 30-minute coffee consultation with Seed To Cup experts. Guidance on café opening, coffee sourcing, roasting profiles, business strategy, and more.',
  openGraph: {
    title: 'Expert Coffee Consultation | Seed To Cup',
    description:
      'Book a personalized 30-minute coffee consultation with Seed To Cup experts. Guidance on café opening, coffee sourcing, roasting profiles, and business strategy.',
    type: 'website',
  },
};

export default function ConsultationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
