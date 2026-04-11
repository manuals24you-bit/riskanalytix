const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/i18n/machinesI18n.ts', 'utf8');

const it_translations = `
        l14: { element: 'Trasporto macchina (gru / carrello)', threat: 'Caduta / ribaltamento della macchina', effect: 'Schiacciamento di persone, danno macchina' },
        l15: { element: 'Installazione / livellamento macchina', threat: 'Scivolamento / ribaltamento durante la messa in opera', effect: 'Schiacciamento degli arti' },
        l16: { element: 'Collegamento elettrico (400V / trifase)', threat: 'Folgorazione durante il collegamento', effect: 'Ustioni, morte' },
        l17: { element: 'Primo avviamento / prova di marcia', threat: 'Direzione di rotazione mandrino errata', effect: "Espulsione del pezzo o dell'utensile" },
        l18: { element: 'Configurazione programma CNC', threat: 'Errore programma NC \u2014 collisione assi', effect: 'Danno macchina, infortunio operatore' },
        l19: { element: 'Mandrino idraulico / pneumatico', threat: 'Perdita di pressione \u2014 espulsione pezzo', effect: 'Colpo dal pezzo espulso' },
        l20: { element: 'Cambio utensile automatico (torretta)', threat: 'Colpo dalla testa torretta', effect: 'Contusioni, fratture agli arti' },
        l21: { element: 'Lavoro in modalit\u00e0 servizio (JOG / MDI)', threat: 'Movimento asse involontario durante la manutenzione', effect: 'Schiacciamento arti operatore / tecnico' },
        l22: { element: 'Rottura mandrino \u2014 perdita pezzo', threat: 'Espulsione frammenti mandrino o pezzo', effect: 'Lesioni gravi \u2014 morte' },
        l23: { element: 'Collisione utensile / slitta con pezzo', threat: 'Collisione slitta con pezzo o mandrino', effect: 'Danno macchina, espulsione parti' },
        l24: { element: 'Lavorazione materiali reattivi (Mg, Ti)', threat: 'Accensione polvere di magnesio / titanio', effect: 'Incendio, esplosione' },
        l25: { element: 'Illuminazione zona lavorazione', threat: 'Illuminazione insufficiente \u2014 errore operatore', effect: 'Infortunio da errore di osservazione' },
        l26: { element: 'Mancanza alimentazione / spegnimento improvviso', threat: 'Movimento asse incontrollato al ritorno alimentazione', effect: 'Collisione, infortunio operatore' },
        l27: { element: 'Guasto freno mandrino', threat: 'Inerzia mandrino dopo spegnimento', effect: 'Contatto con mandrino in rotazione' },
        l28: { element: 'Guasto sistema refrigerazione', threat: 'Surriscaldamento utensile \u2014 incendio o espulsione', effect: 'Ustioni, incendio' },
        l29: { element: 'Guasto fine corsa (limit switches)', threat: 'Superamento della corsa asse', effect: 'Collisione meccanica, danno macchina' },
        l30: { element: 'Pulizia macchina / rimozione trucioli', threat: 'Tagli da trucioli metallici taglienti', effect: 'Lacerazioni alle mani' },
        l31: { element: 'Cambio olio / fluidi', threat: 'Contatto cutaneo con olio macchina', effect: 'Dermatite, avvelenamento se ingerito' },
        l32: { element: 'Regolazione / sostituzione griffe mandrino', threat: 'Schiacciamento dita dalle griffe', effect: 'Dita schiacciate' },
        l33: { element: 'Manutenzione sistema idraulico', threat: 'Iniezione olio idraulico ad alta pressione', effect: 'Iniezione olio sotto pelle \u2014 amputazione' },
        l34: { element: 'Smontaggio / rottamazione macchina', threat: 'Caduta parti pesanti durante lo smontaggio', effect: 'Schiacciamento, morte' },`;

