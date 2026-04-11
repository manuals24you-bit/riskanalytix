const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/i18n/landingTranslations.ts', 'utf8');

// Language-specific replacements
const replacements = [
  // PL heroTitle2
  ["heroTitle2: 'i Deklaracja CE w 10 minut'", "heroTitle2: '\u2014 wsparcie analizy ryzyka i szablon CE'"],
  // EN heroTitle2
  ["heroTitle2: 'and CE Declaration in 10 minutes'", "heroTitle2: '\u2014 risk analysis support tool'"],
  // DE heroTitle2
  ["heroTitle2: 'und CE-Erkl\u00e4rung in 10 Minuten'", "heroTitle2: '\u2014 Werkzeug zur Unterst\u00fctzung der Risikoanalyse'"],
  // FR heroTitle2
  ["heroTitle2: 'et D\u00e9claration CE en 10 minutes'", "heroTitle2: '\u2014 outil d\\'aide \u00e0 l\\'analyse des risques'"],
  // IT heroTitle2
  ["heroTitle2: 'e Dichiarazione CE in 10 minuti'", "heroTitle2: '\u2014 strumento di supporto all\\'analisi dei rischi'"],
  // ES heroTitle2
  ["heroTitle2: 'y Declaraci\u00f3n CE en 10 minutos'", "heroTitle2: '\u2014 herramienta de apoyo al an\u00e1lisis de riesgos'"],
  // CS heroTitle2
  ["heroTitle2: 'a Prohl\u00e1\u0161en\u00ed CE za 10 minut'", "heroTitle2: '\u2014 n\u00e1stroj pro podporu anal\u00fdzy rizik'"],

  // PL ceTitle1+2
  ["ceTitle1: 'Generuj Deklaracj\u0119'", "ceTitle1: 'Szablon Deklaracji'"],
  ["ceTitle2: 'Zgodno\u015bci WE w PDF'", "ceTitle2: 'Zgodno\u015bci WE (do weryfikacji przez producenta)'"],
  // EN ceTitle1+2
  ["ceTitle1: 'Generate Declaration'", "ceTitle1: 'CE Declaration'"],
  ["ceTitle2: 'of Conformity in PDF'", "ceTitle2: 'of Conformity Template (for manufacturer review)'"],
  // DE ceTitle
  ["ceTitle2: 'als PDF generieren'", "ceTitle2: 'als PDF-Vorlage (vom Hersteller zu pr\u00fcfen)'"],
  // FR ceTitle
  ["ceTitle2: 'de Conformit\u00e9 CE en PDF'", "ceTitle2: 'de Conformit\u00e9 CE (mod\u00e8le \u00e0 v\u00e9rifier par le fabricant)'"],
  // IT ceTitle
  ["ceTitle2: 'di Conformit\u00e0 CE in PDF'", "ceTitle2: 'di Conformit\u00e0 CE (modello da verificare dal produttore)'"],
  // ES ceTitle
  ["ceTitle2: 'de Conformidad CE en PDF'", "ceTitle2: 'de Conformidad CE (plantilla para revisi\u00f3n del fabricante)'"],
  // CS ceTitle
  ["ceTitle2: 'o shod\u011b CE v PDF'", "ceTitle2: 'o shod\u011b CE (vzor ke kontrole v\u00fdrobcem)'"],

  // PL ceDesc
  ["ceDesc: 'Na podstawie przeprowadzonej oceny ryzyka RiskAnalytix automatycznie generuje Deklaracj\u0119 Zgodno\u015bci WE gotow\u0105 do podpisu. Dokument spe\u0142nia wymagania Dyrektywy Maszynowej 2006/42/WE i nowego rozporz\u0105dzenia 2023/1230/UE.'",
   "ceDesc: 'Na podstawie danych wprowadzonych przez u\u017cytkownika RiskAnalytix generuje szablon Deklaracji Zgodno\u015bci WE. Szablon wymaga weryfikacji, uzupe\u0142nienia i podpisu przez producenta/modernizatora maszyny. Narz\u0119dzie ma wy\u0142\u0105cznie charakter pomocniczy i nie zast\u0119puje oceny certyfikowanego specjalisty.'"],
  // EN ceDesc
  ["ceDesc: 'Based on the completed risk assessment, RiskAnalytix automatically generates a Declaration of Conformity ready for signature. The document meets the requirements of Machinery Directive 2006/42/EC and the new Regulation 2023/1230/EU.'",
   "ceDesc: 'Based on data entered by the user, RiskAnalytix generates a Declaration of Conformity template. The template requires verification, completion and signature by the machine manufacturer/modifier. This tool is for support purposes only and does not replace assessment by a certified safety specialist.'"],
  // DE ceDesc
  ["ceDesc: 'Auf Basis der abgeschlossenen Risikobewertung generiert RiskAnalytix automatisch eine unterschriftsreife Konformit\u00e4tserkl\u00e4rung. Das Dokument erf\u00fcllt die Anforderungen der Maschinenrichtlinie 2006/42/EG und der neuen Verordnung 2023/1230/EU.'",
   "ceDesc: 'Auf Basis der vom Nutzer eingegebenen Daten erstellt RiskAnalytix eine Vorlage der Konformit\u00e4tserkl\u00e4rung. Die Vorlage muss vom Maschinenhersteller/-umbauer gepr\u00fcft, erg\u00e4nzt und unterzeichnet werden. Dieses Werkzeug ist nur ein Hilfsmittel und ersetzt keine Pr\u00fcfung durch einen zertifizierten Sicherheitsspezialisten.'"],
  // FR ceDesc
  ["ceDesc: 'Sur la base de l\\''\u00e9valuation des risques effectu\u00e9e, RiskAnalytix g\u00e9n\u00e8re automatiquement une D\u00e9claration de Conformit\u00e9 CE pr\u00eate \u00e0 signer. Le document r\u00e9pond aux exigences de la Directive Machines 2006/42/CE et du nouveau R\u00e8glement 2023/1230/UE.'",
   "ceDesc: 'Sur la base des donn\u00e9es saisies par l\\'utilisateur, RiskAnalytix g\u00e9n\u00e8re un mod\u00e8le de D\u00e9claration de Conformit\u00e9 CE. Ce mod\u00e8le doit \u00eatre v\u00e9rifi\u00e9, compl\u00e9t\u00e9 et sign\u00e9 par le fabricant. Cet outil est purement indicatif et ne remplace pas l\\'expertise d\\'un sp\u00e9cialiste certifi\u00e9.'"],
  // IT ceDesc
  ["ceDesc: 'Sulla base della valutazione dei rischi completata, RiskAnalytix genera automaticamente una Dichiarazione di Conformit\u00e0 CE pronta per la firma. Il documento soddisfa i requisiti della Direttiva Macchine 2006/42/CE e del nuovo Regolamento 2023/1230/UE.'",
   "ceDesc: 'Sulla base dei dati inseriti dall\\'utente, RiskAnalytix genera un modello di Dichiarazione di Conformit\u00e0 CE. Il modello richiede verifica, completamento e firma da parte del produttore. Questo strumento \u00e8 solo di supporto e non sostituisce la valutazione di uno specialista certificato.'"],
  // ES ceDesc
  ["ceDesc: 'Con base en la evaluaci\u00f3n de riesgos completada, RiskAnalytix genera autom\u00e1ticamente una Declaraci\u00f3n de Conformidad CE lista para firmar. El documento cumple los requisitos de la Directiva de M\u00e1quinas 2006/42/CE y el nuevo Reglamento 2023/1230/UE.'",
   "ceDesc: 'Bas\u00e1ndose en los datos introducidos por el usuario, RiskAnalytix genera una plantilla de Declaraci\u00f3n de Conformidad CE. La plantilla requiere verificaci\u00f3n, completado y firma por el fabricante. Esta herramienta es solo de apoyo y no reemplaza la evaluaci\u00f3n de un especialista certificado.'"],
  // CS ceDesc
  ["ceDesc: 'Na z\u00e1klad\u011b provedeného hodnocen\u00ed rizik RiskAnalytix automaticky generuje Prohl\u00e1\u0161en\u00ed o shod\u011b CE p\u0159ipraven\u00e9 k podpisu. Dokument spln\u0148uje po\u017eadavky Sm\u011brnice o strojn\u00edch za\u0159\u00edzen\u00edch 2006/42/ES a nov\u00e9ho Na\u0159\u00edzen\u00ed 2023/1230/EU.'",
   "ceDesc: 'Na z\u00e1klad\u011b dat zadan\u00fdch u\u017eivatelem RiskAnalytix generuje vzor Prohl\u00e1\u0161en\u00ed o shod\u011b CE. Vzor vy\u017eaduje ov\u011b\u0159en\u00ed, dopln\u011bn\u00ed a podpis v\u00fdrobce. Tento n\u00e1stroj m\u00e1 pouze pomocn\u00fd charakter a nenahrazuje posouzen\u00ed certifikovan\u00e9ho specialisty.'"],

  // PL ceItem1
  ["ceItem1: 'Pe\u0142na Deklaracja Zgodno\u015bci WE w PDF'", "ceItem1: 'Szablon Deklaracji Zgodno\u015bci WE w PDF (do weryfikacji)'"],
  // EN ceItem1
  ["ceItem1: 'Full EC Declaration of Conformity in PDF'", "ceItem1: 'CE Declaration of Conformity template in PDF (requires verification)'"],
  // DE ceItem1
  ["ceItem1: 'Vollst\u00e4ndige EG-Konformit\u00e4tserkl\u00e4rung im PDF'", "ceItem1: 'Vorlage EG-Konformit\u00e4tserkl\u00e4rung als PDF (zur Pr\u00fcfung)'"],
  // FR ceItem1
  ["ceItem1: 'D\u00e9claration de Conformit\u00e9 CE compl\u00e8te en PDF'", "ceItem1: 'Mod\u00e8le de D\u00e9claration CE en PDF (\u00e0 v\u00e9rifier)'"],
  // IT ceItem1
  ["ceItem1: 'Dichiarazione di Conformit\u00e0 CE completa in PDF'", "ceItem1: 'Modello Dichiarazione CE in PDF (da verificare)'"],
  // ES ceItem1
  ["ceItem1: 'Declaraci\u00f3n de Conformidad CE completa en PDF'", "ceItem1: 'Plantilla Declaraci\u00f3n CE en PDF (requiere verificaci\u00f3n)'"],
  // CS ceItem1
  ["ceItem1: '\u00dapln\u00e9 Prohl\u00e1\u0161en\u00ed ES o shod\u011b v PDF'", "ceItem1: 'Vzor Prohl\u00e1\u0161en\u00ed CE v PDF (vy\u017eaduje ov\u011b\u0159en\u00ed)'"],
];

let count = 0;
for (const [old, newVal] of replacements) {
  if (c.includes(old)) {
    c = c.replace(old, newVal);
    count++;
  } else {
    console.log('NOT FOUND:', old.slice(0, 60));
  }
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/i18n/landingTranslations.ts', c, 'utf8');
console.log(`Changed: ${count}/${replacements.length}`);