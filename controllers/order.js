// Importing Dependencies and Modules
const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

// Creating an order
module.exports.createOrder = (req, res) => {
    if (req.user.isAdmin) {
        return res.status(403).send({ error: "Admin users are forbidden to perform this action" });
    }

    const userId = req.user.id;

    Cart.findOne({ userId })
        .then(cart => {
            if (!cart) {
                return res.status(404).send({ error: "No cart found" });
            } else if (cart.cartItems.length === 0) {
                return res.status(400).send({ error: "Cart is empty" });
            }

            const productsOrdered = cart.cartItems.map(cartItem => ({
                productId: cartItem.productId,
                productName: cartItem.productName,
                price: cartItem.price,
                quantity: cartItem.quantity,
                subtotal: cartItem.subtotal
            }));

            const totalPrice = cart.totalPrice;

            const order = new Order({
                userId: userId,
                productsOrdered: productsOrdered,
                totalPrice: totalPrice
            });

            return order.save()
                .then(savedOrder => {
                    return Cart.findOneAndDelete({ userId })
                        .then(() => {
                            res.status(200).send({ message: "Order placed successfully", order: savedOrder });
                        })
                        .catch(err => {
                            console.error("Error deleting cart:", err);
                            res.status(500).json({ error: "Failed to delete cart." });
                        });
                })
                .catch(err => {
                    console.error("Error saving order:", err);
                    res.status(500).json({ error: "Failed to save order." });
                });
        })
        .catch(err => {
            console.error("Error finding cart by ID:", err);
            return res.status(500).send({ error: "Failed to find the cart." });
        });
};


// Retrieving user's order
module.exports.getUserOrder = (req, res) => {
	if(req.user.isAdmin){
	    return res.status(403).send({error: "Admin users are forbidden to perform this action"});
	}

	const userId = req.user.id;

	Order.find({userId})
	.then(userOrders => {
		if(!userOrders){
			return res.status(404).send({error: "No orders found"})
		} else {
			return res.status(200).send({orders: userOrders});
		}
	})
	.catch(err => {
	    console.error("Error finding order by ID.", err);
	    return res.status(500).send({ error: "Failed to find the order." });
	})
};


// Retrieving all user's orders
module.exports.allOrder = (req, res) => {
	Order.find({})
	.then(allOrders => {
		return res.status(200).send({orders: allOrders})
	})
	.catch(err => {
	    console.error("Error finding all orders.", err);
	    return res.status(500).send({ error: "Failed to find all orders." });
	})
};