#!/usr/bin/env node

/**
 * Auto-Apply v3 - Handles Workday shadow DOM forms properly.
 * Opens each application, creates account, uploads resume.
 * Stops at CAPTCHA/OTP and lets you take over.
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
    direct: 'https://jobs.citi.com/job/new-york/digital-assets-product-manager-director/287/94522393936',
  },
  {
    company: 'BlackRock',
    role: 'Director, Digital Assets',
    url: 'https://blackrock.wd1.myworkdayjobs.com/BlackRock_Professional/job/New-York-NY/Director-Digital-Assets_R258072/apply',
    resume: resolve('output/resume-yoshi-kondo-blackrock-director-digital-assets.pdf'),
    direct: 'https://careers.blackrock.com/job/new-york/director-digital-assets/45831/89314536656',
  },
  {
    company: 'DTCC',
    role: 'Digital Assets Strategy Director',
    url: 'https://dtcc.wd1.myworkdayjobs.com/en-US/DTC/job/New-York-NY/Digital-Assets-Strategy-and-Market-Solutions-Director/apply',
    resume: resolve('output/resume-yoshi-kondo-dtcc-digital-assets-strategy.pdf'),
    direct: 'https://dtcc.wd1.myworkdayjobs.com/en-US/DTC/job/New-York-NY/Digital-Assets-Strategy-and-Market-Solutions-Director',
  },
  {
    company: 'J.P. Morgan',
    role: 'Asset Management Digital Assets, VP',
    url: 'https://jpmc.wd1.myworkdayjobs.com/en-US/External/job/New-York-NY/Asset-Management-Digital-Assets-Vice-President/apply',
    resume: resolve('output/resume-yoshi-kondo-jpmorgan-digital-assets-vp.pdf'),
    direct: 'https://jpmc.wd1.myworkdayjobs.com/en-US/External/job/New-York-NY/Asset-Management-Digital-Assets-Vice-President',
  },
];

async function findInShadowDOM(page, text) {
  return await page.evaluate((searchText) => {
    function searchShadow(root, depth = 0) {
      if (depth > 10) return null;
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_ALL, null, false);
      let node;
      while (node = walker.nextNode()) {
        if (node.shadowRoot) {
          const result = searchShadow(node.shadowRoot, depth + 1);
          if (result) return result;
        }
        if (node.tagName === 'INPUT' || node.tagName === 'SELECT' || node.tagName === 'TEXTAREA') {
          return { tag: node.tagName, type: node.type, id: node.id, name: node.name, placeholder: node.placeholder };
        }
      }
      return null;
    }
    return searchShadow(document.body);
  }, text);
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
        const acceptBtn = page.getByText('Accept Cookies');
        if (await acceptBtn.count() > 0) {
          await acceptBtn.click();
          await page.waitForTimeout(1000);
          console.log('✓ Cookies accepted');
        }
      } catch(e) {}

      // Check page content
      let bodyText = await page.locator('body').innerText();
      console.log(`\n📄 Page title: ${await page.title()}`);

      // If we see "Autofill with Resume", click it
      if (bodyText.includes('Autofill with Resume')) {
        console.log('→ Clicking "Autofill with Resume"...');
        const autofill = page.getByText('Autofill with Resume');
        if (await autofill.count() > 0) {
          await autofill.click();
          await page.waitForTimeout(3000);
          bodyText = await page.locator('body').innerText();
        }
      }

      // Handle authentication
      if (bodyText.includes('Create Account') || bodyText.includes('Sign In')) {
        console.log('\n🔐 Authentication needed...');
        
        // Click Sign In to reveal the form
        if (bodyText.includes('Create Account')) {
          // Form is already visible
          console.log('   Create Account form is visible');
        } else {
          await page.getByText('Sign In').click().catch(() => {});
          await page.waitForTimeout(2000);
          bodyText = await page.locator('body').innerText();
        }

        // Try to find and fill inputs using various strategies
        // Strategy 1: Direct input selectors
        const textInputs = page.locator('input:not([type="hidden"])');
        const pwInputs = page.locator('input[type="password"]');
        
        const textCount = await textInputs.count();
        const pwCount = await pwInputs.count();
        
        console.log(`   Found ${textCount} text inputs, ${pwCount} password inputs`);

        // List all inputs for debugging
        const allInputs = await page.locator('input').evaluateAll((nodes) =>
          nodes.map(n => ({
            type: n.type,
            id: n.id,
            placeholder: n.placeholder,
            autocomplete: n.autocomplete,
            className: n.className?.slice(0, 40),
          }))
        );
        
        // Filter to meaningful ones
        const meaningful = allInputs.filter(i => i.type !== 'hidden');
        if (meaningful.length > 0) {
          console.log('   Available inputs:');
          meaningful.forEach(i => console.log(`     - type=${i.type} id=${i.id} autocomplete=${i.autocomplete}`));
        }

        // Fill email
        const emailField = page.locator('input[autocomplete="email"]');
        if (await emailField.count() > 0) {
          await emailField.nth(0).fill(YOU.email);
          console.log('   ✓ Email filled via autocomplete');
        } else if (textCount > 0) {
          // Try first text input
          const firstText = textInputs.nth(0);
          const placeholder = await firstText.getAttribute('placeholder').catch(() => '');
          if (!placeholder || placeholder.toLowerCase().includes('email')) {
            await firstText.fill(YOU.email);
            console.log('   ✓ Email filled (first text field)');
          }
        }

        // Fill password(s)
        if (pwCount >= 2) {
          await pwInputs.nth(0).fill(PW);
          await pwInputs.nth(1).fill(PW);
          console.log('   ✓ Password + verify filled');
        } else if (pwCount === 1) {
          await pwInputs.nth(0).fill(PW);
          console.log('   ✓ Password filled');
        }

        // Click the submit button
        if (bodyText.includes('Create Account')) {
          const createBtns = page.getByText('Create Account');
          const createCount = await createBtns.count();
          console.log(`   Found ${createCount} "Create Account" buttons`);
          if (createCount > 0) {
            // Click the last one (usually the primary action)
            await createBtns.nth(createCount - 1).click();
            console.log('   ✓ Create Account clicked');
            await page.waitForTimeout(5000);
          }
        } else {
          const signInBtns = page.getByText('Sign In');
          const siCount = await signInBtns.count();
          if (siCount > 0) {
            await signInBtns.nth(siCount - 1).click();
            console.log('   ✓ Sign In clicked');
            await page.waitForTimeout(5000);
          }
        }
      }

      // Try to upload resume
      console.log('\n📎 Looking for resume upload...');
      const fileInput = page.locator('input[type="file"]');
      const fc = await fileInput.count();
      console.log(`   File inputs: ${fc}`);

      if (fc > 0) {
        await fileInput.nth(0).setInputFiles(app.resume);
        console.log('   ✅ Resume uploaded!');
        await page.waitForTimeout(2000);
      } else {
        console.log('   ⚠ No file upload visible yet');
      }

      // Screenshot
      const safeName = app.company.toLowerCase().replace(/[^a-z]/g, '');
      await page.screenshot({ path: `output/${safeName}-ready.png`, fullPage: true });
      console.log(`   📸 Screenshot saved`);

      // Let user take over
      console.log(`\n✅ ${app.company} is ready! The browser is open.`);
      console.log('   → Complete any CAPTCHA/email verification');
      console.log('   → Fill remaining fields and click Submit');
      console.log('   → Close the TAB when done\n');

      // Wait for the page to be closed
      await new Promise(resolve => {
        const check = setInterval(() => {
          page.isClosed().then(closed => {
            if (closed) { clearInterval(check); resolve(); }
          }).catch(() => { clearInterval(check); resolve(); });
        }, 500);
      });

    } catch (err) {
      console.error(`\n✗ Error: ${err.message}`);
      await page.screenshot({ path: `output/${app.company.toLowerCase().replace(/[^a-z]/g, '')}-error.png` }).catch(() => {});
      await page.close().catch(() => {});
    }
  }

  await browser.close();
  console.log('\n✅ All done!');
  console.log(`   Password saved to output/workday-passwords.txt`);
}

main().catch(console.error);
