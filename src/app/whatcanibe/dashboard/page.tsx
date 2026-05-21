"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { motion } from "framer-motion";
import { MOCK_DASHBOARD_DATA } from "@/constants/dashboard";
import { GlowCard } from "@/components/ui/glow-card";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { PolishedModal } from "@/components/ui/polished-modal";

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

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isPathwaysModalOpen, setIsPathwaysModalOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("careerflyghtUser");
    if (!storedUser) {
      router.push("/login");
    } else {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setMounted(true);
      } catch (error) {
        console.error("Error parsing user:", error);
        router.push("/login");
      }
    }
  }, [router]);

  if (!mounted || !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-6">
      {/* Background Glows */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[5%] right-[10%] w-[30%] h-[30%] bg-violet-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[5%] left-[10%] w-[30%] h-[30%] bg-purple-600/10 blur-[120px] rounded-full" />
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
            <div className="flex items-center gap-2 text-violet-400 text-sm font-bold mb-3 uppercase tracking-widest">
              <div className="h-1 w-8 bg-violet-500 rounded-full" />
              Member Dashboard
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Welcome back, <span className="bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">{user.name.split(' ')[0]}</span>!
            </h1>
            <p className="text-gray-500 mt-2 font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              May 24, 2024 &mdash; You&apos;re on a {MOCK_DASHBOARD_DATA.streak.currentStreak} day streak
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
            <div className="h-10 w-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
              <Flame className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Current Streak</p>
              <p className="text-xl font-bold text-white leading-none">{MOCK_DASHBOARD_DATA.streak.currentStreak} Days</p>
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
                  <GlowCard key={i} className="p-5 border-white/5">
                    <div className="h-10 w-10 rounded-xl bg-violet-600/10 flex items-center justify-center mb-4">
                      <Icon className="h-5 w-5 text-violet-400" />
                    </div>
                    <p className="text-2xl font-bold text-white">
                      <AnimatedCounter value={stat.value} />
                    </p>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mt-1">{stat.label}</p>
                  </GlowCard>
                );
              })}
            </div>

            {/* Vertical Roadmap */}
            <motion.div variants={itemVariants}>
              <Card className="bg-[#050505] border-white/10 overflow-hidden rounded-[2rem] shadow-2xl">
                <CardHeader className="border-b border-white/10 p-8">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold text-white flex items-center gap-3">
                      <Map className="h-6 w-6 text-violet-400" />
                      Learning Roadmap
                    </CardTitle>
                    <div className="flex items-center gap-2 px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full">
                      <div className="h-2 w-2 rounded-full bg-violet-500" />
                      <span className="text-xs font-bold text-violet-400">Junior Full-Stack Path</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="relative">
                    {/* The line */}
                    <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-violet-500 via-violet-500/50 to-white/5" />

                    <div className="space-y-12">
                      {MOCK_DASHBOARD_DATA.roadmap.map((milestone) => (
                        <div key={milestone.id} className="relative pl-12">
                          {/* Dot */}
                          <div className={`absolute left-0 top-1 w-10 h-10 rounded-full border-4 border-black flex items-center justify-center z-10 ${
                            milestone.status === 'completed' ? 'bg-violet-600' :
                            milestone.status === 'active' ? 'bg-black border-violet-500' : 'bg-[#111] border-white/10'
                          }`}>
                            {milestone.status === 'completed' ? (
                              <Award className="h-5 w-5 text-white" />
                            ) : (
                              <div className={`w-2 h-2 rounded-full ${milestone.status === 'active' ? 'bg-violet-500 animate-pulse' : 'bg-white/10'}`} />
                            )}
                          </div>

                          <div className={`p-6 rounded-2xl border transition-all duration-300 ${
                            milestone.status === 'active' ? 'bg-violet-600/5 border-violet-500/30 ring-1 ring-violet-500/10' : 'bg-white/5 border-white/5'
                          }`}>
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                              <h3 className={`text-lg font-bold ${milestone.status === 'locked' ? 'text-gray-500' : 'text-white'}`}>
                                {milestone.title}
                              </h3>
                              {milestone.date && (
                                <span className="text-xs font-bold text-gray-500 flex items-center gap-1.5 bg-black/50 px-2 py-1 rounded-md">
                                  <Clock className="h-3 w-3" />
                                  {milestone.date}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed max-w-xl">
                              {milestone.description}
                            </p>

                            {milestone.status === 'active' && (
                              <div className="mt-6 flex flex-wrap gap-3">
                                <Button size="sm" className="bg-violet-600 hover:bg-violet-700 h-9 px-4 rounded-xl font-bold">
                                  Continue Learning
                                </Button>
                                <Button size="sm" variant="outline" className="border-white/10 h-9 px-4 rounded-xl font-bold bg-white/5">
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
              <Card className="bg-[#050505] border-white/10 rounded-[2rem] overflow-hidden">
                <CardHeader className="p-6 pb-2">
                  <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-400" />
                    AI Matches
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-2">
                  <div className="space-y-4">
                    {MOCK_DASHBOARD_DATA.recommendations.map((rec) => (
                      <div key={rec.id} className="group p-4 rounded-2xl border border-white/5 bg-white/5 hover:border-purple-500/30 transition-all cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                           <div className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-400 text-[10px] font-bold uppercase tracking-widest">
                             {rec.type}
                           </div>
                           <div className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                             {rec.matchScore}% Match
                           </div>
                        </div>
                        <h4 className="text-white font-bold mb-1 group-hover:text-purple-400 transition-colors">{rec.title}</h4>
                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{rec.description}</p>
                      </div>
                    ))}
                  </div>
                  <Button variant="ghost" className="w-full mt-4 text-purple-400 hover:text-purple-300 hover:bg-purple-500/5 rounded-xl font-bold">
                    View All Insights
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Activity Timeline */}
            <motion.div variants={itemVariants}>
              <Card className="bg-[#050505] border-white/10 rounded-[2rem] overflow-hidden">
                <CardHeader className="p-6 pb-2">
                  <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-violet-400" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-2">
                  <div className="space-y-6">
                    {MOCK_DASHBOARD_DATA.activities.map((act) => (
                      <div key={act.id} className="flex gap-4">
                        <div className="relative">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                            act.type === 'skill' ? 'bg-blue-500/10 text-blue-400' :
                            act.type === 'milestone' ? 'bg-violet-500/10 text-violet-400' : 'bg-emerald-500/10 text-emerald-400'
                          }`}>
                            {act.type === 'skill' ? <Award className="h-4 w-4" /> :
                             act.type === 'milestone' ? <Target className="h-4 w-4" /> : <Users className="h-4 w-4" />}
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-white leading-tight mb-1">{act.title}</p>
                          <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">{act.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => setIsPathwaysModalOpen(true)}
                    variant="outline"
                    className="w-full mt-8 border-white/10 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl font-bold"
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
             <div className="p-4 rounded-xl border border-white/5 bg-white/5">
                <p className="text-sm font-bold text-white mb-2">Focus Industry</p>
                <div className="flex flex-wrap gap-2">
                  {["Software", "Design", "Fintech", "Health"].map(tag => (
                    <div key={tag} className="px-3 py-1 rounded-full bg-white/5 text-xs font-medium text-gray-400 border border-white/10">{tag}</div>
                  ))}
                </div>
             </div>
             <div className="p-4 rounded-xl border border-white/5 bg-white/5">
                <p className="text-sm font-bold text-white mb-2">Pace</p>
                <div className="h-2 w-full bg-white/5 rounded-full">
                  <div className="h-full w-2/3 bg-violet-600 rounded-full" />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-[10px] text-gray-500">Casual</span>
                  <span className="text-[10px] text-gray-500">Intensive</span>
                </div>
             </div>
          </div>
          <Button className="w-full h-12 bg-violet-600 hover:bg-violet-700 rounded-xl font-bold" onClick={() => setIsPathwaysModalOpen(false)}>
            Update Path Settings
          </Button>
        </div>
      </PolishedModal>
    </div>
  );
}
