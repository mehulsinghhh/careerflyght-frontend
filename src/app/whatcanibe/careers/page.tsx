"use client";

import { useState } from "react";
import { MOCK_CAREERS } from "@/constants/careers";
import CareerCard from "@/components/sections/whatcanibe/CareerCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";

export default function CareersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(MOCK_CAREERS.map((c) => c.category)))];

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
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Explore <span className="bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">Careers</span>
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Discover the most in-demand roles in tech and beyond. Find your perfect path and start building your future today.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search careers..."
              className="pl-10 bg-white/5 border-white/10 text-white focus:border-violet-500/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                className={`rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? "bg-violet-600 hover:bg-violet-700 text-white border-none"
                    : "border-white/10 text-gray-400 hover:text-white hover:bg-white/5"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
            <Button variant="ghost" size="icon" className="text-gray-400 shrink-0">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Career Grid */}
        {filteredCareers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCareers.map((career) => (
              <CareerCard key={career.id} career={career} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl bg-white/5">
            <p className="text-gray-400">No careers found matching your criteria.</p>
            <Button
              variant="link"
              className="text-violet-400 mt-2"
              onClick={() => {setSearchQuery(""); setSelectedCategory("All");}}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
