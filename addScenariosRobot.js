const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/data/machines.ts', 'utf8');

const scenarios = {
  // Robot przemysłowy (r01-r25)
  r01: 'Operator wchodzi do strefy robota podczas cyklu automatycznego; brama nie zareagowała',
  r02: 'Serwisant w strefie robota w trybie T1; robot rusza nieoczekiwanie',
  r03: 'Chwytak upuszcza detal przy pełnej prędkości; osoba w zasięgu',
  r04: 'Luźny kabel energetyczny w zasięgu ramienia; ryzyko pochwycenia',
  r05: 'Programowanie w trybie T2 (> 250 mm/s); operator przy robocie',
  r06: 'Aplikacja spawalnicza; promieniowanie UV przy otwartej kurtynie kabiny',
  r07: 'Serwis sterownika przy włączonym zasilaniu 400V',
  r08: 'Aplikacja laserowa; wiązka poza strefą kabiny przy otwartych drzwiach',
  r09: 'Transport robota suwnicą; masa > 500 kg; osoby w pobliżu',
  r10: 'Montaż robota na platformie; kotwiczenie przed pierwszym uruchomieniem',
  r11: 'Podłączenie zasilania 400V i mediów pneumatycznych bez odcięcia',
  r12: 'Pierwsze uruchomienie po instalacji; sprawdzenie programu bez prędkości',
  r13: 'Wczytanie nowego programu; brak weryfikacji ścieżki w trybie T1',
  r14: 'Kolizja ramienia z oprzyrządowaniem przy błędnym offsetie TCP',
  r15: 'Praca nocna; zmęczony operator pomija procedurę wejścia do strefy',
  r16: 'Zanik zasilania przy robocie w górnym punkcie; brak hamulców',
  r17: 'Awaria skanera laserowego; strefa nie jest monitorowana',
  r18: 'Awaria bramki bezpieczeństwa; wejście bez zatrzymania robota',
  r19: 'Awaria chwytaka pneumatycznego; detal spada z wysokości',
  r20: 'Czyszczenie kabiny spawalniczej; pyły i opary spawalnicze bez wentylatora',
  r21: 'Wymiana chwytaka bez LOTO; ramię może się nieoczekiwanie poruszyć',
  r22: 'Serwis reduktora przy włączonym zasilaniu serwo',
  r23: 'Regulacja czujnika siły przy aktywnym trybie automatycznym',
  r24: 'Aplikacja klejenia; opary klejów reaktywnych bez wentylacji miejscowej',
  r25: 'Demontaż robota; ciężkie ramiona bez specjalnego oprzyrządowania',

  // Cobot (co01-co12)
  co01: 'Operator pracuje obok cobota bez oceny biomechanicznej ISO/TS 15066',
  co02: 'Efektor cobota z ostrymi krawędziami; kontakt z dłonią operatora',
  co03: 'Cobot trzyma ciężki detal (> 5 kg); upuszczenie na stopę operatora',
  co04: 'Tryb hand-guiding; operator prowadzi cobot z nadmierną siłą',
  co05: 'Aplikacja spawania z cobotem; promieniowanie UV na stanowisku operatora',
  co06: 'Cobot z aplikacją dozowania; opary chemiczne bez wentylacji',
  co07: 'Transport cobota; masa > 30 kg; ryzyko upadku podczas przenoszenia',
  co08: 'Montaż cobota na stole bez sprawdzenia nośności blatu',
  co09: 'Podłączenie zasilania 24/48V i I/O bez odcięcia sterownika',
  co10: 'Pierwsze uruchomienie; weryfikacja limitów siły i prędkości',
  co11: 'Awaria czujnika siły; cobot nie wykrywa kontaktu z operatorem',
  co12: 'Demontaż cobota z platformy; śruby mocujące pod naprężeniem',
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
console.log('r01:', c.includes("Operator wchodzi do strefy robota"));
console.log('co01:', c.includes("Operator pracuje obok cobota"));