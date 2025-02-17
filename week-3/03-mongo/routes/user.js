const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User,Course} = require("../db");
const { default: mongoose } = require("mongoose");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const {username, password} = req.body;

    await User.create({
        username,
        password
    })
    res.json({
        msg : "User created successfully"
    })
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const courses = await Course.find({});
    res.json({
        courses : courses
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;

    const username = req.headers.username;
    const password = req.headers.password;
    try{
    await User.updateOne({
        username,
        password
    },{
         "$push" : {purchasedCourses : courseId
        }
    })} catch(e){
        console.log(e);
        
    }

    res.json({
        msg: "Purchase complete!"
    })

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username: req.headers.username
    });

    console.log(user.purchasedCourses);

    const courses = await Course.find({
        _id : {
            "$in" : user.purchasedCourses
        }
    })

    res.json({
        purchasedCourses : courses
    })
    
});

module.exports = router