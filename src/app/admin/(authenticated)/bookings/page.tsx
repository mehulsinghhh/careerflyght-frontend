"use client";

import React, { useState, useMemo } from "react";
import { useBookings } from "@/hooks/admin/use-bookings";
import { BookingTable } from "@/components/admin/BookingTable";
import { Pagination } from "@/components/admin/Pagination";
import { SearchBar } from "@/components/admin/SearchBar";
import { DashboardSkeleton } from "@/components/admin/DashboardSkeleton";
import { AdminErrorState } from "@/components/admin/AdminErrorState";

export default function AdminBookingsPage() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const limit = 10;

  const { data, isLoading, isError, error } = useBookings({ page, limit });

  const filteredBookings = useMemo(() => {
    if (!data?.data) return [];
    if (!searchQuery) return data.data;

    const query = searchQuery.toLowerCase();
    return data.data.filter(
      (booking) =>
        booking.student.user.name.toLowerCase().includes(query) ||
        booking.mentor.user.name.toLowerCase().includes(query)
    );
  }, [data?.data, searchQuery]);

  if (isLoading) return <DashboardSkeleton />;

  if (isError) {
    return (
      <AdminErrorState
        title="Failed to load bookings"
        message={error instanceof Error ? error.message : "An unexpected error occurred"}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Booking Management</h1>
          <p className="text-zinc-500 text-sm mt-1">
            Monitor and manage all mentorship sessions across the platform.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-zinc-100 bg-zinc-50/50">
          <div className="max-w-md">
            <SearchBar
              placeholder="Search by student or mentor name..."
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>
        </div>

        <BookingTable bookings={filteredBookings} />

        {data?.pagination && data.pagination.totalPages > 1 && (
          <div className="p-4 border-t border-zinc-100 bg-zinc-50/50">
            <Pagination
              currentPage={page}
              totalPages={data.pagination.totalPages}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
