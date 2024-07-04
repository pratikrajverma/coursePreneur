const express = require('express');
const router = express.Router();

const {sendOTP, signUp, login, changePassword} = require('../controllers/Auth')

const { resetPasswordToken, resetPassword } = require('../controllers/ResetPassword');

const {auth} = require('../middleware/auth')



// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************



//route for login
router.post('/login',login)

//route for signup
router.post('/signup',signUp)

//route for sendotp
router.post('/sendotp',sendOTP);

//roter for change password
router.post('/changepassword',auth, changePassword);




// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************


// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)

module.exports = router;