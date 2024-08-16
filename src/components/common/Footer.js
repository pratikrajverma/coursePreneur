import React from 'react'
import logofullLight from '../../assets/Logo/Logo-Full-Light.png';
import Footerlinks from './Footerlinks';
import { Link } from 'react-router-dom';
import { FooterLink2 } from '../../data/footer-links';


const Footer = () => {


  return (


    <div className='lg:w-11/12 mx-auto     lg:p-10 p-2 mt-20  ' style={{ backgroundImage: 'linear-gradient(121.74deg, rgba(255, 255, 255, 0.22) -7.75%, rgba(255, 255, 255, 0) 37.38%)' }}>

      <div className=' h-fit flex flex-col px-2  gap-5'>
        <div className='lg:flex lg:gap-10  h-fit'>

          <div className='flex lg:w-[50%] w-screen justify-center   h-fit lg:h-[90%] lg:justify-around  '>
            <div className='flex flex-col lg:gap-10'>
              {/* <img className='h-[35px]' src={logofullLight} /> */}
              <Footerlinks title={FooterLink2[7].title} links={FooterLink2[7].links} />

            </div>

            <div className='flex  flex-col gap-10'>
              <Footerlinks title={FooterLink2[3].title} links={FooterLink2[3].links} />
              <Footerlinks title={FooterLink2[4].title} links={FooterLink2[4].links} />
            </div>

            <div className='flex  flex-col gap-10'>
              <Footerlinks title={FooterLink2[5].title} links={FooterLink2[5].links} />
              <Footerlinks title={FooterLink2[6].title} links={FooterLink2[6].links} />
            </div>
          </div>



          <div className=' hidden lg:visible lg:flex lg:w-[50%] lg:h-[90%] lg:pl-10 lg:justify-around border-l-[1px] border-richblack-600'>
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



        <div className='flex justify-between lg:p-5 lg:pt-10 border-t border-richblack-600 lg:mt-5 '>
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

          <p>Made with ♥ hacktacker © 2024 HackTech</p>
        </div>

      </div>
    </div>
  )
}

export default Footer