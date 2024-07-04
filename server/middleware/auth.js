const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');

 

//.............................................................authentication by token................................................................
const  auth = async (req, res, next) => {
    try{ 
        //extract token
        const token = req.cookies.token || req.body.token || (req.headers.authorization && req.headers.authorization.replace("Bearer ",""));
       
  
        
        // if token missing, then return response
        if(!token) {
            return res.status(401).json({
                success:false,
                message:'Token is missing in auth middleware me',
            });
        }

        //verify the token
        try{
            const decode =  jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch(err) {
            //verification - issue
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }

        // console.log('auth is successfully completed');
        next();
    } 
    catch(error) {  
        console.log("error in auth : ", error)
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
            error:error.message,
        });
    }
}




//.................................................................isStudent................................
const isStudent = async (req, res, next) => {
    try{
        if(req.user.accountType !== 'Student'){
            return res.status(401).json({
                success:false,
                message:'this is protected routes for students only'
            })

        }

        next(); 


    }catch(error){
        return res.status(500).json({
            success:false,
            message:'user role cannot be varified, please try again'
        })
    }
}






//.................................................................isInstructor................................................................
const isInstructor = async (req, res, next) => {
    try{
        if(req.user.accountType !== 'Instructor'){
            return res.status(401).json({
                success:false,
                message:'this is protected routes for Instructor only'
            })

        }

        next(); 


    }catch(error){
        return res.status(500).json({
            success:false,
            message:'user role cannot be varified, please try again'
        })
    }
}







//.....................................................................isAdmin..........................................
const isAdmin = async (req, res, next) => {
    try{
        if(req.user.accountType !== 'Admin'){
            return res.status(401).json({
                success:false,
                message:'this is protected routes for Admin only'
            })

        }

        next(); 


    }catch(error){
        return res.status(500).json({
            success:false,
            message:'user role cannot be varified, please try again'
        })
    }
}

module.exports = {auth, isStudent, isInstructor, isAdmin}