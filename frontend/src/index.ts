export type Role = 'USER' | 'ADMIN'

export interface User {
  id: string
  email: string
  name: string
  role: Role
  subscription?: Subscription | null
}

export interface Subscription {
  id: string
  plan: string
  status: string
  startsAt: string
  expiresAt: string
}

export type MachineCategory =
  | 'lathe'
  | 'milling'
  | 'grinding'
  | 'press'
  | 'robot'
  | 'conveyor'
  | 'packaging'
  | 'plastics'
  | 'woodworking'
  | 'food'
  | 'crane'
  | 'agricultural'
  | 'custom'

export interface MachineType {
  id: string
  category: MachineCategory
  name: string
  norms: string[]
  threats: ThreatTemplate[]
}

export interface ThreatTemplate {
  id: string
  element: string
  threat: string
  effect: string
  defaultS: number
  defaultP: number
  actions: string[]
}

export interface RiskEntry {
  id: string
  element: string
  threat: string
  effect: string
  severity: number
  probability: number
  riskScore: number
  action: string
  sortOrder: number
}

export interface RiskAnalysis {
  id: string
  machineName: string
  machineCategory: string
  serialNo?: string
  manufacturer?: string
  productionYear?: number
  purpose?: string
  norm?: string
  analystName?: string
  analysisDate?: string
  notes?: string
  clientName?: string
  clientCompany?: string
  clientNip?: string
  clientAddress?: string
  clientLogo?: string
  language: string
  entries: RiskEntry[]
  createdAt: string
  updatedAt: string
}

export interface RiskLevel {
  label: string
  level: number
  cls: 'neg' | 'low' | 'med' | 'high'
  r: number
  color: string
}