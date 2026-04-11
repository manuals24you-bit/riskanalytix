// frontend/src/i18n/instructions/index.ts
import type { InstructionsT, Lang } from './types'
import pl from './pl'
import en from './en'
import de from './de'
import fr from './fr'
import it from './it'
import es from './es'
import cs from './cs'

export type { Lang, InstructionsT }

const T: Record<Lang, InstructionsT> = { pl, en, de, fr, it, es, cs }

export function getInstructionsT(lang: Lang): InstructionsT {
  return T[lang] ?? T['en']
}
