const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/CEDeclarationPDF.tsx', 'utf8');

// 1. Remove PLr section (from cePlrTitle comment to declarationBox)
const plrStart = c.lastIndexOf('\n        {/* PLr', c.indexOf('cePlrTitle'));
const plrEnd = c.indexOf('\n        {/* O\u015bwiadczenie */}');
console.log('PLr section:', plrStart, 'to', plrEnd);
c = c.slice(0, plrStart) + c.slice(plrEnd);
console.log('PLr removed, CE length:', c.length);

// 2. Add disclaimer styles to StyleSheet
const styleMarker = '  declarationBox: {';
c = c.replace(styleMarker,
  `  disclaimerBox: {
    backgroundColor: '#FFFBEB', borderRadius: 3, padding: 6, marginBottom: 10,
    borderTopWidth: 1, borderBottomWidth: 1, borderLeftWidth: 1, borderRightWidth: 1,
    borderTopColor: '#FDE68A', borderBottomColor: '#FDE68A', borderLeftColor: '#FDE68A', borderRightColor: '#FDE68A',
  },
  disclaimerText: { fontSize: 7, color: '#92400E', lineHeight: 1.5 },
  footerCE: { position: 'absolute', bottom: 14, left: 36, right: 36, borderTopWidth: 1, borderTopColor: '#E5E7EB', paddingTop: 4 },
  footerCEText: { fontSize: 6, color: '#9CA3AF', textAlign: 'center' },
  ${styleMarker}`
);

// 3. Add disclaimer box at the very top of the page content (after page opening)
// Find where content starts - after the header/logo section, before docTitleBox
const docTitleMarker = '<View style={S.docTitleBox}>';
const docTitleIdx = c.indexOf(docTitleMarker);
console.log('docTitleBox at:', docTitleIdx);

const disclaimerBox = `<View style={S.disclaimerBox}>
          <Text style={S.disclaimerText}>
            \u26a0\ufe0f SZABLON \u2013 DO WERYFIKACJI I PODPISANIA{'\u000A'}Dokument wygenerowany przez RiskAnalytix jako szablon pomocniczy. Producent/modernizator ponosi pe\u0142n\u0105 odpowiedzialno\u015b\u0107 za tre\u015b\u0107, weryfikacj\u0119 danych i podpisanie deklaracji.
          </Text>
        </View>
        `;

c = c.slice(0, docTitleIdx) + disclaimerBox + c.slice(docTitleIdx);

// 4. Add footer before closing </Page>
const pageCloseMarker = '\n      </Page>';
const lastPageClose = c.lastIndexOf(pageCloseMarker);
console.log('last page close at:', lastPageClose);

const ceFooter = `
        <View style={S.footerCE} fixed>
          <Text style={S.footerCEText}>Szablon RiskAnalytix \u2022 Ostateczna odpowiedzialno\u015b\u0107 spoczywa na producencie maszyny \u2022 Wymaga weryfikacji i podpisu</Text>
        </View>`;

c = c.slice(0, lastPageClose) + ceFooter + c.slice(lastPageClose);

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/CEDeclarationPDF.tsx', c, 'utf8');
console.log('done, cePlrTitle remains:', c.includes('cePlrTitle'));
console.log('disclaimerBox style:', c.includes('disclaimerBox'));