"use client";

import { useEffect, useState, useCallback } from "react";
import { adminList, adminCreate, adminUpdate, adminDelete } from "@/lib/admin-api";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { API_BASE_URL } from "@/lib/config";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminModal } from "@/components/admin/AdminModal";
import { ImageIcon } from "lucide-react";
import { FileUpload } from "@/components/admin/FileUpload";

interface GalleryCategory {
  id: string;
  name: string;
}

interface GalleryImage {
  id: string;
  caption: string;
  fileUrl: string;
  categoryId: string;
  category?: { id: string; name: string };
  status: string;
  displayOrder: number;
}

const emptyForm = {
  caption: "",
  fileUrl: "",
  categoryId: "",
  status: "active",
  displayOrder: 0,
};

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<GalleryImage | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<GalleryImage | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const extractCategories = useCallback((list: GalleryImage[]) => {
    const map = new Map<string, GalleryCategory>();
    list.forEach((img) => {
      if (img.category && !map.has(img.category.id)) {
        map.set(img.category.id, img.category);
      }
    });
    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const fetchImages = useCallback(async () => {
    try {
      setLoading(true);
      const data = await adminList<GalleryImage>("/admin/gallery");
      setImages(data);
      setCategories(extractCategories(data));
    } catch (err) {
      console.error("Failed to load gallery", err);
    } finally {
      setLoading(false);
    }
  }, [extractCategories]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (row: GalleryImage) => {
    setEditing(row);
    setForm({
      caption: row.caption ?? "",
      fileUrl: row.fileUrl ?? "",
      categoryId: row.categoryId ?? "",
      status: row.status ?? "active",
      displayOrder: row.displayOrder ?? 0,
    });
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const body = {
        ...form,
        displayOrder: Number(form.displayOrder) || 0,
        categoryId: form.categoryId || undefined,
      };
      if (editing) {
        await adminUpdate(`/admin/gallery/${editing.id}`, body);
      } else {
        await adminCreate("/admin/gallery", body);
      }
      setModalOpen(false);
      fetchImages();
    } catch (err) {
      console.error("Save failed", err);
      alert("Failed to save gallery image.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      setDeleteLoading(true);
      await adminDelete(`/admin/gallery/${deleteTarget.id}`);
      setDeleteTarget(null);
      fetchImages();
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete gallery image.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const columns = [
    {
      key: "fileUrl",
      label: "Preview",
      render: (val: string) =>
        val ? (
          <img
            src={val.startsWith('/uploads/') ? `${API_BASE_URL}${val}` : val}
            alt="Preview"
            className="h-10 w-10 rounded object-cover border border-slate-200"
          />
        ) : (
          <div className="h-10 w-10 rounded bg-slate-100 flex items-center justify-center">
            <ImageIcon className="w-4 h-4 text-slate-400" />
          </div>
        ),
    },
    {
      key: "caption",
      label: "Caption",
      render: (val: string) => (
        <span className="line-clamp-1 max-w-[240px]">{val || "—"}</span>
      ),
    },
    {
      key: "categoryId",
      label: "Category",
      render: (_: any, row: GalleryImage) => row.category?.name ?? "—",
    },
    { key: "displayOrder", label: "Order" },
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
        title="Gallery"
        subtitle="Manage gallery images and categories"
        actionLabel="Add Image"
        onAction={openCreate}
      />

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <AdminTable
          columns={columns}
          data={images}
          onEdit={openEdit}
          onDelete={setDeleteTarget}
        />
      )}

      {/* Create / Edit Modal */}
      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        title={editing ? "Edit Gallery Image" : "Add Gallery Image"}
        isSubmitting={submitting}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Caption</label>
            <input
              type="text"
              value={form.caption}
              onChange={(e) => setForm((f) => ({ ...f, caption: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            />
          </div>

          <FileUpload
            label="Gallery Image *"
            value={form.fileUrl}
            onChange={(url) => setForm((f) => ({ ...f, fileUrl: url }))}
          />

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
            <select
              value={form.categoryId}
              onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            >
              <option value="">— Select Category —</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
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
        title="Delete Gallery Image"
        isSubmitting={deleteLoading}
        submitLabel="Delete"
        submitVariant="danger"
      >
        <p className="text-sm text-slate-600">
          Are you sure you want to delete{" "}
          <strong>{deleteTarget?.caption || "this image"}</strong>? This action cannot be undone.
        </p>
      </AdminModal>
    </div>
  );
}
