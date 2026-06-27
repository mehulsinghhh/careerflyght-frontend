"use client";

import { motion } from "framer-motion";
import { Clock, ShieldCheck, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MentorPendingPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none opacity-[0.03]">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        className="max-w-2xl w-full text-center"
      >
        <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-50 border border-amber-100 shadow-sm">
          <Clock className="h-10 w-10 text-amber-500" />
        </div>

        <h1 className="text-4xl font-bold text-zinc-900 tracking-tight mb-4">
          Application Under Review
        </h1>

        <p className="text-lg text-zinc-500 font-medium mb-12 max-w-lg mx-auto leading-relaxed">
          Thank you for joining the CareerFlyght mentor community. Your profile has been submitted and is currently being reviewed by our administrative team.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
          <div className="p-6 rounded-2xl border border-zinc-100 bg-zinc-50/50">
            <ShieldCheck className="h-6 w-6 text-indigo-600 mb-4" />
            <h3 className="font-bold text-zinc-900 mb-2">Quality Check</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">We verify experience and credentials to maintain high standards.</p>
          </div>
          <div className="p-6 rounded-2xl border border-zinc-100 bg-zinc-50/50">
            <Mail className="h-6 w-6 text-indigo-600 mb-4" />
            <h3 className="font-bold text-zinc-900 mb-2">Notification</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">You will receive an email once your application is processed.</p>
          </div>
          <div className="p-6 rounded-2xl border border-zinc-100 bg-zinc-50/50">
            <Clock className="h-6 w-6 text-indigo-600 mb-4" />
            <h3 className="font-bold text-zinc-900 mb-2">Timeline</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">Most applications are reviewed within 24-48 business hours.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/whatcanibe/dashboard/mentor-profile">
            <Button variant="outline" className="h-12 px-8 rounded-xl font-bold border-zinc-200 text-zinc-600 hover:bg-zinc-50">
              Review Profile
            </Button>
          </Link>
          <Link href="/">
            <Button className="h-12 px-8 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-bold shadow-xl shadow-zinc-900/10">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <p className="mt-12 text-sm text-zinc-400 font-medium">
          Need help? Contact our support team at <span className="text-indigo-600 underline">support@careerflyght.com</span>
        </p>
      </motion.div>
    </div>
  );
}
