"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useSpring,
  useMotionValue
} from "framer-motion";
import {
  BrainCircuit,
  Target,
  Users,
  ArrowUpRight,
  CheckCircle2,
  Search,
  Sparkles,
  TrendingUp,
  Map,
  Lock
} from "lucide-react";

// --- Sub-components for the Dashboard Preview ---

const StatItem = ({ label, value, suffix = "" }: { label: string, value: number, suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="flex flex-col">
      <span className="text-2xl font-bold text-white">{count.toLocaleString()}{suffix}</span>
      <span className="text-xs text-gray-500 uppercase tracking-wider">{label}</span>
    </div>
  );
};

const DashboardCard = ({ children, className = "", title }: { children: React.ReactNode, className?: string, title?: string }) => (
  <motion.div
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl ${className}`}
  >
    {title && <h4 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-widest">{title}</h4>}
    {children}
  </motion.div>
);

const CareerCard = ({ role, salary, growth, demand }: { role: string, salary: string, growth: string, demand: number }) => (
  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-violet-500/30 transition-colors group">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center">
        <Target className="w-4 h-4 text-violet-400" />
      </div>
      <div>
        <p className="text-sm font-bold text-white group-hover:text-violet-400 transition-colors">{role}</p>
        <p className="text-[10px] text-gray-500">{salary} • {growth} growth</p>
      </div>
    </div>
    <div className="flex flex-col items-end">
       <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={`w-1 h-3 rounded-full ${i <= demand ? 'bg-violet-500' : 'bg-white/10'}`} />
          ))}
       </div>
       <span className="text-[8px] text-gray-600 mt-1 uppercase">Demand</span>
    </div>
  </div>
);

// --- Main Hero Component ---

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const dashboardRotateX = useSpring(useTransform(mouseY, [0, 1], [5, -5]));
  const dashboardRotateY = useSpring(useTransform(mouseX, [0, 1], [-5, 5]));

  return (
    <section
      className="relative min-h-[90vh] flex items-center overflow-hidden py-20 px-6"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Background Blobs */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-violet-600/10 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 100, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-xs font-medium mb-8"
          >
            <Sparkles className="w-3 h-3" />
            AI-Powered Career Intelligence
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.05] text-white">
            Your career <br />
            <span className="bg-gradient-to-r from-violet-400 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
              evolution starts here.
            </span>
          </h1>

          <p className="text-lg text-gray-400 mb-10 max-w-xl leading-relaxed">
            Stop guessing your future. Use advanced AI to map your unique path, connect with elite mentors, and unlock opportunities you didn't know existed.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-5 mb-12">
            <Link href="/signup" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white px-8 h-14 text-base rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(124,58,237,0.3)] border-none font-bold">
                Join the Future
                <ArrowUpRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/whatcanibe/pathways" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/10 hover:bg-white/5 px-8 h-14 text-base rounded-2xl transition-all font-medium text-white">
                Explore Pathways
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-10 pt-4 border-t border-white/5">
            <StatItem label="Students Guided" value={45000} suffix="+" />
            <StatItem label="Career Paths" value={1200} />
            <StatItem label="Expert Mentors" value={850} suffix="+" />
          </div>
        </motion.div>

        {/* Right Dashboard Preview */}
        <motion.div
          style={{ rotateX: dashboardRotateX, rotateY: dashboardRotateY, perspective: 1000 }}
          initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative hidden lg:block"
        >
          {/* Main Dashboard Shell */}
          <div className="relative bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] p-6 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent pointer-events-none" />

            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 p-[2px]">
                   <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full bg-zinc-800 animate-pulse" />
                   </div>
                </div>
                <div>
                   <p className="text-sm font-bold text-white">Alex Chen</p>
                   <p className="text-[10px] text-violet-400 font-medium uppercase tracking-tighter">Sophomore @ Stanford</p>
                </div>
              </div>
              <div className="flex gap-2">
                 <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                    <Search className="w-4 h-4 text-gray-400" />
                 </div>
                 <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                 </div>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4">
              {/* Profile Strength */}
              <DashboardCard title="Profile Strength" className="col-span-5 h-fit">
                <div className="flex items-center justify-between mb-4">
                   <div className="relative w-16 h-16">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#222" strokeWidth="3" />
                        <motion.path
                          initial={{ strokeDasharray: "0, 100" }}
                          animate={{ strokeDasharray: "85, 100" }}
                          transition={{ duration: 2, delay: 1 }}
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="url(#grad1)"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#d946ef" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center font-bold text-lg text-white">85%</div>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] text-gray-500">Skills Verified</p>
                      <p className="text-sm font-bold text-white">Expert Level</p>
                   </div>
                </div>
                <div className="flex flex-wrap gap-1">
                   {['React', 'UI Design', 'Figma'].map(s => (
                     <span key={s} className="text-[8px] px-2 py-0.5 rounded bg-violet-500/10 border border-violet-500/20 text-violet-400">{s}</span>
                   ))}
                </div>
              </DashboardCard>

              {/* Mentor Match */}
              <DashboardCard title="Top Mentor Match" className="col-span-7 bg-violet-600/10 border-violet-500/20">
                <div className="flex gap-3">
                   <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-white/10" />
                   <div className="flex-1">
                      <p className="text-xs font-bold text-white">Marcus Thorne</p>
                      <p className="text-[9px] text-gray-400 mb-2">Lead Designer @ OpenAI</p>
                      <Button size="sm" className="h-6 text-[9px] w-full bg-white text-black hover:bg-gray-200 border-none font-bold">Request Intro</Button>
                   </div>
                </div>
              </DashboardCard>

              {/* AI Career Roadmap */}
              <DashboardCard title="AI Career Roadmap" className="col-span-12">
                 <div className="flex justify-between items-end mb-4">
                    <div className="flex gap-4">
                       {[
                         { year: '2024', status: 'completed' },
                         { year: '2025', status: 'active' },
                         { year: '2026', status: 'pending' },
                         { year: '2027', status: 'pending' },
                       ].map((step, i) => (
                         <div key={i} className="flex flex-col items-center gap-1">
                            <div className={`w-2 h-2 rounded-full ${step.status === 'completed' ? 'bg-violet-500' : step.status === 'active' ? 'bg-white shadow-[0_0_8px_white]' : 'bg-zinc-800'}`} />
                            <span className={`text-[8px] ${step.status === 'active' ? 'text-white font-bold' : 'text-gray-600'}`}>{step.year}</span>
                         </div>
                       ))}
                    </div>
                    <div className="h-10 w-32 relative">
                       {/* Mini Chart */}
                       <svg className="w-full h-full" viewBox="0 0 100 40">
                         <motion.path
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 2 }}
                          d="M0 35 Q 25 30, 40 20 T 70 15 T 100 5" fill="none" stroke="#8b5cf6" strokeWidth="2" />
                       </svg>
                    </div>
                 </div>
                 <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <Map className="w-4 h-4 text-violet-400" />
                       <span className="text-xs font-medium text-gray-300">Next Milestone: Senior Product Designer</span>
                    </div>
                    <ArrowUpRight className="w-3 h-3 text-gray-500" />
                 </div>
              </DashboardCard>

              {/* Job Recommendations */}
              <div className="col-span-12 space-y-2">
                 <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest pl-1">Recommendations for you</p>
                 <CareerCard role="AI Engineer" salary="$140k - $210k" growth="+35%" demand={5} />
                 <CareerCard role="Product Designer" salary="$95k - $160k" growth="+22%" demand={4} />
              </div>
            </div>
          </div>

          {/* Decorative Floating Elements */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl z-20"
          >
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </div>
                <div>
                   <p className="text-[10px] font-bold text-white">Market Analysis</p>
                   <p className="text-[9px] text-green-400">+12.4% Industry Growth</p>
                </div>
             </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-8 -left-8 bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl z-20"
          >
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                   <TrendingUp className="w-4 h-4 text-orange-400" />
                </div>
                <div>
                   <p className="text-[10px] font-bold text-white">Skill Gap Alert</p>
                   <p className="text-[9px] text-gray-400">Master 'TypeScript' to unlock 15+ roles</p>
                </div>
             </div>
          </motion.div>
        </motion.div>

        {/* Mobile Preview Placeholder (Visible on Mobile Only) */}
        <div className="lg:hidden mt-10">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
             <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-600" />
                <div>
                   <p className="font-bold text-white">Your AI Career Platform</p>
                   <p className="text-xs text-gray-500">A personalized dashboard in your pocket</p>
                </div>
             </div>
             <div className="space-y-3">
                <CareerCard role="AI Engineer" salary="$140k - $210k" growth="+35%" demand={5} />
                <CareerCard role="Product Designer" salary="$95k - $160k" growth="+22%" demand={4} />
             </div>
          </div>
        </div>
      </div>

      {/* Subtle bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
