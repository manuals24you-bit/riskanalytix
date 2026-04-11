const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/data/machines.ts', 'utf8');

const scenarios = {
  // Prasa hydrauliczna (p01-p25)
  p01: 'Operator wkłada ręce do strefy narzędzia przy aktywnym suwaku; brak sterowania oburącznego',
  p02: 'Serwisant pracuje pod suwakiem bez mechanicznej podporki; suwak może opaść',
  p03: 'Wyciek oleju hydraulicznego przy wysokim ciśnieniu; operator w pobliżu',
  p04: 'Serwis układu hydraulicznego przy ciśnieniu resztkowym w akumulatorze',
  p05: 'Operator ładuje detal przy aktywnej kurtynie świetlnej; ominięcie ochrony',
  p06: 'Serwis szafy elektrycznej przy włączonym zasilaniu 400V',
  p07: 'Transport prasy suwnicą; masa > 5t; osoby w promieniu 5m',
  p08: 'Poziomowanie fundamentu; prasa niestabilna przed kotwiczeniem',
  p09: 'Podłączenie hydrauliki i 400V bez odcięcia głównego',
  p10: 'Pierwsze uruchomienie po instalacji; sprawdzenie czasu zatrzymania suwaka',
  p11: 'Zmiana matrycy/stempla bez LOTO; suwak może nieoczekiwanie opaść',
  p12: 'Regulacja siły prasy przy aktywnym ciśnieniu hydraulicznym',
  p13: 'Praca z detalami o nieregularnym kształcie; ryzyko wyrzutu odprysków',
  p14: 'Praca ciągła > 4h przy hałasie uderzeń > 85 dB(A); brak ochronników',
  p15: 'Praca wieczorowa; niewystarczające oświetlenie strefy narzędzia',
  p16: 'Zanik zasilania przy suwaku w górze; detal w matrycy',
  p17: 'Awaria zaworu hydraulicznego; niekontrolowane opuszczenie suwaka',
  p18: 'Awaria sterowania oburącznego; ryzyko wejścia rąk do strefy',
  p19: 'Awaria kurtyny świetlnej; brak zatrzymania suwaka przy wejściu',
  p20: 'Czyszczenie matrycy sprężonym powietrzem; odpryski materiału',
  p21: 'Wymiana oleju hydraulicznego; rozlanie na posadzkę hali',
  p22: 'Regulacja prowadnic suwaka przy włączonym zasilaniu',
  p23: 'Serwis uszczelnień hydraulicznych; olej pod ciśnieniem resztkowym',
  p24: 'Kontrola geometrii matrycy przy suwaku w dolnym położeniu bez podporki',
  p25: 'Demontaż prasy; ciężkie elementy hydrauliczne bez suwnicy',

  // Prasa mechaniczna (pm01-pm20)
  pm01: 'Operator wkłada ręce do strefy narzędzia bez sterowania oburącznego',
  pm02: 'Serwis koła zamachowego przy włączonym napędzie; ryzyko pochwycenia',
  pm03: 'Praca ze sprzęgłem klinowym; ryzyko podwójnego uderzenia (double stroke)',
  pm04: 'Usuwanie zaciętego detalu przy zatrzymanej prasie bez LOTO',
  pm05: 'Operator ładuje detal przy aktywnej kurtynie; ominięcie zabezpieczenia',
  pm06: 'Serwis szafy elektrycznej przy włączonym zasilaniu 400V',
  pm07: 'Transport prasy mechanicznej suwnicą; masa > 3t',
  pm08: 'Poziomowanie prasy; niestabilna przed kotwiczeniem do podłoża',
  pm09: 'Podłączenie zasilania 400V bez odcięcia głównego',
  pm10: 'Pierwsze uruchomienie; sprawdzenie czasu zatrzymania i podwójnego uderzenia',
  pm11: 'Zmiana narzędzia bez LOTO; suwak może opaść pod ciężarem',
  pm12: 'Regulacja skoku suwaka przy włączonym napędzie koła zamachowego',
  pm13: 'Praca impulsowa z detalami odpryskowymi; ryzyko urazu oczu',
  pm14: 'Hałas udarowy prasy > 95 dB(A); praca bez ochronników słuchu',
  pm15: 'Zanik zasilania przy suwaku w górnym martwym punkcie',
  pm16: 'Awaria sprzęgła; niekontrolowane opuszczenie suwaka',
  pm17: 'Awaria sterowania oburącznego; operator wkłada rękę do strefy',
  pm18: 'Czyszczenie matrycy przy kole zamachowym w ruchu wybiegu',
  pm19: 'Serwis sprzęgła / hamulca bez pełnego zatrzymania koła zamachowego',
  pm20: 'Demontaż prasy mechanicznej; koło zamachowe bez specjalnych uchwytów',
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
console.log('p01:', c.includes("Operator wk\u0142ada r\u0119ce do strefy narz\u0119dzia przy aktywnym suwaku"));
console.log('pm01:', c.includes("Operator wk\u0142ada r\u0119ce do strefy narz\u0119dzia bez sterowania"));