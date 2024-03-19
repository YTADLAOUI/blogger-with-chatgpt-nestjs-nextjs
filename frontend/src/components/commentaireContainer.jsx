import React, { useEffect, useState } from 'react'
import CommentField from './commentField'
import NodataMessage from './noDataMessage'
import axios from 'axios'
import CommentCard from './commentCard'
import { useSelector } from 'react-redux'
const commentaireContainer = ({commentWrapper,totalComments,blog ,setCommentWrapper}) => {
  console.log(commentWrapper, "commentWrapper")
  const [commentsArray, setCommentsArray] = useState([])
  const change=useSelector(state=>state.comment.value)
  console.log(change, "change")
  useEffect(()=>{
    (
      async()=>{
        try {
          const response= await axios.post('http://localhost:3000/api/getComments', {article_id:blog._id}, {headers: {
            'Content-Type': 'application/json',
          }
          ,withCredentials: true
          })
          setCommentsArray(response.data)
        } catch (error) {
          console.log(error)
        }
      }
    )()
 }, [blog._id, change])
  return (
    <div className={'max-sm:w-full fixed '+(commentWrapper? 'top-0 sm:right-0 ':'top-[100%] sm:right-[-100%]') + ' duration-700 max-sm:right-0 sm:top-0 w-[30%] min-w-[350px] h-full z-50 bg-white shadow-2xl p-8 px-16 overflow-y-auto overflow-x-hidden'}
    >
      <div className='relative '>
    <h1 className='text-xl font-medium'>Comments</h1>
    <p className='text-lg
    mt-2 w-[70%] text-dark-grey line-clamp-1'>{blog.title}</p>
    <button className='absolute top-0 right-0 flex justify-center
    items-center w-10 h-10 rounded-full bg-grey' onClick={()=>setCommentWrapper(!commentWrapper)}>
      <i className='fi fi-rr-cross text-xl mt-1'></i> 
    </button>
        </div>
      <hr className='border-grey my-8 w-[120%]-ml-10'/>
      <CommentField blog={blog} action='comment' 
      />
      {
      
        commentsArray && commentsArray.length ?
        commentsArray.map((comment, index)=>(
         
          <CommentCard key={index} index={index} commentData={comment}/>
        )) : <NodataMessage message='No comments yet...'/>
      }
    </div>
    
  )
}

export default commentaireContainer