const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/RiskReportPDF.tsx', 'utf8');

// Find the return statement
const justIdx = c.indexOf('justificationS || e.justificationP');
const retIdx = c.lastIndexOf('return (', justIdx);

// Find where <View key={e.id} starts
const viewStart = c.indexOf('<View key={e.id}', retIdx);

// Insert <> before the View
c = c.slice(0, viewStart) + '<>\n              ' + c.slice(viewStart);

// Find the closing of justification block (</View>\n              )}
// After the justification row there should be: </View>\n              )\n
const justEndIdx = c.indexOf('</View>\n              )\n', justIdx);
console.log('justEnd at:', justEndIdx, JSON.stringify(c.slice(justEndIdx, justEndIdx + 40)));

// Insert </> before the closing )
c = c.slice(0, justEndIdx + 8) + '\n              </>' + c.slice(justEndIdx + 8);

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/RiskReportPDF.tsx', c, 'utf8');
console.log('done');