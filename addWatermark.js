const fs = require('fs');

// ── RiskReportPDF ──
let r = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/RiskReportPDF.tsx', 'utf8');

const watermark = `
        {/* Watermark for demo */}
        {analysis.id === 'demo-001' && (
          <View fixed style={{ position: 'absolute', top: '40%', left: 0, right: 0, alignItems: 'center', transform: 'rotate(-35deg)', opacity: 0.07, pointerEvents: 'none' }}>
            <Text style={{ fontSize: 72, fontWeight: 'bold', color: '#000000', letterSpacing: 8 }}>PRZYKŁAD</Text>
            <Text style={{ fontSize: 24, color: '#000000', letterSpacing: 4 }}>RiskAnalytix.com</Text>
          </View>
        )}`;

// Add watermark after each <Page size="A4" style={S.page}>
r = r.replace(/<Page size="A4" style={S\.page}>/g, `<Page size="A4" style={S.page}>${watermark}`);

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/RiskReportPDF.tsx', r, 'utf8');
console.log('RiskReportPDF done:', (r.match(/PRZYKŁAD/g) || []).length, 'watermarks added');

// ── CEDeclarationPDF ──
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/CEDeclarationPDF.tsx', 'utf8');

c = c.replace(/<Page size="A4" style={S\.page}>/g, `<Page size="A4" style={S.page}>${watermark}`);

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/CEDeclarationPDF.tsx', c, 'utf8');
console.log('CEDeclarationPDF done:', (c.match(/PRZYKŁAD/g) || []).length, 'watermarks added');