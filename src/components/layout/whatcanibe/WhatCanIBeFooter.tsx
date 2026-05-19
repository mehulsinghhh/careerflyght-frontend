import Link from "next/link";

export default function WhatCanIBeFooter() {
  return (
    <footer className="bg-black border-t border-white/10 py-12 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/whatcanibe"
              className="text-xl font-bold tracking-tight bg-gradient-to-r from-violet-400 to-purple-600 bg-clip-text text-transparent"
            >
              WhatCanIBe
            </Link>
            <p className="mt-4 text-sm text-gray-400 max-w-xs">
              Empowering the next generation to discover, explore, and achieve their dream careers with AI-driven insights and expert mentorship.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/whatcanibe/careers" className="hover:text-violet-400 transition-colors">Careers</Link></li>
              <li><Link href="/whatcanibe/pathways" className="hover:text-violet-400 transition-colors">Pathways</Link></li>
              <li><Link href="/whatcanibe/mentorship" className="hover:text-violet-400 transition-colors">Mentorship</Link></li>
              <li><Link href="/whatcanibe/resources" className="hover:text-violet-400 transition-colors">Resources</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-violet-400 transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-violet-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-violet-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-violet-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Social</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-violet-400 transition-colors">Twitter</Link></li>
              <li><Link href="#" className="hover:text-violet-400 transition-colors">LinkedIn</Link></li>
              <li><Link href="#" className="hover:text-violet-400 transition-colors">Instagram</Link></li>
              <li><Link href="#" className="hover:text-violet-400 transition-colors">Discord</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} WhatCanIBe. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Part of CareerFlyght Ecosystem</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
