// Importing jsonwebteoken
const jwt = require("jsonwebtoken");

// Secret Keyword
const secret = "EcommerceAPI"

// Token Creation/Token Encryption
module.exports.createAccessToken = (user) => {
	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	};
	return jwt.sign(data, secret, {});
};

// Token Verification
// Error handling while calling promise-based methods
module.exports.verify = (req, res, next) => {
	console.log(req.headers.authorization);

	let token = req.headers.authorization;

	if(typeof token === "undefined"){
		return res.send({auth: "Failed. No Token"});
	} else{
		console.log(token);
		token = token.slice(7, token.length);
		console.log(token);;

		jwt.verify(token, secret, function(err, decodedToken){
			if(err){
				return res.send({
					auth: "Failed",
					message: err.message
				});
			} else {
				console.log("Result from verify method:");
				console.log(decodedToken);

				req.user = decodedToken;

				next();
			}
		})
	}
} 

// Verify if the user is admin
module.exports.verifyAdmin = (req, res, next) => {
	if(req.user.isAdmin){
		next();
	} else{
		return res.status(403).send({
			auth: "Failed",
			message: "Action Forbidden"
		})
	}
}