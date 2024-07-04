import React from 'react'
import RenderSteps from './RenderSteps'

const AddCourse = () => {
    return (
        <div className='text-white  flex justify-between'>
            <div className=' w-[60%] '> 
                <h1>Add Course</h1>
                <div><RenderSteps/></div>
            </div>

            <div className=' '>
                <p>Code Upload Tips</p>
                <ul>
                    <li>Set the course Price options or make it free.</li>
                    <li>Set the course Price options or make it free.</li>
                    <li>Set the course Price options or make it free.</li>
                    <li>Set the course Price options or make it free.</li>
                    <li>Set the course Price options or make it free.</li>
                    <li>Set the course Price options or make it free.</li>
                    <li>Set the course Price options or make it free.</li>
                    <li>Set the course Price options or make it free.</li>
                </ul>
            </div>
        </div>
    )
}

export default AddCourse