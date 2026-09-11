"use client";

import { useEffect, useState, useCallback } from "react";
import { adminList, adminCreate, adminUpdate, adminDelete } from "@/lib/admin-api";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminModal } from "@/components/admin/AdminModal";
import { FileUpload } from "@/components/admin/FileUpload";

interface Activity {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string | null;
  date: string | null;
  status: string;
  createdAt: string;
}

const CATEGORIES = ["Club", "Society", "Annual Event"];
const STATUSES = ["DRAFT", "PUBLISHED"];
const emptyForm = { title: "", description: "", category: "Club", image: "", date: "", status: "DRAFT" };

export default function AdminActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Activity | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Activity | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchActivities = useCallback(async () => {
    try {
      setLoading(true);
      const data = await adminList<Activity>("/admin/activities");
      setActivities(data);
    } catch (err) {
      console.error("Failed to load activities", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchActivities(); }, [fetchActivities]);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(row: Activity) {
    setEditing(row);
    setForm({
      title: row.title,
      description: row.description,
      category: row.category,
      image: row.image || "",
      date: row.date ? row.date.split("T")[0] : "",
      status: row.status,
    });
    setModalOpen(true);
  }

  async function handleSubmit() {
    if (!form.title.trim() || !form.description.trim()) return;
    setSubmitting(true);
    try {
      const body: Record<string, any> = {
        title: form.title.trim(),
        description: form.description.trim(),
        category: form.category,
        image: form.image || null,
        status: form.status,
      };
      if (form.date) body.date = new Date(form.date).toISOString();
      if (editing) {
        await adminUpdate(`/admin/activities/${editing.id}`, body);
      } else {
        await adminCreate("/admin/activities", body);
      }
      setModalOpen(false);
      fetchActivities();
    } catch (err: any) {
      alert(err.message || "Failed to save activity");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await adminDelete(`/admin/activities/${deleteTarget.id}`);
      setDeleteTarget(null);
      fetchActivities();
    } catch (err: any) {
      alert(err.message || "Failed to delete activity");
    } finally {
      setDeleteLoading(false);
    }
  }

  function statusBadge(s: string) {
    return (
      <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${
        s === "PUBLISHED" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
      }`}>{s}</span>
    );
  }

  const columns = [
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    { key: "status", label: "Status", render: (val: string) => statusBadge(val) },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Activities"
        subtitle="Manage clubs, societies, and annual events"
        actionLabel="New Activity"
        onAction={openCreate}
      />

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <AdminTable
          columns={columns}
          data={activities}
          onEdit={openEdit}
          onDelete={setDeleteTarget}
          emptyMessage="No activities found."
        />
      )}

      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Activity" : "New Activity"}
        onSubmit={handleSubmit}
        isSubmitting={submitting}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description *</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category *</label>
              <select
                value={form.category}
                onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm(f => ({ ...f, status: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
              >
                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm(f => ({ ...f, date: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>
          <FileUpload
            label="Activity Photo"
            value={form.image}
            onChange={(url) => setForm(f => ({ ...f, image: url }))}
          />
        </div>
      </AdminModal>

      <AdminModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onSubmit={handleDelete}
        title="Delete Activity"
        isSubmitting={deleteLoading}
        submitLabel="Delete"
        submitVariant="danger"
      >
        <p className="text-sm text-slate-600">
          Are you sure you want to delete <strong>{deleteTarget?.title}</strong>? This action cannot be undone.
        </p>
      </AdminModal>
    </div>
  );
}
