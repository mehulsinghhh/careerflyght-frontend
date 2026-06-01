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
    window.dispatchEvent(new Event("auth-change"));
    setUser(null);
    router.push("/whatcanibe/login");
  };

  const navLinks = [
    ...(user
      ? [{ name: "Dashboard", href: "/whatcanibe/dashboard", icon: LayoutDashboard }]
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
          "mx-auto max-w-7xl h-24 rounded-[2.5rem] border-strong transition-all duration-500 pointer-events-auto overflow-hidden",
          scrolled
            ? "bg-white border-zinc-950 shadow-hero scale-[0.98]"
            : "bg-white/50 backdrop-blur-xl border-strong"
        )}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-12">
          <div className="flex items-center gap-16">
            <Link
              href={user ? "/whatcanibe/dashboard" : "/whatcanibe"}
              className="group flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-zinc-950 flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-premium">
                <Sparkles className="w-7 h-7 text-primary" />
              </div>
              <span className="text-3xl font-black tracking-tighter text-zinc-950 uppercase">
                WhatCanIBe<span className="text-primary italic">.</span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.2em]">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "px-6 py-3 rounded-2xl transition-all duration-300 relative group/nav",
                    pathname === link.href ? "text-zinc-950 bg-zinc-100" : "text-zinc-500 hover:text-zinc-950 hover:bg-zinc-50"
                  )}
                >
                  {link.name}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 border-2 border-zinc-950 rounded-2xl pointer-events-none"
                    />
                  )}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-8">
            {user ? (
              <div className="hidden lg:flex items-center gap-8">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-black text-zinc-950 tracking-tight uppercase">
                    {user.name}
                  </span>
                  <span className="text-[9px] text-primary font-black uppercase tracking-[0.3em]">
                    Active Neural Link
                  </span>
                </div>

                <div className="h-10 w-px bg-zinc-200" />

                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  size="icon"
                  className="h-14 w-14 rounded-2xl bg-zinc-50 border-strong text-zinc-500 hover:text-white hover:bg-zinc-950 transition-all"
                >
                  <LogOut className="h-6 w-6" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <Link href="/whatcanibe/login">
                  <Button
                    variant="ghost"
                    className="text-[11px] font-black text-zinc-500 hover:text-zinc-950 transition-colors uppercase tracking-[0.3em] px-8"
                  >
                    Login
                  </Button>
                </Link>

                <Link href="/whatcanibe/signup">
                  <Button className="bg-zinc-950 text-white hover:bg-primary px-10 h-14 rounded-2xl transition-all duration-500 font-black uppercase tracking-[0.3em] text-[11px] shadow-hero border-none">
                    Initiate
                  </Button>
                </Link>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-14 w-14 rounded-2xl bg-zinc-50 border-strong text-zinc-950 hover:bg-white"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              {isMobileMenuOpen ? <X className="h-7 h-7" /> : <Menu className="h-7 h-7" />}
            </Button>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                className="absolute top-32 left-6 right-6 bg-white border-2 border-zinc-950 rounded-[3rem] shadow-hero overflow-hidden z-[101]"
              >
                <div className="p-12 flex flex-col gap-10">
                  <div className="grid grid-cols-1 gap-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "p-8 rounded-[2.5rem] border-2 transition-all flex items-center justify-between group",
                          pathname === link.href
                            ? "bg-zinc-950 border-zinc-950 text-white"
                            : "bg-white border-zinc-100 text-zinc-400 hover:text-zinc-950 hover:border-zinc-950"
                        )}
                      >
                        <span className="text-2xl font-black uppercase tracking-[0.2em]">
                          {link.name}
                        </span>
                        <ChevronRight className="h-8 w-8 transition-transform group-hover:translate-x-2" />
                      </Link>
                    ))}
                  </div>

                  <div className="h-px bg-strong" />

                  {user ? (
                    <Button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full h-24 bg-red-50 text-red-600 border-2 border-red-100 rounded-[2.5rem] text-xl font-black uppercase tracking-[0.3em] transition-all hover:bg-red-600 hover:text-white"
                    >
                      Terminate Link
                    </Button>
                  ) : (
                    <div className="grid grid-cols-1 gap-6">
                      <Link href="/whatcanibe/login" className="w-full">
                        <Button
                          variant="outline"
                          className="w-full h-24 border-2 border-zinc-950 rounded-[2.5rem] text-xl font-black uppercase tracking-[0.3em] bg-white"
                        >
                          Login
                        </Button>
                      </Link>

                      <Link href="/whatcanibe/signup" className="w-full">
                        <Button className="w-full h-24 bg-zinc-950 text-white border-none rounded-[2.5rem] text-xl font-black uppercase tracking-[0.3em] shadow-hero">
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
