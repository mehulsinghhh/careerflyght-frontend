import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/lib/api/admin";

export const useBookings = (params: {
  page?: number;
  limit?: number
}) => {
  return useQuery({
    queryKey: ["admin", "bookings", params],
    queryFn: () => adminApi.getBookings(params),
  });
};

export const useBooking = (bookingId: string) => {
  return useQuery({
    queryKey: ["admin", "bookings", bookingId],
    queryFn: () => adminApi.getBookingById(bookingId),
    enabled: !!bookingId,
  });
};
