const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/i18n/landingTranslations.ts', 'utf8');

// Fix French heroTitle1 - remove the double apostrophe issue
const bad = "heroTitle1: 'Outil de support \u00e0 l\\''\u00e9valuation des risques machines'";
const good = "heroTitle1: 'Outil de support pour l\\'analyse des risques machines'";

if (c.includes(bad)) {
  c = c.replace(bad, good);
  console.log('fixed FR heroTitle1');
} else {
  // Try to find it
  const idx = c.indexOf('Outil de support');
  if (idx > -1) {
    const line = c.slice(c.lastIndexOf('\n', idx), c.indexOf('\n', idx));
    console.log('found line:', line);
  }
}

// Also fix ctaTitle1 FR if it has same issue
const badCta = "ctaTitle1: 'Outil de support \u00e0 l\\'";
if (c.includes(badCta)) {
  const start = c.indexOf(badCta);
  const end = c.indexOf("',", start);
  console.log('bad ctaTitle1:', c.slice(start, end + 2));
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/i18n/landingTranslations.ts', c, 'utf8');
