
import toast from 'react-hot-toast';
import { studentEndpoints } from '../apis'
import { apiConnector } from '../apiconnector'
import rzpLogo from '../../assets/Logo/Logo-Full-Dark.png'
import { setPaymentLoading } from '../../slices/courseSlice'
import { resetCart } from '../../slices/cartSlice'

const { COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API } = studentEndpoints;

 
function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;

        script.onload = () => {
            resolve(true);
        };

        script.onerror = () => {
            resolve(false);
        };

        document.body.appendChild(script);
    })
}



export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
    const toastId = toast.loading('Loading....')
    try {

        //load the script
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

        if (!res) {
            toast.error('Razorpay sdk failed to load ');
            return;
        }



        //initiate the order
        const orderResponse = await apiConnector('POST', COURSE_PAYMENT_API, { courses }, {
            authorization: `Bearer ${token}`,
        })

        if (!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }

        // console.log('orderresponse: ', orderResponse)



        const options = {
            key: process.env.RAZORPAY_KEY_ID,
            currency: orderResponse.data.paymentResponse.currency,
            amount: `${orderResponse.data.paymentResponse.amount}`,
            order_id: orderResponse.data.paymentResponse.id,
            name: "StudyNotion",
            description: 'Thank you for purchasing this course',
            image: rzpLogo,
            profile: {
                name: `${userDetails.firstname}`,
                email: userDetails.email,
            },

            handler: function (response) {
                // console.log('response of handler',response)

                //send successful wala mail
                  sendPaymentSuccessEmail(response, orderResponse.data.paymentResponse.amount, token)
                //verify payment
                verifyPayment({ ...response, courses }, token, navigate, dispatch)

            } 
        }

        const paymentObject = new window.Razorpay(options);

        paymentObject.open();

        paymentObject.on("payment.failed", function(response) {
            toast.error('your payment is failed')
            console.log('error', response);
        })



    } catch (error) {
        console.log('PAYMENT_API_ERROR', error);
        toast.error('Could not make payment');
    }

    toast.dismiss(toastId)
}


async function sendPaymentSuccessEmail(response, amount, token) {
    try {
        // console.log('response', response)
        await apiConnector('POST',
            SEND_PAYMENT_SUCCESS_EMAIL_API,
            {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                amount,
            },
            {
                authorization: `Bearer ${token}`
            }
        )
    } catch (error) {
        console.log('PAYMENT_SUCCESS_EMAIL_ERROR', error);
    }
}


//VERIFY PAYMENT
async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading('Verify payment....');


    dispatch(setPaymentLoading(true));

    
    try {
        const response = await apiConnector('POST', COURSE_VERIFY_API, bodyData, {
            authorization: `Bearer ${token}`
            })

            console.log('verify payment',response);
            
            if (!response.data.success) {
                throw new Error(response.data.message);
                }
                
        toast.success('Payment successful, Your have enrolled the course...')

        navigate('/dashboard/enrolled-courses')

        dispatch(resetCart());
    } catch (error) {
        console.log('PAYMENT_VERIFY_ERROR', error)
        toast.error('Could not verify payment')

    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}