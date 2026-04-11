// @ts-nocheck
// frontend/src/pages/auth/AuthPage.tsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuthStore } from '../../store/auth.store'
import {
  ShieldCheck, Eye, EyeOff, AlertCircle, CheckCircle2,
  Building2, Hash, MapPin, Phone, User, Mail, Lock,
  FileText, ChevronRight, ChevronLeft, Loader2, ArrowRight
} from 'lucide-react'

const loginSchema = z.object({
  email:    z.string().email('Nieprawidłowy adres email'),
  password: z.string().min(1, 'Hasło jest wymagane'),
})

const registerSchema = z.object({
  name:            z.string().min(2, 'Min. 2 znaki'),
  email:           z.string().email('Nieprawidłowy adres email'),
  password:        z.string().min(8, 'Min. 8 znaków'),
  confirmPassword: z.string(),
  companyName:     z.string().min(2, 'Min. 2 znaki'),
  nip:             z.string().regex(/^\d{10}$/, 'NIP: 10 cyfr bez kresek'),
  regon:           z.string().regex(/^\d{9}(\d{5})?$/, 'REGON: 9 lub 14 cyfr').optional().or(z.literal('')),
  street:          z.string().min(3, 'Min. 3 znaki'),
  city:            z.string().min(2, 'Min. 2 znaki'),
  postalCode:      z.string().regex(/^\d{2}-\d{3}$/, 'Format: 00-000'),
  country:         z.string().default('Polska'),
  phone:           z.string().optional().or(z.literal('')),
}).refine(d => d.password === d.confirmPassword, {
  message: 'Hasła nie są zgodne',
  path: ['confirmPassword'],
})

type LoginForm    = z.infer<typeof loginSchema>
type RegisterForm = z.infer<typeof registerSchema>

