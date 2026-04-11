const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/SamplePDFButtons.tsx', 'utf8');

// Enhanced data for first 10 entries
const enrichments = [
  { id: '1', action: 'Osłona uchwytu z blokadą elektromagnetyczną (PL d)', scenario: 'Operator zdejmuje detal przy obracającym się wrzecionie', plrAuto: 'd', plrManual: 'd', plAchieved: 'd', plCategory: '3', reductionLevel: 'high', residualS: 4, residualP: 1, residualR: 4 },
  { id: '2', action: 'Kabina ze szkłem ochronnym EN 12150, okulary EN 166', scenario: 'Obróbka bez osłon przy wysokiej prędkości skrawania', plrAuto: 'c', plrManual: 'c', plAchieved: 'c', plCategory: '3', reductionLevel: 'high', residualS: 3, residualP: 1, residualR: 3 },
  { id: '3', action: 'Wyłącznik krańcowy drzwi PL d, LOTO przy serwisie', scenario: 'Serwis szafy elektrycznej przy włączonym zasilaniu 400V', plrAuto: 'd', plrManual: 'd', plAchieved: 'd', plCategory: '3', reductionLevel: 'medium', residualS: 4, residualP: 2, residualR: 8 },
  { id: '4', action: 'Prowadnica pręta (bar feeder), osłona strefy obróbki', scenario: 'Toczenie długiego pręta bez podtrzymki; prędkość > 300 rpm', plrAuto: 'e', plrManual: 'e', plAchieved: 'd', plCategory: '4', reductionLevel: 'high', residualS: 4, residualP: 1, residualR: 4 },
  { id: '5', action: 'Haczyk do wiórów, rękawice antyprzecięciowe EN 388', scenario: 'Ręczne usuwanie wiórów wstęgowych przy pracującym wrzecionie', plrAuto: 'b', plrManual: 'b', plAchieved: 'b', plCategory: '1', reductionLevel: 'medium', residualS: 3, residualP: 1, residualR: 3 },
  { id: '6', action: 'Separator mgły olejowej, wentylacja miejscowa', scenario: 'Codzienna praca z chłodziwem emulsyjnym bez wentylacji', plrAuto: 'b', plrManual: 'b', plAchieved: 'b', plCategory: '1', reductionLevel: 'low', residualS: 3, residualP: 2, residualR: 6 },
  { id: '7', action: 'Ochronniki słuchu EN 352, pomiar hałasu co 2 lata', scenario: 'Praca ciągła > 4h przy hałasie 88 dB(A) bez ochronników', plrAuto: 'b', plrManual: 'b', plAchieved: 'b', plCategory: '1', reductionLevel: 'medium', residualS: 2, residualP: 1, residualR: 2 },
  { id: '8', action: 'LOTO przy wymianie narzędzi, blokada wrzeciona', scenario: 'Wymiana narzędzi przy włączonym napędzie wrzeciona', plrAuto: 'c', plrManual: 'c', plAchieved: 'c', plCategory: '2', reductionLevel: 'high', residualS: 3, residualP: 1, residualR: 3 },
  { id: '9', action: 'Maty antyzmęczeniowe, przerwy co 2h, ergonomia stanowiska', scenario: 'Stanie przy maszynie > 6h bez przerw i maty', plrAuto: 'a', plrManual: 'a', plAchieved: 'a', plCategory: 'B', reductionLevel: 'low', residualS: 2, residualP: 2, residualR: 4 },
  { id: '10', action: 'Rękawice chemoodporne EN 374, krem ochronny', scenario: 'Codzienny kontakt skóry z emulsją chłodzącą bez ochrony', plrAuto: 'b', plrManual: 'b', plAchieved: 'b', plCategory: '1', reductionLevel: 'medium', residualS: 2, residualP: 1, residualR: 2 },
];

// For remaining entries add basic action and PLr
const basicEnrichments = {};
for (let i = 11; i <= 34; i++) {
  const s = i <= 20 ? 4 : i <= 28 ? 3 : 2;
  const p = i <= 15 ? 3 : i <= 25 ? 2 : 1;
  const plrMap = {
    'S2-F2-P2': 'e', 'S2-F2-P1': 'd', 'S2-F1-P2': 'd', 'S2-F1-P1': 'c',
    'S1-F2-P2': 'c', 'S1-F2-P1': 'b', 'S1-F1-P2': 'b', 'S1-F1-P1': 'a',
  };
  const sP = s >= 3 ? 'S2' : 'S1';
  const fP = p >= 3 ? 'F2' : 'F1';
  const plr = plrMap[`${sP}-${fP}-P2`] || 'c';
  basicEnrichments[String(i)] = {
    action: 'Środki ochronne wg oceny ryzyka — szczegóły w dokumentacji',
    plrAuto: plr,
    plCategory: plr === 'e' ? '4' : plr === 'd' ? '3' : plr === 'c' ? '2' : '1',
  };
}

// Apply enrichments to entries
for (const enr of enrichments) {
  const marker = `{ id: '${enr.id}',`;
  const idx = c.indexOf(marker);
  if (idx === -1) { console.log('not found:', enr.id); continue; }
  const end = c.indexOf('},', idx) + 2;
  const original = c.slice(idx, end);
  
  // Build enriched entry
  let enriched = original.slice(0, -2); // remove },
  enriched += `, action: '${enr.action}', scenario: '${enr.scenario}', plrAuto: '${enr.plrAuto}', plrManual: '${enr.plrManual}', plAchieved: '${enr.plAchieved}', plCategory: '${enr.plCategory}', plrP: 'P2', reductionLevel: '${enr.reductionLevel}', residualS: ${enr.residualS}, residualP: ${enr.residualP}, residualR: ${enr.residualR} },`;
  
  c = c.slice(0, idx) + enriched + c.slice(end);
  console.log('enriched:', enr.id);
}

// Apply basic enrichments
for (const [id, enr] of Object.entries(basicEnrichments)) {
  const marker = `{ id: '${id}',`;
  const idx = c.indexOf(marker);
  if (idx === -1) continue;
  const end = c.indexOf('},', idx) + 2;
  let enriched = c.slice(idx, end - 2);
  enriched += `, action: '${enr.action}', plrAuto: '${enr.plrAuto}', plCategory: '${enr.plCategory}', plrP: 'P2' },`;
  c = c.slice(0, idx) + enriched + c.slice(end);
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/SamplePDFButtons.tsx', c, 'utf8');
console.log('done - plrAuto:', c.includes('plrAuto'));
console.log('reductionLevel:', c.includes('reductionLevel'));