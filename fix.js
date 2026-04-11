const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/i18n/machinesI18n.ts', 'utf8');
c = c.split("d'ing").join("d\u2019ing");
c = c.split("d'Am").join("d\u2019Am");
c = c.split("l'Am").join("l\u2019Am");
fs.writeFileSync('C:/Projects/riskpro/frontend/src/i18n/machinesI18n.ts', c, 'utf8');
console.log('done');
