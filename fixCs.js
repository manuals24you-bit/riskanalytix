const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/i18n/translations.ts', 'utf8');
const find = 'method3: "Informace a \u0161kolen\u00ed \u2014 piktogramy ISO 7010, pracovn\u00ed pokyny, OOPP.",';
const idx = c.indexOf(find);
console.log('found at:', idx);
if (idx > -1) {
  const add = '\n      lifecycleTitle: "F\u00c1ZE \u017dIVOTN\u00cdHO CYKLU STROJE (ISO 12100 \u00a75.4)",\n      lifecycleStage: "F\u00e1ze \u017eivotn\u00edho cyklu",\n      lifecycleDesc: "Typick\u00e1 rizika k zv\u00e1\u017een\u00ed",\n      lifecycleConsidered: "Zohledn\u011bno",\n      lc1: "Doprava a monta\u017e",\n      lc1d: "Zved\u00e1n\u00ed, p\u0159emis\u0165ov\u00e1n\u00ed, vyrovn\u00e1n\u00ed, p\u0159ipojen\u00ed m\u00e9di\u00ed",\n      lc2: "Instalace a uveden\u00ed do provozu",\n      lc2d: "Prvn\u00ed spu\u0161t\u011bn\u00ed, konfigurace, bezpe\u010dnostn\u00ed testy",\n      lc3: "Nastaven\u00ed a serizov\u00e1n\u00ed",\n      lc3d: "Nastaven\u00ed parametr\u016f, v\u00fdm\u011bna n\u00e1stroj\u016f, zm\u011bna form\u00e1tu",\n      lc4: "Norm\u00e1ln\u00ed provoz",\n      lc4d: "Obsluha, nakl\u00e1d\u00e1n\u00ed / vyklad\u00e1n\u00ed, monitorov\u00e1n\u00ed procesu",\n      lc5: "\u010ci\u0161t\u011bn\u00ed a dezinfekce",\n      lc5d: "\u010ci\u0161t\u011bn\u00ed d\u00edl\u016f v kontaktu s produktem, tlakov\u00e9 um\u00fdv\u00e1n\u00ed",\n      lc6: "Odstra\u0148ov\u00e1n\u00ed poruch a hav\u00e1rie",\n      lc6d: "Diagnostika, odstra\u0148ov\u00e1n\u00ed uv\u00e1znut\u00ed, \u010dinnosti p\u0159i v\u00fdpadku nap\u00e1jen\u00ed",\n      lc7: "\u00ddr\u017eba a servis",\n      lc7d: "V\u00fdm\u011bna opot\u0159eben\u00fdch d\u00edl\u016f, mazn\u00ed, pravideln\u00e9 prohl\u00eddky",\n      lc8: "Demont\u00e1\u017e a srotov\u00e1n\u00ed",\n      lc8d: "Odpojen\u00ed m\u00e9di\u00ed, demont\u00e1\u017e, transport \u0161rotu, likvidace kapalin",';
  c = c.slice(0, idx + find.length) + add + c.slice(idx + find.length);
  fs.writeFileSync('C:/Projects/riskpro/frontend/src/i18n/translations.ts', c, 'utf8');
  console.log('cs: added');
}
