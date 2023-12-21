import { test, expect } from '@playwright/test';

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

test('request & decline vacation', async ({ page }) => {
  //go to the website
  await page.goto('http://localhost:5173/');

  //login with boss account
  await page.getByRole('link', { name: 'profile icon' }).click();
  await page.getByPlaceholder('Your email').click();
  await page.getByPlaceholder('Your email').fill('sofie@hairdresser.be');
  await page.getByPlaceholder('Your email').press('Tab');
  await page.getByPlaceholder('Your password').fill('P@ssw0rd');
  await page.getByPlaceholder('Your password').press('Enter');

  //request vacation
  await page.getByRole('link', { name: 'profile icon' }).click();
  await page.getByRole('link', { name: 'VACATION' }).click();
  await page.locator('div').filter({ hasText: /^Start date$/ }).getByRole('textbox').click();
  await page.getByLabel('December 30,').first().click();
  await page.locator('div').filter({ hasText: /^End date$/ }).getByRole('textbox').click();
  await page.getByLabel('December 31,').nth(1).click();
  await page.getByRole('button', { name: 'REQUEST' }).click();

  //decline vacation
  await page.getByRole('link', { name: 'BARBER SETTINGS' }).click();
  await page.getByRole('button', { name: 'decline' }).nth(1).click();

  //check if vacation is declined
  await page.getByRole('link', { name: 'profile icon' }).click();
  await page.getByRole('link', { name: 'VACATION' }).click();
  await page.getByText('Start DateEnd DateApproved').click();
});
