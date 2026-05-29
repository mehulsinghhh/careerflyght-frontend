"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CAREER_CLUSTERS, CareerCluster } from "@/constants/career-clusters";
import { ChevronRight, Layers, Route, Target, Zap, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Pathways() {
  const [selectedCluster, setSelectedCluster] = useState<CareerCluster>(CAREER_CLUSTERS[0]);
  const [step, setStep] = useState(0); // 0: Cluster Select (Visual), 1: Pathway Detail

  return (
    <section className="py-32 px-6 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden" id="pathways">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-brand-primary font-bold text-[10px] uppercase tracking-[0.4em] mb-4"
            >
              Career Mapping
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white"
            >
              Visual <span className="italic font-serif">Pathways.</span>
            </motion.h2>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => setStep(0)}
              className={`rounded-full px-6 transition-all ${step === 0 ? 'bg-zinc-900 text-white dark:bg-white dark:text-black border-transparent' : 'border-zinc-200 dark:border-white/10'}`}
            >
              System Map
            </Button>
            <Button
              variant="outline"
              onClick={() => setStep(1)}
              className={`rounded-full px-6 transition-all ${step === 1 ? 'bg-zinc-900 text-white dark:bg-white dark:text-black border-transparent' : 'border-zinc-200 dark:border-white/10'}`}
            >
              Pathway Detail
            </Button>
          </div>
        </div>

        <div className="relative min-h-[600px] rounded-[3rem] bg-white dark:bg-black border border-zinc-200 dark:border-white/5 shadow-2xl overflow-hidden p-8 md:p-12">
           <AnimatePresence mode="wait">
              {step === 0 ? (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-12 h-full"
                >
                   {/* Left Sidebar: Cluster Selector */}
                   <div className="lg:col-span-4 space-y-3 overflow-y-auto max-h-[600px] pr-4 custom-scrollbar">
                      {CAREER_CLUSTERS.map((cluster) => (
                        <button
                          key={cluster.id}
                          onClick={() => setSelectedCluster(cluster)}
                          className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-4 group ${
                            selectedCluster.id === cluster.id
                            ? 'bg-brand-primary/5 border-brand-primary/30'
                            : 'bg-transparent border-transparent hover:bg-zinc-100 dark:hover:bg-white/5'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                            selectedCluster.id === cluster.id ? `bg-gradient-to-br ${cluster.color} text-white` : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-400'
                          }`}>
                            <cluster.icon className="w-5 h-5" />
                          </div>
                          <span className={`text-sm font-bold transition-colors ${
                            selectedCluster.id === cluster.id ? 'text-zinc-900 dark:text-white' : 'text-zinc-500'
                          }`}>
                            {cluster.title}
                          </span>
                          <ChevronRight className={`ml-auto w-4 h-4 transition-transform ${selectedCluster.id === cluster.id ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}`} />
                        </button>
                      ))}
                   </div>

                   {/* Right: Interactive Map Preview */}
                   <div className="lg:col-span-8 bg-zinc-50 dark:bg-zinc-900/40 rounded-[2rem] border border-zinc-100 dark:border-white/5 relative overflow-hidden p-10">
                      <div className="absolute top-0 right-0 p-8">
                         <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${selectedCluster.color} blur-3xl opacity-20`} />
                      </div>

                      <div className="relative z-10 h-full flex flex-col">
                        <div className="mb-12">
                          <div className="flex items-center gap-3 mb-6">
                            <selectedCluster.icon className="w-8 h-8 text-brand-primary" />
                            <h3 className="text-3xl font-bold text-zinc-900 dark:text-white">{selectedCluster.title}</h3>
                          </div>
                          <p className="text-zinc-500 text-lg leading-relaxed max-w-xl">
                            {selectedCluster.description}
                          </p>
                        </div>

                        {/* Visual Skill/Pathway Tree Preview */}
                        <div className="flex-1 flex flex-col justify-center gap-8">
                          <div className="flex items-center gap-4">
                            <div className="w-3 h-3 rounded-full bg-brand-primary shadow-[0_0_10px_rgba(var(--brand-primary-rgb),0.5)]" />
                            <div className="h-px flex-1 bg-gradient-to-r from-brand-primary to-transparent" />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {selectedCluster.subClusters.length > 0 ? (
                                selectedCluster.subClusters.map((sc, i) => (
                                  <motion.div
                                    key={sc.title}
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-white/5 shadow-sm group"
                                  >
                                    <div className="flex items-center justify-between mb-4">
                                      <span className="text-[10px] font-black uppercase tracking-widest text-brand-secondary">Sub-Cluster {i + 1}</span>
                                      <Zap className="w-3 h-3 text-zinc-300" />
                                    </div>
                                    <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">{sc.title}</h4>
                                    <div className="flex items-center gap-2 text-brand-primary text-xs font-bold group-hover:gap-3 transition-all cursor-pointer" onClick={() => setStep(1)}>
                                      Explore Pathways <ArrowRight className="w-3 h-3" />
                                    </div>
                                  </motion.div>
                                ))
                            ) : (
                              <div className="col-span-2 py-12 text-center border-2 border-dashed border-zinc-200 dark:border-white/5 rounded-3xl">
                                 <p className="text-zinc-400 font-medium">Detailed sub-clusters for this domain <br /> are being mapped by our experts.</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                   </div>
                </motion.div>
              ) : (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="h-full flex flex-col"
                >
                   <button
                    onClick={() => setStep(0)}
                    className="inline-flex items-center gap-2 text-zinc-400 hover:text-brand-primary font-bold text-xs uppercase tracking-widest mb-8 transition-colors"
                   >
                     <ArrowLeft className="w-4 h-4" /> Back to System Map
                   </button>

                   <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12">
                      <div className="lg:col-span-5">
                         <h3 className="text-4xl font-bold text-zinc-900 dark:text-white mb-6">Explore the <br /> <span className="text-brand-primary">Trajectory.</span></h3>
                         <p className="text-zinc-500 mb-10 text-lg">
                           From initial awareness to deep industry experience. Follow the official CareerFlyght methodology to master this domain.
                         </p>

                         <div className="space-y-8">
                            {[
                              { label: 'Awareness', desc: 'Discover roles and fundamental concepts.', color: 'bg-blue-500' },
                              { label: 'Exposure', desc: 'Engage with professionals and real-world tools.', color: 'bg-purple-500' },
                              { label: 'Experience', desc: 'Master skills through internships and projects.', color: 'bg-brand-primary' },
                            ].map((level, i) => (
                              <div key={level.label} className="flex gap-6 items-start relative group">
                                 {i < 2 && <div className="absolute left-3 top-10 bottom-[-20px] w-0.5 bg-zinc-100 dark:bg-white/5" />}
                                 <div className={`w-6 h-6 rounded-full ${level.color} mt-1 ring-4 ring-white dark:ring-black z-10`} />
                                 <div>
                                    <h4 className="text-sm font-black uppercase tracking-widest text-zinc-900 dark:text-white mb-1">{level.label}</h4>
                                    <p className="text-sm text-zinc-500">{level.desc}</p>
                                 </div>
                              </div>
                            ))}
                         </div>
                      </div>

                      <div className="lg:col-span-7 space-y-6">
                         <div className="p-8 rounded-[2.5rem] bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-white/5">
                            <div className="flex items-center justify-between mb-8">
                               <div className="flex items-center gap-3">
                                  <Layers className="w-5 h-5 text-brand-secondary" />
                                  <span className="text-sm font-bold text-zinc-900 dark:text-white">Active Career Options</span>
                               </div>
                               <div className="px-3 py-1 rounded-full bg-zinc-200 dark:bg-white/10 text-[10px] font-bold text-zinc-500">Live Database</div>
                            </div>

                            <div className="space-y-4">
                               {[1, 2, 3].map(i => (
                                 <div key={i} className="p-5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-white/5 flex items-center justify-between group hover:border-brand-primary/30 transition-all cursor-pointer">
                                    <div className="flex items-center gap-4">
                                       <div className="w-1.5 h-8 bg-zinc-100 dark:bg-zinc-800 rounded-full group-hover:bg-brand-primary transition-colors" />
                                       <div>
                                          <div className="h-4 w-32 bg-zinc-100 dark:bg-white/5 rounded mb-2" />
                                          <div className="h-2 w-48 bg-zinc-50 dark:bg-white/5 rounded" />
                                       </div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-zinc-300 group-hover:text-brand-primary transition-all" />
                                 </div>
                               ))}
                            </div>
                         </div>

                         <div className="p-8 rounded-[2.5rem] bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                               <div className="w-12 h-12 rounded-2xl bg-brand-primary flex items-center justify-center text-white shadow-lg shadow-brand-primary/30">
                                  <Route className="w-6 h-6" />
                               </div>
                               <div>
                                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Personalize This Path</h4>
                                  <p className="text-xs text-zinc-500">Take the discovery assessment to see your match.</p>
                               </div>
                            </div>
                            <Button size="sm" className="rounded-full px-6 bg-zinc-900 dark:bg-white text-white dark:text-black hover:opacity-90">Start</Button>
                         </div>
                      </div>
                   </div>
                </motion.div>
              )}
           </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
