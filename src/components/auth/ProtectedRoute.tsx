"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("careerflyghtToken");
    const userStr = localStorage.getItem("careerflyghtUser");

    if (!token || !userStr) {
      router.push("/whatcanibe/login");
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
        } else {
          router.push("/whatcanibe/login");
        }
        return;
      }

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAuthorized(true);
    } catch (error) {
      console.error("Error parsing user for protection:", error);
      router.push("/whatcanibe/login");
    }
  }, [router, allowedRoles]);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
