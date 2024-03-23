import React from 'react'
import logo from '../assets/logo.jpg'
import { getDay } from '../common/date'
import { Link } from 'react-router-dom'
const blogPostCard = ({content,author}) => {
  let {title,des,createdAt,tags,banner,activity:{total_like},_id} = content
  let {username,profile_img} = author
  console.log(content, "content")
  return (
  <Link to={`/blog/${_id}`} className='flex gap-8 items-center border-b border-grey pb-5 mb-4'>
    <div className='w-full'>
      <div className='flex gap-2 items-center mb-7'>
        <img src={profile_img} alt="" className='w-6 h-6 rounded-full' />
        <p className='line-clamp-1'>{username}</p>
        <p className='min-w-fit'>{getDay(createdAt) }</p>
      </div>
      <h1 className='blog-title'>{title}</h1>
      <p className='my-3 text-xl font-gelasio leading-7 max-sm:hidden md:max-[1100px]:hidden line-clamp-2'>{des}</p>
      <div className='flex gap-4 mt-7'>
        <span className='btn-light py-1 px-4'>{tags[0]}</span>
        <span className='ml-3 flex items-center gap-2 text-dark-grey' ><i className='fi fi-rr-heart text-xl'></i>
        {total_like}
        </span>
      </div>
    </div>
    <div className='h-28 aspect-sqaure bg-grey'>
      <img  src={banner} alt="" className='w-full h-full object-cover aspect-sqaure' />
    </div>
    </Link>
  )
}

export default blogPostCard