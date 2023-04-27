const createTask = {
	summary: 'Create task in column',
	description: 'please enter token for auth user, after that you can create task data',
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

const updateTask = {
	summary: 'Update task in board',
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
		},
		{
			name: 'taskId',
			in: 'query',
			required: true
		}
	],
	security: [{ bearerAuth: [] }],
	requestBody: {
		description: 'Updated task object',
		content: {
			' application/json': {
				schema: {
					$ref: '#/components/schemas/Task'
				}
			}
		}
	},
	responses: {
		200: {
			description: 'User update task in column by id',
			content: {
				'application/json': {
					example: 'User updated task'
				}
			}
		},
		404: {
			content: {
				'application/json': {
					example: 'No Board with id: boardId or No Column with id: columnId or No Task with id: taskId'
				}
			}
		},
		500: {
			description: 'Error message'
		}
	}
}

const deleteTask = {
	summary: 'Update task in board',
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
		},
		{
			name: 'taskId',
			in: 'query',
			required: true
		}
	],
	security: [{ bearerAuth: [] }],
	responses: {
		200: {
			description: 'User delete task in board by id',
			content: {
				'application/json': {
					example: 'User delete task'
				}
			}
		},
		404: {
			content: {
				'application/json': {
					example: 'No Board with id: boardId or No Column with id: columnId or No Task with id: taskId'
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
		post: createTask,
		patch: updateTask,
		delete: deleteTask
	}
}

module.exports = taskRouteDoc

