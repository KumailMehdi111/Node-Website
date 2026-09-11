"use client";

import { useEffect, useState, useCallback } from "react";
import { adminList, adminCreate, adminUpdate, adminDelete } from "@/lib/admin-api";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminModal } from "@/components/admin/AdminModal";

interface Department {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
}

const emptyForm = { name: "", slug: "" };

export default function AdminDepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Department | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Department | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchDepartments = useCallback(async () => {
    try {
      setLoading(true);
      const data = await adminList<Department>("/admin/departments");
      setDepartments(data);
    } catch (err) {
      console.error("Failed to load departments", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchDepartments(); }, [fetchDepartments]);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(row: Department) {
    setEditing(row);
    setForm({ name: row.name, slug: row.slug });
    setModalOpen(true);
  }

  function handleSlugGenerate() {
    const s = form.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
    setForm(f => ({ ...f, slug: s }));
  }

  async function handleSubmit() {
    if (!form.name.trim()) return;
    setSubmitting(true);
    try {
      const slug = form.slug.trim() || form.name.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
      const body = { name: form.name.trim(), slug };
      if (editing) {
        await adminUpdate(`/admin/departments/${editing.id}`, body);
      } else {
        await adminCreate("/admin/departments", body);
      }
      setModalOpen(false);
      fetchDepartments();
    } catch (err: any) {
      alert(err.message || "Failed to save department");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await adminDelete(`/admin/departments/${deleteTarget.id}`);
      setDeleteTarget(null);
      fetchDepartments();
    } catch (err: any) {
      alert(err.message || "Failed to delete department");
    } finally {
      setDeleteLoading(false);
    }
  }

  const columns = [
    { key: "name", label: "Name" },
    { key: "slug", label: "Slug" },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Departments"
        subtitle="Manage staff departments"
        actionLabel="New Department"
        onAction={openCreate}
      />

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <AdminTable
          columns={columns}
          data={departments}
          onEdit={openEdit}
          onDelete={setDeleteTarget}
          emptyMessage="No departments found."
        />
      )}

      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Department" : "New Department"}
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
              placeholder="e.g. Sciences"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Slug</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm(f => ({ ...f, slug: e.target.value }))}
                className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder="Auto-generated if empty"
              />
              <button
                type="button"
                onClick={handleSlugGenerate}
                className="px-3 py-2 text-sm text-slate-500 hover:text-navy-900 hover:bg-slate-100 rounded-lg transition cursor-pointer"
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      </AdminModal>

      <AdminModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onSubmit={handleDelete}
        title="Delete Department"
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
