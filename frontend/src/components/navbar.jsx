import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.jpg'
import UserPanel from './userPanel'
import { useSelector, useDispatch } from 'react-redux'
import { getSession } from '../common/session'
import { change } from '../features/commentSlice'

const navbar = () => {
  const navigation = useNavigate()
  const [searchBoxVisible, setSearchBoxVisible] = useState(false)
  const [userPanelVisible, setUserPanelVisible] = useState(false)
  const change = useSelector(state => state.comment.value)
  let navigate =useNavigate()
  const data=useSelector(state => state.auth.user);
  
const user= JSON.parse(getSession('user'))
// console.log(user.islogin, "user")
// console.log(user, "user")
  const handleSearch=(e)=>{
    let query = e.target.value
    console.log(e.keyCode, query)
    if(e.keyCode ===13  && query.length){
      navigate(`/search/${query}`)
    }
  }


  return (
  <>
    <nav className="navbar">
      <Link to="/" className="flex-none w-12">
        <img src={logo} alt="logo" className="w-full"/>
      </Link>
      <div className={"absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show "+(searchBoxVisible?"show":"hide")}>
        <input type="text" className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey " placeholder="Search..." onKeyDown={handleSearch}/>
        <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:pointer-events-none md:left top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
      </div>
      <div className="flex items-center gap-3 md:gap-6 ml-auto">
        <button className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center" onClick={()=>setSearchBoxVisible(currentVal=>!currentVal)}>
        <i className="fi fi-rr-search text-xl text-dark-grey"></i>
          </button>
        <Link to="/editor" className="hidden md:flex gap-2 link"> 
          <i className="fi fi-rr-file-edit text-2xl ">
            <span className="hidden md:inline">Editor</span>
          </i>
        </Link>
        {/* --- */}
        {
        user?.islogin?
          <>
        <Link to="/settings/notifications" >
          <button className="w-12 h-12 rounded-full bg-grey relative hover:bg-black/10">
            <i className="fi fi-rr-bell text-2xl ">
            </i>
          </button>
        </Link>
        <div className="relative" onClick={()=>setUserPanelVisible((curr)=>!curr)}>
          <button className='w-12 h-12 rounded-full'>
            <img src={user?.profile_img} alt="profile" className="w-full h-full object-cover rounded-full"/>
          </button>
           {
              userPanelVisible?
           <UserPanel/>:''
           } 
          </div>
          </>:
        <>
        <Link className="btn-dark py-2 px-4 md:flex" to="/signin">Sign In</Link>
        <Link className="btn-light py-2 px-4 hidden md:flex" to="/signup">Sign Up</Link>
         </>
        }
      </div>
    </nav>
    <Outlet/>
  </>
  )
}

export default navbar