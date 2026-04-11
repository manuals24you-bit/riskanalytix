const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', 'utf8');

// Add import for SamplePDFButtons
c = c.replace(
  "import { translateRiskEntry, getMachineTranslation } from '../../i18n/machinesI18n'",
  "import { translateRiskEntry, getMachineTranslation } from '../../i18n/machinesI18n'\nimport { SampleRiskReportButton, SampleCEButton } from './SamplePDFButtons'"
);

// Replace the subscription gate content
const oldGate = `                <div style={{ background: '#111827', border: '1px solid #E8A838', borderRadius: '12px', padding: '24px', textAlign: 'center', maxWidth: '340px' }}>
                    <div style={{ fontSize: '28px', marginBottom: '8px' }}>đź"'</div>
                    <h3 style={{ color: '#F0EDE8', fontFamily: 'Georgia, serif', fontSize: '18px', marginBottom: '6px' }}>{t('analysis.subscriptionRequired')}</h3>
                    <p style={{ color: '#8a99b0', fontSize: '12px', marginBottom: '16px' }}>{t('analysis.subscriptionDesc')}</p>
                    <button style={{ width: '100%', padding: '10px', borderRadius: '6px', border: 'none', background: '#E8A838', color: '#0B0F1A', cursor: 'pointer', fontSize: '12px', fontWeight: 700 }}>{t('analysis.subscribeCta')}</button>
                  </div>`;

const newGate = `                <div style={{ background: '#111827', border: '1px solid #E8A838', borderRadius: '12px', padding: '24px', textAlign: 'center', maxWidth: '420px' }}>
                    <div style={{ fontSize: '28px', marginBottom: '8px' }}>🔒</div>
                    <h3 style={{ color: '#F0EDE8', fontFamily: 'Georgia, serif', fontSize: '18px', marginBottom: '6px' }}>{t('analysis.subscriptionRequired')}</h3>
                    <p style={{ color: '#8a99b0', fontSize: '12px', marginBottom: '16px' }}>{t('analysis.subscriptionDesc')}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                      <div style={{ background: '#0B0F1A', borderRadius: '8px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ textAlign: 'left' }}>
                          <div style={{ color: '#F0EDE8', fontSize: '12px', fontWeight: 600 }}>Przykładowy Raport PDF</div>
                          <div style={{ color: '#8a99b0', fontSize: '10px' }}>Tokarka CNC · 13 zagrożeń</div>
                        </div>
                        <SampleRiskReportButton lang={localStorage.getItem('i18nextLng') || 'pl'} />
                      </div>
                      <div style={{ background: '#0B0F1A', borderRadius: '8px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ textAlign: 'left' }}>
                          <div style={{ color: '#F0EDE8', fontSize: '12px', fontWeight: 600 }}>Przykładowa Deklaracja CE</div>
                          <div style={{ color: '#8a99b0', fontSize: '10px' }}>Tokarka CNC · gotowa do podpisu</div>
                        </div>
                        <SampleCEButton lang={localStorage.getItem('i18nextLng') || 'pl'} />
                      </div>
                    </div>
                    <button onClick={() => window.location.href = '/#cennik'} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: 'none', background: '#E8A838', color: '#0B0F1A', cursor: 'pointer', fontSize: '12px', fontWeight: 700 }}>{t('analysis.subscribeCta')}</button>
                  </div>`;

c = c.replace(oldGate, newGate);
fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', c, 'utf8');
console.log('done:', c.includes('SampleRiskReportButton'));