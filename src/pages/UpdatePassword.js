import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../services/operations/authAPI';
import { useLocation } from 'react-router-dom';
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link } from 'react-router-dom';



const UpdatePassword = () => {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    })

    const loading = useSelector((state) => state.auth.loading);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const location = useLocation()

    
    
    const handleOnChange = (e) => {
        setFormData((prevData) => {
            return {
                ...prevData,
                [e.target.name]: e.target.value
            }
        })
    }
    
    const { password, confirmPassword } = formData;
    

    const dispatch = useDispatch();
    const handleOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password, confirmPassword, token));
    }

    return (
        <div>
            {
                loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className='text-white'>
                        <h1>Choose new Password</h1>
                        <p>Almost done. Enter your new password and youre all set.</p>

                        <form onSubmit={handleOnSubmit}>
                            <label>
                                <p>New Password</p>
                                <input
                                    required
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    value={password}
                                    placeholder='enter your new password'
                                    onChange={handleOnChange}
                                    className='text-black'
                                />
                                <span onClick={()=>setShowPassword(!showPassword)}>
                                    {
                                        showPassword ? <IoEyeOutline fontSize={24} /> : <FaRegEyeSlash />

                                    }
                                </span>
                            </label>


                            <label>
                                <p>Confirm New Password</p>
                                <input
                                    required
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name='confirmPassword'
                                    value={confirmPassword}
                                    placeholder='enter your Confirm password'
                                    onChange={handleOnChange}
                                    className='text-black'
                                />

                                <span onClick={()=>setShowConfirmPassword(!showConfirmPassword)}>
                                    {
                                        showConfirmPassword ? <IoEyeOutline fontSize={24} /> : <FaRegEyeSlash />

                                    }
                                </span>
                            </label>

                            <button type='submit'>Reset password</button>
                        </form>

                        <div>
                            <Link to='/login'>
                                <p>Back to Login</p>
                            </Link>
                        </div>

                    </div>
                )
            }
        </div>
    )
}

export default UpdatePassword