const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', 'utf8');

c = c.replace(
  "machineName: '', machineCategory: '', machineTypeId: '',",
  "machineName: '', machineCategory: '', machineTypeId: '', riskMethod: 'SxP',"
);

// Also add riskMethod to the API call entries
c = c.replace(
  'scenario: e.scenario || null, reductionLevel:',
  'scenario: e.scenario || null, riskMethod: form.riskMethod || \'SxP\', reductionLevel:'
);

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', c, 'utf8');
console.log('riskMethod in form:', c.includes("riskMethod: 'SxP'"));
console.log('riskMethod in api:', c.includes('riskMethod: form.riskMethod'));