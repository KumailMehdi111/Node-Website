import React from 'react';
import { GraduationCap } from 'lucide-react';

export default function Loading() {
  return (
    <div className="bg-slate-50 min-h-[60vh] flex items-center justify-center p-6">
      <div className="text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-navy-900 text-gold-500 flex items-center justify-center mx-auto shadow-md animate-bounce">
          <GraduationCap className="w-8 h-8" />
        </div>
        <p className="text-xs font-bold text-navy-900 uppercase tracking-widest animate-pulse">
          Loading Apex Academy...
        </p>
      </div>
    </div>
  );
}
