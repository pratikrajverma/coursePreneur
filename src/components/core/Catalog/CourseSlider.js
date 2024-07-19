import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
// import { autoplay, FreeMode, navigation, pagination} from 'swiper'


import MostSellingCourseCard from './MostSellingCourseCard'

const CourseSlider = ({ Courses }) => {



    return (
        <div>
            {
                Courses?.length ? <Swiper
                                        slidesPerView={1}
                                        loop={true}
                                        centeredSlides={true}
                                        spaceBetween={400}
                                        pagination={true}
                                         
                                        
                                        className="mySwiper"
                                        autoplay={{
                                            delay: 1000,
                                            disableOnInteraction: false,
                                        }}
                                        navigation={true}
                                        breakpoints={{
                                            1024: { slidesPerView: 3, }
                                        }}


                                    >
                                        {
                                            Courses?.map((course, index) => (
                                              <SwiperSlide   key={index}  >
                                                
                                                        <MostSellingCourseCard course={course} />
                                                        
                                                    </SwiperSlide>
                                               
                                            )
                                            )
                                        }
                                    </Swiper>
                                    : (<p className='text-red-500'>No Course Found</p>)
            }





        </div>
    )
}

export default CourseSlider

