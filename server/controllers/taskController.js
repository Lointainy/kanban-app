const { Board } = require('../models/boardModel')

const createTask = async (req, res) => {
	let user_id = req.user._id
	let { boardId, columnId } = req.query
	let newTask = req.body

	try {
		let userData = await Board.findOne({ user_id })

		let board = userData.boards.find((b) => b._id == boardId)
		if (!board) res.status(404).json({ msg: `No Board with id:${boardId}` })

		let column = board.columns.find((c) => c._id == columnId)
		if (!column) res.status(404).json({ msg: `No Column with id:${columnId}` })

		const filter = {
			user_id,
			'boards._id': boardId,
			'boards.columns._id': columnId
		}

		const task = {
			...newTask,
			subtasks: []
		}

		const update = {
			$push: {
				'boards.$[board].columns.$[column].tasks': task
			}
		}

		const options = {
			arrayFilters: [{ 'board._id': boardId }, { 'column._id': columnId }]
		}

		await Board.updateOne(filter, update, options)

		res.status(200).json(`New task in column are created`)
	} catch (error) {
		res.status(500).json({ msg: error.message })
		console.log(error)
	}
}

const updateTask = async (req, res) => {
	let user_id = req.user._id
	let { boardId, columnId, taskId } = req.query
	let updatedTask = req.body

	try {
		let userData = await Board.findOne({ user_id })

		let board = userData.boards.find((b) => b._id == boardId)
		if (!board) res.status(404).json({ msg: `No Board with id:${boardId}` })

		let column = board.columns.find((c) => c._id == columnId)
		if (!column) res.status(404).json({ msg: `No Column with id:${columnId}` })

		let task = column.tasks.find((t) => t._id == taskId)
		if (!task) res.status(404).json({ msg: `No Task with id:${taskId}` })

		const filter = {
			user_id,
			'boards._id': boardId,
			'boards.columns._id': columnId,
			'boards.columns.tasks._id': taskId
		}

		const update = {
			$set: {
				'boards.$[board].columns.$[column].tasks.$[task]': { _id: taskId, ...updatedTask }
			}
		}

		const options = {
			arrayFilters: [{ 'board._id': boardId }, { 'column._id': columnId }, { 'task._id': taskId }]
		}

		await Board.updateOne(filter, update, options)

		res.status(200).json('Task was Updated')
	} catch (error) {
		res.status(500).json({ msg: error.message })
	}
}

const deleteTask = async (req, res) => {
	let user_id = req.user._id
	let { boardId, columnId, taskId } = req.query

	try {
		let userData = await Board.findOne({ user_id })

		let board = userData.boards.find((b) => b._id == boardId)
		if (!board) res.status(404).json({ msg: `No Board with id:${boardId}` })

		let column = board.columns.find((c) => c._id == columnId)
		if (!column) res.status(404).json({ msg: `No Column with id:${columnId}` })

		let task = column.tasks.find((t) => t._id == taskId)
		if (!task) res.status(404).json({ msg: `No Task with id:${taskId}` })

		const filter = {
			user_id,
			'boards._id': boardId,
			'boards.columns._id': columnId
		}

		const update = {
			$pull: { 'boards.$[board].columns.$[column].tasks': { _id: taskId } }
		}

		const options = {
			arrayFilters: [{ 'board._id': boardId }, { 'column._id': columnId }]
		}

		await Board.updateOne(filter, update, options)

		res.status(200).json(`Task in board are deleted`)
	} catch (error) {
		res.status(500).json({ msg: error.message })
		console.log(error)
	}
}

module.exports = {
	createTask,
	updateTask,
	deleteTask
}

