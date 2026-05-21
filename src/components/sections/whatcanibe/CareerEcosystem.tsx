"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import {
  BrainCircuit,
  Palette,
  ShieldCheck,
  Database,
  Rocket,
  Cpu
} from "lucide-react";

const careers = [
  { name: "AI Engineer", icon: BrainCircuit, color: "text-blue-400", bg: "bg-blue-400/10" },
  { name: "Product Designer", icon: Palette, color: "text-purple-400", bg: "bg-purple-400/10" },
  { name: "Cybersecurity", icon: ShieldCheck, color: "text-emerald-400", bg: "bg-emerald-400/10" },
  { name: "Data Scientist", icon: Database, color: "text-orange-400", bg: "bg-orange-400/10" },
  { name: "Startup Founder", icon: Rocket, color: "text-fuchsia-400", bg: "bg-fuchsia-400/10" },
  { name: "Cloud Architect", icon: Cpu, color: "text-cyan-400", bg: "bg-cyan-400/10" },
];

export default function CareerEcosystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // GSAP floating animation for nodes
    nodesRef.current.forEach((node, i) => {
      if (!node) return;

      gsap.to(node, {
        x: "random(-20, 20)",
        y: "random(-20, 20)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.2
      });
    });

    // Mouse movement interaction
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPos = (clientX / innerWidth - 0.5) * 40;
      const yPos = (clientY / innerHeight - 0.5) * 40;

      gsap.to(containerRef.current, {
        x: xPos,
        y: yPos,
        duration: 2,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background glow lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <motion.path
          d="M 100 250 Q 300 100 500 250 T 900 250"
          stroke="url(#gradient1)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M 100 350 Q 400 500 600 300 T 900 400"
          stroke="url(#gradient2)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#D946EF" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>

      <div ref={containerRef} className="relative w-full max-w-4xl grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 p-8">
        {careers.map((career, i) => (
          <div
            key={career.name}
            ref={(el) => (nodesRef.current[i] = el)}
            className="group relative"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className={`relative z-10 p-6 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl flex flex-col items-center justify-center gap-4 transition-all duration-500 hover:border-violet-500/50 hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.3)]`}
            >
              <div className={`p-4 rounded-2xl ${career.bg} ${career.color} shadow-inner`}>
                <career.icon className="w-8 h-8" />
              </div>
              <span className="text-sm font-bold tracking-tight text-gray-300 group-hover:text-white transition-colors">
                {career.name}
              </span>

              {/* Internal glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>

            {/* Ambient background glow for each node */}
            <div className={`absolute -inset-4 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-current ${career.color}`} />
          </div>
        ))}
      </div>

      {/* Decorative center orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-violet-600/10 blur-[100px] rounded-full animate-pulse" />
    </div>
  );
}
