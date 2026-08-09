"use client";

import React from 'react';
import Image from 'next/image';
import { Maximize2, Calendar } from 'lucide-react';
import { GalleryImage } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';

interface GalleryCardProps {
  image: GalleryImage;
  onOpenLightbox: (image: GalleryImage) => void;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({ image, onOpenLightbox }) => {
  return (
    <Card className="group cursor-pointer overflow-hidden flex flex-col h-full">
      <div
        className="relative h-60 w-full overflow-hidden bg-slate-100"
        onClick={() => onOpenLightbox(image)}
      >
        <Image
          src={image.imageUrl}
          alt={image.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-navy-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white/90 text-navy-900 flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
            <Maximize2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col justify-between flex-grow space-y-2">
        <div className="flex items-center justify-between">
          <Badge variant="navy">{image.category}</Badge>
          <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(image.date)}
          </span>
        </div>
        <h4 className="text-sm font-bold text-navy-900 line-clamp-1">{image.title}</h4>
      </div>
    </Card>
  );
};
