import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/lib/api/admin";

export const useDashboard = () => {
  return useQuery({
    queryKey: ["admin", "dashboard"],
    queryFn: adminApi.getDashboardStats,
  });
};
