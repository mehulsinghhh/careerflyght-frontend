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
