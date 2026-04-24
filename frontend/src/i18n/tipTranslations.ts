// frontend/src/i18n/tipTranslations.ts

export type TipLang = 'pl' | 'en' | 'de' | 'fr' | 'it' | 'es' | 'cs'

export interface TipData {
  step: string
  title: string
  lead: string
  body: string[]
  question?: string
}

export interface TipSet {
  'machine-limits': TipData
  'hazard-analysis': TipData
  'sp-params': TipData
  'protective-measures': TipData
  'residual-risk': TipData
  'plr': TipData
  'lifecycle': TipData
  'summary': TipData
  nav: { prev: string; next: string }
}

const pl: TipSet = {
  'machine-limits': {
    step: 'Krok 2 — Granice maszyny (ISO 12100 §5.3)',
    title: 'Ryzyko nie jest cechą maszyny',
    lead: 'Ryzyko nie jest abstrakcyjne ani samoistne — ujawnia się dopiero w chwili, gdy człowiek wchodzi w bezpośrednią relację z maszyną, realizując określone działanie.',
    body: [
      'Ograniczenia maszyny (wg PN-EN ISO 12100) to ramy, w których rozpatruje się użytkowanie: przeznaczenie, przewidywalne niewłaściwe użycie, środowisko pracy, użytkowników oraz cały cykl życia od transportu i instalacji po demontaż.',
      'Bez jasnych ograniczeń ocena ryzyka staje się albo zbyt wąska (pomija zadania rzadkie, ale krytyczne), albo zbyt ogólna (miesza różne sytuacje i traci precyzję).',
    ],
    question: 'W jakich momentach człowiek znajduje się najbliżej zagrożeń i dlaczego?',
  },
  'hazard-analysis': {
    step: 'Krok 3 — Analiza zagrożeń',
    title: 'Nie oceniaj zagrożeń — oceniaj zadania',
    lead: 'Zagrożenie może istnieć w maszynie cały czas, ale ryzyko jest realne tylko wtedy, gdy człowiek ma do niego dostęp podczas wykonywania konkretnego zadania.',
    body: [
      'Przy każdym zagrożeniu zawsze myśl zadaniowo: jakie zadanie wykonuje operator lub serwisant, w jakim stanie maszyny, i czy w tym momencie jest narażony na zagrożenie?',
      'Jeśli nie potrafisz opisać konkretnego scenariusza — kiedy i przy jakim zadaniu zagrożenie się materializuje — to znak, że zagrożenie jest źle zdefiniowane lub czysto teoretyczne.',
    ],
    question: 'Jakie konkretne zadanie wykonuje człowiek gdy to zagrożenie staje się realne?',
  },
  'sp-params': {
    step: 'Krok 3 — Parametry S i P',
    title: 'S i P muszą wynikać z Twojej obserwacji',
    lead: 'Wartości S i P to nie wybór z listy — to opis rzeczywistości. System podpowiada, ale nie zastąpi Twojej wiedzy o konkretnej maszynie i ludziach przy niej pracujących.',
    body: [
      'S oceniaj dla najgorszego realistycznego scenariusza, nie dla przeciętnego. Jeśli zagrożenie może prowadzić do śmierci — S=4, niezależnie od tego jak mało prawdopodobne to wydaje się.',
      'P to suma trzech czynników: jak często operator jest w strefie zagrożenia, jak długo tam przebywa i czy ma realną możliwość zauważenia zagrożenia i wycofania się.',
    ],
    question: 'Czy uzasadnienie S i P opisuje to co naprawdę dzieje się przy tej maszynie?',
  },
  'protective-measures': {
    step: 'Krok 3 — Środki ochronne (ISO 12100 §6.2)',
    title: 'Środek ochronny musi pasować do zadania',
    lead: 'Najlepsze zabezpieczenie techniczne na papierze może być bezwartościowe, jeśli mocno utrudnia wykonywanie normalnego zadania. Wtedy operator będzie je omijał lub wyłączał.',
    body: [
      'Zawsze sprawdź hierarchię: eliminacja u źródła → techniczne środki ochronne → organizacyjne i informacyjne. Każdy poziom niżej stosujesz tylko gdy wyższy jest niemożliwy.',
      'Środki organizacyjne (szkolenia, ŚOI, instrukcje) nigdy nie mogą być jedyną warstwą ochrony dla zagrożeń o wysokim ryzyku.',
    ],
    question: 'Czy to zabezpieczenie pozwala bezpiecznie wykonać zadanie, czy raczej je utrudnia?',
  },
  'residual-risk': {
    step: 'Krok 3 — Ryzyko resztkowe',
    title: 'Ryzyko resztkowe to nie „to co zostało"',
    lead: 'Ryzyko resztkowe to poziom ryzyka, który nadal istnieje podczas realnego wykonywania zadań — po zastosowaniu wszystkich środków ochronnych.',
    body: [
      'Nawet po zastosowaniu środków ochronnych zawsze pozostaje pytanie: w jakich zadaniach i sytuacjach człowiek nadal jest narażony na to zagrożenie?',
      'Jeśli nie umiesz wskazać tych zadań — ryzyko resztkowe jest niedoszacowane. Największe ryzyko często pojawia się poza normalną pracą: przy usuwaniu zacięć, przezbrojeń, czyszczeniu, serwisie.',
    ],
    question: 'W jakich konkretnych sytuacjach człowiek nadal jest narażony mimo zastosowanych środków?',
  },
  plr: {
    step: 'Krok 3 — PLr (ISO 13849-1)',
    title: 'PLr to wymaganie dla układu sterowania, nie ocena ryzyka',
    lead: 'PLr określa jak niezawodny musi być układ sterowania realizujący daną funkcję bezpieczeństwa. To nie jest wynik oceny ryzyka — to wymaganie projektowe wynikające z tej oceny.',
    body: [
      'Parametr P (możliwość uniknięcia) w kontekście PLr to coś innego niż P w ocenie S×P. Tutaj P1 oznacza że operator może zauważyć zagrożenie i wycofać się — P2 że nie ma takiej możliwości.',
      'Domyślna wartość P2 jest konserwatywna i bezpieczna. Ostateczna weryfikacja MTTFd, DCavg i kategorii architektury należy do producenta lub certyfikowanego specjalisty ds. bezpieczeństwa funkcjonalnego.',
    ],
    question: 'Czy operator ma realną możliwość wykrycia zagrożenia i wycofania się zanim nastąpi zdarzenie?',
  },
  lifecycle: {
    step: 'Krok 3 — Etapy cyklu życia (ISO 12100 §5.4)',
    title: 'Największe ryzyko pojawia się poza normalną pracą',
    lead: 'Najgroźniejsze sytuacje rzadko zdarzają się podczas rutynowej, automatycznej pracy. Pojawiają się gdy zmienia się relacja człowiek–maszyna i dotychczasowa separacja przestaje działać.',
    body: [
      'Do takich sytuacji należą: usuwanie zacięć i zakłóceń, przezbrojenia i regulacje, czyszczenie i konserwacja, diagnostyka i interwencje serwisowe.',
      'Automatyzacja nie eliminuje ryzyka — zmienia jego charakter. Im wyższy poziom automatyzacji, tym rzadziej, ale bardziej niebezpiecznie człowiek wchodzi w kontakt z maszyną.',
    ],
    question: 'Czy zagrożenie zostało przeanalizowane dla wszystkich etapów życia maszyny, nie tylko normalnej pracy?',
  },
  summary: {
    step: 'Krok 4 — Podsumowanie',
    title: 'Analiza ryzyka to akt odpowiedzialności, nie formularz',
    lead: 'Narzędzie może Cię przeprowadzić przez proces, ale nie może myśleć za Ciebie. Dokument który wygląda profesjonalnie — nie jest automatycznie poprawny.',
    body: [
      'Przed podpisaniem analizy zadaj sobie pytania: Czy byłem fizycznie przy tej maszynie? Czy rozmawiałem z operatorami? Czy każda wartość S i P wynika z mojej obserwacji — nie z podpowiedzi systemu?',
      'Automatyzacja nie eliminuje ryzyka — zmienia jego charakter. Zawsze sprawdź: czy po automatyzacji nie pojawiły się nowe, rzadkie, ale bardzo niebezpieczne zadania?',
    ],
    question: 'Czy mam kompetencje i wiedzę o tej konkretnej maszynie, żeby samodzielnie podpisać tę analizę?',
  },
  nav: { prev: '← Poprzedni', next: 'Następny →' },
}

