"use client";

import React, { useState, useMemo } from 'react';
import { useStudents } from '@/hooks/admin/use-students';
import { DashboardSkeleton } from '@/components/admin/DashboardSkeleton';
import { AdminErrorState } from '@/components/admin/AdminErrorState';
import { StudentTable } from '@/components/admin/StudentTable';
import { SearchBar } from '@/components/admin/SearchBar';
import { Pagination } from '@/components/admin/Pagination';

export default function AdminUsersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const limit = 10;

  // Data fetching
  const {
    data: response,
    isLoading,
    isError,
    refetch
  } = useStudents({
    page: currentPage,
    limit,
  });

  // Client-side filtering (Search)
  const filteredStudents = useMemo(() => {
    const data = response?.data;
    if (!data) return [];

    const query = searchQuery.toLowerCase().trim();
    if (!query) return data;

    return data.filter((student) =>
      student.user.name.toLowerCase().includes(query) ||
      student.user.email.toLowerCase().includes(query) ||
      student.educationLevel.toLowerCase().includes(query) ||
      student.preferredCountry.toLowerCase().includes(query)
    );
  }, [response, searchQuery]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError) {
    return <AdminErrorState onRetry={() => refetch()} />;
  }

  const pagination = response?.pagination;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Student Directory</h1>
          <p className="text-zinc-500">Manage and view student profiles and activity.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-zinc-100">
          <div className="flex flex-col md:flex-row md:items-center justify-end gap-4">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search students..."
            />
          </div>
        </div>

        <StudentTable students={filteredStudents} />

        {pagination && pagination.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
