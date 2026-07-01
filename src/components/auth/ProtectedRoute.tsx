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
      const token = localStorage.getItem("platformToken");
      const userStr = localStorage.getItem("platformUser");

      if (!token || !userStr) {
        if (isMounted) router.push("/whatcanibe/login");
        return;
      }

      try {
        // 1. Validate session with backend
        const authResponse = await apiClient("/auth/me");

        // Backend /auth/me returns { success: true, data: { user: { ... } } }
        // but sometimes it might be flat { success: true, data: { ...user } }
        const user = authResponse.data.user || authResponse.data;
        const userRole = user.role;

        // 2. Role Authorization
        if (allowedRoles && !allowedRoles.includes(userRole)) {
          if (isMounted) {
            if (userRole === "student") {
              router.push("/whatcanibe/dashboard/student");
            } else if (userRole === "mentor") {
              router.push("/whatcanibe/dashboard/mentor");
            } else if (userRole === "admin") {
              router.push("/admin/dashboard");
            } else {
              router.push("/whatcanibe/login");
            }
          }
          return;
        }

        // 3. Mentor Profile Verification (if required)
        if (userRole === "mentor" && requireMentorProfile) {
          try {
            await apiClient("/mentors/profile");
          } catch (error) {
            if (error instanceof ApiError && error.status === 404) {
              if (isMounted) {
                router.push("/whatcanibe/dashboard/mentor-profile");
              }
              return;
            }
            console.error("Mentor profile check failed:", error);
          }
        }

        // Sync local storage
        localStorage.setItem("platformUser", JSON.stringify(user));

        if (isMounted) {
          setIsAuthorized(true);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error during protection check:", error);
        // Clear invalid session
        localStorage.removeItem("platformToken");
        localStorage.removeItem("platformUser");
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
