import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'
 
import { createRating } from '../../../services/operations/courseDetailsAPI';
import ReactStars from "react-rating-stars-component";

const CourseReviewModal = ({setReviewModal}) => {

  const {user} = useSelector((state) => state.profile);
  const {token} = useSelector((state) => state.auth); 
  const {courseEntireData} = useSelector((state) => state.viewCourse);


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },

  } = useForm();



  useEffect(()=>{
    setValue('courseExperience', '');
    setValue('courseRating', 0);
  },[])



  const ratingChanged = (newRating) => {
      setValue('courseRating', newRating);
  }






  const onSubmit = async (data) => {
      await createRating(
        {
          courseId:courseEntireData._id,
          rating:data.courseRating,
          review:data.courseExperience,
        },
        token,
      )

      setReviewModal(false)
  }


  return (
    <div className='flex justify-center text-white'>
        <div className='border flex flex-col items-center  '>
          {/* model header */}
          <div>
            <p>Add Reviews</p>
            <button
                onClick={()=>setReviewModal(false)}>
                Close
            </button>


          </div>

          {/* modal  body */}
          <div>

            <div>
              <img
                src={user?.image}
                alt='user Image'
                className='aspect-square w-[50px] rounded-full object-cover'
              />

              <div>
                <p>{user?.firstname}</p>  <p>{user?.lastname}</p>
                <p>Posting Publicly</p>
              </div>

            </div>



            <form onSubmit={handleSubmit(onSubmit)}
                  className='mt-6 flex flex-col items-center'
            >
              <ReactStars
                count={5}
                size={24}
                activeColor='#ffd700'
                onChange={ratingChanged}
              />


              <div>
                <label>Add Your Experience<sup>*</sup></label>
                <textarea
                  id='courseExperience'
                  placeholder='Add your experience here'
                  {...register("courseExperience",{required:true})}
                  className='form-style min-h-[103px] w-full'
                />
                {
                  errors.courseExperience && (
                    <span>Add your valuable experience</span>
                  )
                }
              </div>
            

              {/* cancel and save button */}
              <div>
                <button onClick={()=> setReviewModal(false)}>
                  Cancle
                </button>


                <button type='submit'>
                  Save
                </button>
              </div>


            </form>
          </div>
        </div>
    </div>
  )
  
}

export default CourseReviewModal