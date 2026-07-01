import React from 'react';
import { MentorStatus } from '@/types/admin';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: MentorStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusStyles = {
    PENDING: 'bg-amber-100 text-amber-700 border-amber-200',
    APPROVED: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    REJECTED: 'bg-red-100 text-red-700 border-red-200',
  };

  return (
    <span className={cn(
      "px-2 py-1 text-xs font-medium rounded-full border",
      statusStyles[status]
    )}>
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
};
