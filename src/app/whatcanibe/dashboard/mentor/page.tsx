"use client";
import { motion, type Variants } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Calendar,
  ChevronRight,
  Clock,
  Users,
  ShieldCheck,
  Star,
  Briefcase,
  AlertCircle,
  Video,
  MapPin,
  CheckCircle2,
  XCircle,
  ExternalLink
} from "lucide-react";

import { GlowCard } from "@/components/ui/glow-card";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { apiClient } from "@/lib/api-client";
import { Booking, BookingStatus } from "@/types/booking";
import { BookingDetailsModal } from "@/components/sections/whatcanibe/BookingDetailsModal";

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserWithRole extends User {
  role: string;
}

function MentorDashboardContent() {
  const router = useRouter();
  const [user, setUser] = useState<UserWithRole | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const storedUser = localStorage.getItem("careerflyghtUser");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      const bookingsRes = await apiClient("/bookings/mentor-bookings");
      setBookings(bookingsRes.data || []);
    } catch (err: unknown) {
      console.error("Mentor dashboard fetch error:", err);
      setError("Failed to load dashboard data.");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, [fetchData]);

  const handleUpdateStatus = async (bookingId: string, status: BookingStatus) => {
    setActionInProgress(bookingId);
    try {
      await apiClient(`/bookings/${bookingId}/status`, {
        method: "PUT",
        body: { status }
      });
      // Refresh data
      const bookingsRes = await apiClient("/bookings/mentor-bookings");
      setBookings(bookingsRes.data || []);
    } catch (err: unknown) {
      console.error("Status update error:", err);
      alert("Failed to update booking status.");
    } finally {
      setActionInProgress(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="h-20 w-20 rounded-full bg-red-50 flex items-center justify-center mb-6 mx-auto">
            <AlertCircle className="h-10 w-10 text-red-500" />
          </div>
          <h3 className="text-2xl font-bold text-zinc-900 mb-2">Something went wrong</h3>
          <p className="text-zinc-500 mb-8">{error || "User session not found."}</p>
          <Button onClick={() => fetchData()} className="bg-indigo-600 text-white rounded-xl font-bold px-8 h-12">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-6">
      {/* Background Glows */}
      <div className="fixed inset-0 -z-10 pointer-events-none opacity-[0.03]">
        <div className="absolute top-[5%] right-[10%] w-[30%] h-[30%] bg-indigo-600 blur-[120px] rounded-full" />
        <div className="absolute bottom-[5%] left-[10%] w-[30%] h-[30%] bg-blue-600 blur-[120px] rounded-full" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto max-w-7xl"
      >
        {/* Welcome Section */}
        <motion.div variants={itemVariants} className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 text-sm font-bold mb-3 uppercase tracking-widest">
              <div className="h-1 w-8 bg-indigo-600 rounded-full" />
              Mentor Workspace
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight">
              Welcome back, <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">{user.name.split(' ')[0]}</span>!
            </h1>
            <p className="text-zinc-500 mt-2 font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} &mdash;
              You have {bookings.filter(b => b.status === 'pending').length} pending requests
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white border border-zinc-100 p-4 rounded-2xl shadow-sm">
            <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center border border-indigo-100">
              <Star className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-tighter">Average Rating</p>
              <p className="text-xl font-bold text-zinc-900 leading-none">4.9/5.0</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Mentor Profile Status Card */}
            <motion.div variants={itemVariants}>
              <GlowCard className="p-8 border-indigo-500/20 bg-indigo-50/30 rounded-[2.5rem] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[80px] rounded-full pointer-events-none group-hover:scale-125 transition-transform duration-700" />
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex items-center gap-6">
                    <div className="h-16 w-16 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
                      <ShieldCheck className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Profile is Active</h2>
                      <p className="text-zinc-500 font-medium">Your profile is visible to students in the marketplace.</p>
                    </div>
                  </div>
                  <Link href="/whatcanibe/dashboard/mentor-profile">
                    <Button className="h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-xl shadow-indigo-600/10">
                      Edit Professional Bio
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </GlowCard>
            </motion.div>

            {/* Mentor Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Total Sessions", value: bookings.filter(b => b.status === 'completed').length.toString(), icon: Users },
                { label: "Hours Guided", value: (bookings.filter(b => b.status === 'completed').length * 1).toString(), icon: Clock },
                { label: "Pending Requests", value: bookings.filter(b => b.status === 'pending').length.toString(), icon: Star },
                { label: "Confirmed", value: bookings.filter(b => b.status === 'confirmed').length.toString(), icon: ShieldCheck },
              ].map((stat, i) => (
                <GlowCard key={i} className="p-5 border-zinc-100 bg-white">
                  <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-4">
                    <stat.icon className="h-5 w-5 text-indigo-600" />
                  </div>
                  <p className="text-2xl font-bold text-zinc-900">{stat.value}</p>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mt-1">{stat.label}</p>
                </GlowCard>
              ))}
            </div>

            {/* Session Requests Scaffolding */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white border-zinc-100 overflow-hidden rounded-[2rem] shadow-sm">
                <CardHeader className="border-b border-zinc-100 p-8">
                  <CardTitle className="text-xl font-bold text-zinc-900 flex items-center gap-3">
                    <Briefcase className="h-6 w-6 text-indigo-600" />
                    Upcoming Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  {bookings.length === 0 ? (
                    <div className="text-center py-12">
                       <div className="h-16 w-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-100">
                          <Calendar className="h-8 w-8 text-zinc-300" />
                       </div>
                       <h3 className="text-lg font-bold text-zinc-900">No session requests yet</h3>
                       <p className="text-zinc-500 text-sm max-w-xs mx-auto mt-2">New booking requests from students will appear here once they arrive.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {bookings.sort((a, b) => b.status === 'pending' ? 1 : -1).map((booking) => (
                        <div key={booking.id} className="p-6 rounded-3xl border border-zinc-100 bg-zinc-50/50 hover:bg-white transition-all group">
                          <div className="flex items-center justify-between mb-4">
                            <div className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest border ${
                              booking.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                              booking.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                              booking.status === 'completed' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                              'bg-zinc-100 text-zinc-500 border-zinc-200'
                            }`}>
                              {booking.status}
                            </div>
                            <div className="h-8 w-8 rounded-lg bg-white border border-zinc-100 flex items-center justify-center text-zinc-400">
                              {booking.sessionType === 'online' ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                            </div>
                          </div>

                          <h4 className="text-zinc-900 font-bold mb-1">
                            {booking.student?.user?.name || `Student (ID: ${booking.studentId.slice(-4).toUpperCase()})`}
                          </h4>

                          <div className="space-y-1.5 mb-4">
                            <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
                              <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                              {new Date(booking.bookingDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
                              <Clock className="h-3.5 w-3.5 text-zinc-400" />
                              {booking.bookingTime}
                            </div>
                          </div>

                          {booking.notes && (
                            <p className="text-xs text-zinc-400 line-clamp-2 italic border-l-2 border-zinc-200 pl-3 mb-4">
                              &ldquo;{booking.notes}&rdquo;
                            </p>
                          )}

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedBooking(booking)}
                            className="w-full rounded-xl border-zinc-200 text-zinc-600 font-bold bg-white group-hover:border-indigo-500/20 group-hover:text-indigo-600 transition-all mb-4"
                          >
                            View Details
                            <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                          </Button>

                          <div className="flex gap-2">
                            {booking.status === 'pending' && (
                              <>
                                <Button
                                  size="sm"
                                  disabled={actionInProgress === booking.id}
                                  onClick={() => handleUpdateStatus(booking.id, 'confirmed')}
                                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold h-10"
                                >
                                  {actionInProgress === booking.id ? "..." : "Accept"}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  disabled={actionInProgress === booking.id}
                                  onClick={() => handleUpdateStatus(booking.id, 'cancelled')}
                                  className="flex-1 border-zinc-200 text-zinc-600 hover:bg-red-50 hover:text-red-600 hover:border-red-100 rounded-xl font-bold h-10"
                                >
                                  Decline
                                </Button>
                              </>
                            )}
                            {booking.status === 'confirmed' && (
                               <Button
                                 size="sm"
                                 disabled={actionInProgress === booking.id}
                                 onClick={() => handleUpdateStatus(booking.id, 'completed')}
                                 className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold h-10"
                               >
                                 Mark Completed
                               </Button>
                            )}
                            {booking.status === 'completed' && (
                              <div className="w-full flex items-center justify-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 h-10 rounded-xl border border-emerald-100">
                                <CheckCircle2 className="h-4 w-4" />
                                Session Completed
                              </div>
                            )}
                            {booking.status === 'cancelled' && (
                              <div className="w-full flex items-center justify-center gap-2 text-xs font-bold text-zinc-400 bg-zinc-100 h-10 rounded-xl border border-zinc-200">
                                <XCircle className="h-4 w-4" />
                                Session Cancelled
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white border-zinc-100 rounded-[2rem] overflow-hidden shadow-sm">
                <CardHeader className="p-6 pb-2">
                  <CardTitle className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-indigo-600" />
                    Workspace Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-2">
                  <div className="space-y-4">
                    {[
                      { title: "Profile Views", value: "+24% this week", color: "text-emerald-600" },
                      { title: "Response Time", value: "2.4 hours", color: "text-indigo-600" },
                      { title: "Completion Rate", value: "98%", color: "text-blue-600" },
                    ].map((insight, i) => (
                      <div key={i} className="p-4 rounded-2xl border border-zinc-100 bg-zinc-50">
                        <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">{insight.title}</h4>
                        <p className={cn("text-lg font-bold", insight.color)}>{insight.value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <BookingDetailsModal
        isOpen={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
        booking={selectedBooking}
        userRole="mentor"
      />
    </div>
  );
}

// Utility function for conditional classes
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function MentorDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["mentor"]} requireMentorProfile={true}>
      <MentorDashboardContent />
    </ProtectedRoute>
  );
}
