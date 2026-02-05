import {test,expect,Locator} from "@playwright/test";
test.describe('signup functionality check', () =>{
  test.beforeEach(async ({ page }) => {
  await page.goto ("https://demoblaze.com/");
  const signupLink: Locator = page.locator('#signin2');
  await signupLink.click();
  const signupModal: Locator = page.locator('#signInModal');
  await expect(signupModal).toBeVisible();
});
test ("verify if signup working correctly with valid credentials",async ({page})=>
{
  await page.fill('#sign-username',"Nehabhatta123456789");
  await page.fill('#sign-password',"playrwright");
  await page.getByRole('button',{name:'sign up' }).click();
   //await page.waitForTimeout(2000);
  const title = await page.title();
  console.log("home page title:", title);

  await page.screenshot({path: 'signupsuccess.png'});

  await expect(title).toEqual('STORE');
 
});
test ("verify if signup functionality with invalid credentials",async ({page})=>{
  await page.fill('#sign-username', ' ');
  await page.fill('#sign-password', '#');

      page.on('dialog', async dialog => {
      console.log('Dialog message:', dialog.message());
      expect(['User already exist.', 'Please fill out Username or Password.']).toContain(dialog.message());
      await dialog.accept();
      });
  await page.getByRole('button',{name:'sign up' }).click();
});
/*test ('verify close button functionality', async ({ page})=>{
  const signInModal = page.locator('#signInModal');
  await expect(signInModal).toBeVisible();
  const closeButton = page.locator('button[data-dismiss="modal"]');
  await closeButton.click();
  //await page.getByRole('button',{name:'Close'}).click();
  await expect(signInModal).toBeHidden();
});*/
});
