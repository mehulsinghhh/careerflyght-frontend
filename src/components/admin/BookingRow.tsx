import React from 'react';
import { AdminBooking } from '@/types/admin';
import { BookingStatusBadge } from './BookingStatusBadge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import Link from 'next/link';

interface BookingRowProps {
  booking: AdminBooking;
}

export const BookingRow: React.FC<BookingRowProps> = ({ booking }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'N/A';
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (e) {
      return 'N/A';
    }
  };

  const createdDate = formatDate(booking.createdAt);

  const studentName = booking.student?.user?.name || 'Unknown Student';
  const mentorName = booking.mentor?.user?.name || 'Unknown Mentor';
  const mentorCompany = booking.mentor?.company || '-';

  return (
    <tr className="hover:bg-zinc-50/50 transition-colors border-b border-zinc-100 last:border-0">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-8 w-8 flex-shrink-0">
            {booking.student?.user?.profilePhoto ? (
              <img className="h-8 w-8 rounded-full object-cover" src={booking.student.user.profilePhoto} alt="" />
            ) : (
              <div className="h-8 w-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 text-xs font-bold">
                {studentName.charAt(0)}
              </div>
            )}
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium text-zinc-900">{studentName}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-8 w-8 flex-shrink-0">
            {booking.mentor?.user?.profilePhoto ? (
              <img className="h-8 w-8 rounded-full object-cover" src={booking.mentor.user.profilePhoto} alt="" />
            ) : (
              <div className="h-8 w-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 text-xs font-bold">
                {mentorName.charAt(0)}
              </div>
            )}
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium text-zinc-900">{mentorName}</div>
            <div className="text-xs text-zinc-500">{mentorCompany}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <BookingStatusBadge status={booking.status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500 text-center">
        {createdDate}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="text-zinc-600 border-zinc-200 hover:bg-zinc-50 hover:text-zinc-900 h-8 px-3"
        >
          <Link href={`/admin/bookings/${booking.id}`}>
            <Eye className="w-4 h-4 mr-1" /> View Details
          </Link>
        </Button>
      </td>
    </tr>
  );
};
