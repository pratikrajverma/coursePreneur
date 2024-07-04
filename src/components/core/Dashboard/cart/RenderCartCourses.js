import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from '../../../../slices/cartSlice';
import ReactStars from 'react-rating-stars-component'


const RenderCartCourses = () => {
    const {cart} = useSelector((state)=>state.cart);
    const dispatch = useDispatch();
    
  return (
    <div>
    {
        cart.map((course,index)=>
        (
             <div key={index}>
                <div>
                    <img src={course.thumbnail}/>
                    <div>
                        <p>{course.courseName}</p>  
                        <p>{course.category.name}</p>
                        <div>
                            <span>4.8</span>
                            <ReactStars
                                count={5}
                                size={20}
                                activeColor="#ffd700"
                                edit={false}
                                emptyIcon={<i className="far fa-star"></i>}
                                halfIcon={<i className="fa fa-star-half-alt"></i>}
                                fullIcon={<i className="fa fa-star"></i>} 
                            />

                            <span>
                                {course.ratingAndReview.length} Ratings
                            </span>
                        </div>
                    </div>
                </div>

                <div>
                    <button onClick={()=> dispatch(removeFromCart(course._id))}>
                        <RiDeleteBin6Line /> <span>Remove</span> 
                    </button>

                    {/* price */}
                    <p>₹ {course.price}</p>
                </div>
             </div>

        ))
    }    
    </div>
  )
}

export default RenderCartCourses