
import { test, expect } from '@playwright/test';

test('Open Folder button should open folder picker', async ({ page }) => {
  await page.goto('/');

  const openFolderButton = page.getByRole('button', {
    name: /open folder/i
  });

  await expect(openFolderButton).toBeVisible();

  await openFolderButton.click();

  await page.waitForTimeout(3000);

  await page.pause();
});
