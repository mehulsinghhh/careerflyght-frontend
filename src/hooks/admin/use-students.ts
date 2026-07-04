import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/lib/api/admin";

export const useStudents = (params: {
  page?: number;
  limit?: number
}) => {
  return useQuery({
    queryKey: ["admin", "students", params],
    queryFn: () => adminApi.getStudents(params),
  });
};

export const useStudent = (studentId: string) => {
  return useQuery({
    queryKey: ["admin", "students", studentId],
    queryFn: () => adminApi.getStudentById(studentId),
    enabled: !!studentId,
  });
};

export const useStudentBookings = (studentId: string) => {
  return useQuery({
    queryKey: ["admin", "students", studentId, "bookings"],
    queryFn: () => adminApi.getStudentBookings(studentId),
    enabled: !!studentId,
  });
};
