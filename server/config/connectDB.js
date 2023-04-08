const mongoose = require('mongoose')

const connectDB = async () => {
	mongoose.set('strictQuery', false)
	try {
		const connect = await mongoose.connect(process.env.MONGO_URL)
		console.log('Mongo database connected')
	} catch (error) {
		console.log(error)
		process.exit(1)
	}
}

module.exports = connectDB

