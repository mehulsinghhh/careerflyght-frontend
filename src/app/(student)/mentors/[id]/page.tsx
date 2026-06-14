"use client";

import { useEffect, useState, use } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  DollarSign,
  ArrowLeft,
  Star,
  User,
  ShieldCheck,
  Mail,
  Share2 as Linkedin,
  Calendar,
  Sparkles,
  ChevronRight,
  Info
} from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/glow-card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MentorBooking } from "@/components/sections/whatcanibe/MentorBooking";

interface Mentor {
  id: string;
  userId: string;
  company: string;
  designation: string | null;
  experienceYears: number | null;
  bio: string;
  linkedinUrl: string | null;
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

export default function MentorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMentor = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await apiClient(`/mentors/${id}`);
        if (response.success) {
          setMentor(response.data);
        } else {
          setError("Mentor not found.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load mentor details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMentor();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !mentor) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
        <div className="h-20 w-20 rounded-full bg-red-50 flex items-center justify-center mb-6">
          <Info className="h-10 w-10 text-red-500" />
        </div>
        <h2 className="text-3xl font-bold text-zinc-900 mb-2">Mentor Not Found</h2>
        <p className="text-zinc-500 text-center max-w-md mb-8">
          The mentor you are looking for might have moved or the link is incorrect.
        </p>
        <Link href="/whatcanibe/mentors">
          <Button className="bg-indigo-600 text-white rounded-xl font-bold h-12 px-8">
            Back to Marketplace
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      {/* Background Decor */}
      <div className="fixed inset-0 -z-10 pointer-events-none opacity-[0.02]">
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-indigo-600 blur-[150px] rounded-full" />
        <div className="absolute bottom-[20%] left-[10%] w-[40%] h-[40%] bg-purple-600 blur-[150px] rounded-full" />
      </div>

      <div className="container mx-auto max-w-6xl">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-zinc-500 hover:text-indigo-600 transition-colors font-bold uppercase tracking-widest text-[10px] mb-12"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to results
        </button>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <GlowCard className="p-8 border-zinc-200 bg-white rounded-[2.5rem] shadow-2xl shadow-zinc-200/30 sticky top-32">
              <div className="flex flex-col items-center text-center">
                <div className="h-32 w-32 rounded-3xl bg-zinc-100 overflow-hidden relative mb-6 shadow-xl shadow-indigo-500/10">
                  {mentor.user.profilePhoto ? (
                    <img
                      src={mentor.user.profilePhoto}
                      alt={mentor.user.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-indigo-50">
                      <User className="h-16 w-16 text-indigo-200" />
                    </div>
                  )}
                  {mentor.isVerified && (
                    <div className="absolute bottom-0 right-0 p-2 bg-indigo-600 rounded-tl-2xl shadow-lg">
                      <ShieldCheck className="h-5 w-5 text-white" />
                    </div>
                  )}
                </div>

                <h1 className="text-3xl font-bold text-zinc-900 mb-2">{mentor.user.name}</h1>
                <p className="text-zinc-500 font-medium mb-6">
                  {mentor.designation || "Senior Professional"} @ {mentor.company}
                </p>

                <div className="flex items-center gap-1.5 px-4 py-2 bg-amber-50 border border-amber-100 rounded-full mb-8">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-bold text-amber-700">{mentor.ratingAvg || "5.0"} Rating</span>
                </div>

                <div className="w-full space-y-3 mb-8">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Experience</span>
                    <span className="font-bold text-zinc-900">{mentor.experienceYears || "5"}+ Years</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100/50">
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Rate</span>
                    <span className="font-bold text-indigo-700">${mentor.hourlyRate || "100"}/hr</span>
                  </div>
                </div>

                <div className="flex gap-4 w-full">
                  {mentor.linkedinUrl && (
                    <a
                      href={mentor.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 h-14 rounded-2xl bg-zinc-100 border border-zinc-200 flex items-center justify-center hover:bg-zinc-200 transition-all text-zinc-600"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                  <a
                    href={`mailto:${mentor.user.email}`}
                    className="flex-1 h-14 rounded-2xl bg-zinc-100 border border-zinc-200 flex items-center justify-center hover:bg-zinc-200 transition-all text-zinc-600"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </GlowCard>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/10 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                <Sparkles className="h-3 w-3" />
                Professional Biography
              </div>
              <h2 className="text-3xl font-bold text-zinc-900 mb-6 tracking-tight">About {mentor.user.name.split(' ')[0]}</h2>
              <div className="prose prose-zinc max-w-none">
                <p className="text-zinc-500 text-lg leading-relaxed font-medium">
                  {mentor.bio}
                </p>
              </div>
            </section>

            <section className="grid md:grid-cols-2 gap-8">
              <GlowCard className="p-8 border-zinc-100 bg-white rounded-3xl">
                <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6">
                  <GraduationCap className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-2">Mentorship Style</h3>
                <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                  Action-oriented guidance focused on practical industry skills, strategic career planning, and direct feedback.
                </p>
              </GlowCard>

              <GlowCard className="p-8 border-zinc-100 bg-white rounded-3xl">
                <div className="h-12 w-12 rounded-2xl bg-purple-50 flex items-center justify-center mb-6">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-2">Typical Availability</h3>
                <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                  Available for 1-on-1 sessions on weekday evenings and weekend mornings. Flexible scheduling for urgent needs.
                </p>
              </GlowCard>
            </section>

            {/* Booking Call to Action */}
            <MentorBooking
              mentorId={mentor.id}
              mentorName={mentor.user.name}
              hourlyRate={mentor.hourlyRate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
