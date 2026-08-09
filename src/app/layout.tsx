import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { TopBar } from '@/components/layout/TopBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { schoolInfoData } from '@/data/schoolInfo';

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
    default: `${schoolInfoData.name} | Inspiring Excellence & Character`,
    template: `%s | ${schoolInfoData.name}`,
  },
  description: `${schoolInfoData.name} is a premier international school offering CBSE & IB curriculum, state-of-the-art STEM robotics, sports academies, and holistic education.`,
  keywords: ['School', 'Academy', 'Education', 'Admissions 2026', 'CBSE', 'IB Diploma', 'STEM', 'Robotics', 'Sports Academy'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans flex flex-col min-h-screen">
        <TopBar />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
