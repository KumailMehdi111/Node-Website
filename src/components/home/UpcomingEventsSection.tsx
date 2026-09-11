import React from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { fetchEvents } from '@/lib/api';
import { mapEvent } from '@/lib/adapters';
import { EventCard } from '@/components/events/EventCard';
import { Button } from '@/components/ui/Button';

export const UpcomingEventsSection: React.FC = async () => {
  let featuredEvents: any[] = [];
  try {
    const raw = await fetchEvents();
    featuredEvents = raw.slice(0, 3).map(mapEvent);
  } catch {
    featuredEvents = [];
  }

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 text-gold-900 text-xs font-semibold mb-3">
              <Calendar className="w-3.5 h-3.5 text-gold-700" />
              <span>Campus Calendar</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
              Upcoming School Events
            </h2>
            <p className="text-slate-500 text-sm mt-1 max-w-xl">
              From science expos and sports galas to musical performances and parent conferences.
            </p>
          </div>

          <Link href="/events">
            <Button variant="primary" className="flex items-center gap-2">
              <span>Explore Full Calendar</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
};
