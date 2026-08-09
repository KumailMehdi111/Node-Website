import React from 'react';
import Link from 'next/link';
import { BookOpen, Users, Trophy, Download, FileCheck, PhoneCall, ArrowUpRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export const QuickLinksSection: React.FC = () => {
  const links = [
    {
      title: 'Admissions & Fees',
      desc: 'Eligibility criteria, online inquiry, and fee structure details.',
      href: '/admissions',
      icon: FileCheck,
      color: 'bg-blue-500 text-white',
    },
    {
      title: 'Academic Curriculum',
      desc: 'Primary, Middle, and Senior High subjects & IB pathways.',
      href: '/academics',
      icon: BookOpen,
      color: 'bg-emerald-500 text-white',
    },
    {
      title: 'Faculty & Mentors',
      desc: 'Meet our experienced academic staff and leadership.',
      href: '/staff',
      icon: Users,
      color: 'bg-purple-500 text-white',
    },
    {
      title: 'Sports & Clubs',
      desc: 'Explore varsity teams, swimming, robotics & MUN clubs.',
      href: '/activities',
      icon: Trophy,
      color: 'bg-gold-600 text-white',
    },
    {
      title: 'Downloads & Prospectus',
      desc: 'Get admission forms, syllabi, handbooks, and date sheets.',
      href: '/downloads',
      icon: Download,
      color: 'bg-navy-900 text-white',
    },
    {
      title: 'Get In Touch',
      desc: 'Campus directions, phone numbers, and inquiry desk.',
      href: '/contact',
      icon: PhoneCall,
      color: 'bg-rose-500 text-white',
    },
  ];

  return (
    <section className="py-20 bg-white border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold text-navy-900 tracking-tight">Explore Apex Academy</h2>
          <p className="text-slate-500 text-sm">
            Quick navigation portals for parents, prospective students, and visitors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map((link, idx) => {
            const Icon = link.icon;
            return (
              <Link key={idx} href={link.href}>
                <Card className="p-6 flex items-start gap-4 group h-full hover:border-gold-500/50">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-md ${link.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-grow space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-base text-navy-900 group-hover:text-gold-600 transition">
                        {link.title}
                      </h3>
                      <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-gold-600 transition" />
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{link.desc}</p>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
