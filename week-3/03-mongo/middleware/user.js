const {User} = require("../db");

async function userMiddleware(req, res, next){
    
    const username = req.headers.username;
    const password = req.headers.password;

    const value = await User.findOne({
        username : username,
        password : password
    })
        if(value) next();
        else res.status(403).json({
        msg : "User doesnt exist"
        })
    

        // .then(function(value){
        //     if(value) next();
        //     else res.status(403).json({
        //         msg : "User doesnt exist"
        //     })
        // })
}


module.exports = userMiddleware;