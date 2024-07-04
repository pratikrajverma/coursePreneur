import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CurrentTimeDisplay } from 'video-react';
import { IoIosArrowUp } from "react-icons/io";


const VideoDetailsSlider = ({ setReviewModal }) => {


  const [activeStatus, setActiveStatus] = useState('');
  const [videobarActive, setVideobarActive] = useState('');

  const navigate = useNavigate();
  const { sectionId, SubsectionId } = useParams();
  const location = useLocation()

  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOfLectures,
  } = useSelector((state) => state.viewCourse || {});




  const handleReviewModal = ()=>{
    console.log('add review babay')
    setReviewModal(true);
  }
  




  useEffect(() => {


    const setActiveFlags = () => {



      if (!courseSectionData) {
        return;

      }

      const currentSectionIndex = courseSectionData?.findIndex(
        (data) => data._id === sectionId
      )

      const currentSubsectionIndex = courseSectionData[currentSectionIndex]?.Subsection?.findIndex(
        (data) => data._id === SubsectionId
      )

      const activeSubsectionId = courseSectionData[currentSectionIndex]?.Subsection[currentSubsectionIndex]?._id

      //set current section 
      setActiveStatus(courseSectionData[currentSectionIndex]?._id);

      //set current sub - section 
      setVideobarActive(activeSubsectionId);

    }



    setActiveFlags();

  }, [courseSectionData, courseEntireData, location.pathname])





  return (
    <div className='w-[20%]    bg-richblack-800 text-white h-screen flex flex-col'>

      <div className='flex flex-col pt-10 gap-y-6'>
        {/*............... for heading............... */}
        <div className='flex gap-4 justify-between px-5' >
          <p className='  font-semibold'>{courseEntireData?.courseName}</p>
          <p className='text-caribbeangreen-200 font-semibold'>{completedLectures?.length} / {totalNoOfLectures}</p>
        </div>


        {/*............... for button  ...............*/}
        <div className='flex gap-3   justify-center '>
          <button onClick={() => { navigate('/dashboard/enrolled-courses') }} className='videoBtn' >
            Back
          </button>


          <button onClick={ handleReviewModal} className='videoBtn'>
            Add Review
          </button>

        </div>

        <hr className='mx-2 bg-gray-300' />

      </div>


      {/* for sections and subsection */}
      <div className='mt-5  '>
        {
          courseSectionData?.map((section, index) => (
            <div key={index}
              onClick={() => setActiveStatus(section._id)}
            >
              {/*.......... section ...............*/}
              <div className='  py-4 bg-richblack-700 flex justify-between px-3'>
                <div>
                  {section.sectionName}
                </div>

                <div className='flex gap-3 items-center'>
                  <p>5min</p>
                  <IoIosArrowUp />
                </div>

              </div>


              {/*......... sub section ...........*/}
              <div className=''>
                {
                  activeStatus === section._id && (

                    <div>
                      {
                        section.Subsection?.map((topic, index) => (
                          <div key={index}
                            className={`flex gap-3 py-1 px-4 ${videobarActive === topic._id
                              ? 'bg-yellow-100 text-black'
                              : 'bg-gray-600 text-white'} `}
                            onClick={() => {
                              navigate(`/view-course/${courseEntireData._id}/section/${section._id}/sub-section/${topic._id}`)
                              setVideobarActive(topic._id);
                            }}
                          >

                            <input type="checkbox"
                              checked={completedLectures.includes(topic._id)}
                            />

                            <span>{topic.title}</span>

                          </div>
                        ))
                      }
                    </div>
                  )
                }
              </div>



            </div>
          ))
        }
      </div>



    </div>
  )
}

export default VideoDetailsSlider