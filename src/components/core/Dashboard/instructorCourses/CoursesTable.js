import React, { useState } from 'react'
import {   useSelector } from 'react-redux'
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { COURSE_STATUS } from '../../../../utils/constants'
import ConfirmationModal from '../../../common/ConfirmationModal'
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import {  useNavigate } from 'react-router-dom';
// import { setCourse } from '../../../../slices/courseSlice'

const CoursesTable = ({ courses, setCourses }) => {

  // const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const navigate = useNavigate()

  const handleCourseDelete = async (courseId) => {
    setLoading(true);

    await deleteCourse({ courseId: courseId }, token);

    const result = await fetchInstructorCourses(token);

    if (result) {
      setCourses(result)
    }

    setConfirmationModal(null);

    setLoading(false);
  }


  return (
    <div>
      <Table>
        <Thead >
          <Tr className='flex gap-x-16   '>
            <Th className='  text-left flex-grow lg:max-w-[550px] text-xl'>Courses</Th>
            <Th>Duration</Th>
            <Th>Price</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>

        <Tbody>
          {
            courses?.length === 0 ? (
              <Tr><Td>No courses founded</Td></Tr>
            ) : (
              courses?.map((course) => (
                <Tr key={course?._id} className='flex gap-x-14 border border-richblue-400 mt-10 '>
                  <Td className='flex gap-x-4  flex-grow   lg:max-w-[550px]'>

                    <img src={course?.thumbnail}
                      className='h-[150px] aspect-square border-2 border-gray-400'
                    />  

                    <div className='flex flex-col '>
                      <p className='text-blue-100 text-2xl mb-3  font-semibold'>{course?.courseName}</p>
                      <p>{course?.courseDescription.substr(0,30)}</p>
                      <p className='text-blue-300 mt-2'>Created at : </p>

                      {
                        course?.status === COURSE_STATUS.DRAFT ? (
                          <p className='text-pink-50'>Drafted</p>
                        ) : (
                          <p className='text-yellow-50 text-sm'>Published</p>
                        )
                      }
                    </div>
                  </Td>

                  <Td className='pt-2'>
                    2hr 30 min
                  </Td>

                  <Td className='pt-2'>
                    ₹ {course?.price}
                  </Td>

                  <Td className='pt-2'>
                    <div className='flex gap-2'>
                      <button disabled={loading}
                        onClick={() => {
                          navigate(`/dashboard/edit-course/${course._id}`)
                        }}
                      >Edit</button>

                      <button disabled={loading} onClick={() => {
                        setConfirmationModal({
                          text1: 'Do you want to delete this course ?',
                          text2: 'All the data related to this course will be deleted',
                          btn1Text: 'Delete ',
                          btn2Text: 'Cancel',
                          btn1Handler: !loading ? () => handleCourseDelete(course?._id) : () => { },
                          btn2Handler: () => { setConfirmationModal(null) }

                        })

                      }}>
                        Delete
                      </button>
                    </div>

                  </Td>


                </Tr>
              ))
            )
          }
        </Tbody>

      </Table>


      {
        confirmationModal && <ConfirmationModal modalData={confirmationModal} />
      }
    </div>
  )
}

export default CoursesTable