import React from 'react'
import { HighlightText } from '../Homepage/HighlightText';
import CTAbutton from '../../core/Homepage/Button'

const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
  ];


// NOTE : yahja data ko component ke bahar rakhe he kyuki ye componenet ke bar bar render hone se ddata render nahi hoga  2. and dusra reason he ki is data ko hum kisi bnhi component me use kar sakte he import karke 3. tisra reason he ki ye ek best practice he data ko define karne ka component ke ander


const LearningGrid = () => {
  return (
    <div className='grid mx-auto grid-cols-1 lg:grid-cols-4 mb-10 w-11/12 text-blue-25 mt-10'>
    {
        LearningGridArray.map((card,index) => (
            <div key={index} 
                 className= { ` ${index === 0 && 'lg:col-span-2 lg:h-[250px] p-5 bg-transparent'}   
                                ${card.order % 2 === 1 ? "bg-richblack-700 p-5" : "bg-richblack-800 p-5"}
                                ${card.order === 3 && 'lg:col-start-2 lg:h-[250px] p-5'}` }
            >
                {
                        card.order < 0 ? ( 
                            <div className='lg:w-[90%] flex flex-col pb-5 gap-3'>
                                <div className='text-4xl font-semibold'>
                                    {card.heading}
                                    <HighlightText text={card.highlightText}/>
                                </div>
                                <p className='font-medium'>
                                    {card.description}
                                </p>
                                <div className='w-fit'>
                                    <CTAbutton active = { "bg-yellow-100"} linkto={card.BtnLink}>
                                        {card.BtnText}  
                                    </CTAbutton>
                                </div>
                            </div>
                        ) : (
                            <div className='flex flex-col gap-5 p-4'>
                                <h1 className='font-bold text-2xl'>
                                    {card.heading}
                                </h1>
                                <p className='text-richblack-50'>
                                    {card.description}
                                </p>
                            </div>
                        )
                    

                }
            </div>
        ))
    }
        
    </div>
  )
}

export default LearningGrid