function Field({ label, error, icon: Icon, hint, required, ...props }: {
  label: string; error?: string; icon?: any; hint?: string; required?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const [show, setShow] = useState(false)
  const isPass = props.type === 'password'
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1.5">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        )}
        <input
          {...props}
          type={isPass ? (show ? 'text' : 'password') : props.type}
          className={[
            'w-full text-sm rounded-lg border bg-white text-gray-900 placeholder-gray-400',
            'transition-all outline-none py-2.5',
            Icon ? 'pl-9' : 'pl-3',
            isPass ? 'pr-10' : 'pr-3',
            error
              ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
              : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-gray-300',
          ].join(' ')}
        />
        {isPass && (
          <button type="button" tabIndex={-1}
            onClick={() => setShow(v => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            {show ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        )}
      </div>
      {hint && !error && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
      {error && (
        <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
          <AlertCircle size={11} />{error}
        </p>
      )}
    </div>
  )
}

export default function AuthPage() {
  const navigate = useNavigate()
  const { login: doLogin, register: doRegister } = useAuthStore()

  const [mode,    setMode]    = useState<'login' | 'register'>('login')
  const [step,    setStep]    = useState(1)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  const loginForm = useForm<LoginForm>({ resolver: zodResolver(loginSchema) })
  const regForm   = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { country: 'Polska' },
    mode: 'onTouched',
  })

  const handleLogin = async (data: LoginForm) => {
    setLoading(true); setError('')
    try {
      await doLogin(data.email, data.password)
      navigate('/dashboard')
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Nieprawidłowy email lub hasło')
    } finally { setLoading(false) }
  }

  const STEP_FIELDS: Record<number, (keyof RegisterForm)[]> = {
    1: ['name', 'email', 'password', 'confirmPassword'],
    2: ['companyName', 'nip', 'regon'],
    3: ['street', 'city', 'postalCode', 'country', 'phone'],
  }

  const nextStep = async () => {
    const ok = await regForm.trigger(STEP_FIELDS[step])
    if (ok) setStep(s => s + 1)
  }

  const handleRegister = async (data: RegisterForm) => {
    setLoading(true); setError('')
    try {
      await doRegister({
        name: data.name, email: data.email, password: data.password,
        companyName: data.companyName, nip: data.nip, regon: data.regon || undefined,
        street: data.street, city: data.city, postalCode: data.postalCode,
        country: data.country, phone: data.phone || undefined,
      })
      navigate('/dashboard')
    } catch (e: any) {
      const errs = e?.response?.data?.errors as { message: string }[] | undefined
      setError(errs?.map(x => x.message).join(' • ') || e?.response?.data?.message || 'Błąd rejestracji')
    } finally { setLoading(false) }
  }

  const switchMode = (m: typeof mode) => {
    setMode(m); setStep(1); setError('')
    loginForm.reset(); regForm.reset({ country: 'Polska' })
  }

  const STEPS = [
    { n: 1, label: 'Konto',  icon: User      },
    { n: 2, label: 'Firma',  icon: Building2 },
    { n: 3, label: 'Adres',  icon: MapPin    },
  ]

  return (
    <div className="min-h-screen flex">

      {/* Panel lewy — branding (tylko desktop) */}
      <div className="hidden lg:flex lg:w-5/12 xl:w-1/2 bg-gray-900 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-blue-400/5 blur-3xl" />

        <div className="relative">
          <Link to="/" className="flex items-center gap-3 mb-14 group w-fit">
            <div className="w-11 h-11 bg-blue-600 group-hover:bg-blue-500 rounded-xl flex items-center justify-center shadow-lg transition-colors">
              <ShieldCheck size={24} className="text-white" />
            </div>
            <div>
              <span className="text-white font-bold text-xl tracking-tight">RiskAnalytix</span>
              <span className="block text-blue-400/80 text-xs">Ocena ryzyka maszyn</span>
            </div>
          </Link>

          <h2 className="text-3xl xl:text-4xl font-bold text-white leading-snug mb-4">
            Profesjonalna ocena<br />
            <span className="text-blue-400">ryzyka maszyn</span><br />
            zgodna z normami
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
            System zgodny z PN-EN ISO 12100:2012 i dyrektywą maszynową 2006/42/WE.
            Generuj raporty PDF gotowe do audytu w kilka minut.
          </p>
        </div>

        <div className="relative space-y-3">
          {[
            { icon: ShieldCheck, text: 'Zgodność z ISO 12100, ISO 23125, EN 693 i innymi' },
            { icon: FileText,    text: 'Raporty PDF z logo i danymi firmy' },
            { icon: Building2,   text: 'Baza 20+ typów maszyn i 200+ zagrożeń' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/20 flex items-center justify-center shrink-0">
                <Icon size={14} className="text-blue-400" />
              </div>
              <span className="text-gray-400 text-sm">{text}</span>
            </div>
          ))}
          <p className="text-gray-600 text-xs pt-3">
            © {new Date().getFullYear()} RiskAnalytix · Wszelkie prawa zastrzeżone
          </p>
        </div>
      </div>

      {/* Panel prawy — formularz */}
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 px-6 py-12 overflow-y-auto">

        {/* Logo mobile */}
        <Link to="/" className="flex lg:hidden items-center gap-2 mb-8 group">
          <div className="w-9 h-9 bg-blue-600 group-hover:bg-blue-500 rounded-xl flex items-center justify-center transition-colors">
            <ShieldCheck size={18} className="text-white" />
          </div>
          <span className="font-bold text-gray-900 text-lg tracking-tight">RiskAnalytix</span>
        </Link>

        <div className="w-full max-w-md">

          {/* Nagłówek */}
          <div className="mb-7">
            <h1 className="text-2xl font-bold text-gray-900">
              {mode === 'login' ? 'Zaloguj się' : 'Zarejestruj firmę'}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {mode === 'login'
                ? 'Witaj z powrotem! Wprowadź swoje dane.'
                : 'Utwórz konto i zacznij oceniać ryzyko.'}
            </p>
          </div>

          {/* Przełącznik */}
          <div className="flex bg-gray-200/70 rounded-xl p-1 mb-7">
            {(['login', 'register'] as const).map(m => (
              <button key={m} type="button" onClick={() => switchMode(m)}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                  mode === m
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}>
                {m === 'login' ? 'Logowanie' : 'Rejestracja'}
              </button>
            ))}
          </div>

          {/* Błąd globalny */}
          {error && (
            <div className="flex items-start gap-2.5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 mb-5">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* LOGOWANIE */}
          {mode === 'login' && (
            <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
              <Field label="Adres email" icon={Mail} type="email"
                placeholder="jan@firma.pl" required
                error={loginForm.formState.errors.email?.message}
                {...loginForm.register('email')} />

              <Field label="Hasło" icon={Lock} type="password"
                placeholder="Twoje hasło" required
                error={loginForm.formState.errors.password?.message}
                {...loginForm.register('password')} />

              <div className="flex justify-end -mt-1">
                <Link to="/forgot-password"
                  className="text-xs text-blue-600 hover:text-blue-700 hover:underline">
                  Zapomniałem hasła
                </Link>
              </div>

              <button type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3
                  bg-blue-600 hover:bg-blue-700 disabled:opacity-60
                  text-white text-sm font-semibold rounded-xl
                  transition-all shadow-sm">
                {loading
                  ? <><Loader2 size={16} className="animate-spin" /> Logowanie...</>
                  : <>Zaloguj się <ArrowRight size={16} /></>}
              </button>

              <p className="text-center text-sm text-gray-500 pt-1">
                Nie masz konta?{' '}
                <button type="button" onClick={() => switchMode('register')}
                  className="text-blue-600 hover:underline font-medium">
                  Zarejestruj firmę
                </button>
              </p>
            </form>
          )}

          {/* REJESTRACJA */}
          {mode === 'register' && (
            <>
              {/* Pasek kroków */}
              <div className="flex items-center mb-7">
                {STEPS.map((s, i) => {
                  const Icon    = s.icon
                  const done    = step > s.n
                  const current = step === s.n
                  return (
                    <div key={s.n} className="flex items-center flex-1 min-w-0">
                      <div className="flex flex-col items-center gap-1.5 shrink-0">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all ${
                          done    ? 'bg-green-500 border-green-500 text-white' :
                          current ? 'bg-blue-600 border-blue-600 text-white' :
                                    'bg-white border-gray-200 text-gray-400'
                        }`}>
                          {done ? <CheckCircle2 size={16} /> : <Icon size={15} />}
                        </div>
                        <span className={`text-xs font-medium ${
                          done ? 'text-green-600' : current ? 'text-blue-600' : 'text-gray-400'
                        }`}>{s.label}</span>
                      </div>
                      {i < STEPS.length - 1 && (
                        <div className={`flex-1 h-px mx-3 mb-5 transition-all ${
                          step > s.n ? 'bg-green-400' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  )
                })}
              </div>

              <form onSubmit={regForm.handleSubmit(handleRegister)} className="space-y-4">

                {step === 1 && <>
                  <Field label="Imię i nazwisko" icon={User} type="text"
                    placeholder="Jan Kowalski" required
                    error={regForm.formState.errors.name?.message}
                    {...regForm.register('name')} />
                  <Field label="Adres email" icon={Mail} type="email"
                    placeholder="jan@firma.pl" required
                    error={regForm.formState.errors.email?.message}
                    {...regForm.register('email')} />
                  <Field label="Hasło" icon={Lock} type="password"
                    placeholder="Min. 8 znaków" required hint="Minimum 8 znaków"
                    error={regForm.formState.errors.password?.message}
                    {...regForm.register('password')} />
                  <Field label="Powtórz hasło" icon={Lock} type="password"
                    placeholder="Powtórz hasło" required
                    error={regForm.formState.errors.confirmPassword?.message}
                    {...regForm.register('confirmPassword')} />
                </>}

                {step === 2 && <>
                  <p className="text-xs text-gray-400 pb-1">
                    Dane pojawią się na raportach PDF i fakturach
                  </p>
                  <Field label="Nazwa firmy" icon={Building2} type="text"
                    placeholder="XYZ Sp. z o.o." required
                    error={regForm.formState.errors.companyName?.message}
                    {...regForm.register('companyName')} />
                  <Field label="NIP" icon={Hash} type="text"
                    placeholder="1234567890" required hint="10 cyfr bez kresek"
                    error={regForm.formState.errors.nip?.message}
                    {...regForm.register('nip')} />
                  <Field label="REGON" icon={FileText} type="text"
                    placeholder="123456789" hint="9 lub 14 cyfr (opcjonalnie)"
                    error={regForm.formState.errors.regon?.message}
                    {...regForm.register('regon')} />
                </>}

                {step === 3 && <>
                  <Field label="Ulica i numer" icon={MapPin} type="text"
                    placeholder="ul. Przemysłowa 12" required
                    error={regForm.formState.errors.street?.message}
                    {...regForm.register('street')} />
                  <div className="grid grid-cols-5 gap-3">
                    <div className="col-span-2">
                      <Field label="Kod pocztowy" type="text"
                        placeholder="00-000" required
                        error={regForm.formState.errors.postalCode?.message}
                        {...regForm.register('postalCode')} />
                    </div>
                    <div className="col-span-3">
                      <Field label="Miasto" type="text"
                        placeholder="Warszawa" required
                        error={regForm.formState.errors.city?.message}
                        {...regForm.register('city')} />
                    </div>
                  </div>
                  <Field label="Kraj" type="text" placeholder="Polska"
                    error={regForm.formState.errors.country?.message}
                    {...regForm.register('country')} />
                  <Field label="Telefon" icon={Phone} type="tel"
                    placeholder="+48 123 456 789" hint="Opcjonalnie"
                    error={regForm.formState.errors.phone?.message}
                    {...regForm.register('phone')} />
                </>}

                {/* Nawigacja kroków */}
                <div className="flex gap-3 pt-2">
                  {step > 1 && (
                    <button type="button" onClick={() => setStep(s => s - 1)}
                      className="flex items-center gap-1.5 px-4 py-2.5
                        text-sm font-medium text-gray-600
                        bg-white border border-gray-200 rounded-xl
                        hover:bg-gray-50 transition-all">
                      <ChevronLeft size={15} /> Wstecz
                    </button>
                  )}
                  {step < 3 ? (
                    <button type="button" onClick={nextStep}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5
                        bg-blue-600 hover:bg-blue-700 text-white
                        text-sm font-semibold rounded-xl transition-all shadow-sm">
                      Dalej <ChevronRight size={15} />
                    </button>
                  ) : (
                    <button type="submit" disabled={loading}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5
                        bg-green-600 hover:bg-green-700 disabled:opacity-60
                        text-white text-sm font-semibold rounded-xl transition-all shadow-sm">
                      {loading
                        ? <><Loader2 size={15} className="animate-spin" /> Rejestracja...</>
                        : <><CheckCircle2 size={15} /> Zarejestruj firmę</>}
                    </button>
                  )}
                </div>

                <p className="text-center text-sm text-gray-500 pt-1">
                  Masz konto?{' '}
                  <button type="button" onClick={() => switchMode('login')}
                    className="text-blue-600 hover:underline font-medium">
                    Zaloguj się
                  </button>
                </p>

                <p className="text-center text-xs text-gray-400">
                  Rejestrując się akceptujesz{' '}
                  <Link to="/terms" className="hover:underline">Regulamin</Link>
                  {' '}i{' '}
                  <Link to="/privacy" className="hover:underline">Politykę Prywatności</Link>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

