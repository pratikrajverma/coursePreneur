import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GetAvgRating from '../../../utils/avgRating'
import RatingStars from '../../common/RatingStars'


const MostSellingCourseCard = ({course}) => {

    const [avgRatingCount, setAvgRatingCount ] = useState(0)

    useEffect(()=>{
        const count = GetAvgRating(course?.ratingAndReview);
        setAvgRatingCount(count)
    },[course])

    const [bubble, setBubble] = useState('blue');

    useEffect(()=>{
        setTimeout(() => {
            
            bubble === 'red' ? setBubble('blue') : setBubble('red');
            
        }, 6000);
    })


  return (
    <div className='flex   justify-center  '>
        <Link to={`/courses/${course?._id} `}>
            <div className='box-border relative  hover:border-b-4  hover:border-b-yellow-200 border border-richblue-300 rounded-md transition-colors duration-200 min-h-[25rem] aspect-square p-3'>
                <div  className='h-[62%] border-4 border-gray-600 mb-2'>
                    <img src={course?.thumbnail}
                        alt='courses thumbnail missing '
                        className= 'h-[100%] text-red-600 p-5   rounded-xl object-cover'     
                     />

                </div>

                <div className='mt-6 flex flex-col gap-2'>
                    <p className='text-blue-200 font-semibold text-xl'>{course?.courseName}</p>
                    <p>{course?.instructor?.firstname}  {course?.instructor?.firstname} </p>

                    <div className='flex gap-4'>
                        <span>{avgRatingCount || 0}</span>
                        <RatingStars  Review_Count={avgRatingCount}  />
                        <span>{course?.ratingAndReview?.length} Rating</span> 
                    </div>
                    <p >Price <span className='text-caribbeangreen-100 font-medium'>₹{course?.price}</span></p>
                </div>


                        {/*  ..........bubble glow  .........  */}
                        <div className={`  ${bubble === 'blue' ? 'opacity-100  ' : 'opacity-0'}   absolute bottom-16 right-28 h-16 aspect-square bg-blue-300 blur-2xl transition-opacity  `}  style = {{transitionDuration:"9000ms"}}></div>
                        <div className={` ${bubble === 'red' ? 'opacity-70' : 'opacity-0'} absolute bottom-6 right-5 h-14 aspect-square bg-yellow-300 blur-xl transition-opacity  `} style={{ transitionDuration: '9000ms' }}></div>
            </div>

        </Link>


    </div>
  )
}

export default MostSellingCourseCard