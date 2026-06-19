# Implementation Roadmap: CareerFlyht MVP

## Current State Summary
The application is currently in a transitional state with a "unified" architecture. Users register as students by default and can "convert" to mentors by creating a professional profile. The dashboard is a single shared route (`/whatcanibe/dashboard`) that uses conditional rendering and is populated with ~90% mock data. Booking functionality is currently a UI-only mock with no backend connection.

## Target State Summary
A robust, role-separated MVP architecture where:
- Users select their role (Student or Mentor) at the point of registration.
- Authentication logic handles role-based redirects immediately after login.
- Students and Mentors have completely isolated dashboard experiences on dedicated routes.
- The "Student → Mentor" conversion flow is removed from the UI.
- All dashboard and booking features are powered by live backend data.

---

## Route Changes

### Routes to Add
- `/whatcanibe/dashboard/student`: Dedicated dashboard for student users.
- `/whatcanibe/dashboard/mentor`: Dedicated dashboard for mentor users.
- `/whatcanibe/onboarding/student`: Profile creation for new students.
- `/whatcanibe/onboarding/mentor`: Profile creation for new mentors.

### Routes to Modify
- `/whatcanibe/signup`: Add role selection toggle (Student/Mentor).
- `/whatcanibe/login`: Implement post-login role-based redirect logic.
- `/whatcanibe/mentors/[id]`: Integrate real booking submission.

### Routes to Remove
- `/whatcanibe/dashboard` (Shared): To be replaced by role-specific routes.
- `/whatcanibe/dashboard/mentor-profile`: To be replaced by the dedicated onboarding/settings route.
- `/admin`, `/login`, `/signup`, `/ninthbox` (Root level): Legacy placeholders.

---

## Authentication Changes
1.  **Signup Payload:** Update registration logic to include the `role` selected by the user.
2.  **Role Persistence:** Continue using `localStorage` for JWT and User objects, but ensure `role` is strictly sourced from the backend response.
3.  **Redirect Logic:**
    - If `role === 'student'`, redirect to `/whatcanibe/dashboard/student`.
    - If `role === 'mentor'`, redirect to `/whatcanibe/dashboard/mentor`.
4.  **Session Recovery:** Implement `GET /auth/me` on application initialization to verify token validity and refresh the user's role from the server.

---

## Role Handling Changes
- **Strict Role Isolation:** Remove any logic that manually updates roles in `localStorage`.
- **Protected Routes:** Update `ProtectedRoute.tsx` to accept an optional `allowedRoles` prop to prevent students from accessing mentor dashboards and vice versa.

---

## Student Dashboard Plan

| Feature | Backend Endpoint | Frontend File | Implementation Notes |
| :--- | :--- | :--- | :--- |
| **Profile Overview** | `GET /users/me` | `StudentDashboard.tsx` | Display name, email, and basic user status. |
| **Academic Info** | `GET /users/profile` | `StudentDashboard.tsx` | Display education level and career interests. |
| **Booking List** | `GET /bookings/my-bookings` | `BookingCard.tsx` | List upcoming sessions with mentor names and dates. |
| **Mentor Discovery**| `GET /mentors` | `DiscoveryStrip.tsx` | Show a "Recommended Mentors" carousel based on profile interests. |

---

## Mentor Dashboard Plan

| Feature | Backend Endpoint | Frontend File | Implementation Notes |
| :--- | :--- | :--- | :--- |
| **Professional Info** | `GET /mentors/profile` | `MentorDashboard.tsx` | Display company, designation, and hourly rate. |
| **Session Requests** | `GET /bookings/mentor-bookings` | `RequestManager.tsx` | List incoming bookings with `pending` status. |
| **Schedule Overview**| `GET /bookings/mentor-bookings` | `MentorCalendar.tsx` | Display `confirmed` bookings in a timeline view. |
| **Earnings/Stats** | (Manual Calculation) | `MentorStats.tsx` | Calculate total confirmed hours x hourly rate. |

---

## Booking Integration Plan

### 1. Create Booking
- **Action:** Student clicks "Book Session" on Mentor Detail page.
- **Endpoint:** `POST /bookings`
- **Payload:** `mentorId`, `bookingDate`, `bookingTime`, `sessionType`, `notes`.

### 2. Student Bookings
- **Action:** Student views "My Sessions" tab.
- **Endpoint:** `GET /bookings/my-bookings`
- **Behavior:** Display cards with status labels (`pending`, `confirmed`, `cancelled`).

### 3. Mentor Bookings
- **Action:** Mentor views "Incoming Requests".
- **Endpoint:** `GET /bookings/mentor-bookings`
- **Behavior:** Group by status; prioritize `pending` requests.

### 4. Booking Status Updates
- **Action:** Mentor clicks "Accept" or "Decline".
- **Endpoint:** `PUT /bookings/:bookingId/status`
- **Status transitions:** `pending` → `confirmed` or `cancelled`.

---

## Files To Modify
- `src/app/whatcanibe/signup/page.tsx`: Add role selection.
- `src/app/whatcanibe/login/page.tsx`: Add redirect logic.
- `src/components/auth/ProtectedRoute.tsx`: Add role-based guarding.
- `src/components/layout/whatcanibe/WhatCanIBeNavbar.tsx`: Update navigation links based on role.
- `src/app/whatcanibe/mentors/[id]/page.tsx`: Connect booking button to API.

## Files To Create
- `src/app/whatcanibe/dashboard/student/page.tsx`: New Student Dashboard.
- `src/app/whatcanibe/dashboard/mentor/page.tsx`: New Mentor Dashboard.
- `src/app/whatcanibe/onboarding/student/page.tsx`: Student profile setup form.
- `src/app/whatcanibe/onboarding/mentor/page.tsx`: Mentor profile setup form.
- `src/components/dashboard/BookingCard.tsx`: Reusable booking display component.

## Files To Remove
- `src/app/whatcanibe/dashboard/page.tsx`
- `src/app/whatcanibe/dashboard/mentor-profile/page.tsx`
- `src/app/page.tsx`
- `src/app/login/page.tsx`
- `src/app/signup/page.tsx`
- `src/constants/dashboard.ts` (Once all data is live)

---

## Recommended Implementation Order

### Phase 1: Authentication & Role Foundations
- Implement role selection in Signup.
- Implement role-based redirection in Login.
- Add role-based protection to `ProtectedRoute`.
- **Goal:** Users can register as Mentors or Students and reach different (empty) dashboards.

### Phase 2: Student Dashboard & Onboarding
- Build `/whatcanibe/onboarding/student`.
- Implement `GET /users/profile` and `GET /users/me` on the new Student Dashboard.
- **Goal:** Students have a personalized, data-driven home.

### Phase 3: Mentor Dashboard & Onboarding
- Move mentor profile logic to `/whatcanibe/onboarding/mentor`.
- Implement `GET /mentors/profile` on the new Mentor Dashboard.
- **Goal:** Mentors have a dedicated space for professional management.

### Phase 4: Booking System Integration
- Implement `POST /bookings` from the mentor profile page.
- Build the "My Bookings" view for students.
- Build the "Session Requests" manager for mentors.
- Implement booking status updates.
- **Goal:** Core mentorship transaction loop is closed.

### Phase 5: Cleanup & Polish
- Remove all legacy routes and mock constants.
- Refactor shared components for consistency across dashboards.
