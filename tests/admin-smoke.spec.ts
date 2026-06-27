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

    // Unauthenticated user on /admin path should be sent to /admin/login
    await expect(page).toHaveURL(/\/admin\/login/);
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

  test('Admin user is redirected from standard login', async ({ page }) => {
     // Mock admin user in localStorage
     await page.addInitScript(() => {
        localStorage.setItem('careerflyghtToken', 'mock-token');
        localStorage.setItem('careerflyghtUser', JSON.stringify({
          id: 'admin-123',
          role: 'admin',
          email: 'admin@example.com'
        }));
      });

      await page.goto('/whatcanibe/login');

      // ProtectedRoute should redirect admin to their dashboard
      await expect(page).toHaveURL(/\/admin\/dashboard/);
  });
});
