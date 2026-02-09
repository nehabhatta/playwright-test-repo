import { test, expect, Locator } from '@playwright/test';

test.describe('lhotel booking functionality check', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test('verify location page functionality', async ({ page }) => {
    await page.locator('#navbarNav').getByRole('link', { name: 'Location' }).click();
    await expect(page).toHaveURL(/#location$/);
    await expect(page.getByRole('heading', { name: 'Our Location' })).toBeVisible();
    await expect(page.locator('.pigeon-tiles-box')).toBeVisible();
  
  });

  test('verify amenities page functionality', async ({ page }) => {
    await page.locator('#navbarNav').getByRole('link', { name: 'Amenities' }).click();
    await expect(page).toHaveURL(/#amenities$/);
  });

  test('verify booknow functinality in home page', async ({ page }) => {
    await page.getByRole('link', { name: 'Book Now' }).click();
    await expect(page).toHaveURL(/#booking$/);
    await expect (page.locator('#rooms')).toBeVisible();

  });

  test('verify datepicker or filteration working correctly', async ({ page }) => {
   
    const bookingHeading = page.getByRole('heading', { name: /Check Availability & Book Your Stay/i,});
    await bookingHeading.scrollIntoViewIfNeeded();
    await expect(bookingHeading).toBeVisible();

    await page.locator('div.col-md-6:has(label[for="checkin"])').click();
    await page.getByRole('gridcell', { name: 'Choose Tuesday, 10 February 2026' }).click();
   

    await page.locator('div.col-md-6:has(label[for="checkout"])').click();
    await page.getByRole('gridcell', { name: 'Choose Wednesday, 11 February 2026' }).click();

    await page.getByRole('button',{name: 'Check Availability'}).click();

    await expect (page.locator('#rooms')).toBeVisible();


  });
});


