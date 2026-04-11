const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/i18n/machinesI18n.ts', 'utf8');

// 1. Add scenario to ThreatTranslation interface
c = c.replace(
  'export interface ThreatTranslation {\n  element: string\n  threat: string\n  effect: string\n}',
  'export interface ThreatTranslation {\n  element: string\n  threat: string\n  effect: string\n  scenario?: string\n}'
);
console.log('interface updated:', c.includes('scenario?: string'));

// 2. Add scenario translations for lathe-cnc l01-l34 for each language
const scenarios = {
  en: {
    l01: 'Operator opens spindle guard during rotation; distance to spindle < 0.5 m',
    l02: 'Normal machining; operator stands in front of machine at 0.5\u20131.5 m distance',
    l03: 'Manual tool change with stopped spindle; contact with cutting edge',
    l04: 'Carriage adjustment at low feed speed; hands near carriage',
    l05: 'Machining long bar L/D > 4 without steady rest; speed > 500 rpm',
    l06: 'Electrical cabinet service with power on; access to cabinet',
    l07: 'Starting CNC cycle by operator; tool offset or program error',
    l08: 'Daily skin contact with coolant; no protective gloves',
    l09: 'Work with intensive cooling; operator without mask in mist zone',
    l10: 'Continuous work > 4h; noise level 88\u201395 dB(A) without hearing protection',
    l11: 'Work with unbalanced chuck; vibration level A(8) > 2.5 m/s\u00b2',
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
    l24: 'Machining magnesium alloy; oil-based coolant; temperature > 400\u00b0C',
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
    l01: 'Bediener \u00f6ffnet Spindelschutz w\u00e4hrend der Drehung; Abstand zur Spindel < 0,5 m',
    l02: 'Normales Bearbeiten; Bediener steht 0,5\u20131,5 m vor der Maschine',
    l03: 'Manuelller Werkzeugwechsel bei stehender Spindel; Kontakt mit der Schneide',
    l04: 'Schlitteneinstellung bei niedriger Vorschubgeschwindigkeit; H\u00e4nde nahe am Schlitten',
    l05: 'Bearbeitung eines langen Stabs L/D > 4 ohne Lünette; Drehzahl > 500 U/min',
    l06: 'Service am Schaltschrank bei eingeschalteter Spannung; Zugang zum Schrank',
    l07: 'CNC-Zyklus durch Bediener gestartet; Werkzeugoffset- oder Programmierfehler',
    l08: 'T\u00e4glicher Hautkontakt mit K\u00fchlmittel; keine Schutzhandschuhe',
    l09: 'Arbeit mit intensiver K\u00fchlung; Bediener ohne Maske in der Nebelzone',
    l10: 'Dauerbetrieb > 4h; L\u00e4rmbelastung 88\u201395 dB(A) ohne Geh\u00f6rschutz',
    l11: 'Arbeit mit unwuchtigem Futter; Schwingungspegel A(8) > 2,5 m/s\u00b2',
    l12: 'Stehen an der Maschine > 6h ohne Matte; gebeugte K\u00f6rperhaltung',
    l13: 'Anh\u00e4ufung von Sp\u00e4nen und K\u00fchlmittelD\u00e4mpfen; Funke vom Werkzeug',
    l14: 'Transport mit Kran; Maschinengewicht > 3t; Personen in 5 m Radius',
    l15: 'Ausrichten mit Keilen; Maschine instabil vor der Verankerung',
    l16: 'Anschluss der 400V-Versorgungskabel; kein Haupttrennschalter',
    l17: 'Erstinbetriebnahme ohne Werkst\u00fcck; Pr\u00fcfung der Drehrichtung',
    l18: 'Laden des neuen NC-Programms; kein Probelauf; Geschwindigkeit 100%',
    l19: 'Arbeit mit hydraulischem Futter; Ausfall der Hydraulikpumpe w\u00e4hrend der Bearbeitung',
    l20: 'Automatischer Werkzeugwechsel; Bediener nahe der offenen T\u00fcr',
    l21: 'Service im JOG-Modus; Bediener in der Arbeitszone bei eingeschalteter Spannung',
    l22: 'Hochgeschwindigkeitsbearbeitung; Ermlüdungsbruch im Futter w\u00e4hrend der Drehung',
    l23: 'Erster Durchlauf eines neuen Programms; Werkzeugoffsetfehler',
    l24: 'Bearbeitung von Magnesiumlegierung; \u00f6lbasiertes K\u00fchlmittel; Temperatur > 400\u00b0C',
    l25: 'Abendarbeit; unzureichende Beleuchtung; Fehllesen der Anzeige',
    l26: 'Stromausfall; Schutzabdeckung offen; Bediener in der Arbeitszone',
    l27: 'E-Stop-Bet\u00e4tigung; Bediener \u00f6ffnet Schutz vor dem vollst\u00e4ndigen Stillstand',
    l28: 'K\u00fchlmittelpumpenausfall w\u00e4hrend der Bearbeitung; Werkzeug\u00fcberhitzung',
    l29: 'Endschalterausfall; Unbeteiligte in der N\u00e4he der Maschine',
    l30: 'Maschinenreinigung nach der Schicht; manuelle Spanentnahme ohne Haken',
    l31: 'Monatlicher F\u00fchrungsbahnenwechsel; \u00d6lauslauf auf den Boden',
    l32: 'Backenwechsel ohne LOTO; Spindel kann versehentlich anlaufen',
    l33: 'Hydrauliksystemservice; Druckleitungen unter Restdruck',
    l34: 'Maschinendemontage vor der Verschrottung; schwere Teile ohne Kran',
  },
  fr: {
    l01: "Op\u00e9rateur ouvre la protection de broche pendant la rotation\u00a0; distance \u00e0 la broche < 0,5\u00a0m",
    l02: "Usinage normal\u00a0; op\u00e9rateur debout \u00e0 0,5\u20131,5\u00a0m devant la machine",
    l03: "Changement manuel d\u2019outil broche arr\u00eat\u00e9e\u00a0; contact avec le tranchant",
    l04: "R\u00e9glage du chariot \u00e0 faible vitesse d\u2019avance\u00a0; mains pr\u00e8s du chariot",
    l05: "Usinage d\u2019une longue barre L/D > 4 sans lunette\u00a0; vitesse > 500 tr/min",
    l06: "Service armoire \u00e9lectrique sous tension\u00a0; acc\u00e8s \u00e0 l\u2019armoire",
    l07: "Lancement du cycle CNC par l\u2019op\u00e9rateur\u00a0; erreur de jauge ou de programme",
    l08: "Contact cutan\u00e9 quotidien avec le liquide de refroidissement\u00a0; sans gants",
    l09: "Travail avec refroidissement intensif\u00a0; op\u00e9rateur sans masque dans la zone de brouillard",
    l10: "Travail continu > 4h\u00a0; niveau de bruit 88\u201395\u00a0dB(A) sans protection auditive",
    l11: "Travail avec mandrin d\u00e9s\u00e9quilibr\u00e9\u00a0; niveau de vibration A(8) > 2,5\u00a0m/s\u00b2",
    l12: "Debout \u00e0 la machine > 6h sans tapis\u00a0; posture fl\u00e9chie du corps",
    l13: "Accumulation de copeaux et vapeurs de liquide\u00a0; \u00e9tincelle de l\u2019outil",
    l14: "Transport par pont roulant\u00a0; masse machine > 3t\u00a0; personnes dans un rayon de 5\u00a0m",
    l15: "Mise \u00e0 niveau avec cales\u00a0; machine instable avant ancrage",
    l16: "Raccordement des c\u00e2bles d\u2019alimentation 400V\u00a0; sans coupure principale",
    l17: "Premier d\u00e9marrage sans pi\u00e8ce\u00a0; v\u00e9rification du sens de rotation",
    l18: "Chargement d\u2019un nouveau programme NC\u00a0; pas de marche \u00e0 vide\u00a0; vitesse \u00e0 100%",
    l19: "Travail avec mandrin hydraulique\u00a0; panne de pompe hydraulique pendant l\u2019usinage",
    l20: "Changement automatique d\u2019outil\u00a0; op\u00e9rateur pr\u00e8s de la porte ouverte",
    l21: "Service en mode JOG\u00a0; op\u00e9rateur dans la zone de travail sous tension",
    l22: "Usinage grande vitesse\u00a0; fissure de fatigue dans le mandrin pendant la rotation",
    l23: "Premier passage d\u2019un nouveau programme\u00a0; erreur de jauge d\u2019outil",
    l24: "Usinage d\u2019alliage de magn\u00e9sium\u00a0; liquide \u00e0 base d\u2019huile\u00a0; temp\u00e9rature > 400\u00b0C",
    l25: "Travail en soir\u00e9e\u00a0; \u00e9clairage local insuffisant\u00a0; mauvaise lecture de l\u2019affichage",
    l26: "Perte de courant\u00a0; protection ouverte\u00a0; op\u00e9rateur dans la zone de travail",
    l27: "Activation E-stop\u00a0; op\u00e9rateur ouvre la protection avant l\u2019arr\u00eat complet",
    l28: "Panne de pompe de liquide de refroidissement pendant l\u2019usinage\u00a0; surchauffe de l\u2019outil",
    l29: "D\u00e9faillance du fin de course\u00a0; personnes \u00e0 proximit\u00e9 de la machine",
    l30: "Nettoyage machine apr\u00e8s le quart\u00a0; \u00e9vacuation manuelle des copeaux sans crochet",
    l31: "Vidange mensuelle de l\u2019huile de glissi\u00e8res\u00a0; d\u00e9versement d\u2019huile sur le sol",
    l32: "Remplacement des mors sans LOTO\u00a0; la broche peut d\u00e9marrer accidentellement",
    l33: "Service circuit hydraulique\u00a0; conduites sous pression r\u00e9siduelle",
    l34: "D\u00e9montage machine avant mise au rebut\u00a0; \u00e9l\u00e9ments lourds sans pont roulant",
  },
  it: {
    l01: "Operatore apre la protezione del mandrino durante la rotazione; distanza dal mandrino < 0,5 m",
    l02: "Lavorazione normale; operatore in piedi davanti alla macchina a 0,5\u20131,5 m",
    l03: "Cambio utensile manuale con mandrino fermo; contatto con il tagliente",
    l04: "Regolazione della slitta a bassa velocit\u00e0 di avanzamento; mani vicino alla slitta",
    l05: "Lavorazione di barra lunga L/D > 4 senza lunetta; velocit\u00e0 > 500 giri/min",
    l06: "Assistenza quadro elettrico con tensione inserita; accesso al quadro",
    l07: "Avvio del ciclo CNC dall\u2019operatore; errore di offset utensile o di programma",
    l08: "Contatto cutaneo giornaliero con il refrigerante; senza guanti protettivi",
    l09: "Lavoro con raffreddamento intensivo; operatore senza maschera nella zona nebbia",
    l10: "Lavoro continuo > 4h; livello di rumore 88\u201395 dB(A) senza protezione uditiva",
    l11: "Lavoro con mandrino non bilanciato; livello di vibrazione A(8) > 2,5 m/s\u00b2",
    l12: "In piedi alla macchina > 6h senza tappeto; postura flessa del corpo",
    l13: "Accumulo di trucioli e vapori di refrigerante; scintilla dall\u2019utensile",
    l14: "Trasporto con carroponte; peso macchina > 3t; persone nel raggio di 5 m",
    l15: "Livellamento con cunei; macchina instabile prima dell\u2019ancoraggio",
    l16: "Collegamento cavi di alimentazione 400V; senza sezionatore principale",
    l17: "Primo avviamento senza pezzo; verifica del senso di rotazione",
    l18: "Caricamento di un nuovo programma NC; senza prova a vuoto; velocit\u00e0 al 100%",
    l19: "Lavoro con mandrino idraulico; guasto della pompa idraulica durante la lavorazione",
    l20: "Cambio utensile automatico; operatore vicino alla porta aperta",
    l21: "Assistenza in modalit\u00e0 JOG; operatore nella zona di lavoro con tensione inserita",
    l22: "Lavorazione ad alta velocit\u00e0; cricca da fatica nel mandrino durante la rotazione",
    l23: "Primo passaggio di un nuovo programma; errore di offset utensile",
    l24: "Lavorazione di lega di magnesio; refrigerante a base di olio; temperatura > 400\u00b0C",
    l25: "Lavoro serale; illuminazione locale inadeguata; lettura errata del display",
    l26: "Interruzione di corrente; protezione aperta; operatore nella zona di lavoro",
    l27: "Attivazione E-stop; operatore apre la protezione prima dell\u2019arresto completo",
    l28: "Guasto della pompa del refrigerante durante la lavorazione; surriscaldamento dell\u2019utensile",
    l29: "Guasto del finecorsa; persone nei pressi della macchina",
    l30: "Pulizia macchina dopo il turno; rimozione manuale dei trucioli senza gancio",
    l31: "Cambio mensile dell\u2019olio delle guide; fuoriuscita di olio sul pavimento",
    l32: "Sostituzione griffe senza LOTO; il mandrino pu\u00f2 avviarsi accidentalmente",
    l33: "Assistenza sistema idraulico; condutture sotto pressione residua",
    l34: "Smontaggio macchina prima della rottamazione; parti pesanti senza carroponte",
  },
  es: {
    l01: "Operador abre la protecci\u00f3n del husillo durante la rotaci\u00f3n; distancia al husillo < 0,5 m",
    l02: "Mecanizado normal; operador de pie frente a la m\u00e1quina a 0,5\u20131,5 m",
    l03: "Cambio manual de herramienta con husillo parado; contacto con el filo",
    l04: "Ajuste del carro a baja velocidad de avance; manos cerca del carro",
    l05: "Mecanizado de barra larga L/D > 4 sin luneta; velocidad > 500 rpm",
    l06: "Servicio en armario el\u00e9ctrico con tensi\u00f3n; acceso al armario",
    l07: "Inicio del ciclo CNC por el operador; error de offset de herramienta o de programa",
    l08: "Contacto cut\u00e1neo diario con el refrigerante; sin guantes protectores",
    l09: "Trabajo con refrigeraci\u00f3n intensa; operador sin m\u00e1scara en la zona de niebla",
    l10: "Trabajo continuo > 4h; nivel de ruido 88\u201395 dB(A) sin protecci\u00f3n auditiva",
    l11: "Trabajo con mandril desequilibrado; nivel de vibraci\u00f3n A(8) > 2,5 m/s\u00b2",
    l12: "De pie en la m\u00e1quina > 6h sin alfombrilla; postura corporal flexionada",
    l13: "Acumulaci\u00f3n de virutas y vapores de refrigerante; chispa de la herramienta",
    l14: "Transporte con gr\u00faa; peso de la m\u00e1quina > 3t; personas en radio de 5 m",
    l15: "Nivelaci\u00f3n con cu\u00f1as; m\u00e1quina inestable antes del anclaje",
    l16: "Conexi\u00f3n de cables de alimentaci\u00f3n 400V; sin corte principal",
    l17: "Primera puesta en marcha sin pieza; comprobaci\u00f3n del sentido de giro",
    l18: "Carga de nuevo programa NC; sin marcha en vac\u00edo; velocidad al 100%",
    l19: "Trabajo con mandril hidr\u00e1ulico; fallo de la bomba hidr\u00e1ulica durante el mecanizado",
    l20: "Cambio autom\u00e1tico de herramienta; operador cerca de la puerta abierta",
    l21: "Servicio en modo JOG; operador en la zona de trabajo con tensi\u00f3n",
    l22: "Mecanizado de alta velocidad; grieta de fatiga en el mandril durante la rotaci\u00f3n",
    l23: "Primer paso de nuevo programa; error de offset de herramienta",
    l24: "Mecanizado de aleaci\u00f3n de magnesio; refrigerante de base aceite; temperatura > 400\u00b0C",
    l25: "Trabajo nocturno; iluminaci\u00f3n local insuficiente; lectura err\u00f3nea del display",
    l26: "Corte de corriente; protecci\u00f3n abierta; operador en la zona de trabajo",
    l27: "Activaci\u00f3n E-stop; operador abre la protecci\u00f3n antes de la parada completa",
    l28: "Fallo de la bomba de refrigerante durante el mecanizado; sobrecalentamiento de la herramienta",
    l29: "Fallo de final de carrera; personas cerca de la m\u00e1quina",
    l30: "Limpieza de la m\u00e1quina tras el turno; retirada manual de virutas sin gancho",
    l31: "Cambio mensual de aceite de gu\u00edas; derrame de aceite en el suelo",
    l32: "Sustituci\u00f3n de mordazas sin LOTO; el husillo puede arrancar accidentalmente",
    l33: "Servicio del sistema hidr\u00e1ulico; conducciones bajo presi\u00f3n residual",
    l34: "Desmontaje de la m\u00e1quina antes del desguace; piezas pesadas sin gr\u00faa",
  },
  cs: {
    l01: "Obsluha otev\u00edr\u00e1 ochranu vretena b\u011bhem ot\u00e1\u010den\u00ed; vzd\u00e1lenost od vretena < 0,5 m",
    l02: "Norm\u00e1ln\u00ed obr\u00e1b\u011bn\u00ed; obsluha stoj\u00ed p\u0159ed strojem ve vzd\u00e1lenosti 0,5\u20131,5 m",
    l03: "Ru\u010dn\u00ed v\u00fdm\u011bna n\u00e1stroje p\u0159i zastaven\u00e9m vretenu; kontakt s \u0159eznou hranou",
    l04: "Nastaven\u00ed suportu p\u0159i n\u00edzk\u00e9 rychlosti posuvu; ruce v bl\u00edzk\u00f3sti suportu",
    l05: "Obr\u00e1b\u011bn\u00ed dlouh\u00e9 ty\u010de L/D > 4 bez lunetky; ot\u00e1\u010dky > 500 ot/min",
    l06: "Servis rozva\u010d\u011b\u010de p\u0159i zapnut\u00e9m nap\u00e1jen\u00ed; p\u0159\u00edstup k rozva\u010d\u011b\u010di",
    l07: "Spu\u0161t\u011bn\u00ed CNC cyklu obsluhou; chyba korekce n\u00e1stroje nebo programu",
    l08: "Denn\u00ed kontakt k\u016f\u017ee s chladicen\u00e1 kapalinou; bez ochrann\u00fdch rukavic",
    l09: "Pr\u00e1ce s intenzivn\u00edm chlazen\u00edm; obsluha bez masky v z\u00f3n\u011b mlhy",
    l10: "Nep\u0159etr\u017eit\u00e1 pr\u00e1ce > 4h; hladina hluku 88\u201395 dB(A) bez chrani\u010d\u016f sluchu",
    l11: "Pr\u00e1ce s nevyv\u00e1\u017een\u00fdm sklicidlem; \u00farove\u0148 vibrac\u00ed A(8) > 2,5 m/s\u00b2",
    l12: "St\u00e1n\u00ed u stroje > 6h bez podl\u00e1\u017eky; ohnut\u00e1 poloha t\u011bla",
    l13: "Hromad\u011bn\u00ed t\u0159\u00edsek a v\u00fdpar\u016f chladicen\u00e9 kapaliny; jisk\u0159eni\u00ed z n\u00e1stroje",
    l14: "P\u0159eprava je\u0159\u00e1bem; hmotnost stroje > 3t; osoby v okruhu 5 m",
    l15: "Vyrovn\u00e1n\u00ed kl\u00edny; stroj nestabiln\u00ed p\u0159ed ukotven\u00edm",
    l16: "P\u0159ipojen\u00ed nap\u00e1jec\u00edch kabel\u016f 400V; bez hlavn\u00edho odpojen\u00ed",
    l17: "Prvn\u00ed spu\u0161t\u011bn\u00ed bez obrobku; ov\u011b\u0159en\u00ed sm\u011bru ot\u00e1\u010den\u00ed",
    l18: "Na\u010dten\u00ed nov\u00e9ho NC programu; bez zku\u0161ebn\u00edho chodu; rychlost na 100%",
    l19: "Pr\u00e1ce s hydraulick\u00fdm sklicidlem; porucha hydraulick\u00e9ho \u010derpadla b\u011bhem obr\u00e1b\u011bn\u00ed",
    l20: "Automatick\u00e1 v\u00fdm\u011bna n\u00e1stroje; obsluha bl\u00edzko otev\u0159en\u00fdch dve\u0159\u00ed",
    l21: "Servis v re\u017eimu JOG; obsluha v pracovn\u00ed z\u00f3n\u011b p\u0159i zapnut\u00e9m nap\u00e1jen\u00ed",
    l22: "Vysok\u00e9 ot\u00e1\u010dky obr\u00e1b\u011bn\u00ed; \u00fanavov\u00e1 trhlina v sklicidle b\u011bhem ot\u00e1\u010den\u00ed",
    l23: "Prvn\u00ed pr\u016fchod nov\u00e9ho programu; chyba korekce n\u00e1stroje",
    l24: "Obr\u00e1b\u011bn\u00ed slitiny ho\u010d\u00edku; olejov\u00e9 chladicen\u00e1 kapalina; teplota > 400\u00b0C",
    l25: "Ve\u010dern\u00ed pr\u00e1ce; nedostate\u010dn\u00e9 m\u00edstn\u00ed osv\u011btlen\u00ed; \u0161patn\u00e9 \u010dten\u00ed displeje",
    l26: "V\u00fdpadek nap\u00e1jen\u00ed; ochrana otev\u0159en\u00e1; obsluha v pracovn\u00ed z\u00f3n\u011b",
    l27: "Aktivace n\u00f3dz.zastaven\u00ed; obsluha otev\u00edr\u00e1 ochranu p\u0159ed pln\u00fdm zastaven\u00edm",
    l28: "Porucha \u010derpadla chladicen\u00e9 kapaliny b\u011bhem obr\u00e1b\u011bn\u00ed; p\u0159eh\u0159\u00e1t\u00ed n\u00e1stroje",
    l29: "Porucha koncov\u00e9ho sp\u00edna\u010de; osoby v bl\u00edzk\u00f3sti stroje",
    l30: "Čišt\u011bn\u00ed stroje po sm\u011bn\u011b; ru\u010dn\u00ed odstra\u0148ov\u00e1n\u00ed t\u0159\u00edsek bez h\u00e1\u010dku",
    l31: "M\u011bs\u00ed\u010dn\u00ed v\u00fdm\u011bna oleje veden\u00ed; roz\u00edl\u00e1n\u00ed oleje na podlahu",
    l32: "V\u00fdm\u011bna \u010delust\u00ed bez LOTO; vreteno se m\u016f\u017ee n\u00e1hodn\u011b rozb\u011bhnout",
    l33: "Servis hydraulick\u00e9ho syst\u00e9mu; potrub\u00ed pod zbytkovou tlak",
    l34: "Demont\u00e1\u017e stroje p\u0159ed srotov\u00e1n\u00edm; t\u011b\u017dk\u00e9 d\u00edly bez je\u0159\u00e1bu",
  },
};

