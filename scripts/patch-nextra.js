#!/usr/bin/env node
// Patches nextra-theme-docs to survive MetaMask's SES lockdown.
// SES modifies IntersectionObserver so even valid rootMargin values throw.
// We wrap it in try-catch so the page loads; active heading detection degrades gracefully.

const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../node_modules/nextra-theme-docs/dist/index.js');

if (!fs.existsSync(file)) {
  console.log('patch-nextra: nextra-theme-docs not found, skipping');
  process.exit(0);
}

let code = fs.readFileSync(file, 'utf8');

// Already patched?
if (code.includes('catch(e) { observerRef.current = { observe')) {
  console.log('patch-nextra: already patched, skipping');
  process.exit(0);
}

// Fix 1: trim navbarHeight and add px fallback
code = code.replace(
  /rootMargin:\s*`-\$\{navbarHeight\} 0px -50%`/,
  'rootMargin: `-${(navbarHeight || "").trim() || "64px"} 0px -50%`'
);

// Fix 2: wrap IntersectionObserver construction in try-catch
code = code.replace(
  'observerRef.current = new IntersectionObserver(',
  'try { observerRef.current = new IntersectionObserver('
);

// Close the try-catch after the options object closes the constructor
code = code.replace(
  /(\s*\}\s*\);\s*)(return \(\) => \{\s*observerRef\.current\.disconnect\(\);)/,
  ') { } catch(e) { observerRef.current = { observe: () => {}, disconnect: () => {} }; }\n    $2'
);

// Simpler close pattern if above doesn't match
if (!code.includes('catch(e) { observerRef.current = { observe')) {
  code = code.replace(
    /threshold: \[0, 1\]\s*\}\s*\);(\s*return \(\) =>)/,
    'threshold: [0, 1]\n      }\n    ); } catch(e) { observerRef.current = { observe: () => {}, disconnect: () => {} }; }$1'
  );
}

fs.writeFileSync(file, code);

if (code.includes('catch(e) { observerRef.current = { observe')) {
  console.log('patch-nextra: patch applied successfully');
} else {
  console.warn('patch-nextra: WARNING - patch may not have applied correctly');
}
