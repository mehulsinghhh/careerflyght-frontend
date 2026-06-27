import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-zinc-100 bg-white">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">

        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-zinc-900"
        >
          CareerFlyght
        </Link>

        <nav className="flex items-center gap-6 text-sm text-zinc-500 font-medium">

          <Link href="/whatcanibe" className="hover:text-indigo-600 transition-colors">
            WhatCanIBe
          </Link>

          <Link href="/ninthbox" className="hover:text-indigo-600 transition-colors">
            9thBox
          </Link>

          <Link href="/admin/login" className="hover:text-indigo-600 transition-colors">
            Admin
          </Link>

          <Link href="/login" className="hover:text-indigo-600 transition-colors">
            Login
          </Link>

        </nav>
      </div>
    </header>
  );
}