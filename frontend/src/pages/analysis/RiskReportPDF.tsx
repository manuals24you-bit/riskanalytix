// @ts-nocheck
// frontend/src/pages/analysis/RiskReportPDF.tsx
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'
// fonts loaded async via PDFDownloadButton → registerFonts()
import { getPdfT } from '../../i18n/pdfTranslations'
import { translateRiskEntry, type Lang } from '../../i18n/machinesI18n'
import { translateAction } from '../../i18n/actionsI18n'
import { validateAnalysis, getValidationSummary } from '../../utils/analysisValidation'

// fonts registered async in PDFDownloadButton

const getRisk = (s: number, p: number, t: ReturnType<typeof getPdfT>) => {
  const r = s * p
  if (r >= 12) return { r, label: t.high,   color: '#DC2626', bg: '#FEE2E2' }
  if (r >= 6)  return { r, label: t.med,    color: '#D97706', bg: '#FEF3C7' }
  if (r >= 3)  return { r, label: t.low,    color: '#16A34A', bg: '#DCFCE7' }
  return           { r, label: t.neg,    color: '#6B7280', bg: '#F3F4F6' }
}

const S = StyleSheet.create({
  page: { fontFamily: 'NotoSans', fontSize: 9, color: '#1F2937', backgroundColor: '#FFFFFF', paddingTop: 40, paddingBottom: 50, paddingLeft: 36, paddingRight: 36 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  logoText: {
    fontFamily: 'NotoSans', fontSize: 18, fontWeight: 'bold', color: '#1F2937' },
  logoAccent: { color: '#D97706' },
  headerMetaLine: {
    fontFamily: 'NotoSans', fontSize: 7.5, color: '#6B7280', marginBottom: 2, textAlign: 'right' },
  headerMetaBold: {
    fontFamily: 'NotoSans', fontSize: 8, color: '#1F2937', fontWeight: 'bold', textAlign: 'right' },
  headerDivider: { height: 2, backgroundColor: '#D97706', marginBottom: 14, marginTop: 2 },
  docTitle: {
    fontFamily: 'NotoSans', fontSize: 15, fontWeight: 'bold', color: '#111827', marginBottom: 3 },
  docSubtitle: {
    fontFamily: 'NotoSans', fontSize: 9, color: '#6B7280', marginBottom: 16 },
  sectionTitle: {
    fontFamily: 'NotoSans', fontSize: 8, fontWeight: 'bold', color: '#D97706', marginBottom: 6, borderBottomWidth: 1, borderBottomColor: '#FDE68A', paddingBottom: 3 },
  infoGrid: { flexDirection: 'row', marginBottom: 14 },
  infoBox: { flex: 1, backgroundColor: '#F9FAFB', borderRadius: 4, padding: 8, marginRight: 6, borderTopWidth: 1, borderBottomWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderTopColor: '#E5E7EB', borderBottomColor: '#E5E7EB', borderLeftColor: '#E5E7EB', borderRightColor: '#E5E7EB' },
  infoBoxLast: { flex: 1, backgroundColor: '#F9FAFB', borderRadius: 4, padding: 8, borderTopWidth: 1, borderBottomWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderTopColor: '#E5E7EB', borderBottomColor: '#E5E7EB', borderLeftColor: '#E5E7EB', borderRightColor: '#E5E7EB' },
  infoBoxTitle: {
    fontFamily: 'NotoSans', fontSize: 7.5, fontWeight: 'bold', color: '#374151', marginBottom: 5 },
  infoRow: { flexDirection: 'row', marginBottom: 3 },
  infoLabel: {
    fontFamily: 'NotoSans', width: 80, fontSize: 7.5, color: '#9CA3AF' },
  infoValue: {
    fontFamily: 'NotoSans', flex: 1, fontSize: 7.5, color: '#1F2937', fontWeight: 'bold' },
  tableHeader: { flexDirection: 'row', backgroundColor: '#1F2937', paddingTop: 5, paddingBottom: 5, paddingLeft: 4, paddingRight: 4 },
  tableHeaderCell: {
    fontFamily: 'NotoSans', fontSize: 7, fontWeight: 'bold', color: '#FFFFFF', paddingTop: 6, paddingBottom: 6, paddingLeft: 6, paddingRight: 4 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#F3F4F6', paddingTop: 5, paddingBottom: 5, paddingLeft: 4, paddingRight: 4 },
  tableRowAlt: { backgroundColor: '#F9FAFB' },
  tableCell: {
    fontFamily: 'NotoSans', fontSize: 8, color: '#374151', paddingTop: 6, paddingBottom: 6, paddingLeft: 6, paddingRight: 4 },
  colN: { width: 18 }, colElement: { width: 72 }, colThreat: { width: 76 },
  colEffect: { width: 62 }, colS: { width: 16 }, colP: { width: 16 },
  colR: { width: 18 }, colLevel: { width: 44 }, colScenario: { width: 80 }, colAction: { flex: 1 },
  badge: { borderRadius: 3, paddingLeft: 4, paddingRight: 4, paddingTop: 2, paddingBottom: 2 },
  badgeText: {
    fontFamily: 'NotoSans', fontSize: 6.5, fontWeight: 'bold' },
  matrixRow: { flexDirection: 'row', marginBottom: 2 },
  matrixLabel: { width: 28, height: 28, alignItems: 'flex-end', justifyContent: 'center', paddingRight: 4 },
  matrixLabelText: {
    fontFamily: 'NotoSans', fontSize: 7, color: '#6B7280' },
  matrixHeaderCell: { width: 36, height: 16, alignItems: 'center', justifyContent: 'center', marginLeft: 1, marginRight: 1 },
  matrixHeaderText: {
    fontFamily: 'NotoSans', fontSize: 7, color: '#6B7280' },
  matrixCell: { width: 36, height: 28, borderRadius: 3, alignItems: 'center', justifyContent: 'center', marginLeft: 1, marginRight: 1 },
  matrixScore: {
    fontFamily: 'NotoSans', fontSize: 9, fontWeight: 'bold' },
  matrixCount: {
    fontFamily: 'NotoSans', fontSize: 6 },
  legendRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  legendDot: { width: 10, height: 10, borderRadius: 2, marginRight: 5 },
  legendLabel: {
    fontFamily: 'NotoSans', fontSize: 7, fontWeight: 'bold' },
  legendDesc: {
    fontFamily: 'NotoSans', fontSize: 7, color: '#6B7280' },
  concBox: { borderRadius: 4, padding: 8, marginBottom: 8 },
  concTitle: {
    fontFamily: 'NotoSans', fontSize: 8, fontWeight: 'bold', marginBottom: 3 },
  concText: {
    fontFamily: 'NotoSans', fontSize: 8, lineHeight: 1.8 },
  methodBox: { backgroundColor: '#F9FAFB', borderRadius: 4, padding: 8, borderTopWidth: 1, borderBottomWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderTopColor: '#E5E7EB', borderBottomColor: '#E5E7EB', borderLeftColor: '#E5E7EB', borderRightColor: '#E5E7EB' },
  methodTitle: {
    fontFamily: 'NotoSans', fontSize: 8, fontWeight: 'bold', color: '#1F2937', marginBottom: 5 },
  methodStep: { flexDirection: 'row', marginBottom: 4 },
  methodNum: {
    fontFamily: 'NotoSans', fontSize: 8, fontWeight: 'bold', color: '#D97706', width: 14, marginRight: 6 },
  methodText: {
    fontFamily: 'NotoSans', flex: 1, fontSize: 7.5, color: '#374151', lineHeight: 1.5 },
  lifecycleTable: { marginTop: 14, marginBottom: 8 },
  lifecycleRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#F3F4F6', paddingTop: 5, paddingBottom: 5, paddingLeft: 6, paddingRight: 6 },
  lifecycleRowAlt: { backgroundColor: '#F9FAFB' },
  lifecycleRowHeader: { flexDirection: 'row', backgroundColor: '#1F2937', paddingTop: 5, paddingBottom: 5, paddingLeft: 6, paddingRight: 6, borderRadius: 2 },
  lifecycleColNo: {
    fontFamily: 'NotoSans', width: 20, fontSize: 7.5, color: '#374151' },
  lifecycleColStage: {
    fontFamily: 'NotoSans', width: 110, fontSize: 7.5, color: '#374151', fontWeight: 'bold' },
  lifecycleColDesc: {
    fontFamily: 'NotoSans', flex: 1, fontSize: 7, color: '#6B7280' },
  lifecycleColCheck: {
    fontFamily: 'NotoSans', width: 60, fontSize: 7.5, color: '#374151', textAlign: 'center' },
  lifecycleHeaderText: {
    fontFamily: 'NotoSans', fontSize: 7, color: '#FFFFFF', fontWeight: 'bold', },
  disclaimer: { backgroundColor: '#FFFBEB', borderRadius: 4, padding: 8, marginTop: 10, borderTopWidth: 1, borderBottomWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderTopColor: '#FDE68A', borderBottomColor: '#FDE68A', borderLeftColor: '#FDE68A', borderRightColor: '#FDE68A' },
  disclaimerText: {
    fontFamily: 'NotoSans', fontSize: 7, color: '#1F2937', lineHeight: 1.5 },
  footer: { position: 'absolute', bottom: 20, left: 36, right: 36, borderTopWidth: 1, borderTopColor: '#E5E7EB', paddingTop: 6, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  footerText: {
    fontFamily: 'NotoSans', fontSize: 6.5, color: '#9CA3AF' },
  logo: { width: 80, height: 28 },
})

interface Entry {
  id: string; element: string; threat: string; effect?: string
  severity: number; probability: number; riskScore: number; action?: string; sortOrder: number
  scenario?: string; justificationS?: string; justificationP?: string
  reductionLevel?: string; residualS?: number; residualP?: number; residualR?: number
  plrS?: string; plrF?: string; plrP?: string; plrAuto?: string; plrManual?: string
  plAchieved?: string; plCategory?: string; mttfd?: string; dcavg?: string; riskMethod?: string
  plrJustification?: string
  actionLevel?: string
  actionNorm?: string
  lifecycleStages?: string | string[]
}

interface Props {
  analysis: {
    id?: string
    machineName: string; machineCategory: string; serialNo?: string; manufacturer?: string
    productionYear?: number; purpose?: string; norm?: string; analystName?: string
    analysisDate?: string; notes?: string; clientName?: string; clientCompany?: string
    clientNip?: string; clientAddress?: string; clientLogo?: string
    language?: string
    machineId?: string
    machineType?: string
    // Granice maszyny ISO 12100 §5.3
    intendedUse?: string; foreseenMisuse?: string; spaceLimits?: string
    timeLimits?: string; envLimits?: string
    preparedBy?: string; preparedRole?: string
    approvedBy?: string; approvedRole?: string; approvedDate?: string
    riskEntries?: Entry[]
    entries?: Entry[]
  }
  settings?: Record<string, string>
}

export default function RiskReportPDF({ analysis, settings = {} }: Props) {
  const lang = (analysis.language || 'pl') as Lang
  const t = getPdfT(lang)

  const locale = lang === 'pl' ? 'pl-PL' : lang === 'de' ? 'de-DE' : lang === 'fr' ? 'fr-FR' :
    lang === 'it' ? 'it-IT' : lang === 'es' ? 'es-ES' : lang === 'cs' ? 'cs-CZ' : 'en-GB'

  // ── i18n: reverse lookup po polskim tekście — działa bez threatKey w bazie ──
  const tr = (e: Entry) => ({
    ...translateRiskEntry(e, lang),
    action: translateAction(e.action, lang),
    scenario: translateRiskEntry(e, lang).scenario || e.scenario || '',
  })

  const entries = [...(analysis.riskEntries || analysis.entries || [])].sort(
    (a, b) => (b.severity * b.probability) - (a.severity * a.probability)
  )
  const high = entries.filter(e => e.severity * e.probability >= 12)
  const med  = entries.filter(e => { const r = e.severity * e.probability; return r >= 6 && r < 12 })
  const low  = entries.filter(e => e.severity * e.probability < 6)

  const companyName = settings.company_name || 'RiskAnalytix'
  const pdfFooter   = settings.pdf_footer   || t.footer
  const companyLogo = settings.company_logo || ''
  const date = analysis.analysisDate
    ? new Date(analysis.analysisDate).toLocaleDateString(locale)
    : new Date().toLocaleDateString(locale)

  const infoFields = (fields: [string, string | undefined][]) =>
    fields.filter(([, v]) => v).map(([l, v], i) => (
      <View key={i} style={S.infoRow}>
        <Text style={S.infoLabel}>{l}:</Text>
        <Text style={S.infoValue}>{v}</Text>
      </View>
    ))

  return (
    <Document title={`${t.riskReport} — ${analysis.machineName}`} author={companyName}>

      {/* ── STRONA 1 ── */}
      <Page size="A4" style={S.page}>
        {/* Watermark for demo */}
        {analysis.id === 'demo-001' && (
          <View fixed style={{ position: 'absolute', top: '40%', left: 0, right: 0, alignItems: 'center', transform: 'rotate(-35deg)', opacity: 0.07, pointerEvents: 'none' }}>
            <Text style={{ fontFamily: 'NotoSans', fontSize: 72, fontWeight: 'bold', color: '#000000', letterSpacing: 8 }}>PRZYKŁAD</Text>
            <Text style={{ fontFamily: 'NotoSans', fontSize: 24, color: '#000000', letterSpacing: 4 }}>RiskAnalytix.com</Text>
          </View>
        )}
        <View style={S.headerTop}>
          <View>
            {companyLogo
              ? <Image src={companyLogo} style={S.logo} />
              : <Text style={S.logoText}>RiskAnaly<Text style={S.logoAccent}>tix</Text></Text>
            }
            {settings.company_nip
              ? <Text style={{ fontFamily: 'NotoSans', fontSize: 7, color: '#9CA3AF', marginTop: 2 }}>NIP: {settings.company_nip}</Text>
              : null}
          </View>
          <View>
            <Text style={S.headerMetaLine}>{t.riskReportSub}</Text>
            <Text style={S.headerMetaBold}>{t.date}: {date}</Text>
            {analysis.analystName
              ? <Text style={S.headerMetaLine}>{t.analyst}: {analysis.analystName}</Text>
              : null}
          </View>
        </View>
        <View style={S.headerDivider} />
        <Text style={S.docTitle}>{t.riskReport}</Text>
        <Text style={S.docSubtitle}>{analysis.machineName} · {analysis.norm || 'EN ISO 12100:2012'}</Text>

        <Text style={S.sectionTitle}>{t.machineData}</Text>
        <View style={S.infoGrid}>
          <View style={S.infoBox}>
            <Text style={S.infoBoxTitle}>{t.machineData}</Text>
            {infoFields([
              [t.name,         analysis.machineName],
              [t.category,     analysis.machineCategory],
              [t.manufacturer, analysis.manufacturer],
              [t.serialNo,     analysis.serialNo],
              [t.year,         analysis.productionYear?.toString()],
              [t.norm,         analysis.norm],
            ])}
          </View>
          <View style={S.infoBox}>
            <Text style={S.infoBoxTitle}>{t.clientData}</Text>
            {infoFields([
              [t.contact,      analysis.clientName],
              [t.company,      analysis.clientCompany],
              [t.nip,          analysis.clientNip],
              [t.address,      analysis.clientAddress],
              [t.date,         date],
              [t.analyst,      analysis.analystName],
            ])}
          </View>
          <View style={S.infoBoxLast}>
            <Text style={S.infoBoxTitle}>{t.summary}</Text>
            <View style={S.infoRow}>
              <Text style={S.infoLabel}>{t.totalThreats}:</Text>
              <Text style={S.infoValue}>{entries.length}</Text>
            </View>
            <View style={S.infoRow}>
              <Text style={S.infoLabel}>{t.highRisks}:</Text>
              <Text style={[S.infoValue, { color: high.length > 0 ? '#DC2626' : '#1F2937' }]}>{high.length}</Text>
            </View>
            <View style={S.infoRow}>
              <Text style={S.infoLabel}>{t.medRisks}:</Text>
              <Text style={S.infoValue}>{med.length}</Text>
            </View>
            <View style={S.infoRow}>
              <Text style={S.infoLabel}>{t.lowRisks}:</Text>
              <Text style={S.infoValue}>{low.length}</Text>
            </View>
            {analysis.notes
              ? <>
                  <Text style={{ fontFamily: 'NotoSans', fontSize: 7, color: '#6B7280', marginTop: 6, marginBottom: 2 }}>{t.notes}:</Text>
                  <Text style={{ fontFamily: 'NotoSans', fontSize: 7, color: '#374151' }}>{analysis.notes}</Text>
                </>
              : null}
          </View>
        </View>

        <Text style={S.sectionTitle}>{t.riskMatrix}</Text>
        <View style={{ flexDirection: 'row', marginBottom: 14 }}>
          <View>
            <View style={S.matrixRow}>
              <View style={[S.matrixLabel, { height: 16 }]} />
              {[1,2,3,4].map(s => (
                <View key={s} style={S.matrixHeaderCell}>
                  <Text style={S.matrixHeaderText}>S={s}</Text>
                </View>
              ))}
            </View>
            {[4,3,2,1].map(p => (
              <View key={p} style={S.matrixRow}>
                <View style={S.matrixLabel}>
                  <Text style={S.matrixLabelText}>P={p}</Text>
                </View>
                {[1,2,3,4].map(s => {
                  const risk = getRisk(s, p, t)
                  const cnt = entries.filter(e => e.severity === s && e.probability === p).length
                  return (
                    <View key={s} style={[
                      S.matrixCell, { backgroundColor: risk.bg },
                      cnt > 0 ? {
                        borderTopWidth: 1.5, borderBottomWidth: 1.5,
                        borderLeftWidth: 1.5, borderRightWidth: 1.5,
                        borderTopColor: risk.color, borderBottomColor: risk.color,
                        borderLeftColor: risk.color, borderRightColor: risk.color,
                      } : {},
                    ]}>
                      <Text style={[S.matrixScore, { color: risk.color }]}>{risk.r}</Text>
                      {cnt > 0 && <Text style={[S.matrixCount, { color: risk.color }]}>×{cnt}</Text>}
                    </View>
                  )
                })}
              </View>
            ))}
          </View>
          <View style={{ flex: 1, marginLeft: 16, justifyContent: 'center' }}>
            {[
              { bg: '#FEE2E2', color: '#DC2626', label: `${t.high} (R>=12)`,   desc: t.highConclusionText },
              { bg: '#FEF3C7', color: '#D97706', label: `${t.med} (R=6-11)`,   desc: t.medConclusionText },
              { bg: '#DCFCE7', color: '#16A34A', label: `${t.low} (R=3-5)`,    desc: t.lowConclusionText },
              { bg: '#F3F4F6', color: '#6B7280', label: `${t.neg} (R=1-2)`,    desc: '' },
            ].map((l, i) => (
              <View key={i} style={S.legendRow}>
                <View style={[S.legendDot, {
                  backgroundColor: l.bg,
                  borderTopWidth: 1, borderBottomWidth: 1, borderLeftWidth: 1, borderRightWidth: 1,
                  borderTopColor: l.color, borderBottomColor: l.color,
                  borderLeftColor: l.color, borderRightColor: l.color,
                }]} />
                <View>
                  <Text style={[S.legendLabel, { color: l.color }]}>{l.label}</Text>
                  {l.desc ? <Text style={S.legendDesc}>{l.desc}</Text> : null}
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={S.footer} fixed>
          <Text style={S.footerText}>{pdfFooter}</Text>
          <Text style={S.footerText} render={({ pageNumber, totalPages }) => `${t.page} ${pageNumber} ${t.of} ${totalPages}`} />
        </View>
      </Page>

      
        {/* Machine Boundaries Section */}
{/* ── STRONA 2 — TABELA ── */}
      <Page size="A4" style={S.page}>
        {/* Watermark for demo */}
        {analysis.id === 'demo-001' && (
          <View fixed style={{ position: 'absolute', top: '40%', left: 0, right: 0, alignItems: 'center', transform: 'rotate(-35deg)', opacity: 0.07, pointerEvents: 'none' }}>
            <Text style={{ fontFamily: 'NotoSans', fontSize: 72, fontWeight: 'bold', color: '#000000', letterSpacing: 8 }}>PRZYKŁAD</Text>
            <Text style={{ fontFamily: 'NotoSans', fontSize: 24, color: '#000000', letterSpacing: 4 }}>RiskAnalytix.com</Text>
          </View>
        )}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, paddingBottom: 6, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' }} fixed>
          <Text style={{ fontFamily: 'NotoSans', fontSize: 8, fontWeight: 'bold' }}>RiskAnalytix · {analysis.machineName}</Text>
          <Text style={{ fontFamily: 'NotoSans', fontSize: 7.5, color: '#6B7280' }}>{date}</Text>
        </View>

        <Text style={S.sectionTitle}>{t.threatTable} ({entries.length} {t.threats})</Text>

        {(analysis.intendedUse || analysis.foreseenMisuse || analysis.spaceLimits || analysis.timeLimits || analysis.envLimits) && (
          <View style={{ marginBottom: 12 }}>
            <Text style={S.sectionTitle}>5.3 GRANICE MASZYNY I PRZEWIDYWANE UŻYCIE (ISO 12100 §5.3)</Text>
            {[
              { label: 'Przewidywane użycie', value: analysis.intendedUse },
              { label: 'Rozsądnie przewidywalne nadużycie', value: analysis.foreseenMisuse },
              { label: 'Granice przestrzenne', value: analysis.spaceLimits },
              { label: 'Granice czasowe / fazy cyklu życia', value: analysis.timeLimits },
              { label: 'Ograniczenia środowiskowe i inne', value: analysis.envLimits },
            ].filter(r => r.value).map((r, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <Text style={{ fontFamily: 'NotoSans', fontSize: 7, fontWeight: 'bold', color: '#374151', marginBottom: 2 }}>{r.label}</Text>
                <Text style={{ fontFamily: 'NotoSans', fontSize: 7.5, color: '#4B5563', lineHeight: 1.6 }}>{r.value}</Text>
              </View>
            ))}
          </View>
        )}
        <View style={{ borderTopWidth: 1, borderTopColor: '#E5E7EB' }}>
          <View style={S.tableHeader}>
            <Text style={[S.tableHeaderCell, S.colN]}>{t.no}</Text>
            <Text style={[S.tableHeaderCell, S.colElement]}>{t.element}</Text>
            <Text style={[S.tableHeaderCell, S.colThreat]}>{t.threat}</Text>
            <Text style={[S.tableHeaderCell, S.colEffect]}>{t.effect}</Text>
            <Text style={[S.tableHeaderCell, S.colS]}>{t.severity}</Text>
            <Text style={[S.tableHeaderCell, S.colP]}>{t.probability}</Text>
            <Text style={[S.tableHeaderCell, S.colR]}>{t.riskScore}</Text>
            <Text style={[S.tableHeaderCell, S.colLevel]}>{t.level}</Text>
            <Text style={[S.tableHeaderCell, S.colScenario]}>{t.scenario || 'Scenariusz'}</Text>
            <Text style={[S.tableHeaderCell, S.colAction]}>{t.action}</Text>
          </View>
          {entries.map((e, idx) => {
            const risk = getRisk(e.severity, e.probability, t)
            const translated = tr(e)
            return (
              <>
              <View key={e.id} style={[S.tableRow, idx % 2 === 1 ? S.tableRowAlt : {}]} wrap={false}>
                <Text style={[S.tableCell, S.colN, { color: '#9CA3AF' }]}>{idx + 1}</Text>
                <Text style={[S.tableCell, S.colElement, { fontWeight: 'bold' }]}>{translated.element}</Text>
                <Text style={[S.tableCell, S.colThreat]}>{translated.threat}</Text>
                <Text style={[S.tableCell, S.colEffect, { color: '#6B7280' }]}>{translated.effect}</Text>
                <Text style={[S.tableCell, S.colS, { textAlign: 'center', fontWeight: 'bold' }]}>{e.severity}</Text>
                <Text style={[S.tableCell, S.colP, { textAlign: 'center', fontWeight: 'bold' }]}>{e.probability}</Text>
                <Text style={[S.tableCell, S.colR, { textAlign: 'center', fontWeight: 'bold', color: risk.color }]}>{risk.r}</Text>
                <View style={S.colLevel}>
                  <View style={[S.badge, { backgroundColor: risk.bg }]}>
                    <Text style={[S.badgeText, { color: risk.color }]}>{risk.label}</Text>
                  </View>
                </View>
                <Text style={[S.tableCell, S.colScenario, { color: '#6B7280' }]}>{tr(e).scenario || e.scenario || ''}</Text>
                <Text style={[S.tableCell, S.colAction]}>{translated.action || ''}</Text>
              </View>
              {(e.justificationS || e.justificationP) && (
                <View style={{ flexDirection: 'row', paddingTop: 3, paddingBottom: 4, paddingLeft: 6, backgroundColor: '#FFFBEB', borderBottomWidth: 1, borderBottomColor: '#FDE68A' }}>
                  <Text style={{ fontFamily: 'NotoSans', fontSize: 6, color: '#92400E', flex: 1 }}>
                    {e.justificationS ? `S(${e.severity}): ${e.justificationS}` : ''}
                  </Text>
                  <Text style={{ fontFamily: 'NotoSans', fontSize: 6, color: '#92400E', flex: 1 }}>
                    {e.justificationP ? `P(${e.probability}): ${e.justificationP}` : ''}
                  </Text>
                </View>
              )}
              </>
            )
          })}
        </View>

        {/* Ryzyko resztkowe */}
        {entries.some(e => e.reductionLevel && e.reductionLevel !== 'none') && (
          <View style={{ marginTop: 14 }} wrap={false}>
            <Text style={S.sectionTitle}>{t.residualRiskTitle || 'RYZYKO RESZTKOWE PO ŚRODKACH OCHRONNYCH'}</Text>
            <View style={{ borderTopWidth: 1, borderTopColor: '#E5E7EB' }}>
              <View style={S.tableHeader}>
                <Text style={[S.tableHeaderCell, { flex: 3 }]}>{t.element}</Text>
                <Text style={[S.tableHeaderCell, { flex: 3 }]}>{t.action}</Text>
                <Text style={[S.tableHeaderCell, { width: 50 }]}>{t.residualReduction || 'Redukcja'}</Text>
                <Text style={[S.tableHeaderCell, { width: 20, textAlign: 'center' }]}>S</Text>
                <Text style={[S.tableHeaderCell, { width: 20, textAlign: 'center' }]}>P'</Text>
                <Text style={[S.tableHeaderCell, { width: 22, textAlign: 'center' }]}>R'</Text>
                <Text style={[S.tableHeaderCell, { width: 44 }]}>{t.level}</Text>
              </View>
              {entries
                .filter(e => e.reductionLevel && e.reductionLevel !== 'none')
                .sort((a, b) => (b.severity * b.probability) - (a.severity * a.probability))
                .map((e, i) => {
                  const resS = e.residualS ?? e.severity
                  const resP = e.residualP ?? (e.reductionLevel === 'high' ? Math.max(e.probability - 2, 1) : e.reductionLevel === 'medium' ? Math.max(e.probability - 1, 1) : e.probability)
                  const resR = e.residualR ?? (resS * resP)
                  const resRisk = getRisk(resS, resP, t)
                  const translated = tr(e)
                  const reductionLabel = e.reductionLevel === 'high' ? (t.reductionHigh || 'Wysoki') : e.reductionLevel === 'medium' ? (t.reductionMedium || 'Średni') : (t.reductionLow || 'Niski')
                  return (
                    <View key={i} style={[S.tableRow, i % 2 === 1 ? S.tableRowAlt : {}]}>
                      <Text style={[S.tableCell, { flex: 3, fontWeight: 'bold' }]}>{translated.element}</Text>
                      <Text style={[S.tableCell, { flex: 3, color: '#6B7280' }]}>{translated.action || e.action || ''}</Text>
                      <Text style={[S.tableCell, { width: 50, color: '#16A34A' }]}>{reductionLabel}</Text>
                      <Text style={[S.tableCell, { width: 20, textAlign: 'center', fontWeight: 'bold' }]}>{resS}</Text>
                      <Text style={[S.tableCell, { width: 20, textAlign: 'center', fontWeight: 'bold', color: '#16A34A' }]}>{resP}</Text>
                      <Text style={[S.tableCell, { width: 22, textAlign: 'center', fontWeight: 'bold', color: resRisk.color }]}>{resR}</Text>
                      <View style={{ width: 44, paddingTop: 6, paddingBottom: 6, paddingLeft: 4 }}>
                        <View style={[S.badge, { backgroundColor: resRisk.bg }]}>
                          <Text style={[S.badgeText, { color: resRisk.color }]}>{resRisk.label}</Text>
                        </View>
                      </View>
                    </View>
                  )
                })}
            </View>
          </View>
        )}

        {/* PLr / ISO 13849-1 Section */}
        {entries.some(e => e.severity > 0) && (
          <View style={{ marginBottom: 16 }} wrap={false}>
            <Text style={S.sectionTitle}>WYMAGANE POZIOMY PLr — ISO 13849-1:2023</Text>
            <View style={{ borderTopWidth: 1, borderTopColor: '#E5E7EB', marginBottom: 4 }}>
              <View style={{ flexDirection: 'row', backgroundColor: '#1F2937', paddingTop: 5, paddingBottom: 5 }}>
                <Text style={[S.tableHeaderCell, { fontFamily: 'NotoSans', flex: 3 }]}>Element / Zagrożenie</Text>
                <Text style={[S.tableHeaderCell, { width: 22, textAlign: 'center' }]}>S</Text>
                <Text style={[S.tableHeaderCell, { width: 22, textAlign: 'center' }]}>F</Text>
                <Text style={[S.tableHeaderCell, { width: 22, textAlign: 'center' }]}>P</Text>
                <Text style={[S.tableHeaderCell, { width: 40, textAlign: 'center' }]}>PLr (auto)</Text>
                <Text style={[S.tableHeaderCell, { width: 40, textAlign: 'center' }]}>PLr (kor.)</Text>
                <Text style={[S.tableHeaderCell, { width: 40, textAlign: 'center' }]}>PL osiągn.</Text>
                <Text style={[S.tableHeaderCell, { width: 35, textAlign: 'center' }]}>Kat.</Text>
              </View>
              {entries.map((e, i) => {
                const translated = tr(e);
                const sParam = e.severity >= 3 ? 'S2' : 'S1';
                const effectiveP = e.residualP ?? e.probability;
                const fParam = effectiveP >= 3 ? 'F2' : 'F1';
                const pParam = e.plrP || 'P2';
                const plrMap: Record<string, string> = {
                  'S1-F1-P1': 'a', 'S1-F1-P2': 'b', 'S1-F2-P1': 'b', 'S1-F2-P2': 'c',
                  'S2-F1-P1': 'c', 'S2-F1-P2': 'd', 'S2-F2-P1': 'd', 'S2-F2-P2': 'e',
                };
                const plrAuto = e.plrAuto || plrMap[`${sParam}-${fParam}-${pParam}`] || 'b';
                const plrColor = (pl: string) => pl === 'e' ? '#DC2626' : pl === 'd' ? '#D97706' : pl === 'c' ? '#D97706' : '#16A34A';
                const catSug: Record<string, string> = { 'a': 'B/1', 'b': '1/2', 'c': '2/3', 'd': '3', 'e': '4' };
                return (
                  <View key={i} style={[S.tableRow, i % 2 === 1 ? S.tableRowAlt : {}]}>
                    <Text style={[S.tableCell, { flex: 3 }]}>{translated.element}</Text>
                    <Text style={[S.tableCell, { width: 22, textAlign: 'center' }]}>{sParam}</Text>
                    <Text style={[S.tableCell, { width: 22, textAlign: 'center' }]}>{fParam}{e.residualP != null ? '*' : ''}</Text>
                    <Text style={[S.tableCell, { width: 22, textAlign: 'center' }]}>{pParam}</Text>
                    <Text style={[S.tableCell, { width: 40, textAlign: 'center', color: plrColor(plrAuto), fontWeight: 'bold' }]}>PL {plrAuto.toUpperCase()}</Text>
                    <Text style={[S.tableCell, { width: 40, textAlign: 'center', color: e.plrManual ? '#1D4ED8' : '#9CA3AF' }]}>{e.plrManual ? `PL ${e.plrManual.toUpperCase()}` : '—'}</Text>
                    <Text style={[S.tableCell, { width: 40, textAlign: 'center', color: e.plAchieved ? '#16A34A' : '#9CA3AF' }]}>{e.plAchieved ? `PL ${e.plAchieved.toUpperCase()}` : '—'}</Text>
                    <Text style={[S.tableCell, { width: 35, textAlign: 'center' }]}>{e.plCategory || catSug[plrAuto]}</Text>
                  </View>
                );
              })}
            </View>
            {/* Uzasadnienia wyboru P */}
            {entries.some(e => e.plrJustification) && (
              <View style={{ marginTop: 4, marginBottom: 2 }}>
                {entries.filter(e => e.plrJustification).map((e, i) => (
                  <View key={i} style={{ flexDirection: 'row', marginBottom: 2 }}>
                    <Text style={{ fontFamily: 'NotoSans', fontSize: 6, color: '#6B7280', width: 120 }}>{tr(e).element}:</Text>
                    <Text style={{ fontFamily: 'NotoSans', fontSize: 6, color: '#374151', flex: 1 }}>{e.plrP || 'P2'} — {e.plrJustification}</Text>
                  </View>
                ))}
              </View>
            )}
            <Text style={{ fontFamily: 'NotoSans', fontSize: 6.5, color: '#9CA3AF', marginTop: 3, lineHeight: 1.5 }}>
              PLr obliczony z Tab.K.1 ISO 13849-1:2023. Parametr F oznaczony * pochodzi z ryzyka resztkowego po środkach ochronnych. Ostateczna weryfikacja parametrów (MTTFd, DC, kategoria) należy do producenta lub certyfikowanego specjalisty ds. bezpieczeństwa funkcjonalnego.
            </Text>
          </View>
        )}

        {/* Hierarchia środków ochronnych */}
        {entries.some(e => e.actionLevel) && (
          <View style={{ marginTop: 14, marginBottom: 8 }}>
            <Text style={S.sectionTitle}>HIERARCHIA ŚRODKÓW OCHRONNYCH (ISO 12100 §6.2)</Text>
            {[
              { key: 'design',         icon: '1.', label: 'Eliminacja / Projekt bezpieczny',       color: '#16A34A' },
              { key: 'technical',      icon: '2.', label: 'Techniczne środki ochronne',             color: '#D97706' },
              { key: 'organisational', icon: '3.', label: 'Organizacyjne / Informacja i szkolenia', color: '#6B7280' },
            ].map(lv => {
              const lvEntries = entries.filter(e => e.actionLevel === lv.key)
              if (lvEntries.length === 0) return null
              return (
                <View key={lv.key} style={{ marginBottom: 6 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
                    <Text style={{ fontFamily: 'NotoSans', fontSize: 8, fontWeight: 'bold', color: lv.color, width: 16 }}>{lv.icon}</Text>
                    <Text style={{ fontFamily: 'NotoSans', fontSize: 8, fontWeight: 'bold', color: lv.color }}>{lv.label}</Text>
                    <Text style={{ fontFamily: 'NotoSans', fontSize: 7, color: '#9CA3AF', marginLeft: 6 }}>({lvEntries.length})</Text>
                  </View>
                  {lvEntries.map((e, i) => {
                    const translated = tr(e)
                    return (
                      <View key={i} style={{ flexDirection: 'row', paddingLeft: 16, paddingTop: 2, paddingBottom: 2, borderLeftWidth: 2, borderLeftColor: lv.color + '44', marginLeft: 6, marginBottom: 2 }}>
                        <Text style={{ fontFamily: 'NotoSans', fontSize: 7.5, fontWeight: 'bold', color: '#374151', width: 100 }}>{translated.element}</Text>
                        <Text style={{ fontFamily: 'NotoSans', fontSize: 7.5, color: '#6B7280', flex: 1 }}>{translated.action || e.action || '—'}</Text>
                        {e.actionNorm ? (
                          <Text style={{ fontFamily: 'NotoSans', fontSize: 6.5, color: '#3B82F6', width: 90, textAlign: 'right' }}>{e.actionNorm}</Text>
                        ) : null}
                      </View>
                    )
                  })}
                </View>
              )
            })}
          </View>
        )}

        <View style={S.lifecycleTable}>
          <Text style={S.sectionTitle}>{t.lifecycleTitle || 'ETAPY CYKLU ŻYCIA MASZYNY (ISO 12100 §5.4)'}</Text>
          <View style={S.lifecycleRowHeader}>
            <Text style={[S.lifecycleHeaderText, S.lifecycleColNo]}>#</Text>
            <Text style={[S.lifecycleHeaderText, S.lifecycleColStage]}>{t.lifecycleStage || 'Etap'}</Text>
            <Text style={[S.lifecycleHeaderText, S.lifecycleColDesc]}>{t.lifecycleDesc || 'Typowe zagrożenia do rozważenia'}</Text>
            <Text style={[S.lifecycleHeaderText, { width: 80, fontSize: 7, color: '#FFFFFF', fontWeight: 'bold' }]}>Zagrożenia</Text>
          </View>
          {[
            { key: 'lc1', stage: t.lc1 || 'Transport i montaż', desc: t.lc1d || 'Podnoszenie, przemieszczanie, poziomowanie, podłączenie mediów' },
            { key: 'lc2', stage: t.lc2 || 'Instalacja i uruchomienie', desc: t.lc2d || 'Pierwsze uruchomienie, konfiguracja, testy bezpieczeństwa' },
            { key: 'lc3', stage: t.lc3 || 'Regulacja i nastawianie', desc: t.lc3d || 'Nastawianie parametrów, zmiana narzędzi, zmiana formatu' },
            { key: 'lc4', stage: t.lc4 || 'Normalna praca', desc: t.lc4d || 'Obsługa, załadowanie / rozładowanie, nadzorowanie procesu' },
            { key: 'lc5', stage: t.lc5 || 'Czyszczenie i dezynfekcja', desc: t.lc5d || 'Czyszczenie części stykających się z produktem, mycie ciśnieniowe' },
            { key: 'lc6', stage: t.lc6 || 'Usuwanie usterek i awarie', desc: t.lc6d || 'Diagnostyka, usuwanie zacięć, działania przy braku zasilania' },
            { key: 'lc7', stage: t.lc7 || 'Konserwacja i serwis', desc: t.lc7d || 'Wymiana części zużywalnych, smarowanie, przeglądy okresowe' },
            { key: 'lc8', stage: t.lc8 || 'Demontaż i złomowanie', desc: t.lc8d || 'Rozłączenie mediów, demontaż, transport złomu, utylizacja płynów' },
          ].map((row, i) => {
            const lcEntries = entries.filter(e => {
              const stages = typeof e.lifecycleStages === 'string'
                ? (() => { try { return JSON.parse(e.lifecycleStages as string) } catch { return [] } })()
                : (e.lifecycleStages || [])
              return stages.includes(row.key)
            })
            const hasEntries = lcEntries.length > 0
            return (
              <View key={i} style={i % 2 === 0 ? S.lifecycleRow : [S.lifecycleRow, S.lifecycleRowAlt]}>
                <Text style={S.lifecycleColNo}>{i + 1}</Text>
                <Text style={S.lifecycleColStage}>{row.stage}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={S.lifecycleColDesc}>{row.desc}</Text>
                  {hasEntries && (
                    <Text style={{ fontFamily: 'NotoSans', fontSize: 6, color: '#9CA3AF', marginTop: 2 }}>
                      {lcEntries.map(e => tr(e).element).join(' · ')}
                    </Text>
                  )}
                </View>
                <View style={{ width: 80, paddingTop: 6, paddingLeft: 4 }}>
                  {hasEntries ? (
                    <View style={{ backgroundColor: '#DCFCE7', borderRadius: 2, paddingLeft: 4, paddingRight: 4, paddingTop: 2, paddingBottom: 2, alignSelf: 'flex-start' }}>
                      <Text style={{ fontFamily: 'NotoSans', fontSize: 7, color: '#16A34A', fontWeight: 'bold' }}>✓ {lcEntries.length}</Text>
                    </View>
                  ) : (
                    <Text style={{ fontFamily: 'NotoSans', fontSize: 7, color: '#D1D5DB' }}>—</Text>
                  )}
                </View>
              </View>
            )
          })}
        </View>

        <View style={{ marginTop: 14 }}>
          <Text style={S.sectionTitle}>{t.conclusions}</Text>
          {high.length > 0 && (
            <View style={[S.concBox, { backgroundColor: '#FEF2F2', borderTopWidth: 1, borderBottomWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderTopColor: '#FECACA', borderBottomColor: '#FECACA', borderLeftColor: '#FECACA', borderRightColor: '#FECACA' }]}>
              <Text style={[S.concTitle, { color: '#DC2626' }]}>{t.highConclusion.replace('{{n}}', String(high.length))}</Text>
              <Text style={[S.concText, { color: '#7F1D1D' }]}>{t.highConclusionText} {high.map(e => tr(e).element).join(', ')}.</Text>
            </View>
          )}
          {med.length > 0 && (
            <View style={[S.concBox, { backgroundColor: '#FFFBEB', borderTopWidth: 1, borderBottomWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderTopColor: '#FDE68A', borderBottomColor: '#FDE68A', borderLeftColor: '#FDE68A', borderRightColor: '#FDE68A' }]}>
              <Text style={[S.concTitle, { color: '#D97706' }]}>{t.medConclusion.replace('{{n}}', String(med.length))}</Text>
              <Text style={[S.concText, { color: '#78350F' }]}>{t.medConclusionText}</Text>
            </View>
          )}
          {low.length > 0 && (
            <View style={[S.concBox, { backgroundColor: '#F0FDF4', borderTopWidth: 1, borderBottomWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderTopColor: '#BBF7D0', borderBottomColor: '#BBF7D0', borderLeftColor: '#BBF7D0', borderRightColor: '#BBF7D0' }]}>
              <Text style={[S.concTitle, { color: '#16A34A' }]}>{t.lowConclusion.replace('{{n}}', String(low.length))}</Text>
              <Text style={[S.concText, { color: '#14532D' }]}>{t.lowConclusionText}</Text>
            </View>
          )}
          <View style={S.methodBox}>
            <Text style={S.methodTitle}>{t.method}</Text>
            {[t.method1, t.method2, t.method3].map((step, i) => (
              <View key={i} style={S.methodStep}>
                <Text style={S.methodNum}>{i + 1}.</Text>
                <Text style={S.methodText}>{step}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Sekcja odpowiedzialności */}
        {(analysis.preparedBy || analysis.approvedBy) && (
          <View style={{ marginTop: 14, marginBottom: 8 }}>
            <Text style={S.sectionTitle}>ODPOWIEDZIALNOŚĆ ZA OCENĘ RYZYKA</Text>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              {/* Opracował */}
              <View style={{ flex: 1, backgroundColor: '#F0FDF4', borderRadius: 4, padding: 10, borderTopWidth: 1, borderBottomWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderTopColor: '#BBF7D0', borderBottomColor: '#BBF7D0', borderLeftColor: '#BBF7D0', borderRightColor: '#BBF7D0' }}>
                <Text style={{ fontFamily: 'NotoSans', fontSize: 7, fontWeight: 'bold', color: '#16A34A', marginBottom: 6, }}>✏ Opracował</Text>
                <Text style={{ fontFamily: 'NotoSans', fontSize: 9, fontWeight: 'bold', color: '#1F2937', marginBottom: 2 }}>{analysis.preparedBy || '—'}</Text>
                {analysis.preparedRole ? <Text style={{ fontFamily: 'NotoSans', fontSize: 7.5, color: '#6B7280' }}>{analysis.preparedRole}</Text> : null}
                <View style={{ marginTop: 16, borderTopWidth: 1, borderTopColor: '#BBF7D0', paddingTop: 4 }}>
                  <Text style={{ fontFamily: 'NotoSans', fontSize: 6.5, color: '#9CA3AF' }}>Podpis: ___________________________</Text>
                </View>
              </View>
              {/* Zatwierdził */}
              <View style={{ flex: 1, backgroundColor: '#FFFBEB', borderRadius: 4, padding: 10, borderTopWidth: 1, borderBottomWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderTopColor: '#FDE68A', borderBottomColor: '#FDE68A', borderLeftColor: '#FDE68A', borderRightColor: '#FDE68A' }}>
                <Text style={{ fontFamily: 'NotoSans', fontSize: 7, fontWeight: 'bold', color: '#D97706', marginBottom: 6, }}>✓ Zatwierdził</Text>
                <Text style={{ fontFamily: 'NotoSans', fontSize: 9, fontWeight: 'bold', color: '#1F2937', marginBottom: 2 }}>{analysis.approvedBy || '—'}</Text>
                {analysis.approvedRole ? <Text style={{ fontFamily: 'NotoSans', fontSize: 7.5, color: '#6B7280' }}>{analysis.approvedRole}</Text> : null}
                {analysis.approvedDate ? <Text style={{ fontFamily: 'NotoSans', fontSize: 7.5, color: '#6B7280', marginTop: 2 }}>Data: {new Date(analysis.approvedDate).toLocaleDateString(locale)}</Text> : null}
                <View style={{ marginTop: 8, borderTopWidth: 1, borderTopColor: '#FDE68A', paddingTop: 4 }}>
                  <Text style={{ fontFamily: 'NotoSans', fontSize: 6.5, color: '#9CA3AF' }}>Podpis: ___________________________</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Wymagane załączniki do dokumentacji technicznej CE */}
        <View style={{ marginTop: 14, marginBottom: 10 }}>
          <Text style={S.sectionTitle}>WYMAGANE ZAŁĄCZNIKI DO DOKUMENTACJI TECHNICZNEJ CE</Text>
          <View style={{ backgroundColor: '#FFFBEB', borderRadius: 4, padding: 8, marginBottom: 6, borderTopWidth: 1, borderBottomWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderTopColor: '#FDE68A', borderBottomColor: '#FDE68A', borderLeftColor: '#FDE68A', borderRightColor: '#FDE68A' }}>
            <Text style={{ fontFamily: 'NotoSans', fontSize: 7, color: '#78350F', lineHeight: 1.5 }}>
              Zgodnie z Dyrektywą Maszynową 2006/42/WE Załącznik VII — niniejsza ocena ryzyka stanowi element dokumentacji technicznej i powinna być uzupełniona o poniższe dokumenty przed wystawieniem Deklaracji Zgodności CE. Ich brak nie unieważnia oceny ryzyka, lecz ogranicza kompletność dokumentacji technicznej.
            </Text>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
            {[
              { icon: '🔊', label: 'Protokół pomiaru hałasu', norm: 'EN ISO 9614, PN-EN 3746' },
              { icon: '📳', label: 'Protokół pomiaru drgań', norm: 'EN ISO 5349, EN ISO 8041' },
              { icon: '⚡', label: 'Certyfikaty komponentów bezpieczeństwa', norm: 'kurtyny, skanery, blokady (PLr d/e)' },
              { icon: '🛡️', label: 'Deklaracje zgodności środków ochronnych', norm: 'Dyrektywa 2006/42/WE' },
              { icon: '🔌', label: 'Raport z badań EMC / elektrycznych', norm: 'EN 60204-1, Dyrektywa 2014/30/UE' },
              { icon: '🧪', label: 'Badania substancji niebezpiecznych', norm: 'REACH, CLP — jeśli dotyczy' },
              { icon: '📐', label: 'Rysunki stref niebezpiecznych', norm: 'EN ISO 13857 — odległości bezpieczeństwa' },
              { icon: '📋', label: 'Protokoły testów funkcjonalnych', norm: 'weryfikacja PLr, E-STOP, blokady' },
              { icon: '🎓', label: 'Potwierdzenia szkoleń operatorów', norm: 'gdy środek ochronny = szkolenia / ŚOI' },
              { icon: '📄', label: 'Instrukcja obsługi maszyny', norm: 'wymagana — Dyrektywa 2006/42/WE Zał. I §1.7.4' },
            ].map((item, i) => (
              <View key={i} style={{ width: '48.5%', flexDirection: 'row', gap: 5, backgroundColor: i % 2 === 0 ? '#F9FAFB' : '#FFFFFF', padding: 5, borderRadius: 3, borderTopWidth: 1, borderBottomWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderTopColor: '#E5E7EB', borderBottomColor: '#E5E7EB', borderLeftColor: '#E5E7EB', borderRightColor: '#E5E7EB', marginBottom: 2 }}>
                <View style={{ width: 14, height: 14, backgroundColor: '#F3F4F6', borderRadius: 2, alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  <Text style={{ fontFamily: 'NotoSans', fontSize: 8 }}>☐</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: 'NotoSans', fontSize: 7.5, fontWeight: 'bold', color: '#1F2937' }}>{item.label}</Text>
                  <Text style={{ fontFamily: 'NotoSans', fontSize: 6.5, color: '#6B7280', marginTop: 1 }}>{item.norm}</Text>
                </View>
              </View>
            ))}
          </View>
          <View style={{ marginTop: 6, backgroundColor: '#FEF3C7', borderRadius: 3, padding: 6, borderTopWidth: 1, borderBottomWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderTopColor: '#FCD34D', borderBottomColor: '#FCD34D', borderLeftColor: '#FCD34D', borderRightColor: '#FCD34D' }}>
            <Text style={{ fontFamily: 'NotoSans', fontSize: 7, color: '#92400E', lineHeight: 1.5 }}>
              ⚠ Niniejszy raport (ocena ryzyka) jest elementem dokumentacji technicznej CE — nie zastępuje kompletnej dokumentacji wymaganej przez Dyrektywę 2006/42/WE Załącznik VII. Deklaracja Zgodności CE może być wystawiona wyłącznie po skompletowaniu wszystkich wymaganych dokumentów i ich weryfikacji przez osobę kompetentną lub jednostkę notyfikowaną (dla maszyn z Załącznika IV).
            </Text>
          </View>
        </View>

        {/* ── SEKCJA: WALIDACJA SYSTEMOWA ── */}
        {(() => {
          const allEntries = (analysis.riskEntries || analysis.entries || [])
          if (allEntries.length === 0) return null
          const valResult = validateAnalysis(
            allEntries,
            {
              machineLimitsIntended: analysis.intendedUse,
              machineLimitsForeseeable: analysis.foreseenMisuse,
              machineLimitsSpatial: analysis.spaceLimits,
              machineLimitsTime: analysis.timeLimits,
              preparedBy: analysis.preparedBy,
              approvedBy: analysis.approvedBy,
            },
            analysis.machineTypeId || analysis.machineCategory
          )
          const summary = getValidationSummary(valResult)
          const credColor = summary.credibilityLabel === 'high' ? '#16A34A' : summary.credibilityLabel === 'medium' ? '#D97706' : '#DC2626'
          const credBg = summary.credibilityLabel === 'high' ? '#F0FDF4' : summary.credibilityLabel === 'medium' ? '#FFFBEB' : '#FEF2F2'
          const credLabel = summary.credibilityLabel === 'high' ? 'Wysoka' : summary.credibilityLabel === 'medium' ? 'Średnia' : 'Niska'
          const layerLabels: Record<string, string> = { logical: 'Logiczna', normative: 'Normatywna', behavioural: 'Behawioralna', process: 'Procesowa' }

          return (
            <View style={{ marginTop: 12, marginBottom: 8, borderTopWidth: 1, borderTopColor: '#E5E7EB', paddingTop: 10 }}>
              {/* Nagłówek */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <View style={{ width: 3, height: 14, backgroundColor: '#6366F1', marginRight: 6 }} />
                <Text style={{ fontFamily: 'NotoSans', fontSize: 9, fontWeight: 'bold', color: '#1F2937', }}>
                  Walidacja systemowa ISO 12100
                </Text>
              </View>

              {/* Wynik ogólny */}
              <View style={{ flexDirection: 'row', gap: 6, marginBottom: 8 }}>
                <View style={{ flex: 1, backgroundColor: credBg, borderRadius: 4, padding: 6, borderTopWidth: 1, borderBottomWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderTopColor: credColor + '44', borderBottomColor: credColor + '44', borderLeftColor: credColor + '44', borderRightColor: credColor + '44' }}>
                  <Text style={{ fontFamily: 'NotoSans', fontSize: 7, fontWeight: 'bold', color: credColor, marginBottom: 2 }}>
                    Wiarygodność analizy: {credLabel} ({summary.credibilityScore}/100)
                  </Text>
                  <Text style={{ fontFamily: 'NotoSans', fontSize: 6.5, color: '#6B7280' }}>
                    {summary.blockCount > 0 ? `${summary.blockCount} blokad • ` : ''}{summary.warnCount > 0 ? `${summary.warnCount} ostrzeżeń` : 'Brak ostrzeżeń'}
                  </Text>
                </View>

                {/* Macierz warstw */}
                <View style={{ flexDirection: 'row', gap: 4 }}>
                  {[
                    { label: 'Logiczna', ok: summary.logicalOk },
                    { label: 'Normatywna', ok: summary.normativeOk },
                    { label: 'Behawioralna', ok: summary.behaviouralOk },
                    { label: 'Procesowa', ok: summary.processOk },
                  ].map((layer) => (
                    <View key={layer.label} style={{ alignItems: 'center', justifyContent: 'center', width: 48, backgroundColor: layer.ok ? '#F0FDF4' : '#FEF2F2', borderRadius: 3, padding: 4, borderTopWidth: 1, borderBottomWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderTopColor: layer.ok ? '#BBF7D0' : '#FECACA', borderBottomColor: layer.ok ? '#BBF7D0' : '#FECACA', borderLeftColor: layer.ok ? '#BBF7D0' : '#FECACA', borderRightColor: layer.ok ? '#BBF7D0' : '#FECACA' }}>
                      <Text style={{ fontFamily: 'NotoSans', fontSize: 8, color: layer.ok ? '#16A34A' : '#DC2626' }}>{layer.ok ? '✓' : '⚠'}</Text>
                      <Text style={{ fontFamily: 'NotoSans', fontSize: 5.5, color: '#6B7280', textAlign: 'center', marginTop: 1 }}>{layer.label}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Lista problemów */}
              {summary.issues.length > 0 && (
                <View>
                  {summary.issues.slice(0, 8).map((issue, idx) => (
                    <View key={issue.id} style={{ flexDirection: 'row', gap: 4, marginBottom: 3, paddingLeft: 4 }}>
                      <Text style={{ fontFamily: 'NotoSans', fontSize: 6.5, color: issue.type === 'block' ? '#DC2626' : '#D97706', width: 8 }}>
                        {issue.type === 'block' ? '✕' : '!'}
                      </Text>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontFamily: 'NotoSans', fontSize: 6.5, color: '#374151', lineHeight: 1.4 }}>
                          [{layerLabels[issue.layer]}] {issue.message}
                        </Text>
                      </View>
                    </View>
                  ))}
                  {summary.issues.length > 8 && (
                    <Text style={{ fontFamily: 'NotoSans', fontSize: 6, color: '#9CA3AF', marginTop: 2 }}>
                      + {summary.issues.length - 8} kolejnych uwag — pełna lista dostępna w aplikacji.
                    </Text>
                  )}
                </View>
              )}

              {summary.issues.length === 0 && (
                <Text style={{ fontFamily: 'NotoSans', fontSize: 7, color: '#16A34A' }}>
                  ✓ Analiza przeszła wszystkie warstwy walidacji systemowej bez uwag.
                </Text>
              )}

              <Text style={{ fontFamily: 'NotoSans', fontSize: 6, color: '#9CA3AF', marginTop: 6, lineHeight: 1.4 }}>
                Walidacja systemowa nie zastępuje weryfikacji przez osobę kompetentną. Jest wskaźnikiem pomocniczym wygenerowanym automatycznie przez RiskAnalytix.
              </Text>
            </View>
          )
        })()}

        <View style={S.disclaimer}>
          <Text style={S.disclaimerText}>{t.disclaimer}</Text>
        </View>

        <View style={S.footer} fixed>
          <Text style={S.footerText}>{pdfFooter}</Text>
          <Text style={S.footerText} render={({ pageNumber, totalPages }) => `${t.page} ${pageNumber} ${t.of} ${totalPages}`} />
        </View>
      </Page>
    </Document>
  )
}