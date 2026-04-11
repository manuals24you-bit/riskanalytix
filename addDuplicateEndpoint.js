const fs = require('fs');

// 1. Add route
let routes = fs.readFileSync('C:/Projects/riskpro/backend/src/routes/analysis.routes.ts', 'utf8');
routes = routes.replace(
  "import { getAnalyses, getAnalysis, createAnalysis, updateAnalysis, deleteAnalysis } from '../controllers/analysis.controller'",
  "import { getAnalyses, getAnalysis, createAnalysis, updateAnalysis, deleteAnalysis, duplicateAnalysis } from '../controllers/analysis.controller'"
);
routes = routes.replace(
  "router.delete('/:id', deleteAnalysis)",
  "router.post('/:id/duplicate', requireSubscription, duplicateAnalysis)\nrouter.delete('/:id', deleteAnalysis)"
);
fs.writeFileSync('C:/Projects/riskpro/backend/src/routes/analysis.routes.ts', routes, 'utf8');
console.log('route added:', routes.includes('duplicateAnalysis'));

// 2. Add controller function
let ctrl = fs.readFileSync('C:/Projects/riskpro/backend/src/controllers/analysis.controller.ts', 'utf8');

const duplicateFn = `
export const duplicateAnalysis = async (req: Request, res: Response) => {
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
}
`;

// Add before last export or at end
const lastExport = ctrl.lastIndexOf('\nexport const delete');
ctrl = ctrl.slice(0, lastExport) + duplicateFn + ctrl.slice(lastExport);
fs.writeFileSync('C:/Projects/riskpro/backend/src/controllers/analysis.controller.ts', ctrl, 'utf8');
console.log('controller added:', ctrl.includes('duplicateAnalysis'));