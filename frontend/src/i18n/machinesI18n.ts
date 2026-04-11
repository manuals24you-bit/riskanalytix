// frontend/src/i18n/machinesI18n.ts
// Translations for machine names, elements, threats, and effects
// Languages: pl, en, de, fr, it, es, cs
// Actions (safety measures) are intentionally kept in Polish as they reference
// specific norms and procedures used in Polish technical documentation.

export type Lang = 'pl' | 'en' | 'de' | 'fr' | 'it' | 'es' | 'cs'

export interface ThreatTranslation {
  element: string
  threat: string
  effect: string
  scenario?: string
}

export interface MachineTranslation {
  name: string
  threats: Record<string, ThreatTranslation>
}

export type MachinesI18n = Record<string, Record<Lang, MachineTranslation>>

export const machinesI18n: MachinesI18n = {

  // ─────────────────────────────────────────────────────────────────
  // TOKARKI
  // ─────────────────────────────────────────────────────────────────
  'lathe-cnc': {
    pl: {
      name: 'Tokarka CNC',
      threats: {
        l01: { element: 'Wrzeciono / uchwyt tokarski', threat: 'Pochwycenie / wciągnięcie', effect: 'Złamanie kończyny, amputacja', scenario: 'Operator sięga do uchwytu podczas obrotu — rękaw lub rękawica zostaje pochwycona przez obracający się uchwyt.' },
        l02: { element: 'Strefa obróbki — wióry', threat: 'Wyrzucenie odłamków / wiórów', effect: 'Uraz oczu, twarzy', scenario: 'Wióry odłamują się podczas obróbki z dużą prędkością i wylatują poza strefę osłony.' },
        l03: { element: 'Narzędzie skrawające', threat: 'Cięcie / obcinanie', effect: 'Skaleczenie, amputacja palców', scenario: 'Ręka operatora zbliża się do narzędzia przy ręcznym podawaniu lub wymianie narzędzia.' },
        l04: { element: 'Suport / konik', threat: 'Gniecenie / zgniatanie palców', effect: 'Zmiażdżenie palców / dłoni', scenario: 'Palce operatora znajdują się między suportem a detalem podczas ręcznego ustawiania pozycji.' },
        l05: { element: 'Detal w uchwycie (długi wałek)', threat: 'Wypadnięcie / wyrzucenie detalu przy pęknięciu', effect: 'Urazy od wyrzuconego materiału', scenario: 'Długi wałek wystaje poza uchwyt — przy nieprawidłowym zamocowaniu wylatuje przy rozruchu.' },
        l06: { element: 'Szafa elektryczna / napęd (400 V)', threat: 'Porażenie prądem elektrycznym', effect: 'Oparzenie, śmierć', scenario: 'Nieautoryzowany dostęp do szafy elektrycznej lub uszkodzona izolacja kabla zasilającego.' },
        l07: { element: 'Panel sterowania CNC', threat: 'Błąd interfejsu / niezamierzone uruchomienie', effect: 'Niekontrolowany ruch maszyny', scenario: 'Błąd w programie CNC skutkuje niezaplanowanym ruchem osi podczas pracy operatora w strefie.' },
        l08: { element: 'Chłodziwo / oleje obróbcze', threat: 'Kontakt skórny / wdychanie oparów', effect: 'Dermatoza, choroby dróg oddechowych', scenario: 'Dłuższy kontakt z chłodziwem bez ŚOI — wycieki na podłodze podczas zmiany lub uzupełniania.' },
        l09: { element: 'Mgiełka olejowa / aerozol chłodziwa', threat: 'Wdychanie aerozolu (mist)', effect: 'Choroby układu oddechowego, nowotwory', scenario: 'Praca bez odsysania mgiełki olejowej — stężenie przekracza NDS po kilku godzinach.' },
        l10: { element: 'Silnik / przekładnia / obróbka', threat: 'Hałas przekraczający 85 dB(A)', effect: 'Trwały ubytek słuchu', scenario: 'Hałas impulsowy podczas obróbki przerywanej lub przy dużych posuwach bez ochronników słuchu.' },
        l11: { element: 'Narzędzie / uchwyt niewyważony', threat: 'Wibracje mechaniczne przenoszone na ręce', effect: 'Zespół wibracyjny (choroba Raynauda)', scenario: 'Źle wyważony uchwyt lub narzędzie powoduje drgania całej maszyny przy wysokich obrotach.' },
        l12: { element: 'Stanowisko operatora', threat: 'Wymuszona pozycja ciała / stanie > 6h', effect: 'Choroby układu mięśniowo-szkieletowego', scenario: 'Wielogodzinna praca w pochylonej pozycji bez regulacji wysokości stołu operatora.' },
        l13: { element: 'Gorące wióry / chłodziwo', threat: 'Pożar od zapłonu oparów chłodziwa', effect: 'Pożar maszyny, oparzenia', scenario: 'Gorące wióry magnezowe lub tytanowe zapalają się w obecności oleju chłodzącego.' },
        l14: { element: 'Transport maszyny (suwnica / wózek)', threat: 'Upadek / przewrócenie maszyny', effect: 'Zgniecenie osób, uszkodzenie maszyny', scenario: 'Maszyna spada z zawiesia suwnicy przy nieprawidłowym zaczepieniu podczas transportu.' },
        l15: { element: 'Instalacja / poziomowanie maszyny', threat: 'Poślizg / przewrócenie podczas ustawiania', effect: 'Zgniecenie kończyn', scenario: 'Maszyna osuwa się z podkładek podczas poziomowania przed podłączeniem do mediów.' },
        l16: { element: 'Podłączenie elektryczne (400V / 3-faz)', threat: 'Porażenie prądem podczas podłączania', effect: 'Oparzenie, śmierć', scenario: 'Błąd przy podłączeniu faz 400V skutkuje odwrotnym kierunkiem obrotu wrzeciona.' },
        l17: { element: 'Pierwsze uruchomienie / rozruch próbny', threat: 'Błąd kierunku obrotów wrzeciona', effect: 'Wyrzucenie detalu lub narzędzia', scenario: 'Wrzeciono rusza w nieoczekiwanym kierunku przy pierwszym uruchomieniu nowego programu.' },
        l18: { element: 'Konfiguracja programu CNC', threat: 'Błąd w programie NC — kolizja osi', effect: 'Uszkodzenie maszyny, uraz operatora', scenario: 'Błąd offsetu narzędzia w programie NC prowadzi do kolizji suportu z uchwytem.' },
        l19: { element: 'Uchwyt hydrauliczny / pneumatyczny', threat: 'Utrata ciśnienia — wypadnięcie detalu', effect: 'Uderzenie wyrzuconym detalem', scenario: 'Utrata ciśnienia hydraulicznego podczas obróbki — detal wylatuje z otwartego uchwytu.' },
        l20: { element: 'Automatyczna zmiana narzędzi (rewolwer)', threat: 'Uderzenie głowicą rewolwerową', effect: 'Stłuczenia, złamania kończyn', scenario: 'Rewolwer obraca się automatycznie gdy operator sprawdza narzędzie w strefie roboczej.' },
        l21: { element: 'Praca w trybie serwisowym (JOG / MDI)', threat: 'Niezamierzone uruchomienie osi przy serwisie', effect: 'Zgniecenie kończyn operatora / serwisanta', scenario: 'Oś przesuwa się niekontrolowanie podczas pracy JOG gdy operator pomylił kierunek.' },
        l22: { element: 'Pęknięcie uchwytu — utrata detalu', threat: 'Wyrzucenie fragmentów uchwytu lub detalu', effect: 'Ciężkie urazy — śmierć', scenario: 'Szczęka uchwytu z pęknięciem zmęczeniowym odpada przy pełnych obrotach wrzeciona.' },
        l23: { element: 'Kolizja narzędzia / suportu z detalem', threat: 'Kolizja suportu z detalem lub uchwytem', effect: 'Uszkodzenie maszyny, odrzut elementów', scenario: 'Kolizja narzędzia z uchwytem przy błędnym parametrze długości korekcji.' },
        l24: { element: 'Obróbka materiałów reaktywnych (Mg, Ti)', threat: 'Zapłon pyłu magnezowego / tytanowego', effect: 'Pożar, wybuch', scenario: 'Wióry tytanu zapalają się samorzutnie przy braku chłodziwa i wysokiej temperaturze.' },
        l25: { element: 'Oświetlenie strefy obróbki', threat: 'Niedostateczne oświetlenie — błąd operatora', effect: 'Uraz wynikający z błędu obserwacji', scenario: 'Niewystarczające oświetlenie strefy uchwytu utrudnia kontrolę zamocowania detalu.' },
        l26: { element: 'Zanik zasilania / nagłe wyłączenie', threat: 'Niekontrolowany ruch osi przy powrocie zasilania', effect: 'Kolizja, uraz operatora', scenario: 'Zanik zasilania podczas skrawania — oś nie hamuje natychmiastowo, dochodzi do kolizji.' },
        l27: { element: 'Awaria hamulca wrzeciona', threat: 'Wybięg wrzeciona po wyłączeniu', effect: 'Kontakt z obracającym się uchwytem', scenario: 'Awaria hamulca elektrycznego wrzeciona — wybieg trwa kilkanaście sekund po zatrzymaniu.' },
        l28: { element: 'Awaria układu chłodzenia', threat: 'Przegrzanie narzędzia — pożar lub wyrzut', effect: 'Oparzenia, pożar', scenario: 'Zapchany filtr chłodziwa — pompa pracuje na sucho, temperatura narzędzia wzrasta.' },
        l29: { element: 'Awaria czujników krańcowych (limit switches)', threat: 'Przekroczenie zakresu ruchu osi', effect: 'Kolizja mechaniczna, uszkodzenie maszyny', scenario: 'Awaria krańcówki osi Z — suport uderza w uchwyt przy powrocie do punktu zerowego.' },
        l30: { element: 'Czyszczenie maszyny / usuwanie wiórów', threat: 'Skaleczenie od ostrych wiórów metalowych', effect: 'Rany cięte rąk', scenario: 'Operator usuwa wióry wstęgowe ręką bez rękawic podczas czyszczenia strefy roboczej.' },
        l31: { element: 'Wymiana oleju / płynów eksploatacyjnych', threat: 'Kontakt skórny z olejem maszynowym', effect: 'Dermatoza, zatrucie przy spożyciu', scenario: 'Kontakt ze starym olejem hydraulicznym podczas jego spustu bez rękawic ochronnych.' },
        l32: { element: 'Regulacja / wymiana szczęk uchwytu', threat: 'Przygniecenie palców przez szczęki', effect: 'Zmiażdżenie palców', scenario: 'Szczęki uchwytu zaciskają się na palcu operatora przy ręcznej regulacji klucza.' },
        l33: { element: 'Serwis układu hydraulicznego', threat: 'Wtrysk oleju hydraulicznego pod ciśnieniem', effect: 'Wtrysk oleju pod skórę — amputacja', scenario: 'Wytrysk oleju pod wysokim ciśnieniem przy odkręceniu przewodu hydraulicznego.' },
        l34: { element: 'Demontaż / złomowanie maszyny', threat: 'Upadek ciężkich elementów przy demontażu', effect: 'Zgniecenie, śmierć', scenario: 'Głowica wrzeciona spada podczas demontażu bez podparcia przy złomowaniu.' },
      },
    },
    en: {
      name: 'CNC Lathe',
      threats: {
        l01: { element: 'Spindle / chuck', threat: 'Entanglement / drawing-in', effect: 'Limb fracture, amputation' , scenario: 'Operator opens spindle guard during rotation; distance to spindle < 0.5 m' },
        l02: { element: 'Machining zone — chips', threat: 'Ejection of fragments / chips', effect: 'Eye and face injury' , scenario: 'Normal machining; operator stands in front of machine at 0.5–1.5 m distance' },
        l03: { element: 'Cutting tool', threat: 'Cutting / severing', effect: 'Laceration, finger amputation' , scenario: 'Manual tool change with stopped spindle; contact with cutting edge' },
        l04: { element: 'Carriage / tailstock', threat: 'Crushing / squeezing of fingers', effect: 'Crushing of fingers / hand' , scenario: 'Carriage adjustment at low feed speed; hands near carriage'},
        l05: { element: 'Workpiece in chuck (long shaft)', threat: 'Falling / ejection of workpiece on breakage', effect: 'Injuries from ejected material' , scenario: 'Machining long bar L/D > 4 without steady rest; speed > 500 rpm'},
        l06: { element: 'Electrical cabinet / drive (400 V)', threat: 'Electric shock', effect: 'Burns, death' , scenario: 'Electrical cabinet service with power on; access to cabinet'},
        l07: { element: 'CNC control panel', threat: 'Interface error / unintended start', effect: 'Uncontrolled machine movement' , scenario: 'Starting CNC cycle by operator; tool offset or program error'},
        l08: { element: 'Coolant / cutting oils', threat: 'Skin contact / inhalation of vapours', effect: 'Dermatitis, respiratory disease' , scenario: 'Daily skin contact with coolant; no protective gloves'},
        l09: { element: 'Oil mist / coolant aerosol', threat: 'Inhalation of aerosol (mist)', effect: 'Respiratory disease, cancer' , scenario: 'Work with intensive cooling; operator without mask in mist zone'},
        l10: { element: 'Motor / gearbox / machining', threat: 'Noise exceeding 85 dB(A)', effect: 'Permanent hearing loss' , scenario: 'Continuous work > 4h; noise level 88-95 dB(A) without hearing protection'},
        l11: { element: 'Unbalanced tool / chuck', threat: 'Mechanical vibration transmitted to hands', effect: 'Vibration syndrome (Raynaud\'s disease)' , scenario: 'Work with unbalanced chuck; vibration level A(8) > 2.5 m/s2'},
        l12: { element: 'Operator workstation', threat: 'Constrained posture / standing > 6h', effect: 'Musculoskeletal disorders' , scenario: 'Standing at machine > 6h without mat; bent body posture'},
        l13: { element: 'Hot chips / coolant', threat: 'Fire from ignition of coolant vapours', effect: 'Machine fire, burns' , scenario: 'Accumulation of chips and coolant vapours; spark from tool'},
        l14: { element: 'Machine transport (crane / forklift)', threat: 'Machine fall / tipping over', effect: 'Crushing of persons, machine damage' , scenario: 'Transport by crane; machine weight > 3t; persons within 5 m radius'},
        l15: { element: 'Machine installation / levelling', threat: 'Slip / tipping during setup', effect: 'Crushing of limbs' , scenario: 'Levelling with wedges; machine unstable before anchoring'},
        l16: { element: 'Electrical connection (400V / 3-phase)', threat: 'Electric shock during connection', effect: 'Burns, death' , scenario: 'Connecting 400V supply cables; no main disconnection'},
        l17: { element: 'First start-up / trial run', threat: 'Wrong spindle rotation direction', effect: 'Ejection of workpiece or tool' , scenario: 'First start-up without workpiece; checking rotation direction'},
        l18: { element: 'CNC program configuration', threat: 'NC program error — axis collision', effect: 'Machine damage, operator injury' , scenario: 'Loading new NC program; no dry run; speed at 100%'},
        l19: { element: 'Hydraulic / pneumatic chuck', threat: 'Pressure loss — workpiece ejection', effect: 'Impact from ejected workpiece' , scenario: 'Working with hydraulic chuck; hydraulic pump failure during machining'},
        l20: { element: 'Automatic tool change (turret)', threat: 'Impact from turret head', effect: 'Bruising, limb fractures' , scenario: 'Automatic tool change; operator near open door'},
        l21: { element: 'Service mode operation (JOG / MDI)', threat: 'Unintended axis movement during service', effect: 'Crushing of operator / technician limbs' , scenario: 'Service in JOG mode; operator in work zone with power on'},
        l22: { element: 'Chuck failure — workpiece loss', threat: 'Ejection of chuck fragments or workpiece', effect: 'Severe injuries — death' , scenario: 'High-speed machining; fatigue crack in chuck during rotation'},
        l23: { element: 'Tool / carriage collision with workpiece', threat: 'Carriage collision with workpiece or chuck', effect: 'Machine damage, part ejection' , scenario: 'First pass of new program; tool offset error'},
        l24: { element: 'Machining of reactive materials (Mg, Ti)', threat: 'Ignition of magnesium / titanium dust', effect: 'Fire, explosion' , scenario: 'Machining magnesium alloy; oil-based coolant; temperature > 400 C'},
        l25: { element: 'Machining zone lighting', threat: 'Insufficient lighting — operator error', effect: 'Injury resulting from observation error' , scenario: 'Evening work; inadequate local lighting; misreading display'},
        l26: { element: 'Power loss / sudden shutdown', threat: 'Uncontrolled axis movement on power return', effect: 'Collision, operator injury' , scenario: 'Power loss; guard open; operator in work zone'},
        l27: { element: 'Spindle brake failure', threat: 'Spindle coasting after switch-off', effect: 'Contact with rotating chuck' , scenario: 'E-stop activation; operator opens guard before full stop'},
        l28: { element: 'Coolant system failure', threat: 'Tool overheating — fire or ejection', effect: 'Burns, fire' , scenario: 'Coolant pump failure during machining; tool overheating'},
        l29: { element: 'Limit switch failure', threat: 'Axis travel beyond range', effect: 'Mechanical collision, machine damage' , scenario: 'Limit switch failure; bystanders near machine'},
        l30: { element: 'Machine cleaning / chip removal', threat: 'Cuts from sharp metal chips', effect: 'Hand lacerations' , scenario: 'Machine cleaning after shift; manual chip removal without hook'},
        l31: { element: 'Oil / fluid change', threat: 'Skin contact with machine oil', effect: 'Dermatitis, poisoning if ingested' , scenario: 'Monthly guideway oil change; oil spill on floor'},
        l32: { element: 'Chuck jaw adjustment / replacement', threat: 'Finger crushing by chuck jaws', effect: 'Crushed fingers' , scenario: 'Chuck jaw replacement without LOTO; spindle may start accidentally'},
        l33: { element: 'Hydraulic system service', threat: 'High-pressure hydraulic oil injection', effect: 'Oil injection under skin — amputation' , scenario: 'Hydraulic system service; pressure lines under residual pressure'},
        l34: { element: 'Machine dismantling / scrapping', threat: 'Heavy parts falling during dismantling', effect: 'Crushing, death' , scenario: 'Machine dismantling before scrapping; heavy parts without crane'},
      },
    },
    de: {
      name: 'CNC-Drehmaschine',
      threats: {
        l01: { element: 'Spindel / Drehfutter', threat: 'Erfassen / Einziehen', effect: 'Gliedmaßenbruch, Amputation' , scenario: 'Bediener öffnet Spindelschutz während der Drehung; Abstand zur Spindel < 0,5 m' },
        l02: { element: 'Bearbeitungszone — Späne', threat: 'Auswerfen von Splittern / Spänen', effect: 'Augen- und Gesichtsverletzung' , scenario: 'Normales Bearbeiten; Bediener steht 0,5–1,5 m vor der Maschine' },
        l03: { element: 'Schneidwerkzeug', threat: 'Schneiden / Abtrennen', effect: 'Schnittwunde, Fingeramputation' , scenario: 'Manuelller Werkzeugwechsel bei stehender Spindel; Kontakt mit der Schneide' },
        l04: { element: 'Schlitten / Reitstock', threat: 'Quetschen / Zerdrücken der Finger', effect: 'Quetschung der Finger / Hand' , scenario: 'Schlitteneinstellung bei niedriger Vorschubgeschwindigkeit; Haende nahe am Schlitten'},
        l05: { element: 'Werkstück im Futter (langer Schaft)', threat: 'Herausfallen / Auswerfen bei Bruch', effect: 'Verletzungen durch ausgeworfenes Material' , scenario: 'Bearbeitung eines langen Stabs L/D > 4 ohne Luenette; Drehzahl > 500 U/min'},
        l06: { element: 'Schaltschrank / Antrieb (400 V)', threat: 'Elektrischer Schlag', effect: 'Verbrennungen, Tod' , scenario: 'Service am Schaltschrank bei eingeschalteter Spannung'},
        l07: { element: 'CNC-Bedienteil', threat: 'Schnittstellenfehler / unbeabsichtigter Start', effect: 'Unkontrollierte Maschinenbewegung' , scenario: 'CNC-Zyklus gestartet; Werkzeugoffset- oder Programmierfehler'},
        l08: { element: 'Kühlmittel / Schneidöle', threat: 'Hautkontakt / Einatmen von Dämpfen', effect: 'Dermatitis, Atemwegserkrankung' , scenario: 'Taeglich Hautkontakt mit Kuehlmittel; keine Schutzhandschuhe'},
        l09: { element: 'Ölnebel / Kühlmittelaerosol', threat: 'Einatmen von Aerosol (Nebel)', effect: 'Atemwegserkrankung, Krebs' , scenario: 'Arbeit mit intensiver Kuehlung; Bediener ohne Maske in der Nebelzone'},
        l10: { element: 'Motor / Getriebe / Bearbeitung', threat: 'Lärm über 85 dB(A)', effect: 'Dauerhafter Gehörverlust' , scenario: 'Dauerbetrieb > 4h; Laermbelastung 88-95 dB(A) ohne Gehoerschutz'},
        l11: { element: 'Unwuchtiges Werkzeug / Futter', threat: 'Mechanische Vibrationen auf Hände', effect: 'Vibrationssyndrom (Raynaud)' , scenario: 'Arbeit mit unwuchtigem Futter; Schwingungspegel A(8) > 2,5 m/s2'},
        l12: { element: 'Bedienerarbeitsplatz', threat: 'Zwangshaltung / Stehen > 6h', effect: 'Muskel-Skelett-Erkrankungen' , scenario: 'Stehen an der Maschine > 6h ohne Matte; gebeugte Koerperhaltung'},
        l13: { element: 'Heiße Späne / Kühlmittel', threat: 'Brand durch Entzündung von Kühlmitteldämpfen', effect: 'Maschinenbrand, Verbrennungen' , scenario: 'Anhaeulung von Spaenen und Kuehlmitteldaempfen; Funke vom Werkzeug'},
        l14: { element: 'Maschinentransport (Kran / Stapler)', threat: 'Maschinenfall / Umkippen', effect: 'Zerquätschung von Personen, Maschinenschaden' , scenario: 'Transport mit Kran; Maschinengewicht > 3t; Personen in 5 m Radius'},
        l15: { element: 'Maschineninstallation / Ausrichten', threat: 'Ausrutschen / Umkippen beim Aufstellen', effect: 'Zerquätschung der Gliedmaßen' , scenario: 'Ausrichten mit Keilen; Maschine instabil vor der Verankerung'},
        l16: { element: 'Elektroanschluss (400V / 3-phasig)', threat: 'Stromschlag beim Anschließen', effect: 'Verbrennung, Tod' , scenario: 'Anschluss der 400V-Versorgungskabel; kein Haupttrennschalter'},
        l17: { element: 'Erstinbetriebnahme / Probelauf', threat: 'Falsche Spindeldrehrichtung', effect: 'Ausschleudern von Werkstück oder Werkzeug' , scenario: 'Erstinbetriebnahme ohne Werkstueck; Pruefung der Drehrichtung'},
        l18: { element: 'CNC-Programmkonfiguration', threat: 'NC-Programmfehler — Achsenkollision', effect: 'Maschinenschaden, Bedienverletzung' , scenario: 'Laden des neuen NC-Programms; kein Probelauf; Geschwindigkeit 100%'},
        l19: { element: 'Hydraulisch / pneumatisches Spannfutter', threat: 'Druckverlust — Werkstückausschleuderung', effect: 'Schlag durch ausgeschleudertes Werkstück' , scenario: 'Arbeit mit hydraulischem Futter; Ausfall der Hydraulikpumpe'},
        l20: { element: 'Automatischer Werkzeugwechsel (Revolver)', threat: 'Schlag durch Revolverkopf', effect: 'Prellung, Gliedmaßenbrüche' , scenario: 'Automatischer Werkzeugwechsel; Bediener nahe der offenen Tuer'},
        l21: { element: 'Betrieb im Servicemodus (JOG / MDI)', threat: 'Unbeabsichtigte Achsbewegung beim Service', effect: 'Zerquätschung der Gliedmaßen' , scenario: 'Service im JOG-Modus; Bediener in der Arbeitszone bei Spannung'},
        l22: { element: 'Spannfutterbruch — Werkstückverlust', threat: 'Ausschleudern von Spannfutterteilen', effect: 'Schwere Verletzungen — Tod' , scenario: 'Hochgeschwindigkeitsbearbeitung; Ermuedungsbruch im Futter'},
        l23: { element: 'Werkzeug- / Schlittenkollision mit Werkstück', threat: 'Schlittenkollision mit Werkstück oder Futter', effect: 'Maschinenschaden, Teileausschleuderung' , scenario: 'Erster Durchlauf eines neuen Programms; Werkzeugoffsetfehler'},
        l24: { element: 'Bearbeitung reaktiver Werkstoffe (Mg, Ti)', threat: 'Entzündung von Magnesium- / Titanstaub', effect: 'Brand, Explosion' , scenario: 'Bearbeitung von Magnesiumlegierung; oelbasiertes Kuehlmittel; Temp > 400 C'},
        l25: { element: 'Beleuchtung der Bearbeitungszone', threat: 'Unzureichende Beleuchtung — Bedienfehler', effect: 'Verletzung durch Beobachtungsfehler' , scenario: 'Abendarbeit; ungenuegend Beleuchtung; Fehllesen der Anzeige'},
        l26: { element: 'Stromausfall / plötzliche Abschaltung', threat: 'Unkontrollierte Achsbewegung bei Stromrückkehr', effect: 'Kollision, Bedienverletzung' , scenario: 'Stromausfall; Schutzabdeckung offen; Bediener in der Arbeitszone'},
        l27: { element: 'Spindelbremsenausfall', threat: 'Spindelauslauf nach Abschaltung', effect: 'Kontakt mit rotierendem Futter' , scenario: 'E-Stop-Betaetigung; Bediener oeffnet Schutz vor vollstaendigem Stillstand'},
        l28: { element: 'Kühlsystemausfall', threat: 'Werkzeugüberhitzung — Brand oder Ausschleuderung', effect: 'Verbrennungen, Brand' , scenario: 'Kuehlmittelpumpenausfall waehrend der Bearbeitung; Werkzeuguebererhitzung'},
        l29: { element: 'Endschalterausfall (Limit Switches)', threat: 'Überschreitung des Achsfahrbereichs', effect: 'Mechanische Kollision, Maschinenschaden' , scenario: 'Endschalterausfall; Unbeteiligte in der Naehe der Maschine'},
        l30: { element: 'Maschinenreinigung / Spanentfernung', threat: 'Schnittverletzungen durch scharfe Späne', effect: 'Handschnittwunden' , scenario: 'Maschinenreinigung nach der Schicht; manuelle Spanentnahme ohne Haken'},
        l31: { element: 'Öl- / Flüssigkeitswechsel', threat: 'Hautkontakt mit Maschinenöl', effect: 'Dermatitis, Vergiftung bei Einnahme' , scenario: 'Monatlicher Fuehrungsbahnenwechsel; Oel auf den Boden'},
        l32: { element: 'Backenjustierung / -wechsel am Spannfutter', threat: 'Fingerquetschung durch Spannbacken', effect: 'Zerquetschte Finger' , scenario: 'Backenwechsel ohne LOTO; Spindel kann versehentlich anlaufen'},
        l33: { element: 'Hydrauliksystemwartung', threat: 'Hochdruckhydraulölinjektion', effect: 'Ölinjektion unter die Haut — Amputation' , scenario: 'Hydrauliksystemservice; Druckleitungen unter Restdruck'},
        l34: { element: 'Maschinendemontage / Verschrottung', threat: 'Schwere Teile fallen bei Demontage', effect: 'Zerquätschung, Tod' , scenario: 'Maschinendemontage vor der Verschrottung; schwere Teile ohne Kran'},
      },
    },
    fr: {
      name: 'Tour CNC',
      threats: {
        l01: { element: 'Broche / mandrin de tour', threat: 'Entraînement / happement', effect: 'Fracture de membre, amputation' , scenario: 'Opérateur ouvre la protection de broche pendant la rotation ; distance à la broche < 0,5 m' },
        l02: { element: 'Zone d\'usinage — copeaux', threat: 'Projection de fragments / copeaux', effect: 'Blessure aux yeux et au visage' , scenario: 'Usinage normal ; opérateur debout à 0,5–1,5 m devant la machine' },
        l03: { element: 'Outil de coupe', threat: 'Coupure / section', effect: 'Lacération, amputation de doigts' , scenario: 'Changement manuel d’outil broche arretee; contact avec le tranchant'},
        l04: { element: 'Chariot / poupée mobile', threat: 'Écrasement / coincement des doigts', effect: 'Écrasement des doigts / main' , scenario: 'Reglage du chariot a faible vitesse; mains pres du chariot'},
        l05: { element: 'Pièce en mandrin (longue barre)', threat: 'Chute / projection à la rupture', effect: 'Blessures par projection de matière' , scenario: 'Usinage longue barre L/D > 4 sans lunette; vitesse > 500 tr/min'},
        l06: { element: 'Armoire électrique / variateur (400 V)', threat: 'Électrocution', effect: 'Brûlures, décès' , scenario: 'Service armoire electrique sous tension; acces a l armoire'},
        l07: { element: 'Pupitre de commande CNC', threat: 'Erreur d\'interface / démarrage involontaire', effect: 'Mouvement incontrôlé de la machine' , scenario: 'Lancement du cycle CNC; erreur de jauge ou de programme'},
        l08: { element: 'Liquide de refroidissement / huiles', threat: 'Contact cutané / inhalation de vapeurs', effect: 'Dermatite, maladie respiratoire' , scenario: 'Contact cutane quotidien avec le liquide de refroidissement; sans gants'},
        l09: { element: 'Brouillard d\'huile / aérosol', threat: 'Inhalation d\'aérosol (brouillard)', effect: 'Maladie respiratoire, cancer' , scenario: 'Travail avec refroidissement intensif; operateur sans masque dans la zone nebuleuse'},
        l10: { element: 'Moteur / boîte de vitesses', threat: 'Bruit dépassant 85 dB(A)', effect: 'Perte auditive permanente' , scenario: 'Travail continu > 4h; bruit 88-95 dB(A) sans protection auditive'},
        l11: { element: 'Outil / mandrin déséquilibré', threat: 'Vibrations mécaniques transmises aux mains', effect: 'Syndrome vibratoire (Raynaud)' , scenario: 'Travail avec mandrin desequilibre; niveau de vibration A(8) > 2,5 m/s2'},
        l12: { element: 'Poste opérateur', threat: 'Posture contrainte / debout > 6h', effect: 'Troubles musculo-squelettiques' , scenario: 'Debout a la machine > 6h sans tapis; posture flechie'},
        l13: { element: 'Copeaux chauds / liquide de refroidissement', threat: 'Incendie par inflammation des vapeurs', effect: 'Incendie machine, brûlures' , scenario: 'Accumulation de copeaux et vapeurs; etincelle de l’outil'},
        l14: { element: 'Transport machine (pont roulant / chariot)', threat: 'Chute / renversement de la machine', effect: 'Écrasement de personnes, dommages machine' , scenario: 'Transport par pont roulant; masse > 3t; personnes dans un rayon de 5 m'},
        l15: { element: 'Installation / mise à niveau de la machine', threat: 'Glissement / renversement pendant la mise en place', effect: 'Écrasement des membres' , scenario: 'Mise a niveau avec cales; machine instable avant ancrage'},
        l16: { element: 'Raccordement électrique (400V / triphasé)', threat: 'Électrocution lors du raccordement', effect: 'Brûlures, mort' , scenario: 'Raccordement des cables 400V; sans coupure principale'},
        l17: { element: 'Premier démarrage / essai de marche', threat: 'Mauvais sens de rotation de la broche', effect: 'Éjection de la pièce ou de l’outil' , scenario: 'Premier demarrage sans piece; verification du sens de rotation'},
        l18: { element: 'Configuration du programme CNC', threat: 'Erreur programme NC — collision d’axes', effect: 'Dégâts machine, blessure opérateur' , scenario: 'Chargement nouveau programme NC; pas de marche a vide; vitesse 100%'},
        l19: { element: 'Mandrin hydraulique / pneumatique', threat: 'Perte de pression — éjection de pièce', effect: 'Coup de la pièce éjectée' , scenario: 'Travail avec mandrin hydraulique; panne de pompe hydraulique'},
        l20: { element: 'Changement automatique d’outils (tourelle)', threat: 'Choc de la tête de tourelle', effect: 'Contusions, fractures des membres' , scenario: 'Changement automatique d’outil; operateur pres de la porte ouverte'},
        l21: { element: 'Travail en mode service (JOG / MDI)', threat: 'Déplacement d’axe involontaire lors de la maintenance', effect: 'Écrasement des membres opérateur / technicien' , scenario: 'Service en mode JOG; operateur dans la zone de travail sous tension'},
        l22: { element: 'Rupture du mandrin — perte de pièce', threat: 'Éjection de fragments du mandrin ou de la pièce', effect: 'Blessures graves — mort' , scenario: 'Usinage grande vitesse; fissure de fatigue dans le mandrin'},
        l23: { element: 'Collision outil / chariot avec la pièce', threat: 'Collision du chariot avec la pièce ou le mandrin', effect: 'Dégâts machine, éjection de pièces' , scenario: 'Premier passage d’un nouveau programme; erreur de jauge'},
        l24: { element: 'Usinage de matériaux réactifs (Mg, Ti)', threat: 'Inflammation des poussières de magnésium / titane', effect: 'Incendie, explosion' , scenario: 'Usinage alliage de magnesium; liquide a base huile; temperature > 400 C'},
        l25: { element: 'Eclairage de la zone d’usinage', threat: 'Éclairage insuffisant — erreur opérateur', effect: 'Blessure due à une erreur d’observation' , scenario: 'Travail en soiree; eclairage insuffisant; mauvaise lecture affichage'},
        l26: { element: 'Coupure de courant / arrêt soudain', threat: 'Mouvement d’axe incontrôlé au retour du courant', effect: 'Collision, blessure opérateur' , scenario: 'Perte de courant; protection ouverte; operateur dans la zone'},
        l27: { element: 'Défaillance du frein de broche', threat: 'Lenté d’arrêt de la broche après coupure', effect: 'Contact avec le mandrin en rotation' , scenario: 'Activation E-stop; operateur ouvre protection avant arret complet'},
        l28: { element: 'Défaillance du système de refroidissement', threat: 'Surchauffe de l’outil — incendie ou éjection', effect: 'Brûlures, incendie' , scenario: 'Panne pompe liquide de refroidissement; surchauffe outil'},
        l29: { element: 'Défaillance des fins de course', threat: 'Dépassement de la plage de déplacement d’axe', effect: 'Collision mécanique, dégâts machine' , scenario: 'Defaillance fin de course; personnes a proximite'},
        l30: { element: 'Nettoyage machine / enlèvement des copeaux', threat: 'Coupures par copeaux métalliques tranchants', effect: 'Plaies aux mains' , scenario: 'Nettoyage machine apres quart; evacuation manuelle copeaux sans crochet'},
        l31: { element: 'Vidange huile / fluides', threat: 'Contact cutané avec l’huile machine', effect: 'Dermatite, empoisonnement en cas d’ingéstion' , scenario: 'Vidange mensuelle huile de glissieres; deversement d’huile'},
        l32: { element: 'Réglage / remplacement des mors du mandrin', threat: 'Écrasement des doigts par les mors', effect: 'Doigts écrasés' , scenario: 'Remplacement des mors sans LOTO; broche peut demarrer accidentellement'},
        l33: { element: 'Entretien du circuit hydraulique', threat: 'Injection d’huile hydraulique haute pression', effect: 'Injection d’huile sous la peau — amputation' , scenario: 'Service circuit hydraulique; conduites sous pression residuelle'},
        l34: { element: 'Démontage / mise au rebut machine', threat: 'Chute de pièces lourdes lors du démontage', effect: 'Écrasement, mort' , scenario: 'Demontage machine avant mise au rebut; elements lourds sans pont roulant'},
      },
    },
    it: {
      name: 'Tornio CNC',
      threats: {
        l01: { element: 'Mandrino / autocentrante', threat: 'Presa / trascinamento', effect: 'Frattura, amputazione' , scenario: 'Operatore apre la protezione del mandrino durante la rotazione; distanza dal mandrino < 0,5 m' },
        l02: { element: 'Zona di lavorazione — trucioli', threat: 'Proiezione di frammenti / trucioli', effect: 'Lesione agli occhi e al viso' , scenario: 'Lavorazione normale; operatore in piedi davanti alla macchina a 0,5–1,5 m' },
        l03: { element: 'Utensile da taglio', threat: 'Taglio / recisione', effect: 'Lacerazione, amputazione dita' , scenario: 'Cambio utensile manuale con mandrino fermo; contatto con il tagliente'},
        l04: { element: 'Carrello / contropunta', threat: 'Schiacciamento / intrappolamento dita', effect: 'Schiacciamento dita / mano' , scenario: 'Regolazione slitta a bassa velocita; mani vicino alla slitta'},
        l05: { element: 'Pezzo in autocentrante (albero lungo)', threat: 'Caduta / proiezione alla rottura', effect: 'Lesioni da materiale proiettato' , scenario: 'Lavorazione barra lunga L/D > 4 senza lunetta; velocita > 500 giri/min'},
        l06: { element: 'Quadro elettrico / azionamento (400 V)', threat: 'Elettrocuzione', effect: 'Ustioni, morte' , scenario: 'Assistenza quadro elettrico con tensione; accesso al quadro'},
        l07: { element: 'Pannello di controllo CNC', threat: 'Errore interfaccia / avvio involontario', effect: 'Movimento incontrollato macchina' , scenario: 'Avvio ciclo CNC; errore offset utensile o di programma'},
        l08: { element: 'Refrigerante / oli da taglio', threat: 'Contatto cutaneo / inalazione vapori', effect: 'Dermatite, malattia respiratoria' , scenario: 'Contatto cutaneo giornaliero con refrigerante; senza guanti'},
        l09: { element: 'Nebbia d\'olio / aerosol refrigerante', threat: 'Inalazione di aerosol (nebbia)', effect: 'Malattia respiratoria, cancro' , scenario: 'Lavoro con raffreddamento intensivo; operatore senza maschera nella nebbia'},
        l10: { element: 'Motore / riduttore / lavorazione', threat: 'Rumore superiore a 85 dB(A)', effect: 'Perdita uditiva permanente' , scenario: 'Lavoro continuo > 4h; rumore 88-95 dB(A) senza protezione uditiva'},
        l11: { element: 'Utensile / mandrino sbilanciato', threat: 'Vibrazioni meccaniche trasmesse alle mani', effect: 'Sindrome vibratoria (Raynaud)' , scenario: 'Lavoro con mandrino non bilanciato; vibrazione A(8) > 2,5 m/s2'},
        l12: { element: 'Postazione operatore', threat: 'Postura vincolata / stare in piedi > 6h', effect: 'Disturbi muscolo-scheletrici' , scenario: 'In piedi alla macchina > 6h senza tappeto; postura flessa'},
        l13: { element: 'Trucioli caldi / refrigerante', threat: 'Incendio per accensione vapori refrigerante', effect: 'Incendio macchina, ustioni' , scenario: 'Accumulo trucioli e vapori refrigerante; scintilla utensile'},
        l14: { element: 'Trasporto macchina (gru / carrello)', threat: 'Caduta / ribaltamento della macchina', effect: 'Schiacciamento di persone, danno macchina' , scenario: 'Trasporto con carroponte; peso > 3t; persone nel raggio 5 m'},
        l15: { element: 'Installazione / livellamento macchina', threat: 'Scivolamento / ribaltamento durante la messa in opera', effect: 'Schiacciamento degli arti' , scenario: 'Livellamento con cunei; macchina instabile prima ancoraggio'},
        l16: { element: 'Collegamento elettrico (400V / trifase)', threat: 'Folgorazione durante il collegamento', effect: 'Ustioni, morte' , scenario: 'Collegamento cavi 400V; senza sezionatore principale'},
        l17: { element: 'Primo avviamento / prova di marcia', threat: 'Direzione di rotazione mandrino errata', effect: "Espulsione del pezzo o dell’utensile" , scenario: 'Primo avviamento senza pezzo; verifica senso rotazione'},
        l18: { element: 'Configurazione programma CNC', threat: 'Errore programma NC — collisione assi', effect: 'Danno macchina, infortunio operatore' , scenario: 'Caricamento nuovo programma NC; senza prova a vuoto; velocita 100%'},
        l19: { element: 'Mandrino idraulico / pneumatico', threat: 'Perdita di pressione — espulsione pezzo', effect: 'Colpo dal pezzo espulso' , scenario: 'Lavoro con mandrino idraulico; guasto pompa idraulica'},
        l20: { element: 'Cambio utensile automatico (torretta)', threat: 'Colpo dalla testa torretta', effect: 'Contusioni, fratture agli arti' , scenario: 'Cambio utensile automatico; operatore vicino porta aperta'},
        l21: { element: 'Lavoro in modalità servizio (JOG / MDI)', threat: 'Movimento asse involontario durante la manutenzione', effect: 'Schiacciamento arti operatore / tecnico' , scenario: 'Assistenza modalita JOG; operatore in zona di lavoro con tensione'},
        l22: { element: 'Rottura mandrino — perdita pezzo', threat: 'Espulsione frammenti mandrino o pezzo', effect: 'Lesioni gravi — morte' , scenario: 'Lavorazione alta velocita; cricca da fatica nel mandrino'},
        l23: { element: 'Collisione utensile / slitta con pezzo', threat: 'Collisione slitta con pezzo o mandrino', effect: 'Danno macchina, espulsione parti' , scenario: 'Primo passaggio nuovo programma; errore offset utensile'},
        l24: { element: 'Lavorazione materiali reattivi (Mg, Ti)', threat: 'Accensione polvere di magnesio / titanio', effect: 'Incendio, esplosione' , scenario: 'Lavorazione lega magnesio; refrigerante a base olio; temperatura > 400 C'},
        l25: { element: 'Illuminazione zona lavorazione', threat: 'Illuminazione insufficiente — errore operatore', effect: 'Infortunio da errore di osservazione' , scenario: 'Lavoro serale; illuminazione inadeguata; lettura errata display'},
        l26: { element: 'Mancanza alimentazione / spegnimento improvviso', threat: 'Movimento asse incontrollato al ritorno alimentazione', effect: 'Collisione, infortunio operatore' , scenario: 'Interruzione corrente; protezione aperta; operatore nella zona'},
        l27: { element: 'Guasto freno mandrino', threat: 'Inerzia mandrino dopo spegnimento', effect: 'Contatto con mandrino in rotazione' , scenario: 'Attivazione E-stop; operatore apre protezione prima arresto completo'},
        l28: { element: 'Guasto sistema refrigerazione', threat: 'Surriscaldamento utensile — incendio o espulsione', effect: 'Ustioni, incendio' , scenario: 'Guasto pompa refrigerante durante lavorazione; surriscaldamento utensile'},
        l29: { element: 'Guasto fine corsa (limit switches)', threat: 'Superamento della corsa asse', effect: 'Collisione meccanica, danno macchina' , scenario: 'Guasto finecorsa; persone nei pressi della macchina'},
        l30: { element: 'Pulizia macchina / rimozione trucioli', threat: 'Tagli da trucioli metallici taglienti', effect: 'Lacerazioni alle mani' , scenario: 'Pulizia macchina dopo turno; rimozione manuale trucioli senza gancio'},
        l31: { element: 'Cambio olio / fluidi', threat: 'Contatto cutaneo con olio macchina', effect: 'Dermatite, avvelenamento se ingerito' , scenario: 'Cambio mensile olio guide; fuoriuscita olio sul pavimento'},
        l32: { element: 'Regolazione / sostituzione griffe mandrino', threat: 'Schiacciamento dita dalle griffe', effect: 'Dita schiacciate' , scenario: 'Sostituzione griffe senza LOTO; mandrino puo avviarsi accidentalmente'},
        l33: { element: 'Manutenzione sistema idraulico', threat: 'Iniezione olio idraulico ad alta pressione', effect: 'Iniezione olio sotto pelle — amputazione' , scenario: 'Assistenza sistema idraulico; condutture sotto pressione residua'},
        l34: { element: 'Smontaggio / rottamazione macchina', threat: 'Caduta parti pesanti durante lo smontaggio', effect: 'Schiacciamento, morte' , scenario: 'Smontaggio macchina prima rottamazione; parti pesanti senza carroponte'},
      },
    },
    es: {
      name: 'Torno CNC',
      threats: {
        l01: { element: 'Husillo / plato de torno', threat: 'Atrapamiento / arrastre', effect: 'Fractura de miembro, amputación' , scenario: 'Operador abre la protección del husillo durante la rotación; distancia al husillo < 0,5 m' },
        l02: { element: 'Zona de mecanizado — virutas', threat: 'Proyección de fragmentos / virutas', effect: 'Lesión en ojos y cara' , scenario: 'Mecanizado normal; operador de pie frente a la máquina a 0,5–1,5 m' },
        l03: { element: 'Herramienta de corte', threat: 'Corte / cercenamiento', effect: 'Laceración, amputación de dedos' , scenario: 'Cambio manual herramienta con husillo parado; contacto con el filo'},
        l04: { element: 'Carro / contrapunto', threat: 'Aplastamiento / atrapamiento de dedos', effect: 'Aplastamiento de dedos / mano' , scenario: 'Ajuste carro a baja velocidad avance; manos cerca del carro'},
        l05: { element: 'Pieza en plato (eje largo)', threat: 'Caída / proyección al fracturarse', effect: 'Lesiones por material proyectado' , scenario: 'Mecanizado barra larga L/D > 4 sin luneta; velocidad > 500 rpm'},
        l06: { element: 'Armario eléctrico / variador (400 V)', threat: 'Electrocución', effect: 'Quemaduras, muerte' , scenario: 'Servicio armario electrico con tension; acceso al armario'},
        l07: { element: 'Panel de control CNC', threat: 'Error de interfaz / arranque involuntario', effect: 'Movimiento incontrolado de la máquina' , scenario: 'Inicio ciclo CNC; error offset herramienta o de programa'},
        l08: { element: 'Refrigerante / aceites de corte', threat: 'Contacto cutáneo / inhalación de vapores', effect: 'Dermatitis, enfermedad respiratoria' , scenario: 'Contacto cutaneo diario con refrigerante; sin guantes'},
        l09: { element: 'Niebla de aceite / aerosol refrigerante', threat: 'Inhalación de aerosol (niebla)', effect: 'Enfermedad respiratoria, cáncer' , scenario: 'Trabajo con refrigeracion intensa; operador sin mascara en zona niebla'},
        l10: { element: 'Motor / caja de engranajes', threat: 'Ruido superior a 85 dB(A)', effect: 'Pérdida auditiva permanente' , scenario: 'Trabajo continuo > 4h; ruido 88-95 dB(A) sin proteccion auditiva'},
        l11: { element: 'Herramienta / plato desequilibrado', threat: 'Vibraciones mecánicas transmitidas a manos', effect: 'Síndrome vibratorio (Raynaud)' , scenario: 'Trabajo con mandril desequilibrado; vibracion A(8) > 2,5 m/s2'},
        l12: { element: 'Puesto del operador', threat: 'Postura forzada / de pie > 6h', effect: 'Trastornos musculoesqueléticos' , scenario: 'De pie en la maquina > 6h sin alfombrilla; postura flexionada'},
        l13: { element: 'Virutas calientes / refrigerante', threat: 'Incendio por ignición de vapores refrigerantes', effect: 'Incendio de máquina, quemaduras' , scenario: 'Acumulacion virutas y vapores refrigerante; chispa herramienta'},
        l14: { element: 'Transporte de máquina (grúa / carretilla)', threat: 'Caída / vuelco de la máquina', effect: 'Aplastamiento de personas, daños en máquina' , scenario: 'Transporte con grua; peso > 3t; personas en radio 5 m'},
        l15: { element: 'Instalación / nivelación de la máquina', threat: 'Deslizamiento / vuelco durante la puesta en marcha', effect: 'Aplastamiento de extremidades' , scenario: 'Nivelacion con cunas; maquina inestable antes anclaje'},
        l16: { element: 'Conexión eléctrica (400V / trifásica)', threat: 'Electrocución durante la conexión', effect: 'Quemaduras, muerte' , scenario: 'Conexion cables 400V; sin corte principal'},
        l17: { element: 'Primera puesta en marcha / prueba de marcha', threat: 'Dirección de rotación del husillo incorrecta', effect: 'Expulsión de pieza o herramienta' , scenario: 'Primera puesta en marcha sin pieza; comprobacion sentido giro'},
        l18: { element: 'Configuración del programa CNC', threat: 'Error en programa NC — colisión de ejes', effect: 'Daños en máquina, lesión del operador' , scenario: 'Carga nuevo programa NC; sin marcha en vacio; velocidad 100%'},
        l19: { element: 'Mandril hidráulico / neumático', threat: 'Pérdida de presión — expulsión de pieza', effect: 'Impacto de la pieza expulsada' , scenario: 'Trabajo con mandril hidraulico; fallo bomba hidraulica'},
        l20: { element: 'Cambio automático de herramientas (torreta)', threat: 'Golpe de la cabeza de torreta', effect: 'Contusiones, fracturas de extremidades' , scenario: 'Cambio automatico herramienta; operador cerca puerta abierta'},
        l21: { element: 'Trabajo en modo servicio (JOG / MDI)', threat: 'Movimiento de eje involuntario durante servicio', effect: 'Aplastamiento de extremidades operador / técnico' , scenario: 'Servicio modo JOG; operador en zona trabajo con tension'},
        l22: { element: 'Rotura del mandril — pérdida de pieza', threat: 'Expulsión de fragmentos del mandril o pieza', effect: 'Lesiones graves — muerte' , scenario: 'Mecanizado alta velocidad; grieta fatiga en mandril'},
        l23: { element: 'Colisión herramienta / carro con pieza', threat: 'Colisión del carro con pieza o mandril', effect: 'Daños en máquina, expulsión de piezas' , scenario: 'Primer paso nuevo programa; error offset herramienta'},
        l24: { element: 'Mecanizado de materiales reactivos (Mg, Ti)', threat: 'Ignición de polvo de magnesio / titanio', effect: 'Incendio, explosión' , scenario: 'Mecanizado aleacion magnesio; refrigerante base aceite; temperatura > 400 C'},
        l25: { element: 'Iluminación de la zona de mecanizado', threat: 'Iluminación insuficiente — error del operador', effect: 'Lesión por error de observación' , scenario: 'Trabajo nocturno; iluminacion insuficiente; lectura erronea display'},
        l26: { element: 'Corte de corriente / apagado repentino', threat: 'Movimiento de eje incontrolado al volver la corriente', effect: 'Colisión, lesión del operador' , scenario: 'Corte corriente; proteccion abierta; operador en la zona'},
        l27: { element: 'Fallo del freno del husillo', threat: 'Inercia del husillo tras apagado', effect: 'Contacto con mandril en rotación' , scenario: 'Activacion E-stop; operador abre proteccion antes parada completa'},
        l28: { element: 'Fallo del sistema de refrigeración', threat: 'Sobrecalentamiento de herramienta — incendio o expulsión', effect: 'Quemaduras, incendio' , scenario: 'Fallo bomba refrigerante durante mecanizado; sobrecalentamiento herramienta'},
        l29: { element: 'Fallo de finales de carrera (limit switches)', threat: 'Exceso de recorrido del eje', effect: 'Colisión mecánica, daños en máquina' , scenario: 'Fallo final de carrera; personas cerca de la maquina'},
        l30: { element: 'Limpieza de máquina / retirada de virutas', threat: 'Cortes por virutas metálicas afiladas', effect: 'Laceraciones en manos' , scenario: 'Limpieza maquina tras turno; retirada manual virutas sin gancho'},
        l31: { element: 'Cambio de aceite / fluidos', threat: 'Contacto cutáneo con aceite de máquina', effect: 'Dermatitis, envenenamiento si se ingiere' , scenario: 'Cambio mensual aceite guias; derrame aceite en suelo'},
        l32: { element: 'Ajuste / sustitución de mordazas del mandril', threat: 'Aplastamiento de dedos por mordazas', effect: 'Dedos aplastados' , scenario: 'Sustitucion mordazas sin LOTO; husillo puede arrancar accidentalmente'},
        l33: { element: 'Mantenimiento del sistema hidráulico', threat: 'Inyección de aceite hidráulico a alta presión', effect: 'Inyección de aceite bajo la piel — amputación' , scenario: 'Servicio sistema hidraulico; conducciones bajo presion residual'},
        l34: { element: 'Desmontaje / desguace de máquina', threat: 'Caída de piezas pesadas durante el desmontaje', effect: 'Aplastamiento, muerte' , scenario: 'Desmontaje maquina antes desguace; piezas pesadas sin grua'},
      },
    },
    cs: {
      name: 'CNC soustruh',
      threats: {
        l01: { element: 'Vřeteno / sklíčidlo', threat: 'Zachycení / vtažení', effect: 'Zlomenina končetiny, amputace' , scenario: 'Obsluha otevírá ochranu vretena během otáčení; vzdálenost od vretena < 0,5 m' },
        l02: { element: 'Obráběcí zóna — třísky', threat: 'Vymrštění úlomků / třísek', effect: 'Poranění očí a obličeje' , scenario: 'Normální obrábění; obsluha stojí před strojem ve vzdálenosti 0,5–1,5 m' },
        l03: { element: 'Řezný nástroj', threat: 'Řezání / useknutí', effect: 'Řezná rána, amputace prstů' , scenario: 'Ruční výměna nástroje při zastaveném vretenu; kontakt s řeznou hranou' },
        l04: { element: 'Suport / koník', threat: 'Drcení / zmáčknutí prstů', effect: 'Rozdrcení prstů / ruky' , scenario: 'Nastaveni suportu pri nizke rychlosti posuvu; ruce v blizkosti suportu'},
        l05: { element: 'Obrobek ve sklíčidle (dlouhý hřídel)', threat: 'Vypadnutí / vymrštění při lomu', effect: 'Zranění vymrštěným materiálem' , scenario: 'Obrabeni dlouhe tyce L/D > 4 bez lunetky; otacky > 500 ot/min'},
        l06: { element: 'Rozvaděč / pohon (400 V)', threat: 'Úraz elektrickým proudem', effect: 'Popáleniny, smrt' , scenario: 'Servis rozvodne skrine pri zapnutem napajeni; pristup k rozvodne'},
        l07: { element: 'CNC ovládací panel', threat: 'Chyba rozhraní / neúmyslné spuštění', effect: 'Nekontrolovaný pohyb stroje' , scenario: 'Spusteni CNC cyklu obsluhou; chyba korekce nastroje nebo programu'},
        l08: { element: 'Chladicí kapalina / řezné oleje', threat: 'Kontakt s kůží / vdechování výparů', effect: 'Dermatitida, onemocnění dýchacích cest' , scenario: 'Denni kontakt kuze s chladicen kapalinou; bez ochranych rukavic'},
        l09: { element: 'Olejová mlha / aerosol chladiva', threat: 'Vdechování aerosolu (mlhy)', effect: 'Onemocnění dýchacích cest, rakovina' , scenario: 'Prace s intenzivnim chladenim; obsluha bez masky v zone mlhy'},
        l10: { element: 'Motor / převodovka / obrábění', threat: 'Hluk překračující 85 dB(A)', effect: 'Trvalá ztráta sluchu' , scenario: 'Nepretrzita prace > 4h; hluk 88-95 dB(A) bez chranicel sluchu'},
        l11: { element: 'Nevyvážený nástroj / sklíčidlo', threat: 'Mechanické vibrace přenášené na ruce', effect: 'Vibrační syndrom (Raynaudova nemoc)' , scenario: 'Prace s nevyvazenym sklicidlem; vibrace A(8) > 2,5 m/s2'},
        l12: { element: 'Pracovní místo operátora', threat: 'Nucená poloha těla / stání > 6h', effect: 'Muskuloskeletální poruchy' , scenario: 'Stani u stroje > 6h bez podlazky; ohnutu poloha tela'},
        l13: { element: 'Horké třísky / chladivo', threat: 'Požár vznícením výparů chladiva', effect: 'Požár stroje, popáleniny' , scenario: 'Hromadeni trisek a vypar chladicen kapaliny; jiskry z nastroje'},
        l14: { element: 'Doprava stroje (jeřáb / vozík)', threat: 'Pád / převrácení stroje', effect: 'RozmáČknutí osob, poškození stroje' , scenario: 'Preprava jerabem; hmotnost > 3t; osoby v okruhu 5 m'},
        l15: { element: 'Instalace / nivelace stroje', threat: 'Klouznutí / převrácení při nastavení', effect: 'RozmáČknutí končetin' , scenario: 'Vyrovnani kliny; stroj nestabilni pred ukotvenim'},
        l16: { element: 'Elektrické připojení (400V / 3-fázové)', threat: 'Úraz elektrickým proudem při připojení', effect: 'Popáleniny, smrt' , scenario: 'Pripojeni napajacich kabelu 400V; bez hlavniho odpojeni'},
        l17: { element: 'První spuštění / zkušební provoz', threat: 'Chybný směr otáčení vretena', effect: 'Vyvrhl obrobku nebo nástroje' , scenario: 'Prvni spusteni bez obrobku; overeni smeru otaceni'},
        l18: { element: 'Konfigurace programu CNC', threat: 'Chyba programu NC — kolíze osí', effect: 'Poškození stroje, zranění obsluhy' , scenario: 'Nacteni noveho NC programu; bez zkusebniho chodu; rychlost 100%'},
        l19: { element: 'Hydraulické / pneumatické sklicidlo', threat: 'Ztrata tlaku — vypadnutí obrobku', effect: 'Náraz vyvrhl obrobku' , scenario: 'Prace s hydraulickym sklicidlem; porucha hydraulickeho cerpadla'},
        l20: { element: 'Automatická výměna nástrojů (revolverová hlava)', threat: 'Náraz revolverové hlavy', effect: 'Pohmozdiné, zlomeniny končetin' , scenario: 'Automaticka vymena nastroje; obsluha blizko otevrenych dveri'},
        l21: { element: 'Práce v servisním režimu (JOG / MDI)', threat: 'Nezamýšlený pohyb osy při servisu', effect: 'RozmáČknutí končetin obsluhy / servisníka' , scenario: 'Servis v rezimu JOG; obsluha v pracovni zone pri zapnutem napajeni'},
        l22: { element: 'Lom sklicidla — ztráta obrobku', threat: 'Vyvrhl fragmentů sklicidla nebo obrobku', effect: 'Těžké zranění — smrt' , scenario: 'Vysoke otacky obrabeni; unavova trhlina v sklicidle behem otaceni'},
        l23: { element: 'Kolíze nástroje / suportu s obrobkem', threat: 'Kolíze suportu s obrobkem nebo sklicidlem', effect: 'Poškození stroje, odhoz dílů' , scenario: 'Prvni pruchod noveho programu; chyba korekce nastroje'},
        l24: { element: 'Obrábění reaktivních materiálů (Mg, Ti)', threat: 'Vznícení prachu hodnéku / titanu', effect: 'Požár, výbuch' , scenario: 'Obrabeni slitiny horciku; olejove chladivo; teplota > 400 C'},
        l25: { element: 'Osvětlení obráběcí zóny', threat: 'Nedostatečné osvětlení — chyba obsluhy', effect: 'Zranění v důsledku chyby pozorování', scenario: 'Nedostatečné osvětlení pracovní zóny ztěžuje kontrolu upnutí obrobku.' },
        l26: { element: 'Výpadek napájení / náhlé vypnutí', threat: 'Nekontrolovaný pohyb osy při obnovení napájení', effect: 'Kolíze, zranění obsluhy', scenario: 'Výpadek napájení při soustružení — osa se ihned nezastaví, dochází ke kolizi.' },
        l27: { element: 'Porúcha brzdy vretena', threat: 'Doběh vretena po vypnutí', effect: 'Kontakt s rotujícím sklicidlem', scenario: 'Porucha elektrické brzdy vřetena — doběh trvá několik sekund po zastavení.' },
        l28: { element: 'Porúcha chladicho systému', threat: 'Přehřátí nástroje — požár nebo vyvrhl', effect: 'Popáleniny, požár', scenario: 'Ucpaný filtr chladicí kapaliny — čerpadlo běží naprázdno, teplota nástroje roste.' },
        l29: { element: 'Porúcha koncových spínačů (limit switches)', threat: 'Překročení rozsahu pohybu osy', effect: 'Mechanická kolíze, poškození stroje', scenario: 'Porucha koncového spínače osy Z — suport naráží do sklíčidla při návratu do nuly.' },
        l30: { element: 'Čištění stroje / odstraňování třísek', threat: 'Poranění od ostrých kovových třísek', effect: 'Trhné rány na rukou', scenario: 'Obsluha odstraňuje páskové třísky holou rukou bez rukavic při čištění pracovní zóny.' },
        l31: { element: 'Výměna oleje / provozních kapalin', threat: 'Kontakt kůže se strojním olejem', effect: 'Dermatitída, otrava při požití', scenario: 'Kontakt se starým hydraulickým olejem při jeho vypouštění bez ochranných rukavic.' },
        l32: { element: 'Nastavení / výměna čelustí sklicidla', threat: 'Rozdrcení prstů čelistmi', effect: 'Zdrcené prsty', scenario: 'Čelisti sklíčidla zachytí prst obsluhy při ruční regulaci klíčem.' },
        l33: { element: 'Servis hydraulického systému', threat: 'Injekce hydraulického oleje pod tlakem', effect: 'Injekce oleje pod kůži — amputace', scenario: 'Vstřik oleje pod vysokým tlakem při odpojení hydraulického vedení.' },
        l34: { element: 'Demontáž / srotování stroje', threat: 'Pád těžkých dílů při demontování', effect: 'RozmáČknutí, smrt', scenario: 'Hlava vřetena spadne při demontáži bez podepření při šrotování.' },
      },
    },
  },

  'lathe-conventional': {
    pl: {
      name: 'Tokarka konwencjonalna / kłowa',
      threats: {
        lc01: { element: 'Wrzeciono / uchwyt 3-szczękowy', threat: 'Pochwycenie / wciągnięcie', effect: 'Złamanie, amputacja', scenario: 'Operator sięga do obracającego się uchwytu — rękaw lub rękawica zostaje pochwycona.' },
        lc02: { element: 'Imak narzędziowy', threat: 'Cięcie / obcinanie', effect: 'Skaleczenie rąk', scenario: 'Ręka ślizga się podczas ręcznej zmiany narzędzia w imaku bez blokady wrzeciona.' },
        lc03: { element: 'Wióry wstęgowe / zwijające się', threat: 'Wyrzucenie / wciągnięcie przez wiór wstęgowy', effect: 'Urazy oczu, rąk', scenario: 'Wióry wstęgowe nawijają się na wrzeciono i zaciskają na przedramieniu operatora.' },
        lc04: { element: 'Konik / kieł', threat: 'Wypadnięcie detalu przy niedociśniętym kle', effect: 'Urazy od wyrzuconego wałka', scenario: 'Długi wałek nie jest podparty konikiem — przy rozruchu bije i uderza operatora.' },
        lc05: { element: 'Przekładnia / wrzeciennik', threat: 'Hałas > 85 dB(A)', effect: 'Ubytek słuchu', scenario: 'Operator zmienia prędkość obrotową przy uruchomionej przekładni bez wyłączenia.' },
        lc06: { element: 'Instalacja elektryczna', threat: 'Porażenie prądem', effect: 'Oparzenie, śmierć', scenario: 'Detal wysuwu z uchwytu podczas obróbki z dużą prędkością.' },
        lc07: { element: 'Chłodziwo', threat: 'Kontakt skórny / opary', effect: 'Dermatoza, choroby układu oddechowego', scenario: 'Obracający się pręt materiału uderza operatora gdy wystaje poza oś wrzeciona.' },
      },
    },
    en: {
      name: 'Conventional / Centre Lathe',
      threats: {
        lc01: { element: 'Spindle / 3-jaw chuck', threat: 'Entanglement / drawing-in', effect: 'Fracture, amputation' , scenario: 'Operator removes workpiece with spindle rotating; no chuck guard'},
        lc02: { element: 'Tool post', threat: 'Cutting / severing', effect: 'Hand laceration' , scenario: 'Manual tool change with drive running; contact with tool post blade'},
        lc03: { element: 'Ribbon / coiled chips', threat: 'Ejection / entanglement by ribbon chip', effect: 'Eye and hand injuries' , scenario: 'Turning long bar without steady rest; speed > 300 rpm'},
        lc04: { element: 'Tailstock / live centre', threat: 'Workpiece ejection due to loose centre', effect: 'Injuries from ejected shaft' , scenario: 'Machining without safety glasses; chips fly toward operator face'},
        lc05: { element: 'Gearbox / headstock', threat: 'Noise > 85 dB(A)', effect: 'Hearing loss' , scenario: 'Carriage adjustment at low speed; hands near chuck zone'},
        lc06: { element: 'Electrical installation', threat: 'Electric shock', effect: 'Burns, death' , scenario: 'Connecting 400V cables without main power disconnect'},
        lc07: { element: 'Coolant', threat: 'Skin contact / vapours', effect: 'Dermatitis, respiratory disease' , scenario: 'First start after repair; rotation direction not checked'},
        lc08: { element: 'Spindle / gearbox', threat: 'Noise > 85 dB(A)', effect: 'Permanent hearing loss', scenario: 'Continuous work > 4h at 85-95 dB(A) without hearing protection' },
        lc09: { element: 'Coolant / emulsion', threat: 'Skin contact / vapour inhalation', effect: 'Dermatosis, respiratory disease', scenario: 'Daily skin contact with emulsion coolant; no gloves' },
        lc10: { element: 'Operator workstation', threat: 'Forced posture / standing > 6h', effect: 'Musculoskeletal disorders', scenario: 'Standing at machine > 6h without anti-fatigue mat' },
        lc11: { element: '4-jaw chuck / unbalanced workpiece', threat: 'Vibration from unbalanced workpiece', effect: 'Vibration syndrome (Raynaud)', scenario: 'Working with unbalanced workpiece in 4-jaw chuck' },
        lc12: { element: 'Hot chips / coolant', threat: 'Fire from coolant vapour ignition', effect: 'Machine fire, burns', scenario: 'Chip and coolant vapour accumulation; spark from chuck' },
        lc13: { element: 'Machine transport (crane)', threat: 'Fall / toppling of machine', effect: 'Crushing of persons', scenario: 'Transport by crane; weight > 1.5t; persons nearby' },
        lc14: { element: 'Installation / levelling', threat: 'Slip / topple during setup', effect: 'Crushing of limbs', scenario: 'Levelling with wedges; machine unstable before anchoring' },
        lc15: { element: 'Electrical connection (400V)', threat: 'Electric shock during connection', effect: 'Burns, death', scenario: 'Connecting 400V without licensed electrician' },
        lc16: { element: 'First start-up', threat: 'Wrong spindle rotation direction', effect: 'Ejection of workpiece or tool', scenario: 'First start after delivery; checking rotation without workpiece' },
        lc17: { element: 'Speed change mechanism', threat: 'Accidental start during gear change', effect: 'Hand injury', scenario: 'Speed change via gear wheels with drive running' },
        lc18: { element: 'Gearbox / headstock service', threat: 'Contact with rotating shafts', effect: 'Entanglement of limb', scenario: 'Gearbox service with open housing; shafts rotating' },
        lc19: { element: 'Drive belts / gears', threat: 'Entanglement during replacement', effect: 'Hand injury, amputation', scenario: 'Replacing gears/V-belts without LOTO' },
        lc20: { element: 'Cleaning / chip removal', threat: 'Cut from sharp metal chips', effect: 'Lacerated hands', scenario: 'Machine cleaning after shift; manual chip removal without hook' },
        lc21: { element: 'Oil change / maintenance fluids', threat: 'Skin contact with machine oil', effect: 'Dermatosis, poisoning', scenario: 'Gearbox oil change with oil spilled on floor' },
        lc22: { element: 'Spindle bearing adjustment', threat: 'Entanglement during live adjustment', effect: 'Hand injury', scenario: 'Spindle bearing adjustment with machine running' },
        lc23: { element: 'Chuck jaw replacement', threat: 'Crushing of fingers by jaws', effect: 'Crushed fingers', scenario: 'Chuck jaw replacement without spindle lock' },
        lc24: { element: 'Hydraulic coolant system', threat: 'Hydraulic oil injection under pressure', effect: 'Oil injection under skin', scenario: 'Coolant hydraulic service under residual pressure' },
        lc25: { element: 'Dismantling / scrapping', threat: 'Fall of heavy components', effect: 'Crushing, death', scenario: 'Lathe dismantling before scrapping; heavy parts without crane' },
      },
    },
    de: {
      name: 'Konventionelle Drehmaschine / Spitzendrehmaschine',
      threats: {
        lc01: { element: 'Spindel / 3-Backen-Futter', threat: 'Erfassen / Einziehen', effect: 'Bruch, Amputation' , scenario: 'Bediener entnimmt Werkstück bei drehendem Spindel; keine Futterabdeckung'},
        lc02: { element: 'Stahlhalter', threat: 'Schneiden / Abtrennen', effect: 'Handverletzung' , scenario: 'Manueller Werkzeugwechsel bei laufendem Antrieb; Kontakt mit Stahlhalter'},
        lc03: { element: 'Band-/Wirrspäne', threat: 'Auswerfen / Einziehen durch Bandspan', effect: 'Augen- und Handverletzungen' , scenario: 'Drehen langer Stange ohne Lünette; Drehzahl > 300 U/min'},
        lc04: { element: 'Reitstock / Körnerspitze', threat: 'Herausfallen bei losem Körner', effect: 'Verletzungen durch ausgeworfene Welle' , scenario: 'Bearbeitung ohne Schutzbrille; Späne fliegen Richtung Gesicht'},
        lc05: { element: 'Getriebe / Spindelstock', threat: 'Lärm > 85 dB(A)', effect: 'Gehörverlust' , scenario: 'Schlitteneinstellung bei niedriger Drehzahl; Hände nahe Futterzone'},
        lc06: { element: 'Elektrische Anlage', threat: 'Elektrischer Schlag', effect: 'Verbrennungen, Tod' , scenario: 'Anschluss 400V-Kabel ohne Haupttrennschalter'},
        lc07: { element: 'Kühlmittel', threat: 'Hautkontakt / Dämpfe', effect: 'Dermatitis, Atemwegserkrankung' , scenario: 'Erststart nach Reparatur; Drehrichtung nicht geprüft'},
        lc08: { element: 'Spindel / Getriebe', threat: 'Lärm > 85 dB(A)', effect: 'Dauerhafter Hörverlust', scenario: 'Dauerbetrieb > 4h bei 85-95 dB(A) ohne Gehörschutz' },
        lc09: { element: 'Kühlmittel / Emulsion', threat: 'Hautkontakt / Dampfeinatmung', effect: 'Dermatose, Atemwegserkrankung', scenario: 'Täglicher Hautkontakt mit Emulsionskühlmittel; keine Handschuhe' },
        lc10: { element: 'Bedienerarbeitsplatz', threat: 'Erzwungene Haltung / Stehen > 6h', effect: 'Muskel-Skelett-Erkrankungen', scenario: 'Stehen an Maschine > 6h ohne Ermüdungsschutzmatte' },
        lc11: { element: '4-Backen-Futter / Unwucht', threat: 'Vibration unwuchtiges Werkstück', effect: 'Vibrationssyndrom (Raynaud)', scenario: 'Arbeit mit unwuchtigem Werkstück im 4-Backen-Futter' },
        lc12: { element: 'Heiße Späne / Kühlmittel', threat: 'Brand durch Kühlmitteldampf', effect: 'Maschinenbrand, Verbrennungen', scenario: 'Späne- und Kühlmitteldampfansammlung; Funke vom Futter' },
        lc13: { element: 'Maschinentransport (Kran)', threat: 'Sturz / Umkippen der Maschine', effect: 'Quetschung von Personen', scenario: 'Transport mit Kran; Gewicht > 1,5t; Personen in der Nähe' },
        lc14: { element: 'Installation / Ausrichten', threat: 'Rutschen / Umkippen beim Aufstellen', effect: 'Quetschung der Gliedmaßen', scenario: 'Ausrichten mit Keilen; Maschine instabil vor Verankerung' },
        lc15: { element: 'Elektroanschluss (400V)', threat: 'Stromschlag beim Anschluss', effect: 'Verbrennungen, Tod', scenario: 'Anschluss 400V ohne zugelassenen Elektriker' },
        lc16: { element: 'Erstinbetriebnahme', threat: 'Falsche Spindeldrehrichtung', effect: 'Ausschleudern von Werkstück', scenario: 'Erststart nach Lieferung; Drehrichtung ohne Werkstück prüfen' },
        lc17: { element: 'Drehzahlwechsel', threat: 'Unbeabsichtigter Start beim Gangwechsel', effect: 'Handverletzung', scenario: 'Drehzahlwechsel über Zahnräder bei laufendem Antrieb' },
        lc18: { element: 'Getriebe / Spindelstock Service', threat: 'Kontakt mit drehenden Wellen', effect: 'Einzug der Gliedmaßen', scenario: 'Getriebeservice mit offenem Gehäuse; Wellen drehen sich' },
        lc19: { element: 'Antriebsriemen / Zahnräder', threat: 'Einzug beim Wechsel', effect: 'Handverletzung, Amputation', scenario: 'Zahnrad/Keilriemen wechseln ohne LOTO' },
        lc20: { element: 'Reinigung / Spanentnahme', threat: 'Schnitt durch scharfe Metallspäne', effect: 'Schnittwunden an Händen', scenario: 'Maschinenreinigung nach Schicht; manuelle Spanentnahme ohne Haken' },
        lc21: { element: 'Ölwechsel / Betriebsstoffe', threat: 'Hautkontakt mit Maschinenöl', effect: 'Dermatose, Vergiftung', scenario: 'Getriebeölwechsel mit ausgelaufenem Öl auf dem Boden' },
        lc22: { element: 'Spindellagereinstellung', threat: 'Einzug bei laufender Einstellung', effect: 'Handverletzung', scenario: 'Spindellagereinstellung bei laufender Maschine' },
        lc23: { element: 'Backenwechsel', threat: 'Quetschung der Finger durch Backen', effect: 'Gequetschte Finger', scenario: 'Backenwechsel ohne Spindelarretierung' },
        lc24: { element: 'Hydraulisches Kühlmittelsystem', threat: 'Hydrauliköleinspritzung unter Druck', effect: 'Ölinjektion unter die Haut', scenario: 'Kühlmittelhydraulikservice unter Restdruck' },
        lc25: { element: 'Demontage / Verschrottung', threat: 'Sturz schwerer Bauteile', effect: 'Quetschung, Tod', scenario: 'Drehmaschine demontieren; schwere Teile ohne Kran' },
      },
    },
    fr: {
      name: 'Tour conventionnel / à pointes',
      threats: {
        lc01: { element: 'Broche / mandrin 3 mors', threat: 'Entraînement / happement', effect: 'Fracture, amputation' , scenario: 'Opérateur retire la pièce avec broche en rotation; pas de protection mandrin'},
        lc02: { element: 'Porte-outil', threat: 'Coupure / section', effect: 'Lacération de la main' , scenario: 'Changement d’outil manuel avec entraînement en marche; contact avec le porte-outil'},
        lc03: { element: 'Copeaux en ruban / enroulés', threat: 'Projection / entraînement par copeaux ruban', effect: 'Blessures aux yeux et aux mains' , scenario: 'Tournage longue barre sans lunette; vitesse > 300 tr/min'},
        lc04: { element: 'Poupée mobile / pointe', threat: 'Chute de pièce par pointe mal serrée', effect: 'Blessures par projection de barre' , scenario: 'Usinage sans lunettes de protection; copeaux vers le visage'},
        lc05: { element: 'Boîte de vitesses / poupée fixe', threat: 'Bruit > 85 dB(A)', effect: 'Perte auditive' , scenario: 'Réglage chariot à faible vitesse; mains près de la zone mandrin'},
        lc06: { element: 'Installation électrique', threat: 'Électrocution', effect: 'Brûlures, décès' , scenario: 'Raccordement câbles 400V sans coupure principale'},
        lc07: { element: 'Liquide de refroidissement', threat: 'Contact cutané / vapeurs', effect: 'Dermatite, maladie respiratoire' , scenario: 'Premier démarrage après réparation; sens de rotation non vérifié'},
        lc08: { element: 'Broche / boîte vitesses', threat: 'Bruit > 85 dB(A)', effect: 'Surdité permanente', scenario: 'Travail continu > 4h à 85-95 dB(A) sans protection auditive' },
        lc09: { element: 'Liquide de coupe / émulsion', threat: 'Contact cutané / inhalation vapeurs', effect: 'Dermatose, maladie respiratoire', scenario: 'Contact cutané quotidien avec liquide émulsifié; sans gants' },
        lc10: { element: 'Poste opérateur', threat: 'Posture forcée / debout > 6h', effect: 'Troubles musculo-squelettiques', scenario: 'Debout à la machine > 6h sans tapis anti-fatigue' },
        lc11: { element: 'Mandrin 4 mors / balourd', threat: 'Vibrations pièce déséquilibrée', effect: 'Syndrome vibratoire (Raynaud)', scenario: 'Travail avec pièce déséquilibrée en mandrin 4 mors' },
        lc12: { element: 'Copeaux chauds / liquide', threat: "Incendie vapeurs liquide", effect: 'Incendie machine, brûlures', scenario: "Accumulation copeaux et vapeurs; étincelle du mandrin" },
        lc13: { element: 'Transport machine (pont)', threat: 'Chute / renversement machine', effect: 'Écrasement personnes', scenario: 'Transport par grue; masse > 1,5t; personnes à proximité' },
        lc14: { element: 'Installation / mise à niveau', threat: 'Glissade / renversement installation', effect: 'Écrasement membres', scenario: 'Mise à niveau avec cales; machine instable avant ancrage' },
        lc15: { element: 'Raccordement électrique (400V)', threat: 'Électrocution raccordement', effect: 'Brûlures, mort', scenario: 'Raccordement 400V sans électricien habilité' },
        lc16: { element: 'Première mise en service', threat: 'Mauvais sens rotation broche', effect: 'Éjection pièce ou outil', scenario: 'Premier démarrage après livraison; vérification sens rotation sans pièce' },
        lc17: { element: 'Changement de vitesse', threat: 'Démarrage accidentel changement', effect: 'Blessure main', scenario: 'Changement vitesse par engrenages avec entraînement en marche' },
        lc18: { element: 'Boîte vitesses / poupée service', threat: 'Contact arbres tournants', effect: 'Entraînement membre', scenario: 'Service boîte de vitesses avec carter ouvert; arbres en rotation' },
        lc19: { element: 'Courroies / engrenages', threat: 'Entraînement lors remplacement', effect: 'Blessure main, amputation', scenario: 'Remplacement engrenages/courroies sans LOTO' },
        lc20: { element: 'Nettoyage / enlèvement copeaux', threat: 'Coupure copeaux métalliques', effect: 'Plaies mains', scenario: 'Nettoyage machine après poste; enlèvement manuel copeaux sans crochet' },
        lc21: { element: 'Vidange huile / fluides', threat: 'Contact cutané huile machine', effect: 'Dermatose, intoxication', scenario: 'Vidange huile boîte avec huile répandue sur le sol' },
        lc22: { element: 'Réglage roulements broche', threat: 'Entraînement réglage en marche', effect: 'Blessure main', scenario: 'Réglage roulements broche avec machine en marche' },
        lc23: { element: 'Remplacement mors mandrin', threat: 'Écrasement doigts par mors', effect: 'Doigts écrasés', scenario: 'Remplacement mors sans blocage broche' },
        lc24: { element: 'Circuit hydraulique liquide', threat: 'Injection huile hydraulique pression', effect: 'Injection huile sous la peau', scenario: 'Service hydraulique liquide sous pression résiduelle' },
        lc25: { element: 'Démontage / mise au rebut', threat: 'Chute éléments lourds', effect: 'Écrasement, mort', scenario: 'Démontage tour avant ferraillage; parties lourdes sans pont roulant' },
      },
    },
    it: {
      name: 'Tornio convenzionale / a punte',
      threats: {
        lc01: { element: 'Mandrino / autocentrante a 3 griffe', threat: 'Presa / trascinamento', effect: 'Frattura, amputazione' , scenario: 'Operatore rimuove il pezzo con il mandrino in rotazione; nessuna protezione'},
        lc02: { element: 'Portautensile', threat: 'Taglio / recisione', effect: 'Lacerazione della mano' , scenario: 'Cambio utensile manuale con azionamento in moto; contatto portautensile'},
        lc03: { element: 'Trucioli a nastro / attorcigliati', threat: 'Proiezione / trascinamento da truciolo nastro', effect: 'Lesioni agli occhi e alle mani' , scenario: 'Tornitura barra lunga senza lunetta; velocità > 300 giri/min'},
        lc04: { element: 'Contropunta / punta', threat: 'Caduta pezzo per punta non bloccata', effect: 'Lesioni da albero proiettato' , scenario: 'Lavorazione senza occhiali; trucioli verso il viso'},
        lc05: { element: 'Riduttore / testa del mandrino', threat: 'Rumore > 85 dB(A)', effect: 'Perdita uditiva' , scenario: 'Regolazione slitta a bassa velocità; mani vicino alla zona mandrino'},
        lc06: { element: 'Impianto elettrico', threat: 'Elettrocuzione', effect: 'Ustioni, morte' , scenario: 'Collegamento cavi 400V senza sezionatore principale'},
        lc07: { element: 'Refrigerante', threat: 'Contatto cutaneo / vapori', effect: 'Dermatite, malattia respiratoria' , scenario: 'Primo avviamento dopo riparazione; senso rotazione non verificato'},
        lc08: { element: 'Mandrino / cambio', threat: 'Rumore > 85 dB(A)', effect: 'Perdita uditiva permanente', scenario: 'Lavoro continuo > 4h a 85-95 dB(A) senza protezione uditiva' },
        lc09: { element: 'Refrigerante / emulsione', threat: 'Contatto cutaneo / inalazione vapori', effect: 'Dermatosi, malattia respiratoria', scenario: 'Contatto cutaneo giornaliero con emulsione refrigerante; senza guanti' },
        lc10: { element: 'Postazione operatore', threat: 'Postura forzata / stazione eretta > 6h', effect: 'Disturbi muscoloscheletrici', scenario: 'In piedi alla macchina > 6h senza tappeto anti-fatica' },
        lc11: { element: 'Mandrino 4 griffe / squilibrio', threat: 'Vibrazioni pezzo non bilanciato', effect: 'Sindrome vibratoria (Raynaud)', scenario: 'Lavoro con pezzo non bilanciato nel mandrino a 4 griffe' },
        lc12: { element: 'Trucioli caldi / refrigerante', threat: 'Incendio vapori refrigerante', effect: 'Incendio macchina, ustioni', scenario: 'Accumulo trucioli e vapori; scintilla dal mandrino' },
        lc13: { element: 'Trasporto macchina (carroponte)', threat: 'Caduta / ribaltamento macchina', effect: 'Schiacciamento persone', scenario: 'Trasporto con carroponte; peso > 1,5t; persone nelle vicinanze' },
        lc14: { element: 'Installazione / livellamento', threat: 'Scivolamento / ribaltamento', effect: 'Schiacciamento arti', scenario: 'Livellamento con cunei; macchina instabile prima ancoraggio' },
        lc15: { element: 'Collegamento elettrico (400V)', threat: 'Folgorazione durante collegamento', effect: 'Ustioni, morte', scenario: 'Collegamento 400V senza elettricista abilitato' },
        lc16: { element: 'Primo avviamento', threat: 'Senso rotazione mandrino errato', effect: 'Proiezione pezzo o utensile', scenario: 'Primo avviamento dopo consegna; verifica senso rotazione senza pezzo' },
        lc17: { element: 'Cambio velocità', threat: 'Avviamento accidentale cambio marcia', effect: 'Lesione mano', scenario: 'Cambio velocità tramite ingranaggi con azionamento in moto' },
        lc18: { element: 'Cambio / testa mandrino service', threat: 'Contatto alberi rotanti', effect: 'Trascinamento arto', scenario: 'Servizio cambio con carter aperto; alberi in rotazione' },
        lc19: { element: 'Cinghie / ingranaggi', threat: 'Trascinamento durante sostituzione', effect: 'Lesione mano, amputazione', scenario: 'Sostituzione ingranaggi/cinghie senza LOTO' },
        lc20: { element: 'Pulizia / rimozione trucioli', threat: 'Taglio trucioli metallici', effect: 'Ferite lacero-contuse mani', scenario: 'Pulizia macchina dopo turno; rimozione manuale trucioli senza gancio' },
        lc21: { element: 'Cambio olio / fluidi', threat: 'Contatto cutaneo olio macchina', effect: 'Dermatosi, avvelenamento', scenario: 'Cambio olio cambio con olio versato sul pavimento' },
        lc22: { element: 'Regolazione cuscinetti mandrino', threat: 'Trascinamento durante regolazione', effect: 'Lesione mano', scenario: 'Regolazione cuscinetti mandrino con macchina in moto' },
        lc23: { element: 'Sostituzione griffe mandrino', threat: 'Schiacciamento dita dalle griffe', effect: 'Dita schiacciate', scenario: 'Sostituzione griffe senza blocco mandrino' },
        lc24: { element: 'Sistema idraulico refrigerante', threat: 'Iniezione olio idraulico pressione', effect: 'Iniezione olio sotto cute', scenario: 'Servizio idraulico refrigerante sotto pressione residua' },
        lc25: { element: 'Smontaggio / rottamazione', threat: 'Caduta elementi pesanti', effect: 'Schiacciamento, morte', scenario: 'Smontaggio tornio prima rottamazione; parti pesanti senza carroponte' },
      },
    },
    es: {
      name: 'Torno convencional / entre puntos',
      threats: {
        lc01: { element: 'Husillo / plato de 3 garras', threat: 'Atrapamiento / arrastre', effect: 'Fractura, amputación' , scenario: 'Operador retira pieza con husillo girando; sin protección mandril'},
        lc02: { element: 'Portaherramientas', threat: 'Corte / cercenamiento', effect: 'Laceración de mano' , scenario: 'Cambio manual herramienta con accionamiento en marcha; contacto portaherramienta'},
        lc03: { element: 'Viruta en cinta / enrollada', threat: 'Proyección / arrastre por viruta cinta', effect: 'Lesiones en ojos y manos' , scenario: 'Torneado barra larga sin luneta; velocidad > 300 rpm'},
        lc04: { element: 'Contrapunto / punto', threat: 'Caída de pieza por punto no ajustado', effect: 'Lesiones por eje proyectado' , scenario: 'Mecanizado sin gafas de seguridad; virutas hacia la cara'},
        lc05: { element: 'Caja de velocidades / cabezal', threat: 'Ruido > 85 dB(A)', effect: 'Pérdida auditiva' , scenario: 'Ajuste carro a baja velocidad; manos cerca zona mandril'},
        lc06: { element: 'Instalación eléctrica', threat: 'Electrocución', effect: 'Quemaduras, muerte' , scenario: 'Conexión cables 400V sin corte principal'},
        lc07: { element: 'Refrigerante', threat: 'Contacto cutáneo / vapores', effect: 'Dermatitis, enfermedad respiratoria' , scenario: 'Primera puesta en marcha tras reparación; sentido giro no verificado'},
        lc08: { element: 'Husillo / caja cambios', threat: 'Ruido > 85 dB(A)', effect: 'Pérdida auditiva permanente', scenario: 'Trabajo continuo > 4h a 85-95 dB(A) sin protección auditiva' },
        lc09: { element: 'Refrigerante / emulsión', threat: 'Contacto cutáneo / inhalación vapores', effect: 'Dermatosis, enfermedad respiratoria', scenario: 'Contacto cutáneo diario con emulsión refrigerante; sin guantes' },
        lc10: { element: 'Puesto operario', threat: 'Postura forzada / bipedestación > 6h', effect: 'Trastornos musculoesqueléticos', scenario: 'De pie en la máquina > 6h sin alfombrilla anti-fatiga' },
        lc11: { element: 'Mandril 4 garras / desequilibrio', threat: 'Vibraciones pieza desequilibrada', effect: 'Síndrome vibratorio (Raynaud)', scenario: 'Trabajo con pieza desequilibrada en mandril 4 garras' },
        lc12: { element: 'Virutas calientes / refrigerante', threat: 'Incendio vapores refrigerante', effect: 'Incendio máquina, quemaduras', scenario: 'Acumulación virutas y vapores; chispa del mandril' },
        lc13: { element: 'Transporte máquina (grúa)', threat: 'Caída / vuelco máquina', effect: 'Aplastamiento personas', scenario: 'Transporte con grúa; peso > 1,5t; personas cercanas' },
        lc14: { element: 'Instalación / nivelación', threat: 'Deslizamiento / vuelco instalación', effect: 'Aplastamiento miembros', scenario: 'Nivelación con cuñas; máquina inestable antes anclaje' },
        lc15: { element: 'Conexión eléctrica (400V)', threat: 'Electrocución durante conexión', effect: 'Quemaduras, muerte', scenario: 'Conexión 400V sin electricista habilitado' },
        lc16: { element: 'Primera puesta en marcha', threat: 'Sentido giro husillo incorrecto', effect: 'Proyección pieza o herramienta', scenario: 'Primera puesta en marcha tras entrega; verificación giro sin pieza' },
        lc17: { element: 'Cambio de velocidad', threat: 'Arranque accidentel cambio marcha', effect: 'Lesión mano', scenario: 'Cambio velocidad por engranajes con accionamiento en marcha' },
        lc18: { element: 'Caja velocidades / cabezal service', threat: 'Contacto ejes girando', effect: 'Arrastre miembro', scenario: 'Servicio caja velocidades con cárter abierto; ejes girando' },
        lc19: { element: 'Correas / engranajes', threat: 'Arrastre durante sustitución', effect: 'Lesión mano, amputación', scenario: 'Sustitución engranajes/correas sin LOTO' },
        lc20: { element: 'Limpieza / retirada virutas', threat: 'Corte por virutas metálicas', effect: 'Heridas manos', scenario: 'Limpieza máquina tras turno; retirada manual virutas sin gancho' },
        lc21: { element: 'Cambio aceite / fluidos', threat: 'Contacto cutáneo aceite máquina', effect: 'Dermatosis, intoxicación', scenario: 'Cambio aceite caja con aceite derramado en suelo' },
        lc22: { element: 'Regulación rodamientos husillo', threat: 'Arrastre durante regulación', effect: 'Lesión mano', scenario: 'Regulación rodamientos husillo con máquina en marcha' },
        lc23: { element: 'Sustitución mordazas mandril', threat: 'Aplastamiento dedos por mordazas', effect: 'Dedos aplastados', scenario: 'Sustitución mordazas sin bloqueo husillo' },
        lc24: { element: 'Sistema hidráulico refrigerante', threat: 'Inyección aceite hidráulico presión', effect: 'Inyección aceite bajo piel', scenario: 'Servicio hidráulico refrigerante bajo presión residual' },
        lc25: { element: 'Desmontaje / desguace', threat: 'Caída elementos pesados', effect: 'Aplastamiento, muerte', scenario: 'Desmontaje torno antes desguace; partes pesadas sin grúa' },
      },
    },
    cs: {
      name: 'Konvenční soustruh / hrotový soustruh',
      threats: {
        lc01: { element: 'Vřeteno / tříčelisťové sklíčidlo', threat: 'Zachycení / vtažení', effect: 'Zlomenina, amputace' , scenario: 'Obsluha odebírá obrobek při otáčejícím se vřetenu; bez ochrany sklicidla'},
        lc02: { element: 'Nožová hlava', threat: 'Řezání / useknutí', effect: 'Řezná rána ruky' , scenario: 'Ruční výměna nástroje při spuštěném pohonu; kontakt s nožovým držákem'},
        lc03: { element: 'Páskové / vinuté třísky', threat: 'Vymrštění / vtažení páskovou třískou', effect: 'Poranění očí a rukou' , scenario: 'Soustružení dlouhé tyče bez lunetky; otáčky > 300 ot/min'},
        lc04: { element: 'Koník / hrot', threat: 'Vypadnutí obrobku při nedotaženém hrotu', effect: 'Zranění vymrštěným hřídelem' , scenario: 'Obrábění bez ochranných brýlí; třísky směrem k obličeji'},
        lc05: { element: 'Převodovka / vřeteník', threat: 'Hluk > 85 dB(A)', effect: 'Ztráta sluchu' , scenario: 'Nastavení suportu při nízké rychlosti; ruce blízko zóny sklicidla'},
        lc06: { element: 'Elektrická instalace', threat: 'Úraz elektrickým proudem', effect: 'Popáleniny, smrt' , scenario: 'Připojení kabelů 400V bez hlavního odpojení'},
        lc07: { element: 'Chladicí kapalina', threat: 'Kontakt s kůží / výpary', effect: 'Dermatitida, onemocnění dýchacích cest' , scenario: 'První spuštění po opravě; směr otáčení neověřen'},
        lc08: { element: 'Vřeteno / převodovka', threat: 'Hluk > 85 dB(A)', effect: 'Trvalá ztráta sluchu', scenario: 'Nepřetržitá práce > 4h při 85-95 dB(A) bez chrániček sluchu' },
        lc09: { element: 'Chladicí kapalina / emulze', threat: 'Kontakt kůže / vdechování par', effect: 'Dermatóza, onemocnění dýchacích cest', scenario: 'Denní kontakt kůže s emulzní kapalinou; bez rukavic' },
        lc10: { element: 'Pracoviště obsluhy', threat: 'Nucená poloha / stání > 6h', effect: 'Muskuloskeletální poruchy', scenario: 'Stání u stroje > 6h bez protizátěžové podložky' },
        lc11: { element: '4-čelisťové sklicidlo / nevyvážení', threat: 'Vibrace nevyváženého obrobku', effect: 'Vibrační syndrom (Raynaud)', scenario: 'Práce s nevyváženým obrobkem ve 4-čelisťovém sklicidle' },
        lc12: { element: 'Horké třísky / chladivo', threat: 'Požár od vznícení par chladiva', effect: 'Požár stroje, popáleniny', scenario: 'Hromadění třísek a výparů chladiva; jiskření ze sklicidla' },
        lc13: { element: 'Transport stroje (jeřáb)', threat: 'Pád / převrácení stroje', effect: 'Rozdrcení osob', scenario: 'Přeprava jeřábem; hmotnost > 1,5t; osoby v blízkosti' },
        lc14: { element: 'Instalace / vyrovnání', threat: 'Uklouznutí / převrácení při instalaci', effect: 'Rozdrcení končetin', scenario: 'Vyrovnání klíny; stroj nestabilní před ukotvením' },
        lc15: { element: 'Elektrické připojení (400V)', threat: 'Úraz elektrickým proudem', effect: 'Popáleniny, smrt', scenario: 'Připojení 400V bez oprávněného elektrikáře' },
        lc16: { element: 'První spuštění', threat: 'Špatný směr otáčení vřetena', effect: 'Vymrštění obrobku nebo nástroje', scenario: 'První spuštění po dodání; kontrola smeru otáčení bez obrobku' },
        lc17: { element: 'Změna rychlosti', threat: 'Neúmyslné spuštění při řazení', effect: 'Zranění ruky', scenario: 'Změna rychlosti ozubenými koly při spuštěném pohonu' },
        lc18: { element: 'Převodovka / vřeteník service', threat: 'Kontakt s rotujícími hřídeli', effect: 'Vtažení končetiny', scenario: 'Servis převodovky s otevřeným krytem; hřídele se otáčejí' },
        lc19: { element: 'Pohonné řemeny / ozubená kola', threat: 'Vtažení při výměně', effect: 'Zranění ruky, amputace', scenario: 'Výměna ozubených kol/klínových řemenů bez LOTO' },
        lc20: { element: 'Čištění / odstraňování třísek', threat: 'Řez od ostrých kovových třísek', effect: 'Tržné rány rukou', scenario: 'Čištění stroje po směně; ruční odstraňování třísek bez háku' },
        lc21: { element: 'Výměna oleje / provozní kapaliny', threat: 'Kontakt kůže s motorovým olejem', effect: 'Dermatóza, otrava', scenario: 'Výměna oleje převodovky s olejem rozlitým na podlahu' },
        lc22: { element: 'Nastavení ložisek vřetena', threat: 'Vtažení při nastavování za chodu', effect: 'Zranění ruky', scenario: 'Nastavení ložisek vřetena při spuštěném stroji' },
        lc23: { element: 'Výměna čelistí sklicidla', threat: 'Rozdrcení prstů čelistmi', effect: 'Rozdrcené prsty', scenario: 'Výměna čelistí bez zablokování vřetena' },
        lc24: { element: 'Hydraulický okruh chladiva', threat: 'Vstřik hydraulického oleje pod tlakem', effect: 'Vstřik oleje pod kůži', scenario: 'Servis hydrauliky chladiva pod zbytkým tlakem' },
        lc25: { element: 'Demontáž / srotování', threat: 'Pád těžkých součástí', effect: 'Rozdrcení, smrt', scenario: 'Demontáž soustruhu před srotováním; těžké části bez jeřábu' },
      },
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // FREZARKI
  // ─────────────────────────────────────────────────────────────────
  'milling-cnc': {
    pl: {
      name: 'Frezarka CNC / Centrum obróbcze',
      threats: {
        m01: { element: 'Głowica frezarska / wrzeciono', threat: 'Pochwycenie / wciągnięcie', effect: 'Amputacja palców / dłoni', scenario: 'Operator sięga do strefy wrzeciona podczas obrotu frezu — pochwycenie rękawa.' },
        m02: { element: 'Stół roboczy — detal / imadło', threat: 'Wyrzucenie przedmiotu obrabianego', effect: 'Urazy twarzy i rąk', scenario: 'Nieodpowiednio zamocowany detal wylatuje z imadła przy dużej sile skrawania.' },
        m03: { element: 'Wióry metalowe (Al, stal, Ti)', threat: 'Wyrzucenie gorących wiórów', effect: 'Oparzenia, urazy oczu', scenario: 'Gorące wióry aluminium wylatują poza osłonę podczas obróbki z dużym posuwem.' },
        m04: { element: 'Zmiennik narzędzi (ATC)', threat: 'Uderzenie ramieniem ATC', effect: 'Stłuczenia, złamania', scenario: 'Operator zmienia narzędzie bez blokady wrzeciona — frez tnie palce.' },
        m05: { element: 'Napęd osi X / Y / Z (servo)', threat: 'Gniecenie / zgniatanie kończyny', effect: 'Zmiażdżenie kończyny', scenario: 'Chłodziwo rozpryskuje się i tworzy śliskę podłogę przy otwieraniu drzwi.' },
        m06: { element: 'Aerozol chłodziwa / mgiełka', threat: 'Wdychanie aerozolu chłodziwa', effect: 'Choroby układu oddechowego', scenario: 'Mgiełka olejowa przekracza NDS przy obróbce aluminium bez odsysania.' },
        m07: { element: 'Instalacja elektryczna', threat: 'Porażenie prądem', effect: 'Oparzenie, śmierć', scenario: 'Błąd offsetu narzędzia w programie powoduje kolizję frezu ze stołem.' },
        m08: { element: 'Silnik wrzeciona / obroty', threat: 'Hałas > 85 dB(A)', effect: 'Ubytek słuchu', scenario: 'Operator stoi przy maszynie podczas cyklu automatycznego bez zamkniętych drzwi.' },
        m09: { element: 'Wibracje narzędzia / wrzeciona', threat: 'Wibracje przenoszone na ręce', effect: 'Zespół wibracyjny', scenario: 'Wymiana narzędzia bez wyłączenia i zablokowania wrzeciona CNC.' },
        m10: { element: 'Program NC / błąd operatora', threat: 'Niezamierzone uruchomienie / błąd NC', effect: 'Niekontrolowany ruch osi', scenario: 'Ciężka głowica frezarska spada przy demontażu bez podparcia.' },
      },
    },
    en: {
      name: 'CNC Milling Machine / Machining Centre',
      threats: {
        m01: { element: 'Milling head / spindle', threat: 'Entanglement / drawing-in', effect: 'Finger / hand amputation', scenario: 'Operator reaches into the spindle zone during cutter rotation — sleeve gets caught.' },
        m02: { element: 'Worktable — workpiece / vice', threat: 'Ejection of workpiece', effect: 'Face and hand injuries', scenario: 'Improperly clamped workpiece ejects from the vice under high cutting forces.' },
        m03: { element: 'Metal chips (Al, steel, Ti)', threat: 'Ejection of hot chips', effect: 'Burns, eye injuries', scenario: 'Hot aluminium chips fly beyond the guard during high-feed machining.' },
        m04: { element: 'Automatic tool changer (ATC)', threat: 'Strike by ATC arm', effect: 'Bruising, fractures', scenario: 'Operator changes tool without spindle lock — cutter cuts fingers.' },
        m05: { element: 'X / Y / Z axis drive (servo)', threat: 'Crushing / squeezing of limb', effect: 'Limb crushing', scenario: 'Coolant splashes creating a slippery floor when opening the machine doors.' },
        m06: { element: 'Coolant aerosol / mist', threat: 'Inhalation of coolant aerosol', effect: 'Respiratory disease', scenario: 'Oil mist exceeds OEL during aluminium machining without extraction.' },
        m07: { element: 'Electrical installation', threat: 'Electric shock', effect: 'Burns, death', scenario: 'Tool offset error in NC program causes cutter to collide with the table.' },
        m08: { element: 'Spindle motor / speed', threat: 'Noise > 85 dB(A)', effect: 'Hearing loss', scenario: 'Operator stands near the machine during automatic cycle without closed doors.' },
        m09: { element: 'Tool / spindle vibration', threat: 'Vibration transmitted to hands', effect: 'Vibration syndrome', scenario: 'Tool change without switching off and locking the CNC spindle.' },
        m10: { element: 'NC program / operator error', threat: 'Unintended start / NC error', effect: 'Uncontrolled axis movement', scenario: 'Heavy milling head falls during disassembly without support.' },
      },
    },
    de: {
      name: 'CNC-Fräsmaschine / Bearbeitungszentrum',
      threats: {
        m01: { element: 'Fräskopf / Spindel', threat: 'Erfassen / Einziehen', effect: 'Finger- / Handamputation', scenario: 'Bediener greift in die Spindelzone während der Fräserdrehung — Ärmel wird erfasst.' },
        m02: { element: 'Arbeitstisch — Werkstück / Schraubstock', threat: 'Auswerfen des Werkstücks', effect: 'Gesichts- und Handverletzungen', scenario: 'Unzureichend eingespanntes Werkstück schleudert beim Fräsen aus dem Schraubstock.' },
        m03: { element: 'Metallspäne (Al, Stahl, Ti)', threat: 'Auswerfen heißer Späne', effect: 'Verbrennungen, Augenverletzungen', scenario: 'Heiße Aluminiumspäne fliegen beim Hochvorschubfräsen über die Schutzabdeckung.' },
        m04: { element: 'Werkzeugwechsler (ATC)', threat: 'Schlag durch ATC-Arm', effect: 'Prellungen, Frakturen', scenario: 'Werkzeugwechsel ohne Spindelarretierung — Fräser verletzt Finger.' },
        m05: { element: 'X/Y/Z-Achsantrieb (Servo)', threat: 'Quetschen / Zerdrücken der Gliedmaße', effect: 'Gliedmaßenquetschung', scenario: 'Kühlmittel spritzt auf den Boden und macht ihn rutschig beim Öffnen der Tür.' },
        m06: { element: 'Kühlmittelaerosol / Nebel', threat: 'Einatmen von Kühlmittelaerosol', effect: 'Atemwegserkrankung', scenario: 'Ölnebel übersteigt MAK-Wert bei der Aluminiumbearbeitung ohne Absaugung.' },
        m07: { element: 'Elektrische Anlage', threat: 'Elektrischer Schlag', effect: 'Verbrennungen, Tod', scenario: 'Werkzeugkorrekturfehler im NC-Programm führt zur Kollision des Fräsers mit dem Tisch.' },
        m08: { element: 'Spindelmotor / Drehzahl', threat: 'Lärm > 85 dB(A)', effect: 'Gehörverlust', scenario: 'Bediener steht beim automatischen Zyklus ohne geschlossene Türen an der Maschine.' },
        m09: { element: 'Werkzeug-/Spindelvibration', threat: 'Vibrationen auf Hände', effect: 'Vibrationssyndrom', scenario: 'Werkzeugwechsel ohne Abschalten und Arretieren der CNC-Spindel.' },
        m10: { element: 'NC-Programm / Bedienfehler', threat: 'Unbeabsichtigter Start / NC-Fehler', effect: 'Unkontrollierte Achsbewegung', scenario: 'Schwerer Fräskopf fällt beim Demontage ohne Abstützung herunter.' },
      },
    },
    fr: {
      name: 'Fraiseuse CNC / Centre d\'usinage',
      threats: {
        m01: { element: 'Tête de fraisage / broche', threat: 'Entraînement / happement', effect: 'Amputation doigts / main', scenario: 'L\'opérateur atteint la zone de broche pendant la rotation de la fraise — la manche est happée.' },
        m02: { element: 'Table de travail — pièce / étau', threat: 'Projection de la pièce', effect: 'Blessures visage et mains', scenario: 'La pièce mal serrée est éjectée de l\'étau sous de grandes forces de coupe.' },
        m03: { element: 'Copeaux métalliques (Al, acier, Ti)', threat: 'Projection de copeaux chauds', effect: 'Brûlures, blessures aux yeux', scenario: 'Les copeaux d\'aluminium chauds volent au-delà du garde pendant l\'usinage à grande avance.' },
        m04: { element: 'Changeur d\'outil automatique (ATC)', threat: 'Coup par le bras de l\'ATC', effect: 'Contusions, fractures', scenario: 'L\'opérateur change l\'outil sans bloquer la broche — la fraise coupe les doigts.' },
        m05: { element: 'Axes X/Y/Z (servo)', threat: 'Écrasement de membre', effect: 'Écrasement de membre', scenario: 'Le liquide de refroidissement éclabousse le sol le rendant glissant à l\'ouverture des portes.' },
        m06: { element: 'Aérosol de réfrigérant / brouillard', threat: 'Inhalation d\'aérosol réfrigérant', effect: 'Maladie respiratoire', scenario: 'Le brouillard d\'huile dépasse la VME lors de l\'usinage d\'aluminium sans extraction.' },
        m07: { element: 'Installation électrique', threat: 'Électrocution', effect: 'Brûlures, décès', scenario: 'Une erreur de décalage d\'outil dans le programme NC provoque une collision de la fraise avec la table.' },
        m08: { element: 'Moteur broche / vitesse', threat: 'Bruit > 85 dB(A)', effect: 'Perte auditive', scenario: 'L\'opérateur se tient près de la machine pendant le cycle automatique sans portes fermées.' },
        m09: { element: 'Vibration outil / broche', threat: 'Vibrations transmises aux mains', effect: 'Syndrome vibratoire', scenario: 'Changement d\'outil sans arrêt et verrouillage de la broche CNC.' },
        m10: { element: 'Programme CN / erreur opérateur', threat: 'Démarrage involontaire / erreur CN', effect: 'Mouvement incontrôlé des axes', scenario: 'La tête de fraisage lourde tombe lors du démontage sans support.' },
      },
    },
    it: {
      name: 'Fresatrice CNC / Centro di lavoro',
      threats: {
        m01: { element: 'Testa fresatrice / mandrino', threat: 'Presa / trascinamento', effect: 'Amputazione dita / mano', scenario: 'L\'operatore raggiunge la zona mandrino durante la rotazione della fresa — la manica viene afferrata.' },
        m02: { element: 'Piano di lavoro — pezzo / morsa', threat: 'Proiezione del pezzo', effect: 'Lesioni viso e mani', scenario: 'Il pezzo non adeguatamente bloccato viene espulso dalla morsa sotto elevate forze di taglio.' },
        m03: { element: 'Trucioli metallici (Al, acciaio, Ti)', threat: 'Proiezione di trucioli caldi', effect: 'Ustioni, lesioni agli occhi', scenario: 'I trucioli caldi di alluminio volano oltre la protezione durante la lavorazione ad alta avanzata.' },
        m04: { element: 'Cambio utensile automatico (ATC)', threat: 'Colpo dal braccio ATC', effect: 'Contusioni, fratture', scenario: 'L\'operatore cambia utensile senza bloccare il mandrino — la fresa taglia le dita.' },
        m05: { element: 'Assi X/Y/Z (servo)', threat: 'Schiacciamento di arto', effect: 'Schiacciamento di arto', scenario: 'Il liquido refrigerante schizza sul pavimento rendendolo scivoloso all\'apertura delle porte.' },
        m06: { element: 'Aerosol refrigerante / nebbia', threat: 'Inalazione di aerosol refrigerante', effect: 'Malattia respiratoria', scenario: 'La nebbia d\'olio supera il TLV durante la lavorazione dell\'alluminio senza aspirazione.' },
        m07: { element: 'Impianto elettrico', threat: 'Elettrocuzione', effect: 'Ustioni, morte', scenario: 'Un errore di offset utensile nel programma NC causa la collisione della fresa con il tavolo.' },
        m08: { element: 'Motore mandrino / velocità', threat: 'Rumore > 85 dB(A)', effect: 'Perdita uditiva', scenario: 'L\'operatore si trova vicino alla macchina durante il ciclo automatico senza porte chiuse.' },
        m09: { element: 'Vibrazione utensile / mandrino', threat: 'Vibrazioni trasmesse alle mani', effect: 'Sindrome vibratoria', scenario: 'Cambio utensile senza spegnimento e blocco del mandrino CNC.' },
        m10: { element: 'Programma NC / errore operatore', threat: 'Avvio involontario / errore NC', effect: 'Movimento incontrollato degli assi', scenario: 'La pesante testa fresatrice cade durante lo smontaggio senza supporto.' },
      },
    },
    es: {
      name: 'Fresadora CNC / Centro de mecanizado',
      threats: {
        m01: { element: 'Cabezal fresador / husillo', threat: 'Atrapamiento / arrastre', effect: 'Amputación dedos / mano', scenario: 'El operario alcanza la zona del husillo durante la rotación de la fresa — la manga queda atrapada.' },
        m02: { element: 'Mesa de trabajo — pieza / tornillo', threat: 'Proyección de pieza', effect: 'Lesiones en cara y manos', scenario: 'La pieza mal sujeta es expulsada del tornillo de banco bajo grandes fuerzas de corte.' },
        m03: { element: 'Virutas metálicas (Al, acero, Ti)', threat: 'Proyección de virutas calientes', effect: 'Quemaduras, lesiones oculares', scenario: 'Las virutas calientes de aluminio vuelan más allá de la protección durante el mecanizado de alta avance.' },
        m04: { element: 'Cambiador automático de herramientas (ATC)', threat: 'Golpe por brazo ATC', effect: 'Contusiones, fracturas', scenario: 'El operario cambia herramienta sin bloquear el husillo — la fresa corta los dedos.' },
        m05: { element: 'Ejes X/Y/Z (servo)', threat: 'Aplastamiento de miembro', effect: 'Aplastamiento de miembro', scenario: 'El refrigerante salpica al suelo haciéndolo resbaladizo al abrir las puertas.' },
        m06: { element: 'Aerosol refrigerante / niebla', threat: 'Inhalación de aerosol refrigerante', effect: 'Enfermedad respiratoria', scenario: 'La niebla de aceite supera el VLA durante el mecanizado de aluminio sin extracción.' },
        m07: { element: 'Instalación eléctrica', threat: 'Electrocución', effect: 'Quemaduras, muerte', scenario: 'Un error de offset de herramienta en el programa NC causa colisión de la fresa con la mesa.' },
        m08: { element: 'Motor del husillo / velocidad', threat: 'Ruido > 85 dB(A)', effect: 'Pérdida auditiva', scenario: 'El operario permanece junto a la máquina durante el ciclo automático sin puertas cerradas.' },
        m09: { element: 'Vibración herramienta / husillo', threat: 'Vibraciones transmitidas a manos', effect: 'Síndrome vibratorio', scenario: 'Cambio de herramienta sin apagar y bloquear el husillo CNC.' },
        m10: { element: 'Programa CN / error del operador', threat: 'Arranque involuntario / error CN', effect: 'Movimiento incontrolado de ejes', scenario: 'La pesada cabeza fresadora cae durante el desmontaje sin soporte.' },
      },
    },
    cs: {
      name: 'CNC frézka / obráběcí centrum',
      threats: {
        m01: { element: 'Frézovací hlava / vřeteno', threat: 'Zachycení / vtažení', effect: 'Amputace prstů / ruky', scenario: 'Obsluha sahá do zóny vřetena při otáčení frézy — rukáv je zachycen.' },
        m02: { element: 'Pracovní stůl — obrobek / svěrák', threat: 'Vymrštění obrobku', effect: 'Poranění obličeje a rukou', scenario: 'Nedostatečně upnutý obrobek vyletí ze svěráku při velkých řezných silách.' },
        m03: { element: 'Kovové třísky (Al, ocel, Ti)', threat: 'Vymrštění horkých třísek', effect: 'Popáleniny, poranění očí', scenario: 'Horké hliníkové třísky lítají za ochranný kryt při frézování s velkým posuvem.' },
        m04: { element: 'Automatická výměna nástrojů (ATC)', threat: 'Úder ramenem ATC', effect: 'Pohmoždění, zlomeniny', scenario: 'Výměna nástroje bez zablokování vřetena — fréza řeže prsty.' },
        m05: { element: 'Pohon os X/Y/Z (servo)', threat: 'Drcení / zmáčknutí končetiny', effect: 'Rozdrcení končetiny', scenario: 'Chladicí kapalina stříká na podlahu a klouzá při otevírání dveří.' },
        m06: { element: 'Aerosol chladiva / mlha', threat: 'Vdechování aerosolu chladiva', effect: 'Onemocnění dýchacích cest', scenario: 'Olejová mlha překračuje NPK při obrábění hliníku bez odsávání.' },
        m07: { element: 'Elektrická instalace', threat: 'Úraz elektrickým proudem', effect: 'Popáleniny, smrt', scenario: 'Chyba korekce nástroje v NC programu způsobuje kolizi frézy se stolem.' },
        m08: { element: 'Motor vřetena / otáčky', threat: 'Hluk > 85 dB(A)', effect: 'Ztráta sluchu', scenario: 'Obsluha stojí u stroje při automatickém cyklu bez zavřených dveří.' },
        m09: { element: 'Vibrace nástroje / vřetena', threat: 'Vibrace přenášené na ruce', effect: 'Vibrační syndrom', scenario: 'Výměna nástroje bez vypnutí a zablokování CNC vřetena.' },
        m10: { element: 'NC program / chyba operátora', threat: 'Neúmyslné spuštění / chyba NC', effect: 'Nekontrolovaný pohyb os', scenario: 'Těžká frézovací hlava padá při demontáži bez podepření.' },
      },
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // SZLIFIERKI
  // ─────────────────────────────────────────────────────────────────
  'grinding-surface': {
    pl: {
      name: 'Szlifierka do płaszczyzn',
      threats: {
        g01: { element: 'Ściernica', threat: 'Rozpad ściernicy (burst) — odłamki', effect: 'Urazy od odłamków — śmierć', scenario: 'Ściernica z pęknięciem zmęczeniowym rozpada się przy rozruchu lub po uderzeniu w detal.' },
        g02: { element: 'Stół magnetyczny', threat: 'Wyrzucenie detalu przy braku magnetyzacji', effect: 'Ciężkie urazy od wyrzuconego przedmiotu', scenario: 'Stół magnetyczny traci magnetyzację przy zaniku zasilania — detal wylatuje.' },
        g03: { element: 'Strefa szlifowania — pył', threat: 'Wdychanie pyłu ściernego i metalowego', effect: 'Pylica, choroby płuc, nowotwory', scenario: 'Szlifowanie bez odsysania pyłu w pomieszczeniu bez wentylacji przez wiele godzin.' },
        g04: { element: 'Ściernica / obroty', threat: 'Hałas > 85 dB(A)', effect: 'Trwały ubytek słuchu', scenario: 'Operator stoi zbyt blisko bez ekranu przy szlifowaniu bez osłony szlifierki.' },
        g05: { element: 'Iskry ze szlifowania', threat: 'Pożar od iskry trafiającej w pył', effect: 'Pożar przy obróbce materiałów łatwopalnych', scenario: 'Chłodziwo zalewa podłogę przy uszkodzonej uszczelce zbiornika — poślizg.' },
        g06: { element: 'Wrzeciono szlifierki przy wymianie', threat: 'Pochwycenie przy wymianie ściernicy', effect: 'Uraz rąk', scenario: 'Pył metalowy kumuluje się na panelu elektrycznym i powoduje zwarcie.' },
        g07: { element: 'Instalacja elektryczna', threat: 'Porażenie prądem', effect: 'Oparzenie, śmierć', scenario: 'Detal nagrzewa się do temperatury powodującej oparzenia przy dotknięciu po szlifowaniu.' },
        g08: { element: 'Chłodziwo do szlifowania', threat: 'Kontakt skórny / opary chłodziwa', effect: 'Dermatoza, drogi oddechowe', scenario: 'Ciężki stół magnetyczny spada przy demontażu podczas konserwacji.' },
      },
    },
    en: {
      name: 'Surface Grinding Machine',
      threats: {
        g01: { element: 'Grinding wheel', threat: 'Wheel burst — flying fragments', effect: 'Injuries from fragments — death', scenario: 'Grinding wheel with fatigue crack bursts during start-up or after impact with workpiece.' },
        g02: { element: 'Magnetic table', threat: 'Workpiece ejection on loss of magnetism', effect: 'Severe injuries from ejected workpiece', scenario: 'Magnetic table loses magnetisation during power failure — workpiece is ejected.' },
        g03: { element: 'Grinding zone — dust', threat: 'Inhalation of abrasive and metal dust', effect: 'Pneumoconiosis, lung disease, cancer', scenario: 'Grinding without dust extraction in unventilated room for several hours.' },
        g04: { element: 'Grinding wheel / speed', threat: 'Noise > 85 dB(A)', effect: 'Permanent hearing loss', scenario: 'Operator stands too close without screen when grinding without wheel guard.' },
        g05: { element: 'Grinding sparks', threat: 'Fire from sparks igniting dust', effect: 'Fire when machining flammable materials', scenario: 'Coolant floods floor when tank seal fails — slip hazard.' },
        g06: { element: 'Spindle during wheel change', threat: 'Entanglement when changing wheel', effect: 'Hand injury', scenario: 'Metal dust accumulates on electrical panel causing short circuit.' },
        g07: { element: 'Electrical installation', threat: 'Electric shock', effect: 'Burns, death', scenario: 'Workpiece heats to burn temperature — contact immediately after grinding.' },
        g08: { element: 'Grinding coolant', threat: 'Skin contact / coolant vapours', effect: 'Dermatitis, respiratory disease', scenario: 'Heavy magnetic table falls during disassembly for maintenance.' },
      },
    },
    de: {
      name: 'Flachschleifmaschine',
      threats: {
        g01: { element: 'Schleifscheibe', threat: 'Scheibenbruch — Splitter', effect: 'Verletzungen durch Splitter — Tod', scenario: 'Schleifscheibe mit Ermüdungsriss bricht beim Anlauf oder nach Werkstückkontakt.' },
        g02: { element: 'Magnettisch', threat: 'Auswerfen des Werkstücks bei Magnetverlust', effect: 'Schwere Verletzungen durch ausgeworfenes Werkstück', scenario: 'Magnettisch verliert Magnetisierung bei Stromausfall — Werkstück wird geschleudert.' },
        g03: { element: 'Schleifzone — Staub', threat: 'Einatmen von Schleif- und Metallstaub', effect: 'Staublunge, Lungenerkrankung, Krebs', scenario: 'Schleifen ohne Staubabsaugung in unbelüftetem Raum über mehrere Stunden.' },
        g04: { element: 'Schleifscheibe / Drehzahl', threat: 'Lärm > 85 dB(A)', effect: 'Dauerhafter Gehörverlust', scenario: 'Bediener steht zu nah ohne Schutzscheibe beim Schleifen ohne Schleifscheibenabdeckung.' },
        g05: { element: 'Schleiffunken', threat: 'Brand durch Funken im Staub', effect: 'Brand bei brennbaren Materialien', scenario: 'Kühlmittel überschwemmt Boden bei undichter Tankdichtung — Rutschgefahr.' },
        g06: { element: 'Spindel beim Scheibenwechsel', threat: 'Erfassen beim Scheibenwechsel', effect: 'Handverletzung', scenario: 'Metallstaub sammelt sich auf dem Schaltschrank und verursacht Kurzschluss.' },
        g07: { element: 'Elektrische Anlage', threat: 'Elektrischer Schlag', effect: 'Verbrennungen, Tod', scenario: 'Werkstück erhitzt sich auf Verbrennungstemperatur — Berührung direkt nach dem Schleifen.' },
        g08: { element: 'Schleifkühlmittel', threat: 'Hautkontakt / Kühlmitteldämpfe', effect: 'Dermatitis, Atemwegserkrankung', scenario: 'Schwerer Magnettisch fällt bei Demontage während der Wartung herunter.' },
      },
    },
    fr: {
      name: 'Rectifieuse plane',
      threats: {
        g01: { element: 'Meule', threat: 'Éclatement de meule — éclats', effect: 'Blessures par éclats — décès', scenario: 'La meule avec une fissure de fatigue éclate au démarrage ou après impact avec la pièce.' },
        g02: { element: 'Table magnétique', threat: 'Projection de pièce lors d\'une démagnetisation', effect: 'Blessures graves par projection', scenario: 'La table magnétique perd sa magnétisation lors d\'une coupure d\'alimentation — la pièce est éjectée.' },
        g03: { element: 'Zone de rectification — poussière', threat: 'Inhalation de poussières abrasives et métalliques', effect: 'Silicose, maladie pulmonaire, cancer', scenario: 'Meulage sans extraction de poussière dans un local non ventilé pendant plusieurs heures.' },
        g04: { element: 'Meule / vitesse', threat: 'Bruit > 85 dB(A)', effect: 'Perte auditive permanente', scenario: 'L\'opérateur se tient trop près sans écran lors du meulage sans protège-meule.' },
        g05: { element: 'Étincelles de rectification', threat: 'Incendie par étincelles dans les poussières', effect: 'Incendie avec matériaux inflammables', scenario: 'Le liquide de refroidissement inonde le sol lors de la défaillance du joint du réservoir — risque de glissade.' },
        g06: { element: 'Broche lors du changement de meule', threat: 'Entraînement lors du changement de meule', effect: 'Blessure à la main', scenario: 'La poussière métallique s\'accumule sur le tableau électrique et provoque un court-circuit.' },
        g07: { element: 'Installation électrique', threat: 'Électrocution', effect: 'Brûlures, décès', scenario: 'La pièce chauffe à une température de brûlure — contact immédiatement après le meulage.' },
        g08: { element: 'Liquide de rectification', threat: 'Contact cutané / vapeurs réfrigérantes', effect: 'Dermatite, maladie respiratoire', scenario: 'La lourde table magnétique tombe lors du démontage pour maintenance.' },
      },
    },
    it: {
      name: 'Rettificatrice piana',
      threats: {
        g01: { element: 'Mola abrasiva', threat: 'Scoppio della mola — frammenti', effect: 'Lesioni da frammenti — morte', scenario: 'La mola con cricca da fatica si rompe durante lavviamento o dopo impatto con il pezzo.' },
        g02: { element: 'Piano magnetico', threat: 'Proiezione del pezzo per perdita di magnetismo', effect: 'Lesioni gravi da pezzo proiettato', scenario: 'La tavola magnetica perde la magnetizzazione durante mancanza di corrente — il pezzo viene espulso.' },
        g03: { element: 'Zona di rettifica — polvere', threat: 'Inalazione di polveri abrasive e metalliche', effect: 'Pneumoconiosi, malattia polmonare, cancro', scenario: 'Rettifica senza estrazione di polveri in locale non ventilato per diverse ore.' },
        g04: { element: 'Mola / velocità', threat: 'Rumore > 85 dB(A)', effect: 'Perdita uditiva permanente', scenario: 'L\'operatore si trova troppo vicino senza schermo durante la rettifica senza protezione.' },
        g05: { element: 'Scintille di rettifica', threat: 'Incendio per scintille nella polvere', effect: 'Incendio con materiali infiammabili', scenario: 'Il refrigerante allaga il pavimento quando la guarnizione del serbatoio cede — rischio scivolamento.' },
        g06: { element: 'Mandrino durante cambio mola', threat: 'Presa durante cambio mola', effect: 'Lesione alla mano', scenario: 'La polvere metallica si accumula sul quadro elettrico causando cortocircuito.' },
        g07: { element: 'Impianto elettrico', threat: 'Elettrocuzione', effect: 'Ustioni, morte', scenario: 'Il pezzo si scalda a temperatura di ustione — contatto immediatamente dopo la rettifica.' },
        g08: { element: 'Refrigerante per rettifica', threat: 'Contatto cutaneo / vapori refrigerante', effect: 'Dermatite, malattia respiratoria', scenario: 'La pesante tavola magnetica cade durante lo smontaggio per manutenzione.' },
      },
    },
    es: {
      name: 'Rectificadora plana',
      threats: {
        g01: { element: 'Muela abrasiva', threat: 'Rotura de muela — fragmentos', effect: 'Lesiones por fragmentos — muerte', scenario: 'La muela con grieta de fatiga estalla durante el arranque o tras impacto con la pieza.' },
        g02: { element: 'Mesa magnética', threat: 'Proyección de pieza por pérdida de magnetismo', effect: 'Lesiones graves por pieza proyectada', scenario: 'La mesa magnética pierde la magnetización durante un corte de corriente — la pieza es expulsada.' },
        g03: { element: 'Zona de rectificado — polvo', threat: 'Inhalación de polvo abrasivo y metálico', effect: 'Neumoconiosis, enfermedad pulmonar, cáncer', scenario: 'Rectificado sin extracción de polvo en local no ventilado durante varias horas.' },
        g04: { element: 'Muela / velocidad', threat: 'Ruido > 85 dB(A)', effect: 'Pérdida auditiva permanente', scenario: 'El operario está demasiado cerca sin pantalla al rectificar sin protector de muela.' },
        g05: { element: 'Chispas de rectificado', threat: 'Incendio por chispas en el polvo', effect: 'Incendio con materiales inflamables', scenario: 'El refrigerante inunda el suelo al fallar la junta del depósito — riesgo de resbalamiento.' },
        g06: { element: 'Husillo durante cambio de muela', threat: 'Atrapamiento durante cambio de muela', effect: 'Lesión de mano', scenario: 'El polvo metálico se acumula en el cuadro eléctrico causando cortocircuito.' },
        g07: { element: 'Instalación eléctrica', threat: 'Electrocución', effect: 'Quemaduras, muerte', scenario: 'La pieza se calienta a temperatura de quemadura — contacto inmediatamente tras la rectificación.' },
        g08: { element: 'Refrigerante de rectificado', threat: 'Contacto cutáneo / vapores refrigerante', effect: 'Dermatitis, enfermedad respiratoria', scenario: 'La pesada mesa magnética cae durante el desmontaje para mantenimiento.' },
      },
    },
    cs: {
      name: 'Rovinná bruska',
      threats: {
        g01: { element: 'Brusný kotouč', threat: 'Rozlomení kotouče — fragmenty', effect: 'Zranění fragmenty — smrt', scenario: 'Brusný kotouč s únavovou trhlinou se rozpadne při rozběhu nebo po nárazu do obrobku.' },
        g02: { element: 'Magnetický stůl', threat: 'Vymrštění obrobku při ztrátě magnetismu', effect: 'Těžká zranění vymrštěným obrobkem', scenario: 'Magnetický stůl ztrácí magnetizaci při výpadku napájení — obrobek vyletí.' },
        g03: { element: 'Bruslná zóna — prach', threat: 'Vdechování abrazivního a kovového prachu', effect: 'Pneumokonióza, plicní nemoc, rakovina', scenario: 'Broušení bez odsávání prachu v nevětraném prostoru po dobu několika hodin.' },
        g04: { element: 'Brusný kotouč / otáčky', threat: 'Hluk > 85 dB(A)', effect: 'Trvalá ztráta sluchu', scenario: 'Obsluha stojí příliš blízko bez ochranného štítu při broušení bez krytu kotouče.' },
        g05: { element: 'Jiskry z broušení', threat: 'Požár od jisker v prachu', effect: 'Požár při hořlavých materiálech', scenario: 'Chladicí kapalina zaplavuje podlahu při poruše těsnění nádrže — nebezpečí uklouznutí.' },
        g06: { element: 'Vřeteno při výměně kotouče', threat: 'Zachycení při výměně kotouče', effect: 'Poranění ruky', scenario: 'Kovový prach se hromadí na elektrickém rozvaděči a způsobuje zkrat.' },
        g07: { element: 'Elektrická instalace', threat: 'Úraz elektrickým proudem', effect: 'Popáleniny, smrt', scenario: 'Obrobek se zahřeje na teplotu způsobující popáleniny — kontakt ihned po broušení.' },
        g08: { element: 'Chladicí kapalina pro broušení', threat: 'Kontakt s kůží / výpary chladiva', effect: 'Dermatitida, onemocnění dýchacích cest', scenario: 'Těžký magnetický stůl padá při demontáži během údržby.' },
      },
    },
  },

  'grinding-cylindrical': {
    pl: {
      name: 'Szlifierka do wałków (kłowa / bezkłowa)',
      threats: {
        gc01: { element: 'Ściernica napędowa i robocza', threat: 'Rozpad ściernicy', effect: 'Urazy od odłamków', scenario: 'Ściernica z pęknięciem rozpada się przy rozruchu lub przy kontakcie z twardym detalem.' },
        gc02: { element: 'Detal między kłami / prowadnicami', threat: 'Wypadnięcie / wyrzucenie detalu', effect: 'Uderzenie wyrzuconym wałkiem', scenario: 'Wałek wyrwany z prowadnic uderza operatora stojącego za maszyną.' },
        gc03: { element: 'Strefa szlifowania', threat: 'Pył metalowy / pył ściernicy', effect: 'Pylica', scenario: 'Szlifowanie stali bez odsysania pyłu w zamkniętym pomieszczeniu przez wiele godzin.' },
        gc04: { element: 'Obroty ściernicy', threat: 'Hałas > 85 dB(A)', effect: 'Ubytek słuchu', scenario: 'Nieodpowiednie mocowanie detalu między kłami — detal wylatuje przy dużej prędkości.' },
        gc05: { element: 'Instalacja elektryczna', threat: 'Porażenie prądem', effect: 'Oparzenie, śmierć', scenario: 'Chłodziwo na podłodze wokół maszyny — poślizg przy dojściu do stołu sterowania.' },
      },
    },
    en: {
      name: 'Cylindrical Grinding Machine (centre / centreless)',
      threats: {
        gc01: { element: 'Drive and grinding wheels', threat: 'Wheel burst', effect: 'Injuries from fragments', scenario: 'Grinding wheel with crack bursts during start-up or contact with hard workpiece.' },
        gc02: { element: 'Workpiece between centres / guides', threat: 'Workpiece falling / ejection', effect: 'Impact from ejected shaft', scenario: 'Shaft ejected from guides strikes operator standing behind machine.' },
        gc03: { element: 'Grinding zone', threat: 'Metal dust / wheel dust', effect: 'Pneumoconiosis', scenario: 'Grinding steel without dust extraction in closed room for several hours.' },
        gc04: { element: 'Wheel speed', threat: 'Noise > 85 dB(A)', effect: 'Hearing loss', scenario: 'Improper workpiece clamping between centres — workpiece ejects at high speed.' },
        gc05: { element: 'Electrical installation', threat: 'Electric shock', effect: 'Burns, death', scenario: 'Coolant on floor around machine — slip when approaching control panel.' },
      },
    },
    de: {
      name: 'Rundschleifmaschine (Spitzen- / Spitzenlosschleifmaschine)',
      threats: {
        gc01: { element: 'Regel- und Schleifscheibe', threat: 'Scheibenbruch', effect: 'Verletzungen durch Splitter', scenario: 'Schleifscheibe mit Riss bricht beim Anlauf oder Kontakt mit hartem Werkstück.' },
        gc02: { element: 'Werkstück zwischen Spitzen/Führungen', threat: 'Herausfallen / Auswerfen', effect: 'Schlag durch ausgeworfene Welle', scenario: 'Aus den Führungen geschleuderter Welle trifft Bediener hinter der Maschine.' },
        gc03: { element: 'Schleifzone', threat: 'Metallstaub / Schleifstaub', effect: 'Staublunge', scenario: 'Schleifen von Stahl ohne Staubabsaugung in geschlossenem Raum über mehrere Stunden.' },
        gc04: { element: 'Scheibendrehzahl', threat: 'Lärm > 85 dB(A)', effect: 'Gehörverlust', scenario: 'Unsachgemäße Werkstückeinspannung zwischen Spitzen — Werkstück schleudert mit hoher Geschwindigkeit.' },
        gc05: { element: 'Elektrische Anlage', threat: 'Elektrischer Schlag', effect: 'Verbrennungen, Tod', scenario: 'Kühlmittel auf dem Boden rund um die Maschine — Rutschgefahr beim Bedienfeld.' },
      },
    },
    fr: {
      name: 'Rectifieuse cylindrique (entre-pointes / sans centres)',
      threats: {
        gc01: { element: 'Meule d\'entraînement et de travail', threat: 'Éclatement de meule', effect: 'Blessures par éclats', scenario: 'La meule avec fissure éclate au démarrage ou au contact avec une pièce dure.' },
        gc02: { element: 'Pièce entre pointes / guides', threat: 'Chute / projection de pièce', effect: 'Coup par barre éjectée', scenario: 'L\'arbre éjecté des guides frappe l\'opérateur se tenant derrière la machine.' },
        gc03: { element: 'Zone de rectification', threat: 'Poussière métallique / abrasive', effect: 'Silicose', scenario: 'Meulage de l\'acier sans extraction de poussière en local fermé pendant plusieurs heures.' },
        gc04: { element: 'Vitesse de meule', threat: 'Bruit > 85 dB(A)', effect: 'Perte auditive', scenario: 'Mauvais serrage de la pièce entre pointes — la pièce est éjectée à grande vitesse.' },
        gc05: { element: 'Installation électrique', threat: 'Électrocution', effect: 'Brûlures, décès', scenario: 'Liquide de refroidissement sur le sol autour de la machine — glissade à l\'approche du pupitre.' },
      },
    },
    it: {
      name: 'Rettificatrice cilindrica (in punta / senza centri)',
      threats: {
        gc01: { element: 'Mola di trascinamento e di lavoro', threat: 'Scoppio della mola', effect: 'Lesioni da frammenti', scenario: 'La mola con crepa si rompe durante lavviamento o a contatto con pezzo duro.' },
        gc02: { element: 'Pezzo tra punte / guide', threat: 'Caduta / proiezione del pezzo', effect: 'Colpo da albero proiettato', scenario: 'L\'albero espulso dalle guide colpisce l\'operatore in piedi dietro la macchina.' },
        gc03: { element: 'Zona di rettifica', threat: 'Polvere metallica / abrasiva', effect: 'Pneumoconiosi', scenario: 'Rettifica acciaio senza estrazione polveri in locale chiuso per diverse ore.' },
        gc04: { element: 'Velocità della mola', threat: 'Rumore > 85 dB(A)', effect: 'Perdita uditiva', scenario: 'Bloccaggio improprio del pezzo tra le punte — il pezzo viene espulso ad alta velocità.' },
        gc05: { element: 'Impianto elettrico', threat: 'Elettrocuzione', effect: 'Ustioni, morte', scenario: 'Refrigerante sul pavimento attorno alla macchina — scivolamento avvicinandosi al pannello.' },
      },
    },
    es: {
      name: 'Rectificadora cilíndrica (entre puntos / sin centros)',
      threats: {
        gc01: { element: 'Muela de arrastre y de trabajo', threat: 'Rotura de muela', effect: 'Lesiones por fragmentos', scenario: 'La muela con grieta estalla durante el arranque o al contacto con pieza dura.' },
        gc02: { element: 'Pieza entre puntos / guías', threat: 'Caída / proyección de pieza', effect: 'Golpe por eje proyectado', scenario: 'El eje expulsado de las guías golpea al operario situado detrás de la máquina.' },
        gc03: { element: 'Zona de rectificado', threat: 'Polvo metálico / abrasivo', effect: 'Neumoconiosis', scenario: 'Rectificado de acero sin extracción de polvo en local cerrado durante varias horas.' },
        gc04: { element: 'Velocidad de muela', threat: 'Ruido > 85 dB(A)', effect: 'Pérdida auditiva', scenario: 'Sujeción inadecuada de la pieza entre puntos — la pieza es expulsada a alta velocidad.' },
        gc05: { element: 'Instalación eléctrica', threat: 'Electrocución', effect: 'Quemaduras, muerte', scenario: 'Refrigerante en el suelo alrededor de la máquina — resbalamiento al acercarse al panel.' },
      },
    },
    cs: {
      name: 'Hrotová bruska / bezhrotová bruska',
      threats: {
        gc01: { element: 'Vodící a pracovní brusný kotouč', threat: 'Rozlomení kotouče', effect: 'Zranění fragmenty', scenario: 'Brusný kotouč s trhlinou se rozpadne při rozběhu nebo kontaktu s tvrdým obrobkem.' },
        gc02: { element: 'Obrobek mezi hroty / vedením', threat: 'Vypadnutí / vymrštění obrobku', effect: 'Úder vymrštěným hřídelem', scenario: 'Hřídel vymrštěná z vedení zasáhne obsluhu stojící za strojem.' },
        gc03: { element: 'Brusná zóna', threat: 'Kovový prach / prach brusného kotouče', effect: 'Pneumokonióza', scenario: 'Broušení oceli bez odsávání prachu v uzavřené místnosti po dobu několika hodin.' },
        gc04: { element: 'Otáčky kotouče', threat: 'Hluk > 85 dB(A)', effect: 'Ztráta sluchu', scenario: 'Nesprávné upnutí obrobku mezi hroty — obrobek vyletí při vysoké rychlosti.' },
        gc05: { element: 'Elektrická instalace', threat: 'Úraz elektrickým proudem', effect: 'Popáleniny, smrt', scenario: 'Chladicí kapalina na podlaze kolem stroje — uklouznutí při přístupu k ovládacímu panelu.' },
      },
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // PRASY
  // ─────────────────────────────────────────────────────────────────
  'press-hydraulic': {
    pl: {
      name: 'Prasa hydrauliczna',
      threats: {
        p01: { element: 'Suwak / stempel — strefa narzędzia', threat: 'Gniecenie / zmiażdżenie rąk', effect: 'Zmiażdżenie dłoni, amputacja', scenario: 'Operator ustawia detal ręką w strefie narzędzia — suwak opada nieoczekiwanie.' },
        p02: { element: 'Suwak w górze przy serwisie', threat: 'Opadnięcie suwaka pod ciężarem', effect: 'Zmiażdżenie — śmierć', scenario: 'Serwisant pracuje pod suwakiem bez mechanicznego bloku bezpieczeństwa.' },
        p03: { element: 'Układ hydrauliczny (> 250 bar)', threat: 'Wytrysk oleju pod ciśnieniem (iniekcja)', effect: 'Oparzenie, amputacja od strumienia oleju', scenario: 'Uszkodzony przewód hydrauliczny pod ciśnieniem 250+ bar rozrywa się.' },
        p04: { element: 'Układ hydrauliczny — olej', threat: 'Pożar oleju hydraulicznego', effect: 'Pożar maszyny', scenario: 'Operator wchodzi do przestrzeni roboczej przed pełnym zatrzymaniem suwaka.' },
        p05: { element: 'Strefa robocza — wyrzutniki', threat: 'Wyrzucenie detalu / odpadów', effect: 'Urazy od wyrzuconego elementu', scenario: 'Gorący olej hydrauliczny wylewa się przy serwisie układu hydraulicznego.' },
        p06: { element: 'Instalacja elektryczna', threat: 'Porażenie prądem', effect: 'Oparzenie, śmierć', scenario: 'Hałas udarowy prasy przekracza 90 dB bez ochronników słuchu przez całą zmianę.' },
        p07: { element: 'Układ sterowania (zawór bezpieczeństwa)', threat: 'Usterka zaworu — samoczynny skok suwaka', effect: 'Amputacja', scenario: 'Pył metalowy z tłoczenia unosi się w powietrzu w zamkniętym pomieszczeniu.' },
        p08: { element: 'Hałas prasy przy uderzeniu', threat: 'Hałas impulsowy', effect: 'Ubytek słuchu', scenario: 'Ciężkie narzędzie spada na stopy operatora przy wymianie matrycy.' },
      },
    },
    en: {
      name: 'Hydraulic Press',
      threats: {
        p01: { element: 'Slide / ram — tool area', threat: 'Crushing / squashing of hands', effect: 'Hand crushing, amputation', scenario: 'Operator positions workpiece by hand in tool zone — slide descends unexpectedly.' },
        p02: { element: 'Slide raised during service', threat: 'Slide dropping under its own weight', effect: 'Crushing — death', scenario: 'Maintenance worker works under slide without mechanical safety block.' },
        p03: { element: 'Hydraulic system (> 250 bar)', threat: 'High-pressure oil injection', effect: 'Burns, amputation from oil jet', scenario: 'Damaged hydraulic hose under 250+ bar pressure bursts.' },
        p04: { element: 'Hydraulic system — oil', threat: 'Hydraulic oil fire', effect: 'Machine fire', scenario: 'Operator enters working space before slide comes to full stop.' },
        p05: { element: 'Working zone — ejectors', threat: 'Ejection of workpiece / scrap', effect: 'Injuries from ejected component', scenario: 'Hot hydraulic oil spills during hydraulic system service.' },
        p06: { element: 'Electrical installation', threat: 'Electric shock', effect: 'Burns, death', scenario: 'Impact noise from press exceeds 90 dB without hearing protection throughout shift.' },
        p07: { element: 'Control system (safety valve)', threat: 'Valve failure — spontaneous slide stroke', effect: 'Amputation', scenario: 'Metal dust from pressing floats in air in enclosed room.' },
        p08: { element: 'Press noise on impact', threat: 'Impulse noise', effect: 'Hearing loss', scenario: 'Heavy tool falls on operator feet during die change.' },
      },
    },
    de: {
      name: 'Hydraulische Presse',
      threats: {
        p01: { element: 'Stößel / Stempel — Werkzeugbereich', threat: 'Quetschen / Zerdrücken der Hände', effect: 'Handquetschung, Amputation', scenario: 'Bediener positioniert Werkstück mit der Hand in der Werkzeugzone — Stößel senkt sich unerwartet.' },
        p02: { element: 'Stößel oben bei Service', threat: 'Absacken des Stößels', effect: 'Zerquetscht — Tod', scenario: 'Wartungspersonal arbeitet unter dem Stößel ohne mechanischen Sicherheitsblock.' },
        p03: { element: 'Hydrauliksystem (> 250 bar)', threat: 'Hochdrucköleinspritzung', effect: 'Verbrennungen, Amputation durch Ölstrahl', scenario: 'Beschädigter Hydraulikschlauch unter 250+ bar Druck birst.' },
        p04: { element: 'Hydrauliksystem — Öl', threat: 'Hydraulikölbrand', effect: 'Maschinenbrand', scenario: 'Bediener betritt Arbeitsraum bevor Stößel vollständig gestoppt hat.' },
        p05: { element: 'Arbeitsbereich — Auswerfer', threat: 'Auswerfen von Werkstück / Abfall', effect: 'Verletzungen durch ausgeworfenes Teil', scenario: 'Heißes Hydrauliköl läuft bei Wartung des Hydrauliksystems aus.' },
        p06: { element: 'Elektrische Anlage', threat: 'Elektrischer Schlag', effect: 'Verbrennungen, Tod', scenario: 'Stoßgeräusch der Presse übersteigt 90 dB ohne Gehörschutz während der gesamten Schicht.' },
        p07: { element: 'Steuerung (Sicherheitsventil)', threat: 'Ventilstörung — selbsttätiger Stößelhub', effect: 'Amputation', scenario: 'Metallstaub vom Pressen schwebt in der Luft im geschlossenen Raum.' },
        p08: { element: 'Presslärm beim Aufprall', threat: 'Impulslärm', effect: 'Gehörverlust', scenario: 'Schweres Werkzeug fällt beim Werkzeugwechsel auf die Füße des Bedieners.' },
      },
    },
    fr: {
      name: 'Presse hydraulique',
      threats: {
        p01: { element: 'Coulisseau / poinçon — zone outil', threat: 'Écrasement des mains', effect: 'Écrasement main, amputation', scenario: 'L\'opérateur positionne la pièce à la main dans la zone outil — le coulisseau descend inopinément.' },
        p02: { element: 'Coulisseau en haut lors maintenance', threat: 'Chute du coulisseau', effect: 'Écrasement — décès', scenario: 'Le technicien de maintenance travaille sous le coulisseau sans bloc de sécurité mécanique.' },
        p03: { element: 'Circuit hydraulique (> 250 bar)', threat: 'Injection d\'huile sous pression', effect: 'Brûlures, amputation par jet d\'huile', scenario: 'Tuyau hydraulique endommagé sous 250+ bar éclate lors du remplacement sans dépressurisation.' },
        p04: { element: 'Circuit hydraulique — huile', threat: 'Incendie d\'huile hydraulique', effect: 'Incendie machine', scenario: 'L\'opérateur entre dans l\'espace de travail avant l\'arrêt complet du coulisseau.' },
        p05: { element: 'Zone de travail — éjecteurs', threat: 'Projection de pièce / déchets', effect: 'Blessures par projection', scenario: 'L\'huile hydraulique chaude se déverse lors de la maintenance du système hydraulique.' },
        p06: { element: 'Installation électrique', threat: 'Électrocution', effect: 'Brûlures, décès', scenario: 'Le bruit d\'impact de la presse dépasse 90 dB sans protection auditive pendant tout le quart.' },
        p07: { element: 'Système de commande (soupape de sécurité)', threat: 'Défaillance soupape — course intempestive', effect: 'Amputation', scenario: 'La poussière métallique du pressage flotte dans l\'air en local fermé.' },
        p08: { element: 'Bruit de la presse à l\'impact', threat: 'Bruit impulsionnel', effect: 'Perte auditive', scenario: 'L\'outil lourd tombe sur les pieds de l\'opérateur lors du changement de matrice.' },
      },
    },
    it: {
      name: 'Pressa idraulica',
      threats: {
        p01: { element: 'Slitta / punzone — zona utensile', threat: 'Schiacciamento delle mani', effect: 'Schiacciamento mano, amputazione', scenario: 'L\'operatore posiziona il pezzo a mano nella zona utensile — lo slitta scende inaspettatamente.' },
        p02: { element: 'Slitta in alto durante manutenzione', threat: 'Caduta della slitta', effect: 'Schiacciamento — morte', scenario: 'Il manutentore lavora sotto lo slitta senza blocco meccanico di sicurezza.' },
        p03: { element: 'Impianto idraulico (> 250 bar)', threat: 'Iniezione di olio ad alta pressione', effect: 'Ustioni, amputazione da getto d\'olio', scenario: 'Tubo idraulico danneggiato sotto 250+ bar si rompe durante la sostituzione senza depressurizzazione.' },
        p04: { element: 'Impianto idraulico — olio', threat: 'Incendio olio idraulico', effect: 'Incendio macchina', scenario: 'L\'operatore entra nello spazio di lavoro prima dell\'arresto completo dello slitta.' },
        p05: { element: 'Zona di lavoro — espulsori', threat: 'Proiezione del pezzo / scarti', effect: 'Lesioni da componente proiettato', scenario: 'L\'olio idraulico caldo fuoriesce durante la manutenzione del sistema idraulico.' },
        p06: { element: 'Impianto elettrico', threat: 'Elettrocuzione', effect: 'Ustioni, morte', scenario: 'Il rumore d\'impatto della pressa supera 90 dB senza protezione uditiva per tutto il turno.' },
        p07: { element: 'Sistema di controllo (valvola di sicurezza)', threat: 'Guasto valvola — corsa spontanea slitta', effect: 'Amputazione', scenario: 'La polvere metallica dalla pressatura fluttua nell\'aria in locale chiuso.' },
        p08: { element: 'Rumore pressa all\'impatto', threat: 'Rumore impulsivo', effect: 'Perdita uditiva', scenario: 'L\'utensile pesante cade sui piedi dell\'operatore durante il cambio stampo.' },
      },
    },
    es: {
      name: 'Prensa hidráulica',
      threats: {
        p01: { element: 'Corredera / punzón — zona útil', threat: 'Aplastamiento de manos', effect: 'Aplastamiento mano, amputación', scenario: 'El operario posiciona la pieza a mano en la zona de herramienta — el émbolo desciende inesperadamente.' },
        p02: { element: 'Corredera arriba en mantenimiento', threat: 'Caída de la corredera', effect: 'Aplastamiento — muerte', scenario: 'El técnico de mantenimiento trabaja bajo el émbolo sin bloque mecánico de seguridad.' },
        p03: { element: 'Sistema hidráulico (> 250 bar)', threat: 'Inyección de aceite a alta presión', effect: 'Quemaduras, amputación por chorro de aceite', scenario: 'Manguera hidráulica dañada bajo presión de 250+ bar revienta.' },
        p04: { element: 'Sistema hidráulico — aceite', threat: 'Incendio de aceite hidráulico', effect: 'Incendio de máquina', scenario: 'El operario entra al espacio de trabajo antes del paro completo del émbolo.' },
        p05: { element: 'Zona de trabajo — expulsores', threat: 'Proyección de pieza / chatarra', effect: 'Lesiones por proyección', scenario: 'El aceite hidráulico caliente se derrama durante el mantenimiento del sistema hidráulico.' },
        p06: { element: 'Instalación eléctrica', threat: 'Electrocución', effect: 'Quemaduras, muerte', scenario: 'El ruido de impacto de la prensa supera 90 dB sin protección auditiva durante todo el turno.' },
        p07: { element: 'Sistema de control (válvula de seguridad)', threat: 'Fallo válvula — carrera espontánea', effect: 'Amputación', scenario: 'El polvo metálico del prensado flota en el aire en local cerrado.' },
        p08: { element: 'Ruido de prensa al impacto', threat: 'Ruido impulsivo', effect: 'Pérdida auditiva', scenario: 'La herramienta pesada cae sobre los pies del operario durante el cambio de matriz.' },
      },
    },
    cs: {
      name: 'Hydraulický lis',
      threats: {
        p01: { element: 'Beran / razník — pracovní zóna', threat: 'Drcení / rozdrcení rukou', effect: 'Rozdrcení ruky, amputace', scenario: 'Obsluha polohuje obrobek ručně v zóně nástroje — beran nečekaně klesá.' },
        p02: { element: 'Beran nahoře při servisu', threat: 'Pokles berana vlastní vahou', effect: 'Rozdrcení — smrt', scenario: 'Pracovník údržby pracuje pod beranem bez mechanické bezpečnostní zábrany.' },
        p03: { element: 'Hydraulický systém (> 250 bar)', threat: 'Vstřik oleje pod tlakem', effect: 'Popáleniny, amputace olejem', scenario: 'Poškozená hydraulická hadice pod tlakem 250+ bar se trhá.' },
        p04: { element: 'Hydraulický systém — olej', threat: 'Požár hydraulického oleje', effect: 'Požár stroje', scenario: 'Obsluha vstupuje do pracovního prostoru před úplným zastavením beranu.' },
        p05: { element: 'Pracovní zóna — vyhazovače', threat: 'Vymrštění obrobku / odpadu', effect: 'Zranění vymrštěnou součástí', scenario: 'Horký hydraulický olej se vylije při servisu hydraulického systému.' },
        p06: { element: 'Elektrická instalace', threat: 'Úraz elektrickým proudem', effect: 'Popáleniny, smrt', scenario: 'Rázový hluk lisu překračuje 90 dB bez ochrany sluchu po celou směnu.' },
        p07: { element: 'Řídicí systém (pojistný ventil)', threat: 'Závada ventilu — samovolný zdvih berana', effect: 'Amputace', scenario: 'Kovový prach z lisování se vznáší ve vzduchu v uzavřeném prostoru.' },
        p08: { element: 'Hluk lisu při dopadu', threat: 'Impulsní hluk', effect: 'Ztráta sluchu', scenario: 'Těžký nástroj padá na nohy obsluhy při výměně nástroje.' },
      },
    },
  },

  'press-mechanical': {
    pl: {
      name: 'Prasa mechaniczna (mimośrodowa / kolanowa)',
      threats: {
        pm01: { element: 'Suwak — strefa narzędzia', threat: 'Gniecenie / amputacja', effect: 'Amputacja palców / dłoni', scenario: 'Ręce operatora w strefie matrycy gdy sprzęgło nie zostało w pełni rozłączone.' },
        pm02: { element: 'Koło zamachowe', threat: 'Pochwycenie / wciągnięcie przez koło', effect: 'Wciągnięcie kończyny', scenario: 'Rękaw lub odzież operatora zostaje pochwycona przez obracające się koło zamachowe.' },
        pm03: { element: 'Sprzęgło / hamulec', threat: 'Awaria hamulca — opadanie suwaka', effect: 'Amputacja — śmierć', scenario: 'Awaria hamulca sprzęgłowego powoduje opadnięcie suwaka w pozycji górnej.' },
        pm04: { element: 'Suwak przy serwisie', threat: 'Opadnięcie suwaka pod ciężarem', effect: 'Zmiażdżenie — śmierć', scenario: 'Hałas udarowy 95+ dB przy każdym suwie bez ochronników słuchu przez całą zmianę.' },
        pm05: { element: 'Wyrzutniki detali', threat: 'Wyrzucenie odpadów prasowania', effect: 'Urazy', scenario: 'Wyrzucona w górę gotowa część wraca i uderza operatora przy podawaniu ręcznym.' },
        pm06: { element: 'Hałas impulsowy prasy', threat: 'Hałas impulsowy przy uderzeniu stempla', effect: 'Ubytek słuchu', scenario: 'Awaria blokady krzywkowej — suwak wykonuje podwójny suw bez woli operatora.' },
        pm07: { element: 'Instalacja elektryczna', threat: 'Porażenie prądem', effect: 'Oparzenie, śmierć', scenario: 'Ciężka matryca górna spada na operatora przy rozluźnieniu śruby mocującej.' },
      },
    },
    en: {
      name: 'Mechanical Press (eccentric / knuckle-joint)',
      threats: {
        pm01: { element: 'Slide — tool area', threat: 'Crushing / amputation', effect: 'Finger / hand amputation', scenario: 'Operator\'s hands in die zone when clutch has not fully disengaged.' },
        pm02: { element: 'Flywheel', threat: 'Entanglement / drawing-in by flywheel', effect: 'Limb drawn in', scenario: 'Operator\'s sleeve or clothing caught by rotating flywheel.' },
        pm03: { element: 'Clutch / brake', threat: 'Brake failure — slide drop', effect: 'Amputation — death', scenario: 'Clutch brake failure causes slide to drop from upper position.' },
        pm04: { element: 'Slide during service', threat: 'Slide dropping under its own weight', effect: 'Crushing — death', scenario: 'Impact noise 95+ dB at each stroke without hearing protection throughout shift.' },
        pm05: { element: 'Part ejectors', threat: 'Ejection of press waste', effect: 'Injuries', scenario: 'Ejected finished part bounces back and strikes operator during hand feeding.' },
        pm06: { element: 'Press impulse noise', threat: 'Impulse noise at ram impact', effect: 'Hearing loss', scenario: 'Cam lock failure — slide makes double stroke without operator intent.' },
        pm07: { element: 'Electrical installation', threat: 'Electric shock', effect: 'Burns, death', scenario: 'Heavy upper die falls on operator when retaining bolt loosens.' },
      },
    },
    de: {
      name: 'Mechanische Presse (Exzenter- / Kniehebelpresse)',
      threats: {
        pm01: { element: 'Stößel — Werkzeugbereich', threat: 'Quetschen / Amputation', effect: 'Finger- / Handamputation', scenario: 'Bedienerhände in der Werkzeugzone, wenn Kupplung nicht vollständig getrennt hat.' },
        pm02: { element: 'Schwungrad', threat: 'Erfassen / Einziehen durch Schwungrad', effect: 'Einziehen der Gliedmaße', scenario: 'Ärmel oder Kleidung des Bedieners wird vom rotierenden Schwungrad erfasst.' },
        pm03: { element: 'Kupplung / Bremse', threat: 'Bremsversagen — Stößelabsacken', effect: 'Amputation — Tod', scenario: 'Kupplungsbremsversagen lässt Stößel aus oberer Position fallen.' },
        pm04: { element: 'Stößel bei Service', threat: 'Stößelabsacken', effect: 'Zerquetscht — Tod', scenario: 'Stoßgeräusch 95+ dB bei jedem Hub ohne Gehörschutz während der gesamten Schicht.' },
        pm05: { element: 'Teileauswerfer', threat: 'Auswerfen von Pressabfall', effect: 'Verletzungen', scenario: 'Ausgeworfenes Fertigteil prallt zurück und trifft Bediener beim Handvorschub.' },
        pm06: { element: 'Impulslärm der Presse', threat: 'Impulslärm beim Stempelaufprall', effect: 'Gehörverlust', scenario: 'Nockenverriegelungsversagen — Stößel macht Doppelhub ohne Bedienerwillen.' },
        pm07: { element: 'Elektrische Anlage', threat: 'Elektrischer Schlag', effect: 'Verbrennungen, Tod', scenario: 'Schweres Oberwerkzeug fällt auf Bediener wenn Befestigungsschraube sich löst.' },
      },
    },
    fr: {
      name: 'Presse mécanique (excentrique / à genouillère)',
      threats: {
        pm01: { element: 'Coulisseau — zone outil', threat: 'Écrasement / amputation', effect: 'Amputation doigts / main', scenario: 'Les mains de l\'opérateur dans la zone matrice quand l\'embrayage ne s\'est pas complètement désengagé.' },
        pm02: { element: 'Volant d\'inertie', threat: 'Entraînement par volant', effect: 'Membre happé', scenario: 'La manche ou vêtement de l\'opérateur est happé par le volant tournant.' },
        pm03: { element: 'Embrayage / frein', threat: 'Défaillance frein — chute coulisseau', effect: 'Amputation — décès', scenario: 'La défaillance du frein d\'embrayage fait descendre le coulisseau depuis la position haute.' },
        pm04: { element: 'Coulisseau lors maintenance', threat: 'Chute du coulisseau', effect: 'Écrasement — décès', scenario: 'Bruit d\'impact 95+ dB à chaque course sans protection auditive pendant tout le quart.' },
        pm05: { element: 'Éjecteurs de pièces', threat: 'Projection de déchets', effect: 'Blessures', scenario: 'La pièce finie éjectée rebondit et frappe l\'opérateur lors de l\'alimentation manuelle.' },
        pm06: { element: 'Bruit impulsionnel de la presse', threat: 'Bruit d\'impact du poinçon', effect: 'Perte auditive', scenario: 'Défaillance du verrouillage à came — le coulisseau fait un double course sans la volonté de l\'opérateur.' },
        pm07: { element: 'Installation électrique', threat: 'Électrocution', effect: 'Brûlures, décès', scenario: 'La matrice supérieure lourde tombe sur l\'opérateur quand le boulon de retenue se desserre.' },
      },
    },
    it: {
      name: 'Pressa meccanica (eccentrica / a ginocchiera)',
      threats: {
        pm01: { element: 'Slitta — zona utensile', threat: 'Schiacciamento / amputazione', effect: 'Amputazione dita / mano', scenario: 'Le mani dell\'operatore nella zona stampo quando la frizione non si è completamente disinnestata.' },
        pm02: { element: 'Volano', threat: 'Presa / trascinamento dal volano', effect: 'Arto trascinato', scenario: 'La manica o indumento dell\'operatore viene afferrata dal volano rotante.' },
        pm03: { element: 'Frizione / freno', threat: 'Guasto freno — caduta slitta', effect: 'Amputazione — morte', scenario: 'Il guasto del freno frizione fa cadere lo slitta dalla posizione superiore.' },
        pm04: { element: 'Slitta durante manutenzione', threat: 'Caduta della slitta', effect: 'Schiacciamento — morte', scenario: 'Rumore d\'impatto 95+ dB ad ogni corsa senza protezione uditiva per tutto il turno.' },
        pm05: { element: 'Espulsori pezzi', threat: 'Proiezione di scarti di pressatura', effect: 'Lesioni', scenario: 'Il pezzo finito espulso rimbalza e colpisce l\'operatore durante l\'alimentazione manuale.' },
        pm06: { element: 'Rumore impulsivo pressa', threat: 'Rumore impatto punzone', effect: 'Perdita uditiva', scenario: 'Guasto del blocco a camma — lo slitta fa un doppia corsa senza l\'intenzione dell\'operatore.' },
        pm07: { element: 'Impianto elettrico', threat: 'Elettrocuzione', effect: 'Ustioni, morte', scenario: 'Lo stampo superiore pesante cade sull\'operatore quando il bullone di fissaggio si allenta.' },
      },
    },
    es: {
      name: 'Prensa mecánica (excéntrica / de rodillera)',
      threats: {
        pm01: { element: 'Corredera — zona útil', threat: 'Aplastamiento / amputación', effect: 'Amputación dedos / mano', scenario: 'Las manos del operario en la zona de matriz cuando el embrague no se ha desenganchado completamente.' },
        pm02: { element: 'Volante de inercia', threat: 'Atrapamiento por volante', effect: 'Miembro arrastrado', scenario: 'La manga o ropa del operario queda atrapada por el volante giratorio.' },
        pm03: { element: 'Embrague / freno', threat: 'Fallo de freno — caída corredera', effect: 'Amputación — muerte', scenario: 'El fallo del freno de embrague hace caer el émbolo desde la posición superior.' },
        pm04: { element: 'Corredera en mantenimiento', threat: 'Caída de la corredera', effect: 'Aplastamiento — muerte', scenario: 'Ruido de impacto 95+ dB en cada carrera sin protección auditiva durante todo el turno.' },
        pm05: { element: 'Expulsores de piezas', threat: 'Proyección de residuos de prensado', effect: 'Lesiones', scenario: 'La pieza terminada expulsada rebota y golpea al operario durante la alimentación manual.' },
        pm06: { element: 'Ruido impulsivo de prensa', threat: 'Ruido de impacto del punzón', effect: 'Pérdida auditiva', scenario: 'Fallo del bloqueo de leva — el émbolo hace una doble carrera sin la intención del operario.' },
        pm07: { element: 'Instalación eléctrica', threat: 'Electrocución', effect: 'Quemaduras, muerte', scenario: 'La matriz superior pesada cae sobre el operario cuando se afloja el perno de retención.' },
      },
    },
    cs: {
      name: 'Mechanický lis (excentrický / kloubový)',
      threats: {
        pm01: { element: 'Beran — pracovní zóna', threat: 'Drcení / amputace', effect: 'Amputace prstů / ruky', scenario: 'Ruce obsluhy v zóně nástroje, když spojka není plně odpojena.' },
        pm02: { element: 'Setrvačník', threat: 'Zachycení / vtažení setrvačníkem', effect: 'Vtažení končetiny', scenario: 'Rukáv nebo oblečení obsluhy je zachyceno rotujícím setrvačníkem.' },
        pm03: { element: 'Spojka / brzda', threat: 'Porucha brzdy — pokles berana', effect: 'Amputace — smrt', scenario: 'Porucha brzdné spojky způsobuje pád beranu z horní polohy.' },
        pm04: { element: 'Beran při servisu', threat: 'Pokles berana vlastní vahou', effect: 'Rozdrcení — smrt', scenario: 'Rázový hluk 95+ dB při každém zdvihu bez ochrany sluchu po celou směnu.' },
        pm05: { element: 'Vyhazovače dílů', threat: 'Vymrštění odpadů lisování', effect: 'Zranění', scenario: 'Vymrštěný hotový výrobek se odráží zpět a zasahuje obsluhu při ručním podávání.' },
        pm06: { element: 'Impulsní hluk lisu', threat: 'Impulsní hluk při dopadu razníku', effect: 'Ztráta sluchu', scenario: 'Porucha vačkové pojistky — beran provede dvojitý zdvih bez vůle obsluhy.' },
        pm07: { element: 'Elektrická instalace', threat: 'Úraz elektrickým proudem', effect: 'Popáleniny, smrt', scenario: 'Těžký horní nástroj padá na obsluhu při uvolnění upevňovacího šroubu.' },
      },
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // ROBOTY
  // ─────────────────────────────────────────────────────────────────
  'robot-industrial': {
    pl: {
      name: 'Robot przemysłowy (6-osiowy)',
      threats: {
        r01: { element: 'Ramię robota — ruch automatyczny', threat: 'Uderzenie ramieniem', effect: 'Urazy od uderzenia — śmierć', scenario: 'Operator wchodzi do strefy roboczej robota podczas trybu automatycznego bez wyłączenia.' },
        r02: { element: 'Ramię / efektor vs. stała struktura', threat: 'Gniecenie między ramieniem a stałą strukturą', effect: 'Zmiażdżenie kończyny', scenario: 'Ręka operatora w szczelinie między ramieniem robota a stałą konstrukcją ogrodzenia.' },
        r03: { element: 'Chwytak / efektor / narzędzie', threat: 'Wyrzucenie przedmiotu przez chwytak', effect: 'Urazy od wyrzuconego detalu', scenario: 'Chwytak traci uchwyt detalu — ciężki element spada lub wylatuje.' },
        r04: { element: 'Kable / węże w ramie robota', threat: 'Pochwycenie przez luźne kable', effect: 'Wciągnięcie odzieży / kończyny', scenario: 'Wycieki oleju z przekładni robota tworzą kałuże na podłodze.' },
        r05: { element: 'Tryb serwisowy (T1/T2) przy programowaniu', threat: 'Niekontrolowany ruch przy teach pendant', effect: 'Urazy programisty', scenario: 'Robot rusza nieoczekiwanie po wznowieniu z pauzy bez ostrzeżenia dźwiękowego.' },
        r06: { element: 'Aplikacja spawania / lakierowania', threat: 'Promieniowanie UV / opary spawalnicze', effect: 'Oparzenie oczu i skóry, choroby układu oddechowego', scenario: 'Kabel zasilający robota uszkodzony przez ruchy osi — porażenie przy dotyku.' },
        r07: { element: 'Sterownik robota (400 V)', threat: 'Porażenie prądem', effect: 'Oparzenie, śmierć', scenario: 'Operator pracuje w trybie JOG zbyt blisko flangii osi 6 — uderzenie głową.' },
        r08: { element: 'Aplikacja laserowa / zgrzewanie', threat: 'Promieniowanie laserowe / łuk elektryczny', effect: 'Oparzenie oczu i skóry', scenario: 'Ciężkie ramię robota spada przy demontażu podczas wymiany przekładni.' },
      },
    },
    en: {
      name: 'Industrial Robot (6-axis)',
      threats: {
        r01: { element: 'Robot arm — automatic motion', threat: 'Strike by arm', effect: 'Impact injuries — death', scenario: 'Operator enters robot work zone during automatic mode without switching off.' },
        r02: { element: 'Arm / end-effector vs. fixed structure', threat: 'Crushing between arm and fixed structure', effect: 'Limb crushing', scenario: 'Operator\'s hand in gap between robot arm and fixed fence structure.' },
        r03: { element: 'Gripper / end-effector / tool', threat: 'Ejection of workpiece from gripper', effect: 'Injuries from ejected part', scenario: 'Gripper loses hold on workpiece — heavy component falls or flies out.' },
        r04: { element: 'Cables / hoses in robot arm', threat: 'Entanglement by loose cables', effect: 'Clothing / limb drawn in', scenario: 'Oil leaks from robot gearbox creating puddles on floor.' },
        r05: { element: 'Service mode (T1/T2) during programming', threat: 'Uncontrolled motion with teach pendant', effect: 'Programmer injuries', scenario: 'Robot starts unexpectedly after resume from pause without audible warning.' },
        r06: { element: 'Welding / painting application', threat: 'UV radiation / welding fumes', effect: 'Eye and skin burns, respiratory disease', scenario: 'Robot power cable damaged by axis movements — electrocution on contact.' },
        r07: { element: 'Robot controller (400 V)', threat: 'Electric shock', effect: 'Burns, death', scenario: 'Operator works in JOG mode too close to axis 6 flange — head struck.' },
        r08: { element: 'Laser / resistance welding application', threat: 'Laser radiation / electric arc', effect: 'Eye and skin burns', scenario: 'Heavy robot arm falls during disassembly when replacing gearbox.' },
      },
    },
    de: {
      name: 'Industrieroboter (6-achsig)',
      threats: {
        r01: { element: 'Roboterarm — automatische Bewegung', threat: 'Schlag durch Arm', effect: 'Aufprallverletzungen — Tod', scenario: 'Bediener betritt Roboterarbeitszone während des Automatikmodus ohne Abschalten.' },
        r02: { element: 'Arm / Endeffektor vs. feste Struktur', threat: 'Quetschung zwischen Arm und fester Struktur', effect: 'Gliedmaßenquetschung', scenario: 'Bedienhand in Spalt zwischen Roboterarm und feststehender Zaunstruktur.' },
        r03: { element: 'Greifer / Endeffektor / Werkzeug', threat: 'Auswerfen des Werkstücks aus Greifer', effect: 'Verletzungen durch ausgeworfenes Teil', scenario: 'Greifer verliert Werkstückgriff — schwere Komponente fällt oder schleudert heraus.' },
        r04: { element: 'Kabel / Schläuche im Roboterarm', threat: 'Erfassen durch lose Kabel', effect: 'Kleidung / Gliedmaße eingezogen', scenario: 'Ölaustritte aus Robotergetriebe bilden Pfützen auf dem Boden.' },
        r05: { element: 'Servicemodus (T1/T2) beim Programmieren', threat: 'Unkontrollierte Bewegung mit Teach-Pendant', effect: 'Verletzungen des Programmierers', scenario: 'Roboter startet unerwartet nach Fortsetzung von Pause ohne akustische Warnung.' },
        r06: { element: 'Schweiß-/Lackieranwendung', threat: 'UV-Strahlung / Schweißdämpfe', effect: 'Augen- und Hautverbrennungen, Atemwegserkrankung', scenario: 'Roboterstromkabel durch Achsbewegungen beschädigt — Stromschlag bei Berührung.' },
        r07: { element: 'Robotersteuerung (400 V)', threat: 'Elektrischer Schlag', effect: 'Verbrennungen, Tod', scenario: 'Bediener arbeitet im JOG-Modus zu nah am Achse-6-Flansch — Kopf getroffen.' },
        r08: { element: 'Laser- / Widerstandsschweißanwendung', threat: 'Laserstrahlung / Lichtbogen', effect: 'Augen- und Hautverbrennungen', scenario: 'Schwerer Roboterarm fällt beim Demontage beim Getriebewechsel herunter.' },
      },
    },
    fr: {
      name: 'Robot industriel (6 axes)',
      threats: {
        r01: { element: 'Bras robot — mouvement automatique', threat: 'Coup par le bras', effect: 'Blessures d\'impact — décès', scenario: 'L\'opérateur entre dans la zone robot pendant le cycle automatique sans coupure d\'alimentation.' },
        r02: { element: 'Bras / effecteur vs. structure fixe', threat: 'Écrasement entre bras et structure fixe', effect: 'Écrasement de membre', scenario: 'Main de l\'opérateur dans l\'espace entre le bras du robot et la structure fixe de la clôture.' },
        r03: { element: 'Préhenseur / effecteur / outil', threat: 'Projection de pièce par le préhenseur', effect: 'Blessures par projection', scenario: 'Le préhenseur perd sa prise sur la pièce — le composant lourd tombe ou est éjecté.' },
        r04: { element: 'Câbles / flexibles dans le bras', threat: 'Entraînement par câbles lâches', effect: 'Vêtement / membre happé', scenario: 'Des fuites d\'huile du réducteur du robot forment des flaques sur le sol.' },
        r05: { element: 'Mode service (T1/T2) lors programmation', threat: 'Mouvement incontrôlé avec boîtier d\'apprentissage', effect: 'Blessures du programmeur', scenario: 'Le robot démarre inopinément après reprise de pause sans avertissement sonore.' },
        r06: { element: 'Application soudage / peinture', threat: 'Rayonnements UV / fumées de soudage', effect: 'Brûlures yeux et peau, maladie respiratoire', scenario: 'Le câble d\'alimentation du robot endommagé par les mouvements d\'axe — électrocution au contact.' },
        r07: { element: 'Armoire robot (400 V)', threat: 'Électrocution', effect: 'Brûlures, décès', scenario: 'L\'opérateur travaille en mode JOG trop près de la bride d\'axe 6 — tête frappée.' },
        r08: { element: 'Application laser / soudage par résistance', threat: 'Rayonnement laser / arc électrique', effect: 'Brûlures yeux et peau', scenario: 'Le bras de robot lourd tombe lors du démontage lors du remplacement du réducteur.' },
      },
    },
    it: {
      name: 'Robot industriale (6 assi)',
      threats: {
        r01: { element: 'Braccio robot — movimento automatico', threat: 'Colpo dal braccio', effect: 'Lesioni da impatto — morte', scenario: 'L\'operatore entra nella zona di lavoro del robot durante la modalità automatica senza spegnimento.' },
        r02: { element: 'Braccio / end-effector vs. struttura fissa', threat: 'Schiacciamento tra braccio e struttura fissa', effect: 'Schiacciamento di arto', scenario: 'Mano dell\'operatore nel divario tra il braccio del robot e la struttura fissa della recinzione.' },
        r03: { element: 'Pinza / end-effector / utensile', threat: 'Proiezione del pezzo dalla pinza', effect: 'Lesioni da parte proiettata', scenario: 'Il gripper perde la presa sul pezzo — il componente pesante cade o viene espulso.' },
        r04: { element: 'Cavi / tubi nel braccio robot', threat: 'Presa da cavi allentati', effect: 'Abiti / arto trascinati', scenario: 'Perdite di olio dal riduttore del robot creano pozzanghere sul pavimento.' },
        r05: { element: 'Modalità servizio (T1/T2) durante programmazione', threat: 'Movimento incontrollato con teach pendant', effect: 'Lesioni al programmatore', scenario: 'Il robot si avvia inaspettatamente dopo la ripresa da pausa senza avviso acustico.' },
        r06: { element: 'Applicazione saldatura / verniciatura', threat: 'Radiazioni UV / fumi di saldatura', effect: 'Ustioni occhi e pelle, malattia respiratoria', scenario: 'Il cavo di alimentazione del robot danneggiato dai movimenti degli assi — elettrocuzione al contatto.' },
        r07: { element: 'Controllore robot (400 V)', threat: 'Elettrocuzione', effect: 'Ustioni, morte', scenario: 'L\'operatore lavora in modalità JOG troppo vicino alla flangia dell\'asse 6 — testa colpita.' },
        r08: { element: 'Applicazione laser / saldatura a resistenza', threat: 'Radiazione laser / arco elettrico', effect: 'Ustioni occhi e pelle', scenario: 'Il pesante braccio del robot cade durante lo smontaggio durante la sostituzione del riduttore.' },
      },
    },
    es: {
      name: 'Robot industrial (6 ejes)',
      threats: {
        r01: { element: 'Brazo robot — movimiento automático', threat: 'Golpe por el brazo', effect: 'Lesiones por impacto — muerte', scenario: 'El operario entra en la zona de trabajo del robot durante el modo automático sin apagarlo.' },
        r02: { element: 'Brazo / efector vs. estructura fija', threat: 'Aplastamiento entre brazo y estructura fija', effect: 'Aplastamiento de miembro', scenario: 'Mano del operario en la brecha entre el brazo del robot y la estructura fija de la valla.' },
        r03: { element: 'Pinza / efector / herramienta', threat: 'Proyección de pieza desde la pinza', effect: 'Lesiones por proyección', scenario: 'El gripper pierde la sujeción de la pieza — el componente pesado cae o sale disparado.' },
        r04: { element: 'Cables / mangueras en el brazo', threat: 'Atrapamiento por cables sueltos', effect: 'Ropa / miembro arrastrado', scenario: 'Fugas de aceite del reductor del robot crean charcos en el suelo.' },
        r05: { element: 'Modo servicio (T1/T2) durante programación', threat: 'Movimiento incontrolado con teach pendant', effect: 'Lesiones al programador', scenario: 'El robot arranca inesperadamente tras reanudar desde pausa sin aviso acústico.' },
        r06: { element: 'Aplicación soldadura / pintura', threat: 'Radiación UV / humos de soldadura', effect: 'Quemaduras ojos y piel, enfermedad respiratoria', scenario: 'Cable de alimentación del robot dañado por movimientos de eje — electrocución al contacto.' },
        r07: { element: 'Controlador robot (400 V)', threat: 'Electrocución', effect: 'Quemaduras, muerte', scenario: 'El operario trabaja en modo JOG demasiado cerca de la brida del eje 6 — cabeza golpeada.' },
        r08: { element: 'Aplicación láser / soldadura por resistencia', threat: 'Radiación láser / arco eléctrico', effect: 'Quemaduras ojos y piel', scenario: 'El pesado brazo del robot cae durante el desmontaje al reemplazar el reductor.' },
      },
    },
    cs: {
      name: 'Průmyslový robot (6osý)',
      threats: {
        r01: { element: 'Rameno robota — automatický pohyb', threat: 'Úder ramenem', effect: 'Nárazová zranění — smrt', scenario: 'Obsluha vstupuje do pracovní zóny robota během automatického režimu bez vypnutí.' },
        r02: { element: 'Rameno / efektor vs. pevná struktura', threat: 'Drcení mezi ramenem a pevnou strukturou', effect: 'Rozdrcení končetiny', scenario: 'Ruka obsluhy v mezeře mezi ramenem robota a pevnou konstrukcí plotu.' },
        r03: { element: 'Chapadlo / efektor / nástroj', threat: 'Vymrštění obrobku z chapadla', effect: 'Zranění vymrštěnou součástí', scenario: 'Chapadlo ztrácí uchopení obrobku — těžká součást padá nebo vyletí.' },
        r04: { element: 'Kabely / hadice v ramenu robota', threat: 'Zachycení volnými kabely', effect: 'Vtažení oblečení / končetiny', scenario: 'Úniky oleje z převodovky robota tvoří louže na podlaze.' },
        r05: { element: 'Servisní režim (T1/T2) při programování', threat: 'Nekontrolovaný pohyb s teach pendantem', effect: 'Zranění programátora', scenario: 'Robot se nečekaně spouští po obnovení z pauzy bez zvukového varování.' },
        r06: { element: 'Aplikace svařování / lakování', threat: 'UV záření / svářečské výpary', effect: 'Popáleniny očí a kůže, onemocnění dýchacích cest', scenario: 'Napájecí kabel robota poškozený pohyby os — zásah elektrickým proudem při dotyku.' },
        r07: { element: 'Řídicí systém robota (400 V)', threat: 'Úraz elektrickým proudem', effect: 'Popáleniny, smrt', scenario: 'Obsluha pracuje v režimu JOG příliš blízko příruby osy 6 — zasažení hlavy.' },
        r08: { element: 'Laserová / odporová svářečka', threat: 'Laserové záření / elektrický oblouk', effect: 'Popáleniny očí a kůže', scenario: 'Těžké rameno robota padá při demontáži při výměně převodovky.' },
      },
    },
  },

  'robot-cobot': {
    pl: {
      name: 'Cobot (robot współpracujący)',
      threats: {
        co01: { element: 'Ramię cobota — kontakt z człowiekiem', threat: 'Uderzenie / zgniecenie podczas współpracy', effect: 'Stłuczenia, złamania', scenario: 'Operator stoi w błędnej pozycji — cobot wykonuje ruch do zapamiętanej pozycji i uderza.' },
        co02: { element: 'Efektor / narzędzie cobota', threat: 'Przebicie / kłucie ostrym efektorem', effect: 'Przebicie skóry', scenario: 'Efektor z ostrym narzędziem porusza się w kierunku twarzy operatora podczas uczenia.' },
        co03: { element: 'Chwytany detal', threat: 'Wyrzucenie detalu przez chwytak', effect: 'Urazy od wyrzuconego przedmiotu', scenario: 'Chwytak zwalnia detal przy utracie zasilania — ciężki detal spada na stopę.' },
        co04: { element: 'Substancje stosowane w aplikacji', threat: 'Ekspozycja na substancje niebezpieczne', effect: 'Zatrucie, choroby układu oddechowego', scenario: 'Operator sięga zbyt szybko w strefę chwytania przy nieodpowiedniej konfiguracji czujnika.' },
      },
    },
    en: {
      name: 'Collaborative Robot (Cobot)',
      threats: {
        co01: { element: 'Cobot arm — contact with human', threat: 'Strike / pinching during collaboration', effect: 'Bruising, fractures', scenario: 'Operator stands in wrong position — cobot moves to memorised position and strikes.' },
        co02: { element: 'Cobot end-effector / tool', threat: 'Puncture / stabbing by sharp end-effector', effect: 'Skin puncture', scenario: 'End effector with sharp tool moves towards operator face during teaching.' },
        co03: { element: 'Gripped workpiece', threat: 'Ejection of workpiece from gripper', effect: 'Injuries from ejected object', scenario: 'Gripper releases workpiece on power loss — heavy part falls on foot.' },
        co04: { element: 'Substances used in application', threat: 'Exposure to hazardous substances', effect: 'Poisoning, respiratory disease', scenario: 'Operator reaches too quickly into gripping zone with improperly configured sensor.' },
      },
    },
    de: {
      name: 'Kollaborierender Roboter (Cobot)',
      threats: {
        co01: { element: 'Cobot-Arm — Kontakt mit Mensch', threat: 'Schlag / Einklemmen bei Kollaboration', effect: 'Prellungen, Frakturen', scenario: 'Bediener steht in falscher Position — Cobot fährt zu gespeicherter Position und schlägt zu.' },
        co02: { element: 'Cobot-Endeffektor / Werkzeug', threat: 'Durchstechen / Stechen durch scharfen Endeffektor', effect: 'Hautstich', scenario: 'Endeffektor mit scharfem Werkzeug bewegt sich beim Einlernen in Richtung Bedienergesicht.' },
        co03: { element: 'Gegriffenes Werkstück', threat: 'Auswerfen aus Greifer', effect: 'Verletzungen durch ausgeworfenes Objekt', scenario: 'Greifer gibt Werkstück bei Stromausfall frei — schweres Teil fällt auf Fuß.' },
        co04: { element: 'In der Anwendung verwendete Stoffe', threat: 'Exposition gegenüber Gefahrstoffen', effect: 'Vergiftung, Atemwegserkrankung', scenario: 'Bediener greift bei falsch konfiguriertem Sensor zu schnell in Greifzone.' },
      },
    },
    fr: {
      name: 'Robot collaboratif (Cobot)',
      threats: {
        co01: { element: 'Bras cobot — contact avec l\'humain', threat: 'Coup / coincement lors de la collaboration', effect: 'Contusions, fractures', scenario: 'L\'opérateur se tient en mauvaise position — le cobot se déplace vers la position mémorisée et frappe.' },
        co02: { element: 'Effecteur / outil du cobot', threat: 'Perforation par effecteur pointu', effect: 'Perforation cutanée', scenario: 'L\'effecteur avec un outil tranchant se déplace vers le visage de l\'opérateur lors de l\'apprentissage.' },
        co03: { element: 'Pièce saisie', threat: 'Projection de pièce depuis le préhenseur', effect: 'Blessures par projection', scenario: 'Le préhenseur libère la pièce lors d\'une coupure d\'alimentation — la pièce lourde tombe sur le pied.' },
        co04: { element: 'Substances utilisées dans l\'application', threat: 'Exposition à des substances dangereuses', effect: 'Intoxication, maladie respiratoire', scenario: 'L\'opérateur atteint trop rapidement la zone de préhension avec un capteur mal configuré.' },
      },
    },
    it: {
      name: 'Robot collaborativo (Cobot)',
      threats: {
        co01: { element: 'Braccio cobot — contatto con l\'uomo', threat: 'Colpo / schiacciamento durante collaborazione', effect: 'Contusioni, fratture', scenario: 'L\'operatore si trova in posizione errata — il cobot si sposta in posizione memorizzata e colpisce.' },
        co02: { element: 'End-effector / utensile del cobot', threat: 'Puntura da end-effector tagliente', effect: 'Perforazione cutanea', scenario: 'L\'end effector con utensile affilato si muove verso il viso dell\'operatore durante la programmazione.' },
        co03: { element: 'Pezzo afferrato', threat: 'Proiezione del pezzo dalla pinza', effect: 'Lesioni da oggetto proiettato', scenario: 'Il gripper rilascia il pezzo durante la mancanza di corrente — il pezzo pesante cade sul piede.' },
        co04: { element: 'Sostanze usate nell\'applicazione', threat: 'Esposizione a sostanze pericolose', effect: 'Avvelenamento, malattia respiratoria', scenario: 'L\'operatore raggiunge troppo velocemente la zona di presa con sensore configurato in modo errato.' },
      },
    },
    es: {
      name: 'Robot colaborativo (Cobot)',
      threats: {
        co01: { element: 'Brazo cobot — contacto con humano', threat: 'Golpe / pellizco durante colaboración', effect: 'Contusiones, fracturas', scenario: 'El operario está en posición incorrecta — el cobot se mueve a la posición memorizada y golpea.' },
        co02: { element: 'Efector / herramienta del cobot', threat: 'Perforación por efector afilado', effect: 'Perforación cutánea', scenario: 'El efector final con herramienta afilada se mueve hacia la cara del operario durante la enseñanza.' },
        co03: { element: 'Pieza agarrada', threat: 'Proyección de pieza desde la pinza', effect: 'Lesiones por objeto proyectado', scenario: 'El gripper suelta la pieza al perder alimentación — la pieza pesada cae sobre el pie.' },
        co04: { element: 'Sustancias usadas en la aplicación', threat: 'Exposición a sustancias peligrosas', effect: 'Intoxicación, enfermedad respiratoria', scenario: 'El operario alcanza demasiado rápido la zona de agarre con sensor incorrectamente configurado.' },
      },
    },
    cs: {
      name: 'Kolaborativní robot (Cobot)',
      threats: {
        co01: { element: 'Rameno cobota — kontakt s člověkem', threat: 'Úder / přiskřípnutí při spolupráci', effect: 'Pohmoždění, zlomeniny', scenario: 'Obsluha stojí na špatné pozici — cobot se pohybuje do zapamatované polohy a udeří.' },
        co02: { element: 'Efektor / nástroj cobota', threat: 'Píchnutí ostrým efektorem', effect: 'Píchnutí do kůže', scenario: 'Efektor s ostrým nástrojem se pohybuje směrem k obličeji obsluhy při učení.' },
        co03: { element: 'Uchopený obrobek', threat: 'Vymrštění obrobku z chapadla', effect: 'Zranění vymrštěným předmětem', scenario: 'Chapadlo uvolní obrobek při výpadku napájení — těžký díl padá na nohu.' },
        co04: { element: 'Látky používané v aplikaci', threat: 'Expozice nebezpečným látkám', effect: 'Otrava, onemocnění dýchacích cest', scenario: 'Obsluha sahá příliš rychle do zóny uchopení při nesprávně nastaveném senzoru.' },
      },
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // PRZENOŚNIKI / TRANSPORT
  // ─────────────────────────────────────────────────────────────────
  'conveyor-belt': {
    pl: {
      name: 'Przenośnik taśmowy',
      threats: {
        cb01: { element: 'Bęben napędowy / zwrotny', threat: 'Pochwycenie / wciągnięcie między bębnem a taśmą', effect: 'Wciągnięcie kończyny — amputacja', scenario: 'Operator czyści taśmę w ruchu — ręka zostaje wciągnięta między taśmą a bębnem.' },
        cb02: { element: 'Krążniki podtrzymujące', threat: 'Pochwycenie przez obracające się krążniki', effect: 'Wciągnięcie odzieży', scenario: 'Odzież operatora zostaje pochwycona przez obracający się krążnik podtrzymujący.' },
        cb03: { element: 'Trasa przenośnika — przejścia', threat: 'Uderzenie głową przy przejściu pod przenośnikiem', effect: 'Urazy głowy', scenario: 'Operator nie zauważa niskiego przenośnika i uderza głową podczas przejścia.' },
        cb04: { element: 'Transportowany materiał', threat: 'Wyrzucenie / zsypanie materiału', effect: 'Urazy od upadającego materiału', scenario: 'Produkt spada z przenośnika na operatora lub pieszego poniżej.' },
        cb05: { element: 'Napęd elektryczny', threat: 'Porażenie prądem', effect: 'Oparzenie, śmierć', scenario: 'Iskra od napinacza taśmy przy transporcie materiałów palnych lub pyłów.' },
        cb06: { element: 'Pył palny / pylący materiał', threat: 'Pożar / wybuch pyłu (ATEX)', effect: 'Pożar lub wybuch', scenario: 'Zablokowana taśma — operator próbuje odblokować ją ręką podczas ruchu napędu.' },
      },
    },
    en: {
      name: 'Belt Conveyor',
      threats: {
        cb01: { element: 'Drive / tail drum', threat: 'Entanglement between drum and belt', effect: 'Limb drawn in — amputation', scenario: 'Operator cleans moving belt — hand drawn in between belt and drum.' },
        cb02: { element: 'Carrying idlers', threat: 'Entanglement by rotating idlers', effect: 'Clothing drawn in', scenario: 'Operator\'s clothing caught by rotating support roller.' },
        cb03: { element: 'Conveyor route — crossings', threat: 'Head strike when passing under conveyor', effect: 'Head injuries', scenario: 'Operator fails to notice low conveyor and hits head when passing under.' },
        cb04: { element: 'Conveyed material', threat: 'Ejection / spillage of material', effect: 'Injuries from falling material', scenario: 'Product falls off conveyor onto operator or pedestrian below.' },
        cb05: { element: 'Electric drive', threat: 'Electric shock', effect: 'Burns, death', scenario: 'Spark from belt tensioner when transporting flammable materials or dusts.' },
        cb06: { element: 'Combustible dust / dusty material', threat: 'Fire / dust explosion (ATEX)', effect: 'Fire or explosion', scenario: 'Jammed belt — operator tries to unjam by hand while drive is running.' },
      },
    },
    de: {
      name: 'Gurtförderer',
      threats: {
        cb01: { element: 'Antriebs-/Umlenktrommel', threat: 'Erfassen zwischen Trommel und Band', effect: 'Einziehen der Gliedmaße — Amputation', scenario: 'Bediener reinigt laufendes Band — Hand wird zwischen Band und Trommel gezogen.' },
        cb02: { element: 'Tragrollen', threat: 'Erfassen durch drehende Tragrollen', effect: 'Kleidung eingezogen', scenario: 'Bedienerbekleidung wird von rotierender Tragrolle erfasst.' },
        cb03: { element: 'Fördertrasse — Übergänge', threat: 'Kopfschlag beim Durchgang unter dem Förderer', effect: 'Kopfverletzungen', scenario: 'Bediener bemerkt niedrigen Förderer nicht und stößt Kopf beim Unterqueren.' },
        cb04: { element: 'Fördergut', threat: 'Auswerfen / Verschütten von Material', effect: 'Verletzungen durch fallendes Material', scenario: 'Produkt fällt vom Förderer auf Bediener oder Fußgänger darunter.' },
        cb05: { element: 'Elektrischer Antrieb', threat: 'Elektrischer Schlag', effect: 'Verbrennungen, Tod', scenario: 'Funken vom Bandspanner beim Transport brennbarer Materialien oder Stäube.' },
        cb06: { element: 'Brennbarer Staub / staubendes Material', threat: 'Brand / Staubexplosion (ATEX)', effect: 'Brand oder Explosion', scenario: 'Eingeklemmtes Band — Bediener versucht bei laufendem Antrieb mit der Hand zu befreien.' },
      },
    },
    fr: {
      name: 'Convoyeur à bande',
      threats: {
        cb01: { element: 'Tambour moteur / de renvoi', threat: 'Entraînement entre tambour et bande', effect: 'Membre happé — amputation', scenario: 'L\'opérateur nettoie la bande en mouvement — la main est entraînée entre la bande et le tambour.' },
        cb02: { element: 'Rouleaux porteurs', threat: 'Entraînement par rouleaux tournants', effect: 'Vêtement happé', scenario: 'Les vêtements de l\'opérateur sont happés par le rouleau porteur tournant.' },
        cb03: { element: 'Trajet du convoyeur — passages', threat: 'Coup à la tête sous le convoyeur', effect: 'Blessures à la tête', scenario: 'L\'opérateur ne remarque pas le convoyeur bas et se cogne la tête en passant dessous.' },
        cb04: { element: 'Matière transportée', threat: 'Projection / déversement de matière', effect: 'Blessures par chute de matière', scenario: 'Le produit tombe du convoyeur sur l\'opérateur ou un piéton en dessous.' },
        cb05: { element: 'Entraînement électrique', threat: 'Électrocution', effect: 'Brûlures, décès', scenario: 'Étincelle du tendeur de bande lors du transport de matériaux inflammables ou de poussières.' },
        cb06: { element: 'Poussière combustible', threat: 'Incendie / explosion poussière (ATEX)', effect: 'Incendie ou explosion', scenario: 'Bande bloquée — l\'opérateur essaie de débloquer à la main pendant que l\'entraînement tourne.' },
      },
    },
    it: {
      name: 'Nastro trasportatore',
      threats: {
        cb01: { element: 'Tamburo motore / di rinvio', threat: 'Trascinamento tra tamburo e nastro', effect: 'Arto trascinato — amputazione', scenario: 'L\'operatore pulisce il nastro in movimento — la mano viene trascinata tra nastro e tamburo.' },
        cb02: { element: 'Rulli portanti', threat: 'Presa da rulli rotanti', effect: 'Abiti trascinati', scenario: 'L\'abbigliamento dell\'operatore viene afferrato dal rullo portante rotante.' },
        cb03: { element: 'Percorso nastro — attraversamenti', threat: 'Colpo alla testa sotto il nastro', effect: 'Lesioni alla testa', scenario: 'L\'operatore non nota il trasportatore basso e si colpisce la testa passandoci sotto.' },
        cb04: { element: 'Materiale trasportato', threat: 'Proiezione / rovesciamento materiale', effect: 'Lesioni da materiale caduto', scenario: 'Il prodotto cade dal trasportatore sull\'operatore o sul pedone sottostante.' },
        cb05: { element: 'Azionamento elettrico', threat: 'Elettrocuzione', effect: 'Ustioni, morte', scenario: 'Scintilla dal tendibanda durante il trasporto di materiali infiammabili o polveri.' },
        cb06: { element: 'Polvere combustibile', threat: 'Incendio / esplosione polvere (ATEX)', effect: 'Incendio o esplosione', scenario: 'Nastro bloccato — l\'operatore cerca di sbloccare a mano mentre l\'azionamento è in moto.' },
      },
    },
    es: {
      name: 'Cinta transportadora',
      threats: {
        cb01: { element: 'Tambor motor / de retorno', threat: 'Atrapamiento entre tambor y cinta', effect: 'Miembro arrastrado — amputación', scenario: 'El operario limpia la banda en movimiento — la mano queda atrapada entre la banda y el tambor.' },
        cb02: { element: 'Rodillos de apoyo', threat: 'Atrapamiento por rodillos giratorios', effect: 'Ropa arrastrada', scenario: 'La ropa del operario queda atrapada por el rodillo portador giratorio.' },
        cb03: { element: 'Trayecto transportador — pasos', threat: 'Golpe en la cabeza bajo la cinta', effect: 'Lesiones en la cabeza', scenario: 'El operario no nota el transportador bajo y se golpea la cabeza al pasar por debajo.' },
        cb04: { element: 'Material transportado', threat: 'Proyección / derrame de material', effect: 'Lesiones por material caído', scenario: 'El producto cae del transportador sobre el operario o un peatón debajo.' },
        cb05: { element: 'Accionamiento eléctrico', threat: 'Electrocución', effect: 'Quemaduras, muerte', scenario: 'Chispa del tensor de banda al transportar materiales inflamables o polvos.' },
        cb06: { element: 'Polvo combustible', threat: 'Incendio / explosión de polvo (ATEX)', effect: 'Incendio o explosión', scenario: 'Banda bloqueada — el operario intenta desbloquear a mano con el accionamiento en marcha.' },
      },
    },
    cs: {
      name: 'Pásový dopravník',
      threats: {
        cb01: { element: 'Hnací / odklonový buben', threat: 'Zachycení mezi bubnem a pásem', effect: 'Vtažení končetiny — amputace', scenario: 'Obsluha čistí pohybující se pás — ruka je vtažena mezi pás a buben.' },
        cb02: { element: 'Nosné válečky', threat: 'Zachycení rotujícími válečky', effect: 'Vtažení oblečení', scenario: 'Oblečení obsluhy zachytí rotující nosný váleček.' },
        cb03: { element: 'Trasa dopravníku — přechody', threat: 'Úder hlavou při přechodu pod dopravníkem', effect: 'Poranění hlavy', scenario: 'Obsluha si nevšimne nízkého dopravníku a udeří hlavou při průchodu pod ním.' },
        cb04: { element: 'Dopravovaný materiál', threat: 'Vymrštění / vysypání materiálu', effect: 'Zranění padajícím materiálem', scenario: 'Výrobek spadí z dopravníku na obsluhu nebo chodce níže.' },
        cb05: { element: 'Elektrický pohon', threat: 'Úraz elektrickým proudem', effect: 'Popáleniny, smrt', scenario: 'Jiskra od napínáku pásu při přepravě hořlavých materiálů nebo prachů.' },
        cb06: { element: 'Hořlavý prach / prašný materiál', threat: 'Požár / výbuch prachu (ATEX)', effect: 'Požár nebo výbuch', scenario: 'Zaseknutý pás — obsluha se pokouší uvolnit ručně za chodu pohonu.' },
      },
    },
  },

  'forklift': {
    pl: {
      name: 'Wózek widłowy elektryczny / spalinowy',
      threats: {
        f01: { element: 'Widły / widelce w ruchu', threat: 'Przebicie / nakłucie ciała', effect: 'Przebicie ciała — śmierć', scenario: 'Operator zbliża się pieszo do wózka od tyłu — nie widzi go przez szeroki maszt.' },
        f02: { element: 'Masa wózka z ładunkiem (1–10 t)', threat: 'Gniecenie / rozjechanie pieszego', effect: 'Zmiażdżenie — śmierć', scenario: 'Wózek przejeżdża przez skrzyżowanie bez sygnału dźwiękowego — kolizja z pieszym.' },
        f03: { element: 'Maszt / ładunek uniesiony', threat: 'Upadek ładunku na osobę', effect: 'Zmiażdżenie — śmierć', scenario: 'Ładunek uniesiony zbyt wysoko powoduje niestabilność przy skręcaniu.' },
        f04: { element: 'Wózek spalinowy — spaliny (CO)', threat: 'Zatrucie tlenkiem węgla', effect: 'Zatrucie CO — śmierć przy braku wentylacji', scenario: 'Bateria litowo-jonowa wydziela gazy podczas ładowania w zamkniętym pomieszczeniu.' },
        f05: { element: 'Bateria Li-Ion (wózek el.)', threat: 'Pożar / wybuch akumulatora', effect: 'Pożar hali', scenario: 'Paleta zsuwasię z wideł przy transporcie po nierównej nawierzchni.' },
        f06: { element: 'Wózek na nierównej nawierzchni', threat: 'Wywrotka wózka na bok', effect: 'Przygniecenie operatora', scenario: 'Operator wysiada z wózka przy uniesionych widłach — wózek rusza samoczynnie.' },
      },
    },
    en: {
      name: 'Electric / Combustion Forklift',
      threats: {
        f01: { element: 'Forks / tines in motion', threat: 'Impalement / piercing of body', effect: 'Body impalement — death', scenario: 'Pedestrian approaches forklift from rear — not visible behind wide mast.' },
        f02: { element: 'Forklift + load mass (1–10 t)', threat: 'Crushing / running over pedestrian', effect: 'Crushing — death', scenario: 'Forklift passes intersection without horn signal — collision with pedestrian.' },
        f03: { element: 'Mast / raised load', threat: 'Load falling onto person', effect: 'Crushing — death', scenario: 'Load raised too high causes instability when turning.' },
        f04: { element: 'Combustion forklift — exhaust (CO)', threat: 'Carbon monoxide poisoning', effect: 'CO poisoning — death without ventilation', scenario: 'Lithium-ion battery releases gases during charging in enclosed space.' },
        f05: { element: 'Li-Ion battery (electric forklift)', threat: 'Battery fire / explosion', effect: 'Warehouse fire', scenario: 'Pallet slides off forks during transport on uneven surface.' },
        f06: { element: 'Forklift on uneven surface', threat: 'Lateral tip-over of forklift', effect: 'Operator crushed', scenario: 'Operator dismounts with forks raised — forklift moves on its own.' },
      },
    },
    de: {
      name: 'Elektro- / Verbrennungsstapler',
      threats: {
        f01: { element: 'Gabelzinken in Bewegung', threat: 'Durchstechen / Aufspießen des Körpers', effect: 'Aufspießung — Tod', scenario: 'Fußgänger nähert sich Gabelstapler von hinten — nicht hinter breitem Mast sichtbar.' },
        f02: { element: 'Staplergewicht + Last (1–10 t)', threat: 'Überfahren / Zerquetschen eines Fußgängers', effect: 'Zerquetscht — Tod', scenario: 'Gabelstapler fährt ohne Hupen über Kreuzung — Kollision mit Fußgänger.' },
        f03: { element: 'Mast / angehobene Last', threat: 'Herunterfallen der Last auf Person', effect: 'Zerquetscht — Tod', scenario: 'Zu hoch angehobene Last verursacht Instabilität beim Abbiegen.' },
        f04: { element: 'Verbrennungsstapler — Abgas (CO)', threat: 'Kohlenmonoxidvergiftung', effect: 'CO-Vergiftung — Tod ohne Belüftung', scenario: 'Lithium-Ionen-Akku gibt beim Laden in geschlossenem Raum Gase ab.' },
        f05: { element: 'Li-Ionen-Batterie (E-Stapler)', threat: 'Batteriebrand / -explosion', effect: 'Hallenbrand', scenario: 'Palette rutscht beim Transport auf unebenem Untergrund von den Gabeln.' },
        f06: { element: 'Stapler auf unebenem Untergrund', threat: 'Seitliches Kippen des Staplers', effect: 'Fahrer eingeklemmt', scenario: 'Bediener steigt bei angehobenen Gabeln aus — Gabelstapler fährt selbständig.' },
      },
    },
    fr: {
      name: 'Chariot élévateur électrique / thermique',
      threats: {
        f01: { element: 'Fourches en mouvement', threat: 'Embrochage / perforation du corps', effect: 'Embrochage — décès', scenario: 'Le piéton approche le chariot par derrière — non visible derrière le large mât.' },
        f02: { element: 'Masse chariot + charge (1–10 t)', threat: 'Écrasement / écrasage d\'un piéton', effect: 'Écrasement — décès', scenario: 'Le chariot passe l\'intersection sans signal sonore — collision avec un piéton.' },
        f03: { element: 'Mât / charge levée', threat: 'Chute de charge sur une personne', effect: 'Écrasement — décès', scenario: 'La charge levée trop haut provoque une instabilité dans les virages.' },
        f04: { element: 'Chariot thermique — gaz d\'échappement (CO)', threat: 'Intoxication au monoxyde de carbone', effect: 'Intoxication CO — décès sans ventilation', scenario: 'La batterie lithium-ion dégage des gaz lors de la charge en local fermé.' },
        f05: { element: 'Batterie Li-Ion (chariot électrique)', threat: 'Incendie / explosion de batterie', effect: 'Incendie entrepôt', scenario: 'La palette glisse des fourches lors du transport sur surface inégale.' },
        f06: { element: 'Chariot sur surface inégale', threat: 'Renversement latéral du chariot', effect: 'Opérateur écrasé', scenario: 'L\'opérateur descend avec les fourches levées — le chariot se déplace seul.' },
      },
    },
    it: {
      name: 'Carrello elevatore elettrico / a combustione',
      threats: {
        f01: { element: 'Forche in movimento', threat: 'Impalamento / perforazione del corpo', effect: 'Impalamento — morte', scenario: 'Il pedone si avvicina al carrello da dietro — non visibile dietro l\'ampio montante.' },
        f02: { element: 'Massa carrello + carico (1–10 t)', threat: 'Investimento / schiacciamento di pedone', effect: 'Schiacciamento — morte', scenario: 'Il carrello passa l\'incrocio senza segnale acustico — collisione con pedone.' },
        f03: { element: 'Montante / carico sollevato', threat: 'Caduta del carico su persona', effect: 'Schiacciamento — morte', scenario: 'Il carico sollevato troppo in alto causa instabilità in curva.' },
        f04: { element: 'Carrello a combustione — gas di scarico (CO)', threat: 'Avvelenamento da monossido di carbonio', effect: 'Avvelenamento CO — morte senza ventilazione', scenario: 'La batteria agli ioni di litio rilascia gas durante la ricarica in locale chiuso.' },
        f05: { element: 'Batteria Li-Ion (carrello elettrico)', threat: 'Incendio / esplosione batteria', effect: 'Incendio capannone', scenario: 'Il pallet scivola dai rebbi durante il trasporto su superficie irregolare.' },
        f06: { element: 'Carrello su superficie irregolare', threat: 'Ribaltamento laterale del carrello', effect: 'Operatore schiacciato', scenario: 'L\'operatore scende con i rebbi alzati — il carrello si muove da solo.' },
      },
    },
    es: {
      name: 'Carretilla elevadora eléctrica / de combustión',
      threats: {
        f01: { element: 'Horquillas en movimiento', threat: 'Empalamiento / perforación del cuerpo', effect: 'Empalamiento — muerte', scenario: 'El peatón se acerca a la carretilla por detrás — no visible detrás del mástil ancho.' },
        f02: { element: 'Masa carretilla + carga (1–10 t)', threat: 'Atropello / aplastamiento de peatón', effect: 'Aplastamiento — muerte', scenario: 'La carretilla pasa el cruce sin señal acústica — colisión con peatón.' },
        f03: { element: 'Mástil / carga elevada', threat: 'Caída de carga sobre persona', effect: 'Aplastamiento — muerte', scenario: 'La carga elevada demasiado alto causa inestabilidad al girar.' },
        f04: { element: 'Carretilla combustión — gases (CO)', threat: 'Intoxicación por monóxido de carbono', effect: 'Intoxicación CO — muerte sin ventilación', scenario: 'La batería de litio-ion libera gases durante la carga en local cerrado.' },
        f05: { element: 'Batería Li-Ion (carretilla eléctrica)', threat: 'Incendio / explosión de batería', effect: 'Incendio nave', scenario: 'El pallet se desliza de las horquillas durante el transporte en superficie irregular.' },
        f06: { element: 'Carretilla en superficie irregular', threat: 'Vuelco lateral de la carretilla', effect: 'Operador aplastado', scenario: 'El operario desciende con las horquillas elevadas — la carretilla se mueve sola.' },
      },
    },
    cs: {
      name: 'Elektrický / spalovací vysokozdvižný vozík',
      threats: {
        f01: { element: 'Vidlice v pohybu', threat: 'Nabodnutí / propíchnutí těla', effect: 'Nabodnutí — smrt', scenario: 'Chodec se přibližuje k vozíku zezadu — není vidět za širokým stožárem.' },
        f02: { element: 'Hmotnost vozíku + náklad (1–10 t)', threat: 'Přejetí / přimáčknutí chodce', effect: 'Rozdrcení — smrt', scenario: 'Vozík projíždí křižovatkou bez zvukového signálu — kolize s chodcem.' },
        f03: { element: 'Stožár / zdvižený náklad', threat: 'Pád nákladu na osobu', effect: 'Rozdrcení — smrt', scenario: 'Příliš vysoko zdvižené břemeno způsobuje nestabilitu při zatáčení.' },
        f04: { element: 'Spalovací vozík — výfukové plyny (CO)', threat: 'Otrava oxidem uhelnatým', effect: 'Otrava CO — smrt bez větrání', scenario: 'Lithium-iontová baterie uvolňuje plyny při nabíjení v uzavřeném prostoru.' },
        f05: { element: 'Baterie Li-Ion (el. vozík)', threat: 'Požár / výbuch baterie', effect: 'Požár haly', scenario: 'Paleta sjíždí z vidlí při přepravě po nerovném povrchu.' },
        f06: { element: 'Vozík na nerovném povrchu', threat: 'Boční převrácení vozíku', effect: 'Přimáčknutí operátora', scenario: 'Obsluha sestoupí se zdvižnými vidlemi — vozík se pohybuje sám.' },
      },
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // PAKOWANIE
  // ─────────────────────────────────────────────────────────────────
  'packaging-flow': {
    pl: {
      name: 'Pakowarka flow-pack (pozioma / pionowa)',
      threats: {
        pf01: { element: 'Zgrzewarka poprzeczna (100–200°C)', threat: 'Oparzenie o gorącą powierzchnię', effect: 'Oparzenie II/III stopnia', scenario: 'Operator dotyka gorącej belki zgrzewarki przy regulacji podczas pracy maszyny.' },
        pf02: { element: 'Wałki podające folię', threat: 'Pochwycenie / wciągnięcie palców między wałkami', effect: 'Zmiażdżenie / wciągnięcie palców', scenario: 'Palce operatora wchodzą między wałki podające folię przy ręcznym wprowadzaniu.' },
        pf03: { element: 'Nóż poprzeczny / podłużny', threat: 'Cięcie / obcinanie przy obsłudze lub serwisie', effect: 'Skaleczenie, amputacja palców', scenario: 'Operator wymienia nóż bez wyłączenia i zablokowania napędów.' },
        pf04: { element: 'Mechanizm podający produkt', threat: 'Wciągnięcie rąk przy podawaniu', effect: 'Złamanie, zmiażdżenie', scenario: 'Opakowania gromadzą się przed maszyną — operator potyka się i wpada w strefę wejścia.' },
        pf05: { element: 'Instalacja elektryczna', threat: 'Porażenie prądem', effect: 'Oparzenie, śmierć', scenario: 'Para wodna z uszkodzonej uszczelki parowej uderza w twarz operatora.' },
        pf06: { element: 'Opary folii PVC / PE przy zgrzewaniu', threat: 'Wdychanie toksycznych oparów', effect: 'Choroby dróg oddechowych', scenario: 'Folia plastikowa tworzy palne nagromadzenie przy gorących powierzchniach.' },
        pf07: { element: 'Hałas maszyny pakującej', threat: 'Hałas > 85 dB(A)', effect: 'Ubytek słuchu', scenario: 'Operator wpycha rękę do strefy zgrzewania podczas usuwania zablokowanego opakowania.' },
      },
    },
    en: {
      name: 'Flow-pack Machine (horizontal / vertical)',
      threats: {
        pf01: { element: 'Cross sealer (100–200°C)', threat: 'Burns from hot surface', effect: 'Second/third-degree burns', scenario: 'Operator touches hot sealing bar during adjustment while machine is running.' },
        pf02: { element: 'Film feed rollers', threat: 'Finger entanglement / drawing-in between rollers', effect: 'Finger crushing / drawing-in', scenario: 'Operator\'s fingers enter between film feed rollers during manual threading.' },
        pf03: { element: 'Cross / longitudinal knife', threat: 'Cutting / severing during operation or service', effect: 'Laceration, finger amputation', scenario: 'Operator changes blade without switching off and locking drives.' },
        pf04: { element: 'Product feed mechanism', threat: 'Hand drawn in during feeding', effect: 'Fracture, crushing', scenario: 'Packages accumulate in front of machine — operator trips and falls into infeed zone.' },
        pf05: { element: 'Electrical installation', threat: 'Electric shock', effect: 'Burns, death', scenario: 'Steam from damaged steam seal strikes operator face.' },
        pf06: { element: 'PVC/PE film fumes during sealing', threat: 'Inhalation of toxic fumes', effect: 'Respiratory disease', scenario: 'Plastic film builds up flammable accumulation near hot surfaces.' },
        pf07: { element: 'Packaging machine noise', threat: 'Noise > 85 dB(A)', effect: 'Hearing loss', scenario: 'Operator pushes hand into sealing zone while clearing jammed package.' },
      },
    },
    de: {
      name: 'Flowpack-Maschine (horizontal / vertikal)',
      threats: {
        pf01: { element: 'Quersiegelbacken (100–200°C)', threat: 'Verbrennung an heißer Oberfläche', effect: 'Verbrennung 2./3. Grades', scenario: 'Bediener berührt heiße Schweißbacke bei Einstellung während Maschinenlauf.' },
        pf02: { element: 'Folienvorschubwalzen', threat: 'Erfassen / Einziehen zwischen Walzen', effect: 'Fingerquetschung / -einzug', scenario: 'Bedienerfinger gelangen beim manuellen Einfädeln zwischen Folienvorschubrollen.' },
        pf03: { element: 'Quer- / Längsschnittmesser', threat: 'Schneiden / Abtrennen bei Bedienung oder Service', effect: 'Schnittwunde, Fingeramputation', scenario: 'Bediener wechselt Messer ohne Abschalten und Arretieren der Antriebe.' },
        pf04: { element: 'Produktzuführmechanismus', threat: 'Handeinzug beim Zuführen', effect: 'Fraktur, Quetschung', scenario: 'Packungen häufen sich vor Maschine — Bediener stolpert und fällt in Einzugszone.' },
        pf05: { element: 'Elektrische Anlage', threat: 'Elektrischer Schlag', effect: 'Verbrennungen, Tod', scenario: 'Dampf aus beschädigter Dampfdichtung trifft Bedienergesicht.' },
        pf06: { element: 'PVC/PE-Foliendämpfe beim Siegeln', threat: 'Einatmen giftiger Dämpfe', effect: 'Atemwegserkrankung', scenario: 'Kunststofffolie bildet brennbare Ansammlung nah an heißen Flächen.' },
        pf07: { element: 'Lärm der Verpackungsmaschine', threat: 'Lärm > 85 dB(A)', effect: 'Gehörverlust', scenario: 'Bediener schiebt Hand in Schweißzone beim Beseitigen einer Folienblockierung.' },
      },
    },
    fr: {
      name: 'Machine flow-pack (horizontale / verticale)',
      threats: {
        pf01: { element: 'Soudeuse transversale (100–200°C)', threat: 'Brûlure sur surface chaude', effect: 'Brûlure 2ème/3ème degré', scenario: 'L\'opérateur touche la mâchoire de soudure chaude lors du réglage pendant le fonctionnement.' },
        pf02: { element: 'Rouleaux d\'alimentation film', threat: 'Entraînement / happement entre rouleaux', effect: 'Écrasement / happement des doigts', scenario: 'Les doigts de l\'opérateur entrent entre les rouleaux d\'alimentation film lors de l\'enfilage manuel.' },
        pf03: { element: 'Couteau transversal / longitudinal', threat: 'Coupure lors de l\'exploitation ou maintenance', effect: 'Lacération, amputation de doigts', scenario: 'L\'opérateur change la lame sans arrêter et bloquer les entraînements.' },
        pf04: { element: 'Mécanisme d\'alimentation produit', threat: 'Main happée lors de l\'alimentation', effect: 'Fracture, écrasement', scenario: 'Les emballages s\'accumulent devant la machine — l\'opérateur trébuche dans la zone d\'alimentation.' },
        pf05: { element: 'Installation électrique', threat: 'Électrocution', effect: 'Brûlures, décès', scenario: 'La vapeur d\'un joint vapeur endommagé frappe le visage de l\'opérateur.' },
        pf06: { element: 'Vapeurs PVC/PE lors du soudage', threat: 'Inhalation de vapeurs toxiques', effect: 'Maladie respiratoire', scenario: 'Le film plastique forme une accumulation inflammable près des surfaces chaudes.' },
        pf07: { element: 'Bruit de la machine', threat: 'Bruit > 85 dB(A)', effect: 'Perte auditive', scenario: 'L\'opérateur pousse la main dans la zone de soudure lors de l\'élimination d\'un emballage bloqué.' },
      },
    },
    it: {
      name: 'Macchina flow-pack (orizzontale / verticale)',
      threats: {
        pf01: { element: 'Saldatrice trasversale (100–200°C)', threat: 'Ustione da superficie calda', effect: 'Ustione 2°/3° grado', scenario: 'L\'operatore tocca la barra di saldatura calda durante la regolazione con la macchina in funzione.' },
        pf02: { element: 'Rulli alimentazione film', threat: 'Presa / trascinamento tra rulli', effect: 'Schiacciamento / trascinamento dita', scenario: 'Le dita dell\'operatore entrano tra i rulli di alimentazione del film durante l\'infilatura manuale.' },
        pf03: { element: 'Coltello trasversale / longitudinale', threat: 'Taglio durante uso o manutenzione', effect: 'Lacerazione, amputazione dita', scenario: 'L\'operatore cambia la lama senza spegnere e bloccare gli azionamenti.' },
        pf04: { element: 'Meccanismo di alimentazione prodotto', threat: 'Mano trascinata durante alimentazione', effect: 'Frattura, schiacciamento', scenario: 'I pacchi si accumulano davanti alla macchina — l\'operatore inciampa nella zona di alimentazione.' },
        pf05: { element: 'Impianto elettrico', threat: 'Elettrocuzione', effect: 'Ustioni, morte', scenario: 'Il vapore da una guarnizione vapore danneggiata colpisce il viso dell\'operatore.' },
        pf06: { element: 'Vapori PVC/PE durante saldatura', threat: 'Inalazione vapori tossici', effect: 'Malattia respiratoria', scenario: 'Il film plastico forma accumuli infiammabili vicino alle superfici calde.' },
        pf07: { element: 'Rumore macchina confezionatrice', threat: 'Rumore > 85 dB(A)', effect: 'Perdita uditiva', scenario: 'L\'operatore spinge la mano nella zona di saldatura mentre rimuove un pacco bloccato.' },
      },
    },
    es: {
      name: 'Máquina flow-pack (horizontal / vertical)',
      threats: {
        pf01: { element: 'Selladora transversal (100–200°C)', threat: 'Quemadura por superficie caliente', effect: 'Quemadura 2°/3° grado', scenario: 'El operario toca la barra de sellado caliente durante el ajuste con la máquina en marcha.' },
        pf02: { element: 'Rodillos alimentación film', threat: 'Atrapamiento entre rodillos', effect: 'Aplastamiento / arrastre de dedos', scenario: 'Los dedos del operario entran entre los rodillos de alimentación de film durante el enhebrado manual.' },
        pf03: { element: 'Cuchilla transversal / longitudinal', threat: 'Corte durante uso o mantenimiento', effect: 'Laceración, amputación de dedos', scenario: 'El operario cambia la cuchilla sin apagar y bloquear los accionamientos.' },
        pf04: { element: 'Mecanismo de alimentación de producto', threat: 'Mano atrapada durante alimentación', effect: 'Fractura, aplastamiento', scenario: 'Los paquetes se acumulan frente a la máquina — el operario tropieza y cae en la zona de entrada.' },
        pf05: { element: 'Instalación eléctrica', threat: 'Electrocución', effect: 'Quemaduras, muerte', scenario: 'El vapor de una junta de vapor dañada golpea la cara del operario.' },
        pf06: { element: 'Vapores PVC/PE durante sellado', threat: 'Inhalación de vapores tóxicos', effect: 'Enfermedad respiratoria', scenario: 'El film plástico forma acumulaciones inflamables cerca de las superficies calientes.' },
        pf07: { element: 'Ruido de la máquina', threat: 'Ruido > 85 dB(A)', effect: 'Pérdida auditiva', scenario: 'El operario mete la mano en la zona de sellado al despejar un paquete atascado.' },
      },
    },
    cs: {
      name: 'Balicí stroj flow-pack (horizontální / vertikální)',
      threats: {
        pf01: { element: 'Příčná svářečka (100–200°C)', threat: 'Popálenina od horké plochy', effect: 'Popálenina 2./3. stupně', scenario: 'Obsluha se dotýká horké svařovací lišty při seřizování za chodu stroje.' },
        pf02: { element: 'Podávací válce fólie', threat: 'Zachycení / vtažení prstů mezi válci', effect: 'Rozdrcení / vtažení prstů', scenario: 'Prsty obsluhy vstupují mezi podávací válce fólie při ručním navlékání.' },
        pf03: { element: 'Příčný / podélný nůž', threat: 'Řezání při obsluze nebo servisu', effect: 'Řezná rána, amputace prstů', scenario: 'Obsluha mění nůž bez vypnutí a zablokování pohonů.' },
        pf04: { element: 'Mechanismus podávání výrobku', threat: 'Vtažení ruky při podávání', effect: 'Zlomenina, rozdrcení', scenario: 'Obaly se hromadí před strojem — obsluha zakopne a padá do vstupní zóny.' },
        pf05: { element: 'Elektrická instalace', threat: 'Úraz elektrickým proudem', effect: 'Popáleniny, smrt', scenario: 'Pára z poškozeného parního těsnění zasáhne obličej obsluhy.' },
        pf06: { element: 'Výpary PVC/PE při svařování', threat: 'Vdechování toxických výparů', effect: 'Onemocnění dýchacích cest', scenario: 'Plastová fólie tvoří hořlavé hromadění v blízkosti horkých povrchů.' },
        pf07: { element: 'Hluk balicího stroje', threat: 'Hluk > 85 dB(A)', effect: 'Ztráta sluchu', scenario: 'Obsluha strčí ruku do svařovací zóny při odstraňování zablokovaného obalu.' },
      },
    },
  },

  'packaging-pallet': {
    pl: {
      name: 'Owijarka palet automatyczna',
      threats: {
        op01: { element: 'Obrotowe ramię owiarki', threat: 'Uderzenie przez obracające się ramię', effect: 'Ciężkie urazy głowy / tułowia', scenario: 'Operator wchodzi do strefy owiarki podczas cyklu automatycznego — ramię obraca się i uderza.' },
        op02: { element: 'Folia stretch w ruchu', threat: 'Pochwycenie / wciągnięcie przez folię', effect: 'Wciągnięcie ręki / kończyny', scenario: 'Folia stretch nawinięta na rękę operatora przy ręcznym zakładaniu na paletę.' },
        op03: { element: 'Paleta z ładunkiem — wywrotka', threat: 'Przewrócenie ładunku z palety', effect: 'Zmiażdżenie', scenario: 'Paleta z przeciążonym ładunkiem przewraca się przy próbie korekty ustawienia.' },
        op04: { element: 'Instalacja elektryczna', threat: 'Porażenie prądem', effect: 'Oparzenie, śmierć', scenario: 'Silnik napędu ramienia owiarki przegrzewa się przy zablokowanej folii.' },
      },
    },
    en: {
      name: 'Automatic Pallet Wrapper',
      threats: {
        op01: { element: 'Rotating wrapper arm', threat: 'Strike from rotating arm', effect: 'Severe head / torso injuries', scenario: 'Operator enters wrapper zone during automatic cycle — rotating arm strikes.' },
        op02: { element: 'Stretch film in motion', threat: 'Entanglement / drawing-in by film', effect: 'Hand / limb drawn in', scenario: 'Stretch film wraps around operator hand when manually attaching to pallet.' },
        op03: { element: 'Pallet with load — tip-over', threat: 'Load tipping off pallet', effect: 'Crushing', scenario: 'Pallet with overloaded cargo tips when attempting position correction.' },
        op04: { element: 'Electrical installation', threat: 'Electric shock', effect: 'Burns, death', scenario: 'Wrapper arm drive motor overheats when film is jammed.' },
      },
    },
    de: {
      name: 'Automatische Palettenwickelmaschine',
      threats: {
        op01: { element: 'Drehendes Wickelarm', threat: 'Schlag durch drehenden Arm', effect: 'Schwere Kopf-/Rumpfverletzungen', scenario: 'Bediener betritt Wicklerzone während Automatikzyklus — drehendes Arm schlägt zu.' },
        op02: { element: 'Stretchfolie in Bewegung', threat: 'Erfassen / Einziehen durch Folie', effect: 'Hand / Gliedmaße eingezogen', scenario: 'Stretchfolie wickelt sich bei manuellem Aufsetzen auf Palette um Bedienerhand.' },
        op03: { element: 'Palette mit Last — Kippen', threat: 'Umkippen der Last von Palette', effect: 'Zerquetscht', scenario: 'Palette mit überladenem Gut kippt beim Korrekturversuch.' },
        op04: { element: 'Elektrische Anlage', threat: 'Elektrischer Schlag', effect: 'Verbrennungen, Tod', scenario: 'Wicklerarm-Antriebsmotor überhitzt bei blockierter Folie.' },
      },
    },
    fr: {
      name: 'Banderoleuse automatique de palettes',
      threats: {
        op01: { element: 'Bras tournant de la banderoleuse', threat: 'Coup par le bras tournant', effect: 'Blessures graves tête / torse', scenario: 'L\'opérateur entre dans la zone d\'emballage pendant le cycle automatique — le bras tournant frappe.' },
        op02: { element: 'Film étirable en mouvement', threat: 'Entraînement par le film', effect: 'Main / membre happé', scenario: 'Le film étirable s\'enroule autour de la main de l\'opérateur lors de l\'accrochage manuel à la palette.' },
        op03: { element: 'Palette avec charge — renversement', threat: 'Renversement de la charge', effect: 'Écrasement', scenario: 'La palette avec charge surchargée bascule lors de la tentative de correction de position.' },
        op04: { element: 'Installation électrique', threat: 'Électrocution', effect: 'Brûlures, décès', scenario: 'Le moteur d\'entraînement du bras d\'emballage surchauffe quand le film est bloqué.' },
      },
    },
    it: {
      name: 'Avvolgi-pallet automatico',
      threats: {
        op01: { element: 'Braccio rotante avvolgi-pallet', threat: 'Colpo dal braccio rotante', effect: 'Gravi lesioni testa / tronco', scenario: 'L\'operatore entra nella zona avvolgitrice durante il ciclo automatico — il braccio rotante colpisce.' },
        op02: { element: 'Film estensibile in movimento', threat: 'Presa / trascinamento dal film', effect: 'Mano / arto trascinati', scenario: 'Il film estensibile si avvolge attorno alla mano dell\'operatore durante l\'aggancio manuale al pallet.' },
        op03: { element: 'Pallet con carico — ribaltamento', threat: 'Ribaltamento del carico dal pallet', effect: 'Schiacciamento', scenario: 'Il pallet con carico in eccesso si ribalta durante il tentativo di correzione posizione.' },
        op04: { element: 'Impianto elettrico', threat: 'Elettrocuzione', effect: 'Ustioni, morte', scenario: 'Il motore di azionamento del braccio avvolgitore si surriscalda quando il film è bloccato.' },
      },
    },
    es: {
      name: 'Enfardadora automática de palets',
      threats: {
        op01: { element: 'Brazo giratorio enfardadora', threat: 'Golpe por brazo giratorio', effect: 'Lesiones graves cabeza / tronco', scenario: 'El operario entra en la zona de la enfardadora durante el ciclo automático — el brazo giratorio golpea.' },
        op02: { element: 'Film extensible en movimiento', threat: 'Atrapamiento por el film', effect: 'Mano / miembro arrastrado', scenario: 'El film estirable se enrolla alrededor de la mano del operario al fijarlo manualmente al pallet.' },
        op03: { element: 'Palet con carga — vuelco', threat: 'Vuelco de la carga del palet', effect: 'Aplastamiento', scenario: 'El pallet con carga sobrecargada vuelca al intentar corregir la posición.' },
        op04: { element: 'Instalación eléctrica', threat: 'Electrocución', effect: 'Quemaduras, muerte', scenario: 'El motor de accionamiento del brazo enfardador se sobrecalienta cuando el film está atascado.' },
      },
    },
    cs: {
      name: 'Automatický ovíjecí stroj palet',
      threats: {
        op01: { element: 'Otočné rameno ovíječky', threat: 'Úder otočným ramenem', effect: 'Těžká zranění hlavy / trupu', scenario: 'Obsluha vstoupí do zóny ováčky během automatického cyklu — otáčející se rameno udeří.' },
        op02: { element: 'Strečová fólie v pohybu', threat: 'Zachycení / vtažení fólií', effect: 'Vtažení ruky / končetiny', scenario: 'Stretchová fólie se omotá kolem ruky obsluhy při ručním připevňování na paletu.' },
        op03: { element: 'Paleta s nákladem — převrácení', threat: 'Převrácení nákladu z palety', effect: 'Rozdrcení', scenario: 'Paleta s přetíženým nákladem se překotí při pokusu o korekci polohy.' },
        op04: { element: 'Elektrická instalace', threat: 'Úraz elektrickým proudem', effect: 'Popáleniny, smrt', scenario: 'Pohonný motor ramene ováčky se přehřeje při zaseknuté fólii.' },
      },
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // TWORZYWA SZTUCZNE
  // ─────────────────────────────────────────────────────────────────
  'plastics-injection': {
    pl: {
      name: 'Wtryskarka do tworzyw sztucznych',
      threats: {
        in01: { element: 'Forma wtryskowa — zamykanie', threat: 'Gniecenie / zmiażdżenie rąk przy zamykaniu', effect: 'Zmiażdżenie rąk — amputacja', scenario: 'Ręce operatora w strefie formy przy zamykaniu — dochodzi do zgniecenia.' },
        in02: { element: 'Cylinder plastyfikujący (200–400°C)', threat: 'Oparzenie o gorący cylinder', effect: 'Oparzenie II/III stopnia', scenario: 'Operator dotyka cylindra plastyfikującego bez ŚOI przy czyszczeniu resztek tworzywa.' },
        in03: { element: 'Dysza wtrysku (1000–2000 bar)', threat: 'Wytrysk gorącego tworzywa pod ciśnieniem', effect: 'Oparzenie — iniekcja tworzywa w ciało', scenario: 'Ciśnienie wtrysku nie zostało obniżone przed otwarciem dyszy — wytrysk tworzywa.' },
        in04: { element: 'Opary tworzywa (PVC, nylon, ABS)', threat: 'Emisja toksycznych oparów / gazów', effect: 'Zatrucie, nowotwory', scenario: 'Pary z tworzyw sztucznych w zamkniętym pomieszczeniu przekraczają NDS.' },
        in05: { element: 'Instalacja elektryczna / hydrauliczna', threat: 'Porażenie / wytrysk oleju', effect: 'Oparzenie, śmierć', scenario: 'Ciężka forma wysuwa się z zawiesia przy wymianie bez asekuracji.' },
        in06: { element: 'Hałas wtryskiarki', threat: 'Hałas > 85 dB(A)', effect: 'Ubytek słuchu', scenario: 'Operator wchodzi do przestrzeni roboczej przed pełnym zamknięciem osłon.' },
      },
    },
    en: {
      name: 'Plastic Injection Moulding Machine',
      threats: {
        in01: { element: 'Injection mould — closing', threat: 'Crushing / squashing of hands during closing', effect: 'Hand crushing — amputation', scenario: 'Operator\'s hands in mould zone during mould closing — crushing occurs.' },
        in02: { element: 'Plasticising cylinder (200–400°C)', threat: 'Burns from hot cylinder', effect: 'Second/third-degree burns', scenario: 'Operator touches plasticising cylinder without PPE when cleaning plastic residue.' },
        in03: { element: 'Injection nozzle (1000–2000 bar)', threat: 'Ejection of hot plastic under pressure', effect: 'Burns — plastic injection into body', scenario: 'Injection pressure not lowered before opening nozzle — plastic ejection.' },
        in04: { element: 'Plastic fumes (PVC, nylon, ABS)', threat: 'Emission of toxic fumes / gases', effect: 'Poisoning, cancer', scenario: 'Plastic fumes in enclosed room exceed OEL.' },
        in05: { element: 'Electrical / hydraulic system', threat: 'Electric shock / oil injection', effect: 'Burns, death', scenario: 'Heavy mould slips from sling during change without secondary support.' },
        in06: { element: 'Injection moulding machine noise', threat: 'Noise > 85 dB(A)', effect: 'Hearing loss', scenario: 'Operator enters work space before guards are fully closed.' },
      },
    },
    de: {
      name: 'Kunststoff-Spritzgießmaschine',
      threats: {
        in01: { element: 'Spritzgießwerkzeug — Schließen', threat: 'Quetschen beim Schließen', effect: 'Handquetschung — Amputation', scenario: 'Bedienerhände in Werkzeugzone beim Werkzeugschließen — Quetschen tritt auf.' },
        in02: { element: 'Plastifizierzylinder (200–400°C)', threat: 'Verbrennung am heißen Zylinder', effect: 'Verbrennung 2./3. Grades', scenario: 'Bediener berührt Plastifizierzylinder ohne PSA beim Reinigen von Kunststoffresten.' },
        in03: { element: 'Einspritzdüse (1000–2000 bar)', threat: 'Austritt heißen Kunststoffs unter Druck', effect: 'Verbrennung — Kunststoffinjektion in Körper', scenario: 'Einspritzdruck nicht abgesenkt vor Düsenöffnung — Kunststoffeinspritzen.' },
        in04: { element: 'Kunststoffdämpfe (PVC, Nylon, ABS)', threat: 'Emission giftiger Dämpfe / Gase', effect: 'Vergiftung, Krebs', scenario: 'Kunststoffdämpfe in geschlossenem Raum übersteigen MAK.' },
        in05: { element: 'Elektrische / hydraulische Anlage', threat: 'Elektrischer Schlag / Ölstrahl', effect: 'Verbrennungen, Tod', scenario: 'Schweres Werkzeug rutscht beim Wechseln ohne Sicherung aus dem Anschlagmittel.' },
        in06: { element: 'Maschinenlärm', threat: 'Lärm > 85 dB(A)', effect: 'Gehörverlust', scenario: 'Bediener betritt Arbeitsraum bevor Schutzeinrichtungen vollständig geschlossen.' },
      },
    },
    fr: {
      name: 'Presse à injection plastique',
      threats: {
        in01: { element: 'Moule injection — fermeture', threat: 'Écrasement lors de la fermeture', effect: 'Écrasement main — amputation', scenario: 'Les mains de l\'opérateur dans la zone moule lors de la fermeture — écrasement.' },
        in02: { element: 'Fourreau de plastification (200–400°C)', threat: 'Brûlure sur le fourreau chaud', effect: 'Brûlure 2ème/3ème degré', scenario: 'L\'opérateur touche le cylindre de plastification sans EPI lors du nettoyage des résidus.' },
        in03: { element: 'Buse d\'injection (1000–2000 bar)', threat: 'Projection de plastique chaud sous pression', effect: 'Brûlure — injection de plastique dans le corps', scenario: 'La pression d\'injection non réduite avant l\'ouverture de la buse — éjection de plastique.' },
        in04: { element: 'Vapeurs plastique (PVC, nylon, ABS)', threat: 'Émission de vapeurs / gaz toxiques', effect: 'Intoxication, cancer', scenario: 'Les vapeurs plastiques dans le local fermé dépassent la VME.' },
        in05: { element: 'Installation électrique / hydraulique', threat: 'Électrocution / projection d\'huile', effect: 'Brûlures, décès', scenario: 'Le moule lourd glisse de l\'élingue lors du changement sans support secondaire.' },
        in06: { element: 'Bruit de la presse à injection', threat: 'Bruit > 85 dB(A)', effect: 'Perte auditive', scenario: 'L\'opérateur entre dans l\'espace de travail avant que les protecteurs soient complètement fermés.' },
      },
    },
    it: {
      name: 'Pressa a iniezione per materie plastiche',
      threats: {
        in01: { element: 'Stampo iniezione — chiusura', threat: 'Schiacciamento durante la chiusura', effect: 'Schiacciamento mano — amputazione', scenario: 'Le mani dell\'operatore nella zona stampo durante la chiusura — schiacciamento.' },
        in02: { element: 'Cilindro di plastificazione (200–400°C)', threat: 'Ustione dal cilindro caldo', effect: 'Ustione 2°/3° grado', scenario: 'L\'operatore tocca il cilindro di plastificazione senza DPI durante la pulizia dei residui.' },
        in03: { element: 'Ugello di iniezione (1000–2000 bar)', threat: 'Eiezione di plastica calda sotto pressione', effect: 'Ustione — iniezione di plastica nel corpo', scenario: 'La pressione di iniezione non ridotta prima dell\'apertura dell\'ugello — eiezione di plastica.' },
        in04: { element: 'Vapori plastica (PVC, nylon, ABS)', threat: 'Emissione di vapori / gas tossici', effect: 'Avvelenamento, cancro', scenario: 'I fumi plastici nel locale chiuso superano il TLV.' },
        in05: { element: 'Impianto elettrico / idraulico', threat: 'Elettrocuzione / proiezione olio', effect: 'Ustioni, morte', scenario: 'Lo stampo pesante scivola dalla braga durante la sostituzione senza supporto secondario.' },
        in06: { element: 'Rumore pressa a iniezione', threat: 'Rumore > 85 dB(A)', effect: 'Perdita uditiva', scenario: 'L\'operatore entra nello spazio di lavoro prima che le protezioni siano completamente chiuse.' },
      },
    },
    es: {
      name: 'Máquina de inyección de plástico',
      threats: {
        in01: { element: 'Molde inyección — cierre', threat: 'Aplastamiento durante el cierre', effect: 'Aplastamiento mano — amputación', scenario: 'Las manos del operario en la zona de molde durante el cierre — aplastamiento.' },
        in02: { element: 'Cilindro de plastificación (200–400°C)', threat: 'Quemadura por cilindro caliente', effect: 'Quemadura 2°/3° grado', scenario: 'El operario toca el cilindro de plastificación sin EPI al limpiar residuos de plástico.' },
        in03: { element: 'Boquilla de inyección (1000–2000 bar)', threat: 'Proyección de plástico caliente a presión', effect: 'Quemadura — inyección de plástico en cuerpo', scenario: 'Presión de inyección no reducida antes de abrir la tobera — eyección de plástico.' },
        in04: { element: 'Vapores plástico (PVC, nylon, ABS)', threat: 'Emisión de vapores / gases tóxicos', effect: 'Intoxicación, cáncer', scenario: 'Los vapores de plástico en local cerrado superan el VLA.' },
        in05: { element: 'Instalación eléctrica / hidráulica', threat: 'Electrocución / proyección aceite', effect: 'Quemaduras, muerte', scenario: 'El molde pesado se desliza de la eslinga durante el cambio sin soporte secundario.' },
        in06: { element: 'Ruido máquina de inyección', threat: 'Ruido > 85 dB(A)', effect: 'Pérdida auditiva', scenario: 'El operario entra al espacio de trabajo antes de que los protectores estén completamente cerrados.' },
      },
    },
    cs: {
      name: 'Vstřikovací lis na plasty',
      threats: {
        in01: { element: 'Vstřikovací forma — zavírání', threat: 'Drcení při zavírání formy', effect: 'Rozdrcení ruky — amputace', scenario: 'Ruce obsluhy v zóně formy při zavírání — dochází k drcení.' },
        in02: { element: 'Plastifikační válec (200–400°C)', threat: 'Popálenina od horkého válce', effect: 'Popálenina 2./3. stupně', scenario: 'Obsluha se dotýká plastifikačního válce bez OOPP při čištění zbytků plastu.' },
        in03: { element: 'Vstřikovací tryska (1000–2000 bar)', threat: 'Výstřik horkého plastu pod tlakem', effect: 'Popálenina — vstřik plastu do těla', scenario: 'Tlak vstřikování není snížen před otevřením trysky — vstřik plastu.' },
        in04: { element: 'Výpary plastů (PVC, nylon, ABS)', threat: 'Emise toxických výparů / plynů', effect: 'Otrava, rakovina', scenario: 'Výpary z plastů v uzavřené místnosti překračují NPK.' },
        in05: { element: 'Elektrická / hydraulická instalace', threat: 'Úraz proudem / vystřiknutí oleje', effect: 'Popáleniny, smrt', scenario: 'Těžká forma sklouzne z závěsu při výměně bez jištění.' },
        in06: { element: 'Hluk vstřikovacího lisu', threat: 'Hluk > 85 dB(A)', effect: 'Ztráta sluchu', scenario: 'Obsluha vstupuje do pracovního prostoru před úplným zavřením krytů.' },
      },
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // DREWNO
  // ─────────────────────────────────────────────────────────────────
  'wood-circular-saw': {
    pl: {
      name: 'Piła tarczowa formatówka',
      threats: {
        w01: { element: 'Tarcza piły (Ø 250–600 mm)', threat: 'Cięcie / amputacja palców przy podawaniu', effect: 'Amputacja palców / dłoni', scenario: 'Operator podaje deskę ręcznie — palce ślizgają się w kierunku tarczy przy kontakcie z sękiem.' },
        w02: { element: 'Tarcza piły — odrzut (kickback)', threat: 'Odrzut materiału przy zakleszczeniu', effect: 'Ciężkie urazy tułowia i głowy — śmierć', scenario: 'Deska zakleszcza się między tarczą a prowadnicą — odrzut wyrzuca ją z siłą w operatora.' },
        w03: { element: 'Pył drzewny (buk, dąb — kancerogen)', threat: 'Wdychanie kancerogennego pyłu drzewnego', effect: 'Gruczolakorak zatok — choroba zawodowa', scenario: 'Wieloletnia praca bez ochrony dróg oddechowych z pyłem dębowym lub bukowym.' },
        w04: { element: 'Piła tarczowa (typowo 90–105 dB)', threat: 'Hałas impulsowy > 85 dB(A)', effect: 'Trwały ubytek słuchu', scenario: 'Tarcza pęka przy kontakcie z metalowym śrubą ukrytą w drewnie.' },
        w05: { element: 'Iskry / wióry gorące', threat: 'Pożar od iskry w zgromadzonym pyle', effect: 'Pożar zakładu', scenario: 'Operator zmienia tarczę bez wyłączenia i rozładowania bezwładności.' },
        w06: { element: 'Instalacja elektryczna', threat: 'Porażenie prądem', effect: 'Oparzenie, śmierć', scenario: 'Wióry drzewne zapalają się od iskry od przypadkowego kontaktu z metalem.' },
      },
    },
    en: {
      name: 'Circular Panel Saw',
      threats: {
        w01: { element: 'Saw blade (Ø 250–600 mm)', threat: 'Cutting / finger amputation during feed', effect: 'Finger / hand amputation', scenario: 'Operator feeds board by hand — fingers slip towards blade when encountering knot.' },
        w02: { element: 'Saw blade — kickback', threat: 'Kickback of material when jammed', effect: 'Severe torso and head injuries — death', scenario: 'Board jams between blade and fence — kickback launches it into operator.' },
        w03: { element: 'Wood dust (beech, oak — carcinogen)', threat: 'Inhalation of carcinogenic wood dust', effect: 'Nasal adenocarcinoma — occupational disease', scenario: 'Years of work without respiratory protection with oak or beech dust.' },
        w04: { element: 'Circular saw (typically 90–105 dB)', threat: 'Impulse noise > 85 dB(A)', effect: 'Permanent hearing loss', scenario: 'Blade shatters on contact with metal screw hidden in wood.' },
        w05: { element: 'Sparks / hot chips', threat: 'Fire from sparks in accumulated dust', effect: 'Plant fire', scenario: 'Operator changes blade without switching off and dissipating inertia.' },
        w06: { element: 'Electrical installation', threat: 'Electric shock', effect: 'Burns, death', scenario: 'Wood chips ignite from spark during accidental contact with metal.' },
      },
    },
    de: {
      name: 'Kreissäge / Formatkreissäge',
      threats: {
        w01: { element: 'Sägeblatt (Ø 250–600 mm)', threat: 'Schneiden / Fingeramputation beim Vorschub', effect: 'Finger- / Handamputation', scenario: 'Bediener schiebt Brett von Hand — Finger rutschen beim Astknoten zur Säge.' },
        w02: { element: 'Sägeblatt — Rückschlag', threat: 'Rückschlag des Materials bei Klemmung', effect: 'Schwere Rumpf- und Kopfverletzungen — Tod', scenario: 'Brett klemmt sich zwischen Blatt und Anschlag — Rückschlag schleudert es in Bediener.' },
        w03: { element: 'Holzstaub (Buche, Eiche — krebserzeugend)', threat: 'Einatmen krebserzeugenden Holzstaubs', effect: 'Nasennebenhöhlenkarzinom — Berufskrankheit', scenario: 'Jahrelange Arbeit ohne Atemschutz mit Eichen- oder Buchenstaub.' },
        w04: { element: 'Kreissäge (typisch 90–105 dB)', threat: 'Impulslärm > 85 dB(A)', effect: 'Dauerhafter Gehörverlust', scenario: 'Blatt zerbricht beim Kontakt mit im Holz versteckter Metallschraube.' },
        w05: { element: 'Funken / heiße Späne', threat: 'Brand durch Funken im Staub', effect: 'Betriebsbrand', scenario: 'Bediener wechselt Blatt ohne Abschalten und Abbau der Massenträgheit.' },
        w06: { element: 'Elektrische Anlage', threat: 'Elektrischer Schlag', effect: 'Verbrennungen, Tod', scenario: 'Holzspäne entzünden sich durch Funken bei versehentlichem Metallkontakt.' },
      },
    },
    fr: {
      name: 'Scie circulaire à format',
      threats: {
        w01: { element: 'Lame de scie (Ø 250–600 mm)', threat: 'Coupure / amputation lors de l\'avance', effect: 'Amputation doigts / main', scenario: 'L\'opérateur pousse la planche à la main — les doigts glissent vers la lame au nœud.' },
        w02: { element: 'Lame de scie — rebond (kickback)', threat: 'Rebond de la matière lors d\'un blocage', effect: 'Blessures graves torse et tête — décès', scenario: 'La planche se coince entre la lame et le guide — le recul la propulse sur l\'opérateur.' },
        w03: { element: 'Poussière de bois (hêtre, chêne — cancérigène)', threat: 'Inhalation de poussière cancérigène', effect: 'Adénocarcinome des sinus — maladie professionnelle', scenario: 'Des années de travail sans protection respiratoire avec de la poussière de chêne ou hêtre.' },
        w04: { element: 'Scie circulaire (typiquement 90–105 dB)', threat: 'Bruit impulsionnel > 85 dB(A)', effect: 'Perte auditive permanente', scenario: 'La lame éclate au contact d\'une vis métallique cachée dans le bois.' },
        w05: { element: 'Étincelles / copeaux chauds', threat: 'Incendie par étincelles dans poussière', effect: 'Incendie d\'établissement', scenario: 'Les copeaux chauds enflamment l\'accumulation de poussière de bois lors du sciage sans aspiration.' },
        w06: { element: 'Installation électrique', threat: 'Électrocution', effect: 'Brûlures, décès', scenario: 'Les copeaux de bois s\'enflamment par une étincelle lors d\'un contact accidentel avec du métal.' },
      },
    },
    it: {
      name: 'Sega circolare a panelli (squadratrice)',
      threats: {
        w01: { element: 'Lama della sega (Ø 250–600 mm)', threat: 'Taglio / amputazione durante l\'avanzamento', effect: 'Amputazione dita / mano', scenario: 'L\'operatore alimenta la tavola a mano — le dita scivolano verso la lama al nodo.' },
        w02: { element: 'Lama — contraccolpo (kickback)', threat: 'Contraccolpo del materiale se bloccato', effect: 'Gravi lesioni torso e testa — morte', scenario: 'La tavola si inceppa tra la lama e la guida — il contraccolpo la lancia sull\'operatore.' },
        w03: { element: 'Polvere di legno (faggio, quercia — cancerogeno)', threat: 'Inalazione di polvere cancerogena', effect: 'Adenocarcinoma dei seni — malattia professionale', scenario: 'Anni di lavoro senza protezione respiratoria con polvere di quercia o faggio.' },
        w04: { element: 'Sega circolare (tipicamente 90–105 dB)', threat: 'Rumore impulsivo > 85 dB(A)', effect: 'Perdita uditiva permanente', scenario: 'La lama si rompe al contatto con un bullone metallico nascosto nel legno.' },
        w05: { element: 'Scintille / trucioli caldi', threat: 'Incendio da scintille nella polvere', effect: 'Incendio impianto', scenario: 'L\'operatore cambia la lama senza spegnerla e dissipare l\'inerzia.' },
        w06: { element: 'Impianto elettrico', threat: 'Elettrocuzione', effect: 'Ustioni, morte', scenario: 'I trucioli di legno prendono fuoco da una scintilla durante il contatto accidentale con metallo.' },
      },
    },
    es: {
      name: 'Sierra circular de paneles (seccionadora)',
      threats: {
        w01: { element: 'Hoja de sierra (Ø 250–600 mm)', threat: 'Corte / amputación durante avance', effect: 'Amputación dedos / mano', scenario: 'El operario alimenta la tabla a mano — los dedos se deslizan hacia la hoja al encontrar un nudo.' },
        w02: { element: 'Hoja — retroceso (kickback)', threat: 'Retroceso del material si se atasca', effect: 'Lesiones graves tronco y cabeza — muerte', scenario: 'La tabla se atasca entre la hoja y la guía — el contragolpe la lanza sobre el operario.' },
        w03: { element: 'Polvo de madera (haya, roble — cancerígeno)', threat: 'Inhalación de polvo cancerígeno', effect: 'Adenocarcinoma de senos — enfermedad profesional', scenario: 'Años de trabajo sin protección respiratoria con polvo de roble o haya.' },
        w04: { element: 'Sierra circular (típicamente 90–105 dB)', threat: 'Ruido impulsivo > 85 dB(A)', effect: 'Pérdida auditiva permanente', scenario: 'La hoja se rompe al contacto con un tornillo metálico oculto en la madera.' },
        w05: { element: 'Chispas / virutas calientes', threat: 'Incendio por chispas en polvo', effect: 'Incendio de instalación', scenario: 'El operario cambia la hoja sin apagarla y disipar la inercia.' },
        w06: { element: 'Instalación eléctrica', threat: 'Electrocución', effect: 'Quemaduras, muerte', scenario: 'Las virutas de madera se inflaman por una chispa durante el contacto accidental con metal.' },
      },
    },
    cs: {
      name: 'Formátovací pila',
      threats: {
        w01: { element: 'Pilový kotouč (Ø 250–600 mm)', threat: 'Řezání / amputace prstů při podávání', effect: 'Amputace prstů / ruky', scenario: 'Obsluha podává desku ručně — prsty se klouzají směrem k listu při kontaktu se sukem.' },
        w02: { element: 'Pilový kotouč — zpětný vrh', threat: 'Zpětný vrh materiálu při vzpříčení', effect: 'Těžká zranění trupu a hlavy — smrt', scenario: 'Deska se zaklesne mezi list a vodítko — zpětný ráz ji vymrští do obsluhy.' },
        w03: { element: 'Dřevěný prach (buk, dub — karcinogen)', threat: 'Vdechování karcinogenního dřevěného prachu', effect: 'Adenokarcinom dutin — nemoc z povolání', scenario: 'Roky práce bez ochrany dýchání s prachem dubu nebo buku.' },
        w04: { element: 'Kotoučová pila (typicky 90–105 dB)', threat: 'Impulsní hluk > 85 dB(A)', effect: 'Trvalá ztráta sluchu', scenario: 'List se rozbije při kontaktu s kovovým šroubem skrytým v dřevu.' },
        w05: { element: 'Jiskry / horké třísky', threat: 'Požár od jisker v nahromaděném prachu', effect: 'Požár závodu', scenario: 'Obsluha mění list bez vypnutí a rozptýlení setrvačnosti.' },
        w06: { element: 'Elektrická instalace', threat: 'Úraz elektrickým proudem', effect: 'Popáleniny, smrt', scenario: 'Dřevěné třísky se vznítí jiskrou při náhodném kontaktu s kovem.' },
      },
    },
  },

  'wood-cnc': {
    pl: {
      name: 'CNC do drewna — router / nesting',
      threats: {
        wc01: { element: 'Wrzeciono frezarskie (do 24 000 obr/min)', threat: 'Wyrzucenie narzędzia przy pęknięciu', effect: 'Urazy od wyrzuconego narzędzia', scenario: 'Narzędzie z ukrytym pęknięciem zmęczeniowym wylatuje przy 24 000 obr/min.' },
        wc02: { element: 'Stół próżniowy — utrata próżni', threat: 'Wyrzucenie płyty przy utracie próżni', effect: 'Urazy od wyrzuconego materiału', scenario: 'Utrata podciśnienia stołu przy awarii pompy — płyta wylatuje w kierunku głowicy.' },
        wc03: { element: 'Napędy osi X/Y/Z (brama gantry)', threat: 'Gniecenie przy ruchu bramy', effect: 'Zmiażdżenie kończyny', scenario: 'Operator stoi pod portalem bramy podczas ruchu osi Y przy serwisie.' },
        wc04: { element: 'Pył MDF (formaldehyd)', threat: 'Wdychanie pyłu MDF i formaldehydu', effect: 'Choroby dróg oddechowych, nowotwory', scenario: 'Pył drzewny kumuluje się w napędach i powoduje pożar od przegrzania silnika.' },
        wc05: { element: 'Hałas wrzeciona CNC', threat: 'Hałas > 85 dB(A)', effect: 'Ubytek słuchu', scenario: 'Operator otwiera osłony podczas cyklu automatycznego bez wyłączenia.' },
      },
    },
    en: {
      name: 'Wood CNC Router / Nesting Machine',
      threats: {
        wc01: { element: 'Milling spindle (up to 24,000 rpm)', threat: 'Tool ejection on breakage', effect: 'Injuries from ejected tool', scenario: 'Tool with hidden fatigue crack flies off at 24,000 rpm.' },
        wc02: { element: 'Vacuum table — loss of vacuum', threat: 'Board ejection on vacuum loss', effect: 'Injuries from ejected material', scenario: 'Vacuum table loses suction on pump failure — sheet flies towards spindle.' },
        wc03: { element: 'X/Y/Z axis drives (gantry)', threat: 'Crushing from gantry movement', effect: 'Limb crushing', scenario: 'Operator stands under gantry portal during Y-axis movement during service.' },
        wc04: { element: 'MDF dust (formaldehyde)', threat: 'Inhalation of MDF dust and formaldehyde', effect: 'Respiratory disease, cancer', scenario: 'Wood dust accumulates in drives and causes fire from motor overheating.' },
        wc05: { element: 'CNC spindle noise', threat: 'Noise > 85 dB(A)', effect: 'Hearing loss', scenario: 'Operator opens guards during automatic cycle without switching off.' },
      },
    },
    de: {
      name: 'Holz-CNC-Router / Nestingmaschine',
      threats: {
        wc01: { element: 'Frässpindel (bis 24.000 U/min)', threat: 'Werkzeugauswerfen bei Bruch', effect: 'Verletzungen durch ausgeworfenes Werkzeug', scenario: 'Werkzeug mit verstecktem Ermüdungsriss schleudert bei 24.000 U/min.' },
        wc02: { element: 'Vakuumtisch — Vakuumverlust', threat: 'Plattenwurf bei Vakuumverlust', effect: 'Verletzungen durch ausgeworfenes Material', scenario: 'Vakuumtisch verliert Unterdruck bei Pumpenausfall — Platte schleudert zur Spindel.' },
        wc03: { element: 'X/Y/Z-Achsantriebe (Gantry)', threat: 'Quetschung durch Portalbewegung', effect: 'Gliedmaßenquetschung', scenario: 'Bediener steht bei Wartung unter Gantry-Portal während Y-Achsenbewegung.' },
        wc04: { element: 'MDF-Staub (Formaldehyd)', threat: 'Einatmen von MDF-Staub und Formaldehyd', effect: 'Atemwegserkrankung, Krebs', scenario: 'Holzstaub sammelt sich in Antrieben und verursacht Brand durch Motorüberhitzung.' },
        wc05: { element: 'CNC-Spindellärm', threat: 'Lärm > 85 dB(A)', effect: 'Gehörverlust', scenario: 'Bediener öffnet Schutzeinrichtungen während Automatikzyklus ohne Abschalten.' },
      },
    },
    fr: {
      name: 'CNC bois — routeur / nesting',
      threats: {
        wc01: { element: 'Broche de fraisage (jusqu\'à 24 000 tr/min)', threat: 'Projection d\'outil à la rupture', effect: 'Blessures par projection d\'outil', scenario: 'L\'outil avec une fissure cachée se brise à 24 000 tr/min et est projeté hors de la machine.' },
        wc02: { element: 'Table à dépression — perte de vide', threat: 'Projection de panneau en cas de perte de vide', effect: 'Blessures par projection de matière', scenario: 'La table à vide perd l\'aspiration lors d\'une panne de pompe — la plaque vole vers la broche.' },
        wc03: { element: 'Axes X/Y/Z (portique)', threat: 'Écrasement par mouvement portique', effect: 'Écrasement de membre', scenario: 'L\'opérateur se tient sous le portique du portail lors du mouvement d\'axe Y pendant la maintenance.' },
        wc04: { element: 'Poussière MDF (formaldéhyde)', threat: 'Inhalation poussière MDF et formaldéhyde', effect: 'Maladie respiratoire, cancer', scenario: 'La poussière de bois s\'accumule dans les entraînements et provoque un incendie par surchauffe du moteur.' },
        wc05: { element: 'Bruit de la broche CNC', threat: 'Bruit > 85 dB(A)', effect: 'Perte auditive', scenario: 'L\'opérateur ouvre les protecteurs pendant le cycle automatique sans arrêt.' },
      },
    },
    it: {
      name: 'CNC per legno — router / nesting',
      threats: {
        wc01: { element: 'Mandrino fresatrice (fino a 24.000 giri/min)', threat: 'Proiezione utensile alla rottura', effect: 'Lesioni da utensile proiettato', scenario: 'L\'utensile con cricca da fatica nascosta vola via a 24.000 giri/min.' },
        wc02: { element: 'Piano a vuoto — perdita del vuoto', threat: 'Proiezione pannello per perdita vuoto', effect: 'Lesioni da materiale proiettato', scenario: 'La tavola a vuoto perde l\'aspirazione al guasto della pompa — il foglio vola verso il mandrino.' },
        wc03: { element: 'Assi X/Y/Z (portale gantry)', threat: 'Schiacciamento dal movimento portale', effect: 'Schiacciamento di arto', scenario: 'L\'operatore si trova sotto il portale a ponte durante il movimento dell\'asse Y durante la manutenzione.' },
        wc04: { element: 'Polvere MDF (formaldeide)', threat: 'Inalazione polvere MDF e formaldeide', effect: 'Malattia respiratoria, cancro', scenario: 'La polvere di legno si accumula negli azionamenti e causa incendio per surriscaldamento del motore.' },
        wc05: { element: 'Rumore mandrino CNC', threat: 'Rumore > 85 dB(A)', effect: 'Perdita uditiva', scenario: 'L\'operatore apre le protezioni durante il ciclo automatico senza spegnimento.' },
      },
    },
    es: {
      name: 'CNC madera — router / nesting',
      threats: {
        wc01: { element: 'Husillo fresador (hasta 24.000 rpm)', threat: 'Proyección de herramienta al romperse', effect: 'Lesiones por herramienta proyectada', scenario: 'La herramienta con grieta de fatiga oculta sale disparada a 24.000 rpm.' },
        wc02: { element: 'Mesa de vacío — pérdida de vacío', threat: 'Proyección de tablero por pérdida de vacío', effect: 'Lesiones por material proyectado', scenario: 'La mesa de vacío pierde succión al fallo de la bomba — la chapa vuela hacia el husillo.' },
        wc03: { element: 'Ejes X/Y/Z (pórtico gantry)', threat: 'Aplastamiento por movimiento del pórtico', effect: 'Aplastamiento de miembro', scenario: 'El operario se encuentra bajo el pórtico del portal durante el movimiento del eje Y en servicio.' },
        wc04: { element: 'Polvo MDF (formaldehído)', threat: 'Inhalación polvo MDF y formaldehído', effect: 'Enfermedad respiratoria, cáncer', scenario: 'El polvo de madera se acumula en los accionamientos y causa incendio por sobrecalentamiento del motor.' },
        wc05: { element: 'Ruido husillo CNC', threat: 'Ruido > 85 dB(A)', effect: 'Pérdida auditiva', scenario: 'El operario abre los protectores durante el ciclo automático sin apagarlo.' },
      },
    },
    cs: {
      name: 'CNC na dřevo — router / nesting',
      threats: {
        wc01: { element: 'Frézovací vřeteno (do 24 000 ot/min)', threat: 'Vymrštění nástroje při lomu', effect: 'Zranění vymrštěným nástrojem', scenario: 'Nástroj se skrytou únavovou trhlinou vyletí při 24 000 ot./min.' },
        wc02: { element: 'Vakuový stůl — ztráta vakua', threat: 'Vymrštění desky při ztrátě vakua', effect: 'Zranění vymrštěným materiálem', scenario: 'Vakuový stůl ztrácí podtlak při poruše čerpadla — deska letí směrem k vřetenu.' },
        wc03: { element: 'Pohony os X/Y/Z (portálový jeřáb)', threat: 'Drcení pohybem portálu', effect: 'Rozdrcení končetiny', scenario: 'Obsluha stojí pod portálem portálu při pohybu osy Y při servisu.' },
        wc04: { element: 'Prach MDF (formaldehyd)', threat: 'Vdechování prachu MDF a formaldehydu', effect: 'Onemocnění dýchacích cest, rakovina', scenario: 'Dřevěný prach se hromadí v pohonech a způsobuje požár přehřátím motoru.' },
        wc05: { element: 'Hluk vřetena CNC', threat: 'Hluk > 85 dB(A)', effect: 'Ztráta sluchu', scenario: 'Obsluha otevře kryty během automatického cyklu bez vypnutí.' },
      },
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // PRZEMYSŁ SPOŻYWCZY
  // ─────────────────────────────────────────────────────────────────
  'food-mixer': {
    pl: {
      name: 'Mieszalnik przemysłowy (kocioł warzelny)',
      threats: {
        fo01: { element: 'Mieszadło / agitator w ruchu', threat: 'Pochwycenie / wciągnięcie kończyny przez mieszadło', effect: 'Amputacja — śmierć', scenario: 'Operator sięga do wnętrza kotła przy obracającym się mieszadle — pochwycenie ręki.' },
        fo02: { element: 'Gorąca powierzchnia kotła (> 60°C)', threat: 'Oparzenie o gorący kocioł / parę', effect: 'Oparzenie II/III stopnia', scenario: 'Operator dotyka gorącej powierzchni kotła bez rękawic przy kontroli temperatury.' },
        fo03: { element: 'Para wodna / aerozol z gotowania', threat: 'Oparzenie parą przy otwieraniu pokrywy', effect: 'Oparzenie dróg oddechowych, twarzy', scenario: 'Para wyrywa się gwałtownie przy przedwczesnym otwarciu pokrywy pod ciśnieniem.' },
        fo04: { element: 'Powierzchnie kontaktu z żywnością', threat: 'Skażenie mikrobiologiczne żywności', effect: 'Zatrucie pokarmowe', scenario: 'Środki czyszczące reagują z resztkami produktu tworząc szkodliwe opary.' },
        fo05: { element: 'Środki myjące / dezynfekcyjne (NaOH, HNO3)', threat: 'Oparzenie chemiczne przy CIP', effect: 'Oparzenie oczu i skóry', scenario: 'Wejście do kotła bez wyłączenia i blokady napędu mieszadła — ryzyko uruchomienia.' },
        fo06: { element: 'Instalacja elektryczna w strefie mokrej', threat: 'Porażenie prądem', effect: 'Oparzenie, śmierć', scenario: 'Kocioł przewraca się przy próbie przechylenia bez asekuracji.' },
      },
    },
    en: {
      name: 'Industrial Mixer (cooking kettle)',
      threats: {
        fo01: { element: 'Mixer / agitator in motion', threat: 'Limb entanglement / drawing-in by mixer', effect: 'Amputation — death', scenario: 'Operator reaches inside kettle while agitator is rotating — hand drawn in.' },
        fo02: { element: 'Hot kettle surface (> 60°C)', threat: 'Burns from hot kettle / steam', effect: 'Second/third-degree burns', scenario: 'Operator touches hot kettle surface without gloves when checking temperature.' },
        fo03: { element: 'Steam / cooking aerosol', threat: 'Steam burns when opening lid', effect: 'Respiratory tract and facial burns', scenario: 'Steam violently escapes when lid opened prematurely under pressure.' },
        fo04: { element: 'Food contact surfaces', threat: 'Microbiological food contamination', effect: 'Food poisoning', scenario: 'Cleaning agents react with product residue creating harmful fumes.' },
        fo05: { element: 'Cleaning / disinfection agents (NaOH, HNO3)', threat: 'Chemical burns during CIP', effect: 'Eye and skin burns', scenario: 'Entering kettle without switching off and locking agitator drive — start-up risk.' },
        fo06: { element: 'Electrical installation in wet area', threat: 'Electric shock', effect: 'Burns, death', scenario: 'Kettle tips over when attempting tilting without secondary support.' },
      },
    },
    de: {
      name: 'Industriemischer (Kochkessel)',
      threats: {
        fo01: { element: 'Rührwerk / Agitator in Bewegung', threat: 'Erfassen / Einziehen durch Rührwerk', effect: 'Amputation — Tod', scenario: 'Bediener greift in Kessel bei drehendem Rührer — Hand wird hineingezogen.' },
        fo02: { element: 'Heiße Kesseloberfläche (> 60°C)', threat: 'Verbrennung am heißen Kessel / Dampf', effect: 'Verbrennung 2./3. Grades', scenario: 'Bediener berührt heiße Kesseloberfläche ohne Handschuhe beim Temperaturprüfen.' },
        fo03: { element: 'Dampf / Kochaerosol', threat: 'Dampfverbrennung beim Öffnen des Deckels', effect: 'Atemwege- und Gesichtsverbrennung', scenario: 'Dampf entweicht heftig bei verfrühtem Öffnen des Deckels unter Druck.' },
        fo04: { element: 'Lebensmittelkontaktflächen', threat: 'Mikrobiologische Lebensmittelkontamination', effect: 'Lebensmittelvergiftung', scenario: 'Reinigungsmittel reagiert mit Produktrückständen und bildet schädliche Dämpfe.' },
        fo05: { element: 'Reinigungs- / Desinfektionsmittel (NaOH, HNO3)', threat: 'Chemische Verbrennung bei CIP', effect: 'Augen- und Hautverbrennung', scenario: 'Betreten des Kessels ohne Abschalten und Arretieren des Rührerantriebs — Anlaufrisiko.' },
        fo06: { element: 'Elektrische Anlage im Nassbereich', threat: 'Elektrischer Schlag', effect: 'Verbrennungen, Tod', scenario: 'Kessel kippt beim Kippversuch ohne Sicherung um.' },
      },
    },
    fr: {
      name: 'Mélangeur industriel (cuve de cuisson)',
      threats: {
        fo01: { element: 'Agitateur / mélangeur en mouvement', threat: 'Entraînement / happement par agitateur', effect: 'Amputation — décès', scenario: 'L\'opérateur atteint l\'intérieur de la cuve pendant la rotation de l\'agitateur — main entraînée.' },
        fo02: { element: 'Surface chaude de la cuve (> 60°C)', threat: 'Brûlure sur cuve chaude / vapeur', effect: 'Brûlure 2ème/3ème degré', scenario: 'L\'opérateur touche la surface chaude de la cuve sans gants lors du contrôle de température.' },
        fo03: { element: 'Vapeur / aérosol de cuisson', threat: 'Brûlure vapeur lors de l\'ouverture du couvercle', effect: 'Brûlure voies respiratoires et visage', scenario: 'La vapeur s\'échappe violemment lors de l\'ouverture prématurée du couvercle sous pression.' },
        fo04: { element: 'Surfaces contact alimentaire', threat: 'Contamination microbiologique aliments', effect: 'Intoxication alimentaire', scenario: 'Les agents nettoyants réagissent avec les résidus de produit créant des vapeurs nocives.' },
        fo05: { element: 'Produits nettoyants / désinfectants (NaOH, HNO3)', threat: 'Brûlure chimique lors du NEP', effect: 'Brûlure yeux et peau', scenario: 'Entrée dans la cuve sans arrêt et blocage de l\'entraînement de l\'agitateur — risque de démarrage.' },
        fo06: { element: 'Installation électrique zone humide', threat: 'Électrocution', effect: 'Brûlures, décès', scenario: 'La cuve se renverse lors d\'une tentative de basculement sans support secondaire.' },
      },
    },
    it: {
      name: 'Miscelatore industriale (caldaia di cottura)',
      threats: {
        fo01: { element: 'Agitatore / miscelatore in movimento', threat: 'Presa / trascinamento dall\'agitatore', effect: 'Amputazione — morte', scenario: 'L\'operatore raggiunge l\'interno del calderone mentre l\'agitatore ruota — mano trascinata dentro.' },
        fo02: { element: 'Superficie calda caldaia (> 60°C)', threat: 'Ustione da caldaia calda / vapore', effect: 'Ustione 2°/3° grado', scenario: 'L\'operatore tocca la superficie calda del calderone senza guanti durante il controllo della temperatura.' },
        fo03: { element: 'Vapore / aerosol di cottura', threat: 'Ustione da vapore all\'apertura del coperchio', effect: 'Ustione vie respiratorie e viso', scenario: 'Il vapore fuoriesce violentemente quando il coperchio viene aperto prematuramente sotto pressione.' },
        fo04: { element: 'Superfici a contatto con alimenti', threat: 'Contaminazione microbiologica alimenti', effect: 'Intossicazione alimentare', scenario: 'I detergenti reagiscono con i residui del prodotto creando vapori nocivi.' },
        fo05: { element: 'Agenti detergenti / disinfettanti (NaOH, HNO3)', threat: 'Ustione chimica durante CIP', effect: 'Ustione occhi e pelle', scenario: 'Accesso al calderone senza spegnimento e blocco dell\'azionamento dell\'agitatore — rischio avviamento.' },
        fo06: { element: 'Impianto elettrico in zona umida', threat: 'Elettrocuzione', effect: 'Ustioni, morte', scenario: 'Il calderone si ribalta durante il tentativo di inclinazione senza supporto secondario.' },
      },
    },
    es: {
      name: 'Mezclador industrial (caldera de cocción)',
      threats: {
        fo01: { element: 'Agitador / mezclador en movimiento', threat: 'Atrapamiento por el agitador', effect: 'Amputación — muerte', scenario: 'El operario alcanza el interior del caldero mientras el agitador rota — mano arrastrada.' },
        fo02: { element: 'Superficie caliente caldera (> 60°C)', threat: 'Quemadura por caldera caliente / vapor', effect: 'Quemadura 2°/3° grado', scenario: 'El operario toca la superficie caliente del caldero sin guantes al verificar la temperatura.' },
        fo03: { element: 'Vapor / aerosol de cocción', threat: 'Quemadura por vapor al abrir la tapa', effect: 'Quemadura vías respiratorias y cara', scenario: 'El vapor escapa violentamente al abrir la tapa prematuramente bajo presión.' },
        fo04: { element: 'Superficies contacto alimentario', threat: 'Contaminación microbiológica alimentos', effect: 'Intoxicación alimentaria', scenario: 'Los agentes limpiadores reaccionan con residuos del producto creando vapores nocivos.' },
        fo05: { element: 'Agentes limpieza / desinfección (NaOH, HNO3)', threat: 'Quemadura química durante CIP', effect: 'Quemadura ojos y piel', scenario: 'Acceso al caldero sin apagar y bloquear el accionamiento del agitador — riesgo de arranque.' },
        fo06: { element: 'Instalación eléctrica zona húmeda', threat: 'Electrocución', effect: 'Quemaduras, muerte', scenario: 'El caldero vuelca al intentar inclinarlo sin soporte secundario.' },
      },
    },
    cs: {
      name: 'Průmyslový mixér (varný kotel)',
      threats: {
        fo01: { element: 'Míchadlo / agitátor v pohybu', threat: 'Zachycení / vtažení končetiny míchadlem', effect: 'Amputace — smrt', scenario: 'Obsluha sahá do kotle při otáčejícím se míchadle — ruka je vtažena.' },
        fo02: { element: 'Horká povrch kotle (> 60°C)', threat: 'Popálenina od horkého kotle / páry', effect: 'Popálenina 2./3. stupně', scenario: 'Obsluha se dotýká horké povrchu kotle bez rukavic při kontrole teploty.' },
        fo03: { element: 'Pára / aerosol z vaření', threat: 'Popálenina párou při otevírání víka', effect: 'Popálenina dýchacích cest a obličeje', scenario: 'Pára prudce uniká při předčasném otevření víka pod tlakem.' },
        fo04: { element: 'Povrchy v kontaktu s potravinami', threat: 'Mikrobiologická kontaminace potravin', effect: 'Otrava jídlem', scenario: 'Čisticí prostředky reagují se zbytky produktu a vytvářejí škodlivé výpary.' },
        fo05: { element: 'Čisticí / dezinfekční prostředky (NaOH, HNO3)', threat: 'Chemická popálenina při CIP', effect: 'Popálenina očí a kůže', scenario: 'Vstup do kotle bez vypnutí a zablokování pohonu míchadla — riziko spuštění.' },
        fo06: { element: 'Elektrická instalace v mokré zóně', threat: 'Úraz elektrickým proudem', effect: 'Popáleniny, smrt', scenario: 'Kotel se překotí při pokusu o naklonění bez jištění.' },
      },
    },
  },

  'food-slicer': {
    pl: {
      name: 'Krajalnica przemysłowa (wędliny / sery)',
      threats: {
        fs01: { element: 'Nóż / tarcza tnąca (Ø 150–400 mm)', threat: 'Cięcie / amputacja palców przy podawaniu', effect: 'Amputacja palców — utrata krwi', scenario: 'Palce operatora zbliżają się do tarczy tnącej przy ręcznym prowadzeniu produktu.' },
        fs02: { element: 'Mechanizm posuwu / podajnik', threat: 'Wciągnięcie palców przez mechanizm posuwowy', effect: 'Zmiażdżenie / amputacja', scenario: 'Ręka operatora wchodzi do mechanizmu posuwu przy usuwaniu zakleszczonego produktu.' },
        fs03: { element: 'Nóż przy demontażu do mycia', threat: 'Skaleczenie przy demontażu', effect: 'Skaleczenie — utrata krwi', scenario: 'Operator demontuje tarczę tnącą bez rękawic do cięcia — skaleczenie o ostrą krawędź.' },
        fs04: { element: 'Powierzchnie kontaktu z żywnością', threat: 'Skażenie mikrobiologiczne produktu', effect: 'Zatrucie (Listeria, Salmonella)', scenario: 'Mycie wysokociśnieniową wodą w pobliżu elektrycz­nych komponentów bez wyłączenia.' },
      },
    },
    en: {
      name: 'Industrial Slicer (meat / cheese)',
      threats: {
        fs01: { element: 'Cutting knife / blade (Ø 150–400 mm)', threat: 'Cutting / finger amputation during feed', effect: 'Finger amputation — blood loss', scenario: 'Operator\'s fingers approach cutting blade when manually guiding product.' },
        fs02: { element: 'Feed mechanism / infeed', threat: 'Finger drawing-in by feed mechanism', effect: 'Crushing / amputation', scenario: 'Operator\'s hand enters feed mechanism when removing jammed product.' },
        fs03: { element: 'Knife during dismantling for cleaning', threat: 'Laceration during dismantling', effect: 'Laceration — blood loss', scenario: 'Operator dismounts cutting blade without cut-resistant gloves — cut on sharp edge.' },
        fs04: { element: 'Food contact surfaces', threat: 'Microbiological product contamination', effect: 'Poisoning (Listeria, Salmonella)', scenario: 'High-pressure washing near electrical components without switching off.' },
      },
    },
    de: {
      name: 'Industrieschneidemaschine (Fleisch / Käse)',
      threats: {
        fs01: { element: 'Schneidmesser / Scheibe (Ø 150–400 mm)', threat: 'Schneiden / Fingeramputation beim Einführen', effect: 'Fingeramputation — Blutverlust', scenario: 'Bedienerfinger nähern sich Schneidscheibe beim manuellen Produktführen.' },
        fs02: { element: 'Vorschubmechanismus / Einschub', threat: 'Fingereinzug durch Vorschub', effect: 'Quetschung / Amputation', scenario: 'Bedienhand gelangt in Vorschubmechanismus beim Entfernen blockierter Produkte.' },
        fs03: { element: 'Messer beim Demontieren zum Reinigen', threat: 'Schnittverletzung beim Demontieren', effect: 'Schnittverletzung — Blutverlust', scenario: 'Bediener demontiert Schneidscheibe ohne schnittfeste Handschuhe — Schnitt an scharfer Kante.' },
        fs04: { element: 'Lebensmittelkontaktflächen', threat: 'Mikrobiologische Produktkontamination', effect: 'Vergiftung (Listeria, Salmonella)', scenario: 'Hochdruckwaschen in der Nähe elektrischer Komponenten ohne Abschalten.' },
      },
    },
    fr: {
      name: 'Trancheuse industrielle (charcuterie / fromage)',
      threats: {
        fs01: { element: 'Couteau / disque tranchant (Ø 150–400 mm)', threat: 'Coupure / amputation lors de l\'alimentation', effect: 'Amputation doigts — perte de sang', scenario: 'Les doigts de l\'opérateur approchent la lame de coupe lors du guidage manuel du produit.' },
        fs02: { element: 'Mécanisme d\'avance / alimentation', threat: 'Entraînement des doigts par mécanisme d\'avance', effect: 'Écrasement / amputation', scenario: 'La main de l\'opérateur entre dans le mécanisme d\'alimentation lors du retrait d\'un produit bloqué.' },
        fs03: { element: 'Couteau lors du démontage pour nettoyage', threat: 'Coupure lors du démontage', effect: 'Lacération — perte de sang', scenario: 'L\'opérateur démonte la lame de coupe sans gants anti-coupures — coupure sur arête vive.' },
        fs04: { element: 'Surfaces contact alimentaire', threat: 'Contamination microbiologique du produit', effect: 'Intoxication (Listeria, Salmonella)', scenario: 'Lavage haute pression près des composants électriques sans arrêt.' },
      },
    },
    it: {
      name: 'Affettatrice industriale (salumi / formaggi)',
      threats: {
        fs01: { element: 'Coltello / disco di taglio (Ø 150–400 mm)', threat: 'Taglio / amputazione dita durante alimentazione', effect: 'Amputazione dita — perdita di sangue', scenario: 'Le dita dell\'operatore si avvicinano alla lama di taglio durante la guida manuale del prodotto.' },
        fs02: { element: 'Meccanismo di avanzamento / alimentatore', threat: 'Trascinamento dita dal meccanismo di avanzamento', effect: 'Schiacciamento / amputazione', scenario: 'La mano dell\'operatore entra nel meccanismo di avanzamento durante la rimozione del prodotto bloccato.' },
        fs03: { element: 'Coltello durante smontaggio per pulizia', threat: 'Lacerazione durante lo smontaggio', effect: 'Lacerazione — perdita di sangue', scenario: 'L\'operatore smonta la lama di taglio senza guanti antitaglio — taglio sul bordo affilato.' },
        fs04: { element: 'Superfici a contatto con alimenti', threat: 'Contaminazione microbiologica del prodotto', effect: 'Avvelenamento (Listeria, Salmonella)', scenario: 'Lavaggio ad alta pressione vicino a componenti elettrici senza spegnimento.' },
      },
    },
    es: {
      name: 'Cortadora industrial (embutidos / queso)',
      threats: {
        fs01: { element: 'Cuchilla / disco de corte (Ø 150–400 mm)', threat: 'Corte / amputación durante alimentación', effect: 'Amputación dedos — pérdida de sangre', scenario: 'Los dedos del operario se acercan a la cuchilla de corte al guiar manualmente el producto.' },
        fs02: { element: 'Mecanismo de avance / alimentador', threat: 'Arrastre de dedos por mecanismo de avance', effect: 'Aplastamiento / amputación', scenario: 'La mano del operario entra en el mecanismo de avance al retirar producto atascado.' },
        fs03: { element: 'Cuchilla al desmontar para limpieza', threat: 'Laceración durante desmontaje', effect: 'Laceración — pérdida de sangre', scenario: 'El operario desmonta la cuchilla sin guantes resistentes al corte — corte en el borde afilado.' },
        fs04: { element: 'Superficies contacto alimentario', threat: 'Contaminación microbiológica del producto', effect: 'Intoxicación (Listeria, Salmonella)', scenario: 'Lavado a alta presión cerca de componentes eléctricos sin apagarlo.' },
      },
    },
    cs: {
      name: 'Průmyslový kráječ (uzeniny / sýry)',
      threats: {
        fs01: { element: 'Nůž / řezný kotouč (Ø 150–400 mm)', threat: 'Řezání / amputace prstů při podávání', effect: 'Amputace prstů — ztráta krve', scenario: 'Prsty obsluhy se přibližují k řezacímu kotouči při ručním vedení produktu.' },
        fs02: { element: 'Posuvný mechanismus / podavač', threat: 'Vtažení prstů posuvným mechanismem', effect: 'Rozdrcení / amputace', scenario: 'Ruka obsluhy vstoupí do posuvného mechanismu při odstraňování zaseknutého produktu.' },
        fs03: { element: 'Nůž při demontáži k mytí', threat: 'Řezná rána při demontáži', effect: 'Řezná rána — ztráta krve', scenario: 'Obsluha demontuje řezací kotouč bez protipořezových rukavic — řez ostrým okrajem.' },
        fs04: { element: 'Povrchy v kontaktu s potravinami', threat: 'Mikrobiologická kontaminace produktu', effect: 'Otrava (Listeria, Salmonella)', scenario: 'Vysokotlaké mytí v blízkosti elektrických součástí bez vypnutí.' },
      },
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // DŹWIGNICE
  // ─────────────────────────────────────────────────────────────────
  'crane-overhead': {
    pl: {
      name: 'Suwnica pomostowa / bramowa',
      threats: {
        cr01: { element: 'Hak / zawiesia / ładunek', threat: 'Upadek ładunku na osobę', effect: 'Zmiażdżenie — śmierć', scenario: 'Hak bez zabezpieczenia — zawiesia zsuwają się przy nierównym obciążeniu.' },
        cr02: { element: 'Mechanizm jazdy suwnicy', threat: 'Uderzenie przez jadącą suwnicę', effect: 'Ciężkie urazy — śmierć', scenario: 'Suwnica przejeżdża bez sygnału — operator pieszy stoi pod torem jezdnym.' },
        cr03: { element: 'Lina nośna / łańcuch', threat: 'Zerwanie liny podczas podnoszenia', effect: 'Upadek ładunku — śmierć', scenario: 'Lina nośna z widocznym zużyciem drutów zrywa się przy podniesieniu ładunku.' },
        cr04: { element: 'Praca na pomoście suwnicy', threat: 'Upadek z wysokości przy konserwacji', effect: 'Śmierć', scenario: 'Operator zaczepia zawiesie przy uniesionej belce bez asekuracji od góry.' },
        cr05: { element: 'Instalacja elektryczna (400 V)', threat: 'Porażenie prądem', effect: 'Oparzenie, śmierć', scenario: 'Ładunek kołysze się niekontrolowanie przy gwałtownym hamowaniu suwnicy.' },
        cr06: { element: 'Hak bez języczka bezpieczeństwa', threat: 'Wyśliznięcie zawiesia z haka', effect: 'Upadek ładunku', scenario: 'Serwisant wchodzi na most suwnicy bez wyłączenia zasilania i blokady napędu.' },
      },
    },
    en: {
      name: 'Overhead / Gantry Crane',
      threats: {
        cr01: { element: 'Hook / slings / load', threat: 'Load falling onto person', effect: 'Crushing — death', scenario: 'Hook without safety latch — slings slip off under uneven loading.' },
        cr02: { element: 'Crane travel mechanism', threat: 'Strike from moving crane', effect: 'Severe injuries — death', scenario: 'Crane travels without warning signal — pedestrian operator stands under rail.' },
        cr03: { element: 'Load-bearing rope / chain', threat: 'Rope failure during lifting', effect: 'Load drop — death', scenario: 'Wire rope with visible wire wear breaks under load.' },
        cr04: { element: 'Work on crane bridge during maintenance', threat: 'Fall from height during maintenance', effect: 'Death', scenario: 'Operator attaches sling under raised beam without overhead protection.' },
        cr05: { element: 'Electrical installation (400 V)', threat: 'Electric shock', effect: 'Burns, death', scenario: 'Load swings uncontrollably during abrupt crane braking.' },
        cr06: { element: 'Hook without safety latch', threat: 'Sling slipping off hook', effect: 'Load drop', scenario: 'Maintenance worker enters bridge without isolating power and locking drive.' },
      },
    },
    de: {
      name: 'Brücken- / Portalkran',
      threats: {
        cr01: { element: 'Haken / Anschlagmittel / Last', threat: 'Lastfall auf Person', effect: 'Zerquetscht — Tod', scenario: 'Haken ohne Sicherungsklappe — Anschlagmittel rutschen bei ungleichmäßiger Belastung ab.' },
        cr02: { element: 'Kranfahrwerk', threat: 'Schlag durch fahrenden Kran', effect: 'Schwere Verletzungen — Tod', scenario: 'Kran fährt ohne Warnsignal — Fußgängerbediener steht unter Fahrbahn.' },
        cr03: { element: 'Tragseil / Kette', threat: 'Seilbruch beim Heben', effect: 'Lastfall — Tod', scenario: 'Drahtseil mit sichtbarem Drahtverschleiß reißt unter Last.' },
        cr04: { element: 'Arbeit auf Kranbrücke bei Wartung', threat: 'Absturz aus der Höhe bei Wartung', effect: 'Tod', scenario: 'Bediener befestigt Anschlagmittel unter angehobener Traverse ohne Überkopfsicherung.' },
        cr05: { element: 'Elektrische Anlage (400 V)', threat: 'Elektrischer Schlag', effect: 'Verbrennungen, Tod', scenario: 'Last schaukelt unkontrolliert bei abruptem Kranbremsvorgang.' },
        cr06: { element: 'Haken ohne Sicherungslasche', threat: 'Abrutschen des Anschlagmittels', effect: 'Lastfall', scenario: 'Wartungspersonal betritt Brücke ohne Stromabschaltung und Antriebsarretierung.' },
      },
    },
    fr: {
      name: 'Pont roulant / portique',
      threats: {
        cr01: { element: 'Crochet / élingues / charge', threat: 'Chute de charge sur personne', effect: 'Écrasement — décès', scenario: 'Crochet sans linguet de sécurité — les élingues glissent sous charge inégale.' },
        cr02: { element: 'Mécanisme de translation du pont', threat: 'Coup par le pont en mouvement', effect: 'Blessures graves — décès', scenario: 'Le pont roulant se déplace sans signal d\'avertissement — l\'opérateur piéton se tient sous la voie.' },
        cr03: { element: 'Câble porteur / chaîne', threat: 'Rupture du câble lors du levage', effect: 'Chute de charge — décès', scenario: 'Câble porteur avec usure visible des fils se rompt sous charge.' },
        cr04: { element: 'Travail sur passerelle lors maintenance', threat: 'Chute de hauteur lors maintenance', effect: 'Décès', scenario: 'L\'opérateur fixe l\'élingue sous la poutre levée sans protection en hauteur.' },
        cr05: { element: 'Installation électrique (400 V)', threat: 'Électrocution', effect: 'Brûlures, décès', scenario: 'La charge oscille de façon incontrôlable lors d\'un freinage brusque du pont.' },
        cr06: { element: 'Crochet sans linguet de sécurité', threat: 'Glissement de l\'élingue du crochet', effect: 'Chute de charge', scenario: 'Le technicien de maintenance entre sur le pont sans couper l\'alimentation et verrouiller l\'entraînement.' },
      },
    },
    it: {
      name: 'Carroponte / gru a portale',
      threats: {
        cr01: { element: 'Gancio / imbracature / carico', threat: 'Caduta del carico su persona', effect: 'Schiacciamento — morte', scenario: 'Gancio senza linguetta di sicurezza — le brache scivolano sotto carico non uniforme.' },
        cr02: { element: 'Meccanismo di traslazione', threat: 'Colpo dal carroponte in movimento', effect: 'Gravi lesioni — morte', scenario: 'Il carroponte si sposta senza segnale di avvertimento — l\'operatore pedone si trova sotto il binario.' },
        cr03: { element: 'Fune portante / catena', threat: 'Rottura fune durante il sollevamento', effect: 'Caduta carico — morte', scenario: 'La fune portante con usura visibile dei trefoli si rompe sotto carico.' },
        cr04: { element: 'Lavoro su passerella durante manutenzione', threat: 'Caduta dall\'alto durante manutenzione', effect: 'Morte', scenario: 'L\'operatore fissa la braca sotto la trave sollevata senza protezione dall\'alto.' },
        cr05: { element: 'Impianto elettrico (400 V)', threat: 'Elettrocuzione', effect: 'Ustioni, morte', scenario: 'Il carico oscilla in modo incontrollabile durante la frenatura brusca del carroponte.' },
        cr06: { element: 'Gancio senza linguetta di sicurezza', threat: 'Scorrimento imbracatura dal gancio', effect: 'Caduta carico', scenario: 'Il manutentore entra sul ponte senza isolare l\'alimentazione e bloccare l\'azionamento.' },
      },
    },
    es: {
      name: 'Puente grúa / grúa pórtico',
      threats: {
        cr01: { element: 'Gancho / eslingas / carga', threat: 'Caída de carga sobre persona', effect: 'Aplastamiento — muerte', scenario: 'Gancho sin pestillo de seguridad — las eslingas se deslizan bajo carga desigual.' },
        cr02: { element: 'Mecanismo de traslación del puente', threat: 'Golpe por puente en movimiento', effect: 'Lesiones graves — muerte', scenario: 'El puente grúa se mueve sin señal de advertencia — el operario peatón está bajo el carril.' },
        cr03: { element: 'Cable portante / cadena', threat: 'Rotura de cable durante elevación', effect: 'Caída de carga — muerte', scenario: 'Cable portante con desgaste visible de alambres se rompe bajo carga.' },
        cr04: { element: 'Trabajo en pasarela durante mantenimiento', threat: 'Caída en altura durante mantenimiento', effect: 'Muerte', scenario: 'El operario fija la eslinga bajo la viga elevada sin protección superior.' },
        cr05: { element: 'Instalación eléctrica (400 V)', threat: 'Electrocución', effect: 'Quemaduras, muerte', scenario: 'La carga oscila de forma incontrolable durante el frenado brusco del puente.' },
        cr06: { element: 'Gancho sin seguro', threat: 'Deslizamiento de eslinga del gancho', effect: 'Caída de carga', scenario: 'El técnico de mantenimiento entra al puente sin aislar la alimentación y bloquear el accionamiento.' },
      },
    },
    cs: {
      name: 'Mostový / portálový jeřáb',
      threats: {
        cr01: { element: 'Hák / závěsné prostředky / břemeno', threat: 'Pád břemene na osobu', effect: 'Rozdrcení — smrt', scenario: 'Hák bez pojistné klapky — vázací prostředky sklouznou při nerovnoměrném zatížení.' },
        cr02: { element: 'Mechanismus pojezdu jeřábu', threat: 'Úder jedoucím jeřábem', effect: 'Těžká zranění — smrt', scenario: 'Jeřáb jede bez výstražného signálu — chodec obsluhy stojí pod jeřábovou dráhou.' },
        cr03: { element: 'Nosné lano / řetěz', threat: 'Přetržení lana při zdvihání', effect: 'Pád břemene — smrt', scenario: 'Nosné lano s viditelným opotřebením drátů se přetrhne pod zatížením.' },
        cr04: { element: 'Práce na mostu jeřábu při údržbě', threat: 'Pád z výšky při údržbě', effect: 'Smrt', scenario: 'Obsluha připevňuje vázací prostředek pod zdviženým nosníkem bez ochrany shora.' },
        cr05: { element: 'Elektrická instalace (400 V)', threat: 'Úraz elektrickým proudem', effect: 'Popáleniny, smrt', scenario: 'Břemeno se nekontrolovaně houpe při prudkém brzdění jeřábu.' },
        cr06: { element: 'Hák bez pojistky', threat: 'Sklouznutí závěsu z háku', effect: 'Pád břemene', scenario: 'Pracovník údržby vstoupí na most bez odpojení napájení a zablokování pohonu.' },
      },
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // MASZYNY ROLNICZE
  // ─────────────────────────────────────────────────────────────────
  'agricultural-combine': {
    pl: {
      name: 'Kombajn zbożowy',
      threats: {
        ag01: { element: 'Heder / palce żniwne', threat: 'Pochwycenie / wciągnięcie przez heder', effect: 'Amputacja, śmierć', scenario: 'Operator wysiada do regulacji hedera bez wyłączenia WOM — palce wchodzą w palce żniwne.' },
        ag02: { element: 'WOM (PTO) — wał odbioru mocy', threat: 'Pochwycenie / wciągnięcie przez WOM', effect: 'Wciągnięcie odzieży — amputacja — śmierć', scenario: 'Odzież operatora zostaje pochwycona przez obracający się wał WOM przy inspekcji.' },
        ag03: { element: 'Bęben młócący — wyrzut kamieni', threat: 'Wyrzucenie kamieni / metalu przez bęben', effect: 'Urazy operatora i osób w pobliżu', scenario: 'Bęben młócący wyrzuca kamień przez zsyp podczas żniw na kamienistym polu.' },
        ag04: { element: 'Zbiornik ziarna', threat: 'Wpadnięcie do zbiornika ziarna', effect: 'Zasyp ziarnem — uduszenie', scenario: 'Operator wchodzi do zasypni ziarna bez wyłączenia i blokady przenośnika.' },
        ag05: { element: 'Kombajn na zboczu', threat: 'Przewrócenie kombajnu na zboczu', effect: 'Zmiażdżenie operatora — śmierć', scenario: 'Kombajn traci stabilność na zboczu — przewraca się na operatora.' },
        ag06: { element: 'Kabina — komfort termiczny latem', threat: 'Stres cieplny operatora', effect: 'Omdlenie, udar cieplny', scenario: 'Pożar kabiny od zapalenia się słomy przy gorącym silniku podczas długiej zbiórki.' },
      },
    },
    en: {
      name: 'Grain Combine Harvester',
      threats: {
        ag01: { element: 'Header / cutting fingers', threat: 'Entanglement / drawing-in by header', effect: 'Amputation, death', scenario: 'Operator dismounts to adjust header without switching off PTO — fingers enter reel tines.' },
        ag02: { element: 'PTO — power take-off shaft', threat: 'Entanglement / drawing-in by PTO', effect: 'Clothing drawn in — amputation — death', scenario: 'Operator\'s clothing caught by rotating PTO shaft during inspection.' },
        ag03: { element: 'Threshing drum — stone ejection', threat: 'Ejection of stones / metal by drum', effect: 'Injuries to operator and bystanders', scenario: 'Threshing drum ejects stone through discharge during harvest on stony field.' },
        ag04: { element: 'Grain tank', threat: 'Falling into grain tank', effect: 'Grain engulfment — suffocation', scenario: 'Operator enters grain hopper without switching off and locking conveyor.' },
        ag05: { element: 'Harvester on slope', threat: 'Harvester overturning on slope', effect: 'Operator crushed — death', scenario: 'Combine loses stability on slope — tips over onto operator.' },
        ag06: { element: 'Cab — thermal comfort in summer', threat: 'Operator heat stress', effect: 'Fainting, heat stroke', scenario: 'Cab fire from straw ignition near hot engine during long harvesting.' },
      },
    },
    de: {
      name: 'Getreideerntemaschine (Mähdrescher)',
      threats: {
        ag01: { element: 'Schneidwerk / Haspelzinken', threat: 'Erfassen / Einziehen durch Schneidwerk', effect: 'Amputation, Tod', scenario: 'Bediener steigt zur Schneidwerkseinstellung aus ohne Zapfwellenabschaltung — Finger in Haspelzinken.' },
        ag02: { element: 'ZWelle (PTO)', threat: 'Erfassen / Einziehen durch Zapfwelle', effect: 'Kleidung eingezogen — Amputation — Tod', scenario: 'Bedienerbekleidung wird von rotierender Zapfwelle bei Inspektion erfasst.' },
        ag03: { element: 'Dreschwerk — Steinwurf', threat: 'Auswerfen von Steinen / Metall', effect: 'Verletzungen des Fahrers und Umstehender', scenario: 'Dreschwerk schleudert Stein beim Drusch auf Steinfeld aus.' },
        ag04: { element: 'Korntank', threat: 'Hineinfallen in den Korntank', effect: 'Getreideversand — Erstickung', scenario: 'Bediener betritt Korntank ohne Abschalten und Arretieren des Förderers.' },
        ag05: { element: 'Mähdrescher am Hang', threat: 'Umkippen am Hang', effect: 'Fahrer zerquetscht — Tod', scenario: 'Mähdrescher verliert am Hang Stabilität — kippt auf Bediener.' },
        ag06: { element: 'Kabine — Wärmekomfort im Sommer', threat: 'Hitzestress des Fahrers', effect: 'Ohnmacht, Hitzschlag', scenario: 'Kabinenbrand durch Strohentzündung am heißen Motor bei langer Ernte.' },
      },
    },
    fr: {
      name: 'Moissonneuse-batteuse',
      threats: {
        ag01: { element: 'Tablier de coupe / doigts de coupe', threat: 'Entraînement par le tablier', effect: 'Amputation, décès', scenario: 'L\'opérateur descend pour régler la tête sans couper la prise de force — les doigts entrent dans les dents du rabatteur.' },
        ag02: { element: 'PdF (prise de force)', threat: 'Entraînement / happement par PdF', effect: 'Vêtement happé — amputation — décès', scenario: 'Les vêtements de l\'opérateur sont happés par l\'arbre de prise de force tournant lors de l\'inspection.' },
        ag03: { element: 'Batteur — éjection de pierres', threat: 'Éjection de pierres / métal par batteur', effect: 'Blessures conducteur et personnes proches', scenario: 'Le batteur éjecte une pierre par la goulotte lors de la moisson dans un champ pierreux.' },
        ag04: { element: 'Réservoir à grains', threat: 'Chute dans le réservoir', effect: 'Engloutissement par grain — suffocation', scenario: 'L\'opérateur entre dans la trémie à grain sans arrêter et bloquer le convoyeur.' },
        ag05: { element: 'Machine sur pente', threat: 'Renversement sur pente', effect: 'Conducteur écrasé — décès', scenario: 'La moissonneuse-batteuse perd sa stabilité sur une pente — elle se renverse sur l\'opérateur.' },
        ag06: { element: 'Cabine — confort thermique en été', threat: 'Stress thermique du conducteur', effect: 'Évanouissement, coup de chaleur', scenario: 'Incendie de cabine par inflammation de la paille près du moteur chaud lors d\'une longue récolte.' },
      },
    },
    it: {
      name: 'Mietitrebbiatrice',
      threats: {
        ag01: { element: 'Testata / dita di taglio', threat: 'Presa / trascinamento dalla testata', effect: 'Amputazione, morte', scenario: 'L\'operatore scende per regolare la testata senza spegnere il PDG — dita entrano nei denti del pick-up.' },
        ag02: { element: 'PTO — albero cardanico', threat: 'Presa / trascinamento dal PTO', effect: 'Abiti trascinati — amputazione — morte', scenario: 'L\'abbigliamento dell\'operatore viene catturato dall\'albero PDG rotante durante l\'ispezione.' },
        ag03: { element: 'Battitore — proiezione pietre', threat: 'Proiezione di pietre / metallo dal battitore', effect: 'Lesioni operatore e persone vicine', scenario: 'Il battitore espelle un sasso tramite lo scarico durante il raccolto su campo sassoso.' },
        ag04: { element: 'Serbatoio grano', threat: 'Caduta nel serbatoio grano', effect: 'Seppellimento da grano — soffocamento', scenario: 'L\'operatore entra nel serbatoio del grano senza spegnere e bloccare il trasportatore.' },
        ag05: { element: 'Mietitrebbiatrice su pendio', threat: 'Ribaltamento su pendio', effect: 'Operatore schiacciato — morte', scenario: 'La mietitrebbiatrice perde stabilità su un pendio — si ribalta sull\'operatore.' },
        ag06: { element: 'Cabina — comfort termico in estate', threat: 'Stress termico operatore', effect: 'Svenimento, colpo di calore', scenario: 'Incendio nella cabina da accensione della paglia vicino al motore caldo durante una lunga raccolta.' },
      },
    },
    es: {
      name: 'Cosechadora de cereales',
      threats: {
        ag01: { element: 'Cabezal / dedos de corte', threat: 'Atrapamiento por el cabezal', effect: 'Amputación, muerte', scenario: 'El operario desciende para ajustar el cabezal sin apagar la TDF — los dedos entran en los dientes del molinete.' },
        ag02: { element: 'TDF — toma de fuerza', threat: 'Atrapamiento por TDF', effect: 'Ropa atrapada — amputación — muerte', scenario: 'La ropa del operario queda atrapada por el eje de TDF giratorio durante la inspección.' },
        ag03: { element: 'Cilindro trillador — proyección piedras', threat: 'Proyección de piedras / metal por cilindro', effect: 'Lesiones operador y personas cercanas', scenario: 'El cilindro de trilla expulsa una piedra por la descarga durante la cosecha en campo pedregoso.' },
        ag04: { element: 'Depósito de grano', threat: 'Caída en depósito de grano', effect: 'Engullimiento por grano — asfixia', scenario: 'El operario entra a la tolva de grano sin apagar y bloquear el transportador.' },
        ag05: { element: 'Cosechadora en pendiente', threat: 'Vuelco en pendiente', effect: 'Operador aplastado — muerte', scenario: 'La cosechadora pierde estabilidad en una pendiente — vuelca sobre el operario.' },
        ag06: { element: 'Cabina — confort térmico en verano', threat: 'Estrés térmico del operador', effect: 'Desmayo, golpe de calor', scenario: 'Incendio en la cabina por ignición de paja cerca del motor caliente durante cosecha prolongada.' },
      },
    },
    cs: {
      name: 'Sklízecí mlátička',
      threats: {
        ag01: { element: 'Žací ústrojí / prsty', threat: 'Zachycení / vtažení žacím ústrojím', effect: 'Amputace, smrt', scenario: 'Obsluha sestoupí k seřízení žacího ústrojí bez vypnutí VOM — prsty vstoupí do prstů.' },
        ag02: { element: 'WOM — vývodový hřídel', threat: 'Zachycení / vtažení WOM', effect: 'Vtažení oblečení — amputace — smrt', scenario: 'Oblečení obsluhy je zachyceno otáčejícím se hřídelem VOM při inspekci.' },
        ag03: { element: 'Mlátící buben — vymrštění kamenů', threat: 'Vymrštění kamenů / kovů bubnem', effect: 'Zranění operátora a osob v blízkosti', scenario: 'Mlátící buben vymrští kámen výpustem při sklizni na kamenitém poli.' },
        ag04: { element: 'Zásobník obilí', threat: 'Propadnutí do zásobníku obilí', effect: 'Zavalení obilím — udušení', scenario: 'Obsluha vstoupí do zásobníku obilí bez vypnutí a zablokování dopravníku.' },
        ag05: { element: 'Sklízecí mlátička na svahu', threat: 'Převrácení na svahu', effect: 'Rozdrcení operátora — smrt', scenario: 'Kombajn ztrácí stabilitu na svahu — převrátí se na obsluhu.' },
        ag06: { element: 'Kabina — tepelný komfort v létě', threat: 'Tepelný stres operátora', effect: 'Mdloby, úžeh', scenario: 'Požár kabiny od vznícení slámy u horkého motoru při dlouhé sklizni.' },
      },
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // MASZYNA NIESTANDARDOWA
  // ─────────────────────────────────────────────────────────────────
  'custom': {
    pl: {
      name: 'Maszyna niestandardowa / linia produkcyjna',
      threats: {
        cu01: { element: 'Elementy ruchome (wały, koła, pasy)', threat: 'Pochwycenie / wciągnięcie', effect: 'Wciągnięcie kończyny', scenario: 'Operator sięga do wnętrza maszyny przy obracającym się mechanizmie — pochwycenie.' },
        cu02: { element: 'Ruchome elementy (narzędzia, suwaki)', threat: 'Gniecenie / uderzenie', effect: 'Złamania, zmiażdżenie', scenario: 'Ruchomy element uderza w operatora przy nieoczekiwanym starcie po pauzie.' },
        cu03: { element: 'Narzędzia tnące / obróbcze', threat: 'Cięcie / obcinanie', effect: 'Skaleczenie, amputacja', scenario: 'Ostry element tnący przecina rękę operatora przy ręcznym ustawianiu.' },
        cu04: { element: 'Instalacja elektryczna (400 V)', threat: 'Porażenie prądem bezpośrednie', effect: 'Oparzenie, śmierć', scenario: 'Gorąca powierzchnia lub medium powoduje oparzenie przy kontakcie lub wycieku.' },
        cu05: { element: 'Instalacja elektryczna — łuk / zwarcie', threat: 'Porażenie prądem pośrednie', effect: 'Oparzenie', scenario: 'Porażenie prądem przy dotyku nieizolowanego elementu pod napięciem.' },
        cu06: { element: 'Gorące powierzchnie / media procesowe', threat: 'Oparzenie termiczne', effect: 'Oparzenie II/III stopnia', scenario: 'Wyrzucenie detalu lub narzędzia przez maszynę w kierunku operatora.' },
        cu07: { element: 'Substancje chemiczne / oleje / chłodziwa', threat: 'Kontakt skórny / wdychanie', effect: 'Dermatoza, zatrucie', scenario: 'Operator wdycha szkodliwe gazy lub pyły bez ochrony dróg oddechowych.' },
        cu08: { element: 'Cała maszyna — hałas', threat: 'Hałas > 85 dB(A)', effect: 'Trwały ubytek słuchu', scenario: 'Hałas maszyny przekracza 85 dB bez ochrony słuchu przez całą zmianę.' },
        cu09: { element: 'Cała maszyna — wibracje', threat: 'Wibracje przenoszone na ręce / ciało', effect: 'Zespół wibracyjny, choroby kręgosłupa', scenario: 'Wibracje przenoszone na operatora przy długotrwałej obsłudze maszyny.' },
        cu10: { element: 'Stanowisko pracy — ergonomia', threat: 'Wymuszona pozycja / nadmierny wysiłek fizyczny', effect: 'Choroby mięśniowo-szkieletowe', scenario: 'Pożar od zapłonu płynów lub pyłów w strefie gorących elementów maszyny.' },
        cu11: { element: 'Strefa pracy — ATEX / pożar', threat: 'Pożar lub wybuch', effect: 'Oparzenia, śmierć', scenario: 'Ciężki element spada na operatora przy montażu lub demontażu bez asekuracji.' },
        cu12: { element: 'Dostęp serwisowy na wysokości', threat: 'Upadek z wysokości', effect: 'Ciężkie urazy, śmierć', scenario: 'Poślizg lub potknięcie przy wycieku medium technologicznego na podłogę.' },
      },
    },
    en: {
      name: 'Custom Machine / Production Line',
      threats: {
        cu01: { element: 'Moving parts (shafts, gears, belts)', threat: 'Entanglement / drawing-in', effect: 'Limb drawn in', scenario: 'Operator reaches inside machine while mechanism is rotating — entanglement.' },
        cu02: { element: 'Moving elements (tools, slides)', threat: 'Crushing / impact', effect: 'Fractures, crushing', scenario: 'Moving element strikes operator on unexpected start after pause.' },
        cu03: { element: 'Cutting / machining tools', threat: 'Cutting / severing', effect: 'Laceration, amputation', scenario: 'Sharp cutting element cuts operator hand during manual setup.' },
        cu04: { element: 'Electrical installation (400 V)', threat: 'Direct electric shock', effect: 'Burns, death', scenario: 'Hot surface or medium causes burn on contact or leak.' },
        cu05: { element: 'Electrical installation — arc / short circuit', threat: 'Indirect electric shock', effect: 'Burns', scenario: 'Electric shock on contact with uninsulated live element.' },
        cu06: { element: 'Hot surfaces / process media', threat: 'Thermal burns', effect: 'Second/third-degree burns', scenario: 'Ejection of workpiece or tool by machine towards operator.' },
        cu07: { element: 'Chemicals / oils / coolants', threat: 'Skin contact / inhalation', effect: 'Dermatitis, poisoning', scenario: 'Operator inhales harmful gases or dust without respiratory protection.' },
        cu08: { element: 'Whole machine — noise', threat: 'Noise > 85 dB(A)', effect: 'Permanent hearing loss', scenario: 'Machine noise exceeds 85 dB without hearing protection throughout shift.' },
        cu09: { element: 'Whole machine — vibration', threat: 'Vibration transmitted to hands / body', effect: 'Vibration syndrome, spinal disorders', scenario: 'Vibrations transmitted to operator during prolonged machine operation.' },
        cu10: { element: 'Workstation — ergonomics', threat: 'Constrained posture / excessive physical effort', effect: 'Musculoskeletal disorders', scenario: 'Fire from ignition of fluids or dusts in hot machine element zone.' },
        cu11: { element: 'Work zone — ATEX / fire', threat: 'Fire or explosion', effect: 'Burns, death', scenario: 'Heavy element falls on operator during assembly/disassembly without support.' },
        cu12: { element: 'Service access at height', threat: 'Fall from height', effect: 'Severe injuries, death', scenario: 'Slip or trip from process fluid leak onto floor.' },
      },
    },
    de: {
      name: 'Sondermaschine / Fertigungslinie',
      threats: {
        cu01: { element: 'Bewegliche Teile (Wellen, Räder, Riemen)', threat: 'Erfassen / Einziehen', effect: 'Gliedmaße eingezogen', scenario: 'Bediener greift in Maschine bei drehendem Mechanismus — Einzug.' },
        cu02: { element: 'Bewegliche Elemente (Werkzeuge, Schieber)', threat: 'Quetschen / Schlag', effect: 'Frakturen, Quetschung', scenario: 'Bewegtes Element trifft Bediener bei unerwartetem Start nach Pause.' },
        cu03: { element: 'Schneid-/Bearbeitungswerkzeuge', threat: 'Schneiden / Abtrennen', effect: 'Schnittwunde, Amputation', scenario: 'Scharfes Schneidelement schneidet Bedienerhand bei manuellem Einrichten.' },
        cu04: { element: 'Elektrische Anlage (400 V)', threat: 'Direkter elektrischer Schlag', effect: 'Verbrennungen, Tod', scenario: 'Heiße Oberfläche oder Medium verursacht Verbrennung bei Kontakt oder Leck.' },
        cu05: { element: 'Elektrische Anlage — Lichtbogen / Kurzschluss', threat: 'Indirekter elektrischer Schlag', effect: 'Verbrennungen', scenario: 'Stromschlag bei Berührung eines unisolierten spannungsführenden Elements.' },
        cu06: { element: 'Heiße Flächen / Prozessmedien', threat: 'Thermische Verbrennung', effect: 'Verbrennung 2./3. Grades', scenario: 'Ausschleudern von Werkstück oder Werkzeug durch Maschine auf Bediener.' },
        cu07: { element: 'Chemikalien / Öle / Kühlmittel', threat: 'Hautkontakt / Einatmen', effect: 'Dermatitis, Vergiftung', scenario: 'Bediener inhaliert Schadstoffe oder Stäube ohne Atemschutz.' },
        cu08: { element: 'Gesamtmaschine — Lärm', threat: 'Lärm > 85 dB(A)', effect: 'Dauerhafter Gehörverlust', scenario: 'Maschinengeräusch übersteigt 85 dB ohne Gehörschutz während gesamter Schicht.' },
        cu09: { element: 'Gesamtmaschine — Vibrationen', threat: 'Vibrationen auf Hände / Körper', effect: 'Vibrationssyndrom, Wirbelsäulenerkrankungen', scenario: 'Schwingungsübertragung auf Bediener beim Langzeitbetrieb der Maschine.' },
        cu10: { element: 'Arbeitsplatz — Ergonomie', threat: 'Zwangshaltung / übermäßige körperliche Belastung', effect: 'Muskel-Skelett-Erkrankungen', scenario: 'Brand durch Entzündung von Flüssigkeiten oder Stäuben in heißer Maschinenzone.' },
        cu11: { element: 'Arbeitsbereich — ATEX / Brand', threat: 'Brand oder Explosion', effect: 'Verbrennungen, Tod', scenario: 'Schweres Element fällt auf Bediener bei Montage/Demontage ohne Abstützung.' },
        cu12: { element: 'Servicezugang in der Höhe', threat: 'Absturz aus der Höhe', effect: 'Schwere Verletzungen, Tod', scenario: 'Rutschen oder Stolpern durch Prozessflüssigkeitsleck auf dem Boden.' },
      },
    },
    fr: {
      name: 'Machine spéciale / Ligne de production',
      threats: {
        cu01: { element: 'Pièces mobiles (arbres, roues, courroies)', threat: 'Entraînement / happement', effect: 'Membre happé', scenario: 'L\'opérateur atteint l\'intérieur de la machine lors de la rotation du mécanisme — entraînement.' },
        cu02: { element: 'Éléments mobiles (outils, glissières)', threat: 'Écrasement / choc', effect: 'Fractures, écrasement', scenario: 'Un élément mobile frappe l\'opérateur lors d\'un démarrage inopiné après pause.' },
        cu03: { element: 'Outils de coupe / d\'usinage', threat: 'Coupure / section', effect: 'Lacération, amputation', scenario: 'Un élément coupant tranchant coupe la main de l\'opérateur lors du réglage manuel.' },
        cu04: { element: 'Installation électrique (400 V)', threat: 'Choc électrique direct', effect: 'Brûlures, décès', scenario: 'Une surface ou un milieu chaud provoque une brûlure au contact ou une fuite.' },
        cu05: { element: 'Installation électrique — arc / court-circuit', threat: 'Choc électrique indirect', effect: 'Brûlures', scenario: 'Choc électrique au contact d\'un élément conducteur non isolé.' },
        cu06: { element: 'Surfaces chaudes / fluides procédé', threat: 'Brûlure thermique', effect: 'Brûlure 2ème/3ème degré', scenario: 'Éjection de pièce ou d\'outil par la machine vers l\'opérateur.' },
        cu07: { element: 'Produits chimiques / huiles / réfrigérants', threat: 'Contact cutané / inhalation', effect: 'Dermatite, intoxication', scenario: 'L\'opérateur inhale des gaz nocifs ou des poussières sans protection respiratoire.' },
        cu08: { element: 'Machine entière — bruit', threat: 'Bruit > 85 dB(A)', effect: 'Perte auditive permanente', scenario: 'Le bruit de la machine dépasse 85 dB sans protection auditive pendant tout le quart.' },
        cu09: { element: 'Machine entière — vibrations', threat: 'Vibrations transmises mains / corps', effect: 'Syndrome vibratoire, pathologies rachidiennes', scenario: 'Vibrations transmises à l\'opérateur lors du fonctionnement prolongé de la machine.' },
        cu10: { element: 'Poste de travail — ergonomie', threat: 'Posture contrainte / effort physique excessif', effect: 'Troubles musculo-squelettiques', scenario: 'Incendie par inflammation de fluides ou poussières dans la zone des éléments chauds.' },
        cu11: { element: 'Zone de travail — ATEX / incendie', threat: 'Incendie ou explosion', effect: 'Brûlures, décès', scenario: 'Un élément lourd tombe sur l\'opérateur lors du montage/démontage sans support.' },
        cu12: { element: 'Accès maintenance en hauteur', threat: 'Chute de hauteur', effect: 'Blessures graves, décès', scenario: 'Glissade ou trébuchement lors d\'une fuite de fluide de procédé sur le sol.' },
      },
    },
    it: {
      name: 'Macchina speciale / Linea produttiva',
      threats: {
        cu01: { element: 'Parti mobili (alberi, ruote, cinghie)', threat: 'Presa / trascinamento', effect: 'Arto trascinato', scenario: 'L\'operatore raggiunge l\'interno della macchina mentre il meccanismo è in rotazione — trascinamento.' },
        cu02: { element: 'Elementi mobili (utensili, slitte)', threat: 'Schiacciamento / colpo', effect: 'Fratture, schiacciamento', scenario: 'Un elemento mobile colpisce l\'operatore all\'avviamento inaspettato dopo pausa.' },
        cu03: { element: 'Utensili da taglio / lavorazione', threat: 'Taglio / recisione', effect: 'Lacerazione, amputazione', scenario: 'Un elemento tagliente affilato taglia la mano dell\'operatore durante la regolazione manuale.' },
        cu04: { element: 'Impianto elettrico (400 V)', threat: 'Contatto elettrico diretto', effect: 'Ustioni, morte', scenario: 'Una superficie o un mezzo caldo provoca ustione al contatto o perdita.' },
        cu05: { element: 'Impianto elettrico — arco / cortocircuito', threat: 'Contatto elettrico indiretto', effect: 'Ustioni', scenario: 'Scossa elettrica al contatto con elemento conduttore non isolato.' },
        cu06: { element: 'Superfici calde / fluidi di processo', threat: 'Ustione termica', effect: 'Ustione 2°/3° grado', scenario: 'Espulsione di pezzo o utensile dalla macchina verso l\'operatore.' },
        cu07: { element: 'Sostanze chimiche / oli / refrigeranti', threat: 'Contatto cutaneo / inalazione', effect: 'Dermatite, avvelenamento', scenario: 'L\'operatore inhala gas nocivi o polveri senza protezione respiratoria.' },
        cu08: { element: 'Intera macchina — rumore', threat: 'Rumore > 85 dB(A)', effect: 'Perdita uditiva permanente', scenario: 'Il rumore della macchina supera 85 dB senza protezione uditiva per tutto il turno.' },
        cu09: { element: 'Intera macchina — vibrazioni', threat: 'Vibrazioni trasmesse mani / corpo', effect: 'Sindrome vibratoria, patologie spinali', scenario: 'Vibrazioni trasmesse all\'operatore durante il funzionamento prolungato della macchina.' },
        cu10: { element: 'Postazione lavoro — ergonomia', threat: 'Postura vincolata / sforzo fisico eccessivo', effect: 'Disturbi muscolo-scheletrici', scenario: 'Incendio dall\'accensione di fluidi o polveri nella zona degli elementi caldi.' },
        cu11: { element: 'Zona lavoro — ATEX / incendio', threat: 'Incendio o esplosione', effect: 'Ustioni, morte', scenario: 'Un elemento pesante cade sull\'operatore durante il montaggio/smontaggio senza supporto.' },
        cu12: { element: 'Accesso in quota per manutenzione', threat: 'Caduta dall\'alto', effect: 'Gravi lesioni, morte', scenario: 'Scivolata o inciampo da perdita di fluido di processo sul pavimento.' },
      },
    },
    es: {
      name: 'Máquina especial / Línea de producción',
      threats: {
        cu01: { element: 'Piezas móviles (ejes, ruedas, correas)', threat: 'Atrapamiento / arrastre', effect: 'Miembro arrastrado', scenario: 'El operario alcanza el interior de la máquina mientras el mecanismo está girando — arrastre.' },
        cu02: { element: 'Elementos móviles (herramientas, correderas)', threat: 'Aplastamiento / golpe', effect: 'Fracturas, aplastamiento', scenario: 'Un elemento móvil golpea al operario en un arranque inesperado tras pausa.' },
        cu03: { element: 'Herramientas de corte / mecanizado', threat: 'Corte / cercenamiento', effect: 'Laceración, amputación', scenario: 'Un elemento cortante afilado corta la mano del operario durante el ajuste manual.' },
        cu04: { element: 'Instalación eléctrica (400 V)', threat: 'Contacto eléctrico directo', effect: 'Quemaduras, muerte', scenario: 'Una superficie o medio caliente causa quemadura al contacto o fuga.' },
        cu05: { element: 'Instalación eléctrica — arco / cortocircuito', threat: 'Contacto eléctrico indirecto', effect: 'Quemaduras', scenario: 'Descarga eléctrica al contacto con elemento conductor no aislado.' },
        cu06: { element: 'Superficies calientes / fluidos de proceso', threat: 'Quemadura térmica', effect: 'Quemadura 2°/3° grado', scenario: 'Expulsión de pieza o herramienta por la máquina hacia el operario.' },
        cu07: { element: 'Sustancias químicas / aceites / refrigerantes', threat: 'Contacto cutáneo / inhalación', effect: 'Dermatitis, intoxicación', scenario: 'El operario inhala gases nocivos o polvos sin protección respiratoria.' },
        cu08: { element: 'Toda la máquina — ruido', threat: 'Ruido > 85 dB(A)', effect: 'Pérdida auditiva permanente', scenario: 'El ruido de la máquina supera 85 dB sin protección auditiva durante todo el turno.' },
        cu09: { element: 'Toda la máquina — vibraciones', threat: 'Vibraciones transmitidas a manos / cuerpo', effect: 'Síndrome vibratorio, patologías espinales', scenario: 'Vibraciones transmitidas al operario durante el funcionamiento prolongado de la máquina.' },
        cu10: { element: 'Puesto de trabajo — ergonomía', threat: 'Postura forzada / esfuerzo físico excesivo', effect: 'Trastornos musculoesqueléticos', scenario: 'Incendio por ignición de fluidos o polvos en la zona de elementos calientes.' },
        cu11: { element: 'Zona de trabajo — ATEX / incendio', threat: 'Incendio o explosión', effect: 'Quemaduras, muerte', scenario: 'Un elemento pesado cae sobre el operario durante el montaje/desmontaje sin soporte.' },
        cu12: { element: 'Acceso en altura para mantenimiento', threat: 'Caída en altura', effect: 'Lesiones graves, muerte', scenario: 'Resbalamiento o tropiezo por fuga de fluido de proceso en el suelo.' },
      },
    },
    cs: {
      name: 'Nestandardní stroj / výrobní linka',
      threats: {
        cu01: { element: 'Pohyblivé části (hřídele, kola, řemeny)', threat: 'Zachycení / vtažení', effect: 'Vtažení končetiny', scenario: 'Obsluha sahá dovnitř stroje při otáčejícím se mechanismu — vtažení.' },
        cu02: { element: 'Pohyblivé prvky (nástroje, suporty)', threat: 'Drcení / úder', effect: 'Zlomeniny, rozdrcení', scenario: 'Pohybující se prvek zasáhne obsluhu při nečekaném spuštění po pauze.' },
        cu03: { element: 'Řezné / obráběcí nástroje', threat: 'Řezání / useknutí', effect: 'Řezná rána, amputace', scenario: 'Ostrý řezný prvek přeřízne ruku obsluhy při ručním seřizování.' },
        cu04: { element: 'Elektrická instalace (400 V)', threat: 'Přímý úraz elektrickým proudem', effect: 'Popáleniny, smrt', scenario: 'Horký povrch nebo médium způsobí popáleninu při kontaktu nebo úniku.' },
        cu05: { element: 'Elektrická instalace — oblouk / zkrat', threat: 'Nepřímý úraz elektrickým proudem', effect: 'Popáleniny', scenario: 'Úraz elektrickým proudem při dotyku neizolovaého živého prvku.' },
        cu06: { element: 'Horké povrchy / procesní média', threat: 'Tepelná popálenina', effect: 'Popálenina 2./3. stupně', scenario: 'Vymrštění obrobku nebo nástroje strojem směrem k obsluze.' },
        cu07: { element: 'Chemikálie / oleje / chladiva', threat: 'Kontakt s kůží / vdechování', effect: 'Dermatitida, otrava', scenario: 'Obsluha vdechuje škodlivé plyny nebo prach bez ochrany dýchání.' },
        cu08: { element: 'Celý stroj — hluk', threat: 'Hluk > 85 dB(A)', effect: 'Trvalá ztráta sluchu', scenario: 'Hluk stroje překračuje 85 dB bez ochrany sluchu po celou směnu.' },
        cu09: { element: 'Celý stroj — vibrace', threat: 'Vibrace přenášené na ruce / tělo', effect: 'Vibrační syndrom, onemocnění páteře', scenario: 'Vibrace přenášené na obsluhu při dlouhodobém provozu stroje.' },
        cu10: { element: 'Pracoviště — ergonomie', threat: 'Nucená poloha / nadměrná fyzická zátěž', effect: 'Muskuloskeletální poruchy', scenario: 'Požár od vznícení kapalin nebo prachů v zóně horkých prvků stroje.' },
        cu11: { element: 'Pracovní zóna — ATEX / požár', threat: 'Požár nebo výbuch', effect: 'Popáleniny, smrt', scenario: 'Těžký prvek padá na obsluhu při montáži/demontáži bez podepření.' },
        cu12: { element: 'Servisní přístup ve výšce', threat: 'Pád z výšky', effect: 'Těžká zranění, smrt', scenario: 'Uklouznutí nebo zakopnutí při úniku procesní kapaliny na podlahu.' },
      },
    },
  },
}

/**
 * Returns translations for a specific machine in the given language.
 * Falls back to Polish if the language is not found.
 */
export function getMachineTranslation(machineId: string, lang: Lang): MachineTranslation | null {
  const machine = machinesI18n[machineId]
  if (!machine) return null
  return machine[lang] || machine['pl']
}

/**
 * Returns the translated threat for a given machine, threat ID, and language.
 * Falls back to Polish if not found.
 */

export function getThreatByText(
  polishElement: string,
  lang: Lang
): ThreatTranslation | null {
  for (const machineId of Object.keys(machinesI18n)) {
    const plThreats = machinesI18n[machineId]['pl']?.threats
    if (!plThreats) continue
    for (const threatId of Object.keys(plThreats)) {
      if (plThreats[threatId].element === polishElement) {
        const targetThreats = machinesI18n[machineId][lang]?.threats
        return targetThreats?.[threatId] ?? plThreats[threatId]
      }
    }
  }
  return null
}

/**
 * Tłumaczy wpis RiskEntry na dany język.
 */
export function translateRiskEntry(
  entry: { element: string; threat: string; effect: string; scenario?: string },
  lang: Lang
): { element: string; threat: string; effect: string; scenario?: string } {
  if (lang === 'pl') return entry
  const found = getThreatByText(entry.element, lang)
  if (!found) return entry
  return {
    element: found.element,
    threat:  found.threat,
    effect:  found.effect ?? entry.effect,
    scenario: found.scenario ?? entry.scenario,
  }
}

export function getThreatTranslation(
  machineId: string,
  threatId: string,
  lang: Lang
): ThreatTranslation | null {
  const machineT = getMachineTranslation(machineId, lang)
  if (!machineT) return null
  return machineT.threats[threatId] || null
}