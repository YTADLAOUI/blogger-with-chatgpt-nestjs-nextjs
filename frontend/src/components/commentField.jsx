import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast';
import { change } from '../features/commentSlice';
const commentField = ({action,blog}) => {
  const [Comment, setComment] = useState('')
  const dispatch=useDispatch()
 const user= useSelector(state=>state.auth.user)
  const handleComment= async()=>{
    try {
      if(Comment.trim() === '') return toast.error('Comment cannot be empty...')
      const response= await axios.post('http://localhost:3000/api/saveComment', {article_id:blog._id,commented_by:user.id,comment:Comment,article_author:blog.author._id}, {headers: {
        'Content-Type': 'application/json',
      }
      ,withCredentials: true
      })
      dispatch(change())
      setComment('')
    } catch (error) {
      if(error.response.status === 403 || error.response.status === 401){
        return toast.error('please login to save article')
      }
      return toast.error('An error occured')
    }
  }
  
  return (
    <>
    <textarea value={Comment} 
    onChange={(e)=>setComment(e.target.value)} placeholder='Leave a comment...' className='input-box pl-5 placeholder:text-dark-grey resize-none h-[150px] overflow-auto'>
    </textarea>
    <button onClick={handleComment} className='btn-dark mt-5 px-10'>{action}</button>
    
    </>
  )
}

export default commentField