import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import  InPageNav  from '../components/inPagaNav'

import BlogPostCard from '../components/blogPostCard'
import NodataMessage from '../components/noDataMessage'
import Loader from '../components/loader'
import axios from 'axios'
import { filterPagination } from '../components/filterPagination'
import LoadMoreData from '../components/loadMoreData'
const searchPage = () => {
  let {query} = useParams()
  let [blogs, setBlogs] = useState(null)
  const searchBlog = async ({page=1, creation_new_arr=flase}) => {
    try {
      query = query.toLowerCase()
      const response = await axios.post('http://localhost:3000/api/searchArticles', {tag:query,page}, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      let formDatas= await filterPagination({
        state:blogs,
        data:response.data,
        page,
        counteRoute:"/search-blogs-count",
        data_to_send:{query},
        creation_new_arr
      })
      console.log(formDatas, "formDataHere")
      setBlogs(formDatas)
      console.log(response.data, "response")
      // setBlogs(response.data)
    } catch (error) {
      console.error(error)
    }

  }
  useEffect(() => {
    searchBlog({page:1, creation_new_arr:true})
    console.log(blogs, "blogs")
  }, [query])
  return (
    <section className='h-cover flex justify-center gap-10'>

      <div className='w-full'>
    <InPageNav routes={[`Search Results from "${query}"`]}> 
      <>
        {
      blogs==null ? <Loader/>  : 
      blogs.results.length ?
      blogs.results.map((blog,i) => {
        return <BlogPostCard key={i} content={blog} author={blog.author} />
      })
      
      :
       <NodataMessage message="No blogs found"/>
        }
          <LoadMoreData state={blogs} fetchData={searchBlog}/>
      </>
        {/* {
      trendingBlogs==null ?<Loader/>  : 
      trendingBlogs.length ?
      trendingBlogs.map((blog,i) => {
        return <MinimalBlogPost key={i} content={blog} author={blog.author} index={i} />
      }):
        <NodataMessage message="No blogs found"/> }
         */}
    </InPageNav>
      </div>

      {/* <div className='min-w-[40%] lg:min-w-[400px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden'>
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
            trendingBlogs.length ?
            trendingBlogs.map((blog,i) => {
              return <MinimalBlogPost key={i} content={blog} author={blog.author} index={i} />
            }):
            <NodataMessage message="No blogs found"/>
          }
          </div>
        </div> */}
      {/* </div> */}

    </section>
  )
}

export default searchPage