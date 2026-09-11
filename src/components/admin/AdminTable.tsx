"use client";

import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface AdminTableProps {
  columns: Column[];
  data: any[];
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  emptyMessage?: string;
}

export const AdminTable: React.FC<AdminTableProps> = ({
  columns,
  data,
  onEdit,
  onDelete,
  emptyMessage = "No records found.",
}) => {
  const hasActions = !!onEdit || !!onDelete;

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-100 shadow-card">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="bg-navy-900 text-white">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 font-semibold whitespace-nowrap"
              >
                {col.label}
              </th>
            ))}
            {hasActions && (
              <th className="px-4 py-3 font-semibold text-right whitespace-nowrap">
                Actions
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (hasActions ? 1 : 0)}
                className="px-4 py-10 text-center text-slate-400 italic"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr
                key={row.id ?? idx}
                className={cn(
                  "border-b border-slate-100 transition-colors",
                  idx % 2 === 0 ? "bg-white" : "bg-slate-50"
                )}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-navy-800">
                    {col.render
                      ? col.render(row[col.key], row)
                      : row[col.key] ?? "—"}
                  </td>
                ))}
                {hasActions && (
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="p-1.5 text-slate-400 hover:text-navy-900 hover:bg-slate-200 rounded-lg transition cursor-pointer"
                          aria-label="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                          aria-label="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
