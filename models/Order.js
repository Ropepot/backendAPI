// Importing of Dependencies, Modules, and Models
const mongoose = require("mongoose");

// Setup for orderSchema
const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'User ID is Required']
    }, 
    productsOrdered: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: [true, 'Product ID is Required']
            },
            productName: {
                type: String,
                required: [true, 'Product Name is Required']
            },
            price: {
                type: Number,
                required: [true, 'Price is Required']
            },
            quantity: {
                type: Number,
                required: [true, 'Quantity is Required']
            },  
            subtotal: {
                type: Number,
                required: [true, 'Subtotal is Required']
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: [true, 'Total Price is Required']
    },
    orderedOn: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'Pending'
    }
});

// Exporting and Setup for order model
module.exports = mongoose.model('Order', orderSchema);