const en: TipSet = {
  'machine-limits': {
    step: 'Step 2 — Machine Limits (ISO 12100 §5.3)',
    title: 'Risk is not a property of the machine',
    lead: 'Risk does not exist in isolation — it only emerges when a person interacts with the machine while performing a specific task.',
    body: [
      'Machine limits (per PN-EN ISO 12100) define the framework for evaluating use: intended purpose, reasonably foreseeable misuse, working environment, users, and the entire lifecycle from transport and installation to decommissioning.',
      'Without clear limits, risk assessment becomes either too narrow (missing rare but critical tasks) or too broad (mixing different situations and losing precision).',
    ],
    question: 'At what moments is the person closest to the hazards, and why?',
  },
  'hazard-analysis': {
    step: 'Step 3 — Hazard Analysis',
    title: "Don't assess hazards — assess tasks",
    lead: 'A hazard may exist in the machine at all times, but risk is only real when a person can access it while performing a specific task.',
    body: [
      'For every hazard, always think in terms of tasks: what task is the operator or maintenance worker performing, in what machine state, and is the person exposed at that moment?',
      "If you can't describe a specific scenario — when and during which task the hazard materialises — this indicates the hazard is poorly defined or purely theoretical.",
    ],
    question: 'What specific task is the person performing when this hazard becomes real?',
  },
  'sp-params': {
    step: 'Step 3 — S and P Parameters',
    title: 'S and P must come from your own observation',
    lead: 'S and P values are not a choice from a list — they describe reality. The system suggests, but cannot replace your knowledge of the specific machine and the people working with it.',
    body: [
      'Assess S for the worst realistic scenario, not the average. If a hazard can lead to death — S=4, regardless of how unlikely it may seem.',
      'P is a combination of three factors: how often the operator is in the hazard zone, how long they remain there, and whether they have a realistic chance of noticing the hazard and withdrawing.',
    ],
    question: 'Does the S and P justification describe what actually happens at this machine?',
  },
  'protective-measures': {
    step: 'Step 3 — Protective Measures (ISO 12100 §6.2)',
    title: 'A protective measure must fit the task',
    lead: 'The best technical safeguard on paper can be worthless if it significantly hinders the performance of a normal task. The operator will then bypass or disable it.',
    body: [
      'Always follow the hierarchy: elimination at source → technical protective measures → organisational and informational. Apply each lower level only when the higher one is not possible.',
      'Organisational measures (training, PPE, instructions) can never be the only layer of protection for high-risk hazards.',
    ],
    question: 'Does this safeguard allow the task to be performed safely, or does it rather hinder it?',
  },
  'residual-risk': {
    step: 'Step 3 — Residual Risk',
    title: 'Residual risk is not just "what remained"',
    lead: 'Residual risk is the level of risk that still exists during actual task performance — after all protective measures have been applied.',
    body: [
      'Even after protective measures are applied, the question always remains: in what tasks and situations is the person still exposed to this hazard?',
      'If you cannot identify those tasks — residual risk is underestimated. The greatest risk often appears outside normal operation: during jam clearing, changeovers, cleaning, and servicing.',
    ],
    question: 'In what specific situations is the person still exposed despite the applied measures?',
  },
  plr: {
    step: 'Step 3 — PLr (ISO 13849-1)',
    title: 'PLr is a control system requirement, not a risk assessment',
    lead: 'PLr defines how reliable the control system implementing a given safety function must be. It is not a result of the risk assessment — it is a design requirement derived from it.',
    body: [
      'The P parameter (possibility of avoidance) in the PLr context differs from P in the S×P assessment. Here P1 means the operator can notice the hazard and withdraw — P2 means they cannot.',
      'The default value P2 is conservative and safe. Final verification of MTTFd, DCavg and architecture category belongs to the machine manufacturer or a certified functional safety specialist.',
    ],
    question: 'Does the operator have a realistic chance of detecting the hazard and withdrawing before an incident occurs?',
  },
  lifecycle: {
    step: 'Step 3 — Lifecycle Stages (ISO 12100 §5.4)',
    title: 'The greatest risk appears outside normal operation',
    lead: 'The most dangerous situations rarely occur during routine, automated work. They appear when the human–machine relationship changes and existing separation ceases to work in practice.',
    body: [
      'Such situations include: clearing jams and process disturbances, changeovers and adjustments, cleaning and maintenance, diagnostics and service interventions.',
      'Automation does not eliminate risk — it changes its nature. The higher the level of automation, the less frequently but more dangerously a person comes into contact with the machine.',
    ],
    question: 'Has the hazard been analysed for all lifecycle stages of the machine, not just normal operation?',
  },
  summary: {
    step: 'Step 4 — Summary',
    title: 'Risk assessment is an act of responsibility, not a form',
    lead: "The tool can guide you through the process, but it cannot think for you. A document that looks professional is not automatically correct.",
    body: [
      'Before signing the analysis, ask yourself: Was I physically present at this machine? Did I speak with operators? Does every S and P value come from my own observation — not from system suggestions?',
      'Automation does not eliminate risk — it changes its nature. Always check: has automation introduced new, rare but very dangerous tasks?',
    ],
    question: 'Do I have the competence and knowledge of this specific machine to sign this analysis independently?',
  },
  nav: { prev: '← Previous', next: 'Next →' },
}

