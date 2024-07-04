import React, { useEffect, useState } from 'react'
import { Link,     useParams } from 'react-router-dom'
 
import { NavbarLinks } from '../../data/navbar-links';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IoCartOutline } from "react-icons/io5";
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector';
import { categories } from '../../services/apis';
import { BsChevronDown } from "react-icons/bs"

 

const Navbar = () => {


  const [subLinks, setSublinks] = useState([]);

  const fetchSublinks = async () => {
    try {
      const result = await apiConnector('GET', categories.CATEGORIES_API);
 
      setSublinks(result.data.data);

    } catch (err) {
      console.log("could not fetch the categories list ", err);
    }
  }

  useEffect(() => {
    fetchSublinks();
  }, [])



  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const {catalogName} = useParams()



  const location = useLocation();
  const matchRoute = (route) => {

    


    return route === location.pathname            
  }



  return (
    <div className='h-12 border-b border-b-richblack-700 flex items-center fixed top-0 z-30 w-screen bg-black bg-opacity-80 mb-20'>
      <div className='w-11/12 mx-auto   flex items-center   justify-evenly '>

        <Link to='/'>
          {/* <img src={logo} className='h-[2rem]' /> */}
          <div className='  w-[10rem] h-10 flex items-center gap-2'>
            <div className='bg-white rounded-full h-9 aspect-square flex justify-center items-center'>
              <p className='text-black text-4xl font-bold'>C</p>
            </div>

            <div > 
              <p className='text-white text-xl font-semibold'>CoursePreneur</p>
            </div>
          </div>
        </Link>



        <nav>
          <ul className='flex gap-6 text-richblack-25'>
            {
              NavbarLinks.map((element, index) => {
                return (
                  <li key={index}>
                    {
                      element.title === 'Catalog' ? (
                        <div className={`group relative flex cursor-pointer items-center  gap-1
                              ${matchRoute(`/catalog/${catalogName}`) ? "text-red-500" : "text-white"}    
                              group`}
                        >

                          <p>{element.title}</p>
                          <BsChevronDown />

                            <div className=' invisible  absolute -left-[100%] top-[180%] flex flex-col group-hover:visible
                                            rounded-md bg-richblack-5 p-5   transition-all duration-200 lg:w-[300px] z-[10]'>



                                <div className='    select-none  absolute left-[45%] -top-2 h-6 w-6 rotate-45 bg-richblack-5   rounded-md  '>

                                </div>
 
 
                                {
                                  subLinks.length > 0 ? subLinks.map((link, index) => (
                                      <Link to= {`/catalog/${link.name ? link.name.split(' ').join('').toLowerCase() : ''}`} key={index}>
                                          <p className='hover:bg-richblack-50 p-2 rounded-md text-richblack-600'>{link.name}</p>
                                      </Link>
                                  ))
                                  : (
                                    <p className='text-pink-200'>No categories found...</p>
                                  )
                                }
                            </div>
                        </div>
                      )
                        : (<Link to={element.path}>
                          <p className={` ${matchRoute(element.path) ? 'text-yellow-25' : 'text-richblack-25'} `}>
                            {element.title}
                          </p>
                        </Link>)
                    }

                  </li>
                )
              })
            }

          </ul>
        </nav>



        {/* Login/SignUp/Dashboard */}

        <div className='flex gap-x-4 items-center relative'> 
          {
            user && user.accountType !== 'Instructor' && (
              <Link to="/dashboard/cart" className='relative'>
                <IoCartOutline className='text-white text-2xl' />

                {
                  totalItems > 0 && (
                    <div className='text-white bg-richblack-600 rounded-full h-5  flex items-center 
                                    justify-center top-4 -right-1 absolute aspect-square animate-bounce duration-700 transition-all  '>{totalItems}</div>
                  )
                }
              </Link>
            )
          }

          {
            token === null && (
              <Link to="/login">
                <button  className={` text-white  border-richblack-400 border px-[16px] py-[7px] 
                                   rounded-md hover:bg-richblack-700  
                                   ${matchRoute("/login") ? 'bg-richblack-700' : null}` } >Login</button>
              </Link>
            )
          }

          {
            token === null && (
              <Link to="/signup">
                <button className={` text-white  border-richblack-400 border px-[8px] py-[7px] 
                                   rounded-md hover:bg-richblack-700  
                                   ${matchRoute("/signup") ? 'bg-richblack-700' : null}` } 
                                   >
                                   Sign Up</button>
              </Link>
            )
          }

          {
            token !== null && <ProfileDropDown />
          }

        </div>
      </div>
    </div>
  )
}

export default Navbar