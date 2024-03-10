import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.jpg'
import banners from '../assets/blogbanner.png'
import { useDispatch, useSelector } from 'react-redux'
import { editBlog, setEditorState, setTextEditor } from '../features/editSlice'
import EditorJS from '@editorjs/editorjs'
import { tools } from './toolsEditor'
import toast from 'react-hot-toast'
const blogEditor = () => {
  let blogBanner=useRef()
  const dispatch=useDispatch()
  const blog=useSelector(state=>state.blog.value)
  const {title,banner,content,tags,des,author}=blog
  // const textEditor=useSelector(state=>state.blog.textEditor)
  const [data,setData]=useState({})
  console.log(blog,'blog')

  useEffect(() => {
    const initializeEditor = async () => {
      try {

        const editor = new EditorJS({
          holderId: "textEditor",
          data: '',
          tools: tools,
          placeholder: 'Start Writing your blog'
        });
        setData(editor)

      } catch (error) {
        console.error('Error initializing EditorJS:', error);
      }
    };
  
    initializeEditor();
  }, []);
  const handleTitle = (e) => {
   let input= e.target
   input.style.height='auto'
   input.style.height=input.scrollHeight+'px'
    dispatch(editBlog({...blog,title:input.value}))
  }
  const handleBanner = (e) => {
    let img=e.target.files[0]
    if(img){
      let reader=new FileReader()
      reader.onloadend=()=>{
        blogBanner.current.src=reader.result
      }
      reader.readAsDataURL(img)
    }
  }
  const handlePublish=()=>{
    console.log('first')
    if(!title.length){

      return toast.error("write blog title to publish it")
    }
    console.log(data)
    data.save().then(
      (out)=>{
        if(out.blocks.length){
        console.log(out,'gfdge')
      dispatch(editBlog({...blog,content:out}))
        dispatch(setEditorState('publish'))
          }else{
            return toast.error('Write something in your blog to publish it')
          }
       }
      )
  
  }
  return (
    <>
    <nav className='navbar'>
        <Link to="/" className="flex-none w-12">
          <img src={logo} alt="logo" className="w-full"/>
        </Link>
        <p className='max-md:hidden text-black line-clamp-1 w-full'>
         { title.length ? title: 'New Blog' }
        </p>
        <div className="flex items-center gap-3 ml-auto">
         
            <button className='btn-dark py-2' onClick={handlePublish}> 
              Publish
            </button>
            <button className='btn-light py-2'>
              Save Draft
            </button>

        </div>
    </nav>
    <section >
     <div className='mx-auto max-w-[900px] w-full'>

      <div className="relative aspect-vedio hover:opacity-80 bg-white border-4 border-grey"> 
      <label htmlFor='uploadBanner' >
        <img
        ref={blogBanner}
        src={banners} alt=""
        className='z-20'
        
        />
        <input type="file"
        id="uploadBanner"
        accept='.jpg,.jpeg,.png'
        hidden
        onChange={handleBanner}
        />
      </label>
      </div>
      <textarea
      placeholder='blog Title'
      className='text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40'
      onKeyUp={handleTitle}
      >
      </textarea>
      <hr className='w-full opacity-10 my-5'/>
      <div id='textEditor'
      className='font-gelasio text-lg w-full h-[70vh] overflow-y-auto outline-none resize-none leading-relaxed'
    ></div>
    </div>

      </section>
    </>
  )
}

export default blogEditor