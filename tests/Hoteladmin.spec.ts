import { test, expect,Locator } from '@playwright/test';
test.describe('lhotel booking functionality check', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto ("/");
    });
test('verify navigation link working functionality', async ({ page }) => {
    await page.locator('li').filter({ hasText: 'Admin' }).click();
    /*await page.getByRole('button',{name:'Admin'}).click();*/
    const adminPortal = page.locator('.container');
    await expect(adminPortal).toBeVisible();
    await page.fill('#username', process.env.admin_user!);
    await page.fill('#password', process.env.admin_pass!);
    await page.getByRole('button',{name:'Login'}).click();
   await expect(page.locator('.container')).toContainText(/invalid credentials/i);
});
});