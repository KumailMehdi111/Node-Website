export default function AdminLoading() {
  return (
    <div className="p-6 space-y-6">
      <div className="h-8 w-48 bg-slate-200 rounded-lg animate-pulse" />
      <div className="h-4 w-72 bg-slate-200 rounded animate-pulse" />
      <div className="mt-6 rounded-xl border border-slate-100 shadow-card overflow-hidden">
        <div className="h-11 bg-navy-900" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`h-12 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}
          />
        ))}
      </div>
    </div>
  );
}