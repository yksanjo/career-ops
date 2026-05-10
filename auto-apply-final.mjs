#!/usr/bin/env node

/**
 * Auto-Apply: Crypto/Tokenization NYC Roles
 * 
 * Opens each application in a browser, handles account creation,
 * resume upload, and form filling. Stops at CAPTCHA/OTP/final submit.
 * 
 * Usage: node auto-apply-final.mjs
 */

import { chromium } from 'playwright';
import { resolve } from 'node:path';
import { writeFile } from 'node:fs/promises';

// ─── Your Info ───────────────────────────────────────────────────────────────

const YOU = {
  name: 'Yoshi Kondo',
  email: 'yoshi@musicailab.com',
  phone: '347-404-3647',
  address: '515 E 14th St Apt 5G, New York, NY 10009',
  linkedin: 'https://www.linkedin.com/in/yoshi-kondo-3110462a9/',
  github: 'https://github.com/yksanjo',
  authorized: 'Yes',
  sponsorship: 'No',
};

function genPW() {
  const s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
  let p = '';
  for (let i = 0; i < 16; i++) p += s[Math.floor(Math.random() * s.length)];
  return p;
}
const PW = genPW();

// ─── Applications ────────────────────────────────────────────────────────────

const APPS = [
  {
    company: 'Citi',
    role: 'Digital Assets Product Manager, Director',
    url: 'https://citi.wd5.myworkdayjobs.com/en-US/2/job/New-York-New-York-United-States/Digital-Assets-Product-Manager-Director_26958499/apply/autofillWithResume',
    resume: 'output/resume-yoshi-kondo-citi-digital-assets-product-manager.pdf',
    applyLink: 'https://jobs.citi.com/job/new-york/digital-assets-product-manager-director/287/94522393936',
  },
  {
    company: 'BlackRock',
    role: 'Director, Digital Assets',
    url: 'https://blackrock.wd1.myworkdayjobs.com/BlackRock_Professional/job/New-York-NY/Director-Digital-Assets_R258072/apply',
    resume: 'output/resume-yoshi-kondo-blackrock-director-digital-assets.pdf',
    applyLink: 'https://careers.blackrock.com/job/new-york/director-digital-assets/45831/89314536656',
  },
  {
    company: 'DTCC',
    role: 'Digital Assets Strategy and Market Solutions Director',
    url: 'https://dtcc.wd1.myworkdayjobs.com/en-US/DTC/job/New-York-NY/Digital-Assets-Strategy-and-Market-Solutions-Director/apply',
    resume: 'output/resume-yoshi-kondo-dtcc-digital-assets-strategy.pdf',
    applyLink: 'https://dtcc.wd1.myworkdayjobs.com/en-US/DTC/job/New-York-NY/Digital-Assets-Strategy-and-Market-Solutions-Director',
  },
  {
    company: 'J.P. Morgan',
    role: 'Asset Management Digital Assets, VP',
    url: 'https://jpmc.wd1.myworkdayjobs.com/en-US/External/job/New-York-NY/Asset-Management-Digital-Assets-Vice-President/apply',
    resume: 'output/resume-yoshi-kondo-jpmorgan-digital-assets-vp.pdf',
    applyLink: 'https://jpmc.wd1.myworkdayjobs.com/en-US/External/job/New-York-NY/Asset-Management-Digital-Assets-Vice-President',
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function clickText(page, text, wait = 2000) {
  try {
    const el = page.getByText(text, { exact: true });
    if (await el.count() > 0) { await el.click(); await page.waitForTimeout(wait); return true; }
    const el2 = page.getByText(text);
    if (await el2.count() > 0) { await el2.click(); await page.waitForTimeout(wait); return true; }
  } catch(e) {}
  return false;
}

async function fillField(page, selector, value) {
  try {
    const el = page.locator(selector);
    if (await el.count() > 0) { await el.fill(value); return true; }
  } catch(e) {}
  return false;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n╔══════════════════════════════════════════════════════════╗');
  console.log('║     Auto-Apply: Crypto/Tokenization NYC Roles          ║');
  console.log('╠══════════════════════════════════════════════════════════╣');
  console.log(`║  ${YOU.name.padEnd(48)}║`);
  console.log(`║  ${YOU.email.padEnd(48)}║`);
  console.log(`║  ${YOU.phone.padEnd(48)}║`);
  console.log(`║  U.S. Authorized: Yes  |  Sponsorship: No${' '.repeat(17)}║`);
  console.log(`║  Workday Password: ${PW.padEnd(35)}║`);
  console.log('╚══════════════════════════════════════════════════════════╝');

  // Save password
  await writeFile('output/workday-passwords.txt',
    `Workday Account Credentials\nEmail: ${YOU.email}\nPassword: ${PW}\nCreated: ${new Date().toISOString()}\n\n---\n\n`,
    { flag: 'a' }
  );

  const browser = await chromium.launch({ headless: false });

  for (const app of APPS) {
    console.log(`\n${'═'.repeat(60)}`);
    console.log(`  ${app.company} - ${app.role}`);
    console.log(`  Apply: ${app.applyLink}`);
    console.log(`${'═'.repeat(60)}\n`);

    const page = await browser.newPage();
    page.setDefaultTimeout(30000);

    try {
      // Step 1: Navigate
      console.log('1️⃣  Opening application page...');
      await page.goto(app.url, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(3000);

      // Step 2: Accept cookies
      await clickText(page, 'Accept Cookies', 1000);
      console.log('   ✓ Cookies accepted');

      // Step 3: Check page state
      let text = await page.locator('body').innerText();

      // If we see the job description page with "Autofill with Resume", click it
      if (text.includes('Autofill with Resume')) {
        console.log('   → Clicking "Autofill with Resume"...');
        await clickText(page, 'Autofill with Resume', 3000);
        text = await page.locator('body').innerText();
      }

      // Step 4: Handle authentication
      if (text.includes('Create Account') || text.includes('Sign In')) {
        console.log('2️⃣  Authentication required...');
        
        // Try to fill create account form
        const emailFields = page.locator('input[type="text"]');
        const pwFields = page.locator('input[type="password"]');
        
        const emailCount = await emailFields.count();
        const pwCount = await pwFields.count();
        
        console.log(`   Found ${emailCount} text fields, ${pwCount} password fields`);

        // Fill email in the first text input (email field)
        if (emailCount > 0) {
          await emailFields.nth(0).fill(YOU.email);
          console.log('   ✓ Email filled');
        }
        
        // Fill password fields
        if (pwCount >= 2) {
          await pwFields.nth(0).fill(PW);
          await pwFields.nth(1).fill(PW);
          console.log('   ✓ Password fields filled');
        } else if (pwCount === 1) {
          await pwFields.nth(0).fill(PW);
          console.log('   ✓ Password filled');
        }

        // Click Create Account or Sign In
        if (text.includes('Create Account')) {
          await clickText(page, 'Create Account', 4000);
          console.log('   ✓ Create Account clicked');
        } else {
          await clickText(page, 'Sign In', 4000);
          console.log('   ✓ Sign In clicked');
        }

        text = await page.locator('body').innerText();
        console.log(`   Page now shows: ${text.slice(0, 200).replace(/\n/g, ' ')}`);
      }

      // Step 5: Upload resume
      console.log('3️⃣  Looking for resume upload...');
      const fileInput = page.locator('input[type="file"]');
      const fc = await fileInput.count();
      console.log(`   Found ${fc} file input(s)`);

      if (fc > 0) {
        await fileInput.nth(0).setInputFiles(resolve(app.resume));
        console.log('   ✓ Resume uploaded!');
        await page.waitForTimeout(3000);
      } else {
        console.log('   ⚠ No file upload found yet - may need to advance form first');
      }

      // Step 6: Take screenshot and let user take over
      const safeName = app.company.toLowerCase().replace(/[^a-z]/g, '');
      await page.screenshot({ path: `output/${safeName}-ready.png`, fullPage: true });
      console.log(`   📸 Screenshot: output/${safeName}-ready.png`);

      console.log(`\n✅ ${app.company} is ready for you!`);
      console.log('   The browser is open. Please:');
      console.log('   1. Complete any CAPTCHA or email verification');
      console.log('   2. Fill in any remaining form fields');
      console.log('   3. Click Submit when ready');
      console.log('   4. Close the browser tab when done\n');
      
      // Wait for the page/tab to close
      await page.waitForClose();

    } catch (err) {
      console.error(`\n✗ Error on ${app.company}: ${err.message}`);
      await page.screenshot({ path: `output/${app.company.toLowerCase().replace(/[^a-z]/g, '')}-error.png` }).catch(() => {});
      console.log('   Continuing to next application...');
      await page.close().catch(() => {});
    }
  }

  await browser.close();
  console.log('\n✅ All applications processed!');
  console.log(`   Workday password saved to output/workday-passwords.txt`);
}

main().catch(console.error);
