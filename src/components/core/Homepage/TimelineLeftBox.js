import React, { useEffect, useState } from 'react'

const TimelineLeftBox = ({element, index  }) => {
    const [showBorder, setShowBorder] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setShowBorder((preShowborder) => (preShowborder+1) % 5); // Assuming there are 5 elements
                                                                    //Note: Jab aap preShowborder++ ka istemal karte hain, toh preShowborder ki value badh jati hai lekin state mein yeh badlav nahi hota hai. Agar aap usi state ka istemal karte hain aur usme koi badlav karte hain, toh actual state update nahi hoti hai. Iska matalab hai ki, agar aap preShowborder++ ka istemal karte hain, toh React state mein badlav nahi hoga, sirf temporary value badh jayeg
                                                                    //Isliye, React state ko actual mein update karne ke liye functional update syntax ka istemal hota hai, jismein hum pichli state ko lekar usme koi badlav karte hain aur fir updated value ko return karte hain. Is tarah se, hum state ko sahi dhang se update kar sakte hain aur actual state ko badal sakte hain.
        }, 1000); // Adjust the interval duration as needed
        
 
        return () => clearInterval(interval);   //If your component is not unmounting, the cleanup function () => clearInterval(interval) returned from the useEffect hook won't execute. This function is designed to clean up any side effects (like clearing intervals) when the component unmounts, but if the component remains mounted, it won't be called
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