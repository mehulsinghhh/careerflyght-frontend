"use client";

import { useState } from "react";
import { PolishedModal } from "@/components/ui/polished-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Video, MapPin, AlertCircle, CheckCircle2 } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { SessionType, CreateBookingPayload } from "@/types/booking";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentorId: string;
  mentorName: string;
  hourlyRate: number | null;
  onSuccess?: () => void;
}

export function BookingModal({
  isOpen,
  onClose,
  mentorId,
  mentorName,
  hourlyRate,
  onSuccess
}: BookingModalProps) {
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("10:00 AM");
  const [sessionType, setSessionType] = useState<SessionType>("online");
  const [notes, setNotes] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!bookingDate) {
      setError("Please select a date.");
      setIsLoading(false);
      return;
    }

    try {
      const payload: CreateBookingPayload = {
        mentorId,
        bookingDate: new Date(bookingDate).toISOString(),
        bookingTime,
        sessionType,
        notes: notes.trim() || undefined,
      };

      await apiClient("/bookings", {
        method: "POST",
        body: payload,
      });

      setIsSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Booking error:", error);
      setError(error.message || "Failed to create booking. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <PolishedModal
        isOpen={isOpen}
        onClose={onClose}
        title="Booking Successful!"
        description={`Your session request has been sent to ${mentorName}.`}
      >
        <div className="flex flex-col items-center py-6 text-center">
          <div className="h-20 w-20 rounded-full bg-emerald-50 flex items-center justify-center mb-6">
            <CheckCircle2 className="h-10 w-10 text-emerald-500" />
          </div>
          <p className="text-zinc-500 mb-8 font-medium">
            The mentor will review your request and confirm the session. You can track the status in your dashboard.
          </p>
          <Button
            onClick={onClose}
            className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold"
          >
            Close
          </Button>
        </div>
      </PolishedModal>
    );
  }

  return (
    <PolishedModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Book with ${mentorName}`}
      description={`Schedule your strategic mentorship session ($${hourlyRate || 100}/hr)`}
    >
      <form onSubmit={handleSubmit} className="space-y-6 pt-2">
        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-red-600 font-medium">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">
              Session Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input
                type="date"
                required
                min={new Date().toISOString().split("T")[0]}
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="pl-10 h-12 rounded-xl border-zinc-200"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">
              Preferred Time
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input
                type="text"
                placeholder="e.g. 10:00 AM"
                required
                value={bookingTime}
                onChange={(e) => setBookingTime(e.target.value)}
                className="pl-10 h-12 rounded-xl border-zinc-200"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">
              Session Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSessionType("online")}
                className={`h-12 rounded-xl border flex items-center justify-center gap-2 font-bold transition-all ${
                  sessionType === "online"
                    ? "bg-indigo-50 border-indigo-200 text-indigo-600"
                    : "bg-white border-zinc-200 text-zinc-500 hover:bg-zinc-50"
                }`}
              >
                <Video className="h-4 w-4" />
                Online
              </button>
              <button
                type="button"
                onClick={() => setSessionType("offline")}
                className={`h-12 rounded-xl border flex items-center justify-center gap-2 font-bold transition-all ${
                  sessionType === "offline"
                    ? "bg-indigo-50 border-indigo-200 text-indigo-600"
                    : "bg-white border-zinc-200 text-zinc-500 hover:bg-zinc-50"
                }`}
              >
                <MapPin className="h-4 w-4" />
                In-person
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">
              Notes for Mentor
            </label>
            <textarea
              placeholder="Tell the mentor what you'd like to discuss..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full min-h-[100px] p-4 rounded-xl border border-zinc-200 bg-white text-sm outline-none focus:border-indigo-600 transition-colors resize-none"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-xl shadow-indigo-600/20"
        >
          {isLoading ? (
            <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            "Confirm Booking Request"
          )}
        </Button>
      </form>
    </PolishedModal>
  );
}
