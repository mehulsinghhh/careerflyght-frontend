"use client";
import { motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Calendar,
  ChevronRight,
  Clock,
  Users,
  LucideIcon,
  ShieldCheck,
  Star,
  DollarSign,
  Briefcase
} from "lucide-react";

import { GlowCard } from "@/components/ui/glow-card";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserWithRole extends User {
  role: string;
}

function MentorDashboardContent() {
  const [user, setUser] = useState<UserWithRole | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const syncUser = () => {
      const storedUser = localStorage.getItem("careerflyghtUser");

      if (!storedUser) {
        setUser(null);
        setMounted(true);
        return;
      }

      try {
        setUser(JSON.parse(storedUser));
        setMounted(true);
      } catch (error) {
        console.error(error);
        setMounted(true);
      }
    };

    syncUser();

    window.addEventListener("auth-change", syncUser);

    return () => {
      window.removeEventListener("auth-change", syncUser);
    };
  }, []);

  if (!mounted || !user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
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
              May 24, 2024 &mdash; You have 3 pending session requests
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
                { label: "Total Sessions", value: "42", icon: Users },
                { label: "Hours Guided", value: "128", icon: Clock },
                { label: "Total Earnings", value: "$6.4k", icon: DollarSign },
                { label: "Active Students", value: "12", icon: Star },
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
                  <div className="text-center py-12">
                     <div className="h-16 w-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-100">
                        <Calendar className="h-8 w-8 text-zinc-300" />
                     </div>
                     <h3 className="text-lg font-bold text-zinc-900">No sessions scheduled for today</h3>
                     <p className="text-zinc-500 text-sm max-w-xs mx-auto mt-2">New booking requests from students will appear here once they are confirmed.</p>
                  </div>
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
