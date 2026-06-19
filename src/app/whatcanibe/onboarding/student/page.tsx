"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  User,
  GraduationCap,
  Briefcase,
  MapPin,
  FileText,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

function StudentOnboardingPlaceholder() {
  const router = useRouter();

  const requiredFields = [
    { label: "Education Level", icon: GraduationCap, description: "Your current or most recent academic qualification" },
    { label: "Target Country", icon: MapPin, description: "Where you plan to pursue your career" },
    { label: "Career Interests", icon: Briefcase, description: "Specific industries or roles you're interested in" },
    { label: "Biography", icon: User, description: "A short introduction about yourself" },
    { label: "Professional Resume", icon: FileText, description: "Upload your latest CV in PDF format" }
  ];

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
                Coming Soon
              </div>
              <h1 className="text-4xl font-bold text-zinc-900 tracking-tight">
                Profile Setup
              </h1>
              <p className="text-zinc-500 text-lg">
                We&apos;re building a personalized onboarding experience to help you find the perfect career path.
              </p>
            </div>
          </div>

          {/* Placeholder Card */}
          <Card className="bg-white border-zinc-100 overflow-hidden rounded-[2rem] shadow-sm">
            <CardHeader className="bg-zinc-50/50 border-b border-zinc-100 p-8">
              <CardTitle className="text-xl font-bold text-zinc-900 flex items-center gap-3">
                <FileText className="h-6 w-6 text-indigo-600" />
                Required Fields Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <p className="text-sm text-zinc-500 mb-6">
                  To provide you with the best AI-driven career matches and mentorship recommendations, we will soon require the following information:
                </p>

                <div className="grid gap-4">
                  {requiredFields.map((field, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-2xl border border-zinc-50 bg-zinc-50/30">
                      <div className="h-10 w-10 rounded-xl bg-white border border-zinc-100 flex items-center justify-center shrink-0">
                        <field.icon className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-zinc-900">{field.label}</p>
                        <p className="text-xs text-zinc-500 mt-1">{field.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 rounded-2xl bg-indigo-50 border border-indigo-100">
                  <p className="text-sm text-indigo-900 font-medium leading-relaxed">
                    Once this feature is live, you&apos;ll be able to complete your profile and unlock personalized roadmaps, AI matches, and mentorship sessions.
                  </p>
                </div>

                <Button
                  onClick={() => router.push("/whatcanibe/dashboard/student")}
                  className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold h-12"
                >
                  Return to Dashboard
                </Button>
              </div>
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
      <StudentOnboardingPlaceholder />
    </ProtectedRoute>
  );
}
