import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Past Sessions',
  description:
    'Explore the past sessions, masterclasses, and workshops that have shaped our coffee community — from coffee origins and agronomy to café entrepreneurship and brewing science.',
  openGraph: {
    title: 'Past Sessions | Seed To Cup',
    description:
      'Explore the sessions that have shaped our community — from coffee origins to business strategy.',
  },
};

export default function SessionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
