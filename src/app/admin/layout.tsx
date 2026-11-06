import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Control Center — Seed To Cup',
  description: 'Manage event registrations, memberships, consultations, and platform content.',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-latte/30 text-espresso">{children}</div>;
}
