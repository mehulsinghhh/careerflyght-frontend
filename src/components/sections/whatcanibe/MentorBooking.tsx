"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

interface MentorBookingProps {
  mentorId: string;
  mentorName: string;
  hourlyRate: number | null;
}

export function MentorBooking({ mentorId, mentorName, hourlyRate }: MentorBookingProps) {
  const [isBookingInProgress, setIsBookingInProgress] = useState(false);

  const handleBookSession = async () => {
    // Future implementation: Connect to booking APIs
    // For now, we just log and show a placeholder interaction
    console.log(`Initiating booking for mentor ${mentorId} (${mentorName}) at $${hourlyRate}/hr`);
    setIsBookingInProgress(true);

    // Simulate API call
    setTimeout(() => {
      alert("Booking system integration coming soon! This entry point is ready for backend connection.");
      setIsBookingInProgress(false);
    }, 1000);
  };

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
          Book a strategic 1-on-1 session with {mentorName.split(' ')[0]} to dissect your goals and build your roadmap.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button
            onClick={handleBookSession}
            disabled={isBookingInProgress}
            className="h-16 px-8 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-lg shadow-xl shadow-indigo-600/20 group/btn"
          >
            {isBookingInProgress ? (
              <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Book Session
                <ChevronRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
          <div className="h-16 px-6 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]">Booking System Online</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
