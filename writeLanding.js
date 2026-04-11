const fs = require('fs');

const content = `import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

const FEATURES = [
  { icon: '\u2699\ufe0f', title: 'Baza 150+ zagro\u017ce\u0144', desc: 'Gotowe listy zagro\u017ce\u0144 dla 20 typ\u00f3w maszyn. Tokarki, frezarki, prasy, roboty, d\u017awignice i wiele wi\u0119cej \u2014 ka\u017cda z przypisanymi normami.' },
  { icon: '\ud83d\udcd0', title: 'Matryca ryzyka S\u00d7P', desc: 'Automatyczna klasyfikacja ryzyka metod\u0105 ci\u0119\u017cko\u015b\u0107 \u00d7 prawdopodobie\u0144stwo zgodnie z PN-EN ISO 12100:2012.' },
  { icon: '\ud83d\udccb', title: 'Raport PDF', desc: 'Profesjonalny raport gotowy do przekazania klientowi lub organom kontrolnym. Logo firmy, dane klienta, pe\u0142na tabela zagro\u017ce\u0144.' },
  { icon: '\ud83c\udff7\ufe0f', title: 'Deklaracja Zgodno\u015bci CE', desc: 'Generuj Deklaracj\u0119 Zgodno\u015bci WE w formacie PDF jednym klikni\u0119ciem. Zgodna z Dyrektyw\u0105 Maszynow\u0105 2006/42/WE i rozporz\u0105dzeniem 2023/1230/UE.' },
  { icon: '\u2696\ufe0f', title: 'Zgodno\u015b\u0107 z dyrektyw\u0105', desc: 'Analiza zgodna z Dyrektyw\u0105 Maszynow\u0105 2006/42/WE i rozporz\u0105dzeniem 2023/1230/UE. Normy szczeg\u00f3\u0142owe dla ka\u017cdego typu maszyny.' },
  { icon: '\ud83c\udf0d', title: '7 j\u0119zyk\u00f3w', desc: 'Interfejs i raporty w j\u0119zyku polskim, angielskim, niemieckim, francuskim, w\u0142oskim, hiszpa\u0144skim i czeskim.' },
]

const PLANS = [
  {
    name: 'FREEMIUM', price: '0', period: '',
    desc: 'Dla firm z produkcj\u0105 jednostkow\u0105',
    features: ['Nieograniczone analizy w aplikacji', 'Baza 150+ zagro\u017ce\u0144', 'Matryca ryzyka S\u00d7P', 'Pogl\u0105d przyk\u0142adowego raportu PDF', 'Bez pobierania PDF'],
    cta: 'Zacznij bezp\u0142atnie', highlighted: false,
  },
  {
    name: 'BASIC', price: '29', period: 'mies.',
    desc: 'Dla ma\u0142ych firm i freelancer\u00f3w',
    features: ['5 analiz miesi\u0119cznie', 'Baza 150+ zagro\u017ce\u0144', 'Matryca ryzyka S\u00d7P', 'Raport PDF z logo', 'Deklaracja Zgodno\u015bci CE (PDF)', 'Wsparcie e-mail'],
    cta: 'Wybierz Basic', highlighted: false,
  },
  {
    name: 'PRO', price: '99', period: 'mies.',
    desc: 'Dla rzeczoznawc\u00f3w i biur BHP',
    features: ['Nieograniczone analizy', 'Baza 150+ zagro\u017ce\u0144', 'Matryca ryzyka S\u00d7P', 'Raport PDF z logo klienta', 'Deklaracja Zgodno\u015bci CE (PDF)', 'W\u0142asne logo w raporcie', 'Priorytetowe wsparcie'],
    cta: 'Wybierz PRO', highlighted: true,
  },
]

const NORMS = [
  'EN ISO 12100:2012', 'ISO 23125:2015', 'ISO 16090-1:2017', 'EN 13218:2002',
  'ISO 16092-2:2017', 'ISO 16092-3:2017', 'ISO 10218-1:2011', 'ISO/TS 15066:2016',
  'EN 620:2002', 'EN 415-3:2009', 'ISO 20430:2020', 'EN 1870-1:2012',
  'EN 1672-2:2009', 'EN 15011:2014', 'ISO 4254-7:2017', 'ISO 3691-1:2011',
  'EN 692:2009', 'EN 693:2011', 'Dyrektywa 2006/42/WE', 'Rozporz\u0105dzenie 2023/1230/UE',
]

const STEPS = [
  { n: '01', title: 'Wybierz maszyn\u0119', desc: 'Wybierz kategori\u0119 i typ maszyny z bazy. System automatycznie przypisuje w\u0142a\u015bciwe normy i list\u0119 zagro\u017ce\u0144.' },
  { n: '02', title: 'Dane i klient', desc: 'Wprowad\u017a dane maszyny i dane klienta. Dane pojawi\u0105 si\u0119 w nag\u0142\u00f3wku raportu PDF i Deklaracji CE.' },
  { n: '03', title: 'Lista zagro\u017ce\u0144', desc: 'Edytuj gotow\u0105 list\u0119 zagro\u017ce\u0144 lub dodaj w\u0142asne. Ustaw ci\u0119\u017cko\u015b\u0107 i prawdopodobie\u0144stwo dla ka\u017cdego.' },
  { n: '04', title: 'Raport + Deklaracja CE', desc: 'Przejrzyj matryc\u0119 ryzyka, pobierz raport PDF oraz Deklaracj\u0119 Zgodno\u015bci WE gotow\u0105 do podpisu.' },
]

const CE_ITEMS = [
  { icon: '\ud83d\udcc4', text: 'Pe\u0142na Deklaracja Zgodno\u015bci WE w PDF' },
  { icon: '\ud83c\udfed', text: 'Dane producenta i maszyny automatycznie z analizy' },
  { icon: '\ud83d\udcdc', text: 'Lista dyrektyw: 2006/42/WE, EMC, LVD' },
  { icon: '\ud83d\udd2c', text: 'Zastosowane normy zharmonizowane' },
  { icon: '\u270d\ufe0f', text: 'Sekcja podpis\u00f3w upowa\u017cnionych przedstawicieli' },
  { icon: '\ud83c\udf10', text: 'Dokument w 7 j\u0119zykach UE' },
]

export default function LandingPage() {
  const navigate = useNavigate()
  const [visible, setVisible] = useState<Set<string>>(new Set())
  const refs = useRef<Record<string, HTMLElement | null>>({})

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
    transition: \`opacity .6s ease \${delay}ms, transform .6s ease \${delay}ms\`,
  })

  return (
    <div style={{ background: '#0B0F1A', color: '#F0EDE8', fontFamily: 'Georgia, serif', overflowX: 'hidden' }}>

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '0 40px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(11,15,26,.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(232,168,56,.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '28px', height: '28px', background: '#E8A838', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>\u26a0</div>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: '18px', letterSpacing: '.04em', color: '#F0EDE8' }}>RiskAnaly<span style={{ color: '#E8A838' }}>tix</span></span>
        </div>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          {[
            { label: 'Funkcje', href: '#funkcje' },
            { label: 'Deklaracja CE', href: '#deklaracja-ce' },
            { label: 'Jak to dzia\u0142a', href: '#jak-to-dziala' },
            { label: 'Cennik', href: '#cennik' },
          ].map(l => (
            <a key={l.href} href={l.href} style={{ color: '#8a99b0', fontSize: '13px', textDecoration: 'none', fontFamily: 'Lato, sans-serif', letterSpacing: '.04em' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F0EDE8')}
              onMouseLeave={e => (e.currentTarget.style.color = '#8a99b0')}
            >{l.label}</a>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => navigate('/auth')} style={{ padding: '8px 18px', borderRadius: '5px', border: '1px solid #1e2d45', background: 'transparent', color: '#8a99b0', cursor: 'pointer', fontSize: '12px', fontFamily: 'Lato, sans-serif' }}>
            Zaloguj si\u0119
          </button>
          <button onClick={() => navigate('/auth')} style={{ padding: '8px 18px', borderRadius: '5px', border: 'none', background: '#E8A838', color: '#0B0F1A', cursor: 'pointer', fontSize: '12px', fontFamily: 'Lato, sans-serif', fontWeight: 700 }}>
            Wypr\u00f3buj za darmo
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
            <span style={{ fontSize: '11px', color: '#E8A838', letterSpacing: '.08em', fontFamily: 'Lato, sans-serif', textTransform: 'uppercase' }}>Zgodny z EN ISO 12100:2012 \u00b7 Dyrektywa 2006/42/WE \u00b7 2023/1230/UE</span>
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 68px)', lineHeight: 1.1, margin: '0 0 24px', fontWeight: 400, letterSpacing: '-.01em' }}>
            Ocena ryzyka maszyn<br />
            <span style={{ color: '#E8A838', fontStyle: 'italic' }}>i Deklaracja CE w 10 minut</span>
          </h1>
          <p style={{ fontSize: '18px', color: '#8a99b0', lineHeight: 1.7, maxWidth: '580px', margin: '0 auto 40px', fontFamily: 'Lato, sans-serif', fontWeight: 300 }}>
            Narz\u0119dzie dla rzeczoznawc\u00f3w BHP, biur projektowych i producent\u00f3w maszyn. Gotowa baza zagro\u017ce\u0144, automatyczna matryca ryzyka, raport PDF i Deklaracja Zgodno\u015bci WE \u2014 jednym klikni\u0119ciem.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/auth')} style={{ padding: '16px 36px', borderRadius: '6px', border: 'none', background: '#E8A838', color: '#0B0F1A', cursor: 'pointer', fontSize: '15px', fontFamily: 'Lato, sans-serif', fontWeight: 700, letterSpacing: '.02em' }}>
              Zacznij za darmo \u2192
            </button>
            <button onClick={() => document.getElementById('deklaracja-ce')?.scrollIntoView({ behavior: 'smooth' })} style={{ padding: '16px 36px', borderRadius: '6px', border: '1px solid rgba(232,168,56,.3)', background: 'transparent', color: '#E8A838', cursor: 'pointer', fontSize: '15px', fontFamily: 'Lato, sans-serif' }}>
              Zobacz Deklaracj\u0119 CE
            </button>
          </div>
          <div style={{ marginTop: '56px', display: 'flex', gap: '40px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { n: '150+', l: 'zagro\u017ce\u0144 w bazie' },
              { n: '20', l: 'typ\u00f3w maszyn' },
              { n: '7', l: 'j\u0119zyk\u00f3w interfejsu' },
              { n: 'CE', l: 'Deklaracja Zgodno\u015bci' },
            ].map(s => (
              <div key={s.n} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: '28px', color: '#E8A838', letterSpacing: '-.02em' }}>{s.n}</div>
                <div style={{ fontSize: '11px', color: '#4a5a72', fontFamily: 'Lato, sans-serif', textTransform: 'uppercase', letterSpacing: '.06em', marginTop: '2px' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="funkcje" style={{ padding: '100px 40px', maxWidth: '1100px', margin: '0 auto' }}>
        <div ref={reg('feat-head')} style={{ textAlign: 'center', marginBottom: '60px', ...fadeIn('feat-head') }}>
          <div style={{ fontSize: '10px', color: '#E8A838', letterSpacing: '.15em', textTransform: 'uppercase', marginBottom: '12px', fontFamily: 'Lato, sans-serif' }}>Mo\u017cliwo\u015bci</div>
          <h2 style={{ fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 400, margin: 0 }}>Wszystko czego potrzebujesz<br /><span style={{ color: '#E8A838', fontStyle: 'italic' }}>do rzetelnej oceny ryzyka</span></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {FEATURES.map((f, i) => (
            <div key={i} ref={reg('feat-' + i)} style={{ background: '#111827', border: '1px solid #1e2d45', borderRadius: '12px', padding: '28px', transition: 'all .2s', ...fadeIn('feat-' + i, i * 80) }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(232,168,56,.4)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#1e2d45'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)' }}
            >
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
                <span style={{ fontSize: '11px', color: '#E8A838', letterSpacing: '.08em', fontFamily: 'Lato, sans-serif', textTransform: 'uppercase' }}>Deklaracja Zgodno\u015bci CE</span>
              </div>
              <h2 style={{ fontSize: 'clamp(26px, 3vw, 42px)', fontWeight: 400, margin: '0 0 20px', lineHeight: 1.2 }}>
                Generuj Deklaracj\u0119<br /><span style={{ color: '#E8A838', fontStyle: 'italic' }}>Zgodno\u015bci WE w PDF</span>
              </h2>
              <p style={{ fontSize: '15px', color: '#8a99b0', lineHeight: 1.8, margin: '0 0 32px', fontFamily: 'Lato, sans-serif', fontWeight: 300 }}>
                Na podstawie przeprowadzonej oceny ryzyka RiskAnalytix automatycznie generuje Deklaracj\u0119 Zgodno\u015bci WE gotow\u0105 do podpisu. Dokument spe\u0142nia wymagania Dyrektywy Maszynowej <strong style={{ color: '#F0EDE8' }}>2006/42/WE</strong> i nowego rozporz\u0105dzenia <strong style={{ color: '#F0EDE8' }}>2023/1230/UE</strong>.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px' }}>
                {CE_ITEMS.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '18px' }}>{item.icon}</span>
                    <span style={{ fontSize: '13px', color: '#8a99b0', fontFamily: 'Lato, sans-serif' }}>{item.text}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => navigate('/auth')} style={{ padding: '14px 32px', borderRadius: '6px', border: 'none', background: '#E8A838', color: '#0B0F1A', cursor: 'pointer', fontSize: '14px', fontFamily: 'Lato, sans-serif', fontWeight: 700 }}>
                Generuj Deklaracj\u0119 CE \u2192
              </button>
            </div>
            <div ref={reg('ce-doc')} style={{ ...fadeIn('ce-doc', 200) }}>
              <div style={{ background: '#fff', borderRadius: '8px', padding: '32px', boxShadow: '0 24px 80px rgba(0,0,0,.5)', position: 'relative', fontFamily: 'Arial, sans-serif', color: '#1a1a2e' }}>
                <div style={{ position: 'absolute', top: '16px', right: '20px', fontSize: '48px', fontWeight: 900, color: 'rgba(0,0,0,.06)', lineHeight: 1, userSelect: 'none' }}>CE</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', paddingBottom: '16px', borderBottom: '2px solid #1a1a2e' }}>
                  <div>
                    <div style={{ fontSize: '7px', letterSpacing: '.1em', textTransform: 'uppercase', color: '#666', marginBottom: '4px' }}>RiskAnalytix \u00b7 System oceny ryzyka</div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#1a1a2e' }}>DEKLARACJA ZGODNO\u015aCI WE</div>
                    <div style={{ fontSize: '7px', color: '#666', marginTop: '2px' }}>EC DECLARATION OF CONFORMITY</div>
                  </div>
                  <div style={{ background: '#1a1a2e', color: '#fff', borderRadius: '4px', padding: '6px 12px', textAlign: 'center' }}>
                    <div style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '-.02em' }}>CE</div>
                  </div>
                </div>
                {[
                  { n: '1.', title: 'Producent / Manufacturer', content: 'Nazwa Sp. z o.o. \u00b7 ul. Przyk\u0142adowa 1 \u00b7 00-000 Warszawa, Polska' },
                  { n: '2.', title: 'Opis maszyny / Machine description', content: 'Tokarka CNC model TUR-560 \u00b7 Nr seryjny: SN-2024-001 \u00b7 Rok prod.: 2024' },
                  { n: '3.', title: 'Dyrektywy / Directives', content: '2006/42/WE Dyrektywa Maszynowa \u00b7 2014/30/UE EMC \u00b7 2014/35/UE LVD' },
                  { n: '4.', title: 'Normy zharmonizowane / Standards', content: 'EN ISO 12100:2012 \u00b7 ISO 23125:2015 \u00b7 EN 60204-1:2018' },
                ].map((s, i) => (
                  <div key={i} style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '8px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: '#1a1a2e', marginBottom: '3px' }}>{s.n} {s.title}</div>
                    <div style={{ fontSize: '9px', color: '#444', lineHeight: 1.5, paddingLeft: '12px', borderLeft: '2px solid #E8A838' }}>{s.content}</div>
                  </div>
                ))}
                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #e0e0e0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  {['Miejsce i data / Place and date', 'Podpis i piecz\u0119\u0107 / Signature'].map((l, i) => (
                    <div key={i}>
                      <div style={{ height: '28px', borderBottom: '1px solid #ccc', marginBottom: '4px' }} />
                      <div style={{ fontSize: '7px', color: '#999', letterSpacing: '.04em' }}>{l}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '12px', fontSize: '6px', color: '#bbb', textAlign: 'center', fontStyle: 'italic' }}>
                  Dyrektywa Maszynowa 2006/42/WE \u00b7 EN ISO 12100:2012 \u00b7 Wygenerowano przez RiskAnalytix
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
            <div style={{ fontSize: '10px', color: '#E8A838', letterSpacing: '.15em', textTransform: 'uppercase', marginBottom: '12px', fontFamily: 'Lato, sans-serif' }}>Proces</div>
            <h2 style={{ fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 400, margin: 0 }}>Od maszyny do Deklaracji CE<br /><span style={{ color: '#E8A838', fontStyle: 'italic' }}>w 4 krokach</span></h2>
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
        <div style={{ fontSize: '9px', color: '#4a5a72', textTransform: 'uppercase', letterSpacing: '.12em', textAlign: 'center', marginBottom: '16px', fontFamily: 'Lato, sans-serif' }}>
          Obs\u0142ugiwane normy i dyrektywy
        </div>
        <div style={{ display: 'flex', gap: '12px', animation: 'scroll-left 32s linear infinite', width: 'max-content' }}>
          {[...NORMS, ...NORMS].map((n, i) => (
            <span key={i} style={{ padding: '5px 14px', background: 'rgba(232,168,56,.06)', border: '1px solid rgba(232,168,56,.15)', borderRadius: '20px', fontSize: '11px', color: '#E8A838', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{n}</span>
          ))}
        </div>
        <style>{\`@keyframes scroll-left { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }\`}</style>
      </section>

      {/* PRICING */}
      <section id="cennik" style={{ padding: '100px 40px', maxWidth: '1100px', margin: '0 auto' }}>
        <div ref={reg('price-head')} style={{ textAlign: 'center', marginBottom: '60px', ...fadeIn('price-head') }}>
          <div style={{ fontSize: '10px', color: '#E8A838', letterSpacing: '.15em', textTransform: 'uppercase', marginBottom: '12px', fontFamily: 'Lato, sans-serif' }}>Cennik</div>
          <h2 style={{ fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 400, margin: '0 0 16px' }}>Prosty, <span style={{ color: '#E8A838', fontStyle: 'italic' }}>przejrzysty cennik</span></h2>
          <p style={{ fontSize: '15px', color: '#8a99b0', fontFamily: 'Lato, sans-serif', fontWeight: 300, margin: 0 }}>Pierwsza analiza zawsze bezp\u0142atna. Bez ukrytych op\u0142at.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', alignItems: 'start' }}>
          {PLANS.map((p, i) => (
            <div key={i} ref={reg('plan-' + i)} style={{
              background: p.highlighted ? 'linear-gradient(135deg, #1a2235 0%, #111827 100%)' : '#111827',
              border: \`1px solid \${p.highlighted ? '#E8A838' : '#1e2d45'}\`,
              borderRadius: '14px', padding: '32px', position: 'relative',
              ...fadeIn('plan-' + i, i * 100)
            }}>
              {p.highlighted && (
                <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#E8A838', color: '#0B0F1A', fontSize: '10px', fontFamily: 'Lato, sans-serif', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', padding: '4px 14px', borderRadius: '10px' }}>
                  Najpopularniejszy
                </div>
              )}
              <div style={{ fontSize: '10px', color: p.highlighted ? '#E8A838' : '#4a5a72', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'Lato, sans-serif', marginBottom: '10px' }}>{p.name}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '6px' }}>
                {p.price === '0'
                  ? <span style={{ fontFamily: 'Georgia, serif', fontSize: '44px', color: '#F0EDE8', lineHeight: 1 }}>Free</span>
                  : <span style={{ fontFamily: 'Georgia, serif', fontSize: '44px', color: '#F0EDE8', lineHeight: 1 }}>{p.price} <span style={{ fontSize: '13px', color: '#8a99b0', fontFamily: 'Lato, sans-serif' }}>EUR / {p.period}</span></span>
                }
              </div>
              <p style={{ fontSize: '12px', color: '#4a5a72', fontFamily: 'Lato, sans-serif', margin: '0 0 24px' }}>{p.desc}</p>
              <div style={{ height: '1px', background: '#1e2d45', marginBottom: '24px' }} />
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {p.features.map((f, j) => (
                  <li key={j} style={{ display: 'flex', gap: '10px', fontSize: '13px', color: '#8a99b0', fontFamily: 'Lato, sans-serif', alignItems: 'flex-start' }}>
                    <span style={{ color: p.highlighted ? '#E8A838' : '#34C77B', flexShrink: 0, marginTop: '1px' }}>\u2713</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => navigate('/auth')} style={{ width: '100%', padding: '13px', borderRadius: '6px', border: p.highlighted ? 'none' : '1px solid #1e2d45', background: p.highlighted ? '#E8A838' : 'transparent', color: p.highlighted ? '#0B0F1A' : '#8a99b0', cursor: 'pointer', fontSize: '13px', fontFamily: 'Lato, sans-serif', fontWeight: p.highlighted ? 700 : 400 }}>
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
            Analiza ryzyka i Deklaracja CE<br /><span style={{ color: '#E8A838', fontStyle: 'italic' }}>gotowe w 10 minut</span>
          </h2>
          <p style={{ fontSize: '15px', color: '#8a99b0', fontFamily: 'Lato, sans-serif', fontWeight: 300, margin: '0 0 32px', lineHeight: 1.7 }}>
            Pierwsza analiza jest w pe\u0142ni bezp\u0142atna. Nie wymagamy karty kredytowej.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/auth')} style={{ padding: '16px 44px', borderRadius: '6px', border: 'none', background: '#E8A838', color: '#0B0F1A', cursor: 'pointer', fontSize: '16px', fontFamily: 'Lato, sans-serif', fontWeight: 700 }}>
              Utw\u00f3rz konto bezp\u0142atnie \u2192
            </button>
            <button onClick={() => document.getElementById('deklaracja-ce')?.scrollIntoView({ behavior: 'smooth' })} style={{ padding: '16px 32px', borderRadius: '6px', border: '1px solid rgba(232,168,56,.3)', background: 'transparent', color: '#E8A838', cursor: 'pointer', fontSize: '16px', fontFamily: 'Lato, sans-serif' }}>
              Zobacz Deklaracj\u0119 CE
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '40px', borderTop: '1px solid #1e2d45', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '22px', height: '22px', background: '#E8A838', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px' }}>\u26a0</div>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: '15px' }}>RiskAnaly<span style={{ color: '#E8A838' }}>tix</span></span>
        </div>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          {[
            { label: 'Regulamin', path: '/terms' },
            { label: 'Prywatno\u015b\u0107', path: '/privacy' },
            { label: 'RODO', path: '/rodo' },
          ].map(l => (
            <a key={l.path} href={l.path} style={{ fontSize: '12px', color: '#4a5a72', textDecoration: 'none', fontFamily: 'Lato, sans-serif' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#8a99b0')}
              onMouseLeave={e => (e.currentTarget.style.color = '#4a5a72')}
            >{l.label}</a>
          ))}
        </div>
        <div style={{ fontSize: '11px', color: '#4a5a72', fontFamily: 'Lato, sans-serif' }}>
          \u00a9 {new Date().getFullYear()} RiskAnalytix. Wszelkie prawa zastrze\u017cone.
        </div>
      </footer>

    </div>
  )
}
`;

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/LandingPage.tsx', content, 'utf8');
console.log('done, lines:', content.split('\n').length);