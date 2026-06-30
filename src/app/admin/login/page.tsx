"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, Mail, Lock, ArrowRight } from "lucide-react";
import { apiClient } from "@/lib/api-client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("careerflyghtToken");
    const userStr = localStorage.getItem("careerflyghtUser");

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.role === "admin") {
          router.push("/admin/dashboard");
        }
      } catch (e) {
        // Clear invalid data
        localStorage.removeItem("careerflyghtToken");
        localStorage.removeItem("careerflyghtUser");
      }
    }
  }, [router]);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const data = await apiClient("/auth/login", {
        method: "POST",
        body: {
          email,
          password,
        },
      });

      if (data.data.token && data.data.user) {
        const role = data.data.user.role;

        if (role !== "admin") {
          setIsLoading(false);
          setError("Access denied. This portal is restricted to administrators only.");
          return;
        }

        localStorage.setItem("careerflyghtToken", data.data.token);
        localStorage.setItem("careerflyghtUser", JSON.stringify(data.data.user));

        window.dispatchEvent(new Event("auth-change"));
        router.push("/admin/dashboard");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      const err = error as Error;
      setError(err.message || "Invalid credentials");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="h-12 w-12 bg-zinc-900 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-zinc-900/20">
            <ShieldCheck className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Admin Portal</h1>
          <p className="text-zinc-500 font-medium text-sm mt-1">Management Console</p>
        </div>

        <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <Input
                    type="email"
                    placeholder="admin@careerflyght.com"
                    className="pl-10 h-12 bg-zinc-50/50 border-zinc-200 rounded-xl focus:ring-zinc-900 focus:border-zinc-900 transition-all text-zinc-900"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 h-12 bg-zinc-50/50 border-zinc-200 rounded-xl focus:ring-zinc-900 focus:border-zinc-900 transition-all text-zinc-900"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-xs font-medium text-red-600">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 group"
              >
                {isLoading ? (
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In to Console
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </Button>
            </form>
          </div>

          <div className="px-8 py-4 bg-zinc-50 border-t border-zinc-200 flex justify-center">
            <Link href="/" className="text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
              Return to Website
            </Link>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-zinc-400 font-medium">
          Authorized personnel only. Access is monitored and logged.
        </p>
      </div>
    </div>
  );
}
