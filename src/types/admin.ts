export type MentorStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  profilePhoto: string | null;
  createdAt: string;
}

export interface Mentor {
  id: string;
  userId: string;
  company: string;
  designation: string;
  experienceYears: number;
  hourlyRate: string;
  approvalStatus: MentorStatus;
  user: AdminUser;
}

export interface Student {
  id: string;
  userId: string;
  educationLevel: string;
  preferredCountry: string;
  careerInterests?: string[];
  user: AdminUser;
}

export interface AdminBooking {
  id: string;
  bookingDate: string;
  bookingTime: string;
  sessionType: string;
  status: string;
  amount: string | null;
  meetingLink: string | null;
  notes: string | null;
  createdAt: string;
  student: {
    id: string;
    educationLevel: string;
    preferredCountry: string;
    careerInterest?: string[];
    resumeUrl?: string | null;
    bio?: string | null;
    user: AdminUser;
  };
  mentor: {
    id: string;
    company: string;
    designation: string;
    yearsExperience: number;
    hourlyRate: string;
    expertise?: string[];
    user: AdminUser;
  };
}

export interface MentorActionResponse {
  id: string;
  approvalStatus: MentorStatus;
  reviewedBy?: string;
  reviewedAt?: string;
  reviewNotes?: string;
}

export interface DashboardStats {
  totalStudents: number;
  totalMentors: number;
  pendingMentors: number;
  approvedMentors: number;
  rejectedMentors: number;
  totalBookings: number;
}

export interface PaginationData {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export interface AdminApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: PaginationData;
}
