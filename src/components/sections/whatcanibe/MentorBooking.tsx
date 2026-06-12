"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, Calendar, Clock, Video, MapPin, MessageSquare, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client";
import { cn } from "@/lib/utils";

interface MentorBookingProps {
  mentorId: string;
  mentorName: string;
  hourlyRate: number | null;
}

export function MentorBooking({ mentorId, mentorName, hourlyRate }: MentorBookingProps) {
  const router = useRouter();
  const [isBookingInProgress, setIsBookingInProgress] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    bookingDate: "",
    bookingTime: "",
    sessionType: "online" as "online" | "offline",
    notes: ""
  });

  const handleBookSession = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsBookingInProgress(true);
    setError(null);

    try {
      const response = await apiClient("/bookings", {
        method: "POST",
        body: {
          mentorId,
          bookingDate: formData.bookingDate,
          bookingTime: formData.bookingTime,
          sessionType: formData.sessionType,
          notes: formData.notes
        }
      });

      if (response.success) {
        setIsSuccess(true);
      } else {
        setError(response.message || "Failed to create booking.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      setError("Failed to create booking. Please ensure you are logged in as a student.");
    } finally {
      setIsBookingInProgress(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-10 rounded-[3rem] bg-emerald-600 border border-emerald-500 text-white text-center"
      >
        <div className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-10 w-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold mb-4 tracking-tight">Booking Requested!</h2>
        <p className="text-emerald-50 mb-8 max-w-md mx-auto font-medium">
          Your request has been sent to {mentorName.split(' ')[0]}. You can track the status in your dashboard.
        </p>
        <Button
          onClick={() => router.push("/whatcanibe/dashboard/bookings")}
          className="h-14 px-8 bg-white text-emerald-600 hover:bg-emerald-50 rounded-2xl font-bold"
        >
          View My Bookings
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-10 rounded-[3rem] bg-zinc-900 border border-zinc-800 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none group-hover:scale-110 transition-transform duration-700" />

      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Ready to accelerate?</h2>
        <p className="text-zinc-400 mb-8 max-w-md font-medium">
          Select your preferred time and session type to start your mentorship with {mentorName.split(' ')[0]}.
        </p>

        <form onSubmit={handleBookSession} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                <Calendar className="h-3 w-3" /> Preferred Date
              </label>
              <Input
                type="date"
                required
                value={formData.bookingDate}
                onChange={(e) => setFormData({...formData, bookingDate: e.target.value})}
                className="h-14 bg-zinc-800 border-zinc-700 rounded-2xl text-white focus:border-indigo-500/50 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                <Clock className="h-3 w-3" /> Preferred Time
              </label>
              <Input
                type="time"
                required
                value={formData.bookingTime}
                onChange={(e) => setFormData({...formData, bookingTime: e.target.value})}
                className="h-14 bg-zinc-800 border-zinc-700 rounded-2xl text-white focus:border-indigo-500/50 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1 mb-2 block">
              Session Type
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({...formData, sessionType: "online"})}
                className={cn(
                  "h-14 rounded-2xl border flex items-center justify-center gap-3 font-bold transition-all",
                  formData.sessionType === "online"
                    ? "bg-indigo-600 border-indigo-500 text-white"
                    : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-600"
                )}
              >
                <Video className="h-4 w-4" />
                Online
              </button>
              <button
                type="button"
                onClick={() => setFormData({...formData, sessionType: "offline"})}
                className={cn(
                  "h-14 rounded-2xl border flex items-center justify-center gap-3 font-bold transition-all",
                  formData.sessionType === "offline"
                    ? "bg-indigo-600 border-indigo-500 text-white"
                    : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-600"
                )}
              >
                <MapPin className="h-4 w-4" />
                Offline
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1 flex items-center gap-2">
              <MessageSquare className="h-3 w-3" /> Notes (Optional)
            </label>
            <textarea
              placeholder="What would you like to discuss?"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              className="w-full h-32 p-4 bg-zinc-800 border border-zinc-700 rounded-2xl text-white focus:border-indigo-500/50 transition-all outline-none resize-none"
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs font-bold bg-red-400/10 p-4 rounded-xl border border-red-400/20">
              {error}
            </p>
          )}

          <div className="flex flex-wrap gap-4 pt-4">
            <Button
              type="submit"
              disabled={isBookingInProgress}
              className="h-16 px-10 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-lg shadow-xl shadow-indigo-600/20 group/btn flex-1"
            >
              {isBookingInProgress ? (
                <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Request Session
                  <ChevronRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
            <div className="h-16 px-6 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center gap-3">
              <span className="text-zinc-400 font-bold text-lg">${hourlyRate || "100"}/hr</span>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
