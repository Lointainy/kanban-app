const createBoard = {
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

// const updateBoardById = {
// 	summary: 'Update board by id',
// 	description: 'please enter token for auth user, after that you can delete board data',
// 	tags: ['Board'],
// 	security: [{ bearerAuth: [] }],
// 	parameters: [
// 		{
// 			name: 'id',
// 			in: 'path',
// 			description: 'board id to update',
// 			required: true,
// 			schema: {
// 				type: 'string'
// 			}
// 		}
// 	],
// 	requestBody: {
// 		description: 'Created board object',
// 		content: {
// 			' application/json': {
// 				schema: {
// 					$ref: '#/components/schemas/Board'
// 				}
// 			}
// 		}
// 	},
// 	responses: {
// 		200: {
// 			description: 'Updated board by id',
// 			content: {
// 				'application/json': {
// 					example: 'Board was Updated'
// 				}
// 			}
// 		},
// 		400: {
// 			description: 'No such Boards'
// 		},
// 		500: {
// 			description: 'Error message'
// 		}
// 	}
// }

const columnRouteDoc = {
	'/columns': {
		post: createBoard
	}
}

module.exports = columnRouteDoc

