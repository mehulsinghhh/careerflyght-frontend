"use client";

import { useEffect, useState, FormEvent } from "react";
import {
  Briefcase,
  Share2 as Linkedin,
  DollarSign,
  Save,
  ArrowLeft,
  GraduationCap,
  Sparkles,
  Info,
  CheckCircle2
} from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlowCard } from "@/components/ui/glow-card";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Link from "next/link";
import { useRouter } from "next/navigation";

function MentorProfileContent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isNewMentor, setIsNewMentor] = useState(false);

  const [profile, setProfile] = useState({
    company: "",
    designation: "",
    experienceYears: "",
    bio: "",
    linkedinUrl: "",
    hourlyRate: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await apiClient("/mentors/profile");
        if (response.success && response.data) {
          setProfile({
            company: response.data.company || "",
            designation: response.data.designation || "",
            experienceYears: response.data.experienceYears?.toString() || "",
            bio: response.data.bio || "",
            linkedinUrl: response.data.linkedinUrl || "",
            hourlyRate: response.data.hourlyRate?.toString() || "",
          });
          setIsNewMentor(false);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "";
        console.error("Profile fetch error:", errorMessage);

        // Check if no profile exists
        if (errorMessage.toLowerCase().includes("not found") || errorMessage.includes("404")) {
          setIsNewMentor(true);
        } else {
          setError("Failed to load mentor profile.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const updateMentorRoleLocally = () => {
    const storedUser = localStorage.getItem("careerflyghtUser");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user.role !== "mentor") {
          user.role = "mentor";
          localStorage.setItem("careerflyghtUser", JSON.stringify(user));
          window.dispatchEvent(new Event("auth-change"));
        }
      } catch (err) {
        console.error("Failed to parse user for role update", err);
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const payload = {
        ...profile,
        experienceYears: profile.experienceYears ? parseInt(profile.experienceYears) : null,
        hourlyRate: profile.hourlyRate ? parseInt(profile.hourlyRate) : null,
      };

      // If we know it's a new mentor, use POST. Otherwise try PUT and fallback to POST if needed.
      if (isNewMentor) {
        await apiClient("/mentors/profile", {
          method: "POST",
          body: payload,
        });

        updateMentorRoleLocally();

        setSuccess(true);
        setTimeout(() => {
          router.push("/whatcanibe/dashboard/mentor/pending");
        }, 1500);
      } else {
        try {
          await apiClient("/mentors/profile", {
            method: "PUT",
            body: payload,
          });
          setSuccess(true);
          setTimeout(() => setSuccess(false), 3000);
        } catch (putErr) {
          const putMessage = putErr instanceof Error ? putErr.message : "";
          if (putMessage.toLowerCase().includes("not found") || putMessage.includes("404")) {
            // Fallback to POST if PUT fails because profile doesn't exist
            await apiClient("/mentors/profile", {
              method: "POST",
              body: payload,
            });

            updateMentorRoleLocally();

            setSuccess(true);
            setTimeout(() => {
              router.push("/whatcanibe/dashboard/mentor/pending");
            }, 1500);
          } else {
            throw putErr;
          }
        }
      }
    } catch (err) {
      console.error(err);
      setError("Failed to save profile. Please check your inputs and try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <Link
          href="/whatcanibe/dashboard"
          className="flex items-center gap-2 text-zinc-500 hover:text-indigo-600 transition-colors font-bold uppercase tracking-widest text-[10px] mb-12"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-2 text-indigo-600 text-sm font-bold mb-3 uppercase tracking-widest">
            <div className="h-1 w-8 bg-indigo-600 rounded-full" />
            {isNewMentor ? "Mentor Onboarding" : "Mentor Administration"}
          </div>
          <h1 className="text-4xl font-bold text-zinc-900 tracking-tight">
            {isNewMentor ? "Build Your" : "Manage"} <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Professional Identity.</span>
          </h1>
          <p className="text-zinc-500 mt-2 font-medium">
            {isNewMentor
              ? "Join our expert network and help shape the next generation of talent."
              : "Your profile information is visible to students looking for guidance."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <GlowCard className="p-10 border-zinc-200 bg-white rounded-[2.5rem] shadow-xl shadow-zinc-200/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <Briefcase className="h-3 w-3" /> Current Company
                </label>
                <Input
                  placeholder="e.g. Google, Meta"
                  value={profile.company}
                  onChange={(e) => setProfile({...profile, company: e.target.value})}
                  className="h-14 bg-zinc-50 border-zinc-100 rounded-2xl focus:border-indigo-500/50 transition-all text-zinc-900 font-medium"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <Sparkles className="h-3 w-3" /> Professional Title
                </label>
                <Input
                  placeholder="e.g. Senior Software Engineer"
                  value={profile.designation}
                  onChange={(e) => setProfile({...profile, designation: e.target.value})}
                  className="h-14 bg-zinc-50 border-zinc-100 rounded-2xl focus:border-indigo-500/50 transition-all text-zinc-900 font-medium"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <GraduationCap className="h-3 w-3" /> Years of Experience
                </label>
                <Input
                  type="number"
                  placeholder="e.g. 8"
                  value={profile.experienceYears}
                  onChange={(e) => setProfile({...profile, experienceYears: e.target.value})}
                  className="h-14 bg-zinc-50 border-zinc-100 rounded-2xl focus:border-indigo-500/50 transition-all text-zinc-900 font-medium"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <DollarSign className="h-3 w-3" /> Hourly Mentorship Rate
                </label>
                <Input
                  type="number"
                  placeholder="e.g. 150"
                  value={profile.hourlyRate}
                  onChange={(e) => setProfile({...profile, hourlyRate: e.target.value})}
                  className="h-14 bg-zinc-50 border-zinc-100 rounded-2xl focus:border-indigo-500/50 transition-all text-zinc-900 font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-2 mb-10">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <Linkedin className="h-3 w-3" /> LinkedIn Profile URL
              </label>
              <Input
                type="url"
                placeholder="https://linkedin.com/in/username"
                value={profile.linkedinUrl}
                onChange={(e) => setProfile({...profile, linkedinUrl: e.target.value})}
                className="h-14 bg-zinc-50 border-zinc-100 rounded-2xl focus:border-indigo-500/50 transition-all text-zinc-900 font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <Info className="h-3 w-3" /> Professional Bio
              </label>
              <textarea
                placeholder="Describe your expertise and how you can help students..."
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                className="w-full min-h-[200px] p-6 bg-zinc-50 border border-zinc-100 rounded-[2rem] focus:border-indigo-500/50 transition-all text-zinc-900 font-medium outline-none"
                required
              />
            </div>
          </GlowCard>

          {error && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm font-bold flex items-center gap-3">
              <Info className="h-5 w-5" />
              {error}
            </div>
          )}

          <div className="flex items-center justify-between gap-6">
            <p className="text-zinc-400 text-xs font-medium max-w-xs">
              By saving, you agree to make this information public on the CareerFlyght Mentor Marketplace.
            </p>
            <Button
              type="submit"
              disabled={isSaving}
              className={`h-16 px-10 rounded-2xl font-bold text-lg transition-all shadow-xl flex items-center gap-3 ${
                success ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-indigo-600 hover:bg-indigo-700'
              } text-white`}
            >
              {isSaving ? (
                <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : success ? (
                <>
                  <CheckCircle2 className="h-6 w-6" />
                  {isNewMentor ? "Profile Created" : "Saved Successfully"}
                </>
              ) : (
                <>
                  <Save className="h-6 w-6" />
                  {isNewMentor ? "Create Mentor Profile" : "Update Profile"}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function MentorProfilePage() {
  return (
    <ProtectedRoute>
      <MentorProfileContent />
    </ProtectedRoute>
  );
}