// Add scenario to each language section for lathe-cnc
for (const [lang, scenarioMap] of Object.entries(scenarios)) {
  for (const [id, scenario] of Object.entries(scenarioMap)) {
    // Find the threat entry for this lang and id
    // Pattern: l01: { element: '...', threat: '...', effect: '...' }
    // We need to find it within the correct language block
    
    // Find all occurrences of this id in the correct language context
    const searchStr = `${id}: { element: '`;
    let searchIdx = 0;
    let found = false;
    
    while (true) {
      const idx = c.indexOf(searchStr, searchIdx);
      if (idx === -1) break;
      
      // Check if this is in the correct language block by looking back
      const precedingText = c.slice(Math.max(0, idx - 500), idx);
      
      // For each lang, we need to find the right one
      // The language blocks are nested: 'lathe-cnc': { pl: {...}, en: {...}, ... }
      // We check if the nearest language marker before this id matches
      const langMarkers = ['pl:', 'en:', 'de:', 'fr:', 'it:', 'es:', 'cs:'];
      let nearestLang = '';
      let nearestPos = -1;
      for (const marker of langMarkers) {
        const mIdx = precedingText.lastIndexOf(`\n    ${marker}`);
        if (mIdx > nearestPos) {
          nearestPos = mIdx;
          nearestLang = marker.replace(':', '');
        }
      }
      
      if (nearestLang === lang) {
        // Find end of this entry and add scenario
        const entryEnd = c.indexOf('}', idx);
        const entryChunk = c.slice(idx, entryEnd);
        if (!entryChunk.includes('scenario:')) {
          c = c.slice(0, entryEnd) + `, scenario: '${scenario.replace(/'/g, '\u2019')}' ` + c.slice(entryEnd);
          found = true;
        }
        break;
      }
      searchIdx = idx + 1;
    }
    
    if (!found) {
      // Try simpler approach - just count occurrences and match by order
    }
  }
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/i18n/machinesI18n.ts', c, 'utf8');

// Verify
const enCount = (c.match(/scenario: '.*?' /g) || []).length;
console.log('scenarios added:', enCount);
console.log('en l01:', c.includes("Operator opens spindle guard"));