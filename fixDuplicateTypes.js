const fs = require('fs');
let ctrl = fs.readFileSync('C:/Projects/riskpro/backend/src/controllers/analysis.controller.ts', 'utf8');

// Replace the duplicateAnalysis function with correct types
const oldFn = `export const duplicateAnalysis = async (req: Request, res: Response) => {`;
const newFn = `export const duplicateAnalysis = async (req: any, res: any) => {`;

ctrl = ctrl.replace(oldFn, newFn);
fs.writeFileSync('C:/Projects/riskpro/backend/src/controllers/analysis.controller.ts', ctrl, 'utf8');
console.log('fixed:', ctrl.includes('duplicateAnalysis = async (req: any'));