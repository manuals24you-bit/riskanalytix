// frontend/src/pages/analysis/SamplePDFButtons.tsx
import { PDFDownloadLink } from '@react-pdf/renderer'
import RiskReportPDF from './RiskReportPDF'
import CEDeclarationPDF from './CEDeclarationPDF'
import { translateRiskEntry } from '../../i18n/machinesI18n'
import type { Lang } from '../../i18n/machinesI18n'

const DEMO_ACTIONS: Record<Lang, string[]> = {
  pl: [
    'Osłona wrzeciona z blokadą, procedury LOTO',
    'Osłony strefy roboczej, okulary ochronne',
    'Procedury wymiany narzędzi, rękawice ochronne',
    'Osłony ruchomych elementów, szkolenie operatorów',
    'Podtrzymka kłowa, ogranicznik długości detalu',
    'Blokada szafy, przeglądy elektryczne, PE',
    'Procedury uruchomienia, klucz dostępu do trybu auto',
    'Wentylacja, rękawice nitrylowe, karty SDS',
    'Filtr mgiełki olejowej, maski P2',
    'Ochronniki słuchu, pomiary hałasu co 2 lata',
    'Balansowanie narzędzi, rotacja pracowników',
    'Mata antyzmęczeniowa, przerwy co 2h',
    'Gaśnica proszkowa przy maszynie, zakaz palenia',
  ],
  en: [
    'Spindle guard with interlock, LOTO procedures',
    'Machining zone guards, safety glasses',
    'Tool change procedures, protective gloves',
    'Guards on moving parts, operator training',
    'Tailstock support, workpiece length limiter',
    'Cabinet lock, electrical inspections, PE',
    'Start-up procedures, key switch for auto mode',
    'Ventilation, nitrile gloves, SDS sheets',
    'Oil mist filter, P2 respirators',
    'Hearing protection, noise measurements every 2 years',
    'Tool balancing, worker rotation',
    'Anti-fatigue mat, breaks every 2h',
    'Powder extinguisher at machine, no smoking',
  ],
  de: [
    'Spindelabdeckung mit Verriegelung, LOTO-Verfahren',
    'Schutzvorrichtungen für Bearbeitungszone, Schutzbrille',
    'Werkzeugwechselverfahren, Schutzhandschuhe',
    'Abdeckungen beweglicher Teile, Bedienerschulung',
    'Reitstockstütze, Werkstücklängenbegrenzer',
    'Schrankverriegelung, Elektroprüfungen, PE',
    'Anlaufverfahren, Schlüsselschalter für Automatikmodus',
    'Belüftung, Nitrilhandschuhe, Sicherheitsdatenblätter',
    'Ölnebelfilter, P2-Atemschutzmasken',
    'Gehörschutz, Lärmmessungen alle 2 Jahre',
    'Werkzeugwuchtung, Mitarbeiterrotation',
    'Ermüdungsschutzmatte, Pausen alle 2h',
    'Pulverlöscher an der Maschine, Rauchverbot',
  ],
  fr: [
    'Protection de broche avec verrouillage, procédures LOTO',
    'Protections de zone d\'usinage, lunettes de sécurité',
    'Procédures de changement d\'outil, gants de protection',
    'Protections des parties mobiles, formation des opérateurs',
    'Support de poupée mobile, limiteur de longueur de pièce',
    'Verrouillage armoire, contrôles électriques, EP',
    'Procédures de démarrage, commutateur à clé mode auto',
    'Ventilation, gants nitrile, fiches de données de sécurité',
    'Filtre brouillard d\'huile, masques P2',
    'Protections auditives, mesures de bruit tous les 2 ans',
    'Équilibrage des outils, rotation du personnel',
    'Tapis anti-fatigue, pauses toutes les 2h',
    'Extincteur poudre à la machine, interdiction de fumer',
  ],
  it: [
    'Protezione mandrino con interblocco, procedure LOTO',
    'Protezioni zona di lavorazione, occhiali di sicurezza',
    'Procedure cambio utensile, guanti protettivi',
    'Protezioni parti mobili, formazione operatori',
    'Supporto contropunta, limitatore lunghezza pezzo',
    'Blocco quadro, ispezioni elettriche, PE',
    'Procedure di avvio, selettore a chiave modo automatico',
    'Ventilazione, guanti nitrile, schede di sicurezza',
    'Filtro nebbia d\'olio, maschere P2',
    'Protezioni uditive, misurazioni rumore ogni 2 anni',
    'Bilanciamento utensili, rotazione lavoratori',
    'Tappeto antifatica, pause ogni 2h',
    'Estintore a polvere alla macchina, divieto di fumare',
  ],
  es: [
    'Protector de husillo con enclavamiento, procedimientos LOTO',
    'Protecciones de zona de mecanizado, gafas de seguridad',
    'Procedimientos de cambio de herramienta, guantes de protección',
    'Protecciones de partes móviles, formación de operadores',
    'Soporte de contrapunto, limitador de longitud de pieza',
    'Bloqueo de armario, inspecciones eléctricas, EP',
    'Procedimientos de arranque, llave selectora modo automático',
    'Ventilación, guantes de nitrilo, fichas de datos de seguridad',
    'Filtro de niebla de aceite, mascarillas P2',
    'Protectores auditivos, mediciones de ruido cada 2 años',
    'Equilibrado de herramientas, rotación de trabajadores',
    'Alfombrilla antifatiga, descansos cada 2h',
    'Extintor de polvo en la máquina, prohibido fumar',
  ],
  cs: [
    'Kryt vřetena s blokováním, postupy LOTO',
    'Kryty obráběcí zóny, ochranné brýle',
    'Postupy výměny nástrojů, ochranné rukavice',
    'Kryty pohyblivých části, školení obsluhy',
    'Podpěra koníku, omezovač délky obrobku',
    'Zámek skříně, elektrické kontroly, OOP',
    'Spouštěcí postupy, klíčový přepínač automatického režimu',
    'Ventilace, nitrylové rukavice, bezpečnostní listy',
    'Filtr olejové mlhy, respirátory P2',
    'Chrániče sluchu, měření hluku každé 2 roky',
    'Vyvažování nástrojů, rotace pracovníků',
    'Protiunavová podložka, přestávky každé 2h',
    'Práškový hasicí přístroj u stroje, zákaz kouření',
  ],
}

