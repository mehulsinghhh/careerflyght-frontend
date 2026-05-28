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
  LucideIcon
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
    <div className="min-h-screen bg-background pt-24 pb-20 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] right-[5%] w-[40%] h-[40%] bg-brand-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] left-[5%] w-[40%] h-[40%] bg-brand-secondary/5 blur-[120px] rounded-full" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto max-w-7xl relative z-10"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 text-brand-primary text-[11px] font-bold mb-4 uppercase tracking-[0.2em]">
              <div className="h-1 w-6 bg-brand-primary rounded-full" />
              Member Hub
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              Welcome back, <span className="bg-gradient-to-r from-brand-primary to-violet-400 bg-clip-text text-transparent">{user.name.split(' ')[0]}</span>.
            </h1>
            <p className="text-muted-foreground mt-3 font-normal flex items-center gap-2 text-base">
              <Calendar className="h-4 w-4 opacity-50" />
              May 24, 2024 &mdash; You&apos;re on a {MOCK_DASHBOARD_DATA.streak.currentStreak} day streak
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-xl">
            <div className="h-10 w-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <Flame className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Streak</p>
              <p className="text-xl font-bold text-white leading-none">{MOCK_DASHBOARD_DATA.streak.currentStreak} Days</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {MOCK_DASHBOARD_DATA.stats.map((stat, i) => {
                const Icon = iconMap[stat.icon];
                return (
                  <GlowCard key={i} className="p-6 glass-card border-white/[0.08]">
                    <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 border border-white/5">
                      <Icon className="h-5 w-5 text-brand-primary" />
                    </div>
                    <p className="text-2xl font-bold text-white tracking-tight">
                      <AnimatedCounter value={stat.value} />
                    </p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">{stat.label}</p>
                  </GlowCard>
                );
              })}
            </div>

            {/* Roadmap */}
            <motion.div variants={itemVariants}>
              <Card className="glass-card border-white/10 overflow-hidden rounded-[2.5rem] shadow-2xl">
                <CardHeader className="border-b border-white/5 p-8">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold text-white flex items-center gap-3">
                      <Map className="h-5 w-5 text-brand-primary" />
                      Learning Roadmap
                    </CardTitle>
                    <div className="px-3 py-1 bg-brand-primary/10 border border-brand-primary/20 rounded-full">
                      <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">Junior Path</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="relative">
                    <div className="absolute left-[19px] top-4 bottom-4 w-px bg-white/5" />

                    <div className="space-y-10">
                      {MOCK_DASHBOARD_DATA.roadmap.map((milestone) => (
                        <div key={milestone.id} className="relative pl-12">
                          <div className={`absolute left-0 top-1.5 w-10 h-10 rounded-full border border-black flex items-center justify-center z-10 ${
                            milestone.status === 'completed' ? 'bg-brand-primary shadow-lg shadow-brand-primary/20' :
                            milestone.status === 'active' ? 'bg-background border-brand-primary' : 'bg-zinc-900 border-white/5'
                          }`}>
                            {milestone.status === 'completed' ? (
                              <Award className="h-5 w-5 text-white" />
                            ) : (
                              <div className={`w-2 h-2 rounded-full ${milestone.status === 'active' ? 'bg-brand-primary animate-pulse' : 'bg-white/10'}`} />
                            )}
                          </div>

                          <div className={`p-6 rounded-2xl border transition-all duration-300 ${
                            milestone.status === 'active' ? 'bg-brand-primary/5 border-brand-primary/20' : 'bg-white/[0.02] border-white/5'
                          }`}>
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                              <h3 className={`text-base font-bold tracking-tight ${milestone.status === 'locked' ? 'text-muted-foreground/50' : 'text-white'}`}>
                                {milestone.title}
                              </h3>
                              {milestone.date && (
                                <span className="text-[10px] font-bold text-muted-foreground flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-lg border border-white/5 uppercase tracking-wider">
                                  <Clock className="h-3 w-3" />
                                  {milestone.date}
                                </span>
                              )}
                            </div>
                            <p className="text-base text-muted-foreground leading-relaxed font-normal">
                              {milestone.description}
                            </p>

                            {milestone.status === 'active' && (
                              <div className="mt-6 flex flex-wrap gap-3">
                                <Button
                                  onClick={() => setIsMilestoneModalOpen(true)}
                                  size="sm"
                                  className="bg-brand-primary hover:bg-brand-primary/90 h-9 px-5 rounded-xl font-semibold text-xs"
                                >
                                  Continue Mission
                                </Button>
                                <Button
                                  onClick={() => setIsMilestoneModalOpen(true)}
                                  size="sm"
                                  variant="outline"
                                  className="border-white/10 h-9 px-5 rounded-xl font-semibold text-xs bg-white/5"
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

          <div className="space-y-8">
            {/* Recommendations */}
            <motion.div variants={itemVariants}>
              <Card className="glass-card border-white/10 rounded-[2rem] overflow-hidden shadow-xl">
                <CardHeader className="p-6 pb-2">
                  <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                    <Sparkles className="h-4.5 w-4.5 text-brand-primary" />
                    AI Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-4">
                  <div className="space-y-4">
                    {MOCK_DASHBOARD_DATA.recommendations.map((rec) => (
                      <div
                        key={rec.id}
                        onClick={() => setIsMilestoneModalOpen(true)}
                        className="group p-4 rounded-xl border border-white/5 bg-white/5 hover:border-brand-primary/30 transition-all cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-2">
                           <div className="px-2 py-0.5 rounded-md bg-white/5 text-muted-foreground text-[9px] font-bold uppercase tracking-wider">
                             {rec.type}
                           </div>
                           <div className="text-[9px] font-bold text-brand-primary">
                             {rec.matchScore}% Match
                           </div>
                        </div>
                        <h4 className="text-white text-sm font-bold mb-1 group-hover:text-brand-primary transition-colors tracking-tight">{rec.title}</h4>
                        <p className="text-[11px] text-muted-foreground leading-relaxed font-normal line-clamp-2">{rec.description}</p>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => setIsMilestoneModalOpen(true)}
                    variant="ghost"
                    className="w-full mt-4 text-brand-primary hover:text-brand-primary/80 hover:bg-brand-primary/5 rounded-xl font-semibold text-xs"
                  >
                    View All Matches
                    <ChevronRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Activity */}
            <motion.div variants={itemVariants}>
              <Card className="glass-card border-white/10 rounded-[2rem] overflow-hidden shadow-xl">
                <CardHeader className="p-6 pb-2">
                  <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                    <TrendingUp className="h-4.5 w-4.5 text-brand-primary" />
                    Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-4">
                  <div className="space-y-6">
                    {MOCK_DASHBOARD_DATA.activities.map((act) => (
                      <div key={act.id} className="flex gap-4">
                        <div className="relative">
                          <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 bg-white/5 border border-white/5 ${
                            act.type === 'skill' ? 'text-blue-400' :
                            act.type === 'milestone' ? 'text-brand-primary' : 'text-emerald-400'
                          }`}>
                            {act.type === 'skill' ? <Award className="h-4 w-4" /> :
                             act.type === 'milestone' ? <Target className="h-4 w-4" /> : <Users className="h-4 w-4" />}
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-bold text-white leading-tight mb-1 tracking-tight">{act.title}</p>
                          <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">{act.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => setIsPathwaysModalOpen(true)}
                    variant="outline"
                    className="w-full mt-8 border-white/10 text-muted-foreground hover:text-white hover:bg-white/5 rounded-xl font-semibold text-xs"
                  >
                    Customize Path
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
        title="Path Calibration"
        description="Fine-tune your career trajectory using AI."
      >
        <div className="space-y-6">
          <div className="space-y-4">
             <div className="p-5 rounded-2xl border border-white/5 bg-white/5">
                <p className="text-xs font-bold text-white mb-3 uppercase tracking-widest">Industry Focus</p>
                <div className="flex flex-wrap gap-2">
                  {["Software", "Product Design", "AI Strategy"].map(tag => (
                    <div key={tag} className="px-3 py-1.5 rounded-lg bg-white/5 text-[10px] font-bold text-muted-foreground border border-white/10 uppercase tracking-wider">{tag}</div>
                  ))}
                </div>
             </div>
             <div className="p-5 rounded-2xl border border-white/5 bg-white/5">
                <p className="text-xs font-bold text-white mb-3 uppercase tracking-widest">Pace Calibration</p>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-brand-primary rounded-full" />
                </div>
                <div className="flex justify-between mt-3">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Casual</span>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Intensive</span>
                </div>
             </div>
          </div>
          <Button className="w-full h-14 bg-brand-primary hover:bg-brand-primary/90 rounded-xl font-semibold text-base" onClick={() => setIsPathwaysModalOpen(false)}>
            Update Trajectory
          </Button>
        </div>
      </PolishedModal>

      <PolishedModal
        isOpen={isMilestoneModalOpen}
        onClose={() => setIsMilestoneModalOpen(false)}
        title="Mission Briefing"
        description="Deep dive into your next learning objective."
      >
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-white/5 bg-white/5">
            <div className="flex items-center gap-5 mb-6">
              <div className="h-12 w-12 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-brand-primary" />
              </div>
              <div>
                <h4 className="text-white font-bold tracking-tight">Advanced Systems Design</h4>
                <p className="text-xs text-muted-foreground font-medium">Estimated time: 6 hours</p>
              </div>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed font-normal mb-8">
              Master high-level architectural patterns for scalable distributed systems.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {["Microservices", "CQRS Pattern", "Event Sourcing", "Scalability"].map(item => (
                <div key={item} className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-white/5 p-2 rounded-lg border border-white/5">
                  <div className="h-1 w-1 rounded-full bg-brand-primary" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <Button className="w-full h-14 bg-brand-primary hover:bg-brand-primary/90 rounded-xl font-semibold text-base" onClick={() => setIsMilestoneModalOpen(false)}>
            Initiate Lesson
          </Button>
        </div>
      </PolishedModal>
    </div>
  );
}
