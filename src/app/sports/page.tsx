import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import { Trophy, Award, ShieldCheck, UserCheck } from 'lucide-react';
import { sportsData } from '@/data/sports';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Sports & Athletics | Apex Academy International',
  description: 'Olympic aquatics, varsity basketball, soccer, tennis, and athletics at Apex Academy Sports Complex.',
};

export default function SportsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="bg-navy-950 text-white rounded-3xl p-10 lg:p-14 text-center max-w-4xl mx-auto space-y-4 shadow-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-600 text-white text-xs font-bold">
            <Trophy className="w-3.5 h-3.5" />
            <span>Athletic Excellence</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">Sports & Varsity Athletics</h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Nurturing physical vitality, sportsmanship, and teamwork through Olympic-standard sports infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sportsData.map((sp) => (
            <Card key={sp.id} className="flex flex-col overflow-hidden bg-white group">
              <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                <Image
                  src={sp.image}
                  alt={sp.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="gold">{sp.category} Sports</Badge>
                </div>
              </div>
              <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                <div className="space-y-2">
                  <h3 className="font-bold text-xl text-navy-900">{sp.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{sp.description}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs font-bold text-navy-900">
                    <UserCheck className="w-3.5 h-3.5 text-gold-600" />
                    <span>Head Coach: {sp.coach}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Key Achievements:</span>
                    {sp.achievements.map((ach, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                        <Award className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
