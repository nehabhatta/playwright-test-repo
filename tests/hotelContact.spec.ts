import { test, expect,Locator } from '@playwright/test';
test.describe('lhotel booking functionality check', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto ("/");
    });
    test ('verify contact page functionality with valid input', async ({ page }) => {
        await page.locator('#navbarNav').getByRole('link', { name: 'Rooms' }).click();
        await expect (page.getByRole('heading', { name: 'Send Us a Message' })).toBeVisible();
        await page.getByLabel('Name').fill(process.env.name!);
        await page.getByLabel('Email').fill(process.env.right_email!);
        await page.getByLabel('Phone').fill(process.env.right_phone!);
        await page.getByLabel('Subject').fill(process.env.subject!);
        await page.getByTestId('ContactDescription').fill(process.env.message!);

        await page.getByRole('button', { name: 'Submit' }).click();
        
       await expect(page.getByRole('heading', { name: /Thanks for getting in touch/i })).toBeVisible();

    });
     test ('verify contact page functionality with invalid input', async ({ page }) => {
        await page.locator('#navbarNav').getByRole('link', { name: 'Rooms' }).click();
        await expect (page.getByRole('heading', { name: 'Send Us a Message' })).toBeVisible();
        await page.getByLabel('Name').fill(process.env.invalid_name!);
        await page.getByLabel('Email').fill(process.env.invalid_email!);
        await page.getByLabel('Phone').fill(process.env.invalid_phone!);
        await page.getByLabel('Subject').fill(process.env.invalid_subject!);
        await page.getByTestId('ContactDescription').fill(process.env.invalid_message!);

        await page.getByRole('button', { name: 'Submit' }).click();
        
       const alert = page.locator('.alert.alert-danger');
       await expect(alert).toBeVisible();



    });

});