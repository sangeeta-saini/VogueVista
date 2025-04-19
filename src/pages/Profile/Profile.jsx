import React from 'react'

import './Profile.css'

function Profile() {
  return (
    <div>
   <div className='profile-container-1'>
<div className='page-heading'>
          Account
        </div>
      <div className='page-container'>
        
        <div className='sidebar'>
          <div className='orders'>
          Orders
          </div>
          <div className='orders'>
            Wishlist
          </div>
          <div className='orders'>
            Address
          </div> 
          <div className='orders'>
            Help center
          </div> 
        </div>
      
      <div className='profile-container'>
       <div className='profile-heading'>
       Profile Details
       </div>
       <div className='profile-data'>
      <table className='profile-info'>
        <tr>
          <td>Full Name</td>
          <td>-Not added-</td>
        </tr>
        <tr>
          <td>Mobile Number</td>
          <td>-Not added-</td>
        </tr>
        <tr>
          <td>Email ID</td>
          <td>-Not added-</td>
        </tr>
        <tr>
          <td>Gender</td>
          <td>-Not added-</td>
        </tr>
        <tr>
          <td>Date of Birth</td>
          <td>-Not added-</td>
        </tr>
        <tr>
          <td>Location</td>
          <td>-Not added-</td>
        </tr>
        <tr>
          <td>Alternate Number</td>
          <td>-Not added-</td>
        </tr>
      </table>
      <div className='profile-edit-btn'><a href='edits'>Edit</a></div>
       </div>
      </div>
      </div>
    </div>
    </div>
  )
}

export default Profile
