const express = require('express')

const router = express.Router()
const requireAuth = require('../middleware/requireAuth')

const { getBoards, createBoard, deleteBoard, updateBoard, removeAllBoards, getBoardById } = require('../controllers/boardController')

router.use(requireAuth)

/* Boards */
router.get('/', getBoards)
router.get('/:id', getBoardById)
router.post('/', createBoard)
router.delete('/:id', deleteBoard)
router.delete('/', removeAllBoards)
router.patch('/:id', updateBoard)

module.exports = router

