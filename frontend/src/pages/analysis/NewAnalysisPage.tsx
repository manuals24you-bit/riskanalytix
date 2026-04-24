// @ts-nocheck
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '../../store/auth.store'
import { isPro, hasAnyPlan } from '../../utils/subscriptionHelper'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '../../services/api'
import { getRiskLevel } from '../../utils/risk'
import { MACHINE_CATEGORIES, getMachinesByCategory, getMachineById } from '../../data/machines'
import type { RiskEntry, ThreatTemplate } from '../../types'
import { translateRiskEntry, getMachineTranslation } from '../../i18n/machinesI18n'
import { SampleRiskReportButton, SampleCEButton } from './SamplePDFButtons'
import { validateAnalysis } from '../../utils/analysisValidation'
import ValidationPanel from '../../components/ValidationPanel'
import { InlineTip } from '../../components/TipButton'


interface AnalysisForm {
  machineName: string; machineCategory: string; machineTypeId: string
  serialNo: string; manufacturer: string; productionYear: string
  purpose: string; norm: string; analystName: string; analysisDate: string
  riskMethod: string
  intendedUse: string
  foreseenMisuse: string
  spaceLimits: string
  timeLimits: string
  envLimits: string
  notes: string; clientName: string; clientCompany: string; clientNip: string; clientAddress: string
}

const EMPTY_FORM: AnalysisForm = {
  machineName: '', machineCategory: '', machineTypeId: '', riskMethod: 'SxP',
  intendedUse: '', foreseenMisuse: '', spaceLimits: '', timeLimits: '', envLimits: '',
  serialNo: '', manufacturer: '', productionYear: '',
  purpose: '', norm: '', analystName: '', analysisDate: new Date().toISOString().split('T')[0],
  notes: '', clientName: '', clientCompany: '', clientNip: '', clientAddress: '',
}

