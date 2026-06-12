"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, LayoutDashboard, LogOut, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

export default function WhatCanIBeNavbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<User | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    const syncUser = () => {
      const storedUser = localStorage.getItem("careerflyghtUser");

      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Error parsing user:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    syncUser();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("auth-change", syncUser);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("auth-change", syncUser);
    };
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("careerflyghtUser");
    localStorage.removeItem("careerflyghtToken");
    window.dispatchEvent(new Event("auth-change"));
    setUser(null);
    router.push("/whatcanibe/login");
  };

  const navLinks = [
    ...(user
      ? [
          { name: "Dashboard", href: "/whatcanibe/dashboard", icon: LayoutDashboard },
          { name: "My Bookings", href: "/whatcanibe/dashboard/bookings" },
          ...(user.role === "mentor"
            ? [{ name: "Mentor Dashboard", href: "/whatcanibe/dashboard/mentor" }]
            : [])
        ]
      : []),
    { name: "Careers", href: "/whatcanibe/careers" },
    { name: "Pathways", href: "/whatcanibe/pathways" },
    { name: "Mentorship", href: "/whatcanibe/mentorship" },
  ];

  if (!mounted) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] px-6 py-8 pointer-events-none">
      <header
        className={cn(
          "mx-auto max-w-7xl h-20 rounded-[2rem] border transition-all duration-400 pointer-events-auto overflow-hidden",
          scrolled
            ? "bg-white/80 backdrop-blur-2xl border-indigo-500/10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] scale-[0.98]"
            : "bg-transparent border-transparent"
        )}
      >
        {/* Animated background line for the navbar when scrolled */}
        {scrolled && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
          />
        )}

        <div className="container mx-auto h-full flex items-center justify-between px-10">
          <div className="flex items-center gap-16">
            <Link
              href={user ? "/whatcanibe/dashboard" : "/whatcanibe"}
              className="group flex items-center gap-2"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-[0_8px_16px_rgba(79,70,229,0.2)]">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tighter text-zinc-900">
                WhatCanIBe<span className="text-indigo-600">.</span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "px-5 py-2 rounded-xl transition-all duration-300 relative group/nav",
                    pathname === link.href ? "text-zinc-900" : "text-zinc-500 hover:text-zinc-900"
                  )}
                >
                  {link.name}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-5 right-5 h-0.5 bg-indigo-500 rounded-full"
                    />
                  )}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-6">
            {user ? (
              <div className="hidden lg:flex items-center gap-6">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-bold text-zinc-900 tracking-tight">
                    {user.name}
                  </span>
                  <span className="text-[9px] text-indigo-600 font-bold uppercase tracking-[0.2em]">
                    Active Session
                  </span>
                </div>

                <div className="h-8 w-px bg-zinc-200" />

                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-2xl bg-zinc-100 border border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200 transition-all"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/whatcanibe/login">
                  <Button
                    variant="ghost"
                    className="text-sm font-black text-zinc-500 hover:text-zinc-900 transition-colors uppercase tracking-widest px-6"
                  >
                    Login
                  </Button>
                </Link>

                <Link href="/whatcanibe/signup">
                  <Button className="bg-indigo-600 text-white hover:bg-indigo-700 px-8 h-12 rounded-xl transition-all duration-300 font-black uppercase tracking-widest text-[11px] shadow-[0_8px_16px_rgba(79,70,229,0.2)]">
                    Initiate
                  </Button>
                </Link>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-12 w-12 rounded-2xl bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-zinc-900"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                className="absolute top-24 left-6 right-6 bg-white border border-zinc-200 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.1)] overflow-hidden z-[101] backdrop-blur-3xl"
              >
                <div className="p-10 flex flex-col gap-8">
                  <div className="grid grid-cols-1 gap-3">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "p-6 rounded-[2rem] border transition-all flex items-center justify-between group",
                          pathname === link.href
                            ? "bg-indigo-50 border-indigo-200 text-indigo-600"
                            : "bg-zinc-50 border-zinc-100 text-zinc-500 hover:text-zinc-900 hover:border-zinc-200"
                        )}
                      >
                        <span className="text-xl font-bold uppercase tracking-widest">
                          {link.name}
                        </span>
                        <ChevronRight className="h-6 w-6 text-zinc-700 group-hover:text-indigo-500 transition-colors" />
                      </Link>
                    ))}
                  </div>

                  <div className="h-px bg-zinc-100 my-2" />

                  {user ? (
                    <Button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full h-20 bg-red-50 border border-red-100 text-red-600 rounded-[2rem] text-lg font-black uppercase tracking-widest transition-all hover:bg-red-600 hover:text-white"
                    >
                      Log Out
                    </Button>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      <Link href="/whatcanibe/login" className="w-full">
                        <Button
                          variant="outline"
                          className="w-full h-20 border-zinc-200 rounded-[2rem] text-lg font-black uppercase tracking-widest bg-zinc-50"
                        >
                          Log In
                        </Button>
                      </Link>

                      <Link href="/whatcanibe/signup" className="w-full">
                        <Button className="w-full h-20 bg-indigo-600 text-white border-none rounded-[2rem] text-lg font-black uppercase tracking-widest shadow-xl">
                          Join Mission
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </div>
  );
}
