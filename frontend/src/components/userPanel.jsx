import axios from 'axios'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const userPanel = () => {
const navigate = useNavigate();
const user = JSON.parse(localStorage.getItem('user'))
  const logout =async () => {
    await axios.post('http://localhost:3000/api/logout', {}, {withCredentials: true, headers: {
      'Content-Type': 'application/json'
    }})
    localStorage.removeItem('user')
   navigate('/signin')
  }
  
  return (
    <div className='bg-white absolute right-0 border border-grey w-60 overflow-hidden duration-200'>
         <Link to="/editor" className="link pl-8 py-4"> 
          <i className="fi fi-rr-file-edit text-2xl ">
            <span className=" md:inline">Editor</span>
          </i>
        </Link>
        <Link to={`/profil/${user.id}`} className='link pl-8 py-4'>
            profile
        </Link>
        <Link to='/dashboard/blogs' className='link pl-8 py-4'>
            Dashboard
        </Link>
        <Link to='/settings/edit-profile' className='link pl-8 py-4'>
            Setting
        </Link>
        <span className='absolute border-t border-t border-grey w-[100%]'>
          </span>
          <button className='text-left p-4 hover:bg-grey w-full pl-8 py-4'>
            <h1 className='font-bold text-xl mg-1' onClick={logout}>Sign Out</h1>
          </button>

    </div>
  )
}

export default userPanel