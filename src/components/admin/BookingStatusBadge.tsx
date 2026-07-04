import React from 'react';
import { cn } from '@/lib/utils';

interface BookingStatusBadgeProps {
  status: string;
}

export const BookingStatusBadge: React.FC<BookingStatusBadgeProps> = ({ status }) => {
  const normalizedStatus = status.toLowerCase();

  const statusStyles: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700 border-amber-200',
    confirmed: 'bg-blue-100 text-blue-700 border-blue-200',
    completed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    cancelled: 'bg-red-100 text-red-700 border-red-200',
  };

  const currentStyle = statusStyles[normalizedStatus] || 'bg-zinc-100 text-zinc-700 border-zinc-200';

  return (
    <span className={cn(
      "px-2 py-1 text-xs font-medium rounded-full border uppercase tracking-wider",
      currentStyle
    )}>
      {status}
    </span>
  );
};
