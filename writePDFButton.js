const fs = require('fs');

const content = `// frontend/src/pages/analysis/PDFDownloadButton.tsx
import { useState } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '../../store/auth.store'
import api from '../../services/api'
import RiskReportPDF from './RiskReportPDF'

interface Props {
  analysis: any
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
        <div style={{ fontSize: '32px', marginBottom: '12px', textAlign: 'center' }}>\u{1F512}</div>
        <h2 style={{ color: '#F0EDE8', fontFamily: 'Georgia, serif', fontSize: '20px', margin: '0 0 10px', textAlign: 'center' }}>
          Pobieranie PDF wymaga planu BASIC lub PRO
        </h2>
        <p style={{ color: '#8a99b0', fontSize: '13px', lineHeight: 1.7, margin: '0 0 20px', textAlign: 'center' }}>
          Tw\u00f3j raport b\u0119dzie wygl\u0105da\u0142 dok\u0142adnie tak jak przyk\u0142ad \u2013 z pe\u0142n\u0105 tabel\u0105 zagro\u017ce\u0144, matryc\u0105 ryzyka i danymi klienta.
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
          }}>Zobacz plany \u2192</button>
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
          <span style={{ fontSize: '24px' }}>\u26a0\ufe0f</span>
          <h2 style={{ color: '#E8A838', fontFamily: 'Georgia, serif', fontSize: '18px', margin: 0 }}>
            Potwierdzenie przed pobraniem raportu
          </h2>
        </div>
        <div style={{ background: 'rgba(232,168,56,.08)', border: '1px solid rgba(232,168,56,.25)', borderRadius: '8px', padding: '14px 16px', marginBottom: '20px' }}>
          <p style={{ fontSize: '12px', color: '#C0C8D8', lineHeight: 1.7, margin: 0 }}>
            Narz\u0119dzie RiskAnalytix ma wy\u0142\u0105cznie charakter <strong style={{ color: '#E8A838' }}>pomocniczy i wspomagaj\u0105cy</strong>.
            Generowany raport i szablon Deklaracji Zgodno\u015bci CE nie s\u0105 dokumentami gotowymi do u\u017cycia
            i nie zast\u0119puj\u0105 oficjalnej oceny zgodno\u015bci ani konsultacji z certyfikowanym specjalist\u0105 BHP.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
          {[
            { id: 'c1', checked: checked1, onChange: setChecked1, text: 'Przeanalizowa\u0142em/am i zweryfikowa\u0142em/am wyniki analizy ryzyka oraz potwierdzam ich zgodno\u015b\u0107 z rzeczywistym stanem maszyny.' },
            { id: 'c2', checked: checked2, onChange: setChecked2, text: 'Przyjmuj\u0119 do wiadomo\u015bci, \u017ce narz\u0119dzie ma wy\u0142\u0105cznie charakter pomocniczy i nie zast\u0119puje oceny certyfikowanego specjalisty BHP ani jednostki notyfikowanej.' },
            { id: 'c3', checked: checked3, onChange: setChecked3, text: 'Akceptuj\u0119 Regulamin serwisu i przyjmuj\u0119 pe\u0142n\u0105 odpowiedzialno\u015b\u0107 za bezpiecze\u0144stwo maszyny, prawid\u0142owo\u015b\u0107 oceny ryzyka oraz tre\u015b\u0107 Deklaracji Zgodno\u015bci CE.' },
          ].map(({ id, checked, onChange, text }) => (
            <label key={id} style={{ display: 'flex', gap: '12px', cursor: 'pointer', alignItems: 'flex-start' }}>
              <div
                onClick={() => onChange(!checked)}
                style={{
                  width: '18px', height: '18px', borderRadius: '4px', flexShrink: 0, marginTop: '1px',
                  border: \`2px solid \${checked ? '#E8A838' : '#1e2d45'}\`,
                  background: checked ? '#E8A838' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'all .15s',
                }}
              >
                {checked && <span style={{ color: '#0B0F1A', fontSize: '12px', fontWeight: 900 }}>\u2713</span>}
              </div>
              <span style={{ fontSize: '12px', color: '#C0C8D8', lineHeight: 1.6 }}>{text}</span>
            </label>
          ))}
        </div>
        <p style={{ fontSize: '11px', color: '#4a5a72', marginBottom: '20px' }}>
          Zapoznaj si\u0119 z pe\u0142nym{' '}
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
            {allChecked ? '\u2b07 Pobierz raport PDF' : 'Zaznacz wszystkie pola'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function PDFDownloadButton({ analysis }: Props) {
  const { user } = useAuthStore()
  const [showFreemiumModal, setShowFreemiumModal] = useState(false)
  const [showAcceptanceModal, setShowAcceptanceModal] = useState(false)
  const [accepted, setAccepted] = useState(false)

  const { data: settings = {} } = useQuery({
    queryKey: ['admin-settings'],
    queryFn: () => api.get('/admin/settings').then((r: any) => r.data),
    staleTime: 60_000,
  })

  const hasAccess = user?.role === 'ADMIN' || !!user?.subscription

  const fileName = \`ocena-ryzyka-\${analysis.machineName
    .replace(/\\s+/g, '-')
    .toLowerCase()}-\${new Date().toISOString().slice(0, 10)}.pdf\`

  if (!hasAccess) {
    return (
      <>
        <button onClick={() => setShowFreemiumModal(true)} style={{
          padding: '7px 16px', borderRadius: '6px', border: 'none',
          background: '#1e2d45', color: '#8a99b0',
          cursor: 'pointer', fontSize: '11px',
          fontFamily: 'Lato, sans-serif', fontWeight: 700,
        }}>\u{1F512} Pobierz PDF</button>
        {showFreemiumModal && <FreemiumModal onClose={() => setShowFreemiumModal(false)} />}
      </>
    )
  }

  if (!accepted) {
    return (
      <>
        <button onClick={() => setShowAcceptanceModal(true)} style={{
          padding: '7px 16px', borderRadius: '6px', border: 'none',
          background: '#E8A838', color: '#0B0F1A',
          cursor: 'pointer', fontSize: '11px',
          fontFamily: 'Lato, sans-serif', fontWeight: 700,
        }}>\u2b07 Pobierz PDF</button>
        {showAcceptanceModal && (
          <AcceptanceModal
            onAccept={() => { setAccepted(true); setShowAcceptanceModal(false) }}
            onClose={() => setShowAcceptanceModal(false)}
          />
        )}
      </>
    )
  }

  return (
    <PDFDownloadLink
      document={<RiskReportPDF analysis={analysis} settings={settings} />}
      fileName={fileName}
    >
      {({ loading }) => (
        <button disabled={loading} style={{
          padding: '7px 16px', borderRadius: '6px', border: 'none',
          background: loading ? '#4a5a72' : '#E8A838',
          color: loading ? '#8a99b0' : '#0B0F1A',
          cursor: loading ? 'default' : 'pointer',
          fontSize: '11px', fontFamily: 'Lato, sans-serif', fontWeight: 700,
          transition: 'all .15s',
        }}>
          {loading ? '\u29b3 Generowanie...' : '\u2b07 Pobierz PDF'}
        </button>
      )}
    </PDFDownloadLink>
  )
}
`;

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/PDFDownloadButton.tsx', content, 'utf8');
console.log('written, size:', content.length);