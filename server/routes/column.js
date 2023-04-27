const express = require('express')

const router = express.Router()
const requireAuth = require('../middleware/requireAuth')

const { createColumn, updateColumn, deleteColumn } = require('../controllers/columnController')

router.use(requireAuth)

router.post('/', createColumn)
router.patch('/', updateColumn)
router.delete('/', deleteColumn)

module.exports = router

