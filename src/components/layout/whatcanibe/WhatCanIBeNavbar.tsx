"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";

export default function WhatCanIBeNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Dashboard", href: "/whatcanibe/dashboard" },
    { name: "Careers", href: "/whatcanibe/careers" },
    { name: "Pathways", href: "/whatcanibe/pathways" },
    { name: "Resources", href: "/whatcanibe/resources" },
    { name: "Mentorship", href: "/whatcanibe/mentorship" },
  ];

  return (
    <header className="fixed top-0 z-[60] w-full border-b border-white/5 bg-black/60 backdrop-blur-xl">
      <div className="container mx-auto flex h-20 items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-12">
          <Link
            href="/whatcanibe"
            className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-violet-400 to-purple-600 bg-clip-text text-transparent"
          >
            WhatCanIBe
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-gray-500">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-white transition-colors duration-300 uppercase tracking-widest text-[11px]"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/login">
                <Button variant="ghost" className="text-xs font-bold text-gray-500 hover:text-white uppercase tracking-widest px-6 h-10">
                  Log in
                </Button>
              </Link>
            <Link href="/signup">
                <Button className="bg-violet-600 hover:bg-violet-700 text-white border-none rounded-xl px-6 h-10 font-bold text-xs shadow-lg shadow-violet-600/20">
                  Get Started
                </Button>
              </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white bg-white/5 border border-white/10 rounded-xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black border-b border-white/10 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-bold text-gray-400 hover:text-white flex items-center justify-between group"
                >
                  {link.name}
                  <ChevronRight className="h-5 w-5 text-gray-600 group-hover:text-violet-500 transition-colors" />
                </Link>
              ))}
              <div className="h-px bg-white/5 my-2" />
              <div className="grid grid-cols-2 gap-4">
              <Link href="/login" className="w-full">
                  <Button variant="outline" className="w-full h-12 border-white/10 rounded-2xl font-bold">
                    Log In
                  </Button>
                </Link>
              <Link href="/signup" className="w-full">
                  <Button className="w-full h-12 bg-violet-600 text-white border-none rounded-2xl font-bold">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
