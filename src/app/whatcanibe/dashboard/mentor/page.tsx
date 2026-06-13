"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { GlowCard } from "@/components/ui/glow-card";
import { Button } from "@/components/ui/button";
import { Briefcase, Sparkles, User, AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

interface MentorProfile {
  company: string;
  designation: string;
}

interface UserData {
  id: string;
  name: string;
  role: string;
}

function MentorDashboardContent() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [profile, setProfile] = useState<MentorProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("careerflyghtUser");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(parsedUser);

        if (parsedUser.role !== "mentor") {
          setIsRedirecting(true);
          router.replace("/whatcanibe/dashboard");
          return;
        }
      } catch (err) {
        console.error("Failed to parse user data", err);
      }
    } else {
      // ProtectedRoute should handle missing user/token, but safety first
      setIsRedirecting(true);
      router.replace("/whatcanibe/login");
      return;
    }

    const fetchProfile = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await apiClient("/mentors/profile");
        if (response.success && response.data) {
          setProfile({
            company: response.data.company || "Not specified",
            designation: response.data.designation || "Not specified",
          });
        }
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        if (errorMessage.toLowerCase().includes("not found") || errorMessage.includes("404")) {
          setProfile(null);
        } else {
          setError("Failed to load mentor profile data.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (isRedirecting) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-zinc-500 font-medium animate-pulse">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50/30 pt-24 pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-10">
          <div className="flex items-center gap-2 text-indigo-600 text-sm font-bold mb-3 uppercase tracking-widest">
            <div className="h-1 w-8 bg-indigo-600 rounded-full" />
            Mentor Workspace
          </div>
          <h1 className="text-4xl font-bold text-zinc-900 tracking-tight">
            Dashboard Overview
          </h1>
        </div>

        {error ? (
          <GlowCard className="p-8 border-red-100 bg-red-50/30">
            <div className="flex items-center gap-4 text-red-600">
              <AlertCircle className="h-6 w-6" />
              <p className="font-bold">{error}</p>
            </div>
            <Button
              onClick={() => window.location.reload()}
              className="mt-4 bg-white border border-red-200 text-red-600 hover:bg-red-50 font-bold rounded-xl"
            >
              Try Again
            </Button>
          </GlowCard>
        ) : !profile ? (
          <GlowCard className="p-12 border-zinc-200 bg-white text-center flex flex-col items-center">
            <div className="h-16 w-16 bg-zinc-50 rounded-2xl flex items-center justify-center mb-6 border border-zinc-100">
              <User className="h-8 w-8 text-zinc-400" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 mb-2">Mentor profile not found.</h2>
            <p className="text-zinc-500 mb-8 max-w-md mx-auto">
              Your profile is currently incomplete. Complete your professional profile to start mentoring students.
            </p>
            <Link href="/whatcanibe/dashboard/mentor-profile">
              <Button className="h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20 flex items-center gap-2">
                Complete Mentor Profile
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </GlowCard>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            <GlowCard className="p-10 border-zinc-200 bg-white">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-2">
                      <User className="h-3 w-3" /> Mentor Name
                    </label>
                    <p className="text-3xl font-bold text-zinc-900 tracking-tight">
                      {user?.name}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-2">
                        <Briefcase className="h-3 w-3" /> Company
                      </label>
                      <p className="text-xl font-semibold text-zinc-700">
                        {profile.company}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-2">
                        <Sparkles className="h-3 w-3" /> Designation
                      </label>
                      <p className="text-xl font-semibold text-zinc-700">
                        {profile.designation}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </GlowCard>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MentorDashboardPage() {
  return (
    <ProtectedRoute>
      <MentorDashboardContent />
    </ProtectedRoute>
  );
}
