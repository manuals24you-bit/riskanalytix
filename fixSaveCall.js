const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', 'utf8');

// Find and fix the broken save call
const broken = "const { data } =       // cleaned up\n        ...form,";
const idx = c.indexOf(broken);
console.log('broken at:', idx);

if (idx > -1) {
  // Find where this broken section ends - look for the closing of the api call
  const sectionEnd = c.indexOf("navigate('/analysis/", idx);
  const brokenSection = c.slice(idx, sectionEnd);
  console.log('broken section:', brokenSection.slice(0, 200));
  
  // Extract the body (everything after "...form,")
  const bodyStart = idx + broken.length;
  const body = c.slice(bodyStart, sectionEnd);
  
  // Rebuild the save call
  const fixedSave = `const { data } = await (isEditMode\n        ? api.put(\`/analyses/\${editId}\`, {\n        ...form,${body})\n        : api.post('/analyses', {\n        ...form,${body}))\n      `;
  
  c = c.slice(0, idx) + fixedSave + c.slice(sectionEnd);
  console.log('fixed');
} else {
  // Try alternative approach - find the api call differently
  const apiCallIdx = c.indexOf("await (isEditMode ? api.put");
  if (apiCallIdx > -1) {
    console.log('already has ternary at:', apiCallIdx);
  }
  
  // Find "const { data } = " before the form spread
  const dataIdx = c.indexOf("const { data } =");
  console.log('data= at:', dataIdx, JSON.stringify(c.slice(dataIdx, dataIdx + 100)));
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', c, 'utf8');