import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { TopBar } from '@/components/layout/TopBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { fetchSettings } from '@/lib/api';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Apex Academy International | Inspiring Excellence & Character',
    template: '%s | Apex Academy International',
  },
  description: 'Apex Academy International is a premier international school offering CBSE & IB curriculum, state-of-the-art STEM robotics, sports academies, and holistic education.',
  keywords: ['School', 'Academy', 'Education', 'Admissions 2026', 'CBSE', 'IB Diploma', 'STEM', 'Robotics', 'Sports Academy'],
  openGraph: {
    title: 'Apex Academy International | Inspiring Excellence & Character',
    description: 'A premier international school offering CBSE & IB curriculum, state-of-the-art STEM robotics, sports academies, and holistic education.',
    url: 'https://apexacademy.edu',
    siteName: 'Apex Academy International',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apex Academy International',
    description: 'A premier international school offering CBSE & IB curriculum, STEM robotics, and holistic education.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let schoolName = 'APEX ACADEMY';
  try {
    const { schoolInformation, websiteSettings } = await fetchSettings();
    schoolName = (schoolInformation?.name || websiteSettings?.schoolName || 'APEX ACADEMY').toUpperCase();
  } catch {}

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="font-sans flex flex-col min-h-screen" suppressHydrationWarning>
        <TopBar />
        <Header schoolName={schoolName} />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
