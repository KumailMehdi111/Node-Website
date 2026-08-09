import React from 'react';
import Link from 'next/link';
import { GraduationCap, Phone, Mail, MapPin, Facebook, Instagram, Youtube, ArrowRight } from 'lucide-react';
import { schoolInfoData } from '@/data/schoolInfo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-950 text-slate-300 pt-16 pb-8 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-navy-800">
          {/* Column 1: School Overview */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold-600 flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-white tracking-tight">APEX ACADEMY</h3>
                <p className="text-[11px] text-gold-400 font-semibold tracking-widest uppercase">
                  International School
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {schoolInfoData.tagline}. Established in {schoolInfoData.established}, accredited by {schoolInfoData.accreditation}.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-navy-800 hover:bg-gold-600 hover:text-white flex items-center justify-center transition"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-navy-800 hover:bg-gold-600 hover:text-white flex items-center justify-center transition"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-navy-800 hover:bg-gold-600 hover:text-white flex items-center justify-center transition"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-gold-500 pl-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/about" className="hover:text-gold-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-gold-500" /> About Apex
                </Link>
              </li>
              <li>
                <Link href="/admissions" className="hover:text-gold-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-gold-500" /> Admissions
                </Link>
              </li>
              <li>
                <Link href="/academics" className="hover:text-gold-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-gold-500" /> Academic Curriculum
                </Link>
              </li>
              <li>
                <Link href="/examinations" className="hover:text-gold-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-gold-500" /> Examination Cell
                </Link>
              </li>
              <li>
                <Link href="/staff" className="hover:text-gold-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-gold-500" /> Faculty Directory
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Student Life */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-gold-500 pl-2">
              Student Life
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/activities" className="hover:text-gold-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-gold-500" /> Clubs & Societies
                </Link>
              </li>
              <li>
                <Link href="/sports" className="hover:text-gold-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-gold-500" /> Athletic Programs
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-gold-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-gold-500" /> Photo & Video Gallery
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-gold-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-gold-500" /> Upcoming Events
                </Link>
              </li>
              <li>
                <Link href="/downloads" className="hover:text-gold-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-gold-500" /> Forms & Prospectus
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-gold-500 pl-2">
              Contact Info
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <span>{schoolInfoData.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                <span>{schoolInfoData.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-500 shrink-0" />
                <span>{schoolInfoData.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {schoolInfoData.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400 transition">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition">Terms of Service</a>
            <a href="#" className="hover:text-slate-400 transition">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
