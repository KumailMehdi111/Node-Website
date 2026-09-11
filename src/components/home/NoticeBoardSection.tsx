import React from 'react';
import Link from 'next/link';
import { Bell, ArrowRight } from 'lucide-react';
import { fetchAnnouncements } from '@/lib/api';
import { mapAnnouncement } from '@/lib/adapters';
import { AnnouncementCard } from '@/components/announcements/AnnouncementCard';
import { Button } from '@/components/ui/Button';

export const NoticeBoardSection: React.FC = async () => {
  let featuredAnnouncements: any[] = [];
  try {
    const raw = await fetchAnnouncements();
    featuredAnnouncements = raw.slice(0, 3).map(mapAnnouncement);
  } catch {
    featuredAnnouncements = [];
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-100 text-navy-900 text-xs font-semibold mb-3">
              <Bell className="w-3.5 h-3.5 text-gold-600" />
              <span>Official Communications</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
              Notice Board & Announcements
            </h2>
            <p className="text-slate-500 text-sm mt-1 max-w-xl">
              Stay updated with academic notices, exam timetables, admission alerts, and campus news.
            </p>
          </div>

          <Link href="/announcements">
            <Button variant="outline" className="flex items-center gap-2">
              <span>View All Notices</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredAnnouncements.map((announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))}
        </div>
      </div>
    </section>
  );
};
