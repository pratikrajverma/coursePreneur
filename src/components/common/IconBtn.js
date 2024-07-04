import React from 'react'

const IconBtn = ({
    text,
    onclick,
    children,
    disabled,
    outline=false,
    coustomClasses,
    type,
}) => {
  return (
    <button
        disabled={disabled}
        onClick={onclick}
        type={type}
        className='bg-yellow-100  text-richblue-800 font-bold px-3 py-1 rounded-md '
    >
        {
            children ? ( 
                <div className='flex items-center gap-2'>

                    

                        {children}
                     
                    <span>
                        {text}
                     </span>
                </div>
            ) : (
                <span>
                    {text}
                </span>
            )
        }
    </button>
  )
}

export default IconBtn