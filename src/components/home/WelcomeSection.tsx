import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Quote, CheckCircle2 } from 'lucide-react';
import { fetchSettings } from '@/lib/api';
import { mapSchoolInfo } from '@/lib/adapters';
import { Button } from '@/components/ui/Button';

export const WelcomeSection: React.FC = async () => {
  let schoolInfo: any;
  try {
    const { schoolInformation, websiteSettings } = await fetchSettings();
    schoolInfo = mapSchoolInfo(schoolInformation, websiteSettings);
  } catch {
    schoolInfo = { principalPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80', principalName: 'Dr. Eleanor Vance', principalTitle: 'Principal & Academic Director (Ph.D. Education, Oxford)', principalMessage: 'At Apex Academy, we believe that education is not merely the accumulation of knowledge, but the awakening of creative passion, critical inquiry, and compassionate leadership.' } as any;
  }
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Principal Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white">
              <Image
                src={schoolInfo.principalPhoto}
                alt={schoolInfo.principalName}
                width={600}
                height={750}
                className="w-full h-[460px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h4 className="text-lg font-bold">{schoolInfo.principalName}</h4>
                <p className="text-xs text-gold-400 font-medium">{schoolInfo.principalTitle}</p>
              </div>
            </div>
          </div>

          {/* Principal Message & Overview */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 text-gold-900 text-xs font-semibold">
              <Quote className="w-3.5 h-3.5 text-gold-700" />
              <span>Leadership Vision</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
              Welcome to {schoolInfo.name || 'Apex Academy International'}
            </h2>

            <p className="text-slate-600 text-base leading-relaxed italic border-l-4 border-gold-500 pl-4 bg-white py-3 rounded-r-lg shadow-sm">
              "{schoolInfo.principalMessage}"
            </p>

            <p className="text-slate-600 text-sm leading-relaxed">
              {schoolInfo.aboutText || 'We empower learners to think critically, communicate articulately, and lead compassionately in a rapidly changing world. Our holistic framework harmonizes academic rigor with artistic creativity and athletic wellness.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Holistic Curriculum (CBSE & IB)',
                '1:13 Teacher-to-Student Ratio',
                'Advanced Robotics & AI Labs',
                'Global University Placement',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm font-semibold text-navy-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link href="/about">
                <Button variant="primary">Read Full Principal Message</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
