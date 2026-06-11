"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Search,
  Briefcase,
  GraduationCap,
  DollarSign,
  ArrowRight,
  Filter,
  Star,
  User,
  ShieldCheck
} from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlowCard } from "@/components/ui/glow-card";
import Link from "next/link";

interface Mentor {
  id: string;
  userId: string;
  company: string;
  designation: string | null;
  experienceYears: number | null;
  bio: string;
  hourlyRate: number | null;
  ratingAvg: number;
  isVerified: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    profilePhoto: string | null;
  };
}

export default function MentorDiscoveryPage() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [company, setCompany] = useState("");
  const [minExperience, setMinExperience] = useState("");
  const [maxRate, setMaxRate] = useState("");

  const fetchMentors = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (company) params.append("company", company);
      if (minExperience) params.append("minExperience", minExperience);
      if (maxRate) params.append("maxRate", maxRate);

      const queryString = params.toString();
      const endpoint = `/mentors${queryString ? `?${queryString}` : ""}`;

      const response = await apiClient(endpoint);
      setMentors(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load mentors. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [company, minExperience, maxRate]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMentors();
  }, [fetchMentors]);

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMentors();
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      {/* Background Decor */}
      <div className="fixed inset-0 -z-10 pointer-events-none opacity-[0.03]">
        <div className="absolute top-[10%] left-[5%] w-[40%] h-[40%] bg-indigo-600 blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] right-[5%] w-[40%] h-[40%] bg-purple-600 blur-[150px] rounded-full" />
      </div>

      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/10 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
          >
            <Users className="h-3 w-3" />
            Mentor Marketplace
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-zinc-900 tracking-tight leading-[1.1] mb-6"
          >
            Connect with <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Industry Architects.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-500 text-lg max-w-2xl font-medium"
          >
            Skip the guesswork. Get direct access to experienced professionals who have already navigated the paths you&apos;re exploring.
          </motion.p>
        </div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <form onSubmit={handleFilterSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded-[2rem] border border-zinc-100 shadow-xl shadow-zinc-200/20">
            <div className="relative">
              <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input
                placeholder="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="pl-12 h-14 bg-zinc-50/50 border-transparent rounded-2xl focus:bg-white focus:border-indigo-500/20 transition-all text-zinc-900"
              />
            </div>
            <div className="relative">
              <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input
                type="number"
                placeholder="Min Exp (Years)"
                value={minExperience}
                onChange={(e) => setMinExperience(e.target.value)}
                className="pl-12 h-14 bg-zinc-50/50 border-transparent rounded-2xl focus:bg-white focus:border-indigo-500/20 transition-all text-zinc-900"
              />
            </div>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input
                type="number"
                placeholder="Max Rate ($/hr)"
                value={maxRate}
                onChange={(e) => setMaxRate(e.target.value)}
                className="pl-12 h-14 bg-zinc-50/50 border-transparent rounded-2xl focus:bg-white focus:border-indigo-500/20 transition-all text-zinc-900"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 group transition-all"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Filter className="h-4 w-4" />
                  Filter Results
                </>
              )}
            </Button>
          </form>
        </motion.div>

        {/* Content */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-[400px] bg-zinc-50 rounded-[2.5rem] border border-zinc-100 animate-pulse" />
                ))}
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="h-20 w-20 rounded-full bg-red-50 flex items-center justify-center mb-6">
                  <ShieldCheck className="h-10 w-10 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 mb-2">Something went wrong</h3>
                <p className="text-zinc-500 max-w-sm mb-8">{error}</p>
                <Button onClick={fetchMentors} variant="outline" className="rounded-xl font-bold">Try Again</Button>
              </motion.div>
            ) : mentors.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="h-20 w-20 rounded-full bg-zinc-50 flex items-center justify-center mb-6">
                  <Search className="h-10 w-10 text-zinc-300" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 mb-2">No mentors found</h3>
                <p className="text-zinc-500 max-w-sm mb-8">Try adjusting your filters to find the perfect match for your journey.</p>
                <Button
                  onClick={() => {
                    setCompany("");
                    setMinExperience("");
                    setMaxRate("");
                    setTimeout(fetchMentors, 0);
                  }}
                  className="bg-indigo-600 text-white rounded-xl font-bold"
                >
                  Reset Filters
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {mentors.map((mentor) => (
                  <Link key={mentor.id} href={`/whatcanibe/mentors/${mentor.id}`}>
                    <GlowCard className="group h-full p-8 border-zinc-200 bg-white hover:border-indigo-500/30 transition-all rounded-[2.5rem] shadow-xl shadow-zinc-200/20">
                      <div className="flex items-start justify-between mb-8">
                        <div className="h-20 w-20 rounded-2xl bg-zinc-100 overflow-hidden relative">
                          {mentor.user.profilePhoto ? (
                            <img
                              src={mentor.user.profilePhoto}
                              alt={mentor.user.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center bg-indigo-50">
                              <User className="h-10 w-10 text-indigo-300" />
                            </div>
                          )}
                          {mentor.isVerified && (
                            <div className="absolute bottom-0 right-0 p-1 bg-white rounded-tl-xl border-t border-l border-zinc-100">
                              <ShieldCheck className="h-4 w-4 text-indigo-600" />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="flex items-center gap-1 mb-1">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            <span className="text-sm font-bold text-zinc-900">{mentor.ratingAvg || "5.0"}</span>
                          </div>
                          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Rating</span>
                        </div>
                      </div>

                      <div className="mb-8">
                        <h3 className="text-2xl font-bold text-zinc-900 mb-1 group-hover:text-indigo-600 transition-colors">
                          {mentor.user.name}
                        </h3>
                        <p className="text-sm font-medium text-zinc-500 flex items-center gap-2">
                          <Briefcase className="h-4 w-4" />
                          {mentor.designation || "Senior Professional"} @ {mentor.company}
                        </p>
                      </div>

                      <p className="text-zinc-500 text-sm line-clamp-3 mb-8 leading-relaxed font-medium">
                        {mentor.bio}
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Experience</p>
                          <p className="text-lg font-bold text-zinc-900">{mentor.experienceYears || "5"}+ Years</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Rate</p>
                          <p className="text-lg font-bold text-zinc-900">${mentor.hourlyRate || "100"}/hr</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-zinc-100">
                        <span className="text-sm font-bold text-indigo-600 uppercase tracking-widest">View Profile</span>
                        <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                          <ArrowRight className="h-5 w-5" />
                        </div>
                      </div>
                    </GlowCard>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
