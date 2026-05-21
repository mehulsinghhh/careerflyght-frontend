"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  BookOpen,
  Target,
  Award,
  ArrowRight,
  TrendingUp,
  Map
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedUser = localStorage.getItem("careerflyghtUser");
    if (!storedUser) {
      router.push("/login");
    } else {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user:", error);
        router.push("/login");
      }
    }
  }, [router]);

  if (!mounted || !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-6">
      {/* Background Glows */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[5%] right-[10%] w-[30%] h-[30%] bg-violet-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[5%] left-[10%] w-[30%] h-[30%] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-violet-400 text-sm font-medium mb-2">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard Overview
          </div>
          <h1 className="text-4xl font-bold text-white">
            Welcome back, <span className="bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">{user.name}</span>!
          </h1>
          <p className="text-gray-400 mt-2">{user.email}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Career Progress Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-400 uppercase tracking-wider">Active Pathways</CardTitle>
                    <BookOpen className="h-4 w-4 text-violet-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">0</div>
                  <p className="text-xs text-gray-500 mt-1">Start exploring careers to add pathways</p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-400 uppercase tracking-wider">Skills Acquired</CardTitle>
                    <Award className="h-4 w-4 text-violet-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">0</div>
                  <p className="text-xs text-gray-500 mt-1">Complete roadmap milestones to earn skills</p>
                </CardContent>
              </Card>
            </div>

            {/* Roadmap Placeholder */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden">
              <CardHeader className="border-b border-white/10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                    <Map className="h-5 w-5 text-violet-400" />
                    Your Learning Roadmap
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-violet-400 hover:text-violet-300">
                    View Full Roadmap
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="py-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="h-16 w-16 bg-violet-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target className="h-8 w-8 text-violet-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">No active roadmap found</h3>
                  <p className="text-gray-400 mb-8">
                    Select a career path to generate a personalized roadmap with AI-curated resources and milestones.
                  </p>
                  <Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl px-8" onClick={() => router.push('/whatcanibe/careers')}>
                    Explore Careers
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            {/* Recommended Careers Placeholder */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-violet-400" />
                  Recommended for You
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/5 group hover:border-violet-500/30 transition-all cursor-pointer">
                      <div className="h-10 w-10 rounded-lg bg-violet-600/10 border border-violet-500/20 animate-pulse" />
                      <div className="flex-1 ml-4 space-y-2">
                        <div className="h-3 w-24 bg-white/10 rounded animate-pulse" />
                        <div className="h-2 w-16 bg-white/5 rounded animate-pulse" />
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-600 group-hover:text-violet-400 transition-colors" />
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-6 border-white/10 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl">
                  Personalize My Interests
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
