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
  DollarSign,
  Briefcase,
  AlertCircle,
  Video,
  MapPin,
  ExternalLink,
  User,
  GraduationCap
} from "lucide-react";

import { GlowCard } from "@/components/ui/glow-card";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { apiClient } from "@/lib/api-client";

// --- Types ---

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  profilePhoto: string | null;
  createdAt: string;
}

interface MentorProfile {
  id: string;
  userId: string;
  company: string;
  designation: string;
  experienceYears: number;
  bio: string;
  linkedinUrl: string;
  hourlyRate: string | number;
}

interface Booking {
  id: string;
  studentId: string;
  bookingDate: string;
  bookingTime?: string;
  sessionType?: 'online' | 'offline';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  student?: {
    user: {
      name: string;
    }
  };
}

// --- Components ---

function MentorDashboardContent() {
  const router = useRouter();

  // State
  const [user, setUser] = useState<UserData | null>(null);
  const [profile, setProfile] = useState<MentorProfile | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // 1. Get User Data
      const userRes = await apiClient("/users/me");
      setUser(userRes.data);

      // 2. Get Mentor Profile - Handle "not found" as an onboarding state
      try {
        const profileRes = await apiClient("/mentors/profile");
        setProfile(profileRes.data);
      } catch (err: unknown) {
        const error = err as Error;
        const isNotFound = error.message.toLowerCase().includes("not found") ||
                          error.message.includes("404");

        if (!isNotFound) {
          console.error("Profile fetch error:", error);
        }
        setProfile(null);
      }

      // 3. Get Bookings
      try {
        const bookingsRes = await apiClient("/bookings/mentor-bookings");
        setBookings(bookingsRes.data || []);
      } catch (err: unknown) {
        const error = err as Error;
        console.error("Bookings fetch error:", error);
        setBookings([]);
      }

    } catch (err: unknown) {
      const error = err as Error;
      console.error("Dashboard fetch error:", error);
      if (error.message === "Unauthorized") {
        router.push("/whatcanibe/login");
      } else {
        setError("Failed to load workspace data. Please refresh the page.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, [fetchData]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-zinc-500 font-medium animate-pulse">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="h-20 w-20 rounded-full bg-red-50 flex items-center justify-center mb-6 mx-auto">
            <AlertCircle className="h-10 w-10 text-red-500" />
          </div>
          <h3 className="text-2xl font-bold text-zinc-900 mb-2">Something went wrong</h3>
          <p className="text-zinc-500 mb-8">{error}</p>
          <Button onClick={() => fetchData()} className="bg-indigo-600 text-white rounded-xl font-bold px-8 h-12">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!user) return null;

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

  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const pendingBookingsCount = bookings.filter(b => b.status === 'pending').length;

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
              {today} &mdash; You have {pendingBookingsCount} pending session {pendingBookingsCount === 1 ? 'request' : 'requests'}
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

            {/* Profile Status Card */}
            <motion.div variants={itemVariants}>
              {!profile ? (
                <GlowCard className="p-8 border-amber-500/20 bg-amber-50/30 rounded-[2.5rem] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[80px] rounded-full pointer-events-none group-hover:scale-125 transition-transform duration-700" />
                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                      <div className="h-16 w-16 rounded-2xl bg-amber-600 flex items-center justify-center shadow-lg shadow-amber-600/20">
                        <AlertCircle className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Complete Your Profile</h2>
                        <p className="text-zinc-500 font-medium">Your profile is currently hidden from the marketplace.</p>
                      </div>
                    </div>
                    <Button className="h-14 px-8 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold transition-all shadow-xl shadow-amber-600/10" asChild>
                      <Link href="/whatcanibe/onboarding/mentor">
                        Setup Profile
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </GlowCard>
              ) : (
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
                    <Button className="h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-xl shadow-indigo-600/10" asChild>
                      <Link href="/whatcanibe/onboarding/mentor">
                        Manage Profile
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </GlowCard>
              )}
            </motion.div>

            {/* Professional Info (If profile exists) */}
            {profile && (
              <motion.div variants={itemVariants}>
                <Card className="bg-white border-zinc-100 overflow-hidden rounded-[2rem] shadow-sm">
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                       <div className="space-y-1">
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Company</p>
                          <div className="flex items-center gap-2">
                             <Briefcase className="h-4 w-4 text-indigo-600" />
                             <p className="text-zinc-900 font-bold">{profile.company}</p>
                          </div>
                       </div>
                       <div className="space-y-1">
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Designation</p>
                          <div className="flex items-center gap-2">
                             <Star className="h-4 w-4 text-indigo-600" />
                             <p className="text-zinc-900 font-bold">{profile.designation}</p>
                          </div>
                       </div>
                       <div className="space-y-1">
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Experience</p>
                          <div className="flex items-center gap-2">
                             <GraduationCap className="h-4 w-4 text-indigo-600" />
                             <p className="text-zinc-900 font-bold">{profile.experienceYears} Years</p>
                          </div>
                       </div>
                       <div className="space-y-1">
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Hourly Rate</p>
                          <div className="flex items-center gap-2">
                             <DollarSign className="h-4 w-4 text-indigo-600" />
                             <p className="text-zinc-900 font-bold">${profile.hourlyRate}</p>
                          </div>
                       </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-zinc-50">
                       <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Professional Bio</p>
                       <p className="text-sm text-zinc-600 leading-relaxed bg-zinc-50/50 p-4 rounded-2xl border border-zinc-100 italic">
                         &ldquo;{profile.bio}&rdquo;
                       </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Mentor Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Total Sessions", value: bookings.length.toString(), icon: Users },
                { label: "Hours Guided", value: bookings.filter(b => b.status === 'completed').length.toString(), icon: Clock },
                { label: "Total Earnings", value: profile ? `$${(bookings.filter(b => b.status === 'completed').length * (Number(profile.hourlyRate) || 0)).toLocaleString()}` : "$0", icon: DollarSign },
                { label: "Active Students", value: [...new Set(bookings.map(b => b.studentId))].length.toString(), icon: Star },
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

            {/* Session Requests */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white border-zinc-100 overflow-hidden rounded-[2rem] shadow-sm">
                <CardHeader className="border-b border-zinc-100 p-8">
                  <CardTitle className="text-xl font-bold text-zinc-900 flex items-center gap-3">
                    <Briefcase className="h-6 w-6 text-indigo-600" />
                    Incoming Requests
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  {bookings.length === 0 ? (
                    <div className="text-center py-12">
                       <div className="h-16 w-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-100">
                          <Calendar className="h-8 w-8 text-zinc-300" />
                       </div>
                       <h3 className="text-lg font-bold text-zinc-900">No requests yet</h3>
                       <p className="text-zinc-500 text-sm max-w-xs mx-auto mt-2">New booking requests from students will appear here.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {bookings.map((booking) => (
                         <div key={booking.id} className="p-6 rounded-2xl border border-zinc-100 bg-zinc-50/50 hover:bg-white hover:border-indigo-500/20 transition-all group">
                           <div className="flex items-center justify-between mb-4">
                             <div className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest border ${
                               booking.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                               booking.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                               booking.status === 'completed' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                               'bg-zinc-100 text-zinc-500 border-zinc-200'
                             }`}>
                               {booking.status}
                             </div>
                             <div className="h-8 w-8 rounded-lg bg-white border border-zinc-100 flex items-center justify-center text-zinc-400 group-hover:text-indigo-600 transition-colors">
                               {booking.sessionType === 'online' ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                             </div>
                           </div>

                           <div className="flex items-center gap-3 mb-4">
                              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                                {booking.student?.user?.name.charAt(0) || "S"}
                              </div>
                              <h4 className="text-zinc-900 font-bold">{booking.student?.user?.name || "Student"}</h4>
                           </div>

                           <div className="space-y-1.5 mb-4">
                             <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
                               <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                               {new Date(booking.bookingDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                             </div>
                             {booking.bookingTime && (
                               <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
                                 <Clock className="h-3.5 w-3.5 text-zinc-400" />
                                 {booking.bookingTime}
                               </div>
                             )}
                           </div>

                           {booking.notes && (
                             <p className="text-xs text-zinc-400 line-clamp-2 italic border-l-2 border-zinc-200 pl-3 mb-4">
                               &ldquo;{booking.notes}&rdquo;
                             </p>
                           )}

                           <div className="flex gap-2">
                             <Button variant="outline" size="sm" className="flex-1 rounded-xl border-zinc-200 text-zinc-600 font-bold bg-white hover:bg-zinc-50 transition-all">
                               View
                             </Button>
                             {booking.status === 'pending' && (
                               <Button size="sm" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all">
                                 Manage
                               </Button>
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
            {/* Quick Stats */}
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

            {/* Profile Visibility */}
            <motion.div variants={itemVariants}>
               <Card className="bg-indigo-600 border-indigo-700 rounded-[2rem] overflow-hidden shadow-lg shadow-indigo-600/20 text-white p-6">
                  <div className="flex items-center gap-3 mb-4">
                     <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
                        <User className="h-6 w-6 text-white" />
                     </div>
                     <h3 className="font-bold">Public Presence</h3>
                  </div>
                  <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
                    Students search for mentors by company, experience and hourly rate. Keep your profile updated to increase your visibility.
                  </p>
                  <Link href="/whatcanibe/mentors" target="_blank">
                    <Button className="w-full bg-white text-indigo-600 hover:bg-indigo-50 font-bold rounded-xl h-11">
                      View Marketplace
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
               </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Utility function for conditional classes
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function MentorDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["mentor"]}>
      <MentorDashboardContent />
    </ProtectedRoute>
  );
}
