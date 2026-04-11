const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/RiskReportPDF.tsx', 'utf8');

// Add lifecycle styles to StyleSheet
const oldStyles = `  disclaimer: {`;
const newStyles = `  lifecycleTable: { marginTop: 14, marginBottom: 8 },
  lifecycleRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#F3F4F6', paddingTop: 5, paddingBottom: 5, paddingLeft: 6, paddingRight: 6 },
  lifecycleRowAlt: { backgroundColor: '#F9FAFB' },
  lifecycleRowHeader: { flexDirection: 'row', backgroundColor: '#1F2937', paddingTop: 5, paddingBottom: 5, paddingLeft: 6, paddingRight: 6, borderRadius: 2 },
  lifecycleColNo: { width: 20, fontSize: 7.5, color: '#374151' },
  lifecycleColStage: { width: 110, fontSize: 7.5, color: '#374151', fontWeight: 'bold' },
  lifecycleColDesc: { flex: 1, fontSize: 7, color: '#6B7280' },
  lifecycleColCheck: { width: 60, fontSize: 7.5, color: '#374151', textAlign: 'center' },
  lifecycleHeaderText: { fontSize: 7, color: '#F9FAFB', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 0.5 },
  disclaimer: {`;

c = c.replace(oldStyles, newStyles);

// Add lifecycle stages section before disclaimer
const oldDisclaimer = `        <View style={S.disclaimer}>`;
const newSection = `        <View style={S.lifecycleTable} wrap={false}>
          <Text style={S.sectionTitle}>{t.lifecycleTitle || 'ETAPY CYKLU ŻYCIA MASZYNY (ISO 12100 §5.4)'}</Text>
          <View style={S.lifecycleRowHeader}>
            <Text style={[S.lifecycleHeaderText, S.lifecycleColNo]}>#</Text>
            <Text style={[S.lifecycleHeaderText, S.lifecycleColStage]}>{t.lifecycleStage || 'Etap'}</Text>
            <Text style={[S.lifecycleHeaderText, S.lifecycleColDesc]}>{t.lifecycleDesc || 'Typowe zagro\u017cenia do rozwa\u017cenia'}</Text>
            <Text style={[S.lifecycleHeaderText, S.lifecycleColCheck]}>{t.lifecycleConsidered || 'Uwzgl\u0119dnione'}</Text>
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
            <View key={i} style={[S.lifecycleRow, i % 2 === 1 ? S.lifecycleRowAlt : {}]}>
              <Text style={S.lifecycleColNo}>{i + 1}</Text>
              <Text style={S.lifecycleColStage}>{row.stage}</Text>
              <Text style={S.lifecycleColDesc}>{row.desc}</Text>
              <Text style={[S.lifecycleColCheck, { color: '#16A34A', fontWeight: 'bold' }]}>\u2713</Text>
            </View>
          ))}
        </View>

        `;

c = c.replace(oldDisclaimer, newSection + oldDisclaimer);
fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/RiskReportPDF.tsx', c, 'utf8');
console.log('done:', c.includes('lifecycleTable'));