const de: TipSet = {
  'machine-limits': {
    step: 'Schritt 2 — Maschinengrenzen (ISO 12100 §5.3)',
    title: 'Risiko ist keine Eigenschaft der Maschine',
    lead: 'Risiko existiert nicht isoliert — es tritt erst auf, wenn ein Mensch bei der Ausführung einer bestimmten Aufgabe mit der Maschine interagiert.',
    body: [
      'Maschinengrenzen (gemäß PN-EN ISO 12100) definieren den Rahmen für die Beurteilung: bestimmungsgemäße Verwendung, vernünftigerweise vorhersehbarer Fehlgebrauch, Arbeitsumgebung, Benutzer und den gesamten Lebenszyklus von Transport und Installation bis zur Demontage.',
      'Ohne klare Grenzen wird die Risikobeurteilung entweder zu eng (seltene, aber kritische Aufgaben werden übersehen) oder zu allgemein (verschiedene Situationen werden vermischt und die Präzision geht verloren).',
    ],
    question: 'In welchen Momenten befindet sich der Mensch am nächsten an den Gefährdungen, und warum?',
  },
  'hazard-analysis': {
    step: 'Schritt 3 — Gefahrenanalyse',
    title: 'Beurteile keine Gefährdungen — beurteile Aufgaben',
    lead: 'Eine Gefährdung kann dauerhaft in der Maschine vorhanden sein, aber das Risiko ist nur real, wenn ein Mensch bei der Ausführung einer bestimmten Aufgabe Zugang zu ihr hat.',
    body: [
      'Denke bei jeder Gefährdung aufgabenorientiert: Welche Aufgabe führt der Bediener oder Wartungstechniker aus, in welchem Maschinenzustand, und ist die Person in diesem Moment exponiert?',
      'Wenn du kein konkretes Szenario beschreiben kannst — wann und bei welcher Aufgabe sich die Gefährdung materialisiert — ist dies ein Zeichen dafür, dass die Gefährdung schlecht definiert oder rein theoretisch ist.',
    ],
    question: 'Welche konkrete Aufgabe führt der Mensch aus, wenn diese Gefährdung real wird?',
  },
  'sp-params': {
    step: 'Schritt 3 — Parameter S und P',
    title: 'S und P müssen aus eigener Beobachtung stammen',
    lead: 'S- und P-Werte sind keine Auswahl aus einer Liste — sie beschreiben die Realität. Das System macht Vorschläge, kann aber dein Wissen über die konkrete Maschine nicht ersetzen.',
    body: [
      'Bewerte S für das schlimmste realistische Szenario, nicht für den Durchschnitt. Wenn eine Gefährdung zum Tod führen kann — S=4, unabhängig davon wie unwahrscheinlich das erscheint.',
      'P ist eine Kombination aus drei Faktoren: Wie oft befindet sich der Bediener in der Gefahrenzone, wie lange hält er sich dort auf, und hat er eine realistische Chance, die Gefährdung zu bemerken und sich zurückzuziehen?',
    ],
    question: 'Beschreibt die S- und P-Begründung das, was wirklich an dieser Maschine passiert?',
  },
  'protective-measures': {
    step: 'Schritt 3 — Schutzmaßnahmen (ISO 12100 §6.2)',
    title: 'Eine Schutzmaßnahme muss zur Aufgabe passen',
    lead: 'Die beste technische Schutzmaßnahme auf dem Papier kann wertlos sein, wenn sie die Ausführung einer normalen Aufgabe stark erschwert. Der Bediener wird sie dann umgehen oder deaktivieren.',
    body: [
      'Prüfe immer die Hierarchie: Beseitigung an der Quelle → technische Schutzmaßnahmen → organisatorische und informative. Jede niedrigere Ebene wird nur angewendet, wenn die höhere nicht möglich ist.',
      'Organisatorische Maßnahmen (Schulungen, PSA, Anweisungen) dürfen niemals die einzige Schutzschicht für Hochrisikogefährdungen sein.',
    ],
    question: 'Ermöglicht diese Schutzmaßnahme eine sichere Aufgabenausführung, oder erschwert sie diese eher?',
  },
  'residual-risk': {
    step: 'Schritt 3 — Restrisiko',
    title: 'Restrisiko ist nicht nur „was übrig blieb"',
    lead: 'Restrisiko ist das Risikoniveau, das bei der tatsächlichen Aufgabenausführung noch besteht — nachdem alle Schutzmaßnahmen angewendet wurden.',
    body: [
      'Auch nach Anwendung von Schutzmaßnahmen bleibt immer die Frage: Bei welchen Aufgaben und Situationen ist die Person noch dieser Gefährdung ausgesetzt?',
      'Wenn du diese Aufgaben nicht benennen kannst — ist das Restrisiko unterschätzt. Das größte Risiko tritt oft außerhalb des Normalbetriebs auf: bei Stauungsbeseitigung, Umrüstungen, Reinigung, Wartung.',
    ],
    question: 'In welchen konkreten Situationen ist die Person trotz angewandter Maßnahmen noch exponiert?',
  },
  plr: {
    step: 'Schritt 3 — PLr (ISO 13849-1)',
    title: 'PLr ist eine Steuerungsanforderung, keine Risikobewertung',
    lead: 'PLr legt fest, wie zuverlässig das Steuerungssystem sein muss, das eine bestimmte Sicherheitsfunktion realisiert. Es ist kein Ergebnis der Risikobewertung — es ist eine daraus abgeleitete Konstruktionsanforderung.',
    body: [
      'Der Parameter P (Vermeidungsmöglichkeit) im PLr-Kontext unterscheidet sich vom P in der S×P-Bewertung. Hier bedeutet P1, dass der Bediener die Gefährdung bemerken und sich zurückziehen kann — P2, dass dies nicht möglich ist.',
      'Der Standardwert P2 ist konservativ und sicher. Die abschließende Überprüfung von MTTFd, DCavg und Architekturkategorie obliegt dem Maschinenhersteller oder einem zertifizierten Funktionssicherheitsspezialisten.',
    ],
    question: 'Hat der Bediener eine realistische Möglichkeit, die Gefährdung zu erkennen und sich zurückzuziehen, bevor ein Ereignis eintritt?',
  },
  lifecycle: {
    step: 'Schritt 3 — Lebenszyklusphasen (ISO 12100 §5.4)',
    title: 'Das größte Risiko tritt außerhalb des Normalbetriebs auf',
    lead: 'Die gefährlichsten Situationen treten selten während der routinemäßigen, automatischen Arbeit auf. Sie entstehen, wenn sich die Mensch-Maschine-Beziehung ändert und die bisherige Trennung in der Praxis nicht mehr funktioniert.',
    body: [
      'Solche Situationen umfassen: Beseitigung von Stauungen und Prozessstörungen, Umrüstungen und Einstellungen, Reinigung und Wartung, Diagnose und Serviceeingriffe.',
      'Automatisierung beseitigt kein Risiko — sie verändert seinen Charakter. Je höher der Automatisierungsgrad, desto seltener, aber gefährlicher kommt ein Mensch mit der Maschine in Kontakt.',
    ],
    question: 'Wurde die Gefährdung für alle Lebenszyklusphasen der Maschine analysiert, nicht nur für den Normalbetrieb?',
  },
  summary: {
    step: 'Schritt 4 — Zusammenfassung',
    title: 'Risikobeurteilung ist ein Akt der Verantwortung, kein Formular',
    lead: 'Das Tool kann dich durch den Prozess führen, aber es kann nicht für dich denken. Ein professionell aussehendes Dokument ist nicht automatisch korrekt.',
    body: [
      'Frage dich vor der Unterzeichnung: War ich physisch an dieser Maschine und habe ich ihren Betrieb beobachtet? Habe ich mit Bedienern gesprochen? Basiert jeder S- und P-Wert auf meiner eigenen Beobachtung — nicht auf Systemvorschlägen?',
      'Automatisierung beseitigt kein Risiko — sie verändert seinen Charakter. Prüfe immer: Hat die Automatisierung neue, seltene, aber sehr gefährliche Aufgaben eingeführt?',
    ],
    question: 'Habe ich die Kompetenz und das Wissen über diese konkrete Maschine, um diese Analyse selbständig zu unterzeichnen?',
  },
  nav: { prev: '← Vorherige', next: 'Nächste →' },
}

