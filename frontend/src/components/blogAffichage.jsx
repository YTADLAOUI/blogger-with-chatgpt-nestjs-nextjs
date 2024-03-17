import React from 'react'
import { getSession } from '../common/session'
import { Link } from 'react-router-dom'

const blogAffichage = ({blog}) => {
  let user= getSession('user')
   user= JSON.parse(user)
  console.log(blog, "blog")
  return (
    <>
    <hr className="border-grey my-2"/>
    <div className= "flex gap-6 justify-between">
      <div className='flex gap-3 items-center'>
       
        <button className=' w-10 h-10 rounded-full flex items-center justify-center bg-grey/80'>
        <i className='fi fi-rr-heart'></i>
        </button>
        <p className='text-xl text-dark-grey'>{blog.activity.total_likes}</p>
       
       
        <button className=' w-10 h-10 rounded-full flex items-center justify-center bg-grey/80'>
        <i className='fi fi-rr-comment-dots'></i>
        </button>
        <p className='text-xl text-dark-grey'>{blog.activity.total_comments}</p>
        
      </div>

        <div className='flex gap-3 items-center'>
          {/* {
            blog.author._id === user._id ?
            <Link to={`/editor/${blog._id}`}>Edit</Link> : ""
          
          } */}
          <Link to={`/editor/${blog._id}`} className='underline '>Edit</Link> 
        </div>
          

    </div>

    <hr className="border-grey my-2"/>
    </>
  )
}

export default blogAffichage