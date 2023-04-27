const mongoose = require('mongoose')

const Schema = mongoose.Schema

const subtaskSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	isCompleted: {
		type: Boolean
	}
})

const taskSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	status: {
		type: String
	},
	subtasks: [subtaskSchema]
})

const columnSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	tasks: [taskSchema]
})

const boardSchema = new Schema({
	boards: [
		{
			name: {
				type: String,
				required: true
			},
			columns: [columnSchema]
		}
	],
	user_id: {
		type: String,
		required: true
	}
})

const Board = mongoose.model('Board', boardSchema)
const Column = mongoose.model('Column', columnSchema)
const Task = mongoose.model('Task', taskSchema)
const Subtask = mongoose.model('Subtask', subtaskSchema)

module.exports = { Board, Column, Task, Subtask }

