const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {JWT_SECRET} = require('../config');
const{User, Admin, Course} = require('../db')
const jwt = require("jsonwebtoken");

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
     const {username , password} = req.body;
     await Admin.create({
        username,
        password
     })

     res.json({
        msg: "Admin created successfully"
     })
     

});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;


    if (!username || !password) {
        return res.status(400).json({
            msg: "Username and password are required"
        });
    }

    const isValidated = await Admin.findOne({
        username : username,
        password : password
    })

    if(isValidated)
{
    console.log("is validated indeed");
    
    const token = jwt.sign({
            username
         }, JWT_SECRET);
    res.json({
        token
    })}

    else res.status(411).json({
        msg : "Incorrect username and password combination"
    })
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const{title, description, imageLink, price} = req.body;

    const newCourse = await Course.create({
        title, description, imageLink, price
    })

    res.json({
        msg: "Course created successfully",
        courseId: newCourse._id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const courses = await Course.find({});

    res.json({
        courses: courses
    })
});

module.exports = router;