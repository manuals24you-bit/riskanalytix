const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/i18n/machinesI18n.ts', 'utf8');

// Helper: add scenario to a specific threat id within a specific machine+lang block
function addScenario(machineId, lang, threatId, scenario) {
  const machineMarker = `'${machineId}': {`;
  const machineIdx = c.indexOf(machineMarker);
  if (machineIdx === -1) { console.log(`Machine ${machineId} not found`); return false; }

  // Find next machine to bound search
  const nextMachineMatch = c.indexOf("': {", machineIdx + machineMarker.length);
  // Actually find the lang block within this machine
  const langMarker = `\n    ${lang}: {`;
  const langIdx = c.indexOf(langMarker, machineIdx);
  if (langIdx === -1 || langIdx > machineIdx + 5000) return false;

  // Find the threat within this lang block
  const threatMarker = `        ${threatId}: {`;
  const threatIdx = c.indexOf(threatMarker, langIdx);
  if (threatIdx === -1) return false;

  // Find end of this threat entry
  const entryEnd = c.indexOf('}', threatIdx + threatMarker.length) + 1;
  const chunk = c.slice(threatIdx, entryEnd);
  if (chunk.includes('scenario:')) return true; // already has scenario

  // Insert before closing }
  const safeScenario = scenario.replace(/'/g, '\u2019');
  c = c.slice(0, entryEnd - 1) + `, scenario: '${safeScenario}'` + c.slice(entryEnd - 1);
  return true;
}

const translations = {
  'lathe-conventional': {
    en: {
      lc01: 'Operator removes workpiece with spindle rotating; no chuck guard',
      lc02: 'Manual tool change with drive running; contact with tool post blade',
      lc03: 'Turning long bar without steady rest; speed > 300 rpm',
      lc04: 'Machining without safety glasses; chips fly toward operator face',
      lc05: 'Carriage adjustment at low speed; hands near chuck zone',
      lc06: 'Connecting 400V cables without main power disconnect',
      lc07: 'First start after repair; rotation direction not checked',
      lc08: 'Continuous work > 4h at 85-95 dB(A) without hearing protection',
      lc09: 'Daily skin contact with emulsion coolant; no gloves',
      lc10: 'Standing at machine > 6h without anti-fatigue mat',
      lc11: 'Working with unbalanced workpiece in 4-jaw chuck',
      lc12: 'Chip and coolant vapour accumulation; spark from chuck',
      lc13: 'Transport by crane; weight > 1.5t; persons nearby',
      lc14: 'Levelling with wedges; machine unstable before anchoring',
      lc15: 'Connecting 400V without licensed electrician',
      lc16: 'First start after delivery; checking rotation without workpiece',
      lc17: 'Speed change via gear wheels with drive running',
      lc18: 'Gearbox service with open housing; shafts rotating',
      lc19: 'Replacing gears/V-belts without LOTO',
      lc20: 'Machine cleaning after shift; manual chip removal without hook',
      lc21: 'Gearbox oil change with oil spilled on floor',
      lc22: 'Spindle bearing adjustment with machine running',
      lc23: 'Chuck jaw replacement without spindle lock',
      lc24: 'Coolant hydraulic service under residual pressure',
      lc25: 'Lathe dismantling before scrapping; heavy parts without crane',
    },
    de: {
      lc01: 'Bediener entnimmt Werkstück bei drehendem Spindel; keine Futterabdeckung',
      lc02: 'Manueller Werkzeugwechsel bei laufendem Antrieb; Kontakt mit Stahlhalter',
      lc03: 'Drehen langer Stange ohne Lünette; Drehzahl > 300 U/min',
      lc04: 'Bearbeitung ohne Schutzbrille; Späne fliegen Richtung Gesicht',
      lc05: 'Schlitteneinstellung bei niedriger Drehzahl; Hände nahe Futterzone',
      lc06: 'Anschluss 400V-Kabel ohne Haupttrennschalter',
      lc07: 'Erststart nach Reparatur; Drehrichtung nicht geprüft',
      lc08: 'Dauerbetrieb > 4h bei 85-95 dB(A) ohne Gehörschutz',
      lc09: 'Täglicher Hautkontakt mit Emulsionskühlmittel; keine Handschuhe',
      lc10: 'Stehen an Maschine > 6h ohne Ermüdungsschutzmatte',
      lc11: 'Arbeit mit unwuchtigem Werkstück im 4-Backen-Futter',
      lc12: 'Späne- und Kühlmitteldampfansammlung; Funke vom Futter',
      lc13: 'Transport mit Kran; Gewicht > 1,5t; Personen in der Nähe',
      lc14: 'Ausrichten mit Keilen; Maschine instabil vor Verankerung',
      lc15: 'Anschluss 400V ohne zugelassenen Elektriker',
      lc16: 'Erststart nach Lieferung; Drehrichtung ohne Werkstück prüfen',
      lc17: 'Drehzahlwechsel über Zahnräder bei laufendem Antrieb',
      lc18: 'Getriebeservice mit offener Gehäuse; Wellen drehen sich',
      lc19: 'Zahnrad/Keilriemen wechseln ohne LOTO',
      lc20: 'Maschinenreinigung nach Schicht; manuelle Spanentnahme ohne Haken',
      lc21: 'Getriebeölwechsel mit ausgelaufenem Öl auf dem Boden',
      lc22: 'Spindellagereinstellung bei laufender Maschine',
      lc23: 'Backenwechsel ohne Spindelarretierung',
      lc24: 'Kühlmittelhydraulikservice unter Restdruck',
      lc25: 'Drehmaschine demontieren vor Verschrottung; schwere Teile ohne Kran',
    },
    fr: {
      lc01: "Opérateur retire la pièce avec broche en rotation; pas de protection mandrin",
      lc02: "Changement d'outil manuel avec entraînement en marche; contact avec le porte-outil",
      lc03: "Tournage longue barre sans lunette; vitesse > 300 tr/min",
      lc04: "Usinage sans lunettes de protection; copeaux vers le visage",
      lc05: "Réglage chariot à faible vitesse; mains près de la zone mandrin",
      lc06: "Raccordement câbles 400V sans coupure principale",
      lc07: "Premier démarrage après réparation; sens de rotation non vérifié",
      lc08: "Travail continu > 4h à 85-95 dB(A) sans protection auditive",
      lc09: "Contact cutané quotidien avec liquide émulsifié; sans gants",
      lc10: "Debout à la machine > 6h sans tapis anti-fatigue",
      lc11: "Travail avec pièce déséquilibrée en mandrin 4 mors",
      lc12: "Accumulation copeaux et vapeurs; étincelle du mandrin",
      lc13: "Transport par grue; masse > 1,5t; personnes à proximité",
      lc14: "Mise à niveau avec cales; machine instable avant ancrage",
      lc15: "Raccordement 400V sans électricien habilité",
      lc16: "Premier démarrage après livraison; vérification sens rotation sans pièce",
      lc17: "Changement vitesse par engrenages avec entraînement en marche",
      lc18: "Service boîte de vitesses avec carter ouvert; arbres en rotation",
      lc19: "Remplacement engrenages/courroies sans LOTO",
      lc20: "Nettoyage machine après poste; enlèvement manuel copeaux sans crochet",
      lc21: "Vidange huile boîte avec huile répandue sur le sol",
      lc22: "Réglage roulements broche avec machine en marche",
      lc23: "Remplacement mors sans blocage broche",
      lc24: "Service hydraulique liquide de refroidissement sous pression résiduelle",
      lc25: "Démontage tour avant ferraillage; parties lourdes sans pont roulant",
    },
    it: {
      lc01: "Operatore rimuove il pezzo con il mandrino in rotazione; nessuna protezione",
      lc02: "Cambio utensile manuale con azionamento in moto; contatto con il portautensile",
      lc03: "Tornitura barra lunga senza lunetta; velocità > 300 giri/min",
      lc04: "Lavorazione senza occhiali; trucioli verso il viso dell'operatore",
      lc05: "Regolazione slitta a bassa velocità; mani vicino alla zona mandrino",
      lc06: "Collegamento cavi 400V senza sezionatore principale",
      lc07: "Primo avviamento dopo riparazione; senso di rotazione non verificato",
      lc08: "Lavoro continuo > 4h a 85-95 dB(A) senza protezione uditiva",
      lc09: "Contatto cutaneo giornaliero con emulsione refrigerante; senza guanti",
      lc10: "In piedi alla macchina > 6h senza tappeto anti-fatica",
      lc11: "Lavoro con pezzo non bilanciato nel mandrino a 4 griffe",
      lc12: "Accumulo trucioli e vapori refrigerante; scintilla dal mandrino",
      lc13: "Trasporto con carroponte; peso > 1,5t; persone nelle vicinanze",
      lc14: "Livellamento con cunei; macchina instabile prima dell'ancoraggio",
      lc15: "Collegamento 400V senza elettricista abilitato",
      lc16: "Primo avviamento dopo consegna; verifica senso rotazione senza pezzo",
      lc17: "Cambio velocità tramite ingranaggi con azionamento in moto",
      lc18: "Servizio cambio con carter aperto; alberi in rotazione",
      lc19: "Sostituzione ingranaggi/cinghie senza LOTO",
      lc20: "Pulizia macchina dopo il turno; rimozione manuale trucioli senza gancio",
      lc21: "Cambio olio cambio con olio versato sul pavimento",
      lc22: "Regolazione cuscinetti mandrino con macchina in moto",
      lc23: "Sostituzione griffe senza blocco mandrino",
      lc24: "Servizio idraulico refrigerante sotto pressione residua",
      lc25: "Smontaggio tornio prima della rottamazione; parti pesanti senza carroponte",
    },
    es: {
      lc01: "Operador retira pieza con husillo girando; sin protección de mandril",
      lc02: "Cambio manual de herramienta con accionamiento en marcha; contacto con portaherramienta",
      lc03: "Torneado barra larga sin luneta; velocidad > 300 rpm",
      lc04: "Mecanizado sin gafas de seguridad; virutas hacia la cara",
      lc05: "Ajuste carro a baja velocidad; manos cerca de zona mandril",
      lc06: "Conexión cables 400V sin corte principal",
      lc07: "Primera puesta en marcha tras reparación; sentido de giro no verificado",
      lc08: "Trabajo continuo > 4h a 85-95 dB(A) sin protección auditiva",
      lc09: "Contacto cutáneo diario con emulsión refrigerante; sin guantes",
      lc10: "De pie en la máquina > 6h sin alfombrilla anti-fatiga",
      lc11: "Trabajo con pieza desequilibrada en mandril de 4 garras",
      lc12: "Acumulación virutas y vapores refrigerante; chispa del mandril",
      lc13: "Transporte con grúa; peso > 1,5t; personas cercanas",
      lc14: "Nivelación con cuñas; máquina inestable antes anclaje",
      lc15: "Conexión 400V sin electricista habilitado",
      lc16: "Primera puesta en marcha tras entrega; verificación giro sin pieza",
      lc17: "Cambio velocidad por engranajes con accionamiento en marcha",
      lc18: "Servicio caja velocidades con cárter abierto; ejes girando",
      lc19: "Sustitución engranajes/correas sin LOTO",
      lc20: "Limpieza máquina tras turno; retirada manual virutas sin gancho",
      lc21: "Cambio aceite caja con aceite derramado en suelo",
      lc22: "Regulación rodamientos husillo con máquina en marcha",
      lc23: "Sustitución mordazas sin bloqueo husillo",
      lc24: "Servicio hidráulico refrigerante bajo presión residual",
      lc25: "Desmontaje torno antes desguace; partes pesadas sin grúa",
    },
    cs: {
      lc01: "Obsluha odebírá obrobek při otáčejícím se vřetenu; bez ochrany sklicidla",
      lc02: "Ruční výměna nástroje při spuštěném pohonu; kontakt s nožovým držákem",
      lc03: "Soustružení dlouhé tyče bez lunetky; otáčky > 300 ot/min",
      lc04: "Obrábění bez ochranných brýlí; třísky směrem k obličeji",
      lc05: "Nastavení suportu při nízké rychlosti; ruce blízko zóny sklicidla",
      lc06: "Připojení kabelů 400V bez hlavního odpojení",
      lc07: "První spuštění po opravě; směr otáčení neověřen",
      lc08: "Nepřetržitá práce > 4h při 85-95 dB(A) bez chrániček sluchu",
      lc09: "Denní kontakt kůže s emulzní kapalinou; bez rukavic",
      lc10: "Stání u stroje > 6h bez protizátěžové podložky",
      lc11: "Práce s nevyváženým obrobkem ve 4-čelisťovém sklicidle",
      lc12: "Hromadění třísek a výparů chladiva; jiskření ze sklicidla",
      lc13: "Přeprava jeřábem; hmotnost > 1,5t; osoby v blízkosti",
      lc14: "Vyrovnání klíny; stroj nestabilní před ukotvením",
      lc15: "Připojení 400V bez oprávněného elektrikáře",
      lc16: "První spuštění po dodání; kontrola smeru otáčení bez obrobku",
      lc17: "Změna rychlosti ozubenými koly při spuštěném pohonu",
      lc18: "Servis převodovky s otevřeným krytem; hřídele se otáčejí",
      lc19: "Výměna ozubených kol/klínových řemenů bez LOTO",
      lc20: "Čištění stroje po směně; ruční odstraňování třísek bez háku",
      lc21: "Výměna oleje převodovky s olejem rozlitým na podlahu",
      lc22: "Nastavení ložisek vřetena při spuštěném stroji",
      lc23: "Výměna čelistí bez zablokování vřetena",
      lc24: "Servis hydrauliky chladiva pod zbytkým tlakem",
      lc25: "Demontáž soustruhu před srotováním; těžké části bez jeřábu",
    },
  },
};

let addedCount = 0;
let notFoundCount = 0;

for (const [machineId, langs] of Object.entries(translations)) {
  for (const [lang, threatScenarios] of Object.entries(langs)) {
    for (const [threatId, scenario] of Object.entries(threatScenarios)) {
      const result = addScenario(machineId, lang, threatId, scenario);
      if (result === true) addedCount++;
      else notFoundCount++;
    }
  }
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/i18n/machinesI18n.ts', c, 'utf8');
console.log(`Added: ${addedCount}, Not found: ${notFoundCount}`);