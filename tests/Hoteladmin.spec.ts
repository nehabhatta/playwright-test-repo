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
test('verify navigation link working functionality"Room"', async ({ page }) => {

   await page.locator('#navbarNav').getByRole('link', { name: 'Rooms' }).click();
   await expect (page.locator('#rooms')).toBeVisible();
   async function roomBook(name: string){
    const roomCard = page.locator('.room-card', { hasText: name });
    await roomCard.getByRole('link', { name: "Book now" }).click();
    await page.locator('.rbc-calendar').getByRole('button',{name: 'Today'}).click();
    const startDate = await page.locator('button.rbc-button-link', { hasText: '01' }).elementHandle();
    const endDate = await page.locator('button.rbc-button-link', { hasText: '08' }).elementHandle();

    if (startDate && endDate) {
      const startBox = await startDate.boundingBox();
      const endBox = await endDate.boundingBox();

     if (startBox && endBox) {
       // Simulate drag from start date to end date
       await page.mouse.move(startBox.x + startBox.width / 2, startBox.y + startBox.height / 2);
       await page.mouse.down();
       await page.mouse.move(endBox.x + endBox.width / 2, endBox.y + endBox.height / 2);
       await page.mouse.up();
       await page.pause();
     }
    }

    await page.locator('#navbarNav').getByRole('link', { name: 'Rooms' }).click();
    }
    await roomBook("Single");
    await roomBook("Double");
    await roomBook("Suite");

});
});