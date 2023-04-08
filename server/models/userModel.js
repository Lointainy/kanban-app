const mongoose = require('mongoose')

const bcrypt = require('bcrypt')

const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
	email: {
		type: String,
		unique: true
	},
	password: {
		type: String
	}
})

// static signup method
userSchema.statics.signup = async function (email, password) {
	// Check if email to exist
	const exists = await this.findOne({ email })

	if (exists) {
		throw Error('Email already in use')
	}

	// Validation
	if (!email || !password) {
		throw Error('All fields must filled')
	}

	if (!validator.isEmail(email)) {
		throw Error('Email is not valid')
	}

	if (!validator.isStrongPassword(password)) {
		throw Error('Password is not strong')
	}

	// Passwords crypted
	const salt = await bcrypt.genSalt(10)
	const hash = await bcrypt.hash(password, salt)
	const user = await this.create({ email, password: hash })

	return user
}

// static login method
userSchema.statics.login = async function (email, password) {
	// Check if user to exist
	const user = await this.findOne({ email })

	if (!user) {
		throw Error('Incorrect email')
	}

	// Validation
	if (!email || !password) {
		throw Error('All fields must filled')
	}

	const match = await bcrypt.compare(password, user.password)

	if (!match) {
		throw Error('Incorrect password')
	}

	return user
}

module.exports = mongoose.model('User', userSchema)

