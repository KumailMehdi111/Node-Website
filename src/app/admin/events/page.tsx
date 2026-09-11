"use client";

import { useEffect, useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminModal } from "@/components/admin/AdminModal";
import { adminList, adminCreate, adminUpdate, adminDelete } from "@/lib/admin-api";
import { FileUpload } from "@/components/admin/FileUpload";

interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  image: string;
  status: "DRAFT" | "PUBLISHED";
  createdAt?: string;
}

const emptyForm = {
  title: "",
  slug: "",
  description: "",
  date: "",
  startTime: "",
  endTime: "",
  location: "",
  image: "",
  status: "DRAFT",
};

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function EventsPage() {
  const [items, setItems] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Event | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminList<Event>("/admin/events");
      setItems(data);
    } catch (e: any) {
      setError(e.message || "Failed to load events");
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

  const openEdit = (row: Event) => {
    setEditing(row);
    setForm({
      title: row.title,
      slug: row.slug,
      description: row.description,
      date: row.date ? row.date.slice(0, 10) : "",
      startTime: row.startTime || "",
      endTime: row.endTime || "",
      location: row.location,
      image: row.image,
      status: row.status,
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
        await adminUpdate(`/admin/events/${editing.id}`, body);
      } else {
        await adminCreate("/admin/events", body);
      }
      setModalOpen(false);
      load();
    } catch (e: any) {
      setError(e.message || "Failed to save event");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (row: Event) => {
    if (!confirm(`Delete "${row.title}"?`)) return;
    try {
      setError(null);
      await adminDelete(`/admin/events/${row.id}`);
      load();
    } catch (e: any) {
      setError(e.message || "Failed to delete event");
    }
  };

  const columns = [
    { key: "title", label: "Title" },
    {
      key: "date",
      label: "Date",
      render: (val: string) =>
        val ? new Date(val).toLocaleDateString() : "—",
    },
    { key: "location", label: "Location" },
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
    <div className="p-6">
      <AdminPageHeader
        title="Events"
        subtitle="Manage school events"
        actionLabel="New Event"
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
          emptyMessage="No events yet."
        />
      )}

      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Event" : "New Event"}
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
            <label className="block text-sm font-medium text-navy-800 mb-1">Description</label>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-800 mb-1">Date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy-800 mb-1">Start Time</label>
              <input
                type="time"
                value={form.startTime}
                onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-800 mb-1">End Time</label>
              <input
                type="time"
                value={form.endTime}
                onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-800 mb-1">Location</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>

          <FileUpload
            label="Event Image"
            value={form.image}
            onChange={(url) => setForm({ ...form, image: url })}
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
        </div>
      </AdminModal>
    </div>
  );
}
