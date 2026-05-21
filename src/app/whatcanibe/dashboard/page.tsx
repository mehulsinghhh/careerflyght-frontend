"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Target,
  Award,
  TrendingUp,
  Map,
  Flame,
  Sparkles,
  ChevronRight,
  Users,
  Bookmark,
  LucideIcon
} from "lucide-react";
import { motion } from "framer-motion";
import { MOCK_DASHBOARD_DATA } from "@/constants/dashboard";
import { GlowCard } from "@/components/ui/glow-card";
import { PolishedModal } from "@/components/ui/polished-modal";
import { ProgressRing } from "@/components/ui/progress-ring";

const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  Award,
  Users,
  Bookmark
};

export default function DashboardPage() {
  const [isPathwaysModalOpen, setIsPathwaysModalOpen] = useState(false);
  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);


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
        <div className="absolute top-[5%] right-[10%] w-[30%] h-[30%] bg-violet-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[5%] left-[10%] w-[30%] h-[30%] bg-purple-600/5 blur-[120px] rounded-full" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto max-w-7xl"
      >
        {/* Welcome Section */}
        <motion.div variants={itemVariants} className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 text-violet-400 text-[10px] font-bold mb-4 uppercase tracking-[0.2em]">
              <div className="h-1 w-8 bg-violet-500 rounded-full" />
              Member Console
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Welcome back, <span className="bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">Member</span>
            </h1>
            <p className="text-gray-500 mt-3 font-medium flex items-center gap-2 text-sm md:text-base">
              <Sparkles className="h-4 w-4 text-violet-500" />
              Your career trajectory is optimizing...
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/[0.03] border border-white/5 p-5 rounded-[2rem] backdrop-blur-md shadow-2xl">
            <div className="h-12 w-12 rounded-2xl bg-violet-500/20 flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-violet-500/20 animate-pulse" />
              <Flame className="h-7 w-7 text-violet-400 relative z-10" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Activity Level</p>
              <div className="flex items-center gap-1.5 mt-2">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className={`h-2 w-5 rounded-full transition-all duration-1000 ${i <= 3 ? 'bg-violet-500 shadow-[0_0_12px_rgba(139,92,246,0.6)]' : 'bg-white/10'}`} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-10">
            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {MOCK_DASHBOARD_DATA.stats.map((stat, i) => {
                const Icon = iconMap[stat.icon];
                return (
                  <GlowCard key={i} className="p-6 border-white/5 bg-white/[0.02] rounded-[1.5rem]">
                    <div className="flex items-center justify-between mb-5">
                      <div className="h-10 w-10 rounded-xl bg-violet-600/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-violet-400" />
                      </div>
                      <ProgressRing progress={30 + (i * 15)} size={32} strokeWidth={2} />
                    </div>
                    <div className="h-2 w-12 bg-white/5 rounded-full mb-3" />
                    <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest leading-tight">{stat.label}</p>
                  </GlowCard>
                );
              })}
            </div>

            {/* Vertical Roadmap */}
            <motion.div variants={itemVariants}>
              <Card className="bg-[#050505] border-white/5 overflow-hidden rounded-[2.5rem] shadow-2xl">
                <CardHeader className="border-b border-white/5 p-8 md:p-10">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl md:text-2xl font-bold text-white flex items-center gap-4">
                      <Map className="h-7 w-7 text-violet-400" />
                      Dynamic Roadmap
                    </CardTitle>
                    <div className="flex items-center gap-3 px-4 py-1.5 bg-violet-500/10 border border-violet-500/20 rounded-full">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-violet-500"></span>
                      </span>
                      <span className="text-[10px] font-bold text-violet-400 uppercase tracking-[0.1em]">Live Sync</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8 md:p-10">
                  <div className="relative">
                    {/* Animated Line */}
                    <div className="absolute left-[19px] top-4 bottom-4 w-[1px] bg-white/5" />
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "60%" }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                      className="absolute left-[19px] top-4 w-[1px] bg-gradient-to-b from-violet-500 to-purple-500 shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                    />

                    <div className="space-y-14">
                      {MOCK_DASHBOARD_DATA.roadmap.map((milestone) => (
                        <div key={milestone.id} className="relative pl-14">
                          {/* Node */}
                          <div className={`absolute left-0 top-1 w-10 h-10 rounded-full border border-white/5 flex items-center justify-center z-10 transition-all duration-700 ${
                            milestone.status === 'completed' ? 'bg-violet-600 shadow-[0_0_25px_rgba(139,92,246,0.4)] scale-110' :
                            milestone.status === 'active' ? 'bg-black border-violet-500/50 ring-4 ring-violet-500/10' : 'bg-[#111]'
                          }`}>
                            {milestone.status === 'completed' ? (
                              <Award className="h-5 w-5 text-white" />
                            ) : (
                              <div className={`w-2 h-2 rounded-full ${milestone.status === 'active' ? 'bg-violet-400 shadow-[0_0_12px_#8B5CF6] animate-pulse' : 'bg-white/10'}`} />
                            )}
                          </div>

                          <motion.div
                            whileHover={{ x: 8 }}
                            className={`p-7 rounded-[2rem] border transition-all duration-500 group cursor-pointer shadow-sm hover:shadow-2xl ${
                              milestone.status === 'active' ? 'bg-violet-500/[0.04] border-violet-500/20' : 'bg-white/[0.01] border-white/5'
                            }`}
                            onClick={() => setIsMilestoneModalOpen(true)}
                          >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                              <h3 className={`text-xl font-bold transition-colors ${milestone.status === 'locked' ? 'text-gray-600' : 'text-white group-hover:text-violet-400'}`}>
                                {milestone.title}
                              </h3>
                              <div className="flex items-center gap-2">
                                <div className="h-1 w-8 bg-white/5 rounded-full overflow-hidden">
                                  {milestone.status === 'completed' && <div className="h-full w-full bg-emerald-500" />}
                                  {milestone.status === 'active' && <motion.div animate={{ x: [-20, 40] }} transition={{ repeat: Infinity, duration: 1 }} className="h-full w-1/2 bg-violet-500" />}
                                </div>
                              </div>
                            </div>
                            <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-xl">
                              {milestone.description}
                            </p>

                            {milestone.status === 'active' && (
                              <div className="mt-8 flex flex-wrap gap-4">
                                <Button size="sm" className="bg-violet-600 hover:bg-violet-700 h-10 px-6 rounded-xl font-bold shadow-xl shadow-violet-600/20 text-xs uppercase tracking-widest">
                                  Resume Path
                                </Button>
                                <Button size="sm" variant="outline" className="border-white/10 h-10 px-6 rounded-xl font-bold bg-white/5 hover:bg-white/10 transition-colors text-xs uppercase tracking-widest">
                                  Curated Stack
                                </Button>
                              </div>
                            )}
                          </motion.div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-10">
            {/* AI Recommendations */}
            <motion.div variants={itemVariants}>
              <Card className="bg-[#050505] border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-lg md:text-xl font-bold text-white flex items-center gap-3">
                    <Sparkles className="h-6 w-6 text-violet-400" />
                    Optimized Matches
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-2">
                  <div className="space-y-5">
                    {MOCK_DASHBOARD_DATA.recommendations.map((rec) => (
                      <div
                        key={rec.id}
                        onClick={() => setIsMilestoneModalOpen(true)}
                        className="group p-5 rounded-[1.5rem] border border-white/5 bg-white/[0.01] hover:border-violet-500/30 transition-all cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-4">
                           <div className="px-3 py-1 rounded-full bg-white/5 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                             {rec.type}
                           </div>
                           <div className="flex gap-1.5">
                             {[1, 2, 3].map(i => <div key={i} className="h-1.5 w-4 rounded-full bg-violet-500/40 shadow-[0_0_8px_rgba(139,92,246,0.3)]" />)}
                           </div>
                        </div>
                        <h4 className="text-white font-bold mb-1 text-lg group-hover:text-violet-400 transition-colors">{rec.title}</h4>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mt-4">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "85%" }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                            className="h-full bg-gradient-to-r from-violet-600 to-purple-600"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => setIsMilestoneModalOpen(true)}
                    variant="ghost"
                    className="w-full mt-6 text-violet-400 hover:text-violet-300 hover:bg-violet-500/5 rounded-2xl font-bold h-12 text-sm uppercase tracking-widest"
                  >
                    View Intelligence
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Activity Timeline */}
            <motion.div variants={itemVariants}>
              <Card className="bg-[#050505] border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-lg md:text-xl font-bold text-white flex items-center gap-3">
                    <TrendingUp className="h-6 w-6 text-violet-400" />
                    System Logs
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-2">
                  <div className="space-y-8">
                    {MOCK_DASHBOARD_DATA.activities.map((act) => (
                      <div key={act.id} className="flex gap-5">
                        <div className="relative">
                          <div className={`h-10 w-10 rounded-2xl flex items-center justify-center shrink-0 border border-white/5 shadow-inner ${
                            act.type === 'skill' ? 'bg-blue-500/10 text-blue-400' :
                            act.type === 'milestone' ? 'bg-violet-500/10 text-violet-400' : 'bg-purple-500/10 text-purple-400'
                          }`}>
                            {act.type === 'skill' ? <Award className="h-5 w-5" /> :
                             act.type === 'milestone' ? <Target className="h-5 w-5" /> : <Users className="h-5 w-5" />}
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-300 leading-tight mb-2">{act.title}</p>
                          <div className="h-2 w-20 bg-white/5 rounded-full animate-pulse" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-10 flex justify-end">
                    <Button
                      onClick={() => setIsPathwaysModalOpen(true)}
                      className="group relative px-8 h-14 bg-black border border-violet-500/30 text-violet-400 hover:text-white rounded-[1.25rem] font-bold transition-all duration-500 overflow-hidden text-sm uppercase tracking-widest"
                    >
                      <div className="absolute inset-0 bg-violet-600 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
                      <span className="relative z-10 flex items-center gap-3">
                        Customize Engine
                        <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <PolishedModal
        isOpen={isPathwaysModalOpen}
        onClose={() => setIsPathwaysModalOpen(false)}
        title="Intelligence Engine"
        description="Fine-tune your career trajectory using proprietary AI."
      >
        <div className="space-y-6">
          <div className="space-y-4">
             <div className="p-4 rounded-xl border border-white/5 bg-white/5">
                <p className="text-sm font-bold text-white mb-2">Target Sectors</p>
                <div className="flex flex-wrap gap-2">
                  {["Deep Tech", "Creative", "Finance"].map(tag => (
                    <div key={tag} className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-bold text-gray-500 border border-white/5 uppercase tracking-tighter">{tag}</div>
                  ))}
                </div>
             </div>
             <div className="p-4 rounded-xl border border-white/5 bg-white/5">
                <p className="text-sm font-bold text-white mb-2">Processing Power</p>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "75%" }}
                    className="h-full bg-violet-500 shadow-[0_0_10px_#8B5CF6]"
                  />
                </div>
             </div>
          </div>
          <Button className="w-full h-12 bg-violet-600 hover:bg-violet-700 rounded-xl font-bold text-white shadow-lg shadow-violet-600/20" onClick={() => setIsPathwaysModalOpen(false)}>
            Calibrate Trajectory
          </Button>
        </div>
      </PolishedModal>

      <PolishedModal
        isOpen={isMilestoneModalOpen}
        onClose={() => setIsMilestoneModalOpen(false)}
        title="Node Analysis"
        description="Accessing secure learning materials..."
      >
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-white/5 bg-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles className="h-24 w-24 text-violet-500" />
            </div>
            <div className="flex items-center gap-4 mb-4 relative z-10">
              <div className="h-12 w-12 rounded-xl bg-violet-600/20 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-violet-400" />
              </div>
              <div>
                <h4 className="text-white font-bold">Neural Architecture</h4>
                <div className="h-2 w-24 bg-white/5 rounded mt-1 animate-pulse" />
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 relative z-10">
              Decrypting specialized knowledge modules for high-performance career scaling.
            </p>
            <div className="space-y-3 relative z-10">
              {[1, 2, 3].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <div className="h-1 w-1 rounded-full bg-violet-500 shadow-[0_0_5px_#8B5CF6]" />
                  <div className="h-2 w-32 bg-white/5 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
          <Button className="w-full h-12 bg-violet-600 hover:bg-violet-700 rounded-xl font-bold text-white shadow-lg shadow-violet-600/20" onClick={() => setIsMilestoneModalOpen(false)}>
            Initialize Learning
          </Button>
        </div>
      </PolishedModal>
    </div>
  );
}
