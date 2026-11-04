import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Registration — Seed To Cup Coffee Society',
  description:
    'Register for our upcoming session, apply for annual membership, or book an expert coffee consultation with Seed To Cup by Cashmere Events.',
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
