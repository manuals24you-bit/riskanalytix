// frontend/src/pages/analysis/PDFDownloadButton.tsx
import { useState, useEffect } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '../../store/auth.store'
import { registerFonts } from './registerFonts'
import api from '../../services/api'
import RiskReportPDF from './RiskReportPDF'
import { validateAnalysis, getValidationSummary } from '../../utils/analysisValidation'

interface Props {
  analysis: any
  approval?: {
    preparedBy?: string; preparedRole?: string
    approvedBy?: string; approvedRole?: string; approvedDate?: string
  }
}

function FreemiumModal({ onClose }: { onClose: () => void }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,.7)', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
    }} onClick={onClose}>
      <div style={{
        background: '#111827', border: '1px solid #E8A838',
        borderRadius: '14px', padding: '36px', maxWidth: '480px', width: '90%',
        fontFamily: 'Lato, sans-serif', position: 'relative',
      }} onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: '32px', marginBottom: '12px', textAlign: 'center' }}>🔒</div>
        <h2 style={{ color: '#F0EDE8', fontFamily: 'Georgia, serif', fontSize: '20px', margin: '0 0 10px', textAlign: 'center' }}>
          Pobieranie PDF wymaga planu BASIC lub PRO
        </h2>
        <p style={{ color: '#8a99b0', fontSize: '13px', lineHeight: 1.7, margin: '0 0 20px', textAlign: 'center' }}>
          Twój raport będzie wyglądał dokładnie tak jak przykład – z pełną tabelą zagrożeń, matrycą ryzyka i danymi klienta.
        </p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={onClose} style={{
            flex: 1, padding: '11px', borderRadius: '6px',
            border: '1px solid #1e2d45', background: 'transparent',
            color: '#8a99b0', cursor: 'pointer', fontSize: '13px',
          }}>Zamknij</button>
          <button onClick={() => window.location.href = '/#cennik'} style={{
            flex: 2, padding: '11px', borderRadius: '6px',
            border: 'none', background: '#E8A838',
            color: '#0B0F1A', cursor: 'pointer', fontSize: '13px', fontWeight: 700,
          }}>Zobacz plany →</button>
        </div>
      </div>
    </div>
  )
}

