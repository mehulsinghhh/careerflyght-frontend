"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useBooking } from "@/hooks/admin/use-bookings";
import { BookingStatusBadge } from "@/components/admin/BookingStatusBadge";
import { DashboardSkeleton } from "@/components/admin/DashboardSkeleton";
import { AdminErrorState } from "@/components/admin/AdminErrorState";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Briefcase,
  Mail,
  MapPin,
  GraduationCap,
  Link as LinkIcon,
  DollarSign,
  FileText,
  Clock3
} from "lucide-react";

export default function BookingDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const bookingId = Array.isArray(id) ? id[0] : id;

  const { data, isLoading, isError, error } = useBooking(bookingId || "");

  if (isLoading) return <DashboardSkeleton />;

  if (isError) {
    const is404 = (error as any)?.status === 404;
    return (
      <AdminErrorState
        title={is404 ? "Booking Not Found" : "Failed to load booking"}
        message={is404 ? "The requested booking does not exist." : (error instanceof Error ? error.message : "An unexpected error occurred")}
      />
    );
  }

  const booking = data?.data;

  if (data && !booking) {
    return (
      <AdminErrorState
        title="Booking Not Found"
        message="The requested booking does not exist or has no data."
      />
    );
  }

  if (!booking) return null;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return "-";
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "-";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.back()}
          className="bg-white border-zinc-200 text-zinc-600 hover:text-zinc-900"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Booking Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Booking Info */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-zinc-900">Booking Information</h2>
              <BookingStatusBadge status={booking.status} />
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-zinc-100 p-2 rounded-lg text-zinc-500">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Booking Date</p>
                  <p className="text-sm font-semibold text-zinc-900 mt-0.5">{formatDate(booking.bookingDate)}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-zinc-100 p-2 rounded-lg text-zinc-500">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Booking Time</p>
                  <p className="text-sm font-semibold text-zinc-900 mt-0.5">{booking.bookingTime || "-"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-zinc-100 p-2 rounded-lg text-zinc-500">
                  <LinkIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Session Type</p>
                  <p className="text-sm font-semibold text-zinc-900 mt-0.5 capitalize">{booking.sessionType}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-zinc-100 p-2 rounded-lg text-zinc-500">
                  <DollarSign className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Amount</p>
                  <p className="text-sm font-semibold text-zinc-900 mt-0.5">{booking.amount ? `$${booking.amount}` : "-"}</p>
                </div>
              </div>
              {booking.meetingLink && (
                <div className="flex items-start gap-3 md:col-span-2">
                  <div className="mt-1 bg-zinc-100 p-2 rounded-lg text-zinc-500">
                    <LinkIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Meeting Link</p>
                    <a
                      href={booking.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-blue-600 hover:underline mt-0.5 break-all"
                    >
                      {booking.meetingLink}
                    </a>
                  </div>
                </div>
              )}
              {booking.notes && (
                <div className="flex items-start gap-3 md:col-span-2">
                  <div className="mt-1 bg-zinc-100 p-2 rounded-lg text-zinc-500">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Student Notes</p>
                    <p className="text-sm text-zinc-600 mt-1 italic">{booking.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Student & Mentor Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-zinc-100">
                <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-zinc-400" /> Student Information
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 font-bold overflow-hidden">
                    {booking.student?.user?.profilePhoto ? (
                      <img src={booking.student.user.profilePhoto} alt="" className="w-full h-full object-cover" />
                    ) : (
                      (booking.student?.user?.name || '?').charAt(0).toUpperCase()
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-zinc-900">{booking.student?.user?.name || "Unknown Student"}</p>
                    <p className="text-sm text-zinc-500">{booking.student?.user?.email || "-"}</p>
                  </div>
                </div>
                <div className="space-y-4 pt-4 border-t border-zinc-50">
                  <div className="flex items-start gap-2">
                    <GraduationCap className="w-4 h-4 text-zinc-400 mt-1 shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Education</p>
                      <p className="text-sm text-zinc-700">{booking.student?.educationLevel || "-"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-zinc-400 mt-1 shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Preferred Country</p>
                      <p className="text-sm text-zinc-700">{booking.student?.preferredCountry || "-"}</p>
                    </div>
                  </div>
                  {booking.student?.careerInterest && (
                    <div className="flex items-start gap-2">
                      <Briefcase className="w-4 h-4 text-zinc-400 mt-1 shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Interests</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {Array.isArray(booking.student.careerInterest) ? (
                            booking.student.careerInterest.map((interest, i) => (
                              <span key={i} className="text-[10px] bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded">
                                {interest}
                              </span>
                            ))
                          ) : (
                            <span className="text-[10px] bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded">
                              {booking.student.careerInterest}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {booking.student?.resumeUrl && (
                    <div className="flex items-start gap-2">
                      <FileText className="w-4 h-4 text-zinc-400 mt-1 shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Resume</p>
                        <a
                          href={booking.student.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          View Resume
                        </a>
                      </div>
                    </div>
                  )}
                  {booking.student?.bio && (
                    <div className="pt-2">
                      <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Bio</p>
                      <p className="text-sm text-zinc-600 mt-1 line-clamp-3 italic">{booking.student.bio}</p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            <section className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-zinc-100">
                <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-zinc-400" /> Mentor Information
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 font-bold overflow-hidden">
                    {booking.mentor?.user?.profilePhoto ? (
                      <img src={booking.mentor.user.profilePhoto} alt="" className="w-full h-full object-cover" />
                    ) : (
                      (booking.mentor?.user?.name || '?').charAt(0).toUpperCase()
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-zinc-900">{booking.mentor?.user?.name || "Unknown Mentor"}</p>
                    <p className="text-sm text-zinc-500">{booking.mentor?.user?.email || "-"}</p>
                  </div>
                </div>
                <div className="space-y-4 pt-4 border-t border-zinc-50">
                  <div className="flex items-start gap-2">
                    <Briefcase className="w-4 h-4 text-zinc-400 mt-1 shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Work</p>
                      <p className="text-sm text-zinc-700 font-medium">{booking.mentor?.designation || "-"}</p>
                      <p className="text-xs text-zinc-500">{booking.mentor?.company || "-"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock3 className="w-4 h-4 text-zinc-400 mt-1 shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Experience</p>
                      <p className="text-sm text-zinc-700">
                        {booking.mentor?.experienceYears !== undefined
                          ? `${booking.mentor.experienceYears} Years`
                          : (booking.mentor?.yearsExperience !== undefined
                            ? `${booking.mentor.yearsExperience} Years`
                            : "-")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <DollarSign className="w-4 h-4 text-zinc-400 mt-1 shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Hourly Rate</p>
                      <p className="text-sm text-zinc-700 font-semibold">
                        {booking.mentor?.hourlyRate ? `$${parseFloat(booking.mentor.hourlyRate).toFixed(2)}` : "-"}
                      </p>
                    </div>
                  </div>
                  {booking.mentor?.expertise && (
                    <div className="flex items-start gap-2">
                      <FileText className="w-4 h-4 text-zinc-400 mt-1 shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Expertise</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {Array.isArray(booking.mentor.expertise) ? (
                            booking.mentor.expertise.map((exp, i) => (
                              <span key={i} className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-100">
                                {exp}
                              </span>
                            ))
                          ) : (
                            <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-100">
                              {booking.mentor.expertise}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Right Column: Timeline / Sidebar Info */}
        <div className="space-y-6">
          <section className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6">
            <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-6">Timeline</h3>
            <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-100">
              <div className="relative pl-8">
                <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-sm ring-4 ring-emerald-50" />
                <p className="text-xs text-zinc-400">{formatDate(booking.createdAt)}</p>
                <p className="text-sm font-semibold text-zinc-900 mt-0.5">Booking Created</p>
                <p className="text-xs text-zinc-500 mt-1">Session requested by student.</p>
              </div>
              <div className="relative pl-8">
                <div className={`absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-white shadow-sm ring-4 ${
                  booking.status === 'pending' ? 'bg-zinc-200 ring-zinc-50' : 'bg-blue-500 ring-blue-50'
                }`} />
                <p className="text-xs text-zinc-400">Next Action</p>
                <p className="text-sm font-semibold text-zinc-900 mt-0.5 uppercase">{booking.status === 'pending' ? 'Waiting for Confirmation' : booking.status}</p>
              </div>
            </div>
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <LinkIcon className="w-20 h-20" />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-2">Quick Access</h3>
            <div className="space-y-3 mt-4">
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white justify-start"
                disabled={!booking.student?.user?.email}
                asChild
              >
                {booking.student?.user?.email ? (
                  <a href={`mailto:${booking.student.user.email}`}>
                    <Mail className="w-4 h-4 mr-2 text-zinc-400" /> Email Student
                  </a>
                ) : (
                  <span>
                    <Mail className="w-4 h-4 mr-2 text-zinc-400" /> Email Student
                  </span>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white justify-start"
                disabled={!booking.mentor?.user?.email}
                asChild
              >
                {booking.mentor?.user?.email ? (
                  <a href={`mailto:${booking.mentor.user.email}`}>
                    <Mail className="w-4 h-4 mr-2 text-zinc-400" /> Email Mentor
                  </a>
                ) : (
                  <span>
                    <Mail className="w-4 h-4 mr-2 text-zinc-400" /> Email Mentor
                  </span>
                )}
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
