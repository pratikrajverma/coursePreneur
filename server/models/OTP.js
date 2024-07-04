const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const otpTemplate = require('../mail/templates/emailVerificationTemplate');

const OTPschema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    otp:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now(),
        required: true,
        expires: 60 * 5            //otp aur email fields ke documents ko yeh affect nahi karega. Yani 6 minute ke baad bhi otp aur email fields ke documents database mein bane raheinge, lekin createdAt field ke documents automatically delete nahi honge
    } 

})



async function sendVerificationEmail(email, otp){
    try{
        const mailResponse = await mailSender(email, 'Email verification  for studyNotion', otpTemplate(otp));
        console.log('email sent successfully', mailResponse.response);
    }catch(err){
        console.log('error occurs while sending verification email',err);
        throw err;
    }
} 

 


OTPschema.pre('save', async function(next){             //Ye line Mongoose schema ke save method se pehle ek middleware function ko register karta hai. Yeh function document ko save karne se pehle execute hota hai.
    await sendVerificationEmail(this.email, this.otp);  
    next();             // Ye line middleware function ke ant mein next() function ko call karta hai. Isse agla middleware function ya schema ke save operation ko continue karne ke liye keh diya jata hai.
})





module.exports = mongoose.model('OTP', OTPschema)