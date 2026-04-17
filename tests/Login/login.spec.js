const { test, expect } = require('@playwright/test');
require('dotenv').config({ override: true });

test.describe('Authentication Flows', () => {

  // --------------------------------------------------------
  // TEST 1: Standard Login
  // --------------------------------------------------------
  test('TC_AUTH_001 - Standard Login', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Sign In', exact: true }).first().click();
    await expect(page.getByLabel('Email Address')).toBeVisible();

    await page.getByLabel('Email Address').fill(process.env.USERNAME);
    await page.getByLabel('Password').fill(process.env.PASSWORD);

    await page.getByRole('button', { name: 'Sign In', exact: true }).click();
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 15000 });
  });


  // --------------------------------------------------------
  // TEST 3: Forgot Password Flow
  // --------------------------------------------------------
  test('TC_AUTH_003 - Forgot Password Flow', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Sign In', exact: true }).first().click();

    // Click Forgot password link
    await page.getByText('Forgot password?').click();

    // Verify Reset Password screen loaded
    await expect(page.getByRole('heading', { name: 'Reset Password' })).toBeVisible();

    // Fill email using .env file
    await page.getByPlaceholder('Enter your email address').fill(process.env.USERNAME);

    // Click the Send Reset Link button
    await page.getByRole('button', { name: 'Send Reset Link' }).click();

    // Freezing here so you can see the success state and update the final assertion later
    await page.pause();
  });

});