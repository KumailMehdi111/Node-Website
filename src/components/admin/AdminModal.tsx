"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSubmit: () => void;
  isSubmitting?: boolean;
  submitLabel?: string;
  submitVariant?: "primary" | "danger";
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  isSubmitting = false,
  submitLabel = "Submit",
  submitVariant = "primary",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen) return;

    previousActiveElement.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseRef.current();
        return;
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    const timer = setTimeout(() => {
      const firstInput = modalRef.current?.querySelector<HTMLElement>(
        'input, select, textarea, button:not([aria-label="Close Modal"])'
      );
      firstInput?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
      previousActiveElement.current?.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-fadeIn">
      <div
        ref={modalRef}
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <h3 className="text-lg font-bold text-navy-900">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close Modal"
            className="p-1 text-slate-400 hover:text-navy-900 hover:bg-slate-200 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">{children}</div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-navy-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={isSubmitting}
            className={cn(
              "px-4 py-2 text-sm font-medium text-white rounded-lg transition focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer",
              submitVariant === "danger"
                ? "bg-red-600 hover:bg-red-500 focus:ring-red-500 shadow-md hover:shadow-lg"
                : "bg-gold-600 hover:bg-gold-500 focus:ring-gold-500 shadow-md hover:shadow-lg",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {isSubmitting ? "Saving..." : submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
