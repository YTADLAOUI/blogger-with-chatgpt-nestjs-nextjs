import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loader from '../components/loader'
import { getDay } from '../common/date'
import BlogAffichage from '../components/blogAffichage'
import BlogContent from '../components/BlogContent'
import BlogPostCard from '../components/blogPostCard'
export const blogStructure = {
  title:"",
  des:"",
  content:[],
  tags:[],
  banner: "",
  activity:{
    total_reads: 0,
    total_likes: 0,
    total_comments: 0,
  },
  author: {
    username: "",
    profile_img: "",
    email: "",
    _id: "",
  },
  createdAt: "",
}



const blog = () => {
  let {id}= useParams()
  const [blog, setBlog] = useState(blogStructure)
const [loading, setLoading] = useState(true)
const [similarBlogs,setSimilarBlogs]= useState(null)
const [isLike, setIsLike] = useState(false)

  useEffect(() => {
   (
   async () => {
        try{
       const response= await axios.post('http://localhost:3000/api/getArticle', {id}, {
            headers: {
              'Content-Type': 'application/json',
              'withCredentials': true,
            }   
          })
          console.log(response.data, "response")
          const res= await axios.post('http://localhost:3000/api/searchArticles'
          , {tag:response.data.blog.tags[0],page:1}, {
            headers: {
              'Content-Type': 'application/json',
              'withCredentials': true,
            }   
          })
          console.log(res.data, "res")
          setSimilarBlogs(res.data)
          setBlog(response.data.blog)
          setIsLike(response.data.isLike)
          setLoading(false)
        }
        catch(error){
          console.error(error)

      }
    })()
  }, [])
  return (
    <>
    {
      loading ? <Loader/> : 
     <div className="max-w-[900px] center py-10 max-lg:px-[5vw]">
      <img src={blog.banner} className='aspect-video' />
      <div>
        <h1 className="mt-12">{blog.title}</h1>
      </div>
      <div>
        <div className='flex max sm:flex-col justify-between my-8'>
          <img src={blog.author.profile_img} 
          className="rounded-full w-10 h-10" />
          <p className='capitalize'>
            {blog.author.username}
            <br />
            <Link to={`/profil/${blog.author._id}`} className="underline">@{blog.author.username}</Link>
          </p>
        </div>
        <p className='text-dark-grey opacity-75 max-sm:mt-6 max-sm:ml-12 max-sm:pl-5'> 
      Published on {getDay(blog.createdAt)}
        </p>
      </div>

      {/* <BlogAffichage blog={blog} islike={isLike} /> */}

        <div className='my-12 font-gelasio blog-page-content'>
        {
            blog.content.blocks.map((block, index) => {
              return <div key={index} className='my-4 md:my-8'>
                <BlogContent block={block} />
              </div> 
            })
          }
          </div>

      <BlogAffichage blog={blog} islike={isLike}/>
      
      {
        similarBlogs && similarBlogs.length ?
        <>
        <h1 className='text-2xl mt-14 mb-10 font-medium'>Similar Blogs</h1>
        {
          similarBlogs.map((blog, index) => {
            return <BlogPostCard content={blog} author={blog.author} />
          })
        }
        </> : ""
      }
     </div>
     
      
    }
    </>
  )
}

export default blog