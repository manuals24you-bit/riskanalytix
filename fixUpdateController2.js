const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/backend/src/controllers/analysis.controller.ts', 'utf8');

// Fix destructuring in updateAnalysis
const old = `      machineName, machineCategory, serialNo, manufacturer,
      productionYear, purpose, norm, analystName, analysisDate,
      notes, clientName, clientCompany, clientNip, clientAddress,
      language, entries = []
    } = req.body`;

const newVal = `      machineName, machineCategory, serialNo, manufacturer,
      productionYear, purpose, norm, analystName, analysisDate,
      notes, clientName, clientCompany, clientNip, clientAddress,
      language, riskMethod, intendedUse, foreseenMisuse, spaceLimits, timeLimits, envLimits,
      entries = []
    } = req.body`;

if (c.includes(old)) {
  c = c.replace(old, newVal);
  console.log('destructure fixed');
} else {
  console.log('NOT FOUND - checking line endings...');
  const old2 = old.replace(/\n/g, '\r\n');
  if (c.includes(old2)) {
    c = c.replace(old2, newVal);
    console.log('fixed with CRLF');
  }
}

// Now add the new fields to the update data object
// Find: notes: san(notes), in the update section
const updateIdx = c.indexOf('updateAnalysis');
const notesInUpdate = c.indexOf('notes:          san(notes),', updateIdx);
console.log('notes in update at:', notesInUpdate);

if (notesInUpdate > -1) {
  const after = c.slice(notesInUpdate + 'notes:          san(notes),'.length, notesInUpdate + 'notes:          san(notes),'.length + 5);
  console.log('after notes:', JSON.stringify(after));
  
  c = c.slice(0, notesInUpdate + 'notes:          san(notes),'.length) +
    '\n        riskMethod:     riskMethod || null,' +
    '\n        intendedUse:    intendedUse || null,' +
    '\n        foreseenMisuse: foreseenMisuse || null,' +
    '\n        spaceLimits:    spaceLimits || null,' +
    '\n        timeLimits:     timeLimits || null,' +
    '\n        envLimits:      envLimits || null,' +
    c.slice(notesInUpdate + 'notes:          san(notes),'.length);
  console.log('new fields added to update data');
}

fs.writeFileSync('C:/Projects/riskpro/backend/src/controllers/analysis.controller.ts', c, 'utf8');
console.log('riskMethod in update section:', c.slice(c.indexOf('updateAnalysis'), c.indexOf('updateAnalysis') + 1500).includes('riskMethod'));