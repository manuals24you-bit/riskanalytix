const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', 'utf8');

// Find riskMethod in EMPTY_FORM
const emptyFormIdx = c.indexOf('const EMPTY_FORM');
const riskMethodInForm = c.indexOf("riskMethod: 'SxP'", emptyFormIdx);
console.log('riskMethod in EMPTY_FORM at:', riskMethodInForm);
console.log('context:', JSON.stringify(c.slice(riskMethodInForm, riskMethodInForm + 80)));

// Find notes in api call
const notesInApi = c.indexOf('notes: san(form.notes)');
console.log('notes in api at:', notesInApi);
console.log('context:', JSON.stringify(c.slice(notesInApi - 20, notesInApi + 60)));