import React from 'react'

const stats = [
    {count: "5K", label: "Active Students"},
    {count: "10+", label: "Mentors"},
    {count: "200+", label: "Courses"},
    {count: "50+", label: "Awards"},
]


const Stats = () => {
  return (
    <div className='text-white flex gap-10 justify-center  bg-richblack-300 p-5'>
        {
            stats.map((data,index) => (
                <div key={index}>
                    <h1>
                        {data.count}
                    </h1>

                    <h1>
                        {data.label}
                    </h1>
                </div>
            ))
        }
    </div>
  )
}

export default Stats