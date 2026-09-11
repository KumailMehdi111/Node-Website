"use client";

import React, { useEffect, useState } from "react";
import { Save, CheckCircle, AlertCircle, Lock, Mail, User } from "lucide-react";
import { adminFetch } from "@/lib/admin-api";
import { FileUpload } from "@/components/admin/FileUpload";

interface SchoolInformation {
  name: string;
  address: string;
  phone: string;
  email: string;
  timings: string;
  aboutText: string;
  vision: string;
  mission: string;
  principalMsg: string;
  principalName: string;
  principalTitle: string;
  principalPhoto: string;
}

interface WebsiteSettings {
  schoolName: string;
  primaryContact: string;
  email: string;
  address: string;
  whatsappNumber: string;
  seoTitle: string;
  seoDescription: string;
  footerText: string;
  statsStudents: string;
  statsTeachers: string;
  statsPassRate: string;
  statsCampus: string;
  statsClubs: string;
  heroImageUrl: string;
  heroCampusHighlight: string;
}

function AccountSecuritySection() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [name, setName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    adminFetch<{ user: { name: string; email: string } }>("/auth/me")
      .then((data) => {
        setName(data.user.name || "");
        setNewEmail(data.user.email || "");
      })
      .catch(() => {})
      .finally(() => setLoadingUser(false));
  }, []);

  async function handleChangeCredentials() {
    if (!currentPassword) {
      setMsg({ type: "error", text: "Current password is required" });
      return;
    }
    if (newPassword && newPassword !== confirmPassword) {
      setMsg({ type: "error", text: "New passwords do not match" });
      return;
    }
    try {
      setSaving(true);
      setMsg(null);
      await adminFetch("/auth/credentials", {
        method: "PUT",
        body: JSON.stringify({
          currentPassword,
          name,
          newEmail,
          newPassword: newPassword || undefined,
        }),
      });
      setMsg({ type: "success", text: "Credentials updated successfully" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (e: any) {
      setMsg({ type: "error", text: e.message });
    } finally {
      setSaving(false);
    }
  }

  if (loadingUser) return null;

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-card mb-6">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 rounded-t-xl">
        <h2 className="text-lg font-bold text-navy-900">Account Security</h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Change your admin name, email, or password
        </p>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-500 mb-1">
            <User className="inline w-3.5 h-3.5 mr-1 -mt-0.5" /> Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-500 mb-1">
            <Mail className="inline w-3.5 h-3.5 mr-1 -mt-0.5" /> New Email
          </label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-500 mb-1">
            <Lock className="inline w-3.5 h-3.5 mr-1 -mt-0.5" /> New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Leave blank to keep current"
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-500 mb-1">
            <Lock className="inline w-3.5 h-3.5 mr-1 -mt-0.5" /> Confirm New Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
          />
        </div>
        <div className="md:col-span-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
          <label className="block text-sm font-medium text-amber-800 mb-1">
            Current Password (required to save changes)
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter your current password"
            className="w-full px-3 py-2 border border-amber-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 bg-white"
          />
        </div>
      </div>
      {msg?.type === "error" && (
        <div className="mx-6 mb-4 px-4 py-3 rounded-lg text-sm flex items-center gap-2 bg-red-50 border border-red-200 text-red-700">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {msg.text}
        </div>
      )}
      {msg?.type === "success" && (
        <div className="mx-6 mb-4 px-4 py-3 rounded-lg text-sm flex items-center gap-2 bg-green-50 border border-green-200 text-green-700">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          {msg.text}
        </div>
      )}
      <div className="px-6 py-4 border-t border-slate-100 flex justify-end">
        <button
          onClick={handleChangeCredentials}
          disabled={saving || !currentPassword}
          className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-500 rounded-lg transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <Lock className="w-4 h-4" />
          {saving ? "Saving..." : "Update Credentials"}
        </button>
      </div>
    </div>
  );
}

export default function AdminSettingsPage() {
  const [schoolInfo, setSchoolInfo] = useState<SchoolInformation>({
    name: "",
    address: "",
    phone: "",
    email: "",
    timings: "",
    aboutText: "",
    vision: "",
    mission: "",
    principalMsg: "",
    principalName: "",
    principalTitle: "",
    principalPhoto: "",
  });
  const [website, setWebsite] = useState<WebsiteSettings>({
    schoolName: "",
    primaryContact: "",
    email: "",
    address: "",
    whatsappNumber: "",
    seoTitle: "",
    seoDescription: "",
    footerText: "",
    statsStudents: "",
    statsTeachers: "",
    statsPassRate: "",
    statsCampus: "",
    statsClubs: "",
    heroImageUrl: "",
    heroCampusHighlight: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await adminFetch<{
          schoolInformation?: SchoolInformation;
          websiteSettings?: WebsiteSettings;
        }>("/public/settings");
        if (data.schoolInformation) setSchoolInfo(data.schoolInformation);
        if (data.websiteSettings) setWebsite(data.websiteSettings);
      } catch (e: any) {
        setMsg({ type: "error", text: e.message });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleSaveSchool() {
    try {
      setSaving(true);
      setMsg(null);
      await adminFetch("/admin/settings/school", {
        method: "PUT",
        body: JSON.stringify(schoolInfo),
      });
      setMsg({ type: "success", text: "School information saved successfully." });
    } catch (e: any) {
      setMsg({ type: "error", text: e.message });
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveWebsite() {
    try {
      setSaving(true);
      setMsg(null);
      await adminFetch("/admin/settings/website", {
        method: "PUT",
        body: JSON.stringify(website),
      });
      setMsg({ type: "success", text: "Website settings saved successfully." });
    } catch (e: any) {
      setMsg({ type: "error", text: e.message });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <div className="text-center py-16 text-slate-400">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-900">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Manage school and website configuration</p>
      </div>

      {msg && (
        <div
          className={`mb-6 px-4 py-3 rounded-lg text-sm flex items-center gap-2 ${
            msg.type === "success"
              ? "bg-green-50 border border-green-200 text-green-700"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}
        >
          {msg.type === "success" ? (
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
          )}
          {msg.text}
        </div>
      )}

      {/* School Information - Editable */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-card mb-6">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 rounded-t-xl">
          <h2 className="text-lg font-bold text-navy-900">School Information</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Core school details displayed across the website
          </p>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Name", key: "name" },
            { label: "Address", key: "address" },
            { label: "Phone", key: "phone" },
            { label: "Email", key: "email" },
            { label: "Timings", key: "timings" },
          ].map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-slate-500 mb-1">
                {field.label}
              </label>
              <input
                type="text"
                value={(schoolInfo as any)[field.key] || ""}
                onChange={(e) => setSchoolInfo({ ...schoolInfo, [field.key]: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>
          ))}
          {[
            { label: "About Text", key: "aboutText" },
            { label: "Vision", key: "vision" },
            { label: "Mission", key: "mission" },
            { label: "Principal Message", key: "principalMsg" },
          ].map((field) => (
            <div key={field.key} className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-500 mb-1">
                {field.label}
              </label>
              <textarea
                value={(schoolInfo as any)[field.key] || ""}
                onChange={(e) => setSchoolInfo({ ...schoolInfo, [field.key]: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 resize-none"
              />
            </div>
          ))}
          {[
            { label: "Principal Name", key: "principalName", placeholder: "Dr. Eleanor Vance" },
            { label: "Principal Title", key: "principalTitle", placeholder: "Principal & Academic Director" },
          ].map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-slate-500 mb-1">
                {field.label}
              </label>
              <input
                type="text"
                value={(schoolInfo as any)[field.key] || ""}
                onChange={(e) => setSchoolInfo({ ...schoolInfo, [field.key]: e.target.value })}
                placeholder={field.placeholder}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>
          ))}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-500 mb-1">
              Principal Photo
            </label>
            <FileUpload
              value={schoolInfo.principalPhoto || ""}
              onChange={(url) => setSchoolInfo({ ...schoolInfo, principalPhoto: url })}
              accept="image/*"
            />
          </div>
        </div>
        <div className="px-6 py-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={handleSaveSchool}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-navy-900 hover:bg-navy-800 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save School Info"}
          </button>
        </div>
      </div>

      {/* Website Settings - Editable */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-card mb-6">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 rounded-t-xl">
          <h2 className="text-lg font-bold text-navy-900">Website Settings</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure contact info, SEO, and footer content
          </p>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-navy-800 mb-1">School Name</label>
            <input
              type="text"
              value={website.schoolName}
              onChange={(e) => setWebsite({ ...website, schoolName: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-800 mb-1">
              Primary Contact
            </label>
            <input
              type="text"
              value={website.primaryContact}
              onChange={(e) => setWebsite({ ...website, primaryContact: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-800 mb-1">Email</label>
            <input
              type="email"
              value={website.email}
              onChange={(e) => setWebsite({ ...website, email: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-800 mb-1">Address</label>
            <input
              type="text"
              value={website.address}
              onChange={(e) => setWebsite({ ...website, address: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-800 mb-1">
              WhatsApp Number
            </label>
            <input
              type="text"
              value={website.whatsappNumber}
              onChange={(e) => setWebsite({ ...website, whatsappNumber: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-navy-800 mb-1">SEO Title</label>
            <input
              type="text"
              value={website.seoTitle}
              onChange={(e) => setWebsite({ ...website, seoTitle: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-navy-800 mb-1">
              SEO Description
            </label>
            <textarea
              value={website.seoDescription}
              onChange={(e) => setWebsite({ ...website, seoDescription: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 resize-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-navy-800 mb-1">Footer Text</label>
            <textarea
              value={website.footerText}
              onChange={(e) => setWebsite({ ...website, footerText: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 resize-none"
            />
          </div>
        </div>
        <div className="px-6 py-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={handleSaveWebsite}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-gold-600 hover:bg-gold-500 rounded-lg transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Website Settings"}
          </button>
        </div>
      </div>

      {/* Homepage Stats */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-card mb-6">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 rounded-t-xl">
          <h2 className="text-lg font-bold text-navy-900">Homepage Stats</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure the statistics shown on the homepage
          </p>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: "Students (e.g. 1850)", key: "statsStudents", placeholder: "1850" },
            { label: "Teachers (e.g. 140)", key: "statsTeachers", placeholder: "140" },
            { label: "Pass Rate (e.g. 99.4%)", key: "statsPassRate", placeholder: "99.4%" },
            { label: "Campus Size (e.g. 45 Acres)", key: "statsCampus", placeholder: "45 Acres" },
            { label: "Clubs Count (e.g. 32)", key: "statsClubs", placeholder: "32" },
          ].map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-navy-800 mb-1">{field.label}</label>
              <input
                type="text"
                value={(website as any)[field.key] || ""}
                onChange={(e) => setWebsite({ ...website, [field.key]: e.target.value })}
                placeholder={field.placeholder}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>
          ))}
        </div>
        <div className="px-6 py-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={handleSaveWebsite}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-gold-600 hover:bg-gold-500 rounded-lg transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Stats"}
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-card mb-6">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 rounded-t-xl">
          <h2 className="text-lg font-bold text-navy-900">Hero Section</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure the hero banner image and campus highlight text
          </p>
        </div>
        <div className="p-6 grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-navy-800 mb-1">Hero Image</label>
            <FileUpload
              value={website.heroImageUrl || ""}
              onChange={(url) => setWebsite({ ...website, heroImageUrl: url })}
              accept="image/*"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-800 mb-1">Campus Highlight Text</label>
            <input
              type="text"
              value={website.heroCampusHighlight || ""}
              onChange={(e) => setWebsite({ ...website, heroCampusHighlight: e.target.value })}
              placeholder="45-Acre Smart Academic & Athletic Campus"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>
          {website.heroImageUrl && (
            <div>
              <p className="text-xs font-medium text-slate-500 mb-2">Preview</p>
              <img
                src={website.heroImageUrl}
                alt="Hero preview"
                className="w-full max-w-md h-48 object-cover rounded-lg border border-slate-200"
              />
            </div>
          )}
        </div>
        <div className="px-6 py-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={handleSaveWebsite}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-gold-600 hover:bg-gold-500 rounded-lg transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Hero Settings"}
          </button>
        </div>
      </div>

      {/* Account Security */}
      <AccountSecuritySection />
    </div>
  );
}
