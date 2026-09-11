"use client";

import { useEffect, useState, useCallback } from "react";
import { adminList, adminCreate, adminUpdate, adminDelete } from "@/lib/admin-api";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminModal } from "@/components/admin/AdminModal";
import { FileUpload } from "@/components/admin/FileUpload";

interface Sport {
  id: string;
  name: string;
  description: string | null;
  category: string;
  coach: string | null;
  image: string | null;
  status: string;
  createdAt: string;
}

const CATEGORIES = ["Outdoor", "Indoor", "Aquatic", "Individual", "Team"];
const STATUSES = ["ACTIVE", "INACTIVE"];
const emptyForm = { name: "", description: "", category: "Outdoor", coach: "", image: "", status: "ACTIVE" };

export default function AdminSportsPage() {
  const [sports, setSports] = useState<Sport[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Sport | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Sport | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchSports = useCallback(async () => {
    try {
      setLoading(true);
      const data = await adminList<Sport>("/admin/sports");
      setSports(data);
    } catch (err) {
      console.error("Failed to load sports", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchSports(); }, [fetchSports]);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(row: Sport) {
    setEditing(row);
    setForm({ name: row.name, description: row.description || "", category: row.category || "Outdoor", coach: row.coach || "", image: row.image || "", status: row.status || "ACTIVE" });
    setModalOpen(true);
  }

  async function handleSubmit() {
    if (!form.name.trim()) return;
    setSubmitting(true);
    try {
      const body: Record<string, any> = { name: form.name.trim(), description: form.description.trim() || null, category: form.category, coach: form.coach.trim() || null, image: form.image || null, status: form.status };
      if (editing) {
        await adminUpdate(`/admin/sports/${editing.id}`, body);
      } else {
        await adminCreate("/admin/sports", body);
      }
      setModalOpen(false);
      fetchSports();
    } catch (err: any) {
      alert(err.message || "Failed to save sport");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await adminDelete(`/admin/sports/${deleteTarget.id}`);
      setDeleteTarget(null);
      fetchSports();
    } catch (err: any) {
      alert(err.message || "Failed to delete sport");
    } finally {
      setDeleteLoading(false);
    }
  }

  function statusBadge(s: string) {
    return (
      <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${
        s === "ACTIVE" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
      }`}>{s}</span>
    );
  }

  const columns = [
    { key: "name", label: "Name" },
    {
      key: "description",
      label: "Description",
      render: (val: string | null) => val ? (val.length > 80 ? val.slice(0, 80) + "..." : val) : "—",
    },
    { key: "status", label: "Status", render: (val: string) => statusBadge(val) },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Sports"
        subtitle="Manage sports offered at the school"
        actionLabel="New Sport"
        onAction={openCreate}
      />

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <AdminTable
          columns={columns}
          data={sports}
          onEdit={openEdit}
          onDelete={setDeleteTarget}
          emptyMessage="No sports found."
        />
      )}

      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Sport" : "New Sport"}
        onSubmit={handleSubmit}
        isSubmitting={submitting}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
              placeholder="e.g. Cricket"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 resize-none"
              placeholder="Brief description of this sport"
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
              <label className="block text-sm font-medium text-slate-700 mb-1">Coach</label>
              <input
                type="text"
                value={form.coach}
                onChange={(e) => setForm(f => ({ ...f, coach: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder="e.g. Coach Johnson"
              />
            </div>
          </div>
          <FileUpload
            label="Sport Photo"
            value={form.image}
            onChange={(url) => setForm(f => ({ ...f, image: url }))}
          />
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
      </AdminModal>

      <AdminModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onSubmit={handleDelete}
        title="Delete Sport"
        isSubmitting={deleteLoading}
        submitLabel="Delete"
        submitVariant="danger"
      >
        <p className="text-sm text-slate-600">
          Are you sure you want to delete <strong>{deleteTarget?.name}</strong>? This action cannot be undone.
        </p>
      </AdminModal>
    </div>
  );
}
