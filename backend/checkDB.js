const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
p.riskEntry.findFirst({
  orderBy: { createdAt: 'desc' }
}).then(e => {
  console.log('Latest entry:');
  console.log('justificationS:', e?.justificationS);
  console.log('justificationP:', e?.justificationP);
  console.log('reductionLevel:', e?.reductionLevel);
  console.log('scenario:', e?.scenario);
}).finally(() => p.$disconnect());