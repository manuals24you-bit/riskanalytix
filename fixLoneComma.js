const fs = require('fs');
let lines = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/SamplePDFButtons.tsx', 'utf8').split('\n');

// Find and remove the lone comma line (line that is just "," or ",\r")
let removed = 0;
const fixed = lines.filter((line, i) => {
  const trimmed = line.trim();
  if (trimmed === ',' && i > 180 && i < 195) {
    console.log(`Removing line ${i+1}: ${JSON.stringify(line)}`);
    removed++;
    return false;
  }
  return true;
});

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/SamplePDFButtons.tsx', fixed.join('\n'), 'utf8');
console.log('Removed:', removed, 'lines');