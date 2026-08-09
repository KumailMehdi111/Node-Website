import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import { Award, Compass, ShieldCheck, HeartHandshake, BookOpen, Users } from 'lucide-react';
import { schoolInfoData } from '@/data/schoolInfo';
import { Card } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'About Us | Apex Academy International',
  description: 'Discover the rich history, core educational philosophy, leadership, and world-class campus of Apex Academy International.',
};

export default function AboutPage() {
  const values = [
    {
      icon: Compass,
      title: 'Academic Inquiry',
      desc: 'Fostering deep curiosity, analytical thinking, and scientific experimentation over rote learning.',
    },
    {
      icon: ShieldCheck,
      title: 'Moral Integrity',
      desc: 'Instilling ethical decision-making, honesty, empathy, and responsibility toward society.',
    },
    {
      icon: HeartHandshake,
      title: 'Global Inclusivity',
      desc: 'Welcoming multicultural perspectives and building compassionate cross-border friendships.',
    },
    {
      icon: Award,
      title: 'Relentless Excellence',
      desc: 'Encouraging every student to discover their maximum potential in academics, arts, and athletics.',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Header Hero Banner */}
        <div className="bg-navy-950 text-white rounded-3xl p-10 lg:p-16 relative overflow-hidden shadow-2xl">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="text-xs font-bold text-gold-400 uppercase tracking-widest bg-navy-800 px-3 py-1 rounded-full">
              Established {schoolInfoData.established}
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Legacy of Educational Distinction
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              For over three decades, Apex Academy International has remained at the vanguard of transformative education, preparing students for leadership in world-class universities and global careers.
            </p>
          </div>
        </div>

        {/* Vision & Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-8 space-y-4 bg-white border-l-4 border-l-navy-900">
            <h3 className="text-2xl font-extrabold text-navy-900">Our Vision</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              To be a globally recognized benchmark in school education where innovation, character formation, and human empathy converge to nurture leaders of tomorrow.
            </p>
          </Card>

          <Card className="p-8 space-y-4 bg-white border-l-4 border-l-gold-500">
            <h3 className="text-2xl font-extrabold text-navy-900">Our Mission</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              To provide a safe, intellectually stimulating environment through world-class curricula, state-of-the-art laboratories, and comprehensive mentorship that empowers every learner.
            </p>
          </Card>
        </div>

        {/* Core Values */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-extrabold text-navy-900">Our Core Pillars</h2>
            <p className="text-slate-500 text-sm">The foundational principles that guide our academic and community culture.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <Card key={idx} className="p-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-navy-50 text-navy-900 flex items-center justify-center mx-auto shadow-sm">
                    <Icon className="w-6 h-6 text-gold-600" />
                  </div>
                  <h4 className="font-bold text-base text-navy-900">{val.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{val.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Campus & Infrastructure Overview */}
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-3xl font-extrabold text-navy-900">World-Class Campus Infrastructure</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Spread across 45 acres of green, eco-friendly terrain, Apex Academy provides cutting-edge smart classrooms, digital libraries, 3D printing robotics labs, an Olympic aquatics complex, and outdoor athletic arenas.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-50 rounded-xl">
                <span className="text-2xl font-bold text-navy-900 block">45 Acres</span>
                <span className="text-xs text-slate-500">Eco-Friendly Campus</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <span className="text-2xl font-bold text-navy-900 block">12 Labs</span>
                <span className="text-xs text-slate-500">Robotics, Bio & AI</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative h-80 rounded-xl overflow-hidden shadow-lg border border-slate-100">
              <Image
                src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=80"
                alt="Apex Academy Architecture"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
