

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






//.............................. innitiate the Razorpay order.....................................
// const capturePayment = async (req, res) => {
//                                                     //Payments ke process mein, ek order create karna zaroori hota hai takay payment gateway ko transaction ke liye saari zaroori jaankari milti hai. Neeche diye gaye reasons hain ki order create karna kyun zaroori hai:
//                                                     //Transaction Information: Order create karne se pehle, aapko payment transaction ke liye saari zaroori jaankariyan provide karni hoti hain jaise amount, currency, aur kuch additional notes. Yeh information payment gateway ko transaction process karne ke liye di jaati hai
//                                                     //Unique Identifier: Har transaction ka unique identifier hona zaroori hai. Order create karke, aap ek unique order ID generate karte hain jo ki transaction ko uniquely identify karta hai.


//        //get courseId and userId 
//        const {courseId} = req.body;
//        const userId = req.user.id;

//        //validation
//        if(!courseId){
//             return res.status(400).json({
//                 success: false,
//                 message: 'valid courseId is required'
//             })
//        }


//        //validation courseId details
//         let course;
//         try{
//             course = await Course.findById(courseId);

//             if(!course){
//                 return res.status(400).json({
//                     success: false,
//                     message: 'could not find the course'
//                 })
//             }


//             //check if user already pay for the same course

//             const userObjectId =  new mongoose.Types.ObjectId(userId);   //req.user.id me user ki id string me store hoti he but Course model me studentEnrolled array me user ki id mongoose.Type.ObjectId me store hoti he so thats way i have convert this from string to mongoose object id

//             if(course.studentsEnrolled.includes(userObjectId)) {
//                 return res.status(200).json({
//                     success: false,
//                     message: 'you are already enrolled in this course'
//                 })
//             }
//         }
//         catch(error){
//             console.log(error);
//             return res.status(500).json({
//                 success: false,
//                 message: error.message
//             })
//         }


//         //setting course amount and currency
//         const amount = course.price;
//         const currency = 'INR';

//         //create order for course purchase
//         const options = {                       //const options = { ... }: Ek options object banaya gaya hai jo payment ke liye various configurations ko store karega.
//             amount: amount*100,                      //this is syntax of razorpay documentation that price me * 100 hoga 
//             currency:currency,                          //Payment currency INR set kiya gaya hai.

//             receipt:Math.random(Date.now()).toString(),     //Ek random receipt number generate kiya gaya hai, jo unique transaction ko identify karne ke liye upyogi hai.  
//             notes:{                                         // Additional notes ko store karne ke liye ek object banaya gaya hai, jisme courseId aur userId ko save kiya gaya hai 
//                 courseId: courseId,
//                 userId
//             }
//         }

//         try{
//             //initiate the payments using razorpay
//             const paymentResponse = await instance.orders.create(options);      //1. Iss line mein instance ek Razorpay ka instance hai jo payment gateway se communication karne ke liye istemal hota hai. orders ek property hai jo instance ke andar rakha gaya hai, jo ki Razorpay ke orders ko create karne ke liye istemal hota hai 
//                                                                                 //2. create(options) method ko call karne se, hum ek naya payment order create karte hain. Iss method ko call karne ke liye hume options object provide karna hota hai, jisme payment ke liye saari zaroori jaankariyan shamil hoti hain, jaise payment amount, currency, aur kuch additional notes.

//             console.log(paymentResponse);

//             //return response
//             return res.status(200).json({
//                 success: true,
//                 courseName:course.CourseName,
//                 courseDescription:course.courseDescription,
//                 thumbnail:course.thumbnail,
//                 orderId:paymentResponse.id,
//                 amount:paymentResponse.amount,
//                 currency:paymentResponse.currency,
//                 message: 'payment initiated successfully',
//                 paymentResponse
//             })

//         }catch(error){
//             console.log(error);
//             return res.json({
//                 success: false,
//                 message: 'could not initiate order'
//             });
//         }

// } 

 


 
// //.........................................varify signature of razorpay and server...............................

