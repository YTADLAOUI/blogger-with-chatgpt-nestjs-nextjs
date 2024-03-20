import React, { useState } from 'react'
import { getDay } from '../common/date'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { change } from '../features/commentSlice';
import toast from 'react-hot-toast'

const commentCard = ({
  index,commentData
}) => {
  const user=JSON.parse(localStorage.getItem('user'))
  console.log(user, "user")
  console.log(commentData, "commentData")
  const [edit, setEdit] = useState(true)
  const [comment,setComment]=useState('')
  console.log(comment)
  const dispatch=useDispatch()
  const editComment=async ()=>{
    try{
      const res= await axios.patch( 'http://localhost:3000/api/updateComment', {id_comment:commentData._id,comment:comment}, {headers: { 'Content-Type': 'application/json', }, withCredentials: true, } );
      console.log(res.data,'gggg')
      dispatch(change())
      setEdit(!edit)
      setComment('')
    }catch(e){
      if(error.response.status === 403 || error.response.status === 401){
        return toast.error('please login to update comment')
      }
      console.log(e)
    }
   
  }
  const deletComment=async()=>{
    console.log('delete')
    try {
      const res=  await axios.post('http://localhost:3000/api/deleteComment', {id_comment:commentData._id,article_id:commentData.article_id}, {headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
     dispatch(change())
    }catch (error) {
      if(error.response.status === 403 || error.response.status === 401){
        return toast.error('please login to delete comment')
      }
      console.log(error)
    }
  }

  return (
    <div className='w-full '>
      <div className='border my-5 p-6 rounded-md border border-grey'>
          <div className='flex gap-3 items-center mb-8'>
            <img src={commentData.commented_by.profile_img} className='w-6 h-6 rounded-full' />
            <p className='line-clamp-1'>{commentData.commented_by.username} @ {commentData.commented_by.username}</p>
          <p className='min-w-fit'>{getDay(commentData.createdAt)}</p>
            <div className='flex-1 w-max ms-3'>
                    {
                    commentData.article_author==user?.id||commentData.commented_by._id==user?.id ?
                    <>
                    {
                    <>
                    {
                      commentData.commented_by._id==user?.id ?
                      edit?
                      <button onClick={(edit)=>{
                        setEdit(!edit)
                        setComment(commentData.comment)
                      }}>
                      <i className='fi fi-rr-edit text-xl mt-1'/>
                    </button>
                      :
                      <>
                      <button onClick={editComment}>
                        <i className='fi fi-rr-check text-xl mt-1'/>
                      </button>
                      </>:''
                    }
                    </>

                    }
                  <button onClick={deletComment}>
                    <i className='fi fi-rr-trash text-xl mt-1'/>
                  </button> 
                  </>  : ""   }      
            </div>
          </div>
          {
            edit ?
            <p className='font-gelasio text-xl ml-3'>{commentData.comment}</p>
            :
            <textarea className='border h-4 w-full my-5 p-6 rounded-md border border-grey' style={{ overflow: 'hidden' }} value={comment} onChange={(e)=>setComment(e.target.value)} />
  
          }
      </div>
    </div>
  )
}

export default commentCard