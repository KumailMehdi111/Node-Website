import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, GraduationCap, ArrowRight } from 'lucide-react';
import { StaffMember } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface StaffCardProps {
  staff: StaffMember;
}

export const StaffCard: React.FC<StaffCardProps> = ({ staff }) => {
  return (
    <Card className="flex flex-col h-full text-center p-6 items-center space-y-4 group">
      <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-slate-100 shadow-md group-hover:border-gold-500 transition-colors">
        <Image
          src={staff.photo}
          alt={staff.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="space-y-1.5 w-full">
        <Badge variant={staff.isLeadership ? 'gold' : 'navy'}>{staff.department}</Badge>
        <h3 className="font-bold text-base text-navy-900 group-hover:text-gold-600 transition">
          {staff.name}
        </h3>
        <p className="text-xs font-semibold text-slate-600">{staff.role}</p>
        <p className="text-[11px] text-slate-400 truncate">{staff.qualification}</p>
      </div>

      <div className="w-full pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
        <a
          href={`mailto:${staff.email}`}
          className="inline-flex items-center gap-1 text-slate-500 hover:text-navy-900 transition"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Email</span>
        </a>
        <Link
          href={`/staff/${staff.slug}`}
          className="inline-flex items-center gap-1 font-bold text-navy-900 hover:text-gold-600 transition"
        >
          <span>Bio</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </Card>
  );
};
