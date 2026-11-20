
import { test, expect } from '@playwright/test';

test('Open Folder button should open folder picker', async ({ page }) => {
  await page.goto('/');

  const openFolderButton = page.getByRole('button', {
    name: /open folder/i
  });

  await expect(openFolderButton).toBeVisible();

  page.on('console', msg => console.log('Browser:', msg.text()));
  page.on('pageerror', error => console.log('Page error:', error.message));

  await openFolderButton.click();

  await page.waitForTimeout(3000);

  await page.pause();
});
