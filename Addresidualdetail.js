const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/AnalysisDetailPage.tsx', 'utf8');

const marker = `        {/* Conclusions */}`;
const idx = c.indexOf(marker);
console.log('Conclusions marker at:', idx);
if (idx === -1) { process.exit(1); }

// Helper functions needed - check if riskColor etc exist
const hasRiskColor = c.includes('riskColor');
console.log('riskColor exists:', hasRiskColor);

const residualTable = `        {/* Residual Risk Table */}
        {entries.filter(e => e.reductionLevel && e.reductionLevel !== 'none').length > 0 && (
          <div style={{ background: '#111827', border: '1px solid rgba(232,168,56,.25)', borderRadius: '10px', overflow: 'hidden', marginBottom: '24px' }}>
            <div style={{ padding: '12px 18px', borderBottom: '1px solid #1e2d45', background: 'rgba(232,168,56,.06)' }}>
              <span style={{ fontSize: '10px', color: '#E8A838', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 600 }}>
                {t('analysis.residualRisk') || 'Ryzyko resztkowe po \u015brodkach ochronnych'}
              </span>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {[t('analysis.colElement'), t('analysis.colAction'), t('analysis.residualReduction') || 'Redukcja', 'S', "P'", "R'", t('analysis.tableLevelRisk')].map((h, i) => (
                    <th key={i} style={{ textAlign: 'left', fontSize: '9px', color: '#8a99b0', padding: '8px 10px', borderBottom: '1px solid #1e2d45', textTransform: 'uppercase', letterSpacing: '.06em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {entries
                  .filter(e => e.reductionLevel && e.reductionLevel !== 'none')
                  .sort((a, b) => (b.severity*b.probability) - (a.severity*a.probability))
                  .map((e, idx) => {
                    const resS = e.residualS ?? e.severity;
                    const resP = e.residualP ?? e.probability;
                    const resR = e.residualR ?? (resS * resP);
                    const resRisk = getRiskLevel(resS, resP);
                    const tr = getThreat(e);
                    const reductionLabel = e.reductionLevel === 'high' ? (t('analysis.reductionHigh') || 'Wysoki (P-2)') : e.reductionLevel === 'medium' ? (t('analysis.reductionMedium') || '\u015arednio (P-1)') : (t('analysis.reductionLow') || 'Niski');
                    return (
                      <tr key={e.id} style={{ borderBottom: '1px solid rgba(30,45,69,.4)', background: idx%2===0?'transparent':'rgba(255,255,255,.01)' }}>
                        <td style={{ padding: '10px', fontSize: '12px', fontWeight: 600, color: '#F0EDE8', maxWidth: '130px' }}>{tr.element}</td>
                        <td style={{ padding: '10px', fontSize: '11px', color: '#8a99b0', maxWidth: '160px' }}>{tr.action}</td>
                        <td style={{ padding: '10px', fontSize: '10px', color: '#34C77B', whiteSpace: 'nowrap' }}>{reductionLabel}</td>
                        <td style={{ padding: '10px', fontFamily: 'monospace', fontSize: '13px', fontWeight: 700, textAlign: 'center', color: '#F0EDE8' }}>{resS}</td>
                        <td style={{ padding: '10px', fontFamily: 'monospace', fontSize: '13px', fontWeight: 700, textAlign: 'center', color: '#34C77B' }}>{resP}</td>
                        <td style={{ padding: '10px', fontFamily: 'monospace', fontSize: '14px', fontWeight: 700, textAlign: 'center', color: riskColor(resRisk.cls) }}>{resR}</td>
                        <td style={{ padding: '10px' }}>
                          <span style={{ background: riskBg(resRisk.cls), color: riskColor(resRisk.cls), border: \`1px solid \${riskColor(resRisk.cls)}44\`, padding: '3px 8px', borderRadius: '4px', fontSize: '10px', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                            {riskLabel(resRisk.cls)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
`;

c = c.slice(0, idx) + residualTable + c.slice(idx);
fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/AnalysisDetailPage.tsx', c, 'utf8');
console.log('done:', c.includes('residualRisk'));