const DEMO_ENTRIES_PL = [
  { id: '1', element: 'Wrzeciono / uchwyt tokarski', threat: 'Pochwycenie / wciągnięcie', effect: 'Urazy kończyn górnych, amputacja', severity: 4, probability: 3, riskScore: 12, sortOrder: 0 },
  { id: '2', element: 'Strefa obróbki — wióry', threat: 'Wyrzucenie odłamków / wiórów', effect: 'Urazy oczu, twarzy i ciała', severity: 3, probability: 4, riskScore: 12, sortOrder: 1 },
  { id: '3', element: 'Narzędzie skrawające', threat: 'Cięcie / obcinanie', effect: 'Urazy rąk i palców', severity: 3, probability: 3, riskScore: 9, sortOrder: 2 },
  { id: '4', element: 'Suport / konik', threat: 'Gniecenie / zgniatanie palców', effect: 'Urazy rąk i palców', severity: 3, probability: 2, riskScore: 6, sortOrder: 3 },
  { id: '5', element: 'Detal w uchwycie (długi wałek)', threat: 'Wypadnięcie / wyrzucenie detalu', effect: 'Urazy ciała, uszkodzenie maszyny', severity: 4, probability: 2, riskScore: 8, sortOrder: 4 },
  { id: '6', element: 'Szafa elektryczna / napęd (400V)', threat: 'Porażenie prądem elektrycznym', effect: 'Oparzenia, śmierć', severity: 4, probability: 1, riskScore: 4, sortOrder: 5 },
  { id: '7', element: 'Panel sterowania CNC', threat: 'Błąd interfejsu / niezamierzone uruchomienie', effect: 'Urazy operatora i osób postronnych', severity: 3, probability: 2, riskScore: 6, sortOrder: 6 },
  { id: '8', element: 'Chłodziwo / oleje obróbcze', threat: 'Kontakt skórny / wdychanie oparów', effect: 'Podrażnienia skóry, choroby układu oddechowego', severity: 2, probability: 3, riskScore: 6, sortOrder: 7 },
  { id: '9', element: 'Mgiełka olejowa / aerozol chłodziwa', threat: 'Wdychanie aerozolu (mist)', effect: 'Choroby układu oddechowego', severity: 3, probability: 3, riskScore: 9, sortOrder: 8 },
  { id: '10', element: 'Silnik / przekładnia', threat: 'Hałas przekraczający 85 dB(A)', effect: 'Uszkodzenie słuchu', severity: 2, probability: 4, riskScore: 8, sortOrder: 9 },
  { id: '11', element: 'Narzędzie / uchwyt niewyważony', threat: 'Wibracje mechaniczne przenoszone na ręce', effect: 'Choroby zawodowe (white finger)', severity: 2, probability: 2, riskScore: 4, sortOrder: 10 },
  { id: '12', element: 'Stanowisko operatora', threat: 'Wymuszona pozycja ciała / stanie powyżej 6h', effect: 'Dolegliwości mięśniowo-szkieletowe', severity: 2, probability: 3, riskScore: 6, sortOrder: 11 },
  { id: '13', element: 'Gorące wióry / chłodziwo', threat: 'Pożar od zapłonu oparów chłodziwa', effect: 'Pożar, oparzenia', severity: 3, probability: 1, riskScore: 3, sortOrder: 12 },
]

