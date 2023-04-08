const express = require('express')

const cors = require('cors')

const dotenv = require('dotenv').config()

const connectDB = require('./config/connectDB')

const userRoutes = require('./routes/user')
const boardRoutes = require('./routes/board')

const swaggerUI = require('swagger-ui-express')
const { swaggerDoc, optionDoc } = require('./doc/documentation')

/* Initial App */
const app = express()
const PORT = process.env.PORT || 3500

// Home page
app.get('/', (req, res) => {
	res.redirect('/docs')
})

/* Swagger UI */
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc, optionDoc))

/* Cors */

app.use(
	cors({
		methods: '*'
		// origin: ['http://localhost:5173', 'http://192.168.0.100:5173']
	})
)

/* Middleware */
app.use((req, res, next) => {
	res.header('Content-Type', 'application/json')
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
	next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/user', userRoutes)
app.use('/api/boards', boardRoutes)

const startServer = async () => {
	try {
		await connectDB()
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`)
		})
	} catch (error) {
		console.log(error)
	}
}

startServer()

