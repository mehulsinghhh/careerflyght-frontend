import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-600/10 blur-[120px] rounded-full -z-10" />

      <div className="container mx-auto max-w-4xl text-center border border-white/10 bg-white/5 rounded-[3rem] py-20 px-6 backdrop-blur-sm relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-500/10 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/10 to-transparent blur-3xl" />

        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Ready to start <br /><span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">your journey?</span></h2>
        <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
          Join thousands of students who have already discovered their path. Your future self will thank you.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/signup" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white px-10 h-14 text-lg rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-xl shadow-violet-600/30 border-none">
              Create Free Account
            </Button>
          </Link>
          <Link href="/login" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/10 hover:bg-white/5 px-10 h-14 text-lg rounded-2xl transition-all">
              Log in
            </Button>
          </Link>
        </div>
        
        <p className="mt-8 text-sm text-gray-500">
          No credit card required. Free for students.
        </p>
      </div>
    </section>
  );
}
