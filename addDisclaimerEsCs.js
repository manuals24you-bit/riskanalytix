const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/i18n/landingTranslations.ts', 'utf8');

const fixes = [
  {
    old: "footerTerms: 'T\u00e9rminos'",
    new: "disclaimerTitle: 'AVISO IMPORTANTE \u2014 SOLO HERRAMIENTA DE APOYO',\n    disclaimerText: 'RiskAnalytix es solo una herramienta de apoyo. Los documentos generados no reemplazan la evaluaci\u00f3n oficial de conformidad CE ni la consulta con un especialista certificado. La responsabilidad final recae en el fabricante/modificador de la m\u00e1quina.',\n    disclaimerLink: 'T\u00e9rminos \u2192',\n    footerTerms: 'T\u00e9rminos'"
  },
  {
    old: "footerTerms: 'Podm\u00ednky'",
    new: "disclaimerTitle: 'D\u016ble\u017eit\u00e9 upozorn\u011bn\u00ed \u2014 pouze podp\u016frn\u00fd n\u00e1stroj',\n    disclaimerText: 'RiskAnalytix je pouze podp\u016frn\u00fd n\u00e1stroj. Generovan\u00e9 dokumenty nenahrazuj\u00ed ofici\u00e1ln\u00ed posouzen\u00ed shody CE ani konzultaci s certifikovan\u00fdm specialistou. Kone\u010dn\u00e1 odpov\u011bdnost le\u017e\u00ed na v\u00fdrobci/moderniz\u00e1toru stroje.',\n    disclaimerLink: 'Podm\u00ednky \u2192',\n    footerTerms: 'Podm\u00ednky'"
  },
];

let count = 0;
for (const { old, new: n } of fixes) {
  if (c.includes(old)) {
    c = c.replace(old, n);
    count++;
    console.log('fixed:', old.slice(0, 30));
  } else {
    console.log('NOT FOUND:', old);
  }
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/i18n/landingTranslations.ts', c, 'utf8');
console.log('Fixed:', count);