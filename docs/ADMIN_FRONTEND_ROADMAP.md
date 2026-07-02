# CareerFlyght Admin Frontend Roadmap

This document serves as the authoritative roadmap and single source of truth for the development of the CareerFlyght Admin Panel. It outlines completed work, establishes development standards, and defines the phased implementation of remaining modules.

---

## 1. Current Project Status

### Technical Stack
- **Frontend Framework**: Next.js 16.2.6 (App Router)
- **UI Library**: React 19.2.4
- **Styling**: Tailwind CSS 4, shadcn/ui
- **State Management**: TanStack Query v5 (React Query)
- **Icons**: Lucide React
- **Language**: TypeScript

### Backend Stack
- **Environment**: Node.js
- **Language**: TypeScript
- **ORM**: Prisma
- **Architecture**: Service-Controller pattern

### Backend Integration
- **API Client**: Centralized `apiClient` with dynamic token selection (`adminToken` for `/admin` routes).
- **Authentication**: JWT-based authentication using isolated `localStorage` keys (`adminToken`, `adminUser`).
- **Authorization**: Strict RBAC (Role-Based Access Control) verified via `GET /auth/me`.

### Admin Architecture
- **Route Isolation**: All admin routes are located under `/src/app/admin`.
- **Layout Structure**: Nested layouts with a dedicated `(authenticated)` group sharing `AdminSidebar` and `AdminHeader`.
- **Protection**: Secured via `AdminProtectedRoute` which performs backend session verification.

---

## 2. Completed Work

### Backend Prerequisites
- ✅ JWT Authentication & RBAC implementation.
- ✅ `GET /api/admin/dashboard` (Platform statistics).
- ✅ `GET /api/admin/mentors` (Paginated mentor list with filters).
- ✅ `PATCH /api/admin/mentors/:id/approve` & `PATCH /api/admin/mentors/:id/reject`.
- ✅ `GET /api/admin/students` (Paginated student list).

### Admin Phase 1: Foundation
- ✅ Foundation layout and navigation.
- ✅ Admin login page with role-specific error handling.
- ✅ Secure route guarding with `AdminProtectedRoute`.
- ✅ Real-time Dashboard with metric cards (`StatsCard`).
- ✅ Standardized error (`AdminErrorState`) and loading (`DashboardSkeleton`) states.

### Admin Phase 2: Mentor Management
- ✅ Paginated mentor directory (`/admin/mentors`).
- ✅ Status-based filtering (All, Pending, Approved, Rejected).
- ✅ Client-side search for currently loaded page.
- ✅ Mentor Approval and Rejection workflows with dialogs.
- ✅ Dedicated TanStack Query hooks for mentor state management.

---

## 3. Remaining Admin Phases

### Phase 3: Student Management
**Objective**: Provide administrators with a comprehensive directory to manage and view student profiles.

- **Pages**:
    - `/admin/users`: Paginated list of all students.
    - `/admin/users/[id]`: Detailed student profile view.
- **Components to build**:
    - `StudentTable`: Reusable table for student data.
    - `StudentRow`: Individual row component.
    - `StudentProfileCard`: Detailed view of student information.
    - `BookingHistoryList`: Summary of student's past and upcoming bookings.
- **Existing Components to Reuse**: `FilterTabs`, `Pagination`, `SearchBar`, `AdminModal`, `DashboardSkeleton`, `AdminErrorState`.
- **Existing Backend Endpoints**:
    - `GET /api/admin/students`: Returns paginated list.
- **Backend Prerequisites**:
    - `GET /api/admin/students/:id`: To fetch individual student details.
    - `GET /api/admin/students/:id/bookings`: To fetch booking history for a specific student.
- **Acceptance Criteria**:
    - Students are displayed in a paginated table.
    - Search by name or email works on the current page.
    - Admins can navigate to a student's detail page.
    - Student profile and booking history are displayed correctly.
- **Testing Checklist**:
    - Verify pagination works correctly.
    - Verify search filters the list as expected.
    - Verify 404 handling for non-existent student IDs.
- **Dependencies**: Depends on completion of Phase 1 architecture.
- **Risks**: Student profiles might have missing fields if registration wasn't fully completed.
- **Estimated Complexity**: Medium
- **Estimated Order**: 1

### Phase 4: Booking Management
**Objective**: Centralized management of all mentorship sessions across the platform.

- **Pages**:
    - `/admin/bookings`: Global list of all bookings.
    - `/admin/bookings/[id]`: Booking detail view.
- **Components to build**:
    - `BookingTable`: Table displaying mentor, student, date, and status.
    - `BookingStatusBadge`: Specialized badge for booking states.
    - `BookingFilters`: Advanced filters (date range, status, mentor/student ID).
- **Existing Components to Reuse**: `Pagination`, `SearchBar`, `AdminModal`.
- **Existing Backend Endpoints**: None (currently using student/mentor specific endpoints).
- **Backend Prerequisites**:
    - `GET /api/admin/bookings`: Paginated list of all bookings.
    - `GET /api/admin/bookings/:id`: Detail view of a specific booking.
    - `PATCH /api/admin/bookings/:id/status`: Administrative status override (if required).
