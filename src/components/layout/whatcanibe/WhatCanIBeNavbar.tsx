"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, LayoutDashboard, LogOut, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

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
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] px-4 md:px-6 py-4 md:py-6 pointer-events-none">
      <header
        className={cn(
          "mx-auto max-w-7xl h-16 rounded-2xl border transition-all duration-500 pointer-events-auto",
          scrolled
            ? "bg-white/70 dark:bg-black/40 backdrop-blur-2xl border-white/20 dark:border-white/10 shadow-2xl py-2"
            : "bg-transparent border-transparent py-4"
        )}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-10">
            <Link
              href={user ? "/whatcanibe/dashboard" : "/whatcanibe"}
              className="group flex items-center gap-2.5"
            >
              <div className="relative h-9 w-9">
                 <div className="absolute inset-0 bg-brand-primary blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                 <div className="relative h-9 w-9 rounded-xl bg-gradient-to-tr from-brand-primary via-purple-500 to-brand-secondary flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
              </div>

              <span className="text-xl md:text-2xl font-heading font-black tracking-tight dark:text-white text-zinc-900 group-hover:text-brand-primary transition-colors">
                WhatCanIBe
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 relative group/nav",
                    pathname === link.href
                      ? "text-brand-primary"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5"
                  )}
                >
                  {link.name}
                  <span className={cn(
                    "absolute bottom-1 left-4 right-4 h-0.5 bg-brand-primary transition-all",
                    pathname === link.href ? "opacity-100" : "opacity-0 group-hover/nav:opacity-50"
                  )} />
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            <div className="h-6 w-px bg-zinc-200 dark:bg-white/10 mx-1 hidden sm:block" />

            {user ? (
              <div className="hidden lg:flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-bold dark:text-white text-zinc-900 tracking-tight">
                    {user.name.split(' ')[0]}
                  </span>
                  <span className="text-[10px] text-brand-primary font-black uppercase tracking-widest">
                    Pro
                  </span>
                </div>

                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-xl text-zinc-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <>
                <Link href="/whatcanibe/login" className="hidden sm:block">
                  <Button
                    variant="ghost"
                    className="text-sm font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    Login
                  </Button>
                </Link>

                <Link href="/whatcanibe/signup">
                  <Button className="bg-brand-primary hover:bg-brand-primary/90 text-white font-bold px-6 h-10 rounded-xl shadow-lg shadow-brand-primary/25 active:scale-95 transition-all">
                    Join Free
                  </Button>
                </Link>
              </>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-10 w-10 rounded-xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                className="absolute top-20 left-0 right-0 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded-[2rem] shadow-2xl overflow-hidden z-[101]"
              >
                <div className="p-6 md:p-8 flex flex-col gap-6">
                  <div className="grid grid-cols-1 gap-2">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "p-4 rounded-2xl border flex items-center justify-between group transition-all font-bold",
                          pathname === link.href
                            ? "bg-brand-primary/10 border-brand-primary/30 text-brand-primary"
                            : "bg-zinc-50 dark:bg-white/[0.02] border-zinc-100 dark:border-white/5 text-zinc-500 dark:text-zinc-400 hover:border-brand-primary/20 hover:bg-brand-primary/5 hover:text-zinc-900 dark:hover:text-white"
                        )}
                      >
                        <div className="flex items-center gap-4">
                          {link.icon && <link.icon className="w-5 h-5" />}
                          {link.name}
                        </div>

                        <ChevronRight className={cn(
                          "h-5 w-5 transition-colors",
                          pathname === link.href ? "text-brand-primary" : "text-zinc-300 dark:text-zinc-700 group-hover:text-brand-primary"
                        )} />
                      </Link>
                    ))}
                  </div>

                  <div className="h-px bg-zinc-200 dark:bg-white/5 my-2" />

                  {user ? (
                    <Button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full h-14 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl font-bold hover:bg-red-500/20 transition-all"
                    >
                      Log Out
                    </Button>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <Link href="/whatcanibe/login" className="w-full">
                        <Button
                          variant="outline"
                          className="w-full h-14 border-zinc-200 dark:border-white/10 rounded-2xl font-bold bg-zinc-50 dark:bg-white/5"
                        >
                          Log In
                        </Button>
                      </Link>

                      <Link href="/whatcanibe/signup" className="w-full">
                        <Button className="w-full h-14 bg-brand-primary text-white border-none rounded-2xl font-bold shadow-lg shadow-brand-primary/20">
                          Sign Up
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
