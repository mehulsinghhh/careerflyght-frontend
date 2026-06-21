"use client";

import { PolishedModal } from "@/components/ui/polished-modal";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, MapPin, User, FileText, BadgeDollarSign } from "lucide-react";
import { Booking } from "@/types/booking";

interface BookingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
  userRole?: string | null;
}

export function BookingDetailsModal({
  isOpen,
  onClose,
  booking,
  userRole
}: BookingDetailsModalProps) {
  if (!booking) return null;

  const isMentorView = userRole === 'mentor';
  const otherPartyName = isMentorView
    ? (booking.student?.user?.name || `Student (ID: ${booking.studentId.slice(-4).toUpperCase()})`)
    : (booking.mentor?.user?.name || `Mentor (ID: ${booking.mentorId.slice(-4).toUpperCase()})`);
  const otherPartyLabel = isMentorView ? "Student" : "Mentor";

  const formattedDate = new Date(booking.bookingDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <PolishedModal
      isOpen={isOpen}
      onClose={onClose}
      title="Session Details"
      description={`Booking ID: #${booking.id.slice(-6).toUpperCase()}`}
    >
      <div className="space-y-6 pt-2">
        <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
          <div className="flex items-center gap-3">
             <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center border border-zinc-100 shadow-sm">
                <User className="h-5 w-5 text-indigo-600" />
             </div>
             <div>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{otherPartyLabel}</p>
                <p className="font-bold text-zinc-900">{otherPartyName}</p>
             </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
            booking.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
            booking.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
            booking.status === 'completed' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
            'bg-zinc-100 text-zinc-500 border-zinc-200'
          }`}>
            {booking.status}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-zinc-100">
            <Calendar className="h-5 w-5 text-zinc-400 mb-2" />
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Date</p>
            <p className="text-sm font-bold text-zinc-900">{formattedDate}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-zinc-100">
            <Clock className="h-5 w-5 text-zinc-400 mb-2" />
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Time</p>
            <p className="text-sm font-bold text-zinc-900">{booking.bookingTime}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-zinc-100">
            {booking.sessionType === 'online' ? (
              <Video className="h-5 w-5 text-zinc-400 mb-2" />
            ) : (
              <MapPin className="h-5 w-5 text-zinc-400 mb-2" />
            )}
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Type</p>
            <p className="text-sm font-bold text-zinc-900 capitalize">{booking.sessionType}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-zinc-100">
            <BadgeDollarSign className="h-5 w-5 text-zinc-400 mb-2" />
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Fee</p>
            <p className="text-sm font-bold text-zinc-900">${booking.amount || '100.00'}</p>
          </div>
        </div>

        {booking.notes && (
          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4 text-zinc-400" />
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Your Notes</p>
            </div>
            <p className="text-sm text-zinc-600 leading-relaxed italic">
              &ldquo;{booking.notes}&rdquo;
            </p>
          </div>
        )}

        {booking.meetingLink && (
           <Button className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold">
              Join Meeting
              <Video className="ml-2 h-4 w-4" />
           </Button>
        )}

        <Button
          variant="outline"
          onClick={onClose}
          className="w-full h-12 rounded-xl border-zinc-200 text-zinc-600 font-bold"
        >
          Close
        </Button>
      </div>
    </PolishedModal>
  );
}
