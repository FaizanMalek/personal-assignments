const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User,Course} = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    try {
        const {username, password} = req.body;
if(!username || !password) return res.status(400).json({
    msg: "username and password are required"
})

const existingUser = await User.findOne({username});
if(existingUser) return res.status(409).json({
    msg: "user already exists"
})
    await User.create({
        username,
        password
    })

    res.status(201).json({
        msg: "new user created successfully"
    });

    } catch (error) {
        res.status(500).json({
            msg: "Internal server error"
    })

}
    
});

router.post('/signin', async (req, res) => {
    // Implement user signin logic
    try {
        const {username, password} = req.body;

    if(!username || !password) return res.status(400).json({
        msg: "username and password are required"
    })
    
    const user = await User.findOne({username, password});
    if(!user) return res.status(404).json({
        msg: "could not find user"
    })

    const token = jwt.sign({
        username
    },JWT_SECRET)

    res.status(200).json({
        token
    })
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        })
    }
    

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
    try {
        const courseId = req.params.courseId;
    const username = req.username;

    const updatedUser = await User.findOneAndUpdate(
        {username},
        {"$push": { purchasedCourses: courseId }},
        {new: true}
    );

    if(!updatedUser){
        return res.status(404).json({
            msg: "User not found"
        })
    }

    res.status(200).json({message: "Course purchased successfully"})
    } catch (error) {
        res.status(500).json({msg : "Internal Server error"})
    }
})

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    try {
        const user = await findOne(req.username);

    if(!user) return res.status(404).json({msg: "user not found"})
    
    const purchasedCourses = await Course.find({
        _id:{
            "$in": user.purchasedCourses
        }
    });

    res.status(200).json({
        purchasedCourses
    })
    } catch (error) {
        res.status(500).json({msg: "Internal server error"})
    }
    
});

module.exports = router;