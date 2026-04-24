import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getLandingT } from '../i18n/landingTranslations'
import type { Lang } from '../i18n/landingTranslations'
import ContactForm from './analysis/ContactForm'

const NORMS = [
  'EN ISO 12100:2012', 'ISO 23125:2015', 'ISO 16090-1:2017', 'EN 13218:2002',
  'ISO 16092-2:2017', 'ISO 16092-3:2017', 'ISO 10218-1:2011', 'ISO/TS 15066:2016',
  'EN 620:2002', 'EN 415-3:2009', 'ISO 20430:2020', 'EN 1870-1:2012',
  'EN 1672-2:2009', 'EN 15011:2014', 'ISO 4254-7:2017', 'ISO 3691-1:2011',
  'EN 692:2009', 'EN 693:2011', 'Dyrektywa 2006/42/WE', 'Rozporządzenie 2023/1230/UE',
]

const SIDEBAR_LINKS = [
  { label: 'Możliwości', href: '#funkcje', desc: 'Baza zagrożeń, macierz S×P, PDF' },
  { label: 'Deklaracja CE', href: '#deklaracja-ce', desc: 'Szablon Deklaracji Zgodności CE' },
  { label: 'Jak to działa', href: '#jak-to-dziala', desc: 'Analiza ryzyka w 4 krokach' },
  { label: 'Cennik', href: '#cennik', desc: 'Freemium · Basic 19 EUR · PRO 29 EUR' },
  { label: 'Kontakt', href: '#kontakt', desc: 'Pomoc techniczna i pytania' },
]

