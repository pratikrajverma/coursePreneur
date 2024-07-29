import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { NavbarLinks } from '../../data/navbar-links';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IoCartOutline } from "react-icons/io5";
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector';
import { categories } from '../../services/apis';
import { BsChevronDown } from "react-icons/bs"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { ACCOUNT_TYPE } from "../../utils/constants"



const Navbar = () => {


  const [subLinks, setSublinks] = useState([]);

  const [loading, setLoading] = useState(false)

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

  const { catalogName } = useParams()



  const location = useLocation();
  const matchRoute = (route) => {




    return route === location.pathname
  }

  const [mobileNavbar, setMobileNavbar] = useState(false)

  const [mobileCategory, setMobileCategory] = useState(false)


  return (
    <div className='  h-10 '>
      <div className='h-12 border-b border-b-richblack-700 flex items-center fixed top-0 z-30 w-screen bg-black bg-opacity-80 mb-20'>
        <div className='lg:w-11/12 lg:max-w-maxContent  mx-auto   flex items-center   justify-evenly '>

          <Link to='/'>
            {/* <img src={logo} className='h-[2rem]' /> */}
            <div className='  lg:w-[10rem] h-10 flex items-center gap-2 lg:mr-0 mr-4'>
              <div className='bg-white rounded-full h-9 aspect-square flex justify-center items-center'>
                <p className='text-black text-4xl font-bold'>C</p>
              </div>

              <div >
                <p className='text-white text-xl font-semibold'>CoursePreneur</p>
              </div>
            </div>
          </Link>



          <nav className="hidden md:block">
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
                                  <Link to={`/catalog/${link.name ? link.name.split(' ').join('').toLowerCase() : ''}`} key={index}>
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

          <div className='hidden md:flex gap-x-4 items-center relative'>
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
                  <button className={` text-white  border-richblack-400 border px-[16px] py-[7px] 
                                   rounded-md hover:bg-richblack-700  
                                   ${matchRoute("/login") ? 'bg-richblack-700' : null}`} >Login</button>
                </Link>
              )
            }

            {
              token === null && (
                <Link to="/signup">
                  <button className={` text-white  border-richblack-400 border px-[8px] py-[7px] 
                                   rounded-md hover:bg-richblack-700  
                                   ${matchRoute("/signup") ? 'bg-richblack-700' : null}`}
                  >
                    Sign Up</button>
                </Link>
              )
            }

            {
              token !== null && <ProfileDropDown />
            }

          </div>

          <button className="mr-4 md:hidden "
            onClick={() => setMobileNavbar(!mobileNavbar)}>
            <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
          </button>
        </div>
      </div>



      {/* ...........................  responsive design ....................... */}
      {mobileNavbar && (
        <div className="bg-richblue-300 h-[250px] md:hidden mt-12  w-screen   fixed z-30">
          <ul className="flex flex-col">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div
                    className="flex justify-center bg-caribbeangreen-5 border-b-4 border-pure-greys-100 py-2 relative group"
                    onClick={() => setMobileCategory(!mobileCategory)}
                  >
                    <div className="flex gap-2 items-center justify-center">
                      <p>{link.title}</p>
                      <BsChevronDown />
                    </div>

                    <div className="flex justify-center">
                      <div
                        className={`${mobileCategory ? 'visible opacity-100' : 'invisible opacity-0'
                          } h-8 w-8 bg-blue-50 absolute top-10 rotate-45 transition-all duration-300`}
                      ></div>
                      <div
                        className={`${mobileCategory ? 'visible opacity-100' : 'invisible opacity-0'
                          } bg-blue-50 p-4 rounded z-10 absolute top-14 w-[300px] transition-all duration-300`}
                      >
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : subLinks.length !== 0 ? (
                          <div>
                            {subLinks
                              .filter((subLink) => subLink.name.length > 0)
                              .map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(' ')
                                    .join('-')
                                    .toLowerCase()}`}
                                  key={i}
                                >
                                  <p className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50">
                                    {subLink.name}
                                  </p>
                                </Link>
                              ))}
                          </div>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link to={link.path}>
                    <div
                      className={`${matchRoute(link.path)
                          ? 'bg-blue-200'
                          : 'bg-caribbeangreen-5'
                        } flex justify-center border-b-4 border-pure-greys-100 py-2`}
                        onClick={()=>setMobileNavbar(!mobileNavbar)}
                    >
                      <p>{link.title}</p>
                    </div>
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Login / Signup / Dashboard */}
          <div className="items-center gap-x-4 flex justify-center mt-4">
            {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
              <Link to="/dashboard/cart" className="relative"
                       onClick={()=>setMobileNavbar(!mobileNavbar)}>
                <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              </Link>
            )}

            {token === null && (
              <>
                <Link to="/login">
                  <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100"
                               onClick={()=>setMobileNavbar(!mobileNavbar)}>
                    Log in
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100"
                       onClick={()=>setMobileNavbar(!mobileNavbar)}>
                    Sign up
                  </button>
                </Link>
              </>
            )}

            {token !== null && <ProfileDropDown />}
          </div>
        </div>
      )}
      

    </div>

  )
}

export default Navbar