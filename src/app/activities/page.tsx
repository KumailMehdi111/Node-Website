import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import { Sparkles, Calendar, UserCheck } from 'lucide-react';
import { activitiesData } from '@/data/activities';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Activities & Clubs | Apex Academy International',
  description: 'Explore extra-curricular clubs, robotics, Model UN, music ensembles, and environmental societies at Apex Academy.',
};

export default function ActivitiesPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="bg-navy-950 text-white rounded-3xl p-10 lg:p-14 text-center max-w-4xl mx-auto space-y-4 shadow-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-600 text-white text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Co-Curricular Life</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">Clubs, Societies & Enrichment</h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Unleashing creativity, leadership, and collaboration through over 30 vibrant student-led organizations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activitiesData.map((act) => (
            <Card key={act.id} className="flex flex-col sm:flex-row overflow-hidden bg-white group">
              <div className="relative h-56 sm:h-auto sm:w-5/12 overflow-hidden bg-slate-100 shrink-0">
                <Image
                  src={act.image}
                  alt={act.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 sm:w-7/12 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <Badge variant="gold">{act.category}</Badge>
                  <h3 className="font-bold text-lg text-navy-900">{act.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{act.description}</p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5 font-medium text-navy-900">
                    <UserCheck className="w-3.5 h-3.5 text-gold-600" />
                    <span>Faculty Mentor: {act.mentor}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{act.meetingSchedule}</span>
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
