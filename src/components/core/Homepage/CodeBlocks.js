import React from 'react'
import CTAbutton from './Button';
 
import { FaArrowRight } from "react-icons/fa6";
import  {TypeAnimation} from 'react-type-animation';



const CodeBlocks = ({position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor }) => {
  return (
    <div className={`flex ${position} lg:ml-20 mx-5 sm:pr-2 my-20 justify-between lg:gap-10   `}>   
        {/* section 1 button block*/}
        <div className='w-[50%] flex flex-col gap-8 '>
                {heading}
     

            <div className='font-bold text-richblack-300'>
                {subheading}
            </div>

            <div className='flex gap-7 mt-7 lg:w-[100%] w-screen  '>
                <CTAbutton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                    <div className='flex gap-2 items-center'>
                        {ctabtn1.btnText}
                        <FaArrowRight />
                    </div>
                    
                </CTAbutton>

                <CTAbutton active={ctabtn2.active} linkto={ctabtn2.linkto}>
               
                        {ctabtn2.btnText}
                  

                </CTAbutton>
                 
            </div>

        </div>


        {/* section 2 codes block */}
        <div className='h-fit  flex lg:text-[18px]   sm:w-[200px] sm:mr-3  overflow-hidden  py-4 lg:w-[500px] relative '
            style={{  backgroundImage: 'linear-gradient(121.74deg, rgba(255, 255, 255, 0.22) -7.75%, rgba(255, 255, 255, 0) 37.38%)' }}            
            >

            <div className='lg:w-[372px] sm:pr-5  lg:h-[257px] opacity-25 rounded-full  absolute    '
                style={
                    {
                        background: `linear-gradient(123.77deg, ${backgroundGradient.bg1} -6.46%, ${backgroundGradient.bg2} 59.04%, ${backgroundGradient.bg3} 124.53%)`,
                        filter: 'blur(80px)'

                    }
                }
                > </div>

            <div className='flex flex-col  text-center lg:w-[10%] text-richblack-400 font-bold font-inter '>
                <p>1</p>
                <p>2</p>
                <p>3 </p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11 </p>
                <p>12</p>
            </div>

            <div className={`lg:min-w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2    sm:w-[100%] `}>
                <TypeAnimation
                    sequence={[codeblock, 5000, ""]}
                    repeat={Infinity}
                    cursor={true}
                    omitDeletionAnimation={true} 

                    style={
                        {
                            whiteSpace:"pre-line",
                            display:"block",
                        }
                    }

                />
            </div>


        </div>
    </div>
  )
}

export default CodeBlocks