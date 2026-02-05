import { test, expect } from '@playwright/test';
test.describe('login functionality check', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto ("https://demoblaze.com/");
     await page.click('#login2');
    const loginModal = page.locator('#logInModal');
    await expect(loginModal).toBeVisible();
    });
test('verify login working correctly', async ({ page }) => {
  await page.fill('#loginusername', 'Nehabhatta123456789');
  await page.fill('#loginpassword', 'playrwright');
  await page.getByRole('button',{name:'log in'}).click();

  const welcomeUser = page.locator('#nameofuser');
  await expect(welcomeUser).toBeVisible();
  await expect(welcomeUser).toContainText('Welcome');

  await expect(page).toHaveTitle('STORE');
  await page.screenshot({ path: 'loginsuccess.png' });
});
test('verify login fails with invalid credentials', async ({ page }) => {
  await page.fill('#loginusername', '2');
  await page.fill('#loginpassword', 'df');

  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('Wrong password.');
    await dialog.accept();
  });

  await page.getByRole('button',{name:'log in'}).click();
});
/*test ('verify close button functionality', async ({ page})=>{
  const loginModal = page.getByRole('dialog', { name: /close/i });
  await expect(loginModal).toBeVisible();
  await loginModal.getByRole('button', { name: /close/i }).click();
  await expect(loginModal).toBeHidden();
});*/
});