// frontend/src/pages/analysis/PDFDownloadButton.tsx
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
        <div style={{ fontSize: '32px', marginBottom: '12px', textAlign: 'center' }}>🔒</div>
        <h2 style={{ color: '#F0EDE8', fontFamily: 'Georgia, serif', fontSize: '20px', margin: '0 0 10px', textAlign: 'center' }}>
          Pobieranie PDF wymaga planu BASIC lub PRO
        </h2>
        <p style={{ color: '#8a99b0', fontSize: '13px', lineHeight: 1.7, margin: '0 0 20px', textAlign: 'center' }}>
          Twój raport będzie wyglądał dokładnie tak jak przykład poniżej — z pełną tabelą zagrożeń, matrycą ryzyka i danymi klienta.
        </p>

        <div style={{
          background: '#fff', borderRadius: '6px', padding: '16px',
          marginBottom: '24px', fontFamily: 'Arial, sans-serif', color: '#1a1a2e',
          fontSize: '8px', lineHeight: 1.5, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', paddingBottom: '8px', borderBottom: '2px solid #E8A838' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '11px' }}>RiskAnalytix</div>
              <div style={{ color: '#666' }}>Ocena Ryzyka Maszyn</div>
            </div>
            <div style={{ textAlign: 'right', color: '#666' }}>
              <div>Data: {new Date().toLocaleDateString('pl-PL')}</div>
              <div>Tokarka CNC — PRZYKŁAD</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', marginBottom: '8px' }}>
            {[['Zagrożeń', '13'], ['Wysokie ryzyko', '3'], ['Ryzyko med.', '6']].map(([l, v]) => (
              <div key={l} style={{ background: '#f9fafb', padding: '6px', borderRadius: '3px', textAlign: 'center' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a2e' }}>{v}</div>
                <div style={{ color: '#666', fontSize: '7px' }}>{l}</div>
              </div>
            ))}
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '7px' }}>
            <thead>
              <tr style={{ background: '#1F2937', color: '#fff' }}>
                {['Nr', 'Element', 'Zagrożenie', 'S', 'P', 'R', 'Poziom'].map(h => (
                  <th key={h} style={{ padding: '3px 4px', textAlign: 'left' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['1', 'Wrzeciono', 'Pochwycenie', '4', '3', '12', '🔴 WYSOKI'],
                ['2', 'Narzędzie', 'Cięcie', '3', '3', '9', '🟡 ŚREDNI'],
                ['3', 'Szafa el.', 'Porażenie', '4', '1', '4', '🟢 NISKI'],
              ].map(row => (
                <tr key={row[0]} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  {row.map((cell, i) => (
                    <td key={i} style={{ padding: '3px 4px', color: '#374151' }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%) rotate(-30deg)',
            fontSize: '28px', fontWeight: 900, color: 'rgba(232,168,56,.2)',
            pointerEvents: 'none', whiteSpace: 'nowrap',
          }}>PRZYKŁAD</div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={onClose} style={{
            flex: 1, padding: '11px', borderRadius: '6px',
            border: '1px solid #1e2d45', background: 'transparent',
            color: '#8a99b0', cursor: 'pointer', fontSize: '13px',
          }}>
            Zamknij
          </button>
          <button onClick={() => window.location.href = '/#cennik'} style={{
            flex: 2, padding: '11px', borderRadius: '6px',
            border: 'none', background: '#E8A838',
            color: '#0B0F1A', cursor: 'pointer', fontSize: '13px', fontWeight: 700,
          }}>
            Zobacz plany →
          </button>
        </div>
      </div>
    </div>
  )
}

export default function PDFDownloadButton({ analysis }: Props) {
  const { user } = useAuthStore()
  const [showModal, setShowModal] = useState(false)

  const { data: settings = {} } = useQuery({
    queryKey: ['admin-settings'],
    queryFn: () => api.get('/admin/settings').then((r: any) => r.data),
    staleTime: 60_000,
  })

  const hasAccess = user?.role === 'ADMIN' || !!user?.subscription

  const fileName = `ocena-ryzyka-${analysis.machineName
    .replace(/\s+/g, '-')
    .toLowerCase()}-${new Date().toISOString().slice(0, 10)}.pdf`

  if (!hasAccess) {
    return (
      <>
        <button
          onClick={() => setShowModal(true)}
          style={{
            padding: '7px 16px', borderRadius: '6px', border: 'none',
            background: '#1e2d45', color: '#8a99b0',
            cursor: 'pointer', fontSize: '11px',
            fontFamily: 'Lato, sans-serif', fontWeight: 700,
          }}
        >
          🔒 Pobierz PDF
        </button>
        {showModal && <FreemiumModal onClose={() => setShowModal(false)} />}
      </>
    )
  }

  return (
    <PDFDownloadLink
      document={<RiskReportPDF analysis={analysis} settings={settings} />}
      fileName={fileName}
    >
      {({ loading }) => (
        <button
          disabled={loading}
          style={{
            padding: '7px 16px', borderRadius: '6px', border: 'none',
            background: loading ? '#4a5a72' : '#E8A838',
            color: loading ? '#8a99b0' : '#0B0F1A',
            cursor: loading ? 'default' : 'pointer',
            fontSize: '11px', fontFamily: 'Lato, sans-serif', fontWeight: 700,
            transition: 'all .15s',
          }}
        >
          {loading ? '⬳ Generowanie...' : '⬇ Pobierz PDF'}
        </button>
      )}
    </PDFDownloadLink>
  )
}