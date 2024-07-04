const Profile = require('../models/Profile');
const User = require('../models/User');
const CourseProgress = require('../models/CourseProgress')
const Course = require('../models/Course');
const { uploadImage } = require('../utils/imageUploader')
 
const { convertSecondsToDuration } = require("../utils/secToDuration");

//.............................................update profile................................................................


const updateProfile = async (req, res) => {
  try {
    //fetch data from req ki body
    const { firstname, lastname, dateOfBirth, about, gender, contactNumber, } = req.body;

    // fetch userId
    const id = req.user.id;

    //validation
    // if( !gender ||!contactNumber){
    //     return res.status(400).json({
    //         success: false,
    //         message: 'Please fill all the fields'
    //     })
    // }

    //fetching user details 
    const userDetails = await User.findById(id);

    //fetching profile Id 
    const profileId = userDetails.additionalDetails;

    //updating profile details
    await Profile.findByIdAndUpdate(profileId, { dateOfBirth, about, gender, contactNumber }, { new: true });


    //updating first name and last name
    const userUpdatedDetails = await User.findByIdAndUpdate(id, { firstname, lastname }, { new: true }).populate('additionalDetails');


    //return response
    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      userUpdatedDetails
    })



  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'somthig went wrong while updating profile',
      error
    })
  }
}



//.........................................delete account..................................................
const deleteAccount = async (req, res) => {
  try {
    //fetch user Id
    const userId = req.user.id;

    //validation
    const userDetails = await User.findById(userId);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: 'user not found',
      })
    }

    //profile details
    await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });

    // delete user
    await User.findByIdAndDelete(userId);

    //return response
    return res.status(200).json({
      success: true,
      message: 'Account deleted successfully',
    })



  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'somthig went wrong while deleting account'
    })
  }
}




//.......................................get user details...............................................

const getAllUserDetails = async (req, res) => {
  try {
    //fetch user Id
    const userId = req.user.id;
    console.log(userId);
    const userDetails = await User.findById(userId).populate("additionalDetails").exec();

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: 'user not found',
      })
    }

    console.log(userDetails);

    return res.status(200).json({
      success: true,
      message: 'User details fetched successfully',
      userDetails
    })

  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: 'somthig went wrong while getting user details'
    })
  }
}





//....................................Image upload to cloudinary..........................................

const updateDisplayPicture = async (req, res) => {
  try {
    //fetch user id from req
    const userId = req.user.id


    //fetch data from files
    const displayPicture = req.files.displayPicture
    console.log(displayPicture);


    //upload image to cloudinary by imageUploader function
    const image = await uploadImage(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    )

    console.log(image)

    //update user details
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    )


    //return response
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    })
  }
  catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: `error in updating display Picture :  ${error.message}`,
      error,
    })
  }
};




//...................................................get enrolled course............................
const getEnrolledCourses = async (req, res) => {
	try {
	  const userId = req.user.id

	  let userDetails = await User.findOne({
		_id: userId,
	  })
		.populate({
		  path: "courses",
		  populate: {
			path: "courseContent",
			populate: {
			  path: "Subsection",
			},
		  },
		})   
		.exec()

	  userDetails = userDetails.toObject()
	  var SubsectionLength = 0
	  for (var i = 0; i < userDetails.courses.length; i++) {
		let totalDurationInSeconds = 0
		SubsectionLength = 0
		for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
		  totalDurationInSeconds += userDetails.courses[i].courseContent[
			j
		  ].Subsection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
		  userDetails.courses[i].totalDuration = convertSecondsToDuration(
			totalDurationInSeconds
		  )
		  SubsectionLength +=
			userDetails.courses[i].courseContent[j].Subsection.length
		}

		let courseProgressCount = await CourseProgress.findOne({
		  CourseId: userDetails.courses[i]._id,
		  userId: userId,
		})
    
		courseProgressCount = courseProgressCount?.completedVideos.length
		if (SubsectionLength === 0) {
		  userDetails.courses[i].progressPercentage = 100
		} else {
		  // To make it up to 2 decimal point
		  const multiplier = Math.pow(10, 2)
		  userDetails.courses[i].progressPercentage =
			Math.round(
			  (courseProgressCount / SubsectionLength) * 100 * multiplier
			) / multiplier
		}
	  }
  
	  // if (!userDetails | ) {
		// return res.status(400).json({
		//   success: false,
		//   message: `Could not find user with id: ${userDetails}`,
		// })
	  // }

	  return res.status(200).json({
		success: true,
		data: userDetails.courses,
	  })
	} catch (error) {
	  return res.status(500).json({
		success: false,
		message: error.message,
	  })
	}
  }



//................................Instructor Dashboard ................................

const instructorDashboard = async(req, res) => {
    try{
      const courseDetails = await Course.find({instructor:req.user.id});
   
      const courseData  = courseDetails.map((course)=> {

        const totalStudentsEnrolled = course.studentsEnrolled.length
        
        const totalAmountGenerated = totalStudentsEnrolled * course.price
  
        //.........create an new object with the additional fields...............

        const courseDataWithStats = {
          _id: course._id,
          courseName: course.courseName,
          courseDescription: course.courseDescription,
          totalStudentsEnrolled,
          totalAmountGenerated,
        }

        return courseDataWithStats
      })
 
    
  
      return res.status(200).json({
        success: true,
        message: "Instructor Dashboard fetched successfully",
        courseData
      });
  
    }
    catch(error) {
      console.error(error);
      res.status(500).json({message:"Internal Server Error"});
    }
  }

module.exports = { updateProfile, deleteAccount, getAllUserDetails, updateDisplayPicture, getEnrolledCourses ,instructorDashboard}