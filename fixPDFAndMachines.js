const fs = require('fs');

// 1. Fix duplicate effect in machines.ts
let machines = fs.readFileSync('C:/Projects/riskpro/frontend/src/data/machines.ts', 'utf8');
// Find the duplicate
const dupIdx = machines.indexOf("effect: 'Uderzenie suwnicy w konstrukcj");
if (dupIdx > -1) {
  const lineStart = machines.lastIndexOf('\n', dupIdx);
  const lineEnd = machines.indexOf('\n', dupIdx);
  const line = machines.slice(lineStart, lineEnd);
  console.log('line with dup:', line.slice(0, 150));
  
  // Fix: remove second effect key
  const fixed = line.replace(/, effect: 'Uszkodzenie maszyny, urazy'/, '');
  machines = machines.slice(0, lineStart) + fixed + machines.slice(lineEnd);
  fs.writeFileSync('C:/Projects/riskpro/frontend/src/data/machines.ts', machines, 'utf8');
  console.log('machines.ts fixed');
}

// 2. Fix truncated RiskReportPDF - need to check what's missing after residual section
let pdf = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/RiskReportPDF.tsx', 'utf8');

// Check if lifecycle and closing tags are present
console.log('lifecycleTable:', pdf.includes('lifecycleTable'));
console.log('</Page>:', pdf.includes('</Page>'));
console.log('</Document>:', pdf.includes('</Document>'));
console.log('export default:', pdf.includes('export default'));

// The file ends after residual section - need to check where lifecycle section starts
const lifecycleIdx = pdf.indexOf('<View style={S.lifecycleTable}');
console.log('lifecycle View at:', lifecycleIdx);
console.log('pdf length:', pdf.length);