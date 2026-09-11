"use client";

import { useEffect, useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminModal } from "@/components/admin/AdminModal";
import { adminList, adminCreate, adminUpdate, adminDelete } from "@/lib/admin-api";
import { FileUpload } from "@/components/admin/FileUpload";

interface Announcement {
  id: string;
  title: string;
  slug: string;
  category: string;
  content: string;
  featuredImage: string;
  status: "DRAFT" | "PUBLISHED";
  featuredFlag: boolean;
  createdAt?: string;
}

const CATEGORIES = ["Academic", "Admission", "Sports", "General", "Examination"];

const emptyForm = {
  title: "",
  slug: "",
  category: "General",
  content: "",
  featuredImage: "",
  status: "DRAFT",
  featuredFlag: false,
};

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function AnnouncementsPage() {
  const [items, setItems] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Announcement | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminList<Announcement>("/admin/announcements");
      setItems(data);
    } catch (e: any) {
      setError(e.message || "Failed to load announcements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (row: Announcement) => {
    setEditing(row);
    setForm({
      title: row.title,
      slug: row.slug,
      category: row.category,
      content: row.content,
      featuredImage: row.featuredImage,
      status: row.status,
      featuredFlag: row.featuredFlag,
    });
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const body = {
        ...form,
        slug: form.slug || generateSlug(form.title),
      };
      if (editing) {
        await adminUpdate(`/admin/announcements/${editing.id}`, body);
      } else {
        await adminCreate("/admin/announcements", body);
      }
      setModalOpen(false);
      load();
    } catch (e: any) {
      setError(e.message || "Failed to save announcement");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (row: Announcement) => {
    if (!confirm(`Delete "${row.title}"?`)) return;
    try {
      setError(null);
      await adminDelete(`/admin/announcements/${row.id}`);
      load();
    } catch (e: any) {
      setError(e.message || "Failed to delete announcement");
    }
  };

  const columns = [
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
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
    {
      key: "featuredFlag",
      label: "Featured",
      render: (val: boolean) =>
        val ? <span className="text-gold-600 font-bold">✓</span> : <span className="text-slate-300">—</span>,
    },
    {
      key: "createdAt",
      label: "Date",
      render: (val: string) =>
        val ? new Date(val).toLocaleDateString() : "—",
    },
  ];

  return (
    <div className="p-6">
      <AdminPageHeader
        title="Announcements"
        subtitle="Manage school announcements"
        actionLabel="New Announcement"
        onAction={openCreate}
      />

      {error && (
        <div className="mb-4 px-4 py-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-slate-400">Loading...</div>
      ) : (
        <AdminTable
          columns={columns}
          data={items}
          onEdit={openEdit}
          onDelete={handleDelete}
          emptyMessage="No announcements yet."
        />
      )}

      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Announcement" : "New Announcement"}
        onSubmit={handleSubmit}
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

          <div>
            <label className="block text-sm font-medium text-navy-800 mb-1">Slug</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              placeholder="Auto-generated from title if empty"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>

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
            <label className="block text-sm font-medium text-navy-800 mb-1">Content</label>
            <textarea
              rows={5}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>

          <FileUpload
            label="Featured Image"
            value={form.featuredImage}
            onChange={(url) => setForm({ ...form, featuredImage: url })}
          />

          <div>
            <label className="block text-sm font-medium text-navy-800 mb-1">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as "DRAFT" | "PUBLISHED" })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featuredFlag"
              checked={form.featuredFlag}
              onChange={(e) => setForm({ ...form, featuredFlag: e.target.checked })}
              className="h-4 w-4 rounded border-slate-300 text-gold-600 focus:ring-gold-500"
            />
            <label htmlFor="featuredFlag" className="text-sm font-medium text-navy-800">
              Featured
            </label>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
