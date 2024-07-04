const RatingAndReview = require('../models/RatingAndReview');
const Course = require('../models/Course');


//.....................................create rating................................
const createRating = async (req, res) => {
    try {
        //get user id
        const userId = req.user.id;


        //fetch data from req body
        const { rating, review, courseId } = req.body;

        console.log('result controller')


        //check if user enrolled or not


        const courseDetails = await Course.findOne({
            _id: courseId,
            studentsEnrolled: { $elemMatch: { $eq: userId } }
        });


        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: 'student is not enrolled in this course'
            })
        }



        //check if user is already reviewed the course
        const alreadyReview = await RatingAndReview.findOne({
            user: userId,
            course: courseId
        })

        if (alreadyReview) {
            return res.status(403).json({
                success: false,
                message: 'you have already reviewed this course'
            })
        }


        //create rating and review
        const ratingAndReview = await RatingAndReview.create({
            user: userId,
            rating,
            review,
            course: courseId,
        })



        console.log('ratingAndReview', ratingAndReview)

        //update rating and review in course details
        const updatedCourseDetails = await Course.findByIdAndUpdate({ _id: courseId },
            { $push: { ratingAndReview: ratingAndReview._id } },
            { new: true });

        console.log(updatedCourseDetails);


        //return response 
        return res.status(200).json({
            success: true,
            message: 'Rating and reviews created successfully',
            ratingAndReview
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Failed to create Rating, error: ',
            error: error,
        })
    }
}






//...................................get Average Rating................................................................
const getAverageRating = async (req, res) => {
    try {
        //get course Id
        const courseId = req.body.courseId;

        //calculate average rating
        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId),
                }
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: '$rating' },

                }
            }
        ])

        //return rating
        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                message: 'Average rating fetched successfully',
                averageRating: result[0].averageRating
            })
        } else {
            return res.status(404).json({
                success: false,
                message: 'No rating found',
                averageRating: 0,
            })
        }



    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to get average rating, error: ',
            error: error,
        })
    }
}





//......................................get All Rating and reviews................................................................


const getAllRatingAndReview = async (req, res) => {
    try {
        const allReviews = await RatingAndReview.find({})
            .sort({ rating: 'desc' })
            .populate({
                path: "user",
                select: "firstname lastname email image",
            })
            .populate({
                path: "course",
                select: "CourseName"
            }) 
            .exec();   
         
        //return response
        return res.status(200).json({
            success: true,
            message: 'All reviews fetched successfully',
            allReviews
        })




    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to get all reviews',
            error: error,
        })
    }
}



//................................................................geting all reviews on specific course.........


const getReviewsOnCourse = async (req, res) => {
    try {
        //get course Id
        const courseId = req.body.courseId;

        //get all reviews on specific course
        const ReviewsOnCourse = await RatingAndReview.find({ course: courseId })
            .sort({ rating: 'desc' })
            .populate({
                path: "user",
                select: "firstName lastName email image",
            })
            .populate({
                path: "course",
                select: "CourseName"
            })
            .exec();

        //return response
        return res.status(200).json({
            success: true,
            message: 'reviews on specific course fetched successfully',
            ReviewsOnCourse
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to get reviews on specific course',
            error: error,
        })
    }
}



module.exports = { createRating, getAverageRating, getAllRatingAndReview, getReviewsOnCourse }