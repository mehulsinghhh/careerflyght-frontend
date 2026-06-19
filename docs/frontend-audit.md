# CareerFlyht Frontend Audit

## Project Overview
The CareerFlyht frontend is a Next.js 15+ application using the App Router, TypeScript, and Tailwind CSS. The project has undergone a transition or rebranding into the **WhatCanIBe** product, which currently serves as the primary active application within the repository.

The application uses a "bright, premium" light-mode design system with Zinc-based backgrounds and vibrant accent colors. Authentication is managed client-side using JWT tokens stored in `localStorage`.

---

## Route Map
| Route | Page File | Status | Description |
| :--- | :--- | :--- | :--- |
| `/` | `src/app/page.tsx` | Placeholder | Root landing page (Legacy/Static) |
| `/login` | `src/app/login/page.tsx` | Placeholder | Empty login page (Legacy) |
| `/signup` | `src/app/signup/page.tsx` | Placeholder | Empty signup page (Legacy) |
| `/admin` | `src/app/admin/page.tsx` | Placeholder | Empty admin page |
| `/ninthbox` | `src/app/ninthbox/page.tsx` | Placeholder | CareerFlyght placeholder |
| `/whatcanibe` | `src/app/whatcanibe/page.tsx` | Active | Primary Landing Page |
| `/whatcanibe/login` | `src/app/whatcanibe/login/page.tsx` | Active | Functional Login |
| `/whatcanibe/signup` | `src/app/whatcanibe/signup/page.tsx` | Active | Functional Signup (defaults to 'student') |
| `/whatcanibe/dashboard` | `src/app/whatcanibe/dashboard/page.tsx` | Active | Shared Student/Mentor Dashboard |
| `/whatcanibe/dashboard/mentor-profile` | `src/app/whatcanibe/dashboard/mentor-profile/page.tsx` | Active | Mentor Profile Onboarding/Management |
| `/whatcanibe/careers` | `src/app/whatcanibe/careers/page.tsx` | Active | Career Discovery (Interactive) |
| `/whatcanibe/mentors` | `src/app/whatcanibe/mentors/page.tsx` | Active | Mentor Discovery Marketplace |
| `/whatcanibe/mentors/[id]` | `src/app/whatcanibe/mentors/[id]/page.tsx` | Active | Mentor Profile Details |
| `/whatcanibe/pathways` | N/A | Missing | Linked in Navbar, folder does not exist |
| `/whatcanibe/mentorship` | N/A | Missing | Linked in Navbar, folder does not exist |

---

## Authentication Flow
- **Login:** Handled at `/whatcanibe/login`. Calls `POST /auth/login`. On success, stores `careerflyghtToken` and `careerflyghtUser` in `localStorage`.
- **Signup:** Handled at `/whatcanibe/signup`. Calls `POST /auth/register` (hardcoded role: `student`), followed by an automatic `POST /auth/login`.
- **Token Storage:** Uses `localStorage` for both JWT and user metadata. No HttpOnly cookies are used.
- **Logout:** Handled in `WhatCanIBeNavbar.tsx`. Clears `localStorage` and redirects to `/whatcanibe/login`.
- **Protected Routes:** Enforced via `ProtectedRoute.tsx` wrapper. It checks for the existence of the token/user in `localStorage` and redirects to login if missing.

---

## Role Flow
- **Current Student Behavior:** Registered users default to the `student` role. They see a "Become a Mentor" CTA on their dashboard.
- **Current Mentor Behavior:** Users who have completed the Mentor Profile onboarding are recognized as mentors. They see a "Mentor Access Enabled" card on the dashboard and have access to profile configuration.
- **Role Conversion:** The application currently supports a **Student → Mentor conversion flow**. When a student completes the profile at `/whatcanibe/dashboard/mentor-profile`, the frontend manually updates the `role` in `localStorage` to `mentor`.

---

## Backend Integration
List of endpoints currently consumed via `apiClient`:
- `POST /auth/register`: User registration.
- `POST /auth/login`: User authentication.
- `GET /mentors`: Fetching the list of mentors for the marketplace (supports filtering).
- `GET /mentors/:id`: Fetching specific mentor details.
- `GET /mentors/profile`: Retrieving the logged-in user's mentor profile.
- `POST /mentors/profile`: Creating a new mentor profile (triggers role upgrade).
- `PUT /mentors/profile`: Updating an existing mentor profile.

**Notable Missing Integrations (Defined in Contract but not used):**
- `GET /auth/me`: Not used for session recovery (relying on `localStorage`).
- `GET /users/profile`: Student profile data is not fetched or displayed.
- `POST /users/profile`: No student profile creation flow.
- `POST /bookings`: Booking a session is currently a mock interaction.
- `GET /bookings/my-bookings`: Student bookings are not displayed.
- `GET /bookings/mentor-bookings`: Mentor bookings are not displayed.

---

## Architectural Uncertainties
The `docs/backend-contract.md` contains ambiguities regarding the Mentor lifecycle that significantly impact the frontend architecture:

1. **`POST /auth/register` accepts a `role` field.** This suggests the possibility of direct mentor accounts.
2. **`POST /mentors/profile` description states:** "Any (User role is updated to `mentor` upon creation)". This describes a role conversion flow.

This ambiguity leads to three potential interpretations:

### 1. Direct Mentor Registration
*   **Definition:** Users choose "Mentor" at signup and never exist as students.
*   **Frontend Dependency:** Current signup is hardcoded to `student`.
*   **Required Changes:** Add a role selection toggle to `/whatcanibe/signup` and pass it to the register API.

### 2. Student-to-Mentor Conversion
*   **Definition:** All users start as students and must "convert" via profile creation.
*   **Frontend Dependency:** Current implementation follows this but is inconsistent with the contract's signup capability.
*   **Required Changes:** Strictly enforce this flow; remove role selection from signup if it existed.

