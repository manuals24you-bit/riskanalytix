const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', 'utf8');

// Check if form has riskMethod
console.log('form riskMethod:', c.includes('riskMethod'));

// Find the navigation div in step 1
const marker = "\r\n            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>\r\n              <button onClick={() => setStep(2)} disabled={!form.machineCategory}";
const idx = c.indexOf(marker);
console.log('marker at:', idx);

if (idx === -1) { process.exit(1); }

// Check subscription for PRO gate
const methodSelector = `
            {form.machineTypeId && (
              <div style={{ marginBottom: '28px' }}>
                <div style={{ fontSize: '11px', color: '#8a99b0', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '14px' }}>
                  {t('analysis.riskMethodLabel') || 'Metoda oceny ryzyka'}
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => upd('riskMethod', 'SxP')}
                    style={{
                      flex: 1, padding: '16px', borderRadius: '8px',
                      border: \`2px solid \${(!form.riskMethod || form.riskMethod === 'SxP') ? '#E8A838' : '#1e2d45'}\`,
                      background: (!form.riskMethod || form.riskMethod === 'SxP') ? 'rgba(232,168,56,.1)' : '#111827',
                      color: (!form.riskMethod || form.riskMethod === 'SxP') ? '#E8A838' : '#8a99b0',
                      cursor: 'pointer', textAlign: 'left',
                    }}
                  >
                    <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '4px' }}>S \u00d7 P</div>
                    <div style={{ fontSize: '11px', lineHeight: 1.5 }}>
                      {t('analysis.riskMethodSxPDesc') || 'Severity \u00d7 Probability \u2014 metoda podstawowa wg ISO 12100'}
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      if (user?.subscription === 'PRO' || user?.role === 'ADMIN') {
                        upd('riskMethod', 'SxFxPxA');
                      }
                    }}
                    style={{
                      flex: 1, padding: '16px', borderRadius: '8px',
                      border: \`2px solid \${form.riskMethod === 'SxFxPxA' ? '#34C77B' : '#1e2d45'}\`,
                      background: form.riskMethod === 'SxFxPxA' ? 'rgba(52,199,123,.1)' : '#111827',
                      color: form.riskMethod === 'SxFxPxA' ? '#34C77B' : (user?.subscription === 'PRO' || user?.role === 'ADMIN') ? '#8a99b0' : '#4a5a72',
                      cursor: (user?.subscription === 'PRO' || user?.role === 'ADMIN') ? 'pointer' : 'not-allowed',
                      textAlign: 'left', position: 'relative',
                    }}
                  >
                    <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '4px' }}>
                      S \u00d7 F \u00d7 P \u00d7 A
                      {!(user?.subscription === 'PRO' || user?.role === 'ADMIN') && (
                        <span style={{ marginLeft: '8px', fontSize: '10px', background: '#E8A838', color: '#0B0F1A', padding: '1px 6px', borderRadius: '3px', fontWeight: 700 }}>PRO</span>
                      )}
                    </div>
                    <div style={{ fontSize: '11px', lineHeight: 1.5 }}>
                      {t('analysis.riskMethodSxFxPxADesc') || 'Severity \u00d7 Frequency \u00d7 Probability \u00d7 Avoidability \u2014 metoda rozszerzona'}
                    </div>
                  </button>
                </div>
              </div>
            )}
`;

c = c.slice(0, idx) + methodSelector + c.slice(idx);
fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', c, 'utf8');
console.log('done:', c.includes('riskMethodLabel'));