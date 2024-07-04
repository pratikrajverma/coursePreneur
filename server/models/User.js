const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
         
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    }, 
    accountType:{
        type:String,
        required:true,
        enum:["Admin",'Student','Instructor']
    },
    additionalDetails:
    {
        type:mongoose.Schema.Types.ObjectId,
         
        ref:'Profile'
    }, 
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Course'
        }
    ],
    image:{
        type:String,
         
    },
    courseProgress:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'CourseProgress'
        }
    ],
    token:{
        type:String,
    },
    resetPasswordExpires:{
        type:Date,
    }
    
})
    


module.exports = mongoose.model('User', userSchema)














