const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/data/machines.ts', 'utf8');

const scenarios = {
  // Tokarka konwencjonalna
  lc01: 'Operator zdejmuje detal przy obracającym się wrzecionie; brak osłony uchwytu',
  lc02: 'Ręczna wymiana narzędzia przy uruchomionym napędzie; kontakt z ostrzem imaka',
  lc03: 'Toczenie długiego pręta bez podtrzymki; prędkość > 300 obr/min',
  lc04: 'Obróbka bez okularów; wióry unoszą się w kierunku twarzy operatora',
  lc05: 'Regulacja suportu przy niskiej prędkości; dłonie w strefie uchwytu',
  lc06: 'Podłączenie kabli 400V bez odcięcia głównego zasilania',
  lc07: 'Pierwsze uruchomienie po naprawie; brak sprawdzenia kierunku obrotów',
  lc08: 'Praca ciągła > 4h z hałasem 85-95 dB(A) bez ochronników słuchu',
  lc09: 'Codzienny kontakt skóry z chłodziwem emulsyjnym; brak rękawic',
  lc10: 'Stanie przy maszynie > 6h bez maty antyzmęczeniowej',
  lc11: 'Praca z nierównoważnym detalem mocowanym w uchwycie 4-szczękowym',
  lc12: 'Nagromadzenie wiórów i oparów chłodziwa; iskra od uchwytu',
  lc13: 'Transport tokarki suwnicą; masa > 1,5t; osoby w pobliżu',
  lc14: 'Poziomowanie klinami stalowymi; maszyna niestabilna przed kotwiczeniem',
  lc15: 'Podłączenie zasilania 400V bez elektryka z uprawnieniami SEP',
  lc16: 'Pierwsze uruchomienie po dostawie; sprawdzenie kierunku obrotów bez detalu',
  lc17: 'Regulacja prędkości przez zmianę kół zębatych przy włączonym napędzie',
  lc18: 'Serwis skrzynki przekładniowej przy otwartej obudowie; wałki w ruchu',
  lc19: 'Wymiana kół zębatych / pasów klinowych bez LOTO',
  lc20: 'Czyszczenie maszyny po zmianie; ręczne zbieranie wiórów bez haczyka',
  lc21: 'Wymiana oleju skrzynki przy rozlanym oleju na posadzce',
  lc22: 'Regulacja luzu łożysk wrzeciona przy włączonej maszynie',
  lc23: 'Wymiana szczęk uchwytu bez blokady wrzeciona',
  lc24: 'Serwis instalacji hydraulicznej chłodziwa pod ciśnieniem resztkowym',
  lc25: 'Demontaż tokarki przed złomowaniem; ciężkie elementy bez suwnicy',

  // Frezarka CNC
  m01: 'Operator otwiera drzwi kabiny podczas obrotu wrzeciona; odległość < 0,3 m',
  m02: 'Mocowanie detalu w imadle przy uruchomionym programie NC',
  m03: 'Obróbka Al/Ti — gorące wióry w kierunku twarzy operatora',
  m04: 'Automatyczna zmiana narzędzi (ATC); operator w strefie ramienia zmieniaka',
  m05: 'Ruch osi X/Y/Z przy serwisie w trybie JOG; operator w strefie roboczej',
  m06: 'Praca z intensywnym chłodzeniem; operator bez maski w strefie mgły',
  m07: 'Serwis szafy elektrycznej przy włączonym zasilaniu 400V',
  m08: 'Hałas wrzeciona > 85 dB(A) podczas obróbki tytanu; brak ochronników',
  m09: 'Wibracje wrzeciona przy niewyważonym narzędziu; A(8) > 2,5 m/s²',
  m10: 'Błąd programu NC — kolizja osi Z z detalem przy pierwszym przebiegu',
  m11: 'Transport centrum obróbczego suwnicą; masa > 8t; osoby w pobliżu',
  m12: 'Poziomowanie fundamentu; maszyna niestabilna przed kotwiczeniem',
  m13: 'Podłączenie 400V / 3-faz bez odcięcia głównego',
  m14: 'Pierwsze uruchomienie po instalacji; sprawdzenie wrzeciona bez narzędzia',
  m15: 'Wczytanie nowego programu NC bez dry run; prędkość 100%',
  m16: 'Zmiana offsetu narzędzia przy aktywnym programie produkcyjnym',
  m17: 'Pęknięcie narzędzia podczas obróbki stali narzędziowej; wyrzut fragmentów',
  m18: 'Praca wieczorowa; niewystarczające oświetlenie miejscowe strefy obróbki',
  m19: 'Zanik zasilania przy otwartych drzwiach; operator w strefie',
  m20: 'Awaria hamulca wrzeciona; wybieg po wyłączeniu E-stop',
  m21: 'Awaria pompy chłodziwa; przegrzanie narzędzia podczas obróbki',
  m22: 'Awaria czujnika krańcowego osi Z; przekroczenie zakresu ruchu',
  m23: 'Czyszczenie komory po zmianie; ręczne usuwanie wiórów tytanu',
  m24: 'Wymiana oleju prowadnic; rozlanie na podłogę hali',
  m25: 'Serwis głowicy w trybie JOG; operator przy otwartych drzwiach',
  m26: 'Kontrola jakości detalu przy uruchomionym wrzecionie',
  m27: 'Obróbka magnezu; chłodziwo olejowe; temperatura narzędzia > 400°C',
  m28: 'Serwis układu hydraulicznego mocowania palet; przewody pod ciśnieniem',
  m29: 'Wymiana szczęk imadła bez LOTO; oś może się przypadkowo ruszyć',
  m30: 'Regulacja stołu obrotowego (4. oś) przy włączonym zasilaniu serwo',
  m31: 'Obróbka węglika spiekanego; pył kancerogeniczny bez filtracji',
  m32: 'Praca nocna; zmęczenie operatora; błąd wyboru programu NC',
  m33: 'Awaria chłodnicy oleju hydraulicznego; przegrzanie układu',
  m34: 'Demontaż wrzeciona bez specjalistycznego oprzyrządowania',
  m35: 'Demontaż centrum przed złomowaniem; ciężkie elementy bez suwnicy',
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
console.log('lc01:', c.includes("lc01.*scenario") || c.includes("Operator zdejmuje detal"));
console.log('m01:', c.includes("Operator otwiera drzwi kabiny"));