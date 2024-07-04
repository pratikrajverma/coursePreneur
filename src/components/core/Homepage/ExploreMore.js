import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import { HighlightText } from './HighlightText';
import CourseCard from './CourseCard';


const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Carrwe paths",
];


//NOTE:  ye mera pending he samajne ke liye
const ExploreMore = () => {
    const [CurrentTab , setCurrentTab] = useState(tabsName[0]);
    const [courses, setcourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((courses) => courses.tag === value);
        setcourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading)
    }


    return (
        <div className='flex flex-col items-center border '>
            <div className='text-4xl font-semibold text-center '>Unlock the
                <HighlightText text={'Power of Code'}></HighlightText>
            </div>

            <p className='text-center text-richblack-400 text-sm mt-3'>
                Learn to Build Anything You Can Imagine
            </p>

            <div className='flex rounded-full bg-richblack-800 my-10 p-1'>
                {
                    tabsName.map((element, index) => {
                        return (
                            <div className={` text-[16px]  flex items-center gap-2 
                                    ${ CurrentTab === element ? 'bg-richblack-900 text-richblack-5' : 'text-richblack-200 '}
                                    rounded-full transition-all duration-200 cursor-pointer
                                  hover:bg-richblack-800 hover:text-richblack-5 px-7 py-2 `}
                                    key={index} 
                                    onClick={( )=> setMyCards(element)}
                            >
                                    {element}
                            </div>
                        )
                    })
                }
            </div>

            <div className='h-[150px] '>
                
            </div>

            {/* course ka card */}
            <div className='border-2 border-yellow-50  w-[80%]  flex'>
                {
                    courses.map((element, index) =>{
                        return(
                            <CourseCard key={index} 
                                        cardData={element}
                                        currentCard={currentCard}
                                        setCurrentCard={setCurrentCard}
                                />
                            
                        )
                    })
                }
            </div>


        </div>
    )
}

export default ExploreMore