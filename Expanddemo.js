const fs = require('fs');

// 1. Fix lifecycle table header - change to lighter amber color
let pdf = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/RiskReportPDF.tsx', 'utf8');
pdf = pdf.replace(
  'lifecycleRowHeader: { flexDirection: \'row\', backgroundColor: \'#1F2937\'',
  'lifecycleRowHeader: { flexDirection: \'row\', backgroundColor: \'#92400E\''
);
fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/RiskReportPDF.tsx', pdf, 'utf8');
console.log('PDF header color fixed:', pdf.includes('#92400E'));

// 2. Expand SamplePDFButtons to use all 34 lathe-cnc threats
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/SamplePDFButtons.tsx', 'utf8');

const newEntries = `
const DEMO_ENTRIES_PL = [
  { id: '1',  element: 'Wrzeciono / uchwyt tokarski', threat: 'Pochwycenie / wciągnięcie', effect: 'Złamanie kończyny, amputacja', severity: 4, probability: 3, riskScore: 12, sortOrder: 0 },
  { id: '2',  element: 'Strefa obróbki — wióry', threat: 'Wyrzucenie odłamków / wiórów', effect: 'Urazy oczu, twarzy', severity: 3, probability: 4, riskScore: 12, sortOrder: 1 },
  { id: '3',  element: 'Narzędzie skrawające', threat: 'Cięcie / obcinanie', effect: 'Skaleczenie, amputacja palców', severity: 4, probability: 2, riskScore: 8, sortOrder: 2 },
  { id: '4',  element: 'Suport / konik', threat: 'Gniecenie / zgniatanie palców', effect: 'Zmiażdżenie palców / dłoni', severity: 4, probability: 2, riskScore: 8, sortOrder: 3 },
  { id: '5',  element: 'Detal w uchwycie (długi wałek)', threat: 'Wypadnięcie / wyrzucenie detalu', effect: 'Urazy od wyrzuconego materiału', severity: 4, probability: 2, riskScore: 8, sortOrder: 4 },
  { id: '6',  element: 'Szafa elektryczna / napęd (400V)', threat: 'Porażenie prądem elektrycznym', effect: 'Oparzenie, śmierć', severity: 4, probability: 1, riskScore: 4, sortOrder: 5 },
  { id: '7',  element: 'Panel sterowania CNC', threat: 'Błąd interfejsu / niezamierzone uruchomienie', effect: 'Niekontrolowany ruch maszyny', severity: 3, probability: 2, riskScore: 6, sortOrder: 6 },
  { id: '8',  element: 'Chłodziwo / oleje obróbcze', threat: 'Kontakt skórny / wdychanie oparów', effect: 'Dermatoza, choroby dróg oddechowych', severity: 2, probability: 4, riskScore: 8, sortOrder: 7 },
  { id: '9',  element: 'Mgiełka olejowa / aerozol chłodziwa', threat: 'Wdychanie aerozolu (mist)', effect: 'Choroby układu oddechowego, nowotwory', severity: 3, probability: 3, riskScore: 9, sortOrder: 8 },
  { id: '10', element: 'Silnik / przekładnia / obróbka', threat: 'Hałas przekraczający 85 dB(A)', effect: 'Trwały ubytek słuchu', severity: 3, probability: 3, riskScore: 9, sortOrder: 9 },
  { id: '11', element: 'Narzędzie / uchwyt niewyważony', threat: 'Wibracje mechaniczne przenoszone na ręce', effect: 'Zespół wibracyjny (choroba Raynauda)', severity: 2, probability: 2, riskScore: 4, sortOrder: 10 },
  { id: '12', element: 'Stanowisko operatora', threat: 'Wymuszona pozycja ciała / stanie > 6h', effect: 'Choroby układu mięśniowo-szkieletowego', severity: 2, probability: 3, riskScore: 6, sortOrder: 11 },
  { id: '13', element: 'Gorące wióry / chłodziwo', threat: 'Pożar od zapłonu oparów chłodziwa', effect: 'Pożar maszyny, oparzenia', severity: 3, probability: 1, riskScore: 3, sortOrder: 12 },
  { id: '14', element: 'Transport maszyny (suwnica / wózek)', threat: 'Upadek / przewrócenie maszyny', effect: 'Zgniecenie osób, uszkodzenie maszyny', severity: 4, probability: 2, riskScore: 8, sortOrder: 13 },
  { id: '15', element: 'Instalacja / poziomowanie maszyny', threat: 'Poślizg / przewrócenie podczas ustawiania', effect: 'Zgniecenie kończyn', severity: 4, probability: 2, riskScore: 8, sortOrder: 14 },
  { id: '16', element: 'Podłączenie elektryczne (400V / 3-faz)', threat: 'Porażenie prądem podczas podłączania', effect: 'Oparzenie, śmierć', severity: 4, probability: 2, riskScore: 8, sortOrder: 15 },
  { id: '17', element: 'Pierwsze uruchomienie / rozruch próbny', threat: 'Błąd kierunku obrotów wrzeciona', effect: 'Wyrzucenie detalu lub narzędzia', severity: 4, probability: 2, riskScore: 8, sortOrder: 16 },
  { id: '18', element: 'Konfiguracja programu CNC', threat: 'Błąd w programie NC — kolizja osi', effect: 'Uszkodzenie maszyny, uraz operatora', severity: 4, probability: 3, riskScore: 12, sortOrder: 17 },
  { id: '19', element: 'Uchwyt hydrauliczny / pneumatyczny', threat: 'Utrata ciśnienia — wypadnięcie detalu', effect: 'Uderzenie wyrzuconym detalem', severity: 4, probability: 2, riskScore: 8, sortOrder: 18 },
  { id: '20', element: 'Automatyczna zmiana narzędzi (rewolwer)', threat: 'Uderzenie głowicą rewolwerową', effect: 'Stłuczenia, złamania kończyn', severity: 3, probability: 3, riskScore: 9, sortOrder: 19 },
  { id: '21', element: 'Praca w trybie serwisowym (JOG / MDI)', threat: 'Niezamierzone uruchomienie osi przy serwisie', effect: 'Zgniecenie kończyn operatora / serwisanta', severity: 4, probability: 3, riskScore: 12, sortOrder: 20 },
  { id: '22', element: 'Pęknięcie uchwytu — utrata detalu', threat: 'Wyrzucenie fragmentów uchwytu lub detalu', effect: 'Ciężkie urazy — śmierć', severity: 4, probability: 1, riskScore: 4, sortOrder: 21 },
  { id: '23', element: 'Kolizja narzędzia / suportu z detalem', threat: 'Kolizja suportu z detalem lub uchwytem', effect: 'Uszkodzenie maszyny, odrzut elementów', severity: 3, probability: 3, riskScore: 9, sortOrder: 22 },
  { id: '24', element: 'Obróbka materiałów reaktywnych (Mg, Ti)', threat: 'Zapłon pyłu magnezowego / tytanowego', effect: 'Pożar, wybuch', severity: 4, probability: 2, riskScore: 8, sortOrder: 23 },
  { id: '25', element: 'Oświetlenie strefy obróbki', threat: 'Niedostateczne oświetlenie — błąd operatora', effect: 'Uraz wynikający z błędu obserwacji', severity: 2, probability: 3, riskScore: 6, sortOrder: 24 },
  { id: '26', element: 'Zanik zasilania / nagłe wyłączenie', threat: 'Niekontrolowany ruch osi przy powrocie zasilania', effect: 'Kolizja, uraz operatora', severity: 4, probability: 2, riskScore: 8, sortOrder: 25 },
  { id: '27', element: 'Awaria hamulca wrzeciona', threat: 'Wybieg wrzeciona po wyłączeniu', effect: 'Kontakt z obracającym się uchwytem', severity: 4, probability: 2, riskScore: 8, sortOrder: 26 },
  { id: '28', element: 'Awaria układu chłodzenia', threat: 'Przegrzanie narzędzia — pożar lub wyrzut', effect: 'Oparzenia, pożar', severity: 3, probability: 2, riskScore: 6, sortOrder: 27 },
  { id: '29', element: 'Awaria czujników krańcowych (limit switches)', threat: 'Przekroczenie zakresu ruchu osi', effect: 'Kolizja mechaniczna, uszkodzenie maszyny', severity: 3, probability: 2, riskScore: 6, sortOrder: 28 },
  { id: '30', element: 'Czyszczenie maszyny / usuwanie wiórów', threat: 'Skaleczenie od ostrych wiórów metalowych', effect: 'Rany cięte rąk', severity: 2, probability: 4, riskScore: 8, sortOrder: 29 },
  { id: '31', element: 'Wymiana oleju / płynów eksploatacyjnych', threat: 'Kontakt skórny z olejem maszynowym', effect: 'Dermatoza, zatrucie przy spożyciu', severity: 2, probability: 3, riskScore: 6, sortOrder: 30 },
  { id: '32', element: 'Regulacja / wymiana szczęk uchwytu', threat: 'Przygniecenie palców przez szczęki', effect: 'Zmiażdżenie palców', severity: 3, probability: 3, riskScore: 9, sortOrder: 31 },
  { id: '33', element: 'Serwis układu hydraulicznego', threat: 'Wtrysk oleju hydraulicznego pod ciśnieniem', effect: 'Wtrysk oleju pod skórę — amputacja', severity: 4, probability: 1, riskScore: 4, sortOrder: 32 },
  { id: '34', element: 'Demontaż / złomowanie maszyny', threat: 'Upadek ciężkich elementów przy demontażu', effect: 'Zgniecenie, śmierć', severity: 4, probability: 2, riskScore: 8, sortOrder: 33 },
]
`;

// Replace old DEMO_ENTRIES_PL
const oldStart = 'const DEMO_ENTRIES_PL = [';
const oldEnd = ']';
const startIdx = c.indexOf(oldStart);
const endIdx = c.indexOf('\n]', startIdx) + 2;
c = c.slice(0, startIdx) + newEntries + c.slice(endIdx);

// Update riskScore in DEMO_NOTES to show 34
c = c.replace("Tokarka CNC · 13 zagrożeń", "Tokarka CNC · 34 zagrożenia");
c = c.replace("Tokarka CNC · 13 zagro\u017ce\u0144", "Tokarka CNC · 34 zagro\u017cenia");

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/SamplePDFButtons.tsx', c, 'utf8');
console.log('SamplePDFButtons updated, entries count check:');
console.log('  id 34 present:', c.includes("id: '34'"));
console.log('  id 1 present:', c.includes("id: '1'"));