const fr: TipSet = {
  'machine-limits': {
    step: 'Étape 2 — Limites machine (ISO 12100 §5.3)',
    title: "Le risque n'est pas une propriété de la machine",
    lead: "Le risque n'existe pas de façon isolée — il n'apparaît que lorsqu'une personne interagit avec la machine en réalisant une tâche spécifique.",
    body: [
      "Les limites de la machine (selon PN-EN ISO 12100) définissent le cadre d'évaluation : utilisation prévue, mauvais usage raisonnablement prévisible, environnement de travail, utilisateurs et tout le cycle de vie du transport et de l'installation au démontage.",
      "Sans limites claires, l'évaluation des risques devient soit trop étroite (elle omet des tâches rares mais critiques), soit trop générale (elle mélange différentes situations et perd en précision).",
    ],
    question: "À quels moments la personne se trouve-t-elle le plus près des dangers, et pourquoi ?",
  },
  'hazard-analysis': {
    step: 'Étape 3 — Analyse des dangers',
    title: "N'évaluez pas les dangers — évaluez les tâches",
    lead: "Un danger peut exister en permanence dans la machine, mais le risque n'est réel que lorsqu'une personne y a accès lors de l'exécution d'une tâche spécifique.",
    body: [
      "Pour chaque danger, pensez toujours en termes de tâches : quelle tâche effectue l'opérateur ou le technicien de maintenance, dans quel état de la machine, et la personne est-elle exposée à ce moment-là ?",
      "Si vous ne pouvez pas décrire un scénario concret — quand et lors de quelle tâche le danger se matérialise — c'est le signe que le danger est mal défini ou purement théorique.",
    ],
    question: "Quelle tâche concrète la personne effectue-t-elle lorsque ce danger devient réel ?",
  },
  'sp-params': {
    step: 'Étape 3 — Paramètres S et P',
    title: 'S et P doivent venir de votre propre observation',
    lead: "Les valeurs S et P ne sont pas un choix dans une liste — elles décrivent la réalité. Le système suggère, mais ne peut pas remplacer votre connaissance de la machine spécifique.",
    body: [
      "Évaluez S pour le pire scénario réaliste, pas pour le scénario moyen. Si un danger peut entraîner la mort — S=4, quelle que soit la probabilité apparente.",
      "P est une combinaison de trois facteurs : la fréquence à laquelle l'opérateur se trouve dans la zone de danger, la durée de sa présence et s'il a une possibilité réelle de remarquer le danger et de se retirer.",
    ],
    question: "La justification S et P décrit-elle ce qui se passe réellement à cette machine ?",
  },
  'protective-measures': {
    step: 'Étape 3 — Mesures de protection (ISO 12100 §6.2)',
    title: 'Une mesure de protection doit correspondre à la tâche',
    lead: "La meilleure protection technique sur le papier peut être sans valeur si elle gêne considérablement l'exécution d'une tâche normale. L'opérateur la contournera ou la désactivera alors.",
    body: [
      "Vérifiez toujours la hiérarchie : élimination à la source → mesures de protection techniques → organisationnelles et informatives. Chaque niveau inférieur n'est appliqué que si le niveau supérieur est impossible.",
      "Les mesures organisationnelles (formation, EPI, instructions) ne peuvent jamais être l'unique couche de protection pour les dangers à haut risque.",
    ],
    question: "Cette protection permet-elle d'effectuer la tâche en toute sécurité, ou la gêne-t-elle plutôt ?",
  },
  'residual-risk': {
    step: 'Étape 3 — Risque résiduel',
    title: "Le risque résiduel n'est pas seulement \"ce qui reste\"",
    lead: "Le risque résiduel est le niveau de risque qui subsiste lors de l'exécution réelle des tâches — après application de toutes les mesures de protection.",
    body: [
      "Même après l'application des mesures de protection, la question reste toujours : dans quelles tâches et situations la personne est-elle encore exposée à ce danger ?",
      "Si vous ne pouvez pas identifier ces tâches — le risque résiduel est sous-estimé. Le plus grand risque apparaît souvent en dehors du travail normal : lors du dégagement de bourrage, des changements de série, du nettoyage, de la maintenance.",
    ],
    question: "Dans quelles situations concrètes la personne est-elle encore exposée malgré les mesures appliquées ?",
  },
  plr: {
    step: 'Étape 3 — PLr (ISO 13849-1)',
    title: "PLr est une exigence pour le système de commande, pas une évaluation des risques",
    lead: "PLr définit la fiabilité requise du système de commande réalisant une fonction de sécurité donnée. Ce n'est pas le résultat d'une évaluation des risques — c'est une exigence de conception qui en découle.",
    body: [
      "Le paramètre P (possibilité d'évitement) dans le contexte PLr diffère du P dans l'évaluation S×P. Ici P1 signifie que l'opérateur peut remarquer le danger et se retirer — P2 qu'il ne le peut pas.",
      "La valeur par défaut P2 est conservative et sûre. La vérification finale des paramètres MTTFd, DCavg et de la catégorie d'architecture appartient au fabricant de la machine ou à un spécialiste certifié.",
    ],
    question: "L'opérateur a-t-il une possibilité réelle de détecter le danger et de se retirer avant qu'un événement ne se produise ?",
  },
  lifecycle: {
    step: 'Étape 3 — Phases du cycle de vie (ISO 12100 §5.4)',
    title: "Le plus grand risque apparaît en dehors du travail normal",
    lead: "Les situations les plus dangereuses surviennent rarement lors du travail routinier et automatisé. Elles apparaissent lorsque la relation homme-machine change et que la séparation existante cesse de fonctionner en pratique.",
    body: [
      "Ces situations comprennent : le dégagement de bourrages et de perturbations de processus, les changements de série et réglages, le nettoyage et la maintenance, le diagnostic et les interventions de service.",
      "L'automatisation n'élimine pas le risque — elle en change la nature. Plus le niveau d'automatisation est élevé, plus rarement mais plus dangereusement une personne entre en contact avec la machine.",
    ],
    question: "Le danger a-t-il été analysé pour toutes les phases du cycle de vie de la machine, pas seulement le fonctionnement normal ?",
  },
  summary: {
    step: 'Étape 4 — Résumé',
    title: "L'évaluation des risques est un acte de responsabilité, pas un formulaire",
    lead: "L'outil peut vous guider dans le processus, mais il ne peut pas penser à votre place. Un document qui semble professionnel n'est pas automatiquement correct.",
    body: [
      "Avant de signer l'analyse, posez-vous ces questions : Étais-je physiquement présent à cette machine et ai-je observé son fonctionnement ? Ai-je parlé avec les opérateurs ? Chaque valeur S et P provient-elle de ma propre observation — pas des suggestions du système ?",
      "L'automatisation n'élimine pas le risque — elle en change la nature. Vérifiez toujours : l'automatisation a-t-elle introduit de nouvelles tâches rares mais très dangereuses ?",
    ],
    question: "Ai-je les compétences et les connaissances de cette machine spécifique pour signer cette analyse de façon indépendante ?",
  },
  nav: { prev: '← Précédent', next: 'Suivant →' },
}

