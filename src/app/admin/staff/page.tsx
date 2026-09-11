"use client";

import { useEffect, useState, useCallback } from "react";
import { adminList, adminCreate, adminUpdate, adminDelete } from "@/lib/admin-api";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminModal } from "@/components/admin/AdminModal";
import { RefreshCw } from "lucide-react";
import { FileUpload } from "@/components/admin/FileUpload";

interface Department {
  id: string;
  name: string;
}

interface StaffMember {
  id: string;
  name: string;
  slug: string;
  designation: string;
  departmentId: string;
  department?: { id: string; name: string };
  subject: string;
  qualification: string;
  experience: string;
  bio: string;
  photo: string;
  status: string;
  displayOrder: number;
}

const emptyForm = {
  name: "",
  slug: "",
  designation: "",
  departmentId: "",
  subject: "",
  qualification: "",
  experience: "",
  bio: "",
  photo: "",
  status: "active",
  displayOrder: 0,
};

export default function StaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<StaffMember | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<StaffMember | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchStaff = useCallback(async () => {
    try {
      setLoading(true);
      const [staffData, deptData] = await Promise.all([
        adminList<StaffMember>("/admin/staff"),
        adminList<Department>("/admin/departments"),
      ]);
      setStaff(staffData);
      setDepartments(deptData);
    } catch (err) {
      console.error("Failed to load staff", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (row: StaffMember) => {
    setEditing(row);
    setForm({
      name: row.name ?? "",
      slug: row.slug ?? "",
      designation: row.designation ?? "",
      departmentId: row.departmentId ?? "",
      subject: row.subject ?? "",
      qualification: row.qualification ?? "",
      experience: row.experience ?? "",
      bio: row.bio ?? "",
      photo: row.photo ?? "",
      status: row.status ?? "active",
      displayOrder: row.displayOrder ?? 0,
    });
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      alert("Name is required.");
      return;
    }
    if (!form.designation.trim()) {
      alert("Designation is required.");
      return;
    }
    try {
      setSubmitting(true);
      const baseSlug = form.slug.trim() || form.name.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
      const slug = baseSlug || `staff-${Date.now()}`;
      const body: Record<string, any> = {
        name: form.name.trim(),
        slug,
        designation: form.designation.trim(),
        status: form.status,
        displayOrder: Number(form.displayOrder) || 0,
      };
      if (form.departmentId) body.departmentId = form.departmentId;
      if (form.subject.trim()) body.subject = form.subject.trim();
      if (form.qualification.trim()) body.qualification = form.qualification.trim();
      if (form.experience.trim()) body.experience = form.experience.trim();
      if (form.bio.trim()) body.bio = form.bio.trim();
      if (form.photo) body.photo = form.photo;
      if (editing) {
        await adminUpdate(`/admin/staff/${editing.id}`, body);
      } else {
        await adminCreate("/admin/staff", body);
      }
      setModalOpen(false);
      fetchStaff();
    } catch (err: any) {
      alert(err.message || "Failed to save staff member.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      setDeleteLoading(true);
      await adminDelete(`/admin/staff/${deleteTarget.id}`);
      setDeleteTarget(null);
      fetchStaff();
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete staff member.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleSlugGenerate = () => {
    const s = form.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
    setForm((f) => ({ ...f, slug: s }));
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "designation", label: "Designation" },
    {
      key: "departmentId",
      label: "Department",
      render: (_: any, row: StaffMember) => row.department?.name ?? "—",
    },
    { key: "qualification", label: "Qualification" },
    {
      key: "status",
      label: "Status",
      render: (val: string) => (
        <span
          className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${
            val === "active"
              ? "bg-emerald-100 text-emerald-700"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          {val}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Staff Members"
        subtitle="Manage faculty and staff directory"
        actionLabel="Add Staff Member"
        onAction={openCreate}
      />

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <AdminTable
          columns={columns}
          data={staff}
          onEdit={openEdit}
          onDelete={setDeleteTarget}
        />
      )}

      {/* Create / Edit Modal */}
      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        title={editing ? "Edit Staff Member" : "Add Staff Member"}
        isSubmitting={submitting}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-slate-700 mb-1">Slug *</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={handleSlugGenerate}
                  title="Generate from name"
                  className="px-2 py-2 text-slate-400 hover:text-navy-900 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Designation</label>
            <input
              type="text"
              value={form.designation}
              onChange={(e) => setForm((f) => ({ ...f, designation: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
            <select
              value={form.departmentId}
              onChange={(e) => setForm((f) => ({ ...f, departmentId: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            >
              <option value="">— Select Department —</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
            <input
              type="text"
              value={form.subject}
              onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Qualification</label>
              <input
                type="text"
                value={form.qualification}
                onChange={(e) => setForm((f) => ({ ...f, qualification: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Experience</label>
              <input
                type="text"
                value={form.experience}
                onChange={(e) => setForm((f) => ({ ...f, experience: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              />
            </div>
          </div>

          <FileUpload
            label="Staff Photo"
            value={form.photo}
            onChange={(url) => setForm((f) => ({ ...f, photo: url }))}
          />

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Bio</label>
            <textarea
              value={form.bio}
              onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Display Order</label>
              <input
                type="number"
                value={form.displayOrder}
                onChange={(e) => setForm((f) => ({ ...f, displayOrder: parseInt(e.target.value) || 0 }))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
      </AdminModal>

      {/* Delete Confirmation */}
      <AdminModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onSubmit={handleDelete}
        title="Delete Staff Member"
        isSubmitting={deleteLoading}
        submitLabel="Delete"
        submitVariant="danger"
      >
        <p className="text-sm text-slate-600">
          Are you sure you want to delete <strong>{deleteTarget?.name}</strong>? This action cannot be
          undone.
        </p>
      </AdminModal>
    </div>
  );
}
