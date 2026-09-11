import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Latest Announcements',
  description: 'Read the latest announcements, updates, and notices from Apex Academy International.',
  openGraph: {
    title: 'Latest Announcements',
    description: 'Read the latest announcements, updates, and notices from Apex Academy International.',
  },
};

export default function AnnouncementsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
