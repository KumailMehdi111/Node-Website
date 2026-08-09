"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GraduationCap, Menu, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MobileMenu } from './MobileMenu';
import { Button } from '@/components/ui/Button';

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/admissions', label: 'Admissions' },
  { href: '/academics', label: 'Academics' },
  { href: '/activities', label: 'Activities' },
  { href: '/sports', label: 'Sports' },
  { href: '/examinations', label: 'Exams' },
  { href: '/staff', label: 'Staff' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/announcements', label: 'Notices' },
  { href: '/events', label: 'Events' },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300 bg-white border-b border-slate-100',
        isScrolled ? 'shadow-md py-2.5' : 'py-4'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center text-gold-500 shadow-md group-hover:bg-navy-800 transition">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="font-extrabold text-lg text-navy-900 tracking-tight block leading-tight group-hover:text-gold-600 transition">
              APEX ACADEMY
            </span>
            <span className="text-[10px] font-bold text-slate-500 tracking-widest block uppercase">
              International School
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
          {navLinks.slice(0, 9).map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150',
                  isActive
                    ? 'bg-navy-900 text-white shadow-sm'
                    : 'text-navy-800 hover:text-navy-900 hover:bg-slate-100'
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/admissions" className="hidden sm:block">
            <Button variant="accent" size="sm" className="font-bold">
              Apply Now
            </Button>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-navy-900 hover:bg-slate-100 rounded-lg transition"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
      />
    </header>
  );
};
