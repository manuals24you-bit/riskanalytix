const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/data/machines.ts', 'utf8');

// Add scenarios to lathe-cnc threats l01-l13
const scenarios = {
  'l01': 'Operator otwiera os\u0142on\u0119 wrzeciona podczas obrotu; odleg\u0142o\u015b\u0107 od wrzeciona < 0,5 m',
  'l02': 'Normalna obr\u00f3bka; operator stoi przed maszyn\u0105 w odleg\u0142o\u015bci 0,5\u20131,5 m',
  'l03': 'R\u0119czna wymiana narz\u0119dzia przy zatrzymanym wrzecionie; kontakt z ostrzem',
  'l04': 'Regulacja suportu przy niskiej pr\u0119dko\u015bci posuwu; d\u0142onie w pobli\u017cu suportu',
  'l05': 'Obr\u00f3bka d\u0142ugiego pr\u0119ta L/D > 4 bez podtrzymki; pr\u0119dko\u015b\u0107 > 500 obr/min',
  'l06': 'Serwis szafy elektrycznej przy za\u0142\u0105czonym zasilaniu; dost\u0119p do szafy',
  'l07': 'Uruchamianie cyklu CNC przez operatora; b\u0142\u0105d offsetu narz\u0119dzia lub programu',
  'l08': 'Codzienny kontakt sk\u00f3rny z ch\u0142odziwem; brak r\u0119kawic ochronnych',
  'l09': 'Praca z intensywnym ch\u0142odzeniem; operator bez maski w strefie mg\u0142y',
  'l10': 'Praca ci\u0105g\u0142a > 4h; poziom ha\u0142asu 88\u201395 dB(A) bez ochronnik\u00f3w',
  'l11': 'Praca z niewywa\u017conym uchwytem; poziom drgaHan A(8) > 2,5 m/s\u00b2',
  'l12': 'Stanie przy maszynie > 6h bez maty; pochylona pozycja cia\u0142a',
  'l13': 'Nagromadzenie wi\u00f3r\u00f3w i opar\u00f3w ch\u0142odziwa; iskra od narz\u0119dzia',
  'l14': 'Transport suwnic\u0105; masa maszyny > 3t; osoby w promieniu 5 m',
  'l15': 'Poziomowanie klinami; maszyna niestabilna przed zakotwiczeniem',
  'l16': 'Pod\u0142\u0105czanie kabli zasilaj\u0105cych 400V; brak odci\u0119cia g\u0142\u00f3wnego',
  'l17': 'Pierwsze uruchomienie bez detalu; sprawdzenie kierunku obrot\u00f3w',
  'l18': 'Wczytanie nowego programu NC; brak dry run; pr\u0119dko\u015b\u0107 100%',
  'l19': 'Praca z uchwytem hydraulicznym; awaria pompy hydraulicznej w trakcie obr\u00f3bki',
  'l20': 'Automatyczna zmiana narz\u0119dzia; operator przy otwartych drzwiach',
  'l21': 'Serwis w trybie JOG; operator w strefie roboczej z w\u0142\u0105czonym zasilaniem',
  'l22': 'Obr\u00f3bka du\u017cych pr\u0119dko\u015bci; p\u0119kni\u0119cie zm\u0119czonego uchwytu podczas obrotu',
  'l23': 'Pierwszy przebieg nowego programu; b\u0142\u0105d offsetu narz\u0119dzia',
  'l24': 'Obr\u00f3bka stopu magnezu; ch\u0142odziwo olejowe; temperatura > 400\u00b0C',
  'l25': 'Praca wieczorowa; niew\u0142a\u015bciwe o\u015bwietlenie miejscowe; b\u0142\u0119dny odczyt',
  'l26': 'Zanik napi\u0119cia w sieci; os\u0142ona otwarta; operator w strefie',
  'l27': 'Wy\u0142\u0105czenie awaryjne E-stop; operator otwiera os\u0142on\u0119 przed pe\u0142nym zatrzymaniem',
  'l28': 'Awaria pompy ch\u0142odziwa w trakcie obr\u00f3bki; przegrzanie narz\u0119dzia',
  'l29': 'Awaria czujnika kr\u0105\u017ccowego; os\u00f3b postronnych w pobli\u017cu maszyny',
  'l30': 'Czyszczenie maszyny po zmianie; r\u0119czne usuwanie wi\u00f3r\u00f3w bez haczyka',
  'l31': 'Wymiana oleju prowadnic co miesi\u0105c; rozlanie oleju na pod\u0142og\u0119',
  'l32': 'Wymiana szcz\u0119k uchwytu bez LOTO; wrzeciono mo\u017ce si\u0119 przypadkowo uruchomi\u0107',
  'l33': 'Serwis uk\u0142adu hydraulicznego; przewody ci\u015bnieniowe pod ci\u015bnieniem resztkowym',
  'l34': 'Demonta\u017c maszyny przed z\u0142omowaniem; ci\u0119\u017ckie elementy bez suwnicy',
};

let count = 0;
for (const [id, scenario] of Object.entries(scenarios)) {
  // Find threat by id and add scenario field
  const marker = `id: '${id}',`;
  const idx = c.indexOf(marker);
  if (idx === -1) { console.log(`${id} not found`); continue; }
  
  // Find end of this entry (before closing })
  const entryEnd = c.indexOf('actions: [', idx);
  if (entryEnd === -1) continue;
  const actionsEnd = c.indexOf('] }', entryEnd) + 3;
  
  // Check if scenario already exists
  const entryChunk = c.slice(idx, actionsEnd);
  if (entryChunk.includes('scenario:')) { count++; continue; }
  
  // Insert scenario before closing }
  c = c.slice(0, actionsEnd - 2) + `, scenario: '${scenario}'` + c.slice(actionsEnd - 2);
  count++;
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/data/machines.ts', c, 'utf8');
console.log(`Added scenarios to ${count} threats`);
console.log('l01 scenario:', c.includes("scenario: 'Operator otwiera"));