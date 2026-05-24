"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, LayoutDashboard, LogOut } from "lucide-react";
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
    { name: "Resources", href: "/whatcanibe/resources" },
    { name: "Mentorship", href: "/whatcanibe/mentorship" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] px-6 py-6 pointer-events-none">
      <header
        className={cn(
          "mx-auto max-w-7xl h-16 rounded-2xl border transition-all duration-500 pointer-events-auto",
          scrolled
            ? "bg-black/40 backdrop-blur-xl border-white/10 shadow-2xl py-2"
            : "bg-transparent border-transparent py-4"
        )}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-12">
            <Link
              href={user ? "/whatcanibe/dashboard" : "/whatcanibe"}
              className="group flex items-center gap-2"
            >
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center shadow-lg shadow-brand-primary/20 group-hover:scale-110 transition-transform duration-500">
                <div className="h-4 w-4 bg-white rounded-sm rotate-45 group-hover:rotate-0 transition-transform duration-500" />
              </div>

              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                WhatCanIBe
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-300 relative group/nav"
                >
                  {link.name}
                  <span className="absolute bottom-1 left-4 right-4 h-px bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-0 group-hover/nav:opacity-100 transition-opacity" />
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="hidden lg:flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-bold text-white tracking-tight">
                    {user.name}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                    Premium Member
                  </span>
                </div>

                <div className="h-10 w-px bg-white/10" />

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
                <Link href="/whatcanibe/login">
                  <Button
                    variant="ghost"
                    className="text-sm font-bold text-zinc-400 hover:text-white transition-colors"
                  >
                    Log in
                  </Button>
                </Link>

                <Link href="/whatcanibe/signup">
                  <Button className="bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-2 rounded-xl transition-all duration-300">
                    Get Started
                  </Button>
                </Link>
              </>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-10 w-10 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5"
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
                className="absolute top-20 left-0 right-0 bg-zinc-950 border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden z-[101]"
              >
                <div className="p-8 flex flex-col gap-6">
                  <div className="grid grid-cols-1 gap-2">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-brand-primary/20 hover:bg-brand-primary/5 text-lg font-bold text-zinc-400 hover:text-white flex items-center justify-between group transition-all"
                      >
                        <div className="flex items-center gap-4">
                          {link.icon && <link.icon className="w-5 h-5 text-brand-primary" />}
                          {link.name}
                        </div>

                        <ChevronRight className="h-5 w-5 text-zinc-600 group-hover:text-brand-primary transition-colors" />
                      </Link>
                    ))}
                  </div>

                  <div className="h-px bg-white/5 my-2" />

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
                          className="w-full h-14 border-white/10 rounded-2xl font-bold bg-white/5"
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