const it: TipSet = {
  'machine-limits': {
    step: 'Passo 2 — Limiti macchina (ISO 12100 §5.3)',
    title: 'Il rischio non è una proprietà della macchina',
    lead: "Il rischio non esiste in modo isolato — emerge solo quando una persona interagisce con la macchina durante l'esecuzione di un compito specifico.",
    body: [
      "I limiti della macchina (secondo PN-EN ISO 12100) definiscono il quadro di valutazione: uso previsto, uso improprio ragionevolmente prevedibile, ambiente di lavoro, utenti e l'intero ciclo di vita dal trasporto e dall'installazione allo smontaggio.",
      "Senza limiti chiari, la valutazione dei rischi diventa o troppo ristretta (omette compiti rari ma critici) o troppo generale (mescola situazioni diverse e perde precisione).",
    ],
    question: 'In quali momenti la persona si trova più vicina ai pericoli e perché?',
  },
  'hazard-analysis': {
    step: 'Passo 3 — Analisi pericoli',
    title: 'Non valutare i pericoli — valuta i compiti',
    lead: "Un pericolo può esistere nella macchina in ogni momento, ma il rischio è reale solo quando una persona vi ha accesso durante l'esecuzione di un compito specifico.",
    body: [
      "Per ogni pericolo, pensa sempre in termini di compiti: quale compito sta eseguendo l'operatore o il manutentore, in quale stato della macchina, e la persona è esposta in quel momento?",
      "Se non riesci a descrivere uno scenario concreto — quando e durante quale compito il pericolo si materializza — questo indica che il pericolo è mal definito o puramente teorico.",
    ],
    question: 'Quale compito specifico sta svolgendo la persona quando questo pericolo diventa reale?',
  },
  'sp-params': {
    step: 'Passo 3 — Parametri S e P',
    title: 'S e P devono derivare dalla tua osservazione',
    lead: "I valori S e P non sono una scelta da un elenco — descrivono la realtà. Il sistema suggerisce, ma non può sostituire la tua conoscenza della macchina specifica.",
    body: [
      "Valuta S per il peggior scenario realistico, non per quello medio. Se un pericolo può portare alla morte — S=4, indipendentemente da quanto improbabile possa sembrare.",
      "P è una combinazione di tre fattori: la frequenza con cui l'operatore si trova nella zona di pericolo, quanto tempo vi trascorre e se ha una possibilità reale di notare il pericolo e ritirarsi.",
    ],
    question: 'La giustificazione S e P descrive ciò che accade realmente a questa macchina?',
  },
  'protective-measures': {
    step: 'Passo 3 — Misure di protezione (ISO 12100 §6.2)',
    title: 'Una misura di protezione deve adattarsi al compito',
    lead: "La migliore protezione tecnica sulla carta può essere inutile se ostacola notevolmente l'esecuzione di un compito normale. L'operatore la aggirerà o disabiliterà.",
    body: [
      "Verifica sempre la gerarchia: eliminazione alla fonte → misure di protezione tecniche → organizzative e informative. Ogni livello inferiore si applica solo quando il livello superiore è impossibile.",
      "Le misure organizzative (formazione, DPI, istruzioni) non possono mai essere l'unico strato di protezione per i pericoli ad alto rischio.",
    ],
    question: 'Questa protezione consente di eseguire il compito in modo sicuro, o piuttosto lo ostacola?',
  },
  'residual-risk': {
    step: 'Passo 3 — Rischio residuo',
    title: 'Il rischio residuo non è solo "ciò che è rimasto"',
    lead: "Il rischio residuo è il livello di rischio che esiste ancora durante l'effettiva esecuzione dei compiti — dopo l'applicazione di tutte le misure di protezione.",
    body: [
      "Anche dopo l'applicazione delle misure di protezione, rimane sempre la domanda: in quali compiti e situazioni la persona è ancora esposta a questo pericolo?",
      "Se non riesci a identificare questi compiti — il rischio residuo è sottostimato. Il rischio maggiore appare spesso al di fuori del lavoro normale: durante la rimozione di inceppamenti, i cambi di formato, la pulizia, la manutenzione.",
    ],
    question: 'In quali situazioni concrete la persona è ancora esposta nonostante le misure applicate?',
  },
  plr: {
    step: 'Passo 3 — PLr (ISO 13849-1)',
    title: 'PLr è un requisito per il sistema di controllo, non una valutazione del rischio',
    lead: "PLr definisce quanto deve essere affidabile il sistema di controllo che realizza una determinata funzione di sicurezza. Non è il risultato della valutazione del rischio — è un requisito di progettazione che ne deriva.",
    body: [
      "Il parametro P (possibilità di evitamento) nel contesto PLr è diverso dal P nella valutazione S×P. Qui P1 significa che l'operatore può notare il pericolo e ritirarsi — P2 che non è possibile.",
      "Il valore predefinito P2 è conservativo e sicuro. La verifica finale di MTTFd, DCavg e categoria di architettura spetta al costruttore della macchina o a uno specialista certificato.",
    ],
    question: "L'operatore ha una possibilità realistica di rilevare il pericolo e ritirarsi prima che si verifichi un evento?",
  },
  lifecycle: {
    step: 'Passo 3 — Fasi del ciclo di vita (ISO 12100 §5.4)',
    title: 'Il rischio maggiore appare al di fuori del lavoro normale',
    lead: "Le situazioni più pericolose si verificano raramente durante il lavoro di routine e automatizzato. Appaiono quando cambia la relazione uomo-macchina e la separazione esistente cessa di funzionare nella pratica.",
    body: [
      "Tali situazioni includono: rimozione di inceppamenti e disturbi di processo, cambi di formato e regolazioni, pulizia e manutenzione, diagnostica e interventi di servizio.",
      "L'automazione non elimina il rischio — ne cambia la natura. Più alto è il livello di automazione, meno frequentemente ma più pericolosamente una persona entra in contatto con la macchina.",
    ],
    question: "Il pericolo è stato analizzato per tutte le fasi del ciclo di vita della macchina, non solo per il funzionamento normale?",
  },
  summary: {
    step: 'Passo 4 — Riepilogo',
    title: 'La valutazione del rischio è un atto di responsabilità, non un modulo',
    lead: "Lo strumento può guidarti nel processo, ma non può pensare al tuo posto. Un documento che sembra professionale non è automaticamente corretto.",
    body: [
      "Prima di firmare l'analisi, chiediti: Ero fisicamente presente a questa macchina e ne ho osservato il funzionamento? Ho parlato con gli operatori? Ogni valore S e P deriva dalla mia osservazione — non dai suggerimenti del sistema?",
      "L'automazione non elimina il rischio — ne cambia la natura. Verifica sempre: l'automazione ha introdotto nuovi compiti rari ma molto pericolosi?",
    ],
    question: 'Ho le competenze e le conoscenze di questa macchina specifica per firmare questa analisi in modo indipendente?',
  },
  nav: { prev: '← Precedente', next: 'Successivo →' },
}

