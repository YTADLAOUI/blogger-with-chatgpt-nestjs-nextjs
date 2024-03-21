import React, { useState } from 'react'
import { NavLink, Navigate, Outlet } from 'react-router-dom'

const sideNav = () => {
  let user = JSON.parse(localStorage.getItem('user'));
  let [page,setPage]=useState("")
  let [show,setShow]=useState(true)
  console.log(show)
  return (
    // !user.isLogin ? <Navigate to='/signin'/>:
    <>
     <section className='relative bg-green flex gap-10 py-0 m-0 max-md:flex-col'>
    <div className='sticky top-[80px] z-30'>
      <div className='md:hidden bg-white py-1 border-b border-grey flex flex-nowrap overflow-x-auto'>
        <button onClick={()=>setShow(!show)} className='p-5 capitalize'>
          <i className='fi fi-rr-menu-dots text-2xl'></i>
        </button>
        
      </div>
      {show ? <div className={'min-w-[200px] h-cover md:sticky top-24 overflow-y-auto  p-6 md:pr-0 md:border-grey md:border-r absolute max-md:top[64px] bg-white  max-md:px-16 max-md:-ml-7 max-md:w-[calc(100%+80px)]'}>
          <h1 className='text-xl text-dark-grey mb-3'>
            Dashboard
            </h1>
            <hr className='border-grey -ml-6 mb-8 mr-6' />
        

            <NavLink to="/" className='sidebar-link' onClick={(e)=>setPage(e.target.innerText)}>
              <i className='fi fi-rr-document me-3' ></i>
              Blogs
              </NavLink>
            <NavLink to="/dashboard/notification" className='sidebar-link' onClick={(e)=>setPage(e.target.innerText)}>
              <i className='fi fi-rr-bell me-3' ></i>
              Notification
              </NavLink>
            <NavLink to="/editor" className='sidebar-link' onClick={(e)=>setPage(e.target.innerText)}>
              <i className='fi fi-rr-file-edit me-3' ></i>
              Write
              </NavLink>
          
            <h1 className='text-xl text-dark-grey mb-3 mt-8'>
            Settings
            </h1>
            <hr className='border-grey -ml-6 mb-8 mr-6' />
            
            <NavLink to="/settings/edit-profile" className='sidebar-link' onClick={(e)=>setPage(e.target.innerText)}>
              <i className='fi fi-rr-user me-3' ></i>
              Edit Profile
              </NavLink>
              <NavLink to="/settings/change-password" className='sidebar-link' onClick={(e)=>setPage(e.target.innerText)}>
              <i className='fi fi-rr-lock me-3' ></i>
              Change Password
              </NavLink>
        </div>:<></> } 
      </div>
    <div className='max-md:mt-8 mt-5 w-full'>
      <Outlet/>
    </div>
     </section>
    </>
  )
}

export default sideNav