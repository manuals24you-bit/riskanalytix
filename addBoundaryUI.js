const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', 'utf8');

const marker = "\r\n            <div style={{ display: 'flex', justifyContent: 'space-between' }}>\r\n              <button onClick={() => setStep(1)}";
const idx = c.indexOf(marker);
console.log('nav marker at:', idx);

const boundarySection = `
            {/* GRANICE MASZYNY */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ fontSize: '13px', color: '#E8A838', fontWeight: 600, marginBottom: '4px', fontFamily: 'Georgia, serif' }}>
                5.3 Granice maszyny i przewidywane u\u017cycie
              </div>
              <div style={{ fontSize: '11px', color: '#4a5a72', marginBottom: '16px', lineHeight: 1.6 }}>
                Wg ISO 12100 \u00a75.3 \u2014 okre\u015bl granice przestrzenne, czasowe i u\u017cytkowe maszyny.
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { key: 'intendedUse', label: 'Przewidywane u\u017cycie', placeholder: 'Opisz przeznaczenie maszyny, obrabiane materia\u0142y, tryby pracy, operatorów...', rows: 4 },
                  { key: 'foreseenMisuse', label: 'Rozs\u0105dnie przewidywalne nadu\u017cycie', placeholder: 'Opisz potencjalne b\u0142\u0119dne zastosowania, kt\u00f3re nale\u017cy uwzgl\u0119dni\u0107...', rows: 3 },
                  { key: 'spaceLimits', label: 'Granice przestrzenne', placeholder: 'Maks. wymiary detali, zasi\u0119g operator\u00f3w, strefa robocza...', rows: 3 },
                  { key: 'timeLimits', label: 'Granice czasowe (fazy cyklu \u017cycia)', placeholder: 'Transport, instalacja, uruchomienie, eksploatacja, serwis, demonta\u017c...', rows: 3 },
                  { key: 'envLimits', label: 'Ograniczenia \u015brodowiskowe i inne', placeholder: 'Temperatura, wilgotno\u015b\u0107, zasilanie, ha\u0142as, wibracje...', rows: 2 },
                ].map(({ key, label, placeholder, rows }) => (
                  <div key={key}>
                    <div style={{ fontSize: '11px', color: '#8a99b0', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: '6px' }}>{label}</div>
                    <textarea
                      value={(form as any)[key] || ''}
                      onChange={e => upd(key as any, e.target.value)}
                      placeholder={placeholder}
                      rows={rows}
                      style={{
                        width: '100%', background: '#0B0F1A', border: '1px solid #1e2d45',
                        borderRadius: '6px', color: '#F0EDE8', padding: '10px 14px',
                        fontSize: '12px', fontFamily: 'Lato, sans-serif', lineHeight: 1.6,
                        resize: 'vertical', boxSizing: 'border-box',
                        outline: 'none',
                      }}
                      onFocus={e => e.target.style.borderColor = '#E8A838'}
                      onBlur={e => e.target.style.borderColor = '#1e2d45'}
                    />
                  </div>
                ))}
              </div>
            </div>
`;

c = c.slice(0, idx) + boundarySection + c.slice(idx);
fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', c, 'utf8');
console.log('boundary section added:', c.includes('Granice maszyny'));