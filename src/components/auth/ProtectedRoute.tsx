"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { apiClient, ApiError } from "@/lib/api-client";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function checkAuthorization() {
      const token = localStorage.getItem("careerflyghtToken");
      const userStr = localStorage.getItem("careerflyghtUser");

      if (!token || !userStr) {
        if (isMounted) router.push("/whatcanibe/login");
        return;
      }

      try {
        const user = JSON.parse(userStr);
        const userRole = user.role;

        // 1. Role Authorization
        if (allowedRoles && !allowedRoles.includes(userRole)) {
          if (isMounted) {
            if (userRole === "student") {
              router.push("/whatcanibe/dashboard/student");
            } else if (userRole === "mentor") {
              router.push("/whatcanibe/dashboard/mentor");
            } else {
              router.push("/whatcanibe/login");
            }
          }
          return;
        }

        // 2. Mentor Profile & Approval Verification (if required)
        if (userRole === "mentor" && requireMentorProfile) {
          try {
            const profileRes = await apiClient("/mentors/profile");
            const profile = profileRes.data;

            if (!profile) {
              if (isMounted && !pathname.includes("/dashboard/mentor-profile")) {
                router.push("/whatcanibe/dashboard/mentor-profile");
                return;
              }
            } else {
              const approvalStatus = profile.approvalStatus || "PENDING";
              const isPendingPage = pathname.includes("/dashboard/mentor/pending");
              const isProfilePage = pathname.includes("/dashboard/mentor-profile");

              if (approvalStatus === "PENDING") {
                if (isMounted && !isPendingPage && !isProfilePage) {
                  router.push("/whatcanibe/dashboard/mentor/pending");
                  return;
                }
              } else if (approvalStatus === "APPROVED") {
                if (isMounted && isPendingPage) {
                  router.push("/whatcanibe/dashboard/mentor");
                  return;
                }
              }
            }
          } catch (error) {
            if (error instanceof ApiError && error.status === 404) {
              if (isMounted && !pathname.includes("/dashboard/mentor-profile")) {
                router.push("/whatcanibe/dashboard/mentor-profile");
                return;
              }
            } else {
              console.error("Mentor profile check failed:", error);
              // On unexpected error, we don't authorize to be safe
              return;
            }
          }
        }

        if (isMounted) {
          setIsAuthorized(true);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error during protection check:", error);
        if (isMounted) router.push("/whatcanibe/login");
      }
    }

    checkAuthorization();

    return () => {
      isMounted = false;
    };
  }, [router, allowedRoles, requireMentorProfile, pathname]);

  if (isLoading || !isAuthorized) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
