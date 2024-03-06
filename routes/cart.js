// Importing of Dependencies and Modules
const express = require("express");
const cartController = require("../controllers/cart");
const userController = require("../controllers/user");
const prooductController = require("../controllers/product");
const {verify, verifyAdmin} = require("../auth");

// Routing component
const router = express.Router();

// Route for retrieving user's cart
router.get("/get-cart", verify, cartController.getCart);

// Route for adding products to cart
router.post("/:productId/add-to-cart", verify, cartController.addToCart);

// Route for updating quantities
router.patch("/:productId/update-cart-quantity", verify, cartController.updateCart);

// Route for removing item from cart
router.patch("/:productId/remove-from-cart", verify, cartController.removeItemFromCart);

// Route for clearing the cart
router.put("/clear-cart", verify, cartController.clearCart);

module.exports = router;