const mongoose = require('mongoose');


const CourseProgressSchema = new mongoose.Schema({
    CourseId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Course'
    },
    completedVideos:[
        {   
            type:mongoose.Schema.Types.ObjectId,
            ref:'Subsection'
        }
    ],
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
 
    
}) 
    

module.exports = mongoose.model('CourseProgress', CourseProgressSchema)














