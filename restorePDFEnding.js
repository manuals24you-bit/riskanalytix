const fs = require('fs');

// Read current truncated file
let current = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/RiskReportPDF.tsx', 'utf8');
console.log('current length:', current.length);
console.log('ends with residual:', current.trimEnd().endsWith("        )}"));

// The file ends after the residual section
// We need to add:
// 1. Lifecycle table (was in the file before truncation)
// 2. Conclusions, method, disclaimer, footer
// 3. Closing tags

const ending = `
        <View style={S.lifecycleTable} wrap={false}>
          <Text style={S.sectionTitle}>{t.lifecycleTitle || 'ETAPY CYKLU \u017bYCIA MASZYNY (ISO 12100 \u00a75.4)'}</Text>
          <View style={S.lifecycleRowHeader}>
            <Text style={[S.lifecycleHeaderText, S.lifecycleColNo]}>#</Text>
            <Text style={[S.lifecycleHeaderText, S.lifecycleColStage]}>{t.lifecycleStage || 'Etap'}</Text>
            <Text style={[S.lifecycleHeaderText, S.lifecycleColDesc]}>{t.lifecycleDesc || 'Typowe zagro\u017cenia do rozwa\u017cenia'}</Text>
            <Text style={[S.lifecycleHeaderText, S.lifecycleColCheck]}>{t.lifecycleConsidered || 'Uwzgl.'}</Text>
          </View>
          {[
            { stage: t.lc1 || 'Transport i monta\u017c', desc: t.lc1d || 'Podnoszenie, przemieszczanie, poziomowanie, pod\u0142\u0105czenie medi\u00f3w' },
            { stage: t.lc2 || 'Instalacja i uruchomienie', desc: t.lc2d || 'Pierwsze uruchomienie, konfiguracja, testy bezpiecze\u0144stwa' },
            { stage: t.lc3 || 'Regulacja i nastawianie', desc: t.lc3d || 'Nastawianie parametr\u00f3w, zmiana narz\u0119dzi, zmiana formatu' },
            { stage: t.lc4 || 'Normalna praca', desc: t.lc4d || 'Obs\u0142uga, za\u0142adowanie / roz\u0142adowanie, nadzorowanie procesu' },
            { stage: t.lc5 || 'Czyszczenie i dezynfekcja', desc: t.lc5d || 'Czyszczenie cz\u0119\u015bci stykaj\u0105cych si\u0119 z produktem, mycie ci\u015bnieniowe' },
            { stage: t.lc6 || 'Usuwanie usterek i awarie', desc: t.lc6d || 'Diagnostyka, usuwanie zaci\u0119\u0107, dzia\u0142ania przy braku zasilania' },
            { stage: t.lc7 || 'Konserwacja i serwis', desc: t.lc7d || 'Wymiana cz\u0119\u015bci zu\u017cywalnych, smarowanie, przegl\u0105dy okresowe' },
            { stage: t.lc8 || 'Demonta\u017c i z\u0142omowanie', desc: t.lc8d || 'Roz\u0142\u0105czenie medi\u00f3w, demonta\u017c, transport z\u0142omu, utylizacja p\u0142yn\u00f3w' },
          ].map((row, i) => (
            <View key={i} style={i % 2 === 0 ? S.lifecycleRow : S.lifecycleRowAlt}>
              <Text style={S.lifecycleColNo}>{i + 1}</Text>
              <Text style={S.lifecycleColStage}>{row.stage}</Text>
              <Text style={S.lifecycleColDesc}>{row.desc}</Text>
              <Text style={S.lifecycleColCheck}>✓</Text>
            </View>
          ))}
        </View>

        <View style={{ marginTop: 14 }}>
          <Text style={S.sectionTitle}>{t.conclusions}</Text>
          {high.length > 0 && (
            <View style={[S.concBox, { backgroundColor: '#FEF2F2', borderTopWidth: 1, borderBottomWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderTopColor: '#FECACA', borderBottomColor: '#FECACA', borderLeftColor: '#FECACA', borderRightColor: '#FECACA' }]}>
              <Text style={[S.concTitle, { color: '#DC2626' }]}>{t.highConclusion.replace('{{n}}', String(high.length))}</Text>
              <Text style={[S.concText, { color: '#7F1D1D' }]}>{t.highConclusionText} {high.map(e => tr(e).element).join(', ')}.</Text>
            </View>
          )}
          {med.length > 0 && (
            <View style={[S.concBox, { backgroundColor: '#FFFBEB', borderTopWidth: 1, borderBottomWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderTopColor: '#FDE68A', borderBottomColor: '#FDE68A', borderLeftColor: '#FDE68A', borderRightColor: '#FDE68A' }]}>
              <Text style={[S.concTitle, { color: '#D97706' }]}>{t.medConclusion.replace('{{n}}', String(med.length))}</Text>
              <Text style={[S.concText, { color: '#78350F' }]}>{t.medConclusionText}</Text>
            </View>
          )}
          {low.length > 0 && (
            <View style={[S.concBox, { backgroundColor: '#F0FDF4', borderTopWidth: 1, borderBottomWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderTopColor: '#BBF7D0', borderBottomColor: '#BBF7D0', borderLeftColor: '#BBF7D0', borderRightColor: '#BBF7D0' }]}>
              <Text style={[S.concTitle, { color: '#16A34A' }]}>{t.lowConclusion.replace('{{n}}', String(low.length))}</Text>
              <Text style={[S.concText, { color: '#14532D' }]}>{t.lowConclusionText}</Text>
            </View>
          )}
          <View style={S.methodBox}>
            <Text style={S.methodTitle}>{t.method}</Text>
            {[t.method1, t.method2, t.method3].map((step, i) => (
              <View key={i} style={S.methodStep}>
                <Text style={S.methodNum}>{i + 1}.</Text>
                <Text style={S.methodText}>{step}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={S.disclaimer}>
          <Text style={S.disclaimerText}>{t.disclaimer}</Text>
        </View>

        <View style={S.footer} fixed>
          <Text style={S.footerText}>{pdfFooter}</Text>
          <Text style={S.footerText} render={({ pageNumber, totalPages }) => \`\${t.page} \${pageNumber} \${t.of} \${totalPages}\`} />
        </View>
      </Page>
    </Document>
  )
}
`;

current = current.trimEnd() + '\n' + ending;
fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/RiskReportPDF.tsx', current, 'utf8');
console.log('fixed, new length:', current.length);
console.log('Document:', current.includes('</Document>'));
console.log('Page closing:', current.includes('</Page>'));