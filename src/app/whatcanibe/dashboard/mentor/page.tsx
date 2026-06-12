"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  Info,
  User,
  CheckCircle2,
  TrendingUp,
  Briefcase,
  ExternalLink,
  ShieldAlert
} from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { GlowCard } from "@/components/ui/glow-card";
import { Button } from "@/components/ui/button";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Booking {
  id: string;
  mentorId: string;
  bookingDate: string;
  bookingTime: string;
  sessionType: "online" | "offline";
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes?: string;
  user: {
    name: string;
    email: string;
  };
}

interface MentorProfile {
  company: string;
  designation: string;
  user: {
    name: string;
  };
}

function MentorDashboardContent() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [mentorProfile, setMentorProfile] = useState<MentorProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    const checkRole = () => {
      const storedUser = localStorage.getItem("careerflyghtUser");
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          if (user.role === "mentor") {
            setIsAuthorized(true);
            return true;
          }
        } catch (e) {
          console.error("Failed to parse user", e);
        }
      }
      setIsAuthorized(false);
      router.replace("/whatcanibe/dashboard");
      return false;
    };

    const fetchData = async () => {
      if (!checkRole()) {
        return;
      }

      setIsLoading(true);
      try {
        const [bookingsRes, profileRes] = await Promise.all([
          apiClient("/bookings/mentor-bookings"),
          apiClient("/mentors/profile")
        ]);

        if (bookingsRes.success) {
          setBookings(bookingsRes.data);
        }
        if (profileRes.success) {
          setMentorProfile(profileRes.data);
        }
      } catch (err) {
        console.error("Failed to fetch mentor dashboard data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const updateBookingStatus = async (bookingId: string, status: Booking["status"]) => {
    setActionLoading(bookingId);
    try {
      const response = await apiClient(`/bookings/${bookingId}/status`, {
        method: "PUT",
        body: { status }
      });

      if (response.success) {
        setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status } : b));
      }
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update booking status.");
    } finally {
      setActionLoading(null);
    }
  };

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === "pending").length,
    confirmed: bookings.filter(b => b.status === "confirmed").length,
    completed: bookings.filter(b => b.status === "completed").length,
  };

  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "pending": return "bg-amber-50 text-amber-600 border-amber-100";
      case "confirmed": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "completed": return "bg-indigo-50 text-indigo-600 border-indigo-100";
      case "cancelled": return "bg-red-50 text-red-600 border-red-100";
      default: return "bg-zinc-50 text-zinc-600 border-zinc-100";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isAuthorized === false) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center px-6">
        <GlowCard className="p-12 border-red-100 bg-white rounded-[2.5rem] flex flex-col items-center text-center max-w-md">
          <div className="h-20 w-20 rounded-full bg-red-50 flex items-center justify-center mb-6">
            <ShieldAlert className="h-10 w-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-zinc-900 mb-2">Access Denied</h2>
          <p className="text-zinc-500 mb-8 font-medium">
            This workspace is exclusively for CareerFlyght mentors. Please complete your onboarding to gain access.
          </p>
          <div className="flex flex-col w-full gap-3">
            <Link href="/whatcanibe/dashboard/mentor-profile">
              <Button className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold">
                Become a Mentor
              </Button>
            </Link>
            <Button
              variant="ghost"
              onClick={() => router.push("/whatcanibe/dashboard")}
              className="w-full h-14 text-zinc-500 hover:text-zinc-900 font-bold"
            >
              Back to Student Dashboard
            </Button>
          </div>
        </GlowCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-background">
      {/* Background Decor */}
      <div className="fixed inset-0 -z-10 pointer-events-none opacity-[0.02]">
        <div className="absolute top-[10%] left-[5%] w-[40%] h-[40%] bg-indigo-600 blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] right-[5%] w-[40%] h-[40%] bg-purple-600 blur-[150px] rounded-full" />
      </div>

      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 text-sm font-bold mb-3 uppercase tracking-widest">
              <div className="h-1 w-8 bg-indigo-600 rounded-full" />
              Mentor Workspace
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight">
              Welcome Back, <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">{mentorProfile ? mentorProfile.user.name.split(' ')[0] : "Mentor"}.</span>
            </h1>
            {mentorProfile && (
              <p className="text-zinc-500 mt-2 font-medium flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                {mentorProfile.designation} @ {mentorProfile.company}
              </p>
            )}
          </div>

          <Link href="/whatcanibe/dashboard/mentor-profile">
            <Button variant="outline" className="h-14 px-8 border-zinc-200 rounded-2xl font-bold bg-white shadow-sm hover:bg-zinc-50 transition-all">
              Manage Profile
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Bookings", value: stats.total, icon: TrendingUp, color: "indigo" },
            { label: "Pending Requests", value: stats.pending, icon: Clock, color: "amber" },
            { label: "Upcoming Sessions", value: stats.confirmed, icon: Calendar, color: "emerald" },
            { label: "Completed Sessions", value: stats.completed, icon: CheckCircle2, color: "indigo" },
          ].map((stat, i) => (
            <GlowCard key={i} className="p-6 border-zinc-100 bg-white">
              <div className={`h-10 w-10 rounded-xl bg-${stat.color}-50 border border-${stat.color}-100 flex items-center justify-center mb-4`}>
                <stat.icon className={`h-5 w-5 text-${stat.color}-600`} />
              </div>
              <p className="text-3xl font-bold text-zinc-900">{stat.value}</p>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">{stat.label}</p>
            </GlowCard>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-12">
          {/* Incoming Bookings Section */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-8 w-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center">
                <Clock className="h-4 w-4 text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Incoming Requests</h2>
            </div>

            <div className="space-y-4">
              {bookings.filter(b => b.status === "pending").length === 0 ? (
                <p className="text-zinc-500 font-medium italic p-8 bg-zinc-50 rounded-[2rem] border border-dashed border-zinc-200">No pending requests at the moment.</p>
              ) : (
                bookings.filter(b => b.status === "pending").map(booking => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onStatusUpdate={updateBookingStatus}
                    isLoading={actionLoading === booking.id}
                    getStatusColor={getStatusColor}
                  />
                ))
              )}
            </div>
          </section>

          {/* Upcoming Sessions Section */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-8 w-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                <Calendar className="h-4 w-4 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Upcoming Sessions</h2>
            </div>

            <div className="space-y-4">
              {bookings.filter(b => b.status === "confirmed").length === 0 ? (
                <p className="text-zinc-500 font-medium italic p-8 bg-zinc-50 rounded-[2rem] border border-dashed border-zinc-200">No upcoming confirmed sessions.</p>
              ) : (
                bookings.filter(b => b.status === "confirmed").map(booking => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onStatusUpdate={updateBookingStatus}
                    isLoading={actionLoading === booking.id}
                    getStatusColor={getStatusColor}
                  />
                ))
              )}
            </div>
          </section>

          {/* Past/Cancelled Sessions Section */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-8 w-8 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center">
                <Info className="h-4 w-4 text-zinc-600" />
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">History</h2>
            </div>

            <div className="space-y-4">
              {bookings.filter(b => ["completed", "cancelled"].includes(b.status)).length === 0 ? (
                <p className="text-zinc-500 font-medium italic p-8 bg-zinc-50 rounded-[2rem] border border-dashed border-zinc-200">No session history yet.</p>
              ) : (
                bookings.filter(b => ["completed", "cancelled"].includes(b.status)).map(booking => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onStatusUpdate={updateBookingStatus}
                    isLoading={actionLoading === booking.id}
                    getStatusColor={getStatusColor}
                  />
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function BookingCard({
  booking,
  onStatusUpdate,
  isLoading,
  getStatusColor
}: {
  booking: Booking,
  onStatusUpdate: (id: string, status: Booking["status"]) => void,
  isLoading: boolean,
  getStatusColor: (status: Booking["status"]) => string
}) {
  return (
    <GlowCard className="p-8 border-zinc-100 bg-white rounded-[2rem]">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="h-16 w-16 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center">
            <User className="h-8 w-8 text-zinc-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-zinc-900">{booking.user.name}</h3>
            <p className="text-zinc-500 text-sm font-medium">{booking.user.email}</p>
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

        <div className="flex items-center gap-3">
          {booking.status === "pending" && (
            <>
              <Button
                onClick={() => onStatusUpdate(booking.id, "confirmed")}
                disabled={isLoading}
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold px-6"
              >
                {isLoading ? <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Confirm"}
              </Button>
              <Button
                onClick={() => onStatusUpdate(booking.id, "cancelled")}
                disabled={isLoading}
                variant="outline"
                className="border-red-100 text-red-600 hover:bg-red-50 rounded-xl font-bold px-6"
              >
                Cancel
              </Button>
            </>
          )}
          {booking.status === "confirmed" && (
            <Button
              onClick={() => onStatusUpdate(booking.id, "completed")}
              disabled={isLoading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold px-6"
            >
              {isLoading ? <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Mark Completed"}
            </Button>
          )}
        </div>
      </div>
      {booking.notes && (
        <div className="mt-6 p-4 rounded-xl bg-zinc-50 border border-zinc-100 text-sm text-zinc-500 font-medium">
          <span className="text-zinc-900 font-bold block mb-1">Student Notes:</span>
          {booking.notes}
        </div>
      )}
    </GlowCard>
  );
}

export default function MentorDashboardPage() {
  return (
    <ProtectedRoute>
      <MentorDashboardContent />
    </ProtectedRoute>
  );
}
