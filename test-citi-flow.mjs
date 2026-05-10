#!/usr/bin/env node

import { chromium } from 'playwright';
import { resolve } from 'node:path';

const resumePath = resolve('output/resume-yoshi-kondo-citi-digital-assets-product-manager.pdf');

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();

// Go to the autofill URL directly
await page.goto('https://citi.wd5.myworkdayjobs.com/en-US/2/job/New-York-New-York-United-States/Digital-Assets-Product-Manager-Director_26958499/apply/autofillWithResume', { 
  waitUntil: 'domcontentloaded', timeout: 60000 
});
await page.waitForTimeout(3000);

// Accept cookies if visible
try {
  const acceptBtn = page.getByText('Accept Cookies');
  if (await acceptBtn.count() > 0) {
    await acceptBtn.click();
    await page.waitForTimeout(1000);
  }
} catch(e) {}

console.log('=== AFTER AUTOFILL URL ===');
console.log('URL:', page.url());
console.log('TITLE:', await page.title());
const text = await page.locator('body').innerText();
console.log('BODY:', text.slice(0, 3000));

// Check for sign-in form elements
const inputs = await page.locator('input').evaluateAll((nodes) =>
  nodes.map(n => ({
    type: n.getAttribute('type'),
    name: n.getAttribute('name'),
    id: n.id,
    placeholder: n.getAttribute('placeholder'),
    aria: n.getAttribute('aria-label'),
  }))
);
console.log('INPUTS:', JSON.stringify(inputs, null, 2));

const buttons = await page.locator('button, a[role="button"]').evaluateAll((nodes) =>
  nodes.map(n => ({
    tag: n.tagName,
    text: (n.innerText || '').slice(0, 80),
    aria: n.getAttribute('aria-label'),
    href: n.getAttribute('href'),
  }))
);
console.log('BUTTONS:', JSON.stringify(buttons, null, 2));

await page.screenshot({ path: 'output/citi-autofill-flow.png', fullPage: true });
console.log('SCREENSHOT saved');

await browser.close();
