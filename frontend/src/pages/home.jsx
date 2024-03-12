import React, { useEffect, useState } from 'react'
 import InPageNav from '../components/inPagaNav'
import axios from 'axios'
import Loader from '../components/loader'
import BlogPostCard from '../components/blogPostCard'
import MinimalBlogPost from '../components/minimalBlogPost'
const home = () => {

  const [blogs, setBlogs] = useState([])
  const [trendingBlogs, setTrendingBlogs] = useState([])
  const [pageState, setPageState] = useState("Home")
  let categories = ["programming","hollywood","film making", "social media","technology","science","space","history","politics","sports","music"]
  const blogPost= async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/getArticles')
      console.log(response.data)
      setBlogs(response.data)
     
    } catch (error) {
      console.error(error)
    }
  }
  const loadBlogByCategory = async (e) => {
 let category= e.target.innerText.toLowerCase()
    setBlogs(null)
    if(pageState==category){

      setPageState("Home")

      blogPost()
      return;
  }

    setPageState(category)
}
  const trendingBlogPost= async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/getTrendingArticles')
      console.log(response.data)
      setTrendingBlogs(response.data)
     
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {

    if(pageState=="Home"){
      blogPost()
    }
      if(trendingBlogs){
        trendingBlogPost()
      }
  }, [pageState])
  console.log(pageState);
  return (
    <section className='h-cover flex justify-center gap-10'>

      <div className='w-full'>
    <InPageNav routes={[pageState,"trending blogs"]} defaultHidden={["trending blogs"]}> 
      <>
        {
      blogs==null ?<Loader/>  : 
      blogs.map((blog,i) => {
        return <BlogPostCard key={i} content={blog} author={blog.author} />
      })
        }
      </>
        {
      trendingBlogs==null ?<Loader/>  : 
      trendingBlogs.map((blog,i) => {
        return <MinimalBlogPost key={i} content={blog} author={blog.author} index={i} />
      })
        }
    </InPageNav>
      </div>

      <div className='min-w-[40%] lg:min-w-[400px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden'>
        <div className='flex flex-col gap-10'> 
          <div>
          <h1 className='text-xl font-medium mb-8'>Stories from all interestes</h1>
              <div className='flex gap-3 flex-wrap mb-5'>
                {
                  categories.map((category,i) => {
                    return <button onClick={loadBlogByCategory} key={i} className={"tag " + ( pageState == category ? " bg-black text-white" : " " )
                  
                  }>{category}</button>
                  })
                }
              </div>
          </div>
          <div>
            <h1 className='text-xl font-medium mb-8'>Trending</h1>
            {
            trendingBlogs==null ?<Loader/>  : 
            trendingBlogs.map((blog,i) => {
              return <MinimalBlogPost key={i} content={blog} author={blog.author} index={i} />
            })
          }
          </div>
        </div>
      </div>

    </section>
  )
}
export default home