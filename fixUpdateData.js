const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/backend/src/controllers/analysis.controller.ts', 'utf8');

const updateIdx = c.indexOf('updateAnalysis');
const notesInUpdate = c.indexOf('notes:          notes          || null,', updateIdx);
console.log('notes at:', notesInUpdate);

if (notesInUpdate > -1) {
  const insertAfter = notesInUpdate + 'notes:          notes          || null,'.length;
  c = c.slice(0, insertAfter) +
    '\n        riskMethod:     riskMethod     || null,' +
    '\n        intendedUse:    intendedUse    || null,' +
    '\n        foreseenMisuse: foreseenMisuse || null,' +
    '\n        spaceLimits:    spaceLimits    || null,' +
    '\n        timeLimits:     timeLimits     || null,' +
    '\n        envLimits:      envLimits      || null,' +
    c.slice(insertAfter);
  console.log('fields added');
} else {
  console.log('not found');
  // Try without double spaces
  const idx2 = c.indexOf('notes:          notes', updateIdx);
  console.log('notes (partial) at:', idx2, JSON.stringify(c.slice(idx2, idx2 + 50)));
}

fs.writeFileSync('C:/Projects/riskpro/backend/src/controllers/analysis.controller.ts', c, 'utf8');
console.log('riskMethod in update:', c.slice(updateIdx, updateIdx + 2000).includes('riskMethod'));