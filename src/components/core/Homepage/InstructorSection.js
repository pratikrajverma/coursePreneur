import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png'
import { HighlightText } from './HighlightText'
import CTAButton from '../Homepage/Button';
import { FaArrowRight } from 'react-icons/fa6';

const InstructorSection = () => {
  return (
    <div className='flex ml-5 border border-richblack-500 gap-20   items-center   mt-16'>

        <div className='w-[50%]'>
            <img src={Instructor}/>

        </div>
        <div className='w-[50%] flex flex-col gap-10'>
            <div className='text-4xl font-semibold'>
                <p>Become an</p>
                <HighlightText text={"Instructor"}></HighlightText>
            </div>

            <p className='font-medium text-[16px] w-[80%] text-richblack-300 '>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>

            <div className='w-fit'>
                <CTAButton  active={"bg-yellow-100"} linkto={'signup'} >
                        <p className='flex items-center gap-2'>Start Teaching Today
                            <FaArrowRight/>
                        </p>
                </CTAButton>
            </div>


        </div>

        
    </div>
  )
}

export default InstructorSection