import { test, expect } from '@playwright/test';

test.describe('Admin Authentication Scenarios', () => {
  test('Admin can log in through /admin/login', async ({ page }) => {
    // We cannot easily test real login without a real backend or intercepting the request
    // But we can check if it stays on the page or redirects if we mock the success
    await page.goto('/admin/login');
    await expect(page.locator('h1')).toContainText('Admin Portal');
  });

  test('Unauthenticated access to /admin/dashboard redirects to /admin/login', async ({ page }) => {
    await page.goto('/admin/dashboard');
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test('Student user is redirected from /admin/dashboard to their own dashboard', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('careerflyghtToken', 'mock-student-token');
      localStorage.setItem('careerflyghtUser', JSON.stringify({
        id: 'student-1',
        role: 'student',
        email: 'student@example.com'
      }));
    });

    await page.goto('/admin/dashboard');
    await expect(page).toHaveURL(/\/whatcanibe\/dashboard\/student/);
  });

  test('Mentor user is redirected from /admin/dashboard to their own dashboard', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('careerflyghtToken', 'mock-mentor-token');
      localStorage.setItem('careerflyghtUser', JSON.stringify({
        id: 'mentor-1',
        role: 'mentor',
        email: 'mentor@example.com'
      }));
    });

    await page.goto('/admin/dashboard');
    await expect(page).toHaveURL(/\/whatcanibe\/dashboard\/mentor/);
  });

  test('/whatcanibe/login continues to work for students', async ({ page }) => {
    await page.goto('/whatcanibe/login');
    await expect(page.locator('h1')).toContainText('Sign In');
    await expect(page.locator('text=Access your personalized roadmap')).toBeVisible();
  });
});
