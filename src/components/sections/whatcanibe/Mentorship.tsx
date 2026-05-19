import { Button } from "@/components/ui/button";
import { Quote } from "lucide-react";

export default function Mentorship() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-black to-zinc-950">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
             <div className="absolute inset-0 bg-violet-600/10 blur-[100px] -z-10" />
             <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                <Quote className="w-12 h-12 text-violet-500 mb-6 opacity-50" />
                <p className="text-xl md:text-2xl font-medium text-gray-200 leading-relaxed italic mb-8">
                  "The mentorship program at WhatCanIBe was the turning point for my career. Connecting with a Senior Architect while I was still in university gave me the confidence and direction I couldn't find anywhere else."
                </p>
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-400 to-purple-600" />
                   <div>
                      <p className="font-bold text-white">Sarah Jenkins</p>
                      <p className="text-sm text-gray-500">Junior UI/UX Designer @ TechFlow</p>
                   </div>
                </div>
             </div>
             
             {/* Floating cards */}
             <div className="absolute -top-6 -right-6 md:right-0 bg-zinc-900 border border-white/10 p-4 rounded-xl shadow-2xl animate-bounce-slow">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                   </div>
                   <p className="text-xs font-medium text-white">42 Mentors Online</p>
                </div>
             </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Learn from Those <br /><span className="text-purple-400">Who Have Been There</span></h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              Don't just read about careers. Talk to the people living them. Our platform connects you with verified mentors from leading companies across the globe.
            </p>
            
            <ul className="space-y-4 mb-10">
              {[
                "Direct 1-on-1 video consultations",
                "Portfolio and resume reviews",
                "Industry-specific interview prep",
                "Long-term career guidance"
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-300">
                  <div className="w-5 h-5 rounded-full bg-violet-500/20 flex items-center justify-center shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <Button className="bg-white text-black hover:bg-gray-200 px-8 h-12 text-base font-bold rounded-xl transition-all">
              Find a Mentor
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
