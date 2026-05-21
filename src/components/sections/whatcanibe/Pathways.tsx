"use client";

import { Search, Map, Users, Target, CheckCircle2, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const steps = [
  {
    title: "Discovery",
    description: "Take AI-powered assessments to match your personality and skills with potential careers.",
    icon: Search,
    color: "bg-blue-500",
    status: "done"
  },
  {
    title: "Mapping",
    description: "Visualize step-by-step roadmaps from where you are now to your first day on the job.",
    icon: Map,
    color: "bg-violet-500",
    status: "active"
  },
  {
    title: "Mentorship",
    description: "Connect with professionals who have walked the path before and get real-world advice.",
    icon: Users,
    color: "bg-purple-500",
    status: "pending"
  },
  {
    title: "Growth",
    description: "Access curated internships, projects, and certifications to build your professional profile.",
    icon: Target,
    color: "bg-fuchsia-500",
    status: "pending"
  },
];

export default function Pathways() {
  const router = useRouter();

  return (
    <section className="py-24 px-6 overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight leading-[1.1]">The Roadmap to Your <br /><span className="text-violet-400">Success</span></h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-xl">
                We&apos;ve decoded the journey from student to professional. No more guessing&mdash;just clear, actionable steps tailored to your unique goals.
              </p>
            </motion.div>
            
            <div className="space-y-4">
              {steps.map((step, idx) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`flex gap-6 p-6 rounded-2xl border transition-all duration-300 group ${
                    step.status === 'active'
                      ? 'border-violet-500/30 bg-violet-500/5 ring-1 ring-violet-500/20'
                      : 'border-white/5 bg-white/5 hover:border-white/10'
                  }`}
                >
                  <div className={`shrink-0 w-12 h-12 rounded-xl ${step.color} flex items-center justify-center shadow-lg shadow-black/20 group-hover:scale-110 transition-transform`}>
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-xl font-bold text-white">{step.title}</h3>
                      {step.status === 'done' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10"
            >
              <Button
                onClick={() => router.push('/whatcanibe/signup')}
                size="lg"
                className="bg-white text-black hover:bg-gray-200 rounded-xl px-8 h-12 font-bold group"
              >
                Build My Roadmap
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </div>

          <div className="lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 aspect-[4/5] md:aspect-square rounded-[2.5rem] border border-white/10 bg-[#050505] p-8 flex items-center justify-center overflow-hidden shadow-2xl"
            >
               {/* Animated Grid Background */}
               <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(white,transparent_85%)] opacity-20" />

               {/* Visual Roadmap Path */}
               <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  <svg className="w-full h-full max-w-[80%]" viewBox="0 0 400 400" fill="none">
                    <motion.path
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                      d="M50 350 C 150 350, 150 50, 350 50"
                      stroke="url(#gradient)"
                      strokeWidth="3"
                      strokeDasharray="12 8"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#D946EF" />
                      </linearGradient>
                    </defs>
                  </svg>
               </div>
               
               <div className="grid grid-cols-2 gap-6 md:gap-8 relative z-20">
                  {[
                    { year: "Year 1", title: "Fundamentals", color: "text-blue-400", bg: "bg-blue-500/10", progress: 100, delay: 0.2, y: 20 },
                    { year: "Year 2", title: "Specialization", color: "text-violet-400", bg: "bg-violet-500/10", progress: 65, delay: 0.4, y: -20 },
                    { year: "Year 3", title: "Practical Exp.", color: "text-fuchsia-400", bg: "bg-fuchsia-500/10", progress: 30, delay: 0.6, y: 20 },
                    { year: "Final", title: "Dream Job", color: "text-emerald-400", bg: "bg-emerald-500/10", progress: 0, delay: 0.8, y: -20 },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: item.y + 40 }}
                      whileInView={{ opacity: 1, y: item.y }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: item.delay, ease: [0.16, 1, 0.3, 1] }}
                      className="bg-black/60 backdrop-blur-xl p-5 md:p-6 rounded-2xl border border-white/10 shadow-2xl w-40 md:w-48 group hover:border-white/20 transition-colors"
                    >
                      <p className={`text-[10px] font-bold mb-2 uppercase tracking-[0.2em] ${item.color}`}>{item.year}</p>
                      <p className="font-bold text-white text-sm md:text-base mb-4">{item.title}</p>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: item.delay + 0.5, ease: "easeOut" }}
                          className={`h-full ${item.bg.replace('/10', '')}`}
                        />
                      </div>
                    </motion.div>
                  ))}
               </div>
            </motion.div>
            
            {/* Background blur decorative element */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.15, 0.25, 0.15]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-violet-600/20 blur-[120px] rounded-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
