import React from 'react'
import { useSelector } from 'react-redux'
import Sidebar from '../components/core/Dashboard/Sidebar'
import {Outlet} from 'react-router-dom'       //1. Outlet component ka main use yehi hota hai ki child components ko parent component ke andar ek specific jagah par render kar sake. Ye nested routing ko handle karne ka ek tarika hai, jo complex applications me bahut useful hota hai. Isse aapke application ka layout modular aur maintainable banta hai.
                                              //2. Nested Routing: Outlet component nested routes ko render karne ke liye use hota hai. Jab aapke application me hierarchical routes hote hain, Outlet specify karta hai ki child routes kahan render honge. Common Layout: Parent component me kuch common layout ya UI elements ho sakte hain (jaise header, sidebar, footer), jo sabhi child routes ke liye common hote hain. Outlet use karke, child components ko parent layout ke andar ek specific area me render kar sakte hain.
                                              //3.  <Route index element={<Home />} />  {/* Default child route */} humlog default child route bhi set kar sakte he taki har bar wahi render ho   


const Dashboard = () => {
  const {loading : authLoading} = useSelector((state)=> state.auth);
  const {loading: profileLoading} = useSelector((state)=> state.profile);

  if(profileLoading || authLoading) {
    return (
      <div className='mt-10'>
        Loading...
      </div>
    )
  }



  return (
    <div className='flex min-h-[100vh]   text-white'>

        <div className=' bg-richblue-800    ' >

            <Sidebar />
        </div>
        
        {/* yaha sidebarlink me click karne par uska content show hoga it means dashboard ke ander jitni bhi nested route ki child hogi wo yaha render hogi NOTE: dashboard ka starting child content MyProfile he jo login hote hi render ho jata he and jaha par <outlet/> he ussi place par MyProfile component render ho jayega child component ki trha  */}
        <div className=' w-full     '>
          <div className='mx-auto w-11/12 max-w-[1000px] py-10   '>
            <Outlet/>       
          </div>
        </div>

    </div>
  )
}

export default Dashboard