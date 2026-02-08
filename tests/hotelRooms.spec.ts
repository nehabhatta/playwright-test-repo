import { test, expect,Locator } from '@playwright/test';
test.describe('lhotel booking functionality check', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto ("/");
    });
test('verify navigation link working functionality"Room"', async ({ page }) => {

     await page.locator('#navbarNav').getByRole('link', { name: 'Rooms' }).click();
     await expect (page.locator('#rooms')).toBeVisible();
     async function roomBook(name: string) {
  const roomCard = page.locator('.room-card', { hasText: name });
  await roomCard.getByRole('link', { name: "Book now" }).click();

  await expect(page.locator('.rbc-calendar')).toBeVisible();

  const days = page.locator('.rbc-date-cell'); 
  const startCell = days.nth(8);
  const endCell = days.nth(10);

  await startCell.scrollIntoViewIfNeeded();

  const startBox = await startCell.boundingBox();
  const endBox = await endCell.boundingBox();
  if (!startBox || !endBox) throw new Error('Calendar cells not visible');

  await page.mouse.move(startBox.x + startBox.width / 2, startBox.y + startBox.height / 2);
  await page.mouse.down();
  await page.mouse.move(endBox.x + endBox.width / 2, endBox.y + endBox.height / 2, { steps: 15 });
  await page.mouse.up();

  await page.locator('#doReservation').click();
  const bookingCard = page.locator('div.card:has-text("Book This Room")');
  await bookingCard.scrollIntoViewIfNeeded();

  await expect(bookingCard).toBeVisible();
  await expect(bookingCard).toBeInViewport();

  await expect(bookingCard.locator('input[name="firstname"]')).toBeVisible();
  await expect(bookingCard.locator('input[name="lastname"]')).toBeVisible();
  await page.getByLabel('Firstname').fill(process.env.first_name!);
  await page.getByLabel('Lastname').fill(process.env.last_name!);
  await page.getByLabel('Email').fill(process.env.right_email!);
  await page.getByLabel('Phone').fill(process.env.right_phone!);
  
  // Click the Reserve Now button that does NOT have the id 'doReservation'
  await page.locator('button:has-text("Reserve Now")').filter({ hasNot: page.locator('#doReservation') }).click();
  await expect(page.getByRole('heading', { name: 'Booking Confirmed' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Return home' })).toBeVisible();



  await page.locator('#navbarNav').getByRole('link', { name: 'Rooms' }).click();
}

    
    
     await roomBook("Single");
     await roomBook("Double");
     await roomBook("Suite");

});
});