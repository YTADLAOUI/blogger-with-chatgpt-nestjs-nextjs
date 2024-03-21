import React, { useState } from 'react'

const inputBox = ({name,type,id, value, placeholder,icon,onChange}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
  <div className='relative w-[100%] mb-4 '>
    {type==="file" && <label htmlFor={id} className="text-center p-5 w-full bg-grey text- rounded-lg">Upload Image</label>}
  <input 
    name={name}
    type={type==="password" ? showPassword ? "text" : "password":type}
    id={id}
    defaultValue={value}
    placeholder={placeholder}
    onChange={onChange}
    
    accept={type==="file" ? "image/*" : null}
    className={type==="file" ? "hidden" : "input-box"}
    />
    <i className={`fi ${icon} input-icon`}></i>
      {
        name==="password" ? <i className={"fi fi-rr-eye" + (!showPassword ?"-crossed ":" " ) + " input-icon left-[auto] right-4 cursor-pointer"}
        onClick={()=>setShowPassword(currentValue=>!currentValue)} 
        ></i> : null
      }
  </div>   

  )
}

export default inputBox