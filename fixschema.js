const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/backend/prisma/schema.prisma', 'utf8');

// Remove the malformed line with literal \n
const badLine = '  plrS       String?  // S1 / S2\\n  plrF       String?  // F1 / F2\\n  plrP       String?  // P1 / P2\\n  plrAuto    String?  // auto PLr: a/b/c/d/e\\n  plrManual  String?  // user override\\n  plCategory String?  // B/1/2/3/4\\n  plAchieved String?  // PL achieved: a/b/c/d/e\\n  mttfd      String?\\n  dcavg      String?\\n  riskMethod';

if (c.includes(badLine)) {
  c = c.replace(badLine, '  riskMethod');
  console.log('removed bad line');
} else {
  console.log('bad line not found, checking...');
  const idx = c.indexOf('plrS');
  if (idx > -1) console.log('plrS context:', JSON.stringify(c.slice(idx-2, idx+50)));
}

// Now check what already exists
console.log('plCategory exists:', c.includes('plCategory'));
console.log('plAchieved exists:', c.includes('plAchieved'));
console.log('mttfd exists:', c.includes('mttfd'));
console.log('plrS exists:', c.includes('plrS'));

// Add new fields before riskMethod (only ones that don't exist)
const toAdd = [];
if (!c.includes('  plrS ')) toAdd.push('  plrS       String?  // S1 / S2');
if (!c.includes('  plrF ')) toAdd.push('  plrF       String?  // F1 / F2');
if (!c.includes('  plrP ')) toAdd.push('  plrP       String?  // P1 / P2');
if (!c.includes('  plrAuto ')) toAdd.push('  plrAuto    String?  // auto PLr: a/b/c/d/e');
if (!c.includes('  plrManual ')) toAdd.push('  plrManual  String?  // user override');
if (!c.includes('  plCategory ')) toAdd.push('  plCategory String?  // B/1/2/3/4');
if (!c.includes('  plAchieved ')) toAdd.push('  plAchieved String?  // PL achieved: a/b/c/d/e');
if (!c.includes('  mttfd ')) toAdd.push('  mttfd      String?');
if (!c.includes('  dcavg ')) toAdd.push('  dcavg      String?');

console.log('Fields to add:', toAdd.length);

if (toAdd.length > 0) {
  c = c.replace('  riskMethod', toAdd.join('\n') + '\n  riskMethod');
}

fs.writeFileSync('C:/Projects/riskpro/backend/prisma/schema.prisma', c, 'utf8');
console.log('done');