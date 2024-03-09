import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.jpg'
import banners from '../assets/blogbanner.png'
import { useDispatch, useSelector } from 'react-redux'
import { editBlog } from '../features/editSlice'

const blogEditor = () => {
  let blogBanner=useRef()
  const dispatch=useDispatch()
  const blog=useSelector(state=>state.blog.value)
  const {title,banner,content,tags,des,author}=blog
  // console.log(blog,'blog')
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
         
            <button className='btn-dark py-2'>
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
    </div>

      </section>
    </>
  )
}

export default blogEditor