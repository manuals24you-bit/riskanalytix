// backend/src/routes/auth.routes.ts
import { Router } from 'express'
import { register, login, refresh, me, updateProfile } from '../controllers/auth.controller'
import { authenticate } from '../middleware/auth'

const router = Router()

router.post('/register', register)
router.post('/login',    login)
router.post('/refresh',  refresh)
router.get ('/me',       authenticate, me)
router.put ('/profile',  authenticate, updateProfile)

export default router