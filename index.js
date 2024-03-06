// Dependencies and Modules
const express = require("express");
const mongoose = require("mongoose");

// Control of the app's Cross Origin Resopurse Sharing Settings
const cors = require("cors");

// Importing of Routes
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");


// Environment Setup
const port = 4005;


// Server Setup
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());


// Database Connection
mongoose.connect("mongodb+srv://acecharlseniel:admin@cluster0.zyruvxi.mongodb.net/E-Commerce-API?retryWrites=true&w=majority");

mongoose.connection.once("open", () => console.log("Now connected to MongoDB Atlas."));

// Backend Routes
app.use("/b5/users", userRoutes);
app.use("/b5/products", productRoutes);
app.use("/b5/carts", cartRoutes);
app.use("/b5/orders", orderRoutes);


// Server Gateway Response
app.listen(process.env.PORT || port, () => {
	console.log(`API is now online on port ${process.env.PORT || port}`)
});

// Exporting of app and mongoose
module.exports = {app, mongoose};