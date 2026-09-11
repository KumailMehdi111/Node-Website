import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Mail, GraduationCap, ArrowLeft, Clock, Award } from 'lucide-react';
import { fetchStaffBySlug } from '@/lib/api';
import { mapStaff } from '@/lib/adapters';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default async function StaffDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let staff: any;
  try {
    const raw = await fetchStaffBySlug(slug);
    staff = mapStaff(raw);
  } catch {
    notFound();
  }

  if (!staff) notFound();

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <Link href="/staff">
          <Button variant="ghost" size="sm" className="flex items-center gap-1.5 text-slate-600">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Staff Directory</span>
          </Button>
        </Link>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-slate-100 shadow-lg shrink-0">
              <Image
                src={staff.photo}
                alt={staff.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-3 text-center sm:text-left flex-grow">
              <Badge variant={staff.isLeadership ? 'gold' : 'navy'}>{staff.department}</Badge>
              <h1 className="text-3xl font-extrabold text-navy-900">{staff.name}</h1>
              <p className="text-sm font-semibold text-slate-700">{staff.role}</p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-gold-600" />
                  <span>{staff.qualification}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-gold-600" />
                  <span>{staff.experience} Experience</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-slate-100">
            <h3 className="text-lg font-bold text-navy-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-gold-600" />
              <span>Professional Biography & Educator Statement</span>
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line bg-slate-50 p-6 rounded-2xl border border-slate-100">
              {staff.bio}
            </p>
          </div>

          <div className="p-4 bg-navy-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gold-400" />
              <span className="text-xs">Direct Email: <strong>{staff.email}</strong></span>
            </div>
            <a href={`mailto:${staff.email}`}>
              <Button variant="accent" size="sm" className="font-bold">
                Send Direct Message
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
