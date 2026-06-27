import { test, expect } from '@playwright/test';

test.describe('Admin Smoke Tests', () => {
  test('Admin login page loads correctly', async ({ page }) => {
    await page.goto('/admin/login');
    await expect(page.locator('h1')).toContainText('Admin Portal');
    await expect(page.locator('button[type="submit"]')).toContainText('Sign In to Console');
  });

  test('Unauthorized user is denied access to /admin/dashboard', async ({ page }) => {
    // Attempt to visit admin dashboard without token
    await page.goto('/admin/dashboard');

    // Should show the loading state of ProtectedRoute and then redirect
    // Since we are not logged in, ProtectedRoute should redirect to /whatcanibe/login by default
    // or we can check if it stays on login if we were at /admin/login

    // In our implementation, ProtectedRoute redirects to /whatcanibe/login if no token
    await expect(page).toHaveURL(/\/whatcanibe\/login/);
  });

  test('Student user is redirected from /admin/dashboard', async ({ page }) => {
    // Mock student user in localStorage
    await page.addInitScript(() => {
      localStorage.setItem('careerflyghtToken', 'mock-token');
      localStorage.setItem('careerflyghtUser', JSON.stringify({
        id: 'student-123',
        role: 'student',
        email: 'student@example.com'
      }));
    });

    await page.goto('/admin/dashboard');

    // ProtectedRoute should redirect student to their dashboard
    await expect(page).toHaveURL(/\/whatcanibe\/dashboard\/student/);
  });
});
