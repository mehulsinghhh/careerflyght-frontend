import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/lib/api/admin";
import { MentorStatus } from "@/types/admin";

export const useMentors = (params: {
  status?: MentorStatus;
  page?: number;
  limit?: number
}) => {
  return useQuery({
    queryKey: ["admin", "mentors", params],
    queryFn: () => adminApi.getMentors(params),
  });
};

export const useApproveMentor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (mentorId: string) => adminApi.approveMentor(mentorId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "mentors"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "dashboard"] });
    },
  });
};

export const useRejectMentor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ mentorId, reason }: { mentorId: string; reason?: string }) =>
      adminApi.rejectMentor(mentorId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "mentors"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "dashboard"] });
    },
  });
};
