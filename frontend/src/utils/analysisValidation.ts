// frontend/src/utils/analysisValidation.ts
// Walidacja logiczna, normatywna, behawioralna i procesowa analiz ryzyka ISO 12100

// ─────────────────────────────────────────────────────────────────
// Stałe publiczne — używane też w UI (licznik znaków, live feedback)
// ─────────────────────────────────────────────────────────────────
export const MIN_JUST_LENGTH = 30

const JUNK_RE = [
  /^[a-zA-Z0-9]{1,2}$/,
  /^[-–—.…,]+$/,
  /^(tak|nie|ok|yes|no|ja|nein)$/i,
  /^(bo tak|bo nie|gdyż tak)$/i,
  /^n\/a$/i, /^nd\.?$/i, /^brak$/i,
  /^(test|asdf|qwer|aaaa|bbbb)$/i,
]

export function isJunkText(text: string): boolean {
  const t = text.trim()
  return t.length === 0 || JUNK_RE.some(p => p.test(t))
}

export type JustQuality = 'empty' | 'junk' | 'short' | 'ok'

export function getJustQuality(text: string | null | undefined): JustQuality {
  if (!text || text.trim().length === 0) return 'empty'
  if (isJunkText(text)) return 'junk'
  if (text.trim().length < MIN_JUST_LENGTH) return 'short'
  return 'ok'
}


