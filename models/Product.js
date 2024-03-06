// Importing Dependencies and Modules
const mongoose = require("mongoose");

// Setup for Products Schema
const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Product Name is required']
	},
	description: {
		type: String,
		required: [true, 'Description is required']
	},
	price: {
		type: Number,
		required: [true, 'Price is required']
	},
	isActive: {
		type: Boolean,
		default: true
	},
	createdOn: {
		type: Date,
		default: Date.now
	}
});

// Exporting and Setup for Products Model
module.exports = mongoose.model("Product", productSchema);