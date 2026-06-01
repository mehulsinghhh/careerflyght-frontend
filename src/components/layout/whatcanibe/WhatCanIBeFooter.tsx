import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function WhatCanIBeFooter() {
  return (
    <footer className="bg-zinc-50 border-t border-zinc-200 pt-32 pb-16 px-6 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-16 mb-24">
          <div className="col-span-2 md:col-span-4 space-y-8">
            <Link
              href="/whatcanibe"
              className="group flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-[0_8px_16px_rgba(79,70,229,0.2)]">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tighter text-zinc-900">
                WhatCanIBe<span className="text-indigo-600">.</span>
              </span>
            </Link>
            <p className="text-zinc-500 text-base leading-relaxed max-w-sm font-medium">
              Empowering the next generation to discover, explore, and achieve their dream careers with high-fidelity insights and expert mentorship.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'LinkedIn', 'Instagram'].map(social => (
                <Link key={social} href="#" className="h-12 w-12 rounded-2xl bg-zinc-100 border border-zinc-200 flex items-center justify-center hover:bg-zinc-900 hover:border-zinc-900 transition-all group">
                   <span className="sr-only">{social}</span>
                   <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 group-hover:bg-white transition-colors" />
                </Link>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-2 md:col-start-6">
            <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-[0.3em] mb-8">Ecosystem</h4>
            <ul className="space-y-4 text-sm font-bold text-zinc-500 uppercase tracking-widest">
              <li><Link href="/whatcanibe/careers" className="hover:text-indigo-600 transition-all hover:translate-x-1 inline-block">Careers</Link></li>
              <li><Link href="/whatcanibe/pathways" className="hover:text-white transition-all hover:translate-x-1 inline-block">Pathways</Link></li>
              <li><Link href="/whatcanibe/mentorship" className="hover:text-white transition-all hover:translate-x-1 inline-block">Mentorship</Link></li>
              <li><Link href="/whatcanibe/dashboard" className="hover:text-white transition-all hover:translate-x-1 inline-block">Dashboard</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-[0.3em] mb-8">Mission</h4>
            <ul className="space-y-4 text-sm font-bold text-zinc-500 uppercase tracking-widest">
              <li><Link href="#" className="hover:text-indigo-600 transition-all hover:translate-x-1 inline-block">About Us</Link></li>
              <li><Link href="#" className="hover:text-indigo-600 transition-all hover:translate-x-1 inline-block">Methodology</Link></li>
              <li><Link href="#" className="hover:text-indigo-600 transition-all hover:translate-x-1 inline-block">The Team</Link></li>
              <li><Link href="#" className="hover:text-indigo-600 transition-all hover:translate-x-1 inline-block">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-[0.3em] mb-8">Governance</h4>
            <ul className="space-y-4 text-sm font-bold text-zinc-500 uppercase tracking-widest">
              <li><Link href="#" className="hover:text-indigo-600 transition-all hover:translate-x-1 inline-block">Privacy</Link></li>
              <li><Link href="#" className="hover:text-indigo-600 transition-all hover:translate-x-1 inline-block">Terms</Link></li>
              <li><Link href="#" className="hover:text-indigo-600 transition-all hover:translate-x-1 inline-block">Cookies</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.4em]">
              © {new Date().getFullYear()} WhatCanIBe.
            </p>
            <div className="h-4 w-px bg-zinc-200 hidden md:block" />
            <div className="flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.4em]">All Systems Live</span>
            </div>
          </div>
          
          <div className="text-[10px] font-bold text-zinc-300 uppercase tracking-[0.5em] group cursor-default">
            Built for <span className="text-zinc-400 group-hover:text-zinc-900 transition-colors">Future Generations</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
