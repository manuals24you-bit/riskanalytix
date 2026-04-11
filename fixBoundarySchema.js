const fs = require('fs');
let schema = fs.readFileSync('C:/Projects/riskpro/backend/prisma/schema.prisma', 'utf8');

// Use the correct field name found earlier
const marker = '  notes           Strin';
const notesLine = schema.indexOf(marker);
console.log('notes at:', notesLine);

// Find end of notes line
const notesEnd = schema.indexOf('\n', notesLine) + 1;
const notesFullLine = schema.slice(notesLine, notesEnd);
console.log('notes line:', notesFullLine);

if (!schema.includes('intendedUse')) {
  schema = schema.slice(0, notesEnd) +
    '  intendedUse    String?\n' +
    '  foreseenMisuse String?\n' +
    '  spaceLimits    String?\n' +
    '  timeLimits     String?\n' +
    '  envLimits      String?\n' +
    schema.slice(notesEnd);
  console.log('fields added');
}

fs.writeFileSync('C:/Projects/riskpro/backend/prisma/schema.prisma', schema, 'utf8');
console.log('intendedUse:', schema.includes('intendedUse'));