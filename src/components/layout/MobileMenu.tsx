"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, GraduationCap, ChevronRight, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { href: string; label: string }[];
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, navLinks }) => {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="fixed inset-0 bg-navy-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-navy-900 text-white shadow-2xl flex flex-col justify-between p-6 z-10 animate-slideLeft">
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-navy-800">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-7 h-7 text-gold-500" />
              <div>
                <h2 className="font-bold text-base leading-tight tracking-wide">APEX ACADEMY</h2>
                <p className="text-[10px] text-gold-400 tracking-wider">INTERNATIONAL</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-300 hover:text-white hover:bg-navy-800 rounded-lg transition"
              aria-label="Close Navigation Menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="mt-6 flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all',
                    isActive
                      ? 'bg-gold-600 text-white font-bold shadow-md'
                      : 'text-slate-200 hover:bg-navy-800 hover:text-gold-400'
                  )}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-navy-800 flex flex-col gap-3">
          <Link
            href="/admissions"
            onClick={onClose}
            className="w-full py-2.5 text-center bg-gold-600 hover:bg-gold-500 text-white font-bold text-sm rounded-lg shadow-md transition"
          >
            Apply for Admission
          </Link>
          <Link
            href="/admin"
            onClick={onClose}
            className="w-full py-2.5 text-center bg-navy-800 hover:bg-navy-700 text-slate-200 font-bold text-sm rounded-lg transition flex items-center justify-center gap-2"
          >
            <Shield className="w-4 h-4" />
            Admin Panel
          </Link>
          <p className="text-[11px] text-center text-slate-400">
            Established 1994 • Accredited Institution
          </p>
        </div>
      </div>
    </div>
  );
};
