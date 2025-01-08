// Middleware for handling auth
async function adminMiddleware (req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB.
    // Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    const decoded = jwt.verify(jwtToken, JWT_SECRET);
    try{
        if(!decoded.username) return res.status(400).json("jwt could not be verified");
    next();
    } catch(err){
        res.json({msg: 'incorrect inputs'})
    }
}

module.exports = adminMiddleware;