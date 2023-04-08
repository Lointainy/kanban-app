const loginUser = {
	summary: 'Logs user into the system',
	tags: ['User'],
	requestBody: {
		description: 'User login object',
		content: {
			' application/json': {
				schema: {
					$ref: '#/components/schemas/User'
				}
			}
		}
	},
	responses: {
		200: {
			description: 'Check user, return email and token',
			content: {
				'application/json': {
					schema: {
						type: 'object',
						properties: {
							email: {
								type: 'string'
							},
							token: {
								type: 'string'
							}
						}
					},
					example: '{ email, token }'
				}
			}
		},
		400: {
			description: 'Error message'
		}
	}
}

const signupUser = {
	summary: 'Create user',
	tags: ['User'],
	requestBody: {
		description: 'Created user object',
		content: {
			' application/json': {
				schema: {
					$ref: '#/components/schemas/User'
				}
			}
		}
	},
	responses: {
		200: {
			description: 'Returns email and user token',
			content: {
				'application/json': {
					schema: {
						type: 'object',
						properties: {
							email: {
								type: 'string'
							},
							token: {
								type: 'string'
							}
						}
					},
					example: '{ email, token }'
				}
			}
		},
		400: {
			description: 'Error message'
		}
	}
}

const userRouteDoc = {
	'/user/login': {
		post: loginUser
	},
	'/user/signup': {
		post: signupUser
	}
}

module.exports = userRouteDoc

