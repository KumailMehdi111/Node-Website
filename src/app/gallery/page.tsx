"use client";

import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import { galleryData } from '@/data/gallery';
import { GalleryImage } from '@/types';
import { GalleryCard } from '@/components/gallery/GalleryCard';
import { LightboxModal } from '@/components/gallery/LightboxModal';
import { Tabs } from '@/components/ui/Tabs';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);

  const categories = ['All', 'Campus', 'Sports', 'Science & Tech', 'Arts & Culture', 'Events'];

  const tabOptions = categories.map((cat) => ({
    id: cat,
    label: cat,
    count: cat === 'All' ? galleryData.length : galleryData.filter((img) => img.category === cat).length,
  }));

  const filteredImages = galleryData.filter(
    (img) => activeCategory === 'All' || img.category === activeCategory
  );

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="bg-navy-950 text-white rounded-3xl p-10 lg:p-14 text-center max-w-4xl mx-auto space-y-4 shadow-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-600 text-white text-xs font-bold">
            <Camera className="w-3.5 h-3.5" />
            <span>Campus Media Hub</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">Campus Life Photo Gallery</h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Visual highlights of academic life, sports championships, theatrical performances, and campus infrastructure.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex justify-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <Tabs tabs={tabOptions} activeTab={activeCategory} onChange={setActiveCategory} />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.map((img) => (
            <GalleryCard key={img.id} image={img} onOpenLightbox={setActiveImage} />
          ))}
        </div>

        {/* Lightbox Modal */}
        <LightboxModal image={activeImage} onClose={() => setActiveImage(null)} />
      </div>
    </div>
  );
}
