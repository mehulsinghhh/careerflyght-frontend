# CareerFlyght Admin Panel: Frontend Architecture Audit

## 1. Current Frontend Architecture
The CareerFlyght frontend is built on **Next.js 15+ (App Router)**, utilizing **TypeScript**, **Tailwind CSS**, and **shadcn/ui**.

### Key Architectural Pillars:
*   **Routing:** Organized primarily under `/whatcanibe`, using Next.js App Router for layouts and nested pages.
*   **Authentication:** Client-side JWT-based authentication. Tokens (`careerflyghtToken`) and user metadata (`careerflyghtUser`) are persisted in `localStorage`.
*   **Access Control:** Managed via a centralized `ProtectedRoute` component that validates existence of local tokens and checks the `role` field against an `allowedRoles` array.
*   **API Layer:** A centralized `apiClient` (`src/lib/api-client.ts`) handles request headers (including Bearer tokens) and response parsing.
*   **Design System:** A "Bright Premium" aesthetic using Zinc-based glassmorphism, Framer Motion animations, and Lucide icons.

---

## 2. Existing Strengths
*   **Role-Based Logic Ready:** The `ProtectedRoute` and `localStorage` patterns already support multiple roles (`student`, `mentor`, `admin`), making it easy to restrict the new Admin Panel.
*   **Modular UI Components:** The `src/components/ui` directory contains highly reusable atoms (GlowCard, PolishedModal, Button) that can maintain visual consistency in the Admin Panel.
*   **Centralized API Client:** The existing `apiClient` automatically handles JWT injection, simplifying the transition to Admin-only APIs.
*   **Clean Layout Separation:** The use of `layout.tsx` files allows the Admin Panel to have a completely distinct look and feel without leaking styles or navigation logic into the student/mentor experiences.

---

## 3. Existing Weaknesses
*   **Hardcoded Redirects:** `ProtectedRoute.tsx` currently has hardcoded redirect paths to `/whatcanibe/login`. This needs to be abstracted to support the `/admin/login` entry point.
*   **State Synchronization:** Relying solely on `localStorage` can lead to "stale state" if a user's role is updated on the backend but not refreshed in the browser.
*   **Global Style Leakage:** The `premium-bg` and global noise overlays in the root layout might conflict with the "professional/utility" aesthetic of an Admin Panel.
*   **Lack of Modular Dashboard Shell:** While `WhatCanIBeLayout` exists, there is no generic "Sidebar Dashboard Shell" currently in the codebase.

---

## 4. Routing Strategy Recommendations
To ensure complete isolation and minimize future maintenance, the following routing structure is recommended:

### Admin Routes
*   `/admin/login`: Dedicated entry point for administrators.
*   `/admin/dashboard`: High-level platform analytics and overview.
*   `/admin/mentors`: List view of all mentors with status filtering (Pending/Approved/Rejected).
*   `/admin/mentors/[id]`: Detailed review page for mentor approval.
*   `/admin/users`: User management module (future).
*   `/admin/settings`: Platform configuration (future).

### Mentor Routes (Approval Lifecycle)
*   `/whatcanibe/dashboard/mentor/pending`: The landing page for mentors with `status: "pending"`.
*   `/whatcanibe/dashboard/mentor/rejected`: The landing page for mentors with `status: "rejected"`, displaying feedback.

---

## 5. Layout Recommendations
The Admin Panel should utilize a **dedicated layout** at `src/app/admin/layout.tsx`.

### Recommended Structure:
*   **Persistent Sidebar:** A fixed left-hand navigation bar containing:
    *   Platform Logo
    *   Module Links (Dashboard, Mentors, Users, Analytics)
    *   User Profile / Logout action
*   **Top Header:** Minimalist bar for:
    *   Breadcrumbs (e.g., `Mentors > Review > John Doe`)
    *   Global Search (future)
    *   Notifications (future)
*   **Main Content Area:** A scrollable, high-contrast workspace using a slightly more "utility-focused" Zinc-50 background, distinct from the student's violet/indigo glows.

---

## 6. Navigation Recommendations
*   **Admin Navigation:** Use a sidebar to maximize vertical space for data tables and management tools. Navigation items should be dynamically rendered based on the admin's permissions (if sub-roles are added later).
*   **Mentor/Student Navigation:** No changes required. The `WhatCanIBeNavbar` should remain unaware of the Admin Panel routes to prevent accidental navigation.

---

## 7. Mentor UX (Approval Flow)
The frontend must handle the mentor's `status` field returned by the backend.

