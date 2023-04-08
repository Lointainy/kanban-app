const userRouteDoc = require('./routes/userRoutes.doc')
const boardRouteDoc = require('./routes/boardRoutes.doc')

const userSchema = require('./schema/userSchema.doc')
const { boardsByUserSchema, singleBoardSchema } = require('./schema/boardSchema.doc')

const CSS_URL = 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css'

const swaggerDoc = {
	openapi: '3.0.0',
	info: {
		title: 'Kanban app',
		version: '1.0.0',
		description: `#### Api for project on [frontend mentor](https://www.frontendmentor.io/challenges/kanban-task-management-web-app-wgQLt-HlbB) \n#### figma [template](https://www.figma.com/file/CMS6X4ZHwnFjEqpybX4fVQ/kanban-task-management-web-app?node-id=0%3A5656&t=FSuJsl7ugxWyNR5I-1) \n#### author [contact](https://linktr.ee/lointainy) \n#### My react [project](https://kanban-app-react-lointainy.netlify.app/)`
	},
	servers: [
		{
			url: 'http://localhost:3500/api'
		},
		{
			url: 'https://kanban-server.vercel.app/api'
		}
	],
	tags: [
		{
			name: 'User',
			description: 'user routes'
		},
		{
			name: 'Board',
			description: 'Operations about board'
		}
	],
	paths: {
		...userRouteDoc,
		...boardRouteDoc
	},
	components: {
		schemas: {
			Boards: boardsByUserSchema,
			Board: singleBoardSchema,
			User: userSchema
		},
		securitySchemes: {
			bearerAuth: {
				type: 'http',
				scheme: 'bearer',
				description: 'Enter token value',
				bearerFormat: 'JWT',
				example:
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDMxYjJiYjAzYWVlZWY3NjcxOGE0ZDEiLCJpYXQiOjE2ODA5ODE0MzksImV4cCI6MTY4MTI0MDYzOX0.x79DREi5tv_YHHEJE2Vwxax3EZwjkZywS20MIeK0JWk'
			}
		}
	},
	security: [
		{
			bearerAuth: []
		}
	]
}

const optionDoc = {
	customCss: '.swagger-ui .topbar { display: none}',
	customSiteTitle: 'Kanban API',
	customSiteFavicon: '',
	customCssUrl: CSS_URL
}

module.exports = { swaggerDoc, optionDoc }

