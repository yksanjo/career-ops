#!/usr/bin/env node

/**
 * Auto-Apply v4 - Final version.
 * Handles Workday shadow DOM, account creation, resume upload.
 * Lets you take over after each step.
 */

import { chromium } from 'playwright';
import { resolve } from 'node:path';
import { writeFile } from 'node:fs/promises';

const YOU = {
  name: 'Yoshi Kondo',
  email: 'yoshi@musicailab.com',
  phone: '347-404-3647',
  address: '515 E 14th St Apt 5G, New York, NY 10009',
  linkedin: 'https://www.linkedin.com/in/yoshi-kondo-3110462a9/',
  github: 'https://github.com/yksanjo',
};

function genPW() {
  const s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let p = '';
  for (let i = 0; i < 16; i++) p += s[Math.floor(Math.random() * s.length)];
  return p;
}
const PW = genPW();

const APPS = [
  {
    company: 'Citi',
    role: 'Digital Assets Product Manager, Director',
    url: 'https://citi.wd5.myworkdayjobs.com/en-US/2/job/New-York-New-York-United-States/Digital-Assets-Product-Manager-Director_26958499/apply/autofillWithResume',
    resume: resolve('output/resume-yoshi-kondo-citi-digital-assets-product-manager.pdf'),
  },
  {
    company: 'BlackRock',
    role: 'Director, Digital Assets',
    url: 'https://blackrock.wd1.myworkdayjobs.com/BlackRock_Professional/job/New-York-NY/Director-Digital-Assets_R258072/apply',
    resume: resolve('output/resume-yoshi-kondo-blackrock-director-digital-assets.pdf'),
  },
  {
    company: 'DTCC',
    role: 'Digital Assets Strategy Director',
    url: 'https://dtcc.wd1.myworkdayjobs.com/en-US/DTC/job/New-York-NY/Digital-Assets-Strategy-and-Market-Solutions-Director/apply',
    resume: resolve('output/resume-yoshi-kondo-dtcc-digital-assets-strategy.pdf'),
  },
  {
    company: 'J.P. Morgan',
    role: 'Asset Management Digital Assets, VP',
    url: 'https://jpmc.wd1.myworkdayjobs.com/en-US/External/job/New-York-NY/Asset-Management-Digital-Assets-Vice-President/apply',
    resume: resolve('output/resume-yoshi-kondo-jpmorgan-digital-assets-vp.pdf'),
  },
];

async function waitForPageClose(page) {
  return new Promise((resolve) => {
    const timer = setInterval(async () => {
      try {
        const closed = page.isClosed();
        if (closed) {
          clearInterval(timer);
          resolve();
        }
      } catch (e) {
        clearInterval(timer);
        resolve();
      }
    }, 500);
  });
}

