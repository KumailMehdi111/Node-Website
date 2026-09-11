"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { isLoggedIn, logout, getStoredUser } from "@/lib/admin-api";
import {
  LayoutDashboard,
  Megaphone,
  CalendarDays,
  Users,
  Image as ImageIcon,
  Download,
  MessageSquare,
  Trophy,
  Activity,
  GraduationCap,
  ClipboardList,
  Settings,
  LogOut,
  Menu,
  X,
  Building2,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Announcements", href: "/admin/announcements", icon: Megaphone },
  { label: "Events", href: "/admin/events", icon: CalendarDays },
  { label: "Staff", href: "/admin/staff", icon: Users },
  { label: "Departments", href: "/admin/departments", icon: Building2 },
  { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { label: "Downloads", href: "/admin/downloads", icon: Download },
  { label: "Contact Messages", href: "/admin/contact-messages", icon: MessageSquare },
  { label: "Sports", href: "/admin/sports", icon: Trophy },
  { label: "Activities", href: "/admin/activities", icon: Activity },
  { label: "Admissions", href: "/admin/admissions", icon: GraduationCap },
  { label: "Inquiries", href: "/admin/admission-inquiries", icon: ClipboardList },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [authorized, setAuthorized] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setAuthorized(true);
      return;
    }
    if (!isLoggedIn()) {
      router.replace("/admin/login");
      return;
    }
    setAuthorized(true);
    const user = getStoredUser();
    if (user?.name) setUserName(user.name);
  }, [isLoginPage, router]);

  useEffect(() => {
    if (!authorized && !isLoginPage) return;
    navItems.forEach((item) => router.prefetch(item.href));
  }, [authorized, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!authorized) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-navy-950 flex flex-col transition-transform duration-200 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-navy-800">
          <span className="text-lg font-bold text-gold-500 font-display">Admin Panel</span>
          <button
            className="text-slate-400 hover:text-white lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-gold-500/15 text-gold-400"
                    : "text-slate-300 hover:bg-navy-800 hover:text-white"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 bg-white border-b border-slate-200 shrink-0">
          <button
            className="text-slate-600 hover:text-slate-900 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>

          <div className="hidden lg:block" />

          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">{userName}</span>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-red-600 transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
