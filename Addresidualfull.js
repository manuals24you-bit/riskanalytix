const fs = require('fs');

// 1. Add residual risk table to PDF before lifecycle table
let pdf = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/RiskReportPDF.tsx', 'utf8');

const lifecycleMarker = '\n        <View style={S.lifecycleTable} wrap={false}>';
const idx = pdf.indexOf(lifecycleMarker);
console.log('lifecycle at:', idx);

const residualSection = `
        {entries.filter(e => e.reductionLevel && e.reductionLevel !== 'none').length > 0 && (
          <View style={{ marginBottom: 16 }} wrap={false}>
            <Text style={S.sectionTitle}>{t.residualRiskTitle || 'RYZYKO RESZTKOWE PO \u015aRODKACH OCHRONNYCH'}</Text>
            <View style={S.table}>
              <View style={S.tableRowHeader}>
                <Text style={[S.tableHeaderCell, S.colElement]}>{t.colElement || 'Element'}</Text>
                <Text style={[S.tableHeaderCell, S.colAction]}>{t.colAction || 'Dzia\u0142anie'}</Text>
                <Text style={[S.tableHeaderCell, { width: 55 }]}>{t.residualReduction || 'Redukcja'}</Text>
                <Text style={[S.tableHeaderCell, S.colS]}>S</Text>
                <Text style={[S.tableHeaderCell, S.colP]}>P'</Text>
                <Text style={[S.tableHeaderCell, S.colR]}>R'</Text>
                <Text style={[S.tableHeaderCell, S.colLevel]}>{t.colLevel || 'Poziom'}</Text>
              </View>
              {entries.filter(e => e.reductionLevel && e.reductionLevel !== 'none').map((e, i) => {
                const translated = tr(e);
                const resS = e.residualS ?? e.severity;
                const resP = e.residualP ?? e.probability;
                const resR = e.residualR ?? (resS * resP);
                const resRisk = getRiskLevel(resS, resP);
                const reductionLabel = e.reductionLevel === 'high' ? (t.reductionHigh || 'Wysoki') : e.reductionLevel === 'medium' ? (t.reductionMedium || '\u015arednio') : (t.reductionLow || 'Niski');
                return (
                  <View key={i} style={[S.tableRow, i % 2 === 0 ? S.tableRowEven : {}]}>
                    <Text style={[S.tableCell, S.colElement]}>{translated.element}</Text>
                    <Text style={[S.tableCell, S.colAction, { color: '#6B7280' }]}>{translated.action || e.action || ''}</Text>
                    <Text style={[S.tableCell, { width: 55, color: '#16a34a', fontSize: 7 }]}>{reductionLabel}</Text>
                    <Text style={[S.tableCell, S.colS]}>{resS}</Text>
                    <Text style={[S.tableCell, S.colP, { color: '#16a34a', fontWeight: 'bold' }]}>{resP}</Text>
                    <Text style={[S.tableCell, S.colR, { color: resRisk.color, fontWeight: 'bold', fontFamily: 'monospace' }]}>{resR}</Text>
                    <Text style={[S.tableCell, S.colLevel]}>
                      <Text style={{ color: resRisk.color }}>{resRisk.label.toUpperCase()}</Text>
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}
`;

pdf = pdf.slice(0, idx) + residualSection + pdf.slice(idx);
fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/RiskReportPDF.tsx', pdf, 'utf8');
console.log('PDF residual table added:', pdf.includes('residualRiskTitle'));

// 2. Add instructions under residual risk header in UI
let page = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', 'utf8');

const oldDesc = "t('analysis.residualRisk') || 'Ryzyko resztkowe po \u015brodkach ochronnych'}\r\n                </div>";
const newDesc = "t('analysis.residualRisk') || 'Ryzyko resztkowe po \u015brodkach ochronnych'}\r\n                </div>\r\n                <div style={{ padding: '8px 16px 12px', borderBottom: '1px solid #1e2d45', fontSize: '11px', color: '#6B7280', lineHeight: 1.6 }}>\r\n                  {t('analysis.residualRiskDesc') || 'Wska\u017c skuteczno\u015b\u0107 zastosowanego \u015brodka ochronnego dla ka\u017cdego zagro\u017cenia. \u2022 Wysoki (P\u22122): blokady elektr., kurtyny PL\u00a0d/e, ryglowanie. \u2022 \u015arednio (P\u22121): os\u0142ony sta\u0142e, barierki, STO. \u2022 Niski: oznakowanie, szkolenia, \u015aOI. Ci\u0119\u017cko\u015b\u0107 (S) nie zmienia si\u0119.'}\r\n                </div>";

