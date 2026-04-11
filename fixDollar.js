const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/LandingPage.tsx', 'utf8');

// Fix \\${ -> ${
while (c.includes('\\${')) {
  c = c.replace(/\\\${/g, '${');
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/LandingPage.tsx', c, 'utf8');

const idx = c.indexOf('transition:');
console.log('fixed:', JSON.stringify(c.slice(idx, idx+80)));