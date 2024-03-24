import React, { useEffect, useState } from 'react'
import Loader from '../components/loader'
import MinimalBlogPost from '../components/minimalBlogPost'
import NodataMessage from '../components/noDataMessage'
import axios from 'axios'
import toast from 'react-hot-toast'
import { getDay } from '../common/date'

 const  notifictions = () => {
  const [trendingBlogs, setBlogs] = useState(null)
  const user=JSON.parse(localStorage.getItem('user'))
  const [notifications, setNotifications] = useState([])
  const blogPost= async ({page=1}) => {
    try {
      const response = await axios.post('http://localhost:3000/api/getArticles',{page}, {
        headers: {
          'Content-Type': 'application/json',
          'withCredentials': true,
        }   
      })
      setBlogs(response.data)
     
    } catch (error) {
      console.error(error)
    }
  }
  async function getNotifications(){
    console.log(user.id)
    try {
      const response = await axios.post('http://localhost:3000/api/notifications/findNotification',{},{
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
      )
      setNotifications(response.data)
    } catch (error) {
      toast.error('please login to get notifications')
      console.error(error)
    }
  
  }
  useEffect(() => {
    blogPost({page:1})
    getNotifications()
  }, [])
  console.log(notifications, "notifications")
  return (
    <div className=' h-cover flex justify-between gap-10'>
    <div className="" id="chec-div">
    <div className="w-full z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700" id="notification">
              <div className="2xl:w-4/12 bg-gray-50 h-screen overflow-y-auto p-8  right-0">
                  <div className="flex items-center justify-between">
                      <p tabIndex="0" className="focus:outline-none text-2xl font-semibold leading-6 text-gray-800">Notifications</p>
                  </div>
                    {
                      notifications==null ? <Loader/>:
                      notifications.map((notification) => (
                      <div className=" p-3 mt-8 bg-white rounded flex">
                          <div tabIndex="0" aria-label="heart icon" role="img" className="focus:outline-none w-8 h-8  rounded-full flex items-center justify-center">
                            {notification.type=='like'? <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M8.00059 3.01934C9.56659 1.61334 11.9866 1.66 13.4953 3.17134C15.0033 4.68334 15.0553 7.09133 13.6526 8.662L7.99926 14.3233L2.34726 8.662C0.944589 7.09133 0.997256 4.67934 2.50459 3.17134C4.01459 1.662 6.42992 1.61134 8.00059 3.01934Z" fill="#EF4444" />
                              </svg>:
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M4.30325 12.6667L1.33325 15V2.66667C1.33325 2.48986 1.40349 2.32029 1.52851 2.19526C1.65354 2.07024 1.82311 2 1.99992 2H13.9999C14.1767 2 14.3463 2.07024 14.4713 2.19526C14.5963 2.32029 14.6666 2.48986 14.6666 2.66667V12C14.6666 12.1768 14.5963 12.3464 14.4713 12.4714C14.3463 12.5964 14.1767 12.6667 13.9999 12.6667H4.30325ZM5.33325 6.66667V8H10.6666V6.66667H5.33325Z" fill="#4338CA" />
                          </svg>
                              }
                          </div>
                          <div className="pl-3 ">
                              <p tabIndex="0" className="focus:outline-none text-sm leading-none"><span className="text-indigo-700">{notification.user.username}</span> {notification.type=='like'?'favourited':'commented'} an <span className="text-indigo-700">{notification.article?.title}</span></p>
                              <p tabIndex="0" className="focus:outline-none text-xs leading-3 pt-1 text-gray-500 mt-4">{getDay(notification.createdAt)}</p>
                          </div>
                      </div>
                      ))
                    }

               </div>
        </div>
    </div>
    <div className='min-w-[40%] lg:min-w-[400px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden gap-3'>
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
    </div>
  )
}
export default  notifictions