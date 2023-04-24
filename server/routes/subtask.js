const express = require('express')

const router = express.Router()
const requireAuth = require('../middleware/requireAuth')

const { createSubtask } = require('../controllers/subtaskController')

router.use(requireAuth)

router.post('/', createSubtask)

module.exports = router

