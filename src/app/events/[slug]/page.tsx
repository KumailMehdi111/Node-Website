import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, MapPin, ArrowLeft, Share2 } from 'lucide-react';
import { eventsData } from '@/data/events';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';

export async function generateStaticParams() {
  return eventsData.map((e) => ({ slug: e.slug }));
}

export default function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = eventsData.find((e) => e.slug === params.slug);

  if (!event) notFound();

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <Link href="/events">
          <Button variant="ghost" size="sm" className="flex items-center gap-1.5 text-slate-600">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Events</span>
          </Button>
        </Link>

        <article className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8">
          <div className="space-y-4">
            <Badge variant="navy">{event.category}</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 leading-tight">{event.title}</h1>

            <div className="flex flex-wrap items-center gap-6 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs sm:text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gold-600 shrink-0" />
                <span>{formatDate(event.startDate)} {event.endDate ? `- ${formatDate(event.endDate)}` : ''}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold-600 shrink-0" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold-600 shrink-0" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>

          <div className="relative h-80 sm:h-[400px] w-full rounded-2xl overflow-hidden bg-slate-100 shadow-md">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-navy-900">About This Event</h3>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
              {event.description}
            </p>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <Button variant="accent" size="sm" className="font-bold">
              Add to Google Calendar
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Event</span>
            </Button>
          </div>
        </article>
      </div>
    </div>
  );
}
