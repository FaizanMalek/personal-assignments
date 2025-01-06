const{ Admin } = ("../db")
// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB.
    // Check readme for the exact headers to be expected
    const {username, password} = req.headers;
    Admin.findOne({
        username:username,
        password:password,
    }).then(function(value){
        if(value) next();
        else return res.json({
            msg: "admin doesnt exist",
        })
    })
}

module.exports = adminMiddleware;