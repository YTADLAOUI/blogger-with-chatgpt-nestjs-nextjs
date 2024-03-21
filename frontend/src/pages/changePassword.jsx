import React, { useState } from 'react'
import InputBox from '../components/inputBox'
import axios from 'axios'
const changePassword = () => {
  const [currentPassword,setCurrentPassword]=useState('')
  const [newPassword,setNewPassword]=useState('')
  console.log(currentPassword,newPassword)
  const submit= async()=>{
  
  try {
    const response = await axios.post('http://localhost:3000/api/change-password', {
      currentPassword: currentPassword,
      newPassword: newPassword
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
  } catch (error) {
    
  }
  }
  return (
    <>
<h1 className='text-4xl text-dark-grey mb-10'>Change Password</h1>
    <div className='py-10 w-full md:max-w-[400px] m-auto'>
    <InputBox name="password" type="password" className="profile-edit-input" placeholder="currentPassword"
    icon="fi-rr-unlock"
    onChange={(e)=>setCurrentPassword(e.target.value)}
    />
    <InputBox name="password" type="password" className="profile-edit-input" placeholder="New Password" icon="fi-rr-unlock"
    onChange={(e)=>setNewPassword(e.target.value)}
    />

    <button onClick={submit} className='btn-dark px-10'>Change Password</button>
    </div>
    </>
  )
}

export default changePassword