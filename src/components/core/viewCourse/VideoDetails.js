import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Player } from 'video-react';
import { FaRegPlayCircle } from 'react-icons/fa'
// import '~video-react/styles/scss/video-react';
import "video-react/dist/video-react.css"
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';


const VideoDetails = () => {


  const { courseId, sectionId, SubsectionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const playerRef = useRef();
  const { token } = useSelector((state) => state.auth);
  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOfLectures,
  } = useSelector((state) => state.viewCourse || {});

  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setVideoSpecificDetails = () => {
      if (!courseSectionData?.length) {
        return;
      }

      if (!courseId && !sectionId && !SubsectionId) {
        navigate('/dashboard/enrolled-courses');;
      }
      else {
        const filteredData = courseSectionData.filter((course) => {
          return course._id === sectionId
        })

        const filteredVideoData = filteredData?.[0]?.Subsection?.filter((video) => (
          video._id === SubsectionId
        ))

        if (filteredVideoData?.length > 0) {
          setVideoData(filteredVideoData[0]);
          setVideoEnded(false)
        }

      }
    }

    setVideoSpecificDetails();

  }, [courseSectionData, courseEntireData, location.pathname]);





  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => (
      data._id === sectionId
    ))

    const currentSubsectionIndex = courseSectionData[currentSectionIndex].Subsection.findIndex((data) => (
      data._id === SubsectionId
    ))

    if (currentSectionIndex === 0 && currentSubsectionIndex === 0) {
      return true;
    } else {
      return false;
    }
  }

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => (
      data._id === sectionId
    ))

    const noOfSubSections = courseSectionData[currentSectionIndex].Subsection.length;

    const currentSubsectionIndex = courseSectionData[currentSectionIndex].Subsection.findIndex((data) => (
      data._id === SubsectionId
    ))

    if (currentSectionIndex === courseSectionData.length - 1 &&
      currentSubsectionIndex === noOfSubSections - 1) {
      return true;
    } else {
      return false;
    }


  }

  const goToNextVideo = () => {

    const currentSectionIndex = courseSectionData.findIndex((data) => (
      data._id === sectionId
    ))

    const noOfSubSections = courseSectionData[currentSectionIndex].Subsection.length;

    const currentSubsectionIndex = courseSectionData[currentSectionIndex].Subsection.findIndex((data) => (
      data._id === SubsectionId
    ))


    if (currentSubsectionIndex !== noOfSubSections - 1) {
      const nextSubsectionId = courseSectionData[currentSectionIndex].Subsection[currentSubsectionIndex + 1]._id;
      //next video par jaoo
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubsectionId}`)
    }
    else {
      //different section ki first video
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const nextSubsectionId = courseSectionData[currentSectionIndex + 1].Subsection[0]._id;
      //next video par jaoo
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubsectionId}`)
    }


  }

  const goToPreviousVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => (
      data._id === sectionId
    ))

    const noOfSubSections = courseSectionData[currentSectionIndex].Subsection.length;

    const currentSubsectionIndex = courseSectionData[currentSectionIndex].Subsection.findIndex((data) => (
      data._id === SubsectionId
    ))


    if (currentSubsectionIndex !== 0) {
      //same section previous video
      const prevSubsectionId = courseSectionData[currentSectionIndex].Subsection[currentSubsectionIndex - 1];
      //is video par chale jaoo
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubsectionId}`)
    } else {
      //different section last video
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const prevSubsectionId = courseSectionData[currentSectionIndex - 1].Subsection[courseSectionData[currentSectionIndex - 1].Subsection.length - 1]._id;
      //is video par chale jaoo
      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubsectionId}`)
    }
  }

  const handleLectureCompletion = async() => {
    const checkedCourse = await markLectureAsComplete({courseId, SubsectionId}, token);

    if (checkedCourse) {
      dispatch(updateCompletedLectures(SubsectionId));
    }

    setVideoEnded(true);
    setLoading(false);
    
  }





  return (
    <div className='border h-full text-white flex flex-col gap-y-10'>
      {
        !videoData ? (<div>No Vidoe found</div>) : (
          <Player
            ref={playerRef}
            aspectratio='16:9'
            playsInline
            onEnded={() => setVideoEnded(true)}
            src={videoData?.videoUrl}
          >
            <FaRegPlayCircle />

            {
              videoEnded && (
                <div>
                  {
                    !completedLectures.includes(SubsectionId) && (

                      <button disabled={loading}
                        onClick={() => handleLectureCompletion()}

                        className='videoBtn' >
                        {
                          !loading ? 'mark as completed' : 'Loading.....'
                        }

                      </button>
                    )
                  }

                  <button disabled={loading}
                    onClick={() => {
                      if (playerRef?.current) {
                        playerRef.current?.seek(0);
                        setVideoEnded(false);
                      }
                    }}
                    className='videoBtn'
                  >
                    Rewatch
                  </button>

                  <div className='flex border p-4'>
                    {
                      !isFirstVideo() && (
                        <button
                          disabled={loading}
                          onClick={goToPreviousVideo}
                          className='videoBtn'
                        >
                          Prev
                        </button>
                      )
                    }


                    {
                      !isLastVideo() && (
                        <button
                          disabled={loading}
                          onClick={goToNextVideo}
                          className='videoBtn'
                        >
                          Next
                        </button>
                      )
                    }
                  </div>
                </div>
              )
            }
          </Player>
        )
      }


      <div>
        <h1>
          {videoData?.title}
        </h1>

        <p>{videoData?.description}</p>
      </div>
    </div>

  )
}

export default VideoDetails