### 3. Hybrid Architecture
*   **Definition:** Both direct registration and conversion are supported.
*   **Frontend Dependency:** Current frontend is "Hybrid-Ready" but incomplete.
*   **Required Changes:** Allow role selection at signup AND maintain the "Become a Mentor" option for existing students.

---

## Dashboard Analysis
The current dashboard (`/whatcanibe/dashboard`) is a **shared experience** for both students and mentors.
- **How it works:** It uses a single page component that conditionally renders UI elements based on `user.role`.
- **Data Source:** Almost all dashboard content (Streak, Stats, Roadmap, AI Recommendations, Activity) is sourced from `MOCK_DASHBOARD_DATA` in `src/constants/dashboard.ts`.
- **Functionality:**
  - Students see a "Become a Mentor" card.
  - Mentors see a "Mentor Access Enabled" card.
  - Modals for "Pathways" and "Milestones" show static/mock content.

---

## Mentor Analysis
- **Mentor Creation:** Handled through the conversion flow at `/whatcanibe/dashboard/mentor-profile`.
- **Profile Management:** Mentors can update their professional bio, company, designation, experience, and rates on the same profile page. It handles both `POST` (initial) and `PUT` (update) requests.
- **Mentor Discovery:** The Marketplace (`/whatcanibe/mentors`) is fully integrated with the backend, supporting search by company, minimum experience, and maximum hourly rate.
- **Mentor Bookings:** The UI for booking exists on the mentor details page (`MentorBooking.tsx`), but clicking "Book Session" triggers an alert and does not call the `/bookings` API.

---

## Feature Status Summary
| Feature | Status | Notes |
| :--- | :--- | :--- |
| **User Auth** | Completed | Login/Signup/Logout functional. |
| **Mentor Discovery** | Completed | Real backend data with filtering. |
| **Mentor Profile Mgmt** | Completed | Creation and Updates functional. |
| **Student Dashboard** | Partial | UI exists but uses 90% mock data. |
| **Mentor Dashboard** | Partial | Uses shared dashboard with mock data. |
| **Booking System** | Broken/Mock | UI present, no backend integration. |
| **Student Profile** | Broken/Mock | No way to create/edit student-specific fields. |
| **Pathways/Mentorship** | Broken | Non-existent routes. |

---

## Mock Data Identification
- **`src/constants/dashboard.ts`**: Contains all stats, roadmap, and activity data for the dashboard.
- **`src/app/whatcanibe/dashboard/page.tsx`**: Uses hardcoded dates ("May 24, 2024").
- **`src/components/sections/whatcanibe/MentorBooking.tsx`**: Uses a `setTimeout` to simulate an API call.
- **`src/constants/career-clusters.ts`**: Static data for the career ecosystem wheel.

---

## Technical Debt & Current Architecture
### Current Architecture: **Student → Become Mentor**
The frontend is built around a unified user account that starts as a student and can "upgrade" to a mentor by filling out a professional profile.

### Technical Debt:
1. **Route Duplication:** Duplicate auth and landing pages in the root and `whatcanibe` directories.
2. **Shared Dashboard:** Conditionally rendering a shared dashboard leads to complex logic and prevents role-specific optimizations.
3. **Local State Manipulation:** Manually updating the user role in `localStorage` after a profile creation is fragile.
4. **Placeholder Overload:** Multiple files (e.g., `src/app/login/page.tsx`) are just empty shells.
5. **No Central Auth State:** Relying on `localStorage` events (`auth-change`) and manual syncs instead of a robust Auth Context or State Management library (e.g., Zustand/TanStack Query).

---

## Gap Analysis (Current vs Target)

| Requirement | Current State | Gap |
| :--- | :--- | :--- |
| **Student Signup** | Functional | Role is hardcoded to 'student'. |
| **Mentor Signup** | **Missing** | No direct mentor registration. |
| **Role Selection at Signup**| **Missing** | Users cannot choose their role during signup. |
| **Role-based Login Redirect**| **Missing** | Everyone goes to `/whatcanibe/dashboard`. |
| **Separate Dashboards** | **Missing** | Shared route used for both roles. |
| **No role conversion flow** | **Violated** | Conversion flow is the only way to become a mentor. |
| **No mentor onboarding** | **Violated** | Mentor profile creation acts as an onboarding wizard. |
| **Real backend data only** | **Violated** | Dashboard is heavily mocked. |
| **Booking Management** | **Missing** | No integration for viewing/managing bookings. |

---

## Recommended Cleanup

### Routes to Remove:
- `src/app/page.tsx` (Root landing)
- `src/app/login/` (Root login)
- `src/app/signup/` (Root signup)
- `src/app/admin/` (Placeholder)
- `src/app/ninthbox/` (Placeholder)

### Components to Remove:
- Remove "Become a Mentor" CTA from dashboard.
- Remove `localStorage` role manipulation logic in `mentor-profile/page.tsx`.

### Onboarding Flows to Remove:
- Remove the Student → Mentor conversion flow logic.

### Consolidation & Refactoring:
- **Consolidate Auth:** Move all active auth logic to a unified route or group.
- **Separate Dashboards:** Create `/whatcanibe/dashboard/student` and `/whatcanibe/dashboard/mentor`.
- **Update Signup:** Modify `/whatcanibe/signup` to include a role selection toggle (Student vs Mentor).
- **Direct Registration:** Ensure `POST /auth/register` sends the selected role.
- **Implement Session Recovery:** Use `GET /auth/me` on app load instead of trusting `localStorage`.
- **Integrate Bookings:** Connect `MentorBooking.tsx` to the backend and build the booking list views.
