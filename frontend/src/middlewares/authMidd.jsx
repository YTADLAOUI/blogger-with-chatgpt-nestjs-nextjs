import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { getSession } from '../common/session';
import { useDispatch } from 'react-redux';
import { login } from '../features/authSlice';

const AuthMidd = ({ children }) => {

 
  const dispatch = useDispatch()
  const user =JSON.parse(getSession('user'))  ;
  useEffect(() => {
    console.log(user.islogin, "user")
    if (user?.islogin) {
      dispatch(login(user));
    
    } else {
      dispatch(login(null));
      
    }
  }, []);
  if(user?.islogin){
    return children
  }else{
    return window.location.href='/signin'
  }
};

export default AuthMidd;