async function main() {
  console.log('\n╔══════════════════════════════════════════════════════════╗');
  console.log('║     Auto-Apply: Crypto/Tokenization NYC Roles          ║');
  console.log('╠══════════════════════════════════════════════════════════╣');
  console.log(`║  ${YOU.name.padEnd(48)}║`);
  console.log(`║  ${YOU.email.padEnd(48)}║`);
  console.log(`║  ${YOU.phone.padEnd(48)}║`);
  console.log(`║  Password: ${PW.padEnd(40)}║`);
  console.log('╚══════════════════════════════════════════════════════════╝');

  await writeFile('output/workday-passwords.txt',
    `Workday Credentials (saved ${new Date().toISOString()})\nEmail: ${YOU.email}\nPassword: ${PW}\n\n`,
    { flag: 'a' }
  );

  const browser = await chromium.launch({ headless: false });

  for (const app of APPS) {
    console.log(`\n${'═'.repeat(60)}`);
    console.log(`  ${app.company} - ${app.role}`);
    console.log(`${'═'.repeat(60)}`);

    const page = await browser.newPage();
    page.setDefaultTimeout(15000);

    try {
      // Navigate
      console.log('\n→ Opening application...');
      await page.goto(app.url, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(4000);

      // Accept cookies
      try {
        if (await page.getByText('Accept Cookies').count() > 0) {
          await page.getByText('Accept Cookies').click();
          await page.waitForTimeout(1000);
          console.log('✓ Cookies accepted');
        }
      } catch(e) {}

      let bodyText = await page.locator('body').innerText();

      // If "Autofill with Resume" is visible, click it
      if (bodyText.includes('Autofill with Resume')) {
        console.log('→ Clicking "Autofill with Resume"...');
        await page.getByText('Autofill with Resume').click().catch(() => {});
        await page.waitForTimeout(3000);
        bodyText = await page.locator('body').innerText();
      }

      // Handle authentication
      if (bodyText.includes('Create Account') || bodyText.includes('Sign In')) {
        console.log('\n🔐 Authentication needed...');

        // Click Sign In to reveal forms if not already visible
        if (!bodyText.includes('Create Account')) {
          await page.getByText('Sign In').click().catch(() => {});
          await page.waitForTimeout(2000);
          bodyText = await page.locator('body').innerText();
        }

        // Fill email
        const emailField = page.locator('input[autocomplete="email"]');
        if (await emailField.count() > 0) {
          await emailField.nth(0).fill(YOU.email);
          console.log('✓ Email filled');
        }

        // Fill passwords
        const pwFields = page.locator('input[type="password"]');
        const pwCount = await pwFields.count();
        if (pwCount >= 2) {
          await pwFields.nth(0).fill(PW);
          await pwFields.nth(1).fill(PW);
          console.log('✓ Password + verify filled');
        } else if (pwCount === 1) {
          await pwFields.nth(0).fill(PW);
          console.log('✓ Password filled');
        }

        // Click Create Account or Sign In
        if (bodyText.includes('Create Account')) {
          const btns = page.getByText('Create Account');
          const count = await btns.count();
          if (count > 0) {
            await btns.nth(count - 1).click();
            console.log('✓ Create Account submitted');
            await page.waitForTimeout(5000);
          }
        } else {
          const btns = page.getByText('Sign In');
          const count = await btns.count();
          if (count > 0) {
            await btns.nth(count - 1).click();
            console.log('✓ Sign In submitted');
            await page.waitForTimeout(5000);
          }
        }
      }

      // Try to upload resume
      console.log('\n📎 Checking for resume upload...');
      const fileInput = page.locator('input[type="file"]');
      if (await fileInput.count() > 0) {
        await fileInput.nth(0).setInputFiles(app.resume);
        console.log('✅ Resume uploaded!');
        await page.waitForTimeout(2000);
      } else {
        console.log('⚠ No file upload visible (may need to advance form first)');
      }

      // Screenshot
      const safeName = app.company.toLowerCase().replace(/[^a-z]/g, '');
      await page.screenshot({ path: `output/${safeName}-ready.png`, fullPage: true });
      console.log('📸 Screenshot saved');

      // Let user take over
      console.log(`\n✅ ${app.company} is ready!`);
      console.log('   The browser is open for you.');
      console.log('   1. Complete any CAPTCHA / email verification');
      console.log('   2. Fill remaining fields');
      console.log('   3. Click Submit');
      console.log('   4. Close the TAB when done\n');

      await waitForPageClose(page);

    } catch (err) {
      console.error(`\n✗ Error: ${err.message}`);
      await page.screenshot({ path: `output/${app.company.toLowerCase().replace(/[^a-z]/g, '')}-error.png` }).catch(() => {});
    }
    
    try { await page.close(); } catch(e) {}
  }

  await browser.close();
  console.log('\n✅ All applications processed!');
  console.log(`   Password: ${PW}`);
  console.log(`   Saved to: output/workday-passwords.txt`);
}

main().catch(console.error);
