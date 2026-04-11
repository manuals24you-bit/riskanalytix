const fs = require('fs');

// 1. Add to Prisma schema (RiskAnalysis model)
let schema = fs.readFileSync('C:/Projects/riskpro/backend/prisma/schema.prisma', 'utf8');

// Find RiskAnalysis model and add fields after 'notes'
const notesField = schema.indexOf('  notes         String?');
if (notesField > -1) {
  schema = schema.slice(0, notesField + '  notes         String?'.length) +
    '\n  intendedUse    String?\n  foreseenMisuse String?\n  spaceLimits    String?\n  timeLimits     String?\n  envLimits      String?' +
    schema.slice(notesField + '  notes         String?'.length);
  console.log('schema updated');
} else {
  console.log('notes field not found in schema');
  // Find alternative
  const idx = schema.indexOf('  analystName');
  console.log('analystName at:', idx, 'context:', schema.slice(idx, idx + 100));
}

fs.writeFileSync('C:/Projects/riskpro/backend/prisma/schema.prisma', schema, 'utf8');
console.log('intendedUse in schema:', schema.includes('intendedUse'));

// 2. Fix EMPTY_FORM in frontend
let page = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', 'utf8');

page = page.replace(
  "riskMethod: 'SxP',\r\n  serialNo:",
  "riskMethod: 'SxP',\r\n  intendedUse: '', foreseenMisuse: '', spaceLimits: '', timeLimits: '', envLimits: '',\r\n  serialNo:"
);

console.log('intendedUse in EMPTY_FORM:', page.includes("intendedUse: ''"));
fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', page, 'utf8');