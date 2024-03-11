import React, { useRef, useState } from 'react'

const inPagaNav = ({routes ,defaultHidden=[],children}) => {
  let [active,setActive]=useState(0);
  let activeTabLineRef=useRef()
  const changePageState=(target,i)=>{
    setActive(i)
    activeTabLineRef.current.style.left=`${target.offsetLeft}px`
    activeTabLineRef.current.style.width=`${target.offsetWidth}px`
  }
  return (
    <>
    <div className='relative mb-8 bg-white border-b border-grey flex flex-nowrap  overflow-x-auto'>
      {
        routes.map(
          (route,i)=>{
            return (
              <button key={i} className={"p-4 px-5 capitalize " + (active == i ?"text-black" : "text-dark-grey ") + (defaultHidden.includes(route)?"md:hidden ":" ")}
              onClick={(e)=>{changePageState(e.target,i)}}
              >
                {route}
              </button>
            )
          }
        )
      }
      <hr ref={activeTabLineRef}  className='absolute bottom-0 duration-300 '/>
    </div>
    {Array.isArray(children)?children[active]:children}
    {/* {children} */}
    </>
  )
}

export default inPagaNav