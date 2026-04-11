// frontend/src/pages/analysis/DocxDownloadButton.tsx
import { useState } from 'react'
import {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
  LevelFormat, PageBreak, Header, Footer,
} from 'docx'
import { translateRiskEntry, type Lang } from '../../i18n/machinesI18n'
import { translateAction } from '../../i18n/actionsI18n'

interface Entry {
  id: string; element: string; threat: string; effect: string
  severity: number; probability: number; riskScore?: number
  action?: string; scenario?: string
  justificationS?: string; justificationP?: string
  plrS?: string; plrF?: string; plrP?: string; plrR?: string
  plrJustification?: string; reductionLevel?: string
  residualS?: number; residualP?: number; residualR?: number
  actionLevel?: string; actionNorm?: string
  lifecycleStages?: string | string[]
  sortOrder?: number
}

interface Props {
  analysis: any
  approval?: {
    preparedBy?: string; preparedRole?: string
    approvedBy?: string; approvedRole?: string; approvedDate?: string
  }
}

const LIFECYCLE_STAGES: Record<string, string> = {
  lc1: 'Transport i montaż', lc2: 'Instalacja i uruchomienie',
  lc3: 'Regulacja i nastawianie', lc4: 'Normalna praca',
  lc5: 'Czyszczenie i dezynfekcja', lc6: 'Usuwanie usterek',
  lc7: 'Konserwacja i serwis', lc8: 'Demontaż i złomowanie',
}

const ACTION_LEVEL_LABELS: Record<string, string> = {
  design: '🔧 Eliminacja u źródła / projekt bezpieczny',
  technical: '🛡️ Techniczne środki ochronne',
  organisational: '📋 Organizacyjne / ŚOI / informacja',
}

function getRiskLabel(r: number) {
  if (r >= 12) return 'WYSOKIE'
  if (r >= 6)  return 'ŚREDNIE'
  if (r >= 3)  return 'NISKIE'
  return 'POMIJALNE'
}

function getRiskColor(r: number) {
  if (r >= 12) return 'DC2626'
  if (r >= 6)  return 'D97706'
  if (r >= 3)  return '16A34A'
  return '6B7280'
}

