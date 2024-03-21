import React, { useState } from 'react'
import InputBox from '../components/inputBox'
import axios from 'axios'
const editProfile = () => {
  let user= JSON.parse(localStorage.getItem('user'))
  const [image,setImage]=useState('')
  const [username,setUsername]=useState('')
  const [bio,setBio]=useState('')

  const save=()=>{
    try {
      let data= new FormData()
      data.append('profile_img',image)
      data.append('username',username)
      data.append('bio',bio)
      data.append('id',user?.id)
     const res=axios.patch(
      'http://localhost:3000/api/edit-profile',{data},{
        headers: {
          'Content-Type': 'application/json',
        },   
        withCredentials: true,
      })
    } catch (error) {
      
    }
  }
  return (
    <section>
      <div className='flex flex-col max-md:items-center gap-5 min-w-[250px] items-center'>
        <img src={user?.profile_img} className='w-48 h-48 bg-grey rounded-full md:w-32 md:h-32' alt="" />
        <InputBox name="username" type="text" className="profile-edit-input" placeholder="Username" onChange={e=>setUsername(e.target.value)}/>
        <textarea name="bio" id=""  rows="5" className="profile-edit-input w-full border bg-grey border-grey p-5 mb-5" onChange={e=>setBio(e.target.value)} placeholder="Bio">
        </textarea>
        <InputBox name="photo" id={'image-uploader'} type="file" placeholder="photo" onChange={(e)=>{setImage(e.target.value)}} />
        <button className='btn-dark px-10 mt-[-15px]' onClick={save}>Save</button>
      </div>
    </section>
  )
}

export default editProfile