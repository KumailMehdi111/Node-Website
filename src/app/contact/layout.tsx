import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us & Campus Inquiry',
  description: 'Get in touch with Apex Academy International. Find our contact details, location, and send an inquiry.',
  openGraph: {
    title: 'Contact Us & Campus Inquiry',
    description: 'Get in touch with Apex Academy International. Find our contact details, location, and send an inquiry.',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
