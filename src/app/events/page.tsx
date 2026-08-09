"use client";

import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { eventsData } from '@/data/events';
import { EventCard } from '@/components/events/EventCard';
import { SearchBar } from '@/components/ui/SearchBar';
import { Tabs } from '@/components/ui/Tabs';

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Academic', 'Cultural', 'Sports', 'Workshop', 'Parent-Teacher'];

  const tabOptions = categories.map((cat) => ({
    id: cat,
    label: cat,
    count: cat === 'All' ? eventsData.length : eventsData.filter((e) => e.category === cat).length,
  }));

  const filtered = eventsData.filter((evt) => {
    const matchesCategory = activeCategory === 'All' || evt.category === activeCategory;
    const matchesSearch =
      evt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="bg-navy-950 text-white rounded-3xl p-10 lg:p-14 text-center max-w-4xl mx-auto space-y-4 shadow-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-600 text-white text-xs font-bold">
            <Calendar className="w-3.5 h-3.5" />
            <span>School Calendar</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">Events & Activities Calendar</h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Explore upcoming academic expos, athletic galas, fine arts galas, and parent interaction sessions.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <Tabs tabs={tabOptions} activeTab={activeCategory} onChange={setActiveCategory} />
          <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search event title or venue..." />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((evt) => (
            <EventCard key={evt.id} event={evt} />
          ))}
        </div>
      </div>
    </div>
  );
}
