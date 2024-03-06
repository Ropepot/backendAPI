// Importing of Dependencies and Modules
const bcrypt = require("bcrypt");
const User = require("../models/User");
const auth = require("../auth");


// [SECTION] Register User
module.exports.registerUser = (req, res) => {

	if (!req.body.email.includes("@")){
	    return res.status(400).send({ error: "Email invalid" });
	}

	
	else if (req.body.mobileNo.length !== 11){
	    return res.status(400).send({ error: "Mobile number invalid" });
	}

	else if (req.body.password.length < 8) {
	    return res.status(400).send({ error: "Password must be atleast 8 characters" });


	} else {
	
		let newUser = new User({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			mobileNo: req.body.mobileNo,
		
			password: bcrypt.hashSync(req.body.password, 10)
		})

	
		return newUser.save()
		.then((result) => res.status(201).send({ message: "Registered Successfully" }))
		.catch(err => {
			console.error("Error in saving.", err)
			return res.status(500).send({ error: "Error in save"})
		});
	}

};


// [SECTION] Login User
module.exports.loginUser = (req, res) => {
	if(req.body.email.includes("@")){
		return User.findOne({ email: req.body.email })
		.then(result => {
		
			if(result == null){
				return res.status(404).send({ error: "No Email Found" });
			
			} else {
	
				const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password)
			
				if(isPasswordCorrect){
					
					return res.status(200).send({ access: auth.createAccessToken(result) })
			
				} else {
					return res.status(401).send({ message: "Email and password do not match" });
				} 
			}
		})
		.catch(err => {
			console.log("Error in find.", err);
			res.status(500).send({ error: "Error in find"});
		});
	} else {
		return res.status(400).send({error: "Invalid Email"});
	}
};


// Retrieving User Details
module.exports.getUserDetails = (req, res) => {
	const userId = req.user.id;

	User.findById(userId)
	.then(user => {
		if(!user){
			res.status(404).send({error: "Message not found"});
		}

		user.password = undefined;

		return res.status(200).send({user});
	})
	.catch(err => {
		console.error("Error in retrieving user details.", err)
		return res.status(500).send({error: "Failed to retrieve user details"})
	});
};

// Updating user as admin
module.exports.updateUserAsAdmin = (req, res) =>{
	if(!req.user.isAdmin){
		return res.status(403).send({message: "User Unauthorized"}); 
	}

	let userId = req.params.userId
	User.findByIdAndUpdate(userId, {isAdmin: true}, {new: true})
	.then(user =>{
		if(!user){
			return res.status(404).send({error: "User not found"})
		} else {
			return res.status(200).send({message: "User updated successfuly"})
		}
	})
	.catch(err => {
		console.error("Error in Updating User to Admin.", err)
		return res.status(500).send({error: "Failed to update user to Admin"})
	})
};

// Updating Password
module.exports.updatePassword = (req, res) => {
	const {newPassword} = req.body
	const {id} = req.user;

	if(newPassword.length < 8){
		return res.status(400).send({ error: "Password must be atleast 8 characters" });
	} else{
		const hashedPassowrd = bcrypt.hashSync(newPassword, 10);

		return User.findByIdAndUpdate(id, {password: hashedPassowrd})
		.then(result => res.status(200).send({message: "Password was updated successfuly"}))
		.catch(err => {
			console.error("Error in updating password.", err);
			res.status(500).send({error: "Failed to update password"})
		})
	}

};