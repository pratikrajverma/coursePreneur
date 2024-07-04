import React from 'react'
import { TiMessages } from "react-icons/ti";
import { IoIosCall } from "react-icons/io";
import { FaEarthAmericas } from "react-icons/fa6";
import ContactusForm from '../components/core/ContactUsPage/ContactusForm';




const ContactUs = () => {
    
 
  
  return (
    <div className='flex justify-center gap-10 mt-10'>
      {/* left section */}
      <div className='flex flex-col gap-10 text-white border p-16 h-fit border-richblack-600 bg-pure-greys-800 '>

        <div className='flex flex-col '>
          <div className='flex gap-2 items-baseline'>
            <TiMessages />
            <h1 className='font-bold'>Chat on us</h1>
          </div>
          <p className='text-[13px] text-richblack-200'>Our friendly team is here to help. </p>
        </div>

        <div className='flex flex-col'>
          <div className='flex gap-2  items-baseline'>
            <FaEarthAmericas />
            <h1 className='font-bold'>Visit us</h1>
          </div>
          <p className='text-[13px] text-richblack-200'>Come and say hello to our office HQ  </p>
        </div>

        <div className='flex flex-col'>
          <div className='flex gap-2  items-baseline'>
          <IoIosCall />

            <h1 className='font-bold'>Call us</h1>
          </div>
          <p className='text-[13px] text-richblack-200'> mon - Fri from 8pm to 5pm </p>
          <p className='text-[13px] text-richblack-200'>+790 320 9052</p>
        </div>

      
      </div>      

      {/* right section contact us form */}
      <div className='flex flex-col text-white border border-richblack-500 p-10 mb-20 gap-2 w-[40%]'>
          <h1 className='font-bold text-2xl'>Got a idea ? We've got the skills. <br/> Let's team up</h1>
          <p  className='text-[13px] text-richblack-200 mb-10'>Tell us more about yourself and what yout're got in mind</p>
          <ContactusForm/>
      </div>
    </div>
  )
}

export default ContactUs