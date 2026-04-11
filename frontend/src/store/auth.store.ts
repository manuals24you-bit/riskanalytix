// frontend/src/store/auth.store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import api from '../services/api'

export interface User {
  id:          string
  email:       string
  name:        string
  role:        'USER' | 'ADMIN'
  // Dane firmowe
  companyName?: string
  nip?:         string
  regon?:       string
  street?:      string
  city?:        string
  postalCode?:  string
  country?:     string
  phone?:       string
  logoUrl?:     string
  subscription?: {
    plan:    string
    status:  string
    endDate?: string
  }
}

interface RegisterData {
  name:         string
  email:        string
  password:     string
  companyName:  string
  nip:          string
  regon?:       string
  street:       string
  city:         string
  postalCode:   string
  country:      string
  phone?:       string
}

interface AuthState {
  user:         User | null
  accessToken:  string | null
  refreshToken: string | null
  isLoading:    boolean

  login:         (email: string, password: string) => Promise<void>
  register:      (data: RegisterData) => Promise<void>
  logout:        () => void
  fetchMe:       () => Promise<void>
  updateProfile: (data: Partial<RegisterData & { logoUrl?: string }>) => Promise<void>
  setTokens:     (access: string, refresh: string) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user:         null,
      accessToken:  null,
      refreshToken: null,
      isLoading:    false,

      setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),

      login: async (email, password) => {
        const { data } = await api.post('/auth/login', { email, password })
        set({
          user:         data.user,
          accessToken:  data.accessToken,
          refreshToken: data.refreshToken,
        })
      },

      register: async (registerData) => {
        const { data } = await api.post('/auth/register', registerData)
        set({
          user:         data.user,
          accessToken:  data.accessToken,
          refreshToken: data.refreshToken,
        })
      },

      logout: () => {
        set({ user: null, accessToken: null, refreshToken: null })
      },

      fetchMe: async () => {
        try {
          const { data } = await api.get('/auth/me')
          set({ user: data })
        } catch {
          set({ user: null, accessToken: null, refreshToken: null })
        }
      },

      updateProfile: async (profileData) => {
        const { data } = await api.put('/auth/profile', profileData)
        set({ user: data })
      },
    }),
    {
      name: 'riskanalytix-auth',
      partialize: (state) => ({
        user:         state.user,
        accessToken:  state.accessToken,
        refreshToken: state.refreshToken,
      }),
    }
  )
)