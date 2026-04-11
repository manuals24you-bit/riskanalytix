const fs = require('fs');
const files = [
  'C:/Projects/riskpro/frontend/src/services/api.ts',
  'C:/Projects/riskpro/frontend/src/store/auth.store.ts',
];
files.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  const orig = c;
  c = c.replace(/riskpro-auth/g, 'riskanalytix-auth');
  if (c !== orig) {
    fs.writeFileSync(f, c);
    console.log('Updated:', f);
  }
});
