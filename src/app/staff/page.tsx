"use client";

import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { fetchStaff } from '@/lib/api';
import { mapStaff } from '@/lib/adapters';
import { StaffMember } from '@/types';
import { StaffCard } from '@/components/staff/StaffCard';
import { SearchBar } from '@/components/ui/SearchBar';
import { Tabs } from '@/components/ui/Tabs';

export default function StaffDirectoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [allStaff, setAllStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const raw = await fetchStaff();
        setAllStaff(raw.map(mapStaff));
      } catch {
        setAllStaff([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const departments = ['All', 'Leadership', 'Sciences', 'Mathematics', 'Humanities', 'Sports', 'Arts & Music'];

  const tabOptions = departments.map((dept) => ({
    id: dept,
    label: dept,
    count: dept === 'All' ? allStaff.length : allStaff.filter((s) => s.department === dept).length,
  }));

  const filteredStaff = allStaff.filter((staff) => {
    const matchesDept = selectedDept === 'All' || staff.department === selectedDept;
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.qualification.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="bg-navy-950 text-white rounded-3xl p-10 lg:p-14 text-center max-w-4xl mx-auto space-y-4 shadow-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-600 text-white text-xs font-bold">
            <Users className="w-3.5 h-3.5" />
            <span>Academic Faculty</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">Faculty & Leadership Directory</h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Meet the distinguished educators, department heads, and mentors driving academic innovation at Apex.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <Tabs tabs={tabOptions} activeTab={selectedDept} onChange={setSelectedDept} />
          <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search teacher name or subject..." />
        </div>

        {/* Staff Grid */}
        {loading ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <div className="w-8 h-8 border-4 border-gold-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-slate-500 text-sm">Loading staff members...</p>
          </div>
        ) : filteredStaff.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-bold text-navy-900 text-lg">No staff members found</h3>
            <p className="text-slate-500 text-xs mt-1">Try clearing your search query or switching department tab.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredStaff.map((staff) => (
              <StaffCard key={staff.id} staff={staff} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
