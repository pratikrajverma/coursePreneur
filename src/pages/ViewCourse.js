import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import VideoDetailsSlider from '../components/core/viewCourse/VideoDetailsSlider';
import CourseReviewModal from '../components/core/viewCourse/CourseReviewModal';

const ViewCourse = () => {
  const [reviewModal, setReviewModal] = useState(false);
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const setCourseSpecificDetails = async () => {
      try {
        const courseData = await getFullDetailsOfCourse(courseId, token);

        dispatch(setCourseSectionData(courseData?.courseDetails.courseContent));
        dispatch(setEntireCourseData(courseData?.courseDetails));
        dispatch(setCompletedLectures(courseData?.completedVideos));

        let lectures = 0;
        courseData?.courseDetails.courseContent.forEach((sec) => {
          lectures += sec.Subsection.length || 0;
        });

        dispatch(setTotalNoOfLectures(lectures));
      } catch (error) {
        console.error("Failed to fetch course details:", error);
      }
    };

    setCourseSpecificDetails();
  }, [courseId, token, dispatch]);

  return (
    <div>
      <div className="flex">
        <VideoDetailsSlider setReviewModal={setReviewModal} />

        <div className="w-[70%] border text-white">
          <Outlet />
        </div>
      </div>

      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </div>
  );
};

export default ViewCourse;
