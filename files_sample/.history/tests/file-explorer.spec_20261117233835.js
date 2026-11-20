
import { test, expect } from '@playwright/test';

test('File Explorer application should open successfully', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/.+/);

  console.log('File Explorer application opened successfully!');
});
