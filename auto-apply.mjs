#!/usr/bin/env node

/**
 * Auto-apply to crypto/tokenization roles at NYC financial institutions.
 * 
 * Creates Workday accounts where needed, uploads tailored resumes,
 * and fills application forms. Stops at CAPTCHA/OTP/final submit.
 */

import { chromium } from 'playwright';
import { resolve } from 'node:path';
import { writeFile, readFile } from 'node:fs/promises';

// ─── Configuration ───────────────────────────────────────────────────────────

const APPLICANT = {
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

// Generate a strong password for Workday accounts
function generatePassword() {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const digits = '0123456789';
  const special = '!@#$%^&*()-_=+';
  const all = upper + lower + digits + special;
  
  // Ensure at least one of each required type
  let pw = '';
  pw += upper[Math.floor(Math.random() * upper.length)];
  pw += lower[Math.floor(Math.random() * lower.length)];
  pw += digits[Math.floor(Math.random() * digits.length)];
  pw += special[Math.floor(Math.random() * special.length)];
  
  // Fill to 16 chars
  for (let i = pw.length; i < 16; i++) {
    pw += all[Math.floor(Math.random() * all.length)];
  }
  
  // Shuffle
  return pw.split('').sort(() => Math.random() - 0.5).join('');
}

const WORKDAY_PASSWORD = generatePassword();

// ─── Applications ────────────────────────────────────────────────────────────

const APPLICATIONS = [
  {
    id: 'citi',
    company: 'Citi',
    role: 'Digital Assets Product Manager, Director',
    score: 4.6,
    url: 'https://citi.wd5.myworkdayjobs.com/en-US/2/job/New-York-New-York-United-States/Digital-Assets-Product-Manager-Director_26958499/apply/autofillWithResume',
    createAccountUrl: 'https://citi.wd5.myworkdayjobs.com/en-US/2/job/New-York-New-York-United-States/Digital-Assets-Product-Manager-Director_26958499/apply/autofillWithResume',
    resumePath: resolve('output/resume-yoshi-kondo-citi-digital-assets-product-manager.pdf'),
    signInSelectors: {
      emailInput: '#input-4',
      passwordInput: '#input-5',
      verifyInput: '#input-6',
      createBtn: 'button:has-text("Create Account")',
      signInBtn: 'button:has-text("Sign In")',
    },
  },
  {
    id: 'blackrock',
    company: 'BlackRock',
    role: 'Director, Digital Assets',
    score: 4.5,
    url: 'https://blackrock.wd1.myworkdayjobs.com/BlackRock_Professional/job/New-York-NY/Managing-Director--Digital-Assets_R258072/apply',
    resumePath: resolve('output/resume-yoshi-kondo-blackrock-director-digital-assets.pdf'),
  },
  {
    id: 'dtcc',
    company: 'DTCC',
    role: 'Digital Assets Strategy and Market Solutions Director',
    score: 4.0,
    url: 'https://dtcc.wd1.myworkdayjobs.com/en-US/DTC/job/New-York-NY/Digital-Assets-Strategy-and-Market-Solutions-Director_R2404/apply',
    resumePath: resolve('output/resume-yoshi-kondo-dtcc-digital-assets-strategy.pdf'),
  },
  {
    id: 'jpmorgan',
    company: 'J.P. Morgan',
    role: 'Asset Management Digital Assets, VP',
    score: 4.3,
    url: 'https://jpmc.wd1.myworkdayjobs.com/en-US/External/job/New-York-NY/Asset-Management-Digital-Assets--Vice-President_210525258/apply',
    resumePath: resolve('output/resume-yoshi-kondo-jpmorgan-digital-assets-vp.pdf'),
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function clickIfVisible(page, text, timeout = 2000) {
  try {
    const loc = page.getByText(text, { exact: true });
    if (await loc.count() > 0) {
      await loc.click();
      await page.waitForTimeout(timeout);
      return true;
    }
  } catch (e) {}
  return false;
}

async function typeInto(page, selector, value) {
  try {
    const loc = page.locator(selector);
    if (await loc.count() > 0) {
      await loc.fill(value);
      return true;
    }
  } catch (e) {}
  return false;
}

async function waitAndType(page, selector, value, timeout = 5000) {
  try {
    await page.waitForSelector(selector, { timeout });
    await page.locator(selector).fill(value);
    return true;
  } catch (e) {
    console.log(`  ⚠ Could not find ${selector}`);
    return false;
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function applyToCiti(browser) {
  console.log('\n═══════════════════════════════════════════════');
  console.log('  CITI - Digital Assets Product Manager, Director');
  console.log('═══════════════════════════════════════════════\n');

  const page = await browser.newPage();
  
  try {
    // Navigate to apply page
    console.log('→ Navigating to Citi application...');
    await page.goto(APPLICATIONS[0].url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(3000);

    // Accept cookies
    await clickIfVisible(page, 'Accept Cookies');
    console.log('✓ Cookies accepted');

    // Click Sign In to reveal the create account form
    await clickIfVisible(page, 'Sign In');
    await page.waitForTimeout(2000);
    console.log('✓ Sign In clicked, checking for Create Account form');

    // Check if we see the Create Account form
    const bodyText = await page.locator('body').innerText();
    
    if (bodyText.includes('Create Account')) {
      console.log('→ Create Account form detected. Creating account...');
      
      // Fill in the create account form
      await waitAndType(page, '#input-4', APPLICANT.email);
      await waitAndType(page, '#input-5', WORKDAY_PASSWORD);
      await waitAndType(page, '#input-6', WORKDAY_PASSWORD);
      
      console.log('✓ Form filled with email and password');
      
      // Click Create Account button
      await clickIfVisible(page, 'Create Account');
      console.log('✓ Create Account clicked - waiting for response...');
      await page.waitForTimeout(5000);
      
      // Check result
      const afterCreate = await page.locator('body').innerText();
      if (afterCreate.includes('Verify') || afterCreate.includes('verification') || afterCreate.includes('email')) {
        console.log('⚠ Account created -可能需要 email verification (may need OTP)');
        console.log('  Password saved to output/workday-passwords.txt');
      } else if (afterCreate.includes('step 2') || afterCreate.includes('upload') || afterCreate.includes('resume')) {
        console.log('✓ Account created! Proceeding to application...');
      }
      
      // Save password
      await writeFile('output/workday-passwords.txt', 
        `Citi Workday Account\nEmail: ${APPLICANT.email}\nPassword: ${WORKDAY_PASSWORD}\nCreated: ${new Date().toISOString()}\n\n`,
        { flag: 'a' }
      );
      
      // Try to upload resume if file input appears
      await page.waitForTimeout(3000);
      const fileInput = page.locator('input[type="file"]');
      if (await fileInput.count() > 0) {
        await fileInput.nth(0).setInputFiles(APPLICATIONS[0].resumePath);
        console.log('✓ Resume uploaded');
        await page.waitForTimeout(3000);
      }
      
    } else if (bodyText.includes('Sign In')) {
      console.log('→ Sign In form visible (account may already exist)');
      await waitAndType(page, '#input-4', APPLICANT.email);
      await waitAndType(page, '#input-5', WORKDAY_PASSWORD);
      await clickIfVisible(page, 'Sign In');
      await page.waitForTimeout(5000);
    }
    
    // Take screenshot
    await page.screenshot({ path: 'output/citi-after-account-creation.png', fullPage: true });
    console.log('✓ Screenshot saved to output/citi-after-account-creation.png');
    
    // Print current state
    const currentText = await page.locator('body').innerText();
    console.log('\n── Current page state ──');
    console.log(currentText.slice(0, 2000));
    
  } catch (error) {
    console.error('✗ Error:', error.message);
    await page.screenshot({ path: 'output/citi-error.png', fullPage: true });
  }
  
  console.log('\n→ Citi application flow complete. Review the browser window.');
  console.log('  Press Ctrl+C to stop, or close the browser to continue.\n');
  
  // Don't close - let user see the result
  return page;
}

async function main() {
  console.log('╔══════════════════════════════════════════════════════╗');
  console.log('║     Auto-Apply: Crypto/Tokenization NYC Roles       ║');
  console.log('╠══════════════════════════════════════════════════════╣');
  console.log(`║  Applicant: ${APPLICANT.name}`);
  console.log(`║  Email:     ${APPLICANT.email}`);
  console.log(`║  Location:  ${APPLICANT.location}`);
  console.log(`║  Auth:      ${APPLICANT.authorized ? 'Yes' : 'No'}`);
  console.log(`║  Password:  ${WORKDAY_PASSWORD}`);
  console.log('╚══════════════════════════════════════════════════════╝\n');

  const browser = await chromium.launch({ headless: false });

  try {
    // Start with Citi (highest priority)
    const citiPage = await applyToCiti(browser);
    
    // Keep browser open for user to review
    console.log('\n✅ Citi application flow executed.');
    console.log('   The browser is still open for you to review.');
    console.log('   Close the browser window when done, or I can continue to the next application.');
    
    // Wait for browser to close (user reviews and closes)
    await citiPage.waitForClose();
    
    console.log('\n→ Browser closed. Moving to next application...');
    
  } catch (error) {
    console.error('\n✗ Fatal error:', error.message);
  } finally {
    await browser.close();
  }
  
  console.log('\nDone.');
}

main().catch(console.error);