async function generateDocx(analysis: any, approval: any = {}) {
  const lang = (analysis.language || 'pl') as Lang
  const locale = lang === 'pl' ? 'pl-PL' : lang === 'de' ? 'de-DE' : 'en-GB'
  const date = analysis.analysisDate
    ? new Date(analysis.analysisDate).toLocaleDateString(locale)
    : new Date().toLocaleDateString(locale)

  const entries: Entry[] = [...(analysis.riskEntries || analysis.entries || [])]
    .sort((a, b) => (b.severity * b.probability) - (a.severity * a.probability))

  const tr = (e: Entry) => ({
    ...translateRiskEntry(e, lang),
    action: translateAction(e.action, lang),
    scenario: translateRiskEntry(e, lang).scenario || e.scenario || '',
  })

  const high = entries.filter(e => e.severity * e.probability >= 12)
  const med  = entries.filter(e => { const r = e.severity * e.probability; return r >= 6 && r < 12 })

  // ── STYLE POMOCNICZE ──────────────────────────────────────────────────

  const W = 9026 // szerokość treści A4 z marginesami 1" (DXA)

  const border1 = { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }
  const bAll = { top: border1, bottom: border1, left: border1, right: border1 }
  const bNone = { top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' } }

  const cell = (text: string, w: number, opts: any = {}) => new TableCell({
    borders: bAll,
    width: { size: w, type: WidthType.DXA },
    shading: opts.fill ? { fill: opts.fill, type: ShadingType.CLEAR } : undefined,
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
    children: [new Paragraph({
      children: [new TextRun({
        text: text || '—',
        size: opts.size || 18,
        bold: opts.bold || false,
        color: opts.color || '374151',
        font: 'Arial',
      })],
    })],
  })

  const headerCell = (text: string, w: number) => new TableCell({
    borders: bAll,
    width: { size: w, type: WidthType.DXA },
    shading: { fill: '1F3A6E', type: ShadingType.CLEAR },
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
    children: [new Paragraph({
      children: [new TextRun({ text, size: 16, bold: true, color: 'FFFFFF', font: 'Arial' })],
    })],
  })

  const h1 = (text: string) => new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 300, after: 120 },
    children: [new TextRun({ text, bold: true, size: 28, color: '1F3A6E', font: 'Arial' })],
  })

  const h2 = (text: string) => new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 200, after: 80 },
    children: [new TextRun({ text, bold: true, size: 22, color: '1F3A6E', font: 'Arial' })],
    border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: 'E8A838', space: 1 } },
  })

  const p = (text: string, opts: any = {}) => new Paragraph({
    spacing: { after: opts.after ?? 100 },
    children: [new TextRun({
      text: text || '',
      size: opts.size || 20,
      bold: opts.bold || false,
      italics: opts.italic || false,
      color: opts.color || '374151',
      font: 'Arial',
    })],
  })

  const pBold = (label: string, value: string) => new Paragraph({
    spacing: { after: 80 },
    children: [
      new TextRun({ text: label + ': ', size: 20, bold: true, color: '1F2937', font: 'Arial' }),
      new TextRun({ text: value || '—', size: 20, color: '374151', font: 'Arial' }),
    ],
  })

  const gap = (size = 120) => new Paragraph({ spacing: { after: size }, children: [] })

  const infoTable = (rows: [string, string][]) => new Table({
    width: { size: W, type: WidthType.DXA },
    columnWidths: [2800, W - 2800],
    rows: rows.filter(([, v]) => v).map(([label, value], i) => new TableRow({
      children: [
        new TableCell({
          borders: bAll,
          width: { size: 2800, type: WidthType.DXA },
          shading: { fill: i % 2 === 0 ? 'F0F4FF' : 'FFFFFF', type: ShadingType.CLEAR },
          margins: { top: 80, bottom: 80, left: 120, right: 80 },
          children: [new Paragraph({ children: [new TextRun({ text: label, size: 19, bold: true, color: '1F3A6E', font: 'Arial' })] })],
        }),
        new TableCell({
          borders: bAll,
          width: { size: W - 2800, type: WidthType.DXA },
          shading: { fill: i % 2 === 0 ? 'F0F4FF' : 'FFFFFF', type: ShadingType.CLEAR },
          margins: { top: 80, bottom: 80, left: 120, right: 80 },
          children: [new Paragraph({ children: [new TextRun({ text: value || '—', size: 19, color: '374151', font: 'Arial' })] })],
        }),
      ],
    })),
  })

  const yellowBox = (text: string) => new Table({
    width: { size: W, type: WidthType.DXA },
    columnWidths: [W],
    rows: [new TableRow({ children: [new TableCell({
      borders: { top: { style: BorderStyle.SINGLE, size: 6, color: 'D97706' }, bottom: border1, left: border1, right: border1 },
      shading: { fill: 'FFFBEB', type: ShadingType.CLEAR },
      margins: { top: 100, bottom: 100, left: 140, right: 140 },
      children: [new Paragraph({ children: [new TextRun({ text, size: 18, color: '78350F', font: 'Arial' })] })],
    })] })],
  })

  const redBox = (text: string) => new Table({
    width: { size: W, type: WidthType.DXA },
    columnWidths: [W],
    rows: [new TableRow({ children: [new TableCell({
      borders: { top: { style: BorderStyle.SINGLE, size: 6, color: 'DC2626' }, bottom: border1, left: border1, right: border1 },
      shading: { fill: 'FEF2F2', type: ShadingType.CLEAR },
      margins: { top: 100, bottom: 100, left: 140, right: 140 },
      children: [new Paragraph({ children: [new TextRun({ text, size: 18, color: '7F1D1D', font: 'Arial' })] })],
    })] })],
  })

  // ── BUDOWANIE DOKUMENTU ────────────────────────────────────────────────

  const children: any[] = []

  // ── STRONA TYTUŁOWA ─────────────────────────────────────────────
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER, spacing: { before: 1800, after: 200 },
      children: [new TextRun({ text: 'RiskAnalytix', size: 72, bold: true, color: '1F3A6E', font: 'Arial' })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER, spacing: { after: 100 },
      children: [new TextRun({ text: 'Ocena ryzyka maszyn wg PN-EN ISO 12100:2012', size: 26, color: '6B7280', font: 'Arial' })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: 'E8A838', space: 1 } },
      spacing: { after: 300 },
      children: [],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER, spacing: { before: 400, after: 120 },
      children: [new TextRun({ text: 'RAPORT OCENY RYZYKA', size: 42, bold: true, color: '1F2937', font: 'Arial' })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER, spacing: { after: 80 },
      children: [new TextRun({ text: analysis.machineName || '—', size: 32, bold: true, color: 'E8A838', font: 'Arial' })],
    }),
    analysis.clientCompany ? new Paragraph({
      alignment: AlignmentType.CENTER, spacing: { after: 600 },
      children: [new TextRun({ text: analysis.clientCompany, size: 26, color: '6B7280', font: 'Arial', italics: true })],
    }) : gap(600),
    infoTable([
      ['Data analizy', date],
      ['Analityk', analysis.analystName || ''],
      ['Norma', analysis.norm || ''],
      ['Metoda', analysis.riskMethod === 'SxFxPxA' ? 'S × F × P × A' : 'S × P'],
      ['Łącznie zagrożeń', String(entries.length)],
      ['Zagrożeń wysokich', String(high.length)],
    ]),
    gap(400),
    new Paragraph({ children: [new PageBreak()] }),
  )

  // ── 1. DANE MASZYNY ─────────────────────────────────────────────
  children.push(h1('1. Dane maszyny i klienta'), gap(80))
  children.push(h2('1.1 Dane maszyny'))
  children.push(infoTable([
    ['Nazwa maszyny', analysis.machineName],
    ['Kategoria', analysis.machineCategory],
    ['Producent', analysis.manufacturer],
    ['Nr seryjny', analysis.serialNo],
    ['Rok produkcji', analysis.productionYear?.toString()],
    ['Zastosowane normy', analysis.norm],
    ['Przeznaczenie', analysis.purpose],
  ]))
  children.push(gap(160))

  if (analysis.clientCompany || analysis.clientName) {
    children.push(h2('1.2 Dane klienta'))
    children.push(infoTable([
      ['Firma', analysis.clientCompany],
      ['Osoba kontaktowa', analysis.clientName],
      ['NIP', analysis.clientNip],
      ['Adres', analysis.clientAddress],
    ]))
    children.push(gap(160))
  }

  // ── 2. GRANICE MASZYNY ────────────────────────────────────────────
  if (analysis.intendedUse || analysis.foreseenMisuse || analysis.spaceLimits || analysis.timeLimits || analysis.envLimits) {
    children.push(h1('2. Granice maszyny — ISO 12100 §5.3'), gap(80))
    children.push(infoTable([
      ['Przewidywane użycie', analysis.intendedUse],
      ['Rozsądnie przewidywalne nadużycie', analysis.foreseenMisuse],
      ['Granice przestrzenne', analysis.spaceLimits],
      ['Granice czasowe (cykl życia)', analysis.timeLimits],
      ['Ograniczenia środowiskowe', analysis.envLimits],
    ].filter(([, v]) => v) as [string, string][]))
    children.push(gap(200))
  }

  // ── 3. TABELA ZAGROŻEŃ ────────────────────────────────────────────
  children.push(h1(`3. Tabela zagrożeń (${entries.length})`), gap(80))

  if (high.length > 0) {
    children.push(redBox(`⚠ ${high.length} zagrożeń o WYSOKIM ryzyku (R≥12) wymaga natychmiastowych środków ochronnych.`))
    children.push(gap(100))
  }

  // Nagłówek tabeli
  const colWidths = [1400, 1400, 1000, 400, 400, 500, 2426] // element, zagrożenie, skutek, S, P, R, działanie
  children.push(new Table({
    width: { size: W, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: [
      new TableRow({
        tableHeader: true,
        children: [
          headerCell('Element maszyny', colWidths[0]),
          headerCell('Zagrożenie', colWidths[1]),
          headerCell('Skutek', colWidths[2]),
          headerCell('S', colWidths[3]),
          headerCell('P', colWidths[4]),
          headerCell('R', colWidths[5]),
          headerCell('Środek ochronny', colWidths[6]),
        ],
      }),
      ...entries.map((e, i) => {
        const tEntry = tr(e)
        const r = e.severity * e.probability
        const rColor = getRiskColor(r)
        const alt = i % 2 === 1
        const bg = alt ? 'F9FAFB' : 'FFFFFF'

        return new TableRow({
          children: [
            cell(tEntry.element, colWidths[0], { fill: bg }),
            cell(tEntry.threat, colWidths[1], { fill: bg }),
            cell(tEntry.effect, colWidths[2], { fill: bg }),
            cell(String(e.severity), colWidths[3], { fill: bg, bold: true, color: rColor }),
            cell(String(e.probability), colWidths[4], { fill: bg, bold: true, color: rColor }),
            cell(String(r), colWidths[5], { fill: bg, bold: true, color: rColor }),
            cell(tEntry.action || '—', colWidths[6], { fill: bg }),
          ],
        })
      }),
    ],
  }))

  // Uzasadnienia
  const withJust = entries.filter(e => e.justificationS || e.justificationP || e.scenario)
  if (withJust.length > 0) {
    children.push(gap(160))
    children.push(h2('3.1 Uzasadnienia oceny S i P'))
    children.push(new Table({
      width: { size: W, type: WidthType.DXA },
        columnWidths: [2200, 500, 2163, 500, 2163],
      rows: [
        new TableRow({
          tableHeader: true,
          children: [
            headerCell('Zagrożenie', 2200),
            headerCell('S', 500),
            headerCell('Uzasadnienie S', 2163),
            headerCell('P', 500),
            headerCell('Uzasadnienie P', 2163),
          ],
        }),
        ...withJust.map((e, i) => {
          const tEntry = tr(e)
          const bg = i % 2 === 1 ? 'F9FAFB' : 'FFFFFF'
          return new TableRow({
            children: [
              cell(tEntry.element, 2200, { fill: bg }),
              cell(String(e.severity), 500, { fill: bg, bold: true }),
              cell(e.justificationS || '—', 2163, { fill: bg }),
              cell(String(e.probability), 500, { fill: bg, bold: true }),
              cell(e.justificationP || '—', 2163, { fill: bg }),
            ],
          })
        }),
      ],
    }))
  }

  children.push(gap(200))

  // ── 4. RYZYKO RESZTKOWE ───────────────────────────────────────────
  const withResidual = entries.filter(e => e.residualS != null || e.residualP != null)
  if (withResidual.length > 0) {
    children.push(h1('4. Ryzyko resztkowe po zastosowaniu środków ochronnych'), gap(80))
    children.push(new Table({
      width: { size: W, type: WidthType.DXA },
      columnWidths: [2600, 1000, 600, 600, 600, 600, 2026],
      rows: [
        new TableRow({
          tableHeader: true,
          children: [
            headerCell('Zagrożenie', 2600),
            headerCell('Skuteczność środka', 1000),
            headerCell("S'", 600),
            headerCell("P'", 600),
            headerCell("R'", 600),
            headerCell('Poziom', 600),
            headerCell('Środek ochronny', 2026),
          ],
        }),
        ...withResidual.map((e, i) => {
          const tEntry = tr(e)
          const rr = (e.residualS ?? 1) * (e.residualP ?? 1)
          const rColor = getRiskColor(rr)
          const bg = i % 2 === 1 ? 'F9FAFB' : 'FFFFFF'
          const levelMap: Record<string, string> = { high: '🛡️ Wysoki', medium: '🔶 Średni', low: '📋 Niski', none: '—' }
          return new TableRow({
            children: [
              cell(tEntry.element, 2600, { fill: bg }),
              cell(levelMap[e.reductionLevel || 'none'] || '—', 1000, { fill: bg }),
              cell(String(e.residualS ?? '—'), 600, { fill: bg }),
              cell(String(e.residualP ?? '—'), 600, { fill: bg }),
              cell(String(rr), 600, { fill: bg, bold: true, color: rColor }),
              cell(getRiskLabel(rr), 600, { fill: bg, color: rColor }),
              cell(tEntry.action || '—', 2026, { fill: bg }),
            ],
          })
        }),
      ],
    }))
    children.push(gap(200))
  }

  // ── 5. HIERARCHIA ŚRODKÓW ─────────────────────────────────────────
  const withLevel = entries.filter(e => e.actionLevel)
  if (withLevel.length > 0) {
    children.push(h1('5. Hierarchia środków ochronnych — ISO 12100 §6.2'), gap(80))
    const levels = [
      { key: 'design', label: '🔧 Poziom 1 — Eliminacja / projekt bezpieczny', color: '16A34A', bg: 'F0FDF4' },
      { key: 'technical', label: '🛡️ Poziom 2 — Techniczne środki ochronne', color: 'D97706', bg: 'FFFBEB' },
      { key: 'organisational', label: '📋 Poziom 3 — Organizacyjne / ŚOI / informacja', color: '6B7280', bg: 'F9FAFB' },
    ]
    for (const level of levels) {
      const lvlEntries = withLevel.filter(e => e.actionLevel === level.key)
      if (lvlEntries.length === 0) continue
      children.push(new Table({
        width: { size: W, type: WidthType.DXA },
        columnWidths: [W],
        rows: [new TableRow({ children: [new TableCell({
          borders: { top: { style: BorderStyle.SINGLE, size: 4, color: level.color }, bottom: border1, left: { style: BorderStyle.SINGLE, size: 8, color: level.color }, right: border1 },
          shading: { fill: level.bg, type: ShadingType.CLEAR },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          children: [new Paragraph({ children: [new TextRun({ text: level.label, size: 20, bold: true, color: level.color, font: 'Arial' })] })],
        })] })],
      }))
      children.push(new Table({
        width: { size: W, type: WidthType.DXA },
        columnWidths: [2800, 3226, 3000],
        rows: [
          new TableRow({ children: [headerCell('Element', 2800), headerCell('Zagrożenie', 3226), headerCell('Podstawa normy', 3000)] }),
          ...lvlEntries.map((e, i) => {
            const tEntry = tr(e)
            const bg = i % 2 === 1 ? 'F9FAFB' : 'FFFFFF'
            return new TableRow({ children: [
              cell(tEntry.element, 2800, { fill: bg }),
              cell(tEntry.threat, 3226, { fill: bg }),
              cell(e.actionNorm || '—', 3000, { fill: bg }),
            ]})
          }),
        ],
      }))
      children.push(gap(100))
    }
    children.push(gap(100))
  }

  // ── 6. PLr ────────────────────────────────────────────────────────
  const withPlr = entries.filter(e => e.plrR)
  if (withPlr.length > 0) {
    children.push(h1('6. Wymagany poziom zapewnienia bezpieczeństwa PLr — ISO 13849-1'), gap(80))
    children.push(yellowBox('PLr obliczony z Tab. K.1 ISO 13849-1:2023. Ostateczna weryfikacja parametrów MTTFd, DCavg i kategorii architektury należy do producenta lub certyfikowanego specjalisty ds. bezpieczeństwa funkcjonalnego.'))
    children.push(gap(100))
    children.push(new Table({
      width: { size: W, type: WidthType.DXA },
      columnWidths: [2200, 500, 500, 500, 600, 1726, 3000],
      rows: [
        new TableRow({
          tableHeader: true,
          children: [
            headerCell('Zagrożenie', 2200),
            headerCell('S', 500), headerCell('F', 500), headerCell('P', 500),
            headerCell('PLr', 600),
            headerCell('Uzasadnienie P1/P2', 1726),
            headerCell('Środek / układ sterowania', 3000),
          ],
        }),
        ...withPlr.map((e, i) => {
          const tEntry = tr(e)
          const bg = i % 2 === 1 ? 'F9FAFB' : 'FFFFFF'
          const plrColors: Record<string, string> = { A: '16A34A', B: '16A34A', C: 'D97706', D: 'D97706', E: 'DC2626' }
          const plrLetter = (e.plrR || '').replace('PL ', '').toUpperCase()
          return new TableRow({ children: [
            cell(tEntry.element, 2200, { fill: bg }),
            cell(e.plrS || '—', 500, { fill: bg }),
            cell(e.plrF || '—', 500, { fill: bg }),
            cell(e.plrP || '—', 500, { fill: bg }),
            cell(e.plrR || '—', 600, { fill: bg, bold: true, color: plrColors[plrLetter] || '374151' }),
            cell(e.plrJustification || '—', 1726, { fill: bg }),
            cell(tEntry.action || '—', 3000, { fill: bg }),
          ]})
        }),
      ],
    }))
    children.push(gap(200))
  }

  // ── 7. CYKL ŻYCIA ─────────────────────────────────────────────────
  children.push(h1('7. Etapy cyklu życia maszyny — ISO 12100 §5.4'), gap(80))
  const lcData = Object.entries(LIFECYCLE_STAGES).map(([key, stageName]) => {
    const lcEntries = entries.filter(e => {
      const stages = typeof e.lifecycleStages === 'string'
        ? (() => { try { return JSON.parse(e.lifecycleStages as string) } catch { return [] } })()
        : (e.lifecycleStages || [])
      return (stages as string[]).includes(key)
    })
    return { key, stageName, lcEntries }
  })

  children.push(new Table({
    width: { size: W, type: WidthType.DXA },
    columnWidths: [120, 2000, 3906, 3000],
    rows: [
      new TableRow({ tableHeader: true, children: [
        headerCell('#', 120), headerCell('Etap cyklu życia', 2000),
        headerCell('Zagrożenia', 3906), headerCell('Liczba', 3000),
      ]}),
      ...lcData.map(({ key, stageName, lcEntries }, i) => {
        const bg = i % 2 === 1 ? 'F9FAFB' : 'FFFFFF'
        const hasEntries = lcEntries.length > 0
        return new TableRow({ children: [
          cell(String(i + 1), 120, { fill: bg }),
          cell(stageName, 2000, { fill: bg, bold: hasEntries }),
          cell(hasEntries ? lcEntries.map(e => tr(e).element).join(', ') : '—', 3906, { fill: bg }),
          cell(hasEntries ? `${lcEntries.length} zagrożeń` : '—', 3000, { fill: bg, color: hasEntries ? '1F3A6E' : '6B7280' }),
        ]})
      }),
    ],
  }))
  children.push(gap(200))

  // ── 8. WNIOSKI ────────────────────────────────────────────────────
  children.push(h1('8. Wnioski i zalecenia'), gap(80))
  if (high.length > 0) {
    children.push(redBox(`⛔ ${high.length} zagrożeń o WYSOKIM ryzyku (R≥12). Wymagane natychmiastowe działania naprawcze przed dopuszczeniem maszyny do eksploatacji: ${high.map(e => tr(e).element).join(', ')}.`))
    children.push(gap(80))
  }
  if (med.length > 0) {
    children.push(yellowBox(`⚠ ${med.length} zagrożeń o ŚREDNIM ryzyku (R=6-11). Wymagane środki ochronne — wdrożyć zgodnie z hierarchią ISO 12100 §6.2.`))
    children.push(gap(80))
  }
  if (high.length === 0 && med.length === 0) {
    children.push(new Table({
      width: { size: W, type: WidthType.DXA },
      columnWidths: [W],
      rows: [new TableRow({ children: [new TableCell({
        borders: { top: { style: BorderStyle.SINGLE, size: 6, color: '16A34A' }, bottom: border1, left: border1, right: border1 },
        shading: { fill: 'F0FDF4', type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 140, right: 140 },
        children: [new Paragraph({ children: [new TextRun({ text: '✓ Brak zagrożeń wysokiego i średniego ryzyka. Maszyna spełnia wymagania ISO 12100 dla zidentyfikowanych zagrożeń.', size: 18, color: '14532D', font: 'Arial' })] })],
      })] })],
    }))
    children.push(gap(80))
  }
  children.push(gap(200))

  // ── 9. ODPOWIEDZIALNOŚĆ ───────────────────────────────────────────
  const prep = approval?.preparedBy || analysis.preparedBy
  const appr = approval?.approvedBy || analysis.approvedBy
  if (prep || appr) {
    children.push(h1('9. Odpowiedzialność za ocenę ryzyka'), gap(80))
    children.push(new Table({
      width: { size: W, type: WidthType.DXA },
      columnWidths: [W / 2, W / 2],
      rows: [new TableRow({ children: [
        new TableCell({
          borders: bAll, shading: { fill: 'F0FDF4', type: ShadingType.CLEAR },
          margins: { top: 120, bottom: 200, left: 160, right: 160 },
          children: [
            new Paragraph({ children: [new TextRun({ text: '✏ OPRACOWAŁ', size: 16, bold: true, color: '16A34A', font: 'Arial' })] }),
            new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: prep || '—', size: 22, bold: true, color: '1F2937', font: 'Arial' })] }),
            approval?.preparedRole || analysis.preparedRole
              ? new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: approval?.preparedRole || analysis.preparedRole, size: 18, color: '6B7280', font: 'Arial', italics: true })] })
              : gap(80),
            new Paragraph({ spacing: { after: 0 }, border: { top: { style: BorderStyle.SINGLE, size: 1, color: 'BBF7D0', space: 1 } }, children: [new TextRun({ text: 'Podpis: _________________________________', size: 16, color: '9CA3AF', font: 'Arial' })] }),
          ],
        }),
        new TableCell({
          borders: bAll, shading: { fill: 'FFFBEB', type: ShadingType.CLEAR },
          margins: { top: 120, bottom: 200, left: 160, right: 160 },
          children: [
            new Paragraph({ children: [new TextRun({ text: '✓ ZATWIERDZIŁ', size: 16, bold: true, color: 'D97706', font: 'Arial' })] }),
            new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: appr || '—', size: 22, bold: true, color: '1F2937', font: 'Arial' })] }),
            approval?.approvedRole || analysis.approvedRole
              ? new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: approval?.approvedRole || analysis.approvedRole, size: 18, color: '6B7280', font: 'Arial', italics: true })] })
              : gap(40),
            approval?.approvedDate || analysis.approvedDate
              ? new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: `Data: ${new Date(approval?.approvedDate || analysis.approvedDate).toLocaleDateString(locale)}`, size: 18, color: '6B7280', font: 'Arial' })] })
              : gap(80),
            new Paragraph({ spacing: { after: 0 }, border: { top: { style: BorderStyle.SINGLE, size: 1, color: 'FDE68A', space: 1 } }, children: [new TextRun({ text: 'Podpis: _________________________________', size: 16, color: '9CA3AF', font: 'Arial' })] }),
          ],
        }),
      ]})]
    }))
    children.push(gap(200))
  }

  // ── 10. WYMAGANE ZAŁĄCZNIKI ───────────────────────────────────────
  children.push(h1('10. Wymagane załączniki do dokumentacji technicznej CE'), gap(80))
  children.push(yellowBox('Zgodnie z Dyrektywą Maszynową 2006/42/WE Załącznik VII — niniejsza ocena ryzyka stanowi element dokumentacji technicznej i powinna być uzupełniona o poniższe dokumenty przed wystawieniem Deklaracji Zgodności CE.'))
  children.push(gap(100))
  children.push(new Table({
    width: { size: W, type: WidthType.DXA },
    columnWidths: [300, 3663, 5063],
    rows: [
      new TableRow({ tableHeader: true, children: [
        headerCell('', 300), headerCell('Dokument', 3663), headerCell('Podstawa normatywna', 5063),
      ]}),
      ...[
        ['🔊', 'Protokół pomiaru hałasu', 'EN ISO 9614, PN-EN 3746'],
        ['📳', 'Protokół pomiaru drgań mechanicznych', 'EN ISO 5349, EN ISO 8041'],
        ['⚡', 'Certyfikaty komponentów bezpieczeństwa', 'np. kurtyny PL d/e, skanery, blokady'],
        ['🛡️', 'Deklaracje zgodności środków ochronnych', 'Dyrektywa 2006/42/WE'],
        ['🔌', 'Raport z badań EMC / elektrycznych', 'EN 60204-1, Dyrektywa 2014/30/UE'],
        ['🧪', 'Badania substancji niebezpiecznych', 'REACH, CLP — jeśli dotyczy'],
        ['📐', 'Rysunki techniczne stref niebezpiecznych', 'EN ISO 13857 — odległości bezpieczeństwa'],
        ['📋', 'Protokoły testów funkcjonalnych', 'Weryfikacja PLr, E-STOP, blokady osłon'],
        ['🎓', 'Potwierdzenia szkoleń operatorów', 'Gdy środek ochronny = szkolenia / ŚOI'],
        ['📄', 'Instrukcja obsługi maszyny', 'Dyrektywa 2006/42/WE Załącznik I §1.7.4'],
      ].map(([icon, doc, norm], i) => new TableRow({ children: [
        cell('☐', 300, { fill: i % 2 === 1 ? 'F9FAFB' : 'FFFFFF', bold: true }),
        cell(`${icon}  ${doc}`, 3663, { fill: i % 2 === 1 ? 'F9FAFB' : 'FFFFFF' }),
        cell(norm, 5063, { fill: i % 2 === 1 ? 'F9FAFB' : 'FFFFFF', color: '6B7280' }),
      ]})),
    ],
  }))
  children.push(gap(120))
  children.push(redBox('⚠ Niniejszy raport (ocena ryzyka) jest elementem dokumentacji technicznej CE — nie zastępuje kompletnej dokumentacji wymaganej przez Dyrektywę 2006/42/WE Załącznik VII. Deklaracja Zgodności CE może być wystawiona wyłącznie po skompletowaniu wszystkich wymaganych dokumentów i ich weryfikacji przez osobę kompetentną lub jednostkę notyfikowaną (dla maszyn z Załącznika IV).'))
  children.push(gap(200))

  // ── DISCLAIMER ────────────────────────────────────────────────────
  children.push(yellowBox('ZASTRZEŻENIE: Niniejsza ocena ryzyka ma charakter pomocniczy i wspomagający. Nie zastępuje konsultacji z certyfikowanym specjalistą BHP ani oficjalnej oceny zgodności CE. Sporządzono zgodnie z PN-EN ISO 12100:2012 oraz Dyrektywą Maszynową 2006/42/WE. Odpowiedzialność za prawidłowość analizy i bezpieczeństwo maszyny spoczywa na użytkowniku.'))

  // ── DOKUMENT ──────────────────────────────────────────────────────
  const doc = new Document({
    numbering: {
      config: [
        { reference: 'bullets', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      ],
    },
    styles: {
      default: { document: { run: { font: 'Arial', size: 20 } } },
      paragraphStyles: [
        { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 28, bold: true, font: 'Arial', color: '1F3A6E' }, paragraph: { spacing: { before: 300, after: 120 }, outlineLevel: 0 } },
        { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 22, bold: true, font: 'Arial', color: '1F3A6E' }, paragraph: { spacing: { before: 200, after: 80 }, outlineLevel: 1 } },
      ],
    },
    sections: [{
      properties: {
        page: { size: { width: 11906, height: 16838 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } },
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: '1F3A6E', space: 1 } },
            spacing: { after: 0 },
            children: [
              new TextRun({ text: `RiskAnalytix — Ocena ryzyka: ${analysis.machineName}`, color: '1F3A6E', size: 18, bold: true, font: 'Arial' }),
              new TextRun({ text: `   |   ${date}`, color: '6B7280', size: 16, font: 'Arial' }),
            ],
          })],
        }),
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            border: { top: { style: BorderStyle.SINGLE, size: 2, color: 'E5E7EB', space: 1 } },
            alignment: AlignmentType.RIGHT,
            children: [new TextRun({ text: 'RiskAnalytix · PN-EN ISO 12100:2012 · riskanalytix.vercel.app', color: '9CA3AF', size: 16, font: 'Arial' })],
          })],
        }),
      },
      children,
    }],
  })

  return Packer.toBlob(doc)
}

export default function DocxDownloadButton({ analysis, approval = {} }: Props) {
  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    setLoading(true)
    try {
      const blob = await generateDocx(analysis, approval)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `ocena-ryzyka-${(analysis.machineName || 'maszyna').replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().slice(0, 10)}.docx`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('DOCX generation error:', err)
      alert('Błąd generowania pliku DOCX. Spróbuj ponownie.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      style={{
        padding: '7px 16px', borderRadius: '6px', border: '1px solid rgba(96,165,250,.4)',
        background: loading ? '#1e2d45' : 'rgba(96,165,250,.1)',
        color: loading ? '#4a5a72' : '#60A5FA',
        cursor: loading ? 'default' : 'pointer',
        fontSize: '11px', fontFamily: 'Lato, sans-serif', fontWeight: 700,
        transition: 'all .15s',
      }}
    >
      {loading ? '⦳ Generowanie...' : '⬇ DOCX'}
    </button>
  )
}