const mongoose = require('mongoose')

const Schema = mongoose.Schema

const boardSchema = new Schema({
	boards: [
		{
			name: {
				type: String
			},
			columns: [
				{
					name: {
						type: String
					},
					tasks: [
						{
							title: {
								type: String
							},
							description: {
								type: String
							},
							status: {
								type: String
							},
							subtasks: [
								{
									title: {
										type: String
									},
									isCompleted: {
										type: Boolean
									}
								}
							]
						}
					]
				}
			]
		}
	],
	user_id: {
		type: String,
		required: true
	}
})

module.exports = mongoose.model('Board', boardSchema)

