const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/LandingPage.tsx', 'utf8');

// Fix currency - find the price display lines and replace
c = c.replace(
  /\{p\.price !== '.*?' && <span style=\{\{ fontFamily: 'Georgia, serif', fontSize: '44px', color: '#F0EDE8', lineHeight: 1 \}\}>\{p\.price\}<\/span>\}/,
  "{p.price !== 'custom' && p.price !== '0' && <span style={{ fontFamily: 'Georgia, serif', fontSize: '44px', color: '#F0EDE8', lineHeight: 1 }}>{p.price}</span>}"
);

c = c.replace(
  /\{p\.price !== '.*?' && <span style=\{\{ fontSize: '13px', color: '#8a99b0', fontFamily: 'Lato, sans-serif' \}\}>.*?\/ \{p\.period\}<\/span>\}/,
  "{p.price !== 'custom' && p.price !== '0' && <span style={{ fontSize: '13px', color: '#8a99b0', fontFamily: 'Lato, sans-serif' }}>EUR / {p.period}</span>}"
);

c = c.replace(
  /\{p\.price === '.*?' && <span style=\{\{ fontFamily: 'Georgia, serif', fontSize: '32px', color: '#8a99b0' \}\}>Wycena indywidualna<\/span>\}/,
  "{p.price === 'custom' && <span style={{ fontFamily: 'Georgia, serif', fontSize: '32px', color: '#8a99b0' }}>Wycena indywidualna</span>}"
);

// Add free badge for FREEMIUM
c = c.replace(
  "{p.price !== 'custom' && p.price !== '0' && <span style={{ fontFamily: 'Georgia, serif', fontSize: '44px', color: '#F0EDE8', lineHeight: 1 }}>{p.price}</span>}",
  "{p.price === '0' && <span style={{ fontFamily: 'Georgia, serif', fontSize: '44px', color: '#F0EDE8', lineHeight: 1 }}>Free</span>}\n                {p.price !== 'custom' && p.price !== '0' && <span style={{ fontFamily: 'Georgia, serif', fontSize: '44px', color: '#F0EDE8', lineHeight: 1 }}>{p.price}</span>}"
);

// Hide ENTERPRISE from the grid - filter it out
c = c.replace(
  '{PLANS.map((p, i) => (',
  '{PLANS.filter(p => p.name !== \'ENTERPRISE\').map((p, i) => ('
);

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/LandingPage.tsx', c);
console.log('done');