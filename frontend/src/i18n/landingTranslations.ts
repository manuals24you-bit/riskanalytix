// frontend/src/i18n/landingTranslations.ts

export type Lang = 'pl' | 'en' | 'de' | 'fr' | 'it' | 'es' | 'cs'

export interface LandingT {
  // NAV
  navFeatures: string
  navCE: string
  navHowItWorks: string
  navPricing: string
  navLogin: string
  navTry: string

  // HERO
  heroBadge: string
  heroTitle1: string
  heroTitle2: string
  heroDesc: string
  heroCta1: string
  heroCta2: string
  heroStat1: string
  heroStat2: string
  heroStat3: string
  heroStat4: string

  // FEATURES
  featuresLabel: string
  featuresTitle1: string
  featuresTitle2: string
  feat1title: string
  feat1desc: string
  feat2title: string
  feat2desc: string
  feat3title: string
  feat3desc: string
  feat4title: string
  feat4desc: string
  feat4badge: string
  feat5title: string
  feat5desc: string
  feat6title: string
  feat6desc: string

  // CE SECTION
  ceBadge: string
  ceTitle1: string
  ceTitle2: string
  ceDesc: string
  ceCta: string
  ceItem1: string
  ceItem2: string
  ceItem3: string
  ceItem4: string
  ceItem5: string
  ceItem6: string
  ceDocTitle: string
  ceDocSub: string
  ceDocSig1: string
  ceDocSig2: string

  // HOW IT WORKS
  howLabel: string
  howTitle1: string
  howTitle2: string
  step1title: string
  step1desc: string
  step2title: string
  step2desc: string
  step3title: string
  step3desc: string
  step4title: string
  step4desc: string

  // NORMS
  normsLabel: string

  // PRICING
  pricingLabel: string
  pricingTitle1: string
  pricingTitle2: string
  pricingDesc: string
  popular: string

  plan1name: string
  plan1desc: string
  plan1cta: string
  plan1f1: string
  plan1f2: string
  plan1f3: string
  plan1f4: string
  plan1f5: string

  plan2name: string
  plan2desc: string
  plan2cta: string
  plan2f1: string
  plan2f2: string
  plan2f3: string
  plan2f4: string
  plan2f5: string
  plan2f6: string

  plan3name: string
  plan3desc: string
  plan3cta: string
  plan3f1: string
  plan3f2: string
  plan3f3: string
  plan3f4: string
  plan3f5: string
  plan3f6: string
  plan3f7: string

  // CTA SECTION
  ctaTitle1: string
  ctaTitle2: string
  ctaDesc: string
  ctaBtn1: string
  ctaBtn2: string

  // FOOTER
  disclaimerTitle: string
  disclaimerText: string
  disclaimerLink: string
  footerTerms: string
  footerPrivacy: string
  footerRodo: string
  footerRights: string
}

