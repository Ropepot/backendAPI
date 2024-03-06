// Importing of Mongoose Package
const mongoose = require("mongoose");

// Setup of User Schema
const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, 'First Name is required.']
	},
	lastName: {
		type: String,
		required: [true, 'Last Name is required.']
	},
	email: {
		type: String,
		required: [true, 'Email is required.']
	},
	password: {
		type: String,
		required: [true, 'Password is required.']
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	mobileNo: {
		type: String,
		required: [true, 'First Name is required.']
	}
});

// Setup and exporting for User model
module.exports = mongoose.model('User', userSchema);
