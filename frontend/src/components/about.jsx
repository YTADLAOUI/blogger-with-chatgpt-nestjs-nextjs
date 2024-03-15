import React from 'react'

const about = ( {bio="", className} ) => {

  console.log(bio, "bio")
  console.log(className, "className")
  return (
    <div className={"md:w-[90%] md-mt-7 " + className}>
      <p> {bio.length ? bio: "Nothing to read here" }</p>
      <div className='flex gap-x-7 gap-y-2 flex-wrap my-7 items-center '>
          <i class="fi fi-brands-facebook"></i>
          <i class="fi fi-brands-instagram"></i>
          <i class="fi fi-brands-linkedin"></i>
          <i class="fi fi-brands-github"></i>
      </div>
    </div>
  )
}

export default about