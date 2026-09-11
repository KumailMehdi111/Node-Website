import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Bell, Calendar } from 'lucide-react';
import { fetchSettings } from '@/lib/api';
import { mapSchoolInfo } from '@/lib/adapters';

export const TopBar: React.FC = async () => {
  let schoolInfo: any;
  let whatsappNumber = '';
  try {
    const { schoolInformation, websiteSettings } = await fetchSettings();
    schoolInfo = mapSchoolInfo(schoolInformation, websiteSettings);
    whatsappNumber = websiteSettings?.whatsappNumber || '';
  } catch {
    schoolInfo = { phone: '+1 (555) 234-5678', email: 'info@apexacademy.edu', address: '100 Academy Heights Parkway, Education Valley, CA 90210' } as any;
  }
  return (
    <div className="bg-navy-950 text-slate-300 text-xs py-2 px-4 sm:px-6 border-b border-navy-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-4 text-slate-400">
          <div className="flex items-center gap-1.5 hover:text-gold-400 transition">
            <Phone className="w-3.5 h-3.5 text-gold-500" />
            <span>{schoolInfo.phone}</span>
          </div>
          {whatsappNumber && (
            <a
              href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-green-400 transition"
            >
              <span className="text-green-500 font-bold text-[10px]">WA</span>
              <span>{whatsappNumber}</span>
            </a>
          )}
          <div className="hidden sm:flex items-center gap-1.5 hover:text-gold-400 transition">
            <Mail className="w-3.5 h-3.5 text-gold-500" />
            <span>{schoolInfo.email}</span>
          </div>
          <div className="hidden lg:flex items-center gap-1.5 hover:text-gold-400 transition">
            <MapPin className="w-3.5 h-3.5 text-gold-500" />
            <span className="truncate max-w-xs">{schoolInfo.address}</span>
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
