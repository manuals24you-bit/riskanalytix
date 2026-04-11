const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/i18n/machinesI18n.ts', 'utf8');

// New entries to add after lc07 for each language
const newEntries = {
  en: `
        lc08: { element: 'Spindle / gearbox', threat: 'Noise > 85 dB(A)', effect: 'Permanent hearing loss', scenario: 'Continuous work > 4h at 85-95 dB(A) without hearing protection' },
        lc09: { element: 'Coolant / emulsion', threat: 'Skin contact / vapour inhalation', effect: 'Dermatosis, respiratory disease', scenario: 'Daily skin contact with emulsion coolant; no gloves' },
        lc10: { element: 'Operator workstation', threat: 'Forced posture / standing > 6h', effect: 'Musculoskeletal disorders', scenario: 'Standing at machine > 6h without anti-fatigue mat' },
        lc11: { element: '4-jaw chuck / eccentric workpiece', threat: 'Vibration from unbalanced workpiece', effect: 'Vibration syndrome (Raynaud)', scenario: 'Working with unbalanced workpiece in 4-jaw chuck' },
        lc12: { element: 'Hot chips / coolant', threat: 'Fire from coolant vapour ignition', effect: 'Machine fire, burns', scenario: 'Chip and coolant vapour accumulation; spark from chuck' },
        lc13: { element: 'Machine transport (crane)', threat: 'Fall / toppling of machine', effect: 'Crushing of persons', scenario: 'Transport by crane; weight > 1.5t; persons nearby' },
        lc14: { element: 'Installation / levelling', threat: 'Slip / topple during setup', effect: 'Crushing of limbs', scenario: 'Levelling with wedges; machine unstable before anchoring' },
        lc15: { element: 'Electrical connection (400V)', threat: 'Electric shock during connection', effect: 'Burns, death', scenario: 'Connecting 400V without licensed electrician' },
        lc16: { element: 'First start-up', threat: 'Wrong spindle rotation direction', effect: 'Ejection of workpiece or tool', scenario: 'First start after delivery; checking rotation without workpiece' },
        lc17: { element: 'Speed change mechanism', threat: 'Accidental start during gear change', effect: 'Hand injury', scenario: 'Speed change via gear wheels with drive running' },
        lc18: { element: 'Gearbox / headstock', threat: 'Contact with rotating shafts during service', effect: 'Entanglement of limb', scenario: 'Gearbox service with open housing; shafts rotating' },
        lc19: { element: 'Drive belts / gears', threat: 'Entanglement during replacement', effect: 'Hand injury, amputation', scenario: 'Replacing gears/V-belts without LOTO' },
        lc20: { element: 'Machine cleaning / chip removal', threat: 'Cut from sharp metal chips', effect: 'Lacerated hands', scenario: 'Machine cleaning after shift; manual chip removal without hook' },
        lc21: { element: 'Oil change / maintenance fluids', threat: 'Skin contact with machine oil', effect: 'Dermatosis, poisoning', scenario: 'Gearbox oil change with oil spilled on floor' },
        lc22: { element: 'Spindle bearing adjustment', threat: 'Entanglement during live adjustment', effect: 'Hand injury', scenario: 'Spindle bearing adjustment with machine running' },
        lc23: { element: 'Chuck jaw replacement', threat: 'Crushing of fingers by jaws', effect: 'Crushed fingers', scenario: 'Chuck jaw replacement without spindle lock' },
        lc24: { element: 'Hydraulic coolant system', threat: 'Hydraulic oil injection under pressure', effect: 'Oil injection under skin', scenario: 'Coolant hydraulic service under residual pressure' },
        lc25: { element: 'Dismantling / scrapping', threat: 'Fall of heavy components', effect: 'Crushing, death', scenario: 'Lathe dismantling before scrapping; heavy parts without crane' },`,
  de: `
        lc08: { element: 'Spindel / Getriebe', threat: 'Lärm > 85 dB(A)', effect: 'Dauerhafter Hörverlust', scenario: 'Dauerbetrieb > 4h bei 85-95 dB(A) ohne Gehörschutz' },
        lc09: { element: 'Kühlmittel / Emulsion', threat: 'Hautkontakt / Dampfeinatmung', effect: 'Dermatose, Atemwegserkrankung', scenario: 'Täglicher Hautkontakt mit Emulsionskühlmittel; keine Handschuhe' },
        lc10: { element: 'Bedienerarbeitsplatz', threat: 'Erzwungene Haltung / Stehen > 6h', effect: 'Muskel-Skelett-Erkrankungen', scenario: 'Stehen an Maschine > 6h ohne Ermüdungsschutzmatte' },
        lc11: { element: '4-Backen-Futter / exzentrisches Werkstück', threat: 'Vibration durch unwuchtiges Werkstück', effect: 'Vibrationssyndrom (Raynaud)', scenario: 'Arbeit mit unwuchtigem Werkstück im 4-Backen-Futter' },
        lc12: { element: 'Heiße Späne / Kühlmittel', threat: 'Brand durch Kühlmitteldampfentzündung', effect: 'Maschinenbrand, Verbrennungen', scenario: 'Späne- und Kühlmitteldampfansammlung; Funke vom Futter' },
        lc13: { element: 'Maschinentransport (Kran)', threat: 'Sturz / Umkippen der Maschine', effect: 'Quetschung von Personen', scenario: 'Transport mit Kran; Gewicht > 1,5t; Personen in der Nähe' },
        lc14: { element: 'Installation / Ausrichten', threat: 'Rutschen / Umkippen beim Aufstellen', effect: 'Quetschung der Gliedmaßen', scenario: 'Ausrichten mit Keilen; Maschine instabil vor Verankerung' },
        lc15: { element: 'Elektroanschluss (400V)', threat: 'Stromschlag beim Anschluss', effect: 'Verbrennungen, Tod', scenario: 'Anschluss 400V ohne zugelassenen Elektriker' },
        lc16: { element: 'Erstinbetriebnahme', threat: 'Falsche Spindeldrehrichtung', effect: 'Ausschleudern von Werkstück', scenario: 'Erststart nach Lieferung; Drehrichtung ohne Werkstück prüfen' },
        lc17: { element: 'Drehzahlwechsel', threat: 'Unbeabsichtigter Start beim Gangwechsel', effect: 'Handverletzung', scenario: 'Drehzahlwechsel über Zahnräder bei laufendem Antrieb' },
        lc18: { element: 'Getriebe / Spindelstock', threat: 'Kontakt mit drehenden Wellen beim Service', effect: 'Einzug der Gliedmaßen', scenario: 'Getriebeservice mit offenem Gehäuse; Wellen drehen sich' },
        lc19: { element: 'Antriebsriemen / Zahnräder', threat: 'Einzug beim Wechsel', effect: 'Handverletzung, Amputation', scenario: 'Zahnrad/Keilriemen wechseln ohne LOTO' },
        lc20: { element: 'Maschinenreinigung / Spanentnahme', threat: 'Schnitt durch scharfe Metallspäne', effect: 'Schnittwunden an Händen', scenario: 'Maschinenreinigung nach Schicht; manuelle Spanentnahme ohne Haken' },
        lc21: { element: 'Ölwechsel / Betriebsstoffe', threat: 'Hautkontakt mit Maschinenöl', effect: 'Dermatose, Vergiftung', scenario: 'Getriebeölwechsel mit ausgelaufenem Öl auf dem Boden' },
        lc22: { element: 'Spindellagereinstellung', threat: 'Einzug bei laufender Einstellung', effect: 'Handverletzung', scenario: 'Spindellagereinstellung bei laufender Maschine' },
        lc23: { element: 'Backenwechsel', threat: 'Quetschung der Finger durch Backen', effect: 'Gequetschte Finger', scenario: 'Backenwechsel ohne Spindelarretierung' },
        lc24: { element: 'Hydraulisches Kühlmittelsystem', threat: 'Hydrauliköleinspritzung unter Druck', effect: 'Ölinjektion unter die Haut', scenario: 'Kühlmittelhydraulikservice unter Restdruck' },
        lc25: { element: 'Demontage / Verschrottung', threat: 'Sturz schwerer Bauteile', effect: 'Quetschung, Tod', scenario: 'Drehmaschine demontieren vor Verschrottung; schwere Teile ohne Kran' },`,
  fr: `
        lc08: { element: 'Broche / boîte de vitesses', threat: 'Bruit > 85 dB(A)', effect: 'Surdité permanente', scenario: 'Travail continu > 4h à 85-95 dB(A) sans protection auditive' },
        lc09: { element: 'Liquide de coupe / émulsion', threat: 'Contact cutané / inhalation vapeurs', effect: 'Dermatose, maladie respiratoire', scenario: 'Contact cutané quotidien avec liquide émulsifié; sans gants' },
        lc10: { element: 'Poste opérateur', threat: 'Posture forcée / station debout > 6h', effect: 'Troubles musculo-squelettiques', scenario: 'Debout à la machine > 6h sans tapis anti-fatigue' },
        lc11: { element: 'Mandrin 4 mors / pièce excentrée', threat: 'Vibrations pièce déséquilibrée', effect: 'Syndrome vibratoire (Raynaud)', scenario: 'Travail avec pièce déséquilibrée en mandrin 4 mors' },
        lc12: { element: 'Copeaux chauds / liquide', threat: 'Incendie par inflammation vapeurs', effect: 'Incendie machine, brûlures', scenario: 'Accumulation copeaux et vapeurs; étincelle du mandrin' },
        lc13: { element: 'Transport machine (pont)', threat: 'Chute / renversement machine', effect: 'Écrasement personnes', scenario: 'Transport par grue; masse > 1,5t; personnes à proximité' },
        lc14: { element: 'Installation / mise à niveau', threat: 'Glissade / renversement installation', effect: 'Écrasement membres', scenario: 'Mise à niveau avec cales; machine instable avant ancrage' },
        lc15: { element: 'Raccordement électrique (400V)', threat: 'Électrocution lors du raccordement', effect: 'Brûlures, mort', scenario: 'Raccordement 400V sans électricien habilité' },
        lc16: { element: 'Première mise en service', threat: 'Mauvais sens de rotation broche', effect: 'Éjection pièce ou outil', scenario: 'Premier démarrage après livraison; vérification sens rotation sans pièce' },
        lc17: { element: 'Changement de vitesse', threat: 'Démarrage accidentel changement vitesse', effect: 'Blessure main', scenario: 'Changement vitesse par engrenages avec entraînement en marche' },
        lc18: { element: 'Boîte de vitesses / poupée', threat: 'Contact arbres tournants service', effect: 'Entraînement membre', scenario: 'Service boîte de vitesses avec carter ouvert; arbres en rotation' },
        lc19: { element: 'Courroies / engrenages', threat: 'Entraînement lors remplacement', effect: 'Blessure main, amputation', scenario: 'Remplacement engrenages/courroies sans LOTO' },
        lc20: { element: 'Nettoyage / enlèvement copeaux', threat: 'Coupure par copeaux métalliques', effect: 'Plaies mains', scenario: 'Nettoyage machine après poste; enlèvement manuel copeaux sans crochet' },
        lc21: { element: 'Vidange huile / fluides', threat: 'Contact cutané huile machine', effect: 'Dermatose, intoxication', scenario: 'Vidange huile boîte avec huile répandue sur le sol' },
        lc22: { element: 'Réglage roulements broche', threat: 'Entraînement réglage en marche', effect: 'Blessure main', scenario: 'Réglage roulements broche avec machine en marche' },
        lc23: { element: 'Remplacement mors mandrin', threat: 'Écrasement doigts par mors', effect: 'Doigts écrasés', scenario: 'Remplacement mors sans blocage broche' },
        lc24: { element: 'Circuit hydraulique liquide', threat: 'Injection huile hydraulique sous pression', effect: 'Injection huile sous la peau', scenario: 'Service hydraulique liquide de refroidissement sous pression résiduelle' },
        lc25: { element: 'Démontage / mise au rebut', threat: 'Chute éléments lourds', effect: 'Écrasement, mort', scenario: 'Démontage tour avant ferraillage; parties lourdes sans pont roulant' },`,
  it: `
        lc08: { element: 'Mandrino / cambio', threat: 'Rumore > 85 dB(A)', effect: 'Perdita uditiva permanente', scenario: 'Lavoro continuo > 4h a 85-95 dB(A) senza protezione uditiva' },
        lc09: { element: 'Refrigerante / emulsione', threat: 'Contatto cutaneo / inalazione vapori', effect: 'Dermatosi, malattia respiratoria', scenario: 'Contatto cutaneo giornaliero con emulsione refrigerante; senza guanti' },
        lc10: { element: 'Postazione operatore', threat: 'Postura forzata / stazione eretta > 6h', effect: 'Disturbi muscoloscheletrici', scenario: 'In piedi alla macchina > 6h senza tappeto anti-fatica' },
        lc11: { element: 'Mandrino 4 griffe / pezzo eccentrico', threat: 'Vibrazioni pezzo non bilanciato', effect: 'Sindrome vibratoria (Raynaud)', scenario: 'Lavoro con pezzo non bilanciato nel mandrino a 4 griffe' },
        lc12: { element: 'Trucioli caldi / refrigerante', threat: 'Incendio da accensione vapori', effect: 'Incendio macchina, ustioni', scenario: 'Accumulo trucioli e vapori refrigerante; scintilla dal mandrino' },
        lc13: { element: 'Trasporto macchina (carroponte)', threat: 'Caduta / ribaltamento macchina', effect: 'Schiacciamento persone', scenario: 'Trasporto con carroponte; peso > 1,5t; persone nelle vicinanze' },
        lc14: { element: 'Installazione / livellamento', threat: 'Scivolamento / ribaltamento installazione', effect: 'Schiacciamento arti', scenario: 'Livellamento con cunei; macchina instabile prima ancoraggio' },
        lc15: { element: 'Collegamento elettrico (400V)', threat: 'Folgorazione durante collegamento', effect: 'Ustioni, morte', scenario: 'Collegamento 400V senza elettricista abilitato' },
        lc16: { element: 'Primo avviamento', threat: 'Senso rotazione mandrino errato', effect: 'Proiezione pezzo o utensile', scenario: 'Primo avviamento dopo consegna; verifica senso rotazione senza pezzo' },
        lc17: { element: 'Cambio velocità', threat: 'Avviamento accidentale cambio marcia', effect: 'Lesione mano', scenario: 'Cambio velocità tramite ingranaggi con azionamento in moto' },
        lc18: { element: 'Cambio / testa mandrino', threat: 'Contatto alberi rotanti durante servizio', effect: 'Trascinamento arto', scenario: 'Servizio cambio con carter aperto; alberi in rotazione' },
        lc19: { element: 'Cinghie / ingranaggi', threat: 'Trascinamento durante sostituzione', effect: 'Lesione mano, amputazione', scenario: 'Sostituzione ingranaggi/cinghie senza LOTO' },
        lc20: { element: 'Pulizia / rimozione trucioli', threat: 'Taglio da trucioli metallici', effect: 'Ferite lacero-contuse mani', scenario: 'Pulizia macchina dopo turno; rimozione manuale trucioli senza gancio' },
        lc21: { element: 'Cambio olio / fluidi', threat: 'Contatto cutaneo con olio macchina', effect: 'Dermatosi, avvelenamento', scenario: 'Cambio olio cambio con olio versato sul pavimento' },
        lc22: { element: 'Regolazione cuscinetti mandrino', threat: 'Trascinamento durante regolazione', effect: 'Lesione mano', scenario: 'Regolazione cuscinetti mandrino con macchina in moto' },
        lc23: { element: 'Sostituzione griffe mandrino', threat: 'Schiacciamento dita dalle griffe', effect: 'Dita schiacciate', scenario: 'Sostituzione griffe senza blocco mandrino' },
        lc24: { element: 'Sistema idraulico refrigerante', threat: 'Iniezione olio idraulico in pressione', effect: 'Iniezione olio sotto cute', scenario: 'Servizio idraulico refrigerante sotto pressione residua' },
        lc25: { element: 'Smontaggio / rottamazione', threat: 'Caduta elementi pesanti', effect: 'Schiacciamento, morte', scenario: 'Smontaggio tornio prima rottamazione; parti pesanti senza carroponte' },`,
  es: `
        lc08: { element: 'Husillo / caja de cambios', threat: 'Ruido > 85 dB(A)', effect: 'Pérdida auditiva permanente', scenario: 'Trabajo continuo > 4h a 85-95 dB(A) sin protección auditiva' },
        lc09: { element: 'Refrigerante / emulsión', threat: 'Contacto cutáneo / inhalación vapores', effect: 'Dermatosis, enfermedad respiratoria', scenario: 'Contacto cutáneo diario con emulsión refrigerante; sin guantes' },
        lc10: { element: 'Puesto operario', threat: 'Postura forzada / bipedestación > 6h', effect: 'Trastornos musculoesqueléticos', scenario: 'De pie en la máquina > 6h sin alfombrilla anti-fatiga' },
        lc11: { element: 'Mandril 4 garras / pieza excéntrica', threat: 'Vibraciones pieza desequilibrada', effect: 'Síndrome vibratorio (Raynaud)', scenario: 'Trabajo con pieza desequilibrada en mandril 4 garras' },
        lc12: { element: 'Virutas calientes / refrigerante', threat: 'Incendio por ignición vapores', effect: 'Incendio máquina, quemaduras', scenario: 'Acumulación virutas y vapores; chispa del mandril' },
        lc13: { element: 'Transporte máquina (grúa)', threat: 'Caída / vuelco máquina', effect: 'Aplastamiento personas', scenario: 'Transporte con grúa; peso > 1,5t; personas cercanas' },
        lc14: { element: 'Instalación / nivelación', threat: 'Deslizamiento / vuelco instalación', effect: 'Aplastamiento miembros', scenario: 'Nivelación con cuñas; máquina inestable antes anclaje' },
        lc15: { element: 'Conexión eléctrica (400V)', threat: 'Electrocución durante conexión', effect: 'Quemaduras, muerte', scenario: 'Conexión 400V sin electricista habilitado' },
        lc16: { element: 'Primera puesta en marcha', threat: 'Sentido de giro husillo incorrecto', effect: 'Proyección pieza o herramienta', scenario: 'Primera puesta en marcha tras entrega; verificación giro sin pieza' },
        lc17: { element: 'Cambio de velocidad', threat: 'Arranque accidental cambio marcha', effect: 'Lesión mano', scenario: 'Cambio velocidad por engranajes con accionamiento en marcha' },
        lc18: { element: 'Caja velocidades / cabezal', threat: 'Contacto ejes girando servicio', effect: 'Arrastre miembro', scenario: 'Servicio caja velocidades con cárter abierto; ejes girando' },
        lc19: { element: 'Correas / engranajes', threat: 'Arrastre durante sustitución', effect: 'Lesión mano, amputación', scenario: 'Sustitución engranajes/correas sin LOTO' },
        lc20: { element: 'Limpieza / retirada virutas', threat: 'Corte por virutas metálicas', effect: 'Heridas manos', scenario: 'Limpieza máquina tras turno; retirada manual virutas sin gancho' },
        lc21: { element: 'Cambio aceite / fluidos', threat: 'Contacto cutáneo aceite máquina', effect: 'Dermatosis, intoxicación', scenario: 'Cambio aceite caja con aceite derramado en suelo' },
        lc22: { element: 'Regulación rodamientos husillo', threat: 'Arrastre durante regulación', effect: 'Lesión mano', scenario: 'Regulación rodamientos husillo con máquina en marcha' },
        lc23: { element: 'Sustitución mordazas mandril', threat: 'Aplastamiento dedos por mordazas', effect: 'Dedos aplastados', scenario: 'Sustitución mordazas sin bloqueo husillo' },
        lc24: { element: 'Sistema hidráulico refrigerante', threat: 'Inyección aceite hidráulico presión', effect: 'Inyección aceite bajo piel', scenario: 'Servicio hidráulico refrigerante bajo presión residual' },
        lc25: { element: 'Desmontaje / desguace', threat: 'Caída elementos pesados', effect: 'Aplastamiento, muerte', scenario: 'Desmontaje torno antes desguace; partes pesadas sin grúa' },`,
  cs: `
        lc08: { element: 'Vřeteno / převodovka', threat: 'Hluk > 85 dB(A)', effect: 'Trvalá ztráta sluchu', scenario: 'Nepřetržitá práce > 4h při 85-95 dB(A) bez chrániček sluchu' },
        lc09: { element: 'Chladicí kapalina / emulze', threat: 'Kontakt kůže / vdechování par', effect: 'Dermatóza, onemocnění dýchacích cest', scenario: 'Denní kontakt kůže s emulzní kapalinou; bez rukavic' },
        lc10: { element: 'Pracoviště obsluhy', threat: 'Nucená poloha / stání > 6h', effect: 'Muskuloskeletální poruchy', scenario: 'Stání u stroje > 6h bez protizátěžové podložky' },
        lc11: { element: '4-čelisťové sklicidlo / excentrický obrobek', threat: 'Vibrace nevyváženého obrobku', effect: 'Vibrační syndrom (Raynaud)', scenario: 'Práce s nevyváženým obrobkem ve 4-čelisťovém sklicidle' },
        lc12: { element: 'Horké třísky / chladivo', threat: 'Požár od vznícení par chladiva', effect: 'Požár stroje, popáleniny', scenario: 'Hromadění třísek a výparů chladiva; jiskření ze sklicidla' },
        lc13: { element: 'Transport stroje (jeřáb)', threat: 'Pád / převrácení stroje', effect: 'Rozdrcení osob', scenario: 'Přeprava jeřábem; hmotnost > 1,5t; osoby v blízkosti' },
        lc14: { element: 'Instalace / vyrovnání', threat: 'Uklouznutí / převrácení při instalaci', effect: 'Rozdrcení končetin', scenario: 'Vyrovnání klíny; stroj nestabilní před ukotvením' },
        lc15: { element: 'Elektrické připojení (400V)', threat: 'Úraz elektrickým proudem', effect: 'Popáleniny, smrt', scenario: 'Připojení 400V bez oprávněného elektrikáře' },
        lc16: { element: 'První spuštění', threat: 'Špatný směr otáčení vřetena', effect: 'Vymrštění obrobku nebo nástroje', scenario: 'První spuštění po dodání; kontrola smeru otáčení bez obrobku' },
        lc17: { element: 'Změna rychlosti', threat: 'Neúmyslné spuštění při řazení', effect: 'Zranění ruky', scenario: 'Změna rychlosti ozubenými koly při spuštěném pohonu' },
        lc18: { element: 'Převodovka / vřeteník', threat: 'Kontakt s rotujícími hřídeli při servisu', effect: 'Vtažení končetiny', scenario: 'Servis převodovky s otevřeným krytem; hřídele se otáčejí' },
        lc19: { element: 'Pohonné řemeny / ozubená kola', threat: 'Vtažení při výměně', effect: 'Zranění ruky, amputace', scenario: 'Výměna ozubených kol/klínových řemenů bez LOTO' },
        lc20: { element: 'Čištění / odstraňování třísek', threat: 'Řez od ostrých kovových třísek', effect: 'Tržné rány rukou', scenario: 'Čištění stroje po směně; ruční odstraňování třísek bez háku' },
        lc21: { element: 'Výměna oleje / provozní kapaliny', threat: 'Kontakt kůže s motorovým olejem', effect: 'Dermatóza, otrava', scenario: 'Výměna oleje převodovky s olejem rozlitým na podlahu' },
        lc22: { element: 'Nastavení ložisek vřetena', threat: 'Vtažení při nastavování za chodu', effect: 'Zranění ruky', scenario: 'Nastavení ložisek vřetena při spuštěném stroji' },
        lc23: { element: 'Výměna čelistí sklicidla', threat: 'Rozdrcení prstů čelistmi', effect: 'Rozdrcené prsty', scenario: 'Výměna čelistí bez zablokování vřetena' },
        lc24: { element: 'Hydraulický okruh chladiva', threat: 'Vstřik hydraulického oleje pod tlakem', effect: 'Vstřik oleje pod kůži', scenario: 'Servis hydrauliky chladiva pod zbytkým tlakem' },
        lc25: { element: 'Demontáž / srotování', threat: 'Pád těžkých součástí', effect: 'Rozdrcení, smrt', scenario: 'Demontáž soustruhu před srotováním; těžké části bez jeřábu' },`,
};

