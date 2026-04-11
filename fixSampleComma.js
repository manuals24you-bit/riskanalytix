const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/SamplePDFButtons.tsx', 'utf8');

// Remove the extra comma+newline between machineName and intendedUse
const bad = "machineName: 'Tokarka CNC TOK-600',\n,\n    intendedUse:";
const good = "machineName: 'Tokarka CNC TOK-600',\n    intendedUse:";

if (c.includes(bad)) {
  c = c.replace(bad, good);
  console.log('fixed comma issue');
} else {
  // Try CRLF version
  const badCRLF = "machineName: 'Tokarka CNC TOK-600',\r\n,\r\n    intendedUse:";
  if (c.includes(badCRLF)) {
    c = c.replace(badCRLF, "machineName: 'Tokarka CNC TOK-600',\r\n    intendedUse:");
    console.log('fixed CRLF comma issue');
  } else {
    // Find manually
    const idx = c.indexOf("machineName: 'Tokarka CNC TOK-600'");
    const after = c.slice(idx, idx + 100);
    console.log('context:', JSON.stringify(after));
  }
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/SamplePDFButtons.tsx', c, 'utf8');