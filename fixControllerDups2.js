const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/backend/src/controllers/analysis.controller.ts', 'utf8');

// The PLr block that appears twice in each entries.map
const plrBlock = '\n            plrS:        e.plrS        || null,\n            plrF:        e.plrF        || null,\n            plrP:        e.plrP        || null,\n            plrAuto:     e.plrAuto     || null,\n            plrManual:   e.plrManual   || null,\n            plCategory:  e.plCategory  || null,\n            plAchieved:  e.plAchieved  || null,\n            mttfd:       e.mttfd       || null,\n            dcavg:       e.dcavg       || null,';

// Process each entries.map section
// In create section (around 1944): keep first plrBlock, remove second
// In update section (around 5749): keep first plrBlock, remove second

const entriesMapPositions = [];
let idx = 0;
while (true) {
  idx = c.indexOf('entries.map', idx + 1);
  if (idx === -1) break;
  entriesMapPositions.push(idx);
}
console.log('entries.map positions:', entriesMapPositions);

// For each section, find and remove duplicate plrBlock
for (let i = 0; i < entriesMapPositions.length; i++) {
  const start = entriesMapPositions[i];
  const end = i + 1 < entriesMapPositions.length ? entriesMapPositions[i + 1] : c.length;
  
  const section = c.slice(start, end);
  const firstOccurrence = section.indexOf(plrBlock);
  const secondOccurrence = section.indexOf(plrBlock, firstOccurrence + 1);
  
  if (secondOccurrence > -1) {
    console.log(`Section ${i}: removing duplicate at offset ${secondOccurrence}`);
    const absolutePos = start + secondOccurrence;
    c = c.slice(0, absolutePos) + c.slice(absolutePos + plrBlock.length);
    // Recalculate positions after modification
    if (i + 1 < entriesMapPositions.length) {
      entriesMapPositions[i + 1] -= plrBlock.length;
    }
  } else {
    console.log(`Section ${i}: no duplicate found`);
  }
}

fs.writeFileSync('C:/Projects/riskpro/backend/src/controllers/analysis.controller.ts', c, 'utf8');
console.log('Final plrS count:', c.split('plrS:').length - 1);