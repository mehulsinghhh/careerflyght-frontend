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

export function GlowCard({ children, className, glowColor = "rgba(139, 92, 246, 0.1)", onClick }: GlowCardProps) {
  return (
    <motion.div
      whileHover={{ y: -1, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.04] hover:border-white/20",
        className
      )}
    >
      <div
        className="absolute inset-0 -z-10 opacity-20 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${glowColor}, transparent 70%)`,
          transform: "scale(1.5)",
        }}
      />
      {children}
    </motion.div>
  );
}
