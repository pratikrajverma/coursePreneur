import React, { useState } from 'react'

import { sidebarLinks } from '../../../data/dashboard-links'
import { logout } from '../../../services/operations/authAPI'
import { useDispatch, useSelector } from 'react-redux'
import SidebarLink from './SidebarLink'
import { useNavigate } from 'react-router-dom'
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from '../../common/ConfirmationModal'


const Sidebar = () => {

  const { user, loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [confirmationModal, setConfirmationModal] = useState(null);

  if (profileLoading || authLoading) {
    return (
      <div className='mt-10'>
        Loading...
      </div>
    )
  }


  return (
    <div className='flex flex-col lg:min-w-[222px]   w-20 py-10'>

      <div>
        {
          sidebarLinks.map((link) => {
            if (link.type && link.type !== user.accountType) return null;

            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            )


          })
        }
      </div>


      <div className='mx-auth mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'></div>

      <div className='flex flex-col gap-2 '>
        <SidebarLink
          link={{ name: 'Settings', path: '/dashboard/settings' }}
          iconName={"VscSettingsGear"}
        />

        <button

          onClick={() => {
            console.log('logout button clicked');
            setConfirmationModal({
              text1: 'Are you sure ? ',
              text2: "you will be logged out of your account",
              btn1Text: "Logout",
              btn2Text: "Cancel",
              btn1Handler: () => {
                dispatch(logout(navigate));
              },

              btn2Handler: () => {
                setConfirmationModal(null);
              }
            })
          }}


          className='text-sm font-medium flex lg:gap-6  gap-2 lg:px-4 text-richblack-300'
        >
          <div className='flex items-center gap-x-2'>
            <VscSignOut className='text-lg' />
          </div>
          <span className='text-xs '>Logout</span>

        </button>
      </div>






      {
        confirmationModal && <ConfirmationModal modalData={confirmationModal} />
      }

    </div>
  )
}

export default Sidebar