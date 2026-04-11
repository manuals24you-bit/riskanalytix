import { Router } from 'express'
import { authenticate, requireAdmin } from '../middleware/auth'
import {
  getStats, getUsers, updateUser, deleteUser,
  getSettings, updateSettings, getAllAnalyses,
  grantPlan, revokePlan,
} from '../controllers/admin.controller'

const router = Router()

router.use(authenticate, requireAdmin)

router.get('/stats', getStats)
router.get('/users', getUsers)
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)
router.get('/settings', getSettings)
router.put('/settings', updateSettings)
router.get('/analyses', getAllAnalyses)
router.post('/users/:id/plan', grantPlan)
router.delete('/users/:id/plan', revokePlan)

export default router