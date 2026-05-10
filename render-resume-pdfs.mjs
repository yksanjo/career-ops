#!/usr/bin/env node

import { chromium } from 'playwright';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { basename, dirname, resolve } from 'node:path';

const files = process.argv.slice(2);

if (!files.length) {
  console.error('Usage: node render-resume-pdfs.mjs <resume.md> [...]');
  process.exit(1);
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function inline(text) {
  return escapeHtml(text)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1">$1</a>');
}

function markdownToHtml(md) {
  const lines = md.split(/\r?\n/);
  const out = [];
  let inList = false;

  function closeList() {
    if (inList) {
      out.push('</ul>');
      inList = false;
    }
  }

  for (const line of lines) {
    if (!line.trim()) {
      closeList();
      continue;
    }

    if (line.startsWith('# ')) {
      closeList();
      out.push(`<h1>${inline(line.slice(2).trim())}</h1>`);
    } else if (line.startsWith('## ')) {
      closeList();
      out.push(`<h2>${inline(line.slice(3).trim())}</h2>`);
    } else if (line.startsWith('### ')) {
      closeList();
      out.push(`<h3>${inline(line.slice(4).trim())}</h3>`);
    } else if (line.startsWith('- ')) {
      if (!inList) {
        out.push('<ul>');
        inList = true;
      }
      out.push(`<li>${inline(line.slice(2).trim())}</li>`);
    } else {
      closeList();
      out.push(`<p>${inline(line.trim())}</p>`);
    }
  }
  closeList();
  return out.join('\n');
}

function wrapHtml(body, title) {
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>${escapeHtml(title)}</title>
<style>
  @page { margin: 0.55in; }
  body {
    font-family: Arial, Helvetica, sans-serif;
    color: #111827;
    font-size: 10.7px;
    line-height: 1.38;
  }
  h1 {
    font-size: 24px;
    margin: 0 0 4px;
    letter-spacing: 0;
  }
  h2 {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0;
    border-bottom: 1px solid #d1d5db;
    margin: 13px 0 6px;
    padding-bottom: 3px;
  }
  h3 {
    font-size: 11.3px;
    margin: 8px 0 2px;
  }
  p {
    margin: 2px 0 5px;
  }
  ul {
    margin: 4px 0 7px 17px;
    padding: 0;
  }
  li {
    margin: 0 0 3px;
  }
  a {
    color: #1f2937;
    text-decoration: none;
  }
</style>
</head>
<body>
${body}
</body>
</html>`;
}

const browser = await chromium.launch({ headless: true });

for (const file of files) {
  const inputPath = resolve(file);
  const md = await readFile(inputPath, 'utf8');
  const title = basename(inputPath, '.md');
  const html = wrapHtml(markdownToHtml(md), title);
  const htmlPath = inputPath.replace(/\.md$/, '.html');
  const pdfPath = inputPath.replace(/\.md$/, '.pdf');

  await mkdir(dirname(htmlPath), { recursive: true });
  await writeFile(htmlPath, html);

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.pdf({
    path: pdfPath,
    format: 'Letter',
    printBackground: true,
    margin: {
      top: '0.5in',
      right: '0.55in',
      bottom: '0.5in',
      left: '0.55in',
    },
  });
  await page.close();
  console.log(`Rendered ${pdfPath}`);
}

await browser.close();
