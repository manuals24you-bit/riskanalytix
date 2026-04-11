const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/i18n/machinesI18n.ts', 'utf8');

// The file is broken - it ends with just 4 lines without the function body
// Find where the corruption starts
const brokenStart = c.indexOf('\n  entry: { element: string; threat: string; effect: string; scenario?: string },\n): { element: string; threat: string; effect: string; scenario?: string } {\n      effect:  found.effect ?? entry.effect,\n      scenario: found.scenario ?? entry.scenario,');

console.log('broken start at:', brokenStart);

// Replace the broken ending with the correct complete functions
const correctEnding = `

/**
 * Reverse lookup — szuka t\u0142umaczenia na podstawie polskiego tekstu elementu.
 * U\u017cywane gdy RiskEntry w bazie nie ma threatKey, tylko surowy tekst po polsku.
 */
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
 * T\u0142umaczy wpis RiskEntry (element + threat + effect + scenario) na dany j\u0119zyk.
 * Je\u015bli j\u0119zyk to 'pl' lub brak t\u0142umaczenia \u2014 zwraca orygina\u0142 (fallback).
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
}`;

if (brokenStart > -1) {
  c = c.slice(0, brokenStart) + correctEnding;
  fs.writeFileSync('C:/Projects/riskpro/frontend/src/i18n/machinesI18n.ts', c, 'utf8');
  console.log('fixed! file ends with:', c.slice(-100));
} else {
  console.log('broken pattern not found - checking end of file');
  console.log('last 200 chars:', c.slice(-200));
}