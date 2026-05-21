import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-white/10">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">

        <Link
          href="/"
          className="text-2xl font-bold tracking-tight"
        >
          CareerFlyght
        </Link>

        <nav className="flex items-center gap-6 text-sm text-gray-300">

          <Link href="/whatcanibe">
            WhatCanIBe
          </Link>

          <Link href="/ninthbox">
            9thBox
          </Link>

          <Link href="/admin">
            Admin
          </Link>

          <Link href="/login">
            Login
          </Link>

        </nav>
      </div>
    </header>
  );
}