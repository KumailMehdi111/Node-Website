import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sports & Athletics',
  description: 'Explore our sports programs, facilities, and athletic achievements at Apex Academy International.',
  openGraph: {
    title: 'Sports & Athletics',
    description: 'Explore our sports programs, facilities, and athletic achievements at Apex Academy International.',
  },
};

export default function SportsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
