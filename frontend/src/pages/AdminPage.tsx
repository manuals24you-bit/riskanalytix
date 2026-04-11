import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../services/api'

type Tab = 'stats' | 'users' | 'analyses' | 'settings'

const SETTING_FIELDS = [
  { key: 'company_name',    label: 'Nazwa firmy',           placeholder: 'RiskAnalytix Sp. z o.o.' },
  { key: 'company_nip',     label: 'NIP',                   placeholder: '000-000-00-00' },
  { key: 'company_address', label: 'Adres',                 placeholder: 'ul. Przykładowa 1, 00-000 Warszawa' },
  { key: 'company_email',   label: 'E-mail kontaktowy',     placeholder: 'kontakt@riskanalytix.pl' },
  { key: 'company_phone',   label: 'Telefon',               placeholder: '+48 000 000 000' },
  { key: 'company_logo',    label: 'URL logo (do raportów)',placeholder: 'https://...' },
  { key: 'pdf_footer',      label: 'Stopka w raporcie PDF', placeholder: 'Dokument wygenerowany przez RiskAnalytix' },
  { key: 'max_free_analyses', label: 'Maks. analiz dla darmowego konta', placeholder: '3' },
]

// ── small helpers ──────────────────────────────────────────────────
const badge = (role: string) => ({
  background: role === 'ADMIN' ? 'rgba(232,168,56,.15)' : 'rgba(52,199,123,.1)',
  color: role === 'ADMIN' ? '#E8A838' : '#34C77B',
  border: `1px solid ${role === 'ADMIN' ? 'rgba(232,168,56,.3)' : 'rgba(52,199,123,.3)'}`,
  padding: '2px 9px', borderRadius: '4px', fontSize: '10px', fontFamily: 'monospace',
})



const fmt = (d: string) => new Date(d).toLocaleDateString('pl-PL')

// ── types ──────────────────────────────────────────────────────────
interface StatsData {
  userCount: number
  analysisCount: number
  recentAnalyses: any[]
  recentUsers: any[]
}

