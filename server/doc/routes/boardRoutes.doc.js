const getBoards = {
	summary: 'Returns the list of all the  boards',
	description: 'please enter token for auth user, after that you can take boards data',
	tags: ['Board'],
	security: [{ bearerAuth: [] }],
	responses: {
		200: {
			description: 'The list of boards',
			content: {
				'application/json': {
					schema: {
						type: 'array',
						items: {
							$ref: '#/components/schemas/Board'
						}
					},
					example: '[{board data}, {board data}]'
				}
			}
		},
		404: {
			description: 'No boards'
		},
		500: {
			description: 'Error message'
		}
	}
}

const getBoardById = {
	summary: 'Returns the single board',
	description: 'please enter token for auth user, after that you can take boards data',
	tags: ['Board'],
	security: [{ bearerAuth: [] }],
	parameters: [
		{
			name: 'id',
			in: 'path',
			description: 'board id',
			required: true,
			schema: {
				type: 'string'
			}
		}
	],
	responses: {
		200: {
			description: 'The board',
			content: {
				'application/json': {
					schema: {
						$ref: '#/components/schemas/Board'
					},
					example: '{board data}'
				}
			}
		},
		404: {
			description: 'No boards'
		},
		500: {
			description: 'Error message'
		}
	}
}

const createBoard = {
	summary: 'Create board',
	description: 'please enter token for auth user, after that you can create board data',
	tags: ['Board'],
	security: [{ bearerAuth: [] }],
	requestBody: {
		description: 'Created board object',
		content: {
			' application/json': {
				schema: {
					$ref: '#/components/schemas/Board'
				}
			}
		}
	},
	responses: {
		200: {
			description: 'User create board',
			content: {
				'application/json': {
					example: 'User create new board or User create your first board'
				}
			}
		},
		500: {
			description: 'Error message'
		}
	}
}

const updateBoardById = {
	summary: 'Update board by id',
	description: 'please enter token for auth user, after that you can delete board data',
	tags: ['Board'],
	security: [{ bearerAuth: [] }],
	parameters: [
		{
			name: 'id',
			in: 'path',
			description: 'board id to update',
			required: true,
			schema: {
				type: 'string'
			}
		}
	],
	requestBody: {
		description: 'Created board object',
		content: {
			' application/json': {
				schema: {
					$ref: '#/components/schemas/Board'
				}
			}
		}
	},
	responses: {
		200: {
			description: 'Updated board by id',
			content: {
				'application/json': {
					example: 'Board was Updated'
				}
			}
		},
		400: {
			description: 'No such Boards'
		},
		500: {
			description: 'Error message'
		}
	}
}

const deleteBoardById = {
	summary: 'Delete board by id',
	description: 'please enter token for auth user, after that you can delete board data',
	tags: ['Board'],
	security: [{ bearerAuth: [] }],
	parameters: [
		{
			name: 'id',
			in: 'path',
			description: 'board id to delete',
			required: true,
			schema: {
				type: 'string'
			}
		}
	],
	responses: {
		200: {
			description: 'Deleted board by id',
			content: {
				'application/json': {
					example: 'Board was deleted'
				}
			}
		},
		400: {
			description: 'No such Boards with id'
		},
		500: {
			description: 'Error message'
		}
	}
}

const removeAllBoards = {
	summary: 'Remove all boards',
	description: 'please enter token for auth user, after that you can take boards data',
	tags: ['Board'],
	security: [{ bearerAuth: [] }],
	parameters: [
		{
			name: 'del',
			in: 'query',
			required: true,
			schema: {
				type: 'boolean',
				example: true
			}
		}
	],
	responses: {
		200: {
			description: 'Removed all boards',
			content: {
				'application/json': {
					schema: {
						type: 'array',
						items: {
							$ref: '#/components/schemas/Boards'
						}
					},
					example: 'All boards are removed'
				}
			}
		},
		400: {
			description: 'No boards'
		},
		500: {
			description: 'Error message'
		}
	}
}

const boardRouteDoc = {
	'/boards': {
		get: getBoards,
		post: createBoard,
		delete: removeAllBoards
	},
	'/boards/{id}': {
		get: getBoardById,
		delete: deleteBoardById,
		patch: updateBoardById
	}
}

module.exports = boardRouteDoc

