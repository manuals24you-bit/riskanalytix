const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/RiskReportPDF.tsx', 'utf8');

const lifecycleMarker = '\n        <View style={S.lifecycleTable} wrap={false}>';
const idx = c.indexOf(lifecycleMarker);
console.log('lifecycle at:', idx);

const plrSection = `
        {/* PLr / ISO 13849-1 Section */}
        {entries.some(e => e.severity > 0) && (
          <View style={{ marginBottom: 16 }} wrap={false}>
            <Text style={S.sectionTitle}>WYMAGANE POZIOMY PLr \u2014 ISO 13849-1:2023</Text>
            <View style={{ borderTopWidth: 1, borderTopColor: '#E5E7EB', marginBottom: 4 }}>
              <View style={{ flexDirection: 'row', backgroundColor: '#1F2937', paddingTop: 5, paddingBottom: 5 }}>
                <Text style={[S.tableHeaderCell, { flex: 3 }]}>Element / Zagro\u017cenie</Text>
                <Text style={[S.tableHeaderCell, { width: 22, textAlign: 'center' }]}>S</Text>
                <Text style={[S.tableHeaderCell, { width: 22, textAlign: 'center' }]}>F</Text>
                <Text style={[S.tableHeaderCell, { width: 22, textAlign: 'center' }]}>P</Text>
                <Text style={[S.tableHeaderCell, { width: 40, textAlign: 'center' }]}>PLr (auto)</Text>
                <Text style={[S.tableHeaderCell, { width: 40, textAlign: 'center' }]}>PLr (kor.)</Text>
                <Text style={[S.tableHeaderCell, { width: 40, textAlign: 'center' }]}>PL osi\u0105gn.</Text>
                <Text style={[S.tableHeaderCell, { width: 35, textAlign: 'center' }]}>Kat.</Text>
              </View>
              {entries.map((e, i) => {
                const translated = tr(e);
                const sParam = e.severity >= 3 ? 'S2' : 'S1';
                const fParam = e.probability >= 3 ? 'F2' : 'F1';
                const pParam = e.plrP || 'P2';
                const plrMap: Record<string, string> = {
                  'S1-F1-P1': 'a', 'S1-F1-P2': 'b', 'S1-F2-P1': 'b', 'S1-F2-P2': 'c',
                  'S2-F1-P1': 'c', 'S2-F1-P2': 'd', 'S2-F2-P1': 'd', 'S2-F2-P2': 'e',
                };
                const plrAuto = e.plrAuto || plrMap[\`\${sParam}-\${fParam}-\${pParam}\`] || 'b';
                const plrColor = (pl: string) => pl === 'e' ? '#DC2626' : pl === 'd' ? '#D97706' : pl === 'c' ? '#D97706' : '#16A34A';
                const catSug: Record<string, string> = { 'a': 'B/1', 'b': '1/2', 'c': '2/3', 'd': '3', 'e': '4' };
                return (
                  <View key={i} style={[S.tableRow, i % 2 === 1 ? S.tableRowAlt : {}]}>
                    <Text style={[S.tableCell, { flex: 3 }]}>{translated.element}</Text>
                    <Text style={[S.tableCell, { width: 22, textAlign: 'center' }]}>{sParam}</Text>
                    <Text style={[S.tableCell, { width: 22, textAlign: 'center' }]}>{fParam}</Text>
                    <Text style={[S.tableCell, { width: 22, textAlign: 'center' }]}>{pParam}</Text>
                    <Text style={[S.tableCell, { width: 40, textAlign: 'center', color: plrColor(plrAuto), fontWeight: 'bold' }]}>PL {plrAuto.toUpperCase()}</Text>
                    <Text style={[S.tableCell, { width: 40, textAlign: 'center', color: e.plrManual ? '#1D4ED8' : '#9CA3AF' }]}>{e.plrManual ? \`PL \${e.plrManual.toUpperCase()}\` : '\u2014'}</Text>
                    <Text style={[S.tableCell, { width: 40, textAlign: 'center', color: e.plAchieved ? '#16A34A' : '#9CA3AF' }]}>{e.plAchieved ? \`PL \${e.plAchieved.toUpperCase()}\` : '\u2014'}</Text>
                    <Text style={[S.tableCell, { width: 35, textAlign: 'center' }]}>{e.plCategory || catSug[plrAuto]}</Text>
                  </View>
                );
              })}
            </View>
            <Text style={{ fontSize: 6.5, color: '#9CA3AF', marginTop: 3, lineHeight: 1.5 }}>
              PLr obliczony z Tab.K.1 ISO 13849-1:2023 przy P=P2 (konserwatywnie). Ostateczna weryfikacja parametru P (mo\u017cliwo\u015b\u0107 unikni\u0119cia) oraz dob\u00f3r kategorii i parametr\u00f3w (MTTFd, DC) nale\u017cy do producenta lub certyfikowanego specjalisty ds. bezpiecze\u0144stwa funkcjonalnego.
            </Text>
          </View>
        )}
`;

c = c.slice(0, idx) + plrSection + c.slice(idx);
fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/RiskReportPDF.tsx', c, 'utf8');
console.log('PLr section added to report PDF');
console.log('Document closing:', c.includes('</Document>'));