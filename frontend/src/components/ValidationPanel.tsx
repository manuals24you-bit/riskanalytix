// frontend/src/components/ValidationPanel.tsx
// Panel ostrzeżeń i blokad walidacji ISO 12100

import type { ValidationResult } from '../utils/analysisValidation'

interface Props {
  result: ValidationResult
  showDetail?: boolean
}

const LAYER_LABELS: Record<string, string> = {
  logical: 'Logiczna',
  normative: 'Normatywna',
  behavioural: 'Behawioralna',
  process: 'Procesowa',
}

const LAYER_COLORS: Record<string, string> = {
  logical: '#E84040',
  normative: '#E8A838',
  behavioural: '#60A5FA',
  process: '#A78BFA',
}

export default function ValidationPanel({ result, showDetail = false }: Props) {
  const { blocks, warnings, credibilityScore, credibilityLabel } = result
  if (blocks.length === 0 && warnings.length === 0) return null

  const credColor = credibilityLabel === 'high' ? '#34C77B' : credibilityLabel === 'medium' ? '#E8A838' : '#E84040'
  const credBg = credibilityLabel === 'high' ? 'rgba(52,199,123,.08)' : credibilityLabel === 'medium' ? 'rgba(232,168,56,.08)' : 'rgba(232,64,64,.08)'
  const credBorder = credibilityLabel === 'high' ? 'rgba(52,199,123,.25)' : credibilityLabel === 'medium' ? 'rgba(232,168,56,.25)' : 'rgba(232,64,64,.25)'
  const credLabel = credibilityLabel === 'high' ? 'Wysoka' : credibilityLabel === 'medium' ? 'Średnia' : 'Niska'

  return (
    <div style={{ marginBottom: '20px' }}>

      {/* Wynik wiarygodności */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: credBg, border: `1px solid ${credBorder}`, borderRadius: '8px', marginBottom: '12px' }}>
        <div style={{ fontSize: '20px' }}>
          {credibilityLabel === 'high' ? '✅' : credibilityLabel === 'medium' ? '⚠️' : '🔴'}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '12px', color: credColor, fontWeight: 700, marginBottom: '2px' }}>
            Wiarygodność analizy: {credLabel} ({credibilityScore}/100)
          </div>
          <div style={{ fontSize: '11px', color: '#8a99b0' }}>
            {blocks.length > 0 && `${blocks.length} blokada${blocks.length > 1 ? 'i' : ''} • `}
            {warnings.length > 0 && `${warnings.length} ostrzeżenie${warnings.length > 1 ? 'ń' : ''}`}
          </div>
        </div>
        {/* Pasek postępu */}
        <div style={{ width: '80px', height: '6px', background: '#1e2d45', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${credibilityScore}%`, background: credColor, borderRadius: '3px', transition: 'width .3s' }} />
        </div>
      </div>

      {/* Blokady */}
      {blocks.length > 0 && (
        <div style={{ marginBottom: '8px' }}>
          {blocks.map(issue => (
            <div key={issue.id} style={{ display: 'flex', gap: '10px', padding: '10px 14px', background: 'rgba(232,64,64,.06)', border: '1px solid rgba(232,64,64,.25)', borderRadius: '6px', marginBottom: '6px' }}>
              <span style={{ fontSize: '14px', flexShrink: 0 }}>🚫</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '12px', color: '#E84040', fontWeight: 600, marginBottom: '2px' }}>
                  <span style={{ fontSize: '9px', background: LAYER_COLORS[issue.layer] + '22', border: `1px solid ${LAYER_COLORS[issue.layer]}44`, color: LAYER_COLORS[issue.layer], borderRadius: '3px', padding: '1px 5px', marginRight: '6px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em' }}>
                    {LAYER_LABELS[issue.layer]}
                  </span>
                  {issue.message}
                </div>
                {showDetail && issue.detail && (
                  <div style={{ fontSize: '11px', color: '#8a99b0', lineHeight: 1.6 }}>{issue.detail}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Ostrzeżenia */}
      {warnings.length > 0 && (
        <div>
          {warnings.map(issue => (
            <div key={issue.id} style={{ display: 'flex', gap: '10px', padding: '10px 14px', background: 'rgba(232,168,56,.06)', border: '1px solid rgba(232,168,56,.2)', borderRadius: '6px', marginBottom: '6px' }}>
              <span style={{ fontSize: '14px', flexShrink: 0 }}>⚠️</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '12px', color: '#E8A838', fontWeight: 600, marginBottom: '2px' }}>
                  <span style={{ fontSize: '9px', background: LAYER_COLORS[issue.layer] + '22', border: `1px solid ${LAYER_COLORS[issue.layer]}44`, color: LAYER_COLORS[issue.layer], borderRadius: '3px', padding: '1px 5px', marginRight: '6px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em' }}>
                    {LAYER_LABELS[issue.layer]}
                  </span>
                  {issue.message}
                </div>
                {showDetail && issue.detail && (
                  <div style={{ fontSize: '11px', color: '#8a99b0', lineHeight: 1.6 }}>{issue.detail}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}