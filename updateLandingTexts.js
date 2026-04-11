const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/i18n/landingTranslations.ts', 'utf8');

// Check if warningBox key exists
const hasWarningBox = c.includes('warningBox');
console.log('warningBox exists:', hasWarningBox);

// Check interface for disclaimerText
const hasDisclaimerText = c.includes('disclaimerText');
console.log('disclaimerText exists:', hasDisclaimerText);

// List all keys we need to update
const updates = [
  // === PL ===
  // heroBadge already updated
  // heroTitle1
  { old: "heroTitle1: 'Ocena ryzyka maszyn'", new: "heroTitle1: 'Wsparcie do oceny ryzyka maszyn'" },
  // heroDesc already updated, but strengthen it
  { 
    old: "heroDesc: 'Narz\u0119dzie wspieraj\u0105ce proces analizy ryzyka wg ISO 12100 dla s\u0142u\u017cb BHP, biur projektowych i producent\u00f3w maszyn. Gotowa baza zagro\u017ce\u0144, automatyczna matryca ryzyka i raport PDF. Ostateczna odpowiedzialno\u015b\u0107 za ocen\u0119 bezpiecze\u0144stwa spoczywa na u\u017cytkowniku.'",
    new: "heroDesc: 'Narz\u0119dzie wspomagaj\u0105ce proces oceny ryzyka maszyn zgodnie z ISO 12100. Gotowa baza zagro\u017ce\u0144, automatyczna macierz ryzyka i raport PDF. Ostateczna odpowiedzialno\u015b\u0107 za ocen\u0119 bezpiecze\u0144stwa i zgodno\u015b\u0107 CE spoczywa wy\u0142\u0105cznie na producencie/modernizatorze maszyny.'"
  },
  // heroStat labels - make less absolute
  // featuresTitle
  { old: "featuresTitle1: 'Wszystko, czego potrzebujesz do'", new: "featuresTitle1: 'Wszystko, czego potrzebujesz do wsparcia'" },
  { old: "featuresTitle2: 'oceny ryzyka maszyn'", new: "featuresTitle2: 'analizy ryzyka maszyn'" },
  // feat descriptions - add "szablon" for CE feat
  { old: "feat6title: 'Deklaracja Zgodno\u015bci WE'", new: "feat6title: 'Szablon Deklaracji Zgodno\u015bci WE'" },
  { old: "feat6desc: 'Automatyczna Deklaracja Zgodno\u015bci CE zgodna z Dyrektyw\u0105 Maszynow\u0105 2006/42/WE i Rozporz\u0105dzeniem 2023/1230/UE.'", new: "feat6desc: 'Generuje szablon Deklaracji Zgodno\u015bci CE do weryfikacji i podpisania przez producenta/modernizatora maszyny.'" },
  // howTitle
  { old: "howTitle1: 'Od maszyny do'", new: "howTitle1: 'Od maszyny do szablonu'" },
  { old: "howTitle2: 'Deklaracji CE w 4 krokach'", new: "howTitle2: 'Deklaracji CE — 4 kroki'" },
  // step4desc
  { old: "step4desc: 'Pobierz raport PDF i Deklaracj\u0119 Zgodno\u015bci CE gotow\u0105 do podpisu.'", new: "step4desc: 'Pobierz raport PDF i szablon Deklaracji Zgodno\u015bci CE do weryfikacji i uzupe\u0142nienia przez producenta.'" },
  // ctaTitle
  { old: "ctaTitle1: 'Gotowe w 10 minut.'", new: "ctaTitle1: 'Wsparcie analizy w kilka minut.'" },
  { old: "ctaTitle2: 'Zacznij za darmo.'", new: "ctaTitle2: 'Pierwsze u\u017cycie bezp\u0142atne.'" },

  // === EN ===
  { old: "heroTitle1: 'Machine Risk Assessment'", new: "heroTitle1: 'Machine Risk Assessment Support Tool'" },
  { old: "feat6title: 'CE Declaration of Conformity'", new: "feat6title: 'CE Declaration of Conformity Template'" },
  { old: "feat6desc: 'Automatic CE Declaration of Conformity compliant with Machinery Directive 2006/42/EC and Regulation 2023/1230/EU.'", new: "feat6desc: 'Generates a CE Declaration of Conformity template for verification and signing by the machine manufacturer/modifier.'" },
  { old: "howTitle1: 'From machine to CE'", new: "howTitle1: 'From machine to CE template'" },
  { old: "step4desc: 'Review the risk matrix, download the PDF report and the Declaration of Conformity template (requires verification and signature by the manufacturer).'", new: "step4desc: 'Download the PDF report and CE Declaration template — requires verification, completion and signing by the manufacturer.'" },
  { old: "ctaTitle1: 'Ready in 10 minutes.'", new: "ctaTitle1: 'Analysis support in minutes.'" },

  // === DE ===
  { old: "heroTitle1: 'Maschinensicherheitsbewertung'", new: "heroTitle1: 'Unterst\u00fctzungswerkzeug f\u00fcr die Maschinensicherheitsbewertung'" },
  { old: "feat6title: 'CE-Konformit\u00e4tserkl\u00e4rung'", new: "feat6title: 'CE-Konformit\u00e4tserkl\u00e4rung (Vorlage)'" },
  { old: "feat6desc: 'Automatische CE-Konformit\u00e4tserkl\u00e4rung gem\u00e4\u00df Maschinenrichtlinie 2006/42/EG und Verordnung 2023/1230/EU.'", new: "feat6desc: 'Erstellt eine Vorlage der CE-Konformit\u00e4tserkl\u00e4rung zur Pr\u00fcfung und Unterzeichnung durch den Maschinenhersteller.'" },
  { old: "ctaTitle1: 'Fertig in 10 Minuten.'", new: "ctaTitle1: 'Analyseunterst\u00fctzung in Minuten.'" },

  // === FR ===
  { old: "heroTitle1: '\u00c9valuation des risques machines'", new: "heroTitle1: 'Outil de support \u00e0 l\\''\u00e9valuation des risques machines'" },
  { old: "feat6title: 'D\u00e9claration de Conformit\u00e9 CE'", new: "feat6title: 'Mod\u00e8le de D\u00e9claration de Conformit\u00e9 CE'" },
  { old: "feat6desc: 'D\u00e9claration de Conformit\u00e9 CE automatique conforme \u00e0 la Directive Machines 2006/42/CE et au R\u00e8glement 2023/1230/UE.'", new: "feat6desc: 'G\u00e9n\u00e8re un mod\u00e8le de D\u00e9claration de Conformit\u00e9 CE \u00e0 v\u00e9rifier et signer par le fabricant/modificateur de la machine.'" },
  { old: "ctaTitle1: 'Pr\u00eat en 10 minutes.'", new: "ctaTitle1: 'Support d\\'analyse en quelques minutes.'" },

  // === IT ===
  { old: "heroTitle1: 'Valutazione dei rischi macchine'", new: "heroTitle1: 'Strumento di supporto alla valutazione dei rischi macchine'" },
  { old: "feat6title: 'Dichiarazione di Conformit\u00e0 CE'", new: "feat6title: 'Modello Dichiarazione di Conformit\u00e0 CE'" },
  { old: "feat6desc: 'Dichiarazione di Conformit\u00e0 CE automatica conforme alla Direttiva Macchine 2006/42/CE e al Regolamento 2023/1230/UE.'", new: "feat6desc: 'Genera un modello di Dichiarazione di Conformit\u00e0 CE da verificare e firmare da parte del produttore/modificatore.'" },
  { old: "ctaTitle1: 'Pronto in 10 minuti.'", new: "ctaTitle1: 'Supporto analisi in pochi minuti.'" },

  // === ES ===
  { old: "heroTitle1: 'Evaluaci\u00f3n de riesgos de m\u00e1quinas'", new: "heroTitle1: 'Herramienta de apoyo a la evaluaci\u00f3n de riesgos de m\u00e1quinas'" },
  { old: "feat6title: 'Declaraci\u00f3n de Conformidad CE'", new: "feat6title: 'Plantilla Declaraci\u00f3n de Conformidad CE'" },
  { old: "feat6desc: 'Declaraci\u00f3n de Conformidad CE autom\u00e1tica conforme a la Directiva de M\u00e1quinas 2006/42/CE y el Reglamento 2023/1230/UE.'", new: "feat6desc: 'Genera una plantilla de Declaraci\u00f3n de Conformidad CE para verificaci\u00f3n y firma por el fabricante/modificador.'" },
  { old: "ctaTitle1: 'Listo en 10 minutos.'", new: "ctaTitle1: 'Apoyo al an\u00e1lisis en minutos.'" },

  // === CS ===
  { old: "heroTitle1: 'Hodnocen\u00ed rizik stroj\u016f'", new: "heroTitle1: 'N\u00e1stroj pro podporu hodnocen\u00ed rizik stroj\u016f'" },
  { old: "feat6title: 'Prohl\u00e1\u0161en\u00ed o shod\u011b CE'", new: "feat6title: 'Vzor Prohl\u00e1\u0161en\u00ed o shod\u011b CE'" },
  { old: "feat6desc: 'Automatick\u00e9 Prohl\u00e1\u0161en\u00ed o shod\u011b CE v souladu se Sm\u011brnic\u00ed o strojn\u00edch za\u0159\u00edzen\u00edch 2006/42/ES a Na\u0159\u00edzen\u00edm 2023/1230/EU.'", new: "feat6desc: 'Generuje vzor Prohl\u00e1\u0161en\u00ed o shod\u011b CE k ov\u011b\u0159en\u00ed a podpisu v\u00fdrobcem/moderniz\u00e1torem stroje.'" },
  { old: "ctaTitle1: 'P\u0159ipraven za 10 minut.'", new: "ctaTitle1: 'Podpora anal\u00fdzy za n\u011bkolik minut.'" },
];

let count = 0;
let notFound = 0;
for (const { old, new: newVal } of updates) {
  if (c.includes(old)) {
    c = c.replace(old, newVal);
    count++;
  } else {
    console.log('NOT FOUND:', old.slice(0, 60));
    notFound++;
  }
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/i18n/landingTranslations.ts', c, 'utf8');
console.log(`\nUpdated: ${count}, Not found: ${notFound}`);