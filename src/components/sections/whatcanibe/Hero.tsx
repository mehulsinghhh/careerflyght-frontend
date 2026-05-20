"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useSpring,
  useMotionValue,
  useTransform
} from "framer-motion";
import {
  BrainCircuit,
  Target,
  Users,
  ArrowUpRight,
  TrendingUp,
  Zap,
  Bell,
  ShieldCheck
} from "lucide-react";
import HeroBackground from "./HeroBackground";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- Mock Data ---

const PARTNERS = [
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_logo_%282015%29.svg" },
  { name: "OpenAI", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" },
  { name: "NVIDIA", logo: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg" },
  { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
  { name: "Stripe", logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" },
];

const ACTIVITY_FEED = [
  { id: 1, user: "Sarah", action: "matched with a Google mentor", time: "2m ago", icon: Users, color: "text-blue-400" },
  { id: 2, user: "AI System", action: "AI Engineer roadmap unlocked", time: "5m ago", icon: BrainCircuit, color: "text-violet-400" },
  { id: 3, user: "Market", action: "Frontend demand increased 18%", time: "12m ago", icon: TrendingUp, color: "text-green-400" },
  { id: 4, user: "Internships", action: "New opportunity at OpenAI", time: "15m ago", icon: Zap, color: "text-amber-400" },
];

const MENTORS = [
  { name: "Marcus Thorne", role: "Lead Designer @ OpenAI", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" },
  { name: "Elena Rodriguez", role: "ML Engineer @ NVIDIA", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100" },
];

// --- Sub-components ---

const ActivityItem = ({ item }: { item: typeof ACTIVITY_FEED[0] }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 mb-2 hover:bg-white/10 transition-colors"
  >
    <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center ${item.color}`}>
      <item.icon className="w-4 h-4" />
    </div>
    <div className="flex-1">
      <p className="text-[10px] font-medium text-white">
        <span className="text-gray-400">{item.user}</span> {item.action}
      </p>
      <p className="text-[8px] text-gray-500">{item.time}</p>
    </div>
  </motion.div>
);

const FloatingCard = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
    className={`absolute z-20 ${className}`}
  >
    {children}
  </motion.div>
);

// --- Main Hero Component ---

export default function Hero() {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set((clientX - left) / width);
    mouseY.set((clientY - top) / height);
  };

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [10, -10]));
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-10, 10]));

  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current || !dashboardRef.current) return;

    const ctx = gsap.context(() => {
      // Cinematic entrance for the entire hero content
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 100,
        duration: 1.5,
        ease: "expo.out",
      });

      gsap.from(dashboardRef.current, {
        opacity: 0,
        scale: 0.8,
        rotateX: -20,
        duration: 2,
        delay: 0.5,
        ease: "elastic.out(1, 0.75)",
      });

      // Subtle parallax on scroll for the hero background
      gsap.to("#hero-bg-blobs", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: 200,
        opacity: 0,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center pt-32 pb-20 px-6 overflow-hidden bg-[#020202]"
      onMouseMove={handleMouseMove}
    >
      <HeroBackground />
      {/* Background Immersive Elements */}
      <div id="hero-bg-blobs" className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] bg-violet-600/15 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[60%] bg-blue-600/15 blur-[140px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] bg-fuchsia-600/10 blur-[160px] rounded-full" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">

          {/* LEFT CONTENT: High Energy Copy & Partners */}
          <motion.div
            ref={contentRef}
            className="lg:col-span-5"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-[10px] uppercase font-bold tracking-widest mb-8"
            >
              <Zap className="w-3 h-3" />
              The Future of Career Intelligence
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tight text-white leading-[0.95] mb-8">
              Evolve <br />
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent">
                Beyond Limits.
              </span>
            </h1>

            <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-lg">
              Don't just choose a career. <span className="text-white font-medium">Design your destiny.</span> The most advanced AI platform for the next generation of industry leaders.
            </p>

            <div className="flex flex-wrap gap-4 mb-16">
              <Link href="/signup">
                <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white px-10 h-16 text-lg rounded-2xl font-black shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all hover:scale-105 active:scale-95 group">
                  Get Started Free
                  <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="border-white/10 text-white px-10 h-16 text-lg rounded-2xl font-bold bg-white/5 hover:bg-white/10 transition-all backdrop-blur-md">
                  View Demo
                </Button>
              </Link>
            </div>

            {/* Partner Trust Section */}
            <div className="space-y-6">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Guided by Mentors from</p>
              <div className="flex flex-wrap items-center gap-8 opacity-40 hover:opacity-70 transition-opacity">
                {PARTNERS.map(p => (
                  <img key={p.name} src={p.logo} alt={p.name} className="h-5 invert brightness-0" />
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT CONTENT: Immersive Bento Box Dashboard */}
          <motion.div
            ref={dashboardRef}
            className="lg:col-span-7 relative"
            style={{ rotateX, rotateY, perspective: 1000 }}
          >
            {/* Main Dashboard Visual */}
            <div className="bg-[#050505] border border-white/10 rounded-[3rem] p-8 shadow-[0_0_80px_rgba(0,0,0,0.8)] relative overflow-hidden backdrop-blur-3xl">
               <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/10 via-transparent to-cyan-500/10 pointer-events-none" />

               <div className="grid grid-cols-12 gap-6 relative z-10">

                  {/* Profile & Live Feed (Column 1) */}
                  <div className="col-span-5 space-y-6">
                     {/* User Identity Card */}
                     <motion.div
                        whileHover={{ scale: 1.02, rotateY: 5 }}
                        className="p-6 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden group cursor-pointer"
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 blur-2xl -z-10 group-hover:bg-violet-600/20 transition-colors" />
                        <div className="flex items-center gap-4 mb-4">
                           <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/20">
                              <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200" alt="Student" className="w-full h-full object-cover" />
                           </div>
                           <div>
                              <p className="text-sm font-black text-white">Leo Vance</p>
                              <p className="text-[10px] text-violet-400 font-bold uppercase tracking-tighter">AI Specialist Track</p>
                           </div>
                        </div>
                        <div className="space-y-3">
                           <div className="flex justify-between items-center text-[10px] font-bold text-gray-500">
                              <span>Profile Strength</span>
                              <span className="text-white">82%</span>
                           </div>
                           <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "82%" }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                                className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                              />
                           </div>
                        </div>
                     </motion.div>

                     {/* Live Activity Feed */}
                     <div className="p-6 rounded-3xl bg-black/40 border border-white/5 backdrop-blur-md">
                        <div className="flex items-center justify-between mb-6">
                           <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Live Updates</h4>
                           <Bell className="w-3 h-3 text-violet-500" />
                        </div>
                        {ACTIVITY_FEED.map(item => (
                          <ActivityItem key={item.id} item={item} />
                        ))}
                     </div>
                  </div>

                  {/* Main Visualization Area (Column 2) */}
                  <div className="col-span-7 space-y-6">
                     {/* Interactive Roadmap Map */}
                     <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="p-6 rounded-[2rem] bg-white/5 border border-white/10 h-64 relative overflow-hidden group cursor-pointer"
                      >
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=800')] opacity-10 grayscale group-hover:scale-110 transition-transform duration-1000" />
                        <div className="relative z-10">
                           <div className="flex items-center justify-between mb-4">
                              <p className="text-[10px] font-black text-white uppercase tracking-widest">Global Roadmap v2.4</p>
                              <div className="px-2 py-0.5 rounded-full bg-violet-500 text-[8px] font-black uppercase">Active</div>
                           </div>
                           <div className="flex flex-col gap-4 mt-8">
                              {[
                                { title: "Foundations", status: "completed", val: 100 },
                                { title: "AI/ML Specialization", status: "in-progress", val: 65 },
                                { title: "Industry Mentorship", status: "locked", val: 0 }
                              ].map((step, i) => (
                                <div key={i} className="space-y-1">
                                   <div className="flex justify-between text-[10px] font-bold">
                                      <span className={step.status === 'locked' ? 'text-gray-600' : 'text-white'}>{step.title}</span>
                                      <span className="text-gray-500">{step.val}%</span>
                                   </div>
                                   <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                      <div className={`h-full bg-violet-500 transition-all duration-1000 ${step.status === 'locked' ? 'opacity-20' : 'opacity-100'}`} style={{ width: `${step.val}%` }} />
                                   </div>
                                </div>
                              ))}
                           </div>
                        </div>
                     </motion.div>

                     {/* Mentors & Charts Row */}
                     <div className="grid grid-cols-2 gap-6">
                        {/* Skill Analysis Graph */}
                        <div className="p-5 rounded-3xl bg-white/5 border border-white/10 flex flex-col justify-between">
                           <h4 className="text-[8px] font-black text-gray-500 uppercase tracking-[0.2em]">Market Pulse</h4>
                           <div className="h-20 w-full mt-4 flex items-end gap-1">
                              {[35, 65, 45, 85, 55, 95, 75].map((h, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ height: 0 }}
                                  animate={{ height: `${h}%` }}
                                  transition={{ delay: 0.5 + (i * 0.1), duration: 0.8 }}
                                  className="flex-1 bg-gradient-to-t from-cyan-500 to-blue-400 rounded-t-sm opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                                />
                              ))}
                           </div>
                        </div>

                        {/* Top Mentors Small List */}
                        <div className="p-5 rounded-3xl bg-white/5 border border-white/10">
                           <h4 className="text-[8px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4">Top Matches</h4>
                           <div className="space-y-3">
                              {MENTORS.map(m => (
                                <div key={m.name} className="flex items-center gap-2">
                                   <img src={m.img} alt={m.name} className="w-6 h-6 rounded-lg grayscale hover:grayscale-0 transition-all cursor-pointer" />
                                   <div className="min-w-0">
                                      <p className="text-[8px] font-bold text-white truncate">{m.name}</p>
                                      <p className="text-[6px] text-gray-500 truncate">{m.role}</p>
                                   </div>
                                </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* FLOATING IMMERSIVE ELEMENTS */}

            {/* 3D-style Floating UI Tooltip */}
            <FloatingCard className="top-[-40px] right-20" delay={0.5}>
               <div className="bg-black/80 backdrop-blur-2xl border border-white/20 p-4 rounded-2xl shadow-2xl flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center">
                     <BrainCircuit className="w-6 h-6 text-white" />
                  </div>
                  <div>
                     <p className="text-xs font-black text-white">AI Career Score: 94</p>
                     <p className="text-[9px] text-violet-400 font-bold uppercase">Exceptional Potential</p>
                  </div>
               </div>
            </FloatingCard>

            {/* Mentor Availability Badge */}
            <FloatingCard className="bottom-20 right-[-40px]" delay={1.2}>
               <div className="bg-white/10 backdrop-blur-xl border border-violet-500/30 p-3 rounded-full flex items-center gap-3">
                  <div className="relative">
                     <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100" alt="Mentor" className="w-8 h-8 rounded-full border-2 border-white/20" />
                     <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#020202]" />
                  </div>
                  <p className="text-[10px] font-bold text-white pr-2">Mentor Online</p>
               </div>
            </FloatingCard>

            {/* Market Opportunity Pop */}
            <FloatingCard className="bottom-40 left-[-60px]" delay={2.5}>
               <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-[1px] rounded-2xl">
                  <div className="bg-black/90 backdrop-blur-2xl p-4 rounded-2xl flex flex-col items-center">
                     <TrendingUp className="w-5 h-5 text-cyan-400 mb-2" />
                     <p className="text-[10px] font-black text-white">+24% Jobs</p>
                     <p className="text-[8px] text-gray-500">in Cloud Ops</p>
                  </div>
               </div>
            </FloatingCard>

            {/* Ambient Lighting Accents */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-violet-600/20 blur-[100px] rounded-full -z-10" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full -z-10" />
          </motion.div>

        </div>
      </div>

      {/* Decorative Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#020202] to-transparent pointer-events-none" />
    </section>
  );
}
