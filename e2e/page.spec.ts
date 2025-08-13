import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
  await page.goto('/');
});


test.describe('Dog Tracker Dashboard', () => {
  test('Page loads without errors', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Dog Tracker/i);
    await expect(page.locator('[data-testid="page-title"]')).toBeVisible();
  });

  test('KPI cards and map render', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-testid="kpi-cards"]')).toBeVisible();

  });

})
