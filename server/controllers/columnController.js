const { Board } = require('../models/boardModel')

const createColumn = async (req, res) => {
	let user_id = req.user._id
	let { boardId } = req.query
	let newColumn = req.body

	try {
		let userData = await Board.findOne({ user_id })
		let board = userData.boards.find((b) => b._id == boardId)

		if (board) {
			board.columns.push({ ...newColumn, tasks: [] })
			await userData.save()
			res.status(200).json(`New Column in board are created`)
		} else {
			res.status(404).json({ msg: `No Board with id:${boardId}` })
		}
	} catch (error) {
		res.status(500).json({ msg: error.message })
		console.log(error)
	}
}

module.exports = {
	createColumn
}

