import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { QuickStats } from '@/components/home/QuickStats';
import { WelcomeSection } from '@/components/home/WelcomeSection';
import { NoticeBoardSection } from '@/components/home/NoticeBoardSection';
import { UpcomingEventsSection } from '@/components/home/UpcomingEventsSection';
import { QuickLinksSection } from '@/components/home/QuickLinksSection';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <QuickStats />
      <WelcomeSection />
      <NoticeBoardSection />
      <UpcomingEventsSection />
      <QuickLinksSection />
    </div>
  );
}
