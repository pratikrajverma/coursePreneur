const User = require('../models/User');
const mailSender = require('../utils/mailSender')
const bcrypt = require('bcrypt');
const crypto = require('crypto'); 


//............................................................creating reset password token................................
const resetPasswordToken = async (req, res) => {
    try{
        //get email from body
        const email = req.body.email;

        //check user for this email
        const user = await User.findOne({ email: email });

        if(!user)
        {
            return res.status(404).json({
                success: false,
				message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
            })
        }

        //generate token
        // const token = crypto.randomUUID();      //Yeh line ek random unique token generate karta hai, jo password reset ke liye istemal kiya jayega. crypto.randomUUID() ek built-in Node.js function hai jo secure random UUID (Universally Unique Identifier) generate karta hai.
                                                //Token generation process password reset me ek aur suraksha parat add karta hai. Jabki email ke zariye reset link bhejna aam taur par surakshit hota hai, lekin token URL me shamil karne se suraksha aur bhi badh jati hai kyunki yeh ensure karta hai ki sirf wahi vyakti jo password reset kiya hai, vahi process ko poora kar sakta hai. 

        const token = crypto.randomBytes(20).toString("hex");


        //update User by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate( { email:email},         //ye iss email ka document ko search kar raha he
                                                            { token: token,   resetPasswordExpires : Date.now()+ 5*60*1000 },     //ye iss data ko update kar raha he
                                                            {new:true}   );       //ye updated data ko show karta hai

         console.log("DETAILS", updatedDetails);


        //create URL            
        const url = `http://localhost:3000/update-password/${token}`;          //this link will send to user email id and user will click on this to reset password

        //send mail containing URL
        await mailSender(email, 'password reset link', `Click here :  ${url}`);

        //return response
        return res.status(200).json({
            success: true,
            message: 'Password reset link sent to your email successfully'
        })


    }
    catch(error){
        console.log(error);

        return res.status(500).json({
            success: false,
            message: 'somthig went wrong while reset password'
        })
    }

}



//.............................................................reset password logic................................


const resetPassword = async (req, res) => {
    try{
        //data fetch
        const {password, confirmPassword, token} = req.body;        //NOTE: yaha par token ko to header se lena chahiye means URL se but body se le rahe he kyuki frontend me hi iska logic likh diye he ki header se url le kar body me send kar denge by fetch() function
        
        //validation
        if(password!== confirmPassword){
            return res.status(403).json({
                success: false,
                message: 'Passwords and confirmPassword do not match'
            })
        }

        //get user details from DB using token
        const userDetails = await User.findOne({token: token});

        //if no entry found
        if(!userDetails){
            return res.json({
                success: false,
                message: 'Token is invalid'
            })
        }

        //token time check
        if(userDetails.resetPasswordExpires < Date.now()){          //ye  block userDetails mein store ki gayi password reset ke liye token aur link ke expiration time ko current time ke saath tulna karta hai. Agar current time resetPasswordExpires se chhota hai, toh yeh matalb hai ki token aur link ka samay samapt ho chuka hai
            return res.json({
                success: false,
                message: 'token and link has expired'
            });
        }


        //hash password
        const hashPassword = await bcrypt.hash(password, 10);

        //password update
        await User.findOneAndUpdate({token},                    //yaha token ke jariye hi user ko khoja ja raha he 
                                    {password:hashPassword},    //yaha new password ko set kiya jayega
                                    {new:true} );   
        //return response
        return res.status(200).json({
            success: true,
            message: 'Password updated successfully'
        })

                         
    }catch(error){
        return res.status(500).json({
            success: false, 
            message:'somthig went wrong while reset password'
        })
    }
}


module.exports = { resetPasswordToken, resetPassword }
