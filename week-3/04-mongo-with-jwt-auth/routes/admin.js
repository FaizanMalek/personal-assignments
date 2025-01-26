const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const{JWT_SECRET} = require('../config');
const{User, Admin, Course} = require('../db')
const jwt = require("jsonwebtoken");

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const {username, password} = req.headers;

    await Admin.create({
        username: username,
        password: password
    })
    
    req.json({
        msg: "admin created successfully"
    })

});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const{username, password} = req.body;
    console.log(JWT_SECRET);
    const user = await Admin.find({
        username,
        password
    }) 
    if(user){ 
        const token = jwt.sign({
        username
    }, JWT_SECRET)

    res.json({
        token
    })

    } else {
        res.status(411).json({
            msg: "Incorrect email and pass"
        })
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const {title, description, price, imageLink} = req.body;
    const newCourse = await Course.create({
        title,
        description,
        price,
        imageLink
    })
    res.json({
        msg: "Course created successfully", courseId: newCourse._id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const response = await Course.find({});
    
    res.json({
        courses: response
    })
});

module.exports = router;