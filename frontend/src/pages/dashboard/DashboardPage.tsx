import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '../../store/auth.store'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../services/api'
import { getRiskLevel } from '../../utils/risk'
import type { RiskAnalysis } from '../../types'
import { getPlanLabel, getPlanColor, hasAnyPlan } from '../../utils/subscriptionHelper'

export default function DashboardPage() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const LS_BASIC_URL = 'https://riskanalytix.lemonsqueezy.com/checkout/buy/4d96c855-af2f-4ce8-baa4-4e9e70936ce3'
  const LS_PRO_URL   = 'https://riskanalytix.lemonsqueezy.com/checkout/buy/b2ddabe9-0b73-40b7-8c25-d7106aab77f1'

  const checkoutUrl = (variantUrl: string) => {
    const email = user?.email ? `?checkout[email]=${encodeURIComponent(user.email)}` : ''
    return `${variantUrl}${email}`
  }


  const queryClient = useQueryClient()

  const [showConsent, setShowConsent] = useState(false)
  const [consentTerms, setConsentTerms] = useState(false)
  const [consentInstructions, setConsentInstructions] = useState(false)

  useEffect(() => {
    if (!user?.id) return
    const key = `riskanalytix_consent_v1_${user.id}`
    if (!localStorage.getItem(key)) setShowConsent(true)
  }, [user?.id])

  const handleAcceptConsent = () => {
    if (!user?.id) return
    const key = `riskanalytix_consent_v1_${user.id}`
    localStorage.setItem(key, new Date().toISOString())
    setShowConsent(false)
  }
  const duplicateMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.post(`/analyses/${id}/duplicate`)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analyses'] })
    },
  })

  const { data: analyses = [], isLoading } = useQuery<RiskAnalysis[]>({
    queryKey: ['analyses'],
    queryFn: async () => {
      const { data } = await api.get('/analyses')
      return data
    },
    staleTime: 0,
    refetchOnMount: true,
  })

  const stats = {
    total: analyses.length,
    high: analyses.reduce((n, a) => n + (a.riskEntries ?? []).filter(e => getRiskLevel(e.severity, e.probability).cls === 'high').length, 0),
    entries: analyses.reduce((n, a) => n + (a.riskEntries ?? []).length, 0),
  }

  const LANGUAGES = ['pl', 'en', 'de', 'fr', 'it', 'es', 'cs']
  const riskColors = ['#8a99b0', '#8a99b0', '#34C77B', '#F59E0B', '#E84040']
  const riskLabels = ['—', t('risk.neg'), t('risk.low'), t('risk.med'), t('risk.high')]

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#0B0F1A', fontFamily: 'Lato, sans-serif' }}>

      {/* Modal zgody — jednorazowy przy pierwszym logowaniu */}
      {showConsent && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 999,
          background: 'rgba(0,0,0,.85)', backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '20px',
        }}>
          <div style={{
            background: '#111827', border: '1px solid rgba(232,168,56,.35)',
            borderRadius: '16px', padding: '36px', maxWidth: '520px', width: '100%',
            fontFamily: 'Lato, sans-serif',
          }}>
            {/* Nagłówek */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: '40px', height: '40px', background: 'rgba(232,168,56,.15)', border: '1px solid rgba(232,168,56,.3)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>⚠️</div>
              <div>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: '18px', color: '#F0EDE8' }}>Przed rozpoczęciem pracy</div>
                <div style={{ fontSize: '11px', color: '#4a5a72', marginTop: '2px' }}>Jednorazowe potwierdzenie — nie pojawi się ponownie</div>
              </div>
            </div>

            {/* Opis */}
            <div style={{ background: 'rgba(232,168,56,.06)', border: '1px solid rgba(232,168,56,.2)', borderRadius: '8px', padding: '12px 14px', marginBottom: '20px', fontSize: '12px', color: '#C0C8D8', lineHeight: 1.7 }}>
              RiskAnalytix jest narzędziem <strong style={{ color: '#E8A838' }}>pomocniczym</strong> wspomagającym ocenę ryzyka maszyn wg PN-EN ISO 12100:2012. Nie zastępuje konsultacji z certyfikowanym specjalistą BHP ani oficjalnej oceny zgodności CE. Pełna odpowiedzialność za prawidłowość analizy i bezpieczeństwo maszyny spoczywa na użytkowniku.
            </div>

            {/* Checkboxy */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {[
                {
                  checked: consentTerms,
                  set: setConsentTerms,
                  text: 'Zapoznałem/am się z ',
                  link: '/terms',
                  linkText: 'Regulaminem serwisu',
                  suffix: ' i akceptuję jego postanowienia.',
                },
                {
                  checked: consentInstructions,
                  set: setConsentInstructions,
                  text: 'Zapoznałem/am się z ',
                  link: '/instructions',
                  linkText: 'Instrukcją obsługi',
                  suffix: ' i rozumiem pomocniczy charakter narzędzia.',
                },
              ].map((item, i) => (
                <label key={i} style={{ display: 'flex', gap: '12px', cursor: 'pointer', alignItems: 'flex-start', padding: '10px 14px', borderRadius: '8px', border: `1px solid ${item.checked ? 'rgba(52,199,123,.35)' : '#1e2d45'}`, background: item.checked ? 'rgba(52,199,123,.05)' : 'transparent', transition: 'all .15s' }}>
                  <div
                    onClick={() => item.set(!item.checked)}
                    style={{
                      width: '18px', height: '18px', borderRadius: '4px', flexShrink: 0, marginTop: '1px',
                      border: `2px solid ${item.checked ? '#34C77B' : '#1e2d45'}`,
                      background: item.checked ? '#34C77B' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', transition: 'all .15s',
                    }}
                  >
                    {item.checked && <span style={{ color: '#0B0F1A', fontSize: '11px', fontWeight: 900 }}>✓</span>}
                  </div>
                  <span style={{ fontSize: '12px', color: '#C0C8D8', lineHeight: 1.6 }}>
                    {item.text}
                    <a href={item.link} target="_blank" rel="noopener noreferrer"
                      style={{ color: '#E8A838', textDecoration: 'underline', cursor: 'pointer' }}
                      onClick={e => e.stopPropagation()}
                    >{item.linkText}</a>
                    {item.suffix}
                  </span>
                </label>
              ))}
            </div>

            {/* Przycisk */}
            <button
              onClick={consentTerms && consentInstructions ? handleAcceptConsent : undefined}
              disabled={!consentTerms || !consentInstructions}
              style={{
                width: '100%', padding: '13px', borderRadius: '8px', border: 'none',
                background: consentTerms && consentInstructions ? '#E8A838' : '#1e2d45',
                color: consentTerms && consentInstructions ? '#0B0F1A' : '#4a5a72',
                cursor: consentTerms && consentInstructions ? 'pointer' : 'not-allowed',
                fontSize: '13px', fontWeight: 700, transition: 'all .2s',
                fontFamily: 'Lato, sans-serif',
              }}
            >
              {consentTerms && consentInstructions ? '✓ Potwierdzam — rozpocznij pracę' : 'Zaznacz oba pola aby kontynuować'}
            </button>

            <div style={{ marginTop: '12px', fontSize: '10px', color: '#4a5a72', textAlign: 'center', lineHeight: 1.5 }}>
              Data akceptacji zostanie zapisana lokalnie. Modal nie pojawi się ponownie przy kolejnych logowaniach.
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside style={{
        width: '250px', background: '#111827', borderRight: '1px solid #1e2d45',
        position: 'fixed', top: 0, left: 0, height: '100vh',
        display: 'flex', flexDirection: 'column', zIndex: 30,
      }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #1e2d45', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '28px', height: '28px', background: '#E8A838', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#0B0F1A', fontWeight: 700, fontSize: '13px' }}>R</span>
          </div>
          <span style={{ color: '#F0EDE8', fontFamily: 'Georgia, serif', fontSize: '17px' }}>
            RiskAnalytix<span style={{ color: '#E8A838' }}>.</span>
          </span>
        </div>

        <div style={{ padding: '16px 12px', flex: 1 }}>
          <div style={{ fontSize: '9px', color: '#4a5a72', letterSpacing: '.12em', textTransform: 'uppercase', padding: '0 8px', marginBottom: '8px' }}>
            {t('dashboard.navigation')}
          </div>
          {[
            { icon: '⊞', label: t('nav.dashboard'), path: '/dashboard', active: true, admin: false },
            { icon: '⊕', label: t('nav.newAnalysis'), path: '/analysis/new', active: false, admin: false },
            ...(user?.role === 'ADMIN' ? [{ icon: '⚙', label: t('nav.admin'), path: '/admin', active: false, admin: true }] : []),
          ].map((item, i) => (
            <button key={i} onClick={() => navigate(item.path)} style={{
              display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
              padding: '10px 12px', background: item.active ? '#1a2235' : 'none',
              border: 'none', borderRadius: '6px',
              color: item.admin ? '#3B82F6' : item.active ? '#F0EDE8' : '#8a99b0',
              cursor: 'pointer', fontSize: '13px', marginBottom: '2px', textAlign: 'left',
            }}>
              <span>{item.icon}</span>
              <span>{item.label}</span>
              {item.admin && (
                <span style={{ marginLeft: 'auto', background: 'rgba(59,130,246,.15)', color: '#3B82F6', fontSize: '9px', padding: '1px 6px', borderRadius: '3px' }}>
                  ADMIN
                </span>
              )}
            </button>
          ))}
        </div>

        <div style={{ padding: '10px 12px', borderTop: '1px solid #1e2d45' }}>
          <div style={{ fontSize: '9px', color: '#4a5a72', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '8px', padding: '0 4px' }}>
            {t('dashboard.language')}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {LANGUAGES.map(l => (
              <button key={l} onClick={() => i18n.changeLanguage(l)} style={{
                padding: '3px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer',
                fontSize: '10px', fontFamily: 'monospace',
                background: i18n.language === l ? '#E8A838' : '#1a2235',
                color: i18n.language === l ? '#0B0F1A' : '#8a99b0',
                fontWeight: i18n.language === l ? 700 : 400,
              }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div style={{ padding: '14px 16px', borderTop: '1px solid #1e2d45' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: user?.role === 'ADMIN'
                ? 'linear-gradient(135deg,#3B82F6,#1d4ed8)'
                : 'linear-gradient(135deg,#E8A838,#b8832a)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 700, fontSize: '13px', flexShrink: 0,
            }}>
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#F0EDE8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user?.name}
              </div>
              <div style={{ fontSize: '10px', color: '#8a99b0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user?.email}
              </div>
            </div>
          </div>
          {user?.role === 'ADMIN' && (
            <div style={{ background: 'rgba(59,130,246,.1)', border: '1px solid rgba(59,130,246,.25)', borderRadius: '5px', padding: '5px 10px', fontSize: '10px', color: '#3B82F6', marginBottom: '8px', textAlign: 'center' }}>
              ∞ Administrator
            </div>
          )}
          {user?.role !== 'ADMIN' && (
            <div style={{ marginBottom: '8px' }}>
              <div style={{
                background: `${getPlanColor(user)}18`,
                border: `1px solid ${getPlanColor(user)}44`,
                borderRadius: '5px', padding: '5px 10px', fontSize: '10px',
                color: getPlanColor(user), textAlign: 'center', fontWeight: 700,
                marginBottom: !hasAnyPlan(user) ? '6px' : '0',
              }}>
                Plan: {getPlanLabel(user)}
              </div>
              {!hasAnyPlan(user) && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <button
                    onClick={() => window.open(checkoutUrl(LS_BASIC_URL), '_blank')}
                    style={{ width: '100%', padding: '6px', borderRadius: '5px', border: 'none', background: '#E8A838', color: '#0B0F1A', cursor: 'pointer', fontSize: '10px', fontWeight: 700 }}
                  >
                    ⬆ Basic — 29 EUR/mies.
                  </button>
                  <button
                    onClick={() => window.open(checkoutUrl(LS_PRO_URL), '_blank')}
                    style={{ width: '100%', padding: '6px', borderRadius: '5px', border: 'none', background: '#A78BFA', color: '#0B0F1A', cursor: 'pointer', fontSize: '10px', fontWeight: 700 }}
                  >
                    ⬆ Pro — 59 EUR/mies.
                  </button>
                </div>
              )}
            </div>
          )}
          <button onClick={logout} style={{ width: '100%', padding: '7px', borderRadius: '5px', border: '1px solid #1e2d45', background: 'transparent', color: '#8a99b0', cursor: 'pointer', fontSize: '11px' }}>
            {t('nav.logout')}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ marginLeft: '250px', flex: 1, padding: '36px' }}>
        <div style={{ maxWidth: '900px' }}>

          <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <h1 style={{ color: '#F0EDE8', fontFamily: 'Georgia, serif', fontSize: '28px', marginBottom: '4px' }}>
                {t('dashboard.title')}
              </h1>
              <p style={{ color: '#8a99b0', fontSize: '13px' }}>{t('dashboard.subtitle')}</p>
            </div>
            {user?.role === 'ADMIN' && (
              <button onClick={() => navigate('/admin')} style={{ padding: '9px 18px', borderRadius: '6px', border: 'none', background: '#3B82F6', color: '#fff', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                ⚙️ {t('nav.admin')}
              </button>
            )}
          </div>

          {/* Banner upgrade dla FREE */}
          {!hasAnyPlan(user) && user?.role !== 'ADMIN' && (
            <div style={{ background: 'linear-gradient(135deg, #111827 0%, #0B0F1A 100%)', border: '1px solid rgba(232,168,56,.3)', borderRadius: '12px', padding: '20px 24px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#F0EDE8', marginBottom: '4px' }}>
                  🔒 Odblokuj pełne możliwości RiskAnalytix
                </div>
                <div style={{ fontSize: '12px', color: '#8a99b0' }}>
                  Plan Basic: druk i PDF · Plan Pro: DOCX, metoda S×F×P×A i więcej
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
                <button
                  onClick={() => window.open(checkoutUrl(LS_BASIC_URL), '_blank')}
                  style={{ padding: '9px 18px', borderRadius: '6px', border: 'none', background: '#E8A838', color: '#0B0F1A', cursor: 'pointer', fontSize: '12px', fontWeight: 700, whiteSpace: 'nowrap' }}
                >
                  Basic — 29 EUR/mies.
                </button>
                <button
                  onClick={() => window.open(checkoutUrl(LS_PRO_URL), '_blank')}
                  style={{ padding: '9px 18px', borderRadius: '6px', border: 'none', background: '#A78BFA', color: '#0B0F1A', cursor: 'pointer', fontSize: '12px', fontWeight: 700, whiteSpace: 'nowrap' }}
                >
                  Pro — 59 EUR/mies.
                </button>
              </div>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px', marginBottom: '24px' }}>
            {[
              { label: t('dashboard.totalAnalyses'), value: stats.total, icon: '📋', danger: false },
              { label: t('dashboard.highRisks'), value: stats.high, icon: '⚠️', danger: true },
              { label: t('dashboard.totalThreats'), value: stats.entries, icon: '✓', danger: false },
            ].map((s, i) => (
              <div key={i} style={{ background: '#111827', border: `1px solid ${s.danger && s.value > 0 ? 'rgba(232,64,64,.3)' : '#1e2d45'}`, borderRadius: '10px', padding: '22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: '10px', color: '#8a99b0', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: '6px' }}>{s.label}</div>
                    <div style={{ fontFamily: 'Georgia, serif', fontSize: '38px', color: s.danger && s.value > 0 ? '#E84040' : '#F0EDE8' }}>{s.value}</div>
                  </div>
                  <span style={{ fontSize: '22px' }}>{s.icon}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: 'linear-gradient(135deg,#111827,#1a2235)', border: '1px solid #E8A838', borderRadius: '12px', padding: '22px 24px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 0 30px rgba(232,168,56,.1)' }}>
            <div>
              <h3 style={{ color: '#F0EDE8', fontFamily: 'Georgia, serif', fontSize: '18px', marginBottom: '3px' }}>{t('dashboard.newAnalysis')}</h3>
              <p style={{ color: '#8a99b0', fontSize: '12px' }}>{t('dashboard.newAnalysisDesc')}</p>
            </div>
            <button onClick={() => navigate('/analysis/new')} style={{ padding: '10px 22px', borderRadius: '6px', border: 'none', background: '#E8A838', color: '#0B0F1A', cursor: 'pointer', fontSize: '12px', fontWeight: 700, whiteSpace: 'nowrap' }}>
              {t('dashboard.createBtn')}
            </button>
          </div>

          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '48px', color: '#8a99b0' }}>{t('common.loading')}</div>
          ) : analyses.length > 0 ? (
            <div style={{ background: '#111827', border: '1px solid #1e2d45', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ padding: '12px 18px', borderBottom: '1px solid #1e2d45' }}>
                <span style={{ fontSize: '10px', color: '#8a99b0', textTransform: 'uppercase', letterSpacing: '.08em' }}>
                  {t('dashboard.historyTitle')} ({analyses.length})
                </span>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {[t('dashboard.machine'), "S/N", t('dashboard.date'), t('dashboard.threats'), t('dashboard.maxRisk'), ''].map((h, i) => (
                      <th key={i} style={{ textAlign: 'left', fontSize: '10px', color: '#8a99b0', padding: '10px 14px', borderBottom: '1px solid #1e2d45', letterSpacing: '.08em', textTransform: 'uppercase' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {analyses.map(a => {
                    const entries = a.riskEntries ?? []
                    const maxLevel = entries.reduce((m, e) => {
                      const r = getRiskLevel(e.severity, e.probability)
                      return r.level > m ? r.level : m
                    }, 0)
                    return (
                      <tr key={a.id} style={{ borderBottom: '1px solid rgba(30,45,69,.5)' }}>
                        <td style={{ padding: '12px 14px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: '#F0EDE8' }}>{a.machineName}</span>
                            {a.isDraft && (
                              <span title="Szkic — analiza w trakcie tworzenia" style={{ fontSize: '10px', background: 'rgba(245,158,11,.15)', color: '#F59E0B', border: '1px solid rgba(245,158,11,.3)', borderRadius: '4px', padding: '1px 6px', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                                🚧 szkic
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: '11px', color: '#8a99b0' }}>{a.manufacturer}</div>
                        </td>
                        <td style={{ padding: '12px 14px', fontSize: '11px', color: '#8a99b0', fontFamily: 'monospace' }}>{a.serialNo || '—'}</td>
                          <td style={{ padding: '12px 14px', fontSize: '11px', color: '#8a99b0', fontFamily: 'monospace' }}>{a.analysisDate?.slice(0, 10)}</td>
                        <td style={{ padding: '12px 14px', fontFamily: 'monospace', fontSize: '14px', color: '#F0EDE8' }}>{entries.length}</td>
                        <td style={{ padding: '12px 14px' }}>
                          <span style={{ background: riskColors[maxLevel] + '22', color: riskColors[maxLevel], border: `1px solid ${riskColors[maxLevel]}44`, padding: '2px 10px', borderRadius: '4px', fontSize: '11px', fontFamily: 'monospace' }}>
                            {riskLabels[maxLevel]}
                          </span>
                        </td>
                        <td style={{ padding: '12px 14px' }}>
                          <div style={{ display: 'flex', gap: '6px' }}>
                          <button onClick={() => navigate(`/analysis/${a.id}`)} style={{ padding: '5px 12px', borderRadius: '5px', border: '1px solid #1e2d45', background: 'transparent', color: '#8a99b0', cursor: 'pointer', fontSize: '11px' }}>
                            {t('dashboard.open')}
                          </button>
                          <button
                            onClick={() => duplicateMutation.mutate(a.id)}
                            disabled={duplicateMutation.isPending}
                            title={t('dashboard.duplicate') || 'Duplikuj analizę'}
                            style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid #1e2d45', background: 'transparent', color: '#8a99b0', cursor: 'pointer', fontSize: '11px' }}
                          >
                            📋
                          </button>
                          <button
                            onClick={() => navigate(`/analysis/${a.id}/edit`)}
                            title="Edytuj analizę"
                            style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid #1e2d45', background: 'transparent', color: '#8a99b0', cursor: 'pointer', fontSize: '11px' }}
                          >
                            ✏️
                          </button>
                        </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '48px', background: '#111827', border: '1px solid #1e2d45', borderRadius: '10px', color: '#8a99b0' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>📋</div>
              <div style={{ fontSize: '14px', marginBottom: '6px', color: '#F0EDE8' }}>{t('dashboard.noAnalyses')}</div>
              <div style={{ fontSize: '12px' }}>{t('dashboard.noAnalysesDesc')}</div>
            </div>
          )}

          <div style={{ marginTop: '48px', paddingTop: '20px', borderTop: '1px solid #1e2d45', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {(['terms', 'privacy', 'rodo'] as const).map(key => (
              <Link key={key} to={`/${key}`} style={{ color: '#4a5a72', fontSize: '11px', textDecoration: 'none' }}>
                {t(`dashboard.${key}`)}
              </Link>
            ))}
            <Link to="/instructions" style={{ color: '#E8A838', fontSize: '11px', textDecoration: 'none', fontWeight: 600 }}>
              📖 Instrukcja obsługi
            </Link>
          </div>

        </div>
      </main>
    </div>
  )
}