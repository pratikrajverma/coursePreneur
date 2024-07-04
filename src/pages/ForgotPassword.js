import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {getPasswordResetToken} from '../services/operations/authAPI'

const ForgotPassword = () => {
    const [emailSent, setEmailsent] = useState(false);
    const [email, setEmail] = useState('');
    const loading = useSelector((state)=>state.auth.loading);
    const dispatch = useDispatch();

    const handleOnSubmit = (e)=>{
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailsent));       //getPasswordResetToken() function reducer ya Redux store ke pass nahi jata hai. Yeh function ek action creator hai jo Redux middleware ke sath integrate hota hai.  Jab aap dispatch(getPasswordResetToken(email, setEmailsent)); ko call karte hain, Redux middleware action creator function ko intercept karta hai. getPasswordResetToken() function ke andar aksar async tasks hote hain, jaise API calls ya dusre actions ko dispatch karna.  Jab ye task complete ho jata hai, tab ek ya multiple actions ko dispatch kiya jata hai, jisme se ek action Redux store ke through reducers tak pahuchta hai aur state ko update karta hai.
                                                                    //To summarize, getPasswordResetToken() function Redux middleware ke through process hota hai aur ultimately Redux store ke pass jata hai. Ye function async tasks ko handle karta hai aur phir actions ko dispatch karke Redux store ke through state ko update karne ka kaam karta hai.   
                                                                    //Q.what is Redux middleware ?
                                                                    // Redux middleware ek layer hota hai Redux ke architecture mein jo action ke dispatch hone se pehle aur reducers ko reach hone ke baad ke dauraan extra functionality ko add karta hai. Middleware Redux store aur application ke beech mein hota hai. Jab aap ek action ko dispatch karte hain, wo pehle middleware ke through pass hota hai, phir reducers tak pahunchta hai. Middleware actions ko intercept kar sakte hain, unhe modify kar sakte hain, aur phir reducers ko unhe handle karne ke liye pass kar sakte hain.
                                                                        //Ye sirf kuch examples hain, actual use cases depend karte hain application ke requirements aur architecture par. Redux ke ecosystem mein kai tarah ke middleware available hain jaise Redux Thunk, Redux Saga, aur Redux Logger, jo commonly use kiye jaate hain.


    }

  return (
    <div>
        {
            loading ? (
                <div>Loading...</div>
            ) 
            : (
                <div className='text-white'>
                    <h1 className='text-black'>
                        {
                            !emailSent ? "Reset your password" : "Check your email"
                        }
                    </h1>

                    <p>
                        {
                            !emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" 
                                        : `We have sent the reset email to ${email}`
                        }
                    </p>

                    <form onSubmit={handleOnSubmit}>
                        {
                            !emailSent && (
                                <label>
                                    <p>Email Address : </p>
                                    
                                    <input required
                                            type='email'
                                            name='email'
                                            value={email}
                                            placeholder='enter your email address'
                                            onChange={(e)=>setEmail(e.target.value)}
                                            className='text-black'
                                    />
                                </label>
                            )
                        }

                        <button type='submit'>
                            {
                                !emailSent ? "Reset  Password" : "Resend Email"
                            }
                        </button>

                        <div>
                            <Link to='/login'>
                                <p>Back to Login</p>
                            </Link>
                        </div>

                    </form>

                    

                </div>
            )
        }
    </div>
  )
}

export default ForgotPassword