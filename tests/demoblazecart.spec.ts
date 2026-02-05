import { test, expect } from '@playwright/test';
test.describe('cart functionality check', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/index.html");
    });
  test('verify lcart functionality', async ({ page }) => {
    await page.click('#login2');
     const loginModal = page.locator('#logInModal');
     await expect(loginModal).toBeVisible();
  await page.fill('#loginusername', process.env.DEMO_USER!);
  await page.fill('#loginpassword', process.env.DEMO_PASS!);
  await page.getByRole('button',{name:'log in'}).click();

  const nameUser = page.locator('#nameofuser');
  await expect(page.locator('#nameofuser')).toContainText(process.env.DEMO_USER!);
  
  async function addproduct(name: string){
    await page.getByRole("link", { name }).click();
    await page.getByRole("link", { name: "Add to cart" }).click();
    const dialog = await page.waitForEvent("dialog");
    await dialog.accept();
    await page.getByRole("link", { name: "Home" }).click();
    }
   await addproduct("Samsung galaxy s6");
   await addproduct("Nokia lumia 1520");
   await addproduct("Nexus 6");
   await page.getByRole("link", { name: "Cart" }).click();

   await expect(page.locator("#tbodyid")).toContainText("Samsung galaxy s6");
   await expect(page.locator("#tbodyid")).toContainText("Nokia lumia 1520");
   await expect(page.locator("#tbodyid")).toContainText("Nexus 6");

   const deleteButtons = page.getByRole('link', { name: 'Delete' });
   const itemCount = await deleteButtons.count();

  for(let i = 0; i < itemCount; i++){
  await deleteButtons.first().click();
  await page.waitForTimeout(500); 
   }
  await page.waitForTimeout(3000);
  await page.getByRole('button',{name: 'Place Order'}).click();
  const OrderModal = page.locator('#orderModal');
  await OrderModal.waitFor({ state: 'visible' });

  await page.getByRole('textbox', { name: 'Name' }).fill('Neha');
  await page.getByRole('textbox', { name: 'Country' }).fill('Nepal');
  await page.getByRole('textbox', { name: 'City' }).fill('Kathmandu');
  await page.getByRole('textbox', { name: 'Card' }).fill('26378687212332');
  await page.getByRole('textbox', { name: 'Month' }).fill('12');
  await page.getByRole('textbox', { name: 'Year' }).fill('2026');

  await page.getByRole('button', { name: 'Purchase' }).click();
  await expect( page.locator('.sweet-alert')).toContainText('Thank you for your purchase!');
  await page.getByRole('button', { name: 'OK' }).click();


  });
});