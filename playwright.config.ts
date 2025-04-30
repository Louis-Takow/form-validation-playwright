import { defineConfig } from "@playwright/test";

export default defineConfig({
  /* Run tests in files in parallel */
  fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
    /* Retry on CI only */
  retries: process.env.CI ? 2 : 2,
    /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  testDir: "./tests",
    /* Use test fixtures for setup and teardown. See https://playwright.dev/docs/test-fixtures */
  use: {
    baseURL: "https://qa-assessment.pages.dev/",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
    /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
    {
      name: "firefox",
      use: { browserName: "firefox" },
    },
    {
      name: "webkit",
      use: { browserName: "webkit" },
    },
  ],
});
