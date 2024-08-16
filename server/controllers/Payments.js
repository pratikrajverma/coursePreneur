

const { instance } = require('../config/razorpay');
const Course = require('../models/Course')
const User = require('../models/User'); 
const mailSender = require('../utils/mailSender');
const {courseEnrollmentEmail} = require('../mail/templates/courseEnrollmentEmail');
const { mongoose } = require('mongoose');
const { paymentSuccessEmail } = require('../mail/templates/paymentSuccessEmail');

const crypto = require('crypto');  
const CourseProgress = require('../models/CourseProgress');



//.................................................. ( for single courses ) .......................................






 

 


  







//.................................................. ( for multiple courses ) ................................

 

//initiate the razorpay order ................................
exports.capturePayment = async (req, res) => {

    const { courses } = req.body;

    const userId = req.user.id;

    



            if (courses.length === 0) {
                return res.status(400).json({  
                    success: false,
                    message: 'courses not found for purches'
                })
            }

            let totalAmount = 0;

            for (const course_id of courses) {
                let course;

                try {
                    const cid = new mongoose.Types.ObjectId(course_id)
                    course = await Course.findById(cid);
                    

                    if (!course) {
                        return res.status(404).json({
                            success: false,
                            message: 'course not found'
                        })
                    }

                    const uid = new mongoose.Types.ObjectId(userId)

                    if (course.studentsEnrolled.includes(uid)) {
                        return res.status(200).json({
                            success: false,
                            message: 'Student is already enrolled',
      

                        })
                    }


                    totalAmount += course.price;

                } catch (error) {
                    console.log(error)
                    return res.status(500).json({
                        success: false,
                        message: error.message
                    })
                }
            }

            const options = {
                amount: totalAmount * 100,
                currency: 'INR',
                receipt: `${Date.now()}${Math.random().toString(36).substring(2, 9)} }`       
                
            }


            try{
                const paymentResponse = await instance.orders.create(options);

                res.json({
                    success: true,
                    message: 'payment  created successfully',
                    paymentResponse,
                })

            }catch (error) {
                console.log('error in creating payment order', error);
                return res.status(500).json({
                    success: false,
                    message: 'could not initiate order '
                })
            }

}


 
exports.verifyPayment = async (req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId) {
        return res.status(200).json({
            success: false,
            message: 'Payment request failed please give all the payment information'
        })
    }

    let body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex')


    const enrollStudents = async (courses, userId, res) => {
        if (!courses || !userId) {
            return res.status(200).json({
                success: false,
                message: 'Payment request failed unfilled courses or userId'
            })
        } 

        for (const courseId of courses) {
            try {
                //find the course and enrolled student in it
                const enrolledCourse = await Course.findOneAndUpdate( {_id:courseId}, { $push: { studentsEnrolled: userId } }, { new: true });

                if (!enrolledCourse) {
                    return res.status(500).json({
                        success: false,
                        message: 'course not found'
                    })
                }



                //creating course progress model of each course for clicking mark as completed in each lecture . NOTE : iska matlab he jab course banta he tab use time course progress model nahi bana balki jab course enrolled hoga student dwara and uska payment hoga to each student ke liye apna apna course progress model hoga jo starting me empty hoga and jab student mark as completed checkbox  me click karega tab backend ka api call jayega and coure progress model me jo jo subsection complete ho gaya he uska id store ho jayega
                const courseProgress =  await CourseProgress.create({
                    CourseId:courseId,
                    userId:userId,
                    completedVideos:[]

                })



                //find student and add courses to their list of enrolled courses on it  and also push course progressmodel_id to courseProgress

                const enrolledStudent = await User.findByIdAndUpdate(userId, 
                                                                    { $push: { courses: courseId, courseProgress:courseProgress._id } }, 
                                                                    { new: true });

                if (!enrolledStudent) {
                    return res.status(500).json({
                        success: false,
                        message: 'user not found for course enrollment'
                    })
                }


                //send mail notification to student for course enrollment
                const emailResponse = await mailSender(
                    enrolledStudent.email,
                    `congratulation from Hacktech to enrolled in ${enrolledCourse.courseName}`,
                    courseEnrollmentEmail(enrolledCourse.courseName, enrolledStudent.firstname + ' ' + enrolledStudent.lastname)
                )


                console.log('email sent to students for course enrollment', emailResponse);
            }catch (error) {
                console.log(error)
                return res.status(500).json({
                    success: false,
                    message: 'error in enrollStudents ',
                    error:error,
                })
            }

        }

    }



    if (expectedSignature === razorpay_signature) {

        //enrolled to students 
        await enrollStudents(courses, userId, res);



        //return response
        return res.status(200).json({
            success: true,
            message: 'Payment varified'
        })
    }

    return res.status(200).json({
        success: false,
        message: 'Payment request failed'
    })

} 



 

exports.sendPaymentSuccessEmail =  async(req, res) => {
    const {orderId, paymentId, amount} = req.body;

    const userId = req.user.id;

    if(!userId || !paymentId || !amount || !orderId) {
        return res.status(400).json({
            success: false,
            message: 'Payment request failed please give all the payment information'
        })
    }

    try{
        //student ko dundo
        const enrolledStudent = await User.findById(userId);
        
        await mailSender(   enrolledStudent.email, 
                            'payment received', 
                            paymentSuccessEmail(`${enrolledStudent.firstname}`, amount/100, orderId, paymentId )
                        )
        console.log('mail sent')
                       
    }catch(error){
        console.log('error in sending mail', error)
        return res.status(500).json({
            success: false,
            message: 'error in sending mail'
        })
    }


}