const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/CEDeclarationPDF.tsx', 'utf8');

// Find and fix the broken disclaimer text
const badStart = c.indexOf('<View style={S.disclaimerBox}>');
const badEnd = c.indexOf('</View>', badStart) + 7;
console.log('disclaimer box at:', badStart, 'to', badEnd);

const fixedBox = `<View style={S.disclaimerBox}>
          <Text style={S.disclaimerText}>{'\u26a0\ufe0f SZABLON \u2013 DO WERYFIKACJI I PODPISANIA'}</Text>
          <Text style={[S.disclaimerText, { marginTop: 2 }]}>Dokument wygenerowany przez RiskAnalytix jako szablon pomocniczy. Producent/modernizator ponosi pe\u0142n\u0105 odpowiedzialno\u015b\u0107 za tre\u015b\u0107, weryfikacj\u0119 danych i podpisanie deklaracji.</Text>
        </View>`;

c = c.slice(0, badStart) + fixedBox + c.slice(badEnd);
fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/CEDeclarationPDF.tsx', c, 'utf8');
console.log('fixed');
