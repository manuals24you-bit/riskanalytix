const fs = require('fs');
let lines = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/RiskReportPDF.tsx', 'utf8').split('\n');

// Find the misplaced closing tags (lines 469-473 approx)
// Look for the pattern: </Document> then ) then } that appear BEFORE lifecycleTable
let docCloseIdx = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].trim() === '</Document>' && i + 1 < lines.length && lines[i+1].trim() === ')' && lines[i+2].trim() === '}') {
    // Check if lifecycleTable comes AFTER this
    const afterLines = lines.slice(i+3).join('\n');
    if (afterLines.includes('lifecycleTable')) {
      docCloseIdx = i;
      console.log('found misplaced closing at line:', i+1);
      break;
    }
  }
}

if (docCloseIdx > -1) {
  // Remove the 3 lines: </Document>, ), }
  lines.splice(docCloseIdx, 3);
  console.log('removed misplaced closing tags');
}

const result = lines.join('\n');
fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/RiskReportPDF.tsx', result, 'utf8');
console.log('Document count:', (result.match(/<\/Document>/g)||[]).length);
console.log('lifecycleTable before Document:', result.indexOf('lifecycleTable') < result.lastIndexOf('</Document>'));