export default function AdminPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [tab, setTab] = useState<Tab>('stats')
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [settingsSaved, setSettingsSaved] = useState(false)

  // queries
  const { data: stats } = useQuery<StatsData>({
    queryKey: ['admin-stats'],
    queryFn: () => api.get('/admin/stats').then((r: any) => r.data),
    enabled: tab === 'stats',
  })

  const { data: users = [] } = useQuery<any[]>({
    queryKey: ['admin-users'],
    queryFn: () => api.get('/admin/users').then((r: any) => r.data),
    enabled: tab === 'users',
  })

  const { data: analyses = [] } = useQuery<any[]>({
    queryKey: ['admin-analyses'],
    queryFn: () => api.get('/admin/analyses').then((r: any) => r.data),
    enabled: tab === 'analyses',
  })

  useQuery({
    queryKey: ['admin-settings'],
    queryFn: () => api.get('/admin/settings').then((r: any) => { setSettings(r.data); return r.data }),
    enabled: tab === 'settings',
  })

  // mutations
  const { mutate: updateRole } = useMutation({
    mutationFn: ({ id, role }: { id: string; role: string }) =>
      api.put(`/admin/users/${id}`, { role }).then(r => r.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-users'] }),
  })

  const { mutate: deleteUser } = useMutation({
    mutationFn: (id: string) => api.delete(`/admin/users/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-users'] }),
  })

  const { mutate: saveSettings, isPending: savingSettings } = useMutation({
    mutationFn: () => api.put('/admin/settings', settings),
    onSuccess: () => { setSettingsSaved(true); setTimeout(() => setSettingsSaved(false), 2500) },
  })

  const confirmDelete = (id: string, email: string) => {
    if (window.confirm(`Usunąć użytkownika ${email}? Operacja jest nieodwracalna.`)) deleteUser(id)
  }

  // ── styles ────────────────────────────────────────────────────────
  const S = {
    page: { minHeight: '100vh', background: '#0B0F1A', fontFamily: 'Lato, sans-serif', color: '#F0EDE8' } as React.CSSProperties,
    topbar: { background: '#111827', borderBottom: '1px solid #1e2d45', padding: '13px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 40 } as React.CSSProperties,
    card: { background: '#111827', border: '1px solid #1e2d45', borderRadius: '10px' } as React.CSSProperties,
    label: { fontSize: '11px', color: '#8a99b0', display: 'block', marginBottom: '6px' } as React.CSSProperties,
    input: { width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #1e2d45', background: '#0B0F1A', color: '#F0EDE8', fontSize: '13px', fontFamily: 'Lato, sans-serif', boxSizing: 'border-box' } as React.CSSProperties,
    th: { textAlign: 'left' as const, fontSize: '9px', color: '#8a99b0', padding: '10px 14px', borderBottom: '1px solid #1e2d45', textTransform: 'uppercase' as const, letterSpacing: '.07em', whiteSpace: 'nowrap' as const },
    td: { padding: '11px 14px', fontSize: '12px', borderBottom: '1px solid rgba(30,45,69,.3)', verticalAlign: 'middle' as const },
  }

  const TABS: { id: Tab; label: string; icon: string }[] = [
    { id: 'stats',    label: 'Statystyki', icon: '📊' },
    { id: 'users',    label: 'Użytkownicy', icon: '👥' },
    { id: 'analyses', label: 'Analizy',    icon: '📋' },
    { id: 'settings', label: 'Ustawienia', icon: '⚙️' },
  ]

  return (
    <div style={S.page}>

      {/* topbar */}
      <div style={S.topbar}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', color: '#8a99b0', cursor: 'pointer', fontSize: '12px' }}>← Dashboard</button>
          <span style={{ color: '#1e2d45' }}>|</span>
          <span style={{ color: '#E8A838', fontFamily: 'Georgia, serif', fontSize: '16px' }}>Panel Administratora</span>
        </div>
        <span style={{ fontSize: '10px', color: '#4a5a72', fontFamily: 'monospace' }}>ADMIN · RiskAnalytix</span>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '28px 24px' }}>

        {/* tabs */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '28px', background: '#111827', border: '1px solid #1e2d45', borderRadius: '8px', padding: '4px' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, padding: '9px', borderRadius: '6px', border: 'none', background: tab === t.id ? '#1e2d45' : 'transparent', color: tab === t.id ? '#F0EDE8' : '#8a99b0', cursor: 'pointer', fontSize: '12px', fontFamily: 'Lato, sans-serif', transition: 'all .15s' }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* ── STATS ── */}
        {tab === 'stats' && stats && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* KPI */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
              {[
                { label: 'Użytkownicy', value: stats.userCount, icon: '👥', color: '#34C77B' },
                { label: 'Analizy łącznie', value: stats.analysisCount, icon: '📋', color: '#E8A838' },
                { label: 'Śr. analiz/użytk.', value: stats.userCount ? (stats.analysisCount / stats.userCount).toFixed(1) : 0, icon: '📈', color: '#7B61FF' },
                { label: 'Status systemu', value: 'OK', icon: '✅', color: '#34C77B' },
              ].map((k, i) => (
                <div key={i} style={{ ...S.card, padding: '20px', textAlign: 'center' }}>
                  <div style={{ fontSize: '22px', marginBottom: '6px' }}>{k.icon}</div>
                  <div style={{ fontFamily: 'Georgia, serif', fontSize: '34px', color: k.color, lineHeight: 1 }}>{k.value}</div>
                  <div style={{ fontSize: '10px', color: '#8a99b0', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '.06em' }}>{k.label}</div>
                </div>
              ))}
            </div>

            {/* Recent */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={S.card}>
                <div style={{ padding: '14px 18px', borderBottom: '1px solid #1e2d45', fontSize: '11px', color: '#8a99b0', textTransform: 'uppercase', letterSpacing: '.07em' }}>Ostatnie analizy</div>
                <div>
                  {stats.recentAnalyses.map((a: any) => (
                    <div key={a.id} style={{ padding: '12px 18px', borderBottom: '1px solid rgba(30,45,69,.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '13px', color: '#F0EDE8' }}>{a.machineName}</div>
                        <div style={{ fontSize: '11px', color: '#4a5a72', marginTop: '2px' }}>{a.user?.email}</div>
                      </div>
                      <div style={{ fontSize: '10px', color: '#4a5a72' }}>{fmt(a.createdAt)}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={S.card}>
                <div style={{ padding: '14px 18px', borderBottom: '1px solid #1e2d45', fontSize: '11px', color: '#8a99b0', textTransform: 'uppercase', letterSpacing: '.07em' }}>Nowi użytkownicy</div>
                <div>
                  {stats.recentUsers.map((u: any) => (
                    <div key={u.id} style={{ padding: '12px 18px', borderBottom: '1px solid rgba(30,45,69,.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '13px', color: '#F0EDE8' }}>{u.name}</div>
                        <div style={{ fontSize: '11px', color: '#4a5a72', marginTop: '2px' }}>{u.email}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={badge(u.role)}>{u.role}</span>
                        <span style={{ fontSize: '10px', color: '#4a5a72' }}>{fmt(u.createdAt)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── USERS ── */}
        {tab === 'users' && (
          <div style={S.card}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid #1e2d45', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', color: '#8a99b0', textTransform: 'uppercase', letterSpacing: '.07em' }}>Użytkownicy ({users.length})</span>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['Imię i nazwisko', 'E-mail', 'Rola', 'Analizy', 'Data rejestracji', 'Akcje'].map(h => (
                      <th key={h} style={S.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map((u: any) => (
                    <tr key={u.id} style={{ transition: 'background .1s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,.02)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <td style={S.td}>
                        <div style={{ fontWeight: 600, color: '#F0EDE8', fontSize: '13px' }}>{u.name}</div>
                      </td>
                      <td style={S.td}>
                        <span style={{ fontSize: '12px', color: '#8a99b0', fontFamily: 'monospace' }}>{u.email}</span>
                      </td>
                      <td style={S.td}>
                        <span style={badge(u.role)}>{u.role}</span>
                      </td>
                      <td style={{ ...S.td, textAlign: 'center', fontFamily: 'monospace', color: '#E8A838' }}>
                        {u._count?.analyses ?? 0}
                      </td>
                      <td style={{ ...S.td, color: '#4a5a72', fontSize: '11px' }}>{fmt(u.createdAt)}</td>
                      <td style={S.td}>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            onClick={() => updateRole({ id: u.id, role: u.role === 'ADMIN' ? 'USER' : 'ADMIN' })}
                            style={{ padding: '4px 10px', borderRadius: '4px', border: '1px solid #1e2d45', background: 'transparent', color: '#8a99b0', cursor: 'pointer', fontSize: '10px' }}
                          >
                            {u.role === 'ADMIN' ? '→ USER' : '→ ADMIN'}
                          </button>
                          <button
                            onClick={() => confirmDelete(u.id, u.email)}
                            style={{ padding: '4px 10px', borderRadius: '4px', border: '1px solid rgba(232,64,64,.3)', background: 'transparent', color: '#E84040', cursor: 'pointer', fontSize: '10px' }}
                          >
                            Usuń
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── ANALYSES ── */}
        {tab === 'analyses' && (
          <div style={S.card}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid #1e2d45', fontSize: '11px', color: '#8a99b0', textTransform: 'uppercase', letterSpacing: '.07em' }}>
              Wszystkie analizy ({analyses.length})
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['Maszyna', 'Kategoria', 'Użytkownik', 'Zagrożeń', 'Data', 'Klient'].map(h => (
                      <th key={h} style={S.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {analyses.map((a: any) => (
                    <tr key={a.id}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,.02)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <td style={S.td}>
                        <div style={{ fontWeight: 600, color: '#F0EDE8', fontSize: '13px' }}>{a.machineName}</div>
                        <div style={{ fontSize: '10px', color: '#4a5a72', fontFamily: 'monospace', marginTop: '2px' }}>{a.norm}</div>
                      </td>
                      <td style={S.td}>
                        <span style={{ background: 'rgba(232,168,56,.1)', color: '#E8A838', border: '1px solid rgba(232,168,56,.2)', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontFamily: 'monospace' }}>
                          {a.machineCategory}
                        </span>
                      </td>
                      <td style={S.td}>
                        <div style={{ fontSize: '12px', color: '#F0EDE8' }}>{a.user?.name}</div>
                        <div style={{ fontSize: '10px', color: '#4a5a72' }}>{a.user?.email}</div>
                      </td>
                      <td style={{ ...S.td, textAlign: 'center' }}>
                        <span style={{ fontFamily: 'monospace', fontSize: '14px', fontWeight: 700, color: '#E8A838' }}>
                          {a._count?.entries ?? 0}
                        </span>
                      </td>
                      <td style={{ ...S.td, color: '#4a5a72', fontSize: '11px' }}>{fmt(a.createdAt)}</td>
                      <td style={S.td}>
                        <div style={{ fontSize: '12px', color: '#8a99b0' }}>{a.clientCompany || a.clientName || '—'}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── SETTINGS ── */}
        {tab === 'settings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={S.card}>
              <div style={{ padding: '14px 18px', borderBottom: '1px solid #1e2d45', fontSize: '11px', color: '#8a99b0', textTransform: 'uppercase', letterSpacing: '.07em' }}>
                Ustawienia systemu
              </div>
              <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                {SETTING_FIELDS.map(f => (
                  <div key={f.key}>
                    <label style={S.label}>{f.label}</label>
                    <input
                      style={S.input}
                      value={settings[f.key] || ''}
                      placeholder={f.placeholder}
                      onChange={e => setSettings(s => ({ ...s, [f.key]: e.target.value }))}
                    />
                  </div>
                ))}
              </div>
              <div style={{ padding: '16px 24px', borderTop: '1px solid #1e2d45', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <button
                  onClick={() => saveSettings()}
                  disabled={savingSettings}
                  style={{ padding: '10px 24px', borderRadius: '6px', border: 'none', background: '#E8A838', color: '#0B0F1A', cursor: 'pointer', fontSize: '13px', fontWeight: 700, fontFamily: 'Lato, sans-serif' }}
                >
                  {savingSettings ? 'Zapisywanie...' : 'Zapisz ustawienia'}
                </button>
                {settingsSaved && (
                  <span style={{ fontSize: '12px', color: '#34C77B' }}>✓ Zapisano pomyślnie</span>
                )}
              </div>
            </div>

            {/* Danger zone */}
            <div style={{ ...S.card, border: '1px solid rgba(232,64,64,.2)' }}>
              <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(232,64,64,.15)', fontSize: '11px', color: '#E84040', textTransform: 'uppercase', letterSpacing: '.07em' }}>
                Strefa niebezpieczna
              </div>
              <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', background: 'rgba(232,64,64,.04)', borderRadius: '6px', border: '1px solid rgba(232,64,64,.1)' }}>
                  <div>
                    <div style={{ fontSize: '13px', color: '#F0EDE8' }}>Eksport danych</div>
                    <div style={{ fontSize: '11px', color: '#8a99b0', marginTop: '3px' }}>Pobierz wszystkie dane systemu w formacie JSON</div>
                  </div>
                  <button style={{ padding: '8px 18px', borderRadius: '5px', border: '1px solid rgba(232,64,64,.3)', background: 'transparent', color: '#E84040', cursor: 'pointer', fontSize: '12px' }}>
                    Eksportuj
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}