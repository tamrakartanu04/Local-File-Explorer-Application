
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    browserName: 'chromium',
    channel: 'msedge',
    headless: false,
    baseURL: 'http://localhost:5173',
  },
});