export interface ValidationIssue {
    id: string
    type: 'block' | 'warn'           // block = twarda blokada, warn = soft warning
    layer: 'logical' | 'normative' | 'behavioural' | 'process'
    entryId?: string                  // jeśli dotyczy konkretnego zagrożenia
    message: string
    detail?: string
  }
  
  export interface ValidationResult {
    blocks: ValidationIssue[]         // blokują zapis
    warnings: ValidationIssue[]       // ostrzeżenia, nie blokują
    credibilityScore: number          // 0-100, wynik wiarygodności
    credibilityLabel: 'high' | 'medium' | 'low'
  }
  
  // ─────────────────────────────────────────────────────────────────
  // Typy wejściowe (podzbiór RiskEntry)
  // ─────────────────────────────────────────────────────────────────
  export interface EntryForValidation {
    id: string
    element: string
    threat: string
    effect: string
    severity: number
    probability: number
    riskScore: number
    actionLevel?: string | null       // 'design' | 'technical' | 'organisational' | null
    actionText?: string | null
    justificationS?: string | null
    justificationP?: string | null
    lifecycleStages?: string[]
    residualS?: number | null
    residualP?: number | null
    residualR?: number | null
    reductionLevel?: string | null
    plrF?: string | null
    plrP?: string | null
  }
  
  export interface FormForValidation {
    machineCategory?: string
    machineTypeId?: string           // precyzyjny ID maszyny (lathe-cnc, milling-cnc...) — używany do profili baseline
    machineLimitsIntended?: string
    machineLimitsForeseeable?: string
    machineLimitsSpatial?: string
    machineLimitsTime?: string
    preparedBy?: string
    approvedBy?: string
  }
  
  // ─────────────────────────────────────────────────────────────────
  // WARSTWA 1: WALIDACJA LOGICZNA
  // ─────────────────────────────────────────────────────────────────
  function validateLogical(entries: EntryForValidation[]): ValidationIssue[] {
    const issues: ValidationIssue[] = []

    // BLOKADA: brak jakichkolwiek zagrożeń
    if (entries.length === 0) {
      issues.push({
        id: 'logic-no-entries',
        type: 'block',
        layer: 'logical',
        message: 'Analiza nie zawiera żadnych zagrożeń',
        detail: 'Dodaj co najmniej jedno zagrożenie z bazy lub ręcznie przed przejściem dalej.',
      })
      return issues  // dalsze sprawdzenia bez sensu
    }

    for (const e of entries) {
      const R = e.riskScore
      const S = e.severity
      const P = e.probability

      // Pomiń walidację szczegółową dla wpisów bez wypełnionego S lub P
      // (blokada przejścia do kroku 4 jest w UI)
      if (!S || !P) continue
      if (R >= 9 && e.actionLevel === 'organisational') {
        issues.push({
          id: `logic-org-only-${e.id}`,
          type: 'block',
          layer: 'logical',
          entryId: e.id,
          message: `Zagrożenie "${e.element}" — R=${R}: środki wyłącznie organizacyjne są niewystarczające`,
          detail: 'ISO 12100 §6.2: przy R≥9 wymagany jest co najmniej środek techniczny (poziom 2) lub projektowy (poziom 1).',
        })
      }
  
      // BLOKADA: brak jakiegokolwiek środka przy R≥12
      if (R >= 12 && (!e.actionLevel || e.actionLevel === '' || !e.actionText)) {
        issues.push({
          id: `logic-no-measure-${e.id}`,
          type: 'block',
          layer: 'logical',
          entryId: e.id,
          message: `Zagrożenie "${e.element}" — R=${R} (WYSOKIE): brak środka ochronnego`,
          detail: 'Zagrożenie o wysokim ryzyku musi mieć przypisany środek ochronny.',
        })
      }
  
      // BLOKADA: residualP > originalP (środki nie mogą zwiększyć prawdopodobieństwa)
      if (e.residualP != null && e.residualP > P) {
        issues.push({
          id: `logic-residual-p-${e.id}`,
          type: 'block',
          layer: 'logical',
          entryId: e.id,
          message: `Zagrożenie "${e.element}": P' (${e.residualP}) > P (${P})`,
          detail: 'Zastosowanie środków ochronnych nie może zwiększyć prawdopodobieństwa urazu. Sprawdź wartości P i P\'.',
        })
      }
  
      // BLOKADA: residualS > originalS
      if (e.residualS != null && e.residualS > S) {
        issues.push({
          id: `logic-residual-s-${e.id}`,
          type: 'block',
          layer: 'logical',
          entryId: e.id,
          message: `Zagrożenie "${e.element}": S' (${e.residualS}) > S (${S})`,
          detail: 'Ciężkość urazu po zastosowaniu środków nie może być wyższa niż przed nimi.',
        })
      }
  
      // WARN: S=4 bez środka technicznego lub projektowego
      if (S === 4 && e.actionLevel === 'organisational') {
        issues.push({
          id: `logic-s4-no-tech-${e.id}`,
          type: 'warn',
          layer: 'logical',
          entryId: e.id,
          message: `Zagrożenie "${e.element}" — S=4 (śmierć/nieodwracalne): tylko środki organizacyjne`,
          detail: 'Przy S=4 zalecane są środki techniczne lub projektowe. Środki organizacyjne (ŚOI, szkolenia) są najsłabszą warstwą ochrony.',
        })
      }
  
      // WARN: wysokie S, niskie P, niskie R bez uzasadnienia
      if (S >= 3 && P === 1 && R <= 4 && (!e.justificationP || e.justificationP.length < 15)) {
        issues.push({
          id: `logic-high-s-low-p-${e.id}`,
          type: 'warn',
          layer: 'logical',
          entryId: e.id,
          message: `Zagrożenie "${e.element}" — S=${S}, P=1: niskie P przy poważnym zagrożeniu wymaga uzasadnienia`,
          detail: 'Gdy S≥3 ale P=1, uzasadnienie P powinno wyjaśniać dlaczego kontakt ze strefą jest bardzo rzadki.',
        })
      }
  
      // WARN: PLr wpisany, ale brak środka technicznego
      if ((e.plrF || e.plrP) && e.actionLevel !== 'technical' && e.actionLevel !== 'design') {
        issues.push({
          id: `logic-plr-no-tech-${e.id}`,
          type: 'warn',
          layer: 'logical',
          entryId: e.id,
          message: `Zagrożenie "${e.element}": PLr wyznaczony, ale brak środka technicznego`,
          detail: 'PLr (ISO 13849-1) definiuje wymagania dla układu sterowania bezpieczeństwem. Wymaga środka technicznego jako podstawy.',
        })
      }
  
      // WARN: ryzyko resztkowe nadal wysokie
      if (e.residualR != null && e.residualR >= 9) {
        issues.push({
          id: `logic-high-residual-${e.id}`,
          type: 'warn',
          layer: 'logical',
          entryId: e.id,
          message: `Zagrożenie "${e.element}": ryzyko resztkowe R'=${e.residualR} nadal wysokie`,
          detail: 'Ryzyko resztkowe ≥9 wskazuje że zastosowane środki mogą być niewystarczające. Rozważ dodatkowe środki ochronne.',
        })
      }

      // WARN: S≥3 bez żadnego środka ochronnego
      if (S >= 3 && (!e.actionLevel || e.actionLevel === '') && (!e.actionText || e.actionText.trim().length === 0)) {
        issues.push({
          id: `logic-s3-no-measure-${e.id}`,
          type: 'warn',
          layer: 'logical',
          entryId: e.id,
          message: `Zagrożenie "${e.element}" — S=${S}: poważne zagrożenie bez środka ochronnego`,
          detail: 'ISO 12100 §6.2: zagrożenia z ciężkością S≥3 wymagają co najmniej jednego środka ochronnego. Brak środka dla poważnego zagrożenia powinien być świadomą decyzją udokumentowaną w uzasadnieniu.',
        })
      }

      // WARN: ryzyko resztkowe == ryzyko oryginalne mimo zastosowanych środków
      if (
        e.reductionLevel && e.reductionLevel !== 'none' &&
        e.residualR != null && e.residualS != null && e.residualP != null &&
        e.residualR >= R && e.residualS === S && e.residualP === P
      ) {
        issues.push({
          id: `logic-residual-unchanged-${e.id}`,
          type: 'warn',
          layer: 'logical',
          entryId: e.id,
          message: `Zagrożenie "${e.element}": ryzyko resztkowe R'=${e.residualR} równe ryzyku początkowemu R=${R}`,
          detail: 'Zastosowane środki ochronne nie zredukowały ryzyka (S\' i P\' są takie same jak S i P). Sprawdź czy środki są skuteczne, lub dostosuj wartości ryzyka resztkowego.',
        })
      }
    }
  
    // BLOKADA: tylko środki org. dla całej analizy (zero tech/design)
    const hasTechOrDesign = entries.some(e => e.actionLevel === 'design' || e.actionLevel === 'technical')
    const hasOrg = entries.some(e => e.actionLevel === 'organisational')
    if (hasOrg && !hasTechOrDesign && entries.length >= 3) {
      issues.push({
        id: 'logic-only-org-global',
        type: 'block',
        layer: 'logical',
        message: 'Brak środków technicznych lub projektowych w całej analizie',
        detail: 'ISO 12100 §6.2: hierarchia środków wymaga rozważenia poziomów 1 (projekt) i 2 (techniczne) przed poziomem 3 (organizacyjne). Przynajmniej jedno zagrożenie wymaga środka technicznego.',
      })
    }
  
    return issues
  }
  
  // ─────────────────────────────────────────────────────────────────
  // WARSTWA 2: WALIDACJA NORMATYWNA
  // ─────────────────────────────────────────────────────────────────
  
  // Minimalne wymagane zagrożenia dla kategorii maszyn
  // ─────────────────────────────────────────────────────────────────
  // PROFILE BASELINE MASZYN — wymagane zagrożenia + min PLr
  // Źródło: ISO 12100, normy serii C (ISO 23125, ISO 16090, itd.)
  // ─────────────────────────────────────────────────────────────────

  interface MachineProfile {
    threats: { keyword: string; description: string; severity?: 'block' | 'warn' }[]
    minPlr?: 'a' | 'b' | 'c' | 'd' | 'e'  // minimalny wymagany PLr dla głównych funkcji bezpieczeństwa
    minPlrNote?: string                      // uzasadnienie min PLr
  }

  const MACHINE_PROFILES: Record<string, MachineProfile> = {
    'lathe-cnc': {
      minPlr: 'c',
      minPlrNote: 'ISO 23125: funkcje bezpieczeństwa tokarki CNC (zatrzymanie wrzeciona, blokada drzwi) wymagają min. PLr c',
      threats: [
        { keyword: 'pochwyt|wciągn|wrzeciono', description: 'Pochwycenie/wciągnięcie przez wrzeciono lub uchwyt' },
        { keyword: 'wióry|odłamk|wyrzucenie', description: 'Wyrzucenie wiórów lub odłamków ze strefy obróbki' },
        { keyword: 'elektry|porażen', description: 'Porażenie prądem elektrycznym (400V)' },
        { keyword: 'hałas|dB', description: 'Hałas przekraczający 85 dB(A)' },
        { keyword: 'chłodziwo|aerozol|mgła', description: 'Kontakt z chłodziwem / wdychanie aerozolu' },
      ],
    },
    'lathe-conventional': {
      minPlr: 'b',
      minPlrNote: 'Tokarka konwencjonalna: blokada mechaniczna wrzeciona min. PLr b',
      threats: [
        { keyword: 'pochwyt|wciągn|wrzeciono', description: 'Pochwycenie/wciągnięcie przez wrzeciono' },
        { keyword: 'wióry|wstęgow|wyrzucenie', description: 'Wyrzucenie wiórów lub detalu' },
        { keyword: 'elektry|porażen', description: 'Porażenie prądem elektrycznym' },
        { keyword: 'hałas|dB', description: 'Hałas przekraczający 85 dB(A)' },
      ],
    },
    'milling-cnc': {
      minPlr: 'c',
      minPlrNote: 'ISO 16090: frezarka CNC — blokada drzwi i zatrzymanie wrzeciona min. PLr c',
      threats: [
        { keyword: 'kontakt.*narzędz|frezu|frezark', description: 'Kontakt z obracającym się narzędziem skrawającym' },
        { keyword: 'wyrzucenie.*narzędz|wyrzucenie.*detal|wypadnięcie', description: 'Wyrzucenie narzędzia lub detalu' },
        { keyword: 'elektry|porażen', description: 'Porażenie prądem elektrycznym' },
        { keyword: 'wióry|odłamk', description: 'Wyrzucenie wiórów/odłamków' },
        { keyword: 'hałas|dB', description: 'Hałas przekraczający 85 dB(A)' },
      ],
    },
    'grinding-surface': {
      minPlr: 'c',
      minPlrNote: 'ISO 16089: szlifierka — pęknięcie ściernicy i blokada osłony min. PLr c',
      threats: [
        { keyword: 'ściernic|kontakt.*tarcz', description: 'Kontakt z ściernicą / tarczą szlifierską' },
        { keyword: 'pęknięcie.*ściernic|rozpad.*ściernic', description: 'Pęknięcie lub rozpad ściernicy' },
        { keyword: 'pył.*ścier|zapylenie', description: 'Wdychanie pyłu ściernego' },
        { keyword: 'elektry|porażen', description: 'Porażenie prądem elektrycznym' },
        { keyword: 'hałas|dB', description: 'Hałas przekraczający 85 dB(A)' },
      ],
    },
    'grinding-cylindrical': {
      minPlr: 'c',
      minPlrNote: 'ISO 16089: szlifierka cylindryczna — min. PLr c dla blokady osłony',
      threats: [
        { keyword: 'ściernic|kontakt.*tarcz', description: 'Kontakt z ściernicą' },
        { keyword: 'pęknięcie.*ściernic|rozpad', description: 'Pęknięcie ściernicy' },
        { keyword: 'pył|zapylenie', description: 'Wdychanie pyłu ściernego' },
        { keyword: 'elektry|porażen', description: 'Porażenie prądem elektrycznym' },
      ],
    },
    'press-hydraulic': {
      minPlr: 'd',
      minPlrNote: 'EN 693: prasa hydrauliczna — funkcja bezpieczeństwa stopu suwaka min. PLr d',
      threats: [
        { keyword: 'zgniecen|zmiażdż|suwak|stempel', description: 'Zgniecenie kończyn przez suwak/stempel' },
        { keyword: 'ścinani|cięci.*prasy', description: 'Ścinanie w strefie roboczej prasy' },
        { keyword: 'elektry|porażen', description: 'Porażenie prądem elektrycznym' },
        { keyword: 'hydraul|wyciek.*oleju|ciśnien', description: 'Awaria układu hydraulicznego / wyciek oleju pod ciśnieniem' },
      ],
    },
    'press-mechanical': {
      minPlr: 'd',
      minPlrNote: 'EN 692: prasa mechaniczna — funkcja bezpieczeństwa stopu suwaka wymaga min. PLr d',
      threats: [
        { keyword: 'zgniecen|zmiażdż|suwak|stempel', description: 'Zgniecenie/zmiażdżenie kończyn przez suwak lub stempel' },
        { keyword: 'ścinani', description: 'Ścinanie w strefie roboczej prasy' },
        { keyword: 'elektry|porażen', description: 'Porażenie prądem elektrycznym' },
        { keyword: 'sprzęgło|wybieg|mimośród', description: 'Awaria sprzęgła — niezamierzone uruchomienie suwaka' },
      ],
    },
    'robot-industrial': {
      minPlr: 'd',
      minPlrNote: 'ISO 10218: robot przemysłowy — funkcja zatrzymania ochronnego min. PLr d',
      threats: [
        { keyword: 'zderzeni|uderzeni.*ramieni', description: 'Zderzenie z ramieniem robota' },
        { keyword: 'zgniecen|przyciśnięci|zablokow', description: 'Zgniecenie między robotem a przeszkodą' },
        { keyword: 'elektry|porażen', description: 'Porażenie prądem elektrycznym' },
        { keyword: 'wypadnięci.*chwytaka|upuszczen|wyrzucen', description: 'Wypadnięcie przedmiotu z chwytaka robota' },
        { keyword: 'wejści.*stref|dostęp.*cel', description: 'Nieuprawnione wejście do strefy pracy robota' },
      ],
    },
    'robot-cobot': {
      minPlr: 'c',
      minPlrNote: 'ISO/TS 15066: kobot — ograniczenie siły i mocy jako funkcja bezpieczeństwa min. PLr c',
      threats: [
        { keyword: 'zderzeni|kolizj|kontakt.*ramieni', description: 'Kolizja z ramieniem kobota' },
        { keyword: 'zgniecen|przyciśnięci', description: 'Przyciśnięcie między kobotem a przeszkodą' },
        { keyword: 'elektry|porażen', description: 'Porażenie prądem elektrycznym' },
        { keyword: 'wypadnięci.*chwytaka|upuszczen', description: 'Wypadnięcie przedmiotu z chwytaka' },
      ],
    },
    'conveyor-belt': {
      minPlr: 'b',
      minPlrNote: 'EN 620: przenośnik taśmowy — funkcja zatrzymania awaryjnego min. PLr b',
      threats: [
        { keyword: 'wciągn|pochwycen.*taśm|rolki|bęben', description: 'Wciągnięcie przez taśmę, rolki lub bęben napędowy' },
        { keyword: 'pochwycen.*napęd|przekładni|pas.*napędow', description: 'Pochwycenie przez napęd/przekładnię' },
        { keyword: 'elektry|porażen', description: 'Porażenie prądem elektrycznym' },
        { keyword: 'upadek.*materiał|zsunięci|wyrzucen.*taśm', description: 'Zsunięcie lub wyrzucenie transportowanego materiału' },
      ],
    },
    'forklift': {
      minPlr: 'b',
      minPlrNote: 'EN 1726: wózek widłowy — układy hamowania i kierowania min. PLr b',
      threats: [
        { keyword: 'przejechani|potrącen|najechani', description: 'Potrącenie/przejechanie pieszego przez wózek' },
        { keyword: 'upadek.*ładunk|zsunięci.*ładunk|wywrócen.*ładunk', description: 'Upadek lub zsunięcie się ładunku z wideł' },
        { keyword: 'wywrócen.*wózk|utrata.*stabiln', description: 'Wywrócenie wózka (utrata stateczności)' },
        { keyword: 'elektry|porażen|LPG|spalin', description: 'Zagrożenia elektryczne / spalinowe / LPG' },
      ],
    },
    'packaging-flow': {
      minPlr: 'b',
      minPlrNote: 'EN 415: maszyna pakująca — funkcje bezpieczeństwa dostępu min. PLr b',
      threats: [
        { keyword: 'wciągn|pochwycen.*fold|zgrzewark', description: 'Wciągnięcie przez mechanizm zgrzewający lub fałdujący' },
        { keyword: 'oparzeni.*zgrzew|gorąc.*element', description: 'Oparzenie przez gorące elementy zgrzewające' },
        { keyword: 'elektry|porażen', description: 'Porażenie prądem elektrycznym' },
        { keyword: 'skaleczen.*folii|ostr.*krawędź', description: 'Skaleczenie przez ostre krawędzie folii lub noży' },
      ],
    },
    'packaging-pallet': {
      minPlr: 'c',
      minPlrNote: 'EN 415: paletyzator — funkcja bezpieczeństwa strefy roboczej min. PLr c',
      threats: [
        { keyword: 'zgniecen|przyciśnięci.*ramieni|uderzeni.*głowic', description: 'Zgniecenie przez ramię lub głowicę paletyzatora' },
        { keyword: 'upadek.*palety|zsunięci.*ładunk', description: 'Upadek palety lub zsunięcie ładunku' },
        { keyword: 'elektry|porażen', description: 'Porażenie prądem elektrycznym' },
        { keyword: 'wejści.*stref|nieuprawnion.*dostęp', description: 'Nieuprawniony dostęp do strefy roboczej' },
      ],
    },
    'plastics-injection': {
      minPlr: 'c',
      minPlrNote: 'EN 201: wtryskarka tworzyw — blokada formy i funkcja STO min. PLr c',
      threats: [
        { keyword: 'zgniecen.*form|zamknięci.*form|wtrysk', description: 'Zgniecenie przez zamykającą się formę wtryskową' },
        { keyword: 'oparzeni.*tworzywo|gorąc.*tworzywo|plastik', description: 'Oparzenie gorącym tworzywem sztucznym' },
        { keyword: 'elektry|porażen', description: 'Porażenie prądem elektrycznym' },
        { keyword: 'hydraul|wyciek.*oleju', description: 'Wyciek oleju hydraulicznego pod ciśnieniem' },
        { keyword: 'opary.*tworzywo|opary.*plastik|wdychani', description: 'Wdychanie oparów przetwarzanego tworzywa' },
      ],
    },
    'wood-circular-saw': {
      minPlr: 'c',
      minPlrNote: 'EN 1870: pilarka tarczowa — osłona tarczy i hamulec min. PLr c',
      threats: [
        { keyword: 'kontakt.*tarcz|piła.*tarcz|dotknięci.*piły', description: 'Kontakt z obracającą się tarczą piły' },
        { keyword: 'wyrzucen.*materiał|odbicie.*materiał|kickback', description: 'Wyrzucenie obrabianego materiału (kickback)' },
        { keyword: 'hałas|dB', description: 'Hałas przekraczający 85 dB(A)' },
        { keyword: 'pył.*drewn|trociny', description: 'Wdychanie pyłu drzewnego (substancja rakotwórcza)' },
        { keyword: 'elektry|porażen', description: 'Porażenie prądem elektrycznym' },
      ],
    },
    'wood-cnc': {
      minPlr: 'c',
      minPlrNote: 'ISO 16090 / EN 848: obrabiarki do drewna CNC — min. PLr c',
      threats: [
        { keyword: 'kontakt.*narzędz|frezu|głowic', description: 'Kontakt z narzędziem skrawającym (frez, głowica)' },
        { keyword: 'wyrzucen.*narzędz|wypadnięci', description: 'Wyrzucenie narzędzia lub obrabianego elementu' },
        { keyword: 'pył.*drewn|trociny', description: 'Wdychanie pyłu drzewnego (substancja rakotwórcza)' },
        { keyword: 'hałas|dB', description: 'Hałas przekraczający 85 dB(A)' },
        { keyword: 'elektry|porażen', description: 'Porażenie prądem elektrycznym' },
      ],
    },
    'food-mixer': {
      minPlr: 'c',
      minPlrNote: 'EN 13355: mieszalnik spożywczy — blokada pokrywy min. PLr c',
      threats: [
        { keyword: 'wciągn.*mieszad|pochwycen.*mieszad|kontakt.*mieszan', description: 'Wciągnięcie przez mieszadło/mieszalnik' },
        { keyword: 'zgniecen.*pokryw|otwarci.*podczas.*pracy', description: 'Otwarcie pokrywy podczas pracy' },
        { keyword: 'elektry|porażen', description: 'Porażenie prądem elektrycznym' },
        { keyword: 'alerg|kontamin|higien|zanieczyszcz', description: 'Zagrożenia higieniczne/alergiczne (kontaminacja produktu)' },
      ],
    },
    'food-slicer': {
      minPlr: 'b',
      minPlrNote: 'EN 12355: krajalnica spożywcza — osłona noża min. PLr b',
      threats: [
        { keyword: 'skaleczen.*nóż|kontakt.*nóż|cięci.*nożem', description: 'Skaleczenie przez ostrze noża' },
        { keyword: 'amputac.*palc|obrażen.*rąk', description: 'Amputacja palców przez obrót noża' },
        { keyword: 'elektry|porażen', description: 'Porażenie prądem elektrycznym' },
        { keyword: 'kontamin|higien|zanieczyszcz', description: 'Kontaminacja żywności' },
      ],
    },
    'crane-overhead': {
      minPlr: 'c',
      minPlrNote: 'EN 13001: suwnica — układy hamowania i ograniczniki min. PLr c',
      threats: [
        { keyword: 'upadek.*ładunk|zsunięci.*ładunk|utrata.*zawiesi', description: 'Upadek ładunku z suwnicy' },
        { keyword: 'potrącen|uderzeni.*ładunk|podwieszon', description: 'Uderzenie przez przemieszczający się ładunek' },
        { keyword: 'zgniecen.*pomostem|przyciśnięci.*suwnicy', description: 'Zgniecenie przez most suwnicy' },
        { keyword: 'elektry|porażen|tor.*jezdny', description: 'Porażenie przez tor jezdny / napęd elektryczny' },
        { keyword: 'przeciążen|upadek.*suwnicy|wywrócen', description: 'Przeciążenie i utrata stateczności suwnicy' },
      ],
    },
    'agricultural-combine': {
      minPlr: 'b',
      minPlrNote: 'EN ISO 11684: maszyny rolnicze — główne funkcje bezpieczeństwa min. PLr b',
      threats: [
        { keyword: 'wciągn.*bęben|pochwycen.*bęben|heder|żniwiark', description: 'Wciągnięcie przez bęben omłotowy lub heder' },
        { keyword: 'pochwycen.*wałek|wał.*WOM|transmisja', description: 'Pochwycenie przez wał WOM lub transmisję napędu' },
        { keyword: 'upadek.*wysokości|zsunięci.*kabiny', description: 'Upadek z wysokości (kabina, platforma)' },
        { keyword: 'pożar.*zbiornik|paliwo|ogień', description: 'Pożar układu paliwowego lub elektrycznego' },
        { keyword: 'hałas|dB|wibracje', description: 'Hałas i wibracje powyżej norm eksponowania' },
      ],
    },
    'custom': {
      threats: [
        { keyword: 'elektry|porażen', description: 'Porażenie prądem elektrycznym (universal)' },
      ],
    },
  }

  function validateNormative(entries: EntryForValidation[], machineCategory?: string): ValidationIssue[] {
    const issues: ValidationIssue[] = []
    if (!machineCategory) return issues

    const profile = MACHINE_PROFILES[machineCategory]
    if (!profile) return issues

    const allText = entries.map(e =>
      `${e.element} ${e.threat} ${e.effect} ${e.actionText || ''}`.toLowerCase()
    ).join(' ')

    // Sprawdź brakujące typowe zagrożenia
    for (const req of profile.threats) {
      const regex = new RegExp(req.keyword, 'i')
      if (!regex.test(allText)) {
        issues.push({
          id: `norm-missing-${req.keyword.replace(/[.*|]/g, '-').slice(0, 20)}`,
          type: 'warn',
          layer: 'normative',
          message: `Brak typowego zagrożenia dla tej maszyny: "${req.description}"`,
          detail: `Dla maszyny kategorii "${machineCategory}" normy ISO 12100 i szczegółowe przewidują to zagrożenie jako typowe. Czy celowo je pominięto?`,
        })
      }
    }

    // Sprawdź minimalny PLr
    if (profile.minPlr) {
      const PLR_ORDER = ['a', 'b', 'c', 'd', 'e']
      const minIdx = PLR_ORDER.indexOf(profile.minPlr)

      const entriesWithPlr = entries.filter(e => e.plrP || e.plrF)
      for (const e of entriesWithPlr) {
        // Sprawdź czy jakikolwiek osiągnięty PLr jest niższy niż minimalny
        const achievedPlr = (e as any).plAchieved as string | undefined
        if (achievedPlr) {
          const achIdx = PLR_ORDER.indexOf(achievedPlr.toLowerCase())
          if (achIdx >= 0 && achIdx < minIdx) {
            issues.push({
              id: `norm-plr-low-${e.id}`,
              type: 'warn',
              layer: 'normative',
              entryId: e.id,
              message: `Zagrożenie "${e.element}": osiągnięty PLr ${achievedPlr.toUpperCase()} poniżej wymaganego minimum PLr ${profile.minPlr.toUpperCase()} dla tej klasy maszyny`,
              detail: profile.minPlrNote || `Dla tej kategorii maszyny zalecany jest min. PLr ${profile.minPlr.toUpperCase()}.`,
            })
          }
        }
      }
    }

    return issues
  }
  
  // ─────────────────────────────────────────────────────────────────
  // WARSTWA 2b: WALIDACJA JAKOŚCI UZASADNIEŃ (twarde blokady)
  // ─────────────────────────────────────────────────────────────────

  function isJunkJustification(text: string): boolean {
    return isJunkText(text)
  }

  function validateJustificationQuality(entries: EntryForValidation[]): ValidationIssue[] {
    const issues: ValidationIssue[] = []

    // Zbierz problemy per entry
    const tooShort: string[] = []
    const junk: string[] = []

    for (const e of entries) {
      const jS = e.justificationS?.trim() || ''
      const jP = e.justificationP?.trim() || ''

      if (isJunkJustification(jS) || isJunkJustification(jP)) {
        junk.push(e.element)
      } else if (jS.length < MIN_JUST_LENGTH || jP.length < MIN_JUST_LENGTH) {
        tooShort.push(e.element)
      }
    }

    // BLOKADA: uzasadnienia-śmieci
    if (junk.length > 0) {
      issues.push({
        id: 'qual-junk-justifications',
        type: 'block',
        layer: 'logical',
        message: `${junk.length} zagrożeń z uzasadnieniem zastępczym (x, ok, tak, brak...)`,
        detail: `Elementy: ${junk.slice(0, 3).join(', ')}${junk.length > 3 ? ` i ${junk.length - 3} inne` : ''}. Uzasadnienie musi opisywać rzeczywiste warunki — nie może być symbolem zastępczym.`,
      })
    }

    // BLOKADA: uzasadnienia za krótkie (< 30 znaków)
    if (tooShort.length > 0) {
      issues.push({
        id: 'qual-short-justifications',
        type: 'block',
        layer: 'logical',
        message: `${tooShort.length} zagrożeń z uzasadnieniem krótszym niż ${MIN_JUST_LENGTH} znaków`,
        detail: `Elementy: ${tooShort.slice(0, 3).join(', ')}${tooShort.length > 3 ? ` i ${tooShort.length - 3} inne` : ''}. Uzasadnienie S i P powinno opisywać konkretne warunki pracy, częstość ekspozycji lub charakter urazu.`,
      })
    }

    // BLOKADA: zbyt wiele identycznych uzasadnień S (copy-paste)
    const justSTextsQ = entries.map(e => e.justificationS?.trim().toLowerCase()).filter(s => s && s.length >= MIN_JUST_LENGTH)
    if (justSTextsQ.length >= 3) {
      const freq: Record<string, number> = {}
      justSTextsQ.forEach(t => { freq[t!] = (freq[t!] || 0) + 1 })
      const maxFreq = Math.max(...Object.values(freq))
      if (maxFreq >= 3 || (maxFreq / justSTextsQ.length) >= 0.7) {
        issues.push({
          id: 'qual-copypaste-s',
          type: 'block',
          layer: 'logical',
          message: `Uzasadnienia S są skopiowane — ${maxFreq} identycznych wpisów`,
          detail: 'Każde zagrożenie wymaga własnego uzasadnienia S opisującego specyficzne warunki dla tego elementu maszyny.',
        })
      }
    }

    // BLOKADA: zbyt wiele identycznych uzasadnień P (copy-paste)
    const justPTextsQ = entries.map(e => e.justificationP?.trim().toLowerCase()).filter(s => s && s.length >= MIN_JUST_LENGTH)
    if (justPTextsQ.length >= 3) {
      const freq: Record<string, number> = {}
      justPTextsQ.forEach(t => { freq[t!] = (freq[t!] || 0) + 1 })
      const maxFreq = Math.max(...Object.values(freq))
      if (maxFreq >= 3 || (maxFreq / justPTextsQ.length) >= 0.7) {
        issues.push({
          id: 'qual-copypaste-p',
          type: 'block',
          layer: 'logical',
          message: `Uzasadnienia P są skopiowane — ${maxFreq} identycznych wpisów`,
          detail: 'Każde zagrożenie wymaga własnego uzasadnienia P opisującego specyficzną ekspozycję dla tego elementu.',
        })
      }
    }

    // BLOKADA semantyczna: S=4 bez słów kluczowych wskazujących na poważność
    const S4_KEYWORDS = ['śmierć', 'amputacja', 'nieodwracaln', 'paraliż', 'sparaliżow', 'utrata wzroku', 'utrata kończyny', 'śmiertelne', 'fatalne', 'death', 'amputation', 'irreversible', 'fatal', 'Tod', 'Amputation']
    const s4WithoutKeyword = entries.filter(e => {
      if (e.severity !== 4) return false
      const jS = (e.justificationS || '').toLowerCase()
      return !S4_KEYWORDS.some(kw => jS.includes(kw.toLowerCase()))
    })
    if (s4WithoutKeyword.length > 0) {
      issues.push({
        id: 'qual-s4-no-keyword',
        type: 'warn',
        layer: 'logical',
        message: `${s4WithoutKeyword.length} zagrożeń z S=4 bez opisu najgorszego skutku`,
        detail: `Przy S=4 uzasadnienie powinno opisywać najpoważniejszy możliwy skutek (śmierć, amputacja, utrata wzroku, nieodwracalne obrażenia). Elementy: ${s4WithoutKeyword.slice(0, 3).map(e => e.element).join(', ')}.`,
      })
    }

    // WARN semantyczna: P=1 bez opisu kontroli ekspozycji
    const P1_KEYWORDS = ['rzadko', 'raz w', 'raz na', 'kilka razy w roku', 'sporadycznie', 'tylko przy', 'wyłącznie', 'blokada', 'zabezpieczenie', 'nie ma dostępu', 'brak dostępu', 'osłona', 'rarely', 'selten', 'rarement']
    const p1WithoutKeyword = entries.filter(e => {
      if (e.probability !== 1) return false
      const jP = (e.justificationP || '').toLowerCase()
      return !P1_KEYWORDS.some(kw => jP.includes(kw.toLowerCase()))
    })
    if (p1WithoutKeyword.length >= 2) {
      issues.push({
        id: 'qual-p1-no-keyword',
        type: 'warn',
        layer: 'logical',
        message: `${p1WithoutKeyword.length} zagrożeń z P=1 bez opisu dlaczego ekspozycja jest rzadka`,
        detail: 'Przy P=1 uzasadnienie powinno wyjaśniać co sprawia że kontakt ze strefą zagrożenia jest bardzo rzadki (osłona, blokada, rzadki dostęp, procedura).',
      })
    }


    // ─────────────────────────────────────────────────────────────────
    // REGUŁY SPÓJNOŚCI (A-G) — neutralne ostrzeżenia, nie blokady
    // Klasy: critical (logiczna sprzeczność) | suspicious (mało prawdopodobne) | hint (warto sprawdzić)
    // ─────────────────────────────────────────────────────────────────

    for (const e of entries) {
      if (!e.severity || !e.probability) continue // pomiń nieokreślone
      const S = e.severity
      const P = e.probability
      const R = e.riskScore

      // A. [suspicious] Zagrożenie mechaniczne + S≤2
      const mechanicalKeywords = ['wrzeciono', 'obraca', 'ruch', 'uchwyt', 'nóż', 'frez', 'piła', 'tłok', 'prasa', 'zgnieceni', 'uderzeni', 'pochwyceni', 'wciągnięci', 'tnący', 'ostrz', 'spindle', 'rotating', 'press', 'blade', 'cutting']
      const isMechanical = mechanicalKeywords.some(kw =>
        (e.threat || '').toLowerCase().includes(kw) ||
        (e.element || '').toLowerCase().includes(kw) ||
        (e.effect || '').toLowerCase().includes(kw)
      )
      if (isMechanical && S <= 2) {
        issues.push({
          id: `consistency-a-${e.id}`,
          type: 'warn',
          layer: 'logical',
          entryId: e.id,
          message: `Możliwa niespójność: niska ocena ciężkości skutków (S=${S}) przy zagrożeniu mechanicznym — zweryfikuj założenia`,
          detail: 'Zagrożenia mechaniczne z kontaktem z elementami ruchomymi typowo wiążą się ze znacznymi obrażeniami. Upewnij się, że ocena uwzględnia najgorszy realistyczny scenariusz.',
        })
      }

      // B. [suspicious] Wysoka ekspozycja + P=1
      const continuousKeywords = ['ciągł', 'stały', 'każdorazowo', 'każdy cykl', 'przy każd', 'normalna praca', 'operacja', 'continuous', 'every cycle', 'daily', 'codzienni']
      const hasHighExposure = continuousKeywords.some(kw =>
        (e.scenario || '').toLowerCase().includes(kw) ||
        (e.justificationP || '').toLowerCase().includes(kw)
      )
      if (hasHighExposure && P === 1) {
        issues.push({
          id: `consistency-b-${e.id}`,
          type: 'warn',
          layer: 'logical',
          entryId: e.id,
          message: `Możliwa niespójność: niska ocena prawdopodobieństwa (P=1) przy opisie wskazującym na częstą ekspozycję — zweryfikuj spójność oceny`,
          detail: 'Opis scenariusza lub uzasadnienie sugeruje częstą ekspozycję. Sprawdź, czy wartość P odzwierciedla rzeczywiste warunki pracy.',
        })
      }

      // C. [hint] Brak środka ochronnego + niskie ryzyko
      if (!e.action && !e.actionLevel && R > 0 && R <= 4) {
        issues.push({
          id: `consistency-c-${e.id}`,
          type: 'warn',
          layer: 'logical',
          entryId: e.id,
          message: `Informacja: niskie ryzyko (R=${R}) bez przypisanego środka ochronnego — potwierdź, że brak działania jest świadomą decyzją`,
          detail: 'ISO 12100 §6.1 wymaga udokumentowania uzasadnienia dla zagrożeń, dla których nie zastosowano środków ochronnych.',
        })
      }

      // D. [suspicious] Redukcja S lub P w ryzyku resztkowym bez uzasadnienia
      const hasResidual = e.residualS != null || e.residualP != null
      const justLen = (e.justificationS || '').length + (e.justificationP || '').length
      if (hasResidual && justLen < 40) {
        issues.push({
          id: `consistency-d-${e.id}`,
          type: 'warn',
          layer: 'logical',
          entryId: e.id,
          message: `Możliwa niespójność: zmiana parametrów ryzyka resztkowego (S'/P') przy krótkim uzasadnieniu — rozważ rozszerzenie opisu`,
          detail: 'Zmniejszenie S lub P po zastosowaniu środków ochronnych powinno być poparte opisem skuteczności tych środków.',
        })
      }

      // E. [suspicious] Wysokie S + bardzo niskie P
      if (S >= 4 && P === 1) {
        issues.push({
          id: `consistency-e-${e.id}`,
          type: 'warn',
          layer: 'logical',
          entryId: e.id,
          message: `Informacja: bardzo rzadkie zdarzenie (P=1) o potencjalnie poważnych skutkach (S=${S}) — upewnij się, że uwzględniono wszystkie scenariusze`,
          detail: 'Zdarzenia rzadkie o poważnych skutkach wymagają szczególnej uwagi. Sprawdź, czy P=1 uwzględnia wszystkie możliwe warunki pracy i potencjalne awarie.',
        })
      }
    }

    // F. [hint] Wszystkie zagrożenia mają minimalne S i P
    const allMinimal = entries.filter(e => e.severity > 0 && e.probability > 0).every(e => e.severity === 1 && e.probability === 1)
    if (entries.length >= 2 && allMinimal) {
      issues.push({
        id: 'consistency-f-all-minimal',
        type: 'warn',
        layer: 'logical',
        message: `Informacja: wszystkie zagrożenia mają najniższe możliwe wartości S=1 i P=1 — potwierdź realistyczność oceny`,
        detail: 'Jednolicie minimalne wartości parametrów dla wszystkich zagrożeń mogą wskazywać na niekompletną analizę. Zweryfikuj indywidualnie każde zagrożenie.',
      })
    }

    // G. [hint] Brak zmienności — wszystkie S identyczne i wszystkie P identyczne
    const sValues = entries.filter(e => e.severity > 0).map(e => e.severity)
    const pValues = entries.filter(e => e.probability > 0).map(e => e.probability)
    const allSame = entries.length >= 3 &&
      sValues.length === entries.length && new Set(sValues).size === 1 &&
      pValues.length === entries.length && new Set(pValues).size === 1 &&
      !(sValues[0] === 1 && pValues[0] === 1) // F już to pokrywa
    if (allSame) {
      issues.push({
        id: 'consistency-g-no-variance',
        type: 'warn',
        layer: 'logical',
        message: `Informacja: wszystkie zagrożenia mają identyczne wartości S=${sValues[0]} i P=${pValues[0]} — sprawdź indywidualną ocenę`,
        detail: 'Jednakowe wartości parametrów dla wszystkich zagrożeń są rzadko spotykane w rzeczywistych analizach. Upewnij się, że każde zagrożenie zostało ocenione indywidualnie.',
      })
    }

    return issues
  }

  // ─────────────────────────────────────────────────────────────────
  // WARSTWA 3: WALIDACJA BEHAWIORALNA
  // ─────────────────────────────────────────────────────────────────
  function validateBehavioural(entries: EntryForValidation[]): { issues: ValidationIssue[]; score: number } {
    const issues: ValidationIssue[] = []
    let penalty = 0
  
    if (entries.length === 0) return { issues, score: 100 }
  
    // Sprawdź identyczne uzasadnienia
    const justSTexts = entries.map(e => e.justificationS?.trim().toLowerCase()).filter(Boolean)
    const justPTexts = entries.map(e => e.justificationP?.trim().toLowerCase()).filter(Boolean)
    const uniqueJustS = new Set(justSTexts).size
    const uniqueJustP = new Set(justPTexts).size
  
    if (justSTexts.length >= 3 && uniqueJustS === 1) {
      penalty += 20
      issues.push({
        id: 'behav-identical-just-s',
        type: 'warn',
        layer: 'behavioural',
        message: 'Wszystkie uzasadnienia S są identyczne',
        detail: 'Skopiowane uzasadnienia sugerują brak indywidualnej oceny każdego zagrożenia. Każde zagrożenie powinno mieć własne uzasadnienie.',
      })
    }
  
    if (justPTexts.length >= 3 && uniqueJustP === 1) {
      penalty += 20
      issues.push({
        id: 'behav-identical-just-p',
        type: 'warn',
        layer: 'behavioural',
        message: 'Wszystkie uzasadnienia P są identyczne',
        detail: 'Skopiowane uzasadnienia sugerują brak indywidualnej oceny każdego zagrożenia.',
      })
    }
  
    // Sprawdź czy wszystkie ryzyka końcowe są niskie
    const allLowRisk = entries.every(e => e.riskScore <= 4)
    if (allLowRisk && entries.length >= 5) {
      penalty += 25
      issues.push({
        id: 'behav-all-low-risk',
        type: 'warn',
        layer: 'behavioural',
        message: 'Wszystkie zagrożenia mają niskie ryzyko końcowe (R≤4)',
        detail: 'W typowej analizie maszyny przemysłowej przynajmniej część zagrożeń powinna mieć R≥6. Bardzo niskie ryzyka dla wszystkich zagrożeń mogą wskazywać na niedoszacowanie.',
      })
    }
  
    // Sprawdź brak środków technicznych w całej analizie
    const noTech = !entries.some(e => e.actionLevel === 'design' || e.actionLevel === 'technical')
    if (noTech && entries.length >= 3) {
      penalty += 15
      // (blokada jest już w logical, tu tylko dodajemy do score)
    }
  
    // Sprawdź bardzo krótkie uzasadnienia
    const shortJust = entries.filter(e =>
      (e.justificationS && e.justificationS.length < 8) ||
      (e.justificationP && e.justificationP.length < 8)
    ).length
    if (shortJust > entries.length * 0.5) {
      penalty += 15
      issues.push({
        id: 'behav-short-justifications',
        type: 'warn',
        layer: 'behavioural',
        message: `${shortJust} uzasadnień jest bardzo krótkich (< 8 znaków)`,
        detail: 'Uzasadnienia S i P powinny zawierać konkretne odniesienie do parametrów maszyny, warunków pracy lub norm.',
      })
    }
  
    // Sprawdź czy P=1 dla większości zagrożeń bez uzasadnienia
    const lowPNoJust = entries.filter(e => e.probability === 1 && (!e.justificationP || e.justificationP.length < 10)).length
    if (lowPNoJust > entries.length * 0.6) {
      penalty += 10
      issues.push({
        id: 'behav-many-p1-no-just',
        type: 'warn',
        layer: 'behavioural',
        message: `${lowPNoJust} zagrożeń z P=1 bez uzasadnienia`,
        detail: 'Masowe przypisanie najniższego P bez uzasadnienia może wskazywać na niedoszacowanie prawdopodobieństwa.',
      })
    }
  
    const score = Math.max(0, 100 - penalty)
    return { issues, score }
  }
  
  // ─────────────────────────────────────────────────────────────────
  // WARSTWA 4: WALIDACJA PROCESOWA
  // ─────────────────────────────────────────────────────────────────
  function validateProcess(entries: EntryForValidation[], form: FormForValidation): ValidationIssue[] {
    const issues: ValidationIssue[] = []
  
    // Sprawdź granice maszyny
    if (!form.machineLimitsIntended || form.machineLimitsIntended.length < 10) {
      issues.push({
        id: 'process-no-limits-intended',
        type: 'block',
        layer: 'process',
        message: 'Nie określono przewidywanego użycia maszyny (ISO 12100 §5.3)',
        detail: 'ISO 12100 §5.3 wymaga określenia granic maszyny przed oceną ryzyka. Uzupełnij pole "Przewidywane użycie" w kroku 2.',
      })
    }
  
    // Sprawdź etapy cyklu życia
    const missingLC = entries.filter(e => !e.lifecycleStages || e.lifecycleStages.length === 0)
    if (missingLC.length > 0) {
      issues.push({
        id: 'process-missing-lifecycle',
        type: 'block',
        layer: 'process',
        message: `${missingLC.length} zagrożeń bez przypisanych etapów cyklu życia`,
        detail: 'ISO 12100 §5.4 wymaga analizy ryzyka dla wszystkich etapów życia maszyny. Przypisz etapy dla każdego zagrożenia.',
      })
    }
  
    // Sprawdź brak oceny ryzyka resztkowego przy wysokich zagrożeniach
    const highNoResidual = entries.filter(e => e.riskScore >= 9 && e.residualS == null && e.reductionLevel && e.reductionLevel !== 'none')
    if (highNoResidual.length > 0) {
      issues.push({
        id: 'process-missing-residual',
        type: 'warn',
        layer: 'process',
        message: `${highNoResidual.length} zagrożeń wysokich z środkiem ochronnym, ale bez oceny ryzyka resztkowego`,
        detail: 'ISO 12100 §6.1 wymaga udokumentowania ryzyka resztkowego po zastosowaniu środków. Uzupełnij S\' i P\' w sekcji ryzyka resztkowego.',
      })
    }

    // WARN: brak danych autora — blokuje PDF (sprawdzane w PDFDownloadButton), nie przejście między krokami
    if (!form.preparedBy || form.preparedBy.trim().length < 3) {
      issues.push({
        id: 'process-no-author',
        type: 'warn',
        layer: 'process',
        message: 'Brak danych autora analizy (pole "Opracował")',
        detail: 'Uzupełnij pole "Opracował" w kroku 4 przed pobraniem raportu PDF. Analiza ryzyka musi być podpisana przez osobę kompetentną.',
      })
    }

    // WARN: brak zatwierdzającego — blokuje PDF (sprawdzane w PDFDownloadButton), nie przejście między krokami
    if (!form.approvedBy || form.approvedBy.trim().length < 3) {
      issues.push({
        id: 'process-no-approver',
        type: 'warn',
        layer: 'process',
        message: 'Brak danych osoby zatwierdzającej (pole "Zatwierdził")',
        detail: 'Uzupełnij pole "Zatwierdził" w kroku 4 przed pobraniem raportu PDF. Analiza ryzyka wymaga zatwierdzenia przez upoważnioną osobę.',
      })
    }

    return issues
  }
  
  // ─────────────────────────────────────────────────────────────────
  // GŁÓWNA FUNKCJA WALIDACJI
  // ─────────────────────────────────────────────────────────────────
  export function validateAnalysis(
    entries: EntryForValidation[],
    form: FormForValidation,
    machineCategory?: string   // zachowany dla kompatybilności wstecznej
  ): ValidationResult {
    // Preferuj machineTypeId z form (precyzyjniejszy), fallback do machineCategory
    const machineKey = form.machineTypeId || machineCategory
    const logicalIssues = validateLogical(entries)
    const qualityIssues = validateJustificationQuality(entries)
    const normativeIssues = validateNormative(entries, machineKey)
    const { issues: behaviouralIssues, score: credScore } = validateBehavioural(entries)
    const processIssues = validateProcess(entries, form)

    const allIssues = [...logicalIssues, ...qualityIssues, ...normativeIssues, ...behaviouralIssues, ...processIssues]
  
    const blocks = allIssues.filter(i => i.type === 'block')
    const warnings = allIssues.filter(i => i.type === 'warn')
  
    // Obniż score za blokady
    const finalScore = Math.max(0, credScore - blocks.length * 10)
  
    const credibilityLabel: 'high' | 'medium' | 'low' =
      finalScore >= 75 ? 'high' :
      finalScore >= 50 ? 'medium' : 'low'
  
    return { blocks, warnings, credibilityScore: finalScore, credibilityLabel }
  }
  
  // ─────────────────────────────────────────────────────────────────
  // HELPER: Generuj podsumowanie do raportu PDF
  // ─────────────────────────────────────────────────────────────────
  export interface ValidationSummary {
    logicalOk: boolean
    normativeOk: boolean
    behaviouralOk: boolean
    processOk: boolean
    credibilityScore: number
    credibilityLabel: 'high' | 'medium' | 'low'
    blockCount: number
    warnCount: number
    issues: ValidationIssue[]
  }
  
  export function getValidationSummary(result: ValidationResult): ValidationSummary {
    return {
      logicalOk: !result.blocks.some(i => i.layer === 'logical') && !result.warnings.some(i => i.layer === 'logical'),
      normativeOk: result.warnings.filter(i => i.layer === 'normative').length === 0,
      behaviouralOk: result.credibilityScore >= 75,
      processOk: !result.blocks.some(i => i.layer === 'process'),
      credibilityScore: result.credibilityScore,
      credibilityLabel: result.credibilityLabel,
      blockCount: result.blocks.length,
      warnCount: result.warnings.length,
      issues: [...result.blocks, ...result.warnings],
    }
  }