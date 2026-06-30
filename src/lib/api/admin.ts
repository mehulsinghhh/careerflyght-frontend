import { apiClient } from "@/lib/api-client";
import { DashboardStats, AdminApiResponse } from "@/types/admin";

export const adminApi = {
  getDashboardStats: async (): Promise<DashboardStats> => {
    const response = await apiClient("/admin/dashboard") as AdminApiResponse<DashboardStats>;
    return response.data;
  },
};
