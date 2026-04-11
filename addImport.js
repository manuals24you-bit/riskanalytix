const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', 'utf8');

const oldImport = "import { translateRiskEntry, getMachineTranslation } from '../../i18n/machinesI18n'";
const newImport = "import { translateRiskEntry, getMachineTranslation } from '../../i18n/machinesI18n'\nimport { SampleRiskReportButton, SampleCEButton } from './SamplePDFButtons'";

if (c.includes(oldImport)) {
  c = c.replace(oldImport, newImport);
  fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', c, 'utf8');
  console.log('import added:', c.includes('SamplePDFButtons'));
} else {
  console.log('old import not found, showing actual import lines:');
  c.split('\n').filter(l => l.includes('i18n')).forEach(l => console.log(JSON.stringify(l)));
}