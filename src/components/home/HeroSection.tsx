"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Award, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface HeroSectionProps {
  heroImageUrl?: string;
  heroCampusHighlight?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  heroImageUrl = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1000&q=80',
  heroCampusHighlight = '45-Acre Smart Academic & Athletic Campus',
}) => {
  return (
    <section className="relative bg-navy-950 text-white py-20 lg:py-28 overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-gold-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-navy-700/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-800/90 border border-gold-500/30 text-gold-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Admissions Open for Academic Session 2026–2027</span>
            </div>

            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight leading-tight">
              Shaping Minds, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-amber-300 to-gold-500">
                Inspiring Futures.
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              Welcome to Apex Academy International — where academic rigor meets character building, state-of-the-art STEM innovation, and vibrant sports excellence.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/admissions">
                <Button variant="accent" size="lg" className="font-bold flex items-center gap-2">
                  <span>Apply for Admission</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="border-slate-600 text-white hover:bg-slate-800">
                  Explore Campus
                </Button>
              </Link>
            </div>

            {/* Quick feature badges */}
            <div className="pt-8 grid grid-cols-3 gap-4 border-t border-navy-800/80">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-gold-500 shrink-0" />
                <span className="text-xs text-slate-300 font-medium">CBSE & IB Accredited</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Award className="w-5 h-5 text-gold-500 shrink-0" />
                <span className="text-xs text-slate-300 font-medium">99.4% Pass Rate</span>
              </div>
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-5 h-5 text-gold-500 shrink-0" />
                <span className="text-xs text-slate-300 font-medium">STEM & AP Courses</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-navy-800 bg-navy-900 group">
              <Image
                src={heroImageUrl}
                alt="Apex Academy Campus & Students"
                width={800}
                height={600}
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-navy-900/90 backdrop-blur-md border border-navy-700 text-white">
                <p className="text-xs font-bold text-gold-400 uppercase tracking-widest">Campus Highlight</p>
                <p className="text-sm font-semibold text-white">{heroCampusHighlight}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
