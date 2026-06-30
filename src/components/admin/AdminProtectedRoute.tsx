"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

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
    function checkAuthorization() {
      const token = localStorage.getItem("careerflyghtToken");
      const userStr = localStorage.getItem("careerflyghtUser");

      if (!token || !userStr) {
        router.push("/admin/login");
        return;
      }

      try {
        const user = JSON.parse(userStr);
        const userRole = user.role;

        if (userRole !== "admin") {
          // If authenticated but not admin, we could redirect to their respective dashboard
          // but for the admin portal, we strictly want to stay away if not admin.
          // For now, let's redirect to login with an error would be nice, but
          // let's stick to simple redirect or a forbidden state.
          // Based on requirements: "Authenticated but not admin → redirect away (or show Unauthorized)"
          if (userRole === "student") {
            router.push("/whatcanibe/dashboard/student");
          } else if (userRole === "mentor") {
            router.push("/whatcanibe/dashboard/mentor");
          } else {
            router.push("/admin/login");
          }
          return;
        }

        setIsAuthorized(true);
        setIsLoading(false);
      } catch (error) {
        console.error("Error during admin protection check:", error);
        router.push("/admin/login");
      }
    }

    checkAuthorization();
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
