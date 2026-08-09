import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">{label}</label>}
      <input
        className={cn(
          'w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-navy-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-transparent transition',
          error && 'border-rose-500 focus:ring-rose-500',
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-rose-500 font-medium">{error}</span>}
    </div>
  );
};
