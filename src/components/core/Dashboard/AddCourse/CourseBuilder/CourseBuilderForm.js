import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn';
import { FiPlusCircle } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
import NestedView from './NestedView'


const CourseBuilderForm = () => {

  const [editSectionName, setEditSectionName] = useState(null)
  const { course } = useSelector((state) => state.course)
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth)


  //useForm hook configuration
  const { register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();




  //Create section button or Edit Section button
  const onSubmit = async (data) => {
    setLoading(true);
    let result;

    //course section is editing...........................................
    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token);
    }
    else {
      // course section is creating........................................
      result = await createSection({
        sectionName: data.sectionName,
        courseId: course._id,
      }, token);
    }

    //update redux storage of course
    if (result) {
      dispatch(setCourse(result))
      setEditSectionName(null);
      setValue('sectionName', '');
    }

    setLoading(false);
  }




  // handle change in section name by updating editSectionName
  const handleChangeEditSectionName = (sectionId, sectionName) => {

    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }


    setEditSectionName(sectionId);
    setValue('sectionName', sectionName);
  }





  //cancel Edit button
  const cancelEdit = () => {
    setEditSectionName(null);
    setValue('sectionName', '');

  }



  // go back button
  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true))
  }



  //go Next button
  const goToNext = () => {
    if (course?.courseContent?.length === 0) {
      toast.error('Please enter atleast one section');
      return;
    }

    if (course?.courseContent?.some((section) => section?.Subsection?.length === 0)) {
      toast.error('Please enter atleast one subsection for each section');
      return;
    }

    dispatch(setStep(3));
    dispatch(setEditCourse(false))

  }

  return (
    <div className='text-white'>
      <p>Course Builder </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='sectionName'>Section Name<sup>*</sup></label>
          <input
            type='text'
            id='sectionName'
            placeholder='Add section name'
            {...register("sectionName", { required: true })}
            className='w-full form-style  text-richblack-500 p-1 rounded-md font-semibold'
          />
          {
            errors.sectionName && (
              <span>Section field is required</span>
            )
          }
        </div>

        {/* edit sectionName button */}
        <div className='mt-10 flex items-center gap-2 text-yellow-5 hover:border-caribbeangreen-400 border rounded-md  w-fit py-2 px-4 '>
          <button type="submit">
              {editSectionName ? 'Edit Section Name' : 'Create Section'}  

              <FiPlusCircle className='inline-block ml-2' />
          </button>


        </div>
        {
          editSectionName && (
            <button
              type='button'
              onClick={cancelEdit}
              className='text-sm text-richblack-300 underline'
            >
              Cancle Edit
            </button>
          )
        }
      </form>


      {/* nested section for sub-section creation */}

      {
        course.courseContent.length > 0 && (
          <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
        )
      }


      {/* back and next button */}
      <div className='flex gap-x-3 justify-end mt-10'>
        <button className='bg-yellow-100 text-black px-4 py-2 font-bold rounded-md'
          onClick={goBack}>
          Back
        </button>

        <button className='bg-yellow-100 text-black px-4 py-2 rounded-md font-bold'
          onClick={goToNext}>
          Next
        </button>
      </div>

    </div>
  )
}

export default CourseBuilderForm