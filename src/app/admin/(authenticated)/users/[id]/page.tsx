'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Mail,
  Calendar,
  GraduationCap,
  Globe,
  User,
  Briefcase
} from 'lucide-react';
import { useStudent, useStudentBookings } from '@/hooks/admin/use-students';
import { DashboardSkeleton } from '@/components/admin/DashboardSkeleton';
import { AdminErrorState } from '@/components/admin/AdminErrorState';
import { cn } from '@/lib/utils';

export default function StudentDetailPage() {
  const params = useParams();
  const studentId = params.id as string;

  const {
    data: studentResponse,
    isLoading: isStudentLoading,
    error: studentError,
    refetch: refetchStudent
  } = useStudent(studentId);

  const {
    data: bookingsResponse,
    isLoading: isBookingsLoading,
    error: bookingsError
  } = useStudentBookings(studentId);

  if (isStudentLoading) {
    return <DashboardSkeleton />;
  }

  if (studentError || !studentResponse?.success) {
    return (
      <AdminErrorState
        title={studentError ? "Error Loading Student" : "Student Not Found"}
        message={studentError ? (studentError as any).message : "The student you are looking for does not exist or could not be loaded."}
        onRetry={() => refetchStudent()}
      />
    );
  }

  const student = studentResponse.data;
  const bookings = bookingsResponse?.data || [];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild className="text-zinc-500 hover:text-zinc-900">
          <Link href="/admin/users">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Directory
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="p-6 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-zinc-100 rounded-full flex items-center justify-center mb-4 overflow-hidden border-2 border-zinc-50">
                {student.user.profilePhoto ? (
                  <img
                    src={student.user.profilePhoto}
                    alt={student.user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-10 h-10 text-zinc-400" />
                )}
              </div>
              <h1 className="text-xl font-bold text-zinc-900">{student.user.name}</h1>
              <p className="text-sm text-zinc-500 flex items-center mt-1">
                <Mail className="w-3 h-3 mr-1.5" /> {student.user.email}
              </p>
            </div>

            <div className="border-t border-zinc-100 p-6 space-y-4">
              <div>
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">Education</h3>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-1.5 bg-zinc-50 rounded-lg border border-zinc-100">
                    <GraduationCap className="w-4 h-4 text-zinc-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-900">{student.educationLevel || '-'}</p>
                    <p className="text-xs text-zinc-500">Highest Education</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">Location Preference</h3>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-1.5 bg-zinc-50 rounded-lg border border-zinc-100">
                    <Globe className="w-4 h-4 text-zinc-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-900">{student.preferredCountry || '-'}</p>
                    <p className="text-xs text-zinc-500">Interested Country</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">Account Info</h3>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-1.5 bg-zinc-50 rounded-lg border border-zinc-100">
                    <Calendar className="w-4 h-4 text-zinc-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-900">{formatDate(student.user.createdAt)}</p>
                    <p className="text-xs text-zinc-500">Joined Platform</p>
                  </div>
                </div>
              </div>

              {/* Render any additional fields returned by backend */}
              {student.careerInterests && student.careerInterests.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">Career Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {student.careerInterests.map((interest, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-md border border-blue-100">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Flexible rendering for any extra fields */}
              {Object.entries(student).map(([key, value]) => {
                const excludedKeys = ['id', 'userId', 'user', 'educationLevel', 'preferredCountry', 'careerInterests'];
                if (excludedKeys.includes(key) || !value || (Array.isArray(value) && value.length === 0)) return null;

                return (
                  <div key={key}>
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1')}</h3>
                    <p className="text-sm text-zinc-900">{String(value)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Booking History */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
              <h2 className="font-bold text-zinc-900">Booking History</h2>
              <span className="px-2.5 py-0.5 bg-zinc-100 text-zinc-600 text-xs font-bold rounded-full">
                {bookings.length} {bookings.length === 1 ? 'Session' : 'Sessions'}
              </span>
            </div>

            <div className="overflow-x-auto">
              {isBookingsLoading ? (
                <div className="p-12 flex justify-center">
                   <div className="w-8 h-8 border-4 border-zinc-200 border-t-zinc-600 rounded-full animate-spin"></div>
                </div>
              ) : bookings.length > 0 ? (
                <table className="min-w-full divide-y divide-zinc-200">
                  <thead className="bg-zinc-50/50">
                    <tr>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-zinc-500 uppercase tracking-wider">
                        Mentor
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-zinc-500 uppercase tracking-wider">
                        Company
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-zinc-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-zinc-500 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-zinc-100">
                    {bookings.map((booking: any) => (
                      <tr key={booking.id} className="hover:bg-zinc-50/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center mr-3 border border-zinc-200">
                              <User className="w-4 h-4 text-zinc-400" />
                            </div>
                            <span className="text-sm font-medium text-zinc-900">
                              {booking.mentor?.user?.name || '-'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600">
                          {booking.mentor?.company || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={cn(
                            "px-2.5 py-0.5 text-[11px] font-bold uppercase rounded-full border",
                            booking.status === 'confirmed' || booking.status === 'completed'
                              ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                              : booking.status === 'pending'
                              ? "bg-amber-50 text-amber-700 border-amber-100"
                              : "bg-zinc-100 text-zinc-600 border-zinc-200"
                          )}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500">
                          <div className="flex flex-col">
                            <span>{formatDate(booking.createdAt)}</span>
                            {booking.bookingDate && (
                              <span className="text-[10px] text-zinc-400">Scheduled: {formatDate(booking.bookingDate)}</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-12 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 bg-zinc-50 rounded-full flex items-center justify-center mb-4">
                    <Briefcase className="w-6 h-6 text-zinc-400" />
                  </div>
                  <h3 className="text-sm font-medium text-zinc-900">No bookings found.</h3>
                  <p className="text-xs text-zinc-500 mt-1">This student hasn't booked any sessions yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