function getDemoEntries(lang: Lang) {
  const actions = DEMO_ACTIONS[lang] || DEMO_ACTIONS.en
  const plrData = [
    { plrAuto: 'd', plrManual: 'd', plAchieved: 'd', plCategory: '3', plrP: 'P2', reductionLevel: 'high',   residualS: 4, residualP: 1, residualR: 4 },  // Wrzeciono S=4→4, P=3→1
    { plrAuto: 'c', plrManual: 'c', plAchieved: 'c', plCategory: '3', plrP: 'P2', reductionLevel: 'high',   residualS: 3, residualP: 1, residualR: 3 },  // Wióry S=3→3, P=4→1
    { plrAuto: 'c', plrManual: 'c', plAchieved: 'c', plCategory: '2', plrP: 'P2', reductionLevel: 'medium', residualS: 3, residualP: 2, residualR: 6 },  // Narzędzie S=3→3, P=3→2
    { plrAuto: 'b', plrManual: 'b', plAchieved: 'b', plCategory: '2', plrP: 'P2', reductionLevel: 'medium', residualS: 3, residualP: 1, residualR: 3 },  // Suport S=3→3, P=2→1
    { plrAuto: 'd', plrManual: 'd', plAchieved: 'd', plCategory: '3', plrP: 'P2', reductionLevel: 'high',   residualS: 4, residualP: 1, residualR: 4 },  // Detal S=4→4, P=2→1
    { plrAuto: 'd', plrManual: 'd', plAchieved: 'd', plCategory: '3', plrP: 'P2', reductionLevel: 'medium', residualS: 4, residualP: 1, residualR: 4 },  // Szafa 400V S=4→4, P=1→1
    { plrAuto: 'c', plrManual: 'c', plAchieved: 'c', plCategory: '2', plrP: 'P2', reductionLevel: 'medium', residualS: 3, residualP: 1, residualR: 3 },  // Panel CNC S=3→3, P=2→1
    { plrAuto: 'b', plrManual: 'b', plAchieved: 'b', plCategory: '1', plrP: 'P1', reductionLevel: 'low',    residualS: 2, residualP: 1, residualR: 2 },  // Chłodziwo S=2→2, P=3→1
    { plrAuto: 'b', plrManual: 'b', plAchieved: 'b', plCategory: '1', plrP: 'P2', reductionLevel: 'medium', residualS: 3, residualP: 1, residualR: 3 },  // Mgiełka S=3→3, P=3→1
    { plrAuto: 'b', plrManual: 'b', plAchieved: 'b', plCategory: '1', plrP: 'P1', reductionLevel: 'medium', residualS: 2, residualP: 1, residualR: 2 },  // Hałas S=2→2, P=4→1
    { plrAuto: 'a', plrManual: 'a', plAchieved: 'a', plCategory: 'B', plrP: 'P1', reductionLevel: 'low',    residualS: 2, residualP: 1, residualR: 2 },  // Wibracje S=2→2, P=2→1
    { plrAuto: 'b', plrManual: 'b', plAchieved: 'b', plCategory: '1', plrP: 'P1', reductionLevel: 'low',    residualS: 2, residualP: 1, residualR: 2 },  // Stanowisko S=2→2, P=3→1
    { plrAuto: 'b', plrManual: 'b', plAchieved: 'b', plCategory: '1', plrP: 'P2', reductionLevel: 'low',    residualS: 3, residualP: 1, residualR: 3 },  // Pożar S=3→3, P=1→1
  ]
  const scenarios = [
    'Operator zdejmuje detal przy obracającym się wrzecionie; brak osłony uchwytu',
    'Obróbka bez osłon przy wysokiej prędkości skrawania; wióry wstęgowe',
    'Ręczna wymiana narzędzia przy uruchomionym napędzie; kontakt z ostrzem',
    'Regulacja suportu przy niskiej prędkości; dłonie w strefie uchwytu',
    'Toczenie długiego pręta bez podtrzymki; prędkość > 300 obr/min',
    'Serwis szafy elektrycznej przy włączonym zasilaniu 400V',
    'Błąd programu NC — niezamierzone uruchomienie wrzeciona',
    'Codzienny kontakt skóry z emulsją chłodzącą bez rękawic',
    'Praca ciągła bez wyciągu przy intensywnym chłodzeniu emulsją',
    'Praca ciągła > 4h przy hałasie 88 dB(A) bez ochronników',
    'Praca z niewyważonym narzędziem; wibracje na poziomie A(8) > 2,5 m/s²',
    'Stanie przy maszynie > 6h bez maty antyzmęczeniowej',
    'Nagromadzenie wiórów i oparów chłodziwa; iskra od uchwytu',
  ]

  const justificationsS = [
    'Kontakt z obracającym się uchwytem prowadzi do amputacji kończyny górnej — skutek nieodwracalny',
    'Wióry wstęgowe i odpryski przy v_c > 200 m/min — ryzyko utraty wzroku i głębokich ran',
    'Ostrze skrawające — możliwość przecięcia ścięgien i nerwów dłoni',
    'Siła zacisku suportu do 2 kN — zgniecenie palców, złamania',
    'Detal 20 kg wyrzucony przy n > 500 obr/min — śmiertelne uderzenie',
    'Napięcie 400V / prąd zwarcia do 10 kA — oparzenia III stopnia lub śmierć',
    'Niezamierzone uruchomienie przy obecności operatora — amputacja lub zmiażdżenie',
    'Długotrwały kontakt z emulsją olej-woda — kontaktowe zapalenie skóry, uczulenia',
    'Cząstki aerozolu < 5 μm wnikają do pęcherzyków płucnych — zwłóknienie',
    'Ekspozycja na 88 dB(A) przez 8h — nieodwracalne uszkodzenie słuchu',
    'A(8) > 2,5 m/s² — choroba wibracyjna (zespół białych palców)',
    'Stałe obciążenie kręgosłupa lędźwiowego — dyskopatia zawodowa',
    'Zapłon oparów chłodziwa mineralnego — pożar w strefie wiórów',
  ]

  const justificationsP = [
    'Operator pracuje w bezpośredniej bliskości uchwytu co każdy cykl — częstość wysoka',
    'Obróbka ciągła bez osłon — ekspozycja przy każdym przejściu narzędzia',
    'Ręczna wymiana narzędzia kilka razy na zmianę — regularna ekspozycja',
    'Regulacja suportu przy niskiej prędkości — rzadziej, ale bezpośredni dostęp',
    'Jednorazowo przy rozruchu — możliwe pominięcie procedury check-listy',
    'Serwis elektryczny kilka razy w roku — niskie prawdopodobieństwo bez blokad',
    'Błąd NC możliwy przy każdym wczytaniu programu — zależy od systemu',
    'Codzienny kontakt ze skórą przez całą zmianę — stała ekspozycja',
    'Praca ciągła przy chłodzeniu emulsją — stałe narażenie bez wyciągu',
    'Praca bez ochronników przy przekroczonym poziomie hałasu — regularnie',
    'Praca z narzędziem niewyważonym możliwa bez kontroli przed zmianą',
    'Brak mat antyzmęczeniowych na wielu stanowiskach — regularne narażenie',
    'Nagromadzenie wiórów i chłodziwa możliwe pod koniec zmiany',
  ]

  const plrJustifications = [
    'Strefa zamknięta — operator nie może opuścić strefy zagrożenia w czasie cyklu obróbki',
    'Wióry wyrzucane bez ostrzeżenia — brak czasu na reakcję operatora',
    'Wymiana narzędzia poza osłoną — możliwe wycofanie przy sprawnej procedurze LOTO',
    'Niska prędkość suportu — operator może wycofać rękę po zauważeniu zagrożenia',
    'Wyrzucenie nagłe i niekierowane — brak możliwości uniknięcia po wystąpieniu',
    'Napięcie zagrażające przy niewidocznych przewodach — brak ostrzeżenia wizualnego',
    'Automatyczne uruchomienie bez sygnału — brak czasu na reakcję',
    'Kontakt skórny niewidoczny — choroba objawia się z opóźnieniem',
    'Aerozol niewidoczny gołym okiem — operator nie jest świadomy narażenia',
    'Uszkodzenie słuchu postępuje powoli — brak natychmiastowego sygnału bólowego',
    'Wibracje odczuwalne ale tolerowane — operator kontynuuje pracę mimo objawów',
    'Dolegliwości narastają stopniowo — pracownik nie łączy bólu z pracą',
    'Zapłon możliwy nagle — ograniczona możliwość ucieczki w wąskiej przestrzeni',
  ]

  const actionLevels = [
    'technical', 'technical', 'organisational', 'technical',
    'design', 'technical', 'technical', 'organisational',
    'technical', 'organisational', 'design', 'organisational', 'technical',
  ]

  const actionNorms = [
    'EN ISO 14119',     // blokada osłony wrzeciona
    'EN ISO 13857',     // odległości bezpieczeństwa od wiórów
    'ISO 12100',        // ogólne zasady — ŚOI
    'EN ISO 13849-1',   // blokada suportu — PLr
    'EN ISO 13857',     // projekt — podtrzymka kłowa
    'EN 60204-1',       // wyposażenie elektryczne
    'EN ISO 13849-1',   // sterowanie CNC — PLr
    'ISO 12100',        // ogólne zasady — ŚOI
    'EN 953',           // osłona filtra mgiełki
    'ISO 12100',        // ogólne zasady — ŚOI
    'ISO 12100',        // projekt — balansowanie
    'ISO 12100',        // ogólne zasady — ergonomia
    'EN 953',           // osłona — zapobieganie pożarowi
  ]

  return DEMO_ENTRIES_PL.map((e, i) => {
    const translated = translateRiskEntry(e, lang)
    return {
      ...e,
      ...plrData[i],
      element: translated.element || e.element,
      threat: translated.threat || e.threat,
      effect: translated.effect || e.effect,
      action: actions[i] || actions[i % actions.length],
      scenario: scenarios[i] || '',
      justificationS: justificationsS[i] || '',
      justificationP: justificationsP[i] || '',
      plrJustification: plrJustifications[i] || '',
      actionLevel: actionLevels[i] || 'technical',
      actionNorm: actionNorms[i] || '',
      lifecycleStages: JSON.stringify([
        ['lc4','lc6','lc7'],         // wrzeciono
        ['lc3','lc4','lc6'],         // wióry
        ['lc3','lc4','lc7'],         // narzędzie
        ['lc3','lc4'],               // suport
        ['lc3','lc4'],               // detal długi
        ['lc2','lc6','lc7','lc8'],   // szafa elektryczna
        ['lc2','lc3','lc4'],         // panel CNC
        ['lc4','lc5','lc7'],         // chłodziwo
        ['lc4'],                     // mgiełka
        ['lc4'],                     // hałas
        ['lc3','lc4'],               // wibracje
        ['lc4'],                     // ergonomia
        ['lc4','lc5','lc7'],         // pożar
      ][i] || ['lc4']),
    }
  })
}

