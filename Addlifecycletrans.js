const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/i18n/translations.ts', 'utf8');

const langs = {
  pl: {
    find: 'method3: "Informacja i szkolenia \u2014 piktogramy ISO 7010, instrukcje stanowiskowe, szkolenia BHP, \u015aOI.",',
    add: `
      lifecycleTitle: "ETAPY CYKLU \u017bYCIA MASZYNY (ISO 12100 \u00a75.4)",
      lifecycleStage: "Etap cyklu \u017cycia",
      lifecycleDesc: "Typowe zagro\u017cenia do rozwa\u017cenia",
      lifecycleConsidered: "Uwzgl.",
      lc1: "Transport i monta\u017c",
      lc1d: "Podnoszenie, przemieszczanie, poziomowanie, pod\u0142\u0105czenie medi\u00f3w",
      lc2: "Instalacja i uruchomienie",
      lc2d: "Pierwsze uruchomienie, konfiguracja, testy bezpiecze\u0144stwa",
      lc3: "Regulacja i nastawianie",
      lc3d: "Nastawianie parametr\u00f3w, zmiana narz\u0119dzi, zmiana formatu",
      lc4: "Normalna praca",
      lc4d: "Obs\u0142uga, za\u0142adowanie / roz\u0142adowanie, nadzorowanie procesu",
      lc5: "Czyszczenie i dezynfekcja",
      lc5d: "Czyszczenie cz\u0119\u015bci stykaj\u0105cych si\u0119 z produktem, mycie ci\u015bnieniowe",
      lc6: "Usuwanie usterek i awarie",
      lc6d: "Diagnostyka, usuwanie zaci\u0119\u0107, dzia\u0142ania przy braku zasilania",
      lc7: "Konserwacja i serwis",
      lc7d: "Wymiana cz\u0119\u015bci zu\u017cywalnych, smarowanie, przegl\u0105dy okresowe",
      lc8: "Demonta\u017c i z\u0142omowanie",
      lc8d: "Roz\u0142\u0105czenie medi\u00f3w, demonta\u017c, transport z\u0142omu, utylizacja p\u0142yn\u00f3w",`
  },
  en: {
    find: 'method3: "Information and training \u2014 ISO 7010 pictograms, work instructions, HSE training, PPE.",',
    add: `
      lifecycleTitle: "MACHINE LIFECYCLE STAGES (ISO 12100 \u00a75.4)",
      lifecycleStage: "Lifecycle stage",
      lifecycleDesc: "Typical hazards to consider",
      lifecycleConsidered: "Covered",
      lc1: "Transport and assembly",
      lc1d: "Lifting, moving, levelling, media connection",
      lc2: "Installation and commissioning",
      lc2d: "First start-up, configuration, safety tests",
      lc3: "Setting and adjustment",
      lc3d: "Parameter setting, tool change, format change",
      lc4: "Normal operation",
      lc4d: "Operation, loading / unloading, process monitoring",
      lc5: "Cleaning and disinfection",
      lc5d: "Cleaning product-contact parts, pressure washing",
      lc6: "Fault removal and breakdowns",
      lc6d: "Diagnostics, jam clearing, actions during power loss",
      lc7: "Maintenance and service",
      lc7d: "Replacement of wear parts, lubrication, periodic inspections",
      lc8: "Dismantling and scrapping",
      lc8d: "Media disconnection, dismantling, scrap transport, fluid disposal",`
  },
  de: {
    find: 'method3: "Information und Schulung \u2014 ISO 7010-Piktogramme, Betriebsanweisungen, PSA.",',
    add: `
      lifecycleTitle: "LEBENSPHASEN DER MASCHINE (ISO 12100 \u00a75.4)",
      lifecycleStage: "Lebensphase",
      lifecycleDesc: "Typische zu ber\u00fccksichtigende Gef\u00e4hrdungen",
      lifecycleConsidered: "Ber\u00fccks.",
      lc1: "Transport und Montage",
      lc1d: "Heben, Bewegen, Ausrichten, Medienanschluss",
      lc2: "Installation und Inbetriebnahme",
      lc2d: "Erstinbetriebnahme, Konfiguration, Sicherheitstests",
      lc3: "Einrichten und Einstellen",
      lc3d: "Parametereinstellen, Werkzeugwechsel, Formatwechsel",
      lc4: "Normalbetrieb",
      lc4d: "Bedienung, Be-/Entladen, Prozess\u00fcberwachung",
      lc5: "Reinigung und Desinfektion",
      lc5d: "Reinigung produktber\u00fchrender Teile, Druckwaschen",
      lc6: "St\u00f6rungsbeseitigung und Ausf\u00e4lle",
      lc6d: "Diagnose, Staubeseitigung, Handlungen bei Stromausfall",
      lc7: "Wartung und Service",
      lc7d: "Austausch von Verschlei\u00dfteilen, Schmierung, Inspektionen",
      lc8: "Abbau und Verschrottung",
      lc8d: "Medientrennung, Demontage, Schrotttransport, Fl\u00fcssigkeitentsorgung",`
  },
  fr: {
    find: 'method3: "Information et formation \u2014 pictogrammes ISO 7010, instructions de travail, EPI.",',
    add: `
      lifecycleTitle: "\u00c9TAPES DU CYCLE DE VIE MACHINE (ISO 12100 \u00a75.4)",
      lifecycleStage: "\u00c9tape du cycle de vie",
      lifecycleDesc: "Dangers typiques \u00e0 consid\u00e9rer",
      lifecycleConsidered: "Pris en compte",
      lc1: "Transport et assemblage",
      lc1d: "Levage, d\u00e9placement, mise \u00e0 niveau, raccordement des fluides",
      lc2: "Installation et mise en service",
      lc2d: "Premier d\u00e9marrage, configuration, tests de s\u00e9curit\u00e9",
      lc3: "R\u00e9glage et mise au point",
      lc3d: "R\u00e9glage des param\u00e8tres, changement d\u2019outil, changement de format",
      lc4: "Fonctionnement normal",
      lc4d: "Op\u00e9ration, chargement / d\u00e9chargement, surveillance du processus",
      lc5: "Nettoyage et d\u00e9sinfection",
      lc5d: "Nettoyage des pi\u00e8ces en contact produit, lavage sous pression",
      lc6: "D\u00e9pannage et pannes",
      lc6d: "Diagnostic, d\u00e9bourrage, actions en cas de coupure de courant",
      lc7: "Maintenance et service",
      lc7d: "Remplacement des pi\u00e8ces d\u2019usure, lubrification, inspections p\u00e9riodiques",
      lc8: "D\u00e9montage et mise au rebut",
      lc8d: "D\u00e9connexion des fluides, d\u00e9montage, transport ferraille, \u00e9limination liquides",`
  },
  it: {
    find: 'method3: "Informazione e formazione \u2014 pittogrammi ISO 7010, istruzioni operative, DPI.",',
    add: `
      lifecycleTitle: "FASI DEL CICLO DI VITA MACCHINA (ISO 12100 \u00a75.4)",
      lifecycleStage: "Fase del ciclo di vita",
      lifecycleDesc: "Pericoli tipici da considerare",
      lifecycleConsidered: "Considerato",
      lc1: "Trasporto e assemblaggio",
      lc1d: "Sollevamento, spostamento, livellamento, collegamento dei fluidi",
      lc2: "Installazione e messa in servizio",
      lc2d: "Primo avviamento, configurazione, test di sicurezza",
      lc3: "Regolazione e messa a punto",
      lc3d: "Impostazione parametri, cambio utensile, cambio formato",
      lc4: "Funzionamento normale",
      lc4d: "Operazione, carico / scarico, monitoraggio processo",
      lc5: "Pulizia e disinfezione",
      lc5d: "Pulizia parti a contatto prodotto, lavaggio ad alta pressione",
      lc6: "Eliminazione guasti e avarie",
      lc6d: "Diagnostica, eliminazione inceppamenti, azioni in caso di mancanza di corrente",
      lc7: "Manutenzione e assistenza",
      lc7d: "Sostituzione parti di usura, lubrificazione, ispezioni periodiche",
      lc8: "Smontaggio e rottamazione",
      lc8d: "Disconnessione fluidi, smontaggio, trasporto rottame, smaltimento liquidi",`
  },
  es: {
    find: 'method3: "Informaci\u00f3n y formaci\u00f3n \u2014 pictogramas ISO 7010, instrucciones de trabajo, EPI.",',
    add: `
      lifecycleTitle: "ETAPAS DEL CICLO DE VIDA M\u00c1QUINA (ISO 12100 \u00a75.4)",
      lifecycleStage: "Etapa del ciclo de vida",
      lifecycleDesc: "Peligros t\u00edpicos a considerar",
      lifecycleConsidered: "Considerado",
      lc1: "Transporte y montaje",
      lc1d: "Elevaci\u00f3n, traslado, nivelaci\u00f3n, conexi\u00f3n de servicios",
      lc2: "Instalaci\u00f3n y puesta en marcha",
      lc2d: "Primera puesta en marcha, configuraci\u00f3n, pruebas de seguridad",
      lc3: "Ajuste y regulaci\u00f3n",
      lc3d: "Ajuste de par\u00e1metros, cambio de herramienta, cambio de formato",
      lc4: "Funcionamiento normal",
      lc4d: "Operaci\u00f3n, carga / descarga, supervisi\u00f3n del proceso",
      lc5: "Limpieza y desinfecci\u00f3n",
      lc5d: "Limpieza de piezas en contacto con producto, lavado a presi\u00f3n",
      lc6: "Eliminaci\u00f3n de fallos y aver\u00edas",
      lc6d: "Diagn\u00f3stico, eliminaci\u00f3n de atascos, acciones ante corte de suministro",
      lc7: "Mantenimiento y servicio",
      lc7d: "Sustituci\u00f3n de piezas de desgaste, lubricaci\u00f3n, inspecciones peri\u00f3dicas",
      lc8: "Desmontaje y desguace",
      lc8d: "Desconexi\u00f3n de servicios, desmontaje, transporte de chatarra, eliminaci\u00f3n de l\u00edquidos",`
  },
  cs: {
    find: 'method3: "Informace a \u0161kolen\u00ed \u2014 piktogramy ISO 7010, pracovn\u00ed instrukce, OOPP.",',
    add: `
      lifecycleTitle: "F\u00c1ZE \u017dIVOTN\u00cdHO CYKLU STROJE (ISO 12100 \u00a75.4)",
      lifecycleStage: "F\u00e1ze \u017eivotn\u00edho cyklu",
      lifecycleDesc: "Typick\u00e1 rizika k zv\u00e1\u017een\u00ed",
      lifecycleConsidered: "Zohledn\u011bno",
      lc1: "Doprava a monta\u017e",
      lc1d: "Zved\u00e1n\u00ed, p\u0159emis\u0165ov\u00e1n\u00ed, vyrovn\u00e1n\u00ed, p\u0159ipojen\u00ed m\u00e9di\u00ed",
      lc2: "Instalace a uveden\u00ed do provozu",
      lc2d: "Prvn\u00ed spu\u0161t\u011bn\u00ed, konfigurace, bezpe\u010dnostn\u00ed testy",
      lc3: "Nastaven\u00ed a serizov\u00e1n\u00ed",
      lc3d: "Nastaven\u00ed parametr\u016f, v\u00fdm\u011bna n\u00e1stroj\u016f, zm\u011bna form\u00e1tu",
      lc4: "Norm\u00e1ln\u00ed provoz",
      lc4d: "Obsluha, nakl\u00e1d\u00e1n\u00ed / vyklad\u00e1n\u00ed, monitorov\u00e1n\u00ed procesu",
      lc5: "\u010ci\u0161t\u011bn\u00ed a dezinfekce",
      lc5d: "\u010ci\u0161t\u011bn\u00ed d\u00edl\u016f v kontaktu s produktem, tlakov\u00e9 um\u00fdv\u00e1n\u00ed",
      lc6: "Odstra\u0148ov\u00e1n\u00ed poruch a hav\u00e1rie",
      lc6d: "Diagnostika, odstra\u0148ov\u00e1n\u00ed uv\u00e1znut\u00ed, \u010dinnosti p\u0159i v\u00fdpadku nap\u00e1jen\u00ed",
      lc7: "\u00ddr\u017eba a servis",
      lc7d: "V\u00fdm\u011bna opot\u0159eben\u00fdch d\u00edl\u016f, mazn\u00ed, pravideln\u00e9 prohl\u00eddky",
      lc8: "Demont\u00e1\u017e a srotov\u00e1n\u00ed",
      lc8d: "Odpojen\u00ed m\u00e9di\u00ed, demont\u00e1\u017e, transport \u0161rotu, likvidace kapalin",`
  },
};

let count = 0;
for (const [lang, { find, add }] of Object.entries(langs)) {
  const idx = c.indexOf(find);
  if (idx === -1) {
    console.log(`${lang}: NOT found, searching...`);
    // Try to find by shorter string
    const short = find.slice(0, 40);
    const idx2 = c.indexOf(short);
    console.log(`  Short search '${short}': ${idx2}`);
    continue;
  }
  c = c.slice(0, idx + find.length) + add + c.slice(idx + find.length);
  count++;
  console.log(`${lang}: added`);
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/i18n/translations.ts', c, 'utf8');
console.log(`\nDone! Added ${count}/7 languages`);
console.log('lc1 pl:', c.includes('lc1: "Transport i monta'));
console.log('lc1 en:', c.includes('lc1: "Transport and assembly"'));