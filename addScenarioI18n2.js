const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/i18n/machinesI18n.ts', 'utf8');

const scenarios = {
  en: {
    l01: 'Operator opens spindle guard during rotation; distance to spindle < 0.5 m',
    l02: 'Normal machining; operator stands in front of machine at 0.5-1.5 m distance',
    l03: 'Manual tool change with stopped spindle; contact with cutting edge',
    l04: 'Carriage adjustment at low feed speed; hands near carriage',
    l05: 'Machining long bar L/D > 4 without steady rest; speed > 500 rpm',
    l06: 'Electrical cabinet service with power on; access to cabinet',
    l07: 'Starting CNC cycle by operator; tool offset or program error',
    l08: 'Daily skin contact with coolant; no protective gloves',
    l09: 'Work with intensive cooling; operator without mask in mist zone',
    l10: 'Continuous work > 4h; noise level 88-95 dB(A) without hearing protection',
    l11: 'Work with unbalanced chuck; vibration level A(8) > 2.5 m/s2',
    l12: 'Standing at machine > 6h without mat; bent body posture',
    l13: 'Accumulation of chips and coolant vapours; spark from tool',
    l14: 'Transport by crane; machine weight > 3t; persons within 5 m radius',
    l15: 'Levelling with wedges; machine unstable before anchoring',
    l16: 'Connecting 400V supply cables; no main disconnection',
    l17: 'First start-up without workpiece; checking rotation direction',
    l18: 'Loading new NC program; no dry run; speed at 100%',
    l19: 'Working with hydraulic chuck; hydraulic pump failure during machining',
    l20: 'Automatic tool change; operator near open door',
    l21: 'Service in JOG mode; operator in work zone with power on',
    l22: 'High-speed machining; fatigue crack in chuck during rotation',
    l23: 'First pass of new program; tool offset error',
    l24: 'Machining magnesium alloy; oil-based coolant; temperature > 400 C',
    l25: 'Evening work; inadequate local lighting; misreading display',
    l26: 'Power loss; guard open; operator in work zone',
    l27: 'E-stop activation; operator opens guard before full stop',
    l28: 'Coolant pump failure during machining; tool overheating',
    l29: 'Limit switch failure; bystanders near machine',
    l30: 'Machine cleaning after shift; manual chip removal without hook',
    l31: 'Monthly guideway oil change; oil spill on floor',
    l32: 'Chuck jaw replacement without LOTO; spindle may start accidentally',
    l33: 'Hydraulic system service; pressure lines under residual pressure',
    l34: 'Machine dismantling before scrapping; heavy parts without crane',
  },
  de: {
    l01: 'Bediener oeffnet Spindelschutz waehrend der Drehung; Abstand < 0,5 m',
    l02: 'Normales Bearbeiten; Bediener steht 0,5-1,5 m vor der Maschine',
    l03: 'Manueller Werkzeugwechsel bei stehender Spindel; Kontakt mit der Schneide',
    l04: 'Schlitteneinstellung bei niedriger Vorschubgeschwindigkeit; Haende nahe am Schlitten',
    l05: 'Bearbeitung eines langen Stabs L/D > 4 ohne Luenette; Drehzahl > 500 U/min',
    l06: 'Service am Schaltschrank bei eingeschalteter Spannung',
    l07: 'CNC-Zyklus gestartet; Werkzeugoffset- oder Programmierfehler',
    l08: 'Taeglich Hautkontakt mit Kuehlmittel; keine Schutzhandschuhe',
    l09: 'Arbeit mit intensiver Kuehlung; Bediener ohne Maske in der Nebelzone',
    l10: 'Dauerbetrieb > 4h; Laermbelastung 88-95 dB(A) ohne Gehoerschutz',
    l11: 'Arbeit mit unwuchtigem Futter; Schwingungspegel A(8) > 2,5 m/s2',
    l12: 'Stehen an der Maschine > 6h ohne Matte; gebeugte Koerperhaltung',
    l13: 'Anhaeulung von Spaenen und Kuehlmitteldaempfen; Funke vom Werkzeug',
    l14: 'Transport mit Kran; Maschinengewicht > 3t; Personen in 5 m Radius',
    l15: 'Ausrichten mit Keilen; Maschine instabil vor der Verankerung',
    l16: 'Anschluss der 400V-Versorgungskabel; kein Haupttrennschalter',
    l17: 'Erstinbetriebnahme ohne Werkstueck; Pruefung der Drehrichtung',
    l18: 'Laden des neuen NC-Programms; kein Probelauf; Geschwindigkeit 100%',
    l19: 'Arbeit mit hydraulischem Futter; Ausfall der Hydraulikpumpe',
    l20: 'Automatischer Werkzeugwechsel; Bediener nahe der offenen Tuer',
    l21: 'Service im JOG-Modus; Bediener in der Arbeitszone bei Spannung',
    l22: 'Hochgeschwindigkeitsbearbeitung; Ermuedungsbruch im Futter',
    l23: 'Erster Durchlauf eines neuen Programms; Werkzeugoffsetfehler',
    l24: 'Bearbeitung von Magnesiumlegierung; oelbasiertes Kuehlmittel; Temp > 400 C',
    l25: 'Abendarbeit; ungenuegend Beleuchtung; Fehllesen der Anzeige',
    l26: 'Stromausfall; Schutzabdeckung offen; Bediener in der Arbeitszone',
    l27: 'E-Stop-Betaetigung; Bediener oeffnet Schutz vor vollstaendigem Stillstand',
    l28: 'Kuehlmittelpumpenausfall waehrend der Bearbeitung; Werkzeuguebererhitzung',
    l29: 'Endschalterausfall; Unbeteiligte in der Naehe der Maschine',
    l30: 'Maschinenreinigung nach der Schicht; manuelle Spanentnahme ohne Haken',
    l31: 'Monatlicher Fuehrungsbahnenwechsel; Oel auf den Boden',
    l32: 'Backenwechsel ohne LOTO; Spindel kann versehentlich anlaufen',
    l33: 'Hydrauliksystemservice; Druckleitungen unter Restdruck',
    l34: 'Maschinendemontage vor der Verschrottung; schwere Teile ohne Kran',
  },
  fr: {
    l01: 'Operateur ouvre la protection de broche pendant la rotation; distance < 0,5 m',
    l02: 'Usinage normal; operateur debout a 0,5-1,5 m devant la machine',
    l03: "Changement manuel d'outil broche arretee; contact avec le tranchant",
    l04: 'Reglage du chariot a faible vitesse; mains pres du chariot',
    l05: 'Usinage longue barre L/D > 4 sans lunette; vitesse > 500 tr/min',
    l06: 'Service armoire electrique sous tension; acces a l armoire',
    l07: "Lancement du cycle CNC; erreur de jauge ou de programme",
    l08: 'Contact cutane quotidien avec le liquide de refroidissement; sans gants',
    l09: 'Travail avec refroidissement intensif; operateur sans masque dans la zone nebuleuse',
    l10: 'Travail continu > 4h; bruit 88-95 dB(A) sans protection auditive',
    l11: "Travail avec mandrin desequilibre; niveau de vibration A(8) > 2,5 m/s2",
    l12: 'Debout a la machine > 6h sans tapis; posture flechie',
    l13: "Accumulation de copeaux et vapeurs; etincelle de l'outil",
    l14: 'Transport par pont roulant; masse > 3t; personnes dans un rayon de 5 m',
    l15: 'Mise a niveau avec cales; machine instable avant ancrage',
    l16: 'Raccordement des cables 400V; sans coupure principale',
    l17: 'Premier demarrage sans piece; verification du sens de rotation',
    l18: 'Chargement nouveau programme NC; pas de marche a vide; vitesse 100%',
    l19: 'Travail avec mandrin hydraulique; panne de pompe hydraulique',
    l20: "Changement automatique d'outil; operateur pres de la porte ouverte",
    l21: 'Service en mode JOG; operateur dans la zone de travail sous tension',
    l22: 'Usinage grande vitesse; fissure de fatigue dans le mandrin',
    l23: "Premier passage d'un nouveau programme; erreur de jauge",
    l24: 'Usinage alliage de magnesium; liquide a base huile; temperature > 400 C',
    l25: 'Travail en soiree; eclairage insuffisant; mauvaise lecture affichage',
    l26: 'Perte de courant; protection ouverte; operateur dans la zone',
    l27: 'Activation E-stop; operateur ouvre protection avant arret complet',
    l28: 'Panne pompe liquide de refroidissement; surchauffe outil',
    l29: 'Defaillance fin de course; personnes a proximite',
    l30: 'Nettoyage machine apres quart; evacuation manuelle copeaux sans crochet',
    l31: "Vidange mensuelle huile de glissieres; deversement d'huile",
    l32: 'Remplacement des mors sans LOTO; broche peut demarrer accidentellement',
    l33: 'Service circuit hydraulique; conduites sous pression residuelle',
    l34: 'Demontage machine avant mise au rebut; elements lourds sans pont roulant',
  },
  it: {
    l01: 'Operatore apre protezione mandrino durante rotazione; distanza < 0,5 m',
    l02: 'Lavorazione normale; operatore in piedi a 0,5-1,5 m davanti alla macchina',
    l03: 'Cambio utensile manuale con mandrino fermo; contatto con il tagliente',
    l04: 'Regolazione slitta a bassa velocita; mani vicino alla slitta',
    l05: 'Lavorazione barra lunga L/D > 4 senza lunetta; velocita > 500 giri/min',
    l06: 'Assistenza quadro elettrico con tensione; accesso al quadro',
    l07: 'Avvio ciclo CNC; errore offset utensile o di programma',
    l08: 'Contatto cutaneo giornaliero con refrigerante; senza guanti',
    l09: 'Lavoro con raffreddamento intensivo; operatore senza maschera nella nebbia',
    l10: 'Lavoro continuo > 4h; rumore 88-95 dB(A) senza protezione uditiva',
    l11: 'Lavoro con mandrino non bilanciato; vibrazione A(8) > 2,5 m/s2',
    l12: 'In piedi alla macchina > 6h senza tappeto; postura flessa',
    l13: 'Accumulo trucioli e vapori refrigerante; scintilla utensile',
    l14: 'Trasporto con carroponte; peso > 3t; persone nel raggio 5 m',
    l15: 'Livellamento con cunei; macchina instabile prima ancoraggio',
    l16: 'Collegamento cavi 400V; senza sezionatore principale',
    l17: 'Primo avviamento senza pezzo; verifica senso rotazione',
    l18: 'Caricamento nuovo programma NC; senza prova a vuoto; velocita 100%',
    l19: 'Lavoro con mandrino idraulico; guasto pompa idraulica',
    l20: 'Cambio utensile automatico; operatore vicino porta aperta',
    l21: 'Assistenza modalita JOG; operatore in zona di lavoro con tensione',
    l22: 'Lavorazione alta velocita; cricca da fatica nel mandrino',
    l23: 'Primo passaggio nuovo programma; errore offset utensile',
    l24: 'Lavorazione lega magnesio; refrigerante a base olio; temperatura > 400 C',
    l25: 'Lavoro serale; illuminazione inadeguata; lettura errata display',
    l26: 'Interruzione corrente; protezione aperta; operatore nella zona',
    l27: 'Attivazione E-stop; operatore apre protezione prima arresto completo',
    l28: 'Guasto pompa refrigerante durante lavorazione; surriscaldamento utensile',
    l29: 'Guasto finecorsa; persone nei pressi della macchina',
    l30: 'Pulizia macchina dopo turno; rimozione manuale trucioli senza gancio',
    l31: 'Cambio mensile olio guide; fuoriuscita olio sul pavimento',
    l32: 'Sostituzione griffe senza LOTO; mandrino puo avviarsi accidentalmente',
    l33: 'Assistenza sistema idraulico; condutture sotto pressione residua',
    l34: 'Smontaggio macchina prima rottamazione; parti pesanti senza carroponte',
  },
  es: {
    l01: 'Operador abre proteccion husillo durante rotacion; distancia < 0,5 m',
    l02: 'Mecanizado normal; operador de pie a 0,5-1,5 m frente a la maquina',
    l03: 'Cambio manual herramienta con husillo parado; contacto con el filo',
    l04: 'Ajuste carro a baja velocidad avance; manos cerca del carro',
    l05: 'Mecanizado barra larga L/D > 4 sin luneta; velocidad > 500 rpm',
    l06: 'Servicio armario electrico con tension; acceso al armario',
    l07: 'Inicio ciclo CNC; error offset herramienta o de programa',
    l08: 'Contacto cutaneo diario con refrigerante; sin guantes',
    l09: 'Trabajo con refrigeracion intensa; operador sin mascara en zona niebla',
    l10: 'Trabajo continuo > 4h; ruido 88-95 dB(A) sin proteccion auditiva',
    l11: 'Trabajo con mandril desequilibrado; vibracion A(8) > 2,5 m/s2',
    l12: 'De pie en la maquina > 6h sin alfombrilla; postura flexionada',
    l13: 'Acumulacion virutas y vapores refrigerante; chispa herramienta',
    l14: 'Transporte con grua; peso > 3t; personas en radio 5 m',
    l15: 'Nivelacion con cunas; maquina inestable antes anclaje',
    l16: 'Conexion cables 400V; sin corte principal',
    l17: 'Primera puesta en marcha sin pieza; comprobacion sentido giro',
    l18: 'Carga nuevo programa NC; sin marcha en vacio; velocidad 100%',
    l19: 'Trabajo con mandril hidraulico; fallo bomba hidraulica',
    l20: 'Cambio automatico herramienta; operador cerca puerta abierta',
    l21: 'Servicio modo JOG; operador en zona trabajo con tension',
    l22: 'Mecanizado alta velocidad; grieta fatiga en mandril',
    l23: 'Primer paso nuevo programa; error offset herramienta',
    l24: 'Mecanizado aleacion magnesio; refrigerante base aceite; temperatura > 400 C',
    l25: 'Trabajo nocturno; iluminacion insuficiente; lectura erronea display',
    l26: 'Corte corriente; proteccion abierta; operador en la zona',
    l27: 'Activacion E-stop; operador abre proteccion antes parada completa',
    l28: 'Fallo bomba refrigerante durante mecanizado; sobrecalentamiento herramienta',
    l29: 'Fallo final de carrera; personas cerca de la maquina',
    l30: 'Limpieza maquina tras turno; retirada manual virutas sin gancho',
    l31: 'Cambio mensual aceite guias; derrame aceite en suelo',
    l32: 'Sustitucion mordazas sin LOTO; husillo puede arrancar accidentalmente',
    l33: 'Servicio sistema hidraulico; conducciones bajo presion residual',
    l34: 'Desmontaje maquina antes desguace; piezas pesadas sin grua',
  },
  cs: {
    l01: 'Obsluha otvira ochranu vretena behem otaceni; vzdalenost < 0,5 m',
    l02: 'Normalni obrabeni; obsluha stoji pred strojem ve vzdalenosti 0,5-1,5 m',
    l03: 'Rucni vymena nastroje pri stojicim veretenu; kontakt s reznou hranou',
    l04: 'Nastaveni suportu pri nizke rychlosti posuvu; ruce v blizkosti suportu',
    l05: 'Obrabeni dlouhe tyce L/D > 4 bez lunetky; otacky > 500 ot/min',
    l06: 'Servis rozvodne skrine pri zapnutem napajeni; pristup k rozvodne',
    l07: 'Spusteni CNC cyklu obsluhou; chyba korekce nastroje nebo programu',
    l08: 'Denni kontakt kuze s chladicen kapalinou; bez ochranych rukavic',
    l09: 'Prace s intenzivnim chladenim; obsluha bez masky v zone mlhy',
    l10: 'Nepretrzita prace > 4h; hluk 88-95 dB(A) bez chranicel sluchu',
    l11: 'Prace s nevyvazenym sklicidlem; vibrace A(8) > 2,5 m/s2',
    l12: 'Stani u stroje > 6h bez podlazky; ohnutu poloha tela',
    l13: 'Hromadeni trisek a vypar chladicen kapaliny; jiskry z nastroje',
    l14: 'Preprava jerabem; hmotnost > 3t; osoby v okruhu 5 m',
    l15: 'Vyrovnani kliny; stroj nestabilni pred ukotvenim',
    l16: 'Pripojeni napajacich kabelu 400V; bez hlavniho odpojeni',
    l17: 'Prvni spusteni bez obrobku; overeni smeru otaceni',
    l18: 'Nacteni noveho NC programu; bez zkusebniho chodu; rychlost 100%',
    l19: 'Prace s hydraulickym sklicidlem; porucha hydraulickeho cerpadla',
    l20: 'Automaticka vymena nastroje; obsluha blizko otevrenych dveri',
    l21: 'Servis v rezimu JOG; obsluha v pracovni zone pri zapnutem napajeni',
    l22: 'Vysoke otacky obrabeni; unavova trhlina v sklicidle behem otaceni',
    l23: 'Prvni pruchod noveho programu; chyba korekce nastroje',
    l24: 'Obrabeni slitiny horciku; olejove chladivo; teplota > 400 C',
    l25: 'Vecerni prace; nedostatecne mistni osvetleni; spatne cteni displeje',
    l26: 'Vypadek napajeni; ochrana otevrena; obsluha v pracovni zone',
    l27: 'Aktivace nudz.zastaveni; obsluha otvira ochranu pred plnym zastavenim',
    l28: 'Porucha cerpadla chladiva behem obrabeni; prehreti nastroje',
    l29: 'Porucha koncoveho spinace; osoby v blizkosti stroje',
    l30: 'Cisteni stroje po smene; rucni odstranovani trisek bez hacku',
    l31: 'Mesicni vymena oleje vedeni; rozliti oleje na podlahu',
    l32: 'Vymena celusti bez LOTO; vreteno se muze nahodne rozbehout',
    l33: 'Servis hydraulickeho systemu; potrubi pod zbytkovou tlak',
    l34: 'Demontaz stroje pred srotovanim; tezke dily bez jerabu',
  },
};

