import React from 'react';
import { AdminBooking } from '@/types/admin';
import { BookingRow } from './BookingRow';

interface BookingTableProps {
  bookings: AdminBooking[];
}

export const BookingTable: React.FC<BookingTableProps> = ({ bookings }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-zinc-200">
        <thead className="bg-zinc-50/50">
          <tr>
            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-zinc-500 uppercase tracking-wider">
              Student
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-zinc-500 uppercase tracking-wider">
              Mentor
            </th>
            <th scope="col" className="px-6 py-4 text-center text-xs font-bold text-zinc-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-4 text-center text-xs font-bold text-zinc-500 uppercase tracking-wider">
              Created Date
            </th>
            <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-zinc-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-zinc-100">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <BookingRow key={booking.id} booking={booking} />
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">
                No bookings found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
