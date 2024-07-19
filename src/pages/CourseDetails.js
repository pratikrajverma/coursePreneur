import React, { useEffect, useState } from 'react'
import { buyCourse } from '../services/operations/studentFeaturesAPI'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
// import { toast } from 'react-hot-toast'
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI'
import GetAvgRating from '../utils/avgRating'

// import Error from '../pages/Error'
import ConfirmationModal from '../components/common/ConfirmationModal';
import RatingStars from '../components/common/RatingStars';

import { formatDate } from '../services/formatDate'
import CourseDetailsCard from '../components/core/course/CourseDetailsCard'


const CourseDetails = () => {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { loading } = useSelector((state) => state.profile)
  const { paymentLoading } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams()
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [isActive, setIsActive] = useState(Array(0));

  const handleActive = (id)=>{
      setIsActive(
        !isActive.includes(id)
        ? isActive.concat(id)
        :isActive.filter((e)=> e != id)
      )
  }




  //.............course data for buyer.............................

  const [courseData, setCourseData] = useState(null);



  const getCourseFullDetails = async () => {
    try {
      const result = await fetchCourseDetails(courseId)
      setCourseData(result)

    } catch (error) {
      console.log('could not fetch course details')
    }
  }



  useEffect(() => {

    getCourseFullDetails();

  }, [courseId])




  //................avg. rating......................

  const [avgRatingCount, setAvgRatingCount] = useState(0);

  useEffect(() => {

    const count = GetAvgRating(courseData?.ratingAndReview);
    setAvgRatingCount(count)

  }, [courseData])





  //..................total no of lecture..............

  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)

  useEffect(() => {

    let lectures = 0;
    courseData?.courseContent?.forEach((sec) => {
      lectures += sec.Subsection.length || 0;

    })

    setTotalNoOfLectures(lectures);

  }, [courseData])





  const handleBuyCourse = () => {

    if (token) {

      buyCourse(token, [courseId], user, navigate, dispatch)
      return;
    }

    setConfirmationModal({
      text1: "You are not logged in",
      text2: "please login to purchase",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate('/Login'),
      btn2Handler: () => setConfirmationModal(null),

    })


  }




  if (loading || !courseData) {
    return (
      <div>
        Loading......
      </div>
    )
  }



  //.........return error if course data is not fetched..........
  // if (courseData) {
  //   return (
  //     <div>
  //       <Error/>
  //     </div>
  //   )
  // }




  const {
    _id: course_id,
    courseName,
    courseDescription,
    
    instructor,
    whatYouWillLearn,
    courseContent,
    ratingAndReview,
 
   
    studentsEnrolled,
    createdAt
  } = courseData;



  return (
    <div className='flex flex-col text-white'>

      {/* Section 1 */}
      <div className='bg-richblack-800 py-20 px-52 relative flex flex-col gap-3  '>

        <p className='text-3xl font-semibold'>{courseName}</p>

        <p className='text-gray-300'>{courseDescription}</p>

        <div className='flex gap-3'>
          <span>{avgRatingCount}</span>
          <RatingStars />
          <spam>{`( ${ratingAndReview.length} reviews) `}</spam>
          <spam>{`( ${studentsEnrolled.length} Students enrolled) `}</spam>
        </div>


        <div>
          <p>Created By : {` ${instructor} `} </p>
        </div>


        <div className='flex gap-x-3'>
          <p>
            Created at {formatDate(createdAt)}
          </p>

          <p>
            {" "} English
          </p>
        </div>


        {/* ................. course card  ............ */}
        <div className=' absolute top-20 right-60'>
          <CourseDetailsCard
            course={courseData}
            setConfirmationModal={setConfirmationModal}
            handleBuyCourse={handleBuyCourse}

          />
        </div>

      </div>


      <div>
        <p>What You Will Learn</p>
        <div>
          {whatYouWillLearn}
        </div>
      </div>


      <div>
        <div>
          <p>Course Content</p>
        </div>

        <div className='flex justify-between'>
          <div className='flex gap-3'>
            <span>{courseContent.length} sections(s)</span>

            <span>{totalNoOfLectures.length} lecture(s)</span>

            <span>{courseData.totalDuration} total length</span>
          </div>

          <div>
            <button
              onClick={()=>setIsActive([])}
            >
                Collapse all Sections 
            </button>


          </div>
        </div>
      </div>






      {
        confirmationModal && <ConfirmationModal modalData={confirmationModal} />
      }
    </div>
  )
}

export default CourseDetails