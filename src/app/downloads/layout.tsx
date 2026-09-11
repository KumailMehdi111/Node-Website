import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Downloads & Resources',
  description: 'Download important documents, syllabi, circulars, and resources from Apex Academy International.',
  openGraph: {
    title: 'Downloads & Resources',
    description: 'Download important documents, syllabi, circulars, and resources from Apex Academy International.',
  },
};

export default function DownloadsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
