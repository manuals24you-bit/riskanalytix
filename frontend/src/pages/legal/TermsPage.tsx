// frontend/src/pages/legal/TermsPage.tsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getTermsT, type Lang } from '../../i18n/termsTranslations'

const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: 'pl', label: 'PL', flag: '🇵🇱' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'de', label: 'DE', flag: '🇩🇪' },
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
  { code: 'it', label: 'IT', flag: '🇮🇹' },
  { code: 'es', label: 'ES', flag: '🇪🇸' },
  { code: 'cs', label: 'CS', flag: '🇨🇿' },
]

export default function TermsPage() {
  const [lang, setLang] = useState<Lang>(
    () => (localStorage.getItem('i18nextLng') || 'en') as Lang
  )
  const t = getTermsT(lang)

  const s = {
    h2: { fontFamily: 'Georgia, serif', fontSize: '20px', color: '#E8A838', marginTop: '36px', marginBottom: '12px' },
    p:  { fontSize: '14px', lineHeight: '1.8', color: '#C0C8D8', marginBottom: '12px' },
    li: { fontSize: '14px', lineHeight: '1.8', color: '#C0C8D8', marginBottom: '6px' },
    ul: { paddingLeft: '24px', marginBottom: '12px' },
    warning: { background: 'rgba(232,168,56,.12)', border: '1px solid rgba(232,168,56,.4)', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px' },
  } as const

  return (
    <div style={{ minHeight: '100vh', background: '#0B0F1A', color: '#F0EDE8', fontFamily: 'Lato, sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px' }}>

        {/* Nawigacja i przełącznik języka */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <Link to="/" style={{ color: '#E8A838', fontSize: '13px', textDecoration: 'none' }}>{t.back}</Link>
          <div style={{ display: 'flex', gap: '4px' }}>
            {LANGS.map(l => (
              <button key={l.code} onClick={() => setLang(l.code)}
                style={{ padding: '4px 8px', borderRadius: '4px', border: `1px solid ${lang === l.code ? '#E8A838' : '#1e2d45'}`, background: lang === l.code ? 'rgba(232,168,56,.15)' : 'transparent', color: lang === l.code ? '#E8A838' : '#4a5a72', cursor: 'pointer', fontSize: '11px', fontFamily: 'monospace' }}>
                {l.flag} {l.label}
              </button>
            ))}
          </div>
        </div>

        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '32px', marginTop: '0', marginBottom: '8px' }}>
          {t.title}
        </h1>
        <p style={{ ...s.p, color: '#6B7280' }}>{t.effectiveDate}</p>

        <div style={s.warning}>
          <p style={{ ...s.p, color: '#E8A838', fontWeight: 700, marginBottom: '6px' }}>{t.warningTitle}</p>
          <p style={{ ...s.p, marginBottom: 0 }}>{t.warningText}</p>
        </div>

        <h2 style={s.h2}>{t.s1title}</h2>
        <p style={s.p}>{t.s1p1}</p>
        <p style={s.p}>{t.s1p2}</p>
        <p style={s.p}>{t.s1p3}</p>

        <h2 style={s.h2}>{t.s2title}</h2>
        <ul style={s.ul}>
          {[t.s2u1, t.s2u2, t.s2u3, t.s2u4].map((item, i) => (
            <li key={i} style={s.li}><strong>{item.split(' – ')[0]}</strong>{item.includes(' – ') ? ' – ' + item.split(' – ').slice(1).join(' – ') : ''}</li>
          ))}
        </ul>

        <h2 style={s.h2}>{t.s3title}</h2>
        <p style={s.p}>{t.s3p1}</p>
        <ul style={s.ul}>
          <li style={s.li}>{t.s3u1}</li>
          <li style={s.li}>{t.s3u2}</li>
        </ul>
        <p style={s.p}>{t.s3p2}</p>

        <h2 style={s.h2}>{t.s4title}</h2>
        <p style={s.p}>{t.s4p1}</p>
        <p style={s.p}>{t.s4p2}</p>
        <p style={s.p}>{t.s4p3}</p>

        <h2 style={s.h2}>{t.s5title}</h2>
        <p style={s.p}>{t.s5p1}</p>
        <p style={s.p}>{t.s5p2}</p>
        <p style={s.p}>{t.s5p3}</p>
        <p style={s.p}>{t.s5p4}</p>
        <p style={s.p}>{t.s5p5}</p>

        <h2 style={s.h2}>{t.s6title}</h2>
        <p style={s.p}>{t.s6p1}</p>
        <p style={s.p}>{t.s6p2}</p>
        <p style={s.p}>{t.s6p3}</p>
        <ul style={s.ul}>
          <li style={s.li}>{t.s6u1}</li>
          <li style={s.li}>{t.s6u2}</li>
          <li style={s.li}>{t.s6u3}</li>
          <li style={s.li}>{t.s6u4}</li>
        </ul>

        <h2 style={s.h2}>{t.s7title}</h2>
        <p style={s.p}>{t.s7p1}</p>
        <p style={s.p}>{t.s7p2}</p>
        <ul style={s.ul}>
          <li style={s.li}>{t.s7u1}</li>
          <li style={s.li}>{t.s7u2}</li>
          <li style={s.li}>{t.s7u3}</li>
          <li style={s.li}>{t.s7u4}</li>
        </ul>
        <p style={s.p}>{t.s7p3}</p>
        <p style={s.p}>{t.s7p4}</p>
        <p style={s.p}>{t.s7p5}</p>

        <h2 style={s.h2}>{t.s8title}</h2>
        <p style={s.p}>{t.s8p1}</p>
        <p style={s.p}>{t.s8p2}<Link to="/privacy" style={{ color: '#E8A838' }}>{t.privacyLink}</Link>.</p>

        <h2 style={s.h2}>{t.s9title}</h2>
        <p style={s.p}>{t.s9p1}</p>

        <h2 style={s.h2}>{t.s10title}</h2>
        <p style={s.p}>{t.s10p1}</p>
        <p style={s.p}>{t.s10p2}</p>

        <h2 style={s.h2}>{t.s11title}</h2>
        <p style={s.p}>{t.s11p1}</p>
        <p style={s.p}>{t.s11p2}</p>
        <p style={s.p}>{t.s11p3}</p>
        <p style={s.p}>{t.s11p4}</p>

        <h2 style={s.h2}>{t.s12title}</h2>
        <p style={s.p}>{t.s12p1}</p>
        <p style={s.p}>{t.s12p2}</p>
        <p style={s.p}>{t.s12p3}</p>

        <h2 style={s.h2}>{t.s13title}</h2>
        <p style={s.p}>{t.s13p1}</p>
        <p style={s.p}>{t.s13p2}</p>
        <p style={s.p}>{t.s13p3}</p>
        <p style={s.p}>{t.s13p4}</p>
        <p style={s.p}>{t.s13p5}</p>

        <div style={{ ...s.warning, marginTop: '36px' }}>
          <p style={{ ...s.p, fontWeight: 700, marginBottom: '6px', color: '#E8A838' }}>{t.acceptTitle}</p>
          <p style={{ ...s.p, marginBottom: 0 }}>{t.acceptText}</p>
        </div>

        <p style={{ ...s.p, marginTop: '48px', color: '#4a5a72', fontSize: '12px' }}>
          {t.footer}
        </p>
      </div>
    </div>
  )
}