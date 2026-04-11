const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/data/machines.ts', 'utf8');

const scenarios = {
  // Przenośnik taśmowy (cb01-cb15)
  cb01: 'Operator czyści bęben napędowy przy pracującej taśmie; ręce w strefie bębna',
  cb02: 'Serwisant wymienia krążnik przy taśmie w ruchu; brak LOTO',
  cb03: 'Pracownik przechodzi pod przenośnikiem bez zachowania min. prześwitu 2m',
  cb04: 'Ładunek niestabilny zsypuje się z taśmy na pracownika przy linii',
  cb05: 'Serwis silnika napędowego przy włączonym zasilaniu 400V',
  cb06: 'Pył palny transportowanego materiału; iskra od tarcia taśmy',
  cb07: 'Montaż przenośnika na wysokości; elementy bez zabezpieczenia przed upadkiem',
  cb08: 'Pierwsze uruchomienie; osoby na trasie przenośnika nieostrzeżone',
  cb09: 'Ręczne kładzenie materiału na taśmę; ręce przy bębnie wejściowym',
  cb10: 'Naprawa taśmy przy pracującym napędzie; brak linki awaryjnej',
  cb11: 'Serwis na przenośniku pochyłym > 1m wysokości; brak szelek',
  cb12: 'Zanik zasilania na pochyłym przenośniku; ładunek zsuwający się',
  cb13: 'Awaria linki zatrzymania; brak możliwości zatrzymania awaryjnego',
  cb14: 'Czyszczenie bębnów przy włączonym napędzie; pochwycenie szczotki',
  cb15: 'Demontaż przenośnika; ciężkie segmenty bez suwnicy i zabezpieczeń',

  // Wózek widłowy (f01-f15)
  f01: 'Wózek manewruje przy pieszych w ciasnym korytarzu; widłami na wysokości oczu',
  f02: 'Wózek z ładunkiem 2t jedzie > 5 km/h w hali; pieszy na trasie',
  f03: 'Operator unosi widelce z pracownikiem na palecie; brak platformy',
  f04: 'Wózek wjeżdża na rampę załadunkową bez blokady przy ciężarówce',
  f05: 'Operator jedzie z uniesionym ładunkiem > 30 cm; ograniczona widoczność',
  f06: 'Ładowanie akumulatora w pomieszczeniu bez wentylacji; wodór z akumulatora',
  f07: 'Serwis silnika spalinowego w zamkniętym pomieszczeniu; CO z spalin',
  f08: 'Transport wózka na lawecie; brak kotwiczenia; ryzyko zsunięcia',
  f09: 'Pierwsze użycie po przeglądzie; sprawdzenie hamulców i układu kierowniczego',
  f10: 'Jazda po mokrej lub zanieczyszczonej posadzce; ryzyko poślizgu wózka',
  f11: 'Przewożenie ładunku zasłaniającego widoczność; operator jedzie tyłem',
  f12: 'Zanik zasilania elektrycznego podczas podnoszenia ładunku',
  f13: 'Awaria układu hamulcowego przy jeździe ze zboczem rampy',
  f14: 'Czyszczenie i serwis widelców przy uniesionym maszcie bez podpórki',
  f15: 'Demontaż wózka widłowego; ciężkie elementy układu hydraulicznego',
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
console.log('cb01:', c.includes("Operator czy\u015bci b\u0119ben nap\u0119dowy"));
console.log('f01:', c.includes("W\u00f3zek manewruje przy pieszych"));