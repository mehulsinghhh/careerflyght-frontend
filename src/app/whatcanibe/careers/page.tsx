"use client";

import { useState } from "react";
import { MOCK_CAREERS } from "@/constants/careers";
import CareerCard from "@/components/sections/whatcanibe/CareerCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CareersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(MOCK_CAREERS.map((c) => c.category)))];

  const featuredCareers = MOCK_CAREERS.filter(c => c.featured);

  const filteredCareers = MOCK_CAREERS.filter((career) => {
    const matchesSearch = career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          career.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || career.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-6">
      {/* Background Glows */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[30%] h-[30%] bg-violet-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-[10px] font-bold uppercase tracking-widest mb-6">
            <Sparkles className="h-3 w-3" />
            Discover Your Potential
          </div>
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            Explore <span className="bg-gradient-to-r from-violet-400 via-purple-500 to-fuchsia-400 bg-clip-text text-transparent">Careers</span>
          </h1>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl leading-relaxed">
            Discover the most in-demand roles in tech and beyond. Find your perfect path and start building your future today.
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
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                Featured Pathways
              </h2>
              <div className="h-px flex-1 bg-white/5 mx-6 hidden md:block" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredCareers.map((career) => (
                <CareerCard key={`featured-${career.id}`} career={career} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Filters & Search */}
        <div className="sticky top-20 z-30 mb-12 py-4 bg-black/80 backdrop-blur-xl border-y border-white/5 px-4 rounded-3xl">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by title, skill, or keyword..."
                className="pl-12 h-12 bg-white/5 border-white/10 text-white focus:border-violet-500/50 rounded-2xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
              <div className="flex items-center gap-2 p-1.5 bg-white/5 rounded-2xl border border-white/10">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "ghost"}
                    size="sm"
                    className={`rounded-xl h-9 whitespace-nowrap transition-all px-4 font-bold text-xs ${
                      selectedCategory === category
                        ? "bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-600/20"
                        : "text-gray-500 hover:text-white hover:bg-white/5"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
              <div className="h-8 w-px bg-white/10 mx-2" />
              <Button variant="ghost" size="icon" className="text-gray-500 hover:text-white bg-white/5 rounded-xl shrink-0">
                <SlidersHorizontal className="h-4 w-4" />
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
              className="text-center py-32 border border-dashed border-white/10 rounded-[3rem] bg-white/[0.02]"
            >
              <div className="h-20 w-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No matches found</h3>
              <p className="text-gray-500 mb-8 max-w-xs mx-auto">Try adjusting your filters or search terms to find what you&apos;re looking for.</p>
              <Button
                variant="outline"
                className="border-white/10 text-white rounded-xl px-8"
                onClick={() => {setSearchQuery(""); setSelectedCategory("All");}}
              >
                Reset All Filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
