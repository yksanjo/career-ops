#!/usr/bin/env node

import { chromium } from 'playwright';
import { resolve } from 'node:path';

const applyUrl = 'https://citi.wd5.myworkdayjobs.com/en-US/2/job/New-York-New-York-United-States/Digital-Assets-Product-Manager-Director_26958499/apply/autofillWithResume';
const resumePath = resolve('output/resume-yoshi-kondo-citi-digital-assets-product-manager.pdf');

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();
await page.goto(applyUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForTimeout(3000);

async function clickByText(text) {
  const loc = page.getByText(text, { exact: true });
  if (await loc.count()) {
    await loc.click();
    await page.waitForTimeout(1500);
    return true;
  }
  return false;
}

await clickByText('Accept Cookies');

console.log('STEP_URL:', page.url());
console.log('STEP_TITLE:', await page.title());
console.log('STEP_TEXT_START');
console.log((await page.locator('body').innerText()).slice(0, 4000));
console.log('STEP_TEXT_END');

const fileInputs = page.locator('input[type="file"]');
const fileInputCount = await fileInputs.count();
console.log('FILE_INPUT_COUNT:', fileInputCount);
if (fileInputCount > 0) {
  await fileInputs.nth(0).setInputFiles(resumePath);
  await page.waitForTimeout(5000);
  console.log('UPLOADED_RESUME:', resumePath);
}

console.log('AFTER_UPLOAD_TEXT_START');
console.log((await page.locator('body').innerText()).slice(0, 5000));
console.log('AFTER_UPLOAD_TEXT_END');

await page.screenshot({ path: 'output/citi-application-draft.png', fullPage: true });
console.log('SCREENSHOT: output/citi-application-draft.png');

await browser.close();
