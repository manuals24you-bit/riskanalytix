const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/backend/src/controllers/analysis.controller.ts', 'utf8');

// Find and replace the duplicateAnalysis function
const oldFn = `export const duplicateAnalysis = async (req: any, res: any) => {
  try {
    const userId = (req as any).user.id
    const { id } = req.params

    // Get original analysis
    const original = await (req as any).prisma.riskAnalysis.findFirst({
      where: { id, userId },
      include: { riskEntries: true },
    })
    if (!original) return res.status(404).json({ error: 'Not found' })

    // Create duplicate
    const { id: _id, createdAt, updatedAt, riskEntries, ...analysisData } = original
    const duplicate = await (req as any).prisma.riskAnalysis.create({
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

    res.json(duplicate)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Duplicate failed' })
  }
}`;

const newFn = `export const duplicateAnalysis = async (req: any, res: any) => {
  try {
    const userId = req.user!.userId
    const { id } = req.params

    const original = await prisma.riskAnalysis.findFirst({
      where: { id, userId },
      include: { riskEntries: true },
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

    res.json(duplicate)
  } catch (err) {
    console.error('Duplicate error:', err)
    res.status(500).json({ error: 'Duplicate failed' })
  }
}`;

if (c.includes(oldFn)) {
  c = c.replace(oldFn, newFn);
  console.log('fixed');
} else {
  console.log('not found, searching...');
  const idx = c.indexOf('duplicateAnalysis');
  console.log('at:', idx, JSON.stringify(c.slice(idx, idx + 200)));
}

fs.writeFileSync('C:/Projects/riskpro/backend/src/controllers/analysis.controller.ts', c, 'utf8');