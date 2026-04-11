const fs = require('fs');

// 1. Add to AnalysisDetailPage - after clientAddress field
let detail = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/AnalysisDetailPage.tsx', 'utf8');

const afterClientAddr = "value: analysis.clientAddress },\n           ";
const insertAfter = detail.indexOf(afterClientAddr) + afterClientAddr.length;
console.log('insert after clientAddress at:', insertAfter);

const boundaryBlock = `
              ].filter(r => r.value).map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '11px', color: '#4a5a72', minWidth: '120px', flexShrink: 0 }}>{label}</span>
                  <span style={{ fontSize: '11px', color: '#F0EDE8' }}>{value}</span>
                </div>
              ))}
            </div>`;

// Actually let's find the end of the info grid and add boundary section after it
const infoGridEnd = detail.indexOf('</div>', detail.indexOf('clientAddress')) ;
console.log('infoGrid end area at:', infoGridEnd);

// Find the closing of the info section - look for the Threats table comment
const threatsComment = detail.indexOf('{/* Threats table */}');
const boundaryInsertPos = detail.lastIndexOf('</div>', threatsComment);
console.log('boundary insert at:', boundaryInsertPos);

const boundarySection = `
        {/* Machine Boundaries */}
        {(analysis.intendedUse || analysis.foreseenMisuse || analysis.spaceLimits || analysis.timeLimits || analysis.envLimits) && (
          <div style={{ background: '#111827', border: '1px solid #1e2d45', borderRadius: '10px', padding: '20px', marginBottom: '24px' }}>
            <div style={{ fontSize: '10px', color: '#E8A838', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '16px', fontWeight: 600 }}>
              5.3 Granice maszyny i przewidywane u\u017cycie (ISO 12100 \u00a75.3)
            </div>
            {[
              { label: 'Przewidywane u\u017cycie', value: analysis.intendedUse },
              { label: 'Rozs\u0105dnie przewidywalne nadu\u017cycie', value: analysis.foreseenMisuse },
              { label: 'Granice przestrzenne', value: analysis.spaceLimits },
              { label: 'Granice czasowe / fazy cyklu \u017cycia', value: analysis.timeLimits },
              { label: 'Ograniczenia \u015brodowiskowe', value: analysis.envLimits },
            ].filter(r => r.value).map(({ label, value }) => (
              <div key={label} style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '10px', color: '#8a99b0', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '4px' }}>{label}</div>
                <div style={{ fontSize: '12px', color: '#F0EDE8', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{value}</div>
              </div>
            ))}
          </div>
        )}
`;

detail = detail.slice(0, boundaryInsertPos + 6) + boundarySection + detail.slice(boundaryInsertPos + 6);
fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/AnalysisDetailPage.tsx', detail, 'utf8');
console.log('AnalysisDetailPage updated:', detail.includes('intendedUse'));

// 2. Add to RiskReportPDF - after the info grid on page 1, before the matrix
let pdf = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/RiskReportPDF.tsx', 'utf8');

// Find where page 2 starts (STRONA 2)
const page2marker = '{/* \u2500\u2500 STRONA 2';
const page2idx = pdf.indexOf(page2marker);
console.log('page2 at:', page2idx);

// Insert boundary section just before page 2
const boundaryPDFSection = `
        {/* Machine Boundaries Section */}
        {(analysis.intendedUse || analysis.foreseenMisuse || analysis.spaceLimits) && (
          <View style={{ marginBottom: 12 }}>
            <Text style={S.sectionTitle}>5.3 GRANICE MASZYNY I PRZEWIDYWANE U\u017bYCIE (ISO 12100 \u00a75.3)</Text>
            {[
              { label: 'Przewidywane u\u017cycie', value: analysis.intendedUse },
              { label: 'Rozs\u0105dnie przewidywalne nadu\u017cycie', value: analysis.foreseenMisuse },
              { label: 'Granice przestrzenne', value: analysis.spaceLimits },
              { label: 'Granice czasowe / fazy cyklu \u017cycia', value: analysis.timeLimits },
              { label: 'Ograniczenia \u015brodowiskowe i inne', value: analysis.envLimits },
            ].filter(r => r.value).map((r, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <Text style={{ fontSize: 7, fontWeight: 'bold', color: '#374151', marginBottom: 2 }}>{r.label}</Text>
                <Text style={{ fontSize: 7.5, color: '#4B5563', lineHeight: 1.6 }}>{r.value}</Text>
              </View>
            ))}
          </View>
        )}
`;

pdf = pdf.slice(0, page2idx) + boundaryPDFSection + pdf.slice(page2idx);
fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/RiskReportPDF.tsx', pdf, 'utf8');
console.log('RiskReportPDF updated:', pdf.includes('GRANICE MASZYNY'));

// 3. Add sample data to SamplePDFButtons
let sample = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/SamplePDFButtons.tsx', 'utf8');

const sampleMachineName = "machineName: 'Tokarka CNC TOK-600'";
const sampleIdx = sample.indexOf(sampleMachineName);
const sampleLineEnd = sample.indexOf('\n', sampleIdx);

const sampleBoundaries = `,\n  intendedUse: 'Tokarka CNC TOK-600 przeznaczona jest do obr\u00f3bki skrawaniem metali (stal, aluminium, stopy miedzi, \u017celiwo) w warunkach warsztatowych.\\nMaks. \u015brednicy detalu: \u00d8 600 mm \u2022 Maks. d\u0142ugo\u015b\u0107 detalu: 2000 mm \u2022 Materia\u0142y: metale ferromagnetyczne i nieferromagnetyczne \u2022 Tryby pracy: AUTO, JOG/MDI, tryb serwisowy z blokad\u0105 pr\u0119dko\u015bci',\n  foreseenMisuse: 'Obr\u00f3bka materia\u0142\u00f3w \u0142atwopalnych (Mg, Ti) bez ch\u0142odziwa wodnego \u2022 Praca bez os\u0142ony kabinowej lub z otwart\u0105 os\u0142on\u0105 \u2022 U\u017cywanie niewywarzonych uchwyt\u00f3w/narz\u0119dzi \u2022 Praca w trybie serwisowym przy pr\u0119dko\u015bci > 2 m/min',\n  spaceLimits: 'Przestrze\u0144 robocza: 2500 \u00d7 1800 \u00d7 2200 mm \u2022 Zasi\u0119g operatora: max 800 mm od osi wrzeciona \u2022 Strefa niebezpieczna: 500 mm wok\u00f3\u0142 uchwytu',\n  timeLimits: 'Transport i instalacja \u2022 Uruchomienie i rozruch pr\u00f3bny \u2022 Eksploatacja normalna (przewidywana \u017cywotno\u015b\u0107: 15 lat) \u2022 Konserwacja i serwis (wymiana narz\u0119dzi, oleju, czyszczenie) \u2022 Demonta\u017c / z\u0142omowanie',\n  envLimits: 'Temperatura otoczenia: +5\u00b0C \u2026 +40\u00b0C \u2022 Wilgotno\u015b\u0107: max 80% (bez kondensacji) \u2022 Zasilanie: 400 V / 3-faz / 50 Hz \u00b110%'`;

sample = sample.slice(0, sampleLineEnd) + sampleBoundaries + sample.slice(sampleLineEnd);
fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/SamplePDFButtons.tsx', sample, 'utf8');
console.log('SamplePDFButtons updated:', sample.includes('intendedUse'));