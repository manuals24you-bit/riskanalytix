const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/i18n/landingTranslations.ts', 'utf8');

const changes = [
  // PL
  {
    old: "heroBadge: 'Zgodny z EN ISO 12100:2012",
    new: "heroBadge: 'Narz\u0119dzie wspieraj\u0105ce analiz\u0119 ryzyka \u00b7 EN ISO 12100:2012"
  },
  {
    old: "heroDesc: 'Narz\u0119dzie dla rzeczoznawc\u00f3w BHP, biur projektowych i producent\u00f3w maszyn. Gotowa baza zagro\u017ce\u0144, automatyczna matryca ryzyka, raport PDF i Deklaracja Zgodno\u015bci WE \u2014 jednym klikni\u0119ciem.'",
    new: "heroDesc: 'Narz\u0119dzie wspieraj\u0105ce proces analizy ryzyka wg ISO 12100 dla s\u0142u\u017cb BHP, biur projektowych i producent\u00f3w maszyn. Gotowa baza zagro\u017ce\u0144, automatyczna matryca ryzyka i raport PDF. Ostateczna odpowiedzialno\u015b\u0107 za ocen\u0119 bezpiecze\u0144stwa spoczywa na u\u017cytkowniku.'"
  },
  // EN
  {
    old: "heroBadge: 'Compliant with EN ISO 12100:2012",
    new: "heroBadge: 'Risk analysis support tool \u00b7 EN ISO 12100:2012"
  },
  {
    old: "heroDesc: 'A tool for safety engineers, design offices and machine manufacturers. Ready hazard database, automatic risk matrix, PDF report and Declaration of Conformity \u2014 in one click.'",
    new: "heroDesc: 'A tool supporting the risk analysis process per ISO 12100 for safety engineers, design offices and machine manufacturers. Ready hazard database, automatic risk matrix and PDF report. Final responsibility for safety assessment rests with the user.'"
  },
  // DE
  {
    old: "heroBadge: 'Konform mit EN ISO 12100:2012",
    new: "heroBadge: 'Werkzeug zur Unterst\u00fctzung der Risikoanalyse \u00b7 EN ISO 12100:2012"
  },
  {
    old: "heroDesc: 'Ein Werkzeug f\u00fcr Sicherheitsingenieure, Konstruktionsb\u00fcros und Maschinenhersteller. Fertige Gef\u00e4hrdungsdatenbank, automatische Risikomatrix, PDF-Bericht und Konformit\u00e4tserkl\u00e4rung \u2014 mit einem Klick.'",
    new: "heroDesc: 'Ein Werkzeug zur Unterst\u00fctzung der Risikoanalyse gem\u00e4\u00df ISO 12100. Fertige Gef\u00e4hrdungsdatenbank, automatische Risikomatrix und PDF-Bericht. Die endg\u00fcltige Verantwortung f\u00fcr die Sicherheitsbewertung liegt beim Anwender.'"
  },
  // FR
  {
    old: "heroBadge: 'Conforme \u00e0 EN ISO 12100:2012",
    new: "heroBadge: 'Outil d\u2019aide \u00e0 l\u2019analyse des risques \u00b7 EN ISO 12100:2012"
  },
  {
    old: "heroDesc: 'Un outil pour les ing\u00e9nieurs s\u00e9curit\u00e9, bureaux d\\'",
    new: "heroDesc: 'Un outil d\\'aide au processus d\\'analyse des risques selon ISO 12100. Base de dangers pr\u00eate, matrice des risques automatique et rapport PDF. La responsabilit\u00e9 finale de l\\'\u00e9valuation de la s\u00e9curit\u00e9 incombe \u00e0 l\\'utilisateur.'"
  },
  // IT
  {
    old: "heroBadge: 'Conforme a EN ISO 12100:2012 \u00b7 Direttiva",
    new: "heroBadge: 'Strumento di supporto all\\'analisi dei rischi \u00b7 EN ISO 12100:2012"
  },
  {
    old: "heroDesc: 'Uno strumento per ingegneri della sicurezza, uffici di progettazione e produttori di macchine. Database di pericoli pronto, matrice dei rischi automatica, report PDF e Dichiarazione di Conformit\u00e0 \u2014 in un clic.'",
    new: "heroDesc: 'Uno strumento di supporto al processo di analisi dei rischi secondo ISO 12100. Database di pericoli pronto, matrice dei rischi automatica e report PDF. La responsabilit\u00e0 finale della valutazione della sicurezza spetta all\\'utente.'"
  },
  // ES
  {
    old: "heroBadge: 'Conforme con EN ISO 12100:2012",
    new: "heroBadge: 'Herramienta de apoyo al an\u00e1lisis de riesgos \u00b7 EN ISO 12100:2012"
  },
  {
    old: "heroDesc: 'Una herramienta para ingenieros de seguridad, oficinas de dise\u00f1o y fabricantes de m\u00e1quinas. Base de datos de peligros lista, matriz de riesgos autom\u00e1tica, informe PDF y Declaraci\u00f3n de Conformidad \u2014 en un clic.'",
    new: "heroDesc: 'Una herramienta de apoyo al proceso de an\u00e1lisis de riesgos seg\u00fan ISO 12100. Base de datos de peligros lista, matriz de riesgos autom\u00e1tica e informe PDF. La responsabilidad final de la evaluaci\u00f3n de seguridad recae en el usuario.'"
  },
  // CS
  {
    old: "heroBadge: 'V souladu s EN ISO 12100:2012",
    new: "heroBadge: 'N\u00e1stroj pro podporu anal\u00fdzy rizik \u00b7 EN ISO 12100:2012"
  },
  {
    old: "heroDesc: 'N\u00e1stroj pro bezpe\u010dnostn\u00ed in\u017een\u00fdry, konstruk\u010dn\u00ed kancel\u00e1\u0159e a v\u00fdrobce stroj\u016f. P\u0159ipraven\u00e1 datab\u00e1ze nebezpe\u010d\u00ed, automatick\u00e1 matice rizik, PDF zpr\u00e1va a Prohl\u00e1\u0161en\u00ed o shod\u011b \u2014 jedn\u00edm kliknut\u00edm.'",
    new: "heroDesc: 'N\u00e1stroj pro podporu procesu anal\u00fdzy rizik podle ISO 12100. P\u0159ipraven\u00e1 datab\u00e1ze nebezpe\u010d\u00ed, automatick\u00e1 matice rizik a PDF zpr\u00e1va. Kone\u010dn\u00e1 odpov\u011bdnost za hodnocen\u00ed bezpe\u010dnosti le\u017e\u00ed na u\u017eivateli.'"
  },
];

let count = 0;
for (const { old, new: newVal } of changes) {
  if (c.includes(old)) {
    c = c.replace(old, newVal);
    count++;
  } else {
    console.log('NOT FOUND:', old.slice(0, 50));
  }
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/i18n/landingTranslations.ts', c, 'utf8');
console.log(`Changed: ${count}/${changes.length}`);