const HelpLink = ({ section, title }: { section: string; title?: string }) => (
  <a
    href={`/instructions#${section}`}
    target="_blank"
    rel="noopener noreferrer"
    title={title || 'Otwórz instrukcję obsługi'}
    style={{
      display: 'inline-flex', alignItems: 'center', gap: '4px',
      color: '#4a5a72', fontSize: '11px', textDecoration: 'none',
      background: 'rgba(74,90,114,.15)', border: '1px solid rgba(74,90,114,.3)',
      borderRadius: '4px', padding: '2px 7px', marginLeft: '8px',
      transition: 'all .15s', verticalAlign: 'middle',
      cursor: 'pointer',
    }}
    onMouseOver={e => { (e.currentTarget as HTMLElement).style.color = '#E8A838'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(232,168,56,.4)'; (e.currentTarget as HTMLElement).style.background = 'rgba(232,168,56,.08)' }}
    onMouseOut={e => { (e.currentTarget as HTMLElement).style.color = '#4a5a72'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(74,90,114,.3)'; (e.currentTarget as HTMLElement).style.background = 'rgba(74,90,114,.15)' }}
  >
    📖 <span>Instrukcja</span>
  </a>
)


export default function NewAnalysisPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id: editId } = useParams<{ id: string }>()
  const isEditMode = !!editId

  // Load existing analysis for edit mode
  const { data: existingAnalysis } = useQuery({
    queryKey: ['analysis', editId],
    queryFn: async () => {
      if (!editId) return null
      const { data } = await api.get(`/analyses/${editId}`)
      return data
    },
    enabled: !!editId,
  })
  const { user } = useAuthStore()
  const queryClient = useQueryClient()

  const [step, setStep] = useState(1)
  const [form, setForm] = useState<AnalysisForm>(EMPTY_FORM)
  const [entries, setEntries] = useState<RiskEntry[]>([])
  const [newEntry, setNewEntry] = useState({ element: '', threat: '', effect: '', s: 0, p: 0, action: '', scenario: '' })
  const [openLifecycle, setOpenLifecycle] = useState<Record<string, boolean>>({})
  const [showReflectionModal, setShowReflectionModal] = useState(false)
  const [validationResult, setValidationResult] = useState<ReturnType<typeof validateAnalysis> | null>(null)
  const [showValidationDetail, setShowValidationDetail] = useState(false)
  const [isDraft, setIsDraft] = useState(false)
  const [draftSaved, setDraftSaved] = useState(false)

  const [approval, setApproval] = useState({
    preparedBy: '', preparedRole: '',
    approvedBy: '', approvedRole: '',
    approvedDate: new Date().toISOString().split('T')[0],
    confirmed: false,
  })

  // Load existing analysis data in edit mode
  useEffect(() => {
    if (existingAnalysis && isEditMode) {
      const { riskEntries, ...analysisData } = existingAnalysis
      // Załaduj dane autora/zatwierdzającego z bazy
      setApproval(p => ({
        ...p,
        preparedBy: analysisData.preparedBy || '',
        preparedRole: analysisData.preparedRole || '',
        approvedBy: analysisData.approvedBy || '',
        approvedRole: analysisData.approvedRole || '',
        approvedDate: analysisData.approvedDate
          ? String(analysisData.approvedDate).slice(0, 10)
          : p.approvedDate,
      }))
      setForm({
        machineName: analysisData.machineName || '',
        machineCategory: analysisData.machineCategory || '',
        machineTypeId: analysisData.machineTypeId || analysisData.machineId || '',
        riskMethod: analysisData.riskMethod || 'SxP',
        intendedUse: analysisData.intendedUse || '',
        foreseenMisuse: analysisData.foreseenMisuse || '',
        spaceLimits: analysisData.spaceLimits || '',
        timeLimits: analysisData.timeLimits || '',
        envLimits: analysisData.envLimits || '',
        serialNo: analysisData.serialNo || '',
        manufacturer: analysisData.manufacturer || '',
        productionYear: analysisData.productionYear ? String(analysisData.productionYear) : '',
        purpose: analysisData.purpose || '',
        norm: analysisData.norm || '',
        analystName: analysisData.analystName || '',
        analysisDate: analysisData.analysisDate ? analysisData.analysisDate.slice(0, 10) : '',
        notes: analysisData.notes || '',
        clientName: analysisData.clientName || '',
        clientCompany: analysisData.clientCompany || '',
        clientNip: analysisData.clientNip || '',
        clientAddress: analysisData.clientAddress || '',
      })
      setIsDraft(analysisData.isDraft || false)
      if (riskEntries?.length) {
        setEntries(riskEntries.map((e: any) => ({
          ...e,
          id: e.id || String(Math.random()),
          lifecycleStages: e.lifecycleStages ? (typeof e.lifecycleStages === 'string' ? JSON.parse(e.lifecycleStages) : e.lifecycleStages) : [],
          plrJustification: e.plrJustification || '',
          actionText: e.action || e.actionText || '',
        })))
      }
    }
  }, [existingAnalysis, isEditMode])

  const upd = (k: keyof AnalysisForm, v: string) => setForm(p => ({ ...p, [k]: v }))

  const LIFECYCLE_STAGES = [
    { key: 'lc1', label: t('analysis.lc1') },
    { key: 'lc2', label: t('analysis.lc2') },
    { key: 'lc3', label: t('analysis.lc3') },
    { key: 'lc4', label: t('analysis.lc4') },
    { key: 'lc5', label: t('analysis.lc5') },
    { key: 'lc6', label: t('analysis.lc6') },
    { key: 'lc7', label: t('analysis.lc7') },
    { key: 'lc8', label: t('analysis.lc8') },
  ]
  const selectedMachine = getMachineById(form.machineTypeId) ||
    (form.machineTypeId === '' && form.machineCategory
      ? getMachinesByCategory(form.machineCategory)[0]
      : undefined)
  const machinesInCategory = getMachinesByCategory(form.machineCategory)

  const selectMachineType = (id: string) => {
    const m = getMachineById(id)
    if (!m) return
    setForm(p => ({ ...p, machineTypeId: id, machineName: p.machineName || m.name, norm: m.norms.join(', ') }))
  }

  const addFromTemplate = (tpl: ThreatTemplate) => {
    const risk = getRiskLevel(tpl.defaultS, tpl.defaultP)
    setEntries(p => [...p, {
      id: Date.now().toString() + Math.random(),
      element: tpl.element, threat: tpl.threat, effect: tpl.effect,
      severity: 0, probability: 0, riskScore: 0,
      action: tpl.actions[0] || '', scenario: tpl.scenario || '', sortOrder: p.length,
    }])
  }

  const addAllThreats = () => {
    if (!selectedMachine) return
    const toAdd = selectedMachine.threats.filter(
      tpl => !entries.find(e => e.threat === tpl.threat && e.element === tpl.element)
    )
    setEntries(p => [...p, ...toAdd.map((tpl, i) => {
      const risk = getRiskLevel(tpl.defaultS, tpl.defaultP)
      return {
        id: Date.now().toString() + i + Math.random(),
        element: tpl.element, threat: tpl.threat, effect: tpl.effect,
        severity: 0, probability: 0, riskScore: 0,
        action: tpl.actions[0] || '', scenario: tpl.scenario || '', sortOrder: p.length + i,
      }
    })])
  }

  const addCustomThreat = () => {
    if (!newEntry.element || !newEntry.threat) return
    const risk = getRiskLevel(newEntry.s, newEntry.p)
    setEntries(p => [...p, {
      id: Date.now().toString(),
      element: newEntry.element, threat: newEntry.threat, effect: newEntry.effect,
      severity: newEntry.s, probability: newEntry.p, riskScore: risk.r,
      action: newEntry.action, scenario: newEntry.scenario || '', sortOrder: p.length,
    }])
    setNewEntry({ element: '', threat: '', effect: '', s: 0, p: 0, action: '', scenario: '' })
  }

  const removeEntry = (id: string) => setEntries(p => p.filter(e => e.id !== id))

  const updateEntry = (id: string, field: string, value: number | string) => {
    setEntries(p => p.map(e => {
      if (e.id !== id) return e
      const updated = { ...e, [field]: value }
      const risk = getRiskLevel(
        field === 'severity' ? Number(value) : updated.severity,
        field === 'probability' ? Number(value) : updated.probability
      )
      return { ...updated, riskScore: risk.r }
    }))
  }

  const { mutate: saveAnalysis, isPending } = useMutation({
    mutationFn: async () => {
      const san = (s?: string) => s ? s.replace(/[\x00-\x1F\x7F]/g, '') : s
      const payload = {
        ...form,
        isDraft,
        language: localStorage.getItem('i18nextLng') || 'pl',
        productionYear: form.productionYear ? parseInt(form.productionYear) : null,
        analysisDate: form.analysisDate || null,
        preparedBy: approval.preparedBy || null,
        preparedRole: approval.preparedRole || null,
        approvedBy: approval.approvedBy || null,
        approvedRole: approval.approvedRole || null,
        approvedDate: approval.approvedDate || null,
        entries: entries.map((e, i) => ({
          element: san(e.element), threat: san(e.threat), effect: san(e.effect),
          severity: e.severity, probability: e.probability, riskScore: e.riskScore,
          action: san(e.action), scenario: e.scenario || null, justificationS: e.justificationS || null, justificationP: e.justificationP || null, riskMethod: form.riskMethod || 'SxP',
          plrS: e.plrS || null, plrF: e.plrF || null, plrP: e.plrP || null,
          plrAuto: e.plrAuto || null, plrManual: e.plrManual || null,
          plrJustification: e.plrJustification || null,
          plCategory: e.plCategory || null, plAchieved: e.plAchieved || null,
          mttfd: e.mttfd || null, dcavg: e.dcavg || null,
          reductionLevel: e.reductionLevel || null, residualS: e.residualS ?? null, residualP: e.residualP ?? null, residualR: e.residualR ?? null,
          actionLevel: e.actionLevel || null,
          actionNorm: e.actionNorm || null,
          lifecycleStages: e.lifecycleStages ? JSON.stringify(e.lifecycleStages) : null,
          sortOrder: e.sortOrder ?? i,
        })),
      }
      const { data } = await (isEditMode
        ? api.put(`/analyses/${editId}`, payload)
        : api.post('/analyses', payload))
      return data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['analyses'] })
      navigate(`/analysis/${data.id}`)
    },
    onError: (error) => {
      if (error?.response?.status === 403) {
        alert('Brak dostępu. Sprawdź czy jesteś zalogowany.')
      } else {
        alert('Blad zapisu analizy')
      }
    },
  })

  const { mutate: saveDraft, isPending: isSavingDraft } = useMutation({
    mutationFn: async () => {
      const san = (s?: string) => s ? s.replace(/[\x00-\x1F\x7F]/g, '') : s
      const payload = {
        ...form,
        isDraft: true,
        language: localStorage.getItem('i18nextLng') || 'pl',
        productionYear: form.productionYear ? parseInt(form.productionYear) : null,
        analysisDate: form.analysisDate || null,
        preparedBy: approval.preparedBy || null,
        preparedRole: approval.preparedRole || null,
        approvedBy: approval.approvedBy || null,
        approvedRole: approval.approvedRole || null,
        approvedDate: approval.approvedDate || null,
        entries: entries.map((e, i) => ({
          element: san(e.element), threat: san(e.threat), effect: san(e.effect),
          severity: e.severity, probability: e.probability, riskScore: e.riskScore,
          action: san(e.action), scenario: e.scenario || null,
          justificationS: e.justificationS || null, justificationP: e.justificationP || null,
          riskMethod: form.riskMethod || 'SxP',
          plrS: e.plrS || null, plrF: e.plrF || null, plrP: e.plrP || null,
          plrAuto: e.plrAuto || null, plrManual: e.plrManual || null,
          plrJustification: e.plrJustification || null,
          plCategory: e.plCategory || null, plAchieved: e.plAchieved || null,
          mttfd: e.mttfd || null, dcavg: e.dcavg || null,
          reductionLevel: e.reductionLevel || null,
          residualS: e.residualS ?? null, residualP: e.residualP ?? null, residualR: e.residualR ?? null,
          actionLevel: e.actionLevel || null, actionNorm: e.actionNorm || null,
          lifecycleStages: e.lifecycleStages ? JSON.stringify(e.lifecycleStages) : null,
          sortOrder: e.sortOrder ?? i,
        })),
      }
      const { data } = await (isEditMode
        ? api.put(`/analyses/${editId}`, payload)
        : api.post('/analyses', payload))
      return data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['analyses'] })
      setDraftSaved(true)
      setIsDraft(true)
      setTimeout(() => setDraftSaved(false), 3000)
      // Jeśli nowa analiza — przejdź do edit mode bez navigate
      if (!isEditMode && data?.id) {
        window.history.replaceState(null, '', `/analysis/${data.id}/edit`)
      }
    },
    onError: () => {
      alert('Błąd zapisu szkicu')
    },
  })

  const riskBg = (cls: string) => cls === 'high' ? 'rgba(232,64,64,.15)' : cls === 'med' ? 'rgba(245,158,11,.15)' : cls === 'low' ? 'rgba(52,199,123,.15)' : 'rgba(138,153,176,.1)'
  const riskColor = (cls: string) => cls === 'high' ? '#E84040' : cls === 'med' ? '#F59E0B' : cls === 'low' ? '#34C77B' : '#8a99b0'
  const riskLabel = (cls: string) => t(`risk.${cls === 'neg' ? 'neg' : cls === 'high' ? 'high' : cls === 'med' ? 'med' : 'low'}`)

  const sevLabels: Record<number,string> = { 1: t('risk.s1'), 2: t('risk.s2'), 3: t('risk.s3'), 4: t('risk.s4') }
  const probLabels: Record<number,string> = { 1: t('risk.p1'), 2: t('risk.p2'), 3: t('risk.p3'), 4: t('risk.p4') }

  const inputStyle = {
    width: '100%', background: '#0B0F1A', border: '1px solid #1e2d45',
    borderRadius: '6px', padding: '10px 14px', color: '#F0EDE8',
    fontSize: '14px', outline: 'none', boxSizing: 'border-box' as const, fontFamily: 'Lato, sans-serif',
  }
  const labelStyle = {
    display: 'block', fontSize: '11px', color: '#8a99b0',
    marginBottom: '6px', textTransform: 'uppercase' as const, letterSpacing: '.08em',
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0B0F1A', fontFamily: 'Lato, sans-serif' }}>

      {/* Top bar */}
      <div style={{ background: '#111827', borderBottom: '1px solid #1e2d45', padding: '13px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', color: '#8a99b0', cursor: 'pointer', fontSize: '12px', fontFamily: 'monospace' }}>
            {t('analysis.back')}
          </button>
          <span style={{ color: '#1e2d45' }}>|</span>
          <span style={{ color: '#F0EDE8', fontFamily: 'Georgia, serif', fontSize: '16px' }}>
            {form.machineName || t('analysis.newAnalysis')}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {[1,2,3,4].map(s => (
            <button key={s} onClick={() => s < step && setStep(s)} style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: step === s ? 'rgba(232,168,56,.15)' : 'none',
              border: `1px solid ${step === s ? '#E8A838' : '#1e2d45'}`,
              borderRadius: '6px', padding: '5px 12px', cursor: s < step ? 'pointer' : 'default',
              color: step === s ? '#E8A838' : step > s ? '#34C77B' : '#8a99b0',
              fontSize: '11px', fontFamily: 'monospace',
            }}>
              <span style={{ width: '16px', height: '16px', borderRadius: '50%', background: step > s ? '#34C77B' : step === s ? '#E8A838' : '#1e2d45', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', color: step >= s ? '#0B0F1A' : '#8a99b0', flexShrink: 0 }}>
                {step > s ? '✓' : s}
              </span>
              {[t('analysis.step1'), t('analysis.step2'), t('analysis.step3'), t('analysis.step4')][s-1]}
            </button>
          ))}
          <button
            onClick={() => saveDraft()}
            disabled={isSavingDraft}
            style={{ padding: '7px 14px', borderRadius: '6px', border: '1px solid #1e2d45', background: 'transparent', color: draftSaved ? '#34C77B' : '#8a99b0', cursor: 'pointer', fontSize: '11px', marginLeft: '8px', opacity: isSavingDraft ? .7 : 1 }}
          >
            {isSavingDraft ? '...' : draftSaved ? '✓ Szkic zapisany' : '🚧 Zapisz szkic'}
          </button>
          <button onClick={() => saveAnalysis()} disabled={isPending} style={{ padding: '7px 18px', borderRadius: '6px', border: 'none', background: '#E8A838', color: '#0B0F1A', cursor: 'pointer', fontSize: '11px', fontWeight: 700, marginLeft: '4px', opacity: isPending ? .7 : 1 }}>
            {isPending ? '...' : t('analysis.save')}
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 24px' }}>

        {/* STEP 1 */}
        {step === 1 && (
          <div>
            <h2 style={{ color: '#F0EDE8', fontFamily: 'Georgia, serif', fontSize: '24px', marginBottom: '6px' }}>{t('analysis.step1')}<HelpLink section="step1" title="Instrukcja: Wybór maszyny" /></h2>
            <p style={{ color: '#8a99b0', fontSize: '13px', marginBottom: '28px' }}>{t('analysis.step1Desc')}</p>

            <div style={{ marginBottom: '28px' }}>
              <div style={{ fontSize: '11px', color: '#8a99b0', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '14px' }}>{t('analysis.selectCategoryLabel')}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '10px' }}>
                {MACHINE_CATEGORIES.map(cat => (
                  <button key={cat.id} onClick={() => { if (form.machineCategory !== cat.id) { upd('machineCategory', cat.id); upd('machineTypeId', '') } }} style={{
                    padding: '14px 12px', borderRadius: '8px', border: `2px solid ${form.machineCategory === cat.id ? '#E8A838' : '#1e2d45'}`,
                    background: form.machineCategory === cat.id ? 'rgba(232,168,56,.1)' : '#111827',
                    color: form.machineCategory === cat.id ? '#E8A838' : '#8a99b0',
                    cursor: 'pointer', textAlign: 'center', transition: 'all .15s',
                  }}>
                    <div style={{ fontSize: '24px', marginBottom: '6px' }}>{cat.icon}</div>
                    <div style={{ fontSize: '11px', fontFamily: 'monospace', lineHeight: 1.3 }}>{t(cat.labelKey)}</div>
                  </button>
                ))}
              </div>
            </div>

            {form.machineCategory && machinesInCategory.length > 0 && (
              <div style={{ marginBottom: '28px' }}>
                <div style={{ fontSize: '11px', color: '#8a99b0', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '14px' }}>{t('analysis.selectMachineLabel')}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {machinesInCategory.map(m => (
                    <button key={m.id} onClick={() => selectMachineType(m.id)} style={{
                      padding: '14px 18px', borderRadius: '8px', border: `2px solid ${form.machineTypeId === m.id ? '#E8A838' : '#1e2d45'}`,
                      background: form.machineTypeId === m.id ? 'rgba(232,168,56,.08)' : '#111827',
                      color: '#F0EDE8', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    }}>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>{(getMachineTranslation(m.id, (localStorage.getItem('i18nextLng') || 'pl') as any)?.name || m.name)}</div>
                        <div style={{ fontSize: '11px', color: '#8a99b0' }}>{m.threats.length} {t('analysis.threatsInDb')}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        {m.norms.map(n => (
                          <span key={n} style={{ display: 'inline-block', background: 'rgba(232,168,56,.15)', color: '#E8A838', border: '1px solid rgba(232,168,56,.3)', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontFamily: 'monospace', margin: '2px' }}>{n}</span>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedMachine && (
              <div style={{ background: 'rgba(52,199,123,.08)', border: '1px solid rgba(52,199,123,.25)', borderRadius: '10px', padding: '16px 20px', marginBottom: '24px' }}>
                <div style={{ fontSize: '13px', color: '#34C77B', fontWeight: 600, marginBottom: '4px' }}>✓ {t('analysis.selectedMachine')}: {selectedMachine.name}</div>
                <div style={{ fontSize: '12px', color: '#8a99b0' }}>{t('analysis.norms')}: {selectedMachine.norms.join(', ')} · {selectedMachine.threats.length} {t('analysis.threatsReady')}</div>
              </div>
            )}

            {form.machineTypeId && (
              <div style={{ marginBottom: '28px' }}>
                <div style={{ fontSize: '11px', color: '#8a99b0', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '14px' }}>
                  {t('analysis.riskMethodLabel')}
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => upd('riskMethod', 'SxP')}
                    style={{
                      flex: 1, padding: '16px', borderRadius: '8px',
                      border: `2px solid ${(!form.riskMethod || form.riskMethod === 'SxP') ? '#E8A838' : '#1e2d45'}`,
                      background: (!form.riskMethod || form.riskMethod === 'SxP') ? 'rgba(232,168,56,.1)' : '#111827',
                      color: (!form.riskMethod || form.riskMethod === 'SxP') ? '#E8A838' : '#8a99b0',
                      cursor: 'pointer', textAlign: 'left',
                    }}
                  >
                    <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '4px' }}>S × P</div>
                    <div style={{ fontSize: '11px', lineHeight: 1.5 }}>
                      {t('analysis.riskMethodSxPDesc') || 'Severity × Probability — metoda podstawowa wg ISO 12100'}
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      if (isPro(user)) {
                        upd('riskMethod', 'SxFxPxA');
                      }
                    }}
                    style={{
                      flex: 1, padding: '16px', borderRadius: '8px',
                      border: `2px solid ${form.riskMethod === 'SxFxPxA' ? '#34C77B' : '#1e2d45'}`,
                      background: form.riskMethod === 'SxFxPxA' ? 'rgba(52,199,123,.1)' : '#111827',
                      color: form.riskMethod === 'SxFxPxA' ? '#34C77B' : (isPro(user)) ? '#8a99b0' : '#4a5a72',
                      cursor: (isPro(user)) ? 'pointer' : 'not-allowed',
                      textAlign: 'left', position: 'relative',
                    }}
                  >
                    <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '4px' }}>
                      S × F × P × A
                      {!(isPro(user)) && (
                        <span style={{ marginLeft: '8px', fontSize: '10px', background: '#E8A838', color: '#0B0F1A', padding: '1px 6px', borderRadius: '3px', fontWeight: 700 }}>PRO</span>
                      )}
                    </div>
                    <div style={{ fontSize: '11px', lineHeight: 1.5 }}>
                      {t('analysis.riskMethodSxFxPxADesc') || 'Severity × Frequency × Probability × Avoidability — metoda rozszerzona'}
                    </div>
                  </button>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                onClick={() => saveDraft()}
                disabled={isSavingDraft}
                style={{ padding: '11px 18px', borderRadius: '6px', border: '1px solid #1e2d45', background: 'transparent', color: draftSaved ? '#34C77B' : '#8a99b0', cursor: 'pointer', fontSize: '12px' }}
              >
                {isSavingDraft ? '...' : draftSaved ? '✓ Zapisano' : '🚧 Zapisz szkic'}
              </button>
              <button onClick={() => setStep(2)} disabled={!form.machineCategory} style={{ padding: '11px 28px', borderRadius: '6px', border: 'none', background: form.machineCategory ? '#E8A838' : '#1e2d45', color: form.machineCategory ? '#0B0F1A' : '#4a5a72', cursor: form.machineCategory ? 'pointer' : 'not-allowed', fontSize: '13px', fontWeight: 700 }}>
                {t('analysis.nextStep')}
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div>
            <h2 style={{ color: '#F0EDE8', fontFamily: 'Georgia, serif', fontSize: '24px', marginBottom: '6px' }}>{t('analysis.step2')}<HelpLink section="step2" title="Instrukcja: Dane maszyny i granice" /><InlineTip tipId="machine-limits" /></h2>
            <p style={{ color: '#8a99b0', fontSize: '13px', marginBottom: '28px' }}>{t('analysis.step2Desc')}</p>

            <div style={{ background: '#111827', border: '1px solid #1e2d45', borderRadius: '10px', padding: '22px', marginBottom: '20px' }}>
              <div style={{ fontSize: '10px', color: '#E8A838', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '18px' }}>{t('analysis.machineDataBox')}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[
                  { label: t('analysis.machineName'), key: 'machineName' },
                  { label: t('analysis.serialNo'), key: 'serialNo' },
                  { label: t('analysis.manufacturer'), key: 'manufacturer' },
                  { label: t('analysis.productionYear'), key: 'productionYear' },
                  { label: t('analysis.purpose'), key: 'purpose' },
                  { label: t('analysis.norm'), key: 'norm' },
                  { label: t('analysis.analystName'), key: 'analystName' },
                  { label: t('analysis.analysisDate'), key: 'analysisDate', type: 'date' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={labelStyle}>{f.label}</label>
                    <input type={f.type || 'text'} value={form[f.key as keyof AnalysisForm]} onChange={e => upd(f.key as keyof AnalysisForm, e.target.value)} style={inputStyle} />
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '16px' }}>
                <label style={labelStyle}>{t('analysis.notes')}</label>
                <textarea value={form.notes} onChange={e => upd('notes', e.target.value)} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
              </div>
            </div>

            <div style={{ background: '#111827', border: '1px solid #1e2d45', borderRadius: '10px', padding: '22px', marginBottom: '24px' }}>
              <div style={{ fontSize: '10px', color: '#E8A838', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '18px' }}>{t('analysis.clientDataBox')}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[
                  { label: t('analysis.clientName'), key: 'clientName' },
                  { label: t('analysis.clientCompany'), key: 'clientCompany' },
                  { label: t('analysis.clientNip'), key: 'clientNip' },
                  { label: t('analysis.clientAddress'), key: 'clientAddress' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={labelStyle}>{f.label}</label>
                    <input value={form[f.key as keyof AnalysisForm]} onChange={e => upd(f.key as keyof AnalysisForm, e.target.value)} style={inputStyle} />
                  </div>
                ))}
              </div>
            </div>

            {/* GRANICE MASZYNY */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ fontSize: '13px', color: '#E8A838', fontWeight: 600, marginBottom: '4px', fontFamily: 'Georgia, serif' }}>
                {t('analysis.machineBoundaries')}
                <HelpLink section="step2" title="Instrukcja: Granice maszyny ISO 12100 §5.3" /><InlineTip tipId="machine-limits" />
              </div>
              <div style={{ fontSize: '11px', color: '#4a5a72', marginBottom: '16px', lineHeight: 1.6 }}>
                {t('analysis.machineBoundariesDesc')}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { key: 'intendedUse', label: t('analysis.intendedUse'), placeholder: t('analysis.intendedUsePlaceholder'), rows: 4 },
                  { key: 'foreseenMisuse', label: t('analysis.foreseenMisuse'), placeholder: t('analysis.foreseenMisusePlaceholder'), rows: 3 },
                  { key: 'spaceLimits', label: t('analysis.spaceLimits'), placeholder: t('analysis.spaceLimitsPlaceholder'), rows: 3 },
                  { key: 'timeLimits', label: t('analysis.timeLimits'), placeholder: t('analysis.timeLimitsPlaceholder'), rows: 3 },
                  { key: 'envLimits', label: t('analysis.envLimits'), placeholder: t('analysis.envLimitsPlaceholder'), rows: 2 },
                ].map(({ key, label, placeholder, rows }) => (
                  <div key={key}>
                    <div style={{ fontSize: '11px', color: '#8a99b0', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: '6px' }}>{label}</div>
                    <textarea
                      value={(form as any)[key] || ''}
                      onChange={e => upd(key as any, e.target.value)}
                      placeholder={placeholder}
                      rows={rows}
                      style={{
                        width: '100%', background: '#0B0F1A', border: '1px solid #1e2d45',
                        borderRadius: '6px', color: '#F0EDE8', padding: '10px 14px',
                        fontSize: '12px', fontFamily: 'Lato, sans-serif', lineHeight: 1.6,
                        resize: 'vertical', boxSizing: 'border-box',
                        outline: 'none',
                      }}
                      onFocus={e => e.target.style.borderColor = '#E8A838'}
                      onBlur={e => e.target.style.borderColor = '#1e2d45'}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => setStep(1)} style={{ padding: '11px 22px', borderRadius: '6px', border: '1px solid #1e2d45', background: 'transparent', color: '#8a99b0', cursor: 'pointer', fontSize: '13px' }}>{t('analysis.prevStep')}</button>
              <button
                onClick={() => saveDraft()}
                disabled={isSavingDraft}
                style={{ padding: '11px 18px', borderRadius: '6px', border: '1px solid #1e2d45', background: 'transparent', color: draftSaved ? '#34C77B' : '#8a99b0', cursor: 'pointer', fontSize: '12px' }}
              >
                {isSavingDraft ? '...' : draftSaved ? '✓ Zapisano' : '🚧 Zapisz szkic'}
              </button>
              <button onClick={() => setStep(3)} style={{ padding: '11px 28px', borderRadius: '6px', border: 'none', background: '#E8A838', color: '#0B0F1A', cursor: 'pointer', fontSize: '13px', fontWeight: 700 }}>{t('analysis.nextStep')}</button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div>
            <h2 style={{ color: '#F0EDE8', fontFamily: 'Georgia, serif', fontSize: '24px', marginBottom: '6px' }}>{t('analysis.step3')}<HelpLink section="step3" title="Instrukcja: Analiza zagrożeń" /><InlineTip tipId="hazard-analysis" /></h2>
            <p style={{ color: '#8a99b0', fontSize: '13px', marginBottom: '24px' }}>{t('analysis.step3Desc')}</p>

            {selectedMachine && selectedMachine.threats.length > 0 && (
              <div style={{ background: 'rgba(232,168,56,.06)', border: '1px solid rgba(232,168,56,.25)', borderRadius: '10px', padding: '18px 20px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: '#E8A838', fontWeight: 600, marginBottom: '2px' }}>⚡ {t('analysis.autoThreats')} — {selectedMachine.name}</div>
                    <div style={{ fontSize: '11px', color: '#8a99b0' }}>{selectedMachine.threats.length} {t('analysis.autoThreatsDesc')}</div>
                  </div>
                  <button onClick={addAllThreats} style={{ padding: '9px 18px', borderRadius: '6px', border: 'none', background: '#E8A838', color: '#0B0F1A', cursor: 'pointer', fontSize: '12px', fontWeight: 700, whiteSpace: 'nowrap' }}>
                    {t('analysis.addAll')} ({selectedMachine.threats.length})
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {selectedMachine.threats.map(tpl => {
                    const lang = (localStorage.getItem('i18nextLng') || 'pl') as any
                    const tlp = translateRiskEntry({ element: tpl.element, threat: tpl.threat, effect: tpl.effect || '' }, lang)
const risk = getRiskLevel(tpl.defaultS, tpl.defaultP)
                    const done = entries.some(e => e.threat === tpl.threat && e.element === tpl.element)
                    return (
                      <div key={tpl.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: done ? 'rgba(52,199,123,.08)' : '#111827', borderRadius: '6px', border: `1px solid ${done ? 'rgba(52,199,123,.2)' : '#1e2d45'}` }}>
                        <div style={{ flex: 1 }}>
                          <span style={{ fontSize: '12px', fontWeight: 600, color: '#F0EDE8' }}>{tlp.element}</span>
                          <span style={{ fontSize: '11px', color: '#8a99b0', margin: '0 8px' }}>→</span>
                          <span style={{ fontSize: '12px', color: '#8a99b0' }}>{tlp.threat}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ background: riskBg(risk.cls), color: riskColor(risk.cls), border: `1px solid ${riskColor(risk.cls)}44`, padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontFamily: 'monospace' }}>R={risk.r}</span>
                          {done ? (
                            <span style={{ color: '#34C77B', fontSize: '11px' }}>{t('analysis.added')}</span>
                          ) : (
                            <button onClick={() => addFromTemplate(tpl)} style={{ padding: '4px 12px', borderRadius: '4px', border: '1px solid rgba(232,168,56,.3)', background: 'none', color: '#E8A838', cursor: 'pointer', fontSize: '11px' }}>
                              + {t('analysis.addBtn').replace('+ ', '')}
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            <div style={{ background: '#111827', border: '1px solid #1e2d45', borderRadius: '10px', padding: '20px', marginBottom: '20px' }}>
              <div style={{ fontSize: '10px', color: '#E8A838', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '14px' }}>{t('analysis.addThreat')}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div><label style={labelStyle}>{t('analysis.element')}</label><input value={newEntry.element} onChange={e => setNewEntry(p => ({ ...p, element: e.target.value }))} style={inputStyle} /></div>
                <div><label style={labelStyle}>{t('analysis.threat')}</label><input value={newEntry.threat} onChange={e => setNewEntry(p => ({ ...p, threat: e.target.value }))} style={inputStyle} /></div>
                <div><label style={labelStyle}>{t('analysis.effect')}</label><input value={newEntry.effect} onChange={e => setNewEntry(p => ({ ...p, effect: e.target.value }))} style={inputStyle} /></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 2fr', gap: '12px', alignItems: 'end' }}>
                <div>
                  <label style={labelStyle}>{t('analysis.severity')}</label>
                  <select value={newEntry.s} onChange={e => setNewEntry(p => ({ ...p, s: Number(e.target.value) }))} style={inputStyle}>
                    {[1,2,3,4].map(v => <option key={v} value={v}>{v} – {sevLabels[v]}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>{t('analysis.probability')}</label>
                  <select value={newEntry.p} onChange={e => setNewEntry(p => ({ ...p, p: Number(e.target.value) }))} style={inputStyle}>
                    {[1,2,3,4].map(v => <option key={v} value={v}>{v} – {probLabels[v]}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>{t('analysis.riskScore')}</label>
                  <div style={{ padding: '10px 14px', border: '1px solid #1e2d45', borderRadius: '6px', background: '#0B0F1A', height: '42px', display: 'flex', alignItems: 'center' }}>
                    {(() => { const r = getRiskLevel(newEntry.s, newEntry.p); return <span style={{ background: riskBg(r.cls), color: riskColor(r.cls), padding: '2px 10px', borderRadius: '4px', fontSize: '12px', fontFamily: 'monospace' }}>{r.r} — {riskLabel(r.cls)}</span> })()}
                  </div>
                </div>
                <div><label style={labelStyle}>{t('analysis.action')}</label><input value={newEntry.action} onChange={e => setNewEntry(p => ({ ...p, action: e.target.value }))} style={inputStyle} /></div>
                <div style={{ gridColumn: 'span 2' }}><label style={labelStyle}>{t('analysis.scenario') || 'Scenariusz zagrożenia'}</label><input value={newEntry.scenario || ''} onChange={e => setNewEntry(p => ({ ...p, scenario: e.target.value }))} style={{ ...inputStyle, width: '100%' }} placeholder={t('analysis.scenarioPlaceholder')} /></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                <button onClick={addCustomThreat} style={{ padding: '9px 20px', borderRadius: '6px', border: 'none', background: '#E8A838', color: '#0B0F1A', cursor: 'pointer', fontSize: '12px', fontWeight: 700 }}>{t('analysis.addBtn')}</button>
              </div>
            </div>

            {entries.length > 0 && (
              <div style={{ background: '#111827', border: '1px solid #1e2d45', borderRadius: '10px', overflow: 'hidden', marginBottom: '20px' }}>
                <div style={{ padding: '10px 16px', borderBottom: '1px solid #1e2d45', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '10px', color: '#8a99b0', textTransform: 'uppercase', letterSpacing: '.08em' }}>
                    {t('analysis.identifiedThreats')} ({entries.length})
                  </span>
                  <span style={{ fontSize: '10px', color: '#F59E0B', background: 'rgba(245,158,11,.1)', border: '1px solid rgba(245,158,11,.3)', borderRadius: '4px', padding: '3px 8px' }}>
                    {t('analysis.neutralSP')}
                    <HelpLink section="sp" title="Instrukcja: Parametry S i P" /><InlineTip tipId="sp-params" />
                  </span>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      {(form.riskMethod === 'SxFxPxA'
                        ? [t('analysis.colElement'), t('analysis.colThreat'), t('analysis.colEffect'), 'S', 'F', 'P', 'A', 'R', t('analysis.colLevel'), t('analysis.colAction'), t('analysis.scenario') || 'Scenariusz', 'Poziom środka', '']
                        : [t('analysis.colElement'), t('analysis.colThreat'), t('analysis.colEffect'), 'S', 'P', 'R', t('analysis.colLevel'), t('analysis.colAction'), t('analysis.scenario') || 'Scenariusz', 'Poziom środka', '']
                      ).map((h, i) => (
                        <th key={i} style={{ textAlign: 'left', fontSize: '9px', color: '#8a99b0', padding: '8px 10px', borderBottom: '1px solid #1e2d45', textTransform: 'uppercase', letterSpacing: '.06em' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map(e => {
                      const hasSpP = e.severity > 0 && e.probability > 0
                      const risk = hasSpP ? getRiskLevel(e.severity, e.probability) : { r: 0, cls: 'low' as const }
                      return (
                        <>
                        <tr key={e.id} style={{ borderBottom: '1px solid rgba(30,45,69,.4)' }}>
                          <td style={{ padding: '8px 10px', fontSize: '12px', fontWeight: 600, color: '#F0EDE8', maxWidth: '120px' }}>{translateRiskEntry(e, (localStorage.getItem('i18nextLng') || 'pl') as any).element}</td>
                          <td style={{ padding: '8px 10px', fontSize: '11px', color: '#8a99b0', maxWidth: '140px' }}>{translateRiskEntry(e, (localStorage.getItem('i18nextLng') || 'pl') as any).threat}</td>
                          <td style={{ padding: '8px 10px', fontSize: '11px', maxWidth: '120px' }}>{translateRiskEntry(e, (localStorage.getItem('i18nextLng') || 'pl') as any).effect}</td>
                          <td style={{ padding: '8px 4px' }}>
                            <div title="S — Severity: Assess the worst realistic injury outcome considering working conditions and exposure. Decision is the assessor's responsibility.">
                              <select value={e.severity || ''} onChange={ev => updateEntry(e.id, 'severity', Number(ev.target.value))}
                                style={{ background: '#0B0F1A', border: `1px solid ${!e.severity ? 'rgba(232,64,64,.7)' : e.severity >= 3 ? 'rgba(232,64,64,.5)' : 'rgba(232,168,56,.3)'}`, borderRadius: '4px', color: !e.severity ? '#E84040' : e.severity >= 3 ? '#E84040' : '#E8A838', padding: '3px 4px', fontSize: '11px', width: '44px', fontWeight: 700, cursor: 'pointer' }}>
                                <option value="">—</option>
                                {[1,2,3,4].map(v => <option key={v} value={v}>{v}</option>)}
                              </select>
                            </div>
                          </td>
                          <td style={{ padding: '8px 4px' }}>
                            <div title="P — Probability: Assess exposure frequency, possibility of avoiding the hazard and working conditions. Decision is the assessor's responsibility.">
                              <select value={e.probability || ''} onChange={ev => updateEntry(e.id, 'probability', Number(ev.target.value))}
                                style={{ background: '#0B0F1A', border: `1px solid ${!e.probability ? 'rgba(232,64,64,.7)' : e.probability >= 3 ? 'rgba(232,64,64,.5)' : 'rgba(232,168,56,.3)'}`, borderRadius: '4px', color: !e.probability ? '#E84040' : e.probability >= 3 ? '#E84040' : '#E8A838', padding: '3px 4px', fontSize: '11px', width: '44px', fontWeight: 700, cursor: 'pointer' }}>
                                <option value="">—</option>
                                {[1,2,3,4].map(v => <option key={v} value={v}>{v}</option>)}
                              </select>
                            </div>
                          </td>
                          {form.riskMethod === 'SxFxPxA' && (
                            <>
                              <td style={{ padding: '4px 6px', width: '44px' }}>
                                <select value={e.frequency ?? 2} onChange={ev => setEntries(p => p.map(x => x.id === e.id ? { ...x, frequency: Number(ev.target.value), riskScore: x.severity * Number(ev.target.value) * x.probability * (x.avoidance ?? 2) } : x))}
                                  style={{ width: '100%', background: '#0B0F1A', border: '1px solid #1e2d45', borderRadius: '4px', color: '#F0EDE8', padding: '4px', fontSize: '12px' }}>
                                  {[1,2,3,4].map(v => <option key={v} value={v}>{v}</option>)}
                                </select>
                              </td>
                              <td style={{ padding: '4px 6px', width: '44px' }}>
                                <select value={e.avoidance ?? 2} onChange={ev => setEntries(p => p.map(x => x.id === e.id ? { ...x, avoidance: Number(ev.target.value), riskScore: x.severity * (x.frequency ?? 2) * x.probability * Number(ev.target.value) } : x))}
                                  style={{ width: '100%', background: '#0B0F1A', border: '1px solid #1e2d45', borderRadius: '4px', color: '#F0EDE8', padding: '4px', fontSize: '12px' }}>
                                  {[1,2,3].map(v => <option key={v} value={v}>{v}</option>)}
                                </select>
                              </td>
                            </>
                          )}
                          <td style={{ padding: '8px 10px', fontFamily: 'monospace', fontWeight: 700, color: hasSpP ? riskColor(risk.cls) : '#4a5a72' }}>{hasSpP ? risk.r : '—'}</td>
                          <td style={{ padding: '8px 10px' }}>
                            {hasSpP
                              ? <span style={{ background: riskBg(risk.cls), color: riskColor(risk.cls), border: `1px solid ${riskColor(risk.cls)}44`, padding: '2px 7px', borderRadius: '3px', fontSize: '10px', fontFamily: 'monospace' }}>{riskLabel(risk.cls)}</span>
                              : <span style={{ color: '#4a5a72', fontSize: '10px', fontFamily: 'monospace' }}>{t('analysis.undetermined')}</span>
                            }
                          </td>
                          <td style={{ padding: '8px 10px', fontSize: '11px', color: '#8a99b0', maxWidth: '150px' }}>{e.action}</td>
                          <td style={{ padding: '6px 8px', minWidth: '140px' }}>
                            <input
                              value={e.scenario || ''}
                              onChange={ev => setEntries(p => p.map(x => x.id === e.id ? { ...x, scenario: ev.target.value } : x))}
                              placeholder={t('analysis.scenarioShortPlaceholder')}
                              style={{ background: 'transparent', border: 'none', borderBottom: '1px solid #1e2d45', color: '#8a99b0', fontSize: '10px', padding: '2px 0', outline: 'none', width: '100%' }}
                            />
                          </td>
                          <td style={{ padding: '4px 6px', minWidth: '140px' }}>
                            {(() => {
                              const lv = e.actionLevel || ''
                              const lvMeta: Record<string, { label: string; color: string; bg: string }> = {
                                design:         { label: '🔧 Eliminacja',   color: '#34C77B', bg: 'rgba(52,199,123,.15)' },
                                technical:      { label: '🛡️ Techniczne',  color: '#E8A838', bg: 'rgba(232,168,56,.15)' },
                                organisational: { label: '📋 Organizacyjne', color: '#8a99b0', bg: 'rgba(138,153,176,.15)' },
                              }
                              const meta = lvMeta[lv]
                              return (
                                <select
                                  value={lv}
                                  onChange={ev => setEntries(p => p.map(x => x.id === e.id ? { ...x, actionLevel: ev.target.value } : x))}
                                  style={{
                                    width: '100%', background: meta ? meta.bg : 'rgba(232,64,64,.1)',
                                    border: `1px solid ${meta ? meta.color + '44' : 'rgba(232,64,64,.4)'}`,
                                    borderRadius: '4px', color: meta ? meta.color : '#E84040',
                                    padding: '3px 4px', fontSize: '10px', cursor: 'pointer',
                                  }}
                                >
                                  <option value="">—</option>
                                  <option value="design">{t('analysis.designLevel')}</option>
                                  <option value="technical">{t('analysis.technicalLevel')}</option>
                                  <option value="organisational">{t('analysis.orgLevel')}</option>
                                </select>
                              )
                            })()}
                          </td>
                          <td style={{ padding: '8px 10px' }}><button onClick={() => removeEntry(e.id)} style={{ background: 'none', border: 'none', color: '#E84040', cursor: 'pointer', fontSize: '16px', padding: '0 4px' }}>×</button></td>
                        </tr>
                        {/* Justification row */}
                        <tr key={e.id + '-just'} style={{ borderBottom: '1px solid rgba(30,45,69,.6)', background: 'rgba(232,168,56,.03)' }}>
                          <td colSpan={10} style={{ padding: '6px 10px' }}>
                            <div style={{ display: 'flex', gap: '12px' }}>
                              <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '9px', color: e.justificationS ? '#E8A838' : '#E84040', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '3px' }}>
                                  Uzasadnienie S {!e.justificationS && <span style={{ color: '#E84040' }}>*wymagane</span>}
                                </div>
                                <input
                                  value={e.justificationS || ''}
                                  onChange={ev => setEntries(p => p.map(x => x.id === e.id ? { ...x, justificationS: ev.target.value } : x))}
                                  placeholder={t('analysis.justificationSPlaceholder')}
                                  style={{ width: '100%', background: '#0B0F1A', border: `1px solid ${e.justificationS ? '#1e2d45' : '#E84040'}`, borderRadius: '4px', color: '#F0EDE8', padding: '4px 8px', fontSize: '11px', boxSizing: 'border-box' }}
                                />
                              </div>
                              <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '9px', color: e.justificationP ? '#E8A838' : '#E84040', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '3px' }}>
                                  Uzasadnienie P {!e.justificationP && <span style={{ color: '#E84040' }}>*wymagane</span>}
                                </div>
                                <input
                                  value={e.justificationP || ''}
                                  onChange={ev => setEntries(p => p.map(x => x.id === e.id ? { ...x, justificationP: ev.target.value } : x))}
                                  placeholder={t('analysis.justificationPPlaceholder')}
                                  style={{ width: '100%', background: '#0B0F1A', border: `1px solid ${e.justificationP ? '#1e2d45' : '#E84040'}`, borderRadius: '4px', color: '#F0EDE8', padding: '4px 8px', fontSize: '11px', boxSizing: 'border-box' }}
                                />
                              </div>
                              {/* Podstawa normy */}
                              <div style={{ flex: 1.2 }}>
                                <div style={{ fontSize: '9px', color: '#4a9eff', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '3px' }}>
                                  Podstawa normy / wymaganie
                                </div>
                                <div style={{ display: 'flex', gap: '4px' }}>
                                  <select
                                    value={['ISO 12100','EN ISO 13857','EN 953','EN ISO 13849-1','EN 62061','EN ISO 14119','EN ISO 13850','EN 60204-1','EN ISO 14120'].includes(e.actionNorm || '') ? (e.actionNorm || '') : (e.actionNorm ? 'wlasna' : '')}
                                    onChange={ev => {
                                      const val = ev.target.value
                                      if (val === 'wlasna') {
                                        setEntries(p => p.map(x => x.id === e.id ? { ...x, actionNorm: '' } : x))
                                      } else {
                                        setEntries(p => p.map(x => x.id === e.id ? { ...x, actionNorm: val } : x))
                                      }
                                    }}
                                    style={{ background: '#0B0F1A', border: '1px solid #1e2d45', borderRadius: '4px', color: e.actionNorm ? '#4a9eff' : '#4a5a72', padding: '4px 6px', fontSize: '10px', flex: 1 }}
                                  >
                                    <option value="">{t('analysis.normSelectPlaceholder')}</option>
                                    <option value="ISO 12100">{t('analysis.normISO12100')}</option>
                                    <option value="EN ISO 13857">{t('analysis.normEN13857')}</option>
                                    <option value="EN 953">{t('analysis.normEN953')}</option>
                                    <option value="EN ISO 13849-1">{t('analysis.normEN13849')}</option>
                                    <option value="EN 62061">{t('analysis.normEN62061')}</option>
                                    <option value="EN ISO 14119">{t('analysis.normEN14119')}</option>
                                    <option value="EN ISO 13850">{t('analysis.normEN13850')}</option>
                                    <option value="EN 60204-1">{t('analysis.normEN60204')}</option>
                                    <option value="EN ISO 14120">{t('analysis.normEN14120')}</option>
                                    <option value="wlasna">{t('analysis.normCustom')}</option>
                                  </select>
                                  {(!e.actionNorm || !['ISO 12100','EN ISO 13857','EN 953','EN ISO 13849-1','EN 62061','EN ISO 14119','EN ISO 13850','EN 60204-1','EN ISO 14120'].includes(e.actionNorm)) && (
                                    <input
                                      value={['ISO 12100','EN ISO 13857','EN 953','EN ISO 13849-1','EN 62061','EN ISO 14119','EN ISO 13850','EN 60204-1','EN ISO 14120'].includes(e.actionNorm || '') ? '' : (e.actionNorm || '')}
                                      onChange={ev => setEntries(p => p.map(x => x.id === e.id ? { ...x, actionNorm: ev.target.value } : x))}
                                      placeholder={t('analysis.actionNormPlaceholder')}
                                      style={{ flex: 1, background: '#0B0F1A', border: '1px solid #1e2d45', borderRadius: '4px', color: '#4a9eff', padding: '4px 8px', fontSize: '10px' }}
                                    />
                                  )}
                                </div>
                              </div>
                              {/* Etapy cyklu życia — accordion */}
                              <div style={{ flex: 1.2 }}>
                                {(() => {
                                  const stages = e.lifecycleStages || []
                                  const count = stages.length
                                  const isOpen = openLifecycle[e.id] || false
                                  const hasMin = count >= 1
                                  return (
                                    <div>
                                      <button
                                        onClick={() => setOpenLifecycle(p => ({ ...p, [e.id]: !isOpen }))}
                                        style={{
                                          width: '100%', background: hasMin ? 'rgba(52,199,123,.08)' : 'rgba(232,64,64,.08)',
                                          border: `1px solid ${hasMin ? 'rgba(52,199,123,.3)' : 'rgba(232,64,64,.4)'}`,
                                          borderRadius: '4px', color: hasMin ? '#34C77B' : '#E84040',
                                          padding: '4px 8px', fontSize: '10px', cursor: 'pointer',
                                          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                          textAlign: 'left',
                                        }}
                                      >
                                        <span>
                                          {hasMin
                                            ? t('analysis.lifecycleAssigned').replace('{n}', String(count))
                                            : t('analysis.lifecycleRequired')}
                                        </span>
                                        <span style={{ fontSize: '8px', marginLeft: '6px' }}>{isOpen ? '▲' : '▼'}</span>
                                      </button>
                                      {isOpen && (
                                        <div style={{ marginTop: '4px', background: '#0B0F1A', border: '1px solid #1e2d45', borderRadius: '4px', padding: '8px 10px' }}>
                                          <div style={{ fontSize: '9px', color: '#6B7280', marginBottom: '6px' }}>
                                            {t('analysis.lifecycleSelectLabel')} <HelpLink section="lifecycle" title="Instrukcja: Cykl życia maszyny" /><InlineTip tipId="lifecycle" />
                                          </div>
                                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
                                            {LIFECYCLE_STAGES.map(ls => {
                                              const checked = stages.includes(ls.key)
                                              return (
                                                <label key={ls.key} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', padding: '3px 4px', borderRadius: '3px', background: checked ? 'rgba(52,199,123,.08)' : 'transparent' }}>
                                                  <input
                                                    type="checkbox"
                                                    checked={checked}
                                                    onChange={() => {
                                                      const newStages = checked
                                                        ? stages.filter((s: string) => s !== ls.key)
                                                        : [...stages, ls.key]
                                                      setEntries(p => p.map(x => x.id === e.id ? { ...x, lifecycleStages: newStages } : x))
                                                    }}
                                                    style={{ accentColor: '#34C77B', width: '12px', height: '12px' }}
                                                  />
                                                  <span style={{ fontSize: '10px', color: checked ? '#34C77B' : '#8a99b0' }}>{ls.label}</span>
                                                </label>
                                              )
                                            })}
                                          </div>
                                          <div style={{ marginTop: '6px', display: 'flex', gap: '6px' }}>
                                            <button onClick={() => setEntries(p => p.map(x => x.id === e.id ? { ...x, lifecycleStages: LIFECYCLE_STAGES.map(ls => ls.key) } : x))}
                                              style={{ fontSize: '9px', color: '#34C77B', background: 'none', border: '1px solid rgba(52,199,123,.3)', borderRadius: '3px', padding: '2px 6px', cursor: 'pointer' }}>
                                              ✓ Wszystkie
                                            </button>
                                            <button onClick={() => setEntries(p => p.map(x => x.id === e.id ? { ...x, lifecycleStages: [] } : x))}
                                              style={{ fontSize: '9px', color: '#6B7280', background: 'none', border: '1px solid #1e2d45', borderRadius: '3px', padding: '2px 6px', cursor: 'pointer' }}>
                                              {t('analysis.clearBtn')}
                                            </button>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  )
                                })()}
                              </div>
                            </div>
                          </td>
                        </tr>
                        </>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* HIERARCHIA ŚRODKÓW OCHRONNYCH — ISO 12100 §6.2 */}
            {entries.length > 0 && (() => {
              const design = entries.filter(e => e.actionLevel === 'design')
              const technical = entries.filter(e => e.actionLevel === 'technical')
              const organisational = entries.filter(e => e.actionLevel === 'organisational')
              const unassigned = entries.filter(e => !e.actionLevel)
              const missingTech = entries.some(e => e.actionLevel === 'organisational') &&
                !entries.some(e => e.actionLevel === 'design' || e.actionLevel === 'technical')

              const levelConfig = [
                {
                  key: 'design', icon: '🔧', label: t('analysis.hierarchy1full'),
                  desc: t('analysis.hierarchy1desc'),
                  color: '#34C77B', bg: 'rgba(52,199,123,.06)', border: 'rgba(52,199,123,.2)',
                  entries: design,
                },
                {
                  key: 'technical', icon: '🛡️', label: t('analysis.hierarchy2label'),
                  desc: t('analysis.hierarchy2desc'),
                  color: '#E8A838', bg: 'rgba(232,168,56,.06)', border: 'rgba(232,168,56,.2)',
                  entries: technical,
                },
                {
                  key: 'organisational', icon: '📋', label: t('analysis.hierarchy3full'),
                  desc: t('analysis.hierarchy3desc'),
                  color: '#8a99b0', bg: 'rgba(138,153,176,.06)', border: 'rgba(138,153,176,.2)',
                  entries: organisational,
                },
              ]

              return (
                <div style={{ background: '#111827', border: '1px solid #1e2d45', borderRadius: '10px', overflow: 'hidden', marginBottom: '20px' }}>
                  <div style={{ padding: '10px 16px', borderBottom: '1px solid #1e2d45', background: 'rgba(52,199,123,.04)' }}>
                    <span style={{ fontSize: '10px', color: '#34C77B', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 600 }}>
                      {t('analysis.hierarchyTitle')} <HelpLink section="hierarchy" title="Instrukcja: Hierarchia środków ochronnych" /><InlineTip tipId="protective-measures" />
                    </span>
                  </div>

                  {/* Warning gdy brak poziomów 1 i 2 */}
                  {missingTech && (
                    <div style={{ padding: '10px 16px', background: 'rgba(232,64,64,.08)', borderBottom: '1px solid rgba(232,64,64,.2)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '16px' }}>⚠️</span>
                      <span style={{ fontSize: '11px', color: '#E84040', lineHeight: 1.5 }}>
                        <strong>{t('analysis.hierarchyWarning')}</strong> Czy na pewno nie można zastosować środka technicznego? Środki organizacyjne (ŚOI, szkolenia) nie mogą być jedyną warstwą ochrony wg ISO 12100 §6.2.
                      </span>
                    </div>
                  )}

                  {/* Przypisanie środków */}
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid #1e2d45' }}>
                    <div style={{ fontSize: '10px', color: '#6B7280', marginBottom: '10px' }}>
                      {t('analysis.hierarchyAssign')}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {entries.map(e => {
                        const lang2 = (localStorage.getItem('i18nextLng') || 'pl') as any
                        const lv = e.actionLevel || ''
                        const lvColor = lv === 'design' ? '#34C77B' : lv === 'technical' ? '#E8A838' : lv === 'organisational' ? '#8a99b0' : '#E84040'
                        return (
                          <div key={e.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 10px', background: '#0B0F1A', borderRadius: '6px', border: `1px solid ${lv ? '#1e2d45' : 'rgba(232,64,64,.3)'}` }}>
                            <div style={{ flex: 1, fontSize: '11px', color: '#F0EDE8', fontWeight: 600 }}>
                              {translateRiskEntry(e, lang2).element}
                              <span style={{ color: '#6B7280', fontWeight: 400, marginLeft: '8px', fontSize: '10px' }}>→ {translateRiskEntry(e, lang2).threat}</span>
                            </div>
                            <div style={{ fontSize: '10px', color: '#6B7280', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {e.action || '—'}
                            </div>
                            <select
                              value={lv}
                              onChange={ev => setEntries(p => p.map(x => x.id === e.id ? { ...x, actionLevel: ev.target.value } : x))}
                              style={{ background: '#111827', border: `1px solid ${lvColor}44`, borderRadius: '4px', color: lvColor, padding: '3px 6px', fontSize: '10px', cursor: 'pointer', minWidth: '180px' }}
                            >
                              <option value="">{t('analysis.normSelectPlaceholder')}</option>
                              <option value="design">{t('analysis.designLevel')}</option>
                              <option value="technical">{t('analysis.technicalLevel')}</option>
                              <option value="organisational">{t('analysis.orgLevel')}</option>
                            </select>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Podgląd 3 sekcji */}
                  <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {levelConfig.map(lc => (
                      <div key={lc.key} style={{ background: lc.bg, border: `1px solid ${lc.border}`, borderRadius: '8px', padding: '10px 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: lc.entries.length > 0 ? '8px' : '0' }}>
                          <span style={{ fontSize: '14px' }}>{lc.icon}</span>
                          <div>
                            <div style={{ fontSize: '11px', fontWeight: 700, color: lc.color }}>{lc.label}</div>
                            <div style={{ fontSize: '10px', color: '#6B7280' }}>{lc.desc}</div>
                          </div>
                          <span style={{ marginLeft: 'auto', background: lc.color + '22', color: lc.color, border: `1px solid ${lc.color}44`, borderRadius: '10px', padding: '1px 8px', fontSize: '10px', fontWeight: 700 }}>
                            {lc.entries.length}
                          </span>
                        </div>
                        {lc.entries.length > 0 && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {lc.entries.map(e => {
                              const lang2 = (localStorage.getItem('i18nextLng') || 'pl') as any
                              return (
                                <div key={e.id} style={{ display: 'flex', gap: '8px', fontSize: '10px', padding: '4px 0', borderTop: `1px solid ${lc.border}` }}>
                                  <span style={{ color: '#F0EDE8', fontWeight: 600, minWidth: '100px' }}>{translateRiskEntry(e, lang2).element}</span>
                                  <span style={{ color: '#8a99b0' }}>{e.action || '—'}</span>
                                </div>
                              )
                            })}
                          </div>
                        )}
                        {lc.entries.length === 0 && (
                          <div style={{ fontSize: '10px', color: '#4a5a72', fontStyle: 'italic' }}>{t('analysis.noAction')}</div>
                        )}
                      </div>
                    ))}
                    {unassigned.length > 0 && (
                      <div style={{ fontSize: '10px', color: '#E84040', padding: '6px 10px', background: 'rgba(232,64,64,.06)', borderRadius: '6px', border: '1px solid rgba(232,64,64,.2)' }}>
                        ⚠️ {t('analysis.unassignedWarning').replace('{n}', String(unassigned.length))}
                      </div>
                    )}
                  </div>
                </div>
              )
            })()}

            {entries.length > 0 && (
              <div style={{ background: '#111827', border: '1px solid #1e2d45', borderRadius: '10px', overflow: 'hidden', marginBottom: '20px' }}>
                <div style={{ padding: '10px 16px', borderBottom: '1px solid #1e2d45', fontSize: '10px', color: '#E8A838', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 600 }}>
                  {t('analysis.residualRisk')} <HelpLink section="residual" title="Instrukcja: Ryzyko resztkowe" /><InlineTip tipId="residual-risk" />
                </div>
                <div style={{ padding: '8px 16px 12px', borderBottom: '1px solid #1e2d45', fontSize: '11px', color: '#6B7280', lineHeight: 1.6 }}>
                  {t('analysis.residualDesc')}
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      {[t('analysis.colElement'), t('analysis.colAction'), t('analysis.residualEfficiency'), "S'", "P'", "R'", 'Poziom', t('analysis.residualAccept')].map((h, i) => (
                        <th key={i} style={{ textAlign: 'left', fontSize: '9px', color: '#8a99b0', padding: '8px 10px', borderBottom: '1px solid #1e2d45', textTransform: 'uppercase', letterSpacing: '.06em' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map(e => {
                      const level = e.reductionLevel || 'none'
                      const sugS = e.severity
                      const sugP = level === 'high' ? Math.max(e.probability - 2, 1) : level === 'medium' ? Math.max(e.probability - 1, 1) : e.probability
                      const resS = e.residualS ?? sugS
                      const resP = e.residualP ?? sugP
                      const resR = resS * resP
                      const resRisk = getRiskLevel(resS, resP)
                      const isAccepted = e.residualS != null && e.residualP != null
                      const lang = (localStorage.getItem('i18nextLng') || 'pl') as any
                      return (
                        <tr key={e.id} style={{ borderBottom: '1px solid rgba(30,45,69,.4)', background: isAccepted ? 'rgba(52,199,123,.02)' : 'transparent' }}>
                          <td style={{ padding: '8px 10px', fontSize: '11px', color: '#F0EDE8', maxWidth: '120px' }}>{translateRiskEntry(e, lang).element}</td>
                          <td style={{ padding: '8px 10px', fontSize: '10px', color: '#8a99b0', maxWidth: '130px' }}>{e.action}</td>
                          <td style={{ padding: '6px 8px' }}>
                            <select
                              value={level}
                              onChange={ev => {
                                const lv = ev.target.value
                                setEntries(p => p.map(x => x.id === e.id ? { ...x, reductionLevel: lv, residualS: null, residualP: null, residualR: null } : x))
                              }}
                              style={{ background: '#0B0F1A', border: '1px solid #1e2d45', borderRadius: '4px', color: '#F0EDE8', padding: '3px 6px', fontSize: '10px' }}
                            >
                              <option value="none">—</option>
                              <option value="high">🛡️ {t('analysis.residualHigh')} (P−2)</option>
                              <option value="medium">🔶 {t('analysis.residualMedium')} (P−1)</option>
                              <option value="low">📋 {t('analysis.residualLow')} (info)</option>
                            </select>
                          </td>
                          <td style={{ padding: '4px 6px' }}>
                            <input type="number" min={1} max={4}
                              value={e.residualS ?? ''}
                              placeholder={String(sugS)}
                              onChange={ev => {
                                const v = ev.target.value === '' ? null : Math.min(4, Math.max(1, Number(ev.target.value)))
                                setEntries(p => p.map(x => x.id === e.id ? { ...x, residualS: v, residualR: (v ?? sugS) * (x.residualP ?? sugP) } : x))
                              }}
                              style={{ width: '54px', background: '#0B0F1A', border: `1px solid ${e.residualS != null ? '#E8A838' : '#1e2d45'}`, borderRadius: '4px', color: e.residualS != null ? '#E8A838' : '#6B7280', padding: '4px 8px', fontSize: '12px', textAlign: 'center', fontFamily: 'monospace' }}
                            />
                          </td>
                          <td style={{ padding: '4px 6px' }}>
                            <input type="number" min={1} max={4}
                              value={e.residualP ?? ''}
                              placeholder={String(sugP)}
                              onChange={ev => {
                                const v = ev.target.value === '' ? null : Math.min(4, Math.max(1, Number(ev.target.value)))
                                setEntries(p => p.map(x => x.id === e.id ? { ...x, residualP: v, residualR: (x.residualS ?? sugS) * (v ?? sugP) } : x))
                              }}
                              style={{ width: '54px', background: '#0B0F1A', border: `1px solid ${e.residualP != null ? '#34C77B' : '#1e2d45'}`, borderRadius: '4px', color: e.residualP != null ? '#34C77B' : '#6B7280', padding: '4px 8px', fontSize: '12px', textAlign: 'center', fontFamily: 'monospace' }}
                            />
                          </td>
                          <td style={{ padding: '8px 6px', fontFamily: 'monospace', fontWeight: 700, color: riskColor(resRisk.cls) }}>{resR}</td>
                          <td style={{ padding: '6px 8px' }}>
                            <span style={{ background: riskBg(resRisk.cls), color: riskColor(resRisk.cls), border: `1px solid ${riskColor(resRisk.cls)}44`, padding: '2px 7px', borderRadius: '3px', fontSize: '10px', fontFamily: 'monospace' }}>{riskLabel(resRisk.cls)}</span>
                          </td>
                          <td style={{ padding: '4px 8px' }}>
                            {!isAccepted ? (
                              <button
                                onClick={() => setEntries(p => p.map(x => x.id === e.id ? { ...x, residualS: sugS, residualP: sugP, residualR: sugS * sugP } : x))}
                                title={`Zaakceptuj: S'=${sugS} P'=${sugP}`}
                                style={{ padding: '3px 8px', borderRadius: '4px', border: '1px solid rgba(52,199,123,.4)', background: 'rgba(52,199,123,.1)', color: '#34C77B', cursor: 'pointer', fontSize: '10px', whiteSpace: 'nowrap' }}
                              >✓ {sugS}×{sugP}={sugS*sugP}</button>
                            ) : (
                              <button
                                onClick={() => setEntries(p => p.map(x => x.id === e.id ? { ...x, residualS: null, residualP: null, residualR: null } : x))}
                                title="Wyczyść — wróć do sugestii"
                                style={{ padding: '3px 6px', borderRadius: '4px', border: '1px solid #1e2d45', background: 'transparent', color: '#4a5a72', cursor: 'pointer', fontSize: '10px' }}
                              >↺ reset</button>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* Panel walidacji */}
            {validationResult && showValidationDetail && (
              <ValidationPanel result={validationResult} showDetail={true} />
            )}
            {validationResult && !showValidationDetail && (validationResult.blocks.length > 0 || validationResult.warnings.length > 0) && (
              <div style={{ marginBottom: '12px' }}>
                <ValidationPanel result={validationResult} showDetail={false} />
                <button onClick={() => setShowValidationDetail(true)}
                  style={{ fontSize: '11px', color: '#8a99b0', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                  {t('analysis.showDetails')}
                </button>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => setStep(2)} style={{ padding: '11px 22px', borderRadius: '6px', border: '1px solid #1e2d45', background: 'transparent', color: '#8a99b0', cursor: 'pointer', fontSize: '13px' }}>{t('analysis.prevStep')}</button>
              <button
                onClick={() => saveDraft()}
                disabled={isSavingDraft}
                style={{ padding: '11px 18px', borderRadius: '6px', border: '1px solid #1e2d45', background: 'transparent', color: draftSaved ? '#34C77B' : '#8a99b0', cursor: 'pointer', fontSize: '12px' }}
              >
                {isSavingDraft ? '...' : draftSaved ? '✓ Zapisano' : '🚧 Zapisz szkic'}
              </button>
              <button onClick={() => {
                // Blokada: brak S lub P (null/0)
                const missingSP = entries.filter(e => !e.severity || !e.probability)
                if (missingSP.length > 0) {
                  alert(t('analysis.alertMissingSP').replace('{n}', String(missingSP.length)))
                  return
                }
                const missingJust = entries.some(e => !e.justificationS || !e.justificationP)
                if (missingJust) { alert(t('analysis.alertMissingJust')); return; }
                const missingLC = entries.some(e => !e.lifecycleStages || e.lifecycleStages.length === 0)
                if (missingLC) { alert(t('analysis.alertMissingLC')); return; }

                // Uruchom walidację
                const result = validateAnalysis(
                  entries,
                  {
                    machineLimitsIntended: form.intendedUse,
                    machineLimitsForeseeable: form.foreseeableMisuse,
                    machineLimitsSpatial: form.spatialLimits,
                    machineLimitsTime: form.timeLimits,
                    machineTypeId: form.machineTypeId,
                  },
                  form.machineCategory
                )
                setValidationResult(result)
                setShowValidationDetail(result.blocks.length > 0)

                // Blokady zatrzymują przejście
                if (result.blocks.length > 0) {
                  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
                  return
                }

                setShowReflectionModal(true)
              }} style={{ padding: '11px 28px', borderRadius: '6px', border: 'none', background: '#E8A838', color: '#0B0F1A', cursor: 'pointer', fontSize: '13px', fontWeight: 700 }}>{t('analysis.nextStep')}</button>
            </div>

            {/* Modal zatrzymania — moment refleksji przed krokiem 4 */}
            {showReflectionModal && (
              <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                <div style={{ background: '#111827', border: '1px solid #1e2d45', borderRadius: '14px', padding: '32px', maxWidth: '540px', width: '100%' }}>
                  <div style={{ fontSize: '28px', textAlign: 'center', marginBottom: '12px' }}>🛑</div>
                  <h2 style={{ color: '#F0EDE8', fontFamily: 'Georgia, serif', fontSize: '20px', textAlign: 'center', marginBottom: '8px' }}>
                    {t('analysis.reflectionTitle')}
                  </h2>
                  <p style={{ color: '#8a99b0', fontSize: '13px', textAlign: 'center', lineHeight: 1.7, marginBottom: '24px' }}>
                    Zanim przejdziesz dalej — odpowiedz szczerze na kilka pytań. Nie ma tu złych odpowiedzi. Chodzi o to, żebyś świadomie podjął dalszy krok.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                    {[
                      t('analysis.reflectionQ1'),
                      t('analysis.reflectionQ2'),
                      t('analysis.reflectionQ3'),
                      t('analysis.reflectionQ4'),
                    ].map((q, i) => (
                      <div key={i} style={{ display: 'flex', gap: '10px', padding: '10px 14px', background: '#0B0F1A', borderRadius: '8px', border: '1px solid #1e2d45' }}>
                        <span style={{ color: '#E8A838', fontWeight: 700, fontSize: '13px', flexShrink: 0 }}>{i + 1}.</span>
                        <span style={{ fontSize: '12px', color: '#C0C8D8', lineHeight: 1.6 }}>{q}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: 'rgba(232,168,56,.08)', border: '1px solid rgba(232,168,56,.2)', borderRadius: '8px', padding: '12px 16px', marginBottom: '20px', fontSize: '12px', color: '#8a99b0', lineHeight: 1.6 }}>
                    {t('analysis.reflectionWarning')} Raport PDF jest tak dobry jak dane które do niego wpisałeś.
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => setShowReflectionModal(false)} style={{ flex: 1, padding: '11px', borderRadius: '6px', border: '1px solid #1e2d45', background: 'transparent', color: '#8a99b0', cursor: 'pointer', fontSize: '13px' }}>
                      {t('analysis.reflectionBack')}
                    </button>
                    <button onClick={() => {
                      setShowReflectionModal(false)
                      // Autouzupełnij "Opracował" jeśli puste
                      if (!approval.preparedBy && user?.name) {
                        setApproval(p => ({ ...p, preparedBy: user.name }))
                      }
                      setStep(4)
                    }} style={{ flex: 2, padding: '11px', borderRadius: '6px', border: 'none', background: '#E8A838', color: '#0B0F1A', cursor: 'pointer', fontSize: '13px', fontWeight: 700 }}>
                      {t('analysis.reflectionNext')}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div>
                <h2 style={{ color: '#F0EDE8', fontFamily: 'Georgia, serif', fontSize: '24px', marginBottom: '6px' }}>{isEditMode ? (t('analysis.editAnalysis') || t('analysis.editAnalysis')) : t('analysis.step4')}<HelpLink section="step4" title="Instrukcja: Krok 4 — Zapis i PDF" /></h2>
                <p style={{ color: '#8a99b0', fontSize: '13px' }}>{t('analysis.step4Desc')}</p>
              </div>
              {hasAnyPlan(user) && (
                <button onClick={() => window.print()} style={{ padding: '9px 18px', borderRadius: '6px', border: '1px solid #1e2d45', background: 'transparent', color: '#E8A838', cursor: 'pointer', fontSize: '12px' }}>🖨 {t('analysis.print')}</button>
              )}
            </div>

            {/* Termometr pewności */}
            {(() => {
              const total = entries.length
              const hasJustS = entries.filter(e => e.justificationS && e.justificationS.length > 10).length
              const hasJustP = entries.filter(e => e.justificationP && e.justificationP.length > 10).length
              const hasPlrJust = entries.filter(e => e.plrJustification && e.plrJustification.length > 5).length
              const hasResidual = entries.filter(e => e.residualS != null && e.residualP != null).length
              const hasActionLevel = entries.filter(e => e.actionLevel).length
              const hasLifecycle = entries.filter(e => e.lifecycleStages && (e.lifecycleStages as any).length > 0).length
              const score = total === 0 ? 0 : Math.round(
                ((hasJustS / total) * 25 + (hasJustP / total) * 25 + (hasPlrJust / total) * 15 +
                 (hasResidual / total) * 15 + (hasActionLevel / total) * 10 + (hasLifecycle / total) * 10)
              )
              const color = score >= 80 ? '#34C77B' : score >= 50 ? '#F59E0B' : '#E84040'
              const label = score >= 80 ? t('analysis.credibilityHigh') : score >= 50 ? t('analysis.credibilityMed') : t('analysis.credibilityLow')
              return (
                <div style={{ background: '#111827', border: `1px solid ${color}33`, borderRadius: '10px', padding: '16px 20px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <div>
                      <div style={{ fontSize: '10px', color: '#8a99b0', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '3px' }}>{t('analysis.credibilityLabel')}</div>
                      <div style={{ fontSize: '13px', color, fontWeight: 600 }}>{label}</div>
                    </div>
                    <div style={{ fontSize: '32px', fontWeight: 900, color, fontFamily: 'monospace' }}>{score}%</div>
                  </div>
                  <div style={{ background: '#0B0F1A', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
                    <div style={{ width: `${score}%`, height: '100%', background: color, borderRadius: '4px', transition: 'width .5s ease' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '16px', marginTop: '10px', flexWrap: 'wrap' }}>
                    {[
                      { label: 'Uzasadnienia S', val: hasJustS, max: total, w: 25 },
                      { label: 'Uzasadnienia P', val: hasJustP, max: total, w: 25 },
                      { label: t('analysis.plrSuggestion'), val: hasPlrJust, max: total, w: 15 },
                      { label: 'Ryzyko resztkowe', val: hasResidual, max: total, w: 15 },
                      { label: t('analysis.hierarchyTitle').split('—')[0].trim(), val: hasActionLevel, max: total, w: 10 },
                      { label: t('analysis.lifecycleTitle'), val: hasLifecycle, max: total, w: 10 },
                    ].map(item => (
                      <div key={item.label} style={{ fontSize: '10px', color: item.val === item.max ? '#34C77B' : '#8a99b0' }}>
                        {item.val === item.max ? '✓' : `${item.val}/${item.max}`} {item.label}
                      </div>
                    ))}
                  </div>
                  {score < 80 && (
                    <div style={{ marginTop: '10px', fontSize: '11px', color: '#6B7280', borderTop: '1px solid #1e2d45', paddingTop: '8px' }}>
                      💡 Wróć do kroku 3 i uzupełnij brakujące elementy — zwiększysz jakość i wiarygodność analizy.
                    </div>
                  )}
                </div>
              )
            })()}

            {(form.clientCompany || form.clientName) && (
              <div style={{ background: '#111827', border: '1px solid #1e2d45', borderRadius: '10px', padding: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontFamily: 'Georgia, serif', fontSize: '18px', color: '#F0EDE8', marginBottom: '4px' }}>{form.clientCompany || form.clientName}</div>
                  <div style={{ fontSize: '12px', color: '#8a99b0', lineHeight: 1.7 }}>
                    {form.clientName && <div>{form.clientName}</div>}
                    {form.clientNip && <div>NIP: {form.clientNip}</div>}
                    {form.clientAddress && <div>{form.clientAddress}</div>}
                  </div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '12px', color: '#8a99b0' }}>
                  <div>{t('analysis.analysisDate')}: {form.analysisDate}</div>
                  <div>{t('analysis.analystName')}: {form.analystName}</div>
                  <div>{t('analysis.norm')}: {form.norm}</div>
                </div>
              </div>
            )}

            {(() => {
              const high = entries.filter(e => getRiskLevel(e.severity, e.probability).cls === 'high')
              const med  = entries.filter(e => getRiskLevel(e.severity, e.probability).cls === 'med')
              const low  = entries.filter(e => ['low','neg'].includes(getRiskLevel(e.severity, e.probability).cls))
              return (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px', marginBottom: '20px' }}>
                    {[
                      { l: t('analysis.statsTotal'), v: entries.length, c: '#F0EDE8' },
                      { l: t('analysis.statsHigh'),  v: high.length,    c: '#E84040' },
                      { l: t('analysis.statsMed'),   v: med.length,     c: '#F59E0B' },
                      { l: t('analysis.statsLow'),   v: low.length,     c: '#34C77B' },
                    ].map((s, i) => (
                      <div key={i} style={{ background: '#111827', border: '1px solid #1e2d45', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
                        <div style={{ fontFamily: 'Georgia, serif', fontSize: '32px', color: s.c }}>{s.v}</div>
                        <div style={{ fontSize: '10px', color: '#8a99b0', marginTop: '4px' }}>{s.l}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ background: '#111827', border: '1px solid #1e2d45', borderRadius: '10px', padding: '20px', marginBottom: '20px' }}>
                    <div style={{ fontSize: '10px', color: '#8a99b0', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '14px' }}>{t('analysis.riskMatrixTitle')}</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '80px repeat(4,1fr)', gap: '3px', maxWidth: '480px' }}>
                      <div />
                      {['S=1','S=2','S=3','S=4'].map(l => <div key={l} style={{ textAlign: 'center', fontSize: '10px', color: '#8a99b0', fontFamily: 'monospace', padding: '4px' }}>{l}</div>)}
                      {[4,3,2,1].map(pi => (
                        <>
                          <div key={'l'+pi} style={{ fontSize: '10px', color: '#8a99b0', fontFamily: 'monospace', display: 'flex', alignItems: 'center' }}>P={pi}</div>
                          {[1,2,3,4].map(si => {
                            const r = si*pi; const cls = r>=12?'high':r>=6?'med':r>=3?'low':'neg'
                            const cnt = entries.filter(e => e.severity===si && e.probability===pi).length
                            return (
                              <div key={si} style={{ background: riskBg(cls), borderRadius: '4px', height: '44px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px' }}>
                                <span style={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 700, color: riskColor(cls) }}>{r}</span>
                                {cnt > 0 && <span style={{ background: 'rgba(0,0,0,.4)', borderRadius: '8px', padding: '0 5px', fontSize: '9px', color: '#F0EDE8' }}>×{cnt}</span>}
                              </div>
                            )
                          })}
                        </>
                      ))}
                    </div>
                  </div>

                  {entries.length > 0 && (
                    <div style={{ background: '#111827', border: '1px solid #1e2d45', borderRadius: '10px', overflow: 'hidden', marginBottom: '20px' }}>
                      <div style={{ padding: '10px 16px', borderBottom: '1px solid #1e2d45', fontSize: '10px', color: '#8a99b0', textTransform: 'uppercase', letterSpacing: '.08em' }}>{t('analysis.fullTable')}</div>
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr>
                            {[t('analysis.colElement'), t('analysis.colThreat'), t('analysis.colEffect'), 'S', 'P', 'R', t('analysis.colLevel'), t('analysis.colProtective')].map((h, i) => (
                              <th key={i} style={{ textAlign: 'left', fontSize: '9px', color: '#8a99b0', padding: '8px 10px', borderBottom: '1px solid #1e2d45', textTransform: 'uppercase', letterSpacing: '.06em' }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {entries.map(e => {
                            const risk = getRiskLevel(e.severity, e.probability)
                            return (
                              <tr key={e.id} style={{ borderBottom: '1px solid rgba(30,45,69,.4)' }}>
                                <td style={{ padding: '8px 10px', fontSize: '12px', fontWeight: 600 }}>{translateRiskEntry(e, (localStorage.getItem('i18nextLng') || 'pl') as any).element}</td>
                                <td style={{ padding: '8px 10px', fontSize: '11px', color: '#8a99b0' }}>{translateRiskEntry(e, (localStorage.getItem('i18nextLng') || 'pl') as any).threat}</td>
                                <td style={{ padding: '8px 10px', fontSize: '11px' }}>{translateRiskEntry(e, (localStorage.getItem('i18nextLng') || 'pl') as any).effect}</td>
                                <td style={{ padding: '8px 10px', fontFamily: 'monospace', textAlign: 'center' }}>{e.severity}</td>
                                <td style={{ padding: '8px 10px', fontFamily: 'monospace', textAlign: 'center' }}>{e.probability}</td>
                                <td style={{ padding: '8px 10px', fontFamily: 'monospace', fontWeight: 700, color: riskColor(risk.cls) }}>{risk.r}</td>
                                <td style={{ padding: '8px 10px' }}>
                                  <span style={{ background: riskBg(risk.cls), color: riskColor(risk.cls), border: `1px solid ${riskColor(risk.cls)}44`, padding: '2px 7px', borderRadius: '3px', fontSize: '10px', fontFamily: 'monospace' }}>{riskLabel(risk.cls)}</span>
                                </td>
                                <td style={{ padding: '8px 10px', fontSize: '11px', color: '#8a99b0' }}>{e.action}</td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}

                  <div style={{ background: '#111827', border: '1px solid #1e2d45', borderRadius: '10px', padding: '20px', marginBottom: '24px' }}>
                    {entries.filter(e => e.reductionLevel && e.reductionLevel !== 'none').length > 0 && (
              <div style={{ background: '#111827', border: '1px solid rgba(232,168,56,.25)', borderRadius: '10px', overflow: 'hidden', marginBottom: '20px' }}>
                <div style={{ padding: '10px 16px', borderBottom: '1px solid #1e2d45', background: 'rgba(232,168,56,.06)' }}>
                  <span style={{ fontSize: '10px', color: '#E8A838', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 600 }}>
                    {t('analysis.residualRisk')}
                  </span>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      {[t('analysis.colElement'), t('analysis.colAction'), t('analysis.residualReduction') || 'Redukcja', 'S', "P'", "R'", t('analysis.colLevel')].map((h, i) => (
                        <th key={i} style={{ textAlign: 'left', fontSize: '9px', color: '#8a99b0', padding: '8px 10px', borderBottom: '1px solid #1e2d45', textTransform: 'uppercase', letterSpacing: '.06em' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {entries.filter(e => e.reductionLevel && e.reductionLevel !== 'none').sort((a, b) => (b.severity*b.probability)-(a.severity*a.probability)).map((e, idx) => {
                      const resS = e.residualS ?? e.severity;
                      const resP = e.residualP ?? e.probability;
                      const resR = e.residualR ?? (resS * resP);
                      const resRisk = getRiskLevel(resS, resP);
                      const lang2 = (localStorage.getItem('i18nextLng') || 'pl') as any;
                      const reductionLabel = e.reductionLevel === 'high' ? (t('analysis.reductionHigh') || 'Wysoki') : e.reductionLevel === 'medium' ? (t('analysis.reductionMedium') || 'Średnio') : (t('analysis.reductionLow') || 'Niski');
                      return (
                        <tr key={e.id} style={{ borderBottom: '1px solid rgba(30,45,69,.4)', background: idx%2===0?'transparent':'rgba(255,255,255,.01)' }}>
                          <td style={{ padding: '8px 10px', fontSize: '12px', fontWeight: 600, color: '#F0EDE8', maxWidth: '130px' }}>{translateRiskEntry(e, lang2).element}</td>
                          <td style={{ padding: '8px 10px', fontSize: '11px', color: '#8a99b0', maxWidth: '160px' }}>{e.action}</td>
                          <td style={{ padding: '8px 10px', fontSize: '10px', color: '#34C77B', whiteSpace: 'nowrap' }}>{reductionLabel}</td>
                          <td style={{ padding: '8px 10px', fontFamily: 'monospace', fontWeight: 700, textAlign: 'center', color: '#F0EDE8' }}>{resS}</td>
                          <td style={{ padding: '8px 10px', fontFamily: 'monospace', fontWeight: 700, textAlign: 'center', color: '#34C77B' }}>{resP}</td>
                          <td style={{ padding: '8px 10px', fontFamily: 'monospace', fontWeight: 700, textAlign: 'center', color: riskColor(resRisk.cls) }}>{resR}</td>
                          <td style={{ padding: '8px 10px' }}>
                            <span style={{ background: riskBg(resRisk.cls), color: riskColor(resRisk.cls), border: `1px solid ${riskColor(resRisk.cls)}44`, padding: '2px 7px', borderRadius: '3px', fontSize: '10px', fontFamily: 'monospace' }}>{riskLabel(resRisk.cls)}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
            <div style={{ fontSize: '10px', color: '#8a99b0', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '14px' }}>{t('analysis.conclusionsTitle')}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {high.length > 0 && <div style={{ background: 'rgba(232,64,64,.08)', border: '1px solid rgba(232,64,64,.2)', borderRadius: '6px', padding: '10px 14px', fontSize: '13px' }}><strong style={{ color: '#E84040' }}>🔴 {t('analysis.criticalLabel')}:</strong> {high.length} {t('analysis.criticalText')}</div>}
                      {med.length > 0 && <div style={{ background: 'rgba(245,158,11,.08)', border: '1px solid rgba(245,158,11,.2)', borderRadius: '6px', padding: '10px 14px', fontSize: '13px' }}><strong style={{ color: '#F59E0B' }}>🟡 {t('analysis.warningLabel')}:</strong> {med.length} {t('analysis.warningText')}</div>}
                      {low.length > 0 && <div style={{ background: 'rgba(52,199,123,.08)', border: '1px solid rgba(52,199,123,.2)', borderRadius: '6px', padding: '10px 14px', fontSize: '13px' }}><strong style={{ color: '#34C77B' }}>🟢 {t('analysis.acceptableLabel')}:</strong> {low.length} {t('analysis.acceptableText')}</div>}
                      <div style={{ background: '#1a2235', borderRadius: '6px', padding: '12px 16px', fontSize: '12px', color: '#8a99b0', lineHeight: 1.7 }}>
                        <strong style={{ color: '#F0EDE8' }}>{t('analysis.method3step')}</strong><br />
                        1. <strong style={{ color: '#F0EDE8' }}>{t('analysis.m1title')}</strong> {t('analysis.m1')}<br />
                        2. <strong style={{ color: '#F0EDE8' }}>{t('analysis.m2title')}</strong> {t('analysis.m2')}<br />
                        3. <strong style={{ color: '#F0EDE8' }}>{t('analysis.m3title')}</strong> {t('analysis.m3')}
                      </div>
                    </div>
                  </div>
                </>
              )
            })()}

            {entries.length > 0 && (
              <div style={{ background: '#111827', border: '1px solid #1e2d45', borderRadius: '10px', overflow: 'hidden', marginBottom: '20px' }}>
                <div style={{ padding: '10px 16px', borderBottom: '1px solid #1e2d45', background: 'rgba(52,199,123,.06)' }}>
                  <span style={{ fontSize: '10px', color: '#34C77B', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 600 }}>
                    {t('analysis.plrTitle')} <HelpLink section="plr" title="Instrukcja: PLr — ISO 13849-1" />
                  </span>
                </div>
                <div style={{ padding: '10px 16px 14px', borderBottom: '1px solid #1e2d45', fontSize: '11px', color: '#6B7280', lineHeight: 1.6 }}>
                  {t('analysis.plrDesc')}
                </div>
                {/* Legenda P1/P2 */}
                <div style={{ padding: '8px 16px', borderBottom: '1px solid #1e2d45', display: 'flex', gap: '24px', background: 'rgba(11,15,26,.5)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ background: '#16345244', border: '1px solid #34C77B44', color: '#34C77B', borderRadius: '4px', padding: '1px 8px', fontSize: '10px', fontFamily: 'monospace', fontWeight: 700 }}>P1</span>
                    <span style={{ fontSize: '10px', color: '#6B7280' }}>{t('analysis.plrP1Desc')}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ background: '#E8404022', border: '1px solid #E8404044', color: '#E84040', borderRadius: '4px', padding: '1px 8px', fontSize: '10px', fontFamily: 'monospace', fontWeight: 700 }}>P2</span>
                    <span style={{ fontSize: '10px', color: '#6B7280' }}>{t('analysis.plrP2Desc')}</span>
                  </div>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      {[
                        'Element', 'S', 'F',
                        'P (wybierz)', 'Uzasadnienie wyboru P',
                        t('analysis.plrSuggestion'), t('analysis.plrCorrection'), t('analysis.plrAchieved'),
                        ...['Kategoria']
                      ].map((h, i) => (
                        <th key={i} style={{ textAlign: 'left', fontSize: '9px', color: '#8a99b0', padding: '8px 10px', borderBottom: '1px solid #1e2d45', textTransform: 'uppercase', letterSpacing: '.06em', whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((e) => {
                      const lang2 = (localStorage.getItem('i18nextLng') || 'pl') as any;
                      const sParam = e.severity >= 3 ? 'S2' : 'S1';
                      const effectiveP = e.residualP ?? e.probability;
                      const fParam = effectiveP >= 3 ? 'F2' : 'F1';
                      const pParam = e.plrP || 'P2';
                      const pConfirmed = !!e.plrP; // czy użytkownik świadomie wybrał
                      const plrMap: Record<string, string> = {
                        'S1-F1-P1': 'a', 'S1-F1-P2': 'b', 'S1-F2-P1': 'b', 'S1-F2-P2': 'c',
                        'S2-F1-P1': 'c', 'S2-F1-P2': 'd', 'S2-F2-P1': 'd', 'S2-F2-P2': 'e',
                      };
                      const catSuggestion: Record<string, string> = {
                        'a': 'B lub 1', 'b': '1 lub 2', 'c': '2 lub 3', 'd': '3', 'e': '4'
                      };
                      const plrAuto = plrMap[`${sParam}-${fParam}-${pParam}`] || 'b';
                      const plrColor = (pl: string) => pl === 'e' ? '#E84040' : pl === 'd' ? '#F59E0B' : pl === 'c' ? '#E8A838' : '#34C77B';
                      const pColor = pParam === 'P1' ? '#34C77B' : '#E84040';
                      return (
                        <>
                        <tr key={e.id} style={{ borderBottom: e.plrJustification ? 'none' : '1px solid rgba(30,45,69,.4)' }}>
                          <td style={{ padding: '7px 10px', fontSize: '11px', fontWeight: 600, color: '#F0EDE8', maxWidth: '110px' }}>{translateRiskEntry(e, lang2).element}</td>
                          <td style={{ padding: '7px 10px', fontSize: '11px', color: '#8a99b0', fontFamily: 'monospace' }}>{sParam}</td>
                          <td style={{ padding: '7px 10px' }}>
                            <span style={{ fontSize: '11px', fontFamily: 'monospace', color: e.residualP != null ? '#34C77B' : '#8a99b0' }}>{fParam}</span>
                            {e.residualP != null && (
                              <div style={{ fontSize: '8px', color: '#34C77B', marginTop: '1px' }}>po redukcji</div>
                            )}
                          </td>
                          {/* P toggle — dostępny dla wszystkich */}
                          <td style={{ padding: '7px 10px' }}>
                            <div style={{ display: 'flex', gap: '4px' }}>
                              {['P1', 'P2'].map(pVal => (
                                <button
                                  key={pVal}
                                  onClick={() => setEntries(p => p.map(x => x.id === e.id ? { ...x, plrP: pVal } : x))}
                                  style={{
                                    padding: '2px 8px', borderRadius: '4px', fontSize: '10px',
                                    fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer',
                                    border: `1px solid ${pParam === pVal ? pColor + '88' : '#1e2d45'}`,
                                    background: pParam === pVal ? pColor + '22' : 'transparent',
                                    color: pParam === pVal ? pColor : '#4a5a72',
                                    transition: 'all .15s',
                                  }}
                                >{pVal}</button>
                              ))}
                              {!pConfirmed && (
                                <span style={{ fontSize: '9px', color: '#F59E0B', alignSelf: 'center', marginLeft: '2px' }} title="Domyślnie P2 — potwierdź wybór">⚠</span>
                              )}
                            </div>
                          </td>
                          {/* Uzasadnienie P — inline, wymagane */}
                          <td style={{ padding: '4px 6px', minWidth: '180px' }}>
                            <input
                              value={e.plrJustification || ''}
                              onChange={ev => setEntries(p => p.map(x => x.id === e.id ? { ...x, plrJustification: ev.target.value } : x))}
                              placeholder={pParam === 'P1' ? t('analysis.plrP1Placeholder') : t('analysis.plrP2Placeholder')}
                              style={{
                                width: '100%', background: 'transparent',
                                border: 'none', borderBottom: `1px solid ${e.plrJustification ? '#1e2d45' : '#F59E0B55'}`,
                                color: e.plrJustification ? '#8a99b0' : '#6B7280',
                                fontSize: '10px', padding: '2px 0', outline: 'none',
                              }}
                            />
                          </td>
                          {/* PLr sugestia */}
                          <td style={{ padding: '7px 10px' }}>
                            <span style={{ background: `${plrColor(plrAuto)}22`, color: plrColor(plrAuto), border: `1px solid ${plrColor(plrAuto)}44`, padding: '2px 8px', borderRadius: '3px', fontSize: '11px', fontWeight: 700, fontFamily: 'monospace' }}>
                              PL {plrAuto.toUpperCase()}
                            </span>
                            {!pConfirmed && <div style={{ fontSize: '8px', color: '#F59E0B', marginTop: '2px' }}>sugestia (P2)</div>}
                          </td>
                          <td style={{ padding: '7px 10px' }}>
                            <input value={e.plrManual || ''} onChange={ev => setEntries(p => p.map(x => x.id === e.id ? { ...x, plrManual: ev.target.value } : x))}
                              placeholder="a-e"
                              style={{ width: '44px', background: '#0B0F1A', border: '1px solid #1e2d45', borderRadius: '4px', color: '#E8A838', padding: '3px 6px', fontSize: '11px', textAlign: 'center', fontFamily: 'monospace' }} />
                          </td>
                          <td style={{ padding: '7px 10px' }}>
                            <input value={e.plAchieved || ''} onChange={ev => setEntries(p => p.map(x => x.id === e.id ? { ...x, plAchieved: ev.target.value } : x))}
                              placeholder="a-e"
                              style={{ width: '44px', background: '#0B0F1A', border: '1px solid #1e2d45', borderRadius: '4px', color: '#34C77B', padding: '3px 6px', fontSize: '11px', textAlign: 'center', fontFamily: 'monospace' }} />
                          </td>
                          <td style={{ padding: '7px 10px' }}>
                              <select value={e.plCategory || ''} onChange={ev => setEntries(p => p.map(x => x.id === e.id ? { ...x, plCategory: ev.target.value } : x))}
                                style={{ background: '#0B0F1A', border: '1px solid #1e2d45', borderRadius: '4px', color: '#F0EDE8', padding: '2px 4px', fontSize: '10px' }}>
                                <option value="">—</option>
                                {['B','1','2','3','4'].map(v => <option key={v} value={v}>Kat. {v}</option>)}
                              </select>
                            </td>
                        </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
                <div style={{ padding: '10px 16px', borderTop: '1px solid #1e2d45', fontSize: '10px', color: '#4a5a72', lineHeight: 1.6 }}>
                  {t('analysis.plrFootnote')}eczeństwa lub producenta maszyny.
                </div>
              </div>
            )}
<div style={{ background: '#111827', border: `1px solid ${(!approval.preparedBy || !approval.approvedBy) ? 'rgba(232,64,64,.4)' : '#1e2d45'}`, borderRadius: '10px', padding: '20px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ fontSize: '10px', color: '#E8A838', textTransform: 'uppercase', letterSpacing: '.1em', fontWeight: 600 }}>
                  {t('analysis.responsibilityTitle')}
                </div>
                {(!approval.preparedBy || !approval.approvedBy) && (
                  <span style={{ fontSize: '10px', color: '#E84040' }}>* wymagane do zapisu</span>
                )}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '16px' }}>
                {/* Opracował */}
                <div style={{ background: '#0B0F1A', borderRadius: '8px', padding: '14px', border: `1px solid ${approval.preparedBy ? '#1e2d45' : 'rgba(232,64,64,.4)'}` }}>
                  <div style={{ fontSize: '10px', color: '#34C77B', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '12px', fontWeight: 600 }}>{t('analysis.preparedBy')} *</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div>
                      <div style={{ fontSize: '9px', color: '#6B7280', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '.06em' }}>Imię i nazwisko *</div>
                      <input
                        value={approval.preparedBy}
                        onChange={ev => setApproval(p => ({ ...p, preparedBy: ev.target.value }))}
                        placeholder={form.analystName || t('analysis.preparedByPlaceholder')}
                        style={{ width: '100%', background: '#111827', border: `1px solid ${approval.preparedBy ? '#1e2d45' : 'rgba(232,64,64,.5)'}`, borderRadius: '4px', color: '#F0EDE8', padding: '6px 10px', fontSize: '12px', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <div style={{ fontSize: '9px', color: '#6B7280', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '.06em' }}>Stanowisko</div>
                      <input
                        value={approval.preparedRole}
                        onChange={ev => setApproval(p => ({ ...p, preparedRole: ev.target.value }))}
                        placeholder={t('analysis.preparedRolePlaceholder')}
                        style={{ width: '100%', background: '#111827', border: '1px solid #1e2d45', borderRadius: '4px', color: '#F0EDE8', padding: '6px 10px', fontSize: '12px', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>
                </div>
                {/* Zatwierdził */}
                <div style={{ background: '#0B0F1A', borderRadius: '8px', padding: '14px', border: `1px solid ${approval.approvedBy ? '#1e2d45' : 'rgba(232,64,64,.4)'}` }}>
                  <div style={{ fontSize: '10px', color: '#E8A838', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '12px', fontWeight: 600 }}>{t('analysis.approvedBy')} *</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div>
                      <div style={{ fontSize: '9px', color: '#6B7280', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '.06em' }}>Imię i nazwisko *</div>
                      <input
                        value={approval.approvedBy}
                        onChange={ev => setApproval(p => ({ ...p, approvedBy: ev.target.value }))}
                        placeholder={t('analysis.approvedByPlaceholder')}
                        style={{ width: '100%', background: '#111827', border: `1px solid ${approval.approvedBy ? '#1e2d45' : 'rgba(232,64,64,.5)'}`, borderRadius: '4px', color: '#F0EDE8', padding: '6px 10px', fontSize: '12px', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <div style={{ fontSize: '9px', color: '#6B7280', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '.06em' }}>Stanowisko</div>
                      <input
                        value={approval.approvedRole}
                        onChange={ev => setApproval(p => ({ ...p, approvedRole: ev.target.value }))}
                        placeholder={t('analysis.approvedRolePlaceholder')}
                        style={{ width: '100%', background: '#111827', border: '1px solid #1e2d45', borderRadius: '4px', color: '#F0EDE8', padding: '6px 10px', fontSize: '12px', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <div style={{ fontSize: '9px', color: '#6B7280', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '.06em' }}>Data zatwierdzenia</div>
                      <input
                        type="date"
                        value={approval.approvedDate}
                        onChange={ev => setApproval(p => ({ ...p, approvedDate: ev.target.value }))}
                        style={{ width: '100%', background: '#111827', border: '1px solid #1e2d45', borderRadius: '4px', color: '#F0EDE8', padding: '6px 10px', fontSize: '12px', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Wymagane załączniki do dokumentacji CE */}
              <div style={{ background: '#111827', border: '1px solid #1e2d45', borderRadius: '10px', padding: '18px 20px', marginBottom: '16px' }}>
                <div style={{ fontSize: '10px', color: '#E8A838', textTransform: 'uppercase', letterSpacing: '.1em', fontWeight: 700, marginBottom: '12px' }}>
                  {t('analysis.ceAttachments')}
                </div>
                <div style={{ fontSize: '11px', color: '#6B7280', lineHeight: 1.7, marginBottom: '14px' }}>
                  Zgodnie z <strong style={{ color: '#C0C8D8' }}>Dyrektywą Maszynową 2006/42/WE Zał. VII</strong> — do oceny ryzyka należy dołączyć dokumenty potwierdzające zastosowane środki ochronne. Poniższa lista stanowi przypomnienie — nie jest weryfikowana przez system.
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                  {[
                    { icon: '🔊', label: 'Protokół pomiaru hałasu', norm: 'wg EN ISO 9614, PN-EN 3746' },
                    { icon: '📳', label: 'Protokół pomiaru drgań mechanicznych', norm: 'wg EN ISO 5349, EN ISO 8041' },
                    { icon: '⚡', label: 'Certyfikat komponentów bezpieczeństwa', norm: 'np. kurtyna PL d/e, skaner, blokada' },
                    { icon: '🛡️', label: 'Deklaracja zgodności środka ochronnego', norm: 'zgodnie z Dyrektywą 2006/42/WE' },
                    { icon: '🔌', label: 'Raport z badań EMC / elektrycznych', norm: 'EN 60204-1, dyrektywa 2014/30/UE' },
                    { icon: '🧪', label: 'Badania substancji niebezpiecznych', norm: 'jeśli dotyczy — REACH, CLP' },
                    { icon: '📐', label: 'Rysunki techniczne stref niebezpiecznych', norm: 'EN ISO 13857 — odległości bezp.' },
                    { icon: '📋', label: 'Protokoły z testów funkcjonalnych', norm: 'weryfikacja PLr, zatrzymanie awaryjne' },
                    { icon: '🎓', label: 'Potwierdzenia szkoleń operatorów', norm: 'jeśli środek = szkolenia / ŚOI' },
                    { icon: '📄', label: 'Instrukcja obsługi maszyny', norm: 'wymagana zgodnie z Zał. I pkt 1.7.4' },
                  ].map(item => (
                    <div key={item.label} style={{ display: 'flex', gap: '8px', padding: '7px 10px', background: '#0B0F1A', borderRadius: '6px', border: '1px solid #1e2d45' }}>
                      <span style={{ fontSize: '14px', flexShrink: 0 }}>{item.icon}</span>
                      <div>
                        <div style={{ fontSize: '11px', color: '#C0C8D8', fontWeight: 600 }}>{item.label}</div>
                        <div style={{ fontSize: '9px', color: '#4a5a72', fontFamily: 'monospace', marginTop: '1px' }}>{item.norm}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '12px', padding: '8px 12px', background: 'rgba(232,168,56,.08)', border: '1px solid rgba(232,168,56,.2)', borderRadius: '6px', fontSize: '10px', color: '#8a99b0', lineHeight: 1.6 }}>
                  ⚠️ {t('analysis.ceAttachmentsDesc')}
                </div>
              </div>

              {/* Checkbox potwierdzenia */}
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', padding: '12px 14px', background: approval.confirmed ? 'rgba(52,199,123,.06)' : 'rgba(232,64,64,.06)', borderRadius: '6px', border: `1px solid ${approval.confirmed ? 'rgba(52,199,123,.3)' : 'rgba(232,64,64,.3)'}` }}>
                <input
                  type="checkbox"
                  checked={approval.confirmed}
                  onChange={ev => setApproval(p => ({ ...p, confirmed: ev.target.checked }))}
                  style={{ accentColor: '#34C77B', width: '16px', height: '16px', marginTop: '1px', flexShrink: 0 }}
                />
                <span style={{ fontSize: '11px', color: approval.confirmed ? '#34C77B' : '#E84040', lineHeight: 1.6 }}>
                  {t('analysis.confirmData')} PN-EN ISO 12100:2012 i zawiera rzetelne informacje o zagrożeniach i środkach ochronnych dla ocenianej maszyny.
                </span>
              </label>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => setStep(3)} style={{ padding: '11px 22px', borderRadius: '6px', border: '1px solid #1e2d45', background: 'transparent', color: '#8a99b0', cursor: 'pointer', fontSize: '13px' }}>{t('analysis.prevStep')}</button>
              <button
                onClick={() => saveDraft()}
                disabled={isSavingDraft}
                style={{ padding: '11px 18px', borderRadius: '6px', border: '1px solid #1e2d45', background: 'transparent', color: draftSaved ? '#34C77B' : '#8a99b0', cursor: 'pointer', fontSize: '12px' }}
              >
                {isSavingDraft ? '...' : draftSaved ? '✓ Zapisano' : '🚧 Zapisz szkic'}
              </button>
              <button
                onClick={() => {
                  if (!approval.preparedBy || approval.preparedBy.trim().length < 2) {
                    alert(t('analysis.alertMissingPrepared'))
                    return
                  }
                  if (!approval.approvedBy || approval.approvedBy.trim().length < 2) {
                    alert(t('analysis.alertMissingApproved'))
                    return
                  }
                  const missingPlrJust = entries.filter(e => !e.plrJustification || e.plrJustification.trim().length < 5)
                  if (missingPlrJust.length > 0) {
                    alert(t('analysis.alertMissingPlrJust').replace('{n}', String(missingPlrJust.length)))
                    return
                  }
                  if (!approval.confirmed) { alert(t('analysis.alertMissingConfirm')); return; }
                  saveAnalysis()
                }}
                disabled={isPending}
                style={{
                  padding: '11px 28px', borderRadius: '6px', border: 'none',
                  background: (approval.confirmed && approval.preparedBy && approval.approvedBy) ? '#E8A838' : '#4a5a72',
                  color: '#0B0F1A', cursor: isPending ? 'default' : 'pointer',
                  fontSize: '13px', fontWeight: 700, opacity: isPending ? .7 : 1,
                }}
              >
                {isPending ? '...' : t('analysis.save')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}