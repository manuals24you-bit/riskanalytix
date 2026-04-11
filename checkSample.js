const fs = require('fs');
const c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/SamplePDFButtons.tsx', 'utf8');

console.log('entries count:', c.split("{ id: '").length - 1);
console.log('plrAuto:', c.includes('plrAuto'));
console.log('reductionLevel:', c.includes('reductionLevel'));
console.log('action:', c.includes('action:'));
console.log('scenario:', c.includes('scenario:'));

// Find first entry
const firstEntry = c.indexOf("{ id: '1'");
console.log('first entry:', c.slice(firstEntry, firstEntry + 300));