const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User,Course} = require("../db");
const { default: mongoose } = require("mongoose");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const{username,password} = req.headers;
    await User.create({
        username:username,
        password:password,
    })
    res.status(200).json({
        msg: 'user created successfully',
    });
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const response = await Course.find({});
    res.json({
        courses: response,
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;

    await User.UpdateOne({
        username,
        "$push": {purchasedCourses: courseId},
    });
    res.status(200).json({
        msg: "course purchased",
    })

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = User.findOne({
        username: req.headers.username,
    })

    const courses = await Course.find({
        _id: {
            "$in" : user.purchasedCourses
        }
    })
    res.json({
        courses: courses,
    })
});

module.exports = router