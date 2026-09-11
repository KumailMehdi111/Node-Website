"use client";

import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { adminList, adminCreate } from "@/lib/admin-api";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminModal } from "@/components/admin/AdminModal";

interface DownloadItem {
  id: string;
  title: string;
  category: string;
  class?: string;
  year?: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  status: "DRAFT" | "PUBLISHED";
  createdAt?: string;
}

const CATEGORIES = ["Admissions", "Syllabus", "Forms", "Exam Schedules", "Newsletters"];
const FILE_TYPES = ["PDF", "DOCX", "ZIP"];

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const emptyForm = {
  title: "",
  category: "Admissions",
  class: "",
  year: "",
  fileUrl: "",
  fileType: "PDF",
  fileSize: 0,
  status: "DRAFT" as "DRAFT" | "PUBLISHED",
};

export default function AdminDownloadsPage() {
  const [items, setItems] = useState<DownloadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    try {
      setLoading(true);
      const data = await adminList<DownloadItem>("/admin/downloads");
      setItems(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreate() {
    try {
      setSubmitting(true);
      setError("");
      await adminCreate("/admin/downloads", {
        title: form.title,
        category: form.category,
        class: form.class || undefined,
        year: form.year || undefined,
        fileUrl: form.fileUrl,
        fileType: form.fileType,
        fileSize: Number(form.fileSize),
        status: form.status,
      });
      setShowModal(false);
      setForm(emptyForm);
      load();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  }

  const columns = [
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    { key: "fileType", label: "File Type" },
    {
      key: "fileSize",
      label: "Size",
      render: (val: number) => formatFileSize(val),
    },
    {
      key: "status",
      label: "Status",
      render: (val: string) => (
        <span
          className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${
            val === "PUBLISHED"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {val}
        </span>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <AdminPageHeader
        title="Downloads"
        subtitle="Manage downloadable resources"
        actionLabel="Add Download"
        onAction={() => {
          setForm(emptyForm);
          setError("");
          setShowModal(true);
        }}
      />

      {error && (
        <div className="mb-4 px-4 py-2 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-16 text-slate-400">Loading...</div>
      ) : (
        <AdminTable columns={columns} data={items} emptyMessage="No downloads found." />
      )}

      <AdminModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Add Download"
        onSubmit={handleCreate}
        isSubmitting={submitting}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-navy-800 mb-1">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy-800 mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-800 mb-1">File Type</label>
              <select
                value={form.fileType}
                onChange={(e) => setForm({ ...form, fileType: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
              >
                {FILE_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-800 mb-1">File URL</label>
            <input
              type="url"
              value={form.fileUrl}
              onChange={(e) => setForm({ ...form, fileUrl: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy-800 mb-1">
                File Size (bytes)
              </label>
              <input
                type="number"
                value={form.fileSize}
                onChange={(e) => setForm({ ...form, fileSize: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-800 mb-1">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as "DRAFT" | "PUBLISHED" })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
              >
                <option value="DRAFT">DRAFT</option>
                <option value="PUBLISHED">PUBLISHED</option>
              </select>
            </div>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
