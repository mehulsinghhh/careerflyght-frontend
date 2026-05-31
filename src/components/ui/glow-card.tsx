"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  onClick?: () => void;
}

export function GlowCard({ children, className, glowColor = "rgba(139, 92, 246, 0.2)", onClick }: GlowCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/30",
        className
      )}
    >
      <div
        className="absolute inset-0 -z-10 opacity-40 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${glowColor}, transparent 70%)`,
          transform: "scale(2)",
        }}
      />
      {children}
    </motion.div>
  );
}
