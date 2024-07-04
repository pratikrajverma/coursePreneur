const express = require('express');
const router = express.Router(); 

const {auth,isStudent} = require('../middleware/auth')  

const {capturePayment, varifySignature, verifyPayment ,   sendPaymentSuccessEmail } = require('../controllers/Payments')



router.post('/capturePayment', auth, isStudent, capturePayment);

// router.post("/varifySignature",auth, isStudent, varifySignature)

router.post("/verifyPayment",auth, isStudent, verifyPayment)

 

router.post("/sendPaymentSuccessEmail",auth, isStudent, sendPaymentSuccessEmail)

module.exports = router;