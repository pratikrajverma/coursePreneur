import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../../common/IconBtn';
import { resetCourseState, setStep } from '../../../../../slices/courseSlice';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';
import {COURSE_STATUS} from '../../../../../utils/constants'
import { useNavigate } from 'react-router-dom';


const PublishCourse = () => {

  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const [loading, SetLoading] = useState(false);
  const navigate = useNavigate();

  //configure react use form
  const { register,
    handleSubmit,
    setValue,
    getValues,
  } = useForm();


  useEffect(()=>{
      if(course?.status === COURSE_STATUS.PUBLISHED){
        setValue('public',true);
      }
  },[])


  // go back function
  const goBack = () => {
      dispatch(setStep(2))
  }


  const goToCourse = ()=>{
    dispatch(resetCourseState())
    navigate('/dashboard/my-courses')
  }


  const handleCoursePublish = async () => {
    if(course?.status === COURSE_STATUS.PUBLISHED && getValues('public') === true || 
      (course?.status === COURSE_STATUS.PUBLISHED && getValues('public') === false)){
          //no updataion in form and no need to make api call
          goToCourse();
          return;
      } 

      //if form is updated
      const formData = new FormData();
      formData.append('courseId',course._id);
      const courseStatus = getValues('public') ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
      formData.append('status',courseStatus);

      SetLoading(true)
      const result = await editCourseDetails(formData, token)
  
      if(result){
        goToCourse()
      }

      SetLoading(false);
  }

  //submit function
  const onSubmit = () => {
    handleCoursePublish();
  }


  return (
    <div className='rounded-lg   border p-6 border-richblue-300'>
      <p className='text-2xl font-semibold'>Publish Course</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mt-4'>
          <label>
            <input type='checkbox'
              id='public'
              {...register('public')}
              className='h-4 w-4 rounded'
            />
            <span className='ml-2'>Make this course as Public</span>
          </label>
        </div>

        <div className='flex justify-end gap-6 mt-14'>
          <button
            onClick={goBack}
            type='button'
            className='hover:font-semibold w-10 not-italic'
            disabled={loading}  // iska matlab he ki jab bhi loading ki value true ho to button click nahi ho paye it means controller jab api call kar raha hoga to uss time button kam nahi karega
          >
            Back
          </button>

          <button className='bg-yellow-100 text-black px-4 py-2 rounded-md font-bold hover:scale-95'
            type='submit'>
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}

export default PublishCourse