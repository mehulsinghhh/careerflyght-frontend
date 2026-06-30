export function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm h-32">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 bg-zinc-100 rounded-xl" />
              <div className="h-3 w-16 bg-zinc-100 rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-24 bg-zinc-100 rounded" />
              <div className="h-7 w-12 bg-zinc-100 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
