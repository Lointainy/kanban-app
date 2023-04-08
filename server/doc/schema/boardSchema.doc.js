const singleBoardSchema = {
	type: 'object',
	properties: {
		name: {
			type: 'string',
			example: 'Default board'
		},
		columns: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					name: {
						type: 'string',
						example: 'Todo'
					},
					tasks: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								title: {
									type: 'string',
									example: 'Build UI for onboarding flow'
								},
								description: {
									type: 'string'
								},
								status: {
									type: 'string',
									status: 'Todo'
								},
								subtasks: {
									type: 'array',
									items: {
										type: 'object',
										properties: {
											title: {
												type: 'string',
												example: 'Sign up page'
											},
											isCompleted: {
												type: 'boolean',
												example: false
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
}

const boardsByUserSchema = {
	type: 'object',
	properties: {
		boards: {
			type: 'array',
			items: singleBoardSchema
		}
	}
}

module.exports = { boardsByUserSchema, singleBoardSchema }

