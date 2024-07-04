import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses'
import RenderTotalAmout from './RenderTotalAmout'


const Cart = () => {

    const {total, totalItems} = useSelector((state)=>state.cart)
    
  return (
    <div>
        <h1>Your Cart</h1>
        <p>{totalItems} Courses in Cart</p>

        {
            total > 0 ? (<div>
                <RenderCartCourses/>
                <RenderTotalAmout/>
            </div>) : (
                <p>Your Cart is Empty</p>
            )
        }
    </div>
  )
}

export default Cart