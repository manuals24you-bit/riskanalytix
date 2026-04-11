// frontend/src/components/ContactForm.tsx
import { useState } from 'react'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'abd44dcf-2151-465a-8618-f586949dafbe',
          subject: `RiskAnalytix — wiadomość od ${form.name}`,
          from_name: form.name,
          replyto: form.email,
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('ok')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '9px 12px',
    borderRadius: '6px',
    border: '1px solid #1e2d45',
    background: '#0B0F1A',
    color: '#F0EDE8',
    fontSize: '13px',
    fontFamily: 'Lato, sans-serif',
    outline: 'none',
    boxSizing: 'border-box',
  }

  return (
    <div style={{
      background: '#111827',
      border: '1px solid #1e2d45',
      borderRadius: '12px',
      padding: '28px',
      maxWidth: '480px',
      width: '100%',
      fontFamily: 'Lato, sans-serif',
    }}>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '10px', color: '#E8A838', textTransform: 'uppercase', letterSpacing: '.1em', fontWeight: 600, marginBottom: '6px' }}>
          Kontakt
        </div>
        <h3 style={{ color: '#F0EDE8', fontFamily: 'Georgia, serif', fontSize: '18px', margin: 0 }}>
          Napisz do nas
        </h3>
        <p style={{ color: '#8a99b0', fontSize: '12px', marginTop: '6px', lineHeight: 1.6 }}>
          Pytania, sugestie, problemy techniczne —<br />
          odpiszemy na <span style={{ color: '#E8A838' }}>support@riskanalytix.eu</span>
        </p>
      </div>

      {status === 'ok' ? (
        <div style={{
          background: 'rgba(52,199,123,.1)', border: '1px solid rgba(52,199,123,.3)',
          borderRadius: '8px', padding: '20px', textAlign: 'center',
        }}>
          <div style={{ fontSize: '28px', marginBottom: '8px' }}>✅</div>
          <div style={{ color: '#34C77B', fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>Wiadomość wysłana!</div>
          <div style={{ color: '#8a99b0', fontSize: '12px' }}>Odpowiemy najszybciej jak to możliwe.</div>
          <button
            onClick={() => setStatus('idle')}
            style={{ marginTop: '14px', padding: '7px 18px', borderRadius: '5px', border: '1px solid #1e2d45', background: 'transparent', color: '#8a99b0', cursor: 'pointer', fontSize: '11px' }}
          >
            Wyślij kolejną wiadomość
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '10px', color: '#8a99b0', textTransform: 'uppercase', letterSpacing: '.08em', display: 'block', marginBottom: '5px' }}>
              Imię i nazwisko
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              placeholder="Jan Kowalski"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={{ fontSize: '10px', color: '#8a99b0', textTransform: 'uppercase', letterSpacing: '.08em', display: 'block', marginBottom: '5px' }}>
              Adres email
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              placeholder="jan@firma.pl"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={{ fontSize: '10px', color: '#8a99b0', textTransform: 'uppercase', letterSpacing: '.08em', display: 'block', marginBottom: '5px' }}>
              Wiadomość
            </label>
            <textarea
              required
              value={form.message}
              onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
              placeholder="Opisz swoje pytanie lub problem..."
              rows={4}
              style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
            />
          </div>

          {status === 'error' && (
            <div style={{ background: 'rgba(232,64,64,.1)', border: '1px solid rgba(232,64,64,.3)', borderRadius: '6px', padding: '10px 12px', fontSize: '12px', color: '#E84040' }}>
              ⚠️ Wystąpił błąd. Spróbuj ponownie lub napisz bezpośrednio na support@riskanalytix.eu
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            style={{
              padding: '10px', borderRadius: '6px', border: 'none',
              background: status === 'sending' ? '#1e2d45' : '#E8A838',
              color: status === 'sending' ? '#8a99b0' : '#0B0F1A',
              cursor: status === 'sending' ? 'not-allowed' : 'pointer',
              fontSize: '13px', fontWeight: 700, transition: 'all .2s',
            }}
          >
            {status === 'sending' ? '⏳ Wysyłanie...' : '✉️ Wyślij wiadomość'}
          </button>
        </form>
      )}
    </div>
  )
}