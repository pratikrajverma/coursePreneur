import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn'
import { buyCourse } from '../../../../services/operations/studentFeaturesAPI';
import { useNavigate } from 'react-router-dom';

const RenderTotalAmout = () => {
    const {total, cart} = useSelector((state)=> state.cart);
    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    
    

    const handleBuyCourse = () => {
            const courses = cart.map((course)=>course._id)
            buyCourse(token, courses, user, navigate, dispatch)
            
            // bad me karna he 
    }   
  return (
    <div>
        <p>Total : </p>
        <p>₹ {total}</p>

        <IconBtn
            text="Buy Now"
            onclick={handleBuyCourse}
            coustomClasses={"w-full justify-center"}
        />
    </div>
  )
}

export default RenderTotalAmout