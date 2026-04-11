const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', 'utf8');

// Find the api.post call and check what's in entries.map
const apiIdx = c.indexOf('api.post');
const entriesMapIdx = c.indexOf('entries.map', apiIdx);
const mapEnd = c.indexOf('})),', entriesMapIdx) + 4;
console.log('entries.map section:');
console.log(c.slice(entriesMapIdx, mapEnd));