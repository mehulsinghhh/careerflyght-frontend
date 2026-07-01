"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { apiClient } from "@/lib/api-client";

export function AdminProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function checkAuthorization() {
      const token = localStorage.getItem("adminToken");
      const userStr = localStorage.getItem("adminUser");

      if (!token || !userStr) {
        if (isMounted) router.push("/admin/login");
        return;
      }

      try {
        // Validate with backend
        const response = await apiClient("/auth/me");

        // Backend /auth/me returns { success: true, data: { user: { ... } } }
        // but sometimes it might be flat { success: true, data: { ...user } }
        const user = response.data.user || response.data;

        if (user.role !== "admin") {
          // Clear invalid session
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminUser");

          if (isMounted) {
            if (user.role === "student") {
              router.push("/whatcanibe/dashboard/student");
            } else if (user.role === "mentor") {
              router.push("/whatcanibe/dashboard/mentor");
            } else {
              router.push("/admin/login");
            }
          }
          return;
        }

        // Sync local storage
        localStorage.setItem("adminUser", JSON.stringify(user));

        if (isMounted) {
          setIsAuthorized(true);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error during admin protection check:", error);
        // Clear session on error (e.g. invalid token)
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        if (isMounted) router.push("/admin/login");
      }
    }

    checkAuthorization();

    return () => {
      isMounted = false;
    };
  }, [router, pathname]);

  if (isLoading || !isAuthorized) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-zinc-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
