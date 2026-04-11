const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/AnalysisDetailPage.tsx', 'utf8');

const start = c.indexOf("t('analysis.editAnalysis')");
if (start > -1) {
  const btnStart = c.lastIndexOf('<button', start);
  const btnEnd = c.indexOf('</button>', start) + 9;
  c = c.slice(0, btnStart) + c.slice(btnEnd);
  console.log('removed');
} else {
  console.log('not found');
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/AnalysisDetailPage.tsx', c, 'utf8');
console.log('editAnalysis remains:', c.includes('editAnalysis'));