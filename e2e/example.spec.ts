import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('make an appointment', async ({ page }) => {
  //go to the website
  await page.goto('http://localhost:5173/');

  //login
  await page.getByRole('link', { name: 'profile icon' }).click();
  await page.getByPlaceholder('Your email').click();
  await page.getByPlaceholder('Your email').fill('ikbeneentester@test.com');
  await page.getByPlaceholder('Your email').press('Tab');
  await page.getByPlaceholder('Your password').fill('wachtwoord');
  await page.getByPlaceholder('Your password').press('Enter');

  //make an appointment
  await page.getByRole('link', { name: 'Make An Appointment' }).first().click();
  await page.getByRole('button', { name: 'Simple Haircut € 19.99 We' }).click();
  await page.getByRole('button', { name: 'Beard Trim € 17.95 Enhance' }).click();
  await page.getByRole('button', { name: 'CONTINUE' }).click();
  await page.getByRole('button', { name: 'SHAMPOO +€ 4 Add an extra' }).click();
  await page.getByRole('button', { name: 'NEXT' }).click();
  await page.getByLabel('Sunday, Dec 31,').click();
  await page.getByRole('combobox').selectOption('10');
  await page.locator('img').nth(2).click();
  await page.getByRole('button', { name: 'NEXT' }).click();
  await page.getByRole('button', { name: 'TOTAL: €' }).click();

  //check if appointment is made
  await page.getByRole('link', { name: 'profile icon' }).click();
  await page.getByRole('link', { name: 'MY APPOINTMENTS' }).click();
  await page.locator('.relative > div').first().click();
});
