"use client";

import React from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminPageHeaderProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const AdminPageHeader: React.FC<AdminPageHeaderProps> = ({
  title,
  subtitle,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">{title}</h1>
        {subtitle && (
          <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
        )}
      </div>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className={cn(
            "mt-3 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg transition",
            "bg-gold-600 hover:bg-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2",
            "shadow-md hover:shadow-lg cursor-pointer"
          )}
        >
          <Plus className="w-4 h-4" />
          {actionLabel}
        </button>
      )}
    </div>
  );
};
