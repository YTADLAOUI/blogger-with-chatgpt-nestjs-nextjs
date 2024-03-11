import React, { useEffect, useState } from 'react'
 import InPageNav from '../components/inPagaNav'
import axios from 'axios'
import Loader from '../components/loader'
import BlogPostCard from '../components/blogPostCard'
const home = () => {

  const [blogs, setBlogs] = useState([])
  useEffect(() => {
    (
      async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/getArticles')
          console.log(response.data)
          setBlogs(response.data)
         
        } catch (error) {
          console.error(error)
        }
      }
    
    )()
  }, [])
  return (
    <section className='h-cover flex justify-center gap-10'>

      <div className='w-full'>
    <InPageNav routes={["home","trending blogs"]} defaultHidden={["trending blogs"]}> 
      <>
        {
      blogs==null ?<Loader/>  : 
      blogs.map((blog,i) => {
        return <BlogPostCard key={i} content={blog} author={blog.author} />
      })
        }
      </>
    </InPageNav>
      </div>

      <div></div>

    </section>
  )
}
export default home