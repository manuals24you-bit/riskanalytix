const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/i18n/machinesI18n.ts', 'utf8');

// Find the last getThreatByText function - it should be near the end
// The file currently ends with a broken fragment
// Find where the correct content ends (before the broken translateRiskEntry)

// Strategy: find the last complete closing brace of getMachineTranslation function
// then append everything correctly

const goodEndMarker = 'export function getThreatTranslation(';
const idx = c.lastIndexOf(goodEndMarker);
console.log('getThreatTranslation at:', idx);

if (idx > -1) {
  // Cut everything from getThreatTranslation onwards and replace with correct version
  c = c.slice(0, idx);
}

// Also find and remove any broken translateRiskEntry fragments
const brokenMarkers = [
  'export function translateRiskEntry(',
  '\n  entry: { element: string; threat: string; effect: string; scenario?: string },',
];
for (const marker of brokenMarkers) {
  while (c.includes(marker)) {
    const mIdx = c.lastIndexOf(marker);
    c = c.slice(0, mIdx);
    console.log('removed fragment at:', mIdx);
  }
}

// Also find getThreatByText and remove from there
const getThreatByTextMarker = 'export function getThreatByText(';
const tbIdx = c.lastIndexOf(getThreatByTextMarker);
if (tbIdx > -1) {
  c = c.slice(0, tbIdx);
  console.log('removed from getThreatByText at:', tbIdx);
}

// Append the correct ending
const correctEnding = `
export function getThreatByText(
  polishElement: string,
  lang: Lang
): ThreatTranslation | null {
  for (const machineId of Object.keys(machinesI18n)) {
    const plThreats = machinesI18n[machineId]['pl']?.threats
    if (!plThreats) continue
    for (const threatId of Object.keys(plThreats)) {
      if (plThreats[threatId].element === polishElement) {
        const targetThreats = machinesI18n[machineId][lang]?.threats
        return targetThreats?.[threatId] ?? plThreats[threatId]
      }
    }
  }
  return null
}

/**
 * T\u0142umaczy wpis RiskEntry na dany j\u0119zyk.
 */
export function translateRiskEntry(
  entry: { element: string; threat: string; effect: string; scenario?: string },
  lang: Lang
): { element: string; threat: string; effect: string; scenario?: string } {
  if (lang === 'pl') return entry
  const found = getThreatByText(entry.element, lang)
  if (!found) return entry
  return {
    element: found.element,
    threat:  found.threat,
    effect:  found.effect ?? entry.effect,
    scenario: found.scenario ?? entry.scenario,
  }
}

export function getThreatTranslation(
  machineId: string,
  threatId: string,
  lang: Lang
): ThreatTranslation | null {
  const machineT = getMachineTranslation(machineId, lang)
  if (!machineT) return null
  return machineT.threats[threatId] || null
}
`;

c = c + correctEnding;
fs.writeFileSync('C:/Projects/riskpro/frontend/src/i18n/machinesI18n.ts', c, 'utf8');
console.log('done!');
console.log('translateRiskEntry count:', (c.match(/export function translateRiskEntry/g)||[]).length);
console.log('getThreatByText count:', (c.match(/export function getThreatByText/g)||[]).length);
console.log('scenario in return:', c.includes('scenario: found.scenario'));