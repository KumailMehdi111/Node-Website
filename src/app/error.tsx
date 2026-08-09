"use client";

import React, { useEffect } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-slate-50 min-h-[60vh] flex items-center justify-center p-6">
      <div className="text-center max-w-md space-y-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-lg">
        <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-navy-900">Something went wrong</h2>
          <p className="text-slate-500 text-xs">An unexpected runtime error occurred while rendering this page.</p>
        </div>
        <Button onClick={() => reset()} variant="primary" className="w-full flex items-center justify-center gap-2">
          <RotateCcw className="w-4 h-4" />
          <span>Try Again</span>
        </Button>
      </div>
    </div>
  );
}
