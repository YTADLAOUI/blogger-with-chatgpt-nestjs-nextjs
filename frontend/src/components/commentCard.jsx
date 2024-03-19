import React from 'react'
import { getDay } from '../common/date'

const commentCard = ({
  index,commentData
}) => {
  console.log(commentData, "commentData")
  return (
    <div className='w-full '>
      <div className='border my-5 p-6 rounded-md border border-grey'>
          <div className='flex gap-3 items-center mb-8'>
            <img src={commentData.commented_by.profile_img} className='w-6 h-6 rounded-full' />
            <p className='line-clamp-1'>{commentData.commented_by.username} @ {commentData.commented_by.username}</p>
          <p className='min-w-fit'>{getDay(commentData.createdAt)}</p>
          </div>
        <p className='font-gelasio text-xl ml-3'>{commentData.comment}</p>
      </div>
    </div>
  )
}

export default commentCard