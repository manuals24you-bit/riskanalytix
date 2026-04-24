import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '../../store/auth.store'
import { hasAnyPlan, isPro } from '../../utils/subscriptionHelper'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../services/api'
import { getRiskLevel } from '../../utils/risk'
import type { RiskAnalysis } from '../../types'
import PDFDownloadButton from './PDFDownloadButton'
import DocxDownloadButton from './DocxDownloadButton'
import AuditLogPanel from './AuditLogPanel'
import CEDeclarationButton from './CEDeclarationButton'
import { translateRiskEntry, type Lang } from '../../i18n/machinesI18n'
import { translateAction } from '../../i18n/actionsI18n'

export default function AnalysisDetailPage() {
  const { t, i18n } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const queryClient = useQueryClient()

  const [approval, setApproval] = useState({
    preparedBy: '', preparedRole: '',
    approvedBy: '', approvedRole: '',
    approvedDate: new Date().toISOString().split('T')[0],
  })
  const [showApproval, setShowApproval] = useState(false)

  const { data: analysis, isLoading, error } = useQuery<RiskAnalysis>({
    queryKey: ['analysis', id],
    queryFn: async () => {
      const { data } = await api.get(`/analyses/${id}`)
      // Auto-wypełnij dane z zapisanej analizy (tylko gdy pola są puste)
      setApproval(p => ({
        ...p,
        preparedBy: p.preparedBy || data.preparedBy || '',
        preparedRole: p.preparedRole || data.preparedRole || '',
        approvedBy: p.approvedBy || data.approvedBy || '',
        approvedRole: p.approvedRole || data.approvedRole || '',
      }))
      return data
    },
  })

  const { mutate: deleteAnalysis, isPending: isDeleting } = useMutation({
    mutationFn: async () => { await api.delete(`/analyses/${id}`) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analyses'] })
      navigate('/dashboard')
    },
  })

  const confirmDelete = () => {
    if (window.confirm(t('analysis.deleteConfirm'))) deleteAnalysis()
  }

  const riskColor = (cls: string) => cls === 'high' ? '#E84040' : cls === 'med' ? '#F59E0B' : cls === 'low' ? '#34C77B' : '#8a99b0'
  const riskBg   = (cls: string) => cls === 'high' ? 'rgba(232,64,64,.15)' : cls === 'med' ? 'rgba(245,158,11,.15)' : cls === 'low' ? 'rgba(52,199,123,.15)' : 'rgba(138,153,176,.1)'
  const riskLabel = (cls: string) => t(`risk.${cls === 'neg' ? 'neg' : cls === 'high' ? 'high' : cls === 'med' ? 'med' : 'low'}`)

  const locale = i18n.language === 'pl' ? 'pl-PL' : i18n.language === 'de' ? 'de-DE' :
    i18n.language === 'fr' ? 'fr-FR' : i18n.language === 'it' ? 'it-IT' :
    i18n.language === 'es' ? 'es-ES' : i18n.language === 'cs' ? 'cs-CZ' : 'en-GB'

  // ── i18n: tłumaczy element/threat/effect przez reverse lookup po polskim tekście ──
  const lang = (i18n.language as Lang) || 'pl'
  const getThreat = (entry: { element: string; threat: string; effect: string; action?: string }) => ({
    ...translateRiskEntry(entry, lang),
    action: translateAction(entry.action, lang),
  })

  if (isLoading) return (
    <div style={{ minHeight: '100vh', background: '#0B0F1A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8a99b0', fontFamily: 'Lato, sans-serif' }}>
      {t('analysis.loadingAnalysis')}
    </div>
  )

  if (error || !analysis) return (
    <div style={{ minHeight: '100vh', background: '#0B0F1A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Lato, sans-serif' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: '#E84040', fontSize: '18px', marginBottom: '16px' }}>{t('analysis.notFound')}</div>
        <button onClick={() => navigate('/dashboard')} style={{ padding: '10px 20px', borderRadius: '6px', border: 'none', background: '#E8A838', color: '#0B0F1A', cursor: 'pointer' }}>
          {t('analysis.backToDashboard')}
        </button>
      </div>
    </div>
  )

  const entries = analysis.riskEntries || analysis.entries || []
  const high = entries.filter(e => getRiskLevel(e.severity, e.probability).cls === 'high')
  const med  = entries.filter(e => getRiskLevel(e.severity, e.probability).cls === 'med')
  const low  = entries.filter(e => ['low','neg'].includes(getRiskLevel(e.severity, e.probability).cls))

  return (
    <div style={{ minHeight: '100vh', background: '#0B0F1A', fontFamily: 'Lato, sans-serif' }}>

      {/* Top bar */}
      <div style={{ background: '#111827', borderBottom: '1px solid #1e2d45', padding: '13px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', color: '#8a99b0', cursor: 'pointer', fontSize: '12px', fontFamily: 'monospace' }}>
            {t('analysis.back')}
          </button>
          <span style={{ color: '#1e2d45' }}>|</span>
          <span style={{ color: '#F0EDE8', fontFamily: 'Georgia, serif', fontSize: '16px' }}>{analysis.machineName}</span>
          {analysis.norm && (
            <span style={{ background: 'rgba(232,168,56,.15)', color: '#E8A838', border: '1px solid rgba(232,168,56,.3)', padding: '2px 10px', borderRadius: '4px', fontSize: '10px', fontFamily: 'monospace' }}>
              {analysis.norm}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {/* Druk: każda subskrypcja (BASIC i PRO) */}
          {hasAnyPlan(user) && (
            <button onClick={() => window.print()} style={{ padding: '7px 16px', borderRadius: '6px', border: '1px solid #1e2d45', background: 'transparent', color: '#8a99b0', cursor: 'pointer', fontSize: '11px' }}>
              🖨 {t('analysis.printBtn')}
            </button>
          )}
          {/* PDF: każda subskrypcja (BASIC i PRO) */}
          {hasAnyPlan(user) && (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowApproval(p => !p)}
                style={{ padding: '7px 16px', borderRadius: '6px', border: 'none', background: '#E8A838', color: '#0B0F1A', cursor: 'pointer', fontSize: '11px', fontWeight: 700 }}
              >
                ⬇ PDF {showApproval ? '▲' : '▼'}
              </button>
              {showApproval && (
                <div style={{ position: 'absolute', right: 0, top: '36px', zIndex: 100, background: '#111827', border: '1px solid #1e2d45', borderRadius: '10px', padding: '16px', width: '320px', boxShadow: '0 8px 32px rgba(0,0,0,.5)' }}>
                  {(approval.preparedBy || approval.approvedBy) ? (
                    <div style={{ marginBottom: '12px', padding: '10px 12px', background: 'rgba(52,199,123,.07)', border: '1px solid rgba(52,199,123,.25)', borderRadius: '6px' }}>
                      <div style={{ fontSize: '10px', color: '#34C77B', fontWeight: 700, marginBottom: '6px' }}>✓ Dane z analizy</div>
                      {approval.preparedBy && <div style={{ fontSize: '11px', color: '#C0C8D8' }}>✏️ {approval.preparedBy}{approval.preparedRole ? ` — ${approval.preparedRole}` : ''}</div>}
                      {approval.approvedBy && <div style={{ fontSize: '11px', color: '#C0C8D8', marginTop: '3px' }}>✅ {approval.approvedBy}{approval.approvedRole ? ` — ${approval.approvedRole}` : ''}</div>}
                      <a href={`/analysis/${id}/edit`} style={{ display: 'inline-block', marginTop: '8px', fontSize: '10px', color: '#4a5a72', textDecoration: 'none' }}>✏️ Edytuj w kroku 4 →</a>
                    </div>
                  ) : (
                    <div style={{ marginBottom: '12px', padding: '10px 12px', background: 'rgba(232,64,64,.07)', border: '1px solid rgba(232,64,64,.25)', borderRadius: '6px' }}>
                      <div style={{ fontSize: '11px', color: '#E84040', marginBottom: '4px' }}>⚠ Brak danych autora</div>
                      <div style={{ fontSize: '10px', color: '#8a99b0' }}>Wpisz dane w kroku 4 analizy — pojawią się tutaj automatycznie.</div>
                      <a href={`/analysis/${id}/edit`} style={{ display: 'inline-block', marginTop: '6px', fontSize: '10px', color: '#60A5FA', textDecoration: 'none' }}>✏️ Otwórz krok 4 →</a>
                    </div>
                  )}
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '9px', color: '#6B7280', marginBottom: '3px' }}>Data zatwierdzenia</div>
                    <input type="date" value={approval.approvedDate}
                      onChange={ev => setApproval(p => ({ ...p, approvedDate: ev.target.value }))}
                      style={{ width: '100%', background: '#0B0F1A', border: '1px solid #1e2d45', borderRadius: '4px', color: '#F0EDE8', padding: '5px 8px', fontSize: '11px', boxSizing: 'border-box' }}
                    />
                  </div>
                  <PDFDownloadButton analysis={analysis} approval={approval} />
                  {/* DOCX: tylko PRO */}
                  {isPro(user) && (
                    <DocxDownloadButton analysis={analysis} approval={approval} />
                  )}
                </div>
              )}
            </div>
          )}
          <CEDeclarationButton analysis={analysis} />
          <button onClick={confirmDelete} disabled={isDeleting} style={{ padding: '7px 16px', borderRadius: '6px', border: '1px solid rgba(232,64,64,.3)', background: 'transparent', color: '#E84040', cursor: 'pointer', fontSize: '11px' }}>
            🗑 {t('analysis.deleteBtn')}
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Machine + Analysis/Client info */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          <div style={{ background: '#111827', border: '1px solid #1e2d45', borderRadius: '10px', padding: '20px' }}>
            <div style={{ fontSize: '10px', color: '#E8A838', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '14px' }}>{t('analysis.machineDataBox')}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { label: t('analysis.fieldMachine'),      value: analysis.machineName },
                { label: t('analysis.fieldCategory'),     value: analysis.machineCategory },
                { label: t('analysis.fieldManufacturer'), value: analysis.manufacturer },
                { label: t('analysis.fieldSerialNo'),     value: analysis.serialNo },
                { label: t('analysis.fieldYear'),         value: analysis.productionYear?.toString() },
                { label: t('analysis.fieldPurpose'),      value: analysis.purpose },
                { label: t('analysis.fieldNorm'),         value: analysis.norm },
              ].filter(f => f.value).map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ fontSize: '11px', color: '#8a99b0', minWidth: '90px', flexShrink: 0 }}>{f.label}:</span>
                  <span style={{ fontSize: '12px', color: '#F0EDE8' }}>{f.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#111827', border: '1px solid #1e2d45', borderRadius: '10px', padding: '20px' }}>
            <div style={{ fontSize: '10px', color: '#E8A838', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '14px' }}>{t('analysis.analysisClientBox')}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { label: t('analysis.fieldDate'),     value: analysis.analysisDate ? new Date(analysis.analysisDate).toLocaleDateString(locale) : undefined },
                { label: t('analysis.fieldAnalyst'),  value: analysis.analystName },
                { label: t('analysis.fieldClient'),   value: analysis.clientName },
                { label: t('analysis.fieldCompany'),  value: analysis.clientCompany },
                { label: t('analysis.fieldNip'),      value: analysis.clientNip },
                { label: t('analysis.fieldAddress'),  value: analysis.clientAddress },
                { label: t('analysis.fieldNotes'),    value: analysis.notes },
              ].filter(f => f.value).map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ fontSize: '11px', color: '#8a99b0', minWidth: '90px', flexShrink: 0 }}>{f.label}:</span>
                  <span style={{ fontSize: '12px', color: '#F0EDE8' }}>{f.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px', marginBottom: '24px' }}>
          {[
            { label: t('analysis.statsTotal'), value: entries.length, color: '#F0EDE8' },
            { label: t('analysis.statsHigh'),  value: high.length,    color: '#E84040' },
            { label: t('analysis.statsMed'),   value: med.length,     color: '#F59E0B' },
            { label: t('analysis.statsLow'),   value: low.length,     color: '#34C77B' },
          ].map((s, i) => (
            <div key={i} style={{ background: '#111827', border: `1px solid ${s.color === '#E84040' && s.value > 0 ? 'rgba(232,64,64,.3)' : '#1e2d45'}`, borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: '32px', color: s.color }}>{s.value}</div>
              <div style={{ fontSize: '10px', color: '#8a99b0', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Risk matrix */}
        <div style={{ background: '#111827', border: '1px solid #1e2d45', borderRadius: '10px', padding: '20px', marginBottom: '24px' }}>
          <div style={{ fontSize: '10px', color: '#8a99b0', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '16px' }}>
            {t('analysis.matrixTitle')}
          </div>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '60px repeat(4,52px)', gap: '3px' }}>
              <div style={{ fontSize: '9px', color: '#4a5a72', display: 'flex', alignItems: 'flex-end', paddingBottom: '4px' }}>{t('analysis.matrixAxisLabel')}</div>
              {['S=1','S=2','S=3','S=4'].map(l => (
                <div key={l} style={{ textAlign: 'center', fontSize: '10px', color: '#8a99b0', fontFamily: 'monospace', padding: '4px 0' }}>{l}</div>
              ))}
              {[4,3,2,1].map(pi => ([
                <div key={'l'+pi} style={{ fontSize: '10px', color: '#8a99b0', fontFamily: 'monospace', display: 'flex', alignItems: 'center', paddingRight: '8px' }}>P={pi}</div>,
                ...[1,2,3,4].map(si => {
                  const r = si*pi; const cls = r>=12?'high':r>=6?'med':r>=3?'low':'neg'
                  const cnt = entries.filter(e => e.severity===si && e.probability===pi).length
                  return (
                    <div key={si} style={{ background: riskBg(cls), borderRadius: '4px', height: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px', border: cnt>0?`1px solid ${riskColor(cls)}`:'1px solid transparent' }}>
                      <span style={{ fontFamily: 'monospace', fontSize: '12px', fontWeight: 700, color: riskColor(cls) }}>{r}</span>
                      {cnt>0 && <span style={{ background: 'rgba(0,0,0,.5)', borderRadius: '8px', padding: '0 5px', fontSize: '9px', color: '#F0EDE8' }}>×{cnt}</span>}
                    </div>
                  )
                })
              ]))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '28px' }}>
              {([
                { cls: 'high', label: t('analysis.legendHigh'), desc: t('analysis.legendHighDesc') },
                { cls: 'med',  label: t('analysis.legendMed'),  desc: t('analysis.legendMedDesc') },
                { cls: 'low',  label: t('analysis.legendLow'),  desc: t('analysis.legendLowDesc') },
                { cls: 'neg',  label: t('analysis.legendNeg'),  desc: t('analysis.legendNegDesc') },
              ] as const).map(l => (
                <div key={l.cls} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: riskBg(l.cls), border: `1px solid ${riskColor(l.cls)}`, flexShrink: 0 }} />
                  <div>
                    <span style={{ fontSize: '10px', fontFamily: 'monospace', color: riskColor(l.cls), fontWeight: 700 }}>{l.label}</span>
                    <span style={{ fontSize: '10px', color: '#4a5a72', marginLeft: '6px' }}>{l.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Machine Boundaries */}
        {(analysis.intendedUse || analysis.foreseenMisuse || analysis.spaceLimits || analysis.timeLimits || analysis.envLimits) && (
          <div style={{ background: '#111827', border: '1px solid #1e2d45', borderRadius: '10px', padding: '20px', marginBottom: '24px' }}>
            <div style={{ fontSize: '10px', color: '#E8A838', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '16px', fontWeight: 600 }}>
              5.3 Granice maszyny i przewidywane użycie (ISO 12100 §5.3)
            </div>
            {[
              { label: 'Przewidywane użycie', value: analysis.intendedUse },
              { label: 'Rozsądnie przewidywalne nadużycie', value: analysis.foreseenMisuse },
              { label: 'Granice przestrzenne', value: analysis.spaceLimits },
              { label: 'Granice czasowe / fazy cyklu życia', value: analysis.timeLimits },
              { label: 'Ograniczenia środowiskowe', value: analysis.envLimits },
            ].filter(r => r.value).map(({ label, value }) => (
              <div key={label} style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '10px', color: '#8a99b0', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '4px' }}>{label}</div>
                <div style={{ fontSize: '12px', color: '#F0EDE8', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{value}</div>
              </div>
            ))}
          </div>
        )}


        {/* Threats table */}
        {entries.length > 0 && (
          <div style={{ background: '#111827', border: '1px solid #1e2d45', borderRadius: '10px', overflow: 'hidden', marginBottom: '24px' }}>
            <div style={{ padding: '12px 18px', borderBottom: '1px solid #1e2d45', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', color: '#8a99b0', textTransform: 'uppercase', letterSpacing: '.08em' }}>
                {t('pdf.threatTable')} ({entries.length})
              </span>
              <span style={{ fontSize: '10px', color: '#4a5a72' }}>{t('analysis.tableHint')}</span>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {[t('analysis.tableNo'), t('analysis.colElement'), t('analysis.colThreat'), t('analysis.colEffect'), 'S', 'P', 'R', t('analysis.tableLevelRisk'), t('analysis.tableProtective')].map((h, i) => (
                    <th key={i} style={{ textAlign: 'left', fontSize: '9px', color: '#8a99b0', padding: '8px 10px', borderBottom: '1px solid #1e2d45', textTransform: 'uppercase', letterSpacing: '.06em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {entries
                  .slice()
                  .sort((a, b) => (b.severity*b.probability) - (a.severity*a.probability))
                  .map((e, idx) => {
                    const risk = getRiskLevel(e.severity, e.probability)
                    const tr = getThreat(e)
                    return (
                      <tr key={e.id} style={{ borderBottom: '1px solid rgba(30,45,69,.4)', background: idx%2===0?'transparent':'rgba(255,255,255,.01)' }}>
                        <td style={{ padding: '10px', fontSize: '11px', color: '#4a5a72', fontFamily: 'monospace' }}>{idx+1}</td>
                        <td style={{ padding: '10px', fontSize: '12px', fontWeight: 600, color: '#F0EDE8', maxWidth: '130px' }}>{tr.element}</td>
                        <td style={{ padding: '10px', fontSize: '11px', color: '#8a99b0', maxWidth: '140px' }}>{tr.threat}</td>
                        <td style={{ padding: '10px', fontSize: '11px', color: '#8a99b0', maxWidth: '120px' }}>{tr.effect}</td>
                        <td style={{ padding: '10px', fontFamily: 'monospace', fontSize: '13px', fontWeight: 700, textAlign: 'center', color: '#F0EDE8' }}>{e.severity}</td>
                        <td style={{ padding: '10px', fontFamily: 'monospace', fontSize: '13px', fontWeight: 700, textAlign: 'center', color: '#F0EDE8' }}>{e.probability}</td>
                        <td style={{ padding: '10px', fontFamily: 'monospace', fontSize: '14px', fontWeight: 700, textAlign: 'center', color: riskColor(risk.cls) }}>{risk.r}</td>
                        <td style={{ padding: '10px' }}>
                          <span style={{ background: riskBg(risk.cls), color: riskColor(risk.cls), border: `1px solid ${riskColor(risk.cls)}44`, padding: '3px 8px', borderRadius: '4px', fontSize: '10px', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                            {riskLabel(risk.cls)}
                          </span>
                        </td>
                        <td style={{ padding: '10px', fontSize: '11px', color: '#8a99b0', maxWidth: '180px' }}>{getThreat(e).action}</td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        )}

        {/* Residual Risk Table */}
        {entries.filter(e => e.reductionLevel && e.reductionLevel !== 'none').length > 0 && (
          <div style={{ background: '#111827', border: '1px solid rgba(232,168,56,.25)', borderRadius: '10px', overflow: 'hidden', marginBottom: '24px' }}>
            <div style={{ padding: '12px 18px', borderBottom: '1px solid #1e2d45', background: 'rgba(232,168,56,.06)' }}>
              <span style={{ fontSize: '10px', color: '#E8A838', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 600 }}>
                {t('analysis.residualRisk') || 'Ryzyko resztkowe po środkach ochronnych'}
              </span>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {[t('analysis.colElement'), t('analysis.colAction'), t('analysis.residualReduction') || 'Redukcja', 'S', "P'", "R'", t('analysis.tableLevelRisk')].map((h, i) => (
                    <th key={i} style={{ textAlign: 'left', fontSize: '9px', color: '#8a99b0', padding: '8px 10px', borderBottom: '1px solid #1e2d45', textTransform: 'uppercase', letterSpacing: '.06em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {entries
                  .filter(e => e.reductionLevel && e.reductionLevel !== 'none')
                  .sort((a, b) => (b.severity*b.probability) - (a.severity*a.probability))
                  .map((e, idx) => {
                    const resS = e.residualS ?? e.severity;
                    const resP = e.residualP ?? e.probability;
                    const resR = e.residualR ?? (resS * resP);
                    const resRisk = getRiskLevel(resS, resP);
                    const tr = getThreat(e);
                    const reductionLabel = e.reductionLevel === 'high' ? (t('analysis.reductionHigh') || 'Wysoki (P-2)') : e.reductionLevel === 'medium' ? (t('analysis.reductionMedium') || 'Średnio (P-1)') : (t('analysis.reductionLow') || 'Niski');
                    return (
                      <tr key={e.id} style={{ borderBottom: '1px solid rgba(30,45,69,.4)', background: idx%2===0?'transparent':'rgba(255,255,255,.01)' }}>
                        <td style={{ padding: '10px', fontSize: '12px', fontWeight: 600, color: '#F0EDE8', maxWidth: '130px' }}>{tr.element}</td>
                        <td style={{ padding: '10px', fontSize: '11px', color: '#8a99b0', maxWidth: '160px' }}>{tr.action}</td>
                        <td style={{ padding: '10px', fontSize: '10px', color: '#34C77B', whiteSpace: 'nowrap' }}>{reductionLabel}</td>
                        <td style={{ padding: '10px', fontFamily: 'monospace', fontSize: '13px', fontWeight: 700, textAlign: 'center', color: '#F0EDE8' }}>{resS}</td>
                        <td style={{ padding: '10px', fontFamily: 'monospace', fontSize: '13px', fontWeight: 700, textAlign: 'center', color: '#34C77B' }}>{resP}</td>
                        <td style={{ padding: '10px', fontFamily: 'monospace', fontSize: '14px', fontWeight: 700, textAlign: 'center', color: riskColor(resRisk.cls) }}>{resR}</td>
                        <td style={{ padding: '10px' }}>
                          <span style={{ background: riskBg(resRisk.cls), color: riskColor(resRisk.cls), border: `1px solid ${riskColor(resRisk.cls)}44`, padding: '3px 8px', borderRadius: '4px', fontSize: '10px', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                            {riskLabel(resRisk.cls)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
        {/* Conclusions */}
        <div style={{ background: '#111827', border: '1px solid #1e2d45', borderRadius: '10px', padding: '20px', marginBottom: '24px' }}>
          <div style={{ fontSize: '10px', color: '#8a99b0', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '14px' }}>
            {t('analysis.conclusionsTitle')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {high.length > 0 && (
              <div style={{ background: 'rgba(232,64,64,.08)', border: '1px solid rgba(232,64,64,.2)', borderRadius: '6px', padding: '12px 16px', fontSize: '13px', lineHeight: 1.6 }}>
                <strong style={{ color: '#E84040' }}>🔴 {t('analysis.criticalLabel')} ({high.length}):</strong>
                <span style={{ color: '#F0EDE8' }}> {t('analysis.criticalFull')} {high.map(e => getThreat(e).element).join(', ')}.</span>
              </div>
            )}
            {med.length > 0 && (
              <div style={{ background: 'rgba(245,158,11,.08)', border: '1px solid rgba(245,158,11,.2)', borderRadius: '6px', padding: '12px 16px', fontSize: '13px', lineHeight: 1.6 }}>
                <strong style={{ color: '#F59E0B' }}>🟡 {t('analysis.warningLabel')} ({med.length}):</strong>
                <span style={{ color: '#F0EDE8' }}> {t('analysis.warningFull')}</span>
              </div>
            )}
            {low.length > 0 && (
              <div style={{ background: 'rgba(52,199,123,.08)', border: '1px solid rgba(52,199,123,.2)', borderRadius: '6px', padding: '12px 16px', fontSize: '13px', lineHeight: 1.6 }}>
                <strong style={{ color: '#34C77B' }}>🟢 {t('analysis.acceptableLabel')} ({low.length}):</strong>
                <span style={{ color: '#F0EDE8' }}> {t('analysis.acceptableFull')}</span>
              </div>
            )}
            <div style={{ background: '#1a2235', borderRadius: '6px', padding: '14px 16px', fontSize: '12px', color: '#8a99b0', lineHeight: 1.8, marginTop: '4px' }}>
              <strong style={{ color: '#F0EDE8' }}>{t('analysis.method3full')}</strong><br />
              <strong style={{ color: '#E8A838' }}>1. {t('analysis.m1title')}</strong> {t('analysis.m1full')}<br />
              <strong style={{ color: '#E8A838' }}>2. {t('analysis.m2title')}</strong> {t('analysis.m2full')}<br />
              <strong style={{ color: '#E8A838' }}>3. {t('analysis.m3title')}</strong> {t('analysis.m3full')}
            </div>
            <div style={{ fontSize: '11px', color: '#4a5a72', padding: '8px 0', borderTop: '1px solid #1e2d45', marginTop: '4px' }}>
              {t('analysis.disclaimer')}
            </div>
          </div>
        </div>

        {/* Subscription gate */}
        {!hasAnyPlan(user) && (
          <div style={{ background: '#111827', border: '1px solid #E8A838', borderRadius: '12px', padding: '28px', textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>🔒</div>
            <h3 style={{ color: '#F0EDE8', fontFamily: 'Georgia, serif', fontSize: '20px', marginBottom: '8px' }}>
              Pobierz raport PDF i drukuj
            </h3>
            <p style={{ color: '#8a99b0', fontSize: '13px', maxWidth: '420px', margin: '0 auto 20px', lineHeight: 1.6 }}>
              Plan <strong style={{ color: '#E8A838' }}>BASIC</strong> daje dostęp do raportu PDF i wydruku.
              Plan <strong style={{ color: '#A78BFA' }}>PRO</strong> dodaje eksport DOCX i metodę S×F×P×A.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={() => window.open(`https://riskanalytix.lemonsqueezy.com/checkout/buy/4d96c855-af2f-4ce8-baa4-4e9e70936ce3${user?.email ? `?checkout%5Bemail%5D=${encodeURIComponent(user.email)}` : ''}`, '_blank')}
                style={{ padding: '12px 24px', borderRadius: '6px', border: 'none', background: '#E8A838', color: '#0B0F1A', cursor: 'pointer', fontSize: '13px', fontWeight: 700 }}
              >
                Basic — 29 EUR/mies.
              </button>
              <button
                onClick={() => window.open(`https://riskanalytix.lemonsqueezy.com/checkout/buy/b2ddabe9-0b73-40b7-8c25-d7106aab77f1${user?.email ? `?checkout%5Bemail%5D=${encodeURIComponent(user.email)}` : ''}`, '_blank')}
                style={{ padding: '12px 24px', borderRadius: '6px', border: 'none', background: '#A78BFA', color: '#0B0F1A', cursor: 'pointer', fontSize: '13px', fontWeight: 700 }}
              >
                Pro — 59 EUR/mies.
              </button>
            </div>
          </div>
        )}

        {/* Audit Log */}
        <AuditLogPanel analysisId={id!} />

        {/* Bottom nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px' }}>
          <button onClick={() => navigate(-1)} style={{ padding: '10px 22px', borderRadius: '6px', border: '1px solid #1e2d45', background: 'transparent', color: '#8a99b0', cursor: 'pointer', fontSize: '13px' }}>
            ← {t('analysis.back') || 'Wstecz'}
          </button>
          <button onClick={() => navigate(`/analysis/${id}/edit`)} style={{ padding: '10px 22px', borderRadius: '6px', border: 'none', background: '#E8A838', color: '#0B0F1A', cursor: 'pointer', fontSize: '13px', fontWeight: 700 }}>
            ✏️ Edytuj analizę
          </button>
        </div>

      </div>
    </div>
  )
}