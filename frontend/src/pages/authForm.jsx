import React from 'react'
import InputBox from '../components/inputBox'
import google from '../assets/google.png'

const authForm = ({page}) => {
  return (
   <section className="h-cover flex items-center justify-center">
    <form className="w-[80%] max-w-[400px]">
      <h1 className="text-4xl font-gelasio capitalize text-center mb-24">{page==="sign-in"?"welcom back": "Join us today"}</h1>
      {
        page!=="sign-in" ? <InputBox 
        name="full-name"
        type="text" placeholder="Full Name" 
        icon="fi-rr-user"
        /> : null
      }
      <InputBox 
        name="email"
        type="email" placeholder="Email" 
        icon="fi-rr-envelope"
        />
      <InputBox 
        name="password"
        type="password" placeholder="Password" 
        icon="fi-rr-lock"
        />
        {
        page!=="sign-in" ? <InputBox 
        name="password"
        type="password" placeholder="Confirm password" 
        icon="fi-rr-lock"
        /> : null
      }
      <button className={page !== 'sign-up' ? "btn-dark center mt-14 " : "btn-light center mt-14 "}
      type='submit'
      >{page==="sign-in"?"sign in":"sign up"}</button>
        <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
          <hr className='w-1/2 border-black'/>
          <p>or</p>
          <hr className='w-1/2 border-black'/>
        </div>
        <button className="btn-dark center flex items-center justify-center gap-4 w-[90%]" type='button'>
          <img src={google} alt='google' className='w-5 mr-2' />
          Continue with Google</button>
          {
            page==="sign-in" ? <p className="text-center mt-8">Don't have an account? <a href="/signup" className="text-primary">Sign up</a></p> : <p className="text-center mt-8">Already have an account? <a href="/signin" className="text-primary">Sign in</a></p>
          }
    </form>

    </section>
  )
}

export default authForm