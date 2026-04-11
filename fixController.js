const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/backend/src/controllers/analysis.controller.ts', 'utf8');

// Step 1: Remove all existing residual/reduction field lines (including backtick-n variants)
// Split by lines, filter out bad ones, rejoin
const lines = c.split('\n');
const cleaned = lines.filter(line => {
  const t = line.trim();
  if (t.startsWith('reductionLevel:') && t.includes('e.reductionLevel')) return false;
  if (t.startsWith('residualS:') && t.includes('e.residualS')) return false;
  if (t.startsWith('residualP:') && t.includes('e.residualP')) return false;
  if (t.startsWith('residualR:') && t.includes('e.residualR')) return false;
  // Remove lines with backtick-n literal residual fields
  if (line.includes('`n') && line.includes('reductionLevel')) return false;
  if (line.includes('`n') && line.includes('residualS')) return false;
  return true;
});

c = cleaned.join('\n');
console.log('After cleanup, reductionLevel count:', c.split('reductionLevel').length - 1);

// Step 2: Add cleanly after scenario field
c = c.split('scenario:    e.scenario    || null,').join(
  'scenario:    e.scenario    || null,\n            reductionLevel: e.reductionLevel || null,\n            residualS:     e.residualS     ?? null,\n            residualP:     e.residualP     ?? null,\n            residualR:     e.residualR     ?? null,'
);

fs.writeFileSync('C:/Projects/riskpro/backend/src/controllers/analysis.controller.ts', c);
console.log('Final reductionLevel count:', c.split('reductionLevel').length - 1);
console.log('residualS present:', c.includes('residualS:     e.residualS'));