"use client";

import { useEffect, useState, useCallback } from "react";
import { adminList, adminFetch } from "@/lib/admin-api";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminModal } from "@/components/admin/AdminModal";
import { MessageSquareText } from "lucide-react";

interface Inquiry {
  id: string;
  parentName: string;
  email: string;
  phone: string | null;
  studentName: string;
  grade: string;
  message: string | null;
  status: string;
  note: string | null;
  createdAt: string;
}

const STATUSES = ["NEW", "CONTACTED", "ENROLLED", "CLOSED"];

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewTarget, setViewTarget] = useState<Inquiry | null>(null);
  const [noteText, setNoteText] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Inquiry | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchInquiries = useCallback(async () => {
    try {
      setLoading(true);
      const data = await adminList<Inquiry>("/admin/admission-inquiries");
      setInquiries(data);
    } catch (err) {
      console.error("Failed to load inquiries", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchInquiries(); }, [fetchInquiries]);

  function openView(row: Inquiry) {
    setViewTarget(row);
    setNoteText(row.note || "");
  }

  async function handleStatusChange(status: string) {
    if (!viewTarget) return;
    setSaving(true);
    try {
      await adminFetch(`/admin/admission-inquiries/${viewTarget.id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status, note: noteText }),
      });
      setViewTarget(null);
      fetchInquiries();
    } catch (err: any) {
      alert(err.message || "Failed to update");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await adminFetch(`/admin/admission-inquiries/${deleteTarget.id}`, { method: "DELETE" });
      setDeleteTarget(null);
      fetchInquiries();
    } catch (err: any) {
      alert(err.message || "Failed to delete");
    } finally {
      setDeleteLoading(false);
    }
  }

  function statusBadge(s: string) {
    const colors: Record<string, string> = {
      NEW: "bg-blue-50 text-blue-700",
      CONTACTED: "bg-amber-50 text-amber-700",
      ENROLLED: "bg-emerald-50 text-emerald-700",
      CLOSED: "bg-slate-100 text-slate-600",
    };
    return (
      <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${colors[s] || "bg-slate-100 text-slate-600"}`}>
        {s}
      </span>
    );
  }

  const columns = [
    { key: "parentName", label: "Parent" },
    { key: "studentName", label: "Student" },
    { key: "grade", label: "Grade" },
    { key: "email", label: "Email" },
    {
      key: "message",
      label: "Message",
      render: (val: string | null, row: Inquiry) => (
        <div className="max-w-[180px]">
          <p className="text-xs text-slate-600 truncate">{val || "—"}</p>
          {val && (
            <button
              onClick={(e) => { e.stopPropagation(); openView(row); }}
              className="mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-gold-700 hover:text-gold-900 transition cursor-pointer"
            >
              <MessageSquareText className="w-3 h-3" />
              Read more
            </button>
          )}
        </div>
      ),
    },
    { key: "status", label: "Status", render: (val: string) => statusBadge(val) },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Admission Inquiries"
        subtitle="Review and respond to admission inquiries from parents"
      />

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <AdminTable
          columns={columns}
          data={inquiries}
          onEdit={openView}
          onDelete={setDeleteTarget}
          emptyMessage="No inquiries yet."
        />
      )}

      <AdminModal
        isOpen={!!viewTarget}
        onClose={() => setViewTarget(null)}
        title="Inquiry Details"
        onSubmit={() => handleStatusChange(viewTarget?.status || "NEW")}
        isSubmitting={saving}
        submitLabel="Save"
      >
        {viewTarget && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase">Parent</label>
                <p className="text-sm text-navy-900 font-medium">{viewTarget.parentName}</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase">Email</label>
                <p className="text-sm text-navy-900">{viewTarget.email}</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase">Phone</label>
                <p className="text-sm text-navy-900">{viewTarget.phone || "—"}</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase">Date</label>
                <p className="text-sm text-navy-900">{new Date(viewTarget.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase">Student</label>
                <p className="text-sm text-navy-900 font-medium">{viewTarget.studentName}</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase">Grade</label>
                <p className="text-sm text-navy-900">{viewTarget.grade}</p>
              </div>
            </div>
            {viewTarget.message && (
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase">Message</label>
                <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg mt-1">{viewTarget.message}</p>
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Admin Note</label>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 resize-none"
                placeholder="Internal note about this inquiry..."
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Change Status</label>
              <div className="flex flex-wrap gap-2">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleStatusChange(s)}
                    disabled={saving || s === viewTarget.status}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition ${
                      s === viewTarget.status
                        ? "bg-navy-900 text-white border-navy-900"
                        : "bg-white text-slate-600 border-slate-200 hover:border-navy-900 hover:text-navy-900"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </AdminModal>

      <AdminModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onSubmit={handleDelete}
        title="Delete Inquiry"
        isSubmitting={deleteLoading}
        submitLabel="Delete"
        submitVariant="danger"
      >
        <p className="text-sm text-slate-600">
          Are you sure you want to delete the inquiry from <strong>{deleteTarget?.parentName}</strong>? This action cannot be undone.
        </p>
      </AdminModal>
    </div>
  );
}
