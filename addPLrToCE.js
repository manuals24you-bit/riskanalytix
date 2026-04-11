const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/CEDeclarationPDF.tsx', 'utf8');

const marker = "\n        {/* O\u015bwiadczenie */}\n        <View style={S.declarationBox}>";
const idx = c.indexOf(marker);
console.log('marker at:', idx);

const plrSection = `
        {/* PLr / ISO 13849-1 */}
        {(analysis.riskEntries || analysis.entries || []).some((e: any) => e.plrAuto || e.plrManual) && (
          <View style={{ marginBottom: 10 }} wrap={false}>
            <Text style={{ fontSize: 7, fontWeight: 'bold', color: '#374151', marginBottom: 5 }}>
              {t.cePlrTitle || 'WYMAGANE POZIOMY ZAPEWNIENIA BEZPIECZE\u0143STWA (PLr) \u2014 ISO 13849-1'}
            </Text>
            <View style={{ borderTopWidth: 1, borderTopColor: '#E5E7EB' }}>
              <View style={{ flexDirection: 'row', backgroundColor: '#F3F4F6', paddingTop: 4, paddingBottom: 4, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' }}>
                <Text style={{ flex: 3, fontSize: 6, fontWeight: 'bold', color: '#6B7280', paddingLeft: 4 }}>{t.colElement || 'Element / Zagro\u017cenie'}</Text>
                <Text style={{ width: 20, fontSize: 6, fontWeight: 'bold', color: '#6B7280', textAlign: 'center' }}>S</Text>
                <Text style={{ width: 20, fontSize: 6, fontWeight: 'bold', color: '#6B7280', textAlign: 'center' }}>F</Text>
                <Text style={{ width: 20, fontSize: 6, fontWeight: 'bold', color: '#6B7280', textAlign: 'center' }}>P</Text>
                <Text style={{ width: 35, fontSize: 6, fontWeight: 'bold', color: '#6B7280', textAlign: 'center' }}>PLr (auto)</Text>
                <Text style={{ width: 35, fontSize: 6, fontWeight: 'bold', color: '#6B7280', textAlign: 'center' }}>PLr (korekt.)</Text>
                <Text style={{ width: 35, fontSize: 6, fontWeight: 'bold', color: '#6B7280', textAlign: 'center' }}>PL osi\u0105gni\u0119ty</Text>
                <Text style={{ width: 35, fontSize: 6, fontWeight: 'bold', color: '#6B7280', textAlign: 'center' }}>Kategoria</Text>
              </View>
              {(analysis.riskEntries || analysis.entries || []).map((e: any, i: number) => {
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
                  <View key={i} style={{ flexDirection: 'row', paddingTop: 3, paddingBottom: 3, borderBottomWidth: 1, borderBottomColor: '#F3F4F6', backgroundColor: i % 2 === 0 ? '#FFFFFF' : '#F9FAFB' }}>
                    <Text style={{ flex: 3, fontSize: 6.5, color: '#1F2937', paddingLeft: 4 }}>{e.element}</Text>
                    <Text style={{ width: 20, fontSize: 6.5, color: '#6B7280', textAlign: 'center' }}>{sParam}</Text>
                    <Text style={{ width: 20, fontSize: 6.5, color: '#6B7280', textAlign: 'center' }}>{fParam}</Text>
                    <Text style={{ width: 20, fontSize: 6.5, color: '#6B7280', textAlign: 'center' }}>{pParam}</Text>
                    <Text style={{ width: 35, fontSize: 7, fontWeight: 'bold', color: plrColor(plrAuto), textAlign: 'center' }}>PL {plrAuto.toUpperCase()}</Text>
                    <Text style={{ width: 35, fontSize: 7, color: e.plrManual ? '#1D4ED8' : '#9CA3AF', textAlign: 'center' }}>{e.plrManual ? \`PL \${e.plrManual.toUpperCase()}\` : '—'}</Text>
                    <Text style={{ width: 35, fontSize: 7, color: e.plAchieved ? '#16A34A' : '#9CA3AF', textAlign: 'center' }}>{e.plAchieved ? \`PL \${e.plAchieved.toUpperCase()}\` : '—'}</Text>
                    <Text style={{ width: 35, fontSize: 6.5, color: '#374151', textAlign: 'center' }}>{e.plCategory || catSug[plrAuto]}</Text>
                  </View>
                );
              })}
            </View>
            <Text style={{ fontSize: 6, color: '#9CA3AF', marginTop: 4 }}>
              {t.cePlrDisclaimer || 'PLr obliczony z Tab.K.1 ISO 13849-1:2023. P=P2 (domy\u015blny, konserwatywny). Ostateczna weryfikacja PLr nale\u017cy do producenta maszyny.'}
            </Text>
          </View>
        )}
`;

c = c.slice(0, idx) + plrSection + c.slice(idx);
fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/CEDeclarationPDF.tsx', c, 'utf8');
console.log('PLr section added to CE:', c.includes('cePlrTitle'));