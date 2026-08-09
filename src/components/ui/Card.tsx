import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hoverEffect = true }) => {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-slate-100 shadow-card overflow-hidden transition-all duration-300',
        hoverEffect && 'hover:shadow-hover hover:-translate-y-1',
        className
      )}
    >
      {children}
    </div>
  );
};
