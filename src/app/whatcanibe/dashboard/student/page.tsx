"use client";
import { motion, type Variants } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Target,
  Award,
  TrendingUp,
  Map,
  Flame,
  Calendar,
  Sparkles,
  ChevronRight,
  Clock,
  Users,
  Bookmark,
  LucideIcon,
  User,
  Mail,
  GraduationCap,
  Briefcase,
  AlertCircle,
  Video,
  MapPin,
  ExternalLink,
  ShieldCheck
} from "lucide-react";

import { MOCK_DASHBOARD_DATA } from "@/constants/dashboard";
import { GlowCard } from "@/components/ui/glow-card";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { PolishedModal } from "@/components/ui/polished-modal";
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

interface StudentProfile {
  id: string;
  userId: string;
  educationLevel: string;
  preferredCountry: string;
  careerInterest: string;
  bio: string;
  resumeUrl: string | null;
}

interface Booking {
  id: string;
  mentorId: string;
  bookingDate: string;
  bookingTime: string;
  sessionType: 'online' | 'offline';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  mentor?: {
    user: {
      name: string;
    }
  };
}

const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  Award,
  Users,
  Bookmark
};

// --- Components ---

function StudentDashboardContent() {
  const router = useRouter();

  // State
  const [user, setUser] = useState<UserData | null>(null);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPathwaysModalOpen, setIsPathwaysModalOpen] = useState(false);
  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // 1. Get User Data
      const userRes = await apiClient("/users/me");
      setUser(userRes.data);

      // 2. Get Student Profile
      try {
        const profileRes = await apiClient("/users/profile");
        setProfile(profileRes.data);
      } catch (err: unknown) {
        // If 404, profile doesn't exist yet - this is handled in the UI
        const error = err as Error;
        if (error.message !== "Not Found" && !error.message?.includes("404")) {
          console.error("Profile fetch error:", error);
        }
        setProfile(null);
      }

      // 3. Get Bookings
      const bookingsRes = await apiClient("/bookings/my-bookings");
      setBookings(bookingsRes.data);

    } catch (err: unknown) {
      const error = err as Error;
      console.error("Dashboard fetch error:", error);
      if (error.message === "Unauthorized") {
        router.push("/whatcanibe/login");
      } else {
        setError("Failed to load dashboard data. Please refresh the page.");
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
          <p className="text-zinc-500 font-medium animate-pulse">Loading your dashboard...</p>
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

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-6">
      {/* Background Glows */}
      <div className="fixed inset-0 -z-10 pointer-events-none opacity-[0.03]">
        <div className="absolute top-[5%] right-[10%] w-[30%] h-[30%] bg-violet-600 blur-[120px] rounded-full" />
        <div className="absolute bottom-[5%] left-[10%] w-[30%] h-[30%] bg-purple-600 blur-[120px] rounded-full" />
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
              Student Dashboard
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight">
              Welcome back, <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">{user.name.split(' ')[0]}</span>!
            </h1>
            <p className="text-zinc-500 mt-2 font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {today} &mdash; You&apos;re on a {MOCK_DASHBOARD_DATA.streak.currentStreak} day streak
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white border border-zinc-100 p-4 rounded-2xl shadow-sm">
            <div className="h-10 w-10 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100">
              <Flame className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-tighter">Current Streak</p>
              <p className="text-xl font-bold text-zinc-900 leading-none">{MOCK_DASHBOARD_DATA.streak.currentStreak} Days</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {MOCK_DASHBOARD_DATA.stats.map((stat, i) => {
                const Icon = iconMap[stat.icon];
                const value = stat.label === "Mentor Sessions" ? bookings.length : stat.value;
                return (
                  <GlowCard key={i} className="p-5 border-zinc-100 bg-white">
                    <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-4">
                      <Icon className="h-5 w-5 text-indigo-600" />
                    </div>
                    <p className="text-2xl font-bold text-zinc-900">
                      <AnimatedCounter value={value} />
                    </p>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mt-1">{stat.label}</p>
                  </GlowCard>
                );
              })}
            </div>

            {/* Profile Overview Section */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white border-zinc-100 overflow-hidden rounded-[2rem] shadow-sm">
                <CardHeader className="border-b border-zinc-100 p-8">
                  <CardTitle className="text-xl font-bold text-zinc-900 flex items-center gap-3">
                    <User className="h-6 w-6 text-indigo-600" />
                    Profile Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  {!profile ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                      <div className="h-16 w-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4">
                        <GraduationCap className="h-8 w-8 text-indigo-400" />
                      </div>
                      <h4 className="text-lg font-bold text-zinc-900 mb-2">Complete your profile</h4>
                      <p className="text-sm text-zinc-500 max-w-xs mb-6">
                        Tell us more about your background and interests to get personalized career guidance.
                      </p>
                      <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold h-11 px-8">
                        Get Started
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <div className="h-10 w-10 rounded-xl bg-zinc-50 flex items-center justify-center shrink-0 border border-zinc-100">
                            <User className="h-5 w-5 text-zinc-400" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Full Name</p>
                            <p className="text-zinc-900 font-bold">{user.name}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="h-10 w-10 rounded-xl bg-zinc-50 flex items-center justify-center shrink-0 border border-zinc-100">
                            <Mail className="h-5 w-5 text-zinc-400" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Email Address</p>
                            <p className="text-zinc-900 font-bold">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="h-10 w-10 rounded-xl bg-zinc-50 flex items-center justify-center shrink-0 border border-zinc-100">
                            <ShieldCheck className="h-5 w-5 text-zinc-400" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Account Status</p>
                            <div className="flex items-center gap-1.5">
                              <div className={`h-1.5 w-1.5 rounded-full ${user.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                              <p className="text-zinc-900 font-bold capitalize">{user.status}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <div className="h-10 w-10 rounded-xl bg-zinc-50 flex items-center justify-center shrink-0 border border-zinc-100">
                            <GraduationCap className="h-5 w-5 text-zinc-400" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Education</p>
                            <p className="text-zinc-900 font-bold">{profile.educationLevel}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="h-10 w-10 rounded-xl bg-zinc-50 flex items-center justify-center shrink-0 border border-zinc-100">
                            <Briefcase className="h-5 w-5 text-zinc-400" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Career Interests</p>
                            <p className="text-zinc-900 font-bold">{profile.careerInterest}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="h-10 w-10 rounded-xl bg-zinc-50 flex items-center justify-center shrink-0 border border-zinc-100">
                            <MapPin className="h-5 w-5 text-zinc-400" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Target Country</p>
                            <p className="text-zinc-900 font-bold">{profile.preferredCountry}</p>
                          </div>
                        </div>
                      </div>
                      <div className="md:col-span-2 space-y-6 pt-4 border-t border-zinc-50">
                        <div>
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">About Me</p>
                          <p className="text-sm text-zinc-600 leading-relaxed bg-zinc-50/50 p-4 rounded-2xl border border-zinc-100">
                            {profile.bio || "No bio provided yet."}
                          </p>
                        </div>
                        {profile.resumeUrl && (
                          <div className="flex items-center justify-between p-4 rounded-2xl bg-indigo-50/30 border border-indigo-100/50">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                                <BookOpen className="h-5 w-5 text-indigo-600" />
                              </div>
                              <div>
                                <p className="text-xs font-bold text-zinc-900">Professional Resume</p>
                                <p className="text-[10px] text-zinc-500 font-medium">Linked Document</p>
                              </div>
                            </div>
                            <Link href={profile.resumeUrl} target="_blank">
                              <Button size="sm" variant="ghost" className="text-indigo-600 font-bold hover:bg-indigo-50 rounded-lg">
                                View Resume
                                <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                              </Button>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* My Sessions Section */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white border-zinc-100 overflow-hidden rounded-[2rem] shadow-sm">
                <CardHeader className="border-b border-zinc-100 p-8">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold text-zinc-900 flex items-center gap-3">
                      <Users className="h-6 w-6 text-indigo-600" />
                      My Sessions
                    </CardTitle>
                    <Link href="/whatcanibe/mentors">
                      <Button variant="ghost" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-bold rounded-xl">
                        Find Mentors
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  {bookings.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="h-16 w-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4">
                        <Calendar className="h-8 w-8 text-indigo-400" />
                      </div>
                      <h4 className="text-lg font-bold text-zinc-900 mb-2">No sessions booked yet</h4>
                      <p className="text-sm text-zinc-500 max-w-xs mb-8">
                        Get personalized advice from industry experts to accelerate your career.
                      </p>
                      <Link href="/whatcanibe/mentors">
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold h-11 px-8 shadow-lg shadow-indigo-600/10 transition-all hover:scale-[1.02]">
                          Book your first session
                        </Button>
                      </Link>
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

                          <h4 className="text-zinc-900 font-bold mb-1">{booking.mentor?.user?.name || "Mentor"}</h4>
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

                          <Button variant="outline" size="sm" className="w-full rounded-xl border-zinc-200 text-zinc-600 font-bold bg-white group-hover:border-indigo-500/20 group-hover:text-indigo-600 transition-all">
                            View Details
                            <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Vertical Roadmap (Kept as Mock) */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white border-zinc-100 overflow-hidden rounded-[2rem] shadow-sm">
                <CardHeader className="border-b border-zinc-100 p-8">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold text-zinc-900 flex items-center gap-3">
                      <Map className="h-6 w-6 text-indigo-600" />
                      Learning Roadmap
                    </CardTitle>
                    <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full">
                      <div className="h-2 w-2 rounded-full bg-indigo-600" />
                      <span className="text-xs font-bold text-indigo-600">Junior Full-Stack Path</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="relative">
                    {/* The line */}
                    <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-indigo-500 via-indigo-500/50 to-zinc-100" />

                    <div className="space-y-12">
                      {MOCK_DASHBOARD_DATA.roadmap.map((milestone) => (
                        <div key={milestone.id} className="relative pl-12">
                          {/* Dot */}
                          <div className={`absolute left-0 top-1 w-10 h-10 rounded-full border-4 border-white flex items-center justify-center z-10 ${
                            milestone.status === 'completed' ? 'bg-indigo-600' :
                            milestone.status === 'active' ? 'bg-white border-indigo-600 shadow-lg' : 'bg-zinc-50 border-zinc-200'
                          }`}>
                            {milestone.status === 'completed' ? (
                              <Award className="h-5 w-5 text-white" />
                            ) : (
                              <div className={`w-2 h-2 rounded-full ${milestone.status === 'active' ? 'bg-indigo-600 animate-pulse' : 'bg-zinc-200'}`} />
                            )}
                          </div>

                          <div className={`p-6 rounded-2xl border transition-all duration-300 ${
                            milestone.status === 'active' ? 'bg-indigo-50/50 border-indigo-200 shadow-sm' : 'bg-zinc-50/30 border-zinc-100'
                          }`}>
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                              <h3 className={`text-lg font-bold ${milestone.status === 'locked' ? 'text-zinc-400' : 'text-zinc-900'}`}>
                                {milestone.title}
                              </h3>
                              {milestone.date && (
                                <span className="text-xs font-bold text-zinc-400 flex items-center gap-1.5 bg-white border border-zinc-100 px-2 py-1 rounded-md shadow-sm">
                                  <Clock className="h-3 w-3" />
                                  {milestone.date}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-zinc-500 leading-relaxed max-w-xl">
                              {milestone.description}
                            </p>

                            {milestone.status === 'active' && (
                              <div className="mt-6 flex flex-wrap gap-3">
                                <Button
                                  onClick={() => setIsMilestoneModalOpen(true)}
                                  size="sm"
                                  className="bg-indigo-600 hover:bg-indigo-700 h-9 px-4 rounded-xl font-bold text-white shadow-sm"
                                >
                                  Continue Learning
                                </Button>
                                <Button
                                  onClick={() => setIsMilestoneModalOpen(true)}
                                  size="sm"
                                  variant="outline"
                                  className="border-zinc-200 h-9 px-4 rounded-xl font-bold bg-white text-zinc-600 hover:bg-zinc-50 shadow-sm"
                                >
                                  View Resources
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            {/* AI Recommendations (Kept as Mock) */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white border-zinc-100 rounded-[2rem] overflow-hidden shadow-sm">
                <CardHeader className="p-6 pb-2">
                  <CardTitle className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                    AI Matches
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-2">
                  <div className="space-y-4">
                    {MOCK_DASHBOARD_DATA.recommendations.map((rec) => (
                      <div
                        key={rec.id}
                        onClick={() => setIsMilestoneModalOpen(true)}
                        className="group p-4 rounded-2xl border border-zinc-100 bg-zinc-50 hover:border-purple-500/30 transition-all cursor-pointer hover:bg-white hover:shadow-lg hover:shadow-purple-500/5"
                      >
                        <div className="flex items-center justify-between mb-2">
                           <div className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-600 text-[10px] font-bold uppercase tracking-widest border border-purple-100">
                             {rec.type}
                           </div>
                           <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                             {rec.matchScore}% Match
                           </div>
                        </div>
                        <h4 className="text-zinc-900 font-bold mb-1 group-hover:text-purple-600 transition-colors">{rec.title}</h4>
                        <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">{rec.description}</p>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => setIsMilestoneModalOpen(true)}
                    variant="ghost"
                    className="w-full mt-4 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-xl font-bold"
                  >
                    View All Insights
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Activity Timeline (Kept as Mock) */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white border-zinc-100 rounded-[2rem] overflow-hidden shadow-sm">
                <CardHeader className="p-6 pb-2">
                  <CardTitle className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-indigo-600" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-2">
                  <div className="space-y-6">
                    {MOCK_DASHBOARD_DATA.activities.map((act) => (
                      <div key={act.id} className="flex gap-4">
                        <div className="relative">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                            act.type === 'skill' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                            act.type === 'milestone' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                          }`}>
                            {act.type === 'skill' ? <Award className="h-4 w-4" /> :
                             act.type === 'milestone' ? <Target className="h-4 w-4" /> : <Users className="h-4 w-4" />}
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-zinc-900 leading-tight mb-1">{act.title}</p>
                          <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">{act.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => setIsPathwaysModalOpen(true)}
                    variant="outline"
                    className="w-full mt-8 border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 rounded-xl font-bold shadow-sm"
                  >
                    Personalize My Path
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <PolishedModal
        isOpen={isPathwaysModalOpen}
        onClose={() => setIsPathwaysModalOpen(false)}
        title="Path Personalization"
        description="Fine-tune your career trajectory using AI."
      >
        <div className="space-y-6">
          <div className="space-y-4">
             <div className="p-4 rounded-xl border border-zinc-100 bg-zinc-50">
                <p className="text-sm font-bold text-zinc-900 mb-2">Focus Industry</p>
                <div className="flex flex-wrap gap-2">
                  {["Software", "Design", "Fintech", "Health"].map(tag => (
                    <div key={tag} className="px-3 py-1 rounded-full bg-white text-xs font-medium text-zinc-500 border border-zinc-200 shadow-sm">{tag}</div>
                  ))}
                </div>
             </div>
             <div className="p-4 rounded-xl border border-zinc-100 bg-zinc-50">
                <p className="text-sm font-bold text-zinc-900 mb-2">Pace</p>
                <div className="h-2 w-full bg-zinc-200 rounded-full">
                  <div className="h-full w-2/3 bg-indigo-600 rounded-full" />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-[10px] text-zinc-400">Casual</span>
                  <span className="text-[10px] text-zinc-400">Intensive</span>
                </div>
             </div>
          </div>
          <Button className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-xl shadow-indigo-600/20" onClick={() => setIsPathwaysModalOpen(false)}>
            Update Path Settings
          </Button>
        </div>
      </PolishedModal>

      <PolishedModal
        isOpen={isMilestoneModalOpen}
        onClose={() => setIsMilestoneModalOpen(false)}
        title="Milestone Details"
        description="Deep dive into your next learning objective."
      >
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-zinc-100 bg-zinc-50">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h4 className="text-zinc-900 font-bold">Advanced React Patterns</h4>
                <p className="text-xs text-zinc-400">Estimated time: 4 hours</p>
              </div>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed mb-6">
              Master higher-order components, render props, and advanced hook patterns to build highly reusable UI architectures.
            </p>
            <div className="space-y-3">
              {["Custom Hooks", "Context API", "Compound Components"].map(item => (
                <div key={item} className="flex items-center gap-2 text-xs text-zinc-600">
                  <div className="h-1 w-1 rounded-full bg-indigo-600" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <Button className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-xl shadow-indigo-600/20" onClick={() => setIsMilestoneModalOpen(false)}>
            Launch Lesson
          </Button>
        </div>
      </PolishedModal>
    </div>
  );
}

export default function StudentDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <StudentDashboardContent />
    </ProtectedRoute>
  );
}
