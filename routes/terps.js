import express from 'express'

import { getTerps } from '../controllers/terps.js'

const router = express.Router()

router.get('/', getTerps)

export default router