import Link from "next/link";
import { motion } from "framer-motion";

export default function WhatCanIBeFooter() {
  return (
    <footer className="bg-background border-t border-border pt-24 pb-12 px-6 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-20" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-12 mb-20">
          <div className="col-span-2 md:col-span-4 space-y-8">
            <Link
              href="/whatcanibe"
              className="group flex items-center gap-3"
            >
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-primary via-blue-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-primary/20">
                <div className="h-5 w-5 bg-primary-foreground rounded-sm rotate-45" />
              </div>
              <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                WhatCanIBe
              </span>
            </Link>
            <p className="text-muted-foreground text-base leading-relaxed max-w-sm font-medium">
              Empowering the next generation to discover, explore, and achieve their dream careers with AI-driven insights and expert mentorship.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'LinkedIn', 'Discord'].map(social => (
                <Link key={social} href="#" className="h-12 w-12 rounded-2xl bg-muted/50 border border-border flex items-center justify-center hover:bg-card hover:border-primary/30 transition-all group">
                   <span className="sr-only">{social}</span>
                   <div className="w-2 h-2 rounded-full bg-muted-foreground group-hover:bg-primary transition-colors" />
                </Link>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-2 md:col-start-6">
            <h4 className="text-xs font-black text-foreground uppercase tracking-[0.2em] mb-8">Platform</h4>
            <ul className="space-y-5 text-sm font-bold text-muted-foreground">
              <li><Link href="/whatcanibe/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/whatcanibe/pathways" className="hover:text-primary transition-colors">Pathways</Link></li>
              <li><Link href="/whatcanibe/mentorship" className="hover:text-primary transition-colors">Mentorship</Link></li>
              <li><Link href="/whatcanibe/resources" className="hover:text-primary transition-colors">Resources</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-black text-foreground uppercase tracking-[0.2em] mb-8">Company</h4>
            <ul className="space-y-5 text-sm font-bold text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Join Team</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-black text-foreground uppercase tracking-[0.2em] mb-8">Legal</h4>
            <ul className="space-y-5 text-sm font-bold text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} WhatCanIBe. All rights reserved.
          </p>
          
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Systems Operational</span>
            <span className="mx-4 text-border">|</span>
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Part of CareerFlyght Ecosystem</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
