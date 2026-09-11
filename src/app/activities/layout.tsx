import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Activities & Extracurriculars',
  description: 'Discover extracurricular activities, clubs, and student life at Apex Academy International.',
  openGraph: {
    title: 'Activities & Extracurriculars',
    description: 'Discover extracurricular activities, clubs, and student life at Apex Academy International.',
  },
};

export default function ActivitiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
