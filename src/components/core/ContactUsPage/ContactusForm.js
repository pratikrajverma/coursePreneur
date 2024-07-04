import React, { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form';
import { contactusEndpoint } from '../../../services/apis';
import { apiConnector } from '../../../services/apiconnector'
import countrycode from '../../../data/countrycode.json'

const ContactusForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()   //useForm hook initialize kiya ja raha hai jo form ke saare essential functions aur states ko provide karta hai


  const submitContactForm = async (data) => {
    console.log('loged data', data);
    try {
      setLoading(true);
      const response = await apiConnector('POST', contactusEndpoint.CONTACT_US_API, data);
      console.log('logged response', response);
      setLoading(false);
    } catch (error) {
      console.log('error', error.message);
      setLoading(false);
    }
  }


  useEffect(() => {

    if (isSubmitSuccessful) {
      reset({
        email: '',
        firstname: '',
        lastname: '',
        message: '',
        phonenumber: '',
      })
    }

  }, [isSubmitSuccessful, reset])




  return (
    <div className='flex  justify-center  '>
      <form onSubmit={handleSubmit(submitContactForm)} className='flex flex-col gap-5'>

        <div className='flex   text-white gap-5  '>
          {/* FIRST NAME */}
          <div className='flex flex-col w-[50%]'>
            <label htmlFor='firstname'>First name</label>
            <input
              className='text-black p-2 '
              type='text'
              name='firstname'
              placeholder='Enter your first name'
              id='firstname'
              {...register("firstname", { required: true })}
            />
            {
              errors.firstname && <span>enter your first name</span>
            }
          </div>

          {/* LAST NAME */}
          <div className='flex flex-col w-[50%]'>
            <label htmlFor='lastname'>Last name</label>
            <input
              className='text-black p-2'
              type='text'
              name='lastname'
              placeholder='Enter your last name'
              id='lastname'
              {...register("lastname")}
            />

          </div>

        </div>

        <div className='flex flex-col gap-5 '>
          {/* Email */}
          <div className='flex flex-col '>
            <label htmlFor='email'>Enter email </label>
            <input
              className='text-black p-2'
              type='email'
              name='email'
              id='email'
              placeholder='Enter your email'
              {...register("email", { required: true })}
            />
            {
              errors.email && <span>enter your email</span>
            }
          </div>

          {/* phone number */}
          <div className='flex flex-col gap-2  '>

            <label htmlFor='phonenumber'>Phone number</label>
            <div className='flex gap-2'>
                {/* dropdown */}
                <div className='  w-[13%]'>
                  <select 
                    name='dropdown'
                    id='dropdown'
                    {...register("countrycode", { required: true })}
                    className='text-black w-full h-full'
                  >
                    {
                      countrycode.map((element, index) => (
                        <option key={index} value={element.code}>

                          {element.code} - {element.country}

                        </option>
                      ))
                    }
                  </select>
                </div>
                
                {/* Phone Number */}
                <div className='w-full'>
                  <input type='number'
                      name='phonenumber'
                      id='phonenumber'
                      placeholder='1234 567 890'
                      className='text-black p-2 w-full'
                      {...register('phonenumber', {
                                              required: { value: true, message:"please enter phone no" },
                                              maxLength: { value: 10, message: "invalid phone number" },
                                              minLength: {value: 10, message: "invalid phone number"}
                                            }
                        )}

                  />
                </div> 
            </div>
            {
                errors.phonenumber && <span>{errors.phonenumber.message}</span>
  
            }

          </div>

          {/* message box */}
          <div className='flex flex-col'>
            <label htmlFor='message'>Message</label>
            <textarea
              className='text-black'
              name='message'
              id='message'
              cols="30"
              rows='7'
              placeholder='Enter your message'
              {...register("message", { required: true })}
            />
            {
              errors.message && <span>enter your message</span>
            }
          </div>


          <button type='submit' className='bg-yellow-100 text-black p-2 font-bold'   >
            Send Message
          </button>

        </div>

      </form>

    </div>

  )
}

export default ContactusForm