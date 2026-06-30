"use client";

import React, { useState, useMemo } from 'react';
import { useMentors, useApproveMentor, useRejectMentor } from '@/hooks/admin/use-mentors';
import { Mentor, MentorStatus } from '@/types/admin';
import { DashboardSkeleton } from '@/components/admin/DashboardSkeleton';
import { AdminErrorState } from '@/components/admin/AdminErrorState';
import { MentorTable } from '@/components/admin/MentorTable';
import { FilterTabs } from '@/components/admin/FilterTabs';
import { SearchBar } from '@/components/admin/SearchBar';
import { Pagination } from '@/components/admin/Pagination';
import { ApprovalDialog } from '@/components/admin/ApprovalDialog';
import { RejectDialog } from '@/components/admin/RejectDialog';

export default function AdminMentorsPage() {
  // State for filtering and pagination
  const [statusFilter, setStatusFilter] = useState<MentorStatus | 'ALL'>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Dialog states
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);

  const limit = 10;

  // Data fetching
  const {
    data: response,
    isLoading,
    isError,
    refetch
  } = useMentors({
    status: statusFilter === 'ALL' ? undefined : statusFilter,
    page: currentPage,
    limit,
  });

  // Mutations
  const approveMutation = useApproveMentor();
  const rejectMutation = useRejectMentor();

  // Client-side filtering (Search)
  const filteredMentors = useMemo(() => {
    const data = response?.data;
    if (!data) return [];

    const query = searchQuery.toLowerCase().trim();
    if (!query) return data;

    return data.filter((mentor) =>
      mentor.user.name.toLowerCase().includes(query) ||
      mentor.user.email.toLowerCase().includes(query) ||
      mentor.company.toLowerCase().includes(query)
    );
  }, [response, searchQuery]);

  // Handlers
  const handleTabChange = (status: MentorStatus | 'ALL') => {
    setStatusFilter(status);
    setCurrentPage(1); // Reset to first page when changing filter
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApproveClick = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setIsApproveOpen(true);
  };

  const handleRejectClick = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setIsRejectOpen(true);
  };

  const onApproveConfirm = async (mentorId: string) => {
    try {
      await approveMutation.mutateAsync(mentorId);
      setIsApproveOpen(false);
      setSelectedMentor(null);
    } catch (error) {
      console.error("Failed to approve mentor", error);
      // Error handling is managed by TanStack Query, but we could add a toast here
    }
  };

  const onRejectConfirm = async (mentorId: string, reason?: string) => {
    try {
      await rejectMutation.mutateAsync({ mentorId, reason });
      setIsRejectOpen(false);
      setSelectedMentor(null);
    } catch (error) {
      console.error("Failed to reject mentor", error);
    }
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
          <h1 className="text-2xl font-bold text-zinc-900">Mentor Management</h1>
          <p className="text-zinc-500">Review and manage mentor applications and profiles.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-zinc-100 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <FilterTabs activeTab={statusFilter} onTabChange={handleTabChange} />
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by name, email, or company..."
            />
          </div>
        </div>

        <MentorTable
          mentors={filteredMentors}
          onApprove={handleApproveClick}
          onReject={handleRejectClick}
        />

        {pagination && pagination.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      <ApprovalDialog
        isOpen={isApproveOpen}
        mentor={selectedMentor}
        onClose={() => setIsApproveOpen(false)}
        onConfirm={onApproveConfirm}
        isSubmitting={approveMutation.isPending}
      />

      <RejectDialog
        isOpen={isRejectOpen}
        mentor={selectedMentor}
        onClose={() => setIsRejectOpen(false)}
        onConfirm={onRejectConfirm}
        isSubmitting={rejectMutation.isPending}
      />
    </div>
  );
}
