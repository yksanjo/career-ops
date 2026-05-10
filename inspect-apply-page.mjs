#!/usr/bin/env node

import { chromium } from 'playwright';

const url = process.argv[2];
if (!url) {
  console.error('Usage: node inspect-apply-page.mjs <url>');
  process.exit(1);
}

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForTimeout(5000);

console.log('TITLE:', await page.title());
console.log('URL:', page.url());

const bodyText = await page.locator('body').innerText({ timeout: 15000 }).catch((error) => `BODY_ERROR: ${error.message}`);
console.log('BODY_EXCERPT_START');
console.log(bodyText.slice(0, 5000));
console.log('BODY_EXCERPT_END');

const controls = await page.locator('input, textarea, select, button, a').evaluateAll((nodes) =>
  nodes.slice(0, 160).map((node) => ({
    tag: node.tagName,
    type: node.getAttribute('type'),
    name: node.getAttribute('name'),
    aria: node.getAttribute('aria-label'),
    text: (node.innerText || node.value || '').slice(0, 120),
    href: node.getAttribute('href'),
    placeholder: node.getAttribute('placeholder'),
  }))
);
console.log('CONTROLS_START');
console.log(JSON.stringify(controls, null, 2));
console.log('CONTROLS_END');

await page.screenshot({ path: 'output/apply-page-inspect.png', fullPage: true });
console.log('SCREENSHOT: output/apply-page-inspect.png');

await browser.close();
