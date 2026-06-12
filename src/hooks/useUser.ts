"use client";

import { useState, useEffect } from "react";

export type UserRole = "student" | "mentor";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const syncUser = () => {
      const storedUser = localStorage.getItem("careerflyghtUser");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Failed to parse user:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    };

    syncUser();

    window.addEventListener("auth-change", syncUser);
    return () => window.removeEventListener("auth-change", syncUser);
  }, []);

  const isMentor = user?.role === "mentor";
  const isStudent = user?.role === "student";

  return { user, isLoading, isMentor, isStudent };
}
