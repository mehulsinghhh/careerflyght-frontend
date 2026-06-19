"use client";
import { motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
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
  LucideIcon
} from "lucide-react";

import { MOCK_DASHBOARD_DATA } from "@/constants/dashboard";
import { GlowCard } from "@/components/ui/glow-card";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { PolishedModal } from "@/components/ui/polished-modal";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

interface User {
  id: string;
  name: string;
  email: string;
}

const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  Award,
  Users,
  Bookmark
};

interface UserWithRole extends User {
  role: string;
}

function StudentDashboardContent() {
  const [user, setUser] = useState<UserWithRole | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isPathwaysModalOpen, setIsPathwaysModalOpen] = useState(false);
  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);

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
              May 24, 2024 &mdash; You&apos;re on a {MOCK_DASHBOARD_DATA.streak.currentStreak} day streak
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
                return (
                  <GlowCard key={i} className="p-5 border-zinc-100 bg-white">
                    <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-4">
                      <Icon className="h-5 w-5 text-indigo-600" />
                    </div>
                    <p className="text-2xl font-bold text-zinc-900">
                      <AnimatedCounter value={stat.value} />
                    </p>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mt-1">{stat.label}</p>
                  </GlowCard>
                );
              })}
            </div>

            {/* Vertical Roadmap */}
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
            {/* AI Recommendations */}
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

            {/* Activity Timeline */}
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
