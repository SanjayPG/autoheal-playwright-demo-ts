import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { AutoHealHelper } from '../helpers/AutoHealHelper';
import * as dotenv from 'dotenv';

dotenv.config();

test.describe('Login Tests with AutoHeal', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
  });

  test.afterEach(async () => {
    const metrics = AutoHealHelper.getMetrics();
    if (metrics) {
      console.log('\n📊 Cache Metrics:');
      console.log(`   Hit Rate: ${(metrics.hitRate * 100).toFixed(2)}%`);
      console.log(`   Entries: ${metrics.totalEntries}`);
    }
  });

  test.afterAll(async () => {
    // Generate AutoHeal reports after all tests
    AutoHealHelper.generateReports();
  });

  test('should login successfully', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await page.waitForTimeout(1000);

    const title = await inventoryPage.getPageTitle();
    await expect(title).toBeVisible();
    await expect(title).toHaveText('Products');
  });

  test('should add product to cart', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await page.waitForTimeout(1000);

    await inventoryPage.addProductToCart('sauce-labs-backpack');
    await page.waitForTimeout(500);

    const count = await inventoryPage.getCartItemCount();
    expect(count).toBe(1);
  });
});
