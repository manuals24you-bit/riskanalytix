const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/data/machines.ts', 'utf8');

// Find lc07 by id and insert new threats after it
const lc07_idx = c.indexOf("id: 'lc07'");
if (lc07_idx === -1) { console.log('lc07 not found'); process.exit(1); }

// Find end of lc07 entry
const endIdx = c.indexOf('},', lc07_idx) + 2;
console.log('Inserting after position:', endIdx);
console.log('Context:', c.slice(endIdx-20, endIdx+50));

const newThreats = `
      { id: 'lc08', element: 'Instalacja elektryczna', threat: 'Pora\u017cenie pr\u0105dem', effect: 'Oparzenie, \u015bmier\u0107', defaultS: 4, defaultP: 1, actions: ['Uziemienie ochronne PE', 'Wy\u0142\u0105cznik g\u0142\u00f3wny z blokad\u0105 k\u0142\u00f3dkow\u0105 LOTO', 'Przegl\u0105d elektryczny co 12 mies. (EN 60204-1)'] },
      { id: 'lc09', element: 'Strefa obr\u00f3bki \u2014 d\u0142ugi pr\u0119t', threat: 'Wyrzucenie d\u0142ugiego pr\u0119ta przez uchwyt \u2014 efekt miotad\u0142a', effect: 'Ci\u0119\u017ckie urazy \u2014 \u015bmier\u0107', defaultS: 4, defaultP: 2, actions: ['Prowadnica pr\u0119ta (bar feeder / pipe guard)', 'Ogranicznik d\u0142ugo\u015bci pr\u0119ta', 'Os\u0142ona z ty\u0142u maszyny', 'Zakaz pracy z pr\u0119tem d\u0142u\u017cszym ni\u017c 300 mm bez prowadnicy'] },
      { id: 'lc10', element: 'Suport i mechanizm posuwu', threat: 'Gniecenie palc\u00f3w mi\u0119dzy suportem a detalem', effect: 'Zmiażdżenie palc\u00f3w / d\u0142oni', defaultS: 4, defaultP: 2, actions: ['Ograniczniki kr\u0105\u017ccowe mechaniczne', 'Procedura LOTO przy regulacji suportu', 'Zakaz dotykania strefy roboczej w ruchu'] },
      { id: 'lc11', element: 'Mg\u0142a olejowa / aerozol ch\u0142odziwa', threat: 'Wdychanie aerozolu (mist)', effect: 'Choroby uk\u0142adu oddechowego, nowotwory', defaultS: 3, defaultP: 3, actions: ['Separator mg\u0142y olejowej', 'Monitoring st\u0119\u017cenia aerozolu < 1 mg/m\u00b3', 'Maska A1P2 przy czyszczeniu'] },
      { id: 'lc12', element: 'Toczone elementy mimow\u00f3dowe / niecentryczne', threat: 'Wyrzucenie detalu przy niecentrycznym mocowaniu', effect: 'Ci\u0119\u017ckie urazy od wyrzuconego elementu', defaultS: 4, defaultP: 2, actions: ['Sprawdzenie wywa\u017cenia przed rozruchem', 'Ograniczenie pr\u0119dko\u015bci przy niecentrycznych detalach', 'Os\u0142ona kabinowa'] },
      { id: 'lc13', element: 'Gor\u0105ce wi\u00f3ry / ch\u0142odziwo', threat: 'Po\u017car od zap\u0142onu opar\u00f3w ch\u0142odziwa', effect: 'Po\u017car maszyny, oparzenia', defaultS: 3, defaultP: 1, actions: ['Ga\u015bnica CO\u2082 przy maszynie', 'Czyszczenie wi\u00f3r\u00f3w co zmian\u0119', 'Zakaz \u0142atwopalnych p\u0142yn\u00f3w ch\u0142odz\u0105cych'] },
      { id: 'lc14', element: 'Transport / instalacja tokarki', threat: 'Upadek maszyny podczas transportu', effect: 'Zgniecenie os\u00f3b', defaultS: 4, defaultP: 2, actions: ['Plan transportu zatwierdzony przez in\u017cyniera', 'Punkty zaczepienia zgodne z DTR', 'Min. 2 osoby przy ustawianiu'] },
      { id: 'lc15', element: 'Pod\u0142\u0105czenie elektryczne (400V / 3-faz)', threat: 'Pora\u017cenie pr\u0105dem podczas pod\u0142\u0105czania', effect: 'Oparzenie, \u015bmier\u0107', defaultS: 4, defaultP: 2, actions: ['Elektryk z uprawnieniami SEP', 'Sprawdzenie kolejno\u015bci faz', 'Protok\u00f3\u0142 odbioru instalacji'] },
      { id: 'lc16', element: 'Zmiana bieg\u00f3w wrzeciennika', threat: 'Niezamierzone uruchomienie przy zmianie bieg\u00f3w', effect: 'Uraz r\u0105k', defaultS: 3, defaultP: 2, actions: ['Zmiana wy\u0142\u0105cznie przy pe\u0142nym zatrzymaniu', 'Blokada mechaniczna podczas zmiany', 'Instrukcja stanowiskowa'] },
      { id: 'lc17', element: 'Wibracje mechaniczne narz\u0119dzia', threat: 'Wibracje przenoszone na r\u0119ce', effect: 'Zesp\u00f3\u0142 wibracyjny (choroba Raynauda)', defaultS: 2, defaultP: 2, actions: ['Narz\u0119dzia t\u0142umi\u0105ce wibracje', 'Pomiar A(8) < 2,5 m/s\u00b2', 'Rotacja pracownik\u00f3w'] },
      { id: 'lc18', element: 'Awaria hamulca wrzeciona', threat: 'Wybi\u0119g wrzeciona po wy\u0142\u0105czeniu', effect: 'Kontakt z obracaj\u0105cym si\u0119 uchwytem', defaultS: 4, defaultP: 2, actions: ['Kontrola czasu hamowania wg DTR', 'Blokada dost\u0119pu do momentu zatrzymania', 'Alarm przy przekroczeniu czasu hamowania'] },
      { id: 'lc19', element: 'Zanik zasilania', threat: 'Niekontrolowany ruch suportu przy powrocie zasilania', effect: 'Kolizja, uraz operatora', defaultS: 3, defaultP: 2, actions: ['Bezpieczne zatrzymanie przy zaniku zasilania', 'Procedura restartu po zaniku', 'Sprawdzenie pozycji suportu'] },
      { id: 'lc20', element: 'Stanowisko operatora \u2014 ergonomia', threat: 'Wymuszona pozycja cia\u0142a / stanie > 6h', effect: 'Choroby uk\u0142adu mi\u0119\u015bniowo-szkieletowego', defaultS: 2, defaultP: 3, actions: ['Maty antyzmeczeniowe', 'Regulowana wysoko\u015b\u0107 pulpitu', 'Ocena ergonomiczna EN 1005-4'] },
      { id: 'lc21', element: 'Czyszczenie maszyny / usuwanie wi\u00f3r\u00f3w', threat: 'Skaleczenie od ostrych wi\u00f3r\u00f3w metalowych', effect: 'Rany ci\u0119te r\u0105k', defaultS: 2, defaultP: 4, actions: ['Haczyk do wi\u00f3r\u00f3w \u2014 zakaz usuwania r\u0119kami', 'R\u0119kawice antyprzeci\u0119ciowe EN 388', 'Zatrzymana maszyna przed czyszczeniem'] },
      { id: 'lc22', element: 'Regulacja / wymiana szcz\u0119k uchwytu', threat: 'Przygniecenie palc\u00f3w przez szcz\u0119ki', effect: 'Zmiażdżenie palc\u00f3w', defaultS: 3, defaultP: 3, actions: ['Wymiana przy zatrzymanym wrzecionie', 'LOTO przed wej\u015bciem w stref\u0119 uchwytu', 'Klucz uchwytu z samoistnym wypadaniem'] },
      { id: 'lc23', element: 'Wymiana pasa nap\u0119dowego', threat: 'Pochwycenie r\u0119ki przy za\u0142o\u017ceniu pasa w ruchu', effect: 'Wci\u0105gni\u0119cie r\u0119ki', defaultS: 4, defaultP: 1, actions: ['LOTO przy wymianie pasa', 'Os\u0142ony ko\u0142a pasowego', 'Zakaz dotykania pasa w ruchu'] },
      { id: 'lc24', element: 'Smarowanie maszyny', threat: 'Po\u015blizg na oleju rozlanym', effect: 'Upadek operatora', defaultS: 2, defaultP: 2, actions: ['Centralne smarowanie automatyczne', 'Mata antypo\u015blizgowa pod maszyn\u0105', 'Natychmiastowe usuwanie wyciek\u00f3w'] },
      { id: 'lc25', element: 'Demonta\u017c / z\u0142omowanie tokarki', threat: 'Upadek ci\u0119\u017ckich element\u00f3w przy demonta\u017cu', effect: 'Zgniecenie, \u015bmier\u0107', defaultS: 4, defaultP: 1, actions: ['Plan demonta\u017cu zatwierdzony przez in\u017cyniera', 'Od\u0142\u0105czenie wszystkich medi\u00f3w', 'Utylizacja p\u0142yn\u00f3w zgodnie z przepisami'] },`;

c = c.slice(0, endIdx) + newThreats + c.slice(endIdx);
fs.writeFileSync('C:/Projects/riskpro/frontend/src/data/machines.ts', c, 'utf8');
console.log('Done! lc25 present:', c.includes("id: 'lc25'"));