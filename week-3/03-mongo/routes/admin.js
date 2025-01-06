const { Router } = require("express");
const { Admin, Course } = require("../db");
const adminMiddleware = require("../middleware/admin");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const {username, password} = req.body;
    
    await Admin.create({
        username: username,
        password: password,
    })
    

    res.status(200).json({
        msg:'Admin created successfully'
    })
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const{title,description, price,imageLink} = req.body;
    const newCourse = await Course.create({
        title:title,
        description:description,
        price:price,
        imageLink:imageLink,
    })
    res.status(200).json({
        msg: "course created successfully", courseId:newCourse._id,
    })
    
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const response = await Course.find({});
    res.json({
        courses: response,
    })
});

module.exports = router;
