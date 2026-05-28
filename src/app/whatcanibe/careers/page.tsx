"use client";

import { useState, useEffect } from "react";
import { MOCK_CAREERS } from "@/constants/careers";
import CareerCard from "@/components/sections/whatcanibe/CareerCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, Sparkles, Filter, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CareersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const categories = ["All", ...Array.from(new Set(MOCK_CAREERS.map((c) => c.category)))];
  const featuredCareers = MOCK_CAREERS.filter(c => c.featured);

  const filteredCareers = MOCK_CAREERS.filter((career) => {
    const matchesSearch = career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          career.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || career.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-background pt-32 pb-20 px-4 md:px-6 relative overflow-hidden transition-colors duration-500">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-[40%] h-[40%] bg-brand-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[5%] w-[40%] h-[40%] bg-brand-secondary/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.05]" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <Zap className="h-3 w-3" />
            Mission Intel
          </div>
          <h1 className="text-4xl md:text-7xl font-black dark:text-white text-zinc-900 mb-6 tracking-tighter leading-none">
            Explore <span className="text-gradient-purple">Careers</span>
          </h1>
          <p className="dark:text-zinc-400 text-zinc-500 text-lg md:text-xl max-w-2xl leading-relaxed font-bold">
            Discover the high-impact roles of tomorrow. Data-backed trajectories tailored for the next generation of builders.
          </p>
        </motion.div>

        {/* Featured Section */}
        {selectedCategory === "All" && !searchQuery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-20"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black dark:text-white text-zinc-900 tracking-tight flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-brand-vibrant" />
                Featured Pathways
              </h2>
              <div className="h-px flex-1 bg-zinc-100 dark:bg-white/5 mx-6 hidden md:block" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredCareers.map((career) => (
                <CareerCard key={`featured-${career.id}`} career={career} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Filters & Search - Glassmorphism Sticky */}
        <div className="sticky top-24 z-30 mb-12 p-3 bg-white/60 dark:bg-black/40 backdrop-blur-2xl border border-zinc-200 dark:border-white/10 rounded-[2.5rem] shadow-2xl">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input
                placeholder="Search by title, skill, or keyword..."
                className="pl-14 h-14 bg-white dark:bg-white/5 border-zinc-200 dark:border-white/10 dark:text-white text-zinc-900 focus:border-brand-primary/50 rounded-[1.5rem] font-bold text-sm shadow-inner"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide px-2">
              <div className="flex items-center gap-2 p-1.5 bg-zinc-50 dark:bg-white/5 rounded-2xl border border-zinc-100 dark:border-white/10 shadow-sm">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "ghost"}
                    size="sm"
                    className={`rounded-xl h-10 whitespace-nowrap transition-all px-5 font-black text-[10px] uppercase tracking-widest ${
                      selectedCategory === category
                        ? "bg-brand-primary hover:bg-brand-primary/90 text-white shadow-lg shadow-brand-primary/20"
                        : "dark:text-zinc-500 text-zinc-400 hover:text-brand-primary dark:hover:text-white hover:bg-white dark:hover:bg-white/5"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
              <div className="h-8 w-px bg-zinc-200 dark:bg-white/10 mx-1 shrink-0" />
              <Button variant="ghost" size="icon" className="h-10 w-10 text-zinc-400 hover:text-brand-primary bg-zinc-50 dark:bg-white/5 rounded-xl shrink-0 border border-zinc-100 dark:border-white/10">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Career Grid */}
        <AnimatePresence mode="popLayout">
          {filteredCareers.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredCareers.map((career) => (
                <CareerCard key={career.id} career={career} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-32 border-2 border-dashed border-zinc-200 dark:border-white/10 rounded-[4rem] bg-zinc-50/50 dark:bg-white/[0.02]"
            >
              <div className="h-24 w-24 bg-zinc-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <Search className="h-10 w-10 text-zinc-300 dark:text-zinc-700" />
              </div>
              <h3 className="text-2xl font-black dark:text-white text-zinc-900 mb-3 tracking-tight">No results in this sector</h3>
              <p className="dark:text-zinc-500 text-zinc-400 mb-10 max-w-sm mx-auto font-bold text-base leading-relaxed">Expand your search horizons or try a different category to find your path.</p>
              <Button
                variant="outline"
                className="border-zinc-200 dark:border-white/10 dark:text-white text-zinc-900 rounded-[1.5rem] px-10 h-14 font-black hover:bg-zinc-50 dark:hover:bg-white/5 transition-all active:scale-95 shadow-lg"
                onClick={() => {setSearchQuery(""); setSelectedCategory("All");}}
              >
                Reset Mission Parameters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
