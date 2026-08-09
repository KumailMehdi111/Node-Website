"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { BookOpen, CheckCircle2, UserCheck, Layers, Award } from 'lucide-react';
import { academicProgramsData } from '@/data/academics';
import { Card } from '@/components/ui/Card';
import { Tabs } from '@/components/ui/Tabs';
import { Badge } from '@/components/ui/Badge';

export default function AcademicsPage() {
  const [activeLevel, setActiveLevel] = useState<string>('Primary');

  const selectedProgram = academicProgramsData.find((p) => p.level === activeLevel) || academicProgramsData[0];

  const tabOptions = [
    { id: 'Primary', label: 'Primary School (Grades 1-5)' },
    { id: 'Middle School', label: 'Middle School (Grades 6-8)' },
    { id: 'Senior High', label: 'Senior High (Grades 9-12)' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Banner */}
        <div className="bg-navy-950 text-white rounded-3xl p-10 lg:p-14 text-center max-w-4xl mx-auto space-y-4 shadow-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-600 text-white text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>CBSE & International Baccalaureate Pathways</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">Academic Curriculum & Excellence</h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            A balanced academic framework integrating inquiry-based science, advanced mathematics, global languages, humanities, and technology.
          </p>
        </div>

        {/* Level Switcher Tabs */}
        <div className="space-y-8">
          <div className="flex justify-center">
            <Tabs tabs={tabOptions} activeTab={activeLevel} onChange={setActiveLevel} />
          </div>

          {/* Active Level Detail Display */}
          <div className="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <Badge variant="gold">{selectedProgram.grades}</Badge>
                <h2 className="text-3xl font-extrabold text-navy-900">{selectedProgram.level} Curriculum</h2>
                <p className="text-slate-600 text-sm leading-relaxed">{selectedProgram.description}</p>
              </div>

              <div className="flex items-center gap-3 p-3 bg-navy-50 rounded-xl border border-navy-100">
                <UserCheck className="w-5 h-5 text-navy-900 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-navy-900 block">Department Head</span>
                  <span className="text-slate-600">{selectedProgram.headOfDepartment}</span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-navy-900 text-sm uppercase tracking-wider">Key Subjects Offered</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProgram.subjects.map((sub, idx) => (
                    <span key={idx} className="px-3 py-1 bg-slate-100 text-navy-900 text-xs font-semibold rounded-lg">
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="font-bold text-navy-900 text-sm uppercase tracking-wider">Program Highlights</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                  {selectedProgram.keyHighlights.map((hl, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative h-96 rounded-xl overflow-hidden shadow-lg border border-slate-100">
                <Image
                  src={selectedProgram.image}
                  alt={selectedProgram.level}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Academic Facilities Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 space-y-3 bg-white">
            <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-900 flex items-center justify-center">
              <Layers className="w-5 h-5 text-gold-600" />
            </div>
            <h4 className="font-bold text-lg text-navy-900">Robotics & AI Lab</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Equipped with VEX robotics kits, 3D printers, Python microcontrollers, and high-speed workstations.
            </p>
          </Card>
          <Card className="p-6 space-y-3 bg-white">
            <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-900 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-gold-600" />
            </div>
            <h4 className="font-bold text-lg text-navy-900">Digital Library Hub</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Access to JSTOR research archives, 40,000+ volumes, and quiet multimedia study cubicles.
            </p>
          </Card>
          <Card className="p-6 space-y-3 bg-white">
            <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-900 flex items-center justify-center">
              <Award className="w-5 h-5 text-gold-600" />
            </div>
            <h4 className="font-bold text-lg text-navy-900">AP & IB Advisory Cell</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Dedicated university advisors guiding students through SAT, ACT, AP exams, and Ivy League applications.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
