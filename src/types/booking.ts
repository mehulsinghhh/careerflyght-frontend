export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export type SessionType = 'online' | 'offline';

export interface Booking {
  id: string;
  studentId: string;
  mentorId: string;
  bookingDate: string;
  bookingTime: string;
  sessionType: SessionType;
  status: BookingStatus;
  notes: string | null;
  amount: string | null;
  meetingLink: string | null;
  mentor?: {
    user: {
      id: string;
      name: string;
    };
  };
  student?: {
    user: {
      id: string;
      name: string;
    };
  };
}

export interface CreateBookingPayload {
  mentorId: string;
  bookingDate: string; // ISO string
  bookingTime: string;
  sessionType: SessionType;
  notes?: string;
}

export interface UpdateBookingStatusPayload {
  status: BookingStatus;
}
