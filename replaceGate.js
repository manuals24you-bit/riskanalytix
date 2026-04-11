const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', 'utf8');

// Find the subscription gate div and replace its content
const idx = c.indexOf("t('analysis.subscriptionRequired')}</h3>");
if (idx === -1) { console.log('not found'); process.exit(1); }

// Find the surrounding box - look for the button after it
const btnIdx = c.indexOf("t('analysis.subscribeCta')}</button>", idx);
if (btnIdx === -1) { console.log('button not found'); process.exit(1); }

const btnEnd = btnIdx + "t('analysis.subscribeCta')}</button>".length;

const oldContent = c.slice(idx + "t('analysis.subscriptionRequired')}</h3>".length, btnEnd);
console.log('found content length:', oldContent.length);

const newContent = `</h3>
                    <p style={{ color: '#8a99b0', fontSize: '12px', marginBottom: '16px' }}>{t('analysis.subscriptionDesc')}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                      <div style={{ background: '#0B0F1A', borderRadius: '8px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ textAlign: 'left' }}>
                          <div style={{ color: '#F0EDE8', fontSize: '12px', fontWeight: 600 }}>Przykładowy Raport PDF</div>
                          <div style={{ color: '#8a99b0', fontSize: '10px' }}>Tokarka CNC \u00b7 13 zagro\u017ce\u0144</div>
                        </div>
                        <SampleRiskReportButton lang={localStorage.getItem('i18nextLng') || 'pl'} />
                      </div>
                      <div style={{ background: '#0B0F1A', borderRadius: '8px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ textAlign: 'left' }}>
                          <div style={{ color: '#F0EDE8', fontSize: '12px', fontWeight: 600 }}>Przyk\u0142adowa Deklaracja CE</div>
                          <div style={{ color: '#8a99b0', fontSize: '10px' }}>Tokarka CNC \u00b7 gotowa do podpisu</div>
                        </div>
                        <SampleCEButton lang={localStorage.getItem('i18nextLng') || 'pl'} />
                      </div>
                    </div>
                    <button onClick={() => window.location.href = '/#cennik'} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: 'none', background: '#E8A838', color: '#0B0F1A', cursor: 'pointer', fontSize: '12px', fontWeight: 700 }}>{t('analysis.subscribeCta')}</button>`;

c = c.slice(0, idx) + newContent + c.slice(btnEnd);
fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', c, 'utf8');
console.log('done:', c.includes('SampleRiskReportButton'));