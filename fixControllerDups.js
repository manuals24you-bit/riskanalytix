const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/backend/src/controllers/analysis.controller.ts', 'utf8');

// The duplicate pattern: after dcavg there's another plrS block
// Remove: ",\n            plrS: ... dcavg: ... || null," when it appears after already having these fields

const dupBlock = ',\n            plrS:        e.plrS        || null,\n            plrF:        e.plrF        || null,\n            plrP:        e.plrP        || null,\n            plrAuto:     e.plrAuto     || null,\n            plrManual:   e.plrManual   || null,\n            plCategory:  e.plCategory  || null,\n            plAchieved:  e.plAchieved  || null,\n            mttfd:       e.mttfd       || null,\n            dcavg:       e.dcavg       || null,\n            plrS:        e.plrS        || null,\n            plrF:        e.plrF        || null,\n            plrP:        e.plrP        || null,\n            plrAuto:     e.plrAuto     || null,\n            plrManual:   e.plrManual   || null,\n            plCategory:  e.plCategory  || null,\n            plAchieved:  e.plAchieved  || null,\n            mttfd:       e.mttfd       || null,\n            dcavg:       e.dcavg       || null,';

const cleanBlock = ',\n            plrS:        e.plrS        || null,\n            plrF:        e.plrF        || null,\n            plrP:        e.plrP        || null,\n            plrAuto:     e.plrAuto     || null,\n            plrManual:   e.plrManual   || null,\n            plCategory:  e.plCategory  || null,\n            plAchieved:  e.plAchieved  || null,\n            mttfd:       e.mttfd       || null,\n            dcavg:       e.dcavg       || null,';

while (c.includes(dupBlock)) {
  c = c.replace(dupBlock, cleanBlock);
  console.log('removed one duplicate block');
}

// Also fix the wider-spaced version
const dupBlock2 = ',\n            plrS:        e.plrS        || null,\n            plrF:        e.plrF        || null,\n            plrP:        e.plrP        || null,\n            plrAuto:     e.plrAuto     || null,\n            plrManual:   e.plrManual   || null,\n            plCategory:  e.plCategory  || null,\n            plAchieved:  e.plAchieved  || null,\n            mttfd:       e.mttfd       || null,\n            dcavg:       e.dcavg       || null,\n  ';

fs.writeFileSync('C:/Projects/riskpro/backend/src/controllers/analysis.controller.ts', c, 'utf8');
console.log('plrS count:', c.split('plrS:').length - 1);
console.log('riskMethod count:', c.split('riskMethod:').length - 1);