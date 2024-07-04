import React from 'react'
import ContactusForm from '../ContactUsPage/ContactusForm'

const ContactFormSections = () => {
    return (
        <div className=' text-white'>
            <h1>
                Get in Touch
            </h1>
            <p>
                we'd love to here for you, please fill out the form.
            </p>
            <div className='w-[35%] mx-auto'>
                <ContactusForm />
            </div>
        </div>
    )
}

export default ContactFormSections