"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { apiClient } from "@/lib/api-client";

export function ProtectedRoute({
  children,
  allowedRoles,
  requireMentorProfile = false,
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
  requireMentorProfile?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const token = localStorage.getItem("careerflyghtToken");
    const userStr = localStorage.getItem("careerflyghtUser");

    if (!token || !userStr) {
      if (window.location.pathname.startsWith("/admin")) {
        router.push("/admin/login");
      } else {
        router.push("/whatcanibe/login");
      }
      return;
    }

    try {
      const user = JSON.parse(userStr);
      const userRole = user.role;

      if (allowedRoles && !allowedRoles.includes(userRole)) {
        // Redirect to their appropriate dashboard if they don't have access
        if (userRole === "student") {
          router.push("/whatcanibe/dashboard/student");
        } else if (userRole === "mentor") {
          router.push("/whatcanibe/dashboard/mentor");
        } else if (userRole === "admin") {
          router.push("/admin/dashboard");
        } else {
          if (window.location.pathname.startsWith("/admin")) {
            router.push("/admin/login");
          } else {
            router.push("/whatcanibe/login");
          }
        }
        return;
      }

      // Centralized Mentor Profile & Status Verification
      if (userRole === "mentor" && requireMentorProfile) {
        // Skip check if already on public-facing dashboard pages
        const isOnPendingPage = pathname === "/whatcanibe/dashboard/mentor/pending";
        const isOnProfilePage = pathname === "/whatcanibe/dashboard/mentor-profile";

        if (!isOnPendingPage && !isOnProfilePage) {
          apiClient("/mentors/profile")
            .then((res) => {
              if (!isMounted) return;

              const profile = res.data;
              if (profile.approvalStatus === "PENDING") {
                router.push("/whatcanibe/dashboard/mentor/pending");
              } else if (profile.approvalStatus === "APPROVED") {
                setIsAuthorized(true);
              } else {
                // Handle REJECTED or other states if necessary
                setIsAuthorized(true);
              }
            })
            .catch((err) => {
              if (!isMounted) return;

              const errorMessage = err.message || "";
              if (errorMessage.includes("404") || errorMessage.toLowerCase().includes("not found") || errorMessage.toLowerCase().includes("mentor profile not found")) {
                router.push("/whatcanibe/dashboard/mentor-profile");
              } else {
                console.error("Error verifying mentor profile:", err);
                setIsAuthorized(true); // Fallback to allow access if API fails
              }
            });
          return;
        }
      }

      setIsAuthorized(true);
    } catch (error) {
      console.error("Error parsing user for protection:", error);
      if (window.location.pathname.startsWith("/admin")) {
        router.push("/admin/login");
      } else {
        router.push("/whatcanibe/login");
      }
    }
    return () => { isMounted = false; };
  }, [router, pathname, allowedRoles, requireMentorProfile]);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
