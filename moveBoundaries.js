const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/RiskReportPDF.tsx', 'utf8');

// Extract the boundaries section
const sectionStart = c.lastIndexOf('\n        {', c.indexOf('GRANICE MASZYNY'));
const sectionEnd = c.indexOf('\n        )}', c.indexOf('GRANICE MASZYNY')) + 11;
const boundariesSection = c.slice(sectionStart, sectionEnd);
console.log('section length:', boundariesSection.length);
console.log('section start:', JSON.stringify(boundariesSection.slice(0, 50)));

// Remove from page 1
c = c.slice(0, sectionStart) + c.slice(sectionEnd);
console.log('removed from page 1');

// Find insertion point on page 2 - after sectionTitle for threats table
const page2 = c.indexOf('STRONA 2');
const threatTableTitle = c.indexOf('t.threatTable', page2);
const afterThreatTitle = c.indexOf('\n', threatTableTitle) + 1;
console.log('insert after threat title at:', afterThreatTitle);
console.log('context:', JSON.stringify(c.slice(afterThreatTitle - 20, afterThreatTitle + 80)));

// Insert boundaries section after threat table title
c = c.slice(0, afterThreatTitle) + boundariesSection + '\n' + c.slice(afterThreatTitle);

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/RiskReportPDF.tsx', c, 'utf8');
console.log('done, GRANICE at:', c.indexOf('GRANICE MASZYNY'), 'page2 at:', c.indexOf('STRONA 2'));