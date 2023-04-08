const userSchema = {
	type: 'object',
	properties: {
		email: {
			type: 'string',
			example: '1sd@example.com'
		},
		password: {
			type: 'string',
			example: '123/adF&'
		}
	}
}

module.exports = userSchema

