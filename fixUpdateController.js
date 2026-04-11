const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/backend/src/controllers/analysis.controller.ts', 'utf8');

// Find and fix the destructuring in updateAnalysis
const oldDestructure = `    const {
      machineName, machineCategory, serialNo, manufacturer,
      productionYear, purpose, norm, analystName, analysisDate,
      notes, clientName, clientCompany, clientNip, clientAddress,
      language, entries = []
    } = req.body`;

const newDestructure = `    const {
      machineName, machineCategory, serialNo, manufacturer,
      productionYear, purpose, norm, analystName, analysisDate,
      notes, clientName, clientCompany, clientNip, clientAddress,
      language, riskMethod, intendedUse, foreseenMisuse, spaceLimits, timeLimits, envLimits,
      entries = []
    } = req.body`;

if (c.includes(oldDestructure)) {
  c = c.replace(oldDestructure, newDestructure);
  console.log('destructure fixed');
} else {
  console.log('not found, searching...');
  const idx = c.indexOf('notes, clientName, clientCompany, clientNip, clientAddress,\n      language, entries');
  console.log('at:', idx, c.slice(idx, idx + 100));
}

// Also fix the update data to include new fields
const oldData = `        machineName,
        machineCategory,
        serialNo:       ser`;

// Find the update data section
const updateDataIdx = c.indexOf('data: {\n        machineName,', c.indexOf('updateAnalysis'));
if (updateDataIdx > -1) {
  const dataEnd = c.indexOf('\n      },\n      include:', updateDataIdx);
  const dataSection = c.slice(updateDataIdx, dataEnd);
  console.log('data section found, length:', dataSection.length);
  
  // Check if riskMethod is already there
  if (!dataSection.includes('riskMethod')) {
    // Find where notes ends in data
    const notesInData = c.indexOf('notes,\n', updateDataIdx);
    if (notesInData > -1 && notesInData < dataEnd) {
      c = c.slice(0, notesInData + 6) + '\n        riskMethod,\n        intendedUse,\n        foreseenMisuse,\n        spaceLimits,\n        timeLimits,\n        envLimits,' + c.slice(notesInData + 6);
      console.log('new fields added to update data');
    }
  }
}

fs.writeFileSync('C:/Projects/riskpro/backend/src/controllers/analysis.controller.ts', c, 'utf8');
console.log('riskMethod in update:', c.slice(c.indexOf('updateAnalysis'), c.indexOf('updateAnalysis') + 1500).includes('riskMethod'));