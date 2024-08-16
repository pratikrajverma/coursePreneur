import React, { useEffect, useState } from 'react'

const TimelineLeftBox = ({element, index  }) => {
    const [showBorder, setShowBorder] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setShowBorder((preShowborder) => (preShowborder+1) % 5);  
        }, 1000);  
        
 
        return () => clearInterval(interval);   
    }, []);
    
   
  return (
    <div className='flex gap-6 '>
             <div className={`h-[50px] aspect-square relative bg-white flex items-center justify-center rounded-full shadow-yellow-200 
                            ${showBorder===index && index==0 ? '  border-[2px] border-blue-200 border-dotted ' : ''}
                            ${showBorder===index && index==1 ? '  border-[2px] border-pink-300 border-dotted ' : ''}
                            ${showBorder===index && index==2 ? '  border-[2px] border-caribbeangreen-300 border-dotted ' : ''}
                            ${showBorder===index && index==3 ? '  border-[2px] border-yellow-300 border-dotted ' : ''}
                        `}>

            <img src={element.Logo}/>

            {    
                index <= 2 && ( 
                    <div className='border border-dotted opacity-20 h-[42px] absolute  top-14'>
                         
                    </div>)
            }
        </div>

        <div className='flex flex-col'>
            <p className='font-semibold text-[18px] '>{element.heading}</p>
            <p>{element.Description}</p>
        </div>

    </div>
  )
}

export default TimelineLeftBox

// In JSX, you can't directly use if statements like you would in regular JavaScript code. Instead, you can use ternary operators or conditional rendering.
// {index <= 2 && (
//     <div className='border border-dotted opacity-20  h-[42px] absolute top-14'></div>
//     )}