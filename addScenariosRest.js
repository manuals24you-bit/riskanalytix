const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/data/machines.ts', 'utf8');

const scenarios = {
  // Maszyna pakująca flow (pf01-pf15)
  pf01: 'Operator czyści zgrzewarkę poprzeczną przy temperaturze 180°C bez rękawic',
  pf02: 'Ręczne układanie produktów na folię przy aktywnym podajniku taśmowym',
  pf03: 'Serwis noża tnącego przy włączonym napędzie; ostrze w ruchu',
  pf04: 'Zacięcie folii przy aktywnym podajniku; operator sięga do mechanizmu',
  pf05: 'Codzienna praca z folią stretch; mikrourazy rąk od ostrych krawędzi',
  pf06: 'Serwis szafy elektrycznej przy włączonym zasilaniu 400V',
  pf07: 'Transport maszyny pakującej wózkiem widłowym; masa > 800 kg',
  pf08: 'Pierwsze uruchomienie; sprawdzenie synchronizacji podajnika i zgrzewarki',
  pf09: 'Awaria czujnika temperatury; zgrzewarka przegrzana > 250°C',
  pf10: 'Zanik zasilania przy folii w zgrzewarce; ryzyko pożaru folii',
  pf11: 'Hałas maszyny pakującej > 85 dB(A); praca bez ochronników',
  pf12: 'Czyszczenie tarcz grzejnych przy wysokiej temperaturze resztkowej',
  pf13: 'Wymiana rolek folii przy pracującym podajniku taśmowym',
  pf14: 'Regulacja naciągu folii przy aktywnym mechanizmie rozwijania',
  pf15: 'Demontaż maszyny pakującej; ciężkie moduły bez suwnicy',

  // Wtryskarka (in01-in15)
  in01: 'Operator sięga do formy przy otwieraniu; forma może się zamknąć nieoczekiwanie',
  in02: 'Wyciek tworzywa pod wysokim ciśnieniem przy uszkodzonej dyszy; oparzenie',
  in03: 'Kontakt z gorącą formą (> 200°C) podczas wyciągania wypraski',
  in04: 'Opary z przetwarzanego tworzywa PVC; brak wentylacji miejscowej',
  in05: 'Serwis jednostki wtryskowej przy ciśnieniu resztkowym w cylindrze',
  in06: 'Serwis szafy elektrycznej przy włączonym zasilaniu 400V',
  in07: 'Transport wtryskarki suwnicą; masa > 10t; osoby w promieniu 5m',
  in08: 'Montaż formy w maszynie bez sprawdzenia momentu dokręcenia śrub',
  in09: 'Podłączenie oleju hydraulicznego i 400V bez odcięcia głównego',
  in10: 'Pierwsze uruchomienie po wymianie formy; sprawdzenie siły zamknięcia',
  in11: 'Zanik zasilania podczas wtrysku; tworzywo pod ciśnieniem w cylindrze',
  in12: 'Awaria zaworu zamknięcia formy; forma otwiera się podczas wtrysku',
  in13: 'Czyszczenie dyszy wtryskarki przy temperaturze cylindra 280°C',
  in14: 'Wymiana ślimaków plastyfikujących bez chłodzenia cylindra',
  in15: 'Demontaż wtryskarki; ciężkie elementy plastyfikatora bez suwnicy',

  // Dźwignica / suwnica (cr01-cr13)
  cr01: 'Podnoszenie ładunku nad osobami w strefie roboczej suwnicy',
  cr02: 'Operator wchodzi na most suwnicy przy włączonym zasilaniu szyny',
  cr03: 'Przeciążenie suwnicy ponad WLL; brak wskaźnika obciążenia',
  cr04: 'Uszkodzone zawiesia użyte do podnoszenia ciężkiego ładunku',
  cr05: 'Serwis mechanizmu podnoszenia przy zawieszonym ładunku bez podpory',
  cr06: 'Serwis szafy elektrycznej suwnicy przy włączonym zasilaniu 400V',
  cr07: 'Montaż suwnicy na hali; elementy mostu na wysokości > 6m',
  cr08: 'Pierwsze uruchomienie po montażu; próba obciążeniowa 110% WLL',
  cr09: 'Praca suwnicy w pobliżu linii elektrycznych na zewnątrz hali',
  cr10: 'Zanik zasilania przy zawieszonym ładunku; ładunek może spaść',
  cr11: 'Awaria hamulca mechanizmu podnoszenia; niekontrolowane opadanie',
  cr12: 'Czyszczenie toru jezdnego przy aktywnej suwnicy w ruchu',
  cr13: 'Demontaż suwnicy; elementy mostu i wciągnika bez odpowiedniego oprzyrządowania',

  // Kombajn zbożowy (ag01-ag12)
  ag01: 'Czyszczenie headera przy pracującym bębnie; ręce w zasięgu pałców żniwnych',
  ag02: 'Operator stoi przy WOM podczas pracy; odzież robocza luźna',
  ag03: 'Kombajn na polu z kamieniami; kamień trafia w bęben młócący',
  ag04: 'Operator wchodzi do zbiornika ziarna przy pracującym ślimaku',
  ag05: 'Praca na pochyłości > 15°; ryzyko przewrócenia kombajnu',
  ag06: 'Praca w kabinie latem > 35°C bez klimatyzacji; stres cieplny',
  ag07: 'Transport kombajnu po drodze publicznej; szerokość > 3m bez pilota',
  ag08: 'Pierwsze uruchomienie sezonu; sprawdzenie naciągu pasów i stanu noży',
  ag09: 'Praca przy słabej widoczności (kurz, noc) bez świateł roboczych',
  ag10: 'Zanik zasilania podczas opróżniania zbiornika ziarna na przyczepę',
  ag11: 'Awaria układu kierowniczego podczas żniw na zboczu',
  ag12: 'Serwis elementów tnących; ostre noże bez rękawic antyprzecięciowych',
};

let count = 0;
for (const [id, scenario] of Object.entries(scenarios)) {
  const marker = `id: '${id}',`;
  const idx = c.indexOf(marker);
  if (idx === -1) { console.log(`${id} not found`); continue; }
  
  const actionsIdx = c.indexOf('actions: [', idx);
  if (actionsIdx === -1) continue;
  const entryEnd = c.indexOf('] }', actionsIdx) + 3;
  
  const chunk = c.slice(idx, entryEnd);
  if (chunk.includes('scenario:')) { count++; continue; }
  
  c = c.slice(0, entryEnd - 2) + `, scenario: '${scenario.replace(/'/g, '\u2019')}'` + c.slice(entryEnd - 2);
  count++;
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/data/machines.ts', c, 'utf8');
console.log(`Added: ${count} scenarios`);
console.log('pf01:', c.includes("Operator czy\u015bci zgrzewark\u0119"));
console.log('in01:', c.includes("Operator si\u0119ga do formy"));
console.log('cr01:', c.includes("Podnoszenie \u0142adunku nad osobami"));
console.log('ag01:', c.includes("Czyszczenie headera"));