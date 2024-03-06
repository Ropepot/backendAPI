// Importing Dependencies and Modules
const express = require("express");
const orderController = require("../controllers/order");
const cartController = require("../controllers/cart");
const userController = require("../controllers/user");
const prooductController = require("../controllers/product");
const {verify, verifyAdmin} = require("../auth");

// Routing component
const router = express.Router();


// Route for Creatiing Order
router.post("/checkout", verify, orderController.createOrder);

// Route for retrieving user's orders
router.get("/my-orders", verify, orderController.getUserOrder);

// Rooute for retrieving all user's orders
router.get("/all-orders", verify, verifyAdmin, orderController.allOrder);


// Exporting of order route
module.exports = router