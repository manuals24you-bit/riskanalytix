// frontend/src/pages/legal/PrivacyPage.tsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getPrivacyT, type Lang } from '../../i18n/privacyTranslations'

const LANGS: { code: Lang; flag: string; label: string }[] = [
  { code: 'pl', flag: '🇵🇱', label: 'PL' },
  { code: 'en', flag: '🇬🇧', label: 'EN' },
  { code: 'de', flag: '🇩🇪', label: 'DE' },
  { code: 'fr', flag: '🇫🇷', label: 'FR' },
  { code: 'it', flag: '🇮🇹', label: 'IT' },
  { code: 'es', flag: '🇪🇸', label: 'ES' },
  { code: 'cs', flag: '🇨🇿', label: 'CS' },
]

export default function PrivacyPage() {
  const [lang, setLang] = useState<Lang>(
    () => (localStorage.getItem('i18nextLng') || 'en') as Lang
  )
  const t = getPrivacyT(lang)

  const s = {
    h2: { fontFamily: 'Georgia, serif', fontSize: '18px', color: '#E8A838', marginTop: '36px', marginBottom: '10px', paddingBottom: '6px', borderBottom: '1px solid rgba(232,168,56,.2)' } as React.CSSProperties,
    p:  { fontSize: '13px', lineHeight: '1.8', color: '#C0C8D8', marginBottom: '10px' } as React.CSSProperties,
    li: { fontSize: '13px', lineHeight: '1.8', color: '#C0C8D8', marginBottom: '8px' } as React.CSSProperties,
    ul: { paddingLeft: '20px', marginBottom: '12px' } as React.CSSProperties,
    box: { background: '#111827', border: '1px solid #1e2d45', borderRadius: '8px', padding: '14px 18px', marginBottom: '10px' } as React.CSSProperties,
    boxLabel: { fontSize: '11px', color: '#E8A838', fontWeight: 700, marginBottom: '4px' } as React.CSSProperties,
  } as const

  return (
    <div style={{ minHeight: '100vh', background: '#0B0F1A', color: '#F0EDE8', fontFamily: 'Lato, sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px' }}>

        {/* Nawigacja i przełącznik języka */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
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

        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '30px', marginBottom: '6px' }}>
          {t.title}
        </h1>
        <p style={{ ...s.p, color: '#4a5a72', marginBottom: '36px' }}>{t.effectiveDate}</p>

        {/* §1 */}
        <h2 style={s.h2}>{t.s1title}</h2>
        <p style={s.p}>{t.s1p1}</p>
        <p style={s.p}>{t.s1p2}</p>
        <p style={s.p}>{t.s1p3}</p>
        <p style={s.p}>{t.s1p4}</p>

        {/* §2 */}
        <h2 style={s.h2}>{t.s2title}</h2>
        <p style={s.p}>{t.s2intro}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
          {[
            { title: t.s2b1title, text: t.s2b1text },
            { title: t.s2b2title, text: t.s2b2text },
            { title: t.s2b3title, text: t.s2b3text },
            { title: t.s2b4title, text: t.s2b4text },
          ].map((item, i) => (
            <div key={i} style={s.box}>
              <div style={s.boxLabel}>{item.title}</div>
              <p style={{ ...s.p, marginBottom: 0 }}>{item.text}</p>
            </div>
          ))}
        </div>

        {/* §3 */}
        <h2 style={s.h2}>{t.s3title}</h2>
        <p style={s.p}>{t.s3intro}</p>
        <ul style={s.ul}>
          <li style={s.li}>{t.s3p1}</li>
          <li style={s.li}>{t.s3p2}</li>
          <li style={s.li}>{t.s3p3}</li>
        </ul>

        {/* §4 */}
        <h2 style={s.h2}>{t.s4title}</h2>
        <p style={s.p}>{t.s4intro}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
          {[
            { title: t.s4b1title, text: t.s4b1text },
            { title: t.s4b2title, text: t.s4b2text },
            { title: t.s4b3title, text: t.s4b3text },
          ].map((item, i) => (
            <div key={i} style={s.box}>
              <div style={s.boxLabel}>{item.title}</div>
              <p style={{ ...s.p, marginBottom: 0 }}>{item.text}</p>
            </div>
          ))}
        </div>

        {/* §5 */}
        <h2 style={s.h2}>{t.s5title}</h2>
        <p style={s.p}>{t.s5intro}</p>
        <ul style={s.ul}>
          <li style={s.li}>{t.s5p1}</li>
          <li style={s.li}>{t.s5p2}</li>
          <li style={s.li}>{t.s5p3}</li>
        </ul>

        {/* §6 */}
        <h2 style={s.h2}>{t.s6title}</h2>
        <p style={s.p}>{t.s6intro}</p>
        <ul style={s.ul}>
          {[t.s6r1, t.s6r2, t.s6r3, t.s6r4, t.s6r5, t.s6r6, t.s6r7].map((r, i) => (
            <li key={i} style={s.li}>{r}</li>
          ))}
        </ul>

        {/* §7 */}
        <h2 style={s.h2}>{t.s7title}</h2>
        <div style={{ background: 'rgba(52,199,123,.06)', border: '1px solid rgba(52,199,123,.25)', borderRadius: '8px', padding: '14px 18px', marginBottom: '12px' }}>
          <p style={{ ...s.p, color: '#34C77B', fontWeight: 600, marginBottom: '4px' }}>✓ {lang === 'pl' ? 'Tylko niezbędne cookies techniczne' : lang === 'de' ? 'Nur technisch notwendige Cookies' : lang === 'fr' ? 'Uniquement les cookies techniques nécessaires' : lang === 'it' ? 'Solo cookie tecnici necessari' : lang === 'es' ? 'Solo cookies técnicas necesarias' : lang === 'cs' ? 'Pouze nezbytné technické cookies' : 'Strictly necessary technical cookies only'}</p>
          <p style={{ ...s.p, marginBottom: 0 }}>{t.s7p1}</p>
        </div>
        <p style={s.p}>{t.s7p2}</p>
        <p style={s.p}>{t.s7p3}</p>

        {/* Stopka */}
        <p style={{ ...s.p, marginTop: '48px', color: '#4a5a72', fontSize: '11px', borderTop: '1px solid #1e2d45', paddingTop: '20px' }}>
          {t.footer}
        </p>

      </div>
    </div>
  )
}