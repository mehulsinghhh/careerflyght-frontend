"use client";
import { useAuth } from "@/providers/AuthProvider";

export default function MentorDashboard() {
  const { user } = useAuth();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Mentor Dashboard</h1>
      <p className="text-zinc-500">Welcome back, {user?.name}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white border rounded-2xl">
          <p className="text-sm text-zinc-500 uppercase font-bold tracking-wider">Upcoming Sessions</p>
          <p className="text-2xl font-bold mt-1">0</p>
        </div>
        <div className="p-6 bg-white border rounded-2xl">
          <p className="text-sm text-zinc-500 uppercase font-bold tracking-wider">Incoming Bookings</p>
          <p className="text-2xl font-bold mt-1">0</p>
        </div>
        <div className="p-6 bg-white border rounded-2xl">
          <p className="text-sm text-zinc-500 uppercase font-bold tracking-wider">Profile Status</p>
          <p className="text-2xl font-bold mt-1 text-emerald-600">Active</p>
        </div>
      </div>
    </div>
  );
}
