import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function WhatCanIBeFooter() {
  return (
    <footer className="bg-white dark:bg-black border-t border-zinc-200 dark:border-white/5 pt-24 pb-12 px-6 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-brand-primary/5 blur-[120px] rounded-full" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-12 mb-20">
          <div className="col-span-2 md:col-span-4 space-y-6">
            <Link
              href="/whatcanibe"
              className="group flex items-center gap-2.5"
            >
              <div className="relative h-8 w-8">
                 <div className="absolute inset-0 bg-brand-primary blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                 <div className="relative h-8 w-8 rounded-lg bg-gradient-to-tr from-brand-primary via-purple-500 to-brand-secondary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
              </div>
              <span className="text-2xl font-heading font-black tracking-tight dark:text-white text-zinc-900">
                WhatCanIBe
              </span>
            </Link>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-sm font-medium">
              The mission-critical platform for the next generation of builders, dreamers, and industry leaders. Secure your professional future today.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'LinkedIn', 'Instagram'].map(social => (
                <Link key={social} href="#" className="h-10 w-10 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center hover:bg-white hover:border-brand-primary/30 transition-all group dark:hover:bg-white/10">
                   <span className="sr-only">{social}</span>
                   <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 group-hover:bg-brand-primary transition-colors" />
                </Link>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-2 md:col-start-6">
            <h4 className="text-xs font-black dark:text-white text-zinc-900 uppercase tracking-[0.2em] mb-6">Platform</h4>
            <ul className="space-y-4 text-sm font-bold text-zinc-500 dark:text-zinc-400">
              <li><Link href="/whatcanibe/careers" className="hover:text-brand-primary transition-colors">Careers</Link></li>
              <li><Link href="/whatcanibe/pathways" className="hover:text-brand-primary transition-colors">Pathways</Link></li>
              <li><Link href="/whatcanibe/mentorship" className="hover:text-brand-primary transition-colors">Mentorship</Link></li>
              <li><Link href="/whatcanibe/resources" className="hover:text-brand-primary transition-colors">Resources</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-black dark:text-white text-zinc-900 uppercase tracking-[0.2em] mb-6">Company</h4>
            <ul className="space-y-4 text-sm font-bold text-zinc-500 dark:text-zinc-400">
              <li><Link href="#" className="hover:text-brand-primary transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-brand-primary transition-colors">Join Team</Link></li>
              <li><Link href="#" className="hover:text-brand-primary transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-brand-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-black dark:text-white text-zinc-900 uppercase tracking-[0.2em] mb-6">Legal</h4>
            <ul className="space-y-4 text-sm font-bold text-zinc-500 dark:text-zinc-400">
              <li><Link href="#" className="hover:text-brand-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-brand-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-brand-primary transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">
            © {new Date().getFullYear()} WhatCanIBe. Created for the next generation.
          </p>
          
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-brand-vibrant animate-pulse" />
            <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Global Status: Online</span>
            <span className="mx-4 text-zinc-200 dark:text-zinc-800 hidden md:block">|</span>
            <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest hidden md:block">A CareerFlyght Experience</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
