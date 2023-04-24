const createTask = {
	summary: 'Create task in column',
	description: 'please enter token for auth user, after that you can create column data',
	tags: ['Task'],
	parameters: [
		{
			name: 'boardId',
			in: 'query',
			required: true
		},
		{
			name: 'columnId',
			in: 'query',
			required: true
		}
	],
	security: [{ bearerAuth: [] }],
	requestBody: {
		description: 'Created task object',
		content: {
			' application/json': {
				schema: {
					type: 'object',
					properties: {
						title: {
							type: 'string',
							example: 'New Task'
						}
					}
				}
			}
		}
	},
	responses: {
		200: {
			description: 'User create task in column by id',
			content: {
				'application/json': {
					example: 'User create new task'
				}
			}
		},
		404: {
			content: {
				'application/json': {
					example: 'No Board with id: boardId or No column with id: columnId'
				}
			}
		},
		500: {
			description: 'Error message'
		}
	}
}

const taskRouteDoc = {
	'/tasks': {
		post: createTask
	}
}

module.exports = taskRouteDoc

