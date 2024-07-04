import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../common/IconBtn'

const MyProfile = () => {
    const { user } = useSelector((state) => state.profile)
    const navigate = useNavigate()

    return (
        <div className='text-white w-full flex flex-col'>
            <h1 className='text-2xl'>My Profile</h1>


            <div className='flex flex-col gap-10'>
                {/* section 1 */}
                <div className=' flex justify-between p-6 mt-16 items-center rounded-md bg-richblack-800'>
                    <div className='flex gap-10 items-center'>
                        <img src={user.image}
                            alt={user.firstname}
                            className='aspect-square w-[78px] rounded-full object-cover' />

                        <div >
                            <p className='font-semibold'>
                                {user.firstname + " " + user.lastname}
                            </p>
                            <p>
                                {user.email}
                            </p>
                        </div>
                    </div>

                    <IconBtn
                        text="Edit"
                        onclick={() => {
                            navigate('/dashboard/settings');
                        }}
                    />

                </div>


                {/* section 2 */}
                <div className='  rounded-md bg-richblack-800 p-6  ' >
                    <div className='flex justify-between  '>
                        <p className='font-semibold'>
                            About
                        </p>

                        <div className='flex flex-col items-end gap-2'>
                            <IconBtn
                                text="Edit"
                                onclick={() => {
                                    navigate('/dashboard/settings');
                                }}
                            />
                            <p className=' text-red-400'>{user.additionDetails.about ? user.additionalDetails.about : <button onClick={() => navigate('/dashboard/settings')}>write somthing about yourself</button>}  </p>
                        </div>
                    </div>
                </div>



                {/* sextion 3  */}
                <div className=' rounded-md bg-richblack-800 flex flex-col p-7 pb-20 gap-10'>
                    <div className='flex justify-between'>
                        <p className='text-xl'>Personal Details</p>
                        <IconBtn
                            text="Edit"
                            onclick={() => {
                                navigate('/dashboard/settings');
                            }}
                        />

                    </div>

                    <div className='  w-4/6 flex justify-between  '>

                        <div className='flex flex-col gap-10'>

                            <div className=' '>
                                <p className='text-gray-400'>First Name</p>
                                <p className='font-bold text-xl text-blue-100'>{user.firstname}</p>
                            </div>

                         

                            <div>
                                <p className='text-gray-400'>Email</p>
                                <p className='font-bold text-xl text-blue-100'>{user.email}</p>
                            </div>



                        

                            <div>
                                <p className='text-gray-400'>Gender</p>
                                <p className='font-bold text-xl text-blue-100'>{user.additionDetails.gender}</p>
                            </div>

                        </div>



                        <div className='flex flex-col gap-10'>
                            <div>
                                <p className='text-gray-400'>Last Name</p>
                                <p className='font-bold text-xl text-blue-100'>{user.lastname}</p>
                            </div>

                       



                            <div>
                                <p className='text-gray-400'>Phone No</p>
                                <p className='font-bold text-xl text-blue-100'>{user.additionDetails.contactNumber ? '55' : 'XXX'}</p>
                            </div>



                             

                            <div>
                                <p className='text-gray-400'>Data of Birth</p>
                                <p className='font-bold text-xl text-blue-100'> {user.additionDetails.dateOfBirth}</p>
                            </div>


                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default MyProfile