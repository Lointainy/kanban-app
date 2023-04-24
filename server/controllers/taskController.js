const { Board } = require('../models/boardModel')

const createTask = async (req, res) => {
	let user_id = req.user._id
	let { boardId, columnId } = req.query
	let newTask = req.body

	try {
		let userData = await Board.findOne({ user_id })
		let board = userData.boards.find((b) => b._id == boardId)

		if (board) {
			let column = board.columns.find((c) => c._id == columnId)
			if (column) {
				column.tasks.push({ ...newTask, subtasks: [] })
				await userData.save()
				res.status(200).json(`New Tasks in column are created`)
			} else {
				res.status(404).json({ msg: `No Column with id:${columnId}` })
			}
		} else {
			res.status(404).json({ msg: `No Board with id:${boardId}` })
		}
	} catch (error) {
		res.status(500).json({ msg: error.message })
		console.log(error)
	}
}

module.exports = {
	createTask
}
