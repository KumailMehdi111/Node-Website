"use client";

import React, { useRef, useState } from "react";
import { Upload, X, ImageIcon } from "lucide-react";
import { adminUpload } from "@/lib/admin-api";
import { API_BASE_URL } from "@/lib/config";

interface FileUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  accept?: string;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  value,
  onChange,
  label = "Upload File",
  accept = "image/*",
  className = "",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const url = await adminUpload(file);
      onChange(url);
    } catch (err: any) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-navy-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {uploading ? (
            <span className="h-4 w-4 border-2 border-navy-800 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Upload className="w-4 h-4" />
          )}
          {uploading ? "Uploading..." : "Choose File"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="p-1 text-slate-400 hover:text-red-500 transition cursor-pointer"
            title="Remove"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      {value && (
        <div className="mt-2 relative inline-block">
          <img
            src={value.startsWith('/uploads/') ? `${API_BASE_URL}${value}` : value}
            alt="Preview"
            className="h-20 rounded-lg object-cover border border-slate-200"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      )}
      <div className="mt-1.5 flex items-center gap-2">
        <span className="text-xs text-slate-400">or paste URL:</span>
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-gold-500"
        />
      </div>
    </div>
  );
};
