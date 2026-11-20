
import { test, expect } from '@playwright/test';

test('Open Folder button should open folder picker', async ({ page }) => {
  await page.goto('/');

  const openFolderButton = page.getByRole('button', {
    name: /open folder/i
  });

  await expect(openFolderButton).toBeVisible();

  await openFolderButton.click();

  await page.pause();
});


test('User can select a real folder', async ({ page }) => {
  await page.goto('/');

  const openFolderButton = page.getByRole('button', {
    name: /open folder/i
  });

  await openFolderButton.click();

  // Manually select a folder in Edge
  await page.pause();

  await expect(page.locator('.root-name'))
    .not.toContainText('No folder selected');

  console.log('Folder selected successfully!');
});
