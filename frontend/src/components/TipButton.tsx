// frontend/src/components/TipButton.tsx
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getTips } from '../i18n/tipTranslations'

export type TipId =
  | 'machine-limits'
  | 'hazard-analysis'
  | 'sp-params'
  | 'protective-measures'
  | 'residual-risk'
  | 'plr'
  | 'lifecycle'
  | 'summary'

const TIP_IDS: TipId[] = [
  'machine-limits',
  'hazard-analysis',
  'sp-params',
  'protective-measures',
  'residual-risk',
  'plr',
  'lifecycle',
  'summary',
]

// ─── Inline TipButton (przy sekcjach) ────────────────────────────────────────

interface InlineTipProps {
  tipId: TipId
}

export function InlineTip({ tipId }: InlineTipProps) {
  const [open, setOpen] = useState(false)
  const { i18n } = useTranslation()
  const tips = getTips(i18n.language)
  const tip = tips[tipId]
  if (!tip) return null

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        title={tip.title}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '4px',
          padding: '2px 8px', borderRadius: '4px', marginLeft: '8px',
          background: 'rgba(232,168,56,0.1)', border: '1px solid rgba(232,168,56,0.35)',
          color: '#E8A838', cursor: 'pointer', fontSize: '10px', fontWeight: 700,
          letterSpacing: '.04em', verticalAlign: 'middle', transition: 'all .15s',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(232,168,56,0.22)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(232,168,56,0.1)' }}
      >
        💡 TIP
      </button>

      {open && (
        <TipModal
          tip={tip}
          nav={tips.nav}
          onClose={() => setOpen(false)}
          showNav={false}
        />
      )}
    </>
  )
}

// ─── Floating TipButton (dolny prawy róg, wszystkie tipy po kolei) ────────────

export default function TipButton() {
  const [open, setOpen] = useState(false)
  const [idx, setIdx] = useState(0)
  const { i18n } = useTranslation()
  const tips = getTips(i18n.language)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        title="TIP"
        style={{
          position: 'fixed', bottom: '28px', right: '28px', zIndex: 50,
          width: '44px', height: '44px', borderRadius: '50%',
          background: 'rgba(232,168,56,0.15)', border: '1px solid rgba(232,168,56,0.5)',
          color: '#E8A838', cursor: 'pointer', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '11px', fontWeight: 700,
          backdropFilter: 'blur(8px)', transition: 'all .2s',
          boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(232,168,56,0.28)'; (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.08)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(232,168,56,0.15)'; (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)' }}
      >
        TIP
      </button>

      {open && (
        <TipModal
          tip={tips[TIP_IDS[idx]]}
          nav={tips.nav}
          onClose={() => setOpen(false)}
          showNav
          idx={idx}
          total={TIP_IDS.length}
          onPrev={() => setIdx(i => Math.max(0, i - 1))}
          onNext={() => setIdx(i => Math.min(TIP_IDS.length - 1, i + 1))}
          onDot={setIdx}
        />
      )}
    </>
  )
}

// ─── Shared Modal ─────────────────────────────────────────────────────────────

interface TipData {
  step: string
  title: string
  lead: string
  body: string[]
  question?: string
  bullets?: string[]
}

interface TipModalProps {
  tip: TipData
  nav: { prev: string; next: string }
  onClose: () => void
  showNav: boolean
  idx?: number
  total?: number
  onPrev?: () => void
  onNext?: () => void
  onDot?: (i: number) => void
}

function TipModal({ tip, nav, onClose, showNav, idx = 0, total = 1, onPrev, onNext, onDot }: TipModalProps) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(0,0,0,0.65)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#111827', border: '1px solid #1e2d45', borderRadius: '14px',
          padding: '28px 32px', maxWidth: '560px', width: '100%',
          position: 'relative', fontFamily: 'Lato, sans-serif',
        }}
      >
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '14px', right: '16px', background: 'none', border: 'none', color: '#4a5a72', fontSize: '20px', cursor: 'pointer', lineHeight: 1 }}
        >×</button>

        <div style={{ marginBottom: '18px' }}>
          <div style={{ fontSize: '10px', color: '#E8A838', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '4px' }}>
            💡 {tip.step}
          </div>
          <div style={{ fontSize: '17px', fontWeight: 700, color: '#F0EDE8', fontFamily: 'Georgia, serif' }}>
            {tip.title}
          </div>
        </div>

        <div style={{ background: 'rgba(232,168,56,0.07)', border: '1px solid rgba(232,168,56,0.2)', borderRadius: '8px', padding: '12px 16px', fontSize: '13px', color: '#E8A838', fontWeight: 600, lineHeight: 1.6, marginBottom: '14px' }}>
          {tip.lead}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: tip.question ? '14px' : '0' }}>
          {tip.body.map((para, i) => (
            <p key={i} style={{ fontSize: '13px', color: '#C0C8D8', lineHeight: 1.75, margin: 0 }}>{para}</p>
          ))}
        </div>

        {tip.bullets && (
          <ul style={{ margin: '0 0 14px 0', paddingLeft: '18px' }}>
            {tip.bullets.map((b, i) => (
              <li key={i} style={{ fontSize: '12px', color: '#8a99b0', lineHeight: 1.8 }}>{b}</li>
            ))}
          </ul>
        )}

        {tip.question && (
          <div style={{ display: 'flex', gap: '10px', background: 'rgba(74,158,255,0.07)', border: '1px solid rgba(74,158,255,0.2)', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', color: '#C0C8D8', lineHeight: 1.65 }}>
            <span style={{ color: '#60A5FA', flexShrink: 0, fontWeight: 700 }}>?</span>
            <em>{tip.question}</em>
          </div>
        )}

        {showNav && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '22px', paddingTop: '16px', borderTop: '1px solid #1e2d45' }}>
            <button
              onClick={onPrev}
              disabled={idx === 0}
              style={{ padding: '6px 14px', borderRadius: '6px', border: '1px solid #1e2d45', background: idx === 0 ? 'transparent' : '#1F2937', color: idx === 0 ? '#2a3a52' : '#C0C8D8', cursor: idx === 0 ? 'default' : 'pointer', fontSize: '12px' }}
            >{nav.prev}</button>

            <div style={{ display: 'flex', gap: '6px' }}>
              {Array.from({ length: total }).map((_, i) => (
                <div key={i} onClick={() => onDot?.(i)} style={{ width: '7px', height: '7px', borderRadius: '50%', background: i === idx ? '#E8A838' : '#1e2d45', cursor: 'pointer', transition: 'background .15s' }} />
              ))}
            </div>

            <button
              onClick={onNext}
              disabled={idx === total - 1}
              style={{ padding: '6px 14px', borderRadius: '6px', border: '1px solid #1e2d45', background: idx === total - 1 ? 'transparent' : '#1F2937', color: idx === total - 1 ? '#2a3a52' : '#C0C8D8', cursor: idx === total - 1 ? 'default' : 'pointer', fontSize: '12px' }}
            >{nav.next}</button>
          </div>
        )}
      </div>
    </div>
  )
}