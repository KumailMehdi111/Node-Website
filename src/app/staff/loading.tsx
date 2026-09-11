export default function StaffLoading() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="bg-navy-950 rounded-3xl p-10 lg:p-14 text-center max-w-4xl mx-auto h-48 animate-pulse" />
        <div className="bg-white p-6 rounded-2xl h-16 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-white rounded-2xl h-72 animate-pulse border border-slate-200" />
          ))}
        </div>
      </div>
    </div>
  );
}