const cs_translations = `
        l14: { element: 'Doprava stroje (je\u0159\u00e1b / voz\u00edk)', threat: 'P\u00e1d / p\u0159evr\u00e1cen\u00ed stroje', effect: 'Rozm\u00e1\u010cknut\u00ed osob, po\u0161kozen\u00ed stroje' },
        l15: { element: 'Instalace / nivelace stroje', threat: 'Klouznut\u00ed / p\u0159evr\u00e1cen\u00ed p\u0159i nastaven\u00ed', effect: 'Rozm\u00e1\u010cknut\u00ed kon\u010detin' },
        l16: { element: 'Elektrick\u00e9 p\u0159ipojen\u00ed (400V / 3-f\u00e1zov\u00e9)', threat: '\u00daraz elektrick\u00fdm proudem p\u0159i p\u0159ipojen\u00ed', effect: 'Pop\u00e1leniny, smrt' },
        l17: { element: 'Prvn\u00ed spu\u0161t\u011bn\u00ed / zku\u0161ebn\u00ed provoz', threat: 'Chybn\u00fd sm\u011br ot\u00e1\u010den\u00ed vretena', effect: 'Vyvrhl obrobku nebo n\u00e1stroje' },
        l18: { element: 'Konfigurace programu CNC', threat: 'Chyba programu NC \u2014 kol\u00edze os\u00ed', effect: 'Po\u0161kozen\u00ed stroje, zran\u011bn\u00ed obsluhy' },
        l19: { element: 'Hydraulick\u00e9 / pneumatick\u00e9 sklicidlo', threat: 'Ztrata tlaku \u2014 vypadnut\u00ed obrobku', effect: 'N\u00e1raz vyvrhl obrobku' },
        l20: { element: 'Automatick\u00e1 v\u00fdm\u011bna n\u00e1stroj\u016f (revolverov\u00e1 hlava)', threat: 'N\u00e1raz revolverov\u00e9 hlavy', effect: 'Pohmozdin\u00e9, zlomeniny kon\u010detin' },
        l21: { element: 'Pr\u00e1ce v servisn\u00edm re\u017eimu (JOG / MDI)', threat: 'Nezam\u00fd\u0161len\u00fd pohyb osy p\u0159i servisu', effect: 'Rozm\u00e1\u010cknut\u00ed kon\u010detin obsluhy / servisn\u00edka' },
        l22: { element: 'Lom sklicidla \u2014 ztr\u00e1ta obrobku', threat: 'Vyvrhl fragment\u016f sklicidla nebo obrobku', effect: 'T\u011b\u017ek\u00e9 zran\u011bn\u00ed \u2014 smrt' },
        l23: { element: 'Kol\u00edze n\u00e1stroje / suportu s obrobkem', threat: 'Kol\u00edze suportu s obrobkem nebo sklicidlem', effect: 'Po\u0161kozen\u00ed stroje, odhoz d\u00edl\u016f' },
        l24: { element: 'Obr\u00e1b\u011bn\u00ed reaktivn\u00edch materi\u00e1l\u016f (Mg, Ti)', threat: 'Vzn\u00edcen\u00ed prachu hodn\u00e9ku / titanu', effect: 'Po\u017e\u00e1r, v\u00fdbuch' },
        l25: { element: 'Osv\u011btlen\u00ed obr\u00e1b\u011bc\u00ed z\u00f3ny', threat: 'Nedostate\u010dn\u00e9 osv\u011btlen\u00ed \u2014 chyba obsluhy', effect: 'Zran\u011bn\u00ed v d\u016fsledku chyby pozorov\u00e1n\u00ed' },
        l26: { element: 'V\u00fdpadek nap\u00e1jen\u00ed / n\u00e1hl\u00e9 vypnut\u00ed', threat: 'Nekontrolovan\u00fd pohyb osy p\u0159i obnoven\u00ed nap\u00e1jen\u00ed', effect: 'Kol\u00edze, zran\u011bn\u00ed obsluhy' },
        l27: { element: 'Por\u00facha brzdy vretena', threat: 'Dob\u011bh vretena po vypnut\u00ed', effect: 'Kontakt s rotuj\u00edc\u00edm sklicidlem' },
        l28: { element: 'Por\u00facha chladicho syst\u00e9mu', threat: 'P\u0159eh\u0159\u00e1t\u00ed n\u00e1stroje \u2014 po\u017e\u00e1r nebo vyvrhl', effect: 'Pop\u00e1leniny, po\u017e\u00e1r' },
        l29: { element: 'Por\u00facha koncov\u00fdch sp\u00edna\u010d\u016f (limit switches)', threat: 'P\u0159ekro\u010den\u00ed rozsahu pohybu osy', effect: 'Mechanick\u00e1 kol\u00edze, po\u0161kozen\u00ed stroje' },
        l30: { element: '\u010ci\u0161t\u011bn\u00ed stroje / odstra\u0148ov\u00e1n\u00ed t\u0159\u00edsek', threat: 'Poran\u011bn\u00ed od ostr\u00fdch kovov\u00fdch t\u0159\u00edsek', effect: 'Trhn\u00e9 r\u00e1ny na rukou' },
        l31: { element: 'V\u00fdm\u011bna oleje / provozn\u00edch kapalin', threat: 'Kontakt k\u016f\u017ee se strojn\u00edm olejem', effect: 'Dermatit\u00edda, otrava p\u0159i po\u017eit\u00ed' },
        l32: { element: 'Nastaven\u00ed / v\u00fdm\u011bna \u010delust\u00ed sklicidla', threat: 'Rozdrcen\u00ed prst\u016f \u010delistmi', effect: 'Zdrcen\u00e9 prsty' },
        l33: { element: 'Servis hydraulick\u00e9ho syst\u00e9mu', threat: 'Injekce hydraulick\u00e9ho oleje pod tlakem', effect: 'Injekce oleje pod k\u016f\u017ei \u2014 amputace' },
        l34: { element: 'Demont\u00e1\u017e / srotov\u00e1n\u00ed stroje', threat: 'P\u00e1d t\u011b\u017ek\u00fdch d\u00edl\u016f p\u0159i demontov\u00e1n\u00ed', effect: 'Rozm\u00e1\u010cknut\u00ed, smrt' },`;

