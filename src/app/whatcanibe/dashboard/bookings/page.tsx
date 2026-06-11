"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  ArrowLeft,
  Info,
  ChevronRight,
  User
} from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { GlowCard } from "@/components/ui/glow-card";
import { Button } from "@/components/ui/button";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Link from "next/link";

interface Booking {
  id: string;
  mentorId: string;
  bookingDate: string;
  bookingTime: string;
  sessionType: "online" | "offline";
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes?: string;
  mentor: {
    user: {
      name: string;
    };
    company: string;
    designation: string;
  };
}

function StudentBookingsContent() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      try {
        const response = await apiClient("/bookings/my-bookings");
        if (response.success) {
          setBookings(response.data);
        }
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
        setError("Failed to load your bookings. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "pending": return "bg-amber-50 text-amber-600 border-amber-100";
      case "confirmed": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "completed": return "bg-indigo-50 text-indigo-600 border-indigo-100";
      case "cancelled": return "bg-red-50 text-red-600 border-red-100";
      default: return "bg-zinc-50 text-zinc-600 border-zinc-100";
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <Link
          href="/whatcanibe/dashboard"
          className="flex items-center gap-2 text-zinc-500 hover:text-indigo-600 transition-colors font-bold uppercase tracking-widest text-[10px] mb-12"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-2 text-indigo-600 text-sm font-bold mb-3 uppercase tracking-widest">
            <div className="h-1 w-8 bg-indigo-600 rounded-full" />
            My Bookings
          </div>
          <h1 className="text-4xl font-bold text-zinc-900 tracking-tight">
            Manage Your <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Mentorship Sessions.</span>
          </h1>
          <p className="text-zinc-500 mt-2 font-medium">
            Track your upcoming and past sessions with our expert network.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="p-8 rounded-[2.5rem] bg-red-50 border border-red-100 text-red-600 flex flex-col items-center text-center">
            <Info className="h-12 w-12 mb-4" />
            <p className="font-bold text-lg">{error}</p>
          </div>
        ) : bookings.length === 0 ? (
          <GlowCard className="p-12 border-zinc-200 bg-white rounded-[2.5rem] flex flex-col items-center text-center">
            <div className="h-20 w-20 rounded-full bg-zinc-50 flex items-center justify-center mb-6">
              <Calendar className="h-10 w-10 text-zinc-300" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 mb-2">No bookings yet</h2>
            <p className="text-zinc-500 max-w-md mb-8 font-medium">
              You haven&apos;t scheduled any sessions with a mentor yet. Start your journey by finding the right guide.
            </p>
            <Link href="/whatcanibe/mentors">
              <Button className="h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-xl shadow-indigo-600/10">
                Explore Mentors
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </GlowCard>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <GlowCard className="p-8 border-zinc-100 bg-white rounded-[2rem]">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <div className="h-16 w-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                        <User className="h-8 w-8 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-zinc-900">{booking.mentor.user.name}</h3>
                        <p className="text-zinc-500 text-sm font-medium">
                          {booking.mentor.designation} @ {booking.mentor.company}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:flex items-center gap-4 md:gap-8">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                          <Calendar className="h-3 w-3" /> Date
                        </span>
                        <span className="font-bold text-zinc-900">{new Date(booking.bookingDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                          <Clock className="h-3 w-3" /> Time
                        </span>
                        <span className="font-bold text-zinc-900">{booking.bookingTime}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                          {booking.sessionType === "online" ? <Video className="h-3 w-3" /> : <MapPin className="h-3 w-3" />} Type
                        </span>
                        <span className="font-bold text-zinc-900 capitalize">{booking.sessionType}</span>
                      </div>
                      <div>
                        <div className={`px-4 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-widest ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </div>
                      </div>
                    </div>
                  </div>
                  {booking.notes && (
                    <div className="mt-6 p-4 rounded-xl bg-zinc-50 border border-zinc-100 text-sm text-zinc-500 font-medium">
                      <span className="text-zinc-900 font-bold block mb-1">Notes:</span>
                      {booking.notes}
                    </div>
                  )}
                </GlowCard>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function StudentBookingsPage() {
  return (
    <ProtectedRoute>
      <StudentBookingsContent />
    </ProtectedRoute>
  );
}
