"use client";
import { motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
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
  Target,
  LucideIcon,
  Zap,
  Quote,
  Trophy
} from "lucide-react";

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
  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);

  useEffect(() => {
    const syncUser = () => {
      const storedUser = localStorage.getItem("careerflyghtUser");
      if (!storedUser) {
        setUser(null);
        router.push("/whatcanibe/login");
        return;
      }
      try {
        setUser(JSON.parse(storedUser));
        setMounted(true);
      } catch (error) {
        console.error(error);
        router.push("/whatcanibe/login");
      }
    };
    syncUser();
    window.addEventListener("auth-change", syncUser);
    return () => window.removeEventListener("auth-change", syncUser);
  }, [router]);
  
  if (!mounted || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-10 w-10 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-background pt-32 pb-20 px-4 md:px-6 relative overflow-hidden transition-colors duration-500">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] right-[5%] w-[40%] h-[40%] bg-brand-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] left-[5%] w-[40%] h-[40%] bg-brand-secondary/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.05]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto max-w-7xl relative z-10"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="mb-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-[0.2em] mb-2">
              <Zap className="h-3 w-3" />
              Active Protocol
            </div>
            <h1 className="text-4xl md:text-5xl font-black dark:text-white text-zinc-900 tracking-tighter leading-none">
              Welcome, <span className="text-gradient-purple">{user.name.split(' ')[0]}</span>.
            </h1>
            <p className="dark:text-zinc-400 text-zinc-500 font-bold flex items-center gap-2 text-base">
              <Calendar className="h-4 w-4 opacity-50" />
              May 24 &mdash; You&apos;re on a {MOCK_DASHBOARD_DATA.streak.currentStreak} day streak
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/80 dark:bg-white/5 border border-zinc-200 dark:border-white/10 p-5 rounded-[2rem] shadow-xl backdrop-blur-xl">
            <div className="h-12 w-12 rounded-2xl bg-orange-500/10 flex items-center justify-center shadow-inner">
              <Flame className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              <p className="text-[10px] font-black dark:text-zinc-500 text-zinc-400 uppercase tracking-widest mb-0.5">Momentum</p>
              <p className="text-2xl font-black dark:text-white text-zinc-900 leading-none">{MOCK_DASHBOARD_DATA.streak.currentStreak} Days</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {MOCK_DASHBOARD_DATA.stats.map((stat, i) => {
                const Icon = iconMap[stat.icon];
                return (
                  <GlowCard key={i} className="p-6 glass glass-hover border-zinc-100 dark:border-white/[0.08] rounded-[2rem]">
                    <div className="h-12 w-12 rounded-2xl bg-zinc-50 dark:bg-white/5 flex items-center justify-center mb-5 border border-zinc-100 dark:border-white/5 shadow-sm group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6 text-brand-primary" />
                    </div>
                    <p className="text-3xl font-black dark:text-white text-zinc-900 tracking-tighter">
                      <AnimatedCounter value={stat.value} />
                    </p>
                    <p className="text-[10px] font-black dark:text-zinc-500 text-zinc-400 uppercase tracking-[0.2em] mt-1">{stat.label}</p>
                  </GlowCard>
                );
              })}
            </div>

            {/* Motivational Quote - Immersive Element */}
            <motion.div variants={itemVariants} className="p-8 rounded-[2.5rem] bg-gradient-to-br from-brand-primary/20 via-brand-secondary/10 to-transparent border border-brand-primary/10 relative overflow-hidden group">
               <Quote className="absolute -top-4 -right-4 h-32 w-32 text-brand-primary/10 rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
               <div className="relative z-10">
                 <p className="text-2xl font-heading italic font-bold dark:text-white text-zinc-800 leading-tight mb-4">
                   &quot;The only way to predict the future is to build it.&quot;
                 </p>
                 <div className="flex items-center gap-3">
                   <div className="h-px w-8 bg-brand-primary" />
                   <span className="text-xs font-black uppercase tracking-widest text-brand-primary">Daily Insight</span>
                 </div>
               </div>
            </motion.div>

            {/* Learning Roadmap - Redesigned Timeline */}
            <motion.div variants={itemVariants}>
              <Card className="glass border-zinc-100 dark:border-white/10 overflow-hidden rounded-[2.5rem] shadow-2xl">
                <CardHeader className="border-b border-zinc-100 dark:border-white/5 p-8 md:p-10">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-black dark:text-white text-zinc-900 flex items-center gap-4">
                      <div className="p-3 rounded-2xl bg-brand-primary/10">
                        <Map className="h-6 w-6 text-brand-primary" />
                      </div>
                      Mission Roadmap
                    </CardTitle>
                    <div className="px-4 py-1.5 bg-brand-primary text-white rounded-full shadow-lg shadow-brand-primary/20">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">Level 04</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8 md:p-10">
                  <div className="relative">
                    <div className="absolute left-[23px] top-6 bottom-6 w-1 bg-gradient-to-b from-brand-primary via-brand-secondary/20 to-transparent rounded-full" />

                    <div className="space-y-12">
                      {MOCK_DASHBOARD_DATA.roadmap.map((milestone) => (
                        <div key={milestone.id} className="relative pl-16">
                          {/* Animated Node */}
                          <div className={`absolute left-0 top-1.5 w-12 h-12 rounded-2xl border-2 flex items-center justify-center z-10 transition-all duration-500 ${
                            milestone.status === 'completed' ? 'bg-brand-primary border-brand-primary shadow-xl shadow-brand-primary/30 rotate-12' :
                            milestone.status === 'active' ? 'bg-white dark:bg-zinc-900 border-brand-primary scale-110' : 'bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-white/5'
                          }`}>
                            {milestone.status === 'completed' ? (
                              <Award className="h-6 w-6 text-white" />
                            ) : (
                              <div className={`w-3 h-3 rounded-full ${milestone.status === 'active' ? 'bg-brand-primary animate-pulse' : 'bg-zinc-300 dark:bg-zinc-800'}`} />
                            )}
                          </div>

                          <div className={`p-8 rounded-[2rem] border transition-all duration-500 group ${
                            milestone.status === 'active' ? 'bg-brand-primary/[0.03] dark:bg-brand-primary/5 border-brand-primary/20 shadow-xl' : 'bg-zinc-50/50 dark:bg-white/[0.02] border-zinc-100 dark:border-white/5'
                          }`}>
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4">
                              <h3 className={`text-xl md:text-2xl font-black tracking-tight transition-colors ${milestone.status === 'locked' ? 'text-zinc-400 dark:text-zinc-600' : 'dark:text-white text-zinc-900'}`}>
                                {milestone.title}
                              </h3>
                              {milestone.date && (
                                <span className="text-[10px] font-black dark:text-zinc-400 text-zinc-500 flex items-center gap-2 bg-white dark:bg-black/40 px-3 py-1.5 rounded-xl border border-zinc-100 dark:border-white/10 uppercase tracking-widest">
                                  <Clock className="h-3.5 w-3.5" />
                                  {milestone.date}
                                </span>
                              )}
                            </div>
                            <p className="text-base dark:text-zinc-400 text-zinc-500 leading-relaxed font-bold">
                              {milestone.description}
                            </p>

                            {milestone.status === 'active' && (
                              <div className="mt-8 flex flex-wrap gap-4">
                                <Button
                                  onClick={() => setIsMilestoneModalOpen(true)}
                                  size="lg"
                                  className="bg-brand-primary hover:bg-brand-primary/90 h-12 px-8 rounded-2xl font-black text-sm text-white shadow-xl shadow-brand-primary/20 active:scale-95 transition-all"
                                >
                                  Deploy Mission
                                </Button>
                                <Button
                                  onClick={() => setIsMilestoneModalOpen(true)}
                                  size="lg"
                                  variant="outline"
                                  className="border-zinc-200 dark:border-white/10 h-12 px-8 rounded-2xl font-black text-sm bg-white dark:bg-white/5 dark:text-white text-zinc-900 hover:bg-zinc-50 dark:hover:bg-white/10"
                                >
                                  Resources
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

          <div className="lg:col-span-4 space-y-8">
            {/* AI Insights - Colorful Widget */}
            <motion.div variants={itemVariants}>
              <Card className="glass border-zinc-100 dark:border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/20 blur-[60px] rounded-full" />
                <CardHeader className="p-8 pb-4 relative">
                  <CardTitle className="text-xl font-black dark:text-white text-zinc-900 flex items-center gap-3">
                    <Sparkles className="h-6 w-6 text-brand-primary" />
                    Neural Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-4 relative">
                  <div className="space-y-5">
                    {MOCK_DASHBOARD_DATA.recommendations.map((rec) => (
                      <div
                        key={rec.id}
                        onClick={() => setIsMilestoneModalOpen(true)}
                        className="group p-5 rounded-2xl border border-zinc-100 dark:border-white/5 bg-zinc-50 dark:bg-white/5 hover:border-brand-primary/40 hover:bg-brand-primary/[0.02] transition-all cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-3">
                           <div className="px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-white/10 text-brand-primary text-[9px] font-black uppercase tracking-[0.2em]">
                             {rec.type}
                           </div>
                           <div className="text-[10px] font-black text-brand-vibrant">
                             {rec.matchScore}% Match
                           </div>
                        </div>
                        <h4 className="dark:text-white text-zinc-900 text-base font-black mb-2 group-hover:text-brand-primary transition-colors tracking-tight">{rec.title}</h4>
                        <p className="text-xs dark:text-zinc-400 text-zinc-500 leading-relaxed font-bold line-clamp-2">{rec.description}</p>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => setIsMilestoneModalOpen(true)}
                    variant="ghost"
                    className="w-full mt-6 text-brand-primary hover:text-brand-primary/80 hover:bg-brand-primary/10 h-12 rounded-2xl font-black text-xs transition-all"
                  >
                    Calibrate Matches
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Achievement Preview Module */}
            <motion.div variants={itemVariants} className="p-8 rounded-[2.5rem] bg-zinc-950 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-between group cursor-pointer shadow-2xl overflow-hidden relative">
               <div className="absolute top-0 right-0 w-24 h-24 bg-brand-vibrant/20 blur-3xl rounded-full" />
               <div className="relative z-10">
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-1">Upcoming Reward</p>
                 <h4 className="text-xl font-black tracking-tight">System Architect</h4>
               </div>
               <div className="relative z-10 h-14 w-14 rounded-2xl bg-white/10 dark:bg-zinc-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                 <Trophy className="h-7 w-7 text-brand-vibrant" />
               </div>
            </motion.div>

            {/* Activity Stream */}
            <motion.div variants={itemVariants}>
              <Card className="glass border-zinc-100 dark:border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-xl font-black dark:text-white text-zinc-900 flex items-center gap-3">
                    <TrendingUp className="h-6 w-6 text-brand-secondary" />
                    Activity Stream
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-4">
                  <div className="space-y-8">
                    {MOCK_DASHBOARD_DATA.activities.map((act) => (
                      <div key={act.id} className="flex gap-5 relative">
                        <div className="relative">
                          <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5 shadow-sm ${
                            act.type === 'skill' ? 'text-blue-500' :
                            act.type === 'milestone' ? 'text-brand-primary' : 'text-emerald-500'
                          }`}>
                            {act.type === 'skill' ? <Award className="h-5 w-5" /> :
                             act.type === 'milestone' ? <Target className="h-5 w-5" /> : <Users className="h-5 w-5" />}
                          </div>
                          {/* Pulse indicator for the most recent one */}
                          {act.id === MOCK_DASHBOARD_DATA.activities[0].id && (
                             <div className="absolute -top-1 -right-1 h-3 w-3 bg-brand-vibrant rounded-full border-2 border-white dark:border-zinc-900 animate-pulse" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-black dark:text-white text-zinc-900 leading-tight mb-1 tracking-tight">{act.title}</p>
                          <p className="text-[9px] dark:text-zinc-500 text-zinc-400 font-black uppercase tracking-[0.2em]">{act.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => setIsPathwaysModalOpen(true)}
                    variant="outline"
                    className="w-full mt-10 border-zinc-200 dark:border-white/10 dark:text-zinc-400 text-zinc-500 hover:text-brand-primary hover:border-brand-primary/40 rounded-2xl h-12 font-black text-xs transition-all"
                  >
                    Adjust Trajectory
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
        title="Mission Calibration"
        description="Fine-tune your career trajectory using Neural Intelligence."
      >
        <div className="space-y-8">
          <div className="space-y-5">
             <div className="p-6 rounded-[2rem] border border-zinc-100 dark:border-white/5 bg-zinc-50 dark:bg-white/5">
                <p className="text-[10px] font-black dark:text-white text-zinc-900 mb-4 uppercase tracking-[0.2em]">Focus Domains</p>
                <div className="flex flex-wrap gap-2.5">
                  {["Software", "Product Design", "AI Strategy"].map(tag => (
                    <div key={tag} className="px-4 py-2 rounded-xl bg-white dark:bg-zinc-900 text-[11px] font-black dark:text-zinc-400 text-zinc-600 border border-zinc-100 dark:border-white/10 uppercase tracking-widest group cursor-pointer hover:border-brand-primary hover:text-brand-primary transition-all">
                      {tag}
                    </div>
                  ))}
                </div>
             </div>
             <div className="p-6 rounded-[2rem] border border-zinc-100 dark:border-white/5 bg-zinc-50 dark:bg-white/5">
                <p className="text-[10px] font-black dark:text-white text-zinc-900 mb-5 uppercase tracking-[0.2em]">Intensity Profile</p>
                <div className="h-2 w-full bg-zinc-200 dark:bg-white/5 rounded-full overflow-hidden mb-4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "66%" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full"
                  />
                </div>
                <div className="flex justify-between">
                  <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Casual</span>
                  <span className="text-[9px] font-black text-brand-primary uppercase tracking-widest">Intensive</span>
                </div>
             </div>
          </div>
          <Button className="w-full h-16 bg-brand-primary hover:bg-brand-primary/90 rounded-2xl font-black text-lg text-white shadow-2xl shadow-brand-primary/30 transition-all active:scale-95" onClick={() => setIsPathwaysModalOpen(false)}>
            Update Trajectory
          </Button>
        </div>
      </PolishedModal>

      <PolishedModal
        isOpen={isMilestoneModalOpen}
        onClose={() => setIsMilestoneModalOpen(false)}
        title="Mission Briefing"
        description="Deep dive into your next high-impact objective."
      >
        <div className="space-y-8">
          <div className="p-8 rounded-[2.5rem] border border-zinc-100 dark:border-white/5 bg-zinc-50 dark:bg-white/5 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-primary/10 blur-[80px] rounded-full" />
            <div className="flex items-center gap-6 mb-8 relative">
              <div className="h-16 w-16 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center shadow-inner">
                <BookOpen className="h-8 w-8 text-brand-primary" />
              </div>
              <div>
                <h4 className="text-2xl font-black dark:text-white text-zinc-900 tracking-tight">Advanced Architecture</h4>
                <p className="text-xs text-brand-primary font-black uppercase tracking-[0.2em]">6 Hour Session</p>
              </div>
            </div>
            <p className="text-lg dark:text-zinc-400 text-zinc-600 leading-relaxed font-bold mb-10">
              Master the architectural patterns used by the world&apos;s most scalable platforms.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {["Microservices", "CQRS Pattern", "Event Sourcing", "Scalability"].map(item => (
                <div key={item} className="flex items-center gap-3 text-[10px] font-black dark:text-zinc-400 text-zinc-500 uppercase tracking-widest bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-100 dark:border-white/10 group hover:border-brand-primary transition-all">
                  <div className="h-1.5 w-1.5 rounded-full bg-brand-primary group-hover:scale-150 transition-transform" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <Button className="w-full h-16 bg-brand-primary hover:bg-brand-primary/90 rounded-2xl font-black text-lg text-white shadow-2xl shadow-brand-primary/30 transition-all active:scale-95" onClick={() => setIsMilestoneModalOpen(false)}>
            Initiate Deployment
          </Button>
        </div>
      </PolishedModal>
    </div>
  );
}
