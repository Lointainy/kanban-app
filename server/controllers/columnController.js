const { Board, Column } = require('../models/boardModel')

const createColumn = async (req, res) => {
	let user_id = req.user._id
	let { boardId } = req.query
	let newColumn = req.body

	try {
		let userData = await Board.findOne({ user_id })

		let board = userData.boards.find((b) => b._id == boardId)
		if (!board) res.status(404).json({ msg: `No Board with id:${boardId}` })

		const filter = {
			user_id,
			'boards._id': boardId
		}

		const column = {
			...newColumn,
			tasks: []
		}

		const update = {
			$push: { 'boards.$[board].columns': column }
		}

		const options = {
			arrayFilters: [{ 'board._id': boardId }]
		}

		await Board.updateOne(filter, update, options)

		res.status(200).json(`New Column in board are created`)
	} catch (error) {
		res.status(500).json({ msg: error.message })
		console.log(error)
	}
}

const updateColumn = async (req, res, next) => {
	let user_id = req.user._id
	let { boardId, columnId } = req.query
	let updatedColumn = req.body

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

		const update = {
			$set: {
				'boards.$[board].columns.$[column]': { _id: column._id, ...updatedColumn }
			}
		}

		const options = {
			arrayFilters: [{ 'board._id': boardId }, { 'column._id': columnId }]
		}

		await Board.updateOne(filter, update, options)

		res.status(200).json('Column was Updated')
	} catch (error) {
		res.status(500).json({ msg: error.message })
	}
}

const deleteColumn = async (req, res) => {
	let user_id = req.user._id
	let { boardId, columnId } = req.query

	try {
		let userData = await Board.findOne({ user_id })

		let board = userData.boards.find((b) => b._id == boardId)
		!board && res.status(404).json({ msg: `No Board with id:${boardId}` })

		let column = board.columns.find((c) => c._id == columnId)
		!column && res.status(404).json({ msg: `No Column with id:${columnId}` })

		const filter = {
			user_id,
			'boards._id': boardId
		}

		const update = {
			$pull: { 'boards.$[board].columns': { _id: columnId } }
		}

		const options = {
			arrayFilters: [{ 'board._id': boardId }]
		}

		await Board.updateOne(filter, update, options)

		res.status(200).json(`Column in board are deleted`)
	} catch (error) {
		res.status(500).json({ msg: error.message })
		console.log(error)
	}
}

module.exports = {
	createColumn,
	updateColumn,
	deleteColumn
}

