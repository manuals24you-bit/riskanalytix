const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', 'utf8');

// 1. Replace table header to show F and A columns when SxFxPxA method
const oldHeader = `{[t('analysis.colElement'), t('analysis.colThreat'), t('analysis.colEffect'), 'S', 'P', 'R', t('analysis.colLevel'), t('analysis.colAction'), t('analysis.scenario') || 'Scenariusz', ''].map((h, i) => (`;
const newHeader = `{(form.riskMethod === 'SxFxPxA'
                        ? [t('analysis.colElement'), t('analysis.colThreat'), t('analysis.colEffect'), 'S', 'F', 'P', 'A', 'R', t('analysis.colLevel'), t('analysis.colAction'), t('analysis.scenario') || 'Scenariusz', '']
                        : [t('analysis.colElement'), t('analysis.colThreat'), t('analysis.colEffect'), 'S', 'P', 'R', t('analysis.colLevel'), t('analysis.colAction'), t('analysis.scenario') || 'Scenariusz', '']
                      ).map((h, i) => (`;

if (c.includes(oldHeader)) {
  c = c.replace(oldHeader, newHeader);
  console.log('header replaced');
} else {
  console.log('header NOT FOUND');
}

// 2. Find severity/probability inputs in table row and add F and A inputs
// Find the S input cell
const sInputMarker = `<td style={{ padding: '4px 6px', width: '44px' }}>
                          <select value={e.severity}`;
const sInputMarker2 = `width: '44px' }}>
                          <select value={e.severity}`;

// Let's find the S and P cells
const step3 = c.indexOf('STEP 3');
const sevIdx = c.indexOf('value={e.severity}', step3);
const probIdx = c.indexOf('value={e.probability}', step3);
console.log('severity input at:', sevIdx);
console.log('probability input at:', probIdx);

// Find the end of P input cell (after </td>)
const probCellEnd = c.indexOf('</td>', probIdx) + 5;
console.log('prob cell ends at:', probCellEnd);
console.log('context after prob:', JSON.stringify(c.slice(probCellEnd, probCellEnd + 100)));

// Insert F and A cells after P cell, only shown when SxFxPxA
const faInputs = `
                          {form.riskMethod === 'SxFxPxA' && (
                            <>
                              <td style={{ padding: '4px 6px', width: '44px' }}>
                                <select value={e.frequency ?? 2} onChange={ev => setEntries(p => p.map(x => x.id === e.id ? { ...x, frequency: Number(ev.target.value), riskScore: x.severity * Number(ev.target.value) * x.probability * (x.avoidance ?? 2) } : x))}
                                  style={{ width: '100%', background: '#0B0F1A', border: '1px solid #1e2d45', borderRadius: '4px', color: '#F0EDE8', padding: '4px', fontSize: '12px' }}>
                                  {[1,2,3,4].map(v => <option key={v} value={v}>{v}</option>)}
                                </select>
                              </td>
                              <td style={{ padding: '4px 6px', width: '44px' }}>
                                <select value={e.avoidance ?? 2} onChange={ev => setEntries(p => p.map(x => x.id === e.id ? { ...x, avoidance: Number(ev.target.value), riskScore: x.severity * (x.frequency ?? 2) * x.probability * Number(ev.target.value) } : x))}
                                  style={{ width: '100%', background: '#0B0F1A', border: '1px solid #1e2d45', borderRadius: '4px', color: '#F0EDE8', padding: '4px', fontSize: '12px' }}>
                                  {[1,2,3].map(v => <option key={v} value={v}>{v}</option>)}
                                </select>
                              </td>
                            </>
                          )}`;

c = c.slice(0, probCellEnd) + faInputs + c.slice(probCellEnd);
console.log('FA inputs added');

// 3. Update riskScore calculation for SxP rows to still work
// When SxFxPxA, riskScore = S*F*P*A, need to update severity onChange and probability onChange too
// Find severity onChange
const sevOnChange = c.indexOf('severity: Number(ev.target.value)', step3);
if (sevOnChange > -1) {
  // Find the riskScore update in this onChange
  const rsInSev = c.indexOf('riskScore:', sevOnChange);
  const rsEndSev = c.indexOf('}', rsInSev);
  const oldRsSev = c.slice(rsInSev, rsEndSev + 1);
  console.log('old riskScore in severity:', oldRsSev);
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', c, 'utf8');
console.log('done');