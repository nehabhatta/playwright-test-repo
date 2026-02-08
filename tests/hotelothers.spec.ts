import { test, expect, Locator } from '@playwright/test';

test.describe('lhotel booking functionality check', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test('verify location page functionality', async ({ page }) => {
    await page.locator('#navbarNav').getByRole('link', { name: 'Location' }).click();
    await expect(page).toHaveURL(/#location$/);
    await expect(page.getByRole('heading', { name: 'Our Location' })).toBeVisible();
  });

  test('verify amenities page functionality', async ({ page }) => {
    await page.locator('#navbarNav').getByRole('link', { name: 'Amenities' }).click();
    await expect(page).toHaveURL(/#amenities$/);
  });

  test('verify booknow functinality in home page', async ({ page }) => {
    await page.getByRole('link', { name: 'Book Now' }).click();
    await expect(page).toHaveURL(/#booking$/);
  });

  test('verify datepicker or filteration working correctly', async ({ page }) => {
    // Scroll to the filter box using a heading locator to avoid ambiguity
    const filterBox = page.locator('div.card-body.p-4', {
      has: page.getByRole('heading', { name: /Check Availability & Book Your Stay/i }),
    });
    await filterBox.scrollIntoViewIfNeeded();

    // Locate the Check In input via its label's 'for' attribute for accuracy
    const label = page.locator('label', { hasText: 'Check In' });
    const inputId = await label.getAttribute('for');
    const checkInInput = page.locator(`#${inputId}`);

    await checkInInput.waitFor({ state: 'visible' });
    await checkInInput.click();

    // Wait for datepicker popup
    await page.locator('.react-datepicker').waitFor({ state: 'visible' });

    // Select today's date for Check In
    await page.locator('.react-datepicker__day--today:not(.react-datepicker__day--outside-month)').click();

    // Handle Check Out input similarly
    const checkOutInput = page.getByLabel('Check Out');
    await checkOutInput.waitFor({ state: 'visible' });
    await checkOutInput.click();

    await page.locator('.react-datepicker').waitFor({ state: 'visible' });

    // Calculate date 2 days after today
    const today = new Date();
    const twoDaysLater = new Date(today);
    twoDaysLater.setDate(today.getDate() + 2);
    const outDay = twoDaysLater.getDate();
    const dayString = outDay < 10 ? `0${outDay}` : `${outDay}`;

    // Select 2 days later for Check Out
    const daySelector = `.react-datepicker__day--0${dayString}:not(.react-datepicker__day--outside-month)`;
    await page.locator(daySelector).click();

    // Click on the "Check Availability" button
    await page.getByRole('button', { name: /Check Availability/i }).click();

    const roomsList = page.locator('#tbodyid tr');
    const count = await roomsList.count();
    expect(count).toBeGreaterThan(0);
  });
});


