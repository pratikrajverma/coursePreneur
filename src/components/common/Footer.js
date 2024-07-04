import React from 'react'
 
import Footerlinks from './Footerlinks';
import { Link } from 'react-router-dom';
import { FooterLink2 } from '../../data/footer-links';


const Footer = () => {


  return (


    <div className='w-11/12 mx-auto    p-10 mt-20  ' style={{ backgroundImage: 'linear-gradient(121.74deg, rgba(255, 255, 255, 0.22) -7.75%, rgba(255, 255, 255, 0) 37.38%)' }}>

      <div className='flex flex-col   '>
        <div className='flex gap-10'>

          <div className='flex w-[50%] h-[90%] justify-around  '>
            <div className='flex flex-col gap-10'>
              <div className='  w-[10rem] h-10 flex items-center gap-2'>
                <div className='bg-white rounded-full h-9 aspect-square flex justify-center items-center'>
                  <p className='text-black text-4xl font-bold'>C</p>
                </div>

                <div >
                  <p className='text-white text-xl font-semibold'>CoursePreneur</p>
                </div>
              </div>
              <Footerlinks title={FooterLink2[7].title} links={FooterLink2[7].links} />

            </div>
            <div className='flex flex-col gap-10'>
              <Footerlinks title={FooterLink2[3].title} links={FooterLink2[3].links} />
              <Footerlinks title={FooterLink2[4].title} links={FooterLink2[4].links} />
            </div>
            <div className='flex flex-col gap-10'>
              <Footerlinks title={FooterLink2[5].title} links={FooterLink2[5].links} />
              <Footerlinks title={FooterLink2[6].title} links={FooterLink2[6].links} />
            </div>
          </div>

          <div className='flex w-[50%] h-[90%] pl-10 justify-around border-l-[1px] border-richblack-600'>
            <div>
              <Footerlinks title={FooterLink2[0].title} links={FooterLink2[0].links} />
            </div>
            <div>
              <Footerlinks title={FooterLink2[1].title} links={FooterLink2[1].links} />
            </div>
            <div>
              <Footerlinks title={FooterLink2[2].title} links={FooterLink2[2].links} />
            </div>
          </div>
        </div>



        <div className='flex justify-between p-5 pt-10 border-t border-richblack-600 mt-5 '>
          <div className='flex gap-5'>
            <Link to={"/signup"} >
              <p className='hover:text-white'>Privacy Policy</p>
            </Link>
            <Link to={"/signup"}>
              <p className='hover:text-white'>Cookie Policy</p>
            </Link>
            <Link to={"/signup"}>
              <p className='hover:text-white'> Terms</p>
            </Link>
          </div>

          <p>Made with ♥ CodeHelp © 2023 Studynotion</p>
        </div>
      </div>
    </div>
  )
}

export default Footer