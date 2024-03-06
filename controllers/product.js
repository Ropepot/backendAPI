// Importing of dependencies and Modules
const Product = require("../models/Product");

// Create a Product
module.exports.addProduct = (req, res) => {
	if(!req.user.isAdmin){
		return res.status(403).send({error: "User Unauthorized"})
	}

	let newProduct = new Product({
		name: req.body.name,
		description: req.body.description,
		price: req.body.price
	});

	Product.findOne({name: req.body.name})
	.then(existingProduct => {
		if(existingProduct){
			return res.status(409).send({message: "Product already exists"})
		}

		return newProduct.save()
		.then(savedProduct => {
			res.status(201).send(savedProduct)
		})
		.catch(err => {
			console.error("Error in saving the product", err)
			res.status(500).send({error: "Failed to save the product"})
		})
	})
	.catch(err =>{
		console.error("Error in finding the product.", err)
		return res.status(500).send({error: "Failed to find the product"})
	})
};


// Retrieving all products
module.exports.getAllProducts = (req, res) => {
	Product.find({})
	.then(products => {
		if(products.length > 0){
			return res.status(200).send({products})
		} else {
			return res.status(200).send({message: "No Products found"})
		}
	})
	.catch(err => {
		console.error("Error in finding all products.", err)
		return res.status(500).send({error: "Failed to find all products"})
	});
};


// Retrieving all active products
module.exports.getAllAvailable = (req, res) => {
	Product.find({isActive: true})
	.then(availableProducts => {
		if(availableProducts.length > 0){
			return res.status(200).send({availableProducts})
		} else {
			return res.status(200).send({message: "No Available Products"})
		}
	})
	.catch(err => {
		console.error("Error in finding available products.", err)
		return res.status(500).send({error: "Failed to find all available products"})
	})
};


// Retrieving specific product
module.exports.getProduct = (req, res) => {
	const productId = req.params.productId
	
	Product.findById(productId)
	.then(product =>{
		if(!product){
			return res.status(404).send({error: "Product not found"})
		} else {
			return res.status(200).send({product})
		}
	})
	.catch(err => {
		console.error("Error in finding the product.", err)
		return res.status(500).send({error: "Failed to find the product"})
	})
};


// Updating a Product
module.exports.updateProduct = (req, res) => {
	const productId = req.params.productId;

	let updatedProduct = {
		name: req.body.name,
		description: req.body.description,
		price: req.body.price
	}

	Product.findByIdAndUpdate(productId, updatedProduct, {new: true})
	.then(updatedProduct => {
		if(!updatedProduct){
			return res.status(404).send({error: "Product not found"})
		} else{
			return res.status(200).send({
				message: "Product updated successfully",
				updatedProduct: updatedProduct
			})
		}
	})
	.catch(err => {
		console.error("Error in updating the product.", err)
		return res.status(500).send({error: "Failed to update the product."})
	})
};


// Removing a product
module.exports.archiveProduct = (req, res) => {
	let updateAvailability = {isActive: false};
	let productId = req.params.productId

	if(req.user.isAdmin){
		return Product.findByIdAndUpdate(productId, updateAvailability, {new: true})
		.then(archiveProduct => {
			if(!archiveProduct){
				return res.status(404).send({error: "Product not found"})
			} else {
				return res.status(200).send({message: "Product removed successfully"})
			}
		})
		.catch(err => {
			console.error("Error in removing the product.", err)
			return res.status(500).send({error: "Failed to remove the product"})
		})
	}
};

// Activating a product
module.exports.activateProduct = (req, res) => {
	let updateAvailability = {isActive: true};
	let productId = req.params.productId

	if(req.user.isAdmin){
		return Product.findByIdAndUpdate(productId, updateAvailability, {new: true})
		.then(activateProduct => {
			if(!activateProduct){
				return res.status(404).send({error: "Product not found"})
			} else {
				return res.status(200).send({message: "Product is now available"})
			}
		})
		.catch(err => {
			console.error("Error in activating the product.", err)
			return res.status(500).send({error: "Failed to activate the product"})
		})
	}
};


// Searching for product by name
module.exports.searchProductByName = (req, res) => {
    const name = req.body.name;

    Product.find({ name: { $regex: name, $options: 'i' } })
    .then(products => {
        if (products) {
            return res.status(200).send(products);
        } else {
            return res.status(404).send({ error: "Product not found" });
        }
    })
    .catch(err => {
        console.error("Error in finding the product.", err);
        return res.status(500).send({ error: "Failed to find the product" });
    });
};


// Searching for product by price
module.exports.searchProductByPrice = (req, res) => {
	const {minPrice, maxPrice} = req.body

	if(!minPrice || !maxPrice){
		return res.status(400).json({error: "Both minPrice and maxPrice are required."})
	}

	Product.find({ price: { $gte: minPrice, $lte: maxPrice } })
	.then(products => {
		if(products){
			return res.status(200).send(products)
		} else {
			return res.status(404).send({ error: "Product not found" });
		}
	})
    .catch(err => {
        console.error("Error in finding the products.", err);
        return res.status(500).send({ error: "Failed to find the products" });
    });
};