#!/usr/bin/env node

/**
 * Auto-apply v2 - More robust Workday application automation.
 * Handles account creation, sign-in, resume upload, and form filling.
 */

import { chromium } from 'playwright';
import { resolve } from 'node:path';
import { writeFile, readFile } from 'node:fs/promises';

// ─── Configuration ───────────────────────────────────────────────────────────

const ME = {
  name: 'Yoshi Kondo',
  email: 'yoshi@musicailab.com',
  phone: '347-404-3647',
  location: 'New York, NY 10009',
  linkedin: 'https://www.linkedin.com/in/yoshi-kondo-3110462a9/',
  github: 'https://github.com/yksanjo',
  authorized: true,
  sponsorship: false,
  onsite: true,
  veteran: 'No',
};

function generatePassword() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let pw = 'A1!' + chars[Math.floor(Math.random() * 26) + 26] + chars[Math.floor(Math.random() * 10) + 52];
  for (let i = pw.length; i < 16; i++) pw += chars[Math.floor(Math.random() * chars.length)];
  return pw.split('').sort(() => Math.random() - 0.5).join('');
}

const PASSWORD = generatePassword();

// ─── Applications ────────────────────────────────────────────────────────────

const APPS = [
  {
    company: 'Citi',
    role: 'Digital Assets Product Manager, Director',
    score: 4.6,
    url: 'https://citi.wd5.myworkdayjobs.com/en-US/2/job/New-York-New-York-United-States/Digital-Assets-Product-Manager-Director_26958499/apply/autofillWithResume',
    resume: resolve('output/resume-yoshi-kondo-citi-digital-assets-product-manager.pdf'),
  },
  {
    company: 'BlackRock',
    role: 'Director, Digital Assets',
    score: 4.5,
    url: 'https://blackrock.wd1.myworkdayjobs.com/BlackRock_Professional/job/New-York-NY/Managing-Director--Digital-Assets_R258072/apply',
    resume: resolve('output/resume-yoshi-kondo-blackrock-director-digital-assets.pdf'),
  },
  {
    company: 'DTCC',
    role: 'Digital Assets Strategy and Market Solutions Director',
    score: 4.0,
    url: 'https://dtcc.wd1.myworkdayjobs.com/en-US/DTC/job/New-York-NY/Digital-Assets-Strategy-and-Market-Solutions-Director_R2404/apply',
    resume: resolve('output/resume-yoshi-kondo-dtcc-digital-assets-strategy.pdf'),
  },
  {
    company: 'J.P. Morgan',
    role: 'Asset Management Digital Assets, VP',
    score: 4.3,
    url: 'https://jpmc.wd1.myworkdayjobs.com/en-US/External/job/New-York-NY/Asset-Management-Digital-Assets--Vice-President_210525258/apply',
    resume: resolve('output/resume-yoshi-kondo-jpmorgan-digital-assets-vp.pdf'),
  },
];

// ─── Workday Handler ─────────────────────────────────────────────────────────

