const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/i18n/landingTranslations.ts', 'utf8');

// Find and fix the broken French heroDesc
const brokenStart = c.indexOf("heroDesc: 'Un outil d\\'aide au processus");
if (brokenStart > -1) {
  const lineEnd = c.indexOf("',\r", brokenStart);
  const lineEnd2 = c.indexOf("',\n", brokenStart);
  const end = Math.min(lineEnd > -1 ? lineEnd : Infinity, lineEnd2 > -1 ? lineEnd2 : Infinity);
  
  const broken = c.slice(brokenStart, end + 2);
  console.log('broken:', broken.slice(0, 150));
  
  const fixed = "heroDesc: 'Un outil d\\'aide au processus d\\'analyse des risques selon ISO 12100. Base de dangers pr\u00eate, matrice des risques automatique et rapport PDF. La responsabilit\u00e9 finale de l\\''\u00e9valuation de la s\u00e9curit\u00e9 incombe \u00e0 l\\'utilisateur.'";
  // Actually - simpler fix:
  const correct = "heroDesc: 'Outil d\\'aide \u00e0 l\\'analyse des risques selon ISO 12100 pour les ing\u00e9nieurs s\u00e9curit\u00e9 et fabricants. Base de dangers pr\u00eate, matrice automatique et rapport PDF. La responsabilit\u00e9 finale de la s\u00e9curit\u00e9 incombe \u00e0 l\\'utilisateur.',";
  
  c = c.slice(0, brokenStart) + correct + c.slice(end + 2);
  console.log('fixed');
} else {
  console.log('not found - checking...');
  const idx = c.indexOf('analyse des risques selon ISO');
  console.log('at:', idx, 'context:', c.slice(idx-50, idx+100));
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/i18n/landingTranslations.ts', c, 'utf8');