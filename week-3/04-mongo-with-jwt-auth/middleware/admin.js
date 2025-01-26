const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../config");


// Middleware for handling auth
async function adminMiddleware (req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB.
    // Check readme for the exact headers to be expected
    const token = req.headers.authorization // headers get converted to lowercase by def
    
    const words = token.split(' ');
    const jwtToken = words[1];
    
    const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
    if(decodedValue.username) {next();}
//username is encoded inside the jwt. when we verify and decode it ,
// we should get back the username
    else {res.status(403).json({
        msg: "You are not authenticated"
    })}
}

module.exports = adminMiddleware;