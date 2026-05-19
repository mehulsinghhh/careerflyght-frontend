"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideNavbar = pathname.startsWith("/whatcanibe");

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}