const es: TipSet = {
  'machine-limits': {
    step: 'Paso 2 — Límites máquina (ISO 12100 §5.3)',
    title: 'El riesgo no es una propiedad de la máquina',
    lead: 'El riesgo no existe de forma aislada — solo aparece cuando una persona interactúa con la máquina al realizar una tarea específica.',
    body: [
      'Los límites de la máquina (según PN-EN ISO 12100) definen el marco de evaluación: uso previsto, mal uso razonablemente previsible, entorno de trabajo, usuarios y todo el ciclo de vida desde el transporte e instalación hasta el desmontaje.',
      'Sin límites claros, la evaluación de riesgos se vuelve demasiado estrecha (omite tareas raras pero críticas) o demasiado general (mezcla situaciones diferentes y pierde precisión).',
    ],
    question: '¿En qué momentos la persona se encuentra más cerca de los peligros y por qué?',
  },
  'hazard-analysis': {
    step: 'Paso 3 — Análisis de peligros',
    title: 'No evalúes peligros — evalúa tareas',
    lead: 'Un peligro puede existir en la máquina en todo momento, pero el riesgo solo es real cuando una persona tiene acceso a él durante la realización de una tarea específica.',
    body: [
      '¿Qué tarea realiza el operador o el técnico de mantenimiento, en qué estado de la máquina y está la persona expuesta en ese momento? Piensa siempre en términos de tareas.',
      'Si no puedes describir un escenario concreto — cuándo y durante qué tarea se materializa el peligro — esto indica que el peligro está mal definido o es puramente teórico.',
    ],
    question: '¿Qué tarea concreta realiza la persona cuando este peligro se vuelve real?',
  },
  'sp-params': {
    step: 'Paso 3 — Parámetros S y P',
    title: 'S y P deben provenir de tu propia observación',
    lead: 'Los valores S y P no son una elección de una lista — describen la realidad. El sistema sugiere, pero no puede reemplazar tu conocimiento de la máquina específica.',
    body: [
      'Evalúa S para el peor escenario realista, no para el promedio. Si un peligro puede llevar a la muerte — S=4, independientemente de cuán improbable parezca.',
      'P es una combinación de tres factores: con qué frecuencia el operador está en la zona de peligro, cuánto tiempo permanece allí y si tiene una posibilidad real de notar el peligro y retirarse.',
    ],
    question: '¿La justificación S y P describe lo que realmente ocurre en esta máquina?',
  },
  'protective-measures': {
    step: 'Paso 3 — Medidas de protección (ISO 12100 §6.2)',
    title: 'Una medida de protección debe adaptarse a la tarea',
    lead: 'La mejor protección técnica sobre el papel puede ser inútil si dificulta considerablemente la realización de una tarea normal. El operador la esquivará o desactivará.',
    body: [
      'Verifica siempre la jerarquía: eliminación en la fuente → medidas de protección técnicas → organizativas e informativas. Cada nivel inferior solo se aplica cuando el superior es imposible.',
      'Las medidas organizativas (formación, EPI, instrucciones) nunca pueden ser la única capa de protección para los peligros de alto riesgo.',
    ],
    question: '¿Esta protección permite realizar la tarea de forma segura, o más bien la dificulta?',
  },
  'residual-risk': {
    step: 'Paso 3 — Riesgo residual',
    title: 'El riesgo residual no es solo "lo que quedó"',
    lead: 'El riesgo residual es el nivel de riesgo que aún existe durante la ejecución real de las tareas — después de aplicar todas las medidas de protección.',
    body: [
      'Incluso después de aplicar medidas de protección, siempre queda la pregunta: ¿en qué tareas y situaciones la persona sigue expuesta a este peligro?',
      'Si no puedes identificar esas tareas — el riesgo residual está subestimado. El mayor riesgo a menudo aparece fuera del trabajo normal: al eliminar atascos, en los cambios de formato, en la limpieza, en el mantenimiento.',
    ],
    question: '¿En qué situaciones concretas la persona sigue expuesta a pesar de las medidas aplicadas?',
  },
  plr: {
    step: 'Paso 3 — PLr (ISO 13849-1)',
    title: 'PLr es un requisito para el sistema de control, no una evaluación de riesgos',
    lead: 'PLr define la fiabilidad requerida del sistema de control que realiza una función de seguridad determinada. No es el resultado de la evaluación de riesgos — es un requisito de diseño derivado de ella.',
    body: [
      'El parámetro P (posibilidad de evitamiento) en el contexto PLr difiere del P en la evaluación S×P. Aquí P1 significa que el operador puede notar el peligro y retirarse — P2 que no es posible.',
      'El valor predeterminado P2 es conservador y seguro. La verificación final de MTTFd, DCavg y la categoría de arquitectura corresponde al fabricante de la máquina o a un especialista certificado.',
    ],
    question: '¿Tiene el operador una posibilidad real de detectar el peligro y retirarse antes de que ocurra un evento?',
  },
  lifecycle: {
    step: 'Paso 3 — Fases del ciclo de vida (ISO 12100 §5.4)',
    title: 'El mayor riesgo aparece fuera del trabajo normal',
    lead: 'Las situaciones más peligrosas raramente ocurren durante el trabajo rutinario y automatizado. Aparecen cuando cambia la relación persona-máquina y la separación existente deja de funcionar en la práctica.',
    body: [
      'Tales situaciones incluyen: eliminación de atascos y perturbaciones del proceso, cambios de formato y ajustes, limpieza y mantenimiento, diagnóstico e intervenciones de servicio.',
      'La automatización no elimina el riesgo — cambia su naturaleza. Cuanto mayor es el nivel de automatización, menos frecuente pero más peligrosamente una persona entra en contacto con la máquina.',
    ],
    question: '¿Se ha analizado el peligro para todas las fases del ciclo de vida de la máquina, no solo el funcionamiento normal?',
  },
  summary: {
    step: 'Paso 4 — Resumen',
    title: 'La evaluación de riesgos es un acto de responsabilidad, no un formulario',
    lead: 'La herramienta puede guiarte en el proceso, pero no puede pensar por ti. Un documento que parece profesional no es automáticamente correcto.',
    body: [
      '¿Estuve físicamente en esta máquina y observé su funcionamiento? ¿Hablé con los operadores? ¿Cada valor S y P proviene de mi propia observación — no de las sugerencias del sistema? Hazte estas preguntas antes de firmar.',
      'La automatización no elimina el riesgo — cambia su naturaleza. Verifica siempre: ¿la automatización ha introducido nuevas tareas raras pero muy peligrosas?',
    ],
    question: '¿Tengo la competencia y el conocimiento de esta máquina específica para firmar este análisis de forma independiente?',
  },
  nav: { prev: '← Anterior', next: 'Siguiente →' },
}

