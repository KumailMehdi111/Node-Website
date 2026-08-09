"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FileCheck, Search, Download, AlertCircle, Award, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';

export default function ExaminationsPage() {
  const [rollNumber, setRollNumber] = useState('');
  const [searchResult, setSearchResult] = useState<null | { student: string; status: string; gpa: string }>(null);

  const handleResultSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rollNumber) return;
    setSearchResult({
      student: 'Alex Mercer (Grade 10-A)',
      status: 'Pass with Distinction',
      gpa: '3.92 / 4.00 (A+)',
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="bg-navy-950 text-white rounded-3xl p-10 lg:p-14 text-center max-w-4xl mx-auto space-y-4 shadow-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-600 text-white text-xs font-bold">
            <FileCheck className="w-3.5 h-3.5" />
            <span>Academic Evaluation Cell</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">Examinations & Assessment</h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Timetables, grading guidelines, examination policies, and online result search portal.
          </p>
        </div>

        {/* Online Result Inquiry Portal */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-extrabold text-navy-900">Online Result Inquiry Portal</h2>
            <p className="text-slate-500 text-xs">Enter your Roll Number / Student ID to check Mid-Term & Final results.</p>
          </div>

          <form onSubmit={handleResultSearch} className="flex gap-3">
            <Input
              placeholder="Enter Roll Number (e.g. APEX-2026-104)"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit" variant="primary" className="font-bold flex items-center gap-1.5 shrink-0">
              <Search className="w-4 h-4" />
              <span>Search</span>
            </Button>
          </form>

          {searchResult && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-xs">
              <div className="flex items-center justify-between font-bold text-emerald-900 text-sm">
                <span>{searchResult.student}</span>
                <Badge variant="emerald">{searchResult.status}</Badge>
              </div>
              <p className="text-emerald-700">Cumulative Performance Index: <strong className="font-mono text-sm">{searchResult.gpa}</strong></p>
              <p className="text-slate-500 text-[11px]">Report Card PDF dispatched to registered parent email.</p>
            </div>
          )}
        </div>

        {/* Grading Scale & Rules Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6 space-y-4 bg-white">
            <div className="flex items-center gap-2 text-navy-900 font-bold text-lg">
              <Award className="w-5 h-5 text-gold-600" />
              <h3>Grading Scale & Rubric</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 font-bold text-navy-900">
                    <th className="py-2 px-3">Grade</th>
                    <th className="py-2 px-3">Percentage Range</th>
                    <th className="py-2 px-3">Performance Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr><td className="py-2 px-3 font-bold text-emerald-700">A+</td><td className="py-2 px-3">90% - 100%</td><td className="py-2 px-3">Outstanding Excellence</td></tr>
                  <tr><td className="py-2 px-3 font-bold text-emerald-600">A</td><td className="py-2 px-3">80% - 89%</td><td className="py-2 px-3">Excellent Distinction</td></tr>
                  <tr><td className="py-2 px-3 font-bold text-navy-900">B</td><td className="py-2 px-3">70% - 79%</td><td className="py-2 px-3">Very Good Standard</td></tr>
                  <tr><td className="py-2 px-3 font-bold text-amber-600">C</td><td className="py-2 px-3">60% - 69%</td><td className="py-2 px-3">Satisfactory Pass</td></tr>
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="p-6 space-y-4 bg-white">
            <div className="flex items-center gap-2 text-navy-900 font-bold text-lg">
              <AlertCircle className="w-5 h-5 text-rose-600" />
              <h3>Exam Hall Guidelines</h3>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Students must report to their assigned exam hall 15 minutes before reading time.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Valid physical Admit Card & Student ID badge mandatory for hall entry.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Electronic gadgets, smartwatches, and unauthorized notes strictly prohibited.</span>
              </li>
            </ul>
            <div className="pt-2">
              <Link href="/downloads">
                <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-1.5">
                  <Download className="w-4 h-4" />
                  <span>Download Full Datesheet PDF</span>
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
