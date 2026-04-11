const fs = require('fs');
fs.writeFileSync('C:/Projects/riskpro/backend/prisma.config.ts', 
`import path from 'path'
import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
})
`);

fs.writeFileSync('C:/Projects/riskpro/backend/src/utils/prisma.ts',
`// @ts-nocheck
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
`);

console.log('done');