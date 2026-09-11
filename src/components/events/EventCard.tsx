"use client";

import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { EventItem } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';

interface EventCardProps {
  event: EventItem;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <Card className="flex flex-col h-full group">
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80';
          }}
        />
        <div className="absolute top-3 left-3 bg-navy-900/90 backdrop-blur-md text-white px-3 py-1 rounded-lg text-center shadow-md">
          <span className="block text-xs font-bold text-gold-400 uppercase">
            {new Date(event.startDate).toLocaleString('default', { month: 'short' })}
          </span>
          <span className="block text-lg font-extrabold leading-none">
            {new Date(event.startDate).getDate()}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
        <div className="space-y-2">
          <Badge variant="navy">{event.category}</Badge>

          <h3 className="font-bold text-base text-navy-900 group-hover:text-gold-600 transition line-clamp-2">
            {event.title}
          </h3>

          <div className="space-y-1 text-xs text-slate-500 pt-1">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-gold-600 shrink-0" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 pt-1">
            {event.excerpt}
          </p>
        </div>

        <Link
          href={`/events/${event.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-900 hover:text-gold-600 transition pt-2"
        >
          <span>Event Details & Schedule</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </Card>
  );
};
