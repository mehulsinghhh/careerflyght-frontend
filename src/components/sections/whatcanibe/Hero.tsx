import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-24 px-6 md:py-32">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-xs font-medium mb-8 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
          </span>
          Next-Gen Career Intelligence
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
          Discover your future. <br />
          <span className="bg-gradient-to-r from-violet-400 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
            Define your own path.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          The all-in-one platform for students and early-career professionals to explore industries, build roadmaps, and connect with world-class mentors.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/signup" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white px-8 h-12 text-base rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-violet-600/25 border-none">
              Start Exploring Free
            </Button>
          </Link>
          <Link href="/whatcanibe/pathways" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/10 hover:bg-white/5 px-8 h-12 text-base rounded-xl transition-all">
              See How It Works
            </Button>
          </Link>
        </div>

        {/* Hero Visual Placeholder */}
        <div className="mt-20 relative rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm">
           <div className="rounded-xl border border-white/10 bg-black overflow-hidden aspect-[16/9] flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/20 to-purple-900/20" />
              <div className="relative z-10 text-center px-6">
                <div className="flex justify-center gap-4 mb-8">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-12 w-12 rounded-full bg-white/10 border border-white/10 animate-pulse" />
                  ))}
                </div>
                <div className="h-4 w-64 bg-white/10 rounded-full mx-auto mb-4 animate-pulse" />
                <div className="h-4 w-48 bg-white/10 rounded-full mx-auto animate-pulse" />
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
