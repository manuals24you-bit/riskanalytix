import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import { getAnalyses, getAnalysis, createAnalysis, updateAnalysis, deleteAnalysis, duplicateAnalysis, getAuditLog, logDownload } from '../controllers/analysis.controller'

const router = Router()

router.use(authenticate)
router.get('/', getAnalyses)
router.get('/:id', getAnalysis)
router.post('/', createAnalysis)
router.put('/:id', updateAnalysis)
router.post('/:id/duplicate', duplicateAnalysis)
router.delete('/:id', deleteAnalysis)
router.get('/:id/audit', authenticate, getAuditLog)
router.post('/:id/download-log', logDownload)

export default router