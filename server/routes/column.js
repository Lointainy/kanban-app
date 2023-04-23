const express = require('express')

const router = express.Router()
const requireAuth = require('../middleware/requireAuth')

const { createColumn } = require('../controllers/columnController')

router.use(requireAuth)

router.post('/', createColumn)

module.exports = router

