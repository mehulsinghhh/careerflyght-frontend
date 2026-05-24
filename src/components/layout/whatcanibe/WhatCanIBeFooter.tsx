import Link from "next/link";
import { motion } from "framer-motion";

export default function WhatCanIBeFooter() {
  return (
    <footer className="bg-black border-t border-white/5 pt-24 pb-12 px-6 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent opacity-20" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-12 mb-20">
          <div className="col-span-2 md:col-span-4 space-y-6">
            <Link
              href="/whatcanibe"
              className="group flex items-center gap-2"
            >
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center shadow-lg shadow-brand-primary/20">
                <div className="h-4 w-4 bg-white rounded-sm rotate-45" />
              </div>
              <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                WhatCanIBe
              </span>
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-sm font-medium">
              Empowering the next generation to discover, explore, and achieve their dream careers with AI-driven insights and expert mentorship.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'LinkedIn', 'Discord'].map(social => (
                <Link key={social} href="#" className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-brand-primary/30 transition-all group">
                   <span className="sr-only">{social}</span>
                   <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-brand-primary transition-colors" />
                </Link>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-2 md:col-start-6">
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-6">Platform</h4>
            <ul className="space-y-4 text-sm font-medium text-zinc-500">
              <li><Link href="/whatcanibe/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/whatcanibe/pathways" className="hover:text-white transition-colors">Pathways</Link></li>
              <li><Link href="/whatcanibe/mentorship" className="hover:text-white transition-colors">Mentorship</Link></li>
              <li><Link href="/whatcanibe/resources" className="hover:text-white transition-colors">Resources</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-6">Company</h4>
            <ul className="space-y-4 text-sm font-medium text-zinc-500">
              <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Join Team</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-6">Legal</h4>
            <ul className="space-y-4 text-sm font-medium text-zinc-500">
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
            © {new Date().getFullYear()} WhatCanIBe. All rights reserved.
          </p>
          
          <div className="flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Systems Operational</span>
            <span className="mx-4 text-zinc-800">|</span>
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Part of CareerFlyght Ecosystem</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
