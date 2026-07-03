import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Construction } from 'lucide-react';

export default function StudentDetailPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild className="text-zinc-500 hover:text-zinc-900">
          <Link href="/admin/users">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Directory
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-6">
          <Construction className="w-8 h-8 text-amber-600" />
        </div>
        <h2 className="text-2xl font-bold text-zinc-900">Student Profile Coming Soon</h2>
        <p className="text-zinc-500 mt-2 max-w-md mx-auto">
          The student detail view and booking history will be available once the required backend endpoints are implemented.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-left w-full max-w-2xl">
          <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
            <h3 className="text-sm font-bold text-zinc-900 mb-2">Required Endpoints:</h3>
            <ul className="text-sm text-zinc-600 space-y-1 list-disc list-inside">
              <li>GET /api/admin/students/:id</li>
              <li>GET /api/admin/students/:id/bookings</li>
            </ul>
          </div>
          <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
            <h3 className="text-sm font-bold text-zinc-900 mb-2">Planned Features:</h3>
            <ul className="text-sm text-zinc-600 space-y-1 list-disc list-inside">
              <li>Comprehensive Profile View</li>
              <li>Career Interests & Goals</li>
              <li>Full Booking History</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 p-6 bg-blue-50 rounded-xl border border-blue-100 w-full max-w-2xl text-left">
           <h3 className="text-sm font-bold text-blue-900 mb-1">Booking History</h3>
           <p className="text-sm text-blue-700">
             Booking history will be available once backend support is implemented.
           </p>
        </div>

        <Button className="mt-8" asChild>
          <Link href="/admin/users">Return to Student Directory</Link>
        </Button>
      </div>
    </div>
  );
}
