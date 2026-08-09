import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, ArrowLeft, Bell, Share2 } from 'lucide-react';
import { announcementsData } from '@/data/announcements';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';

export async function generateStaticParams() {
  return announcementsData.map((a) => ({ slug: a.slug }));
}

export default function AnnouncementDetailPage({ params }: { params: { slug: string } }) {
  const item = announcementsData.find((a) => a.slug === params.slug);

  if (!item) notFound();

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <Link href="/announcements">
          <Button variant="ghost" size="sm" className="flex items-center gap-1.5 text-slate-600">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Announcements</span>
          </Button>
        </Link>

        <article className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge variant="gold">{item.category}</Badge>
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(item.date)}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 leading-tight">{item.title}</h1>
          </div>

          {item.image && (
            <div className="relative h-80 sm:h-[400px] w-full rounded-2xl overflow-hidden bg-slate-100 shadow-md">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
            {item.content}
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400">Apex Academy Communications Desk</span>
            <Button variant="outline" size="sm" className="flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Circular</span>
            </Button>
          </div>
        </article>
      </div>
    </div>
  );
}
