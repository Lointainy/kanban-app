const createSubtask = {
	summary: 'Create subtask in task',
	description: 'please enter token for auth user, after that you can create subtask data',
	tags: ['Subtask'],
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
		description: 'Created subtask object',
		content: {
			' application/json': {
				schema: {
					type: 'object',
					properties: {
						title: {
							type: 'string',
							example: 'New Subtask'
						}
					}
				}
			}
		}
	},
	responses: {
		200: {
			description: 'User create subtask in task by id',
			content: {
				'application/json': {
					example: 'User create new subtask'
				}
			}
		},
		404: {
			content: {
				'application/json': {
					example: 'No Board with id: boardId or No column with id: columnId or No task with id: taskId'
				}
			}
		},
		500: {
			description: 'Error message'
		}
	}
}

const subtaskRouteDoc = {
	'/subtasks': {
		post: createSubtask
	}
}

module.exports = subtaskRouteDoc

