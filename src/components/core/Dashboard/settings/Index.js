import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import EditProfile from './EditProfile'
import DeleteAccount from './DeleteAccount'
import UpdatePassword from './UpdatePassword'

const Settings = () => {
  return (
    <div>
        <h1>Edit Profile</h1>

        {/*change profile picture  */}
        <ChangeProfilePicture/>

        {/* edit profile */}
        <EditProfile/>

        {/* update password */}
        <UpdatePassword/>

        {/* Delete account */}
        <DeleteAccount/>    
    </div>
  )
}

export default Settings