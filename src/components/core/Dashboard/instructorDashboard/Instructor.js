import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { getInstructorData } from '../../../../services/operations/profileAPI';
import { Link } from 'react-router-dom';
import InstructorChart from './InstructorChart';


const Instructor = () => {

    const { token } = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState(null);
    const [courses, setCourses] = useState([]);
    const { user } = useSelector((state) => state.profile)

    useEffect(() => {
        const getCourseDataWithStats = async () => {
            setLoading(true);


            const instructorDataStats = await getInstructorData(token)

            const result = await fetchInstructorCourses(token)



            if (instructorDataStats.length)
                setInstructorData(instructorDataStats);


            if (result) {
                setCourses(result);
            }

            setLoading(false);


        }

        //.............function calling.............

        getCourseDataWithStats();


    }, [])


    const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0)
    const totalStudent = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0)

    return (
        <div className='text-white'>
            <div>
                <h1>Hi {user?.firstname}</h1>
                <p>Let's start somthing new</p>
            </div>

            {
                loading ? (<div className='spinner'></div>)
                    : (
                        courses?.length > 0 ?
                            (<div>
                                <div>
                                    <div>
                                        <InstructorChart courses={instructorData} />
                                        <div>
                                            <p>Statistics </p>
                                            <div>
                                                <p>Total Course</p>
                                                <p>{courses?.length}</p>
                                            </div>

                                            <div>
                                                <p>Total Student</p>
                                                <p>{totalStudent}</p>
                                            </div>

                                            <div>
                                                <p>Total Income</p>
                                                <p>{totalAmount}</p>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div>
                                    {/* Render 3 courses */}
                                    <div>
                                        <p>Your Courses</p>
                                        <Link to='/dashboard/my-courses'>
                                            <p>View all</p>
                                        </Link>
                                    </div>
                                    <div>
                                        {
                                            courses?.slice(0,3).map((course)=>(
                                                <div key={course?._id}>
                                                    <img
                                                        src={course?.thumbnail}
                                                    />
                                                    <div>
                                                        <p>{course?.courseName}</p>
                                                        <div>
                                                            <p>{course?.studensEnrolled?.length}</p>
                                                            <p>|</p>
                                                            <p>₹ {course?.price}</p>
                                                        </div>
                                                    </div>

                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>) 

                            :  (<div>
                                    <p>your have not created any course</p>
                                    <Link to={'dashboard/add-course'}>
                                        create a new course
                                    </Link>
                                </div>)
                    )

            }

        </div>
    )
}

export default Instructor

