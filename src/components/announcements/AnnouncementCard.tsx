import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight, Bell } from 'lucide-react';
import { Announcement } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';

interface AnnouncementCardProps {
  announcement: Announcement;
}

export const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ announcement }) => {
  const categoryVariantMap: Record<Announcement['category'], 'navy' | 'gold' | 'emerald' | 'rose' | 'slate'> = {
    Academic: 'navy',
    Admission: 'gold',
    Examination: 'rose',
    Sports: 'emerald',
    General: 'slate',
  };

  return (
    <Card className="flex flex-col h-full group">
      {announcement.image && (
        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
          <Image
            src={announcement.image}
            alt={announcement.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {announcement.isImportant && (
            <div className="absolute top-3 left-3 bg-rose-600 text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
              <Bell className="w-3 h-3 animate-bounce" />
              <span>Important</span>
            </div>
          )}
        </div>
      )}

      <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <Badge variant={categoryVariantMap[announcement.category]}>
              {announcement.category}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatDate(announcement.date)}</span>
            </div>
          </div>

          <h3 className="font-bold text-lg text-navy-900 group-hover:text-gold-600 transition line-clamp-2">
            {announcement.title}
          </h3>

          <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
            {announcement.excerpt}
          </p>
        </div>

        <Link
          href={`/announcements/${announcement.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-900 hover:text-gold-600 transition pt-2"
        >
          <span>Read Full Notice</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </Card>
  );
};
