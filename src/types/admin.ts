export interface DashboardStats {
  totalStudents: number;
  totalMentors: number;
  pendingMentors: number;
  approvedMentors: number;
  rejectedMentors: number;
  totalBookings: number;
}

export interface AdminApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}
