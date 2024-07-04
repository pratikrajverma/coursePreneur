import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import copy from 'copy-to-clipboard'
import {ACCOUNT_TYPE } from '../../../utils/constants'
import { addToCart } from '../../../slices/cartSlice'

const CourseDetailsCard = ({ course, setConfirmationModal, handleBuyCourse }) => {

  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice,
  } = course

  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleAddToCart = () => {
       if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
        toast.error('you are Instructor, you cant buy a course 😅')
        return;
       }

       if(token){
        dispatch(addToCart(course));
        return;
       }

       setConfirmationModal({
        text1:'Your are not logged in',          
        text2:'please login to continue',
        btn1text: "Login",
        btn2text: "Cancel",
        btn1Handler: () => navigate('/login'),
        btn2Handler: () => setConfirmationModal(null),
       })
  }


  const handleShare = () => {
    copy(window.location.href)
    toast.success('Link Copied')
  }


  return (
    <div className='bg-richblack-700 rounded-md p-4 flex flex-col gap-4  '>
      <img
        src={ThumbnailImage}
        alt='Thumbnail missing 😅'
        className='max-h-[300px] min-h-[180px] w-[300px] rounded-xl border p-2 text-yellow-25 font-semibold text-xl'
      />

      <div className='text-xl font-semibold pl-3'>
        ₹ {CurrentPrice}  
      </div>

      
      <div className='flex flex-col gap-4'>
        {/* ...............Buy button........ */}
          <button onClick={() => {
              user && course.studentsEnrolled.includes(user?._id) ? navigate('/dashboard/enrolled-courses')
                : handleBuyCourse();
            }}
            className='bg-yellow-100 text-black active:scale-95 font-semibold py-1 mx-4 rounded-md'
          >
            {
              user && course.studentsEnrolled.includes(user?._id) ? 'Go to Course' : 'Buy Now'
            }

          </button>

        {/* ...............Add to Cart button........ */}
            
            {
              !course.studentsEnrolled.includes(user?._id) && (
                <button onClick={handleAddToCart}
                        className='bg-richblack-900 active:scale-95 text-white font-semibold py-1 mx-4 rounded-md'
                >
                    Add to Cart
                </button>
              )
            }
        


      </div>


      <div>
        <p>30-Days Money Back Guarantee</p>
        <p>This Course Includes : </p>

        <div>
          {
            course.instructions?.map((items,index)=>(
              <p key={index} className='flex gap-2'>
                <span>{items}</span>
                
              </p>
            ))
          }
        </div>

      </div>

      {/* share button */}
      <div>
        <button onClick={handleShare}
                className='text-yellow-25 '
        >
          Share course
        </button>
      </div>



    </div>
  )
}

export default CourseDetailsCard