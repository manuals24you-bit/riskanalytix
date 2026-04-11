const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/LandingPage.tsx', 'utf8');

// Replace unicode escapes with actual characters
c = c.replace(/\\u26a0/g, '⚠');
c = c.replace(/\\u2713/g, '✓');
c = c.replace(/\\u00b7/g, '·');
c = c.replace(/\\u2014/g, '—');
c = c.replace(/\\u2192/g, '→');
c = c.replace(/\\u00a9/g, '©');
c = c.replace(/\\u00b1/g, '±');

// Fix any remaining \uXXXX patterns
c = c.replace(/\\u([0-9a-fA-F]{4})/g, (match, hex) => {
  return String.fromCharCode(parseInt(hex, 16));
});

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/LandingPage.tsx', c, 'utf8');
console.log('done');