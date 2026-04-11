const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/LandingPage.tsx', 'utf8');

// Find and replace the ternary block
const search = "? <span style={{ fontFamily: 'Georgia, serif', fontSize: '44px', color: '#F0EDE8', lineHeight: 1 }}>Free</span>";
const idx = c.indexOf(search);
console.log('found at:', idx);

if (idx > -1) {
  // Find the surrounding block
  const blockStart = c.lastIndexOf('{p.price', idx);
  const blockEnd = c.indexOf('\n                }', idx) + '\n                }'.length;
  
  const newBlock = `{p.price === '0' && <span style={{ fontFamily: 'Georgia, serif', fontSize: '44px', color: '#F0EDE8', lineHeight: 1 }}>Free</span>}
                {p.price !== '0' && <span style={{ fontFamily: 'Georgia, serif', fontSize: '44px', color: '#F0EDE8', lineHeight: 1 }}>{p.price}</span>}
                {p.price !== '0' && p.period && <span style={{ fontSize: '13px', color: '#8a99b0', fontFamily: 'Lato, sans-serif' }}>EUR / {p.period}</span>}`;
  
  c = c.slice(0, blockStart) + newBlock + c.slice(blockEnd);
  fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/LandingPage.tsx', c);
  console.log('done');
} else {
  console.log('not found');
}