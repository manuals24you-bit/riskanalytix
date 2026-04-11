// frontend/src/pages/analysis/CEDeclarationButton.tsx
import { useState } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { useAuthStore } from '../../store/auth.store'
import CEDeclarationPDF from './CEDeclarationPDF'

interface Props {
  analysis: any
  settings?: Record<string, string>
}

function FreemiumCEModal({ onClose }: { onClose: () => void }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,.7)', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
    }} onClick={onClose}>
      <div style={{
        background: '#111827', border: '1px solid #1D4ED8',
        borderRadius: '14px', padding: '36px', maxWidth: '480px', width: '90%',
        fontFamily: 'Lato, sans-serif', position: 'relative',
      }} onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: '32px', marginBottom: '12px', textAlign: 'center' }}>🔒</div>
        <h2 style={{ color: '#F0EDE8', fontFamily: 'Georgia, serif', fontSize: '20px', margin: '0 0 10px', textAlign: 'center' }}>
          Deklaracja CE wymaga planu BASIC lub PRO
        </h2>
        <p style={{ color: '#8a99b0', fontSize: '13px', lineHeight: 1.7, margin: '0 0 20px', textAlign: 'center' }}>
          Twoja Deklaracja Zgodności WE będzie wyglądać jak przykład poniżej — gotowa do podpisu i złożenia.
        </p>

        <div style={{
          background: '#fff', borderRadius: '6px', padding: '16px',
          marginBottom: '24px', fontFamily: 'Arial, sans-serif', color: '#1a1a2e',
          fontSize: '8px', lineHeight: 1.5, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', paddingBottom: '10px', borderBottom: '2px solid #1D4ED8' }}>
            <div>
              <div style={{ fontSize: '7px', color: '#666', marginBottom: '2px' }}>RiskAnalytix · System oceny ryzyka</div>
              <div style={{ fontWeight: 700, fontSize: '11px' }}>DEKLARACJA ZGODNOŚCI WE</div>
              <div style={{ fontSize: '7px', color: '#666' }}>EC DECLARATION OF CONFORMITY</div>
            </div>
            <div style={{ background: '#1a1a2e', color: '#fff', padding: '4px 10px', borderRadius: '3px', fontSize: '16px', fontWeight: 900 }}>CE</div>
          </div>
          {[
            { n: '1.', t: 'Producent', c: 'Nazwa Sp. z o.o. · ul. Przykładowa 1 · Warszawa' },
            { n: '2.', t: 'Maszyna', c: 'Tokarka CNC TUR-560 · Nr seryjny: SN-2024-001' },
            { n: '3.', t: 'Dyrektywy', c: '2006/42/WE · 2014/30/UE EMC · 2014/35/UE LVD' },
            { n: '4.', t: 'Normy', c: 'EN ISO 12100:2012 · ISO 23125:2015' },
          ].map(s => (
            <div key={s.n} style={{ marginBottom: '6px' }}>
              <div style={{ fontWeight: 700, fontSize: '7px', color: '#1D4ED8' }}>{s.n} {s.t}</div>
              <div style={{ paddingLeft: '8px', borderLeft: '2px solid #E8A838', color: '#444' }}>{s.c}</div>
            </div>
          ))}
          <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid #e0e0e0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {['Miejsce i data', 'Podpis i pieczęć'].map((l, i) => (
              <div key={i}>
                <div style={{ height: '20px', borderBottom: '1px solid #ccc', marginBottom: '3px' }} />
                <div style={{ fontSize: '6px', color: '#999' }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%) rotate(-30deg)',
            fontSize: '28px', fontWeight: 900, color: 'rgba(29,78,216,.15)',
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

export default function CEDeclarationButton({ analysis, settings = {} }: Props) {
  const { user } = useAuthStore()
  const [showModal, setShowModal] = useState(false)

  const hasAccess = user?.role === 'ADMIN' || !!user?.subscription

  const fileName = `deklaracja-zgodnosci-CE-${analysis.machineName
    .replace(/\s+/g, '-')
    .toLowerCase()}-${new Date().toISOString().slice(0, 10)}.pdf`

  if (!hasAccess) {
    return (
      <>
        <button
          onClick={() => setShowModal(true)}
          style={{
            padding: '7px 16px', borderRadius: '6px',
            border: '1px solid rgba(29,78,216,.2)',
            background: 'rgba(29,78,216,.05)', color: '#4a5a72',
            cursor: 'pointer', fontSize: '11px',
            fontFamily: 'Lato, sans-serif', fontWeight: 700,
          }}
        >
          🔒 Deklaracja CE
        </button>
        {showModal && <FreemiumCEModal onClose={() => setShowModal(false)} />}
      </>
    )
  }

  return (
    <PDFDownloadLink
      document={
        <CEDeclarationPDF
          analysis={analysis}
          user={user ?? undefined}
          settings={settings}
        />
      }
      fileName={fileName}
    >
      {({ loading }) => (
        <button
          disabled={loading}
          style={{
            padding: '7px 16px', borderRadius: '6px',
            border: '1px solid rgba(29,78,216,.4)',
            background: loading ? '#1e2d45' : 'rgba(29,78,216,.15)',
            color: loading ? '#8a99b0' : '#60A5FA',
            cursor: loading ? 'default' : 'pointer',
            fontSize: '11px', fontFamily: 'Lato, sans-serif', fontWeight: 700,
            transition: 'all .15s',
          }}
        >
          {loading ? '⬳ Generowanie...' : '🏷 Deklaracja CE'}
        </button>
      )}
    </PDFDownloadLink>
  )
}