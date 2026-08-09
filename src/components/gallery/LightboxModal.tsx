"use client";

import React from 'react';
import Image from 'next/image';
import { GalleryImage } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { formatDate } from '@/lib/utils';

interface LightboxModalProps {
  image: GalleryImage | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ image, onClose }) => {
  if (!image) return null;

  return (
    <Modal isOpen={!!image} onClose={onClose} title={image.title} maxWidth="4xl">
      <div className="space-y-4">
        <div className="relative w-full h-[450px] rounded-xl overflow-hidden bg-navy-950">
          <Image
            src={image.imageUrl}
            alt={image.title}
            fill
            className="object-contain"
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
          <div>
            <span className="font-bold text-navy-900">{image.category} Gallery</span>
            <p className="text-slate-600 text-xs mt-1">{image.description}</p>
          </div>
          <span className="text-xs text-slate-400 font-medium shrink-0">
            Uploaded: {formatDate(image.date)}
          </span>
        </div>
      </div>
    </Modal>
  );
};
