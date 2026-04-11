const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/SamplePDFButtons.tsx', 'utf8');

const idx = c.indexOf("machineName: 'Tokarka CNC TOK-600'");
const intendedIdx = c.indexOf('intendedUse:', idx);
console.log('between:', JSON.stringify(c.slice(idx + 36, intendedIdx)));

// Replace everything between machineName line end and intendedUse with clean comma+newline
c = c.slice(0, idx + 36) + ',\n    ' + c.slice(intendedIdx);

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/SamplePDFButtons.tsx', c, 'utf8');
console.log('fixed, context:', JSON.stringify(c.slice(idx + 36, idx + 60)));