async function handleWorkdayApplication(page, app) {
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  ${app.company} - ${app.role}`);
  console.log(`${'═'.repeat(60)}\n`);

  // Navigate
  console.log(`→ Opening ${app.company} application...`);
  await page.goto(app.url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(4000);

  // Accept cookies
  try {
    const cookieBtn = page.getByText('Accept Cookies');
    if (await cookieBtn.count() > 0) {
      await cookieBtn.click();
      await page.waitForTimeout(1500);
      console.log('✓ Cookies accepted');
    }
  } catch(e) {}

  // Check what's on the page
  let bodyText = await page.locator('body').innerText();
  
  // If we see "Autofill with Resume" or "Apply Manually", click autofill
  if (bodyText.includes('Autofill with Resume')) {
    console.log('→ Clicking Autofill with Resume...');
    const autofillLink = page.getByText('Autofill with Resume');
    if (await autofillLink.count() > 0) {
      await autofillLink.click();
      await page.waitForTimeout(3000);
      bodyText = await page.locator('body').innerText();
    }
  }

  // Handle Create Account or Sign In
  if (bodyText.includes('Create Account') || bodyText.includes('Sign In')) {
    console.log('→ Authentication required');
    
    // Try to find and fill the create account form
    const emailInputs = page.locator('input[autocomplete="email"]');
    const passwordInputs = page.locator('input[autocomplete="new-password"]');
    
    const emailCount = await emailInputs.count();
    const passwordCount = await passwordInputs.count();
    
    console.log(`  Found ${emailCount} email inputs, ${passwordCount} password inputs`);
    
    if (emailCount > 0 && passwordCount > 0) {
      // Fill create account form
      await emailInputs.nth(0).fill(ME.email);
      await passwordInputs.nth(0).fill(PASSWORD);
      
      // Verify password field
      const verifyInputs = page.locator('input[autocomplete="new-password"]');
      if (await verifyInputs.count() > 1) {
        await verifyInputs.nth(1).fill(PASSWORD);
      }
      
      console.log('✓ Account form filled');
      
      // Click Create Account button
      const createBtn = page.getByText('Create Account').last();
      if (await createBtn.count() > 0) {
        await createBtn.click();
        console.log('✓ Create Account clicked');
        await page.waitForTimeout(5000);
      }
    } else {
      // Try sign in with existing credentials
      console.log('→ Trying to sign in...');
      const signInEmail = page.locator('input[autocomplete="email"]');
      const signInPass = page.locator('input[autocomplete="current-password"]');
      
      if (await signInEmail.count() > 0) {
        await signInEmail.nth(0).fill(ME.email);
      }
      if (await signInPass.count() > 0) {
        await signInPass.nth(0).fill(PASSWORD);
      }
      
      const signInBtn = page.getByText('Sign In').last();
      if (await signInBtn.count() > 0) {
        await signInBtn.click();
        await page.waitForTimeout(5000);
      }
    }
    
    // Save credentials
    await writeFile('output/workday-passwords.txt',
      `${app.company} Workday\nEmail: ${ME.email}\nPassword: ${PASSWORD}\nTime: ${new Date().toISOString()}\n\n`,
      { flag: 'a' }
    );
  }

  // Wait for form to load and try to upload resume
  await page.waitForTimeout(3000);
  bodyText = await page.locator('body').innerText();
  console.log(`\n── Page state after auth ──`);
  console.log(bodyText.slice(0, 1500));

  // Look for file upload
  const fileInput = page.locator('input[type="file"]');
  const fileCount = await fileInput.count();
  console.log(`\nFile inputs found: ${fileCount}`);
  
  if (fileCount > 0) {
    await fileInput.nth(0).setInputFiles(app.resume);
    console.log('✓ Resume PDF uploaded');
    await page.waitForTimeout(3000);
  }

  // Take screenshot
  const safeName = app.company.toLowerCase().replace(/[^a-z]/g, '');
  await page.screenshot({ path: `output/${safeName}-application-state.png`, fullPage: true });
  console.log(`✓ Screenshot: output/${safeName}-application-state.png`);
  
  return bodyText;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║     Auto-Apply: Crypto/Tokenization NYC Roles          ║');
  console.log('╠══════════════════════════════════════════════════════════╣');
  console.log(`║  ${ME.name}  |  ${ME.email}`);
  console.log(`║  ${ME.location}  |  U.S. Auth: ${ME.authorized}`);
  console.log(`║  Workday Password: ${PASSWORD}`);
  console.log('╚══════════════════════════════════════════════════════════╝');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    for (const app of APPS) {
      await handleWorkdayApplication(page, app);
      
      console.log(`\n✅ ${app.company} flow complete.`);
      console.log('   Browser is open for you to review.');
      console.log('   → Close the browser window to continue to next application.');
      console.log('   → Or press Ctrl+C to stop.\n');
      
      // Wait for user to close the browser
      await new Promise((resolve) => {
        const checkInterval = setInterval(async () => {
          try {
            const pages = browser.contexts()[0]?.pages() || [];
            if (pages.length === 0) {
              clearInterval(checkInterval);
              resolve();
            }
          } catch(e) {
            clearInterval(checkInterval);
            resolve();
          }
        }, 1000);
      });
      
      // Re-create page for next app
      // (browser was closed by user, so we need a new one)
      break; // For now, just do one at a time
    }
  } catch (error) {
    console.error(`\n✗ Error: ${error.message}`);
    await page.screenshot({ path: 'output/error-state.png', fullPage: true }).catch(() => {});
  }

  console.log('\nDone.');
}

main().catch(console.error);