### User Flow:
1.  **Registration/Login:** User signs up as a mentor.
2.  **Profile Completion:** User fills out `/whatcanibe/dashboard/mentor-profile`.
3.  **Automatic Redirect:** Upon `POST /mentors/profile` success, the frontend checks the user status. If "pending", it redirects to `/whatcanibe/dashboard/mentor/pending`.
4.  **Pending State:** The `/pending` page displays a "Under Review" card and hides the "Active" dashboard features (Bookings, Analytics).
5.  **Approval:** Once the admin approves, the next login (or session refresh) detects `status: "approved"` and grants access to the standard `/whatcanibe/dashboard/mentor`.
6.  **Rejection:** If `status: "rejected"`, the user is redirected to `/whatcanibe/dashboard/mentor/rejected` which displays the rejection reason from the profile data.

---

## 8. Student UX
*   **Zero-Knowledge Discovery:** The Student Marketplace (`/whatcanibe/mentors`) will continue to use `GET /mentors`.
*   **Backend Filtering:** The frontend relies on the backend to exclude `pending` and `rejected` mentors from the list. No frontend logic changes are needed for filtering.
*   **Booking Safety:** Attempting to visit a profile of a non-approved mentor directly via URL should result in a 404 (handled by the backend) or a "Mentor Not Available" UI state.

---

## 9. Admin UX (Approval Module)
*   **Queue Management:** A searchable table of "Pending" mentors.
*   **Detail Review:** A side-by-side view showing the mentor's profile (reusing fields from `MentorProfilePage`) and an approval panel.
*   **Action Panel:**
    *   `Approve` Button (triggers `PUT /admin/mentors/:id/approve`)
    *   `Reject` Button with a mandatory "Reason for Rejection" text field.

---

## 10. State Management & Data Fetching (TanStack Query)
It is highly recommended to introduce **TanStack Query** for all new Admin Panel data fetching.

### Why TanStack Query for Admin Panel?
*   **Simplified Caching:** Admin workflows involve frequent updates to list states (e.g., approving a mentor and expecting them to disappear from the "Pending" list). TanStack Query's automatic cache invalidation (`invalidateQueries`) makes this trivial compared to manual state management.
*   **Mutation Management:** Handling the loading, success, and error states of administrative actions (Approve/Reject) becomes more robust and consistent across modules.
*   **Background Synchronization:** Admins benefit from "live" data. TanStack Query can ensure the approval queue is kept up-to-date in the background without manual refreshes.
*   **Maintainability:** Reduces the boilerplate code required for `useEffect` and `useState` in complex data tables.

### Incremental Adoption Strategy:
*   Introduce TanStack Query exclusively for the `/admin` route group.
*   The existing student and mentor flows (`/whatcanibe`) can remain unchanged, continuing to use the existing `apiClient` patterns.
*   The `apiClient` should be used as the underlying `queryFn` for TanStack Query, ensuring that JWT injection and authentication headers are preserved without duplication.

---

## 11. Page Reuse Opportunities
*   **Component Reuse:** Re-use the `MentorProfileContent` form logic in a "Read-Only" mode for the Admin's review page.
*   **Modal Reuse:** Re-use `PolishedModal` for the rejection feedback form.
*   **Auth Wrapper:** Extend `ProtectedRoute` to accept a `loginPath` prop to avoid hardcoded redirects to the student login.
*   **Data Display:** Re-use the `GlowCard` stats components for the Admin Dashboard overview.

---

## 12. Scalability Recommendations
*   **Module-Based Directory Structure:** Organize admin features by module (e.g., `src/app/admin/mentors`, `src/app/admin/users`) to allow independent scaling.
*   **Shared Types:** Ensure the `User` and `Mentor` types in `src/types` are comprehensive to serve both the public marketplace and the admin management views.
*   **Admin-Specific UI Library:** Create a subset of components (e.g., `AdminTable`, `AdminStatCard`) that are optimized for density and data management rather than "marketing" aesthetics.

---

## 13. Suggested Implementation Order
1.  **Foundation:** Create `src/app/admin/layout.tsx` and a basic sidebar shell.
2.  **Infrastructure:** Set up TanStack Query `QueryClientProvider` within the Admin layout.
3.  **Auth Extension:** Refactor `ProtectedRoute` to support custom redirect paths.
4.  **Admin Login:** Implement `/admin/login` using a simplified version of the existing login logic.
5.  **Mentor Queue:** Build the `/admin/mentors` table using `useQuery`.
6.  **Approval Detail:** Build the `/admin/mentors/[id]` review page and implement approval/rejection via `useMutation`.
7.  **Mentor State Handlers:** Add status-based redirection logic to the mentor dashboard (`/whatcanibe/dashboard/mentor/page.tsx`).
8.  **Rejected/Pending Pages:** Create the restricted mentor experience pages.

---
**Audit Completed By:** Jules
**Status:** Frozen / Pending Approval
