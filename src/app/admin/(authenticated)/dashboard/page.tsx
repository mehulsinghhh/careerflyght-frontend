import {
  Users,
  UserRoundCheck,
  Clock,
  CalendarCheck
} from "lucide-react";

const stats = [
  { name: "Pending Mentors", value: "12", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
  { name: "Approved Mentors", value: "48", icon: UserRoundCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
  { name: "Total Students", value: "1,284", icon: Users, color: "text-indigo-600", bg: "bg-indigo-50" },
  { name: "Active Bookings", value: "156", icon: CalendarCheck, color: "text-purple-600", bg: "bg-purple-50" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2.5 ${stat.bg} rounded-xl`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Live Now</span>
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">{stat.name}</p>
              <p className="text-2xl font-bold text-zinc-900 mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm h-64 flex flex-col items-center justify-center text-center">
          <div className="h-12 w-12 bg-zinc-50 rounded-full flex items-center justify-center mb-4">
            <Clock className="h-6 w-6 text-zinc-400" />
          </div>
          <h3 className="text-sm font-bold text-zinc-900">Recent Mentor Applications</h3>
          <p className="text-xs text-zinc-500 mt-1">Application queue is currently empty.</p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm h-64 flex flex-col items-center justify-center text-center">
          <div className="h-12 w-12 bg-zinc-50 rounded-full flex items-center justify-center mb-4">
            <CalendarCheck className="h-6 w-6 text-zinc-400" />
          </div>
          <h3 className="text-sm font-bold text-zinc-900">Platform Activity</h3>
          <p className="text-xs text-zinc-500 mt-1">No major alerts or updates at this time.</p>
        </div>
      </div>
    </div>
  );
}
