const fs = require('fs');
let lines = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/RiskReportPDF.tsx', 'utf8').split('\n');

console.log('total lines:', lines.length);

// Lines 373-394 (index 372-393) are orphaned residual code
// Check what they contain
console.log('line 372:', JSON.stringify(lines[371])); // </View>
console.log('line 373:', JSON.stringify(lines[372])); // orphaned code
console.log('line 394:', JSON.stringify(lines[393])); // )}\n
console.log('line 395:', JSON.stringify(lines[394])); // empty

// Remove lines 373-394 (indices 372-393)
lines.splice(372, 22);

console.log('after removal, total lines:', lines.length);
console.log('new line 373:', JSON.stringify(lines[372]));

const result = lines.join('\n');
fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/RiskReportPDF.tsx', result, 'utf8');
console.log('done');
console.log('lifecycle count:', result.split('lifecycleTable').length - 1);
console.log('conclusions count:', result.split('t.conclusions').length - 1);