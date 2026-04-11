const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/RiskReportPDF.tsx', 'utf8');

// Fix residual risk table - replace entire section with better layout
const oldStart = c.indexOf("        {entries.filter(e => e.reductionLevel && e.reductionLevel !== 'none').length > 0 && (");
const oldEnd = c.indexOf("\n        {/* Lifecycle", oldStart);

if (oldStart === -1) { console.log('residual section not found'); process.exit(1); }
console.log('residual section found:', oldStart, 'to', oldEnd);

const newResidual = `        {entries.filter(e => e.reductionLevel && e.reductionLevel !== 'none').length > 0 && (
          <View style={{ marginBottom: 20 }} wrap={false}>
            <Text style={S.sectionTitle}>{t.residualRiskTitle || 'RYZYKO RESZTKOWE PO \u015aRODKACH OCHRONNYCH'}</Text>
            {entries.filter(e => e.reductionLevel && e.reductionLevel !== 'none').map((e, i) => {
              const translated = tr(e);
              const resS = e.residualS ?? e.severity;
              const resP = e.residualP ?? e.probability;
              const resR = e.residualR ?? (resS * resP);
              const resRisk = getRisk(resS, resP, t);
              const reductionLabel = e.reductionLevel === 'high' ? (t.reductionHigh || 'Wysoki (P-2)') : e.reductionLevel === 'medium' ? (t.reductionMedium || 'Sredni (P-1)') : (t.reductionLow || 'Niski');
              return (
                <View key={i} style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E5E7EB', paddingTop: 6, paddingBottom: 6, backgroundColor: i % 2 === 0 ? '#FFFFFF' : '#F9FAFB' }}>
                  <View style={{ flex: 2, paddingLeft: 6, paddingRight: 4 }}>
                    <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#1F2937' }}>{translated.element}</Text>
                    <Text style={{ fontSize: 7, color: '#6B7280', marginTop: 2 }}>{translated.action || e.action || ''}</Text>
                  </View>
                  <View style={{ width: 70, paddingLeft: 4, paddingRight: 4 }}>
                    <Text style={{ fontSize: 7.5, color: '#16A34A', fontWeight: 'bold' }}>{reductionLabel}</Text>
                  </View>
                  <Text style={{ width: 20, fontSize: 8, textAlign: 'center', color: '#374151' }}>{resS}</Text>
                  <Text style={{ width: 20, fontSize: 8, textAlign: 'center', color: '#16A34A', fontWeight: 'bold' }}>{resP}</Text>
                  <Text style={{ width: 20, fontSize: 9, textAlign: 'center', color: resRisk.color, fontWeight: 'bold' }}>{resR}</Text>
                  <View style={{ width: 55, paddingLeft: 4 }}>
                    <Text style={{ fontSize: 7, color: resRisk.color, fontWeight: 'bold' }}>{resRisk.label}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}
`;

c = c.slice(0, oldStart) + newResidual + c.slice(oldEnd);
fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/RiskReportPDF.tsx', c, 'utf8');
console.log('done');