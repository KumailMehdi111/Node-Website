"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Mail, MailOpen, Reply, Trash2, MessageSquareText } from "lucide-react";
import { adminList, adminFetch } from "@/lib/admin-api";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminModal } from "@/components/admin/AdminModal";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: "Unread" | "Read" | "Replied";
  createdAt: string;
}

const STATUS_STYLES: Record<string, string> = {
  Unread: "bg-red-100 text-red-700",
  Read: "bg-blue-100 text-blue-700",
  Replied: "bg-green-100 text-green-700",
};

export default function AdminContactMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ContactMessage | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await adminList<ContactMessage>("/admin/contact-messages");
      setMessages(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function updateStatus(id: string, status: "Read" | "Replied" | "Unread") {
    try {
      setUpdatingStatus(true);
      await adminFetch(`/admin/contact-messages/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));
      if (selected?.id === id) {
        setSelected((prev) => (prev ? { ...prev, status } : null));
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setUpdatingStatus(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await adminFetch(`/admin/contact-messages/${deleteTarget.id}`, { method: "DELETE" });
      setDeleteTarget(null);
      load();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setDeleteLoading(false);
    }
  }

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "subject", label: "Subject" },
    {
      key: "message",
      label: "Message",
      render: (val: string, row: ContactMessage) => (
        <div className="max-w-[200px]">
          <p className="text-xs text-slate-600 truncate">{val || "—"}</p>
          <button
            onClick={(e) => { e.stopPropagation(); setSelected(row); }}
            className="mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-gold-700 hover:text-gold-900 transition cursor-pointer"
          >
            <MessageSquareText className="w-3 h-3" />
            Read more
          </button>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (val: string) => (
        <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${STATUS_STYLES[val] || ""}`}>
          {val}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Date",
      render: (val: string) => val ? new Date(val).toLocaleDateString() : "—",
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <AdminPageHeader
        title="Contact Messages"
        subtitle="View and manage incoming messages"
      />

      {error && (
        <div className="mb-4 px-4 py-2 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>
      )}

      {loading ? (
        <div className="text-center py-16 text-slate-400">Loading...</div>
      ) : (
        <AdminTable
          columns={columns}
          data={messages}
          onEdit={(row) => {
            setSelected(row);
          }}
          onDelete={setDeleteTarget}
          emptyMessage="No contact messages found."
        />
      )}

      <AdminModal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title="Message Details"
        onSubmit={() => setSelected(null)}
        isSubmitting={updatingStatus}
      >
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-slate-500">From</span>
                <p className="text-navy-900">{selected.name}</p>
              </div>
              <div>
                <span className="font-medium text-slate-500">Email</span>
                <p className="text-navy-900">{selected.email}</p>
              </div>
              {selected.phone && (
                <div>
                  <span className="font-medium text-slate-500">Phone</span>
                  <p className="text-navy-900">{selected.phone}</p>
                </div>
              )}
              <div>
                <span className="font-medium text-slate-500">Date</span>
                <p className="text-navy-900">
                  {selected.createdAt ? new Date(selected.createdAt).toLocaleString() : "—"}
                </p>
              </div>
            </div>

            <div>
              <span className="font-medium text-slate-500 text-sm">Subject</span>
              <p className="text-navy-900 font-semibold">{selected.subject}</p>
            </div>

            <div>
              <span className="font-medium text-slate-500 text-sm">Message</span>
              <p className="text-navy-800 whitespace-pre-wrap mt-1 text-sm leading-relaxed">{selected.message}</p>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
              <span className="text-sm font-medium text-slate-500 mr-1">Actions:</span>
              {selected.status !== "Read" && (
                <button
                  onClick={() => updateStatus(selected.id, "Read")}
                  disabled={updatingStatus}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition cursor-pointer disabled:opacity-50"
                >
                  <MailOpen className="w-3.5 h-3.5" />
                  Mark as Read
                </button>
              )}
              {selected.status !== "Replied" && (
                <button
                  onClick={() => updateStatus(selected.id, "Replied")}
                  disabled={updatingStatus}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-lg transition cursor-pointer disabled:opacity-50"
                >
                  <Reply className="w-3.5 h-3.5" />
                  Mark as Replied
                </button>
              )}
              {selected.status !== "Unread" && (
                <button
                  onClick={() => updateStatus(selected.id, "Unread")}
                  disabled={updatingStatus}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition cursor-pointer disabled:opacity-50"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Mark as Unread
                </button>
              )}
            </div>
          </div>
        )}
      </AdminModal>

      <AdminModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onSubmit={handleDelete}
        title="Delete Message"
        isSubmitting={deleteLoading}
        submitLabel="Delete"
        submitVariant="danger"
      >
        <p className="text-sm text-slate-600">
          Are you sure you want to delete the message from <strong>{deleteTarget?.name}</strong>? This action cannot be undone.
        </p>
      </AdminModal>
    </div>
  );
}
