import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidDownArrow } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import SubSectionModal from './SubSectionModal'
import { setCourse } from '../../../../../slices/courseSlice'
import ConfirmationModal from '../../../../common/ConfirmationModal'
import { deleteSubSection } from '../../../../../services/operations/courseDetailsAPI'
import { deleteSection } from '../../../../../services/operations/courseDetailsAPI'





const NestedView = ({ handleChangeEditSectionName }) => {
    const { course } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth)

    const dispatch = useDispatch();


    const [addSubSection, setAddSubSection] = useState(null)
    const [viewSubSection, setViewSubSection] = useState(null)
    const [editSubSection, setEditSubSection] = useState(null)

    const [confirmationModal, setConfirmationModal] = useState(null)


    // delete section..............................
    const handleDeleteSection = async (sectionId) => {
        const result = await deleteSection({
            sectionId,
            courseId: course._id
        },
            token,
        )

        if (result) {
            dispatch(setCourse(result))
        }

        setConfirmationModal(null);
    }




    //delete sub-sections...........................
    const handleDeleteSubsection = async (subsectionId, sectionId) => {
        const result = await deleteSubSection(
            {
                subsectionId,
                sectionId,
            },
            token
        )

        if (result) {


            const updatedCourseContent = course.courseContent.map((section) => (
                section._id === sectionId ? result : section
            ))

            dispatch(setCourse({ ...course, courseContent: updatedCourseContent }))
        }

        setConfirmationModal(null)
    }




    return (
        <div className='mt-10'>
            <div className='rounded-lg bg-richblue-700 p-6 px-8'>

                {course?.courseContent?.map((section) => (

                    <details key={section._id} open >
                        <summary className='  border-b-[1px] border-richblack-600  mb-10'>
                            <div className='flex justify-between px-2 '>
                                <div className='flex items-center gap-2 pl-5'>
                                    <RxDropdownMenu className='text-xl' />
                                    <p className=' text-xl'>{section.sectionName}</p>

                                </div>

                                <div className='flex gap-3 items-center'>
                                    {/* edit button */}
                                    <button onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}
                                    >
                                        <MdEdit />
                                    </button>


                                    {/* delete button */}
                                    <button onClick={() => {
                                        setConfirmationModal({
                                            text1: "Delete this section",
                                            text2: "All the lectures of this sections will be deleted",
                                            btn1Text: "Delete",
                                            btn2Text: "Cancel",
                                            btn1Handler: () => handleDeleteSection(section._id),
                                            btn2Handler: () => setConfirmationModal(null)

                                        })
                                    }}
                                    >
                                        <RiDeleteBin6Line />
                                    </button>

                                    <span>|</span>

                                    {/* drowDown arrow symbol */}
                                    <BiSolidDownArrow />

                                </div>
                            </div>
                        </summary>



                        {/*....................................................(   subSection  )................................... */}
                        <div>
                            {

                                section.Subsection.map((data) => (
                                    <div key={data?._id}
                                       
                                        className='flex items-center justify-between border-b-[1px]  border-gray-500 mx-8 mt-10 px-4'
                                    >
                                        <div className='flex items-center   gap-2'
                                             onClick={() => setViewSubSection(data)}
                                        >
                                            <RxDropdownMenu />
                                            <p>{data?.title}</p>
                                        </div>

                                        <div className='flex gap-x-3 items-center'>
                                            {/* subsection Edit button */}
                                            <button
                                                onClick={() => setEditSubSection({ ...data, sectionId: section._id })}>
                                                <MdEdit />
                                            </button>


                                            {/* subseciton Delete button */}
                                            <button
                                                onClick={() => {
                                                    setConfirmationModal({
                                                        text1: "Delete this Sub-section",
                                                        text2: "selected lecture of this sections will be deleted",
                                                        btn1Text: "Delete",
                                                        btn2Text: "Cancel",
                                                        btn1Handler: () => handleDeleteSubsection(data._id, section._id),
                                                        btn2Handler: () => setConfirmationModal(null)

                                                    })
                                                }}
                                            >
                                                <RiDeleteBin6Line />
                                            </button>
                                        </div>

                                    </div>
                                ))




                            }
                        </div>



                        {/* subsection creating button */}
                        <div className='mx-8 mt-10 mb-5'>
                            <button onClick={() => setAddSubSection(section._id)}
                                className='mt-4 flex items-center gap-x-2 text-yellow-50'>
                                <FaPlus />
                                <p>Add Lecture</p>

                            </button>
                        </div>
                    </details>
                ))}
            </div>


            {
                addSubSection ? (
                    <SubSectionModal
                        modalData={addSubSection}
                        setModalData={setAddSubSection}
                        add={true}
                    />
                ) : viewSubSection ? (
                    <SubSectionModal
                        modalData={viewSubSection}
                        setModalData={setViewSubSection}
                        view={true}
                    />
                ) : editSubSection ? (
                    <SubSectionModal
                        modalData={editSubSection}
                        setModalData={setEditSubSection}
                        edit={true}
                    />
                ) : (
                    <div></div>
                )
            }


            {
                confirmationModal ? (<ConfirmationModal modalData={confirmationModal} />) : (<div></div>)
            }



        </div>
    )
}

export default NestedView