"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background radial glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-600/10 blur-[120px] rounded-full -z-10"
      />

      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative border border-white/10 bg-[#050505] rounded-[3.5rem] py-20 px-8 backdrop-blur-sm overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-violet-600/10 to-transparent blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-600/10 to-transparent blur-3xl" />

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] [mask-image:radial-gradient(white,transparent_70%)]" />

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-sm font-bold mb-8"
            >
              <Sparkles className="h-4 w-4" />
              Limited Beta Access
            </motion.div>

            <h2 className="text-4xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">Ready to start <br /><span className="bg-gradient-to-r from-violet-400 via-purple-500 to-fuchsia-400 bg-clip-text text-transparent">your journey?</span></h2>
            <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands of students and professionals who are already shaping their futures with CareerFlyght.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/whatcanibe/signup" className="w-full sm:w-auto">
                <Button size="lg" className="group w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white px-10 h-16 text-lg font-bold rounded-2xl transition-all shadow-xl shadow-violet-600/30 border-none">
                  Create Free Account
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/whatcanibe/login" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/10 hover:bg-white/5 px-10 h-16 text-lg font-bold rounded-2xl transition-all">
                  Log in to Portal
                </Button>
              </Link>
            </div>

            <p className="mt-10 text-sm text-gray-500 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              No credit card required. Free for students.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
