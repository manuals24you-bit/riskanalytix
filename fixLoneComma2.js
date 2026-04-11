const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/SamplePDFButtons.tsx', 'utf8');

// Find the problematic area and show it
const machineIdx = c.indexOf("machineName: 'Tokarka CNC TOK-600'");
const envIdx = c.indexOf("envLimits:");
console.log('between machineName and envLimits:');
console.log(JSON.stringify(c.slice(machineIdx, envIdx + 100)));

// The issue: after machineName there's ",\r\n," - fix it
// Replace all variations of the double comma/newline pattern
const patterns = [
  ["machineName: 'Tokarka CNC TOK-600',\r\n,\r\n    intendedUse:", "machineName: 'Tokarka CNC TOK-600',\r\n    intendedUse:"],
  ["machineName: 'Tokarka CNC TOK-600',\n,\n    intendedUse:", "machineName: 'Tokarka CNC TOK-600',\n    intendedUse:"],
  ["machineName: 'Tokarka CNC TOK-600',\r\n,\n    intendedUse:", "machineName: 'Tokarka CNC TOK-600',\n    intendedUse:"],
];

let fixed = false;
for (const [bad, good] of patterns) {
  if (c.includes(bad)) {
    c = c.replace(bad, good);
    console.log('Fixed pattern!');
    fixed = true;
    break;
  }
}

if (!fixed) {
  // Nuclear option - replace character by character in the problem area
  const start = machineIdx + "machineName: 'Tokarka CNC TOK-600'".length;
  const end = c.indexOf('intendedUse:', start);
  console.log('Problem area bytes:', [...c.slice(start, end)].map(ch => ch.charCodeAt(0)));
  // Replace problem area with clean ", "
  c = c.slice(0, start) + ',\n    ' + c.slice(end);
  console.log('Nuclear fix applied');
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/SamplePDFButtons.tsx', c, 'utf8');