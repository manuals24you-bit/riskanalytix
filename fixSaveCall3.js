const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', 'utf8');

const broken = `      const { data } =       // cleaned up\r\n        ...form,\r\n        language: localStorage.getItem('i18nextLng') || 'pl',\r\n        productionYear: form.productionYear ? parseInt(form.productionYear) : null,\r\n        analysisDate: form.analysisDate || null,\r\n        entries: entries.map((e, i) => ({\r\n          element: san(e.element), threat: san(e.threat), effect: san(e.effect),\r\n          severity: e.severity, probability: e.probability, riskScore: e.riskScore,\r\n          action: san(e.action), scenario: e.scenario || null, riskMethod: form.riskMethod || 'SxP',\n            plrS: e.plrS || null, plrF: e.plrF || null, plrP: e.plrP || null,\n            plrAuto: e.plrAuto || null, plrManual: e.plrManual || null,\n            plCategory: e.plCategory || null, plAchieved: e.plAchieved || null,\n            mttfd: e.mttfd || null, dcavg: e.dcavg || null,\n            reductionLevel: e.reductionLevel || null, residualS: e.residualS ?? null, residualP: e.residualP ?? null, residualR: e.residualR ?? null, sortOrder: e.sortOrder ?? i,\r\n        })),\r\n      })`;

const fixed = `      const payload = {
        ...form,
        language: localStorage.getItem('i18nextLng') || 'pl',
        productionYear: form.productionYear ? parseInt(form.productionYear) : null,
        analysisDate: form.analysisDate || null,
        entries: entries.map((e, i) => ({
          element: san(e.element), threat: san(e.threat), effect: san(e.effect),
          severity: e.severity, probability: e.probability, riskScore: e.riskScore,
          action: san(e.action), scenario: e.scenario || null, riskMethod: form.riskMethod || 'SxP',
          plrS: e.plrS || null, plrF: e.plrF || null, plrP: e.plrP || null,
          plrAuto: e.plrAuto || null, plrManual: e.plrManual || null,
          plCategory: e.plCategory || null, plAchieved: e.plAchieved || null,
          mttfd: e.mttfd || null, dcavg: e.dcavg || null,
          reductionLevel: e.reductionLevel || null, residualS: e.residualS ?? null, residualP: e.residualP ?? null, residualR: e.residualR ?? null, sortOrder: e.sortOrder ?? i,
        })),
      }
      const { data } = await (isEditMode
        ? api.put(\`/analyses/\${editId}\`, payload)
        : api.post('/analyses', payload))`;

if (c.includes(broken)) {
  c = c.replace(broken, fixed);
  console.log('fixed!');
} else {
  console.log('not found, trying without \\r...');
  const broken2 = broken.replace(/\r\n/g, '\n');
  if (c.includes(broken2)) {
    c = c.replace(broken2, fixed);
    console.log('fixed with LF!');
  } else {
    console.log('still not found');
  }
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', c, 'utf8');