import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { QuickStats } from '@/components/home/QuickStats';
import { WelcomeSection } from '@/components/home/WelcomeSection';
import { NoticeBoardSection } from '@/components/home/NoticeBoardSection';
import { UpcomingEventsSection } from '@/components/home/UpcomingEventsSection';
import { QuickLinksSection } from '@/components/home/QuickLinksSection';
import { fetchSettings } from '@/lib/api';
import { mapSchoolInfo } from '@/lib/adapters';

export default async function HomePage() {
  let schoolInfo: any;
  try {
    const { schoolInformation, websiteSettings } = await fetchSettings();
    schoolInfo = mapSchoolInfo(schoolInformation, websiteSettings);
  } catch {
    schoolInfo = {} as any;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection
        heroImageUrl={schoolInfo.heroImageUrl}
        heroCampusHighlight={schoolInfo.heroCampusHighlight}
      />
      <QuickStats />
      <WelcomeSection />
      <NoticeBoardSection />
      <UpcomingEventsSection />
      <QuickLinksSection />
    </div>
  );
}
