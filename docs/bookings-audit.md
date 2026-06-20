# Booking Endpoints Audit Report

This document audits the booking-related endpoints against the backend contract and current frontend implementation.

## 1. POST /bookings (Create Booking)
*   **Payload Shape:**
    ```json
    {
      "mentorId": "string (BigInt)",
      "bookingDate": "string (ISO Date)",
      "bookingTime": "string",
      "sessionType": "online | offline",
      "notes": "string (optional)"
    }
    ```
*   **Response Shape:**
    ```json
    {
      "success": true,
      "data": {
        "id": "string",
        "studentId": "string",
        "mentorId": "string",
        "bookingDate": "string",
        "bookingTime": "string",
        "sessionType": "string",
        "status": "pending",
        "notes": "string | null",
        "amount": "string | null",
        "meetingLink": "string | null"
      }
    }
    ```
*   **Current Frontend Usage:** Implemented in `src/components/sections/whatcanibe/BookingModal.tsx`. It correctly sends the ISO date and session details.
*   **Missing Integration Gaps:**
    *   **Student Profile Requirement:** The backend requires a student profile to exist (`/users/profile`) before a booking can be created. The UI should proactively check for this or handle the `400 Student profile not found` error by redirecting to onboarding.
    *   **Validation:** Needs stronger client-side validation for date/time to avoid past bookings.

---

## 2. GET /bookings/my-bookings (Student's View)
*   **Payload Shape:** None.
*   **Response Shape:**
    ```json
    {
      "success": true,
      "data": [
        {
          "id": "string",
          "studentId": "string",
          "mentorId": "string",
          "bookingDate": "string",
          "bookingTime": "string",
          "sessionType": "string",
          "status": "string",
          "notes": "string | null",
          "amount": "string | null",
          "meetingLink": "string | null"
        }
      ]
    }
    ```
*   **Current Frontend Usage:** Used in `src/app/whatcanibe/dashboard/student/page.tsx`.
*   **Missing Integration Gaps:**
    *   **Data Structure Mismatch:** The API returns a flat list with IDs. The frontend currently attempts to access `booking.mentor.user.name`, which does not exist in the response.
    *   **Fallback Logic:** UI fallbacks are needed to display mentor names (e.g., via a separate fetch or displaying truncated IDs).

---

## 3. GET /bookings/mentor-bookings (Mentor's View)
*   **Payload Shape:** None.
*   **Response Shape:** Flat list of booking objects containing `studentId`.
*   **Current Frontend Usage:** Used in `src/app/whatcanibe/dashboard/mentor/page.tsx`.
*   **Missing Integration Gaps:**
    *   **Data Structure Mismatch:** Similar to the student view, the response lacks nested student user details.
    *   **Student Info:** Mentors cannot currently see student details (career interest, bio) without a separate API call to the student's profile.

---

## 4. PUT /bookings/:bookingId/status (Manage Status)
*   **Payload Shape:**
    ```json
    {
      "status": "confirmed | completed | cancelled"
    }
    ```
*   **Response Shape:** Returns the updated booking object.
*   **Current Frontend Usage:** Integrated in `src/app/whatcanibe/dashboard/mentor/page.tsx` for Accept/Decline/Complete actions.
*   **Missing Integration Gaps:**
    *   **Status Constraints:** The UI should prevent invalid transitions (e.g., cancelling a completed session).
    *   **Meeting Links:** No current way for mentors to provide a `meetingLink` during the confirmation step via the standard status update endpoint.
