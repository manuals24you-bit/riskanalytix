const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', 'utf8');

c = c.replace(
  "riskMethod: form.riskMethod || 'SxP', reductionLevel:",
  "riskMethod: form.riskMethod || 'SxP',\n            plrS: e.plrS || null, plrF: e.plrF || null, plrP: e.plrP || null,\n            plrAuto: e.plrAuto || null, plrManual: e.plrManual || null,\n            plCategory: e.plCategory || null, plAchieved: e.plAchieved || null,\n            mttfd: e.mttfd || null, dcavg: e.dcavg || null,\n            reductionLevel:"
);

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', c, 'utf8');
console.log('plrS in api:', c.includes('plrS: e.plrS'));