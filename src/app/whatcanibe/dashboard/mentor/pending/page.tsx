"use client";

import { motion } from "framer-motion";
import { Clock, ShieldCheck, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/glow-card";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

function MentorPendingContent() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none opacity-[0.05]">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl text-center"
      >
        <div className="mb-12">
          <div className="h-24 w-24 rounded-[2rem] bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto mb-8 shadow-xl shadow-indigo-500/10">
            <Clock className="h-12 w-12 text-indigo-600 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight mb-4">
            Application <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Under Review.</span>
          </h1>
          <p className="text-lg text-zinc-500 font-medium max-w-lg mx-auto">
            Thank you for completing your profile! Our team is currently reviewing your credentials to ensure the highest quality of mentorship.
          </p>
        </div>

        <GlowCard className="p-8 border-zinc-100 bg-zinc-50/50 rounded-[2.5rem] mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center shadow-sm">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
              </div>
              <h3 className="font-bold text-zinc-900 text-sm uppercase tracking-wider">Quality Assurance</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">We verify experience and company details to maintain platform integrity.</p>
            </div>
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center shadow-sm">
                <Clock className="h-5 w-5 text-indigo-500" />
              </div>
              <h3 className="font-bold text-zinc-900 text-sm uppercase tracking-wider">Estimated Time</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">Most profiles are approved within 24-48 business hours.</p>
            </div>
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center shadow-sm">
                <Mail className="h-5 w-5 text-purple-500" />
              </div>
              <h3 className="font-bold text-zinc-900 text-sm uppercase tracking-wider">Notifications</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">You will receive an email once your profile has been approved.</p>
            </div>
          </div>
        </GlowCard>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Link href="/whatcanibe">
            <Button variant="outline" className="h-14 px-8 rounded-2xl border-zinc-200 text-zinc-600 font-bold bg-white hover:bg-zinc-50">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
          </Link>
          <Button
            onClick={() => window.location.reload()}
            className="h-14 px-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-xl shadow-indigo-600/20"
          >
            Check Status
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default function MentorPendingPage() {
  return (
    <ProtectedRoute allowedRoles={["mentor"]} requireMentorProfile={true}>
      <MentorPendingContent />
    </ProtectedRoute>
  );
}
