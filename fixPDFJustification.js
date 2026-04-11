const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/RiskReportPDF.tsx', 'utf8');

// Fix the broken @ts-nocheck at top
c = c.replace('// @ts-\n              </>nocheck', '// @ts-nocheck');
c = c.replace('// @ts-\r\n              </>nocheck', '// @ts-nocheck');
console.log('starts with nocheck:', c.startsWith('// @ts-nocheck'));

// Now check justification row
const justIdx = c.indexOf('justificationS || e.justificationP');
console.log('justification at:', justIdx);

if (justIdx === -1) {
  console.log('justification not found - was removed');
  // Need to re-add it properly
  
  // Find the entries.map return in PDF
  const actionLine = c.indexOf("translated.action || ''}</Text>\n              </View>\n            )\n          })}");
  console.log('action line at:', actionLine);
  
  if (actionLine > -1) {
    const retIdx = c.lastIndexOf('return (', actionLine);
    const viewStart = c.indexOf('<View key={e.id}', retIdx);
    console.log('viewStart:', viewStart);
    
    // Wrap in fragment and add justification
    const viewEnd = actionLine + "translated.action || ''}</Text>\n              </View>".length;
    const oldContent = c.slice(viewStart, viewEnd);
    
    const newContent = `<>\n              ${oldContent}\n              {(e.justificationS || e.justificationP) && (\n                <View style={{ flexDirection: 'row', paddingTop: 3, paddingBottom: 4, paddingLeft: 6, backgroundColor: '#FFFBEB', borderBottomWidth: 1, borderBottomColor: '#FDE68A' }}>\n                  <Text style={{ fontSize: 6, color: '#92400E', flex: 1 }}>{e.justificationS ? \`S(\${e.severity}): \${e.justificationS}\` : ''}</Text>\n                  <Text style={{ fontSize: 6, color: '#92400E', flex: 1 }}>{e.justificationP ? \`P(\${e.probability}): \${e.justificationP}\` : ''}</Text>\n                </View>\n              )}\n              </>`;
    
    c = c.slice(0, viewStart) + newContent + c.slice(viewEnd);
    console.log('justification added');
  }
} else {
  // justification exists but needs proper fragment wrapping
  const retIdx = c.lastIndexOf('return (', justIdx);
  const viewStart = c.indexOf('<View key={e.id}', retIdx);
  
  // Check if already wrapped
  const beforeView = c.slice(viewStart - 20, viewStart);
  console.log('before view:', JSON.stringify(beforeView));
  
  if (!beforeView.includes('<>')) {
    c = c.slice(0, viewStart) + '<>\n              ' + c.slice(viewStart);
    console.log('added opening fragment');
    
    // Find closing - after justification View closes
    const justEnd = c.indexOf('</View>\n              )}\n            )\n          })', c.indexOf('justificationS || e.justificationP'));
    if (justEnd > -1) {
      c = c.slice(0, justEnd + 8) + '\n              </>' + c.slice(justEnd + 8);
      console.log('added closing fragment');
    } else {
      console.log('could not find closing');
      const justEnd2 = c.lastIndexOf('</View>', c.indexOf('justificationS') + 500);
      console.log('last </View> near just:', justEnd2, JSON.stringify(c.slice(justEnd2, justEnd2 + 40)));
    }
  }
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/RiskReportPDF.tsx', c, 'utf8');
console.log('done, length:', c.length);