import React from 'react'
import { Link } from 'react-router-dom'
import { getDay } from '../common/date'
import logo from '../assets/logo.jpg'

const minimalBlogPost = ({content,author,index}) => {
  let {title,des,createdAt,tags,banner,activity:{total_like},_id} = content
  let {username,profile_img} = author

  return (
    <Link to={`/blog/${_id}`} className='flex gap-5 mb-4'>
      <h1 className='blog-index'>
        {index<10 ? "0" +(index+1) : index}
      </h1>
      <div>
        <div className='flex gap-2 items-center mb-7'>
          <img src={profile_img} alt="" className='w-6 h-6 rounded-full' />
          <p className='line-clamp-1'>{username}</p>
          <p className='min-w-fit'>{getDay(createdAt) }</p>
        </div>
        <h1 className='blog-title'>{title}</h1>
      </div>
    </Link>
  )
}

export default minimalBlogPost