import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Examinations & Results',
  description: 'View examination schedules, guidelines, and academic results at Apex Academy International.',
  openGraph: {
    title: 'Examinations & Results',
    description: 'View examination schedules, guidelines, and academic results at Apex Academy International.',
  },
};

export default function ExaminationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
