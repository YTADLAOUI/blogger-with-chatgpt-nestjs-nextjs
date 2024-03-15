import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { filterPagination } from '../components/filterPagination';
import Loader from '../components/loader';
import About from '../components/about';
import { handleTokenRefresh } from '../common/refrchToken';
import {getSession} from '../common/session'
import InPageNav from '../components/inPagaNav';
import BlogPostCard from '../components/blogPostCard';
import MinimalBlogPost from '../components/minimalBlogPost';
import NodataMessage from '../components/noDataMessage';
import LoadMoreData from '../components/loadMoreData';


const profile = () => {
  const [data, setData] = useState('');
// console.log(data)
const [loading, setLoading] = useState(false)
const {bio,username,profile_img} = data
const [blogs, setBlogs] = useState(null)

const user=getSession('user')
const {id}=JSON.parse(user)
  const getArticles = async ({page=1}) => {
      let author=id
    try {
      // console.log(author, "author")
     const response= await axios.post('http://localhost:3000/api/articleByAuthor',{page,author},{
        headers: {
          'Content-Type': 'application/json',
          'withCredentials': true,
        }   
      })
      // console.log(response.data, "responseLOLOLOL")
      let formdata = await filterPagination({
        state:blogs,
        data:response.data,
        page,
        counteRoute:"/countArticlesAuthor",
        data_to_send:{author:id}
      })
      console.log(formdata, "formDataHere")
      setBlogs(formdata)
    } catch (error) {
      console.error('Error fetching user information:', error);
    }
  }
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user');

        setData(response.data);        
          
      } catch (error) {
        // console.log(error.response.status)
        if (error.response && error.response.status === 401) {
          await handleTokenRefresh();
          const res = await axios.get('http://localhost:3000/api/user');
          if (res.status === 200) {
            // console.log(res.data);
            setData(res.data);
            // setPass(true);
          }
        } else {
          // refrechToken()
          console.error('Error fetching user information:', error);
        }
      }
    })();

    getArticles({page:1})

  }, []);
 console.log(blogs, "blogs")

  return (
    <>
    
    {
 
     loading ? <Loader/> : 
     <section className='h-cover md:flex flex-row-reverse items-start gap-5 min-[1100px]:gap-12'>
      <div className='flex flex-col max-md:items-center gap-5 min-w-[250px] items-center'>
        <img src={profile_img} className='w-48 h-48 bg-grey rounded-full md:w-32 md:h-32' alt="" />
        <h1 className='text-2xl font-medium'>@{username}</h1>
        <h1 className='text-xl capitalize h-6'>{username}</h1>
     
        <p>20000 blogs - 3000 Reads</p>
          <div className='flex gap-5 mt-2'>
            <Link  to='/edit-profile' className='btn-light rounded-md'>Edit Profile</Link>
            </div>
            <About className=" max-md:hidden items-center min-w-[250px] flex flex-col" bio={bio} />
      </div>
      <div className='max-md:mt-12 w-full'>
      <InPageNav routes={["Article","About"]} defaultHidden={["About"]}> 
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
         {
       <LoadMoreData state={blogs} fetchData={getArticles}/>  
        }
      </>
        {
           <About className="" bio={bio} />
        }
    </InPageNav>
      </div>
     </section>
    }
    
    </>
  )
}

export default profile