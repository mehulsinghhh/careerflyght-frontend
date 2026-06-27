"use client";

import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  "/admin/dashboard": "Dashboard Overview",
  "/admin/mentors": "Mentor Management",
  "/admin/users": "User Directory",
  "/admin/bookings": "Booking Overview",
  "/admin/settings": "Console Settings",
};

export function AdminHeader() {
  const pathname = usePathname();
  const title = pageTitles[pathname] || "Admin Console";

  return (
    <header className="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-8 shrink-0">
      <h1 className="text-sm font-bold text-zinc-900 uppercase tracking-widest">{title}</h1>
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end">
          <span className="text-xs font-bold text-zinc-900">Administrator</span>
          <span className="text-[10px] font-medium text-zinc-500">System Access</span>
        </div>
        <div className="h-8 w-8 rounded-full bg-zinc-100 border border-zinc-200" />
      </div>
    </header>
  );
}
