// frontend/src/pages/analysis/AuditLogPanel.tsx
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import api from '../../services/api'

interface AuditEntry {
  id: string
  action: string
  details: any
  ipAddress?: string
  createdAt: string
  user?: { name?: string; email?: string }
}

const ACTION_CONFIG: Record<string, { label: string; icon: string; color: string; bg: string }> = {
  CREATED:          { label: 'Utworzono analizę',    icon: '✨', color: '#34C77B', bg: 'rgba(52,199,123,.08)' },
  UPDATED:          { label: 'Zapisano zmiany',       icon: '✏️', color: '#E8A838', bg: 'rgba(232,168,56,.08)' },
  DELETED:          { label: 'Usunięto analizę',      icon: '🗑',  color: '#E84040', bg: 'rgba(232,64,64,.08)'  },
  DUPLICATED:       { label: 'Skopiowano analizę',    icon: '📋', color: '#60A5FA', bg: 'rgba(96,165,250,.08)' },
  DOWNLOADED_PDF:   { label: 'Pobrano PDF',           icon: '📄', color: '#A78BFA', bg: 'rgba(167,139,250,.08)'},
  DOWNLOADED_DOCX:  { label: 'Pobrano DOCX',          icon: '📝', color: '#A78BFA', bg: 'rgba(167,139,250,.08)'},
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleString('pl-PL', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function ChangedFields({ details }: { details: any }) {
  if (!details?.changedFields?.length && !details?.entriesCount?.changed) return null

  return (
    <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {details.changedFields?.map((c: any, i: number) => (
        <div key={i} style={{ fontSize: '10px', display: 'flex', gap: '6px', alignItems: 'flex-start', padding: '3px 8px', background: '#0B0F1A', borderRadius: '4px' }}>
          <span style={{ color: '#4a5a72', flexShrink: 0, width: '140px' }}>{c.label}</span>
          <span style={{ color: '#E84040', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={String(c.from ?? '—')}>
            {String(c.from ?? '—').substring(0, 30) || '(puste)'}
          </span>
          <span style={{ color: '#4a5a72', flexShrink: 0 }}>→</span>
          <span style={{ color: '#34C77B', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={String(c.to ?? '—')}>
            {String(c.to ?? '—').substring(0, 30) || '(puste)'}
          </span>
        </div>
      ))}
      {details.entriesCount?.changed && (
        <div style={{ fontSize: '10px', display: 'flex', gap: '6px', alignItems: 'center', padding: '3px 8px', background: '#0B0F1A', borderRadius: '4px' }}>
          <span style={{ color: '#4a5a72', width: '140px' }}>Zagrożenia</span>
          <span style={{ color: '#E84040' }}>{details.entriesCount.from}</span>
          <span style={{ color: '#4a5a72' }}>→</span>
          <span style={{ color: '#34C77B' }}>{details.entriesCount.to}</span>
        </div>
      )}
    </div>
  )
}

function AuditEntryRow({ log }: { log: AuditEntry }) {
  const [detailOpen, setDetailOpen] = useState(false)
  const cfg = ACTION_CONFIG[log.action] || { label: log.action, icon: '•', color: '#8a99b0', bg: 'rgba(138,153,176,.08)' }
  const hasChanges = log.action === 'UPDATED' &&
    (log.details?.changedFields?.length > 0 || log.details?.entriesCount?.changed)

  return (
    <div style={{ background: cfg.bg, border: `1px solid ${cfg.color}22`, borderRadius: '8px', padding: '10px 14px', borderLeft: `3px solid ${cfg.color}` }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px' }}>{cfg.icon}</span>
          <span style={{ fontSize: '12px', fontWeight: 600, color: cfg.color }}>{cfg.label}</span>
          {log.details?.summary && (
            <span style={{ fontSize: '10px', color: '#8a99b0' }}>— {log.details.summary}</span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          {log.user && (
            <span style={{ fontSize: '10px', color: '#4a5a72' }}>
              {log.user.name || log.user.email}
            </span>
          )}
          <span style={{ fontSize: '10px', color: '#4a5a72', fontFamily: 'monospace' }}>
            {formatDate(log.createdAt)}
          </span>
          {hasChanges && (
            <button
              onClick={() => setDetailOpen(p => !p)}
              style={{ fontSize: '10px', color: '#E8A838', background: 'none', border: '1px solid rgba(232,168,56,.3)', borderRadius: '4px', padding: '1px 6px', cursor: 'pointer' }}
            >
              {detailOpen ? 'ukryj' : `${log.details.changedFields?.length || 0} zmian`}
            </button>
          )}
        </div>
      </div>

      {hasChanges && detailOpen && <ChangedFields details={log.details} />}

      {log.action === 'CREATED' && log.details?.entriesCount != null && (
        <div style={{ marginTop: '4px', fontSize: '10px', color: '#4a5a72' }}>
          {log.details.machineCategory} · {log.details.entriesCount} zagrożeń
        </div>
      )}

      {log.action === 'DELETED' && (
        <div style={{ marginTop: '4px', fontSize: '10px', color: '#E84040' }}>
          Usunięto: {log.details?.machineName} ({log.details?.machineCategory})
        </div>
      )}
    </div>
  )
}

export default function AuditLogPanel({ analysisId }: { analysisId: string }) {
  const [expanded, setExpanded] = useState(false)

  const { data: logs = [], isLoading } = useQuery<AuditEntry[]>({
    queryKey: ['audit', analysisId],
    queryFn: async () => {
      const { data } = await api.get(`/analyses/${analysisId}/audit`)
      return data
    },
    enabled: expanded,
    staleTime: 30_000,
  })

  return (
    <div style={{ background: '#111827', border: '1px solid #1e2d45', borderRadius: '10px', overflow: 'hidden', marginTop: '24px' }}>
      {/* Nagłówek — kliknij żeby rozwinąć */}
      <button
        onClick={() => setExpanded(p => !p)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 20px', background: 'none', border: 'none', cursor: 'pointer',
          color: '#F0EDE8', fontFamily: 'Lato, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '14px' }}>🕑</span>
          <span style={{ fontSize: '13px', fontWeight: 600 }}>Historia zmian (Audit Log)</span>
          {!expanded && (
            <span style={{ fontSize: '10px', color: '#4a5a72', background: '#0B0F1A', padding: '2px 8px', borderRadius: '10px', border: '1px solid #1e2d45' }}>
              kliknij aby rozwinąć
            </span>
          )}
        </div>
        <span style={{ color: '#4a5a72', fontSize: '12px' }}>{expanded ? '▲' : '▼'}</span>
      </button>

      {expanded && (
        <div style={{ borderTop: '1px solid #1e2d45', padding: '16px 20px' }}>
          {isLoading ? (
            <div style={{ color: '#4a5a72', fontSize: '12px', textAlign: 'center', padding: '20px' }}>
              Ładowanie historii...
            </div>
          ) : logs.length === 0 ? (
            <div style={{ color: '#4a5a72', fontSize: '12px', textAlign: 'center', padding: '20px' }}>
              Brak wpisów w historii
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {logs.map((log) => (
                <AuditEntryRow key={log.id} log={log} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}