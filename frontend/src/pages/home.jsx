import React from 'react'
 import InPageNav from '../components/inPagaNav'
const home = () => {
  return (
    <section className='h-cover flex justify-center gap-10'>

      <div className='w-full'>
    <InPageNav routes={["home","trending blogs"]} defaultHidden={["trending blogs"]}> 
    <h1>home</h1>
    <h1>home here</h1>
    
    </InPageNav>
      </div>

      <div></div>

    </section>
  )
}
export default home