const createColumn = {
	summary: 'Create column in board',
	description: 'please enter token for auth user, after that you can create column data',
	tags: ['Column'],
	parameters: [
		{
			name: 'boardId',
			in: 'query',
			required: true
		}
	],
	security: [{ bearerAuth: [] }],
	requestBody: {
		description: 'Created column object',
		content: {
			' application/json': {
				schema: {
					type: 'object',
					properties: {
						name: {
							type: 'string',
							example: 'New Column'
						}
					}
				}
			}
		}
	},
	responses: {
		200: {
			description: 'User create column in board by id',
			content: {
				'application/json': {
					example: 'User create new column'
				}
			}
		},
		404: {
			content: {
				'application/json': {
					example: 'No Board with id: boardId'
				}
			}
		},
		500: {
			description: 'Error message'
		}
	}
}

const columnRouteDoc = {
	'/columns': {
		post: createColumn
	}
}

module.exports = columnRouteDoc

