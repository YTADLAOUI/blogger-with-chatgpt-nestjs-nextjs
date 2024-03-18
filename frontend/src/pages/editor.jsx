import React, { useEffect, useState } from 'react'
import EditorBloger from '../components/blogEditor'
import { useDispatch, useSelector } from 'react-redux'
import PublishForm from '../components/publishForm'
import { useParams } from 'react-router-dom'
import Loader from '../components/loader'
import axios from 'axios'
import { editBlog, setEditorState } from '../features/editSlice'
const editor = () => {
  const dispatch=useDispatch()
 const editor =useSelector(state=>state.blog.editorState)
  console.log(editor)
 let {id}=useParams();
 const [loading, setLoading] = useState(true)
 useEffect(() => {
  if(!id){
   return setLoading(false)
  }
    (
      async()=>{
        console.log(id)
     try {
      const res= await axios.post('http://localhost:3000/api/getArticle', {id,edit:'edit'}, {
        headers: {
          'Content-Type': 'application/json',
          'withCredentials': true,
        }   
      })
      console.log(res.data, "res")
      dispatch(editBlog(res.data.blog))
  
      setLoading(false) 
    } catch (error) {
      console.log(error)
       dispatch(editBlog(null))
     }
  
      }
    )()
  
 }, [])

  return (
    <div>
     {
      loading ? <Loader/> :
       editor ==='editor' ?
        <EditorBloger/> :
        <PublishForm id={id}/>
     } 
    </div>
  )
}

export default editor