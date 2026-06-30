import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  name: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  bg: string;
  label?: string;
}

export function StatsCard({ name, value, icon: Icon, color, bg, label = "Live Now" }: StatsCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2.5 ${bg} rounded-xl`}>
          <Icon className={`h-5 w-5 ${color}`} />
        </div>
        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{label}</span>
      </div>
      <div>
        <p className="text-sm font-medium text-zinc-500">{name}</p>
        <p className="text-2xl font-bold text-zinc-900 mt-1">{value}</p>
      </div>
    </div>
  );
}
