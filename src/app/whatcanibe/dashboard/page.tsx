"use client";
import { motion, type Variants } from "framer-motion";
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

  return () => {
    window.removeEventListener("auth-change", syncUser);
  };
}, [router]);
  

if (!user) return null;

  if (!mounted || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
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
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[5%] right-[10%] w-[30%] h-[30%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[5%] left-[10%] w-[30%] h-[30%] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto max-w-7xl"
      >
        {/* Welcome Section */}
        <motion.div variants={itemVariants} className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-primary text-xs font-black mb-4 uppercase tracking-[0.3em]">
              <div className="h-1 w-8 bg-primary rounded-full" />
              Member Dashboard
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tight">
              Welcome back, <span className="bg-gradient-to-r from-primary via-blue-500 to-emerald-400 bg-clip-text text-transparent">{user.name.split(' ')[0]}</span>!
            </h1>
            <p className="text-muted-foreground mt-4 font-bold text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              May 24, 2024 &mdash; You&apos;re on a {MOCK_DASHBOARD_DATA.streak.currentStreak} day streak
            </p>
          </div>

          <div className="flex items-center gap-4 bg-card border border-border p-5 rounded-2xl shadow-xl backdrop-blur-md">
            <div className="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <Flame className="h-7 w-7 text-orange-500" />
            </div>
            <div>
              <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">Current Streak</p>
              <p className="text-2xl font-black text-foreground leading-none mt-1">{MOCK_DASHBOARD_DATA.streak.currentStreak} Days</p>
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
                  <GlowCard key={i} className="p-6 border-border bg-card/50">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-3xl font-black text-foreground">
                      <AnimatedCounter value={stat.value} />
                    </p>
                    <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mt-2">{stat.label}</p>
                  </GlowCard>
                );
              })}
            </div>

            {/* Vertical Roadmap */}
            <motion.div variants={itemVariants}>
              <Card className="bg-card border-border overflow-hidden rounded-[2.5rem] shadow-xl">
                <CardHeader className="border-b border-border p-10">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-black text-foreground flex items-center gap-4">
                      <Map className="h-7 w-7 text-primary" />
                      Learning Roadmap
                    </CardTitle>
                    <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
                      <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                      <span className="text-xs font-black text-primary uppercase tracking-widest">Junior Full-Stack Path</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-10">
                  <div className="relative">
                    {/* The line */}
                    <div className="absolute left-[23px] top-6 bottom-6 w-1 bg-gradient-to-b from-primary via-blue-500/50 to-muted" />

                    <div className="space-y-16">
                      {MOCK_DASHBOARD_DATA.roadmap.map((milestone) => (
                        <div key={milestone.id} className="relative pl-16">
                          {/* Dot */}
                          <div className={`absolute left-0 top-1 w-12 h-12 rounded-full border-4 border-background flex items-center justify-center z-10 shadow-lg ${
                            milestone.status === 'completed' ? 'bg-primary' :
                            milestone.status === 'active' ? 'bg-background border-primary' : 'bg-muted border-border'
                          }`}>
                            {milestone.status === 'completed' ? (
                              <Award className="h-6 w-6 text-primary-foreground" />
                            ) : (
                              <div className={`w-3 h-3 rounded-full ${milestone.status === 'active' ? 'bg-primary animate-pulse' : 'bg-muted-foreground/30'}`} />
                            )}
                          </div>

                          <div className={`p-8 rounded-3xl border transition-all duration-500 ${
                            milestone.status === 'active' ? 'bg-primary/5 border-primary/30 shadow-xl shadow-primary/5 ring-1 ring-primary/10' : 'bg-card/50 border-border hover:border-border/80'
                          }`}>
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                              <h3 className={`text-xl font-black ${milestone.status === 'locked' ? 'text-muted-foreground/50' : 'text-foreground'}`}>
                                {milestone.title}
                              </h3>
                              {milestone.date && (
                                <span className="text-xs font-black text-muted-foreground flex items-center gap-1.5 bg-muted/50 px-3 py-1.5 rounded-full">
                                  <Clock className="h-4 w-4" />
                                  {milestone.date}
                                </span>
                              )}
                            </div>
                            <p className="text-base text-muted-foreground font-medium leading-relaxed max-w-2xl">
                              {milestone.description}
                            </p>

                            {milestone.status === 'active' && (
                              <div className="mt-8 flex flex-wrap gap-4">
                                <Button
                                  onClick={() => setIsMilestoneModalOpen(true)}
                                  size="lg"
                                  className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8 rounded-2xl font-black text-base shadow-lg shadow-primary/20"
                                >
                                  Continue Learning
                                </Button>
                                <Button
                                  onClick={() => setIsMilestoneModalOpen(true)}
                                  size="lg"
                                  variant="outline"
                                  className="border-border hover:border-primary/30 h-12 px-8 rounded-2xl font-black text-base bg-muted/50"
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
              <Card className="bg-card border-border rounded-[2.5rem] overflow-hidden shadow-lg">
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-xl font-black text-foreground flex items-center gap-3">
                    <Sparkles className="h-6 w-6 text-primary" />
                    AI Matches
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-4">
                  <div className="space-y-6">
                    {MOCK_DASHBOARD_DATA.recommendations.map((rec) => (
                      <div
                        key={rec.id}
                        onClick={() => setIsMilestoneModalOpen(true)}
                        className="group p-5 rounded-3xl border border-border bg-muted/30 hover:border-primary/30 hover:bg-card transition-all cursor-pointer shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-3">
                           <div className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
                             {rec.type}
                           </div>
                           <div className="text-[10px] font-black text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                             {rec.matchScore}% Match
                           </div>
                        </div>
                        <h4 className="text-foreground font-black text-lg mb-2 group-hover:text-primary transition-colors">{rec.title}</h4>
                        <p className="text-sm text-muted-foreground font-medium line-clamp-2 leading-relaxed">{rec.description}</p>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => setIsMilestoneModalOpen(true)}
                    variant="ghost"
                    className="w-full mt-6 text-primary hover:text-primary/80 hover:bg-primary/5 rounded-2xl font-black text-base h-12"
                  >
                    View All Insights
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Activity Timeline */}
            <motion.div variants={itemVariants}>
              <Card className="bg-card border-border rounded-[2.5rem] overflow-hidden shadow-lg">
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-xl font-black text-foreground flex items-center gap-3">
                    <TrendingUp className="h-6 w-6 text-primary" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-4">
                  <div className="space-y-8">
                    {MOCK_DASHBOARD_DATA.activities.map((act) => (
                      <div key={act.id} className="flex gap-5">
                        <div className="relative">
                          <div className={`h-10 w-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                            act.type === 'skill' ? 'bg-blue-500/10 text-blue-500' :
                            act.type === 'milestone' ? 'bg-primary/10 text-primary' : 'bg-emerald-500/10 text-emerald-500'
                          }`}>
                            {act.type === 'skill' ? <Award className="h-5 w-5" /> :
                             act.type === 'milestone' ? <Target className="h-5 w-5" /> : <Users className="h-5 w-5" />}
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-base font-black text-foreground leading-tight mb-1.5">{act.title}</p>
                          <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{act.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => setIsPathwaysModalOpen(true)}
                    variant="outline"
                    className="w-full mt-10 border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-2xl font-black text-base h-12"
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
        <div className="space-y-8 py-4">
          <div className="space-y-6">
             <div className="p-6 rounded-2xl border border-border bg-muted/30">
                <p className="text-base font-black text-foreground mb-4">Focus Industry</p>
                <div className="flex flex-wrap gap-2.5">
                  {["Software Engineering", "Product Design", "AI & Data", "Cybersecurity"].map(tag => (
                    <div key={tag} className="px-4 py-1.5 rounded-full bg-card text-xs font-bold text-muted-foreground border border-border hover:border-primary/30 transition-colors cursor-pointer">{tag}</div>
                  ))}
                </div>
             </div>
             <div className="p-6 rounded-2xl border border-border bg-muted/30">
                <p className="text-base font-black text-foreground mb-4">Pace</p>
                <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-primary rounded-full shadow-lg" />
                </div>
                <div className="flex justify-between mt-3">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Casual</span>
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Intensive</span>
                </div>
             </div>
          </div>
          <Button className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl font-black text-lg shadow-lg shadow-primary/20" onClick={() => setIsPathwaysModalOpen(false)}>
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
        <div className="space-y-8 py-4">
          <div className="p-8 rounded-3xl border border-border bg-muted/30">
            <div className="flex items-center gap-5 mb-6">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center shadow-sm">
                <BookOpen className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h4 className="text-xl font-black text-foreground tracking-tight">Advanced React Patterns</h4>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Estimated time: 4 hours</p>
              </div>
            </div>
            <p className="text-base text-muted-foreground font-medium leading-relaxed mb-8">
              Master higher-order components, render props, and advanced hook patterns to build highly reusable UI architectures.
            </p>
            <div className="space-y-4">
              {["Custom Hooks Mastery", "Advanced Context API", "Compound Component Architecture"].map(item => (
                <div key={item} className="flex items-center gap-3 text-sm font-bold text-foreground">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <Button className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl font-black text-lg shadow-lg shadow-primary/20" onClick={() => setIsMilestoneModalOpen(false)}>
            Launch Lesson
          </Button>
        </div>
      </PolishedModal>
    </div>
  );
}
