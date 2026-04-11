const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/SamplePDFButtons.tsx', 'utf8');

// Remove the badly placed boundary fields
const badStart = c.indexOf(",\n  intendedUse:");
const badEnd = c.indexOf("'}", c.indexOf("envLimits:")) + 2;
console.log('bad section:', badStart, 'to', badEnd);
console.log('bad text:', c.slice(badStart, badStart + 100));

if (badStart > -1) {
  c = c.slice(0, badStart) + c.slice(badEnd);
  console.log('removed bad section');
}

// Now find the correct place - inside the analysis object, after machineName
const machineNameLine = c.indexOf("machineName: 'Tokarka CNC TOK-600'");
const machineNameEnd = c.indexOf('\n', machineNameLine);
console.log('machineName ends at:', machineNameEnd);
console.log('context after:', JSON.stringify(c.slice(machineNameEnd, machineNameEnd + 60)));

// Insert after machineName line
const boundaries = `,
    intendedUse: 'Tokarka CNC TOK-600 przeznaczona do obr\u00f3bki skrawaniem metali (stal, aluminium, stopy miedzi, \u017celiwo). Maks. \u00d8600mm, d\u0142. 2000mm. Tryby: AUTO, JOG/MDI, serwisowy.',
    foreseenMisuse: 'Obr\u00f3bka Mg/Ti bez ch\u0142odziwa \u2022 Praca bez os\u0142ony \u2022 Niewywa\u017cone uchwyty \u2022 JOG > 2 m/min.',
    spaceLimits: 'Przestrze\u0144 robocza: 2500\u00d71800\u00d72200 mm \u2022 Zasi\u0119g operatora: max 800 mm od osi \u2022 Strefa niebezpieczna: 500 mm.',
    timeLimits: 'Transport i instalacja \u2022 Uruchomienie \u2022 Eksploatacja (15 lat) \u2022 Serwis (wymiana narz\u0119dzi, oleju) \u2022 Z\u0142omowanie.',
    envLimits: '+5\u2026+40\u00b0C \u2022 Wilgotno\u015b\u0107 max 80% \u2022 400V/3-faz/50Hz \u00b110%'`;

c = c.slice(0, machineNameEnd) + boundaries + c.slice(machineNameEnd);
fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/SamplePDFButtons.tsx', c, 'utf8');
console.log('fixed, intendedUse:', c.includes('intendedUse:'));