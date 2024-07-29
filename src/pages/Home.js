import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa6";
import { HighlightText } from '../components/core/Homepage/HighlightText';
import CTAbutton from '../components/core/Homepage/Button';
  
import CodeBlocks from '../components/core/Homepage/CodeBlocks';
 
import Footer from '../components/common/Footer';
import ReviewSlider from '../components/common/ReviewSlider'
import bgImage from '../assets/Images/bg.jpg'
 



const Home = () => {




    return (
        <div className='relative  flex flex-col     text-richblack-300  ' >

            {/*..........................................................( section 1 ).................................................. */}
            <div className='flex flex-col gap-y-28 items-center mx-auto w-screen mt-14 pt-10  '
                style={{ 'backgroundImage': `url(${bgImage})` }}
            >
                <div className=' lg:ml-24 '>
                    <div className='flex flex-col   w-[90%] lg:mx-0 mx-auto lg:w-[50%]'>
                        <div className='group   lg:mt-16 mb-10 rounded-full bg-richblue-800 font-bold text-richblack-200  
                                transition-all duration-200 hover:scale-95 w-fit  '>

                            <Link to={"/signup"}>
                                <div className=' group-hover:bg-richblack-800 flex items-center gap-2 rounded-full px-10 py-[5px] m-1 my-1  '>
                                    <p>Become an Instructor</p>
                                    <FaArrowRight />
                                </div>
                            </Link>

                        </div>

                        <div className='  text-4xl font-semibold mt-4'>
                            Empower your future with
                            <HighlightText text={"coding skills"} />
                        </div>

                        <div className='  tracking-tighter  text-justify  text-lg text-richblack-300 mt-4'>
                            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                        </div>

                        {/* NOTE:  jo kuch bhi component ke bich me rahta he wo us component ka childreen ban jata he*/}
                        <div className='flex gap-7 mt-8'>
                            <CTAbutton linkto="learn_more" active={"bg-yellow-100 "} >
                                Learn More
                            </CTAbutton>

                            <CTAbutton linkto="sign_in" active={"bg-white"}>
                                Book a Demo
                            </CTAbutton>
                        </div>
                    </div>




                </div>



                {/*code blocks  2  */}
                <div>
                    <CodeBlocks

                        position={'lg:flex-row-reverse'}
                        heading={
                            <div className='text-4xl font-semibold'>
                                Start
                                <HighlightText text={"coding  "} />
                                <br></br>
                                <HighlightText text={"in seconds"} />

                            </div>

                        }
                        subheading={'Go ahead, give it a try. Our hands-on learning environment means you will be writing real code from your very first lesson.'}
                        ctabtn1={
                            {
                                btnText: "Continue Lesson",
                                linkto: "/signup",
                                active: "bg-yellow-100",
                            }
                        }
                        ctabtn2={
                            {
                                btnText: "Learn More",
                                linkto: "/login",
                                active: "bg-white",
                            }
                        }

                        codeblock={`<!DOCTYPE html> \n <html>\nhead><>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n /nav> `}
                        codeColor={'text-yellow-25'}

                        backgroundGradient={
                            {
                                bg1: "#1FA2FF",
                                bg2: "#12D8FA",
                                bg3: "#A6FFCB"
                            }
                        }
                    ></CodeBlocks>
                </div>





            </div>



            {/* section 2 */}

            <div className='w-11/12 content-center mx-auto  mt-24 bg-gradient-to-r from-caribbeangreen-800 to-richblack-900 py-5 px-10'>

                <ReviewSlider />
            </div>








            {/* ...........................................................( section 4 footer )................................... */}

            <div className=' '>
                <Footer />
            </div>




        </div>
    )
}

export default Home