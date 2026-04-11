const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/types/index.ts', 'utf8');

const lines = c.split('\n');
// Remove line 74 (index 73)
lines.splice(73, 1);
c = lines.join('\n');

fs.writeFileSync('C:/Projects/riskpro/frontend/src/types/index.ts', c, 'utf8');
console.log('riskMethod count:', c.split('riskMethod?:').length - 1);