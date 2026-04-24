// frontend/src/pages/legal/InstructionsPage.tsx
// @ts-nocheck
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { getInstructionsT, type Lang } from '../../i18n/instructions'
import TipButton from '../../components/TipButton'

const S = {
  page: { minHeight: '100vh', background: '#0B0F1A', fontFamily: 'Lato, sans-serif', color: '#F0EDE8' } as React.CSSProperties,
  topbar: { background: '#111827', borderBottom: '1px solid #1e2d45', padding: '13px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 40 } as React.CSSProperties,
  logo: { fontSize: '16px', fontFamily: 'Georgia, serif', color: '#F0EDE8' } as React.CSSProperties,
  logoAccent: { color: '#E8A838' } as React.CSSProperties,
  layout: { display: 'flex', maxWidth: '1100px', margin: '0 auto', padding: '32px 24px', gap: '32px' } as React.CSSProperties,
  sidebar: { width: '220px', flexShrink: 0, position: 'sticky', top: '70px', alignSelf: 'flex-start' } as React.CSSProperties,
  sidebarTitle: { fontSize: '9px', color: '#4a5a72', textTransform: 'uppercase' as const, letterSpacing: '.12em', marginBottom: '12px', fontWeight: 700 },
  navItem: (active: boolean) => ({ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 10px', borderRadius: '6px', marginBottom: '2px', cursor: 'pointer', fontSize: '12px', background: active ? 'rgba(232,168,56,.12)' : 'transparent', color: active ? '#E8A838' : '#8a99b0', border: active ? '1px solid rgba(232,168,56,.2)' : '1px solid transparent', transition: 'all .15s' } as React.CSSProperties),
  content: { flex: 1, minWidth: 0 } as React.CSSProperties,
  section: { marginBottom: '48px' } as React.CSSProperties,
  sectionHead: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #1e2d45' } as React.CSSProperties,
  sectionIcon: { fontSize: '24px' } as React.CSSProperties,
  sectionTitle: { fontFamily: 'Georgia, serif', fontSize: '22px', color: '#F0EDE8' } as React.CSSProperties,
  h3: { fontSize: '14px', fontWeight: 700, color: '#E8A838', marginBottom: '8px', marginTop: '20px' } as React.CSSProperties,
  p: { fontSize: '13px', color: '#C0C8D8', lineHeight: 1.8, marginBottom: '12px' } as React.CSSProperties,
  card: { background: '#111827', border: '1px solid #1e2d45', borderRadius: '10px', padding: '16px 20px', marginBottom: '16px' } as React.CSSProperties,
  cardGold: { background: 'rgba(232,168,56,.06)', border: '1px solid rgba(232,168,56,.25)', borderRadius: '10px', padding: '16px 20px', marginBottom: '16px' } as React.CSSProperties,
  cardRed: { background: 'rgba(232,64,64,.06)', border: '1px solid rgba(232,64,64,.25)', borderRadius: '10px', padding: '16px 20px', marginBottom: '16px' } as React.CSSProperties,
  step: { display: 'flex', gap: '14px', marginBottom: '14px', alignItems: 'flex-start' } as React.CSSProperties,
  stepNum: { width: '28px', height: '28px', borderRadius: '50%', background: '#E8A838', color: '#0B0F1A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 900, flexShrink: 0, marginTop: '1px' } as React.CSSProperties,
  stepText: { flex: 1, fontSize: '13px', color: '#C0C8D8', lineHeight: 1.7 } as React.CSSProperties,
  badge: (color: string, bg: string) => ({ display: 'inline-block', padding: '2px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, fontFamily: 'monospace', color, background: bg, border: `1px solid ${color}44`, marginRight: '6px' } as React.CSSProperties),
  table: { width: '100%', borderCollapse: 'collapse' as const, fontSize: '12px', marginBottom: '16px' },
  th: { background: '#1F2937', color: '#E8A838', padding: '8px 12px', textAlign: 'left' as const, fontSize: '10px', textTransform: 'uppercase' as const, letterSpacing: '.06em', fontWeight: 700 },
  td: { padding: '8px 12px', borderBottom: '1px solid #1e2d45', color: '#C0C8D8', verticalAlign: 'top' as const },
  tdAlt: { padding: '8px 12px', borderBottom: '1px solid #1e2d45', color: '#C0C8D8', background: '#0f1623', verticalAlign: 'top' as const },
  link: { color: '#60A5FA', textDecoration: 'none' } as React.CSSProperties,
  tip: { display: 'flex', gap: '10px', padding: '10px 14px', background: 'rgba(74,158,255,.08)', border: '1px solid rgba(74,158,255,.25)', borderRadius: '6px', marginBottom: '12px', fontSize: '12px', color: '#C0C8D8', lineHeight: 1.6 } as React.CSSProperties,
  warn: { display: 'flex', gap: '10px', padding: '10px 14px', background: 'rgba(232,64,64,.08)', border: '1px solid rgba(232,64,64,.25)', borderRadius: '6px', marginBottom: '12px', fontSize: '12px', color: '#C0C8D8', lineHeight: 1.6 } as React.CSSProperties,
}

// Normy — dane techniczne, nie wymagają tłumaczenia
const NORMS = [
  ['EN ISO 12100:2012', 'Safety of machinery — General principles for design — Risk assessment and risk reduction', 'https://www.iso.org/standard/51528.html'],
  ['EN ISO 13849-1:2023', 'Safety of machinery — Safety-related parts of control systems', 'https://www.iso.org/standard/69883.html'],
  ['EN IEC 62061:2021', 'Safety of machinery — Functional safety', 'https://www.iec.ch/homepage'],
  ['EN ISO 14119:2013', 'Safety of machinery — Interlocking devices associated with guards', 'https://www.iso.org/standard/61335.html'],
  ['EN ISO 13857:2019', 'Safety of machinery — Safety distances', 'https://www.iso.org/standard/72664.html'],
  ['EN ISO 13850:2015', 'Safety of machinery — Emergency stop function', 'https://www.iso.org/standard/59970.html'],
  ['EN 60204-1:2018', 'Safety of machinery — Electrical equipment of machines', 'https://www.iec.ch/homepage'],
  ['EN 953:1997', 'Safety of machinery — Guards — General requirements', 'https://www.iso.org/standard/24784.html'],
  ['EN ISO 14120:2015', 'Safety of machinery — Guards — General requirements for fixed and movable guards', 'https://www.iso.org/standard/61336.html'],
  ['Directive 2006/42/EC', 'Machinery Directive', 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32006L0042'],
  ['Regulation (EU) 2023/1230', 'Machinery Regulation', 'https://eur-lex.europa.eu/legal-content/PL/TXT/?uri=CELEX%3A32023R1230'],
]
const FREE_LINKS = [
  ['ISO — Official standard summaries', 'https://www.iso.org/search.html'],
  ['PILZ — Machine safety guide', 'https://www.pilz.com/en-GB/ped/machine-safety'],
  ['SICK — Standards guide', 'https://www.sick.com/de/en/machine-safety/w/machine-safety/'],
  ['SISTEMA — BGIA/IFA tool', 'https://www.dguv.de/ifa/praxishilfen/practical-solutions-machine-safety/software-sistema/index.jsp'],
  ['Machinery Directive — EUR-Lex', 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32006L0042'],
]
const PLR_TABLE = [
  ['S1','F1','P1','a','B / 1'],
  ['S1','F1','P2','b','1 / 2'],
  ['S1','F2','P1','b','1 / 2'],
  ['S1','F2','P2','c','2 / 3'],
  ['S2','F1','P1','c','2 / 3'],
  ['S2','F1','P2','d','3'],
  ['S2','F2','P1','d','3'],
  ['S2','F2','P2','e','4'],
]

export default function InstructionsPage() {
  const [active, setActive] = useState('intro')
  const { i18n } = useTranslation()
  const [lang, setLang] = useState<Lang>(() => (i18n.language || localStorage.getItem('i18nextLng') || 'pl') as Lang)
  const _t = getInstructionsT(lang)

  useEffect(() => {
    const supported: Lang[] = ['pl', 'en', 'de', 'fr', 'it', 'es', 'cs']
    const appLang = i18n.language?.slice(0, 2) as Lang
    if (supported.includes(appLang)) setLang(appLang)
  }, [i18n.language])

  const sections = [
    { id: 'intro', icon: '🎯', title: _t.nav.intro },
    { id: 'login', icon: '🔐', title: _t.nav.login },
    { id: 'step1', icon: '⚙️', title: _t.nav.step1 },
    { id: 'step2', icon: '📋', title: _t.nav.step2 },
    { id: 'step3', icon: '⚠️', title: _t.nav.step3 },
    { id: 'sp', icon: '📊', title: _t.nav.sp },
    { id: 'plr', icon: '🛡️', title: _t.nav.plr },
    { id: 'residual', icon: '📉', title: _t.nav.residual },
    { id: 'hierarchy', icon: '🏗️', title: _t.nav.hierarchy },
    { id: 'lifecycle', icon: '🔄', title: _t.nav.lifecycle },
    { id: 'step4', icon: '💾', title: _t.nav.step4 },
    { id: 'norms', icon: '📚', title: _t.nav.norms },
    { id: 'responsibility', icon: '⚖️', title: _t.nav.responsibility },
    { id: 'notrust', icon: '🚨', title: _t.nav.nottrust },
    { id: 'validation', icon: '🔍', title: _t.nav.validation },
    { id: 'justwriting', icon: '💡', title: _t.nav.justwriting },
    { id: 'verify', icon: '🔐', title: _t.nav.verify },
    { id: 'auditor', icon: '🔎', title: _t.nav.auditor },
    { id: 'blockmap', icon: '🚫', title: _t.nav.blockmap },
    { id: 'docx', icon: '📄', title: _t.nav.docx },
    { id: 'auditlog', icon: '📋', title: _t.nav.auditlog },
  ]

  const scrollTo = (id: string) => {
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div style={S.page}>
      {/* Topbar */}
      <div style={S.topbar}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <a href="/dashboard" style={{ background: 'none', border: 'none', color: '#8a99b0', cursor: 'pointer', fontSize: '12px', fontFamily: 'monospace', textDecoration: 'none' }}>
            {_t.back}
          </a>
          <span style={{ color: '#1e2d45' }}>|</span>
          <span style={S.logo}>RiskAnaly<span style={S.logoAccent}>tix</span></span>
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          {(['pl','en','de','fr','it','es','cs'] as const).map(l => (
            <button key={l} onClick={() => setLang(l)} style={{ padding: '3px 7px', borderRadius: '4px', border: `1px solid ${lang === l ? '#E8A838' : '#1e2d45'}`, background: lang === l ? 'rgba(232,168,56,.15)' : 'transparent', color: lang === l ? '#E8A838' : '#4a5a72', cursor: 'pointer', fontSize: '10px', fontFamily: 'monospace', textTransform: 'uppercase' }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      <div style={S.layout}>
        {/* Sidebar */}
        <div style={S.sidebar}>
          <div style={S.sidebarTitle}>{_t.tocLabel}</div>
          {sections.map(s => (
            <div key={s.id} style={S.navItem(active === s.id)} onClick={() => scrollTo(s.id)}>
              <span style={{ fontSize: '14px' }}>{s.icon}</span>
              <span>{s.title}</span>
            </div>
          ))}
          <div style={{ marginTop: '24px', padding: '12px', background: 'rgba(232,168,56,.06)', borderRadius: '8px', border: '1px solid rgba(232,168,56,.2)' }}>
            <div style={{ fontSize: '10px', color: '#E8A838', fontWeight: 700, marginBottom: '6px' }}>{_t.toolVersion}</div>
            <div style={{ fontSize: '10px', color: '#4a5a72', marginTop: '4px' }}>{_t.toolCompat}</div>
          </div>
        </div>

        {/* Content */}
        <div style={S.content}>

          {/* INTRO */}
          <div id="intro" style={S.section}>
            <div style={S.sectionHead}><span style={S.sectionIcon}>🎯</span><h2 style={S.sectionTitle}>{_t.s0.title}</h2></div>
            <div style={S.cardGold}>
              <p style={{ ...S.p, marginBottom: 0 }}>{_t.s0.p1}</p>
            </div>
            <p style={S.p}>{_t.s0.wizard}</p>
            {[_t.s0.step1, _t.s0.step2, _t.s0.step3, _t.s0.step4].map((s, i) => (
              <div key={i} style={S.step}>
                <div style={S.stepNum}>{i + 1}</div>
                <div style={S.stepText}>{s}</div>
              </div>
            ))}
            <div style={{ ...S.warn, borderColor: 'rgba(232,64,64,.4)', background: 'rgba(232,64,64,.06)' }}>
              <span>⚖️</span>
              <div>
                <strong style={{ color: '#E84040', display: 'block', marginBottom: '8px' }}>{_t.s0.warnTitle}</strong>
                <p style={{ ...S.p, margin: '0 0 6px' }}>{_t.s0.warnP1}</p>
                <p style={{ ...S.p, margin: '0 0 6px' }}>{_t.s0.warnP2}</p>
                <p style={{ ...S.p, margin: '0 0 6px' }}>{_t.s0.warnP3}</p>
                <p style={{ ...S.p, margin: 0 }}>{_t.s0.warnP4}</p>
              </div>
            </div>
          </div>

          {/* LOGIN */}
          <div id="login" style={S.section}>
            <div style={S.sectionHead}><span style={S.sectionIcon}>🔐</span><h2 style={S.sectionTitle}>{_t.s1.title}</h2></div>
            <h3 style={S.h3}>{_t.s1.h1}</h3>
            {[_t.s1.reg1, _t.s1.reg2, _t.s1.reg3].map((s, i) => (
              <div key={i} style={S.step}><div style={S.stepNum}>{i + 1}</div><div style={S.stepText}>{s}</div></div>
            ))}
            <h3 style={S.h3}>{_t.s1.h2}</h3>
            <table style={S.table}>
              <thead><tr><th style={S.th}>{_t.s1.th1}</th><th style={S.th}>{_t.s1.th2}</th><th style={S.th}>{_t.s1.th3}</th></tr></thead>
              <tbody>
                {[[_t.s1.plan1, _t.s1.price1, _t.s1.desc1],[_t.s1.plan2, _t.s1.price2, _t.s1.desc2],[_t.s1.plan3, _t.s1.price3, _t.s1.desc3]].map(([plan, price, desc], i) => (
                  <tr key={i}>
                    <td style={i%2===0?S.td:S.tdAlt}><strong style={{ color: '#E8A838' }}>{plan}</strong></td>
                    <td style={i%2===0?S.td:S.tdAlt}>{price}</td>
                    <td style={i%2===0?S.td:S.tdAlt}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* STEP 1 */}
          <div id="step1" style={S.section}>
            <div style={S.sectionHead}><span style={S.sectionIcon}>⚙️</span><h2 style={S.sectionTitle}>{_t.nav.step1}</h2></div>
            <p style={S.p}>{_t.s2.p1}</p>
            <h3 style={S.h3}>{_t.s2.h1}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
              {_t.s2.cats.map((name, i) => {
                const norms = ['ISO 23125, EN ISO 12100','EN ISO 23125, EN ISO 12100','EN 13218, EN ISO 12100','EN 692, EN 693','ISO 10218-1/-2','EN 620, EN ISO 12100','EN 415-x','EN 1672-x','EN 848, EN 1870','ISO 4254-x','EN 13001-x','EN ISO 12100']
                return (
                  <div key={i} style={{ background: '#111827', border: '1px solid #1e2d45', borderRadius: '6px', padding: '8px 12px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#F0EDE8' }}>{name}</div>
                    <div style={{ fontSize: '10px', color: '#4a5a72', marginTop: '2px', fontFamily: 'monospace' }}>{norms[i]}</div>
                  </div>
                )
              })}
            </div>
            <h3 style={S.h3}>{_t.s2.h2}</h3>
            <div style={S.card}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#E8A838', marginBottom: '4px' }}>{_t.s2.methodSP}</div>
                  <div style={{ fontSize: '12px', color: '#C0C8D8' }}>{_t.s2.methodSPdesc}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#E8A838', marginBottom: '4px' }}>{_t.s2.methodSFPA}</div>
                  <div style={{ fontSize: '12px', color: '#C0C8D8' }}>{_t.s2.methodSFPAdesc}</div>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 2 */}
          <div id="step2" style={S.section}>
            <div style={S.sectionHead}><span style={S.sectionIcon}>📋</span><h2 style={S.sectionTitle}>{_t.s3.title}</h2></div>
            <h3 style={S.h3}>{_t.s3.h1}</h3>
            <p style={S.p}>{_t.s3.p1}</p>
            <h3 style={S.h3}>{_t.s3.h2}</h3>
            <div style={S.cardGold}><p style={{ ...S.p, marginBottom: '8px' }}>{_t.s3.p2}</p></div>
            <table style={S.table}>
              <thead><tr><th style={S.th}>{_t.s3.th1}</th><th style={S.th}>{_t.s3.th2}</th><th style={S.th}>{_t.s3.th3}</th></tr></thead>
              <tbody>
                {_t.s3.rows.map(([field, desc, ex], i) => (
                  <tr key={i}>
                    <td style={i%2===0?{...S.td,fontWeight:600,color:'#F0EDE8'}:{...S.tdAlt,fontWeight:600,color:'#F0EDE8'}}>{field}</td>
                    <td style={i%2===0?S.td:S.tdAlt}>{desc}</td>
                    <td style={i%2===0?{...S.td,color:'#6B7280',fontStyle:'italic'}:{...S.tdAlt,color:'#6B7280',fontStyle:'italic'}}>{ex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* STEP 3 */}
          <div id="step3" style={S.section}>
            <div style={S.sectionHead}><span style={S.sectionIcon}>⚠️</span><h2 style={S.sectionTitle}>{_t.s4.title}</h2></div>
            <p style={S.p}>{_t.s4.p1}</p>
            <h3 style={S.h3}>{_t.s4.h1}</h3>
            <table style={S.table}>
              <thead><tr><th style={S.th}>{_t.s4.th1}</th><th style={S.th}>{_t.s4.th2}</th></tr></thead>
              <tbody>
                {_t.s4.cols.map(([col, desc], i) => (
                  <tr key={i}>
                    <td style={i%2===0?{...S.td,fontWeight:600,color:'#E8A838',whiteSpace:'nowrap'}:{...S.tdAlt,fontWeight:600,color:'#E8A838',whiteSpace:'nowrap'}}>{col}</td>
                    <td style={i%2===0?S.td:S.tdAlt}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={S.tip}><span>💡</span><span>{_t.s4.tip}</span></div>
            <h3 style={S.h3}>{_t.s4.h2}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {_t.s4.blocks.map((text, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', padding: '8px 12px', background: 'rgba(232,64,64,.05)', borderRadius: '6px', border: '1px solid rgba(232,64,64,.15)' }}>
                  <span style={{ flexShrink: 0 }}>🚫</span>
                  <span style={{ fontSize: '12px', color: '#C0C8D8', lineHeight: 1.5 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* S and P */}
          <div id="sp" style={S.section}>
            <div style={S.sectionHead}><span style={S.sectionIcon}>📊</span><h2 style={S.sectionTitle}>{_t.s5.title}</h2></div>
            <h3 style={S.h3}>{_t.s5.h1}</h3>
            <div style={S.card}>
              <table style={{ ...S.table, marginBottom: 0 }}>
                <thead><tr><th style={S.th}>{_t.s5.sth1}</th><th style={S.th}>{_t.s5.sth2}</th><th style={S.th}>{_t.s5.sth3}</th></tr></thead>
                <tbody>
                  {_t.s5.sRows.map(([val, name, desc], i) => (
                    <tr key={i}>
                      <td style={i%2===0?S.td:S.tdAlt}><span style={S.badge('#F0EDE8','#1F2937')}>{val}</span></td>
                      <td style={i%2===0?{...S.td,fontWeight:600}:{...S.tdAlt,fontWeight:600}}>{name}</td>
                      <td style={i%2===0?S.td:S.tdAlt}>{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={S.warn}><span>⚠️</span><span>{_t.s5.warnS}</span></div>
            <h3 style={S.h3}>{_t.s5.h2}</h3>
            <div style={S.card}>
              <table style={{ ...S.table, marginBottom: 0 }}>
                <thead><tr><th style={S.th}>{_t.s5.sth1}</th><th style={S.th}>{_t.s5.sth2}</th><th style={S.th}>{_t.s5.sth3}</th></tr></thead>
                <tbody>
                  {_t.s5.pRows.map(([val, name, desc], i) => (
                    <tr key={i}>
                      <td style={i%2===0?S.td:S.tdAlt}><span style={S.badge('#F0EDE8','#1F2937')}>{val}</span></td>
                      <td style={i%2===0?{...S.td,fontWeight:600}:{...S.tdAlt,fontWeight:600}}>{name}</td>
                      <td style={i%2===0?S.td:S.tdAlt}>{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h3 style={S.h3}>{_t.s5.h3}</h3>
            <div style={S.card}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px', maxWidth: '320px' }}>
                <div />
                {['S=1','S=2','S=3','S=4'].map(s => <div key={s} style={{ textAlign: 'center', fontSize: '10px', color: '#8a99b0', padding: '4px', fontFamily: 'monospace' }}>{s}</div>)}
                {[4,3,2,1].map(p => [
                  <div key={'l'+p} style={{ fontSize: '10px', color: '#8a99b0', display: 'flex', alignItems: 'center', fontFamily: 'monospace' }}>P={p}</div>,
                  ...[1,2,3,4].map(s => {
                    const r = s*p
                    const cls = r>=12?'high':r>=6?'med':r>=3?'low':'neg'
                    const colors = { high: ['#DC2626','#FEE2E2'], med: ['#D97706','#FEF3C7'], low: ['#16A34A','#DCFCE7'], neg: ['#6B7280','#F3F4F6'] }
                    return <div key={s} style={{ background: colors[cls][1], borderRadius: '4px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: '12px', fontWeight: 700, color: colors[cls][0] }}>{r}</div>
                  })
                ])}
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '12px', flexWrap: 'wrap' }}>
                {_t.s5.legend.map(([r, l, c]) => (
                  <div key={r} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: c+'33', border: `1px solid ${c}` }} />
                    <span style={{ color: c, fontWeight: 700 }}>R={r}</span>
                    <span style={{ color: '#6B7280' }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* PLr */}
          <div id="plr" style={S.section}>
            <div style={S.sectionHead}><span style={S.sectionIcon}>🛡️</span><h2 style={S.sectionTitle}>{_t.s6.title}</h2></div>
            <div style={S.cardGold}><p style={{ ...S.p, marginBottom: 0 }}>{_t.s6.p1}</p></div>
            <h3 style={S.h3}>{_t.s6.h1}</h3>
            <table style={S.table}>
              <thead><tr><th style={S.th}>{_t.s6.th1}</th><th style={S.th}>{_t.s6.th2}</th><th style={S.th}>{_t.s6.th3}</th></tr></thead>
              <tbody>
                {_t.s6.params.map(([p, m, v], i) => (
                  <tr key={i}>
                    <td style={i%2===0?{...S.td,fontWeight:700,color:'#E8A838'}:{...S.tdAlt,fontWeight:700,color:'#E8A838'}}>{p}</td>
                    <td style={i%2===0?S.td:S.tdAlt}>{m}</td>
                    <td style={i%2===0?{...S.td,fontFamily:'monospace',fontSize:'11px'}:{...S.tdAlt,fontFamily:'monospace',fontSize:'11px'}}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3 style={S.h3}>{_t.s6.h2}</h3>
            <div style={S.card}>
              <table style={{ ...S.table, marginBottom: 0 }}>
                <thead><tr><th style={S.th}>S</th><th style={S.th}>F</th><th style={S.th}>P</th><th style={S.th}>PLr</th><th style={S.th}>Min.</th></tr></thead>
                <tbody>
                  {PLR_TABLE.map(([s,f,p,plr,cat], i) => {
                    const plrColor = plr==='e'?'#DC2626':plr==='d'?'#D97706':plr==='c'?'#E8A838':'#16A34A'
                    return (
                      <tr key={i}>
                        <td style={i%2===0?S.td:S.tdAlt}><span style={S.badge('#F0EDE8','#1F2937')}>{s}</span></td>
                        <td style={i%2===0?S.td:S.tdAlt}><span style={S.badge('#F0EDE8','#1F2937')}>{f}</span></td>
                        <td style={i%2===0?S.td:S.tdAlt}><span style={S.badge('#F0EDE8','#1F2937')}>{p}</span></td>
                        <td style={i%2===0?S.td:S.tdAlt}><span style={S.badge(plrColor,plrColor+'22')}>PL {plr.toUpperCase()}</span></td>
                        <td style={i%2===0?S.td:S.tdAlt}>{cat}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <div style={S.tip}><span>💡</span><span>{_t.s6.p1tip}</span></div>
            <h3 style={S.h3}>{_t.s6.h3}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              {_t.s6.cats.map(item => (
                <div key={item.cat} style={{ display: 'flex', gap: '12px', padding: '12px 14px', background: '#111827', borderRadius: '8px', border: `1px solid ${item.color}33` }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: item.color+'22', border: `1px solid ${item.color}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: item.color, flexShrink: 0, fontFamily: 'monospace' }}>
                    {item.cat}
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#F0EDE8', marginBottom: '3px' }}>{item.title}</div>
                    <div style={{ fontSize: '11px', color: '#8a99b0', lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={S.warn}><span>⚠️</span><span>{_t.s6.warn}</span></div>
          </div>

          {/* RESIDUAL */}
          <div id="residual" style={S.section}>
            <div style={S.sectionHead}><span style={S.sectionIcon}>📉</span><h2 style={S.sectionTitle}>{_t.s7.title}</h2></div>
            <div style={S.cardGold}><p style={{ ...S.p, marginBottom: 0 }}>{_t.s7.p1}</p></div>
            <h3 style={S.h3}>{_t.s7.h1}</h3>
            {_t.s7.steps.map((text, i) => (
              <div key={i} style={S.step}><div style={S.stepNum}>{i+1}</div><div style={S.stepText}>{text}</div></div>
            ))}
            <div style={S.tip}><span>💡</span><span>{_t.s7.tip}</span></div>
          </div>

          {/* HIERARCHY */}
          <div id="hierarchy" style={S.section}>
            <div style={S.sectionHead}><span style={S.sectionIcon}>🏗️</span><h2 style={S.sectionTitle}>{_t.s8.title}</h2></div>
            <p style={S.p}>{_t.s8.p1}</p>
            {_t.s8.levels.map((lev, idx) => (
              <div key={idx} style={{ marginBottom: '16px', background: '#111827', border: '1px solid #1e2d45', borderRadius: '10px', padding: '16px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '20px' }}>{lev.icon}</span>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#F0EDE8' }}>{lev.title}</div>
                </div>
                <p style={{ ...S.p, marginBottom: '10px' }}>{lev.desc}</p>
                <ul style={{ margin: 0, paddingLeft: '16px' }}>
                  {lev.bullets.map((b, i) => <li key={i} style={{ fontSize: '12px', color: '#8a99b0', lineHeight: 1.8 }}>{b}</li>)}
                </ul>
              </div>
            ))}
            <div style={S.warn}><span>⚠️</span><span>{_t.s8.warn}</span></div>
          </div>

          {/* LIFECYCLE */}
          <div id="lifecycle" style={S.section}>
            <div style={S.sectionHead}><span style={S.sectionIcon}>🔄</span><h2 style={S.sectionTitle}>{_t.s9.title}</h2></div>
            <p style={S.p}>{_t.s9.p1}</p>
            <table style={S.table}>
              <thead><tr><th style={S.th}>{_t.s9.th1}</th><th style={S.th}>{_t.s9.th2}</th><th style={S.th}>{_t.s9.th3}</th></tr></thead>
              <tbody>
                {_t.s9.rows.map(([num, stage, threats], i) => (
                  <tr key={i}>
                    <td style={i%2===0?{...S.td,fontFamily:'monospace',color:'#E8A838'}:{...S.tdAlt,fontFamily:'monospace',color:'#E8A838'}}>{num}</td>
                    <td style={i%2===0?{...S.td,fontWeight:600}:{...S.tdAlt,fontWeight:600}}>{stage}</td>
                    <td style={i%2===0?S.td:S.tdAlt}>{threats}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={S.tip}><span>💡</span><span>{_t.s9.tip}</span></div>
          </div>

          {/* STEP 4 */}
          <div id="step4" style={S.section}>
            <div style={S.sectionHead}><span style={S.sectionIcon}>💾</span><h2 style={S.sectionTitle}>{_t.s10.title}</h2></div>
            <h3 style={S.h3}>{_t.s10.h1}</h3>
            <p style={S.p}>{_t.s10.p1}</p>
            <h3 style={S.h3}>{_t.s10.h2}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              {_t.s10.seq.map((item, i) => {
                const colors = ['#E84040','#E8A838','#60A5FA','#34C77B']
                return (
                  <div key={i} style={{ display: 'flex', gap: '12px', padding: '10px 14px', background: '#111827', borderRadius: '8px', border: `1px solid ${colors[i]}33` }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: colors[i], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: '#0B0F1A', flexShrink: 0 }}>{i+1}</div>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: colors[i], marginBottom: '3px' }}>{item.label}</div>
                      <div style={{ fontSize: '11px', color: '#8a99b0', lineHeight: 1.5 }}>{item.desc}</div>
                    </div>
                  </div>
                )
              })}
            </div>
            <h3 style={S.h3}>{_t.s10.h3}</h3>
            {_t.s10.pdfSteps.map((s, i) => (
              <div key={i} style={S.step}><div style={S.stepNum}>{i+1}</div><div style={S.stepText}>{s}</div></div>
            ))}
            <h3 style={S.h3}>{_t.s10.h4}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {_t.s10.pdfContents.map(item => (
                <div key={item} style={{ fontSize: '12px', color: '#C0C8D8', padding: '6px 10px', background: '#111827', borderRadius: '6px', border: '1px solid #1e2d45' }}>{item}</div>
              ))}
            </div>
          </div>

          {/* NORMS */}
          <div id="norms" style={S.section}>
            <div style={S.sectionHead}><span style={S.sectionIcon}>📚</span><h2 style={S.sectionTitle}>{_t.s11.title}</h2></div>
            <p style={S.p}>{_t.s11.p1}</p>
            <table style={S.table}>
              <thead><tr><th style={S.th}>{_t.s11.th1}</th><th style={S.th}>{_t.s11.th2}</th><th style={S.th}>{_t.s11.th3}</th><th style={S.th}>{_t.s11.th4}</th></tr></thead>
              <tbody>
                {NORMS.map(([norm, title, link], i) => {
                  const descs = {
                    'EN ISO 12100:2012': { pl: 'Główna norma — metoda oceny i redukcji ryzyka.', en: 'Main standard — risk assessment and reduction method.' },
                    'EN ISO 13849-1:2023': { pl: 'Wymagany poziom PLr układów sterowania.', en: 'Required PLr level of control systems.' },
                    'EN IEC 62061:2021': { pl: 'Alternatywna metoda (SIL).', en: 'Alternative method (SIL).' },
                    'EN ISO 14119:2013': { pl: 'Blokady osłon.', en: 'Guard interlocking devices.' },
                    'EN ISO 13857:2019': { pl: 'Odległości bezpieczeństwa.', en: 'Safety distances.' },
                    'EN ISO 13850:2015': { pl: 'Zatrzymanie awaryjne.', en: 'Emergency stop function.' },
                    'EN 60204-1:2018': { pl: 'Wyposażenie elektryczne maszyn.', en: 'Electrical equipment of machines.' },
                    'EN 953:1997': { pl: 'Ogólne wymagania dla osłon.', en: 'General requirements for guards.' },
                    'EN ISO 14120:2015': { pl: 'Osłony stałe i ruchome.', en: 'Fixed and movable guards.' },
                    'Directive 2006/42/EC': { pl: 'Dyrektywa Maszynowa — obowiązuje do 19.01.2027.', en: 'Machinery Directive — valid until 19.01.2027.' },
                    'Regulation (EU) 2023/1230': { pl: 'Zastępuje Dyrektywę od 20.01.2027.', en: 'Replaces the Directive from 20.01.2027.' },
                  }
                  const desc = (descs[norm] || {})[['pl','cs'].includes(lang)?'pl':'en'] || descs[norm]?.en || ''
                  return (
                    <tr key={i}>
                      <td style={i%2===0?{...S.td,fontFamily:'monospace',color:'#E8A838',whiteSpace:'nowrap'}:{...S.tdAlt,fontFamily:'monospace',color:'#E8A838',whiteSpace:'nowrap'}}>{norm}</td>
                      <td style={i%2===0?{...S.td,fontSize:'11px'}:{...S.tdAlt,fontSize:'11px'}}>{title}</td>
                      <td style={i%2===0?{...S.td,fontSize:'11px'}:{...S.tdAlt,fontSize:'11px'}}>{desc}</td>
                      <td style={i%2===0?S.td:S.tdAlt}><a href={link} target="_blank" rel="noopener noreferrer" style={{ ...S.link, fontSize: '11px' }}>🔗</a></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div style={S.card}>
              <h3 style={{ ...S.h3, marginTop: 0 }}>{_t.s11.hFree}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {FREE_LINKS.map(([name, url], i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', padding: '8px 12px', background: '#0B0F1A', borderRadius: '6px' }}>
                    <div style={{ flex: 1 }}>
                      <a href={url} target="_blank" rel="noopener noreferrer" style={{ ...S.link, fontSize: '13px', fontWeight: 600 }}>{_t.s11.freeLinks[i]?.[0] || name} ↗</a>
                      <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px' }}>{_t.s11.freeLinks[i]?.[1] || ''}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RESPONSIBILITY */}
          <div id="responsibility" style={S.section}>
            <div style={S.sectionHead}><span style={S.sectionIcon}>⚖️</span><h2 style={S.sectionTitle}>{_t.s12.title}</h2></div>
            <div style={S.cardRed}><p style={{ ...S.p, marginBottom: 0 }}>{_t.s12.warn}</p></div>
            <h3 style={S.h3}>{_t.s12.h1}</h3>
            {_t.s12.duties.map((text, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', padding: '8px 12px', background: i%2===0?'#111827':'transparent', borderRadius: '6px', marginBottom: '4px' }}>
                <span style={{ fontSize: '14px' }}>✅</span>
                <span style={{ fontSize: '13px', color: '#C0C8D8', lineHeight: 1.6 }}>{text}</span>
              </div>
            ))}
            <h3 style={S.h3}>{_t.s12.h2}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {_t.s12.specialists.map(item => (
                <div key={item.title} style={{ background: '#111827', border: `1px solid ${item.color}33`, borderRadius: '8px', padding: '14px', borderLeft: `3px solid ${item.color}` }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: item.color, marginBottom: '6px' }}>{item.title}</div>
                  <div style={{ fontSize: '12px', color: '#C0C8D8', lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              ))}
            </div>
            <div style={{ ...S.cardGold, marginTop: '20px' }}>
              <p style={{ ...S.p, marginBottom: 0 }}>{_t.s12.footer}</p>
            </div>
          </div>

          {/* NOT TRUST */}
          <div id="notrust" style={S.section}>
            <div style={S.sectionHead}><span style={S.sectionIcon}>🚨</span><h2 style={S.sectionTitle}>{_t.s13.title}</h2></div>
            <div style={S.cardGold}><p style={{ ...S.p, margin: '0 0 8px' }}>{_t.s13.p1}</p><p style={{ ...S.p, margin: 0, fontWeight: 700, color: '#E8A838' }}>{_t.s13.p2}</p></div>
            <div style={{ ...S.tip, marginBottom: '16px' }}><span>ℹ️</span><span>{_t.s13.p3}</span></div>
            <h3 style={S.h3}>{_t.s13.h1}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
              {_t.s13.notWhen.map((text, i) => (
                <div key={i} style={{ padding: '10px 14px', background: '#111827', borderRadius: '8px', border: '1px solid #1e2d45', fontSize: '13px', color: '#C0C8D8', lineHeight: 1.6 }}>{text}</div>
              ))}
            </div>
            <h3 style={S.h3}>{_t.s13.h2}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {_t.s13.questions.map((text, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', padding: '8px 12px', background: 'rgba(232,168,56,.05)', borderRadius: '6px', border: '1px solid rgba(232,168,56,.15)' }}>
                  <span style={{ color: '#E8A838', fontFamily: 'monospace', fontWeight: 700, flexShrink: 0 }}>{i+1}.</span>
                  <span style={{ fontSize: '12px', color: '#C0C8D8', lineHeight: 1.5 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* VALIDATION */}
          <div id="validation" style={S.section}>
            <div style={S.sectionHead}><span style={S.sectionIcon}>🔍</span><h2 style={S.sectionTitle}>{_t.s14.title}</h2></div>
            <p style={S.p}>{_t.s14.p1}</p>
            <h3 style={S.h3}>{_t.s14.h1}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
              {_t.s14.blocks.map((text, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', padding: '8px 12px', background: 'rgba(232,64,64,.05)', borderRadius: '6px', border: '1px solid rgba(232,64,64,.2)' }}>
                  <span style={{ fontSize: '10px', fontFamily: 'monospace', fontWeight: 700, color: '#E84040', background: 'rgba(232,64,64,.15)', borderRadius: '3px', padding: '2px 6px', flexShrink: 0 }}>BLOCK</span>
                  <span style={{ fontSize: '12px', color: '#C0C8D8', lineHeight: 1.5 }}>{text}</span>
                </div>
              ))}
            </div>
            <h3 style={S.h3}>{_t.s14.h2}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
              {_t.s14.warns.map((text, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', padding: '8px 12px', background: 'rgba(232,168,56,.05)', borderRadius: '6px', border: '1px solid rgba(232,168,56,.2)' }}>
                  <span style={{ fontSize: '10px', fontFamily: 'monospace', fontWeight: 700, color: '#E8A838', background: 'rgba(232,168,56,.15)', borderRadius: '3px', padding: '2px 6px', flexShrink: 0 }}>WARN</span>
                  <span style={{ fontSize: '12px', color: '#C0C8D8', lineHeight: 1.5 }}>{text}</span>
                </div>
              ))}
            </div>
            <h3 style={S.h3}>{_t.s14.h3}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              {[[_t.s14.credHigh,'#34C77B'],[_t.s14.credMed,'#E8A838'],[_t.s14.credLow,'#E84040']].map(([text, color], i) => (
                <div key={i} style={{ padding: '10px 14px', background: '#111827', borderRadius: '8px', border: `1px solid ${color}33`, borderLeft: `3px solid ${color}` }}>
                  <span style={{ fontSize: '12px', color: '#C0C8D8' }}>{text}</span>
                </div>
              ))}
            </div>
            <h3 style={S.h3}>{_t.s14.h4}</h3>
            <p style={S.p}>{_t.s14.pdfNote}</p>
          </div>

          {/* JUST WRITING */}
          <div id="justwriting" style={S.section}>
            <div style={S.sectionHead}><span style={S.sectionIcon}>💡</span><h2 style={S.sectionTitle}>{_t.s15.title}</h2></div>
            <p style={S.p}>{_t.s15.p1}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <h3 style={{ ...S.h3, color: '#E84040', marginTop: 0 }}>{_t.s15.h1}</h3>
                {_t.s15.bad.map((text, i) => (
                  <div key={i} style={{ padding: '8px 12px', background: 'rgba(232,64,64,.05)', borderRadius: '6px', border: '1px solid rgba(232,64,64,.2)', marginBottom: '6px', fontSize: '12px', color: '#C0C8D8' }}>{text}</div>
                ))}
              </div>
              <div>
                <h3 style={{ ...S.h3, color: '#34C77B', marginTop: 0 }}>{_t.s15.h2}</h3>
                {_t.s15.good.map((text, i) => (
                  <div key={i} style={{ padding: '8px 12px', background: 'rgba(52,199,123,.05)', borderRadius: '6px', border: '1px solid rgba(52,199,123,.2)', marginBottom: '6px', fontSize: '12px', color: '#C0C8D8' }}>{text}</div>
                ))}
              </div>
            </div>
            <h3 style={S.h3}>{_t.s15.h3}</h3>
            <div style={S.card}>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '10px' }}>
                <span style={{ fontSize: '10px', fontFamily: 'monospace', fontWeight: 700, color: '#E84040', background: 'rgba(232,64,64,.15)', borderRadius: '3px', padding: '2px 8px', flexShrink: 0, alignSelf: 'flex-start' }}>S:</span>
                <span style={{ fontSize: '12px', color: '#C0C8D8' }}>{_t.s15.schemeS}</span>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <span style={{ fontSize: '10px', fontFamily: 'monospace', fontWeight: 700, color: '#60A5FA', background: 'rgba(96,165,250,.15)', borderRadius: '3px', padding: '2px 8px', flexShrink: 0, alignSelf: 'flex-start' }}>P:</span>
                <span style={{ fontSize: '12px', color: '#C0C8D8' }}>{_t.s15.schemeP}</span>
              </div>
            </div>
          </div>

          {/* VERIFY */}
          <div id="verify" style={S.section}>
            <div style={S.sectionHead}><span style={S.sectionIcon}>🔐</span><h2 style={S.sectionTitle}>{_t.s16.title}</h2></div>
            <p style={S.p}>{_t.s16.p1}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
              {_t.s16.steps.map((item, i) => (
                <div key={i} style={{ background: '#111827', border: '1px solid #1e2d45', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ background: '#1a2235', padding: '8px 14px', fontSize: '10px', color: '#8a99b0', fontFamily: 'monospace' }}>{item.cond}</div>
                  <div style={{ padding: '14px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#F0EDE8', marginBottom: '6px' }}>{item.num}. {item.title}</div>
                    <div style={{ fontSize: '12px', color: '#C0C8D8', lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={S.tip}><span>💡</span><span>{_t.s16.note}</span></div>
          </div>

          {/* AUDITOR */}
          <div id="auditor" style={S.section}>
            <div style={S.sectionHead}><span style={S.sectionIcon}>🔎</span><h2 style={S.sectionTitle}>{_t.s17.title}</h2></div>
            <p style={S.p}>{_t.s17.p1}</p>
            <h3 style={S.h3}>{_t.s17.h1}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              {_t.s17.questions.map((item, i) => (
                <div key={i} style={{ background: '#111827', border: '1px solid #1e2d45', borderRadius: '8px', padding: '14px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#F0EDE8', marginBottom: '6px' }}>{i+1}. {item.q}</div>
                  <div style={{ fontSize: '11px', color: '#4a5a72', fontFamily: 'monospace' }}>→ {item.check}</div>
                </div>
              ))}
            </div>
            <div style={S.warn}><span>⚠️</span><span>{_t.s17.note}</span></div>
          </div>

          {/* BLOCKMAP */}
          <div id="blockmap" style={S.section}>
            <div style={S.sectionHead}><span style={S.sectionIcon}>🚫</span><h2 style={S.sectionTitle}>{_t.s18.title}</h2></div>
            <p style={S.p}>{_t.s18.p1}</p>
            <h3 style={S.h3}>{_t.s18.h1}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
              {_t.s18.blocks.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', padding: '8px 12px', background: 'rgba(232,64,64,.05)', borderRadius: '6px', border: '1px solid rgba(232,64,64,.2)', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '9px', fontFamily: 'monospace', fontWeight: 700, color: '#E84040', background: 'rgba(232,64,64,.15)', borderRadius: '3px', padding: '3px 6px', flexShrink: 0, whiteSpace: 'nowrap' }}>BLOCK</span>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#F0EDE8', marginBottom: '2px' }}>{item.label}</div>
                    <div style={{ fontSize: '11px', color: '#8a99b0' }}>{item.text}</div>
                  </div>
                </div>
              ))}
            </div>
            <h3 style={S.h3}>{_t.s18.h2}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {_t.s18.warns.map((text, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', padding: '8px 12px', background: 'rgba(232,168,56,.05)', borderRadius: '6px', border: '1px solid rgba(232,168,56,.15)' }}>
                  <span style={{ fontSize: '9px', fontFamily: 'monospace', fontWeight: 700, color: '#E8A838', background: 'rgba(232,168,56,.15)', borderRadius: '3px', padding: '3px 6px', flexShrink: 0 }}>WARN</span>
                  <span style={{ fontSize: '12px', color: '#C0C8D8', lineHeight: 1.5 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* DOCX */}
          <div id="docx" style={S.section}>
            <div style={S.sectionHead}><span style={S.sectionIcon}>📄</span><h2 style={S.sectionTitle}>{_t.s19.title}</h2></div>
            <p style={S.p}>{_t.s19.p1}</p>
            <h3 style={S.h3}>{_t.s19.h1}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
              {_t.s19.contents.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', padding: '8px 12px', background: '#111827', borderRadius: '6px', border: '1px solid #1e2d45' }}>
                  <span style={{ color: '#E8A838' }}>✓</span>
                  <span style={{ fontSize: '12px', color: '#C0C8D8' }}>{item}</span>
                </div>
              ))}
            </div>
            <h3 style={S.h3}>{_t.s19.h2}</h3>
            <div style={{ background: '#111827', border: '1px solid #1e2d45', borderRadius: '8px', padding: '14px 18px', marginBottom: '12px' }}>
              <p style={{ ...S.p, marginBottom: 0 }}>{_t.s19.whenDesc}</p>
            </div>
            <div style={{ background: 'rgba(232,64,64,.06)', border: '2px solid rgba(232,64,64,.3)', borderRadius: '8px', padding: '16px 18px' }}>
              <p style={{ fontSize: '12px', color: '#E84040', fontWeight: 700, marginBottom: '8px' }}>{_t.s19.legalTitle}</p>
              <p style={{ ...S.p, marginBottom: '8px' }}>{_t.s19.legalP1}</p>
              <p style={{ ...S.p, marginBottom: 0 }}>{_t.s19.legalP2}</p>
            </div>
          </div>

          {/* AUDIT LOG */}
          <div id="auditlog" style={S.section}>
            <div style={S.sectionHead}><span style={S.sectionIcon}>📋</span><h2 style={S.sectionTitle}>{_t.s20.title}</h2></div>
            <p style={S.p}>{_t.s20.p1}</p>
            <h3 style={S.h3}>{_t.s20.h1}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
              {_t.s20.events.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '8px 12px', background: '#111827', borderRadius: '6px', border: '1px solid #1e2d45' }}>
                  <span style={{ fontSize: '10px', fontFamily: 'monospace', fontWeight: 700, color: item.color, background: item.color+'18', border: `1px solid ${item.color}44`, borderRadius: '3px', padding: '2px 6px', flexShrink: 0, minWidth: '90px', textAlign: 'center' }}>{item.code}</span>
                  <span style={{ fontSize: '12px', color: '#C0C8D8' }}>{item.desc}</span>
                </div>
              ))}
            </div>
            <h3 style={S.h3}>{_t.s20.h2}</h3>
            <div style={{ background: '#111827', border: '1px solid #1e2d45', borderRadius: '8px', padding: '14px 18px' }}>
              <p style={{ ...S.p, marginBottom: '8px' }}>{_t.s20.noteP1}</p>
              <p style={{ ...S.p, marginBottom: 0 }}>{_t.s20.noteP2}</p>
            </div>
          </div>

        </div>
      </div>
      <TipButton />
    </div>
  )
}