import React, { useState } from 'react'
import EditorBloger from '../components/blogEditor'
import { useSelector } from 'react-redux'
import PublishForm from '../components/publishForm'
const editor = () => {
 const editor =useSelector(state=>state.blog.editorState)
  return (
    <div>
     {
       editor==='editor'?
       <EditorBloger/>:
        <PublishForm/>
     } 
    </div>
  )
}

export default editor