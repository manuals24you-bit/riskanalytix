// @ts-nocheck
import { Response } from 'express'
import { prisma } from '../utils/prisma'
import { AuthRequest } from '../middleware/auth'

// ── AUDIT HELPER ─────────────────────────────────────────────────────────────

const TRACKED_FIELDS = [
  'machineName', 'machineCategory', 'serialNo', 'manufacturer',
  'productionYear', 'purpose', 'norm', 'analystName', 'analysisDate',
  'notes', 'clientName', 'clientCompany', 'clientNip', 'clientAddress',
  'language', 'intendedUse', 'foreseenMisuse', 'spaceLimits',
  'timeLimits', 'envLimits',
  'preparedBy', 'preparedRole', 'approvedBy', 'approvedRole', 'approvedDate',
  'machineTypeId', 'riskMethod',
]

const FIELD_LABELS: Record<string, string> = {
  machineName: 'Nazwa maszyny', machineCategory: 'Kategoria',
  serialNo: 'Nr seryjny', manufacturer: 'Producent',
  productionYear: 'Rok produkcji', purpose: 'Przeznaczenie',
  norm: 'Norma', analystName: 'Analityk', analysisDate: 'Data analizy',
  notes: 'Uwagi', clientName: 'Klient — osoba', clientCompany: 'Klient — firma',
  clientNip: 'NIP', clientAddress: 'Adres klienta',
  language: 'Jezyk', intendedUse: 'Przewidywane uzycie',
  foreseenMisuse: 'Przewidywane naduzycie', spaceLimits: 'Granice przestrzenne',
  timeLimits: 'Granice czasowe', envLimits: 'Ograniczenia srodowiskowe',
  preparedBy: 'Opracowal', preparedRole: 'Stanowisko opracowujacego',
  approvedBy: 'Zatwierdzil', approvedRole: 'Stanowisko zatwierdzajacego',
  approvedDate: 'Data zatwierdzenia', machineTypeId: 'ID maszyny', riskMethod: 'Metoda oceny',
}

function diffAnalysis(before: any, after: any) {
  const changes: Array<{ field: string; label: string; from: any; to: any }> = []
  for (const field of TRACKED_FIELDS) {
    const oldVal = before[field] ?? null
    const newVal = after[field] ?? null
    const oldStr = oldVal instanceof Date ? oldVal.toISOString() : String(oldVal ?? '')
    const newStr = newVal instanceof Date ? new Date(newVal).toISOString() : String(newVal ?? '')
    if (oldStr !== newStr) {
      changes.push({ field, label: FIELD_LABELS[field] || field, from: oldVal, to: newVal })
    }
  }
  return changes
}

async function writeAudit(
  userId: string,
  analysisId: string | null,
  action: string,
  details: Record<string, any>,
  req: any,
) {
  try {
    // Uzywamy connect zamiast bezposredniego userId (wymagane przez Prisma relacje)
    await prisma.auditLog.create({
      data: {
        action,
        resource: analysisId ? `analysis:${analysisId}` : 'analysis',
        details,
        ipAddress: req.ip || req.headers['x-forwarded-for'] || null,
        userAgent: req.headers['user-agent'] || null,
        ...(userId ? { user: { connect: { id: userId } } } : {}),
        ...(analysisId ? { analysis: { connect: { id: analysisId } } } : {}),
      },
    })
  } catch (err) {
    // Audit nie moze blokowac glownej operacji
    console.error('AUDIT WRITE ERROR:', err)
  }
}

// ── CONTROLLERS ───────────────────────────────────────────────────────────────

export const getAnalyses = async (req: AuthRequest, res: Response) => {
  try {
    const analyses = await prisma.riskAnalysis.findMany({
      where: { userId: req.user!.userId },
      include: { riskEntries: true },
      orderBy: { updatedAt: 'desc' },
    })
    res.json(analyses)
  } catch (error: any) {
    console.error('GET ANALYSES ERROR:', error?.message)
    res.status(500).json({ error: error?.message || 'Blad serwera' })
  }
}

