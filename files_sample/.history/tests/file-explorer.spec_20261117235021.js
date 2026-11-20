
import { test, expect } from '@playwright/test';

test('Open Folder button should be visible', async ({ page }) => {
  await page.goto('/');

  const openFolderButton = page.getByRole('button', {
    name: /open folder/i
  });

  await expect(openFolderButton).toBeVisible();

  console.log('Open Folder button is visible!');
});
