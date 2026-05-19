import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function WhatCanIBeNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link
            href="/whatcanibe"
            className="text-xl font-bold tracking-tight bg-gradient-to-r from-violet-400 to-purple-600 bg-clip-text text-transparent"
          >
            WhatCanIBe
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
            <Link href="/whatcanibe/careers" className="hover:text-white transition-colors">
              Careers
            </Link>
            <Link href="/whatcanibe/pathways" className="hover:text-white transition-colors">
              Pathways
            </Link>
            <Link href="/whatcanibe/resources" className="hover:text-white transition-colors">
              Resources
            </Link>
            <Link href="/whatcanibe/mentorship" className="hover:text-white transition-colors">
              Mentorship
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-sm font-medium text-gray-400 hover:text-white">
              Log in
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-violet-600 hover:bg-violet-700 text-white border-none">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
