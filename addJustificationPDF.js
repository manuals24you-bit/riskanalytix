const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/RiskReportPDF.tsx', 'utf8');

const oldRow = `{translated.action || ''}</Text>\n              </View>\n            )\n          })}`;

const newRow = `{translated.action || ''}</Text>\n              </View>\n              {(e.justificationS || e.justificationP) && (\n                <View style={{ flexDirection: 'row', paddingTop: 3, paddingBottom: 4, paddingLeft: 6, backgroundColor: '#FFFBEB', borderBottomWidth: 1, borderBottomColor: '#FDE68A' }}>\n                  <Text style={{ fontSize: 6, color: '#92400E', flex: 1 }}>\n                    {e.justificationS ? \`S(\${e.severity}): \${e.justificationS}\` : ''}\n                  </Text>\n                  <Text style={{ fontSize: 6, color: '#92400E', flex: 1 }}>\n                    {e.justificationP ? \`P(\${e.probability}): \${e.justificationP}\` : ''}\n                  </Text>\n                </View>\n              )}\n            )\n          })}`;

if (c.includes(oldRow)) {
  c = c.replace(oldRow, newRow);
  console.log('justification added to PDF');
} else {
  console.log('not found, trying with \\r\\n...');
  const oldRow2 = oldRow.replace(/\n/g, '\r\n');
  if (c.includes(oldRow2)) {
    c = c.replace(oldRow2, newRow);
    console.log('fixed with CRLF');
  } else {
    console.log('still not found');
    const idx = c.indexOf('translated.action');
    console.log('context:', JSON.stringify(c.slice(idx, idx + 200)));
  }
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/RiskReportPDF.tsx', c, 'utf8');