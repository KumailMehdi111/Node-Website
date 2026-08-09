import React from 'react';
import { FileText, Download, Calendar, HardDrive } from 'lucide-react';
import { DownloadResource } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';

interface DownloadTableProps {
  resources: DownloadResource[];
}

export const DownloadTable: React.FC<DownloadTableProps> = ({ resources }) => {
  if (resources.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
        <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <p className="text-navy-900 font-bold text-base">No downloadable files found</p>
        <p className="text-slate-500 text-xs mt-1">Try adjusting your category filter or search keyword.</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-sm">
      <table className="w-full text-left border-collapse min-w-[650px]">
        <thead>
          <tr className="bg-navy-900 text-white text-xs uppercase tracking-wider font-bold">
            <th className="py-3.5 px-6">Document Title</th>
            <th className="py-3.5 px-4">Category</th>
            <th className="py-3.5 px-4">Target Audience</th>
            <th className="py-3.5 px-4">Size & Format</th>
            <th className="py-3.5 px-4">Date</th>
            <th className="py-3.5 px-6 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm">
          {resources.map((res) => (
            <tr key={res.id} className="hover:bg-slate-50 transition">
              <td className="py-4 px-6 font-semibold text-navy-900 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-navy-50 text-navy-900 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 text-gold-600" />
                </div>
                <span>{res.title}</span>
              </td>
              <td className="py-4 px-4">
                <Badge variant="navy">{res.category}</Badge>
              </td>
              <td className="py-4 px-4 text-xs font-medium text-slate-600">
                {res.targetAudience}
              </td>
              <td className="py-4 px-4 text-xs text-slate-500 font-mono">
                <div className="flex items-center gap-1">
                  <HardDrive className="w-3.5 h-3.5 text-slate-400" />
                  <span>{res.fileSize} ({res.fileFormat})</span>
                </div>
              </td>
              <td className="py-4 px-4 text-xs text-slate-400">
                {formatDate(res.uploadDate)}
              </td>
              <td className="py-4 px-6 text-right">
                <a
                  href={res.downloadUrl}
                  download
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-lg transition shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