if (page.includes(oldDesc)) {
  page = page.replace(oldDesc, newDesc);
  console.log('UI instructions added');
} else {
  console.log('UI header not found, trying fallback...');
  const fallback = "t('analysis.residualRisk')";
  const fi = page.indexOf(fallback);
  console.log('fallback at:', fi);
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', page, 'utf8');

// 3. Add translations to JSON files
const keys = {
  residualRiskTitle: { pl: 'RYZYKO RESZTKOWE PO \u015aRODKACH OCHRONNYCH', en: 'RESIDUAL RISK AFTER PROTECTIVE MEASURES', de: 'RESTRISIKO NACH SCHUTZMAßNAHMEN', fr: 'RISQUE R\u00c9SIDUEL APR\u00c8S MESURES DE PROTECTION', it: 'RISCHIO RESIDUO DOPO MISURE PROTETTIVE', es: 'RIESGO RESIDUAL TRAS MEDIDAS DE PROTECCI\u00d3N', cs: 'ZBYTKOV\u00c9 RIZIKO PO OCHRANN\u00c9M OPAT\u0158EN\u00cd' },
  residualRiskDesc: { pl: 'Wska\u017c skuteczno\u015b\u0107 zastosowanego \u015brodka ochronnego dla ka\u017cdego zagro\u017cenia. \u2022 Wysoki (P\u22122): blokady elektr., kurtyny PL d/e, ryglowanie. \u2022 \u015arednio (P\u22121): os\u0142ony sta\u0142e, barierki. \u2022 Niski: oznakowanie, szkolenia, \u015aOI. Ci\u0119\u017cko\u015b\u0107 (S) nie zmienia si\u0119.', en: 'Select the effectiveness of each protective measure. \u2022 High (P-2): electrical interlocks, light curtains PL d/e. \u2022 Medium (P-1): fixed guards, barriers. \u2022 Low: signage, training, PPE. Severity (S) does not change.', de: 'W\u00e4hlen Sie die Wirksamkeit der Schutzma\u00dfnahme. \u2022 Hoch (P-2): elektr. Verriegelung, Lichtvorhang PL d/e. \u2022 Mittel (P-1): feste Schutzeinrichtungen. \u2022 Niedrig: Kennzeichnung, PSA.', fr: 'Indiquez l\u2019efficacit\u00e9 de chaque mesure. \u2022 \u00c9lev\u00e9 (P-2): verrouillages \u00e9lectr., rideaux PL d/e. \u2022 Moyen (P-1): protecteurs fixes. \u2022 Faible: signalisation, EPI.', it: 'Indicare l\u2019efficacia di ogni misura protettiva. \u2022 Alto (P-2): interblocchi elettr., cortine PL d/e. \u2022 Medio (P-1): ripari fissi. \u2022 Basso: segnaletica, DPI.', es: 'Indique la eficacia de cada medida. \u2022 Alto (P-2): enclavamientos el\u00e9ctr., cortinas PL d/e. \u2022 Medio (P-1): resguardos fijos. \u2022 Bajo: se\u00f1alizaci\u00f3n, EPI.', cs: 'Ozna\u010dte \u00fa\u010dinnost ka\u017ed\u00e9ho opat\u0159en\u00ed. \u2022 Vysok\u00fd (P-2): elektr. blokov\u00e1n\u00ed, sv\u011bteln\u00e9 z\u00e1brany PL d/e. \u2022 St\u0159edn\u00ed (P-1): pevn\u00e9 kryty. \u2022 N\u00edzk\u00fd: zna\u010den\u00ed, OOPP.' },
};

const langs = ['pl','en','de','fr','it','es','cs'];
for (const lang of langs) {
  const path = `C:/Projects/riskpro/frontend/src/i18n/locales/${lang}.json`;
  const json = JSON.parse(fs.readFileSync(path,'utf8'));
  if (!json.analysis) json.analysis = {};
  for (const [key, vals] of Object.entries(keys)) json.analysis[key] = vals[lang];
  fs.writeFileSync(path, JSON.stringify(json, null, 2), 'utf8');
}
console.log('translations added');