export const createAnalysis = async (req: AuthRequest, res: Response) => {
  try {
    const {
      machineName, machineCategory, serialNo, manufacturer,
      productionYear, purpose, norm, analystName, analysisDate,
      notes, clientName, clientCompany, clientNip, clientAddress,
      language, riskMethod, intendedUse, foreseenMisuse, spaceLimits, timeLimits, envLimits,
      machineTypeId, preparedBy, preparedRole, approvedBy, approvedRole, approvedDate,
      entries = []
    } = req.body

    const analysis = await prisma.riskAnalysis.create({
      data: {
        userId: req.user!.userId,
        machineName, machineCategory,
        serialNo: serialNo || null, manufacturer: manufacturer || null,
        productionYear: productionYear ? parseInt(productionYear) : null,
        purpose: purpose || null, norm: norm || null,
        analystName: analystName || null,
        analysisDate: analysisDate ? new Date(analysisDate) : null,
        notes: notes || null, clientName: clientName || null,
        clientCompany: clientCompany || null, clientNip: clientNip || null,
        clientAddress: clientAddress || null, language: language || 'pl',
        intendedUse: intendedUse || null, foreseenMisuse: foreseenMisuse || null,
        spaceLimits: spaceLimits || null, timeLimits: timeLimits || null,
        envLimits: envLimits || null,
        machineTypeId: machineTypeId || null, riskMethod: riskMethod || null,
        preparedBy: preparedBy || null, preparedRole: preparedRole || null,
        approvedBy: approvedBy || null, approvedRole: approvedRole || null,
        approvedDate: approvedDate ? new Date(approvedDate) : null,
        riskEntries: {
          create: entries.map((e: any, i: number) => ({
            element: e.element, threat: e.threat, effect: e.effect || null,
            severity: e.severity, probability: e.probability, riskScore: e.riskScore,
            action: e.action || null, riskMethod: e.riskMethod || null,
            justificationS: e.justificationS || null, justificationP: e.justificationP || null,
            plrS: e.plrS || null, plrF: e.plrF || null, plrP: e.plrP || null,
            plrAuto: e.plrAuto || null, plrManual: e.plrManual || null,
            plrJustification: e.plrJustification || null,
            plCategory: e.plCategory || null, plAchieved: e.plAchieved || null,
            mttfd: e.mttfd || null, dcavg: e.dcavg || null,
            frequency: e.frequency ?? null, avoidance: e.avoidance ?? null,
            scenario: e.scenario || null, reductionLevel: e.reductionLevel || null,
            actionLevel: e.actionLevel || null, actionNorm: e.actionNorm || null,
            lifecycleStages: e.lifecycleStages || null,
            residualS: e.residualS ?? null, residualP: e.residualP ?? null,
            residualR: e.residualR ?? null, sortOrder: e.sortOrder ?? i,
          })),
        },
      },
      include: { riskEntries: true },
    })

    await writeAudit(req.user!.userId, analysis.id, 'CREATED', {
      machineName, machineCategory, entriesCount: entries.length,
    }, req)

    res.status(201).json(analysis)
  } catch (error: any) {
    console.error('CREATE ANALYSIS ERROR:', error?.message)
    res.status(500).json({ error: error?.message || 'Blad serwera' })
  }
}

export const updateAnalysis = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const existing = await prisma.riskAnalysis.findFirst({
      where: { id, userId: req.user!.userId },
      include: { riskEntries: true },
    })
    if (!existing) { res.status(404).json({ error: 'Nie znaleziono' }); return }

    const {
      machineName, machineCategory, serialNo, manufacturer,
      productionYear, purpose, norm, analystName, analysisDate,
      notes, clientName, clientCompany, clientNip, clientAddress,
      language, riskMethod, intendedUse, foreseenMisuse, spaceLimits, timeLimits, envLimits,
      machineTypeId, preparedBy, preparedRole, approvedBy, approvedRole, approvedDate,
      entries = []
    } = req.body

    await prisma.riskEntry.deleteMany({ where: { analysisId: id } })

    const analysis = await prisma.riskAnalysis.update({
      where: { id },
      data: {
        machineName, machineCategory,
        serialNo: serialNo || null, manufacturer: manufacturer || null,
        productionYear: productionYear ? parseInt(productionYear) : null,
        purpose: purpose || null, norm: norm || null,
        analystName: analystName || null,
        analysisDate: analysisDate ? new Date(analysisDate) : null,
        notes: notes || null, clientName: clientName || null,
        clientCompany: clientCompany || null, clientNip: clientNip || null,
        clientAddress: clientAddress || null, language: language || 'pl',
        intendedUse: intendedUse || null, foreseenMisuse: foreseenMisuse || null,
        spaceLimits: spaceLimits || null, timeLimits: timeLimits || null,
        envLimits: envLimits || null,
        machineTypeId: machineTypeId || null, riskMethod: riskMethod || null,
        preparedBy: preparedBy || null, preparedRole: preparedRole || null,
        approvedBy: approvedBy || null, approvedRole: approvedRole || null,
        approvedDate: approvedDate ? new Date(approvedDate) : null,
        riskEntries: {
          create: entries.map((e: any, i: number) => ({
            element: e.element, threat: e.threat, effect: e.effect || null,
            severity: e.severity, probability: e.probability, riskScore: e.riskScore,
            action: e.action || null, riskMethod: e.riskMethod || null,
            justificationS: e.justificationS || null, justificationP: e.justificationP || null,
            plrS: e.plrS || null, plrF: e.plrF || null, plrP: e.plrP || null,
            plrAuto: e.plrAuto || null, plrManual: e.plrManual || null,
            plrJustification: e.plrJustification || null,
            plCategory: e.plCategory || null, plAchieved: e.plAchieved || null,
            mttfd: e.mttfd || null, dcavg: e.dcavg || null,
            frequency: e.frequency ?? null, avoidance: e.avoidance ?? null,
            scenario: e.scenario || null, reductionLevel: e.reductionLevel || null,
            actionLevel: e.actionLevel || null, actionNorm: e.actionNorm || null,
            lifecycleStages: e.lifecycleStages || null,
            residualS: e.residualS ?? null, residualP: e.residualP ?? null,
            residualR: e.residualR ?? null, sortOrder: e.sortOrder ?? i,
          })),
        },
      },
      include: { riskEntries: true },
    })

    const changes = diffAnalysis(existing, req.body)
    const oldCount = existing.riskEntries.length
    const newCount = entries.length

    await writeAudit(req.user!.userId, id, 'UPDATED', {
      changedFields: changes,
      entriesCount: { from: oldCount, to: newCount, changed: oldCount !== newCount },
      summary: changes.length > 0
        ? `Zmieniono: ${changes.map((c: any) => c.label).join(', ')}${oldCount !== newCount ? `, zagrozenia (${oldCount}>${newCount})` : ''}`
        : oldCount !== newCount ? `Zmieniono zagrozenia (${oldCount}>${newCount})` : 'Zapisano bez zmian',
    }, req)

    res.json(analysis)
  } catch (error: any) {
    console.error('UPDATE ANALYSIS ERROR:', error?.message)
    res.status(500).json({ error: error?.message || 'Blad serwera' })
  }
}

