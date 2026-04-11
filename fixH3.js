const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', 'utf8');

// Fix broken h3 tag
c = c.replace(
  "<h3 style={{ color: '#F0EDE8', fontFamily: 'Georgia, serif', fontSize: '18px', marginBottom: '6px' }}>{</h3>",
  "<h3 style={{ color: '#F0EDE8', fontFamily: 'Georgia, serif', fontSize: '18px', marginBottom: '6px' }}>{t('analysis.subscriptionRequired')}</h3>"
);

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', c, 'utf8');
console.log('done:', c.includes("t('analysis.subscriptionRequired')}</h3>"));