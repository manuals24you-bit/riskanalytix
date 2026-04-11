// @ts-nocheck
// frontend/src/pages/profile/ProfilePage.tsx
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '../../store/auth.store'
import { useMutation } from '@tanstack/react-query'
import api from '../../services/api'

export default function ProfilePage() {
  const { t } = useTranslation()
  const { user, setUser } = useAuthStore()

  const [form, setForm] = useState({
    name: user?.name || '',
    companyName: user?.companyName || '',
    nip: user?.nip || '',
    address: user?.address || '',
    city: user?.city || '',
    postalCode: user?.postalCode || '',
    country: user?.country || '',
    phone: user?.phone || '',
    website: user?.website || '',
  })

  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' })
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)
  const [pwMsg, setPwMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)

  const saveMutation = useMutation({
    mutationFn: () => api.put('/users/profile', form).then(r => r.data),
    onSuccess: (data) => {
      if (setUser) setUser(data)
      setMsg({ type: 'ok', text: t('profile.savedOk') })
      setTimeout(() => setMsg(null), 3000)
    },
    onError: () => setMsg({ type: 'err', text: t('profile.savedError') }),
  })

  const pwMutation = useMutation({
    mutationFn: () => api.put('/users/password', { currentPassword: passwords.current, newPassword: passwords.newPass }).then(r => r.data),
    onSuccess: () => {
      setPwMsg({ type: 'ok', text: t('profile.passwordOk') })
      setPasswords({ current: '', newPass: '', confirm: '' })
      setTimeout(() => setPwMsg(null), 3000)
    },
    onError: () => setPwMsg({ type: 'err', text: t('profile.passwordError') }),
  })

  const handleSave = () => saveMutation.mutate()
  const handlePw = () => {
    if (passwords.newPass !== passwords.confirm) {
      setPwMsg({ type: 'err', text: t('profile.passwordMismatch') })
      return
    }
    pwMutation.mutate()
  }

  const inp = 'w-full px-3 py-2 rounded-lg border border-[#2a3550] bg-[#0d1b35] text-white text-sm focus:outline-none focus:border-[#F5B800]'
  const lbl = 'block text-xs text-[#8a99b0] mb-1'

  return (
    <div className="min-h-screen bg-[#060f23] text-white p-6">
      <div className="max-w-3xl mx-auto">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">{t('profile.title')}</h1>
          <p className="text-[#8a99b0] text-sm mt-1">{t('profile.subtitle')}</p>
        </div>

        {/* Subscription */}
        <div className="mb-6 p-4 rounded-xl border border-[#2a3550] bg-[#0d1b35] flex items-center justify-between">
          <div>
            <p className="text-xs text-[#8a99b0] mb-1">{t('profile.sectionSubscription')}</p>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F5B800]/20 text-[#F5B800] border border-[#F5B800]/30">
              {user?.subscription?.plan === 'PRO' ? t('profile.planPro') : t('profile.planFree')}
            </span>
          </div>
          <button className="px-4 py-2 rounded-lg bg-[#F5B800] text-[#060f23] text-sm font-bold hover:bg-yellow-400 transition-colors">
            {t('profile.planUpgrade')}
          </button>
        </div>

        {/* Account */}
        <div className="mb-6 p-6 rounded-xl border border-[#2a3550] bg-[#0d1b35]">
          <h2 className="text-sm font-semibold text-[#F5B800] mb-4">{t('profile.sectionAccount')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={lbl}>{t('profile.name')}</label>
              <input className={inp} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div>
              <label className={lbl}>{t('profile.email')}</label>
              <input className={inp + ' opacity-50 cursor-not-allowed'} value={user?.email || ''} disabled />
            </div>
            <div>
              <label className={lbl}>{t('profile.role')}</label>
              <input className={inp + ' opacity-50 cursor-not-allowed'} value={user?.role === 'ADMIN' ? t('profile.roleAdmin') : t('profile.roleUser')} disabled />
            </div>
          </div>
        </div>

        {/* Company */}
        <div className="mb-6 p-6 rounded-xl border border-[#2a3550] bg-[#0d1b35]">
          <h2 className="text-sm font-semibold text-[#F5B800] mb-4">{t('profile.sectionCompany')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ['companyName', t('profile.companyName')],
              ['nip', t('profile.nip')],
              ['phone', t('profile.phone')],
              ['website', t('profile.website')],
              ['address', t('profile.address')],
              ['city', t('profile.city')],
              ['postalCode', t('profile.postalCode')],
              ['country', t('profile.country')],
            ].map(([key, label]) => (
              <div key={key}>
                <label className={lbl}>{label}</label>
                <input className={inp} value={(form as any)[key] || ''} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} />
              </div>
            ))}
          </div>
        </div>

        {msg && (
          <div className={`mb-4 p-3 rounded-lg text-sm ${msg.type === 'ok' ? 'bg-green-900/30 text-green-400 border border-green-800' : 'bg-red-900/30 text-red-400 border border-red-800'}`}>
            {msg.text}
          </div>
        )}
        <button onClick={handleSave} disabled={saveMutation.isPending}
          className="mb-8 px-6 py-2.5 rounded-lg bg-[#F5B800] text-[#060f23] font-bold text-sm hover:bg-yellow-400 transition-colors disabled:opacity-50">
          {saveMutation.isPending ? '...' : t('profile.saveBtn')}
        </button>

        {/* Password */}
        <div className="p-6 rounded-xl border border-[#2a3550] bg-[#0d1b35]">
          <h2 className="text-sm font-semibold text-[#F5B800] mb-4">{t('profile.sectionPassword')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={lbl}>{t('profile.currentPassword')}</label>
              <input type="password" className={inp} value={passwords.current} onChange={e => setPasswords(p => ({ ...p, current: e.target.value }))} />
            </div>
            <div>
              <label className={lbl}>{t('profile.newPassword')}</label>
              <input type="password" className={inp} value={passwords.newPass} onChange={e => setPasswords(p => ({ ...p, newPass: e.target.value }))} />
            </div>
            <div>
              <label className={lbl}>{t('profile.confirmPassword')}</label>
              <input type="password" className={inp} value={passwords.confirm} onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))} />
            </div>
          </div>
          {pwMsg && (
            <div className={`mt-3 p-3 rounded-lg text-sm ${pwMsg.type === 'ok' ? 'bg-green-900/30 text-green-400 border border-green-800' : 'bg-red-900/30 text-red-400 border border-red-800'}`}>
              {pwMsg.text}
            </div>
          )}
          <button onClick={handlePw} disabled={pwMutation.isPending}
            className="mt-4 px-6 py-2.5 rounded-lg border border-[#F5B800] text-[#F5B800] font-bold text-sm hover:bg-[#F5B800]/10 transition-colors disabled:opacity-50">
            {pwMutation.isPending ? '...' : t('profile.changePasswordBtn')}
          </button>
        </div>

      </div>
    </div>
  )
}


