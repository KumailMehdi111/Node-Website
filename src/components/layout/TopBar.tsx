import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Bell, Calendar } from 'lucide-react';
import { schoolInfoData } from '@/data/schoolInfo';

export const TopBar: React.FC = () => {
  return (
    <div className="bg-navy-950 text-slate-300 text-xs py-2 px-4 sm:px-6 border-b border-navy-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-4 text-slate-400">
          <div className="flex items-center gap-1.5 hover:text-gold-400 transition">
            <Phone className="w-3.5 h-3.5 text-gold-500" />
            <span>{schoolInfoData.phone}</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 hover:text-gold-400 transition">
            <Mail className="w-3.5 h-3.5 text-gold-500" />
            <span>{schoolInfoData.email}</span>
          </div>
          <div className="hidden lg:flex items-center gap-1.5 hover:text-gold-400 transition">
            <MapPin className="w-3.5 h-3.5 text-gold-500" />
            <span className="truncate max-w-xs">{schoolInfoData.address}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-navy-800/80 px-2.5 py-0.5 rounded-full text-gold-400 font-medium">
            <Bell className="w-3 h-3 animate-pulse" />
            <span>Admissions 2026-27 Open</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/downloads" className="hover:text-gold-400 transition">
              Downloads
            </Link>
            <span className="text-navy-700">|</span>
            <Link href="/contact" className="hover:text-gold-400 transition">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
