// Importing of Dependencies and Modules
const express = require("express");
const userController = require("../controllers/user");
const {verify, verifyAdmin} = require("../auth");

// Routing Component
const router = express.Router();

// Route for User registration
router.post("/", userController.registerUser);

// Route for User login
router.post("/login", userController.loginUser);

// Route for Retrieving User Details
router.get("/details", verify, userController.getUserDetails);

// Route to update user as admin
router.put("/:userId/set-as-admin", verify, verifyAdmin, userController.updateUserAsAdmin);

// Route for updating user passowrd
router.patch("/update-password", verify, userController.updatePassword)


// Exporting of user routes
module.exports = router;