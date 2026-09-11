"use client";

import { useEffect, useState, useCallback } from "react";
import { adminList, adminCreate, adminUpdate, adminDelete } from "@/lib/admin-api";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminModal } from "@/components/admin/AdminModal";
import { AlertCircle } from "lucide-react";

interface AdmissionNotice {
  id: string;
  title: string;
  content: string;
  status: string;
}

interface FeeStructure {
  id: string;
  className: string;
  admissionFee: number;
  monthlyFee: number;
  annualFee: number;
  otherCharges: number | null;
  effectiveYear: string;
  status: string;
}

const STATUSES = ["DRAFT", "PUBLISHED"] as const;

export default function AdminAdmissionsPage() {
  const [notices, setNotices] = useState<AdmissionNotice[]>([]);
  const [fees, setFees] = useState<FeeStructure[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [noticeModalOpen, setNoticeModalOpen] = useState(false);
  const [noticeSubmitting, setNoticeSubmitting] = useState(false);
  const [noticeFormError, setNoticeFormError] = useState("");
  const [noticeEditTarget, setNoticeEditTarget] = useState<AdmissionNotice | null>(null);
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const [noticeStatus, setNoticeStatus] = useState<string>("DRAFT");

  const [feeModalOpen, setFeeModalOpen] = useState(false);
  const [feeSubmitting, setFeeSubmitting] = useState(false);
  const [feeFormError, setFeeFormError] = useState("");
  const [feeEditTarget, setFeeEditTarget] = useState<FeeStructure | null>(null);
  const [feeClassName, setFeeClassName] = useState("");
  const [feeAdmission, setFeeAdmission] = useState("");
  const [feeMonthly, setFeeMonthly] = useState("");
  const [feeAnnual, setFeeAnnual] = useState("");
  const [feeOther, setFeeOther] = useState("");
  const [feeYear, setFeeYear] = useState("");
  const [feeStatus, setFeeStatus] = useState<string>("DRAFT");

  const [deleteNoticeTarget, setDeleteNoticeTarget] = useState<AdmissionNotice | null>(null);
  const [deleteFeeTarget, setDeleteFeeTarget] = useState<FeeStructure | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [noticeData, feeData] = await Promise.all([
        adminList<AdmissionNotice>("/admin/admissions/notices"),
        adminList<FeeStructure>("/admin/admissions/fees"),
      ]);
      setNotices(noticeData);
      setFees(feeData);
    } catch (err: any) {
      setError(err.message || "Failed to load admissions data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  function openNoticeModal(target?: AdmissionNotice) {
    if (target) {
      setNoticeEditTarget(target);
      setNoticeTitle(target.title);
      setNoticeContent(target.content);
      setNoticeStatus(target.status);
    } else {
      setNoticeEditTarget(null);
      setNoticeTitle("");
      setNoticeContent("");
      setNoticeStatus("DRAFT");
    }
    setNoticeFormError("");
    setNoticeModalOpen(true);
  }

  async function handleNoticeSubmit() {
    if (!noticeTitle.trim()) { setNoticeFormError("Title is required"); return; }
    if (!noticeContent.trim()) { setNoticeFormError("Content is required"); return; }
    setNoticeSubmitting(true);
    setNoticeFormError("");
    try {
      const body = { title: noticeTitle.trim(), content: noticeContent.trim(), status: noticeStatus };
      if (noticeEditTarget) {
        await adminUpdate(`/admin/admissions/notices/${noticeEditTarget.id}`, body);
      } else {
        await adminCreate("/admin/admissions/notices", body);
      }
      setNoticeModalOpen(false);
      await fetchData();
    } catch (err: any) {
      setNoticeFormError(err.message || "Failed to save notice");
    } finally {
      setNoticeSubmitting(false);
    }
  }

  function openFeeModal(target?: FeeStructure) {
    if (target) {
      setFeeEditTarget(target);
      setFeeClassName(target.className);
      setFeeAdmission(String(target.admissionFee));
      setFeeMonthly(String(target.monthlyFee));
      setFeeAnnual(String(target.annualFee));
      setFeeOther(target.otherCharges != null ? String(target.otherCharges) : "");
      setFeeYear(target.effectiveYear);
      setFeeStatus(target.status);
    } else {
      setFeeEditTarget(null);
      setFeeClassName("");
      setFeeAdmission("");
      setFeeMonthly("");
      setFeeAnnual("");
      setFeeOther("");
      setFeeYear("");
      setFeeStatus("DRAFT");
    }
    setFeeFormError("");
    setFeeModalOpen(true);
  }

  async function handleFeeSubmit() {
    if (!feeClassName.trim()) { setFeeFormError("Class name is required"); return; }
    if (!feeYear.trim()) { setFeeFormError("Effective year is required"); return; }
    setFeeSubmitting(true);
    setFeeFormError("");
    try {
      const body = {
        className: feeClassName.trim(),
        admissionFee: parseFloat(feeAdmission) || 0,
        monthlyFee: parseFloat(feeMonthly) || 0,
        annualFee: parseFloat(feeAnnual) || 0,
        otherCharges: feeOther ? parseFloat(feeOther) : null,
        effectiveYear: feeYear.trim(),
        status: feeStatus,
      };
      if (feeEditTarget) {
        await adminUpdate(`/admin/admissions/fees/${feeEditTarget.id}`, body);
      } else {
        await adminCreate("/admin/admissions/fees", body);
      }
      setFeeModalOpen(false);
      await fetchData();
    } catch (err: any) {
      setFeeFormError(err.message || "Failed to save fee structure");
    } finally {
      setFeeSubmitting(false);
    }
  }

  async function handleDeleteNotice() {
    if (!deleteNoticeTarget) return;
    setDeleteLoading(true);
    try {
      await adminDelete(`/admin/admissions/notices/${deleteNoticeTarget.id}`);
      setDeleteNoticeTarget(null);
      await fetchData();
    } catch (err: any) { alert(err.message || "Failed to delete"); }
    finally { setDeleteLoading(false); }
  }

  async function handleDeleteFee() {
    if (!deleteFeeTarget) return;
    setDeleteLoading(true);
    try {
      await adminDelete(`/admin/admissions/fees/${deleteFeeTarget.id}`);
      setDeleteFeeTarget(null);
      await fetchData();
    } catch (err: any) { alert(err.message || "Failed to delete"); }
    finally { setDeleteLoading(false); }
  }

  function statusBadge(s: string) {
    const isPublished = s === "PUBLISHED";
    return (
      <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${isPublished ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
        {s}
      </span>
    );
  }

  const noticeColumns = [
    { key: "title", label: "Title" },
    { key: "status", label: "Status", render: (val: string) => statusBadge(val) },
  ];

  const feeColumns = [
    { key: "className", label: "Class" },
    { key: "admissionFee", label: "Admission Fee", render: (val: number) => `Rs. ${val.toLocaleString()}` },
    { key: "monthlyFee", label: "Monthly Fee", render: (val: number) => `Rs. ${val.toLocaleString()}` },
    { key: "annualFee", label: "Annual Fee", render: (val: number) => `Rs. ${val.toLocaleString()}` },
    { key: "effectiveYear", label: "Year" },
    { key: "status", label: "Status", render: (val: string) => statusBadge(val) },
  ];

  return (
    <div className="space-y-10">
      <div>
        <AdminPageHeader title="Admission Notices" subtitle="Manage admission announcements" actionLabel="New Notice" onAction={() => openNoticeModal()} />
        {error && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            <AlertCircle size={16} />{error}
          </div>
        )}
        <AdminTable columns={noticeColumns} data={notices} onEdit={(row) => openNoticeModal(row)} onDelete={setDeleteNoticeTarget} emptyMessage={loading ? "Loading..." : "No admission notices found."} />
      </div>

      <div>
        <AdminPageHeader title="Fee Structure" subtitle="Manage class-wise fee details" actionLabel="New Fee Structure" onAction={() => openFeeModal()} />
        <AdminTable columns={feeColumns} data={fees} onEdit={(row) => openFeeModal(row)} onDelete={setDeleteFeeTarget} emptyMessage={loading ? "Loading..." : "No fee structures found."} />
      </div>

      <AdminModal isOpen={noticeModalOpen} onClose={() => setNoticeModalOpen(false)} title={noticeEditTarget ? "Edit Admission Notice" : "New Admission Notice"} onSubmit={handleNoticeSubmit} isSubmitting={noticeSubmitting} submitLabel={noticeEditTarget ? "Update" : "Create"}>
        <div className="space-y-4">
          {noticeFormError && (<div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3"><AlertCircle size={16} />{noticeFormError}</div>)}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title <span className="text-red-500">*</span></label>
            <input type="text" value={noticeTitle} onChange={(e) => setNoticeTitle(e.target.value)} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500" placeholder="Notice title" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Content <span className="text-red-500">*</span></label>
            <textarea value={noticeContent} onChange={(e) => setNoticeContent(e.target.value)} rows={5} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 resize-none" placeholder="Notice content" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
            <select value={noticeStatus} onChange={(e) => setNoticeStatus(e.target.value)} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500">
              {STATUSES.map((s) => (<option key={s} value={s}>{s}</option>))}
            </select>
          </div>
        </div>
      </AdminModal>

      <AdminModal isOpen={feeModalOpen} onClose={() => setFeeModalOpen(false)} title={feeEditTarget ? "Edit Fee Structure" : "New Fee Structure"} onSubmit={handleFeeSubmit} isSubmitting={feeSubmitting} submitLabel={feeEditTarget ? "Update" : "Create"}>
        <div className="space-y-4">
          {feeFormError && (<div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3"><AlertCircle size={16} />{feeFormError}</div>)}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Class Name <span className="text-red-500">*</span></label>
              <input type="text" value={feeClassName} onChange={(e) => setFeeClassName(e.target.value)} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500" placeholder="e.g. Class 1" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Effective Year <span className="text-red-500">*</span></label>
              <input type="text" value={feeYear} onChange={(e) => setFeeYear(e.target.value)} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500" placeholder="e.g. 2026-2027" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Admission Fee (Rs.)</label>
              <input type="number" min="0" value={feeAdmission} onChange={(e) => setFeeAdmission(e.target.value)} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500" placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Monthly Fee (Rs.)</label>
              <input type="number" min="0" value={feeMonthly} onChange={(e) => setFeeMonthly(e.target.value)} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500" placeholder="0" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Annual Fee (Rs.)</label>
              <input type="number" min="0" value={feeAnnual} onChange={(e) => setFeeAnnual(e.target.value)} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500" placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Other Charges (Rs.)</label>
              <input type="number" min="0" value={feeOther} onChange={(e) => setFeeOther(e.target.value)} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500" placeholder="0 (optional)" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
            <select value={feeStatus} onChange={(e) => setFeeStatus(e.target.value)} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500">
              {STATUSES.map((s) => (<option key={s} value={s}>{s}</option>))}
            </select>
          </div>
        </div>
      </AdminModal>

      <AdminModal isOpen={!!deleteNoticeTarget} onClose={() => setDeleteNoticeTarget(null)} onSubmit={handleDeleteNotice} title="Delete Notice" isSubmitting={deleteLoading} submitLabel="Delete" submitVariant="danger">
        <p className="text-sm text-slate-600">Are you sure you want to delete <strong>{deleteNoticeTarget?.title}</strong>? This action cannot be undone.</p>
      </AdminModal>

      <AdminModal isOpen={!!deleteFeeTarget} onClose={() => setDeleteFeeTarget(null)} onSubmit={handleDeleteFee} title="Delete Fee Structure" isSubmitting={deleteLoading} submitLabel="Delete" submitVariant="danger">
        <p className="text-sm text-slate-600">Are you sure you want to delete the fee structure for <strong>{deleteFeeTarget?.className}</strong>? This action cannot be undone.</p>
      </AdminModal>
    </div>
  );
}
