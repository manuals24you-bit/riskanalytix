const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/i18n/landingTranslations.ts', 'utf8');

const fixes = [
  // FR ceDesc - still has old dangerous text
  {
    old: "ceDesc: 'Sur la base de l\\''\u00e9valuation des risques effectu\u00e9e, RiskAnalytix g\u00e9n\u00e8re automatiquement une D\u00e9claration de Conformit\u00e9 CE pr\u00eate \u00e0 signer. Le document r\u00e9pond aux exigences de la Directive Machines 2006/42/CE et du nouveau R\u00e8glement 2023/1230/UE.'",
    new: "ceDesc: 'Sur la base des donn\u00e9es saisies par l\\'utilisateur, RiskAnalytix g\u00e9n\u00e8re un mod\u00e8le de D\u00e9claration de Conformit\u00e9 CE. Le mod\u00e8le n\u00e9cessite v\u00e9rification, compl\u00e9tion et signature par le fabricant. Cet outil est uniquement un support et ne remplace pas l\\''\u00e9valuation d\\'un sp\u00e9cialiste certifi\u00e9.'"
  },
  // CS ceDesc - still has old dangerous text
  {
    old: "ceDesc: 'Na z\u00e1klad\u011b proveden\u00e9ho hodnocen\u00ed rizik RiskAnalytix automaticky generuje Prohl\u00e1\u0161en\u00ed o shod\u011b CE p\u0159ipraven\u00e9 k podpisu. Dokument spl\u0148uje po\u017eadavky Sm\u011brnice o strojn\u00edch za\u0159\u00edzen\u00edch 2006/42/ES a nov\u00e9ho Na\u0159\u00edzen\u00ed 2023/1230/EU.'",
    new: "ceDesc: 'Na z\u00e1klad\u011b dat zadan\u00fdch u\u017eivatelem generuje RiskAnalytix \u0161ablonu Prohl\u00e1\u0161en\u00ed o shod\u011b CE. \u0160ablona vy\u017eaduje ov\u011b\u0159en\u00ed, dopln\u011bn\u00ed a podpis v\u00fdrobce. Tento n\u00e1stroj je pouze podp\u016frn\u00fd a nenahrazuje hodnocen\u00ed certifikovan\u00e9ho specialisty.'"
  },
  // EN step4desc - "ready for signature" removed
  {
    old: "step4desc: 'Review the risk matrix, download the PDF report and the Declaration of Conformity ready for signature.'",
    new: "step4desc: 'Review the risk matrix, download the PDF report and the Declaration of Conformity template (requires verification and signature by the manufacturer).'"
  },
  // EN ctaTitle2
  {
    old: "ctaTitle2: 'ready in 10 minutes'",
    new: "ctaTitle2: 'analysis support in minutes'"
  },
  // FR ctaTitle2
  {
    old: "ctaTitle2: 'pr\u00eates en 10 minutes'",
    new: "ctaTitle2: 'support \u00e0 l\\'analyse en quelques minutes'"
  },
];

let count = 0;
for (const { old, new: newVal } of fixes) {
  if (c.includes(old)) {
    c = c.replace(old, newVal);
    count++;
    console.log('fixed:', old.slice(0, 40));
  } else {
    console.log('NOT FOUND:', old.slice(0, 60));
  }
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/i18n/landingTranslations.ts', c, 'utf8');
console.log(`Fixed: ${count}/${fixes.length}`);