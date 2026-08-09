"use client";

import React, { useState } from 'react';
import { Download, FileText } from 'lucide-react';
import { downloadsData } from '@/data/downloads';
import { DownloadTable } from '@/components/downloads/DownloadTable';
import { SearchBar } from '@/components/ui/SearchBar';
import { Tabs } from '@/components/ui/Tabs';

export default function DownloadsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Admissions', 'Syllabus', 'Forms', 'Exam Schedules', 'Newsletters'];

  const tabOptions = categories.map((cat) => ({
    id: cat,
    label: cat,
    count: cat === 'All' ? downloadsData.length : downloadsData.filter((d) => d.category === cat).length,
  }));

  const filteredDownloads = downloadsData.filter((doc) => {
    const matchesCategory = activeCategory === 'All' || doc.category === activeCategory;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="bg-navy-950 text-white rounded-3xl p-10 lg:p-14 text-center max-w-4xl mx-auto space-y-4 shadow-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-600 text-white text-xs font-bold">
            <Download className="w-3.5 h-3.5" />
            <span>Document Repository</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">Downloads & Prospectus</h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Access official school admission forms, syllabi, handbooks, medical disclosures, and exam schedules.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <Tabs tabs={tabOptions} activeTab={activeCategory} onChange={setActiveCategory} />
          <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search document title..." />
        </div>

        {/* Table Component */}
        <DownloadTable resources={filteredDownloads} />
      </div>
    </div>
  );
}
