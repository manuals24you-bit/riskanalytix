const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/LandingPage.tsx', 'utf8');

const oldPlans = `const PLANS = [
  {
    name: 'STARTER',
    price: '49',
    period: 'mies.',
    desc: 'Dla freelancerów i małych firm',
    features: [
      '5 analiz miesięcznie',
      'Baza 150+ zagrożeń',
      'Matryca ryzyka S×P',
      'Raport PDF z logo',
      'Wsparcie e-mail',
    ],
    cta: 'Zacznij za darmo',
    highlighted: false,
  },
  {
    name: 'PRO',
    price: '149',
    period: 'mies.',
    desc: 'Dla rzeczoznawców i biur BHP',
    features: [
      'Nieograniczone analizy',
      'Baza 150+ zagrożeń',
      'Matryca ryzyka S×P',
      'Raport PDF z logo klienta',
      'Deklaracja Zgodności CE (PDF)',
      'Eksport DOCX / Excel',
      'Priorytetowe wsparcie',
      'Branding własny w PDF',
    ],
    cta: 'Wybierz PRO',
    highlighted: true,
  },
  {
    name: 'ENTERPRISE',
    price: '–',
    period: '',
    desc: 'Dla dużych organizacji i OEM',
    features: [
      'Wszystko z PRO',
      'Deklaracja CE dla serii maszyn',
      'Własna instancja (self-hosted)',
      'API do integracji',
      'Dedykowany opiekun',
      'SLA 99,9%',
      'Szkolenie dla zespołu',
    ],
    cta: 'Skontaktuj się',
    highlighted: false,
  },
]`;

const newPlans = `const PLANS = [
  {
    name: 'FREEMIUM',
    price: '0',
    period: '',
    desc: 'Dla firm z produkcją jednostkową',
    features: [
      'Nieograniczone analizy w aplikacji',
      'Baza 150+ zagrożeń',
      'Matryca ryzyka S×P',
      'Podgląd przykładowego raportu PDF',
      'Bez pobierania PDF',
    ],
    cta: 'Zacznij bezpłatnie',
    highlighted: false,
  },
  {
    name: 'BASIC',
    price: '29',
    period: 'mies.',
    desc: 'Dla małych firm i freelancerów',
    features: [
      '5 analiz miesięcznie',
      'Baza 150+ zagrożeń',
      'Matryca ryzyka S×P',
      'Raport PDF z logo',
      'Deklaracja Zgodności CE (PDF)',
      'Wsparcie e-mail',
    ],
    cta: 'Wybierz Basic',
    highlighted: false,
  },
  {
    name: 'PRO',
    price: '99',
    period: 'mies.',
    desc: 'Dla rzeczoznawców i biur BHP',
    features: [
      'Nieograniczone analizy',
      'Baza 150+ zagrożeń',
      'Matryca ryzyka S×P',
      'Raport PDF z logo klienta',
      'Deklaracja Zgodności CE (PDF)',
      'Własne logo w raporcie',
      'Priorytetowe wsparcie',
    ],
    cta: 'Wybierz PRO',
    highlighted: true,
  },
  {
    name: 'ENTERPRISE',
    price: '–',
    period: '',
    desc: 'Dla dużych organizacji i OEM',
    features: [
      'Wszystko z PRO',
      'API do integracji',
      'Własna instancja (self-hosted)',
      'Dedykowany opiekun',
      'SLA 99,9%',
    ],
    cta: 'Skontaktuj się',
    highlighted: false,
  },
]`;

c = c.replace(oldPlans, newPlans);
fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/LandingPage.tsx', c);
console.log('done:', c.includes('FREEMIUM'));