export default function LandingPage() {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('hero')
  const [lang, setLang] = useState<Lang>((localStorage.getItem('i18nextLng') || 'en') as Lang)
  const t = getLandingT(lang)

  const goTo = (id: string) => setActiveSection(id)

  useEffect(() => {
    const onStorage = () => setLang((localStorage.getItem('i18nextLng') || 'en') as Lang)
    window.addEventListener('storage', onStorage)
    const onFocus = () => setLang((localStorage.getItem('i18nextLng') || 'en') as Lang)
    window.addEventListener('focus', onFocus)
    return () => { window.removeEventListener('storage', onStorage); window.removeEventListener('focus', onFocus) }
  }, [])

  useEffect(() => {
    if (localStorage.getItem('i18nextLng_manual')) return
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(d => {
        const map: Record<string, string> = {
          'PL': 'pl', 'DE': 'de', 'AT': 'de', 'CH': 'de',
          'FR': 'fr', 'BE': 'fr', 'LU': 'fr', 'IT': 'it',
          'ES': 'es', 'MX': 'es', 'AR': 'es', 'CO': 'es', 'CZ': 'cs', 'SK': 'cs',
        }
        const dl = map[d.country_code]
        if (dl && !localStorage.getItem('i18nextLng')) { setLang(dl as Lang); localStorage.setItem('i18nextLng', dl) }
      }).catch(() => {})
  }, [])

  const FEATURES = [
    { icon: '⚙️', title: t.feat1title, desc: t.feat1desc },
    { icon: '📐', title: t.feat2title, desc: t.feat2desc },
    { icon: '📋', title: t.feat3title, desc: t.feat3desc },
    { icon: '🏷️', title: t.feat4title, desc: t.feat4desc, badge: t.feat4badge },
    { icon: '⚖️', title: t.feat5title, desc: t.feat5desc },
    { icon: '🌍', title: t.feat6title, desc: t.feat6desc },
  ]

  const CE_ITEMS = [
    { icon: '📄', text: t.ceItem1 },
    { icon: '🏭', text: t.ceItem2 },
    { icon: '📜', text: t.ceItem3 },
    { icon: '🔬', text: t.ceItem4 },
    { icon: '✍️', text: t.ceItem5 },
    { icon: '🌐', text: t.ceItem6 },
  ]

  const PLANS = [
    {
      name: t.plan1name, price: '0', period: '',
      desc: t.plan1desc, cta: t.plan1cta, highlighted: false, lsUrl: '',
      features: [t.plan1f1, t.plan1f2, t.plan1f3, t.plan1f4, t.plan1f5],
    },
    {
      name: t.plan2name, price: '19', period: 'mo.', lsUrl: 'https://riskanalytix.lemonsqueezy.com/checkout/buy/4d96c855-af2f-4ce8-baa4-4e9e70936ce3',
      desc: t.plan2desc, cta: t.plan2cta, highlighted: false,
      features: [t.plan2f1, t.plan2f2, t.plan2f3, t.plan2f4, t.plan2f5, t.plan2f6],
    },
    {
      name: t.plan3name, price: '29', period: 'mo.', lsUrl: 'https://riskanalytix.lemonsqueezy.com/checkout/buy/b2ddabe9-0b73-40b7-8c25-d7106aab77f1',
      desc: t.plan3desc, cta: t.plan3cta, highlighted: true,
      features: [t.plan3f1, t.plan3f2, t.plan3f3, t.plan3f4, t.plan3f5, t.plan3f6, t.plan3f7],
    },
  ]

  const STEPS = [
    { n: '01', title: t.step1title, desc: t.step1desc },
    { n: '02', title: t.step2title, desc: t.step2desc },
    { n: '03', title: t.step3title, desc: t.step3desc },
    { n: '04', title: t.step4title, desc: t.step4desc },
  ]

  return (
    <div style={{ background: '#0B0F1A', color: '#F0EDE8', fontFamily: 'Georgia, serif', overflow: 'hidden', height: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '0 32px', height: '54px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(11,15,26,.96)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '22px', height: '22px', background: '#E8A838', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px' }}>⚠</div>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: '15px', letterSpacing: '.03em', color: '#E0DDD8' }}>RiskAnaly<span style={{ color: '#E8A838' }}>tix</span></span>
        </div>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          {[
            { label: t.navFeatures, id: 'funkcje' },
            { label: t.navCE, id: 'deklaracja-ce' },
            { label: t.navHowItWorks, id: 'jak-to-dziala' },
            { label: t.navPricing, id: 'cennik' },
          ].map(l => (
            <span key={l.id} onClick={() => goTo(l.id)} style={{ color: activeSection === l.id ? '#E8A838' : '#5a6a82', fontSize: '12px', fontFamily: 'Lato, sans-serif', cursor: 'pointer', transition: 'color .15s' }}>{l.label}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => navigate('/auth')} style={{ padding: '6px 14px', borderRadius: '4px', border: '1px solid #1e2d45', background: 'transparent', color: '#5a6a82', cursor: 'pointer', fontSize: '11px' }}>{t.navLogin}</button>
          <button onClick={() => navigate('/auth')} style={{ padding: '6px 14px', borderRadius: '4px', border: 'none', background: '#E8A838', color: '#0B0F1A', cursor: 'pointer', fontSize: '11px', fontWeight: 700 }}>{t.navTry}</button>
        </div>
      </nav>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', width: '100%', maxWidth: '1280px', margin: '0 auto', paddingTop: '54px' }}>
        {/* SIDEBAR */}
        <aside style={{ width: '210px', flexShrink: 0, height: '100%', padding: '40px 0 24px 20px', display: 'flex', flexDirection: 'column', borderRight: '1px solid #151d2e', overflowY: 'auto' }}>
          <div style={{ fontSize: '8px', color: '#2a3a52', textTransform: 'uppercase', letterSpacing: '.14em', fontFamily: 'Lato, sans-serif', marginBottom: '14px', paddingLeft: '10px' }}>Ocena ryzyka maszyn</div>
          <div style={{ flex: 1 }}>
            {SIDEBAR_LINKS.map(link => {
              const sid = link.href.replace('#', '')
              const active = activeSection === sid
              return (
                <div key={link.href} onClick={() => goTo(sid)} style={{ display: 'block', padding: '7px 10px', borderRadius: '5px', cursor: 'pointer', background: active ? 'rgba(232,168,56,.07)' : 'transparent', borderLeft: `2px solid ${active ? '#E8A838' : 'transparent'}`, transition: 'all .15s' }}>
                  <div style={{ fontSize: '12px', color: active ? '#E8A838' : '#6b7a94', fontFamily: 'Lato, sans-serif', fontWeight: active ? 600 : 400 }}>{link.label}</div>
                  <div style={{ fontSize: '10px', color: '#2a3a52', fontFamily: 'Lato, sans-serif', lineHeight: 1.35 }}>{link.desc}</div>
                </div>
              )
            })}
          </div>
          <div style={{ padding: '14px 10px 0', borderTop: '1px solid #151d2e', marginTop: '20px' }}>
            <div style={{ fontSize: '9px', color: '#2a3a52', fontFamily: 'Lato, sans-serif', lineHeight: 1.7 }}>
              PN-EN ISO 12100:2012<br />
              Dyrektywa 2006/42/WE<br />
              Rozp. 2023/1230/UE
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main style={{ flex: 1, minWidth: 0, overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'relative', height: '100%', width: '100%' }}>

            {/* HERO */}
            <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', padding: '54px 52px', opacity: activeSection === 'hero' ? 1 : 0, pointerEvents: activeSection === 'hero' ? 'auto' : 'none', transition: 'opacity .3s ease' }}>
              <section style={{ maxWidth: '800px', margin: '0 auto 0 40px' }}>
                <h1 style={{ fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.1, margin: '0 0 24px', fontWeight: 400, color: '#E8E4DE' }}>
                  {t.heroTitle1}<br /><span style={{ color: '#E8A838', fontStyle: 'italic' }}>{t.heroTitle2}</span>
                </h1>
                <p style={{ fontSize: '18px', color: '#6b7a94', lineHeight: 1.7, marginBottom: '36px', fontFamily: 'Lato, sans-serif', maxWidth: '600px' }}>{t.heroDesc}</p>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <button onClick={() => navigate('/auth')} style={{ padding: '14px 32px', borderRadius: '5px', background: '#E8A838', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '14px' }}>{t.heroCta1}</button>
                  <button onClick={() => goTo('deklaracja-ce')} style={{ padding: '14px 28px', borderRadius: '5px', border: '1px solid #1e2d45', background: 'transparent', color: '#6b7a94', cursor: 'pointer', fontSize: '14px' }}>{t.heroCta2}</button>
                </div>
              </section>
            </div>

            {/* FEATURES */}
            <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', padding: '54px 52px', opacity: activeSection === 'funkcje' ? 1 : 0, pointerEvents: activeSection === 'funkcje' ? 'auto' : 'none', transition: 'opacity .3s ease' }}>
              <section style={{ maxWidth: '900px', margin: '0 auto 0 40px' }}>
                <h2 style={{ fontSize: '36px', color: '#E0DDD8', marginBottom: '32px' }}>{t.featuresTitle1} <span style={{ color: '#E8A838' }}>{t.featuresTitle2}</span></h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                  {FEATURES.map((f, i) => (
                    <div key={i} style={{ background: '#0d1221', border: '1px solid #151d2e', borderRadius: '8px', padding: '24px' }}>
                      <div style={{ fontSize: '24px', marginBottom: '12px' }}>{f.icon}</div>
                      <h3 style={{ fontSize: '16px', color: '#C8C4BE', marginBottom: '10px', fontFamily: 'Lato, sans-serif' }}>{f.title}</h3>
                      <p style={{ fontSize: '13px', color: '#4a5a72', lineHeight: 1.6, fontFamily: 'Lato, sans-serif' }}>{f.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* CE */}
            <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', padding: '54px 52px', opacity: activeSection === 'deklaracja-ce' ? 1 : 0, pointerEvents: activeSection === 'deklaracja-ce' ? 'auto' : 'none', transition: 'opacity .3s ease' }}>
              <section style={{ maxWidth: '800px', margin: '0 auto 0 40px' }}>
                <h2 style={{ fontSize: '36px', color: '#E0DDD8', marginBottom: '12px' }}>{t.ceTitle1} <i style={{ color: '#E8A838' }}>{t.ceTitle2}</i></h2>
                <p style={{ color: '#4a5a72', fontSize: '14px', lineHeight: 1.75, fontFamily: 'Lato, sans-serif' }}>{t.ceDesc}</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginTop: '30px' }}>
                  {CE_ITEMS.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#6b7a94' }}>
                      <span>{item.icon}</span> {item.text}
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* HOW IT WORKS */}
            <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', padding: '54px 52px', opacity: activeSection === 'jak-to-dziala' ? 1 : 0, pointerEvents: activeSection === 'jak-to-dziala' ? 'auto' : 'none', transition: 'opacity .3s ease' }}>
              <section style={{ maxWidth: '800px', margin: '0 auto 0 40px' }}>
                <h2 style={{ fontSize: '36px', color: '#E0DDD8', marginBottom: '32px' }}>{t.howTitle1} <span style={{ color: '#E8A838' }}>{t.howTitle2}</span></h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {STEPS.map((s, i) => (
                    <div key={i} style={{ display: 'flex', gap: '24px', padding: '24px', background: i % 2 === 0 ? '#0d1221' : 'transparent', borderRadius: '8px' }}>
                      <div style={{ fontSize: '32px', color: 'rgba(232,168,56,.2)', fontStyle: 'italic' }}>{s.n}</div>
                      <div>
                        <h3 style={{ fontSize: '16px', color: '#C8C4BE', marginBottom: '6px', fontFamily: 'Lato, sans-serif' }}>{s.title}</h3>
                        <p style={{ fontSize: '13px', color: '#4a5a72', lineHeight: 1.6, fontFamily: 'Lato, sans-serif' }}>{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* PRICING */}
            <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', padding: '54px 52px', opacity: activeSection === 'cennik' ? 1 : 0, pointerEvents: activeSection === 'cennik' ? 'auto' : 'none', transition: 'opacity .3s ease' }}>
              <section style={{ maxWidth: '1000px', margin: '0 auto 0 40px' }}>
                <h2 style={{ fontSize: '36px', color: '#E0DDD8', marginBottom: '10px' }}>{t.pricingTitle1} <span style={{ color: '#E8A838' }}>{t.pricingTitle2}</span></h2>
                <p style={{ color: '#4a5a72', fontSize: '14px', marginBottom: '40px' }}>{t.pricingDesc}</p>
                
                {/* TICKER NORM */}
                <div style={{ marginBottom: '40px', overflow: 'hidden', borderTop: '1px solid #151d2e', paddingTop: '20px' }}>
                  <div style={{ display: 'flex', gap: '15px', animation: 'scroll-left 40s linear infinite', width: 'max-content' }}>
                    {[...NORMS, ...NORMS].map((n, i) => (
                      <span key={i} style={{ padding: '4px 12px', border: '1px solid rgba(232,168,56,.1)', borderRadius: '20px', fontSize: '10px', color: '#3a4a62' }}>{n}</span>
                    ))}
                  </div>
                  <style>{`@keyframes scroll-left { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }`}</style>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                  {PLANS.map((p, i) => (
                    <div key={i} style={{ background: '#0d1221', border: `1px solid ${p.highlighted ? '#E8A838' : '#151d2e'}`, borderRadius: '10px', padding: '32px' }}>
                      <div style={{ fontSize: '11px', color: '#E8A838', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '10px' }}>{p.name}</div>
                      <div style={{ fontSize: '42px', color: '#E0DDD8', marginBottom: '15px' }}>{p.price} <small style={{ fontSize: '14px', color: '#4a5a72' }}>EUR</small></div>
                      <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', color: '#6b7a94', marginBottom: '30px' }}>
                        {p.features.map((f, j) => <li key={j} style={{ marginBottom: '10px' }}>✓ {f}</li>)}
                      </ul>
                      <button onClick={() => p.lsUrl ? window.open(p.lsUrl, '_blank') : navigate('/auth')} style={{ width: '100%', padding: '12px', background: p.highlighted ? '#E8A838' : 'transparent', border: '1px solid #E8A838', color: p.highlighted ? '#0B0F1A' : '#E8A838', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>{p.cta}</button>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* CONTACT */}
            <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', padding: '54px 52px', opacity: activeSection === 'kontakt' ? 1 : 0, pointerEvents: activeSection === 'kontakt' ? 'auto' : 'none', transition: 'opacity .3s ease' }}>
              <section style={{ maxWidth: '900px', margin: '0 auto 0 40px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
                  <div>
                    <h2 style={{ fontSize: '36px', color: '#E0DDD8', marginBottom: '20px' }}>Masz pytania?</h2>
                    <p style={{ color: '#4a5a72', fontSize: '14px', lineHeight: 1.8, marginBottom: '24px' }}>Chętnie pomożemy w kwestiach technicznych i formalnych.</p>
                    <div style={{ color: '#E8A838', fontSize: '16px' }}>support@riskanalytix.eu</div>
                  </div>
                  <ContactForm />
                </div>
                <footer style={{ marginTop: '80px', padding: '30px 0', borderTop: '1px solid #151d2e', display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#2a3a52' }}>
                  <span>© {new Date().getFullYear()} RiskAnalytix</span>
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <a href="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>Regulamin</a>
                    <a href="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Prywatność</a>
                  </div>
                </footer>
              </section>
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}