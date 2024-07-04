import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import RequirementField from './RequirementField'
import {setStep,  setCourse} from '../../../../../slices/courseSlice';
import {toast} from 'react-hot-toast';
import IconBTN from '../../../../common/IconBtn'

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  
  const {token} = useSelector((state) => state.auth); 

  const dispatch = useDispatch();

  const { course, editCourse } = useSelector((state) => state.course);

  const [loading, setLoading] = useState(false);

  const [courseCategories, setCourseCategories] = useState([]);

  // const {step} = useSelector((state) => state.course);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories();
      if (categories.length > 0) {
        setCourseCategories(categories);
      }
      setLoading(false);
    }

    if (editCourse) {
      setValue('courseTitle', course.courseName);
      setValue('courseShortDesc', course.courseDescription);
      setValue('coursePrice', course.price);
      setValue('courseCategory', course.category);
      setValue('courseTags', course.tag);
      setValue('courseImage', course.Thumbnail);
      setValue('courseBenefits', course.whatYouWillLearn);
      setValue('courseRequirements', course.instructions);
    }

    getCategories();
  }, [])


  const isFormUpdated = () => {
    const currentValues = getValues();

    if (currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.coursePrice ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      // currentValues.courseImage !== course.Thumbnail ||
      currentValues.courseRequirements.toString() !== course.instructions.toString()
    )
      return true;
    else
      return false;
  }




  // handle next button click
  const onSubmit = async (data) => {
    // console.log(data);
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();
        formData.append("courseId", course._id);

        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc);
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory);
        }
        if (currentValues.courseRequirements.toString() !== course.instructions.toString()) {
          formData.append("instructions", JSON.stringify(data.courseRequirements));
        }

        setLoading(true);
        const result = await editCourseDetails(formData, token)
        setLoading(false);
        if (result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }

      }
      else {
        toast.error('no changes to this form');
      }
    }



    const formData = new  FormData();
    formData.append('courseName', data.courseTitle);
    formData.append('courseDescription', data.courseShortDesc);
    formData.append('whatYouWillLearn', data.courseBenefits);
    formData.append('price', data.coursePrice);
    // formData.append('tag', data.tag); 
    formData.append('category', data.courseCategory);
    // formData.append('status', COURSE_STATUS.DRAFT); 
    formData.append('instructions', JSON.stringify(data.courseRequirements));

    setLoading(true);
    const result = await addCourseDetails(formData, token);
    // console.log('ye he course ka result: ' + result);

    if(result){
      dispatch(setStep(2))
      dispatch(setCourse(result));
      // console.log('step2 dispatch ho gaya he',step);
    }

    setLoading(false);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}
        className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8'
      >
        {/* course Title */}
        <div>
          <label>Course Title<sup>*</sup></label>
          <input
            id='courseTitle'
            placeholder='Enter Course Title'
            {...register("courseTitle", { required: true })}
            className='w-full text-black'
          />
          {
            errors.courseTitle && (
              <p className='text-red-700 '>Course Title is required</p>
            )
          }
        </div>

        {/*course short discription  */}
        <div>
          <label>Course Short Description<sup>*</sup></label>
          <textarea
            id='courseShortDesc'
            placeholder='Enter Course Short Description'
            {...register("courseShortDesc", { required: true })}
            className='w-full text-black'
          />
          {
            errors.courseShortDesc && (
              <p className='text-red-500'>Course Short Description is required</p>
            )
          }
        </div>

        {/*Course price  */}
        <div className='relative '>
          <label>Course Price<sup>*</sup></label>
          <input
            id='coursePrice'
            placeholder='Enter Course Price'
            {...register("coursePrice", { required: true, valueAsNumber: true })}
            className='w-full px-8 text-black'
          />

          <HiOutlineCurrencyRupee className='absolute top-7 left-2 text-black ' />

          {
            errors.coursePrice && (
              <p className='text-red-500'>Course Price is required</p>
            )
          }
        </div>

        {/*Course Category */}
        <div>
          <label>Course Category<sup>*</sup></label>
          <select
            id='courseCategory'
            defaultValue=""
            {...register("courseCategory", { required: true })}
          >
            <option value="" disabled>Choose a Category</option>

            {
              !loading && courseCategories.map((category, index) => (
                <option key={index} value={category._id}
                  className='text-black'
                >
                  {category.name}
                </option>
              ))
            }
          </select>
          {
            errors.courseCategories && (
              <span className='text-red-500'>Course category id required</span>
            )
          }

        </div>


        {/* Course Tags */}
        <div>
          {/* <ChipInput
              labels = 'Tags'
              name = 'CourseTags'
              placeholder = 'Enter Tags and Press Enter'
              register={register}
              errors = {errors}
              setValue={setValue}
              getValues={getValues}
            /> */}
        </div>


        {/* create component for uploading and showing preview of media */}
        <div>
          {/* <Upload
                name = ''
                label = ''
                register={register}
                errors = {errors}
                setValue={setValue}
              /> */}
        </div>

        {/* Benefit of course */}
        <div>
          <label>Benefits of Course<sup>*</sup></label>
          <textarea
            id='courseBenefits'
            placeholder='Enter Benefits of Course'
            {...register("courseBenefits", { required: true })}
            className='w-full text-black'
          />
          {
            errors.courseBenefits && (
              <p className='text-red-500'>Benefits of Course is required</p>
            )
          }
        </div>


        {/* requirement fields for course */}
        <div>
          <RequirementField
            name='courseRequirements'
            labels='Requirements/Instructions'
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
          />
        </div>


        <div>
          {
            editCourse && (
              <button
                onClick={() => dispatch(setStep(2))}
                className='flex items-center gap-x-2 bg-richblack-300'
              >
                Continue without Saving
              </button>
            )

          }

          <IconBTN type="submit" text={!editCourse ? 'Next' : 'Save changes'} />  

        </div>
      </form>
    </div>
  )
}

export default CourseInformationForm