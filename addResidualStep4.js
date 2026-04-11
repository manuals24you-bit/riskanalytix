const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', 'utf8');

// Find the conclusions section in step 4
const step4Idx = c.indexOf('STEP 4');
const conclusionsIdx = c.indexOf("t('analysis.conclusionsTitle')", step4Idx);

// Find the start of the conclusions div
const conclusionsDivIdx = c.lastIndexOf('<div style={{', conclusionsIdx);
console.log('conclusionsDiv at:', conclusionsDivIdx);

const residualTable = `{entries.filter(e => e.reductionLevel && e.reductionLevel !== 'none').length > 0 && (
              <div style={{ background: '#111827', border: '1px solid rgba(232,168,56,.25)', borderRadius: '10px', overflow: 'hidden', marginBottom: '20px' }}>
                <div style={{ padding: '10px 16px', borderBottom: '1px solid #1e2d45', background: 'rgba(232,168,56,.06)' }}>
                  <span style={{ fontSize: '10px', color: '#E8A838', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 600 }}>
                    {t('analysis.residualRisk') || 'Ryzyko resztkowe po \u015brodkach ochronnych'}
                  </span>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      {[t('analysis.colElement'), t('analysis.colAction'), t('analysis.residualReduction') || 'Redukcja', 'S', "P'", "R'", t('analysis.colLevel')].map((h, i) => (
                        <th key={i} style={{ textAlign: 'left', fontSize: '9px', color: '#8a99b0', padding: '8px 10px', borderBottom: '1px solid #1e2d45', textTransform: 'uppercase', letterSpacing: '.06em' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {entries.filter(e => e.reductionLevel && e.reductionLevel !== 'none').sort((a, b) => (b.severity*b.probability)-(a.severity*a.probability)).map((e, idx) => {
                      const resS = e.residualS ?? e.severity;
                      const resP = e.residualP ?? e.probability;
                      const resR = e.residualR ?? (resS * resP);
                      const resRisk = getRiskLevel(resS, resP);
                      const lang2 = (localStorage.getItem('i18nextLng') || 'pl') as any;
                      const reductionLabel = e.reductionLevel === 'high' ? (t('analysis.reductionHigh') || 'Wysoki') : e.reductionLevel === 'medium' ? (t('analysis.reductionMedium') || '\u015arednio') : (t('analysis.reductionLow') || 'Niski');
                      return (
                        <tr key={e.id} style={{ borderBottom: '1px solid rgba(30,45,69,.4)', background: idx%2===0?'transparent':'rgba(255,255,255,.01)' }}>
                          <td style={{ padding: '8px 10px', fontSize: '12px', fontWeight: 600, color: '#F0EDE8', maxWidth: '130px' }}>{translateRiskEntry(e, lang2).element}</td>
                          <td style={{ padding: '8px 10px', fontSize: '11px', color: '#8a99b0', maxWidth: '160px' }}>{e.action}</td>
                          <td style={{ padding: '8px 10px', fontSize: '10px', color: '#34C77B', whiteSpace: 'nowrap' }}>{reductionLabel}</td>
                          <td style={{ padding: '8px 10px', fontFamily: 'monospace', fontWeight: 700, textAlign: 'center', color: '#F0EDE8' }}>{resS}</td>
                          <td style={{ padding: '8px 10px', fontFamily: 'monospace', fontWeight: 700, textAlign: 'center', color: '#34C77B' }}>{resP}</td>
                          <td style={{ padding: '8px 10px', fontFamily: 'monospace', fontWeight: 700, textAlign: 'center', color: riskColor(resRisk.cls) }}>{resR}</td>
                          <td style={{ padding: '8px 10px' }}>
                            <span style={{ background: riskBg(resRisk.cls), color: riskColor(resRisk.cls), border: \`1px solid \${riskColor(resRisk.cls)}44\`, padding: '2px 7px', borderRadius: '3px', fontSize: '10px', fontFamily: 'monospace' }}>{riskLabel(resRisk.cls)}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
            `;

c = c.slice(0, conclusionsDivIdx) + residualTable + c.slice(conclusionsDivIdx);
fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', c, 'utf8');
console.log('done:', c.includes("entries.filter(e => e.reductionLevel"));