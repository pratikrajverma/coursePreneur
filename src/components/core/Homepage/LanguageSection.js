 import React from 'react'
import { HighlightText } from './HighlightText'
import knowyourprogress from '../../../assets/Images/Know_your_progress.png'
import comparewithothers from '../../../assets/Images/Compare_with_others.png'
import planeyourlesson from '../../../assets/Images/Plan_your_lessons.png'
import CTAButton from './Button'
 
 const LanguageSection = () => {
   return (
     <div className='flex flex-col gap-5 mt-20'>
        <div className='text-4xl font-semibold text-center'>
          Your swiss knife for
          <HighlightText text={"learning any Language"}></HighlightText>
        </div>

        <div className='text-center text-richblack-600 mx-auto text-base  w-[70%]'>
            Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className='flex items-center justify-center mt-5 '>
            <img src={knowyourprogress} 
                className='object-contain -mr-32 '/>
            <img src={comparewithothers} 
                className='object-contain'/>
            <img src={planeyourlesson} 
                className='object-contain -ml-36'/>


        </div>

        <div className=' flex justify-center  '> <CTAButton active={"bg-yellow-100"} linkto={"login"}>Leran more</CTAButton></div>
                  
     </div>
   )
 }
 
 export default LanguageSection