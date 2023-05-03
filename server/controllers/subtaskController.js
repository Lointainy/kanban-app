const { Board } = require('../models/boardModel')

const createSubtask = async (req, res) => {
	let user_id = req.user._id
	let { boardId, columnId, taskId } = req.query
	let newSubtask = req.body

	try {
		let userData = await Board.findOne({ user_id })

		let board = userData.boards.find((b) => b._id == boardId)
		if (!board) res.status(404).json({ msg: `No Board with id:${boardId}` })

		let column = board.columns.find((c) => c._id == columnId)
		if (!column) res.status(404).json({ msg: `No Column with id:${columnId}` })

		let task = column.tasks.find((c) => c._id == taskId)
		if (!task) res.status(404).json({ msg: `No Task with id:${taskId}` })

		const filter = {
			user_id,
			'boards._id': boardId,
			'boards.columns._id': columnId,
			'boards.columns.tasks._id': taskId
		}

		const subtask = {
			...newSubtask
		}

		const update = {
			$push: {
				'boards.$[board].columns.$[column].tasks.$[task].subtasks': subtask
			}
		}

		const options = {
			arrayFilters: [{ 'board._id': boardId }, { 'column._id': columnId }, { 'task._id': taskId }]
		}

		await Board.updateOne(filter, update, options)

		res.status(200).json(`New subtask in task are created`)
	} catch (error) {
		res.status(500).json({ msg: error.message })
		console.log(error)
	}
}

module.exports = {
	createSubtask
}

