// Importing Dependencies and Modules
const express = require("express");
const productController = require("../controllers/product");
const auth = require("../auth");
const {verify, verifyAdmin} = auth;

// Routing Component
const router = express.Router();


// Route for Product Creation
router.post("/addProduct", verify, verifyAdmin, productController.addProduct);

// Route for Retrieving all products
router.get("/all", verify, verifyAdmin, productController.getAllProducts);

// Route for Retrieving all active products
router.get("/", productController.getAllAvailable);

// Route for Retrieving specific product
router.get("/:productId", productController.getProduct);

// Route for Updating Product Information
router.put("/:productId/update", verify, verifyAdmin, productController.updateProduct);

// Route for Achiving a product
router.patch("/:productId/archive", verify, verifyAdmin, productController.archiveProduct);

// Route for Activating a product
router.patch("/:productId/activate", verify, verifyAdmin, productController.activateProduct);

// Route for searching products by their names
router.post("/searchByName", productController.searchProductByName);

// Route for searching for products by price range
router.post("/searchByPrice", productController.searchProductByPrice);

// Export Route System
module.exports = router;
