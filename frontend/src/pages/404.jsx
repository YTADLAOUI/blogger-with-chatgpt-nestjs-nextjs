import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
   <section className='h-cover relative  flex flex-col items-center p-10 gap-20 text-center '>
      <div className='text-center'>
        <h1 className='text-4xl font-bold'>404</h1>
        <p className='text-xl mb-8'>Page Not Found</p>
        <Link to='/' className='btn-dark text-blue-500'>Go back to Home</Link>
      </div>
    </section>
  )
}

export default NotFound