- **Acceptance Criteria**:
    - Global visibility of all sessions.
    - Filter by status (Pending, Confirmed, Completed, Cancelled).
    - Links to both Student and Mentor profiles from the booking list.
- **Testing Checklist**:
    - Verify status filtering.
    - Verify navigation to related profiles.
- **Dependencies**: Phase 3 (for linking to Student profiles).
- **Risks**: High volume of bookings may require optimized backend pagination and filtering.
- **Estimated Complexity**: Medium
- **Estimated Order**: 2

### Phase 5: Settings
**Objective**: Manage admin profile and platform-wide configurations.

- **Pages**:
    - `/admin/settings`: Admin profile and basic settings.
- **Components to build**:
    - `AdminProfileForm`: Form to update admin information.
    - `SecuritySettings`: Password change interface.
- **Existing Components to Reuse**: Standard shadcn/ui form components.
- **Existing Backend Endpoints**:
    - `GET /auth/me`: Current session info.
- **Backend Prerequisites**:
    - `PUT /api/admin/profile`: Update admin account details.
    - `POST /api/admin/change-password`: Update password.
- **Acceptance Criteria**:
    - Admin can view and update their profile details.
    - Form validation for all fields.
- **Testing Checklist**:
    - Verify successful profile update updates the UI immediately.
    - Verify password validation rules.
- **Dependencies**: Backend password update endpoints.
- **Risks**: Handling sensitive data (passwords) requires careful implementation.
- **Estimated Complexity**: Low
- **Estimated Order**: 3

---

## 4. Future Roadmap (Long-term)

| Phase | Module | Objective |
| :--- | :--- | :--- |
| **Phase 6** | **Analytics Dashboard** | Visualizing platform growth, booking trends, and revenue metrics. |
| **Phase 7** | **Audit Logs** | Tracking all administrative actions (approvals, rejections, settings changes). |
| **Phase 8** | **Reports & Export** | Generating CSV/PDF reports for students, mentors, and financial data. |
| **Phase 9** | **Notification Management**| Managing system-wide alerts and email templates. |
| **Phase 10**| **Platform Configuration**| Managing dynamic platform constants (e.g., categories, skills, fees). |

---

## 5. Reusable Admin Components Inventory

The following components must be reused in all future phases to maintain UI consistency:

- **Layouts**: `AdminSidebar`, `AdminHeader`, `AdminProtectedRoute`.
- **Data Display**: `StatsCard`, `MentorTable` (pattern), `StatusBadge`.
- **Feedback**: `DashboardSkeleton`, `AdminErrorState`.
- **Controls**: `FilterTabs`, `Pagination`, `SearchBar`, `AdminModal`.
- **Dialogs**: `ApprovalDialog`, `RejectDialog`.

### Reusable Hooks & Services
- **Hooks**: `useDashboard`, `useMentors`, `useApproveMentor`, `useRejectMentor`.
- **API Services**: `adminApi` in `src/lib/api/admin.ts`.
- **Client**: `apiClient` in `src/lib/api-client.ts`.

---

## 6. Development Rules & Constraints

1. **Backend Contracts**: Do not modify existing backend contracts. Future requirements must be listed as prerequisites.
2. **Authentication**: Do not modify the authentication or session model unless explicitly requested.
3. **Session Isolation**: Maintain strict isolation between `adminToken`/`platformToken`.
4. **UI Consistency**: Reuse existing admin components and Tailwind patterns.
5. **Regression Testing**: Ensure new features do not break existing Mentor Management or Dashboard functionality.
6. **TanStack Query**: All data fetching must use TanStack Query hooks for caching and state management.
7. **Type Safety**: All API responses and component props must be fully typed in `src/types/admin.ts` or local types.

---

## 7. Technical Summary

### Known Future Backend Prerequisites
- `GET /api/admin/students/:id`
- `GET /api/admin/students/:id/bookings`
- `GET /api/admin/bookings` (Paginated global list)
- `GET /api/admin/bookings/:id`
- `PUT /api/admin/profile`
- `POST /api/admin/change-password`

### Current Completion Percentage: ~40%
- ✅ Foundation (Phase 1)
- ✅ Mentor Management (Phase 2)
- ⏳ Student Management (Phase 3)
- ⏳ Booking Management (Phase 4)
- ⏳ Settings (Phase 5)
- ⏳ Future Modules (Phase 6+)

### API Endpoints Consumed
- `GET /admin/dashboard`
- `GET /admin/mentors`
- `GET /admin/mentors/pending`
- `PATCH /admin/mentors/:id/approve`
- `PATCH /admin/mentors/:id/reject`
- `PATCH /admin/mentors/:id/status`
- `GET /auth/me`

### Technical Debt
- **Search Logic**: Currently performs client-side search on the paginated data returned from the server. As the database grows, search should be moved to the backend via query parameters.
- **Toast Notifications**: Errors are currently logged to the console or shown via `AdminErrorState`. A centralized toast system (e.g., `sonner`) should be implemented for mutation feedback.

### Lessons Learned
- **RBAC Enforcement**: The `AdminProtectedRoute` must always be the first line of defense in the layout to prevent layout flickering.
- **Data Persistence**: Merging `localStorage` data with `/auth/me` responses is critical to avoid losing profile information like `name` and `email` during session refreshes.
