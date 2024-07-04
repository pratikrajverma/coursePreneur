import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI'
import { setCourse } from '../../../../../slices/courseSlice';
import { RxCross2 } from "react-icons/rx";
import Upload from '../Upload';
import IconBtn from '../../../../common/IconBtn'


const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) => {


  // .................................. configure react use form..................................
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,

  } = useForm();


  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);


  useEffect(() => {

    if (view || edit) {
      setValue('LectureTitle', modalData.title);
      setValue('LectureDesc', modalData.description);
      setValue('LectureVideo', modalData.video);
    }

  }, [])


  const isFormUpdated = () => {
    const currentValues = getValues();
    if (currentValues.LectueTitle !== modalData.title ||
      currentValues.LectueDesc !== modalData.description ||
      currentValues.LectueVideo !== modalData.video) {
      return true
    } else {
      return false;
    }
  }


  //.......................... handling Edit subsections...........................................
  const handleEditSubsection = async () => {
    const currentValues = getValues();

    const formData = new FormData();

    formData.append('subsectionId', modalData._id);

    formData.append('sectionId', modalData.sectionId);


    if (currentValues.LectureTitle !== modalData.title) {
      formData.append('title', currentValues.LectureTitle);
    }

    if (currentValues.LectureDesc !== modalData.description) {
      formData.append('description', currentValues.LectureDesc);
    }

    if (currentValues.LectureVideo !== modalData.video) {
      formData.append('video', currentValues.LectureVideo);
    }

    setLoading(true);
 
    //API request
    const result = await updateSubSection(formData, token)

    if (result) {
      //TODO: bad me karenge
      const updateCourseSection = await course.courseContent.map((section)=>(
        section._id === modalData.sectionId ? result : section
      ))

     

      dispatch(setCourse({...course, courseContent: updateCourseSection }))
      console.log('updated course content', course);
    }

    setModalData(null);
    setLoading(false);


  }




  // ...........................handling on submit button.................................

  const onSubmit = async (data) => {
    if (view)
      return;

    if (edit) {
      // if (!isFormUpdated()) {
      //   toast.error('No changes made to this form')
      // } else {
      //   handleEditSubsection();
      // }
      // return;
      handleEditSubsection();
      return;

    }
  
    //..............creating subsection...............................................................e

    const formData = new FormData();
    formData.append('sectionId', modalData)
    formData.append('title', data.LectureTitle)
    formData.append('description', data.LectureDesc)
    formData.append('video', data.LectureVideo)
    setLoading(true);

    //API calling 
    const result = await createSubSection(formData, token);

    if (result) {
      //TODO: bad me karenge
      // console.log('subsection created',result);
      const updatedCourseContent = course.courseContent.map((section)=>(
          section._id === modalData ? result : section
      ))

      dispatch(setCourse({...course, courseContent: updatedCourseContent}))


      // console.log('updated course content', course);
    }


    setModalData(null);
    setLoading(false);
  }


  return (
    <div>

      <div>
        <div>
          <p>{view && 'Viewing'}  {add && 'adding'}   {edit && 'Editing'} Lecture</p>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross2 />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>

            <Upload
              name="LectureVideo"
              label="Lecture Video"
              errors={errors}
              register={register}
              required={true}
              setValue={setValue} 
              video={true}
              viewData={view ? modalData.video : null}
              editData={edit ? modalData.video : null}
            />

            <div>
              <label>Lecture Title</label>
              <input
                id='LectureTitle'
                placeholder='Enter Lecture Title'
                {...register('LectureTitle', {required:true})}
                className='w-full form-style  text-richblack-500 p-1 rounded-md font-semibold'
              />
              {errors.LectureTitle && (<span>
                Lecture Title is required
              </span>)}
            </div>


            <div>
              <label> Lecture Description </label>
              <textarea
                id='LectureDesc'
                placeholder='Enter Lecture Desc'
                {...register('LectureDesc',{required:true})}
                className='w-full form-style  text-richblack-500 p-1 rounded-md font-semibold'
              />
              {
                errors.LectureDesc  && (<span>
                  Lecture Description is required
                </span>)
              }
            </div>

            {
              !view && (
                <div>
                  <IconBtn
                    text={loading? 'Loading' : edit ? 'Save Changes' : 'Save'} 
                  />
                </div>
              )
            }




        </form>



      </div>

    </div>
  )
}

export default SubSectionModal