// const varifySignature = async (req, res) => {   //1.Razorpay ke webhooks ko handle karne ke liye, aapko apne server par ek endpoint set karna hota hai jahan se aap Razorpay ke events ko receive kar sakte hain. Ye endpoint typically aapke server ki backend application mein hota hai.
//                                                 //2. Is code snippet mein, varifySignature function Razorpay ke webhook events ko handle kar raha hai. Jab Razorpay kisi event ko notify karta hai, woh event ke saath ek signature bhi provide karta hai jo verify karna hota hai. Yeh signature verify karta hai ki notification legitimate hai ya nahi.
//                                                 //3. Agar aapko Razorpay ke events ko handle karne ke liye apne server par webhook set karna hai, to aapko Razorpay ke dashboard mein jaake apne webhook URL ko configure karna padega. Webhook URL typically aapki backend server ki URL hogi jahan yeh varifySignature function ya kuch equivalent uskaam karta hai.
//                                                 //4.   Set up an endpoint on your server to handle Razorpay webhook events.
//                                                     // a. Configure this endpoint URL in your Razorpay dashboard.
//                                                     // b. Whenever a payment event occurs on Razorpay, Razorpay will send a notification to this endpoint.
//                                                     // c. Your server will verify the signature of the notification using varifySignature function or equivalent logic.
//                                                     // d. If the signature is valid, your server will process the event accordingly (e.g., enroll a user in a course, update database, send confirmation email, etc.).
//                                                     // e. If the signature is invalid, your server will reject the notification.
//                                                 //5.Webhook Configuration in Razorpay Dashboard: Pehle, aapko Razorpay ke dashboard mein jaana hoga aur wahan par aapko apne webhook endpoint ka URL set karna hoga. Is URL ko Razorpay ko pata chal jaata hai ki woh kis server ko event notifications bhejega.
//                                                 //6.Webhook Secret: Aap apne server par ek secret generate karte hain, jo ki aapki server aur Razorpay ke beech secure communication ke liye use hota hai. Jab aap apne webhook URL ko Razorpay dashboard mein configure karte hain, aapko yeh secret bhi provide karna hota hai. Jab Razorpay aapko notification bhejta hai, woh is secret ka istemal karke signature generate karta hai jo notification ke saath bheja jaata hai.
//                                                 //7.Request Verification: Jab aapki server ko koi request milta hai, jaise ki payment notification, aap is webhook secret ka istemal karke request ko verify karte hain. Agar signature verify hota hai, toh aap jaante hain ki request legit hai aur aap uspe further actions perform kar sakte hain
//                                                 //8. Request Processing: Agar aapki server ne request ko verify kiya aur uska signature sahi hai, toh aap desired actions ko perform karte hain, jaise ki user ko enroll karna, database update karna, email bhejna, etc.
//                                                 //9. To summarize, Razorpay aapko webhook notifications bhejne ke liye aapke dwara configure kiye gaye endpoint URL ka istemal karta hai. Aapki server ko notification milne ke baad, aap verify karte hain ki notification legitimate hai ya nahi, secret key ka istemal karke. Agar verification successful hota hai, toh aap desired actions perform karte hain.
//                                                 //10. Jab aap apne backend server ka URL Razorpay ke dashboard mein set karte hain, toh Razorpay aapki server ko notifications bhejne ke liye us URL ka istemal karta hai. Jab bhi koi transaction ya koi event hota hai, Razorpay apne backend system se aapki server ko notification bhejta hai.




//     const webhookSecret = "12345678";

//     const signature = req.headers["x-razorpay-signature"];


//     //converting webhookSecret to digest 
//     const shasum = crypto.createHmac("sha256", webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex"); 



//     //now matching signature and webhookSecret
//     if(signature === digest) {
//         console.log('payment is Authorized');

//         const {courseId, userId} = req.body.payload.payment.entity.notes;

//         try{
//             //find course and add student id to their studentenrolled property array
//             const enrolledCourse = await Course.findByIdAndUpdate({_id: courseId},  
//                                                                 {$push:{studentsEnrolled : userId}},  
//                                                                 {new:true}); 

//             if(!enrolledCourse)
//             {
//                 return res.status(500).json({
//                     success: false,
//                     message: 'could not find the course'
//                 })
//             }
//             console.log(enrolledCourse);



//             //find student and add course id to their course property array
//             const enrolledUser = await User.findByIdAndUpdate({_id: userId},
//                                                             {$push: {courses: courseId}},
//                                                             {new:true})

//             console.log(enrolledUser);



//             //send confirmaiton email to student
//             const emailResponse = await mailSender(enrolledUser.email, 
//                                                     "congratulation from Hacktech", 
//                                                     courseEnrollmentEmail(enrolledUser.firstname, enrolledCourse.courseName));

//             console.log(emailResponse);

//             //return response
//             return res.status(200).json({
//                 success:true,
//                 message: 'signature varified and course enrolled successfully',
//             })





//         }catch(error){
//             return res.status(500).json({
//                 success: false,
//                 message: error.message
//             })
//         }

//     }else{
//         return res.status(400).json({
//             success: false,
//             message: 'invalid signature'
//         })
//     }




// }

// module.exports = {capturePayment, varifySignature}












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
                receipt: `${Date.now()}${Math.random().toString(36).substring(2, 9)} }`      //1. Math.random():
                // Generates a random floating-point number between 0 (inclusive) and 1 (exclusive), such as 0.123456789.

                //2. .toString(36):
                // Converts the random number to a base-36 string. Base-36 uses digits 0-9 and letters a-z.
                // For example, 0.123456789.toString(36) might produce "0.1zsdpxt3".

                //3. .substring(2, 9):
                // Takes a substring starting from the 3rd character (index 2) and extracts the next 9 characters.
                // This effectively removes the 0. part of the string and captures the following 9 characters.
                // Example: "0.1zsdpxt3".substr(2, 9) results in "1zsdpxt3".
                // Example Outputs
                // Here are some example outputs of the combination of Date.now() and Math.random().toString(36).substr(2, 9):
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