"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import {
  ArrowLeft,
  User,
  GraduationCap,
  Briefcase,
  MapPin,
  FileText,
  Sparkles,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { apiClient } from "@/lib/api-client";

interface StudentProfileData {
  educationLevel: string;
  preferredCountry: string;
  careerInterest: string;
  bio: string;
  resumeUrl: string | null;
}

function StudentOnboardingContent() {
  const router = useRouter();

  const [formData, setFormData] = useState<StudentProfileData>({
    educationLevel: "",
    preferredCountry: "",
    careerInterest: "",
    bio: "",
    resumeUrl: null
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [hasExistingProfile, setHasExistingProfile] = useState(false);

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await apiClient("/users/profile");
      if (response.success && response.data) {
        setFormData({
          educationLevel: response.data.educationLevel || "",
          preferredCountry: response.data.preferredCountry || "",
          careerInterest: response.data.careerInterest || "",
          bio: response.data.bio || "",
          resumeUrl: response.data.resumeUrl || null
        });
        setHasExistingProfile(true);
      }
    } catch (err: unknown) {
      // 404/Not Found is expected for new users
      console.log("No existing profile found or error fetching profile:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProfile();
  }, [fetchProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const method = hasExistingProfile ? "PUT" : "POST";
      const response = await apiClient("/users/profile", {
        method,
        body: formData
      });

      if (response.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/whatcanibe/dashboard/student");
        }, 2000);
      }
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message || "Failed to save profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-6">
      {/* Background Glows */}
      <div className="fixed inset-0 -z-10 pointer-events-none opacity-[0.03]">
        <div className="absolute top-[5%] right-[10%] w-[30%] h-[30%] bg-violet-600 blur-[120px] rounded-full" />
        <div className="absolute bottom-[5%] left-[10%] w-[30%] h-[30%] bg-purple-600 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex flex-col gap-4">
            <Button
              variant="ghost"
              onClick={() => router.push("/whatcanibe/dashboard/student")}
              className="w-fit text-zinc-500 hover:text-zinc-900 -ml-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-indigo-600 text-sm font-bold uppercase tracking-widest">
                <Sparkles className="h-4 w-4" />
                Profile Setup
              </div>
              <h1 className="text-4xl font-bold text-zinc-900 tracking-tight">
                {hasExistingProfile ? "Update Your Profile" : "Tell Us About Yourself"}
              </h1>
              <p className="text-zinc-500 text-lg">
                Complete your profile to unlock mentorship sessions and personalized career guidance.
              </p>
            </div>
          </div>

          <Card className="bg-white border-zinc-100 overflow-hidden rounded-[2rem] shadow-sm">
            <CardContent className="p-8">
              {success ? (
                <div className="flex flex-col items-center py-12 text-center">
                  <div className="h-20 w-20 rounded-full bg-emerald-50 flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-900 mb-2">Profile Saved!</h3>
                  <p className="text-zinc-500 font-medium">
                    Redirecting you back to your dashboard...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                      <p className="text-sm text-red-600 font-medium">{error}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">
                        Education Level
                      </label>
                      <div className="relative">
                        <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                        <Input
                          placeholder="e.g. Undergraduate, High School, Master's"
                          required
                          value={formData.educationLevel}
                          onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
                          className="pl-12 h-14 bg-zinc-50 border-zinc-100 rounded-2xl focus:border-indigo-500/50 transition-all text-zinc-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">
                        Target Country
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                        <Input
                          placeholder="e.g. USA, UK, Canada"
                          required
                          value={formData.preferredCountry}
                          onChange={(e) => setFormData({ ...formData, preferredCountry: e.target.value })}
                          className="pl-12 h-14 bg-zinc-50 border-zinc-100 rounded-2xl focus:border-indigo-500/50 transition-all text-zinc-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">
                        Career Interests
                      </label>
                      <div className="relative">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                        <Input
                          placeholder="e.g. Software Engineering, Data Science"
                          required
                          value={formData.careerInterest}
                          onChange={(e) => setFormData({ ...formData, careerInterest: e.target.value })}
                          className="pl-12 h-14 bg-zinc-50 border-zinc-100 rounded-2xl focus:border-indigo-500/50 transition-all text-zinc-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">
                        Biography
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-6 h-4 w-4 text-zinc-400" />
                        <textarea
                          placeholder="Tell us a bit about your background and goals..."
                          required
                          value={formData.bio}
                          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                          className="w-full min-h-[120px] pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:border-indigo-500/50 transition-all text-zinc-900 text-sm outline-none resize-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">
                        Resume URL (Optional)
                      </label>
                      <div className="relative">
                        <FileText className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                        <Input
                          placeholder="https://link-to-your-resume.pdf"
                          type="url"
                          value={formData.resumeUrl || ""}
                          onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value || null })}
                          className="pl-12 h-14 bg-zinc-50 border-zinc-100 rounded-2xl focus:border-indigo-500/50 transition-all text-zinc-900"
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-indigo-600/20"
                  >
                    {isSubmitting ? (
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      hasExistingProfile ? "Update Profile" : "Complete Setup"
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default function StudentOnboardingPage() {
  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <StudentOnboardingContent />
    </ProtectedRoute>
  );
}
