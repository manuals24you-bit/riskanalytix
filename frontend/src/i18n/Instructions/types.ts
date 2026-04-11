// frontend/src/i18n/instructions/types.ts
export type Lang = 'pl' | 'en' | 'de' | 'fr' | 'it' | 'es' | 'cs'

export interface InstructionsT {
  // Meta
  back: string
  title: string
  toolVersion: string
  toolCompat: string
  tocLabel: string

  // Nav
  nav: {
    intro: string; login: string; step1: string; step2: string; step3: string
    sp: string; plr: string; residual: string; hierarchy: string; lifecycle: string
    step4: string; norms: string; responsibility: string; nottrust: string
    validation: string; justwriting: string; verify: string; auditor: string
    blockmap: string; docx: string; auditlog: string
  }

  // S0 — Intro
  s0: {
    title: string; p1: string; wizard: string
    step1: string; step2: string; step3: string; step4: string
    warnTitle: string; warnP1: string; warnP2: string; warnP3: string; warnP4: string
  }

  // S1 — Login
  s1: {
    title: string; h1: string
    reg1: string; reg2: string; reg3: string
    h2: string; th1: string; th2: string; th3: string
    plan1: string; price1: string; desc1: string
    plan2: string; price2: string; desc2: string
    plan3: string; price3: string; desc3: string
  }

  // S2 — Step 1
  s2: {
    title: string; p1: string; h1: string; h2: string
    cats: string[]
    methodSP: string; methodSPdesc: string
    methodSFPA: string; methodSFPAdesc: string
  }

  // S3 — Step 2
  s3: {
    title: string; h1: string; p1: string; h2: string; p2: string
    th1: string; th2: string; th3: string
    rows: [string, string, string][]
  }

  // S4 — Step 3
  s4: {
    title: string; p1: string; h1: string; th1: string; th2: string
    cols: [string, string][]
    tip: string; h2: string
    blocks: string[]
  }

  // S5 — S and P
  s5: {
    title: string; h1: string; warnS: string
    sth1: string; sth2: string; sth3: string
    sRows: [string, string, string][]
    h2: string; pRows: [string, string, string][]
    h3: string
    legend: [string, string, string][]
  }

  // S6 — PLr
  s6: {
    title: string; p1: string; h1: string
    th1: string; th2: string; th3: string
    params: [string, string, string][]
    h2: string
    p1tip: string
    h3: string
    cats: { cat: string; color: string; title: string; desc: string }[]
    warn: string
  }

  // S7 — Residual
  s7: {
    title: string; p1: string; h1: string
    steps: string[]
    tip: string
  }

  // S8 — Hierarchy
  s8: {
    title: string; p1: string
    levels: { icon: string; title: string; desc: string; bullets: string[] }[]
    warn: string
  }

  // S9 — Lifecycle
  s9: {
    title: string; p1: string
    th1: string; th2: string; th3: string
    rows: [string, string, string][]
    tip: string
  }

  // S10 — Step 4
  s10: {
    title: string; h1: string; p1: string; h2: string
    seq: { label: string; desc: string }[]
    h3: string; pdfSteps: string[]
    h4: string; pdfContents: string[]
  }

  // S11 — Norms
  s11: {
    title: string; p1: string
    th1: string; th2: string; th3: string; th4: string
    hFree: string
    freeLinks: [string, string][]
  }

  // S12 — Responsibility
  s12: {
    title: string; warn: string; h1: string
    duties: string[]
    h2: string
    specialists: { title: string; desc: string; color: string }[]
    footer: string
  }

  // S13 — Not trust
  s13: {
    title: string; p1: string; p2: string; p3: string
    h1: string; notWhen: string[]
    h2: string; questions: string[]
  }

  // S14 — Validation
  s14: {
    title: string; p1: string
    h1: string; blocks: string[]
    h2: string; warns: string[]
    h3: string; credHigh: string; credMed: string; credLow: string
    h4: string; pdfNote: string
  }

  // S15 — Just writing
  s15: {
    title: string; p1: string
    h1: string; bad: string[]
    h2: string; good: string[]
    h3: string
    schemeS: string; schemeP: string
  }

  // S16 — Verify
  s16: {
    title: string; p1: string
    steps: { num: string; cond: string; title: string; desc: string }[]
    note: string
  }

  // S17 — Auditor
  s17: {
    title: string; p1: string; h1: string
    questions: { q: string; check: string }[]
    note: string
  }

  // S18 — Blockmap
  s18: {
    title: string; p1: string
    h1: string; blocks: { label: string; text: string }[]
    h2: string; warns: string[]
  }

  // S19 — DOCX
  s19: {
    title: string; p1: string
    h1: string; contents: string[]
    h2: string; whenDesc: string
    legalTitle: string; legalP1: string; legalP2: string
  }

  // S20 — Audit log
  s20: {
    title: string; p1: string
    h1: string; events: { code: string; color: string; desc: string }[]
    h2: string; noteP1: string; noteP2: string
  }
}
