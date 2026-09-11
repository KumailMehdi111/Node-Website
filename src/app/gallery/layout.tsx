import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Campus Life Photo Gallery',
  description: 'Browse photos and moments from campus life, events, sports, and activities at Apex Academy International.',
  openGraph: {
    title: 'Campus Life Photo Gallery',
    description: 'Browse photos and moments from campus life, events, sports, and activities at Apex Academy International.',
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
