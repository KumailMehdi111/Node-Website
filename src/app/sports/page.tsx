"use client";

import React, { useState, useEffect } from 'react';
import { Trophy, Award, UserCheck } from 'lucide-react';
import { fetchSports } from '@/lib/api';
import { mapSport } from '@/lib/adapters';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default function SportsPage() {
  const [sports, setSports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSports()
      .then((raw) => setSports(raw.map(mapSport)))
      .catch((err) => { console.error('Sports load error:', err); setSports([]); })
      .finally(() => setLoading(false));
  }, []);

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

        {loading ? (
          <div className="text-center py-20 text-slate-500 font-medium">Loading sports...</div>
        ) : sports.length === 0 ? (
          <div className="text-center py-20 text-slate-400">No sports found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sports.map((sp) => (
              <Card key={sp.id} className="flex flex-col overflow-hidden bg-white group">
                <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={sp.image}
                    alt={sp.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80';
                    }}
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
                      {sp.achievements?.map((ach: string, idx: number) => (
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
        )}
      </div>
    </div>
  );
}
