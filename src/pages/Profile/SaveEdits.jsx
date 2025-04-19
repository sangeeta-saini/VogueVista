
import React from 'react'
import './Profile.css'

function SaveEdits() {
  return (
    <div className='profile-container-3'>
      <div className='profile-heading'>
        <h3>Edit Details</h3>
      </div>
      <div className='profile-containter-4'> 
       <div className='name-edit'>
        <h5 className='edit-title'>Full Name</h5>
        <input className='edit-input'type="text" placeholder='Full Name' />
       </div>
       <div className='mobile-edit'>
        <h5 className='edit-title'>Mobile Number</h5>
        <input className='edit-input' type="tel" placeholder='Mobile Number' />
       </div>
       <div className='email-edit'>
        <h5 className='edit-title'>Email</h5>
        <input className='edit-input' type="text" placeholder='Email' />
       </div>
       <div className='gender-box'>
       <div className='gender-edit'>
       <label htmlFor="male">Male</label>
        <input className='edit-input-1' type="radio" />
       </div>
       <div className='gender-edit'>
       <label htmlFor="female">Female</label>
        <input className='edit-input-1' type="radio"  />
       
       </div>
       </div>
       <div className='date-edit'>
        <h5 className='edit-title'>Date of Birth</h5>
        <input className='edit-input' type="date" placeholder='BirthDay' />
       </div>
       <div className='mobile-edit'>
        <h5 className='edit-title'> Alternate mobile number</h5>
        <input className='edit-input' type="tel" placeholder='Mobile Number' />
       </div>
       <div>
        <button className='saveedit-btn'>Save Details </button>
       </div>
      </div>
    </div>
  )
}

export default SaveEdits
