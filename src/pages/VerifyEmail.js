import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OTPInput from 'react-otp-input'
import { sendOtp, signUp } from '../services/operations/authAPI'
import { useNavigate, Link } from 'react-router-dom'
  
 
const VerifyEmail = () => {
    const [otp, setOtp] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const { loading, signupData } = useSelector((state) => state.auth)

    useEffect(()=>{         
       if(!signupData) 
       {
        navigate('/signup')
       }
    },[])

    const handleOnSubmit = (e) => {
        e.preventDefault()
        const {
           
            firstname,
            lastname,
            email,
            password,
            confirmPassword,
            accountType,
             
        } = signupData;

        dispatch(signUp(firstname, lastname, email, password, confirmPassword, accountType,  otp, navigate));
    }

    return (
        <div>
            {
                loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className='text-yellow-300'>
                        <h1>Verify Email</h1>
                        <p>A verification code has been send to your email Enter the code below</p>

                        <form onSubmit={handleOnSubmit}>
                            <OTPInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderSeparator={<span>-</span>}
                                renderInput={(props) => <input {...props} />}
                                className='text-black'
                            />
                            <button type='submit'>
                                Verify Email
                            </button>
                        </form>

                        <div>
                            <div>
                                <Link to='/login'>
                                    <p>Back to Login</p>
                                </Link>
                            </div>

                            <button onClick={()=>dispatch(sendOtp(signupData.email))}> Resend it</button>
                        </div>


                    </div>
                )
            }
        </div>
    )
}

export default VerifyEmail