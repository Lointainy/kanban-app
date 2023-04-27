const express = require('express')

const router = express.Router()
const requireAuth = require('../middleware/requireAuth')

const { createTask, updateTask, deleteTask } = require('../controllers/taskController')

router.use(requireAuth)
router.post('/', createTask)
router.patch('/', updateTask)
router.delete('/', deleteTask)

module.exports = router