export const duplicateAnalysis = async (req: any, res: any) => {
  try {
    const userId = req.user!.userId
    const { id } = req.params
    const original = await prisma.riskAnalysis.findFirst({
      where: { id, userId }, include: { riskEntries: true },
    })
    if (!original) return res.status(404).json({ error: 'Not found' })

    const { id: _id, createdAt, updatedAt, riskEntries, ...analysisData } = original as any
    const duplicate = await prisma.riskAnalysis.create({
      data: {
        ...analysisData,
        machineName: analysisData.machineName + ' (kopia)',
        userId,
        riskEntries: {
          create: riskEntries.map(({ id: _eid, analysisId: _aid, createdAt: _ec, ...entry }: any) => entry),
        },
      },
      include: { riskEntries: true },
    })

    await writeAudit(userId, duplicate.id, 'DUPLICATED', {
      sourceAnalysisId: id, sourceName: original.machineName,
      entriesCount: riskEntries.length,
    }, req)

    res.json(duplicate)
  } catch (err) {
    console.error('Duplicate error:', err)
    res.status(500).json({ error: 'Duplicate failed' })
  }
}

export const deleteAnalysis = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const existing = await prisma.riskAnalysis.findFirst({
      where: { id, userId: req.user!.userId },
    })
    await prisma.riskAnalysis.deleteMany({ where: { id, userId: req.user!.userId } })
    if (existing) {
      await writeAudit(req.user!.userId, null, 'DELETED', {
        analysisId: id, machineName: existing.machineName,
        machineCategory: existing.machineCategory,
        deletedAt: new Date().toISOString(),
      }, req)
    }
    res.json({ success: true })
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Blad serwera' })
  }
}

export const getAnalysis = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const analysis = await prisma.riskAnalysis.findFirst({
      where: { id, userId: req.user!.userId },
      include: { riskEntries: true },
    })
    if (!analysis) { res.status(404).json({ error: 'Nie znaleziono' }); return }
    res.json(analysis)
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Blad serwera' })
  }
}

export const getAuditLog = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const analysis = await prisma.riskAnalysis.findFirst({
      where: { id, userId: req.user!.userId },
    })
    if (!analysis) { res.status(404).json({ error: 'Nie znaleziono' }); return }

    const logs = await prisma.auditLog.findMany({
      where: { analysisId: id },
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: { user: { select: { name: true, email: true } } },
    })
    res.json(logs)
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Blad serwera' })
  }
}

export const logDownload = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const { format } = req.body
    const analysis = await prisma.riskAnalysis.findFirst({
      where: { id, userId: req.user!.userId },
    })
    if (!analysis) { res.status(404).json({ error: 'Nie znaleziono' }); return }

    await writeAudit(req.user!.userId, id, `DOWNLOADED_${format || 'PDF'}`, {
      machineName: analysis.machineName, format: format || 'PDF',
      downloadedAt: new Date().toISOString(),
    }, req)
    res.json({ success: true })
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Blad serwera' })
  }
}