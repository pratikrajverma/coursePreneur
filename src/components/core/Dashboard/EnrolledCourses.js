import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import ProgressBar from '@ramonak/react-progress-bar';
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';


const EnrolledCourses = () => {

const { token } = useSelector((state) => state.auth)
const navigate  = useNavigate()
const [enrolledCourses, setEnrolledCourses] = useState(null);




    const getEnrolledCourses = async () => {
        try {
            const response = await getUserEnrolledCourses(token);
             setEnrolledCourses(response);
         
            
        }
        catch (error) {
            console.log('unable to fetch Enrolled Courses');
        }
    }
    
    
    useEffect(() => {
        getEnrolledCourses();
    }, [])




    return (
        <div>
            <div className='text-3xl'>Enrolled Courses</div>

            {
                !enrolledCourses ? (
                    <div>Loading...</div>
                ) : (
                    !enrolledCourses.length ? (<p>you have not any courses</p>) : (
                        <div className='border mt-20 rounded-md overflow-hidden border-gray-600'>
                            <div className='flex justify-between border-b border-gray-600 text-gray-200  bg-blue-900  p-2 lg:p-6'>
                                <p >Course Name</p>
                                <p >Durations</p>
                                <div className='  lg:w-[30%]'><p >Progress</p></div>
                            </div>

                            {/* showing course cards */}
                            {
                                enrolledCourses.map((course, index) =>
                                (
                                    <div key={index}
                                        className='flex hover:border-caribbeangreen-200 hover:border-2 hover:shadow-white flex-wrap justify-between border-b  border-gray-600   lg:h-[100px] lg:p-4 p-4'
                                    >
                                         
                                        <div className='w-[35%] flex lg:gap-4 cursor-pointer'
                                            onClick={() => {
                                                navigate(
                                                    `/view-course/${course._id}/section/${course.courseContent[0]._id}/sub-section/${course.courseContent[0].Subsection[0]}`
                                                )
                                            }}
                                        >
                                            <img src={course.thumbnail}
                                                className='border min-h-[70px] p-3  min-w-[70px] border-gray-700 aspect-square '
                                                alt='Image'
                                            />
                                            <div>
                                                <p className='lg:text-xl font-semibold'>{course.courseName}</p>
                                                <p className='text-sm text-gray-300'>{course.courseDescription.substr(0, 30)}.....</p>
                                            </div>
                                        </div>

                                        <div className='  w-[15%]'>
                                            {course.totalDuration}
                                        </div>

                                        <div className='   lg:w-[30%] my-4 gap-8 flex'>
                                            <div className='lg:w-[80%]'>
                                                <p>Progress : {course.progressPercentege || 0}</p>

                                                <ProgressBar
                                                    completed={course.progressPercentege || 0}
                                                    height='8px'
                                                    isLabelVisible={false}
                                                />
                                            </div>
                                            <BsThreeDotsVertical className='h-16 cursor-pointer' />
                                        </div>

                                    </div>
                                )
                                )
                            }
                        </div>

                    )
                )
            }
        </div>
    )
}

export default EnrolledCourses