const translations: Record<Lang, LandingT> = {
  pl: {
    navFeatures: 'Funkcje',
    navCE: 'Deklaracja CE',
    navHowItWorks: 'Jak to działa',
    navPricing: 'Cennik',
    navLogin: 'Zaloguj się',
    navTry: 'Wypróbuj za darmo',

    heroBadge: 'Narzędzie wspierające analizę ryzyka · EN ISO 12100:2012 · Dyrektywa 2006/42/WE · 2023/1230/UE',
    heroTitle1: 'Wsparcie do oceny ryzyka maszyn',
    heroTitle2: '— wsparcie analizy ryzyka i szablon CE',
    heroDesc: 'Narzędzie wspomagające proces oceny ryzyka maszyn zgodnie z ISO 12100. Gotowa baza zagrożeń, automatyczna macierz ryzyka i raport PDF. Ostateczna odpowiedzialność za ocenę bezpieczeństwa i zgodność CE spoczywa wyłącznie na producencie/modernizatorze maszyny.',
    heroCta1: 'Zacznij za darmo →',
    heroCta2: 'Zobacz Deklarację CE',
    heroStat1: 'zagrożeń w bazie',
    heroStat2: 'typów maszyn',
    heroStat3: 'języków interfejsu',
    heroStat4: 'Deklaracja Zgodności',

    featuresLabel: 'Możliwości',
    featuresTitle1: 'Wszystko, czego potrzebujesz do wsparcia',
    featuresTitle2: 'analizy ryzyka maszyn',
    feat1title: 'Baza 150+ zagrożeń',
    feat1desc: 'Gotowe listy zagrożeń dla 20 typów maszyn. Tokarki, frezarki, prasy, roboty, dźwignice i wiele więcej — każda z przypisanymi normami.',
    feat2title: 'Matryca ryzyka S×P',
    feat2desc: 'Automatyczna klasyfikacja ryzyka metodą ciężkość × prawdopodobieństwo zgodnie z PN-EN ISO 12100:2012.',
    feat3title: 'Raport PDF',
    feat3desc: 'Profesjonalny raport gotowy do przekazania klientowi lub organom kontrolnym. Logo firmy, dane klienta, pełna tabela zagrożeń.',
    feat4title: 'Deklaracja Zgodności CE',
    feat4desc: 'Generuj Deklarację Zgodności WE w formacie PDF jednym kliknięciem. Zgodna z Dyrektywą Maszynową 2006/42/WE i rozporządzeniem 2023/1230/UE.',
    feat4badge: 'Nowość',
    feat5title: 'Zgodność z dyrektywą',
    feat5desc: 'Analiza zgodna z Dyrektywą Maszynową 2006/42/WE i rozporządzeniem 2023/1230/UE. Normy szczegółowe dla każdego typu maszyny.',
    feat6title: '7 języków',
    feat6desc: 'Interfejs i raporty w języku polskim, angielskim, niemieckim, francuskim, włoskim, hiszpańskim i czeskim.',

    ceBadge: 'Deklaracja Zgodności CE',
    ceTitle1: 'Szablon Deklaracji',
    ceTitle2: 'Zgodności WE (do weryfikacji przez producenta)',
    ceDesc: 'Na podstawie danych wprowadzonych przez użytkownika RiskAnalytix generuje szablon Deklaracji Zgodności WE. Szablon wymaga weryfikacji, uzupełnienia i podpisu przez producenta/modernizatora maszyny. Narzędzie ma wyłącznie charakter pomocniczy i nie zastępuje oceny certyfikowanego specjalisty.',
    ceCta: 'Generuj Deklarację CE →',
    ceItem1: 'Szablon Deklaracji Zgodności WE w PDF (do weryfikacji)',
    ceItem2: 'Dane producenta i maszyny automatycznie z analizy',
    ceItem3: 'Lista dyrektyw: 2006/42/WE, EMC, LVD',
    ceItem4: 'Zastosowane normy zharmonizowane',
    ceItem5: 'Sekcja podpisów upoważnionych przedstawicieli',
    ceItem6: 'Dokument w 7 językach UE',
    ceDocTitle: 'DEKLARACJA ZGODNOŚCI WE',
    ceDocSub: 'EC DECLARATION OF CONFORMITY',
    ceDocSig1: 'Miejsce i data / Place and date',
    ceDocSig2: 'Podpis i pieczęć / Signature',

    howLabel: 'Proces',
    howTitle1: 'Od maszyny do szablonu Deklaracji CE',
    howTitle2: '— 4 kroki',
    step1title: 'Wybierz maszynę',
    step1desc: 'Wybierz kategorię i typ maszyny z bazy. System automatycznie przypisuje właściwe normy i listę zagrożeń.',
    step2title: 'Dane i klient',
    step2desc: 'Wprowadź dane maszyny i dane klienta. Dane pojawią się w nagłówku raportu PDF i Deklaracji CE.',
    step3title: 'Lista zagrożeń',
    step3desc: 'Edytuj gotową listę zagrożeń lub dodaj własne. Ustaw ciężkość i prawdopodobieństwo dla każdego.',
    step4title: 'Raport + Deklaracja CE',
    step4desc: 'Pobierz raport PDF i szablon Deklaracji Zgodności CE — wymaga weryfikacji i podpisu przez producenta.',

    normsLabel: 'Obsługiwane normy i dyrektywy',

    pricingLabel: 'Cennik',
    pricingTitle1: 'Prosty,',
    pricingTitle2: 'przejrzysty cennik',
    pricingDesc: 'Pierwsza analiza zawsze bezpłatna. Bez ukrytych opłat.',
    popular: 'Najpopularniejszy',

    plan1name: 'FREEMIUM',
    plan1desc: 'Dla firm z produkcją jednostkową',
    plan1cta: 'Zacznij bezpłatnie',
    plan1f1: 'Nieograniczone analizy w aplikacji',
    plan1f2: 'Baza 150+ zagrożeń',
    plan1f3: 'Matryca ryzyka S×P',
    plan1f4: 'Podgląd przykładowego raportu PDF',
    plan1f5: 'Bez pobierania PDF',

    plan2name: 'BASIC',
    plan2desc: 'Dla małych firm i freelancerów',
    plan2cta: 'Wybierz Basic',
    plan2f1: '5 analiz miesięcznie',
    plan2f2: 'Baza 150+ zagrożeń',
    plan2f3: 'Matryca ryzyka S×P',
    plan2f4: 'Raport PDF z logo',
    plan2f5: 'Deklaracja Zgodności CE (PDF)',
    plan2f6: 'Wsparcie e-mail',

    plan3name: 'PRO',
    plan3desc: 'Dla rzeczoznawców i biur BHP',
    plan3cta: 'Wybierz PRO',
    plan3f1: 'Nieograniczone analizy',
    plan3f2: 'Baza 150+ zagrożeń',
    plan3f3: 'Matryca ryzyka S×P + S×F×P×A',
    plan3f4: 'Raport PDF z logo klienta',
    plan3f5: 'Deklaracja Zgodności CE (PDF)',
    plan3f6: 'Własne logo w raporcie',
    plan3f7: 'Priorytetowe wsparcie',

    ctaTitle1: 'Wsparcie analizy ryzyka',
    ctaTitle2: 'pierwsze użycie bezpłatne',
    ctaDesc: 'Pierwsza analiza jest w pełni bezpłatna. Nie wymagamy karty kredytowej.',
    ctaBtn1: 'Utwórz konto bezpłatnie →',
    ctaBtn2: 'Zobacz Deklarację CE',

    disclaimerTitle: 'WAŻNE OSTRZEŻENIE — NARZĘDZIE POMOCNICZE',
    disclaimerText: 'Narzędzie RiskAnalytix ma wyłącznie charakter pomocniczy. Generowane dokumenty nie zastępują oficjalnej oceny zgodności CE ani konsultacji z certyfikowanym specjalistą BHP. Ostateczna odpowiedzialność spoczywa na producencie/modernizatorze maszyny.',
    disclaimerLink: 'Regulamin →',
    footerTerms: 'Regulamin',
    footerPrivacy: 'Prywatność',
    footerRodo: 'RODO',
    footerRights: 'Wszelkie prawa zastrzeżone.',
  },

  en: {
    navFeatures: 'Features',
    navCE: 'CE Declaration',
    navHowItWorks: 'How it works',
    navPricing: 'Pricing',
    navLogin: 'Log in',
    navTry: 'Try for free',

    heroBadge: 'Risk analysis support tool · EN ISO 12100:2012 · Directive 2006/42/EC · 2023/1230/EU',
    heroTitle1: 'Machine Risk Assessment Support Tool',
    heroTitle2: '— risk analysis support tool',
    heroDesc: 'A tool supporting the risk analysis process per ISO 12100 for safety engineers, design offices and machine manufacturers. Ready hazard database, automatic risk matrix and PDF report. Final responsibility for safety assessment rests with the user.',
    heroCta1: 'Start for free →',
    heroCta2: 'See CE Declaration',
    heroStat1: 'hazards in database',
    heroStat2: 'machine types',
    heroStat3: 'interface languages',
    heroStat4: 'Declaration of Conformity',

    featuresLabel: 'Features',
    featuresTitle1: 'Everything you need to support',
    featuresTitle2: 'your machine risk analysis',
    feat1title: '150+ hazard database',
    feat1desc: 'Ready hazard lists for 20 machine types. Lathes, milling machines, presses, robots, cranes and more — each with assigned standards.',
    feat2title: 'S×P risk matrix',
    feat2desc: 'Automatic risk classification using severity × probability method in accordance with EN ISO 12100:2012.',
    feat3title: 'PDF Report',
    feat3desc: 'Professional report ready to be handed to the client or inspection authorities. Company logo, client data, full hazard table.',
    feat4title: 'CE Declaration of Conformity',
    feat4desc: 'Generate a Declaration of Conformity in PDF format with one click. Compliant with Machinery Directive 2006/42/EC and Regulation 2023/1230/EU.',
    feat4badge: 'New',
    feat5title: 'Directive compliance',
    feat5desc: 'Analysis compliant with Machinery Directive 2006/42/EC and Regulation 2023/1230/EU. Specific standards for each machine type.',
    feat6title: '7 languages',
    feat6desc: 'Interface and reports in Polish, English, German, French, Italian, Spanish and Czech.',

    ceBadge: 'CE Declaration of Conformity',
    ceTitle1: 'CE Declaration',
    ceTitle2: 'of Conformity Template (for manufacturer review)',
    ceDesc: 'Based on data entered by the user, RiskAnalytix generates a Declaration of Conformity template. The template requires verification, completion and signature by the machine manufacturer/modifier. This tool is for support purposes only and does not replace assessment by a certified safety specialist.',
    ceCta: 'Generate CE Declaration →',
    ceItem1: 'CE Declaration of Conformity template in PDF (requires verification)',
    ceItem2: 'Manufacturer and machine data automatically from analysis',
    ceItem3: 'List of directives: 2006/42/EC, EMC, LVD',
    ceItem4: 'Applied harmonised standards',
    ceItem5: 'Signature section for authorised representatives',
    ceItem6: 'Document in 7 EU languages',
    ceDocTitle: 'EC DECLARATION OF CONFORMITY',
    ceDocSub: 'DEKLARACJA ZGODNOŚCI WE',
    ceDocSig1: 'Place and date',
    ceDocSig2: 'Signature and stamp',

    howLabel: 'Process',
    howTitle1: 'From machine to CE Declaration template',
    howTitle2: '— 4 steps',
    step1title: 'Select machine',
    step1desc: 'Select the machine category and type from the database. The system automatically assigns the appropriate standards and hazard list.',
    step2title: 'Data and client',
    step2desc: 'Enter machine data and client data. The data will appear in the header of the PDF report and CE Declaration.',
    step3title: 'Hazard list',
    step3desc: 'Edit the ready hazard list or add your own. Set severity and probability for each.',
    step4title: 'Report + CE Declaration',
    step4desc: 'Download the PDF report and CE Declaration template — requires verification and signing by the manufacturer.',

    normsLabel: 'Supported standards and directives',

    pricingLabel: 'Pricing',
    pricingTitle1: 'Simple,',
    pricingTitle2: 'transparent pricing',
    pricingDesc: 'First analysis always free. No hidden fees.',
    popular: 'Most popular',

    plan1name: 'FREEMIUM',
    plan1desc: 'For companies with one-off production',
    plan1cta: 'Start for free',
    plan1f1: 'Unlimited analyses in app',
    plan1f2: '150+ hazard database',
    plan1f3: 'S×P risk matrix',
    plan1f4: 'Preview of sample PDF report',
    plan1f5: 'No PDF download',

    plan2name: 'BASIC',
    plan2desc: 'For small businesses and freelancers',
    plan2cta: 'Choose Basic',
    plan2f1: '5 analyses per month',
    plan2f2: '150+ hazard database',
    plan2f3: 'S×P risk matrix',
    plan2f4: 'PDF report with logo',
    plan2f5: 'CE Declaration of Conformity (PDF)',
    plan2f6: 'Email support',

    plan3name: 'PRO',
    plan3desc: 'For safety engineers and OHS offices',
    plan3cta: 'Choose PRO',
    plan3f1: 'Unlimited analyses',
    plan3f2: '150+ hazard database',
    plan3f3: 'S×P + S×F×P×A risk matrix',
    plan3f4: 'PDF report with client logo',
    plan3f5: 'CE Declaration of Conformity (PDF)',
    plan3f6: 'Custom logo in report',
    plan3f7: 'Priority support',

    ctaTitle1: 'Risk assessment support tool',
    ctaTitle2: 'first use free',
    ctaDesc: 'The first analysis is completely free. No credit card required.',
    ctaBtn1: 'Create account for free →',
    ctaBtn2: 'See CE Declaration',

    disclaimerTitle: 'IMPORTANT WARNING — SUPPORTING TOOL ONLY',
    disclaimerText: 'RiskAnalytix is a supporting tool only. Generated documents do not replace official CE conformity assessment or consultation with a certified safety specialist. Final responsibility rests with the machine manufacturer/modifier.',
    disclaimerLink: 'Terms of Service →',
    footerTerms: 'Terms',
    footerPrivacy: 'Privacy',
    footerRodo: 'GDPR',
    footerRights: 'All rights reserved.',
  },

  de: {
    navFeatures: 'Funktionen',
    navCE: 'CE-Erklärung',
    navHowItWorks: 'So funktioniert es',
    navPricing: 'Preise',
    navLogin: 'Anmelden',
    navTry: 'Kostenlos testen',

    heroBadge: 'Werkzeug zur Unterstützung der Risikoanalyse · EN ISO 12100:2012 · Richtlinie 2006/42/EG · 2023/1230/EU',
    heroTitle1: 'Unterstützungswerkzeug für die Maschinensicherheitsbewertung',
    heroTitle2: '— Werkzeug zur Unterstützung der Risikoanalyse',
    heroDesc: 'Ein Werkzeug zur Unterstützung der Risikoanalyse gemäß ISO 12100. Fertige Gefährdungsdatenbank, automatische Risikomatrix und PDF-Bericht. Die endgültige Verantwortung für die Sicherheitsbewertung liegt beim Anwender.',
    heroCta1: 'Kostenlos starten →',
    heroCta2: 'CE-Erklärung ansehen',
    heroStat1: 'Gefährdungen in der Datenbank',
    heroStat2: 'Maschinentypen',
    heroStat3: 'Oberflächensprachen',
    heroStat4: 'Konformitätserklärung',

    featuresLabel: 'Funktionen',
    featuresTitle1: 'Alles was Sie brauchen',
    featuresTitle2: 'für eine zuverlässige Risikobewertung',
    feat1title: '150+ Gefährdungsdatenbank',
    feat1desc: 'Fertige Gefährdungslisten für 20 Maschinentypen. Drehmaschinen, Fräsmaschinen, Pressen, Roboter, Krane und mehr — jede mit zugewiesenen Normen.',
    feat2title: 'S×W Risikomatrix',
    feat2desc: 'Automatische Risikoklassifizierung nach der Schwere × Wahrscheinlichkeit-Methode gemäß EN ISO 12100:2012.',
    feat3title: 'PDF-Bericht',
    feat3desc: 'Professioneller Bericht zur Weitergabe an den Kunden oder Prüfbehörden. Firmenlogo, Kundendaten, vollständige Gefährdungstabelle.',
    feat4title: 'CE-Konformitätserklärung',
    feat4desc: 'Generieren Sie eine Konformitätserklärung im PDF-Format mit einem Klick. Konform mit der Maschinenrichtlinie 2006/42/EG und Verordnung 2023/1230/EU.',
    feat4badge: 'Neu',
    feat5title: 'Richtlinienkonformität',
    feat5desc: 'Analyse konform mit der Maschinenrichtlinie 2006/42/EG und Verordnung 2023/1230/EU. Spezifische Normen für jeden Maschinentyp.',
    feat6title: '7 Sprachen',
    feat6desc: 'Oberfläche und Berichte auf Polnisch, Englisch, Deutsch, Französisch, Italienisch, Spanisch und Tschechisch.',

    ceBadge: 'CE-Konformitätserklärung',
    ceTitle1: 'Konformitätserklärung',
    ceTitle2: 'als PDF-Vorlage (vom Hersteller zu prüfen)',
    ceDesc: 'Auf Basis der vom Nutzer eingegebenen Daten erstellt RiskAnalytix eine Vorlage der Konformitätserklärung. Die Vorlage muss vom Maschinenhersteller/-umbauer geprüft, ergänzt und unterzeichnet werden. Dieses Werkzeug ist nur ein Hilfsmittel und ersetzt keine Prüfung durch einen zertifizierten Sicherheitsspezialisten.',
    ceCta: 'CE-Erklärung generieren →',
    ceItem1: 'Vorlage EG-Konformitätserklärung als PDF (zur Prüfung)',
    ceItem2: 'Hersteller- und Maschinendaten automatisch aus der Analyse',
    ceItem3: 'Liste der Richtlinien: 2006/42/EG, EMV, NE',
    ceItem4: 'Angewandte harmonisierte Normen',
    ceItem5: 'Unterschriftsbereich für bevollmächtigte Vertreter',
    ceItem6: 'Dokument in 7 EU-Sprachen',
    ceDocTitle: 'EG-KONFORMITÄTSERKLÄRUNG',
    ceDocSub: 'EC DECLARATION OF CONFORMITY',
    ceDocSig1: 'Ort und Datum',
    ceDocSig2: 'Unterschrift und Stempel',

    howLabel: 'Prozess',
    howTitle1: 'Von der Maschine zur CE-Erklärungsvorlage',
    howTitle2: 'in 4 Schritten',
    step1title: 'Maschine auswählen',
    step1desc: 'Wählen Sie die Maschinenkategorie und den Typ aus der Datenbank. Das System weist automatisch die entsprechenden Normen und die Gefährdungsliste zu.',
    step2title: 'Daten und Kunde',
    step2desc: 'Geben Sie Maschinendaten und Kundendaten ein. Die Daten erscheinen im Kopf des PDF-Berichts und der CE-Erklärung.',
    step3title: 'Gefährdungsliste',
    step3desc: 'Bearbeiten Sie die fertige Gefährdungsliste oder fügen Sie eigene hinzu. Legen Sie Schwere und Wahrscheinlichkeit für jede fest.',
    step4title: 'Bericht + CE-Erklärung',
    step4desc: 'Laden Sie den PDF-Bericht und die CE-Erklärungsvorlage herunter — muss vom Hersteller geprüft und unterzeichnet werden.',

    normsLabel: 'Unterstützte Normen und Richtlinien',

    pricingLabel: 'Preise',
    pricingTitle1: 'Einfache,',
    pricingTitle2: 'transparente Preise',
    pricingDesc: 'Erste Analyse immer kostenlos. Keine versteckten Gebühren.',
    popular: 'Am beliebtesten',

    plan1name: 'FREEMIUM',
    plan1desc: 'Für Unternehmen mit Einzelfertigung',
    plan1cta: 'Kostenlos starten',
    plan1f1: 'Unbegrenzte Analysen in der App',
    plan1f2: '150+ Gefährdungsdatenbank',
    plan1f3: 'S×W Risikomatrix',
    plan1f4: 'Vorschau des Beispiel-PDF-Berichts',
    plan1f5: 'Kein PDF-Download',

    plan2name: 'BASIC',
    plan2desc: 'Für kleine Unternehmen und Freelancer',
    plan2cta: 'Basic wählen',
    plan2f1: '5 Analysen pro Monat',
    plan2f2: '150+ Gefährdungsdatenbank',
    plan2f3: 'S×W Risikomatrix',
    plan2f4: 'PDF-Bericht mit Logo',
    plan2f5: 'CE-Konformitätserklärung (PDF)',
    plan2f6: 'E-Mail-Support',

    plan3name: 'PRO',
    plan3desc: 'Für Sicherheitsingenieure und Arbeitssicherheitsbüros',
    plan3cta: 'PRO wählen',
    plan3f1: 'Unbegrenzte Analysen',
    plan3f2: '150+ Gefährdungsdatenbank',
    plan3f3: 'Risikomatrix S×P + S×F×P×A',
    plan3f4: 'PDF-Bericht mit Kundenlogo',
    plan3f5: 'CE-Konformitätserklärung (PDF)',
    plan3f6: 'Eigenes Logo im Bericht',
    plan3f7: 'Prioritäts-Support',

    ctaTitle1: 'Unterstützungswerkzeug für Risikobewertung',
    ctaTitle2: 'erste Nutzung kostenlos',
    ctaDesc: 'Die erste Analyse ist völlig kostenlos. Keine Kreditkarte erforderlich.',
    ctaBtn1: 'Konto kostenlos erstellen →',
    ctaBtn2: 'CE-Erklärung ansehen',

    disclaimerTitle: 'WICHTIGER HINWEIS — NUR HILFSWERKZEUG',
    disclaimerText: 'RiskAnalytix ist nur ein Hilfswerkzeug. Generierte Dokumente ersetzen keine offizielle CE-Konformitätsbewertung oder Beratung durch einen zertifizierten Sicherheitsspezialisten. Die endgültige Verantwortung liegt beim Maschinenhersteller/-umbauer.',
    disclaimerLink: 'AGB →',
    footerTerms: 'AGB',
    footerPrivacy: 'Datenschutz',
    footerRodo: 'DSGVO',
    footerRights: 'Alle Rechte vorbehalten.',
  },

  fr: {
    navFeatures: 'Fonctionnalités',
    navCE: 'Déclaration CE',
    navHowItWorks: 'Comment ça marche',
    navPricing: 'Tarifs',
    navLogin: 'Se connecter',
    navTry: 'Essayer gratuitement',

    heroBadge: 'Outil d’aide à l’analyse des risques · EN ISO 12100:2012 · Directive 2006/42/CE · 2023/1230/UE',
    heroTitle1: 'Outil de support pour l\'analyse des risques machines',
    heroTitle2: '— outil d\'aide à l\'analyse des risques',
    heroDesc: 'Outil d\'aide à l\'analyse des risques selon ISO 12100 pour les ingénieurs sécurité et fabricants. Base de dangers prête, matrice automatique et rapport PDF. La responsabilité finale de la sécurité incombe à l\'utilisateur.',
    heroCta1: 'Commencer gratuitement →',
    heroCta2: 'Voir la Déclaration CE',
    heroStat1: 'dangers dans la base',
    heroStat2: 'types de machines',
    heroStat3: 'langues d\'interface',
    heroStat4: 'Déclaration de Conformité',

    featuresLabel: 'Fonctionnalités',
    featuresTitle1: 'Tout ce dont vous avez besoin',
    featuresTitle2: 'pour une évaluation des risques fiable',
    feat1title: 'Base de 150+ dangers',
    feat1desc: 'Listes de dangers prêtes pour 20 types de machines. Tours, fraiseuses, presses, robots, grues et plus — chacune avec les normes assignées.',
    feat2title: 'Matrice de risques S×P',
    feat2desc: 'Classification automatique des risques par la méthode gravité × probabilité conformément à EN ISO 12100:2012.',
    feat3title: 'Rapport PDF',
    feat3desc: 'Rapport professionnel prêt à être remis au client ou aux autorités de contrôle. Logo de l\'entreprise, données client, tableau complet des dangers.',
    feat4title: 'Déclaration de Conformité CE',
    feat4desc: 'Générez une Déclaration de Conformité CE en format PDF en un clic. Conforme à la Directive Machines 2006/42/CE et au Règlement 2023/1230/UE.',
    feat4badge: 'Nouveau',
    feat5title: 'Conformité aux directives',
    feat5desc: 'Analyse conforme à la Directive Machines 2006/42/CE et au Règlement 2023/1230/UE. Normes spécifiques pour chaque type de machine.',
    feat6title: '7 langues',
    feat6desc: 'Interface et rapports en polonais, anglais, allemand, français, italien, espagnol et tchèque.',

    ceBadge: 'Déclaration de Conformité CE',
    ceTitle1: 'Générez la Déclaration',
    ceTitle2: 'de Conformité CE (modèle à vérifier par le fabricant)',
    ceDesc: 'Sur la base de l\'évaluation des risques effectuée, RiskAnalytix génère automatiquement une Déclaration de Conformité CE prête à signer. Le document répond aux exigences de la Directive Machines 2006/42/CE et du nouveau Règlement 2023/1230/UE.',
    ceCta: 'Générer la Déclaration CE →',
    ceItem1: 'Modèle de Déclaration CE en PDF (à vérifier)',
    ceItem2: 'Données fabricant et machine automatiquement depuis l\'analyse',
    ceItem3: 'Liste des directives : 2006/42/CE, CEM, DBT',
    ceItem4: 'Normes harmonisées appliquées',
    ceItem5: 'Section signatures des représentants autorisés',
    ceItem6: 'Document en 7 langues UE',
    ceDocTitle: 'DÉCLARATION CE DE CONFORMITÉ',
    ceDocSub: 'EC DECLARATION OF CONFORMITY',
    ceDocSig1: 'Lieu et date',
    ceDocSig2: 'Signature et cachet',

    howLabel: 'Processus',
    howTitle1: 'De la machine au modèle de Déclaration CE',
    howTitle2: 'en 4 étapes',
    step1title: 'Choisir la machine',
    step1desc: 'Sélectionnez la catégorie et le type de machine dans la base. Le système attribue automatiquement les normes appropriées et la liste des dangers.',
    step2title: 'Données et client',
    step2desc: 'Saisissez les données machine et client. Les données apparaîtront dans l\'en-tête du rapport PDF et de la Déclaration CE.',
    step3title: 'Liste des dangers',
    step3desc: 'Modifiez la liste de dangers prête ou ajoutez les vôtres. Définissez la gravité et la probabilité pour chacun.',
    step4title: 'Rapport + Déclaration CE',
    step4desc: 'Téléchargez le rapport PDF et le modèle de Déclaration CE — à vérifier et signer par le fabricant.',

    normsLabel: 'Normes et directives supportées',

    pricingLabel: 'Tarifs',
    pricingTitle1: 'Tarification simple',
    pricingTitle2: 'et transparente',
    pricingDesc: 'Première analyse toujours gratuite. Sans frais cachés.',
    popular: 'Le plus populaire',

    plan1name: 'FREEMIUM',
    plan1desc: 'Pour les entreprises à production unitaire',
    plan1cta: 'Commencer gratuitement',
    plan1f1: 'Analyses illimitées dans l\'app',
    plan1f2: 'Base de 150+ dangers',
    plan1f3: 'Matrice de risques S×P',
    plan1f4: 'Aperçu du rapport PDF exemple',
    plan1f5: 'Sans téléchargement PDF',

    plan2name: 'BASIC',
    plan2desc: 'Pour les petites entreprises et freelances',
    plan2cta: 'Choisir Basic',
    plan2f1: '5 analyses par mois',
    plan2f2: 'Base de 150+ dangers',
    plan2f3: 'Matrice de risques S×P',
    plan2f4: 'Rapport PDF avec logo',
    plan2f5: 'Déclaration de Conformité CE (PDF)',
    plan2f6: 'Support e-mail',

    plan3name: 'PRO',
    plan3desc: 'Pour les ingénieurs sécurité et bureaux HSE',
    plan3cta: 'Choisir PRO',
    plan3f1: 'Analyses illimitées',
    plan3f2: 'Base de 150+ dangers',
    plan3f3: 'Matrice de risques S×P + S×F×P×A',
    plan3f4: 'Rapport PDF avec logo client',
    plan3f5: 'Déclaration de Conformité CE (PDF)',
    plan3f6: 'Logo personnalisé dans le rapport',
    plan3f7: 'Support prioritaire',

    ctaTitle1: 'Outil de support à l\'analyse des risques',
    ctaTitle2: 'première utilisation gratuite',
    ctaDesc: 'La première analyse est entièrement gratuite. Aucune carte de crédit requise.',
    ctaBtn1: 'Créer un compte gratuitement →',
    ctaBtn2: 'Voir la Déclaration CE',

    disclaimerTitle: 'AVERTISSEMENT IMPORTANT — OUTIL DE SUPPORT UNIQUEMENT',
    disclaimerText: 'RiskAnalytix est un outil de support uniquement. Les documents générés ne remplacent pas l\'évaluation officielle de conformité CE ni la consultation d\'un spécialiste certifié. La responsabilité finale incombe au fabricant/modificateur de la machine.',
    disclaimerLink: 'CGU →',
    footerTerms: 'CGU',
    footerPrivacy: 'Confidentialité',
    footerRodo: 'RGPD',
    footerRights: 'Tous droits réservés.',
  },

  it: {
    navFeatures: 'Funzionalità',
    navCE: 'Dichiarazione CE',
    navHowItWorks: 'Come funziona',
    navPricing: 'Prezzi',
    navLogin: 'Accedi',
    navTry: 'Prova gratuitamente',

    heroBadge: 'Strumento di supporto all\'analisi dei rischi · EN ISO 12100:2012 2006/42/CE · 2023/1230/UE',
    heroTitle1: 'Strumento di supporto alla valutazione dei rischi macchine',
    heroTitle2: '— strumento di supporto all\'analisi dei rischi',
    heroDesc: 'Uno strumento di supporto al processo di analisi dei rischi secondo ISO 12100. Database di pericoli pronto, matrice dei rischi automatica e report PDF. La responsabilità finale della valutazione della sicurezza spetta all\'utente.',
    heroCta1: 'Inizia gratuitamente →',
    heroCta2: 'Vedi Dichiarazione CE',
    heroStat1: 'pericoli nel database',
    heroStat2: 'tipi di macchine',
    heroStat3: 'lingue interfaccia',
    heroStat4: 'Dichiarazione di Conformità',

    featuresLabel: 'Funzionalità',
    featuresTitle1: 'Tutto ciò di cui hai bisogno',
    featuresTitle2: 'per una valutazione dei rischi affidabile',
    feat1title: 'Database 150+ pericoli',
    feat1desc: 'Elenchi di pericoli pronti per 20 tipi di macchine. Torni, fresatrici, presse, robot, gru e altro — ognuna con norme assegnate.',
    feat2title: 'Matrice rischi S×P',
    feat2desc: 'Classificazione automatica dei rischi con il metodo gravità × probabilità in conformità con EN ISO 12100:2012.',
    feat3title: 'Report PDF',
    feat3desc: 'Report professionale pronto per essere consegnato al cliente o alle autorità di controllo. Logo aziendale, dati cliente, tabella completa dei pericoli.',
    feat4title: 'Dichiarazione di Conformità CE',
    feat4desc: 'Genera una Dichiarazione di Conformità CE in formato PDF con un clic. Conforme alla Direttiva Macchine 2006/42/CE e al Regolamento 2023/1230/UE.',
    feat4badge: 'Novità',
    feat5title: 'Conformità alle direttive',
    feat5desc: 'Analisi conforme alla Direttiva Macchine 2006/42/CE e al Regolamento 2023/1230/UE. Norme specifiche per ogni tipo di macchina.',
    feat6title: '7 lingue',
    feat6desc: 'Interfaccia e report in polacco, inglese, tedesco, francese, italiano, spagnolo e ceco.',

    ceBadge: 'Dichiarazione di Conformità CE',
    ceTitle1: 'Genera Dichiarazione',
    ceTitle2: 'di Conformità CE (modello da verificare dal produttore)',
    ceDesc: 'Sulla base dei dati inseriti dall\'utente, RiskAnalytix genera un modello di Dichiarazione di Conformità CE. Il modello richiede verifica, completamento e firma da parte del produttore. Questo strumento è solo di supporto e non sostituisce la valutazione di uno specialista certificato.',
    ceCta: 'Genera Dichiarazione CE →',
    ceItem1: 'Modello Dichiarazione CE in PDF (da verificare)',
    ceItem2: 'Dati produttore e macchina automaticamente dall\'analisi',
    ceItem3: 'Elenco direttive: 2006/42/CE, EMC, DBT',
    ceItem4: 'Norme armonizzate applicate',
    ceItem5: 'Sezione firme dei rappresentanti autorizzati',
    ceItem6: 'Documento in 7 lingue UE',
    ceDocTitle: 'DICHIARAZIONE CE DI CONFORMITÀ',
    ceDocSub: 'EC DECLARATION OF CONFORMITY',
    ceDocSig1: 'Luogo e data',
    ceDocSig2: 'Firma e timbro',

    howLabel: 'Processo',
    howTitle1: 'Dalla macchina al modello di Dichiarazione CE',
    howTitle2: 'in 4 passi',
    step1title: 'Seleziona la macchina',
    step1desc: 'Seleziona la categoria e il tipo di macchina dal database. Il sistema assegna automaticamente le norme appropriate e l\'elenco dei pericoli.',
    step2title: 'Dati e cliente',
    step2desc: 'Inserisci i dati della macchina e del cliente. I dati appariranno nell\'intestazione del report PDF e della Dichiarazione CE.',
    step3title: 'Elenco pericoli',
    step3desc: 'Modifica l\'elenco dei pericoli pronto o aggiungine di tuoi. Imposta gravità e probabilità per ciascuno.',
    step4title: 'Report + Dichiarazione CE',
    step4desc: 'Scarica il report PDF e il modello di Dichiarazione CE — richiede verifica e firma da parte del produttore.',

    normsLabel: 'Norme e direttive supportate',

    pricingLabel: 'Prezzi',
    pricingTitle1: 'Prezzi semplici',
    pricingTitle2: 'e trasparenti',
    pricingDesc: 'Prima analisi sempre gratuita. Senza costi nascosti.',
    popular: 'Più popolare',

    plan1name: 'FREEMIUM',
    plan1desc: 'Per aziende con produzione unitaria',
    plan1cta: 'Inizia gratuitamente',
    plan1f1: 'Analisi illimitate nell\'app',
    plan1f2: 'Database 150+ pericoli',
    plan1f3: 'Matrice rischi S×P',
    plan1f4: 'Anteprima report PDF di esempio',
    plan1f5: 'Senza download PDF',

    plan2name: 'BASIC',
    plan2desc: 'Per piccole imprese e freelance',
    plan2cta: 'Scegli Basic',
    plan2f1: '5 analisi al mese',
    plan2f2: 'Database 150+ pericoli',
    plan2f3: 'Matrice rischi S×P',
    plan2f4: 'Report PDF con logo',
    plan2f5: 'Dichiarazione di Conformità CE (PDF)',
    plan2f6: 'Supporto e-mail',

    plan3name: 'PRO',
    plan3desc: 'Per ingegneri della sicurezza e uffici HSE',
    plan3cta: 'Scegli PRO',
    plan3f1: 'Analisi illimitate',
    plan3f2: 'Database 150+ pericoli',
    plan3f3: 'Matrice rischi S×P + S×F×P×A',
    plan3f4: 'Report PDF con logo cliente',
    plan3f5: 'Dichiarazione di Conformità CE (PDF)',
    plan3f6: 'Logo personalizzato nel report',
    plan3f7: 'Supporto prioritario',

    ctaTitle1: 'Strumento di supporto alla valutazione dei rischi',
    ctaTitle2: 'primo utilizzo gratuito',
    ctaDesc: 'La prima analisi è completamente gratuita. Nessuna carta di credito richiesta.',
    ctaBtn1: 'Crea account gratuitamente →',
    ctaBtn2: 'Vedi Dichiarazione CE',

    disclaimerTitle: 'AVVISO IMPORTANTE — SOLO STRUMENTO DI SUPPORTO',
    disclaimerText: 'RiskAnalytix è solo uno strumento di supporto. I documenti generati non sostituiscono la valutazione ufficiale di conformità CE né la consulenza di uno specialista certificato. La responsabilità finale spetta al produttore/modificatore della macchina.',
    disclaimerLink: 'Termini →',
    footerTerms: 'Termini',
    footerPrivacy: 'Privacy',
    footerRodo: 'GDPR',
    footerRights: 'Tutti i diritti riservati.',
  },

  es: {
    navFeatures: 'Funciones',
    navCE: 'Declaración CE',
    navHowItWorks: 'Cómo funciona',
    navPricing: 'Precios',
    navLogin: 'Iniciar sesión',
    navTry: 'Probar gratis',

    heroBadge: 'Herramienta de apoyo al análisis de riesgos · EN ISO 12100:2012 · Directiva 2006/42/CE · 2023/1230/UE',
    heroTitle1: 'Herramienta de apoyo a la evaluación de riesgos de máquinas',
    heroTitle2: '— herramienta de apoyo al análisis de riesgos',
    heroDesc: 'Una herramienta de apoyo al proceso de análisis de riesgos según ISO 12100. Base de datos de peligros lista, matriz de riesgos automática e informe PDF. La responsabilidad final de la evaluación de seguridad recae en el usuario.',
    heroCta1: 'Empezar gratis →',
    heroCta2: 'Ver Declaración CE',
    heroStat1: 'peligros en la base de datos',
    heroStat2: 'tipos de máquinas',
    heroStat3: 'idiomas de interfaz',
    heroStat4: 'Declaración de Conformidad',

    featuresLabel: 'Funciones',
    featuresTitle1: 'Todo lo que necesitas',
    featuresTitle2: 'para una evaluación de riesgos fiable',
    feat1title: 'Base de datos 150+ peligros',
    feat1desc: 'Listas de peligros listas para 20 tipos de máquinas. Tornos, fresadoras, prensas, robots, grúas y más — cada una con normas asignadas.',
    feat2title: 'Matriz de riesgos S×P',
    feat2desc: 'Clasificación automática de riesgos mediante el método gravedad × probabilidad conforme a EN ISO 12100:2012.',
    feat3title: 'Informe PDF',
    feat3desc: 'Informe profesional listo para entregar al cliente o a las autoridades de control. Logo de empresa, datos del cliente, tabla completa de peligros.',
    feat4title: 'Declaración de Conformidad CE',
    feat4desc: 'Genera una Declaración de Conformidad CE en formato PDF con un clic. Conforme a la Directiva de Máquinas 2006/42/CE y al Reglamento 2023/1230/UE.',
    feat4badge: 'Nuevo',
    feat5title: 'Conformidad con directivas',
    feat5desc: 'Análisis conforme a la Directiva de Máquinas 2006/42/CE y al Reglamento 2023/1230/UE. Normas específicas para cada tipo de máquina.',
    feat6title: '7 idiomas',
    feat6desc: 'Interfaz e informes en polaco, inglés, alemán, francés, italiano, español y checo.',

    ceBadge: 'Declaración de Conformidad CE',
    ceTitle1: 'Genera Declaración',
    ceTitle2: 'de Conformidad CE (plantilla para revisión del fabricante)',
    ceDesc: 'Basándose en los datos introducidos por el usuario, RiskAnalytix genera una plantilla de Declaración de Conformidad CE. La plantilla requiere verificación, completado y firma por el fabricante. Esta herramienta es solo de apoyo y no reemplaza la evaluación de un especialista certificado.',
    ceCta: 'Generar Declaración CE →',
    ceItem1: 'Plantilla Declaración CE en PDF (requiere verificación)',
    ceItem2: 'Datos del fabricante y la máquina automáticamente del análisis',
    ceItem3: 'Lista de directivas: 2006/42/CE, EMC, BT',
    ceItem4: 'Normas armonizadas aplicadas',
    ceItem5: 'Sección de firmas de representantes autorizados',
    ceItem6: 'Documento en 7 idiomas de la UE',
    ceDocTitle: 'DECLARACIÓN CE DE CONFORMIDAD',
    ceDocSub: 'EC DECLARATION OF CONFORMITY',
    ceDocSig1: 'Lugar y fecha',
    ceDocSig2: 'Firma y sello',

    howLabel: 'Proceso',
    howTitle1: 'De la máquina a la plantilla de Declaración CE',
    howTitle2: 'en 4 pasos',
    step1title: 'Seleccionar máquina',
    step1desc: 'Selecciona la categoría y tipo de máquina de la base de datos. El sistema asigna automáticamente las normas apropiadas y la lista de peligros.',
    step2title: 'Datos y cliente',
    step2desc: 'Introduce los datos de la máquina y del cliente. Los datos aparecerán en el encabezado del informe PDF y la Declaración CE.',
    step3title: 'Lista de peligros',
    step3desc: 'Edita la lista de peligros lista o añade los tuyos. Establece la gravedad y probabilidad para cada uno.',
    step4title: 'Informe + Declaración CE',
    step4desc: 'Descarga el informe PDF y la plantilla de Declaración CE — requiere verificación y firma del fabricante.',

    normsLabel: 'Normas y directivas compatibles',

    pricingLabel: 'Precios',
    pricingTitle1: 'Precios simples',
    pricingTitle2: 'y transparentes',
    pricingDesc: 'Primer análisis siempre gratuito. Sin cargos ocultos.',
    popular: 'Más popular',

    plan1name: 'FREEMIUM',
    plan1desc: 'Para empresas con producción unitaria',
    plan1cta: 'Empezar gratis',
    plan1f1: 'Análisis ilimitados en la app',
    plan1f2: 'Base de datos 150+ peligros',
    plan1f3: 'Matriz de riesgos S×P',
    plan1f4: 'Vista previa del informe PDF de ejemplo',
    plan1f5: 'Sin descarga de PDF',

    plan2name: 'BASIC',
    plan2desc: 'Para pequeñas empresas y freelancers',
    plan2cta: 'Elegir Basic',
    plan2f1: '5 análisis al mes',
    plan2f2: 'Base de datos 150+ peligros',
    plan2f3: 'Matriz de riesgos S×P',
    plan2f4: 'Informe PDF con logo',
    plan2f5: 'Declaración de Conformidad CE (PDF)',
    plan2f6: 'Soporte por e-mail',

    plan3name: 'PRO',
    plan3desc: 'Para ingenieros de seguridad y oficinas HSE',
    plan3cta: 'Elegir PRO',
    plan3f1: 'Análisis ilimitados',
    plan3f2: 'Base de datos 150+ peligros',
    plan3f3: 'Matriz de riesgos S×P + S×F×P×A',
    plan3f4: 'Informe PDF con logo del cliente',
    plan3f5: 'Declaración de Conformidad CE (PDF)',
    plan3f6: 'Logo personalizado en el informe',
    plan3f7: 'Soporte prioritario',

    ctaTitle1: 'Herramienta de apoyo a la evaluación de riesgos',
    ctaTitle2: 'primer uso gratuito',
    ctaDesc: 'El primer análisis es completamente gratuito. No se requiere tarjeta de crédito.',
    ctaBtn1: 'Crear cuenta gratis →',
    ctaBtn2: 'Ver Declaración CE',

    disclaimerTitle: 'AVISO IMPORTANTE — SOLO HERRAMIENTA DE APOYO',
    disclaimerText: 'RiskAnalytix es solo una herramienta de apoyo. Los documentos generados no reemplazan la evaluación oficial de conformidad CE ni la consulta con un especialista certificado. La responsabilidad final recae en el fabricante/modificador de la máquina.',
    disclaimerLink: 'Términos →',
    footerTerms: 'Términos',
    footerPrivacy: 'Privacidad',
    footerRodo: 'RGPD',
    footerRights: 'Todos los derechos reservados.',
  },

  cs: {
    navFeatures: 'Funkce',
    navCE: 'Prohlášení CE',
    navHowItWorks: 'Jak to funguje',
    navPricing: 'Ceny',
    navLogin: 'Přihlásit se',
    navTry: 'Vyzkoušet zdarma',

    heroBadge: 'Nástroj pro podporu analýzy rizik · EN ISO 12100:2012 · Směrnice 2006/42/ES · 2023/1230/EU',
    heroTitle1: 'Nástroj pro podporu hodnocení rizik strojů',
    heroTitle2: '— nástroj pro podporu analýzy rizik',
    heroDesc: 'Nástroj pro podporu procesu analýzy rizik podle ISO 12100. Připravená databáze nebezpečí, automatická matice rizik a PDF zpráva. Konečná odpovědnost za hodnocení bezpečnosti leží na uživateli.',
    heroCta1: 'Začít zdarma →',
    heroCta2: 'Zobrazit Prohlášení CE',
    heroStat1: 'nebezpečí v databázi',
    heroStat2: 'typů strojů',
    heroStat3: 'jazyků rozhraní',
    heroStat4: 'Prohlášení o shodě',

    featuresLabel: 'Funkce',
    featuresTitle1: 'Vše co potřebujete',
    featuresTitle2: 'pro spolehlivé hodnocení rizik',
    feat1title: 'Databáze 150+ nebezpečí',
    feat1desc: 'Připravené seznamy nebezpečí pro 20 typů strojů. Soustruhy, frézky, lisy, roboty, jeřáby a další — každý s přiřazenými normami.',
    feat2title: 'Matice rizik S×P',
    feat2desc: 'Automatická klasifikace rizik metodou závažnost × pravděpodobnost v souladu s EN ISO 12100:2012.',
    feat3title: 'PDF zpráva',
    feat3desc: 'Profesionální zpráva připravená k předání klientovi nebo kontrolním orgánům. Logo firmy, data klienta, úplná tabulka nebezpečí.',
    feat4title: 'Prohlášení o shodě CE',
    feat4desc: 'Generujte Prohlášení o shodě CE ve formátu PDF jedním kliknutím. V souladu se Směrnicí o strojních zařízeních 2006/42/ES a Nařízením 2023/1230/EU.',
    feat4badge: 'Novinka',
    feat5title: 'Soulad se směrnicemi',
    feat5desc: 'Analýza v souladu se Směrnicí o strojních zařízeních 2006/42/ES a Nařízením 2023/1230/EU. Specifické normy pro každý typ stroje.',
    feat6title: '7 jazyků',
    feat6desc: 'Rozhraní a zprávy v polštině, angličtině, němčině, francouzštině, italštině, španělštině a češtině.',

    ceBadge: 'Prohlášení o shodě CE',
    ceTitle1: 'Generujte Prohlášení',
    ceTitle2: 'o shodě CE (vzor ke kontrole výrobcem)',
    ceDesc: 'Na základě dat zadaných uživatelem generuje RiskAnalytix šablonu Prohlášení o shodě CE. Šablona vyžaduje ověření, doplnění a podpis výrobce. Tento nástroj je pouze podpůrný a nenahrazuje hodnocení certifikovaného specialisty.',
    ceCta: 'Generovat Prohlášení CE →',
    ceItem1: 'Vzor Prohlášení CE v PDF (vyžaduje ověření)',
    ceItem2: 'Data výrobce a stroje automaticky z analýzy',
    ceItem3: 'Seznam směrnic: 2006/42/ES, EMC, NNZ',
    ceItem4: 'Použité harmonizované normy',
    ceItem5: 'Sekce podpisů oprávněných zástupců',
    ceItem6: 'Dokument v 7 jazycích EU',
    ceDocTitle: 'ES PROHLÁŠENÍ O SHODĚ',
    ceDocSub: 'EC DECLARATION OF CONFORMITY',
    ceDocSig1: 'Místo a datum',
    ceDocSig2: 'Podpis a razítko',

    howLabel: 'Postup',
    howTitle1: 'Od stroje ke vzoru Prohlášení CE',
    howTitle2: 've 4 krocích',
    step1title: 'Vyberte stroj',
    step1desc: 'Vyberte kategorii a typ stroje z databáze. Systém automaticky přiřadí příslušné normy a seznam nebezpečí.',
    step2title: 'Data a klient',
    step2desc: 'Zadejte data stroje a klienta. Data se zobrazí v záhlaví PDF zprávy a Prohlášení CE.',
    step3title: 'Seznam nebezpečí',
    step3desc: 'Upravte připravený seznam nebezpečí nebo přidejte vlastní. Nastavte závažnost a pravděpodobnost pro každé.',
    step4title: 'Zpráva + Prohlášení CE',
    step4desc: 'Stáhněte PDF zprávu a vzor Prohlášení CE — vyžaduje ověření a podpis výrobce.',

    normsLabel: 'Podporované normy a směrnice',

    pricingLabel: 'Ceny',
    pricingTitle1: 'Jednoduché,',
    pricingTitle2: 'transparentní ceny',
    pricingDesc: 'První analýza vždy zdarma. Bez skrytých poplatků.',
    popular: 'Nejpopulárnější',

    plan1name: 'FREEMIUM',
    plan1desc: 'Pro firmy s kusovou výrobou',
    plan1cta: 'Začít zdarma',
    plan1f1: 'Neomezené analýzy v aplikaci',
    plan1f2: 'Databáze 150+ nebezpečí',
    plan1f3: 'Matice rizik S×P',
    plan1f4: 'Náhled ukázkové PDF zprávy',
    plan1f5: 'Bez stahování PDF',

    plan2name: 'BASIC',
    plan2desc: 'Pro malé firmy a freelancery',
    plan2cta: 'Zvolit Basic',
    plan2f1: '5 analýz měsíčně',
    plan2f2: 'Databáze 150+ nebezpečí',
    plan2f3: 'Matice rizik S×P',
    plan2f4: 'PDF zpráva s logem',
    plan2f5: 'Prohlášení o shodě CE (PDF)',
    plan2f6: 'E-mailová podpora',

    plan3name: 'PRO',
    plan3desc: 'Pro bezpečnostní inženýry a BOZP kanceláře',
    plan3cta: 'Zvolit PRO',
    plan3f1: 'Neomezené analýzy',
    plan3f2: 'Databáze 150+ nebezpečí',
    plan3f3: 'Matice rizik S×P + S×F×P×A',
    plan3f4: 'PDF zpráva s logem klienta',
    plan3f5: 'Prohlášení o shodě CE (PDF)',
    plan3f6: 'Vlastní logo ve zprávě',
    plan3f7: 'Prioritní podpora',

    ctaTitle1: 'Nástroj pro podporu hodnocení rizik',
    ctaTitle2: 'první použití zdarma',
    ctaDesc: 'První analýza je zcela zdarma. Kreditní karta není vyžadována.',
    ctaBtn1: 'Vytvořit účet zdarma →',
    ctaBtn2: 'Zobrazit Prohlášení CE',

    disclaimerTitle: 'Dūležité upozornění — pouze podpůrný nástroj',
    disclaimerText: 'RiskAnalytix je pouze podpůrný nástroj. Generované dokumenty nenahrazují oficiální posouzení shody CE ani konzultaci s certifikovaným specialistou. Konečná odpovědnost leží na výrobci/modernizátoru stroje.',
    disclaimerLink: 'Podmínky →',
    footerTerms: 'Podmínky',
    footerPrivacy: 'Ochrana dat',
    footerRodo: 'GDPR',
    footerRights: 'Všechna práva vyhrazena.',
  },
}

export function getLandingT(lang: Lang): LandingT {
  return translations[lang] || translations.en
}