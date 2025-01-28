const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User,Course} = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const {username, password} = req.body;
    await User.create({
        username,
        password
    })
    res.json({
        msg : "user created successfully"
    })
    
});

router.post('/signin', async (req, res) => {
    // Implement user signin logic
    const {username, password} = req.body;

    if(!username || !password) res.status(400).json({
        msg : "user and pass cannot be empty"
    })

    const user = await User.findOne({
        username,
        password
    })
    if(user){
        const jwtToken = jwt.sign({
        username
    }, JWT_SECRET)
        res.json({
            jwtToken
        })}
        else{
            res.status(411).json({
                msg:"Incorrect User and password"
            })
        }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const response = await Course.find({});

    res.json({
        courses : response
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const username = req.random;
    console.log(username);
    const courseId = req.params.courseId;

    await User.updateOne({
        username
    },{
        "$push" : {purchasedCourses : courseId}
    })

    res.json({
        msg : "purchase complete"
    })
    
})

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.random;
    const user = await User.findOne({
        username
    });
    
    const purchases = await Course.find({
        _id : {
            "$in" : user.purchasedCourses
        
        
        }
    })
    console.log(user.purchasedCourses);

    res.json({
        purchasedCourse : purchases
    })
});

module.exports = router;