// For each language, find the language block within lathe-cnc and add scenarios
for (const [lang, scenarioMap] of Object.entries(scenarios)) {
  // Find the language block start marker e.g. "\n    en: {"
  const langMarker = `\n    ${lang}: {`;
  
  // We need to find the one inside 'lathe-cnc'
  const machineMarker = "'lathe-cnc': {";
  const machineIdx = c.indexOf(machineMarker);
  if (machineIdx === -1) { console.log('lathe-cnc not found'); continue; }
  
  // Find next machine marker to bound our search
  const nextMachineIdx = c.indexOf("'lathe-conventional': {", machineIdx);
  
  // Find lang block within lathe-cnc
  const langIdx = c.indexOf(langMarker, machineIdx);
  if (langIdx === -1 || langIdx > nextMachineIdx) { 
    console.log(`${lang} block not found in lathe-cnc`);
    continue;
  }
  
  let addedCount = 0;
  for (const [id, scenario] of Object.entries(scenarioMap)) {
    const idMarker = `        ${id}: {`;
    const idIdx = c.indexOf(idMarker, langIdx);
    if (idIdx === -1 || idIdx > nextMachineIdx) continue;
    
    // Find end of this entry
    const entryEnd = c.indexOf('}', idIdx);
    const entryChunk = c.slice(idIdx, entryEnd);
    if (entryChunk.includes('scenario:')) continue;
    
    // Add scenario before closing }
    const safeScenario = scenario.replace(/'/g, '\u2019');
    c = c.slice(0, entryEnd) + `, scenario: '${safeScenario}'` + c.slice(entryEnd);
    addedCount++;
  }
  console.log(`${lang}: added ${addedCount} scenarios`);
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/i18n/machinesI18n.ts', c, 'utf8');
console.log('en l01:', c.includes("Operator opens spindle guard"));
console.log('de l01:', c.includes("Bediener oeffnet Spindelschutz"));
console.log('fr l01:', c.includes("Operateur ouvre la protection"));