const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', 'utf8');

// 1. Add fields to AnalysisForm interface
c = c.replace(
  '  notes: string; clientName: string;',
  '  intendedUse: string\n  foreseenMisuse: string\n  spaceLimits: string\n  timeLimits: string\n  envLimits: string\n  notes: string; clientName: string;'
);

// 2. Add fields to EMPTY_FORM
c = c.replace(
  "riskMethod: 'SxP',\n  serialNo:",
  "riskMethod: 'SxP',\n  intendedUse: '', foreseenMisuse: '', spaceLimits: '', timeLimits: '', envLimits: '',\n  serialNo:"
);

// 3. Add fields to API call (entries map is different - this is form level)
// Find the analysis save call and add machine boundary fields
c = c.replace(
  "notes: san(form.notes),",
  "notes: san(form.notes),\n        intendedUse: san(form.intendedUse),\n        foreseenMisuse: san(form.foreseenMisuse),\n        spaceLimits: san(form.spaceLimits),\n        timeLimits: san(form.timeLimits),\n        envLimits: san(form.envLimits),"
);

console.log('intendedUse in interface:', c.includes('intendedUse: string'));
console.log('intendedUse in form:', c.includes("intendedUse: '',"));
console.log('intendedUse in api:', c.includes('intendedUse: san('));

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', c, 'utf8');