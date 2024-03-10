import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editBlog } from '../features/editSlice'

const tags = ({tag}) => {
const dispatch =useDispatch()
  const blog=useSelector(state=>state.blog.value)
  let {title,banner,content,tags,des,author}=blog
const handelDelete=()=>{
 tags=tags.filter(t=>t!=tag);
  dispatch(editBlog({...blog,tags:tags}))
}
  return (
    <div className='relative p-2 mt-2 mr-3 px-5 bg-white rounded-full inline-block hover:bg-opacity-50 pr-8'
    ><p
     className='outline-none' contentEditable='true'>
      
      {tag}
      </p>
      <button className='mt-[2px] rounded-full absolute right-2 top-2'
      onClick={handelDelete}
      >
        <i className='fi fi-br-cross text-sm pointr-events-none' />
      </button>
      </div>
  )
}

export default tags