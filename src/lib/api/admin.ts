import { apiClient } from "@/lib/api-client";
import { DashboardStats, AdminApiResponse, Mentor, MentorStatus, MentorActionResponse, Student } from "@/types/admin";

export const adminApi = {
  getDashboardStats: async (): Promise<DashboardStats> => {
    const response = await apiClient("/admin/dashboard") as AdminApiResponse<DashboardStats>;
    return response.data;
  },

  getMentors: async (params: {
    status?: MentorStatus;
    page?: number;
    limit?: number
  }): Promise<AdminApiResponse<Mentor[]>> => {
    const query = new URLSearchParams();
    if (params.status) query.append("status", params.status);
    if (params.page) query.append("page", params.page.toString());
    if (params.limit) query.append("limit", params.limit.toString());

    const queryString = query.toString();
    const endpoint = `/admin/mentors${queryString ? `?${queryString}` : ""}`;

    return await apiClient(endpoint) as AdminApiResponse<Mentor[]>;
  },

  getPendingMentors: async (params: {
    page?: number;
    limit?: number
  }): Promise<AdminApiResponse<Mentor[]>> => {
    const query = new URLSearchParams();
    if (params.page) query.append("page", params.page.toString());
    if (params.limit) query.append("limit", params.limit.toString());

    const queryString = query.toString();
    const endpoint = `/admin/mentors/pending${queryString ? `?${queryString}` : ""}`;

    return await apiClient(endpoint) as AdminApiResponse<Mentor[]>;
  },

  approveMentor: async (mentorId: string): Promise<AdminApiResponse<MentorActionResponse>> => {
    return await apiClient(`/admin/mentors/${mentorId}/approve`, {
      method: "PATCH",
    }) as AdminApiResponse<MentorActionResponse>;
  },

  rejectMentor: async (mentorId: string, reason?: string): Promise<AdminApiResponse<MentorActionResponse>> => {
    return await apiClient(`/admin/mentors/${mentorId}/reject`, {
      method: "PATCH",
      body: reason ? { reason } : undefined,
    }) as AdminApiResponse<MentorActionResponse>;
  },

  updateMentorStatus: async (mentorId: string, status: MentorStatus, reviewNotes?: string): Promise<AdminApiResponse<MentorActionResponse>> => {
    return await apiClient(`/admin/mentors/${mentorId}/status`, {
      method: "PATCH",
      body: { status, reviewNotes },
    }) as AdminApiResponse<MentorActionResponse>;
  },

  getStudents: async (params: {
    page?: number;
    limit?: number
  }): Promise<AdminApiResponse<Student[]>> => {
    const query = new URLSearchParams();
    if (params.page) query.append("page", params.page.toString());
    if (params.limit) query.append("limit", params.limit.toString());

    const queryString = query.toString();
    const endpoint = `/admin/students${queryString ? `?${queryString}` : ""}`;

    return await apiClient(endpoint) as AdminApiResponse<Student[]>;
  },
};
