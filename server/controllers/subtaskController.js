const { Board } = require('../models/boardModel')

const createSubtask = async (req, res) => {
	let user_id = req.user._id
	let { boardId, columnId, taskId } = req.query
	let newSubtask = req.body

	try {
		let userData = await Board.findOne({ user_id })

		let board = userData.boards.find((b) => b._id == boardId)
		!board && res.status(404).json({ msg: `No Board with id:${boardId}` })

		let column = board.columns.find((c) => c._id == columnId)
		!column && res.status(404).json({ msg: `No Column with id:${columnId}` })

		let task = column.tasks.find((t) => t._id == taskId)
		!task && res.status(404).json({ msg: `No task with id:${taskId}` })

		if (task) {
			task.subtasks.push({ ...newSubtask })
			await userData.save()
			res.status(200).json(`New Subtask in task are created`)
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ msg: 'Internal Server Error' })
	}
}

module.exports = {
	createSubtask
}

