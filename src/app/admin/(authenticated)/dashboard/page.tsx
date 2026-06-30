"use client";

import {
  Users,
  UserRoundCheck,
  Clock,
  CalendarCheck,
  UserRoundX,
  GraduationCap
} from "lucide-react";
import { useDashboard } from "@/hooks/admin/use-dashboard";
import { StatsCard } from "@/components/admin/StatsCard";
import { DashboardSkeleton } from "@/components/admin/DashboardSkeleton";
import { AdminErrorState } from "@/components/admin/AdminErrorState";

export default function AdminDashboardPage() {
  const { data: stats, isLoading, isError, refetch } = useDashboard();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError) {
    return <AdminErrorState onRetry={() => refetch()} />;
  }

  if (!stats) return null;

  const dashboardCards = [
    {
      name: "Total Students",
      value: stats.totalStudents.toLocaleString(),
      icon: GraduationCap,
      color: "text-indigo-600",
      bg: "bg-indigo-50"
    },
    {
      name: "Total Mentors",
      value: stats.totalMentors.toLocaleString(),
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      name: "Pending Mentors",
      value: stats.pendingMentors.toLocaleString(),
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50"
    },
    {
      name: "Approved Mentors",
      value: stats.approvedMentors.toLocaleString(),
      icon: UserRoundCheck,
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    {
      name: "Rejected Mentors",
      value: stats.rejectedMentors.toLocaleString(),
      icon: UserRoundX,
      color: "text-red-600",
      bg: "bg-red-50"
    },
    {
      name: "Total Bookings",
      value: stats.totalBookings.toLocaleString(),
      icon: CalendarCheck,
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardCards.map((card) => (
          <StatsCard
            key={card.name}
            name={card.name}
            value={card.value}
            icon={card.icon}
            color={card.color}
            bg={card.bg}
          />
        ))}
      </div>

      {/*
        Recent Mentor Applications and Platform Activity sections
        removed for Phase 1 per requirements.
      */}
    </div>
  );
}
