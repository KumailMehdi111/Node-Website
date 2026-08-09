import React from 'react';
import { Users, GraduationCap, Trophy, MapPin, Sparkles } from 'lucide-react';
import { schoolInfoData } from '@/data/schoolInfo';

export const QuickStats: React.FC = () => {
  const stats = [
    {
      icon: Users,
      label: 'Enrolled Students',
      value: `${schoolInfoData.stats.students}+`,
      desc: 'Across Primary to High School',
    },
    {
      icon: GraduationCap,
      label: 'Faculty & Mentors',
      value: `${schoolInfoData.stats.teachers}+`,
      desc: 'Expert & Certified Educators',
    },
    {
      icon: Trophy,
      label: 'Academic Success',
      value: schoolInfoData.stats.passRate,
      desc: 'Board Exam Distinction Rate',
    },
    {
      icon: MapPin,
      label: 'Campus Area',
      value: `${schoolInfoData.stats.campusAcres} Acres`,
      desc: 'World-Class Infrastructure',
    },
  ];

  return (
    <section className="bg-white py-12 border-b border-slate-100 shadow-sm relative z-20 -mt-8 max-w-6xl mx-auto rounded-2xl border">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 px-6 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-4 pt-4 lg:pt-0 pl-0 lg:pl-4 first:pl-0">
              <div className="w-12 h-12 rounded-xl bg-navy-50 text-navy-900 flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6 text-gold-600" />
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight block">
                  {item.value}
                </span>
                <span className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
                  {item.label}
                </span>
                <span className="text-[11px] text-slate-400 block">{item.desc}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
