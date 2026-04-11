const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/LandingPage.tsx', 'utf8');

// Fix \\` -> `
c = c.replace(/\\\\`/g, '`');
// Fix \\${  -> ${
c = c.replace(/\\\\\${/g, '${');
// Fix also style template literals with \\` 
c = c.replace(/\\`/g, '`');

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/LandingPage.tsx', c, 'utf8');

// Verify
const idx = c.indexOf('transition:');
console.log('fixed:', JSON.stringify(c.slice(idx, idx+80)));