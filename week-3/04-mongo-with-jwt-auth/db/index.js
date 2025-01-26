const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://collapse:faizanmalik@cluster0.87xwmol.mongodb.net/courseSellingapp2');

// Define schemas
const AdminSchema = new mongoose.Schema({
    username : String,
    password : String
})

const CourseSchema = new mongoose.Schema({
    title : String,
    description: String,
    imageLink : String,
    price : Number
})

const UserSchema = new mongoose.Schema({
    username: String,
    password : String,
    purchasedCourses : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
})

const Admin = mongoose.model('Admin',AdminSchema );
const User = mongoose.model( 'User',UserSchema);
const Course = mongoose.model( 'Course',CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}