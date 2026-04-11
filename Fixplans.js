const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/LandingPage.tsx', 'utf8');
const lines = c.split('\r\n');

const newPlans = `const PLANS = [
  {
    name: 'FREEMIUM',
    price: '0',
    period: '',
    desc: 'Dla firm z produkcj\u0105 jednostkow\u0105',
    features: [
      'Nieograniczone analizy w aplikacji',
      'Baza 150+ zagro\u017ce\u0144',
      'Matryca ryzyka S\u00d7P',
      'Pogl\u0105d przyk\u0142adowego raportu PDF',
      'Bez pobierania PDF',
    ],
    cta: 'Zacznij bezp\u0142atnie',
    highlighted: false,
  },
  {
    name: 'BASIC',
    price: '29',
    period: 'mies.',
    desc: 'Dla ma\u0142ych firm i freelancer\u00f3w',
    features: [
      '5 analiz miesi\u0119cznie',
      'Baza 150+ zagro\u017ce\u0144',
      'Matryca ryzyka S\u00d7P',
      'Raport PDF z logo',
      'Deklaracja Zgodno\u015bci CE (PDF)',
      'Wsparcie e-mail',
    ],
    cta: 'Wybierz Basic',
    highlighted: false,
  },
  {
    name: 'PRO',
    price: '99',
    period: 'mies.',
    desc: 'Dla rzeczoznawc\u00f3w i biur BHP',
    features: [
      'Nieograniczone analizy',
      'Baza 150+ zagro\u017ce\u0144',
      'Matryca ryzyka S\u00d7P',
      'Raport PDF z logo klienta',
      'Deklaracja Zgodno\u015bci CE (PDF)',
      'W\u0142asne logo w raporcie',
      'Priorytetowe wsparcie',
    ],
    cta: 'Wybierz PRO',
    highlighted: true,
  },
  {
    name: 'ENTERPRISE',
    price: 'custom',
    period: '',
    desc: 'Dla du\u017cych organizacji i OEM',
    features: [
      'Wszystko z PRO',
      'API do integracji',
      'W\u0142asna instancja (self-hosted)',
      'Dedykowany opiekun',
      'SLA 99,9%',
    ],
    cta: 'Skontaktuj si\u0119',
    highlighted: false,
  },
]`;

// Replace lines 36-87 (0-indexed)
const before = lines.slice(0, 36);
const after = lines.slice(88);
const result = [...before, ...newPlans.split('\n'), ...after].join('\r\n');

// Also fix the price display - replace 'zł' reference and '–' check
let fixed = result
  .replace(/p\.price !== 'â€"'/g, "p.price !== 'custom'")
  .replace(/p\.price === 'â€"'/g, "p.price === 'custom'")
  .replace(/zĹ‚ \/ \{p\.period\}/g, 'EUR / {p.period}')
  .replace(/Wycena indywidualna/g, 'Wycena indywidualna');

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/LandingPage.tsx', fixed);
console.log('done:', fixed.includes('FREEMIUM') && fixed.includes('BASIC'));