const cs: TipSet = {
  'machine-limits': {
    step: 'Krok 2 — Limity stroje (ISO 12100 §5.3)',
    title: 'Riziko není vlastností stroje',
    lead: 'Riziko neexistuje izolovaně — projevuje se teprve v okamžiku, kdy člověk vstupuje do přímé interakce se strojem při vykonávání konkrétního úkolu.',
    body: [
      'Limity stroje (dle PN-EN ISO 12100) definují rámec pro hodnocení použití: zamýšlené použití, rozumně předvídatelné nesprávné použití, pracovní prostředí, uživatele a celý životní cyklus od dopravy a instalace po demontáž.',
      'Bez jasných limitů se hodnocení rizik stává buď příliš úzkým (přehlíží vzácné, ale kritické úkoly), nebo příliš obecným (míchá různé situace a ztrácí přesnost).',
    ],
    question: 'Ve kterých okamžicích se člověk nachází nejblíže nebezpečím a proč?',
  },
  'hazard-analysis': {
    step: 'Krok 3 — Analýza nebezpečí',
    title: 'Nehodnoťte nebezpečí — hodnoťte úkoly',
    lead: 'Nebezpečí může ve stroji existovat neustále, ale riziko je reálné pouze tehdy, když k němu má člověk přístup při vykonávání konkrétního úkolu.',
    body: [
      'U každého nebezpečí vždy přemýšlejte úkolově: jaký úkol vykonává operátor nebo servisní technik, v jakém stavu stroje a je v tom okamžiku člověk vystaven nebezpečí?',
      'Pokud nedokážete popsat konkrétní scénář — kdy a při jakém úkolu se nebezpečí materializuje — je to znak, že nebezpečí je špatně definováno nebo čistě teoretické.',
    ],
    question: 'Jaký konkrétní úkol vykonává člověk, když se toto nebezpečí stává reálným?',
  },
  'sp-params': {
    step: 'Krok 3 — Parametry S a P',
    title: 'S a P musí vycházet z vašeho vlastního pozorování',
    lead: 'Hodnoty S a P nejsou výběrem ze seznamu — popisují realitu. Systém navrhuje, ale nemůže nahradit vaše znalosti konkrétního stroje a lidí, kteří u něj pracují.',
    body: [
      'S hodnoťte pro nejhorší realistický scénář, ne pro průměrný. Pokud může nebezpečí vést ke smrti — S=4, bez ohledu na to, jak nepravděpodobné se to zdá.',
      'P je kombinace tří faktorů: jak často je operátor v nebezpečné zóně, jak dlouho tam pobývá a zda má reálnou možnost nebezpečí zpozorovat a stáhnout se.',
    ],
    question: 'Popisuje odůvodnění S a P to, co se u tohoto stroje skutečně děje?',
  },
  'protective-measures': {
    step: 'Krok 3 — Ochranná opatření (ISO 12100 §6.2)',
    title: 'Ochranné opatření musí odpovídat úkolu',
    lead: 'Nejlepší technická ochrana na papíře může být bezcenná, pokud výrazně ztěžuje vykonávání normálního úkolu. Operátor ji pak bude obcházet nebo deaktivovat.',
    body: [
      'Vždy dodržujte hierarchii: eliminace u zdroje → technická ochranná opatření → organizační a informační. Každou nižší úroveň použijte pouze tehdy, když vyšší není možná.',
      'Organizační opatření (školení, OOPP, instrukce) nemohou být nikdy jedinou vrstvou ochrany pro vysoce riziková nebezpečí.',
    ],
    question: 'Umožňuje tato ochrana bezpečné vykonání úkolu, nebo ho spíše ztěžuje?',
  },
  'residual-risk': {
    step: 'Krok 3 — Zbytkové riziko',
    title: 'Zbytkové riziko není jen „to, co zbylo"',
    lead: 'Zbytkové riziko je úroveň rizika, která při skutečném vykonávání úkolů stále existuje — po aplikaci všech ochranných opatření.',
    body: [
      'I po aplikaci ochranných opatření vždy zůstává otázka: při jakých úkolech a situacích je člověk stále vystaven tomuto nebezpečí?',
      'Pokud tyto úkoly nedokážete identifikovat — zbytkové riziko je podhodnoceno. Největší riziko se často vyskytuje mimo normální provoz: při odstraňování zaseknutí, přestavbách, čištění, servisu.',
    ],
    question: 'V jakých konkrétních situacích je člověk stále vystaven navzdory aplikovaným opatřením?',
  },
  plr: {
    step: 'Krok 3 — PLr (ISO 13849-1)',
    title: 'PLr je požadavek na řídicí systém, ne hodnocení rizika',
    lead: 'PLr definuje, jak spolehlivý musí být řídicí systém realizující danou bezpečnostní funkci. Není to výsledek hodnocení rizik — je to konstrukční požadavek z něj vyplývající.',
    body: [
      'Parametr P (možnost vyhnutí) v kontextu PLr se liší od P v hodnocení S×P. Zde P1 znamená, že operátor může nebezpečí zpozorovat a stáhnout se — P2, že to není možné.',
      'Výchozí hodnota P2 je konzervativní a bezpečná. Konečná verifikace MTTFd, DCavg a kategorie architektury náleží výrobci stroje nebo certifikovanému specialistovi.',
    ],
    question: 'Má operátor reálnou možnost detekovat nebezpečí a stáhnout se dříve, než nastane událost?',
  },
  lifecycle: {
    step: 'Krok 3 — Fáze životního cyklu (ISO 12100 §5.4)',
    title: 'Největší riziko se vyskytuje mimo normální provoz',
    lead: 'Nejnebezpečnější situace zřídkakdy nastávají při rutinní, automatizované práci. Objevují se, když se mění vztah člověk–stroj a dosavadní separace přestává v praxi fungovat.',
    body: [
      'Mezi takové situace patří: odstraňování zaseknutí a poruch procesu, přestavby a seřizování, čištění a údržba, diagnostika a servisní zásahy.',
      'Automatizace neodstraňuje riziko — mění jeho charakter. Čím vyšší úroveň automatizace, tím méně často, ale nebezpečněji člověk přichází do kontaktu se strojem.',
    ],
    question: 'Bylo nebezpečí analyzováno pro všechny fáze životního cyklu stroje, nejen pro normální provoz?',
  },
  summary: {
    step: 'Krok 4 — Shrnutí',
    title: 'Hodnocení rizik je akt odpovědnosti, ne formulář',
    lead: 'Nástroj vás může provést procesem, ale nemůže myslet za vás. Dokument, který vypadá profesionálně, není automaticky správný.',
    body: [
      'Před podpisem analýzy se zeptejte sami sebe: Byl jsem fyzicky u tohoto stroje a pozoroval jsem jeho provoz? Mluvil jsem s operátory? Vychází každá hodnota S a P z mého vlastního pozorování — ne z návrhů systému?',
      'Automatizace neodstraňuje riziko — mění jeho charakter. Vždy zkontrolujte: nezavedla automatizace nové, vzácné, ale velmi nebezpečné úkoly?',
    ],
    question: 'Mám kompetence a znalosti tohoto konkrétního stroje, abych tuto analýzu samostatně podepsal?',
  },
  nav: { prev: '← Předchozí', next: 'Další →' },
}

const TIPS_BY_LANG: Record<TipLang, TipSet> = { pl, en, de, fr, it, es, cs }

export function getTips(lang: string): TipSet {
  const l = lang?.slice(0, 2) as TipLang
  return TIPS_BY_LANG[l] ?? TIPS_BY_LANG['en']
}