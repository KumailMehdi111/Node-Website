"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { adminList, getStoredUser } from "@/lib/admin-api";
import {
  Megaphone,
  CalendarDays,
  Users,
  ImageIcon,
  Download,
  MessageSquare,
  Plus,
  ArrowRight,
} from "lucide-react";

interface Stat {
  label: string;
  endpoint: string;
  href: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

const stats: Stat[] = [
  { label: "Announcements", endpoint: "/admin/announcements", href: "/admin/announcements", icon: Megaphone, color: "text-blue-600", bgColor: "bg-blue-50" },
  { label: "Events", endpoint: "/admin/events", href: "/admin/events", icon: CalendarDays, color: "text-emerald-600", bgColor: "bg-emerald-50" },
  { label: "Staff", endpoint: "/admin/staff", href: "/admin/staff", icon: Users, color: "text-violet-600", bgColor: "bg-violet-50" },
  { label: "Gallery Images", endpoint: "/admin/gallery", href: "/admin/gallery", icon: ImageIcon, color: "text-amber-600", bgColor: "bg-amber-50" },
  { label: "Downloads", endpoint: "/admin/downloads", href: "/admin/downloads", icon: Download, color: "text-rose-600", bgColor: "bg-rose-50" },
  { label: "Contact Messages", endpoint: "/admin/contact-messages", href: "/admin/contact-messages", icon: MessageSquare, color: "text-cyan-600", bgColor: "bg-cyan-50" },
];

const quickActions = [
  { label: "New Announcement", href: "/admin/announcements" },
  { label: "New Event", href: "/admin/events" },
  { label: "Add Staff Member", href: "/admin/staff" },
  { label: "Upload to Gallery", href: "/admin/gallery" },
  { label: "Add Download", href: "/admin/downloads" },
];

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const user = getStoredUser();

  useEffect(() => {
    async function fetchCounts() {
      const results: Record<string, number> = {};
      await Promise.allSettled(
        stats.map(async (s) => {
          try {
            const data = await adminList(s.endpoint);
            results[s.endpoint] = data.length;
          } catch {
            results[s.endpoint] = 0;
          }
        })
      ).then(() => setCounts(results));
      setLoading(false);
    }
    fetchCounts();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-navy-900 font-display">
        Welcome{user?.name ? `, ${user.name}` : ""}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((s) => (
          <Link
            key={s.endpoint}
            href={s.href}
            className="flex items-center gap-4 bg-white rounded-xl p-5 shadow-card hover:shadow-hover transition-shadow"
          >
            <div className={`${s.bgColor} p-3 rounded-lg`}>
              <s.icon size={22} className={s.color} />
            </div>
            <div>
              <p className="text-sm text-slate-500">{s.label}</p>
              <p className="text-2xl font-bold text-navy-900">
                {loading ? (
                  <span className="inline-block h-6 w-10 bg-slate-100 rounded animate-pulse" />
                ) : (
                  counts[s.endpoint] ?? 0
                )}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-card p-5">
        <h2 className="text-lg font-semibold text-navy-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickActions.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="flex items-center justify-between px-4 py-3 border border-slate-200 rounded-lg text-sm text-slate-700 hover:border-gold-500 hover:bg-gold-50 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Plus size={16} className="text-gold-600" />
                {a.label}
              </span>
              <ArrowRight size={14} className="text-slate-400" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
