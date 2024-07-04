import React from 'react'
import { useSelector } from 'react-redux'
import CourseInformationForm from './CourseInformationForm/CourseInformationForm'
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm'
import PublishCourse from './PublishCourse/PublishCourse'
import { FaCheck } from 'react-icons/fa'


const RenderSteps = () => {

    const { step } = useSelector((state) => state.course)
 

    const steps = [
        {
            id: 1,
            title: "Course Information"
        },
        {
            id: 2,
            title: "Course Builder"
        },
        {
            id: 3,
            title: "Publish"
        }
    ]


    return (
        <div className='flex flex-col gap-10 '>
            <div className='border'>
                {/* item id */}
                <div className='flex justify-between' >
                    {
                        steps.map((item) => (
                            <div key={item.id}>
                                <div className={`${step === item.id ? 'bg-yellow-900 border-yellow-50 text-yellow-50'
                                    : 'border-richblack-700 bg-richblack-800 text-richblack-300'}`}

                                >

                                    {
                                        step > item.id ? (<FaCheck />) : (item.id)
                                    }

                                </div>

                                {/* bad me karna he  */}
                                {/* {
                            item.id !== steps.length 
                        } */}
                            </div>
                        ))
                    }
                </div>

                {/* title */}
                <div className='flex justify-between'>
                    {steps.map((item) => (
                        <div key={item.id}>
                            <p>{item.title}</p>
                        </div>
                    ))}
                </div>

            </div>


            {/* course builder form */}
            <div className=' '>
                {
                    step === 1 && <CourseInformationForm />
                }
                {

                    step === 2 && <CourseBuilderForm />
                    
                }
                {
                    step === 3 && <PublishCourse/>
                }
            </div>

        </div>
    )
}

export default RenderSteps