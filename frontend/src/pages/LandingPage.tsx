import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
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

export default function LandingPage() {
  const navigate = useNavigate()
  const [visible, setVisible] = useState<Set<string>>(new Set())
  const refs = useRef<Record<string, HTMLElement | null>>({})
  const [lang, setLang] = useState<Lang>((localStorage.getItem('i18nextLng') || 'en') as Lang)
  const t = getLandingT(lang)

  useEffect(() => {
    const onStorage = () => setLang((localStorage.getItem('i18nextLng') || 'en') as Lang)
    window.addEventListener('storage', onStorage)
    const onFocus = () => setLang((localStorage.getItem('i18nextLng') || 'en') as Lang)
    window.addEventListener('focus', onFocus)
    return () => { window.removeEventListener('storage', onStorage); window.removeEventListener('focus', onFocus) }
  }, [])

  useEffect(() => {
    // Jeśli użytkownik już wybrał język ręcznie — nie nadpisuj
    if (localStorage.getItem('i18nextLng_manual')) return
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(d => {
        const countryToLang: Record<string, string> = {
          'PL': 'pl',
          'DE': 'de', 'AT': 'de', 'CH': 'de',
          'FR': 'fr', 'BE': 'fr', 'LU': 'fr',
          'IT': 'it',
          'ES': 'es', 'MX': 'es', 'AR': 'es', 'CO': 'es',
          'CZ': 'cs', 'SK': 'cs',
        }
        const detectedLang = countryToLang[d.country_code]
        if (detectedLang && !localStorage.getItem('i18nextLng')) {
          setLang(detectedLang as Lang)
          localStorage.setItem('i18nextLng', detectedLang)
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setVisible(v => new Set([...v, e.target.id])) }),
      { threshold: 0.1 }
    )
    Object.values(refs.current).forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const reg = (id: string) => (el: HTMLElement | null) => { refs.current[id] = el; if (el) el.id = id }
  const fadeIn = (id: string, delay = 0): React.CSSProperties => ({
    opacity: visible.has(id) ? 1 : 0,
    transform: visible.has(id) ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms`,
  })

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

  const currency = 'EUR'
  const period  = 'mo.'

  const PLANS = [
    {
      name: t.plan1name, price: '0', period: '',
      desc: t.plan1desc, cta: t.plan1cta, highlighted: false, lsUrl: '',
      features: [t.plan1f1, t.plan1f2, t.plan1f3, t.plan1f4, t.plan1f5],
    },
    {
      name: t.plan2name, price: '29', period, lsUrl: 'https://riskanalytix.lemonsqueezy.com/checkout/buy/4d96c855-af2f-4ce8-baa4-4e9e70936ce3',
      desc: t.plan2desc, cta: t.plan2cta, highlighted: false,
      features: [t.plan2f1, t.plan2f2, t.plan2f3, t.plan2f4, t.plan2f5, t.plan2f6],
    },
    {
      name: t.plan3name, price: '59', period, lsUrl: 'https://riskanalytix.lemonsqueezy.com/checkout/buy/b2ddabe9-0b73-40b7-8c25-d7106aab77f1',
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
    <div style={{ background: '#0B0F1A', color: '#F0EDE8', fontFamily: 'Georgia, serif', overflowX: 'hidden' }}>

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '0 40px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(11,15,26,.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(232,168,56,.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '28px', height: '28px', background: '#E8A838', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>⚠</div>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: '18px', letterSpacing: '.04em', color: '#F0EDE8' }}>RiskAnaly<span style={{ color: '#E8A838' }}>tix</span></span>
        </div>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          {[
            { label: t.navFeatures, href: '#funkcje' },
            { label: t.navCE, href: '#deklaracja-ce' },
            { label: t.navHowItWorks, href: '#jak-to-dziala' },
            { label: t.navPricing, href: '#cennik' },
          ].map(l => (
            <a key={l.href} href={l.href} style={{ color: '#8a99b0', fontSize: '13px', textDecoration: 'none', fontFamily: 'Lato, sans-serif', letterSpacing: '.04em' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F0EDE8')}
              onMouseLeave={e => (e.currentTarget.style.color = '#8a99b0')}
            >{l.label}</a>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => navigate('/auth')} style={{ padding: '8px 18px', borderRadius: '5px', border: '1px solid #1e2d45', background: 'transparent', color: '#8a99b0', cursor: 'pointer', fontSize: '12px', fontFamily: 'Lato, sans-serif' }}>
            {t.navLogin}
          </button>
          <button onClick={() => navigate('/auth')} style={{ padding: '8px 18px', borderRadius: '5px', border: 'none', background: '#E8A838', color: '#0B0F1A', cursor: 'pointer', fontSize: '12px', fontFamily: 'Lato, sans-serif', fontWeight: 700 }}>
            {t.navTry}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '120px 40px 80px', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(232,168,56,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(232,168,56,.04) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '400px', background: 'radial-gradient(ellipse, rgba(232,168,56,.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: '860px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(232,168,56,.1)', border: '1px solid rgba(232,168,56,.25)', borderRadius: '20px', padding: '6px 16px', marginBottom: '28px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#E8A838', display: 'inline-block' }} />
            <span style={{ fontSize: '11px', color: '#E8A838', letterSpacing: '.08em', fontFamily: 'Lato, sans-serif', textTransform: 'uppercase' }}>{t.heroBadge}</span>
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 68px)', lineHeight: 1.1, margin: '0 0 24px', fontWeight: 400, letterSpacing: '-.01em' }}>
            {t.heroTitle1}<br />
            <span style={{ color: '#E8A838', fontStyle: 'italic' }}>{t.heroTitle2}</span>
          </h1>
          <p style={{ fontSize: '18px', color: '#8a99b0', lineHeight: 1.7, maxWidth: '580px', margin: '0 auto 40px', fontFamily: 'Lato, sans-serif', fontWeight: 300 }}>
            {t.heroDesc}
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/auth')} style={{ padding: '16px 36px', borderRadius: '6px', border: 'none', background: '#E8A838', color: '#0B0F1A', cursor: 'pointer', fontSize: '15px', fontFamily: 'Lato, sans-serif', fontWeight: 700, letterSpacing: '.02em' }}>
              {t.heroCta1}
            </button>
            <button onClick={() => document.getElementById('deklaracja-ce')?.scrollIntoView({ behavior: 'smooth' })} style={{ padding: '16px 36px', borderRadius: '6px', border: '1px solid rgba(232,168,56,.3)', background: 'transparent', color: '#E8A838', cursor: 'pointer', fontSize: '15px', fontFamily: 'Lato, sans-serif' }}>
              {t.heroCta2}
            </button>
          </div>
          <div style={{ marginTop: '56px', display: 'flex', gap: '40px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { n: '150+', l: t.heroStat1 },
              { n: '20', l: t.heroStat2 },
              { n: '7', l: t.heroStat3 },
              { n: 'CE', l: t.heroStat4 },
            ].map(s => (
              <div key={s.n} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: '28px', color: '#E8A838', letterSpacing: '-.02em' }}>{s.n}</div>
                <div style={{ fontSize: '11px', color: '#4a5a72', fontFamily: 'Lato, sans-serif', textTransform: 'uppercase', letterSpacing: '.06em', marginTop: '2px' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DISCLAIMER BOX */}
      <section style={{ background: '#0B0F1A', padding: '0 40px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', background: 'rgba(232,168,56,.08)', border: '1px solid rgba(232,168,56,.35)', borderRadius: '10px', padding: '20px 28px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '20px', flexShrink: 0 }}>⚠️</span>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#E8A838', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '.06em' }}>
                {t.disclaimerTitle || 'WAŻNE OSTRZEŻENIE — NARZĘDZIE POMOCNICZE'}
              </div>
              <div style={{ fontSize: '13px', color: '#C0C8D8', lineHeight: 1.7 }}>
                {t.disclaimerText || 'Narzędzie RiskAnalytix ma wyłącznie charakter pomocniczy i wspomagający. Generowane dokumenty (raport oceny ryzyka i szablon Deklaracji Zgodności CE) nie są dokumentami gotowymi do użycia i nie zastępują oficjalnej oceny zgodności ani konsultacji z certyfikowanym specjalistą BHP lub jednostką notyfikowaną. Ostateczna odpowiedzialność za bezpieczeństwo maszyny, prawidłowość oceny ryzyka i Deklaracji CE spoczywa wyłącznie na producencie lub modernizatorze.'}
                {' '}<a href="/terms" style={{ color: '#E8A838', textDecoration: 'underline' }}>{t.disclaimerLink || 'Regulamin →'}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="funkcje" style={{ padding: '100px 40px', maxWidth: '1100px', margin: '0 auto' }}>
        <div ref={reg('feat-head')} style={{ textAlign: 'center', marginBottom: '60px', ...fadeIn('feat-head') }}>
          <div style={{ fontSize: '10px', color: '#E8A838', letterSpacing: '.15em', textTransform: 'uppercase', marginBottom: '12px', fontFamily: 'Lato, sans-serif' }}>{t.featuresLabel}</div>
          <h2 style={{ fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 400, margin: 0 }}>{t.featuresTitle1}<br /><span style={{ color: '#E8A838', fontStyle: 'italic' }}>{t.featuresTitle2}</span></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {FEATURES.map((f, i) => (
            <div key={i} ref={reg('feat-' + i)} style={{ background: '#111827', border: '1px solid #1e2d45', borderRadius: '12px', padding: '28px', transition: 'all .2s', ...fadeIn('feat-' + i, i * 80) }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(232,168,56,.4)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#1e2d45'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)' }}
            >
              {f.badge && <div style={{ display: 'inline-block', background: 'rgba(232,168,56,.15)', border: '1px solid rgba(232,168,56,.3)', borderRadius: '4px', fontSize: '9px', color: '#E8A838', fontFamily: 'Lato, sans-serif', letterSpacing: '.08em', textTransform: 'uppercase', padding: '2px 8px', marginBottom: '12px' }}>{f.badge}</div>}
              <div style={{ fontSize: '28px', marginBottom: '14px' }}>{f.icon}</div>
              <h3 style={{ fontSize: '16px', fontWeight: 400, margin: '0 0 10px', color: '#F0EDE8' }}>{f.title}</h3>
              <p style={{ fontSize: '13px', color: '#8a99b0', lineHeight: 1.7, margin: 0, fontFamily: 'Lato, sans-serif', fontWeight: 300 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CE DECLARATION */}
      <section id="deklaracja-ce" style={{ padding: '100px 40px', background: 'linear-gradient(135deg, rgba(17,24,39,1) 0%, rgba(11,15,26,1) 100%)', borderTop: '1px solid #1e2d45', borderBottom: '1px solid #1e2d45' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div ref={reg('ce-head')} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center', ...fadeIn('ce-head') }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(232,168,56,.1)', border: '1px solid rgba(232,168,56,.25)', borderRadius: '20px', padding: '5px 14px', marginBottom: '24px' }}>
                <span style={{ fontSize: '11px', color: '#E8A838', letterSpacing: '.08em', fontFamily: 'Lato, sans-serif', textTransform: 'uppercase' }}>{t.ceBadge}</span>
              </div>
              <h2 style={{ fontSize: 'clamp(26px, 3vw, 42px)', fontWeight: 400, margin: '0 0 20px', lineHeight: 1.2 }}>
                {t.ceTitle1}<br /><span style={{ color: '#E8A838', fontStyle: 'italic' }}>{t.ceTitle2}</span>
              </h2>
              <p style={{ fontSize: '15px', color: '#8a99b0', lineHeight: 1.8, margin: '0 0 32px', fontFamily: 'Lato, sans-serif', fontWeight: 300 }}>{t.ceDesc}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px' }}>
                {CE_ITEMS.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '18px' }}>{item.icon}</span>
                    <span style={{ fontSize: '13px', color: '#8a99b0', fontFamily: 'Lato, sans-serif' }}>{item.text}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => navigate('/auth')} style={{ padding: '14px 32px', borderRadius: '6px', border: 'none', background: '#E8A838', color: '#0B0F1A', cursor: 'pointer', fontSize: '14px', fontFamily: 'Lato, sans-serif', fontWeight: 700 }}>
                {t.ceCta}
              </button>
            </div>
            <div ref={reg('ce-doc')} style={{ ...fadeIn('ce-doc', 200) }}>
              <div style={{ background: '#fff', borderRadius: '8px', padding: '32px', boxShadow: '0 24px 80px rgba(0,0,0,.5)', position: 'relative', fontFamily: 'Arial, sans-serif', color: '#1a1a2e' }}>
                <div style={{ position: 'absolute', top: '16px', right: '20px', fontSize: '48px', fontWeight: 900, color: 'rgba(0,0,0,.06)', lineHeight: 1, userSelect: 'none' }}>CE</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', paddingBottom: '16px', borderBottom: '2px solid #1a1a2e' }}>
                  <div>
                    <div style={{ fontSize: '7px', letterSpacing: '.1em', textTransform: 'uppercase', color: '#666', marginBottom: '4px' }}>RiskAnalytix · System oceny ryzyka</div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#1a1a2e' }}>{t.ceDocTitle}</div>
                    <div style={{ fontSize: '7px', color: '#666', marginTop: '2px' }}>{t.ceDocSub}</div>
                  </div>
                  <div style={{ background: '#1a1a2e', color: '#fff', borderRadius: '4px', padding: '6px 12px', textAlign: 'center' }}>
                    <div style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '-.02em' }}>CE</div>
                  </div>
                </div>
                {[
                  { n: '1.', title: 'Producent / Manufacturer', content: 'Nazwa Sp. z o.o. · ul. Przykładowa 1 · 00-000 Warszawa' },
                  { n: '2.', title: 'Opis maszyny / Machine description', content: 'Tokarka CNC model TUR-560 · Nr seryjny: SN-2024-001' },
                  { n: '3.', title: 'Dyrektywy / Directives', content: '2006/42/WE Dyrektywa Maszynowa · 2014/30/UE EMC · 2014/35/UE LVD' },
                  { n: '4.', title: 'Normy / Standards', content: 'EN ISO 12100:2012 · ISO 23125:2015 · EN 60204-1:2018' },
                ].map((s, i) => (
                  <div key={i} style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '8px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: '#1a1a2e', marginBottom: '3px' }}>{s.n} {s.title}</div>
                    <div style={{ fontSize: '9px', color: '#444', lineHeight: 1.5, paddingLeft: '12px', borderLeft: '2px solid #E8A838' }}>{s.content}</div>
                  </div>
                ))}
                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #e0e0e0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  {[t.ceDocSig1, t.ceDocSig2].map((l, i) => (
                    <div key={i}>
                      <div style={{ height: '28px', borderBottom: '1px solid #ccc', marginBottom: '4px' }} />
                      <div style={{ fontSize: '7px', color: '#999', letterSpacing: '.04em' }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="jak-to-dziala" style={{ padding: '100px 40px', background: 'rgba(17,24,39,.5)', borderTop: '1px solid #1e2d45', borderBottom: '1px solid #1e2d45' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div ref={reg('how-head')} style={{ textAlign: 'center', marginBottom: '60px', ...fadeIn('how-head') }}>
            <div style={{ fontSize: '10px', color: '#E8A838', letterSpacing: '.15em', textTransform: 'uppercase', marginBottom: '12px', fontFamily: 'Lato, sans-serif' }}>{t.howLabel}</div>
            <h2 style={{ fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 400, margin: 0 }}>{t.howTitle1}<br /><span style={{ color: '#E8A838', fontStyle: 'italic' }}>{t.howTitle2}</span></h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {STEPS.map((s, i) => (
              <div key={i} ref={reg('step-' + i)} style={{ display: 'flex', gap: '28px', alignItems: 'flex-start', padding: '28px 32px', borderRadius: '10px', background: i % 2 === 0 ? '#111827' : 'transparent', border: '1px solid ' + (i % 2 === 0 ? '#1e2d45' : 'transparent'), ...fadeIn('step-' + i, i * 100) }}>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: '42px', color: 'rgba(232,168,56,.2)', lineHeight: 1, minWidth: '60px', fontStyle: 'italic' }}>{s.n}</div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 400, margin: '0 0 8px', color: '#F0EDE8' }}>{s.title}</h3>
                  <p style={{ fontSize: '14px', color: '#8a99b0', margin: 0, lineHeight: 1.7, fontFamily: 'Lato, sans-serif', fontWeight: 300 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NORMS TICKER */}
      <section style={{ padding: '40px 0', borderBottom: '1px solid #1e2d45', overflow: 'hidden' }}>
        <div style={{ fontSize: '9px', color: '#4a5a72', textTransform: 'uppercase', letterSpacing: '.12em', textAlign: 'center', marginBottom: '16px', fontFamily: 'Lato, sans-serif' }}>{t.normsLabel}</div>
        <div style={{ display: 'flex', gap: '12px', animation: 'scroll-left 32s linear infinite', width: 'max-content' }}>
          {[...NORMS, ...NORMS].map((n, i) => (
            <span key={i} style={{ padding: '5px 14px', background: 'rgba(232,168,56,.06)', border: '1px solid rgba(232,168,56,.15)', borderRadius: '20px', fontSize: '11px', color: '#E8A838', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{n}</span>
          ))}
        </div>
        <style>{`@keyframes scroll-left { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }`}</style>
      </section>

      {/* PRICING */}
      <section id="cennik" style={{ padding: '100px 40px', maxWidth: '1100px', margin: '0 auto' }}>
        <div ref={reg('price-head')} style={{ textAlign: 'center', marginBottom: '60px', ...fadeIn('price-head') }}>
          <div style={{ fontSize: '10px', color: '#E8A838', letterSpacing: '.15em', textTransform: 'uppercase', marginBottom: '12px', fontFamily: 'Lato, sans-serif' }}>{t.pricingLabel}</div>
          <h2 style={{ fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 400, margin: '0 0 16px' }}>{t.pricingTitle1} <span style={{ color: '#E8A838', fontStyle: 'italic' }}>{t.pricingTitle2}</span></h2>
          <p style={{ fontSize: '15px', color: '#8a99b0', fontFamily: 'Lato, sans-serif', fontWeight: 300, margin: 0 }}>{t.pricingDesc}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', alignItems: 'start' }}>
          {PLANS.map((p, i) => (
            <div key={i} ref={reg('plan-' + i)} style={{
              background: p.highlighted ? 'linear-gradient(135deg, #1a2235 0%, #111827 100%)' : '#111827',
              border: `1px solid ${p.highlighted ? '#E8A838' : '#1e2d45'}`,
              borderRadius: '14px', padding: '32px', position: 'relative',
              ...fadeIn('plan-' + i, i * 100)
            }}>
              {p.highlighted && (
                <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#E8A838', color: '#0B0F1A', fontSize: '10px', fontFamily: 'Lato, sans-serif', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', padding: '4px 14px', borderRadius: '10px' }}>
                  {t.popular}
                </div>
              )}
              <div style={{ fontSize: '10px', color: p.highlighted ? '#E8A838' : '#4a5a72', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'Lato, sans-serif', marginBottom: '10px' }}>{p.name}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '6px' }}>
                {p.price === '0'
                  ? <span style={{ fontFamily: 'Georgia, serif', fontSize: '44px', color: '#F0EDE8', lineHeight: 1 }}>Free</span>
                  : <span style={{ fontFamily: 'Georgia, serif', fontSize: '44px', color: '#F0EDE8', lineHeight: 1 }}>{p.price} <span style={{ fontSize: '13px', color: '#8a99b0', fontFamily: 'Lato, sans-serif' }}>{currency} / {p.period}</span></span>
                }
              </div>
              <p style={{ fontSize: '12px', color: '#4a5a72', fontFamily: 'Lato, sans-serif', margin: '0 0 24px' }}>{p.desc}</p>
              <div style={{ height: '1px', background: '#1e2d45', marginBottom: '24px' }} />
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {p.features.map((f, j) => (
                  <li key={j} style={{ display: 'flex', gap: '10px', fontSize: '13px', color: '#8a99b0', fontFamily: 'Lato, sans-serif', alignItems: 'flex-start' }}>
                    <span style={{ color: p.highlighted ? '#E8A838' : '#34C77B', flexShrink: 0, marginTop: '1px' }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => p.lsUrl ? window.open(p.lsUrl, '_blank') : navigate('/auth')} style={{ width: '100%', padding: '13px', borderRadius: '6px', border: p.highlighted ? 'none' : '1px solid #1e2d45', background: p.highlighted ? '#E8A838' : 'transparent', color: p.highlighted ? '#0B0F1A' : '#8a99b0', cursor: 'pointer', fontSize: '13px', fontFamily: 'Lato, sans-serif', fontWeight: p.highlighted ? 700 : 400 }}>
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 40px', borderTop: '1px solid #1e2d45' }}>
        <div ref={reg('cta')} style={{ maxWidth: '620px', margin: '0 auto', textAlign: 'center', ...fadeIn('cta') }}>
          <h2 style={{ fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 400, margin: '0 0 18px' }}>
            {t.ctaTitle1}<br /><span style={{ color: '#E8A838', fontStyle: 'italic' }}>{t.ctaTitle2}</span>
          </h2>
          <p style={{ fontSize: '15px', color: '#8a99b0', fontFamily: 'Lato, sans-serif', fontWeight: 300, margin: '0 0 32px', lineHeight: 1.7 }}>{t.ctaDesc}</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/auth')} style={{ padding: '16px 44px', borderRadius: '6px', border: 'none', background: '#E8A838', color: '#0B0F1A', cursor: 'pointer', fontSize: '16px', fontFamily: 'Lato, sans-serif', fontWeight: 700 }}>
              {t.ctaBtn1}
            </button>
            <button onClick={() => document.getElementById('deklaracja-ce')?.scrollIntoView({ behavior: 'smooth' })} style={{ padding: '16px 32px', borderRadius: '6px', border: '1px solid rgba(232,168,56,.3)', background: 'transparent', color: '#E8A838', cursor: 'pointer', fontSize: '16px', fontFamily: 'Lato, sans-serif' }}>
              {t.ctaBtn2}
            </button>
          </div>
        </div>
      </section>

      {/* KONTAKT */}
      <section style={{ padding: '80px 40px', borderTop: '1px solid #1e2d45', background: '#0B0F1A' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', gap: '60px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '260px' }}>
            <div style={{ fontSize: '10px', color: '#E8A838', textTransform: 'uppercase', letterSpacing: '.1em', fontWeight: 600, marginBottom: '12px' }}>
              Kontakt
            </div>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '28px', color: '#F0EDE8', marginBottom: '16px', lineHeight: 1.3 }}>
              Masz pytania?
            </h2>
            <p style={{ color: '#8a99b0', fontSize: '14px', lineHeight: 1.8, marginBottom: '20px' }}>
              Chętnie pomożemy — niezależnie czy chodzi o kwestie techniczne,
              pytania o plany lub sugestie dotyczące funkcji.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { icon: '✉️', label: 'support@riskanalytix.eu' },
                { icon: '⏱', label: 'Odpowiadamy w ciągu 24h' },
                { icon: '🇵🇱', label: 'Obsługa w języku polskim i angielskim' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '16px' }}>{item.icon}</span>
                  <span style={{ fontSize: '13px', color: '#8a99b0' }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '40px', borderTop: '1px solid #1e2d45', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '22px', height: '22px', background: '#E8A838', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px' }}>⚠</div>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: '15px' }}>RiskAnaly<span style={{ color: '#E8A838' }}>tix</span></span>
        </div>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          {[
            { label: t.footerTerms, path: '/terms' },
            { label: t.footerPrivacy, path: '/privacy' },
            { label: t.footerRodo, path: '/rodo' },
          ].map(l => (
            <a key={l.path} href={l.path} style={{ fontSize: '12px', color: '#4a5a72', textDecoration: 'none', fontFamily: 'Lato, sans-serif' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#8a99b0')}
              onMouseLeave={e => (e.currentTarget.style.color = '#4a5a72')}
            >{l.label}</a>
          ))}
        </div>
        <div style={{ fontSize: '11px', color: '#4a5a72', fontFamily: 'Lato, sans-serif' }}>
          © {new Date().getFullYear()} RiskAnalytix. {t.footerRights}
        </div>
      </footer>

    </div>
  )
}