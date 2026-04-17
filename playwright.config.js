const { defineConfig } = require('@playwright/test');
require('dotenv').config({ path: './.env' });

module.exports = defineConfig({
  testDir: './tests',
  workers: 1,
  use: {
    baseURL: process.env.BASE_URL,
    headless: false,
  },
});