// Find the lathe-conventional block and add entries after lc07 in each lang
const machineMarker = "'lathe-conventional': {";
const machineIdx = c.indexOf(machineMarker);
const millingIdx = c.indexOf("'milling", machineIdx);
const machineBlock = c.slice(machineIdx, millingIdx);

let addedCount = 0;
for (const [lang, entries] of Object.entries(newEntries)) {
  const langMarker = `\n    ${lang}: {`;
  const langRelIdx = machineBlock.indexOf(langMarker);
  if (langRelIdx === -1) { console.log(`${lang} block not found`); continue; }
  
  // Find lc07 within this lang block
  const afterLang = machineBlock.indexOf('        lc07:', langRelIdx);
  if (afterLang === -1) { console.log(`lc07 not found in ${lang}`); continue; }
  
  // Find end of lc07 entry
  const lc07End = machineBlock.indexOf('},', afterLang) + 2;
  
  // Check if lc08 already exists
  if (machineBlock.indexOf('lc08:', afterLang) > -1 && machineBlock.indexOf('lc08:', afterLang) < lc07End + 200) {
    console.log(`${lang}: lc08 already exists`);
    continue;
  }
  
  // Insert new entries after lc07
  const insertPos = machineIdx + lc07End;
  c = c.slice(0, insertPos) + entries + c.slice(insertPos);
  addedCount++;
  console.log(`${lang}: added lc08-lc25`);
  
  // Recalculate machine block after insertion
  const newMachineBlock = c.slice(machineIdx, c.indexOf("'milling", machineIdx));
  Object.assign(machineBlock, newMachineBlock);
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/i18n/machinesI18n.ts', c, 'utf8');
console.log(`\nDone! Added to ${addedCount} languages`);
console.log('lc08 en present:', c.slice(machineIdx, c.indexOf("'milling", machineIdx)).includes("lc08: { element: 'Spindle"));