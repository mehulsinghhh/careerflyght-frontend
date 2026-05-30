"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import AnimatedCounter from "@/components/ui/animated-counter";

export default function Hero() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<{x: string, y: string, opacity: number, scale: number, duration: number}[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const user = localStorage.getItem("careerflyghtUser");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoggedIn(!!user);

    // Generate stable particle values on client
    const newParticles = [...Array(20)].map(() => ({
      x: Math.random() * 100 + "%",
      y: Math.random() * 100 + "%",
      opacity: Math.random() * 0.3 + 0.1,
      scale: Math.random() * 0.5 + 0.5,
      duration: 10 + Math.random() * 10
    }));
    setParticles(newParticles);
  }, [mounted]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
    layoutEffect: false
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const stats = [
    { label: "Active Dreamers", value: 12500, suffix: "+" },
    { label: "AI Trajectories", value: 450, suffix: "k+" },
    { label: "Global Mentors", value: 850, suffix: "+" },
    { label: "Career Success", value: 98, suffix: "%" },
  ];

  if (!mounted) return null;

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center pt-28 pb-16 md:pt-20 md:pb-20 px-6 overflow-hidden"
    >
      {/* Premium Cinematic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Animated Gradient Mesh */}
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] opacity-20"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.1) 25%, rgba(236, 72, 153, 0.05) 50%, transparent 70%)"
          }}
        />

        {/* Floating Particles/Elements */}
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            initial={{
              x: particle.x,
              y: particle.y,
              opacity: particle.opacity,
              scale: particle.scale
            }}
            animate={{
              y: [null, "-20px", "20px", null],
              x: [null, "10px", "-10px", null],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-1 h-1 bg-white rounded-full blur-[1px] pointer-events-none"
          />
        ))}

        {/* Floating Geometric Elements */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-[10%] w-32 h-32 border border-white/5 rounded-3xl rotate-12 backdrop-blur-[2px] pointer-events-none hidden lg:block"
        />
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-[5%] w-48 h-48 border border-white/5 rounded-full backdrop-blur-[2px] pointer-events-none hidden lg:block"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/50 to-[#020617]" />
      </div>

      <motion.div
        style={{ opacity, scale, y }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto text-center max-w-5xl relative z-10"
      >
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-12 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.05)]"
        >
          <Sparkles className="h-3 w-3 text-indigo-400" />
          <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">Neural Career Intelligence</span>
        </motion.div>
        
        <motion.h1
          variants={itemVariants}
          className="text-[clamp(3.5rem,12vw,11rem)] font-bold tracking-tighter mb-8 md:mb-10 leading-[0.85] md:leading-[0.8] text-white"
        >
          Engineered for <br className="hidden xs:block" />
          <motion.span
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="italic bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-400 bg-clip-text text-transparent bg-[length:200%_auto] drop-shadow-[0_0_30px_rgba(99,102,241,0.3)]"
          >
            Greatness.
          </motion.span>
        </motion.h1>
        
        <motion.p
          variants={itemVariants}
          className="text-base md:text-2xl text-zinc-400 mb-12 md:mb-16 max-w-2xl mx-auto leading-relaxed font-medium"
        >
          The traditional career path is broken. We built the engine to fix it. <br className="hidden md:block" />
          Navigate the future with <span className="text-white">mathematical certainty.</span>
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-20 md:mb-32"
        >
          {isLoggedIn ? (
            <Link href="/whatcanibe/dashboard" className="w-full sm:w-auto">
              <Button size="lg" className="group w-full sm:w-auto bg-white text-black hover:bg-zinc-200 px-8 md:px-12 h-16 md:h-20 text-lg md:text-xl rounded-2xl transition-all border-none font-bold shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_50px_rgba(255,255,255,0.25)]">
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5 md:h-6 md:w-6 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          ) : (
            <Link href="/whatcanibe/signup" className="w-full sm:w-auto">
              <Button size="lg" className="group w-full sm:w-auto bg-white text-black hover:bg-zinc-200 px-8 md:px-12 h-16 md:h-20 text-lg md:text-xl rounded-2xl transition-all border-none font-bold shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_50px_rgba(255,255,255,0.25)]">
                Initiate Mission
                <ArrowRight className="ml-2 h-5 w-5 md:h-6 md:w-6 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          )}
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 max-w-4xl mx-auto pt-12 md:pt-16 border-t border-white/5 relative"
        >
          {/* Subtle Glow under Stats */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -2 }}
              className="text-center p-3 md:p-4 rounded-2xl transition-all hover:bg-white/[0.03] group"
            >
              <div className="text-2xl md:text-5xl font-bold text-white mb-1 md:mb-2 flex items-center justify-center group-hover:text-glow transition-all">
                <AnimatedCounter value={stat.value} />
                <span className="text-indigo-400">{stat.suffix}</span>
              </div>
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="mt-32 flex flex-col items-center gap-4 text-zinc-600 font-bold text-[10px] uppercase tracking-[0.4em]"
        >
          <span>Explore Mission</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-indigo-500" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
