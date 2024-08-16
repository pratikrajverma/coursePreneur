const CourseProgress = require("../models/CourseProgress");
const Subsection = require("../models/Subsection");

 exports.courseProgress = async(req,res) =>{
    const {courseId, SubsectionId} = req.body;
    const userId = req.user.id;

    try{
        //check if sub section exists or not
        const SubsectionDetail = await Subsection.findById(SubsectionId);

        console.log('subsection found',SubsectionDetail)

        if(!SubsectionDetail){
            return res.status(404).json({
                success:false,
                message:'Subsection not found'
            })
        }

        //check old entry
        let courseProgress = await CourseProgress.findOne({
            CourseId:courseId,
            userId:userId
        })

        if(!courseProgress){
            return res.status(404).json({
                success:false,
                message:'course progress not found'
            })
        }
        else{
                //check for already completing video 
                if(courseProgress.completedVideos.includes(SubsectionId)){
                    return res.status(400).json({
                        success:false,
                        message:'video already completed'
                    })
                }


                //puch subsection to completedvideo
                courseProgress.completedVideos.push(SubsectionId);


        }

        await courseProgress.save();       


        return res.status(200).json({
            success:true,
            message:'course progress updated',
           
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:'Failed to update course progress',
            error:error,
        })
    }









 }