// Find it l13 - "Trucioli caldi / refrigerante"
const it_idx = c.indexOf("l13: { element: 'Trucioli caldi / refrigerante'");
if (it_idx > -1) {
  const endIdx = c.indexOf('},', it_idx) + 2;
  c = c.slice(0, endIdx) + it_translations + c.slice(endIdx);
  console.log('IT added at:', it_idx);
} else {
  console.log('IT not found');
}

// Find cs l13 - "Horké třísky / chladivo"  
const cs_idx = c.indexOf("l13: { element: 'Hork\u00e9 t\u0159\u00edsky / chladivo'");
if (cs_idx > -1) {
  const endIdx = c.indexOf('},', cs_idx) + 2;
  c = c.slice(0, endIdx) + cs_translations + c.slice(endIdx);
  console.log('CS added at:', cs_idx);
} else {
  // Try with encoded chars
  const cs_idx2 = c.indexOf("Hork\u00e9 t\u0159\u00edsky");
  console.log('CS search result:', cs_idx2);
  if (cs_idx2 > -1) {
    const l13start = c.lastIndexOf("l13:", cs_idx2);
    const endIdx = c.indexOf('},', l13start) + 2;
    c = c.slice(0, endIdx) + cs_translations + c.slice(endIdx);
    console.log('CS added at:', l13start);
  }
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/i18n/machinesI18n.ts', c, 'utf8');
console.log('Done! l14 it:', c.includes("Trasporto macchina"), 'l14 cs:', c.includes("Doprava stroje"));