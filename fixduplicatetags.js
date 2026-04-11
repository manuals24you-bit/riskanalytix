const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/RiskReportPDF.tsx', 'utf8');

console.log('Before - Document:', c.split('</Document>').length-1, 'Page:', c.split('</Page>').length-1);

// Find the second </Document> and remove everything from there to end, then re-add proper closing
const firstDoc = c.indexOf('</Document>');
const secondDoc = c.indexOf('</Document>', firstDoc + 1);

if (secondDoc > -1) {
  // Keep everything up to first </Document>
  c = c.slice(0, firstDoc + '</Document>'.length);
  // Add closing
  c = c + '\n  )\n}\n';
  console.log('removed second Document');
}

// Now check Page count - should be 2
console.log('After fix - Document:', c.split('</Document>').length-1, 'Page:', c.split('</Page>').length-1);

// If still 3+ pages, find the extra ones
const pageCount = c.split('</Page>').length - 1;
if (pageCount > 2) {
  // Find the 3rd </Page> and remove everything from there to </Document>
  let idx = 0;
  let count = 0;
  while (count < 2) {
    idx = c.indexOf('</Page>', idx) + 1;
    count++;
  }
  const thirdPage = c.indexOf('</Page>', idx);
  if (thirdPage > -1) {
    console.log('Found extra page at:', thirdPage);
    // Remove from thirdPage to </Document>
    const docEnd = c.indexOf('</Document>');
    c = c.slice(0, thirdPage) + '\n    </Document>\n  )\n}\n';
    console.log('removed extra pages');
  }
}

console.log('Final - Document:', c.split('</Document>').length-1, 'Page:', c.split('</Page>').length-1);

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/RiskReportPDF.tsx', c, 'utf8');