function LowCredibilityModal({ score, onContinue, onClose }: {
  score: number
  onContinue: () => void
  onClose: () => void
}) {
  const [confirmed, setConfirmed] = useState(false)
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1010, background: 'rgba(0,0,0,.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={onClose}>
      <div style={{ background: '#111827', border: '2px solid rgba(232,64,64,.5)', borderRadius: '14px', padding: '32px', maxWidth: '520px', width: '100%', fontFamily: 'Lato, sans-serif' }} onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: '32px', textAlign: 'center', marginBottom: '12px' }}>⚠️</div>
        <h2 style={{ color: '#E84040', fontFamily: 'Georgia, serif', fontSize: '18px', textAlign: 'center', marginBottom: '12px' }}>
          Niska wiarygodność analizy ({score}/100)
        </h2>
        <div style={{ background: 'rgba(232,64,64,.08)', border: '1px solid rgba(232,64,64,.25)', borderRadius: '8px', padding: '14px 16px', marginBottom: '20px' }}>
          <p style={{ fontSize: '12px', color: '#C0C8D8', lineHeight: 1.7, margin: 0 }}>
            System wykrył wzorce wskazujące na możliwe niedoszacowanie ryzyka: zbyt krótkie uzasadnienia, identyczne wpisy lub wszystkie ryzyka na poziomie niskim. <strong style={{ color: '#F0EDE8' }}>Raport PDF może nie odzwierciedlać rzeczywistego poziomu ryzyka maszyny.</strong>
          </p>
        </div>
        <label style={{ display: 'flex', gap: '12px', cursor: 'pointer', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div onClick={() => setConfirmed(!confirmed)} style={{ width: '18px', height: '18px', borderRadius: '4px', flexShrink: 0, marginTop: '1px', border: `2px solid ${confirmed ? '#E84040' : '#1e2d45'}`, background: confirmed ? '#E84040' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all .15s' }}>
            {confirmed && <span style={{ color: '#fff', fontSize: '12px', fontWeight: 900 }}>✓</span>}
          </div>
          <span style={{ fontSize: '12px', color: '#C0C8D8', lineHeight: 1.6 }}>
            Jestem świadomy/a niskiej wiarygodności tej analizy. Zweryfikowałem/am wyniki i biorę pełną odpowiedzialność za ich poprawność.
          </span>
        </label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={onClose} style={{ flex: 1, padding: '11px', borderRadius: '6px', border: '1px solid #1e2d45', background: 'transparent', color: '#8a99b0', cursor: 'pointer', fontSize: '13px' }}>
            ← Wróć i popraw
          </button>
          <button onClick={confirmed ? onContinue : undefined} disabled={!confirmed} style={{ flex: 2, padding: '11px', borderRadius: '6px', border: 'none', background: confirmed ? '#E84040' : '#1e2d45', color: confirmed ? '#fff' : '#4a5a72', cursor: confirmed ? 'pointer' : 'not-allowed', fontSize: '13px', fontWeight: 700 }}>
            Kontynuuj mimo ostrzeżenia →
          </button>
        </div>
      </div>
    </div>
  )
}

function ExpertReviewModal({ onContinue, onClose }: {
  onContinue: (expert: { name: string; qualifications: string }) => void
  onClose: () => void
}) {
  const [name, setName] = useState('')
  const [qualifications, setQualifications] = useState('')
  const [skipExpert, setSkipExpert] = useState(false)
  const [skipConfirmed, setSkipConfirmed] = useState(false)

  const canContinue = (name.trim().length >= 3 && qualifications.trim().length >= 5) || (skipExpert && skipConfirmed)

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1010, background: 'rgba(0,0,0,.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={onClose}>
      <div style={{ background: '#111827', border: '1px solid rgba(232,168,56,.4)', borderRadius: '14px', padding: '32px', maxWidth: '540px', width: '100%', fontFamily: 'Lato, sans-serif' }} onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: '28px', textAlign: 'center', marginBottom: '12px' }}>🔍</div>
        <h2 style={{ color: '#E8A838', fontFamily: 'Georgia, serif', fontSize: '18px', textAlign: 'center', marginBottom: '8px' }}>
          Analiza zawiera zagrożenia wysokie (R≥12)
        </h2>
        <p style={{ color: '#8a99b0', fontSize: '12px', textAlign: 'center', lineHeight: 1.7, marginBottom: '20px' }}>
          Przy zagrożeniach o wysokim ryzyku zalecana jest weryfikacja przez eksperta. Podaj dane osoby która zweryfikowała tę analizę — pojawią się w raporcie PDF.
        </p>

        {!skipExpert ? (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
              <div>
                <div style={{ fontSize: '10px', color: '#E8A838', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '4px' }}>
                  Imię i nazwisko eksperta *
                </div>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="np. Jan Kowalski"
                  style={{ width: '100%', background: '#0B0F1A', border: `1px solid ${name.trim().length >= 3 ? '#34C77B' : '#1e2d45'}`, borderRadius: '6px', color: '#F0EDE8', padding: '8px 12px', fontSize: '12px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <div style={{ fontSize: '10px', color: '#E8A838', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '4px' }}>
                  Kwalifikacje / certyfikaty *
                </div>
                <input value={qualifications} onChange={e => setQualifications(e.target.value)} placeholder="np. Inżynier BHP, certyfikat ISO 12100, uprawnienia UDT"
                  style={{ width: '100%', background: '#0B0F1A', border: `1px solid ${qualifications.trim().length >= 5 ? '#34C77B' : '#1e2d45'}`, borderRadius: '6px', color: '#F0EDE8', padding: '8px 12px', fontSize: '12px', boxSizing: 'border-box' }} />
              </div>
            </div>
            <button onClick={() => setSkipExpert(true)} style={{ background: 'none', border: 'none', color: '#4a5a72', fontSize: '11px', cursor: 'pointer', textDecoration: 'underline', marginBottom: '16px', padding: 0 }}>
              Nie mam eksperta — chcę kontynuować bez weryfikacji
            </button>
          </>
        ) : (
          <label style={{ display: 'flex', gap: '12px', cursor: 'pointer', alignItems: 'flex-start', marginBottom: '16px', padding: '14px', background: 'rgba(232,64,64,.06)', border: '1px solid rgba(232,64,64,.2)', borderRadius: '8px' }}>
            <div onClick={() => setSkipConfirmed(!skipConfirmed)} style={{ width: '18px', height: '18px', borderRadius: '4px', flexShrink: 0, marginTop: '1px', border: `2px solid ${skipConfirmed ? '#E84040' : '#1e2d45'}`, background: skipConfirmed ? '#E84040' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              {skipConfirmed && <span style={{ color: '#fff', fontSize: '12px', fontWeight: 900 }}>✓</span>}
            </div>
            <span style={{ fontSize: '12px', color: '#C0C8D8', lineHeight: 1.6 }}>
              Potwierdzam że świadomie rezygnuję z weryfikacji eksperckiej przy zagrożeniach o wysokim ryzyku (R≥12) i biorę pełną odpowiedzialność za poprawność analizy.
            </span>
          </label>
        )}

        <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
          <button onClick={onClose} style={{ flex: 1, padding: '11px', borderRadius: '6px', border: '1px solid #1e2d45', background: 'transparent', color: '#8a99b0', cursor: 'pointer', fontSize: '13px' }}>
            Anuluj
          </button>
          <button
            onClick={canContinue ? () => onContinue({ name: skipExpert ? '' : name.trim(), qualifications: skipExpert ? '' : qualifications.trim() }) : undefined}
            disabled={!canContinue}
            style={{ flex: 2, padding: '11px', borderRadius: '6px', border: 'none', background: canContinue ? '#E8A838' : '#1e2d45', color: canContinue ? '#0B0F1A' : '#4a5a72', cursor: canContinue ? 'pointer' : 'not-allowed', fontSize: '13px', fontWeight: 700 }}>
            {skipExpert ? 'Kontynuuj bez eksperta →' : 'Zatwierdź i kontynuuj →'}
          </button>
        </div>
      </div>
    </div>
  )
}

function AcceptanceModal({ onAccept, onClose }: { onAccept: () => void; onClose: () => void }) {
  const [checked1, setChecked1] = useState(false)
  const [checked2, setChecked2] = useState(false)
  const [checked3, setChecked3] = useState(false)
  const allChecked = checked1 && checked2 && checked3

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,.75)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', padding: '20px',
    }} onClick={onClose}>
      <div style={{
        background: '#111827', border: '1px solid rgba(232,168,56,.4)',
        borderRadius: '14px', padding: '32px', maxWidth: '560px', width: '100%',
        fontFamily: 'Lato, sans-serif',
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <span style={{ fontSize: '24px' }}>⚠️</span>
          <h2 style={{ color: '#E8A838', fontFamily: 'Georgia, serif', fontSize: '18px', margin: 0 }}>
            Potwierdzenie przed pobraniem raportu
          </h2>
        </div>
        <div style={{ background: 'rgba(232,168,56,.08)', border: '1px solid rgba(232,168,56,.25)', borderRadius: '8px', padding: '14px 16px', marginBottom: '20px' }}>
          <p style={{ fontSize: '12px', color: '#C0C8D8', lineHeight: 1.7, margin: 0 }}>
            Narzędzie RiskAnalytix ma wyłącznie charakter <strong style={{ color: '#E8A838' }}>pomocniczy i wspomagający</strong>.
            Generowany raport i szablon Deklaracji Zgodności CE nie są dokumentami gotowymi do użycia
            i nie zastępują oficjalnej oceny zgodności ani konsultacji z certyfikowanym specjalistą BHP.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
          {[
            { id: 'c1', checked: checked1, onChange: setChecked1, text: 'Przeanalizowałem/am i zweryfikowałem/am wyniki analizy ryzyka oraz potwierdzam ich zgodność z rzeczywistym stanem maszyny.' },
            { id: 'c2', checked: checked2, onChange: setChecked2, text: 'Przyjmuję do wiadomości, że narzędzie ma wyłącznie charakter pomocniczy i nie zastępuje oceny certyfikowanego specjalisty BHP ani jednostki notyfikowanej.' },
            { id: 'c3', checked: checked3, onChange: setChecked3, text: 'Akceptuję Regulamin serwisu i przyjmuję pełną odpowiedzialność za bezpieczeństwo maszyny, prawidłowość oceny ryzyka oraz treść Deklaracji Zgodności CE.' },
          ].map(({ id, checked, onChange, text }) => (
            <label key={id} style={{ display: 'flex', gap: '12px', cursor: 'pointer', alignItems: 'flex-start' }}>
              <div
                onClick={() => onChange(!checked)}
                style={{
                  width: '18px', height: '18px', borderRadius: '4px', flexShrink: 0, marginTop: '1px',
                  border: `2px solid ${checked ? '#E8A838' : '#1e2d45'}`,
                  background: checked ? '#E8A838' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'all .15s',
                }}
              >
                {checked && <span style={{ color: '#0B0F1A', fontSize: '12px', fontWeight: 900 }}>✓</span>}
              </div>
              <span style={{ fontSize: '12px', color: '#C0C8D8', lineHeight: 1.6 }}>{text}</span>
            </label>
          ))}
        </div>
        <p style={{ fontSize: '11px', color: '#4a5a72', marginBottom: '20px' }}>
          Zapoznaj się z pełnym{' '}
          <a href="/terms" target="_blank" style={{ color: '#E8A838' }}>Regulaminem serwisu</a>{' '}
          przed pobraniem dokumentu.
        </p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={onClose} style={{
            flex: 1, padding: '11px', borderRadius: '6px',
            border: '1px solid #1e2d45', background: 'transparent',
            color: '#8a99b0', cursor: 'pointer', fontSize: '13px',
          }}>Anuluj</button>
          <button
            onClick={allChecked ? onAccept : undefined}
            disabled={!allChecked}
            style={{
              flex: 2, padding: '11px', borderRadius: '6px', border: 'none',
              background: allChecked ? '#E8A838' : '#1e2d45',
              color: allChecked ? '#0B0F1A' : '#4a5a72',
              cursor: allChecked ? 'pointer' : 'not-allowed',
              fontSize: '13px', fontWeight: 700, transition: 'all .2s',
            }}
          >
            {allChecked ? '⬇ Pobierz raport PDF' : 'Zaznacz wszystkie pola'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function PDFDownloadButton({ analysis, approval = {} }: Props) {
  const { user } = useAuthStore()
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    registerFonts()
    setFontsLoaded(true)
  }, [])

  const [showFreemiumModal, setShowFreemiumModal] = useState(false)
  const [showLowCredModal, setShowLowCredModal] = useState(false)
  const [showExpertModal, setShowExpertModal] = useState(false)
  const [showAcceptanceModal, setShowAcceptanceModal] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const [expertData, setExpertData] = useState<{ name: string; qualifications: string } | null>(null)

  const { data: settings = {} } = useQuery({
    queryKey: ['admin-settings'],
    queryFn: () => api.get('/admin/settings').then((r: any) => r.data).catch(() => ({})),
    staleTime: 60_000,
    retry: false,
  })

  const hasAccess = user?.role === 'ADMIN' || !!user?.subscription

  const fileName = `ocena-ryzyka-${analysis.machineName
    .replace(/\s+/g, '-')
    .toLowerCase()}-${new Date().toISOString().slice(0, 10)}.pdf`

  // Oblicz walidację przy kliknięciu
  const getValidation = () => {
    const entries = analysis.riskEntries || analysis.entries || []
    const result = validateAnalysis(entries, {
      machineLimitsIntended: analysis.intendedUse,
      machineLimitsForeseeable: analysis.foreseenMisuse,
      machineTypeId: analysis.machineTypeId || analysis.machineId,
      preparedBy: approval?.preparedBy,
      approvedBy: approval?.approvedBy,
    }, analysis.machineCategory)
    return getValidationSummary(result)
  }

  const hasHighRisk = () => {
    const entries = analysis.riskEntries || analysis.entries || []
    return entries.some((e: any) => e.riskScore >= 12)
  }

  // Sekwencja: kliknięcie → [LowCred?] → [Expert?] → Acceptance → PDF
  const handleClick = () => {
    if (!fontsLoaded) return
    const summary = getValidation()
    if (summary.credibilityScore < 50) {
      setShowLowCredModal(true)
      return
    }
    if (hasHighRisk() && !expertData) {
      setShowExpertModal(true)
      return
    }
    setShowAcceptanceModal(true)
  }

  const afterLowCred = () => {
    setShowLowCredModal(false)
    if (hasHighRisk() && !expertData) {
      setShowExpertModal(true)
      return
    }
    setShowAcceptanceModal(true)
  }

  const afterExpert = (expert: { name: string; qualifications: string }) => {
    setExpertData(expert)
    setShowExpertModal(false)
    setShowAcceptanceModal(true)
  }

  if (!hasAccess) {
    return (
      <>
        <button onClick={() => setShowFreemiumModal(true)} style={{ padding: '7px 16px', borderRadius: '6px', border: 'none', background: '#1e2d45', color: '#8a99b0', cursor: 'pointer', fontSize: '11px', fontFamily: 'Lato, sans-serif', fontWeight: 700 }}>
          🔒 Pobierz PDF
        </button>
        {showFreemiumModal && <FreemiumModal onClose={() => setShowFreemiumModal(false)} />}
      </>
    )
  }

  if (!accepted) {
    return (
      <>
        <button onClick={handleClick} style={{ padding: '7px 16px', borderRadius: '6px', border: 'none', background: '#E8A838', color: '#0B0F1A', cursor: 'pointer', fontSize: '11px', fontFamily: 'Lato, sans-serif', fontWeight: 700 }}>
          ⬇ Pobierz PDF
        </button>
        {showLowCredModal && (
          <LowCredibilityModal
            score={getValidation().credibilityScore}
            onContinue={afterLowCred}
            onClose={() => setShowLowCredModal(false)}
          />
        )}
        {showExpertModal && (
          <ExpertReviewModal
            onContinue={afterExpert}
            onClose={() => setShowExpertModal(false)}
          />
        )}
        {showAcceptanceModal && (
          <AcceptanceModal
            onAccept={() => { setAccepted(true); setShowAcceptanceModal(false) }}
            onClose={() => setShowAcceptanceModal(false)}
          />
        )}
      </>
    )
  }

  // Buduj enriched analysis z danymi eksperta
  const enrichedAnalysis = {
    ...analysis,
    ...approval,
    ...(expertData?.name ? {
      expertName: expertData.name,
      expertQualifications: expertData.qualifications,
    } : {}),
  }

  return (
    <PDFDownloadLink
      document={<RiskReportPDF analysis={enrichedAnalysis} settings={settings} />}
      fileName={fileName}
    >
      {({ loading }) => (
        <button disabled={loading} style={{ padding: '7px 16px', borderRadius: '6px', border: 'none', background: loading ? '#4a5a72' : '#E8A838', color: loading ? '#8a99b0' : '#0B0F1A', cursor: loading ? 'default' : 'pointer', fontSize: '11px', fontFamily: 'Lato, sans-serif', fontWeight: 700, transition: 'all .15s' }}>
          {!fontsLoaded ? '⏳ Ładowanie...' : loading ? '⦳ Generowanie...' : '⬇ Pobierz PDF'}
        </button>
      )}
    </PDFDownloadLink>
  )
}