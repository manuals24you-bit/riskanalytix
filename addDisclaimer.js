const fs = require('fs');

// 1. Add disclaimer box to LandingPage between hero and features
let page = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/LandingPage.tsx', 'utf8');

const marker = '\n      {/* FEATURES */}';
const idx = page.indexOf(marker);
console.log('features at:', idx);

const disclaimerBox = `
      {/* DISCLAIMER BOX */}
      <section style={{ background: '#0B0F1A', padding: '0 40px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', background: 'rgba(232,168,56,.08)', border: '1px solid rgba(232,168,56,.35)', borderRadius: '10px', padding: '20px 28px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '20px', flexShrink: 0 }}>⚠️</span>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#E8A838', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '.06em' }}>
                {t.disclaimerTitle || 'WAŻNE OSTRZEŻENIE — NARZĘDZIE POMOCNICZE'}
              </div>
              <div style={{ fontSize: '13px', color: '#C0C8D8', lineHeight: 1.7 }}>
                {t.disclaimerText || 'Narzędzie RiskAnalytix ma wyłącznie charakter pomocniczy i wspomagający. Generowane dokumenty (raport oceny ryzyka i szablon Deklaracji Zgodności CE) nie są dokumentami gotowymi do użycia i nie zastępują oficjalnej oceny zgodności ani konsultacji z certyfikowanym specjalistą BHP lub jednostką notyfikowaną. Ostateczna odpowiedzialność za bezpieczeństwo maszyny, prawidłowość oceny ryzyka i Deklaracji CE spoczywa wyłącznie na producencie lub modernizatorze.'}
                {' '}<a href="/terms" style={{ color: '#E8A838', textDecoration: 'underline' }}>{t.disclaimerLink || 'Regulamin →'}</a>
              </div>
            </div>
          </div>
        </div>
      </section>
`;

page = page.slice(0, idx) + disclaimerBox + page.slice(idx);
fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/LandingPage.tsx', page, 'utf8');
console.log('disclaimer added:', page.includes('disclaimerTitle'));

// 2. Add disclaimer keys to interface and translations in landingTranslations.ts
let trans = fs.readFileSync('C:/Projects/riskpro/frontend/src/i18n/landingTranslations.ts', 'utf8');

// Add to interface
trans = trans.replace(
  'footerTerms: string',
  'disclaimerTitle: string\n  disclaimerText: string\n  disclaimerLink: string\n  footerTerms: string'
);

// Add to each language
const langData = {
  pl: {
    title: 'WAŻNE OSTRZEŻENIE — NARZĘDZIE POMOCNICZE',
    text: 'Narzędzie RiskAnalytix ma wyłącznie charakter pomocniczy. Generowane dokumenty nie zastępują oficjalnej oceny zgodności CE ani konsultacji z certyfikowanym specjalistą BHP. Ostateczna odpowiedzialność spoczywa na producencie/modernizatorze maszyny.',
    link: 'Regulamin →'
  },
  en: {
    title: 'IMPORTANT WARNING — SUPPORTING TOOL ONLY',
    text: 'RiskAnalytix is a supporting tool only. Generated documents do not replace official CE conformity assessment or consultation with a certified safety specialist. Final responsibility rests with the machine manufacturer/modifier.',
    link: 'Terms of Service →'
  },
  de: {
    title: 'WICHTIGER HINWEIS — NUR HILFSWERKZEUG',
    text: 'RiskAnalytix ist nur ein Hilfswerkzeug. Generierte Dokumente ersetzen keine offizielle CE-Konformitätsbewertung oder Beratung durch einen zertifizierten Sicherheitsspezialisten. Die endgültige Verantwortung liegt beim Maschinenhersteller/-umbauer.',
    link: 'AGB →'
  },
  fr: {
    title: 'AVERTISSEMENT IMPORTANT — OUTIL DE SUPPORT UNIQUEMENT',
    text: 'RiskAnalytix est un outil de support uniquement. Les documents générés ne remplacent pas l\'évaluation officielle de conformité CE ni la consultation d\'un spécialiste certifié. La responsabilité finale incombe au fabricant/modificateur de la machine.',
    link: 'CGU →'
  },
  it: {
    title: 'AVVISO IMPORTANTE — SOLO STRUMENTO DI SUPPORTO',
    text: 'RiskAnalytix è solo uno strumento di supporto. I documenti generati non sostituiscono la valutazione ufficiale di conformità CE né la consulenza di uno specialista certificato. La responsabilità finale spetta al produttore/modificatore della macchina.',
    link: 'Termini →'
  },
  es: {
    title: 'AVISO IMPORTANTE — SOLO HERRAMIENTA DE APOYO',
    text: 'RiskAnalytix es solo una herramienta de apoyo. Los documentos generados no reemplazan la evaluación oficial de conformidad CE ni la consulta con un especialista certificado. La responsabilidad final recae en el fabricante/modificador de la máquina.',
    link: 'Términos →'
  },
  cs: {
    title: 'DŮLEŽITÉ UPOZORNĚNÍ — POUZE PODPŮRNÝ NÁSTROJ',
    text: 'RiskAnalytix je pouze podpůrný nástroj. Generované dokumenty nenahrazují oficiální posouzení shody CE ani konzultaci s certifikovaným specialistou. Konečná odpovědnost leží na výrobci/modernizátoru stroje.',
    link: 'Podmínky →'
  },
};

for (const [lang, data] of Object.entries(langData)) {
  const marker = `footerTerms:`;
  // Find the right language block
  const footerTermsInstances = [];
  let searchIdx = 0;
  while (true) {
    const idx2 = trans.indexOf('    footerTerms:', searchIdx);
    if (idx2 === -1) break;
    footerTermsInstances.push(idx2);
    searchIdx = idx2 + 1;
  }
  
  // Add disclaimer fields before each footerTerms (skip the interface one)
  // We'll do this by replacing footerTerms with disclaimer+footerTerms for each lang
}

// Simpler approach: replace footerTerms: '<value>' pattern with disclaimer+footerTerms
const langFooterTerms = {
  pl: "footerTerms: 'Regulamin'",
  en: "footerTerms: 'Terms'",
  de: "footerTerms: 'AGB'",
  fr: "footerTerms: 'CGU'",
  it: "footerTerms: 'Termini'",
  es: "footerTerms: 'T\\u00e9rminos'",
  cs: "footerTerms: 'Podm\\u00ednky'",
};

for (const [lang, data] of Object.entries(langData)) {
  const ft = langFooterTerms[lang];
  if (trans.includes(ft)) {
    trans = trans.replace(
      ft,
      `disclaimerTitle: '${data.title}',\n    disclaimerText: '${data.text.replace(/'/g, "\\'")}',\n    disclaimerLink: '${data.link}',\n    ${ft}`
    );
    console.log(`${lang}: added`);
  } else {
    console.log(`${lang}: NOT FOUND (${ft.slice(0,30)})`);
  }
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/i18n/landingTranslations.ts', trans, 'utf8');
console.log('done');