const DEMO_NOTES: Record<Lang, string> = {
  pl: 'Analiza przeprowadzona zgodnie z PN-EN ISO 12100:2012. Dotyczy tokarki CNC w konfiguracji standardowej.',
  en: 'Analysis performed in accordance with EN ISO 12100:2012. Concerns a CNC lathe in standard configuration.',
  de: 'Analyse durchgeführt gemäß EN ISO 12100:2012. Betrifft CNC-Drehmaschine in Standardkonfiguration.',
  fr: 'Analyse réalisée conformément à EN ISO 12100:2012. Concerne un tour CNC en configuration standard.',
  it: 'Analisi eseguita in conformità con EN ISO 12100:2012. Riguarda un tornio CNC in configurazione standard.',
  es: 'Análisis realizado de acuerdo con EN ISO 12100:2012. Se refiere a un torno CNC en configuración estándar.',
  cs: 'Analýza provedena v souladu s EN ISO 12100:2012. Týká se CNC soustruhu ve standardní konfiguraci.',
}

function getDemoAnalysis(lang: Lang) {
  return {
    id: 'demo-001',
    machineName: 'Tokarka CNC TOK-600',
    machineCategory: 'Tokarki CNC',
    machineType: 'lathe_cnc',
    machineId: 'lathe_cnc',
    serialNo: 'SN-2024-TOK-001',
    manufacturer: 'TOKcraft Sp. z o.o.',
    productionYear: 2024,
    norm: 'EN ISO 12100:2012, ISO 23125:2021',
    analystName: 'Jan Kowalski',
    analysisDate: new Date().toISOString(),
    notes: DEMO_NOTES[lang] || DEMO_NOTES.en,
    language: lang,
    clientName: 'Adam Nowak',
    clientCompany: 'Precision Parts Sp. z o.o.',
    clientNip: '123-456-78-90',
    clientAddress: 'ul. Przemysłowa 15, 00-001 Warszawa',
    riskMethod: 'SxP',
    intendedUse: 'Tokarka CNC TOK-600 przeznaczona do obróbki skrawaniem metali (stal, aluminium, stopy miedzi, żeliwo) w warunkach warsztatowych.\nMaks. średnica detalu: Ø600 mm • Maks. długość detalu: 2000 mm • Materiały: metale ferromagnetyczne i nieferromagnetyczne • Tryby pracy: AUTO, JOG/MDI, tryb serwisowy z blokadą prędkości',
    foreseenMisuse: 'Obróbka materiałów łatwopalnych (Mg, Ti) bez chłodziwa wodnego • Praca bez osłony kabinowej lub z otwartą osłoną • Używanie niewyważonych uchwytów/narzędzi • Praca w trybie serwisowym przy prędkości > 2 m/min • Czyszczenie wiórów ręką podczas pracy wrzeciona',
    spaceLimits: 'Przestrzeń robocza: 2500×1800×2200 mm • Zasięg operatora: max 800 mm od osi wrzeciona • Strefa niebezpieczna: 500 mm wokół uchwytu • Min. odległość serwisanta: 300 mm od strefy roboczej',
    timeLimits: 'Transport i instalacja • Uruchomienie i rozruch próbny • Eksploatacja normalna (przewidywana żywotność: 15 lat) • Konserwacja i serwis (wymiana narzędzi, oleju, czyszczenie co zmianę) • Demontaż / złomowanie',
    envLimits: 'Temperatura otoczenia: +5°C … +40°C • Wilgotność: max 80% (bez kondensacji) • Zasilanie: 400 V / 3-faz / 50 Hz ±10% • Hałas tła: max 70 dB(A)',
    riskEntries: getDemoEntries(lang),
    preparedBy: 'Jan Kowalski',
    preparedRole: 'Inżynier BHP / Specjalista ds. oceny ryzyka',
    approvedBy: 'Anna Nowak',
    approvedRole: 'Kierownik Produkcji',
    approvedDate: new Date().toISOString(),
  }
}

