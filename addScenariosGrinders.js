const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/data/machines.ts', 'utf8');

const scenarios = {
  // Szlifierka płaszczyzn (g01-g25)
  g01: 'Wymiana ściernicy bez sprawdzenia Vmax; prędkość stołu > 3000 obr/min',
  g02: 'Szlifowanie bez sprawdzenia siły trzymania magnetycznego; detal może spaść',
  g03: 'Szlifowanie bez osłony; iskry i pył ścierny kierują się w stronę twarzy',
  g04: 'Praca z chłodziwem; codzienny kontakt skóry bez rękawic',
  g05: 'Obróbka bez wyciągu; pył ścierny i metalowy unosi się nad stołem',
  g06: 'Praca ciągła > 4h przy poziomie hałasu 85-95 dB(A); brak ochronników',
  g07: 'Stanie przy maszynie > 6h bez maty; pochylona pozycja przy inspekcji',
  g08: 'Serwis szafy elektrycznej przy włączonym zasilaniu 400V',
  g09: 'Pierwsza próba ściernicy po wymianie; operator w zasięgu odłamków',
  g10: 'Regulacja głębokości szlifowania przy aktywnej ściernicy',
  g11: 'Transport szlifierki suwnicą; masa > 2t; osoby w promieniu 5m',
  g12: 'Poziomowanie fundamentu przed kotwiczeniem; maszyna niestabilna',
  g13: 'Podłączenie kabli zasilających 400V bez odcięcia głównego',
  g14: 'Pierwsze uruchomienie; sprawdzenie kierunku obrotu ściernicy bez detalu',
  g15: 'Pierwsza praca po wymianie ściernicy; brak próby obrotowej 1 min',
  g16: 'Błąd głębokości skrawania; kolizja ściernicy z detalem',
  g17: 'Praca nocna; niewystarczające oświetlenie strefy roboczej',
  g18: 'Zanik zasilania przy aktywnym stole magnetycznym',
  g19: 'Awaria stołu magnetycznego podczas szlifowania; detal może spaść',
  g20: 'Awaria chłodziwa; przegrzanie strefy szlifowania; ryzyko pożaru',
  g21: 'Czyszczenie stołu po zmianie; ręczne usuwanie pyłu metalowego',
  g22: 'Wymiana oleju prowadnic; rozlanie na posadzkę hali',
  g23: 'Wyrównanie ściernicy diamentowym narzędziem; pył diamentowy',
  g24: 'Serwis przy otwartej ściernicy; operator w zasięgu ściernicy',
  g25: 'Demontaż szlifierki; ciężkie elementy bez suwnicy',

  // Szlifierka walców (gc01-gc16)
  gc01: 'Wymiana ściernicy bez sprawdzenia Vmax i próby obrotowej 1 min',
  gc02: 'Mocowanie wałka między kłami bez sprawdzenia docisku; detal może wypaść',
  gc03: 'Szlifowanie bez osłony; iskry kierują się w stronę operatora',
  gc04: 'Praca z emulsją chłodzącą; codzienny kontakt skóry bez rękawic',
  gc05: 'Pomiar wałka mikrometrem przy obracającej się ściernicy',
  gc06: 'Praca ciągła > 4h przy hałasie 88-96 dB(A); brak ochronników słuchu',
  gc07: 'Serwis szafy elektrycznej przy włączonym zasilaniu 400V',
  gc08: 'Transport szlifierki walcowej suwnicą; masa > 5t',
  gc09: 'Poziomowanie fundamentu; maszyna niestabilna przed kotwiczeniem',
  gc10: 'Podłączenie 400V bez odcięcia głównego zasilania',
  gc11: 'Pierwsze uruchomienie; sprawdzenie kierunku obrotu ściernicy',
  gc12: 'Pierwsza próba po wymianie ściernicy; brak okresu rozruchu 1 min',
  gc13: 'Zanik zasilania podczas szlifowania; detal między kłami',
  gc14: 'Awaria ściernicy prowadzącej; detal może wypaść',
  gc15: 'Czyszczenie po zmianie; pył metalowo-ścierny bez maseczki',
  gc16: 'Demontaż szlifierki walcowej; ciężkie wrzecienniki bez suwnicy',
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
console.log('g01:', c.includes("Wymiana \u015bciernicy bez sprawdzenia Vmax; pr\u0119dko\u015b\u0107 sto\u0142u"));
console.log('gc01:', c.includes("Wymiana \u015bciernicy bez sprawdzenia Vmax i pr\u00f3by"));