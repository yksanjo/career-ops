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

// Accept cookies
try {
  const acceptBtn = page.getByText('Accept Cookies');
  if (await acceptBtn.count() > 0) {
    await acceptBtn.click();
    await page.waitForTimeout(1000);
  }
} catch(e) {}

// Click Sign In
try {
  const signInBtn = page.getByText('Sign In');
  if (await signInBtn.count() > 0) {
    await signInBtn.click();
    await page.waitForTimeout(3000);
    console.log('Clicked Sign In');
  }
} catch(e) {}

console.log('=== AFTER SIGN IN CLICK ===');
console.log('URL:', page.url());
console.log('TITLE:', await page.title());

const text = await page.locator('body').innerText();
console.log('BODY:', text.slice(0, 3000));

// Check for all form elements
const inputs = await page.locator('input, select, textarea').evaluateAll((nodes) =>
  nodes.map(n => ({
    type: n.getAttribute('type'),
    name: n.getAttribute('name'),
    id: n.id,
    placeholder: n.getAttribute('placeholder'),
    aria: n.getAttribute('aria-label'),
    autocomplete: n.getAttribute('autocomplete'),
  }))
);
console.log('INPUTS:', JSON.stringify(inputs, null, 2));

const allButtons = await page.locator('button, a').evaluateAll((nodes) =>
  nodes.map(n => ({
    tag: n.tagName,
    text: (n.innerText || '').slice(0, 100),
    aria: n.getAttribute('aria-label'),
    href: n.getAttribute('href'),
    class: n.className?.slice(0, 60),
  }))
);
console.log('ALL_BUTTONS:', JSON.stringify(allButtons, null, 2));

// Check for iframes/shadow DOM
const iframes = await page.locator('iframe').count();
console.log('IFRAMES:', iframes);

await page.screenshot({ path: 'output/citi-signin-flow.png', fullPage: true });
console.log('SCREENSHOT saved');

await browser.close();
