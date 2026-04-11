const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/i18n/landingTranslations.ts', 'utf8');

const fixes = [
  // PL
  { o: "howTitle1: 'Od maszyny do Deklaracji CE'", n: "howTitle1: 'Od maszyny do szablonu Deklaracji CE'" },
  { o: "step4desc: 'Przejrzyj matryc\u0119 ryzyka, pobierz raport PDF oraz Deklaracj\u0119 Zgodno\u015bci WE gotow\u0105 do podpisu.'", n: "step4desc: 'Pobierz raport PDF i szablon Deklaracji Zgodno\u015bci CE — wymaga weryfikacji i podpisu przez producenta.'" },
  { o: "ctaTitle1: 'Analiza ryzyka i Deklaracja CE'", n: "ctaTitle1: 'Wsparcie analizy ryzyka'" },
  { o: "ctaTitle2: 'gotowe w 10 minut'", n: "ctaTitle2: 'pierwsze u\u017cycie bezp\u0142atne'" },
  { o: "featuresTitle1: 'Wszystko czego potrzebujesz'", n: "featuresTitle1: 'Wszystko, czego potrzebujesz do wsparcia'" },
  { o: "featuresTitle2: 'do rzetelnej oceny ryzyka'", n: "featuresTitle2: 'analizy ryzyka maszyn'" },
  { o: "howTitle2: 'w 4 krokach'", n: "howTitle2: '— 4 kroki'" },

  // EN
  { o: "howTitle1: 'From machine to CE Declaration'", n: "howTitle1: 'From machine to CE Declaration template'" },
  { o: "howTitle2: 'in 4 steps'", n: "howTitle2: '— 4 steps'" },
  { o: "step4desc: 'Download the PDF report and CE Declaration template \u2014 requires verification, completion and signing by the manufacturer.'", n: "step4desc: 'Download the PDF report and CE Declaration template \u2014 requires verification and signing by the manufacturer.'" },
  { o: "ctaTitle1: 'Risk assessment and CE Declaration'", n: "ctaTitle1: 'Risk assessment support tool'" },
  { o: "ctaTitle2: 'analysis support in minutes'", n: "ctaTitle2: 'first use free'" },
  { o: "featuresTitle1: 'Everything you need'", n: "featuresTitle1: 'Everything you need to support'" },
  { o: "featuresTitle2: 'for a reliable risk assessment'", n: "featuresTitle2: 'your machine risk analysis'" },

  // DE
  { o: "howTitle1: 'Von der Maschine zur CE-Erkl\u00e4rung'", n: "howTitle1: 'Von der Maschine zur CE-Erkl\u00e4rungsvorlage'" },
  { o: "step4desc: '\u00dcberpr\u00fcfen Sie die Risikomatrix, laden Sie den PDF-Bericht und die unterschriftsreife Konformit\u00e4tserkl\u00e4rung herunter.'", n: "step4desc: 'Laden Sie den PDF-Bericht und die CE-Erkl\u00e4rungsvorlage herunter \u2014 muss vom Hersteller gepr\u00fcft und unterzeichnet werden.'" },
  { o: "ctaTitle1: 'Risikobewertung und CE-Erkl\u00e4rung'", n: "ctaTitle1: 'Unterst\u00fctzungswerkzeug f\u00fcr Risikobewertung'" },
  { o: "ctaTitle2: 'in 10 Minuten fertig'", n: "ctaTitle2: 'erste Nutzung kostenlos'" },

  // FR
  { o: "howTitle1: 'De la machine \u00e0 la D\u00e9claration CE'", n: "howTitle1: 'De la machine au mod\u00e8le de D\u00e9claration CE'" },
  { o: "step4desc: 'Examinez la matrice de risques, t\u00e9l\u00e9chargez le rapport PDF et la D\u00e9claration de Conformit\u00e9 pr\u00eate \u00e0 signer.'", n: "step4desc: 'T\u00e9l\u00e9chargez le rapport PDF et le mod\u00e8le de D\u00e9claration CE \u2014 \u00e0 v\u00e9rifier et signer par le fabricant.'" },
  { o: "ctaTitle1: '\u00c9valuation des risques et D\u00e9claration CE'", n: "ctaTitle1: 'Outil de support \u00e0 l\\'analyse des risques'" },
  { o: "ctaTitle2: 'support \u00e0 l\\'analyse en quelques minutes'", n: "ctaTitle2: 'premi\u00e8re utilisation gratuite'" },

  // IT
  { o: "howTitle1: 'Dalla macchina alla Dichiarazione CE'", n: "howTitle1: 'Dalla macchina al modello di Dichiarazione CE'" },
  { o: "step4desc: 'Rivedi la matrice dei rischi, scarica il report PDF e la Dichiarazione di Conformit\u00e0 pronta per la firma.'", n: "step4desc: 'Scarica il report PDF e il modello di Dichiarazione CE \u2014 richiede verifica e firma da parte del produttore.'" },
  { o: "ctaTitle1: 'Valutazione dei rischi e Dichiarazione CE'", n: "ctaTitle1: 'Strumento di supporto alla valutazione dei rischi'" },
  { o: "ctaTitle2: 'pronte in 10 minuti'", n: "ctaTitle2: 'primo utilizzo gratuito'" },

  // ES
  { o: "howTitle1: 'De la m\u00e1quina a la Declaraci\u00f3n CE'", n: "howTitle1: 'De la m\u00e1quina a la plantilla de Declaraci\u00f3n CE'" },
  { o: "step4desc: 'Revisa la matriz de riesgos, descarga el informe PDF y la Declaraci\u00f3n de Conformidad lista para firmar.'", n: "step4desc: 'Descarga el informe PDF y la plantilla de Declaraci\u00f3n CE \u2014 requiere verificaci\u00f3n y firma del fabricante.'" },
  { o: "ctaTitle1: 'Evaluaci\u00f3n de riesgos y Declaraci\u00f3n CE'", n: "ctaTitle1: 'Herramienta de apoyo a la evaluaci\u00f3n de riesgos'" },
  { o: "ctaTitle2: 'listas en 10 minutos'", n: "ctaTitle2: 'primer uso gratuito'" },

  // CS
  { o: "howTitle1: 'Od stroje k Prohl\u00e1\u0161en\u00ed CE'", n: "howTitle1: 'Od stroje ke vzoru Prohl\u00e1\u0161en\u00ed CE'" },
  { o: "step4desc: 'Zkontrolujte matici rizik, st\u00e1hn\u011bte PDF zpr\u00e1vu a Prohl\u00e1\u0161en\u00ed o shod\u011b p\u0159ipraven\u00e9 k podpisu.'", n: "step4desc: 'St\u00e1hn\u011bte PDF zpr\u00e1vu a vzor Prohl\u00e1\u0161en\u00ed CE \u2014 vy\u017eaduje ov\u011b\u0159en\u00ed a podpis v\u00fdrobce.'" },
  { o: "ctaTitle1: 'Hodnocen\u00ed rizik a Prohl\u00e1\u0161en\u00ed CE'", n: "ctaTitle1: 'N\u00e1stroj pro podporu hodnocen\u00ed rizik'" },
  { o: "ctaTitle2: 'hotov\u00e9 za 10 minut'", n: "ctaTitle2: 'prvn\u00ed pou\u017eit\u00ed zdarma'" },
];

let count = 0;
let notFound = 0;
for (const { o, n } of fixes) {
  if (c.includes(o)) {
    c = c.replace(o, n);
    count++;
  } else {
    console.log('NOT FOUND:', o.slice(0, 60));
    notFound++;
  }
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/i18n/landingTranslations.ts', c, 'utf8');
console.log(`\nFixed: ${count}, Not found: ${notFound}`);