const express = require('express')

const router = express.Router()
const requireAuth = require('../middleware/requireAuth')

const { createTask } = require('../controllers/taskController')

router.use(requireAuth)

router.post('/', createTask)

module.exports = router

