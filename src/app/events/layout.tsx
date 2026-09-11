import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events & Activities Calendar',
  description: 'Stay updated with the latest events, activities, and programs at Apex Academy International.',
  openGraph: {
    title: 'Events & Activities Calendar',
    description: 'Stay updated with the latest events, activities, and programs at Apex Academy International.',
  },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
