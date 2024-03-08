import React, { useEffect, useState } from 'react'
import InputBox from '../components/inputBox'
import google from '../assets/google.png'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'

const authForm = ({page}) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let passwordRegex = /^(?=.*[A-Z]).{8,}$/;
  const submit = (e) => {
    e.preventDefault()
    if(page=='sign-up' && username.length < 3){
      return toast.error("must be at least 3 characters long.")}
    if(!emailRegex.test(email)|| email.length < 3){
      return toast.error("must be a valid email address");
    }
    if(!passwordRegex.test(password)){  
      return toast.error("must be at least 8 characters long and contain at least one uppercase letter.")
    }

    if(confirmPassword && password !== confirmPassword){
      return toast.error("must match the password.")
    }
    if(page==="sign-in"){
      (
        async () => {
          const response = await axios.post('http://localhost:3000/api/login', {
                    email: email,
                    password: password
                  }, {
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    Credential: true
                  });
                  console.log(response.data.username);
                  console.log(response.status===200);
                  if(response.status===200){
                     toast.success('Welcome back '+ response.data.username )}
                  else{
                    toast.error('An error occured')
                  }
                }
      )()     
      
    }else{    
      try {
       (
        async () => {
          const response = await axios.post('http://localhost:3000/api/register', {
                    username: username,
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword
                  }, {
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    Credential: true
                  });
                  console.log(response.data.username);
                  console.log(response.data);
                  if(response.data.username){
                     toast.success('Check your email '+ response.data.username )}
                  else{
                    toast.error('An error occured')
                  }
                }
       )()  
      } catch (error) {
        console.log(error)
      }
   
    }}

  return (
   <section className="h-cover flex items-center justify-center">
    <form className="w-[80%] max-w-[400px]" onSubmit={submit}>
      <h1 className="text-4xl font-gelasio capitalize text-center mb-24">{page==="sign-in"?"welcom back": "Join us today"}</h1>
      {
        page!=="sign-in" ? <InputBox 
        name="full-name"
        type="text" placeholder="Full Name" 
        icon="fi-rr-user"
         onChange={(e)=>setUsername(e.target.value)}
        /> : null
      }
      <InputBox 
        name="email"
        type="email" placeholder="Email" 
        icon="fi-rr-envelope"
        onChange={(e)=>setEmail(e.target.value)}
        />
      <InputBox 
        name="password"
        type="password" placeholder="Password" 
        icon="fi-rr-lock"
        onChange={(e)=>setPassword(e.target.value)}
        />
        {
        page!=="sign-in" ? <InputBox 
        name="password"
        type="password" placeholder="Confirm password" 
        icon="fi-rr-lock"
        onChange={(e)=>setConfirmPassword(e.target.value)}
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