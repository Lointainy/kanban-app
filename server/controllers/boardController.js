const { Board } = require('../models/boardModel')

const getBoards = async (req, res) => {
	let user_id = req.user._id

	try {
		let userData = await Board.findOne({ user_id })
		let boards = []

		if (userData === null) {
			await Board.create({ boards: [{ name: 'First board' }], user_id })
		}

		if (userData) {
			userData = await Board.findOne({ user_id })
			boards = userData.boards
			res.status(200).json(boards)
		} else if (!boards.length) {
			res.status(404).json({ msg: `No Boards` })
		}
	} catch (error) {
		res.status(500).json({ msg: error.message })
		console.log(error)
	}
}

const getBoardById = async (req, res) => {
	let user_id = req.user._id
	let board_id = req.params.id

	try {
		let userData = await Board.findOne({ user_id })
		let board = userData.boards.find((b) => b._id == board_id)

		if (board) {
			res.status(200).json(board)
		} else {
			res.status(404).json({ msg: `No Board with id ${board_id}` })
		}
	} catch (error) {
		res.status(500).json({ msg: error.message })
		console.log(error)
	}
}

const createBoard = async (req, res) => {
	let user_id = req.user._id
	let newBoard = req.body

	try {
		let board = await Board.findOne({ user_id })

		if (board) {
			board.boards.push(newBoard)
			await board.save()
			res.status(200).json(`User create new board`)
		} else {
			board = await Board.create({ boards: newBoard, user_id })
			res.status(200).json(`User create your first board`)
		}
	} catch (error) {
		res.status(500).json({ msg: error.message })
		console.log(error)
	}
}

const removeAllBoards = async (req, res) => {
	let query = req.query.del
	let user_id = req.user._id

	try {
		let { boards } = await Board.findOne({ user_id })
		if (query && boards.length) {
			let userData = await Board.findOneAndUpdate({ user_id }, { $set: { boards: [] } })
			res.status(200).json({ msg: `All boards are removed ${query}` })
		} else {
			res.status(400).json({ msg: `No boards` })
		}
	} catch (error) {
		res.status(500).json({ msg: error.message })
	}
}

const deleteBoard = async (req, res) => {
	let user_id = req.user._id
	let board_id = req.params.id

	try {
		let userData = await Board.findOne({ user_id })

		let boardToRemove = userData.boards.findIndex((i) => i._id == board_id)

		if (boardToRemove >= 0) {
			userData.boards.pull({ _id: board_id })
			await userData.save()
			res.status(200).json({ msg: `Board was deleted` })
		} else {
			res.status(400).json({ msg: `No such Boards with ${board_id}` })
		}
	} catch (error) {
		res.status(500).json({ msg: error.message })
		console.log(error)
	}
}

const updateBoard = async (req, res) => {
	let user_id = req.user._id
	let board_id = req.params.id
	let updatedBoard = req.body

	try {
		let userData = await Board.findOne({ user_id })

		let boardToUpdate = userData.boards.findIndex((i) => i._id == board_id)

		if (boardToUpdate >= 0) {
			userData = await Board.findOneAndUpdate(
				{ user_id, 'boards._id': board_id },
				{ $set: { 'boards.$': { ...updatedBoard, _id: board_id } } }
			)
			res.status(200).json({ msg: `Board was Updated` })
		} else {
			res.status(400).json({ msg: `No such Boards` })
		}
	} catch (error) {
		res.status(500).json({ msg: error.message })
		console.log(error)
	}
}

module.exports = {
	getBoards,
	getBoardById,
	createBoard,
	deleteBoard,
	updateBoard,
	removeAllBoards
}

