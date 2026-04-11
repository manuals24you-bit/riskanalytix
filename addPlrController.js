const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/backend/src/controllers/analysis.controller.ts', 'utf8');

c = c.split('riskMethod:  e.riskMethod  || null,').join(
  'riskMethod:  e.riskMethod  || null,\n            plrS:        e.plrS        || null,\n            plrF:        e.plrF        || null,\n            plrP:        e.plrP        || null,\n            plrAuto:     e.plrAuto     || null,\n            plrManual:   e.plrManual   || null,\n            plCategory:  e.plCategory  || null,\n            plAchieved:  e.plAchieved  || null,\n            mttfd:       e.mttfd       || null,\n            dcavg:       e.dcavg       || null,'
);

fs.writeFileSync('C:/Projects/riskpro/backend/src/controllers/analysis.controller.ts', c, 'utf8');
console.log('plrS:', c.includes('plrS'));
console.log('count riskMethod:', c.split('riskMethod:').length - 1);