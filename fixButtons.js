const fs = require('fs');

// 1. Fix edit button in AnalysisDetailPage - remove it (no edit page exists yet)
let detail = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/AnalysisDetailPage.tsx', 'utf8');
// Remove the edit button we added
const editBtnStart = detail.indexOf('<button onClick={() => navigate(`/analysis/${id}/edit`)');
if (editBtnStart > -1) {
  const editBtnEnd = detail.indexOf('</button>', editBtnStart) + 9;
  detail = detail.slice(0, editBtnStart) + detail.slice(editBtnEnd);
  console.log('edit button removed');
}
fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/AnalysisDetailPage.tsx', detail, 'utf8');

// 2. Add back button (setStep(3)) to step 4 in NewAnalysisPage
let page = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', 'utf8');

// Find step 4 navigation buttons
const step4Idx = page.indexOf('STEP 4');
const setStep3Search = page.indexOf('setStep(3)', step4Idx);
if (setStep3Search > -1) {
  console.log('step4 already has back button');
} else {
  // Find the save button area in step 4
  const saveBtn = page.indexOf('saveAnalysis()', step4Idx);
  const saveBtnDiv = page.lastIndexOf('<div style={{ display:', saveBtn);
  console.log('saveBtn at:', saveBtn, 'div at:', saveBtnDiv);
  
  // Get the context
  console.log('context:', JSON.stringify(page.slice(saveBtnDiv, saveBtnDiv + 200)));
}