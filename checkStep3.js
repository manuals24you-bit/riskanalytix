const fs = require('fs');
const c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', 'utf8');

const step3 = c.indexOf('STEP 3');
// Find severity column header
const sevIdx = c.indexOf('colSeverity', step3);
const colS = c.indexOf("'S'", step3);
const colP = c.indexOf("'P'", step3);
console.log('step3 at:', step3);
console.log('colS at:', colS);
console.log('colP at:', colP);

// Find the table header row
const tableHead = c.indexOf('<thead', step3);
console.log('thead at:', tableHead);
console.log('context:', JSON.stringify(c.slice(tableHead, tableHead + 400)));