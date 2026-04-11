const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/types/index.ts', 'utf8');

// Remove duplicate riskMethod - keep only one
const firstRM = c.indexOf('riskMethod?:');
const secondRM = c.indexOf('riskMethod?:', firstRM + 1);
if (secondRM > -1) {
  const lineStart = c.lastIndexOf('\n', secondRM);
  const lineEnd = c.indexOf('\n', secondRM);
  c = c.slice(0, lineStart) + c.slice(lineEnd);
  console.log('removed duplicate riskMethod');
}

// Add missing PLr fields after plrManual
if (!c.includes('plCategory?:')) {
  c = c.replace(
    '  plrManual?:      string',
    '  plrManual?:      string\n  plCategory?:     string\n  plAchieved?:     string\n  mttfd?:          string\n  dcavg?:          string'
  );
  console.log('added plCategory/plAchieved/mttfd/dcavg');
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/types/index.ts', c, 'utf8');
console.log('riskMethod count:', c.split('riskMethod?:').length - 1);
console.log('plCategory:', c.includes('plCategory?:'));