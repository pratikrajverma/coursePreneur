import React, { useEffect, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
//  import { autoplay, freeMode, navigation, pagination} from 'swiper'
import ReactStars from 'react-rating-stars-component'
import { ratingsEndpoints } from '../../services/apis'
import { apiConnector } from '../../services/apiconnector'
import { FaStar } from "react-icons/fa";




const ReviewSlider = () => {

  const [reviews, setReviews] = useState([]);

  // const truncateWords = 15;


  useEffect(() => {
    const fetchAllReviews = async () => {
      const response = await apiConnector('GET', ratingsEndpoints.REVIEWS_DETAILS_API)


      if (response?.data?.success) {
        setReviews(response?.data?.allReviews)
        console.log('printing reviews', reviews);
      }



    }

    fetchAllReviews();
  } )

  return (
    <div className='text-white'>
      <div>
        <Swiper
          slidesPerView={4}
          spaceBetween={24}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          // modules={[freeMode, pagination, autoplay]}
          className='w-full'
        >
          {
            reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <img src={review?.User?.image ? review?.User?.image : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.User?.firstname} ${review?.User?.lastname}`}
                  alt='Profile pid'
                  className='h-9 w-9 object-cover rounded-full'
                />

                <p>{review?.course?.courseName}</p>

                <p>
                  {review?.review}
                </p>

                <p>{review?.rating.toFixed(1)}</p>

                <ReactStars
                  count={5}
                  value={review?.rating}
                  size={20}
                  edit={false}
                  activeColor='#ffd700'
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}



                />

              </SwiperSlide>

            ))
          }

        </Swiper>
      </div>

    </div>
  )
}

export default ReviewSlider