const DEMO_SETTINGS = {
  company_name: 'RiskAnalytix',
  pdf_footer: 'RiskAnalytix.com · Professional machine risk assessment',
}

interface Props {
  lang?: string
}

export function SampleRiskReportButton({ lang = 'pl' }: Props) {
  const l = lang as Lang
  const analysis = getDemoAnalysis(l)
  const fileName = `SAMPLE-risk-assessment-CNC-lathe-RiskAnalytix.pdf`

  return (
    <PDFDownloadLink
      document={<RiskReportPDF analysis={analysis} settings={DEMO_SETTINGS} />}
      fileName={fileName}
    >
      {({ loading }) => (
        <button
          disabled={loading}
          style={{
            padding: '7px 16px', borderRadius: '6px', border: 'none',
            background: loading ? '#4a5a72' : '#E8A838',
            color: loading ? '#8a99b0' : '#0B0F1A',
            cursor: loading ? 'default' : 'pointer',
            fontSize: '11px', fontFamily: 'Lato, sans-serif', fontWeight: 700,
            transition: 'all .15s', whiteSpace: 'nowrap',
          }}
        >
          {loading ? '⬳ ...' : '⬇ Raport PDF'}
        </button>
      )}
    </PDFDownloadLink>
  )
}

export function SampleCEButton({ lang = 'pl' }: Props) {
  const l = lang as Lang
  const analysis = getDemoAnalysis(l)
  const fileName = `SAMPLE-CE-declaration-CNC-lathe-RiskAnalytix.pdf`

  return (
    <PDFDownloadLink
      document={<CEDeclarationPDF analysis={analysis} settings={DEMO_SETTINGS} />}
      fileName={fileName}
    >
      {({ loading }) => (
        <button
          disabled={loading}
          style={{
            padding: '7px 16px', borderRadius: '6px',
            border: '1px solid rgba(29,78,216,.4)',
            background: loading ? '#1e2d45' : 'rgba(29,78,216,.15)',
            color: loading ? '#8a99b0' : '#60A5FA',
            cursor: loading ? 'default' : 'pointer',
            fontSize: '11px', fontFamily: 'Lato, sans-serif', fontWeight: 700,
            transition: 'all .15s', whiteSpace: 'nowrap',
          }}
        >
          {loading ? '⬳ ...' : '🏷 Deklaracja CE'}
        </button>
      )}
    </PDFDownloadLink>
  )
}