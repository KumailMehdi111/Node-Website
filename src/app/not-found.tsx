import React from 'react';
import Link from 'next/link';
import { Compass, Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="bg-slate-50 min-h-[70vh] flex items-center justify-center p-6">
      <div className="text-center max-w-md space-y-6 bg-white p-10 rounded-3xl border border-slate-200 shadow-lg">
        <div className="w-16 h-16 rounded-full bg-navy-50 text-navy-900 flex items-center justify-center mx-auto shadow-sm">
          <Compass className="w-8 h-8 text-gold-600 animate-spin" />
        </div>

        <div className="space-y-2">
          <span className="text-5xl font-extrabold text-navy-900 font-mono">404</span>
          <h1 className="text-2xl font-bold text-navy-900">Page Not Found</h1>
          <p className="text-slate-500 text-xs leading-relaxed">
            The page or resource you are searching for does not exist or has been moved to a new section.
          </p>
        </div>

        <Link href="/">
          <Button variant="primary" className="w-full flex items-center justify-center gap-2">
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
