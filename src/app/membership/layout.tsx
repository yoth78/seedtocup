import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Membership',
  description:
    'Join the Seed To Cup Coffee Community. Become an annual member to gain year-round access to monthly masterclasses, cuppings, industry networking, and exclusive coffee resources.',
  openGraph: {
    title: 'Membership | Seed To Cup Coffee Community',
    description:
      'Gain full annual access to all Seed To Cup sessions, cuppings, workshops, and exclusive Ethiopian coffee community benefits.',
    type: 'website',
  },
};

export default function MembershipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
