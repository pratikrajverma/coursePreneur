import React from 'react'



const Footerlinks = (props) => {
  const { title, links } = props;
 




  return (
    <div className='flex flex-col   gap-4 '>
      <p className='font-semibold text-richblack-100'>{title}</p>

      <div className='flex flex-col gap-2'>
        {
          links.map((element, index) => {
            return (

              <div key={index} className='flex flex-col hover:text-white'>
                <a href={element.link} target='_blank'  >{element.title}</a>
              </div>
            )
          })
        }
      </div>

    </div>
  )
}



export default Footerlinks