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
          "mx-auto max-w-7xl h-20 rounded-2xl border transition-all duration-500 pointer-events-auto",
          scrolled
            ? "bg-card/70 backdrop-blur-xl border-border shadow-2xl py-2"
            : "bg-transparent border-transparent py-4"
        )}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-16">
            <Link
              href={user ? "/whatcanibe/dashboard" : "/whatcanibe"}
              className="group flex items-center gap-3"
            >
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-primary via-blue-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-all duration-500">
                <div className="h-5 w-5 bg-primary-foreground rounded-sm rotate-45 group-hover:rotate-0 transition-transform duration-500" />
              </div>

              <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                WhatCanIBe
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-2 text-base font-black">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-5 py-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-300 relative group/nav uppercase tracking-widest text-[10px]"
                >
                  {link.name}
                  <span className="absolute bottom-1 left-5 right-5 h-0.5 bg-primary opacity-0 group-hover/nav:opacity-100 transition-opacity" />
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-6">
            {user ? (
              <div className="hidden lg:flex items-center gap-6">
                <div className="flex flex-col items-end">
                  <span className="text-base font-black text-foreground tracking-tight">
                    {user.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">
                    Premium Member
                  </span>
                </div>

                <div className="h-10 w-px bg-border" />

                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                >
                  <LogOut className="h-6 w-6" />
                </Button>
              </div>
            ) : (
              <>
                <Link href="/whatcanibe/login">
                  <Button
                    variant="ghost"
                    className="text-base font-black text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest text-[10px]"
                  >
                    Log in
                  </Button>
                </Link>

                <Link href="/whatcanibe/signup">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 h-12 rounded-xl transition-all duration-300 font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20">
                    Get Started
                  </Button>
                </Link>
              </>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-12 w-12 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted"
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
                className="absolute top-24 left-0 right-0 bg-card border border-border rounded-[2.5rem] shadow-2xl overflow-hidden z-[101]"
              >
                <div className="p-8 flex flex-col gap-8">
                  <div className="grid grid-cols-1 gap-3">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-5 rounded-2xl bg-muted/30 border border-border hover:border-primary/30 hover:bg-primary/5 text-xl font-black text-muted-foreground hover:text-foreground flex items-center justify-between group transition-all"
                      >
                        <div className="flex items-center gap-5">
                          {link.icon && <link.icon className="w-6 h-6 text-primary" />}
                          {link.name}
                        </div>

                        <ChevronRight className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                      </Link>
                    ))}
                  </div>

                  <div className="h-px bg-border my-2" />

                  {user ? (
                    <Button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full h-16 bg-destructive/10 border border-destructive/20 text-destructive rounded-2xl font-black text-lg hover:bg-destructive/20 transition-all"
                    >
                      Log Out
                    </Button>
                  ) : (
                    <div className="grid grid-cols-2 gap-6">
                      <Link href="/whatcanibe/login" className="w-full">
                        <Button
                          variant="outline"
                          className="w-full h-16 border-border rounded-2xl font-black text-lg bg-muted/50"
                        >
                          Log In
                        </Button>
                      </Link>

                      <Link href="/whatcanibe/signup" className="w-full">
                        <Button className="w-full h-16 bg-primary text-primary-foreground border-none rounded-2xl font-black text-lg shadow-lg shadow-primary/20">
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