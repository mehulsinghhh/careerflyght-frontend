"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function WhatCanIBeFooter() {
  return (
    <footer className="py-32 px-6 bg-zinc-50 border-t-2 border-strong relative overflow-hidden">
      {/* Editorial Decorative Lines */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none"
           style={{
             backgroundImage: "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
             backgroundSize: "10vw 10vh"
           }}
      />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
          <div className="lg:col-span-2">
            <Link href="/whatcanibe" className="group flex items-center gap-3 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-zinc-950 flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-premium">
                <Sparkles className="w-7 h-7 text-primary" />
              </div>
              <span className="text-3xl font-black tracking-tighter text-zinc-950 uppercase">
                WhatCanIBe<span className="text-primary italic">.</span>
              </span>
            </Link>
            <p className="text-xl text-zinc-500 font-medium leading-relaxed max-w-md mb-12">
              The high-fidelity engine for professional legacy engineering. We don&apos;t just find paths; we map destinies.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'LinkedIn', 'Instagram', 'Discord'].map(social => (
                <div key={social} className="w-12 h-12 rounded-2xl border-2 border-strong bg-white flex items-center justify-center text-zinc-400 hover:text-zinc-950 hover:border-zinc-950 transition-all cursor-pointer shadow-sm font-black text-[10px] uppercase tracking-widest">
                  {social.slice(0, 2)}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-zinc-950 font-black text-xs uppercase tracking-[0.4em] mb-10">Intelligence</h4>
            <ul className="space-y-6">
              {['Dominion Analysis', 'Neural Mapping', 'Trajectory Engine', 'Legacy Framework'].map(link => (
                <li key={link}>
                  <Link href="#" className="text-zinc-500 hover:text-zinc-950 font-bold text-sm uppercase tracking-widest transition-colors">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-zinc-950 font-black text-xs uppercase tracking-[0.4em] mb-10">Platform</h4>
            <ul className="space-y-6">
              {['Career Pathways', 'Mentorship Network', 'Dashboard Protocol', 'Initiate Mission'].map(link => (
                <li key={link}>
                  <Link href="#" className="text-zinc-500 hover:text-zinc-950 font-bold text-sm uppercase tracking-widest transition-colors">{link}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-16 border-t-2 border-strong flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em]">
            © 2024 WhatCanIBe. All Neural Trajectories Reserved.
          </p>
          <div className="flex gap-10">
            {['Privacy Protocol', 'Service Terms', 'System Status'].map(link => (
              <Link key={link} href="#" className="text-[10px] font-black text-zinc-400 hover:text-zinc-950 uppercase tracking-[0.3em] transition-colors">{link}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
