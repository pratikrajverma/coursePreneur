const express = require('express');
const router = express.Router();

const {auth, isInstructor} = require('../middleware/auth');

const {updateProfile, deleteAccount, getAllUserDetails, updateDisplayPicture, getEnrolledCourses, instructorDashboard} = require('../controllers/Profile');









// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************

//deleting user profile
router.delete('/deleteProfile',auth, deleteAccount);

//updating user profile
router.put('/updateProfile', auth, updateProfile);

 
//fetching user profile
router.get('/getUserDetails', auth, getAllUserDetails);

// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses)

//update profile picture
router.put("/updateDisplayPicture", auth, updateDisplayPicture)

//get instructor Dashboard data
router.get("/getInstructorData" ,auth, isInstructor, instructorDashboard)


module.exports = router;




